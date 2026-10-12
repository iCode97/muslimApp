/**
 * Small pure date helpers for the Islamic calendar (ISO `YYYY-MM-DD` strings, UTC arithmetic).
 */
import { addDaysIso } from './ics'

function utcFromIso(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number)
  return Date.UTC(y!, m! - 1, d!)
}

/** Build an ISO date from numeric parts. */
export function toIso(year: number, month: number, day: number): string {
  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

/** Local "today" as ISO date (not UTC — the user's calendar day). */
export function todayIso(now = new Date()): string {
  return toIso(now.getFullYear(), now.getMonth() + 1, now.getDate())
}

/** Whole days from `fromIso` to `toIso` (negative when `toIso` is earlier). */
export function daysBetweenIso(fromIso: string, toIsoDate: string): number {
  return Math.round((utcFromIso(toIsoDate) - utcFromIso(fromIso)) / 86_400_000)
}

/** 0 = Sunday … 6 = Saturday for an ISO date. */
export function weekdayOfIso(iso: string): number {
  return new Date(utcFromIso(iso)).getUTCDay()
}

/** First Friday on or after the given ISO date. */
export function firstFridayOnOrAfter(iso: string): string {
  const dow = weekdayOfIso(iso)
  return addDaysIso(iso, (5 - dow + 7) % 7)
}

/** `DD.MM.YYYY` display string for an ISO date. */
export function isoToDisplay(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}
