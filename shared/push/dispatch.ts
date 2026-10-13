/**
 * Pure push-dispatch planning: given the stored subscribers, the current time
 * and the raw Aladhan timings, decide which notifications are due *now*.
 *
 * The Nitro task `push:dispatch` runs every minute, fetches the (cached)
 * Aladhan months each subscriber needs (`prayerMonthsNeeded`), calls
 * `planDispatch` and sends the result. Everything here is side-effect free so
 * it can be unit-tested with fixed clocks and timezones.
 *
 * Prayer time computation mirrors app/composables/usePrayerTimes.ts
 * (`buildPrayerList`): Aladhan wall-clock strings in the location's timezone,
 * plus the user's minute adjustments (which may cross midnight), and late
 * prayers (Asr/Maghrib/Isha) that fall "before" Dhuhr belong to the next
 * calendar day (high-latitude summers).
 */
import {
  addDays,
  monthKey,
  parseHHmm,
  todayInZone,
  zonedWallTimeToEpoch,
  type YMD,
} from '../time'
import { prayerReminderText, pushMessages } from './messages'
import {
  PUSH_PRAYERS,
  type PushAdjustments,
  type PushPayload,
  type PushPrayer,
  type PushRecord,
} from './types'

/** A notification is sent if its fire time lies within (now − window, now]. */
export const DISPATCH_WINDOW_MS = 3 * 60_000
/** `sent` entries older than this are pruned. */
export const SENT_RETENTION_MS = 3 * 86_400_000

const MINUTES_PER_DAY = 24 * 60
const PRAYER_KEYS = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const
const LATE_PRAYERS = new Set<string>(['Asr', 'Maghrib', 'Isha'])

export interface PrayerInstant {
  name: string
  timestamp: number
}

/** Raw Aladhan `timings` of one day (e.g. { Fajr: "05:12 (CEST)", ... }). */
export type DayTimings = Record<string, string>

/** Returns the Aladhan timings of `date` for a subscriber, if available. */
export type TimingsLookup = (record: PushRecord, date: YMD) => DayTimings | null | undefined

export interface PlannedSend {
  recordId: string
  /** Dedupe id, e.g. "prayer-Fajr-2026-10-12" / "dhikr-morning-2026-10-12" */
  notificationId: string
  fireAt: number
  payload: PushPayload
  /** How long the push service may hold the message for an offline device */
  ttlSeconds: number
}

/** "YYYY-MM-DD" */
export function isoDate(date: YMD): string {
  return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`
}

/**
 * Absolute prayer instants for one Aladhan day — same rules as the client's
 * `buildPrayerList`. Unparseable timings are skipped.
 */
export function computeDayPrayerTimes(
  timings: DayTimings,
  date: YMD,
  timeZone: string,
  adjustments: Partial<PushAdjustments>,
): PrayerInstant[] {
  const result: PrayerInstant[] = []
  let dhuhrTimestamp = Number.NEGATIVE_INFINITY

  for (const key of PRAYER_KEYS) {
    const parsed = parseHHmm(timings[key] ?? '')
    if (!parsed) continue
    let total = parsed.hour * 60 + parsed.minute + (adjustments[key] ?? 0)
    // Adjustments may push a time across midnight
    const dayShift = Math.floor(total / MINUTES_PER_DAY)
    total -= dayShift * MINUTES_PER_DAY
    const hour = Math.floor(total / 60)
    const minute = total % 60

    let timestamp = zonedWallTimeToEpoch(date.year, date.month, date.day + dayShift, hour, minute, timeZone)
    // e.g. Isha "00:12" in Oslo in June belongs to the night *after* this date
    if (LATE_PRAYERS.has(key) && timestamp < dhuhrTimestamp) {
      timestamp = zonedWallTimeToEpoch(date.year, date.month, date.day + dayShift + 1, hour, minute, timeZone)
    }
    if (key === 'Dhuhr') dhuhrTimestamp = timestamp
    result.push({ name: key, timestamp })
  }
  return result
}

/**
 * Calendar dates (in the location's timezone) whose prayers may be due now:
 * yesterday (late Isha after midnight), today, and tomorrow (Fajr shortly
 * after midnight minus a lead time).
 */
export function prayerDatesToCheck(timeZone: string, now: number): YMD[] {
  const today = todayInZone(timeZone, now)
  return [addDays(today, -1), today, addDays(today, 1)]
}

/** Aladhan months ("YYYY-MM") a subscriber's prayer reminders need right now. */
export function prayerMonthsNeeded(record: PushRecord, now: number): string[] {
  if (!record.prayersEnabled || !record.location) return []
  if (!PUSH_PRAYERS.some(p => record.prayers[p])) return []
  return [...new Set(prayerDatesToCheck(record.location.timezone, now).map(monthKey))]
}

/** Remove dedupe entries older than the retention period. */
export function pruneSent(sent: Record<string, number>, now: number, retentionMs = SENT_RETENTION_MS): Record<string, number> {
  const result: Record<string, number> = {}
  for (const [id, at] of Object.entries(sent)) {
    if (typeof at === 'number' && at > now - retentionMs) result[id] = at
  }
  return result
}

function isPushPrayer(name: string): name is PushPrayer {
  return (PUSH_PRAYERS as readonly string[]).includes(name)
}

/** All reminder candidates of one subscriber around `now` (not yet filtered by window/dedupe). */
export function candidatesFor(record: PushRecord, now: number, lookup: TimingsLookup): PlannedSend[] {
  const out: PlannedSend[] = []

  // Prayer reminders
  if (record.prayersEnabled && record.location) {
    const tz = record.location.timezone
    const leadMs = record.minutesBefore * 60_000
    for (const date of prayerDatesToCheck(tz, now)) {
      const timings = lookup(record, date)
      if (!timings) continue
      for (const p of computeDayPrayerTimes(timings, date, tz, record.prayerParams.adjustments)) {
        if (!isPushPrayer(p.name) || !record.prayers[p.name]) continue
        const notificationId = `prayer-${p.name}-${isoDate(date)}`
        const text = prayerReminderText(record.locale, p.name, record.minutesBefore)
        out.push({
          recordId: record.id,
          notificationId,
          fireAt: p.timestamp - leadMs,
          payload: { ...text, tag: `push-${notificationId}`, url: '/prayer' },
          // Useless once the prayer time has passed by a few minutes
          ttlSeconds: record.minutesBefore * 60 + 10 * 60,
        })
      }
    }
  }

  // Dhikr reminders (wall-clock times in the device timezone)
  if (record.dhikr.enabled) {
    const tz = record.timezone
    const msgs = pushMessages(record.locale)
    const today = todayInZone(tz, now)
    for (const slot of ['morning', 'evening'] as const) {
      const prefs = record.dhikr[slot]
      if (!prefs.enabled) continue
      for (const date of [addDays(today, -1), today]) {
        const notificationId = `dhikr-${slot}-${isoDate(date)}`
        out.push({
          recordId: record.id,
          notificationId,
          fireAt: zonedWallTimeToEpoch(date.year, date.month, date.day, prefs.h, prefs.m, tz),
          payload: {
            title: slot === 'morning' ? msgs.morningTitle : msgs.eveningTitle,
            body: slot === 'morning' ? msgs.morningBody : msgs.eveningBody,
            tag: `push-${notificationId}`,
            url: `/adhkar?set=${slot}`,
          },
          ttlSeconds: 2 * 60 * 60,
        })
      }
    }
  }

  return out
}

/**
 * Notifications due now: fire time within (now − windowMs, now] and not sent
 * yet. Sorted by fire time.
 */
export function planDispatch(
  records: readonly PushRecord[],
  now: number,
  lookup: TimingsLookup,
  windowMs: number = DISPATCH_WINDOW_MS,
): PlannedSend[] {
  const due: PlannedSend[] = []
  for (const record of records) {
    const seen = new Set<string>()
    for (const c of candidatesFor(record, now, lookup)) {
      if (c.fireAt > now || c.fireAt <= now - windowMs) continue
      if (record.sent[c.notificationId] || seen.has(c.notificationId)) continue
      seen.add(c.notificationId)
      due.push(c)
    }
  }
  return due.sort((a, b) => a.fireAt - b.fireAt)
}
