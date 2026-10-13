import { describe, expect, it } from 'vitest'
import { HADITHS, HADITH_COLLECTION_ORDER, HADITH_GRADES } from '~/data/hadiths'

const isSahihain = (name: string) => name === 'Bukhari' || name === 'Muslim'

describe('hadith authenticity grades', () => {
  it('every hadith has a valid grade and review status', () => {
    for (const h of HADITHS) {
      expect(HADITH_GRADES, `hadith ${h.id} grade`).toContain(h.grade)
      expect(['draft', 'reviewed'], `hadith ${h.id} review`).toContain(h.review)
    }
  })

  it('every hadith in Bukhari or Muslim is sahih', () => {
    for (const h of HADITHS) {
      if (h.collections.some(c => isSahihain(c.name))) {
        expect(h.grade, `hadith ${h.id} (${h.source})`).toBe('sahih')
      }
    }
  })

  it('has non-empty, known collections that match the display source', () => {
    for (const h of HADITHS) {
      expect(h.collections.length, `hadith ${h.id} collections`).toBeGreaterThan(0)
      for (const c of h.collections) {
        expect(HADITH_COLLECTION_ORDER, `hadith ${h.id} collection`).toContain(c.name)
        if (c.name === 'other') expect(c.label?.trim(), `hadith ${h.id} other label`).toBeTruthy()
        // Named collections must appear in `source` (with their number, if any).
        else expect(h.source, `hadith ${h.id}`).toContain(c.number ? `${c.name} ${c.number}` : c.name)
      }
    }
  })

  it('names the grader when graded outside Bukhari/Muslim', () => {
    for (const h of HADITHS) {
      const inSahihain = h.collections.some(c => isSahihain(c.name))
      if (h.grade !== 'unverified' && !inSahihain) {
        expect(h.gradeNote?.trim(), `hadith ${h.id} gradeNote`).toBeTruthy()
      }
    }
  })

  it('entries flagged "Quelle prüfen" are unverified', () => {
    for (const h of HADITHS) {
      if (h.gradeNote?.includes('Quelle prüfen')) expect(h.grade, `hadith ${h.id}`).toBe('unverified')
    }
  })
})
