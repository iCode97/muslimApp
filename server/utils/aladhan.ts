/**
 * Shared helpers for Aladhan proxy routes.
 *
 * All Aladhan calls are proxied through Nitro so we can:
 *   - cache server-side (shared across users/devices)
 *   - apply consistent timeouts and error handling
 *   - keep the upstream base URL off the client bundle
 *   - whitelist & validate query parameters before forwarding them
 */

/** Upstream Aladhan base URL (server-only runtimeConfig, override via NUXT_ALADHAN_BASE_URL). */
export function aladhanBaseUrl(event: Parameters<typeof useRuntimeConfig>[0]): string {
  const config = useRuntimeConfig(event)
  return (config.aladhanBaseUrl as string | undefined) || 'https://api.aladhan.com/v1'
}

/**
 * Perform a proxied GET against Aladhan with a 10s timeout and normalised errors.
 * Callers should pass the already-interpolated upstream path (e.g. "/calendar/2026/4").
 */
export async function aladhanFetch<T>(
  event: Parameters<typeof useRuntimeConfig>[0],
  path: string,
  params?: Record<string, string | number | undefined>,
): Promise<T> {
  const base = aladhanBaseUrl(event)
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10_000)

  try {
    // The upstream URL is external, so Nitro's internal route typing doesn't
    // apply — the response shape is asserted by the caller via T.
    const response: unknown = await $fetch(`${base}${path}`, {
      params,
      signal: controller.signal,
      retry: 1,
      retryDelay: 500,
    })
    return response as T
  } catch (err) {
    const status = (err as { statusCode?: number } | undefined)?.statusCode ?? 502
    throw createError({
      statusCode: status,
      statusMessage: 'aladhan_upstream_error',
      data: {
        path,
        cause: (err as Error)?.message,
      },
    })
  } finally {
    clearTimeout(timeoutId)
  }
}

/** Validate that a string parameter is a positive integer in a range. */
export function parseIntParam(value: string | undefined, name: string, min: number, max: number): number {
  const n = Number(value)
  if (!Number.isInteger(n) || n < min || n > max) {
    throw createError({
      statusCode: 400,
      statusMessage: `invalid_param_${name}`,
    })
  }
  return n
}

/** Validate a "DD-MM-YYYY" date string used by Aladhan. */
export function parseDateParam(value: string | undefined, name: string): string {
  if (!value || !/^\d{2}-\d{2}-\d{4}$/.test(value)) {
    throw createError({
      statusCode: 400,
      statusMessage: `invalid_param_${name}`,
    })
  }
  return value
}

/** Aladhan's tune order: Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. */
export const ALADHAN_TUNE_LENGTH = 9
/** Maximum absolute minutes accepted per tune entry. */
export const ALADHAN_TUNE_MAX = 60

/** Validated query parameters for the /calendar proxy. */
export interface CalendarQuery {
  latitude: number
  longitude: number
  /** Aladhan calculation method id (0–23) */
  method: number
  /** Asr juristic method: 0 = Standard (Shafi'i/Maliki/Hanbali), 1 = Hanafi */
  school?: 0 | 1
  /** High-latitude rule: 0 = none, 1 = middle of night, 2 = one seventh, 3 = angle based */
  latitudeAdjustmentMethod?: 0 | 1 | 2 | 3
  /**
   * Comma-separated minute offsets in Aladhan's tune order (9 integers).
   * Note: for methods with built-in offsets (e.g. Diyanet) a non-zero entry
   * *replaces* the method's default offset for that prayer instead of adding to it.
   */
  tune?: string
}

export type CalendarQueryResult =
  | { ok: true, value: CalendarQuery }
  | { ok: false, error: string }

function isBlank(value: unknown): boolean {
  return value === undefined || value === null || value === ''
}

/**
 * Validate & normalise the /calendar proxy query. Only whitelisted parameters
 * survive, so arbitrary query strings can't be forwarded upstream or bust the
 * cache. Returns an error code instead of throwing so it can also be used by
 * the cache-key function.
 */
export function normalizeCalendarQuery(query: Record<string, unknown>): CalendarQueryResult {
  const latitude = Number(query.latitude)
  const longitude = Number(query.longitude)
  if (isBlank(query.latitude) || isBlank(query.longitude)
    || !Number.isFinite(latitude) || !Number.isFinite(longitude)
    || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
    return { ok: false, error: 'invalid_coordinates' }
  }

  const method = isBlank(query.method) ? 13 : Number(query.method)
  if (!Number.isInteger(method) || method < 0 || method > 23) {
    return { ok: false, error: 'invalid_param_method' }
  }

  // Round to ~1 km before fetching so the upstream request matches the shared cache key
  // (otherwise a cache hit could serve times computed for a different nearby point).
  const round2 = (n: number) => Math.round(n * 100) / 100
  const value: CalendarQuery = { latitude: round2(latitude), longitude: round2(longitude), method }

  if (!isBlank(query.school)) {
    const school = Number(query.school)
    if (school !== 0 && school !== 1) return { ok: false, error: 'invalid_param_school' }
    value.school = school
  }

  if (!isBlank(query.latitudeAdjustmentMethod)) {
    const lam = Number(query.latitudeAdjustmentMethod)
    if (lam !== 0 && lam !== 1 && lam !== 2 && lam !== 3) {
      return { ok: false, error: 'invalid_param_latitudeAdjustmentMethod' }
    }
    value.latitudeAdjustmentMethod = lam
  }

  if (!isBlank(query.tune)) {
    const parts = String(query.tune).split(',').map(p => p.trim())
    const valid = parts.length === ALADHAN_TUNE_LENGTH
      && parts.every(p => /^-?\d{1,3}$/.test(p) && Math.abs(Number(p)) <= ALADHAN_TUNE_MAX)
    if (!valid) return { ok: false, error: 'invalid_param_tune' }
    const nums = parts.map(Number)
    // An all-zero tune is identical to omitting it — drop it for better cache hits
    if (nums.some(n => n !== 0)) value.tune = nums.join(',')
  }

  return { ok: true, value }
}

/** Stable cache key for a normalised calendar query (coordinates rounded to ~1 km). */
export function calendarQueryCacheKey(q: CalendarQuery): string {
  return [
    `${q.latitude.toFixed(2)},${q.longitude.toFixed(2)}`,
    `m${q.method}`,
    `s${q.school ?? '-'}`,
    `l${q.latitudeAdjustmentMethod ?? '-'}`,
    `t${q.tune ?? '-'}`,
  ].join(':')
}
