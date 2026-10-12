/**
 * POST /api/push/subscribe
 * Body: { subscription: PushSubscriptionJSON, prefs: PushPrefs }
 *    or { subscription, oldEndpoint }   (service worker `pushsubscriptionchange`:
 *                                         prefs are moved over from the old record)
 * → { id, enabled: true }
 *
 * Upserts the subscriber (keyed by sha256(endpoint)). Idempotent: the client
 * calls it on enable and whenever the browser subscription changes.
 */
import type { PushPrefs, PushRecord } from '~~/shared/push/types'
import { validateSubscribeBody } from '~~/shared/push/validate'
import {
  PUSH_MAX_SUBSCRIPTIONS,
  enforceRateLimit,
  pushStorage,
  readPushBody,
  requirePushEnabled,
  subscriptionId,
} from '~~/server/utils/push'

export default defineEventHandler(async (event) => {
  requirePushEnabled(event)
  enforceRateLimit(event, 'push-write', 60, 10 * 60_000)

  const parsed = validateSubscribeBody(await readPushBody(event))
  if (!parsed.ok) throw createError({ statusCode: 400, statusMessage: parsed.error })

  const { subscription, oldEndpoint } = parsed.value
  const id = subscriptionId(subscription.endpoint)
  const storage = pushStorage()
  const existing = await storage.getItem<PushRecord>(id)

  // Migration from a rotated subscription: take the prefs of the old record
  const oldId = oldEndpoint ? subscriptionId(oldEndpoint) : null
  const old = oldId && oldId !== id ? await storage.getItem<PushRecord>(oldId) : null
  let prefs: PushPrefs | null = parsed.value.prefs
  if (!prefs && old) {
    const { id: _id, subscription: _sub, createdAt: _c, updatedAt: _u, sent: _s, ...oldPrefs } = old
    prefs = oldPrefs
  }
  if (!prefs) throw createError({ statusCode: 404, statusMessage: 'not_found' })

  if (!existing && !old && (await storage.getKeys()).length >= PUSH_MAX_SUBSCRIPTIONS) {
    throw createError({ statusCode: 503, statusMessage: 'push_capacity' })
  }

  const now = Date.now()
  const record: PushRecord = {
    ...prefs,
    id,
    subscription,
    createdAt: existing?.createdAt ?? old?.createdAt ?? now,
    updatedAt: now,
    sent: { ...old?.sent, ...existing?.sent },
  }
  await storage.setItem(id, record)
  if (old && oldId) await storage.removeItem(oldId)
  return { id, enabled: true }
})
