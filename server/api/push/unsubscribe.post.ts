/**
 * POST /api/push/unsubscribe
 * Body: { endpoint } → { ok: true }
 *
 * Deletes the subscriber and all stored data immediately. Idempotent and
 * available even when push is disabled server-side (deletion must always work).
 */
import { validateEndpointBody } from '~~/shared/push/validate'
import { enforceRateLimit, pushStorage, readPushBody, subscriptionId } from '~~/server/utils/push'

export default defineEventHandler(async (event) => {
  enforceRateLimit(event, 'push-write', 60, 10 * 60_000)

  const parsed = validateEndpointBody(await readPushBody(event))
  if (!parsed.ok) throw createError({ statusCode: 400, statusMessage: parsed.error })

  await pushStorage().removeItem(subscriptionId(parsed.value.endpoint))
  return { ok: true }
})
