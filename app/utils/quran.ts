/**
 * Pure Quran helpers — no Nuxt/Vue runtime needed, fully unit-testable.
 * Verse keys, deep-link parsing, audio URLs, HTML sanitizing, the Juz table,
 * reader/audio settings normalisation and the verse-by-verse playback state machine.
 */

// ---------------------------------------------------------------------------
// Verse keys & deep links
// ---------------------------------------------------------------------------

export interface VerseRef {
  surah: number
  verse: number
}

export const SURAH_COUNT = 114

/** Parses "2:255" → { surah: 2, verse: 255 }. Returns null for anything malformed. */
export function parseVerseKey(key: unknown): VerseRef | null {
  if (typeof key !== 'string') return null
  const m = key.trim().match(/^(\d{1,3}):(\d{1,3})$/)
  if (!m) return null
  const surah = Number(m[1])
  const verse = Number(m[2])
  if (surah < 1 || surah > SURAH_COUNT || verse < 1) return null
  return { surah, verse }
}

export function makeVerseKey(surah: number, verse: number): string {
  return `${surah}:${verse}`
}

/**
 * Reads the target verse from a deep link. Supports `?verse=255` and
 * `#255` / `#v255` / `#verse-255`. The query wins over the hash.
 * Returns null when absent or invalid; clamps nothing (caller checks the surah length).
 */
export function parseVerseTarget(query: unknown, hash?: string | null): number | null {
  const fromQuery = Array.isArray(query) ? query[0] : query
  const candidates = [fromQuery, typeof hash === 'string' ? hash.replace(/^#/, '').replace(/^(?:verse-|v)/i, '') : null]
  for (const c of candidates) {
    if (c === null || c === undefined || c === '') continue
    const s = String(c).trim()
    if (!/^\d{1,3}$/.test(s)) continue
    const n = Number(s)
    if (n >= 1) return n
  }
  return null
}

/** Builds a deep link to a verse. */
export function verseLink(surah: number, verse?: number | null): string {
  return verse && verse > 1 ? `/quran/${surah}?verse=${verse}` : `/quran/${surah}`
}

// ---------------------------------------------------------------------------
// Audio sources
// ---------------------------------------------------------------------------

export interface Reciter {
  id: number
  name: string
  /** Teaching recitation (slow, with pauses) — good for memorising. */
  teaching?: boolean
}

/** quran.com /resources/recitations ids (verse-by-verse capable). */
export const RECITERS: readonly Reciter[] = [
  { id: 7, name: 'Mishari Rashid al-Afasy' },
  { id: 2, name: 'AbdulBaset AbdulSamad (Murattal)' },
  { id: 6, name: 'Mahmoud Khalil Al-Husary' },
  { id: 12, name: 'Mahmoud Khalil Al-Husary (Muallim)', teaching: true },
  { id: 9, name: 'Mohamed Siddiq al-Minshawi (Murattal)' },
  { id: 3, name: 'Abdur-Rahman as-Sudais' },
]

export const DEFAULT_RECITER_ID = 7

export function isKnownReciter(id: unknown): id is number {
  return typeof id === 'number' && RECITERS.some(r => r.id === id)
}

const VERSE_AUDIO_HOST = 'https://verses.quran.com/'
const WORD_AUDIO_HOST = 'https://audio.qurancdn.com/'

/** Absolute URL for an audio path returned by the API ("Alafasy/mp3/001001.mp3" or "//mirrors…"). */
export function resolveAudioUrl(path: string, host: string = VERSE_AUDIO_HOST): string {
  if (/^https?:\/\//i.test(path)) return path
  if (path.startsWith('//')) return `https:${path}`
  return host + path.replace(/^\/+/, '')
}

export const verseAudioUrl = (path: string) => resolveAudioUrl(path, VERSE_AUDIO_HOST)
export const wordAudioUrl = (path: string) => resolveAudioUrl(path, WORD_AUDIO_HOST)

export const SPEED_MIN = 0.75
export const SPEED_MAX = 1.5
export const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5] as const

export function clampSpeed(value: unknown): number {
  const n = Number(value)
  if (!Number.isFinite(n)) return 1
  return Math.min(SPEED_MAX, Math.max(SPEED_MIN, n))
}

/** Repeat counts offered in the UI. 0 means "infinite". */
export const REPEAT_OPTIONS = [1, 3, 5, 10, 0] as const

export function normalizeRepeatCount(value: unknown): number {
  const n = Number(value)
  return (REPEAT_OPTIONS as readonly number[]).includes(n) ? n : 1
}

// ---------------------------------------------------------------------------
// Playback state machine (verse-by-verse, repeat & Hifz range)
// ---------------------------------------------------------------------------

export interface PlaybackRange {
  surah: number
  from: number
  to: number
}

export interface PlaybackConfig {
  /** How often each verse is played. 0 = infinite. */
  repeatCount: number
  /** Optional Hifz loop; only applies while playing inside this surah and range. */
  range: PlaybackRange | null
  /** Continue with the next surah after the last verse. */
  continueNext: boolean
}

export interface PlaybackPos {
  surah: number
  verse: number
  /** Completed plays of this verse before the current one (0 on first play). */
  repeatsDone: number
}

export type PlaybackStep = ({ type: 'play' } & PlaybackPos) | { type: 'stop' }

/** Normalises a range: ordered, within the surah, null when unusable. */
export function normalizeRange(range: PlaybackRange | null | undefined, versesCount: number): PlaybackRange | null {
  if (!range) return null
  const from = Math.max(1, Math.min(versesCount, Math.floor(range.from)))
  const to = Math.max(1, Math.min(versesCount, Math.floor(range.to)))
  if (!Number.isFinite(from) || !Number.isFinite(to)) return null
  return { surah: range.surah, from: Math.min(from, to), to: Math.max(from, to) }
}

/** Is `verse` inside the active range (for the given surah)? */
export function inRange(range: PlaybackRange | null, surah: number, verse: number): boolean {
  return !!range && range.surah === surah && verse >= range.from && verse <= range.to
}

/**
 * Decides what happens when the current verse finished playing.
 * - repeat the same verse until `repeatCount` plays are done (0 = forever)
 * - inside a Hifz range: after its last verse jump back to the range start (loops until stopped)
 * - otherwise advance to the next verse, optionally into the next surah, else stop.
 */
export function nextAfterEnd(
  pos: PlaybackPos,
  cfg: PlaybackConfig,
  versesCount: (surah: number) => number,
): PlaybackStep {
  const played = pos.repeatsDone + 1
  if (cfg.repeatCount === 0 || played < cfg.repeatCount) {
    return { type: 'play', surah: pos.surah, verse: pos.verse, repeatsDone: played }
  }

  const range = cfg.range
  if (inRange(range, pos.surah, pos.verse)) {
    if (pos.verse >= range!.to) {
      return { type: 'play', surah: pos.surah, verse: range!.from, repeatsDone: 0 }
    }
    return { type: 'play', surah: pos.surah, verse: pos.verse + 1, repeatsDone: 0 }
  }

  const next = stepVerse(pos, 1, versesCount, cfg.continueNext)
  return next ? { type: 'play', ...next, repeatsDone: 0 } : { type: 'stop' }
}

/**
 * Manual prev/next verse. Crosses surah borders (next only when `crossSurah`),
 * returns null at the very beginning / end (or when crossing is disabled).
 */
export function stepVerse(
  pos: VerseRef,
  dir: 1 | -1,
  versesCount: (surah: number) => number,
  crossSurah = true,
): VerseRef | null {
  if (dir === 1) {
    if (pos.verse < versesCount(pos.surah)) return { surah: pos.surah, verse: pos.verse + 1 }
    if (!crossSurah || pos.surah >= SURAH_COUNT) return null
    return { surah: pos.surah + 1, verse: 1 }
  }
  if (pos.verse > 1) return { surah: pos.surah, verse: pos.verse - 1 }
  if (pos.surah <= 1) return null
  const prev = pos.surah - 1
  return { surah: prev, verse: Math.max(1, versesCount(prev)) }
}

// ---------------------------------------------------------------------------
// Persisted audio / reader settings
// ---------------------------------------------------------------------------

export interface AudioSettings {
  speed: number
  repeatCount: number
  continueNext: boolean
}

export const DEFAULT_AUDIO_SETTINGS: AudioSettings = { speed: 1, repeatCount: 1, continueNext: true }

export function normalizeAudioSettings(raw: unknown): AudioSettings {
  const o = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  return {
    speed: clampSpeed(o.speed ?? 1),
    repeatCount: normalizeRepeatCount(o.repeatCount ?? 1),
    continueNext: typeof o.continueNext === 'boolean' ? o.continueNext : DEFAULT_AUDIO_SETTINGS.continueNext,
  }
}

export const TRANSLATION_IDS = { tr: 52, de: 27, en: 20 } as const
export const TRANSLITERATION_ID = 57

export interface ReaderSettings {
  /** Arabic font size in px. */
  arabicSize: number
  /** Translation font size in px. */
  translationSize: number
  /** Active translation resource ids; null = never chosen (fall back to the app locale). */
  translations: number[] | null
  showTransliteration: boolean
  wordByWord: boolean
  autoScroll: boolean
  tafsirId: number
}

export const ARABIC_SIZE_MIN = 20
export const ARABIC_SIZE_MAX = 48
export const TRANSLATION_SIZE_MIN = 12
export const TRANSLATION_SIZE_MAX = 22

export const DEFAULT_READER_SETTINGS: ReaderSettings = {
  arabicSize: 28,
  translationSize: 14,
  translations: null,
  showTransliteration: false,
  wordByWord: false,
  autoScroll: true,
  tafsirId: 169,
}

function clampInt(value: unknown, min: number, max: number, fallback: number): number {
  const n = Number(value)
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, Math.round(n)))
}

export function normalizeReaderSettings(raw: unknown): ReaderSettings {
  const o = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  const valid = new Set<number>(Object.values(TRANSLATION_IDS))
  const translations = Array.isArray(o.translations)
    ? [...new Set((o.translations as unknown[]).map(Number).filter(n => valid.has(n)))]
    : null
  const d = DEFAULT_READER_SETTINGS
  return {
    arabicSize: clampInt(o.arabicSize, ARABIC_SIZE_MIN, ARABIC_SIZE_MAX, d.arabicSize),
    translationSize: clampInt(o.translationSize, TRANSLATION_SIZE_MIN, TRANSLATION_SIZE_MAX, d.translationSize),
    translations,
    showTransliteration: typeof o.showTransliteration === 'boolean' ? o.showTransliteration : d.showTransliteration,
    wordByWord: typeof o.wordByWord === 'boolean' ? o.wordByWord : d.wordByWord,
    autoScroll: typeof o.autoScroll === 'boolean' ? o.autoScroll : d.autoScroll,
    tafsirId: TAFSIRS.some(t => t.id === o.tafsirId) ? (o.tafsirId as number) : d.tafsirId,
  }
}

// ---------------------------------------------------------------------------
// Tafsir & chapter info
// ---------------------------------------------------------------------------

export interface TafsirSource {
  id: number
  /** Display name (proper names are not translated). */
  name: string
  lang: 'en' | 'ar'
}

/** quran.com has no German or Turkish tafsir — only English and Arabic. */
export const TAFSIRS: readonly TafsirSource[] = [
  { id: 169, name: 'Ibn Kathir (abridged)', lang: 'en' },
  { id: 168, name: "Ma'arif al-Qur'an", lang: 'en' },
  { id: 16, name: 'Tafsir al-Muyassar', lang: 'ar' },
  { id: 91, name: "Al-Sa'di", lang: 'ar' },
]

const ALLOWED_TAGS = new Set(['p', 'br', 'b', 'strong', 'i', 'em', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'blockquote', 'span'])
const VOID_TAGS = new Set(['br'])
/** Elements whose entire content must be dropped, not just the tags. */
const DROP_CONTENT_TAGS = ['script', 'style', 'iframe', 'object', 'embed', 'noscript', 'template', 'svg', 'math']

const TAG_RE = /^<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/

/**
 * Sanitizes quran.com tafsir / chapter-info HTML for `v-html`.
 * Whitelist: p, br, b, strong, i, em, h2-h4, ul, ol, li, blockquote, span — all WITHOUT attributes.
 * Every other tag is removed (its text is kept, except script/style/iframe… which are dropped
 * with their content). Stray `<` / `>` are escaped, tags are re-balanced.
 */
export function sanitizeQuranHtml(input: unknown): string {
  if (typeof input !== 'string' || !input) return ''
  let html = input.replace(/<!--[\s\S]*?(?:-->|$)/g, '')
  for (const tag of DROP_CONTENT_TAGS) {
    html = html.replace(new RegExp(`<${tag}\\b[\\s\\S]*?(?:<\\/${tag}\\s*>|$)`, 'gi'), '')
  }

  let out = ''
  const stack: string[] = []
  let i = 0
  while (i < html.length) {
    const ch = html[i]!
    if (ch === '<') {
      const m = TAG_RE.exec(html.slice(i))
      if (m) {
        const closing = m[1] === '/'
        const name = m[2]!.toLowerCase()
        if (ALLOWED_TAGS.has(name)) {
          if (VOID_TAGS.has(name)) {
            if (!closing) out += '<br>'
          }
          else if (closing) {
            const idx = stack.lastIndexOf(name)
            if (idx !== -1) {
              while (stack.length > idx) out += `</${stack.pop()}>`
            }
          }
          else {
            stack.push(name)
            out += `<${name}>`
          }
        }
        i += m[0].length
        continue
      }
      out += '&lt;'
      i++
      continue
    }
    out += ch === '>' ? '&gt;' : ch
    i++
  }
  while (stack.length) out += `</${stack.pop()}>`
  return out.trim()
}

/** Strips every tag; used for plain-text translations / transliteration. */
export function stripHtml(input: unknown): string {
  return typeof input === 'string' ? input.replace(/<[^>]*>/g, '').trim() : ''
}

// ---------------------------------------------------------------------------
// Juz
// ---------------------------------------------------------------------------

/** First verse [surah, verse] of each of the 30 juz (index 0 = juz 1). */
export const JUZ_STARTS: readonly (readonly [number, number])[] = [
  [1, 1], [2, 142], [2, 253], [3, 93], [4, 24], [4, 148], [5, 82], [6, 111], [7, 88], [8, 41],
  [9, 93], [11, 6], [12, 53], [15, 1], [17, 1], [18, 75], [21, 1], [23, 1], [25, 21], [27, 56],
  [29, 46], [33, 31], [36, 28], [39, 32], [41, 47], [46, 1], [51, 31], [58, 1], [67, 1], [78, 1],
]

export function juzStart(juz: number): VerseRef | null {
  const s = JUZ_STARTS[juz - 1]
  return s ? { surah: s[0], verse: s[1] } : null
}

/** The juz a verse belongs to (1–30). */
export function juzOf(surah: number, verse: number): number {
  let juz = 1
  for (let i = 0; i < JUZ_STARTS.length; i++) {
    const [s, v] = JUZ_STARTS[i]!
    if (surah > s || (surah === s && verse >= v)) juz = i + 1
    else break
  }
  return juz
}
