/**
 * Runs one dispatch cycle (called every minute by the `push:dispatch` task):
 *   1. load all subscribers from storage
 *   2. fetch the Aladhan months they need — through our own cached
 *      /api/aladhan/calendar route (internal call, shares the 24h cache with
 *      the app), deduplicated per (coordinates, params, month)
 *   3. plan due notifications with the pure `planDispatch`
 *   4. send them, record them in `sent` (dedupe) and delete subscriptions the
 *      push service reports as gone (404/410)
 */
import {
  planDispatch,
  prayerMonthsNeeded,
  pruneSent,
  type DayTimings,
  type PlannedSend,
} from '../../shared/push/dispatch'
import type { PushRecord } from '../../shared/push/types'
import { formatDdMmYyyy, isValidTimeZone, monthKey } from '../../shared/time'
import { getVapidConfig, pushStorage, sendPush, type SendResult } from './push'

interface CalendarResponse {
  data: Array<{
    timings: Record<string, string>
    date: { gregorian: { date: string } }
    meta?: { timezone?: string }
  }>
}

interface MonthData {
  /** "DD-MM-YYYY" → timings */
  days: Map<string, DayTimings>
  timezone: string | null
}

export interface DispatchSummary {
  enabled: boolean
  subscribers: number
  planned: number
  sent: number
  failed: number
  removed: number
}

const SEND_CONCURRENCY = 8

let running = false

/** Identity of the Aladhan data a subscriber needs (without the month). */
function sourceKey(record: PushRecord): string | null {
  if (!record.location) return null
  const p = record.prayerParams
  return `${record.location.lat.toFixed(2)},${record.location.lng.toFixed(2)}|m${p.method}|s${p.school}|l${p.latitudeAdjustmentMethod ?? '-'}`
}

async function fetchMonth(record: PushRecord, key: string): Promise<MonthData | null> {
  const [year, month] = key.split('-').map(Number)
  const p = record.prayerParams
  try {
    const response = await $fetch<CalendarResponse>(`/api/aladhan/calendar/${year}/${month}`, {
      query: {
        latitude: record.location!.lat,
        longitude: record.location!.lng,
        method: p.method,
        school: p.school,
        ...(p.latitudeAdjustmentMethod !== null ? { latitudeAdjustmentMethod: p.latitudeAdjustmentMethod } : {}),
      },
    })
    const days = new Map<string, DayTimings>()
    let timezone: string | null = null
    for (const entry of response.data ?? []) {
      days.set(entry.date.gregorian.date, entry.timings)
      if (!timezone && isValidTimeZone(entry.meta?.timezone)) timezone = entry.meta!.timezone!
    }
    return { days, timezone }
  }
  catch (err) {
    console.warn('[push] prayer times fetch failed', key, (err as Error).message)
    return null
  }
}

async function loadRecords(): Promise<PushRecord[]> {
  const storage = pushStorage()
  const keys = await storage.getKeys()
  const items = await Promise.all(keys.map(key => storage.getItem<PushRecord>(key).catch(() => null)))
  return items.filter((r): r is PushRecord => !!r && typeof r === 'object' && !!r.subscription && !!r.id)
}

/** Run `fn` over `items` with at most `limit` in flight. */
async function pool<T>(items: T[], limit: number, fn: (item: T) => Promise<void>): Promise<void> {
  let index = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) {
      const item = items[index++]!
      await fn(item)
    }
  })
  await Promise.all(workers)
}

export async function runPushDispatch(now: number = Date.now()): Promise<DispatchSummary> {
  const vapid = getVapidConfig()
  const summary: DispatchSummary = { enabled: vapid.enabled, subscribers: 0, planned: 0, sent: 0, failed: 0, removed: 0 }
  if (!vapid.enabled || running) return summary
  running = true

  try {
    const records = await loadRecords()
    summary.subscribers = records.length
    if (records.length === 0) return summary

    // --- 1. Fetch the Aladhan months needed (deduplicated) -----------------
    const months = new Map<string, Promise<MonthData | null>>()
    for (const record of records) {
      const src = sourceKey(record)
      if (!src) continue
      for (const mk of prayerMonthsNeeded(record, now)) {
        const key = `${src}|${mk}`
        if (!months.has(key)) months.set(key, fetchMonth(record, mk))
      }
    }
    const resolved = new Map<string, MonthData | null>()
    await Promise.all([...months].map(async ([key, promise]) => resolved.set(key, await promise)))

    // Prefer Aladhan's timezone for the location (the client may only have
    // known the device timezone when it subscribed).
    const tzFixes = new Map<string, string>()
    for (const record of records) {
      const src = sourceKey(record)
      if (!src || !record.location) continue
      for (const [key, data] of resolved) {
        if (key.startsWith(`${src}|`) && data?.timezone && data.timezone !== record.location.timezone) {
          record.location = { ...record.location, timezone: data.timezone }
          tzFixes.set(record.id, data.timezone)
          break
        }
      }
    }

    // --- 2. Plan -------------------------------------------------------------
    const plan = planDispatch(records, now, (record, date) => {
      const src = sourceKey(record)
      if (!src) return null
      return resolved.get(`${src}|${monthKey(date)}`)?.days.get(formatDdMmYyyy(date)) ?? null
    })
    summary.planned = plan.length

    // --- 3. Send -------------------------------------------------------------
    const byRecord = new Map<string, PlannedSend[]>()
    for (const send of plan) {
      const list = byRecord.get(send.recordId) ?? []
      list.push(send)
      byRecord.set(send.recordId, list)
    }
    const recordsById = new Map(records.map(r => [r.id, r]))
    const outcome = new Map<string, { sent: string[], gone: boolean }>()

    await pool([...byRecord], SEND_CONCURRENCY, async ([recordId, sends]) => {
      const record = recordsById.get(recordId)!
      const result = { sent: [] as string[], gone: false }
      outcome.set(recordId, result)
      for (const send of sends) {
        const status: SendResult = await sendPush(record.subscription, send.payload, vapid, { ttlSeconds: send.ttlSeconds })
        if (status === 'ok') {
          result.sent.push(send.notificationId)
          summary.sent++
        }
        else if (status === 'gone') {
          result.gone = true
          break
        }
        else {
          // Transient failure: not marked as sent, retried next minute while still in the window
          summary.failed++
        }
      }
    })

    // --- 4. Persist (re-read each record so concurrent pref updates survive) --
    const storage = pushStorage()
    const touched = new Set([...outcome.keys(), ...tzFixes.keys()])
    for (const id of touched) {
      const result = outcome.get(id)
      if (result?.gone) {
        await storage.removeItem(id)
        summary.removed++
        continue
      }
      const fresh = await storage.getItem<PushRecord>(id)
      if (!fresh) continue
      const sent = { ...fresh.sent }
      for (const notificationId of result?.sent ?? []) sent[notificationId] = now
      const tz = tzFixes.get(id)
      await storage.setItem(id, {
        ...fresh,
        location: tz && fresh.location ? { ...fresh.location, timezone: tz } : fresh.location,
        sent: pruneSent(sent, now),
      })
    }

    return summary
  }
  finally {
    running = false
  }
}
