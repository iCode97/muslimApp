/**
 * Learning center — pure, content-free utilities (localization, **bold**
 * parsing, search normalization, Quran reference parsing).
 *
 * Deliberately has NO import of the heavy content modules (paths, glossary,
 * FAQ): components outside the learning center (e.g. adhkar) import from here
 * so the ~800 KB of lesson content is not pulled into the app entry chunk.
 * `index.ts` re-exports everything, so existing imports keep working.
 * No Vue/Nuxt dependencies so everything is unit-testable.
 */
import type { FaqEntry, GlossaryTerm, LearningPath, LocalizedText } from './types'

export type { FaqEntry, GlossaryTerm, KnowledgeLevel, LearningPath, Lesson, LocalizedText } from './types'
export type { LessonBlock, QuizQuestion, ReviewStatus } from './types'

export type LearnLocale = 'de' | 'en' | 'tr'

export const FAQ_CATEGORIES: FaqEntry['category'][] = [
  'belief', 'prayer', 'fasting', 'daily-life', 'new-muslim', 'family', 'food', 'misc',
]

// ---------------------------------------------------------------------------
// Localization
// ---------------------------------------------------------------------------

/** Locales without their own content translations that read English before German (e.g. Arabic UI). */
export const EN_FALLBACK_LOCALES = new Set(['ar'])

/**
 * Pick the text for a locale; falls back de → en → any non-empty value.
 * Locales without own content (ar) fall back en → de → any non-empty value.
 */
export function localize(text: LocalizedText | undefined | null, locale: string): string {
  if (!text) return ''
  const direct = (text as unknown as Record<string, string | undefined>)[locale]
  if (direct && direct.trim()) return direct
  if (EN_FALLBACK_LOCALES.has(locale)) {
    return text.en?.trim() ? text.en : (text.de || text.tr || '')
  }
  return text.de?.trim() ? text.de : (text.en || text.tr || '')
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

export function glossaryLetter(term: string): string {
  const first = normalizeSearch(term).charAt(0).toUpperCase()
  return /^[A-Z]$/.test(first) ? first : '#'
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
