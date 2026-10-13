/**
 * POST /api/push/test
 * Body: { endpoint } → { ok: true }
 *
 * Sends a test notification to an existing subscriber (max. one per 30s per
 * subscription, plus a per-IP limit). 404 unknown subscriber, 410 when the
 * push service reports the subscription as expired (it is deleted then).
 */
import type { PushRecord } from '~~/shared/push/types'
import { pushMessages } from '~~/shared/push/messages'
import { validateEndpointBody } from '~~/shared/push/validate'
import {
  enforceRateLimit,
  pushStorage,
  readPushBody,
  requirePushEnabled,
  sendPush,
  subscriptionId,
} from '~~/server/utils/push'

const COOLDOWN_MS = 30_000
const lastTest = new Map<string, number>()

export default defineEventHandler(async (event) => {
  const vapid = requirePushEnabled(event)
  enforceRateLimit(event, 'push-test', 10, 10 * 60_000)

  const parsed = validateEndpointBody(await readPushBody(event))
  if (!parsed.ok) throw createError({ statusCode: 400, statusMessage: parsed.error })

  const id = subscriptionId(parsed.value.endpoint)
  const storage = pushStorage()
  const record = await storage.getItem<PushRecord>(id)
  if (!record) throw createError({ statusCode: 404, statusMessage: 'not_found' })

  const now = Date.now()
  if ((lastTest.get(id) ?? 0) > now - COOLDOWN_MS) {
    throw createError({ statusCode: 429, statusMessage: 'rate_limited' })
  }
  lastTest.set(id, now)
  if (lastTest.size > 10_000) lastTest.clear()

  const msgs = pushMessages(record.locale)
  const result = await sendPush(record.subscription, {
    title: msgs.testTitle,
    body: msgs.testBody,
    tag: 'muslimapp-test',
    url: '/settings',
  }, vapid, { ttlSeconds: 60 })

  if (result === 'gone') {
    await storage.removeItem(id)
    throw createError({ statusCode: 410, statusMessage: 'subscription_gone' })
  }
  if (result === 'error') throw createError({ statusCode: 502, statusMessage: 'push_send_failed' })
  return { ok: true }
})
