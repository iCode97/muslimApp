import { describe, expect, it } from 'vitest'
import {
  addDaysIso,
  buildIcs,
  escapeIcsText,
  foldLine,
  makeUid,
  toIcsDate,
  toIcsTimestamp,
} from '~/utils/ics'

const NOW = new Date(Date.UTC(2026, 2, 5, 8, 9, 10))
const octets = (s: string) => new TextEncoder().encode(s).length

describe('escapeIcsText', () => {
  it('escapes backslash, semicolon, comma and newlines', () => {
    expect(escapeIcsText('a,b;c\\d')).toBe('a\\,b\\;c\\\\d')
    expect(escapeIcsText('line1\nline2\r\nline3')).toBe('line1\\nline2\\nline3')
  })

  it('leaves normal text untouched', () => {
    expect(escapeIcsText('Eid al-Fitr')).toBe('Eid al-Fitr')
  })
})

describe('foldLine', () => {
  it('keeps short lines unchanged', () => {
    expect(foldLine('SUMMARY:Short')).toBe('SUMMARY:Short')
  })

  it('folds ASCII lines at 75 octets with a leading space on continuations', () => {
    const line = `DESCRIPTION:${'x'.repeat(200)}`
    const folded = foldLine(line)
    const parts = folded.split('\r\n')
    expect(parts.length).toBeGreaterThan(1)
    expect(parts.every(p => octets(p) <= 75)).toBe(true)
    expect(parts.slice(1).every(p => p.startsWith(' '))).toBe(true)
    // unfolding restores the original
    expect(folded.replace(/\r\n /g, '')).toBe(line)
  })

  it('never splits multi-byte characters and counts octets, not characters', () => {
    const line = `SUMMARY:${'ä'.repeat(100)}${'ﷺ'.repeat(30)}😀`
    const folded = foldLine(line)
    const parts = folded.split('\r\n')
    expect(parts.every(p => octets(p) <= 75)).toBe(true)
    expect(folded.replace(/\r\n /g, '')).toBe(line)
  })
})

describe('date helpers', () => {
  it('formats ICS dates and timestamps', () => {
    expect(toIcsDate('2026-03-05')).toBe('20260305')
    expect(toIcsTimestamp(NOW)).toBe('20260305T080910Z')
    expect(() => toIcsDate('05.03.2026')).toThrow()
  })

  it('adds days across month and year boundaries', () => {
    expect(addDaysIso('2026-12-30', 3)).toBe('2027-01-02')
    expect(addDaysIso('2028-02-28', 2)).toBe('2028-03-01')
  })

  it('builds stable ASCII UIDs', () => {
    expect(makeUid('eid-al-fitr', '2027-03-10')).toBe('eid-al-fitr-2027-03-10@muslimapp')
    expect(makeUid('Äid x', '2027-03-10')).toBe('-id-x-2027-03-10@muslimapp')
  })
})

describe('buildIcs', () => {
  const ics = buildIcs(
    [
      {
        uid: 'eid-al-fitr-2027-03-10@muslimapp',
        summary: 'Eid al-Fitr, Ramadanfest',
        description: 'Zeile 1; mit Semikolon\nZeile 2',
        startDate: '2027-03-10',
        days: 3,
      },
      { uid: 'ashura-2026-06-25@muslimapp', summary: 'Aschura', startDate: '2026-06-25' },
    ],
    { now: NOW, calendarName: 'Islamische Feiertage' },
  )
  const lines = ics.split('\r\n')

  it('uses CRLF line endings only and ends with CRLF', () => {
    expect(ics.endsWith('\r\n')).toBe(true)
    expect(ics.replace(/\r\n/g, '')).not.toMatch(/[\r\n]/)
  })

  it('wraps events in a VCALENDAR with required properties', () => {
    expect(lines[0]).toBe('BEGIN:VCALENDAR')
    expect(lines).toContain('VERSION:2.0')
    expect(lines.some(l => l.startsWith('PRODID:'))).toBe(true)
    expect(lines).toContain('END:VCALENDAR')
    expect(lines.filter(l => l === 'BEGIN:VEVENT')).toHaveLength(2)
    expect(lines.filter(l => l === 'END:VEVENT')).toHaveLength(2)
  })

  it('writes UID, DTSTAMP and all-day DTSTART/DTEND (exclusive end)', () => {
    expect(lines).toContain('UID:eid-al-fitr-2027-03-10@muslimapp')
    expect(lines).toContain('DTSTAMP:20260305T080910Z')
    expect(lines).toContain('DTSTART;VALUE=DATE:20270310')
    expect(lines).toContain('DTEND;VALUE=DATE:20270313') // 3 days -> exclusive end
    expect(lines).toContain('DTSTART;VALUE=DATE:20260625')
    expect(lines).toContain('DTEND;VALUE=DATE:20260626') // default 1 day
  })

  it('escapes text values', () => {
    expect(lines).toContain('SUMMARY:Eid al-Fitr\\, Ramadanfest')
    expect(lines).toContain('DESCRIPTION:Zeile 1\\; mit Semikolon\\nZeile 2')
  })

  it('never exceeds 75 octets per physical line', () => {
    const long = buildIcs(
      [{ uid: 'x@y', summary: 'S', description: `${'Lorem ipsum, '.repeat(40)}ﷺ`, startDate: '2026-01-01' }],
      { now: NOW },
    )
    for (const line of long.split('\r\n')) expect(octets(line)).toBeLessThanOrEqual(75)
  })
})
