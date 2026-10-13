/**
 * Composable for fetching Quran data via quran.com API v4.
 * Supports Arabic (Uthmani), Turkish (Elmalılı Hamdi), and German (Bubenheim) translations.
 * Language-aware: surahs and search use the active app locale.
 */

export interface Surah {
  id: number
  revelationPlace: string
  revelationOrder: number
  bismillahPre: boolean
  nameSimple: string
  nameComplex: string
  nameArabic: string
  versesCount: number
  pages: number[]
  translatedName: string
}

export interface Verse {
  id: number
  verseNumber: number
  verseKey: string        // e.g. "1:1"
  textUthmani: string     // Arabic text
  translations: {
    id: number
    text: string
    resourceName: string
    languageName: string
  }[]
}

export interface SearchResult {
  verseKey: string
  text: string
  surahName: string
  verseNumber: number
}

import { SURAH_NAMES_DE } from '~/data/surah-names-de'

// Translation IDs from quran.com API
const TRANSLATIONS = {
  turkish: 52,     // Elmalılı Hamdi Yazır
  german: 27,      // Bubenheim & Elyas
  english: 20,     // Sahih International
} as const

// Map app locale → quran.com API language code
const LOCALE_MAP: Record<string, string> = {
  de: 'de',
  en: 'en',
  tr: 'tr',
  ar: 'en', // surah name translations: English fallback (Arabic names come from nameArabic)
}

const CACHE_PREFIX = 'muslimapp-quran'

// Guards against out-of-order responses when the user switches surahs quickly
let verseFetchToken = 0

export function useQuran() {
  const config = useRuntimeConfig()
  const { t, locale } = useI18n()
  const baseUrl = config.public.quranBaseUrl

  const surahs = useState<Surah[]>('quran-surahs', () => [])
  const surahsLocale = useState<string>('quran-surahs-locale', () => '')
  const currentVerses = useState<Verse[]>('quran-verses', () => [])
  const verseCache = useState<Record<number, Verse[]>>('quran-verse-cache', () => ({}))
  const loading = ref(false)
  const searchLoading = ref(false)
  const error = ref<string | null>(null)

  // Get API language from current locale
  function apiLang(): string {
    return LOCALE_MAP[locale.value] ?? 'en'
  }

  // Fetch all 114 surahs (locale-aware, cached per language)
  async function fetchSurahs(forceRefresh = false): Promise<void> {
    const lang = apiLang()

    // Return from memory if same language
    if (!forceRefresh && surahs.value.length > 0 && surahsLocale.value === lang) return

    // Try localStorage cache for this language
    const cacheKey = `${CACHE_PREFIX}-surahs-${lang}`
    if (!forceRefresh && import.meta.client) {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        try {
          surahs.value = JSON.parse(cached)
          surahsLocale.value = lang
          return
        }
        catch {
          localStorage.removeItem(cacheKey)
        }
      }
    }

    loading.value = true
    error.value = null

    try {
      const response = await $fetch<{
        chapters: Array<{
          id: number
          revelation_place: string
          revelation_order: number
          bismillah_pre: boolean
          name_simple: string
          name_complex: string
          name_arabic: string
          verses_count: number
          pages: number[]
          translated_name: { name: string }
        }>
      }>(`${baseUrl}/chapters`, {
        params: { language: lang },
      })

      surahs.value = response.chapters.map(ch => ({
        id: ch.id,
        revelationPlace: ch.revelation_place,
        revelationOrder: ch.revelation_order,
        bismillahPre: ch.bismillah_pre,
        nameSimple: ch.name_simple,
        nameComplex: ch.name_complex,
        nameArabic: ch.name_arabic,
        versesCount: ch.verses_count,
        pages: ch.pages,
        // quran.com API returns English names for language=de, so we use local translations
        translatedName: lang === 'de'
          ? (SURAH_NAMES_DE[ch.id] ?? ch.translated_name.name)
          : ch.translated_name.name,
      }))

      surahsLocale.value = lang

      if (import.meta.client) {
        localStorage.setItem(cacheKey, JSON.stringify(surahs.value))
      }
    }
    catch (err) {
      error.value = t('errors.surahLoad')
      console.error('Quran surahs fetch error:', err)
    }
    finally {
      loading.value = false
    }
  }

  // Fetch ALL verses of a surah with translations (a surah has at most 286 verses,
  // the API serves up to 300 per page). Order: memory → IndexedDB (offline) → API.
  async function fetchVerses(surahId: number): Promise<void> {
    const token = ++verseFetchToken
    error.value = null

    // 0. Session memory cache
    const memory = verseCache.value[surahId]
    if (memory) {
      currentVerses.value = memory
      loading.value = false
      return
    }

    loading.value = true

    // 1. Try IndexedDB offline storage first
    if (import.meta.client) {
      try {
        const offlineQuran = useOfflineQuran()
        const offlineVerses = await offlineQuran.getSurahOffline(surahId)
        if (offlineVerses && offlineVerses.length > 0) {
          if (token !== verseFetchToken) return
          verseCache.value = { ...verseCache.value, [surahId]: offlineVerses }
          currentVerses.value = offlineVerses
          loading.value = false
          return
        }
      } catch {
        // IndexedDB not available, continue to API
      }
    }

    // Drop legacy per-page caches (they only ever held the first 50 verses)
    if (import.meta.client) {
      try {
        Object.keys(localStorage)
          .filter(k => /^muslimapp-quran-surah-\d+-p\d+$/.test(k))
          .forEach(k => localStorage.removeItem(k))
      } catch { /* storage unavailable */ }
    }

    // 2. Fetch from API (the service worker keeps a copy for offline re-reads)
    try {
      const translationIds = `${TRANSLATIONS.turkish},${TRANSLATIONS.german},${TRANSLATIONS.english}`

      const [arabicRes, translationRes] = await Promise.all([
        $fetch<{
          verses: Array<{
            id: number
            verse_number: number
            verse_key: string
            text_uthmani: string
          }>
        }>(`${baseUrl}/quran/verses/uthmani`, {
          params: { chapter_number: surahId },
        }),
        $fetch<{
          verses: Array<{
            id: number
            verse_number: number
            verse_key: string
            translations: Array<{
              resource_id: number
              text: string
              resource_name: string
              language_name: string
            }>
          }>
        }>(`${baseUrl}/verses/by_chapter/${surahId}`, {
          params: {
            translations: translationIds,
            language: apiLang(),
            per_page: 300,
            fields: 'verse_key',
          },
        }),
      ])

      if (token !== verseFetchToken) return

      const verses: Verse[] = translationRes.verses.map((tv, index) => {
        const arabicVerse = arabicRes.verses.find(a => a.verse_key === tv.verse_key) ?? arabicRes.verses[index]
        return {
          id: tv.id,
          verseNumber: tv.verse_number,
          verseKey: tv.verse_key,
          textUthmani: arabicVerse?.text_uthmani ?? '',
          translations: tv.translations.map(t => ({
            id: t.resource_id,
            text: t.text.replace(/<[^>]*>/g, ''),
            resourceName: t.resource_name,
            languageName: t.language_name,
          })),
        }
      })

      verseCache.value = { ...verseCache.value, [surahId]: verses }
      currentVerses.value = verses
    }
    catch (err) {
      if (token !== verseFetchToken) return
      error.value = t('errors.verseLoad')
      console.error('Quran verses fetch error:', err)
    }
    finally {
      if (token === verseFetchToken) loading.value = false
    }
  }

  // Search the Quran — uses current app locale
  async function search(query: string): Promise<SearchResult[]> {
    if (!query.trim()) return []

    searchLoading.value = true
    error.value = null

    try {
      const response = await $fetch<{
        search: {
          results: Array<{
            verse_key: string
            text: string
            translations: Array<{ text: string }>
          }>
        }
      }>(`${baseUrl}/search`, {
        params: {
          q: query,
          language: apiLang(),
        },
      })

      return response.search.results.map(r => {
        const [surahNum, verseNum] = r.verse_key.split(':').map(Number)
        const surah = surahs.value.find(s => s.id === surahNum)

        return {
          verseKey: r.verse_key,
          text: r.translations?.[0]?.text?.replace(/<[^>]*>/g, '') ?? r.text,
          surahName: surah?.nameSimple ?? `Surah ${surahNum}`,
          verseNumber: verseNum ?? 0,
        }
      })
    }
    catch (err) {
      error.value = t('errors.searchFailed')
      console.error('Quran search error:', err)
      return []
    }
    finally {
      searchLoading.value = false
    }
  }

  function getSurah(id: number): Surah | undefined {
    return surahs.value.find(s => s.id === id)
  }

  return {
    surahs: readonly(surahs),
    currentVerses: readonly(currentVerses),
    loading: readonly(loading),
    searchLoading: readonly(searchLoading),
    error: readonly(error),
    fetchSurahs,
    fetchVerses,
    search,
    getSurah,
    TRANSLATIONS,
  }
}
