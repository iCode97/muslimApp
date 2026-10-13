/**
 * Minimal, standards-compliant iCalendar (RFC 5545) generator for all-day events.
 *
 * Pure functions only (no Nuxt/DOM access) so it can be unit-tested; the single
 * browser helper `downloadIcs` is guarded and only used from click handlers.
 */

export interface IcsEvent {
  /** Stable unique id — re-importing the same UID updates instead of duplicating. */
  uid: string
  summary: string
  description?: string
  /** First day, ISO `YYYY-MM-DD` (floating date, no time zone). */
  startDate: string
  /** Number of days the event spans (default 1). */
  days?: number
}

export interface IcsOptions {
  calendarName?: string
  prodId?: string
  /** Timestamp for DTSTAMP (defaults to now; injectable for tests). */
  now?: Date
}

const CRLF = '\r\n'
const MAX_OCTETS = 75

/** Escape TEXT values: backslash, semicolon, comma and newlines (RFC 5545 §3.3.11). */
export function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r\n|\r|\n/g, '\\n')
}

const encoder = new TextEncoder()

/**
 * Fold a content line to at most 75 octets per physical line (RFC 5545 §3.1).
 * Continuation lines start with one space (which counts toward the limit).
 * Never splits a multi-byte UTF-8 character.
 */
export function foldLine(line: string): string {
  if (encoder.encode(line).length <= MAX_OCTETS) return line

  const parts: string[] = []
  let current = ''
  let currentOctets = 0
  let limit = MAX_OCTETS // first line: 75, continuation lines: 74 (+ leading space)

  for (const char of line) { // iterates by code point, never splits surrogate pairs
    const size = encoder.encode(char).length
    if (currentOctets + size > limit) {
      parts.push(current)
      current = ''
      currentOctets = 0
      limit = MAX_OCTETS - 1
    }
    current += char
    currentOctets += size
  }
  if (current) parts.push(current)

  return parts.join(`${CRLF} `)
}

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/

/** `YYYY-MM-DD` → `YYYYMMDD` (throws on malformed input). */
export function toIcsDate(iso: string): string {
  const m = ISO_DATE.exec(iso)
  if (!m) throw new Error(`Invalid ISO date: ${iso}`)
  return `${m[1]}${m[2]}${m[3]}`
}

/** Add days to an ISO date without time-zone surprises (UTC arithmetic). */
export function addDaysIso(iso: string, days: number): string {
  const m = ISO_DATE.exec(iso)
  if (!m) throw new Error(`Invalid ISO date: ${iso}`)
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]) + days))
  return d.toISOString().slice(0, 10)
}

/** `Date` → `YYYYMMDDTHHMMSSZ` (UTC). */
export function toIcsTimestamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
}

/** UIDs must be globally unique and stable; keep them ASCII-safe. */
export function makeUid(id: string, startDate: string): string {
  return `${id}-${startDate}@muslimapp`.replace(/[^A-Za-z0-9@._-]/g, '-')
}

function eventLines(event: IcsEvent, stamp: string): string[] {
  const days = Math.max(1, Math.floor(event.days ?? 1))
  const lines = [
    'BEGIN:VEVENT',
    `UID:${event.uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${toIcsDate(event.startDate)}`,
    // DTEND is exclusive for all-day events
    `DTEND;VALUE=DATE:${toIcsDate(addDaysIso(event.startDate, days))}`,
    `SUMMARY:${escapeIcsText(event.summary)}`,
  ]
  if (event.description) lines.push(`DESCRIPTION:${escapeIcsText(event.description)}`)
  lines.push('TRANSP:TRANSPARENT', 'END:VEVENT')
  return lines
}

/** Build a complete VCALENDAR document (CRLF line endings, folded lines, trailing CRLF). */
export function buildIcs(events: IcsEvent[], options: IcsOptions = {}): string {
  const stamp = toIcsTimestamp(options.now ?? new Date())
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${options.prodId ?? '-//MuslimApp//Islamic Calendar//EN'}`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ]
  if (options.calendarName) lines.push(`X-WR-CALNAME:${escapeIcsText(options.calendarName)}`)
  for (const event of events) lines.push(...eventLines(event, stamp))
  lines.push('END:VCALENDAR')
  return lines.map(foldLine).join(CRLF) + CRLF
}

/** Trigger a client-side download of an .ics document (no-op on the server). */
export function downloadIcs(filename: string, content: string): void {
  if (typeof document === 'undefined') return
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename.endsWith('.ics') ? filename : `${filename}.ics`
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
