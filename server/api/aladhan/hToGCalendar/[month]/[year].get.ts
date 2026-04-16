/**
 * Proxy: Aladhan /hToGCalendar/{month}/{year} — full Hijri calendar month.
 * Cached for 30d (astronomical, stable for any given Hijri month/year).
 */

import { aladhanFetch, parseIntParam } from '~~/server/utils/aladhan'

interface HToGCalendarResponse {
  data: Array<{
    hijri: {
      day: string
      month: { number: number, en: string }
      year: string
      weekday: { en: string }
    }
    gregorian: {
      day: string
      month: { number: number }
      year: string
      weekday: { en: string }
    }
  }>
}

export default defineCachedEventHandler(async (event) => {
  const month = parseIntParam(getRouterParam(event, 'month'), 'month', 1, 12)
  const year = parseIntParam(getRouterParam(event, 'year'), 'year', 1300, 1600)
  return aladhanFetch<HToGCalendarResponse>(event, `/hToGCalendar/${month}/${year}`)
}, {
  maxAge: 60 * 60 * 24 * 30, // 30d
  swr: true,
  getKey: event => `aladhan:hToGCalendar:${getRouterParam(event, 'month')}-${getRouterParam(event, 'year')}`,
})
