/**
 * Learning center — shared content schema.
 *
 * A learning *path* (e.g. "Grundlagen des Islam") is an ordered list of
 * *lessons*. Each lesson is a sequence of typed content blocks plus an
 * optional quiz. All user-facing text is localized (de/en/tr).
 *
 * Content integrity rules:
 * - Every religious claim cites a source (Quran verse or a hadith with
 *   collection + number) via `quran` / `hadith` blocks or `sources`.
 * - Where the Sunni schools of law differ, say so neutrally in a `note`
 *   block instead of presenting one opinion as the only one.
 * - New content ships with `review: 'draft'`; the UI shows a
 *   "wird noch fachlich geprüft" badge until a qualified reviewer sets
 *   it to 'reviewed'.
 */

export interface LocalizedText {
  de: string
  en: string
  tr: string
}

export type KnowledgeLevel = 'discover' | 'practice' | 'deepen'

export type ReviewStatus = 'draft' | 'reviewed'

export type LessonBlock =
  /** Plain paragraph. Supports **bold** only; no HTML. */
  | { type: 'text', text: LocalizedText }
  /** Sub-heading inside a lesson. */
  | { type: 'heading', text: LocalizedText }
  /** Bullet list. */
  | { type: 'list', items: LocalizedText[] }
  /**
   * Quran citation. `ref` is "surah:ayah" or "surah:from-to" (e.g. "2:255",
   * "112:1-4"). `arabic` is optional (short verses); the translation is the
   * lesson author's rendering or a cited translation (name it in `sources`).
   */
  | { type: 'quran', ref: string, arabic?: string, translation: LocalizedText }
  /** Hadith citation. `source` e.g. "Sahih al-Bukhari 8, Sahih Muslim 16". */
  | { type: 'hadith', source: string, narrator?: string, arabic?: string, text: LocalizedText, grade?: 'sahih' | 'hasan' | 'daif' }
  /** Highlighted callout (key takeaway, tip, or note on differing opinions). */
  | { type: 'note', variant: 'tip' | 'important' | 'differences', text: LocalizedText }
  /** Inline reference to glossary terms (rendered as tappable chips). */
  | { type: 'terms', ids: string[] }
  /** Link to an existing app page (e.g. '/guide', '/quran/1', '/dua'). */
  | { type: 'link', to: string, label: LocalizedText }

export interface QuizQuestion {
  question: LocalizedText
  options: LocalizedText[]
  /** Index into `options`. */
  answer: number
  explanation: LocalizedText
}

export interface Lesson {
  /** Stable slug, unique within its path, e.g. 'six-articles-of-faith'. */
  id: string
  title: LocalizedText
  summary: LocalizedText
  minutes: number
  blocks: LessonBlock[]
  quiz?: QuizQuestion[]
  /** Free-form source list, e.g. "Quran 2:285", "Sahih Muslim 8 (Hadith Jibril)". */
  sources: string[]
  review: ReviewStatus
}

export interface LearningPath {
  /** URL slug, e.g. 'basics' → /learn/basics */
  id: string
  icon: string
  level: KnowledgeLevel
  title: LocalizedText
  description: LocalizedText
  lessons: Lesson[]
}

export interface GlossaryTerm {
  /** Slug, e.g. 'tawhid'. Referenced from `terms` blocks. */
  id: string
  /** Common transliteration, e.g. "Tawhid". */
  term: string
  arabic: string
  /** Optional alternative spellings for search (e.g. "Tauhid", "Tevhid"). */
  aliases?: string[]
  definition: LocalizedText
  /** Related glossary ids. */
  related?: string[]
  review: ReviewStatus
}

export interface FaqEntry {
  id: string
  category: 'belief' | 'prayer' | 'fasting' | 'daily-life' | 'new-muslim' | 'family' | 'food' | 'misc'
  question: LocalizedText
  answer: LocalizedText
  /** Quran/hadith/scholarly references backing the answer. */
  sources: string[]
  /** True when scholars meaningfully differ — UI adds an "ask a local scholar" hint. */
  scholarlyDifference?: boolean
  review: ReviewStatus
}
