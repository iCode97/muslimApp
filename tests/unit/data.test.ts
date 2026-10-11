import { describe, expect, it } from 'vitest'
import { HADITHS, HADITH_CATEGORIES } from '~/data/hadiths'
import { ALLAH_NAMES, NAME_CATEGORIES } from '~/data/allah-names'
import { DUAS, DUA_CATEGORIES } from '~/data/duas'
import { SEERAH_CHAPTERS, SEERAH_CATEGORIES } from '~/data/seerah'
import { SURAH_NAMES_DE } from '~/data/surah-names-de'
import { GUIDE_SECTIONS } from '~/data/prayer-guide'
import { PRAYER_METHODS, DEFAULT_METHOD } from '~/data/prayer-methods'

const LANGS = ['de', 'en', 'tr'] as const
const nonEmpty = (s: unknown) => typeof s === 'string' && s.trim().length > 0
const unique = (arr: unknown[]) => new Set(arr).size === arr.length

describe('hadiths', () => {
  it('has unique ids', () => {
    expect(HADITHS.length).toBeGreaterThanOrEqual(100)
    expect(unique(HADITHS.map(h => h.id))).toBe(true)
  })
  it('has arabic, source, category and non-empty de/en/tr', () => {
    for (const h of HADITHS) {
      expect(nonEmpty(h.arabic), `hadith ${h.id} arabic`).toBe(true)
      expect(nonEmpty(h.source), `hadith ${h.id} source`).toBe(true)
      expect(HADITH_CATEGORIES as readonly string[], `hadith ${h.id} category`).toContain(h.category)
      for (const l of LANGS) expect(nonEmpty(h.translations[l]), `hadith ${h.id} ${l}`).toBe(true)
    }
  })
})

describe('99 names of Allah', () => {
  it('has exactly 99 unique entries', () => {
    expect(ALLAH_NAMES.length).toBe(99)
    expect(unique(ALLAH_NAMES.map(n => n.id))).toBe(true)
    // NB: transliterations are not asserted unique: #48 and #65 are both spelled "Al-Majid" (distinct Arabic).
    expect(unique(ALLAH_NAMES.map(n => n.arabic))).toBe(true)
  })
  it('ids run 1..99 and all fields are filled', () => {
    expect(ALLAH_NAMES.map(n => n.id).sort((a, b) => a - b)).toEqual(Array.from({ length: 99 }, (_, i) => i + 1))
    for (const n of ALLAH_NAMES) {
      expect(nonEmpty(n.arabic) && nonEmpty(n.transliteration)).toBe(true)
      expect(NAME_CATEGORIES as readonly string[]).toContain(n.category)
      for (const l of LANGS) expect(nonEmpty(n.meanings[l]), `name ${n.id} ${l}`).toBe(true)
    }
  })
})

describe('duas', () => {
  it('has unique ids and complete content', () => {
    expect(DUAS.length).toBeGreaterThan(0)
    expect(unique(DUAS.map(d => d.id))).toBe(true)
    for (const d of DUAS) {
      expect(nonEmpty(d.arabic) && nonEmpty(d.transliteration), `dua ${d.id}`).toBe(true)
      expect(DUA_CATEGORIES as readonly string[]).toContain(d.category)
      for (const l of LANGS) expect(nonEmpty(d.translations[l]), `dua ${d.id} ${l}`).toBe(true)
    }
  })
})

describe('seerah', () => {
  it('has unique chapters with content in every language', () => {
    expect(SEERAH_CHAPTERS.length).toBeGreaterThan(0)
    expect(unique(SEERAH_CHAPTERS.map(c => c.id))).toBe(true)
    expect(unique(SEERAH_CHAPTERS.map(c => c.titleKey))).toBe(true)
    for (const c of SEERAH_CHAPTERS) {
      expect(SEERAH_CATEGORIES as readonly string[]).toContain(c.category)
      expect(nonEmpty(c.titleKey) && nonEmpty(c.year)).toBe(true)
      for (const l of LANGS) expect(nonEmpty(c.content[l]), `chapter ${c.id} ${l}`).toBe(true)
    }
  })
})

describe('surah names (de)', () => {
  it('covers all 114 surahs', () => {
    expect(Object.keys(SURAH_NAMES_DE).length).toBe(114)
    for (let i = 1; i <= 114; i++) expect(nonEmpty(SURAH_NAMES_DE[i]), `surah ${i}`).toBe(true)
  })
})

describe('prayer guide + methods', () => {
  it('has wudu and salah sections with unique steps', () => {
    expect(GUIDE_SECTIONS.length).toBe(2)
    for (const s of GUIDE_SECTIONS) {
      expect(s.steps.length).toBeGreaterThan(0)
      expect(unique(s.steps.map(st => st.id))).toBe(true)
    }
  })
  it('default calculation method exists and ids are unique', () => {
    expect(PRAYER_METHODS.map(m => m.id)).toContain(DEFAULT_METHOD)
    expect(unique(PRAYER_METHODS.map(m => m.id))).toBe(true)
  })
})
