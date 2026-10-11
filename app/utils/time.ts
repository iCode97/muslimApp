/**
 * Pure, timezone-aware date/time helpers built on `Intl` (no dependencies).
 *
 * Prayer times from Aladhan are wall-clock strings ("HH:mm") in the IANA
 * timezone of the *location* (e.g. "Europe/Istanbul"), not of the device. To
 * compute correct countdowns we have to convert "wall-clock time in zone X"
 * into an absolute epoch timestamp — independent of the device timezone and
 * correct across DST transitions. These helpers do exactly that.
 *
 * Conventions:
 *   - All months are 1-based (1 = January), like on a calendar.
 *   - All functions are pure (apart from a memoised Intl formatter cache) and
 *     take `now` / epoch values as explicit arguments where relevant, so they
 *     are trivially unit-testable.
 */

/** A calendar date without time or zone. `month` is 1-based. */
export interface YMD {
  year: number
  month: number
  day: number
}

/** Wall-clock components of an instant in a specific timezone. */
export interface ZonedParts extends YMD {
  hour: number
  minute: number
  second: number
}

const MS_PER_DAY = 86_400_000

// Creating Intl.DateTimeFormat instances is comparatively expensive — memoise
// one formatter per timezone. This does not affect purity of the results.
const formatterCache = new Map<string, Intl.DateTimeFormat>()

function getFormatter(timeZone: string): Intl.DateTimeFormat {
  let formatter = formatterCache.get(timeZone)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    formatterCache.set(timeZone, formatter)
  }
  return formatter
}

/** True if `tz` is a non-empty IANA timezone identifier supported by this runtime. */
export function isValidTimeZone(tz: unknown): tz is string {
  if (typeof tz !== 'string' || !tz) return false
  try {
    getFormatter(tz)
    return true
  }
  catch {
    return false
  }
}

/** The device's IANA timezone (falls back to "UTC" if the runtime can't tell). */
export function deviceTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  }
  catch {
    return 'UTC'
  }
}

/** Returns `tz` if valid, otherwise the device timezone. */
export function resolveTimeZone(tz?: string | null): string {
  return isValidTimeZone(tz) ? tz : deviceTimeZone()
}

/** Wall-clock components of `epochMs` as seen in `timeZone`. */
export function wallClockInZone(epochMs: number, timeZone: string): ZonedParts {
  const parts = getFormatter(timeZone).formatToParts(new Date(epochMs))
  const get = (type: Intl.DateTimeFormatPartTypes): number => {
    const part = parts.find(p => p.type === type)
    return part ? Number(part.value) : 0
  }
  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
    // Some older engines emit "24" for midnight even with hourCycle h23
    hour: get('hour') % 24,
    minute: get('minute'),
    second: get('second'),
  }
}

/**
 * UTC offset of `timeZone` at instant `epochMs`, in milliseconds
 * (e.g. +7_200_000 for Europe/Berlin in summer).
 */
export function timeZoneOffsetMs(epochMs: number, timeZone: string): number {
  const p = wallClockInZone(epochMs, timeZone)
  const wallAsUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second)
  // Intl has second precision — drop sub-second part of the instant
  const flooredEpoch = Math.floor(epochMs / 1000) * 1000
  return wallAsUtc - flooredEpoch
}

/**
 * Convert a wall-clock time in `timeZone` to an epoch timestamp (ms).
 *
 * Overflowing components are normalised like `Date.UTC` does
 * (e.g. hour 24 → 00:00 of the next day, minute -5 → previous hour).
 *
 * DST handling (same semantics as Temporal's `disambiguation: 'compatible'`):
 *   - Ambiguous times (clocks fall back, the wall time occurs twice) resolve
 *     to the *earlier* instant.
 *   - Non-existent times (clocks spring forward, the wall time is skipped)
 *     are shifted forward by the length of the gap
 *     (Europe/Berlin 2026-03-29 02:30 → 03:30 CEST).
 *
 * Assumes at most one offset transition within ±24h of the requested time,
 * which holds for all real-world timezones.
 *
 * @param month 1-based month
 */
export function zonedWallTimeToEpoch(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): number {
  // The requested wall time, encoded as if it were UTC
  const wallAsUtc = Date.UTC(year, month - 1, day, hour, minute, 0)

  const offsetBefore = timeZoneOffsetMs(wallAsUtc - MS_PER_DAY, timeZone)
  const offsetAfter = timeZoneOffsetMs(wallAsUtc + MS_PER_DAY, timeZone)

  // A candidate instant is valid if the zone's offset at that instant is the
  // offset we used to derive it (i.e. it really shows the requested wall time).
  const candidates = [wallAsUtc - offsetBefore, wallAsUtc - offsetAfter]
  const valid = candidates.filter(t => timeZoneOffsetMs(t, timeZone) === wallAsUtc - t)

  if (valid.length > 0) return Math.min(...valid)

  // Spring-forward gap: interpret with the pre-transition offset, which moves
  // the result forward by the gap length.
  return wallAsUtc - offsetBefore
}

/** The current calendar date in `timeZone`. */
export function todayInZone(timeZone: string, now: number = Date.now()): YMD {
  const { year, month, day } = wallClockInZone(now, timeZone)
  return { year, month, day }
}

/** Add (or subtract) whole calendar days to a date. */
export function addDays(date: YMD, days: number): YMD {
  const d = new Date(Date.UTC(date.year, date.month - 1, date.day + days))
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() }
}

/** Whole calendar days from `from` to `to` (negative if `to` is earlier). */
export function daysBetween(from: YMD, to: YMD): number {
  const a = Date.UTC(from.year, from.month - 1, from.day)
  const b = Date.UTC(to.year, to.month - 1, to.day)
  return Math.round((b - a) / MS_PER_DAY)
}

/** Epoch ms of the next local midnight (start of tomorrow) in `timeZone`. */
export function startOfNextDayInZone(timeZone: string, now: number = Date.now()): number {
  const tomorrow = addDays(todayInZone(timeZone, now), 1)
  return zonedWallTimeToEpoch(tomorrow.year, tomorrow.month, tomorrow.day, 0, 0, timeZone)
}

/** Format a date as "DD-MM-YYYY" (Aladhan's date format). */
export function formatDdMmYyyy(date: YMD): string {
  const dd = String(date.day).padStart(2, '0')
  const mm = String(date.month).padStart(2, '0')
  return `${dd}-${mm}-${date.year}`
}

/** Parse "DD-MM-YYYY" into a date, or null if malformed. */
export function parseDdMmYyyy(value: string): YMD | null {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value)
  if (!match) return null
  return { day: Number(match[1]), month: Number(match[2]), year: Number(match[3]) }
}

/** Month identifier "YYYY-MM" for a date (used as cache key). */
export function monthKey(date: YMD): string {
  return `${date.year}-${String(date.month).padStart(2, '0')}`
}

/**
 * Parse a wall-clock string like "05:12" or "05:12 (CEST)" into hours/minutes.
 * Returns null if the string isn't a valid 24h time.
 */
export function parseHHmm(value: string): { hour: number, minute: number } | null {
  const match = /^\s*(\d{1,2}):(\d{2})/.exec(value)
  if (!match) return null
  const hour = Number(match[1])
  const minute = Number(match[2])
  if (hour > 23 || minute > 59) return null
  return { hour, minute }
}

/** Format hours/minutes as zero-padded "HH:mm". */
export function formatHHmm(hour: number, minute: number): string {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

/**
 * Hijri (Islamic) calendar date of an instant in `timeZone`, computed locally
 * via Intl (default: Umm al-Qura calendar). Useful as an offline fallback when
 * no API-provided Hijri date is available. Returns null if the runtime lacks
 * Islamic calendar support.
 */
export function hijriDateInZone(
  epochMs: number,
  timeZone: string,
  calendar: 'islamic-umalqura' | 'islamic-civil' | 'islamic' = 'islamic-umalqura',
): YMD | null {
  try {
    const parts = new Intl.DateTimeFormat(`en-u-ca-${calendar}-nu-latn`, {
      timeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).formatToParts(new Date(epochMs))
    const get = (type: Intl.DateTimeFormatPartTypes) => {
      const part = parts.find(p => p.type === type)
      return part ? Number.parseInt(part.value, 10) : Number.NaN
    }
    const result = { year: get('year'), month: get('month'), day: get('day') }
    if (!Number.isFinite(result.year) || !Number.isFinite(result.month) || !Number.isFinite(result.day)) return null
    return result
  }
  catch {
    return null
  }
}
