/**
 * Learning center — content registry (paths, glossary, FAQ), lookup helpers and search.
 * Pure utilities (localize, parseBold, …) live in ./core and are re-exported below.
 * No Vue/Nuxt dependencies so everything is unit-testable.
 */
import type {
  FaqEntry,
  GlossaryTerm,
  KnowledgeLevel,
  LearningPath,
  Lesson,
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

// Pure utilities live in ./core (content-free, so they can be imported without the lesson data).
import { EN_FALLBACK_LOCALES, glossaryLetter, localize, normalizeSearch, type LearnLocale } from './core'
export * from './core'
/** Full glossary: core terms plus terms contributed by individual paths. */
export const GLOSSARY: GlossaryTerm[] = [...BASE_GLOSSARY, ...FIQH_TERMS, ...AQIDA_TERMS]
export { FAQ }

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
  const loc = (['de', 'en', 'tr'].includes(locale) ? locale : EN_FALLBACK_LOCALES.has(locale) ? 'en' : 'de') as LearnLocale
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
