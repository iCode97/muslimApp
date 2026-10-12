/**
 * GET /api/push/config → { enabled, publicKey }
 *
 * Always 200 so the client can probe cheaply; `enabled: false` when the server
 * has no VAPID keys configured (the app then falls back to local reminders).
 */
import type { PushConfigResponse } from '~~/shared/push/types'
import { getVapidConfig } from '~~/server/utils/push'

export default defineEventHandler((event): PushConfigResponse => {
  const config = getVapidConfig(event)
  setResponseHeader(event, 'Cache-Control', 'no-store')
  return { enabled: config.enabled, publicKey: config.enabled ? config.publicKey : null }
})
