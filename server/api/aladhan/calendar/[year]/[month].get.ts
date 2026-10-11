/**
 * Proxy: Aladhan /calendar/{year}/{month} — monthly prayer timings.
 *
 * Query (whitelisted, see normalizeCalendarQuery):
 *   latitude, longitude          required
 *   method                       0–23, default 13 (Diyanet)
 *   school                       0 = Standard, 1 = Hanafi
 *   latitudeAdjustmentMethod     0 = none, 1 = middle of night, 2 = one seventh, 3 = angle based
 *   tune                         9 comma-separated minute offsets
 *                                (Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight)
 *
 * Cached for 24h per (year, month, rounded coordinates, all calculation params).
 */

import {
  aladhanFetch,
  calendarQueryCacheKey,
  normalizeCalendarQuery,
  parseIntParam,
} from '~~/server/utils/aladhan'

interface AladhanCalendarResponse {
  data: Array<{
    timings: Record<string, string>
    date: {
      gregorian: { date: string }
      hijri: {
        day: string
        month: { en: string, ar: string, number: number }
        year: string
        designation: { abbreviated: string }
      }
    }
    meta: {
      /** IANA timezone of the location, e.g. "Europe/Berlin" */
      timezone: string
    }
  }>
}

export default defineCachedEventHandler(async (event) => {
  const year = parseIntParam(getRouterParam(event, 'year'), 'year', 2000, 2100)
  const month = parseIntParam(getRouterParam(event, 'month'), 'month', 1, 12)

  const parsed = normalizeCalendarQuery(getQuery(event))
  if (!parsed.ok) {
    throw createError({ statusCode: 400, statusMessage: parsed.error })
  }

  const q = parsed.value
  return aladhanFetch<AladhanCalendarResponse>(event, `/calendar/${year}/${month}`, {
    latitude: q.latitude,
    longitude: q.longitude,
    method: q.method,
    school: q.school,
    latitudeAdjustmentMethod: q.latitudeAdjustmentMethod,
    tune: q.tune,
  })
}, {
  maxAge: 60 * 60 * 24, // 24h
  swr: true,
  getKey: (event) => {
    const year = getRouterParam(event, 'year')
    const month = getRouterParam(event, 'month')
    const parsed = normalizeCalendarQuery(getQuery(event))
    // Invalid queries are rejected by the handler; give them a throwaway key
    const params = parsed.ok ? calendarQueryCacheKey(parsed.value) : `invalid:${parsed.error}`
    return `aladhan:calendar:${year}-${month}:${params}`
  },
})
