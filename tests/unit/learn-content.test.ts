/**
 * Content integrity for the learning center. These tests run against whatever
 * content is currently in app/data/learn/** (also the real content after merge).
 */
import { describe, expect, it } from 'vitest'
import { FAQ, GLOSSARY, LEARNING_PATHS, QURAN_REF_RE, parseQuranRef } from '~/data/learn'
import type { LessonBlock, LocalizedText } from '~/data/learn'

const LANGS = ['de', 'en', 'tr'] as const
const nonEmpty = (s: unknown) => typeof s === 'string' && s.trim().length > 0
const unique = (arr: unknown[]) => new Set(arr).size === arr.length

function checkLocalized(text: LocalizedText | undefined, where: string, errors: string[]) {
  if (!text || typeof text !== 'object') {
    errors.push(`${where}: missing LocalizedText`)
    return
  }
  for (const l of LANGS) if (!nonEmpty(text[l])) errors.push(`${where}: empty ${l}`)
}

const glossaryIds = new Set(GLOSSARY.map(t => t.id))
const allLessons = LEARNING_PATHS.flatMap(p => p.lessons.map(l => ({ path: p, lesson: l })))

describe('learning paths', () => {
  it('has unique path ids with valid level and icon', () => {
    expect(LEARNING_PATHS.length).toBeGreaterThan(0)
    expect(unique(LEARNING_PATHS.map(p => p.id))).toBe(true)
    for (const p of LEARNING_PATHS) {
      expect(['discover', 'practice', 'deepen'], `path ${p.id} level`).toContain(p.level)
      expect(nonEmpty(p.icon), `path ${p.id} icon`).toBe(true)
      expect(p.lessons.length, `path ${p.id} lessons`).toBeGreaterThan(0)
    }
  })

  it('has unique lesson ids per path (url-safe slugs)', () => {
    for (const p of LEARNING_PATHS) {
      expect(unique(p.lessons.map(l => l.id)), `path ${p.id}`).toBe(true)
      for (const l of p.lessons) expect(l.id, `${p.id}/${l.id}`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    }
  })

  it('has localized titles, descriptions and summaries in de/en/tr', () => {
    const errors: string[] = []
    for (const p of LEARNING_PATHS) {
      checkLocalized(p.title, `${p.id}.title`, errors)
      checkLocalized(p.description, `${p.id}.description`, errors)
      for (const l of p.lessons) {
        checkLocalized(l.title, `${p.id}/${l.id}.title`, errors)
        checkLocalized(l.summary, `${p.id}/${l.id}.summary`, errors)
        expect(l.minutes, `${p.id}/${l.id} minutes`).toBeGreaterThan(0)
        expect(['draft', 'reviewed']).toContain(l.review)
      }
    }
    expect(errors).toEqual([])
  })

  it('has every block fully localized and well-formed', () => {
    const errors: string[] = []
    for (const { path, lesson } of allLessons) {
      lesson.blocks.forEach((b: LessonBlock, i) => {
        const where = `${path.id}/${lesson.id}#${i}(${b.type})`
        switch (b.type) {
          case 'text':
          case 'heading':
          case 'note':
            checkLocalized(b.text, where, errors)
            break
          case 'list':
            if (!b.items.length) errors.push(`${where}: empty list`)
            b.items.forEach((it, j) => checkLocalized(it, `${where}.items[${j}]`, errors))
            break
          case 'quran':
            checkLocalized(b.translation, where, errors)
            break
          case 'hadith':
            checkLocalized(b.text, where, errors)
            if (!nonEmpty(b.source)) errors.push(`${where}: missing source`)
            break
          case 'link':
            checkLocalized(b.label, where, errors)
            break
          case 'terms':
            if (!b.ids.length) errors.push(`${where}: empty ids`)
            break
        }
      })
    }
    expect(errors).toEqual([])
  })

  it('has quran refs like "2:255" / "112:1-4" with surah 1–114 and ascending ranges', () => {
    const errors: string[] = []
    for (const { path, lesson } of allLessons) {
      for (const b of lesson.blocks) {
        if (b.type !== 'quran') continue
        const where = `${path.id}/${lesson.id}: ${b.ref}`
        if (!QURAN_REF_RE.test(b.ref)) {
          errors.push(`${where} (format)`)
          continue
        }
        const parsed = parseQuranRef(b.ref)
        if (!parsed) errors.push(`${where} (surah out of range)`)
        else if (parsed.from < 1 || parsed.to < parsed.from) errors.push(`${where} (verse range)`)
      }
    }
    expect(errors).toEqual([])
  })

  it('only links to internal routes', () => {
    const bad: string[] = []
    for (const { path, lesson } of allLessons) {
      for (const b of lesson.blocks) {
        if (b.type === 'link' && !(b.to.startsWith('/') && !b.to.startsWith('//'))) bad.push(`${path.id}/${lesson.id}: ${b.to}`)
      }
    }
    expect(bad).toEqual([])
  })

  it('references only existing glossary terms', () => {
    const missing: string[] = []
    for (const { path, lesson } of allLessons) {
      for (const b of lesson.blocks) {
        if (b.type !== 'terms') continue
        for (const id of b.ids) if (!glossaryIds.has(id)) missing.push(`${path.id}/${lesson.id}: ${id}`)
      }
    }
    expect(missing).toEqual([])
  })

  it('has valid quizzes (answer index within options, all text localized)', () => {
    const errors: string[] = []
    for (const { path, lesson } of allLessons) {
      lesson.quiz?.forEach((q, i) => {
        const where = `${path.id}/${lesson.id} quiz[${i}]`
        checkLocalized(q.question, `${where}.question`, errors)
        checkLocalized(q.explanation, `${where}.explanation`, errors)
        if (q.options.length < 2) errors.push(`${where}: needs ≥2 options`)
        q.options.forEach((o, j) => checkLocalized(o, `${where}.options[${j}]`, errors))
        if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) {
          errors.push(`${where}: answer ${q.answer} out of range`)
        }
      })
    }
    expect(errors).toEqual([])
  })

  it('cites at least one source per lesson', () => {
    for (const { path, lesson } of allLessons) {
      expect(lesson.sources.length, `${path.id}/${lesson.id} sources`).toBeGreaterThanOrEqual(1)
      for (const s of lesson.sources) expect(nonEmpty(s)).toBe(true)
    }
  })
})

describe('glossary', () => {
  it('has unique ids and term/arabic/definition', () => {
    expect(GLOSSARY.length).toBeGreaterThan(0)
    expect(unique(GLOSSARY.map(t => t.id))).toBe(true)
    const errors: string[] = []
    for (const t of GLOSSARY) {
      expect(t.id, `term ${t.id}`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
      if (!nonEmpty(t.term)) errors.push(`${t.id}: term`)
      if (!nonEmpty(t.arabic)) errors.push(`${t.id}: arabic`)
      checkLocalized(t.definition, `${t.id}.definition`, errors)
      expect(['draft', 'reviewed']).toContain(t.review)
    }
    expect(errors).toEqual([])
  })

  it('has related ids that exist and do not point to themselves', () => {
    const bad: string[] = []
    for (const t of GLOSSARY) {
      for (const r of t.related ?? []) {
        if (!glossaryIds.has(r)) bad.push(`${t.id} → ${r} (missing)`)
        if (r === t.id) bad.push(`${t.id} → itself`)
      }
    }
    expect(bad).toEqual([])
  })
})

describe('faq', () => {
  const CATEGORIES = ['belief', 'prayer', 'fasting', 'daily-life', 'new-muslim', 'family', 'food', 'misc']

  it('has unique ids, valid categories and localized texts', () => {
    expect(FAQ.length).toBeGreaterThan(0)
    expect(unique(FAQ.map(f => f.id))).toBe(true)
    const errors: string[] = []
    for (const f of FAQ) {
      expect(CATEGORIES, `faq ${f.id} category`).toContain(f.category)
      checkLocalized(f.question, `${f.id}.question`, errors)
      checkLocalized(f.answer, `${f.id}.answer`, errors)
      expect(['draft', 'reviewed']).toContain(f.review)
    }
    expect(errors).toEqual([])
  })

  it('cites at least one source per answer', () => {
    for (const f of FAQ) {
      expect(f.sources.length, `faq ${f.id} sources`).toBeGreaterThanOrEqual(1)
    }
  })
})
