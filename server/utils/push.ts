/**
 * Server-side Web Push helpers: VAPID config, subscriber storage, request
 * guards (body size, rate limit) and sending via `web-push`.
 *
 * Storage: Nitro mount `push` (fs driver, ./.data/push — see nuxt.config.ts).
 * One item per subscription, keyed by sha256(endpoint). See PushRecord in
 * shared/push/types.ts for the exact (minimal) data stored.
 */
import { createHash } from 'node:crypto'
import type { H3Event } from 'h3'
import webpush from 'web-push'
import { PUSH_MAX_BODY_BYTES } from '../../shared/push/validate'
import type { PushPayload, PushRecord, PushSubscriptionData } from '../../shared/push/types'

/** Hard cap on stored subscriptions (protects the disk from abuse). */
export const PUSH_MAX_SUBSCRIPTIONS = 50_000

export interface VapidConfig {
  enabled: boolean
  publicKey: string
  privateKey: string
  subject: string
}

/** VAPID config from runtimeConfig; `enabled` is false unless all three values are set. */
export function getVapidConfig(event?: H3Event): VapidConfig {
  const config = useRuntimeConfig(event)
  const publicKey = String(config.public.vapidPublicKey || '').trim()
  const privateKey = String(config.vapidPrivateKey || '').trim()
  const subject = String(config.vapidSubject || '').trim()
  const enabled = !!publicKey && !!privateKey && /^(mailto:|https:\/\/)/.test(subject)
  return { enabled, publicKey, privateKey, subject }
}

/** Throws 503 { enabled: false } when push isn't configured on this server. */
export function requirePushEnabled(event: H3Event): VapidConfig {
  const config = getVapidConfig(event)
  if (!config.enabled) {
    throw createError({ statusCode: 503, statusMessage: 'push_disabled', data: { enabled: false } })
  }
  return config
}

export function pushStorage() {
  return useStorage<PushRecord>('push')
}

/** Storage key of a subscription: sha256(endpoint), hex. */
export function subscriptionId(endpoint: string): string {
  return createHash('sha256').update(endpoint).digest('hex')
}

/**
 * Read and JSON-parse a small request body. Rejects bodies above
 * PUSH_MAX_BODY_BYTES (413), non-JSON content (415) and invalid JSON (400).
 */
export async function readPushBody(event: H3Event): Promise<unknown> {
  const declared = Number(getRequestHeader(event, 'content-length') || 0)
  if (declared > PUSH_MAX_BODY_BYTES) throw createError({ statusCode: 413, statusMessage: 'body_too_large' })
  const type = getRequestHeader(event, 'content-type') || ''
  if (!type.includes('application/json')) throw createError({ statusCode: 415, statusMessage: 'json_required' })

  const raw = await readRawBody(event, 'utf8')
  if (!raw) throw createError({ statusCode: 400, statusMessage: 'invalid_body' })
  if (Buffer.byteLength(raw, 'utf8') > PUSH_MAX_BODY_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'body_too_large' })
  }
  try {
    return JSON.parse(raw) as unknown
  }
  catch {
    throw createError({ statusCode: 400, statusMessage: 'invalid_json' })
  }
}

// ---------------------------------------------------------------------------
// Rate limiting (in-memory, per instance — good enough for a single node)
// ---------------------------------------------------------------------------

const buckets = new Map<string, { count: number, resetAt: number }>()
let lastSweep = 0

/**
 * Fixed-window rate limit per client IP and bucket name. Throws 429 when
 * exceeded.
 */
export function enforceRateLimit(event: H3Event, bucket: string, limit: number, windowMs: number): void {
  const now = Date.now()
  if (now - lastSweep > 60_000) {
    lastSweep = now
    for (const [key, entry] of buckets) if (entry.resetAt <= now) buckets.delete(key)
  }
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const key = `${bucket}:${ip}`
  const entry = buckets.get(key)
  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return
  }
  entry.count++
  if (entry.count > limit) {
    setResponseHeader(event, 'Retry-After', Math.ceil((entry.resetAt - now) / 1000))
    throw createError({ statusCode: 429, statusMessage: 'rate_limited' })
  }
}

// ---------------------------------------------------------------------------
// Sending
// ---------------------------------------------------------------------------

export type SendResult = 'ok' | 'gone' | 'error'

/**
 * Send one push message. 404/410 from the push service mean the subscription
 * is dead ('gone' — caller deletes it); everything else non-2xx is 'error'.
 */
export async function sendPush(
  subscription: PushSubscriptionData,
  payload: PushPayload,
  vapid: VapidConfig,
  options: { ttlSeconds?: number, urgency?: 'normal' | 'high' } = {},
): Promise<SendResult> {
  try {
    await webpush.sendNotification(
      { endpoint: subscription.endpoint, keys: subscription.keys },
      JSON.stringify(payload),
      {
        vapidDetails: { subject: vapid.subject, publicKey: vapid.publicKey, privateKey: vapid.privateKey },
        TTL: options.ttlSeconds ?? 600,
        urgency: options.urgency ?? 'high',
        timeout: 10_000,
      },
    )
    return 'ok'
  }
  catch (err) {
    const status = (err as { statusCode?: number }).statusCode
    if (status === 404 || status === 410) return 'gone'
    console.warn('[push] send failed', status ?? '', (err as Error).message)
    return 'error'
  }
}
