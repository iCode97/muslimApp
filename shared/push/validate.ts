/**
 * Strict validation for the push API request bodies. Pure — used by the Nitro
 * handlers and unit-tested directly.
 *
 * Only whitelisted fields survive (unknown keys are dropped, never stored).
 * Coordinates are rounded to 2 decimals (~1 km) before storage.
 */
import { isValidTimeZone } from '../time'
import {
  PUSH_ADJUSTABLE_PRAYERS,
  PUSH_LOCALES,
  PUSH_MAX_ADJUSTMENT,
  PUSH_MAX_MINUTES_BEFORE,
  PUSH_PRAYERS,
  type DhikrSlotPrefs,
  type PushAdjustments,
  type PushLocale,
  type PushPrefs,
  type PushPrayer,
  type PushSubscriptionData,
} from './types'

export type ValidationResult<T> = { ok: true, value: T } | { ok: false, error: string }

const ok = <T>(value: T): ValidationResult<T> => ({ ok: true, value })
const fail = <T>(error: string): ValidationResult<T> => ({ ok: false, error })

/** Max. accepted request body size for push endpoints (bytes). */
export const PUSH_MAX_BODY_BYTES = 8 * 1024
const MAX_ENDPOINT_LENGTH = 2048

/**
 * Push services we are willing to POST to. Prevents the server from being
 * abused as an SSRF proxy via a forged "endpoint".
 *   - Chrome/Edge/Opera/Samsung (FCM): fcm.googleapis.com (+ legacy android.googleapis.com)
 *   - Firefox (autopush): updates.push.services.mozilla.com
 *   - Safari / iOS 16.4+: web.push.apple.com
 *   - Legacy Edge (WNS): *.notify.windows.com
 */
const ALLOWED_PUSH_HOST_SUFFIXES = [
  'googleapis.com',
  'push.services.mozilla.com',
  'push.apple.com',
  'notify.windows.com',
]

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value)
}

function isInt(value: unknown, min: number, max: number): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= min && value <= max
}

/** Round a coordinate to 2 decimals (~1.1 km at the equator). */
export function roundCoord(value: number): number {
  return Math.round(value * 100) / 100
}

/** True for an https URL on a known push service host. */
export function isAllowedPushEndpoint(endpoint: unknown): endpoint is string {
  if (typeof endpoint !== 'string' || endpoint.length > MAX_ENDPOINT_LENGTH) return false
  let url: URL
  try {
    url = new URL(endpoint)
  }
  catch {
    return false
  }
  if (url.protocol !== 'https:' || url.username || url.password || url.port) return false
  const host = url.hostname.toLowerCase()
  return ALLOWED_PUSH_HOST_SUFFIXES.some(suffix => host === suffix || host.endsWith(`.${suffix}`))
}

function isTimeZoneId(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 64 && /^[\w+\-/]+$/.test(value) && isValidTimeZone(value)
}

const BASE64URL = /^[\w-]+={0,2}$/

export function validateSubscription(raw: unknown): ValidationResult<PushSubscriptionData> {
  if (!isRecord(raw)) return fail('invalid_subscription')
  if (!isAllowedPushEndpoint(raw.endpoint)) return fail('invalid_endpoint')

  const exp = raw.expirationTime
  if (exp !== undefined && exp !== null && !(typeof exp === 'number' && Number.isFinite(exp) && exp >= 0)) {
    return fail('invalid_expiration')
  }

  const keys = raw.keys
  if (!isRecord(keys)) return fail('invalid_keys')
  const { p256dh, auth } = keys
  if (typeof p256dh !== 'string' || p256dh.length < 16 || p256dh.length > 200 || !BASE64URL.test(p256dh)) {
    return fail('invalid_keys')
  }
  if (typeof auth !== 'string' || auth.length < 8 || auth.length > 64 || !BASE64URL.test(auth)) {
    return fail('invalid_keys')
  }

  return ok({
    endpoint: raw.endpoint,
    expirationTime: typeof exp === 'number' ? exp : null,
    keys: { p256dh, auth },
  })
}

/** Validate just an endpoint (update / unsubscribe / test bodies). */
export function validateEndpoint(raw: unknown): ValidationResult<string> {
  return isAllowedPushEndpoint(raw) ? ok(raw) : fail('invalid_endpoint')
}

function validateSlot(raw: unknown): DhikrSlotPrefs | null {
  if (!isRecord(raw)) return null
  if (typeof raw.enabled !== 'boolean' || !isInt(raw.h, 0, 23) || !isInt(raw.m, 0, 59)) return null
  return { enabled: raw.enabled, h: raw.h, m: raw.m }
}

export function validatePrefs(raw: unknown): ValidationResult<PushPrefs> {
  if (!isRecord(raw)) return fail('invalid_prefs')

  // locale
  if (!PUSH_LOCALES.includes(raw.locale as PushLocale)) return fail('invalid_locale')
  const locale = raw.locale as PushLocale

  if (!isTimeZoneId(raw.timezone)) return fail('invalid_timezone')
  const timezone = raw.timezone

  // location (nullable)
  let location: PushPrefs['location'] = null
  if (raw.location !== null && raw.location !== undefined) {
    const loc = raw.location
    if (!isRecord(loc)) return fail('invalid_location')
    const { lat, lng, timezone } = loc
    if (typeof lat !== 'number' || !Number.isFinite(lat) || Math.abs(lat) > 90
      || typeof lng !== 'number' || !Number.isFinite(lng) || Math.abs(lng) > 180) {
      return fail('invalid_location')
    }
    if (!isTimeZoneId(timezone)) return fail('invalid_timezone')
    location = { lat: roundCoord(lat), lng: roundCoord(lng), timezone }
  }

  // prayer calculation params
  const pp = raw.prayerParams
  if (!isRecord(pp)) return fail('invalid_prayer_params')
  if (!isInt(pp.method, 0, 23)) return fail('invalid_method')
  if (pp.school !== 0 && pp.school !== 1) return fail('invalid_school')
  const lam = pp.latitudeAdjustmentMethod
  if (lam !== null && lam !== undefined && lam !== 0 && lam !== 1 && lam !== 2 && lam !== 3) {
    return fail('invalid_latitude_adjustment')
  }
  if (!isRecord(pp.adjustments)) return fail('invalid_adjustments')
  const adjustments = {} as PushAdjustments
  for (const key of PUSH_ADJUSTABLE_PRAYERS) {
    const v = pp.adjustments[key] ?? 0
    if (!isInt(v, -PUSH_MAX_ADJUSTMENT, PUSH_MAX_ADJUSTMENT)) return fail('invalid_adjustments')
    adjustments[key] = v
  }

  // prayer reminders
  if (typeof raw.prayersEnabled !== 'boolean') return fail('invalid_prayers_enabled')
  if (!isRecord(raw.prayers)) return fail('invalid_prayers')
  const prayers = {} as Record<PushPrayer, boolean>
  for (const key of PUSH_PRAYERS) {
    const v = raw.prayers[key]
    if (typeof v !== 'boolean') return fail('invalid_prayers')
    prayers[key] = v
  }
  if (!isInt(raw.minutesBefore, 0, PUSH_MAX_MINUTES_BEFORE)) return fail('invalid_minutes_before')

  // dhikr reminders
  const d = raw.dhikr
  if (!isRecord(d) || typeof d.enabled !== 'boolean') return fail('invalid_dhikr')
  const morning = validateSlot(d.morning)
  const evening = validateSlot(d.evening)
  if (!morning || !evening) return fail('invalid_dhikr')

  return ok({
    locale,
    timezone,
    location,
    prayerParams: {
      method: pp.method,
      school: pp.school,
      latitudeAdjustmentMethod: lam ?? null,
      adjustments,
    },
    prayersEnabled: raw.prayersEnabled,
    prayers,
    minutesBefore: raw.minutesBefore,
    dhikr: { enabled: d.enabled, morning, evening },
  })
}

export interface SubscribeBody {
  subscription: PushSubscriptionData
  /** Required unless `oldEndpoint` is given (prefs are then copied from the old record) */
  prefs: PushPrefs | null
  /** Set by the service worker on `pushsubscriptionchange` to migrate a record */
  oldEndpoint: string | null
}

/** POST /api/push/subscribe body: { subscription, prefs } or { subscription, oldEndpoint } */
export function validateSubscribeBody(raw: unknown): ValidationResult<SubscribeBody> {
  if (!isRecord(raw)) return fail('invalid_body')
  const subscription = validateSubscription(raw.subscription)
  if (!subscription.ok) return subscription

  let oldEndpoint: string | null = null
  if (raw.oldEndpoint !== undefined && raw.oldEndpoint !== null) {
    const old = validateEndpoint(raw.oldEndpoint)
    if (!old.ok) return old
    oldEndpoint = old.value
  }

  if ((raw.prefs === undefined || raw.prefs === null) && oldEndpoint) {
    return ok({ subscription: subscription.value, prefs: null, oldEndpoint })
  }
  const prefs = validatePrefs(raw.prefs)
  if (!prefs.ok) return prefs
  return ok({ subscription: subscription.value, prefs: prefs.value, oldEndpoint })
}

/** POST /api/push/update body: { endpoint, prefs } */
export function validateUpdateBody(raw: unknown): ValidationResult<{ endpoint: string, prefs: PushPrefs }> {
  if (!isRecord(raw)) return fail('invalid_body')
  const endpoint = validateEndpoint(raw.endpoint)
  if (!endpoint.ok) return endpoint
  const prefs = validatePrefs(raw.prefs)
  if (!prefs.ok) return prefs
  return ok({ endpoint: endpoint.value, prefs: prefs.value })
}

/** POST /api/push/unsubscribe and /api/push/test body: { endpoint } */
export function validateEndpointBody(raw: unknown): ValidationResult<{ endpoint: string }> {
  if (!isRecord(raw)) return fail('invalid_body')
  const endpoint = validateEndpoint(raw.endpoint)
  if (!endpoint.ok) return endpoint
  return ok({ endpoint: endpoint.value })
}
