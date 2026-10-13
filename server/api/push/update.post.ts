/**
 * POST /api/push/update
 * Body: { endpoint, prefs: PushPrefs } → { id }
 *
 * Replaces the reminder preferences of an existing subscriber. Possession of
 * the (secret, unguessable) push endpoint authenticates the caller.
 * 404 when unknown — the client then re-subscribes.
 */
import type { PushRecord } from '~~/shared/push/types'
import { validateUpdateBody } from '~~/shared/push/validate'
import { enforceRateLimit, pushStorage, readPushBody, requirePushEnabled, subscriptionId } from '~~/server/utils/push'

export default defineEventHandler(async (event) => {
  requirePushEnabled(event)
  enforceRateLimit(event, 'push-write', 60, 10 * 60_000)

  const parsed = validateUpdateBody(await readPushBody(event))
  if (!parsed.ok) throw createError({ statusCode: 400, statusMessage: parsed.error })

  const id = subscriptionId(parsed.value.endpoint)
  const storage = pushStorage()
  const existing = await storage.getItem<PushRecord>(id)
  if (!existing) throw createError({ statusCode: 404, statusMessage: 'not_found' })

  const record: PushRecord = {
    ...existing,
    ...parsed.value.prefs,
    id,
    subscription: existing.subscription,
    updatedAt: Date.now(),
  }
  await storage.setItem(id, record)
  return { id }
})
