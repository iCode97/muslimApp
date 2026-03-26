/**
 * Offline Quran storage composable using IndexedDB.
 * Downloads all 114 surahs with Arabic text + translations for offline reading.
 * Supports per-language downloads.
 */

import type { Verse } from './useQuran'

const DB_NAME = 'muslimapp-quran-offline'
const DB_VERSION = 1
const STORE_NAME = 'verses'
const META_STORE = 'meta'
const STORAGE_KEY = 'muslimapp-offline-quran-status'

export interface OfflineStatus {
  downloaded: boolean
  languages: string[]         // e.g. ['ar', 'de', 'tr', 'en']
  surahsDownloaded: number
  totalSurahs: number
  lastUpdated: number | null
  sizeEstimateMB: number
}

// Translation IDs
const TRANSLATION_IDS: Record<string, number> = {
  tr: 52,   // Elmalılı Hamdi Yazır
  de: 27,   // Bubenheim & Elyas
  en: 20,   // Sahih International
}

export function useOfflineQuran() {
  const config = useRuntimeConfig()

  const status = useState<OfflineStatus>('offline-quran-status', () => ({
    downloaded: false,
    languages: [],
    surahsDownloaded: 0,
    totalSurahs: 114,
    lastUpdated: null,
    sizeEstimateMB: 0,
  }))

  const downloading = ref(false)
  const downloadProgress = ref(0)    // 0-114
  const downloadError = ref<string | null>(null)

  // Open IndexedDB
  function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'surahId' })
        }
        if (!db.objectStoreNames.contains(META_STORE)) {
          db.createObjectStore(META_STORE, { keyPath: 'key' })
        }
      }

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  // Store surah verses in IndexedDB
  async function storeSurah(db: IDBDatabase, surahId: number, verses: Verse[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      store.put({ surahId, verses, timestamp: Date.now() })
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  }

  // Get surah verses from IndexedDB
  async function getSurahOffline(surahId: number): Promise<Verse[] | null> {
    if (import.meta.server) return null

    try {
      const db = await openDB()
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly')
        const store = tx.objectStore(STORE_NAME)
        const request = store.get(surahId)
        request.onsuccess = () => {
          const result = request.result
          resolve(result ? result.verses : null)
        }
        request.onerror = () => resolve(null)
      })
    } catch {
      return null
    }
  }

  // Check how many surahs are stored
  async function checkStatus(): Promise<void> {
    if (import.meta.server) return

    // Load from quick localStorage cache first
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        status.value = { ...status.value, ...parsed }
      } catch {
        // ignore
      }
    }

    try {
      const db = await openDB()
      const tx = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)
      const countReq = store.count()

      countReq.onsuccess = () => {
        status.value.surahsDownloaded = countReq.result
        status.value.downloaded = countReq.result >= 114
        saveStatus()
      }
    } catch {
      // IndexedDB not available
    }
  }

  function saveStatus() {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(status.value))
    }
  }

  // Download all 114 surahs with Arabic + selected translations
  async function downloadAll(languages: string[] = ['de', 'tr', 'en']): Promise<boolean> {
    if (import.meta.server) return false

    downloading.value = true
    downloadProgress.value = 0
    downloadError.value = null

    const baseUrl = config.public.quranBaseUrl
    const translationIds = languages
      .map(lang => TRANSLATION_IDS[lang])
      .filter(Boolean)
      .join(',')

    try {
      const db = await openDB()

      for (let surahId = 1; surahId <= 114; surahId++) {
        try {
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
                per_page: 300, // Max verses in a surah (Al-Baqarah = 286)
                fields: 'verse_key',
              },
            }),
          ])

          // Merge Arabic + translations
          const verses: Verse[] = translationRes.verses.map((tv, index) => {
            const arabicVerse = arabicRes.verses[index]
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

          await storeSurah(db, surahId, verses)
          downloadProgress.value = surahId
          status.value.surahsDownloaded = surahId

          // Small delay to avoid rate limiting
          if (surahId % 10 === 0) {
            await new Promise(r => setTimeout(r, 500))
          }
        } catch (err) {
          console.error(`Failed to download surah ${surahId}:`, err)
          // Continue with next surah instead of aborting
          await new Promise(r => setTimeout(r, 1000))
        }
      }

      status.value.downloaded = true
      status.value.languages = languages
      status.value.lastUpdated = Date.now()
      status.value.sizeEstimateMB = Math.round(downloadProgress.value * 0.12) // ~0.12MB per surah avg
      saveStatus()

      return true
    } catch (err) {
      downloadError.value = String(err)
      console.error('Offline download error:', err)
      return false
    } finally {
      downloading.value = false
    }
  }

  // Delete all offline data
  async function deleteAll(): Promise<void> {
    if (import.meta.server) return

    try {
      const db = await openDB()
      const tx = db.transaction([STORE_NAME, META_STORE], 'readwrite')
      tx.objectStore(STORE_NAME).clear()
      tx.objectStore(META_STORE).clear()

      status.value = {
        downloaded: false,
        languages: [],
        surahsDownloaded: 0,
        totalSurahs: 114,
        lastUpdated: null,
        sizeEstimateMB: 0,
      }
      saveStatus()
    } catch (err) {
      console.error('Delete offline data error:', err)
    }
  }

  return {
    status: readonly(status),
    downloading: readonly(downloading),
    downloadProgress: readonly(downloadProgress),
    downloadError: readonly(downloadError),
    checkStatus,
    getSurahOffline,
    downloadAll,
    deleteAll,
  }
}
