/**
 * Proxy: Aladhan /gToH/{DD-MM-YYYY} — Gregorian → Hijri conversion.
 * Cached for 30d (purely astronomical, never changes for a given date).
 */

import { aladhanFetch, parseDateParam } from '~~/server/utils/aladhan'

interface GToHResponse {
  data: {
    hijri: {
      day: string
      month: { number: number, en: string, ar: string }
      year: string
    }
  }
}

export default defineCachedEventHandler(async (event) => {
  const date = parseDateParam(getRouterParam(event, 'date'), 'date')
  return aladhanFetch<GToHResponse>(event, `/gToH/${date}`)
}, {
  maxAge: 60 * 60 * 24 * 30, // 30d
  swr: true,
  getKey: event => `aladhan:gToH:${getRouterParam(event, 'date')}`,
})
