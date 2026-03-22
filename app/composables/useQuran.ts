/**
 * Composable for fetching Quran data via quran.com API v4.
 * Supports Arabic (Uthmani), Turkish (Elmalılı Hamdi), and German (Bubenheim) translations.
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

// Translation IDs from quran.com API
const TRANSLATIONS = {
  turkish: 52,     // Elmalılı Hamdi Yazır
  german: 27,      // Bubenheim & Elyas
} as const

const CACHE_PREFIX = 'muslimapp-quran'

export function useQuran() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.quranBaseUrl

  const surahs = useState<Surah[]>('quran-surahs', () => [])
  const currentVerses = useState<Verse[]>('quran-verses', () => [])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Fetch all 114 surahs
  async function fetchSurahs(): Promise<void> {
    // Return from cache if available
    if (surahs.value.length > 0) return

    // Try localStorage cache
    if (import.meta.client) {
      const cached = localStorage.getItem(`${CACHE_PREFIX}-surahs`)
      if (cached) {
        try {
          surahs.value = JSON.parse(cached)
          return
        }
        catch {
          localStorage.removeItem(`${CACHE_PREFIX}-surahs`)
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
        params: { language: 'de' },
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
        translatedName: ch.translated_name.name,
      }))

      // Cache in localStorage
      if (import.meta.client) {
        localStorage.setItem(`${CACHE_PREFIX}-surahs`, JSON.stringify(surahs.value))
      }
    }
    catch (err) {
      error.value = 'Suren konnten nicht geladen werden.'
      console.error('Quran surahs fetch error:', err)
    }
    finally {
      loading.value = false
    }
  }

  // Fetch verses for a specific surah with translations
  async function fetchVerses(surahId: number, page: number = 1, perPage: number = 50): Promise<void> {
    loading.value = true
    error.value = null

    // Try localStorage cache for this surah + page
    const cacheKey = `${CACHE_PREFIX}-surah-${surahId}-p${page}`
    if (import.meta.client) {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        try {
          currentVerses.value = JSON.parse(cached)
          loading.value = false
          return
        }
        catch {
          localStorage.removeItem(cacheKey)
        }
      }
    }

    try {
      const translationIds = `${TRANSLATIONS.turkish},${TRANSLATIONS.german}`

      // Fetch Arabic text + translations in parallel
      const [arabicRes, translationRes] = await Promise.all([
        $fetch<{
          verses: Array<{
            id: number
            verse_number: number
            verse_key: string
            text_uthmani: string
          }>
        }>(`${baseUrl}/quran/verses/uthmani`, {
          params: {
            chapter_number: surahId,
          },
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
            language: 'de',
            per_page: perPage,
            page,
            fields: 'verse_key',
          },
        }),
      ])

      // Merge Arabic text with translations
      currentVerses.value = translationRes.verses.map((tv, index) => {
        const arabicVerse = arabicRes.verses[index + (page - 1) * perPage]

        return {
          id: tv.id,
          verseNumber: tv.verse_number,
          verseKey: tv.verse_key,
          textUthmani: arabicVerse?.text_uthmani ?? '',
          translations: tv.translations.map(t => ({
            id: t.resource_id,
            text: t.text.replace(/<[^>]*>/g, ''), // Strip HTML tags
            resourceName: t.resource_name,
            languageName: t.language_name,
          })),
        }
      })

      // Cache
      if (import.meta.client) {
        localStorage.setItem(cacheKey, JSON.stringify(currentVerses.value))
      }
    }
    catch (err) {
      error.value = 'Verse konnten nicht geladen werden.'
      console.error('Quran verses fetch error:', err)
    }
    finally {
      loading.value = false
    }
  }

  // Search the Quran
  async function search(query: string, language: string = 'de'): Promise<SearchResult[]> {
    if (!query.trim()) return []

    loading.value = true
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
          language,
        },
      })

      return response.search.results.map(r => {
        const [surahNum, verseNum] = r.verse_key.split(':').map(Number)
        const surah = surahs.value.find(s => s.id === surahNum)

        return {
          verseKey: r.verse_key,
          text: r.translations?.[0]?.text?.replace(/<[^>]*>/g, '') ?? r.text,
          surahName: surah?.nameSimple ?? `Sure ${surahNum}`,
          verseNumber: verseNum,
        }
      })
    }
    catch (err) {
      error.value = 'Suche fehlgeschlagen.'
      console.error('Quran search error:', err)
      return []
    }
    finally {
      loading.value = false
    }
  }

  // Get a specific surah by ID
  function getSurah(id: number): Surah | undefined {
    return surahs.value.find(s => s.id === id)
  }

  return {
    surahs: readonly(surahs),
    currentVerses: readonly(currentVerses),
    loading: readonly(loading),
    error: readonly(error),
    fetchSurahs,
    fetchVerses,
    search,
    getSurah,
    TRANSLATIONS,
  }
}
