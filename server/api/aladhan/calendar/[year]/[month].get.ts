/**
 * Proxy: Aladhan /calendar/{year}/{month} — monthly prayer timings.
 *
 * Query: latitude, longitude, method
 * Cached for 24h per (year, month, lat, lng, method) tuple.
 */

import { aladhanFetch, parseIntParam } from '~~/server/utils/aladhan'

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
  }>
}

export default defineCachedEventHandler(async (event) => {
  const year = parseIntParam(getRouterParam(event, 'year'), 'year', 2000, 2100)
  const month = parseIntParam(getRouterParam(event, 'month'), 'month', 1, 12)

  const query = getQuery(event)
  const latitude = Number(query.latitude)
  const longitude = Number(query.longitude)
  const method = Number(query.method ?? 13)

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw createError({ statusCode: 400, statusMessage: 'invalid_coordinates' })
  }

  return aladhanFetch<AladhanCalendarResponse>(event, `/calendar/${year}/${month}`, {
    latitude,
    longitude,
    method,
  })
}, {
  maxAge: 60 * 60 * 24, // 24h
  swr: true,
  getKey: (event) => {
    const q = getQuery(event)
    const year = getRouterParam(event, 'year')
    const month = getRouterParam(event, 'month')
    // Round coordinates so a small drift doesn't bust the cache
    const lat = Number(q.latitude).toFixed(2)
    const lng = Number(q.longitude).toFixed(2)
    const method = String(q.method ?? 13)
    return `aladhan:calendar:${year}-${month}:${lat},${lng}:m${method}`
  },
})
