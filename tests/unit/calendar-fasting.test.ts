import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import holidayData from '../../data/holidays.json'
import { FASTING_INFO, HOLIDAY_INFO, fastingKindsFor, type FastingKind } from '~/data/holiday-info'
import {
  daysBetweenIso,
  firstFridayOnOrAfter,
  isoToDisplay,
  toIso,
  todayIso,
  weekdayOfIso,
} from '~/utils/hijri-dates'

const day = (hijriMonth: number, hijriDay: number, weekday = 'Tue') => fastingKindsFor({ hijriMonth, hijriDay, weekday })

describe('fastingKindsFor', () => {
  it('marks the white days (13–15) in ordinary months', () => {
    expect(day(2, 12)).toEqual([])
    expect(day(2, 13)).toEqual(['bid'])
    expect(day(2, 14)).toEqual(['bid'])
    expect(day(2, 15)).toEqual(['bid'])
    expect(day(2, 16)).toEqual([])
  })

  it('marks Mondays and Thursdays', () => {
    expect(day(2, 5, 'Mon')).toEqual(['monThu'])
    expect(day(2, 5, 'Thu')).toEqual(['monThu'])
    expect(day(2, 5, 'Wed')).toEqual([])
    expect(day(2, 14, 'Mon')).toEqual(['bid', 'monThu'])
  })

  it('marks Arafah, Ashura and Tasu’a', () => {
    expect(day(12, 9)).toEqual(['arafah'])
    expect(day(1, 10)).toEqual(['ashura'])
    expect(day(1, 9)).toEqual(['tasua'])
    expect(day(1, 10, 'Thu')).toEqual(['ashura', 'monThu'])
  })

  it('never recommends fasting in Ramadan (obligatory) or on forbidden days', () => {
    expect(day(9, 14, 'Mon')).toEqual([])
    expect(day(10, 1, 'Thu')).toEqual([]) // Eid al-Fitr
    for (const d of [10, 11, 12, 13]) expect(day(12, d, 'Mon')).toEqual([]) // Eid al-Adha + tashriq
  })

  it('does not return per-day shawwal markers', () => {
    for (let d = 1; d <= 30; d++) expect(day(10, d)).not.toContain('shawwal')
  })
})

describe('holiday info content', () => {
  const nonEmpty = (s: string) => typeof s === 'string' && s.trim().length > 0
  const sentences = (s: string) => s.split(/(?<=[^\d]\.|[!?])\s+(?=[A-ZÄÖÜİŞ])/).length

  it('has a de/en/tr explanation and a source for every holiday', () => {
    for (const h of holidayData.holidays) {
      const info = HOLIDAY_INFO[h.id]
      expect(info, h.id).toBeDefined()
      for (const l of ['de', 'en', 'tr'] as const) expect(nonEmpty(info![l]), `${h.id}.${l}`).toBe(true)
      expect(nonEmpty(info!.source), `${h.id}.source`).toBe(true)
    }
  })

  it('keeps explanations short (2–6 sentences)', () => {
    for (const [id, info] of Object.entries(HOLIDAY_INFO)) {
      for (const l of ['de', 'en', 'tr'] as const) {
        const n = sentences(info[l])
        expect(n, `${id}.${l}`).toBeGreaterThanOrEqual(2)
        expect(n, `${id}.${l}`).toBeLessThanOrEqual(6)
      }
    }
  })

  it('describes Kandil nights as tradition and mentions scholarly criticism', () => {
    for (const id of ['regaip', 'miraj', 'baraat']) {
      expect(HOLIDAY_INFO[id]!.de).toMatch(/Tradition/)
      expect(HOLIDAY_INFO[id]!.de).toMatch(/kritisch/)
    }
  })

  it('has info for every fasting kind', () => {
    const kinds: FastingKind[] = ['bid', 'monThu', 'arafah', 'ashura', 'tasua', 'shawwal']
    for (const k of kinds) {
      expect(Object.keys(FASTING_INFO)).toContain(k)
      for (const l of ['de', 'en', 'tr'] as const) expect(nonEmpty(FASTING_INFO[k][l]), `${k}.${l}`).toBe(true)
    }
  })

  it('has i18n labels for every fasting kind (dynamic keys are not covered by the key scanner)', () => {
    for (const l of ['de', 'en', 'tr']) {
      const json = JSON.parse(readFileSync(join(__dirname, '..', '..', 'i18n', `${l}.json`), 'utf8'))
      for (const k of Object.keys(FASTING_INFO)) {
        expect(json.calendar.fasting[k], `${l}:calendar.fasting.${k}`).toBeTruthy()
      }
    }
  })
})

describe('hijri-dates helpers', () => {
  it('formats and measures ISO dates', () => {
    expect(toIso(2026, 3, 5)).toBe('2026-03-05')
    expect(isoToDisplay('2026-03-05')).toBe('05.03.2026')
    expect(daysBetweenIso('2026-03-05', '2026-03-10')).toBe(5)
    expect(daysBetweenIso('2026-03-10', '2026-03-05')).toBe(-5)
    expect(daysBetweenIso('2026-12-31', '2027-01-01')).toBe(1)
    expect(todayIso(new Date(2026, 0, 9))).toBe('2026-01-09')
  })

  it('finds the first Friday on or after a date', () => {
    expect(weekdayOfIso('2026-04-03')).toBe(5) // a Friday
    expect(firstFridayOnOrAfter('2026-04-03')).toBe('2026-04-03')
    expect(firstFridayOnOrAfter('2026-04-04')).toBe('2026-04-10')
    expect(firstFridayOnOrAfter('2026-04-01')).toBe('2026-04-03')
  })
})
