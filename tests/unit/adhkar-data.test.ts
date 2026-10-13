import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { ADHKAR_SET_IDS, ADHKAR_SETS, adhkarSetKey, getAdhkarSet, isAdhkarSetId } from '~/data/adhkar'

const ALL_ITEMS = ADHKAR_SETS.flatMap(s => s.items.map(item => ({ set: s.id, item })))

/**
 * Arabic letters (incl. hamza forms, alef wasla) + harakat/shadda/sukun/tanwin,
 * superscript alef, and only whitespace / Arabic comma / semicolon as separators.
 */
const ARABIC_ONLY = /^[ء-غف-يً-ْٰٱ،؛\s]+$/
const HAS_ARABIC_LETTER = /[ء-ي]/

describe('adhkar data', () => {
  it('contains every declared set exactly once and no set is empty', () => {
    expect(ADHKAR_SETS.map(s => s.id)).toEqual([...ADHKAR_SET_IDS])
    for (const set of ADHKAR_SETS) {
      expect(set.items.length, set.id).toBeGreaterThan(0)
    }
  })

  it('has reasonable sizes for the main sets', () => {
    expect(getAdhkarSet('morning')!.items.length).toBeGreaterThanOrEqual(10)
    expect(getAdhkarSet('evening')!.items.length).toBeGreaterThanOrEqual(10)
    expect(getAdhkarSet('after-prayer')!.items.length).toBeGreaterThanOrEqual(5)
  })

  it('uses globally unique ids', () => {
    const ids = ALL_ITEMS.map(x => x.item.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every item has a repeat count ≥ 1 (integer)', () => {
    for (const { item } of ALL_ITEMS) {
      expect(Number.isInteger(item.repeat) && item.repeat >= 1, item.id).toBe(true)
    }
  })

  it('every item has non-empty transliteration and de/en/tr translations', () => {
    for (const { item } of ALL_ITEMS) {
      expect(item.transliteration.trim(), item.id).not.toBe('')
      for (const l of ['de', 'en', 'tr'] as const) {
        expect(item.translation[l]?.trim(), `${item.id}.${l}`).toBeTruthy()
        if (item.virtue) expect(item.virtue[l]?.trim(), `${item.id}.virtue.${l}`).toBeTruthy()
        if (item.occasion) expect(item.occasion[l]?.trim(), `${item.id}.occasion.${l}`).toBeTruthy()
      }
    }
  })

  it('every item cites a source (Quran reference or hadith collection + number)', () => {
    for (const { item } of ALL_ITEMS) {
      expect(item.source.trim(), item.id).not.toBe('')
      // Each source must contain a reference number
      expect(/\d/.test(item.source), item.id).toBe(true)
      if (item.virtueSource) expect(/\d/.test(item.virtueSource), item.id).toBe(true)
    }
  })

  it('hadith-based items carry a grade; pure Quran items may omit it', () => {
    for (const { item } of ALL_ITEMS) {
      const quranOnly = /^Quran [\d:–-]+$/.test(item.source)
      if (!quranOnly) expect(item.grade, item.id).toMatch(/^(sahih|hasan)$/)
    }
  })

  it('arabic contains only Arabic letters, diacritics, spaces and Arabic punctuation', () => {
    for (const { item } of ALL_ITEMS) {
      expect(HAS_ARABIC_LETTER.test(item.arabic), item.id).toBe(true)
      const bad = [...item.arabic].filter(ch => !ARABIC_ONLY.test(ch))
      expect({ id: item.id, bad }).toEqual({ id: item.id, bad: [] })
    }
  })

  it('arabic is vowelled (has harakat)', () => {
    for (const { item } of ALL_ITEMS) {
      const letters = (item.arabic.match(/[ء-ي]/g) ?? []).length
      const marks = (item.arabic.match(/[ً-ْ]/g) ?? []).length
      expect(marks / letters, item.id).toBeGreaterThan(0.5)
    }
  })

  it('ships as draft until reviewed', () => {
    for (const { item } of ALL_ITEMS) expect(item.review, item.id).toBe('draft')
  })

  it('isAdhkarSetId / adhkarSetKey', () => {
    expect(isAdhkarSetId('evening')).toBe(true)
    expect(isAdhkarSetId('nope')).toBe(false)
    expect(isAdhkarSetId(undefined)).toBe(false)
    expect(adhkarSetKey('after-prayer')).toBe('afterPrayer')
    expect(adhkarSetKey('morning')).toBe('morning')
  })

  it('every set has i18n labels and descriptions in all locales', () => {
    for (const l of ['de', 'en', 'tr']) {
      const json = JSON.parse(readFileSync(join(__dirname, '..', '..', 'i18n', `${l}.json`), 'utf8'))
      for (const id of ADHKAR_SET_IDS) {
        expect(json.adhkar.sets[adhkarSetKey(id)], `${l}:sets.${id}`).toBeTruthy()
        expect(json.adhkar.setDesc[adhkarSetKey(id)], `${l}:setDesc.${id}`).toBeTruthy()
      }
    }
  })
})
