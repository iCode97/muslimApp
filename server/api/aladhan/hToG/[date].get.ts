/**
 * Proxy: Aladhan /hToG/{DD-MM-YYYY} — Hijri → Gregorian conversion.
 * Cached for 30d (purely astronomical, never changes for a given date).
 */

import { aladhanFetch, parseDateParam } from '~~/server/utils/aladhan'

interface HToGResponse {
  data: {
    gregorian: {
      date: string
      day: string
      month: { number: number, en: string }
      year: string
    }
  }
}

export default defineCachedEventHandler(async (event) => {
  const date = parseDateParam(getRouterParam(event, 'date'), 'date')
  return aladhanFetch<HToGResponse>(event, `/hToG/${date}`)
}, {
  maxAge: 60 * 60 * 24 * 30, // 30d
  swr: true,
  getKey: event => `aladhan:hToG:${getRouterParam(event, 'date')}`,
})
