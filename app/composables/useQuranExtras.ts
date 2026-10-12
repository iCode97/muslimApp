/**
 * Lazy per-surah / per-verse Quran extras from quran.com API v4:
 * word-by-word, verse transliteration, tafsir and chapter info.
 * Everything is cached in memory (useState) for the session; the service worker
 * additionally caches the API responses for offline re-reads.
 */
import {
  TRANSLITERATION_ID,
  sanitizeQuranHtml,
  stripHtml,
  wordAudioUrl,
} from '~/utils/quran'

// ---------------------------------------------------------------------------
// Word by word
// ---------------------------------------------------------------------------

export interface QuranWord {
  position: number
  text: string
  translation: string
  transliteration: string
  /** Absolute audio URL, null for the verse-end marker. */
  audio: string | null
  /** The ayah-end sign (not a word). */
  isEnd: boolean
}

/** Languages for which quran.com provides word translations (de falls back to en). */
const WBW_LANGS = ['en', 'tr']

let wordAudio: HTMLAudioElement | null = null

export function useQuranWords() {
  const config = useRuntimeConfig()
  const { locale, t } = useI18n()
  const baseUrl = config.public.quranBaseUrl

  const cache = useState<Record<string, Record<string, QuranWord[]>>>('quran-words', () => ({}))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const wbwLang = computed(() => (WBW_LANGS.includes(locale.value) ? locale.value : 'en'))
  /** True when the app language has no word translations and English is shown instead. */
  const isFallback = computed(() => !WBW_LANGS.includes(locale.value))

  const cacheKey = (surah: number) => `${wbwLang.value}:${surah}`

  async function load(surah: number): Promise<void> {
    const key = cacheKey(surah)
    if (cache.value[key]) return
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<{
        verses: Array<{
          verse_key: string
          words: Array<{
            position: number
            text_uthmani?: string
            text?: string
            audio_url: string | null
            char_type_name: string
            translation?: { text?: string }
            transliteration?: { text?: string }
          }>
        }>
      }>(`${baseUrl}/verses/by_chapter/${surah}`, {
        params: {
          words: true,
          word_fields: 'text_uthmani',
          language: wbwLang.value,
          per_page: 300,
          fields: 'verse_key',
        },
      })
      const map: Record<string, QuranWord[]> = {}
      for (const v of res.verses) {
        map[v.verse_key] = v.words.map(w => ({
          position: w.position,
          text: w.text_uthmani || w.text || '',
          translation: stripHtml(w.translation?.text),
          transliteration: stripHtml(w.transliteration?.text),
          audio: w.audio_url ? wordAudioUrl(w.audio_url) : null,
          isEnd: w.char_type_name === 'end',
        }))
      }
      cache.value = { ...cache.value, [key]: map }
    }
    catch (err) {
      error.value = t('reader.wordsError')
      console.error('Quran words fetch error:', err)
    }
    finally {
      loading.value = false
    }
  }

  function wordsFor(surah: number, verseKey: string): QuranWord[] {
    return cache.value[cacheKey(surah)]?.[verseKey] ?? []
  }

  function playWord(url: string | null) {
    if (import.meta.server || !url) return
    try {
      if (!wordAudio) {
        wordAudio = new Audio()
        wordAudio.crossOrigin = 'anonymous'
      }
      wordAudio.pause()
      wordAudio.src = url
      void wordAudio.play().catch(() => {})
    }
    catch {
      // audio unavailable — silently ignore, the text is still shown
    }
  }

  return { loading: readonly(loading), error: readonly(error), wbwLang, isFallback, load, wordsFor, playWord }
}

// ---------------------------------------------------------------------------
// Transliteration (translation resource 57)
// ---------------------------------------------------------------------------

export function useQuranTransliteration() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.quranBaseUrl
  const cache = useState<Record<number, Record<string, string>>>('quran-translit', () => ({}))
  const loading = ref(false)

  async function load(surah: number): Promise<void> {
    if (cache.value[surah]) return
    loading.value = true
    try {
      const res = await $fetch<{
        verses: Array<{ verse_key: string, translations: Array<{ text: string }> }>
      }>(`${baseUrl}/verses/by_chapter/${surah}`, {
        params: { translations: TRANSLITERATION_ID, per_page: 300, fields: 'verse_key' },
      })
      const map: Record<string, string> = {}
      for (const v of res.verses) map[v.verse_key] = stripHtml(v.translations?.[0]?.text)
      cache.value = { ...cache.value, [surah]: map }
    }
    catch (err) {
      console.error('Quran transliteration fetch error:', err)
    }
    finally {
      loading.value = false
    }
  }

  function forVerse(surah: number, verseKey: string): string {
    return cache.value[surah]?.[verseKey] ?? ''
  }

  return { loading: readonly(loading), load, forVerse }
}

// ---------------------------------------------------------------------------
// Tafsir
// ---------------------------------------------------------------------------

export interface TafsirEntry {
  html: string
  name: string
}

export function useQuranTafsir() {
  const config = useRuntimeConfig()
  const { t } = useI18n()
  const baseUrl = config.public.quranBaseUrl
  const cache = useState<Record<string, TafsirEntry>>('quran-tafsir', () => ({}))
  const loading = ref(false)
  const error = ref<string | null>(null)

  /** Resolves to the sanitized entry, or null on failure (error is set). */
  async function load(tafsirId: number, verseKey: string): Promise<TafsirEntry | null> {
    const key = `${tafsirId}:${verseKey}`
    const hit = cache.value[key]
    if (hit) {
      error.value = null
      return hit
    }
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<{ tafsir: { text?: string, resource_name?: string, translated_name?: { name?: string } } }>(
        `${baseUrl}/tafsirs/${tafsirId}/by_ayah/${verseKey}`,
      )
      const entry: TafsirEntry = {
        html: sanitizeQuranHtml(res.tafsir?.text),
        name: res.tafsir?.translated_name?.name || res.tafsir?.resource_name || '',
      }
      cache.value = { ...cache.value, [key]: entry }
      return entry
    }
    catch (err) {
      error.value = t('tafsir.error')
      console.error('Quran tafsir fetch error:', err)
      return null
    }
    finally {
      loading.value = false
    }
  }

  return { loading: readonly(loading), error: readonly(error), load }
}

// ---------------------------------------------------------------------------
// Chapter info ("About this surah")
// ---------------------------------------------------------------------------

export interface ChapterInfo {
  html: string
  source: string
  /** Language actually returned by the API ("english", "turkish", …). */
  languageName: string
}

export function useQuranChapterInfo() {
  const config = useRuntimeConfig()
  const { locale, t } = useI18n()
  const baseUrl = config.public.quranBaseUrl
  const cache = useState<Record<string, ChapterInfo>>('quran-chapter-info', () => ({}))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const LANG_NAMES: Record<string, string> = { de: 'german', en: 'english', tr: 'turkish' }

  async function load(surah: number): Promise<ChapterInfo | null> {
    const lang = LANG_NAMES[locale.value] ? locale.value : 'en'
    const key = `${lang}:${surah}`
    const hit = cache.value[key]
    if (hit) {
      error.value = null
      return hit
    }
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<{
        chapter_info: { text?: string, short_text?: string, source?: string, language_name?: string }
      }>(`${baseUrl}/chapters/${surah}/info`, { params: { language: lang } })
      const info: ChapterInfo = {
        html: sanitizeQuranHtml(res.chapter_info?.text || res.chapter_info?.short_text),
        source: stripHtml(res.chapter_info?.source),
        languageName: (res.chapter_info?.language_name ?? 'english').toLowerCase(),
      }
      cache.value = { ...cache.value, [key]: info }
      return info
    }
    catch (err) {
      error.value = t('quran.infoError')
      console.error('Quran chapter info fetch error:', err)
      return null
    }
    finally {
      loading.value = false
    }
  }

  /** True when the API had to fall back to another language than the app's. */
  function isFallback(info: ChapterInfo): boolean {
    return info.languageName !== (LANG_NAMES[locale.value] ?? 'english')
  }

  return { loading: readonly(loading), error: readonly(error), load, isFallback }
}
