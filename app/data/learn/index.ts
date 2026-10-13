/**
 * Learning center — registry, lookup helpers and pure utilities
 * (localization, **bold** parsing, search normalization).
 * No Vue/Nuxt dependencies so everything is unit-testable.
 */
import type {
  FaqEntry,
  GlossaryTerm,
  KnowledgeLevel,
  LearningPath,
  Lesson,
  LocalizedText,
} from './types'
import { BASICS_PATH } from './paths/basics'
import { NEW_MUSLIM_PATH } from './paths/new-muslim'
import { FIQH_PATH } from './paths/fiqh'
import { AQIDA_PATH } from './paths/aqida'
import { HAJJ_PATH } from './paths/hajj'
import { GLOSSARY as BASE_GLOSSARY } from './glossary'
import { FIQH_TERMS } from './glossary-fiqh'
import { AQIDA_TERMS } from './glossary-aqida'
import { FAQ } from './faq'

export type { FaqEntry, GlossaryTerm, KnowledgeLevel, LearningPath, Lesson, LocalizedText } from './types'
export type { LessonBlock, QuizQuestion, ReviewStatus } from './types'
/** Full glossary: core terms plus terms contributed by individual paths. */
export const GLOSSARY: GlossaryTerm[] = [...BASE_GLOSSARY, ...FIQH_TERMS, ...AQIDA_TERMS]
export { FAQ }

export type LearnLocale = 'de' | 'en' | 'tr'

/** Available learning paths, in display order. */
export const LEARNING_PATHS: LearningPath[] = [BASICS_PATH, NEW_MUSLIM_PATH, FIQH_PATH, HAJJ_PATH, AQIDA_PATH]

export interface UpcomingPath {
  /** Used for i18n keys `learn.upcoming.<id>` / `learn.upcoming.<id>Desc`. */
  id: string
  icon: string
  level: KnowledgeLevel
}

/** Announced paths without content yet ("Bald verfügbar"). */
export const UPCOMING_PATHS: UpcomingPath[] = [
]

export const FAQ_CATEGORIES: FaqEntry['category'][] = [
  'belief', 'prayer', 'fasting', 'daily-life', 'new-muslim', 'family', 'food', 'misc',
]

// ---------------------------------------------------------------------------
// Localization
// ---------------------------------------------------------------------------

/** Pick the text for a locale; falls back de → en → any non-empty value. */
export function localize(text: LocalizedText | undefined | null, locale: string): string {
  if (!text) return ''
  const direct = (text as unknown as Record<string, string | undefined>)[locale]
  if (direct && direct.trim()) return direct
  return text.de?.trim() ? text.de : (text.en || text.tr || '')
}

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

export function getPath(id: string): LearningPath | undefined {
  return LEARNING_PATHS.find(p => p.id === id)
}

export function getLesson(pathId: string, lessonId: string): Lesson | undefined {
  return getPath(pathId)?.lessons.find(l => l.id === lessonId)
}

export function getLessonIndex(pathId: string, lessonId: string): number {
  return getPath(pathId)?.lessons.findIndex(l => l.id === lessonId) ?? -1
}

export function nextLesson(pathId: string, lessonId: string): Lesson | undefined {
  const path = getPath(pathId)
  if (!path) return undefined
  const i = path.lessons.findIndex(l => l.id === lessonId)
  return i >= 0 ? path.lessons[i + 1] : undefined
}

export function prevLesson(pathId: string, lessonId: string): Lesson | undefined {
  const path = getPath(pathId)
  if (!path) return undefined
  const i = path.lessons.findIndex(l => l.id === lessonId)
  return i > 0 ? path.lessons[i - 1] : undefined
}

export function getTerm(id: string): GlossaryTerm | undefined {
  return GLOSSARY.find(t => t.id === id)
}

/** Total minutes of a path. */
export function pathMinutes(path: LearningPath): number {
  return path.lessons.reduce((sum, l) => sum + (l.minutes || 0), 0)
}

// ---------------------------------------------------------------------------
// **bold** parser — safe: returns plain segments, never HTML
// ---------------------------------------------------------------------------

export interface TextSegment {
  text: string
  bold: boolean
}

/**
 * Splits text on `**bold**` markers. An unmatched `**` is kept literally.
 * Output is rendered as text nodes only (no v-html).
 */
export function parseBold(input: string): TextSegment[] {
  const out: TextSegment[] = []
  const parts = input.split('**')
  // An even number of parts means an odd number of markers → last marker unmatched.
  const unmatchedTail = parts.length % 2 === 0
  parts.forEach((part, i) => {
    const isBoldPart = i % 2 === 1
    const isUnmatched = unmatchedTail && i === parts.length - 1 && isBoldPart
    if (isUnmatched) {
      const last = out[out.length - 1]
      const literal = `**${part}`
      if (last && !last.bold) last.text += literal
      else out.push({ text: literal, bold: false })
      return
    }
    if (part === '') return
    out.push({ text: part, bold: isBoldPart })
  })
  return out
}

// ---------------------------------------------------------------------------
// Search normalization (accent / diacritic insensitive)
// ---------------------------------------------------------------------------

/**
 * Lower-cases and strips Latin accents, Arabic harakat/tatweel and
 * transliteration marks (ʿ ʾ ' -), maps ı/ß and common Arabic letter variants.
 * "Ṣalāh", "Salah" and "salat" style inputs stay comparable.
 */
export function normalizeSearch(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // Latin combining marks
    .replace(/[ً-ٰٟـ]/g, '') // Arabic harakat, dagger alef, tatweel
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/ß/g, 'ss')
    .replace(/ø/g, 'o')
    .replace(/[’'`ʿʾʻ‘]/g, '')
    .replace(/[-–—_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// ---------------------------------------------------------------------------
// Glossary index + search
// ---------------------------------------------------------------------------

export interface GlossaryIndexEntry {
  term: GlossaryTerm
  /** Normalized term + aliases + arabic. */
  keys: string[]
  /** Normalized localized definition per locale. */
  definitions: Record<LearnLocale, string>
  letter: string
}

export function glossaryLetter(term: string): string {
  const first = normalizeSearch(term).charAt(0).toUpperCase()
  return /^[A-Z]$/.test(first) ? first : '#'
}

function buildIndex(terms: GlossaryTerm[]): GlossaryIndexEntry[] {
  return terms.map(term => ({
    term,
    keys: [term.term, ...(term.aliases ?? []), term.arabic].map(normalizeSearch).filter(Boolean),
    definitions: {
      de: normalizeSearch(localize(term.definition, 'de')),
      en: normalizeSearch(localize(term.definition, 'en')),
      tr: normalizeSearch(localize(term.definition, 'tr')),
    },
    letter: glossaryLetter(term.term),
  }))
}

export const GLOSSARY_INDEX: GlossaryIndexEntry[] = buildIndex(GLOSSARY)

/**
 * Searches term, aliases, arabic and the definition in the given locale.
 * Results are ranked: exact/prefix on term or alias, then substring on
 * those, then definition matches. Empty query returns everything sorted A–Z.
 */
export function searchGlossary(
  query: string,
  locale: string,
  index: GlossaryIndexEntry[] = GLOSSARY_INDEX,
): GlossaryTerm[] {
  const q = normalizeSearch(query)
  const loc = (['de', 'en', 'tr'].includes(locale) ? locale : 'de') as LearnLocale
  const byName = (a: GlossaryTerm, b: GlossaryTerm) =>
    normalizeSearch(a.term).localeCompare(normalizeSearch(b.term))
  if (!q) return index.map(e => e.term).sort(byName)

  const scored: { term: GlossaryTerm, score: number }[] = []
  for (const entry of index) {
    let score = 0
    if (entry.keys.some(k => k === q)) score = 4
    else if (entry.keys.some(k => k.startsWith(q))) score = 3
    else if (entry.keys.some(k => k.includes(q))) score = 2
    else if (entry.definitions[loc].includes(q)) score = 1
    if (score > 0) scored.push({ term: entry.term, score })
  }
  return scored
    .sort((a, b) => b.score - a.score || byName(a.term, b.term))
    .map(s => s.term)
}

/** Groups terms by first letter (A–Z, '#' for others). Input order preserved per group. */
export function groupByLetter(terms: GlossaryTerm[]): { letter: string, terms: GlossaryTerm[] }[] {
  const map = new Map<string, GlossaryTerm[]>()
  for (const t of terms) {
    const l = glossaryLetter(t.term)
    if (!map.has(l)) map.set(l, [])
    map.get(l)!.push(t)
  }
  return [...map.entries()]
    .sort(([a], [b]) => (a === '#' ? 1 : b === '#' ? -1 : a.localeCompare(b)))
    .map(([letter, terms]) => ({ letter, terms }))
}

// ---------------------------------------------------------------------------
// FAQ search
// ---------------------------------------------------------------------------

export function searchFaq(
  query: string,
  locale: string,
  category: FaqEntry['category'] | 'all' = 'all',
  entries: FaqEntry[] = FAQ,
): FaqEntry[] {
  const q = normalizeSearch(query)
  return entries.filter((e) => {
    if (category !== 'all' && e.category !== category) return false
    if (!q) return true
    return normalizeSearch(localize(e.question, locale)).includes(q)
      || normalizeSearch(localize(e.answer, locale)).includes(q)
  })
}

// ---------------------------------------------------------------------------
// Quran reference parsing
// ---------------------------------------------------------------------------

export const QURAN_REF_RE = /^\d{1,3}:\d{1,3}(-\d{1,3})?$/

/** "2:255" → { surah: 2, from: 255, to: 255 }; "112:1-4" → { surah: 112, from: 1, to: 4 }. */
export function parseQuranRef(ref: string): { surah: number, from: number, to: number } | null {
  if (!QURAN_REF_RE.test(ref)) return null
  const [s, v] = ref.split(':') as [string, string]
  const [from, to] = v.split('-').map(Number) as [number, number | undefined]
  const surah = Number(s)
  if (surah < 1 || surah > 114) return null
  return { surah, from, to: to ?? from }
}
