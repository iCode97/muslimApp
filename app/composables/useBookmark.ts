/**
 * Composable for managing Quran reading bookmarks.
 * Persists the last reading position in localStorage.
 */

interface Bookmark {
  surahId: number
  surahName: string
  verseNumber: number
  verseKey: string
  timestamp: number
}

const STORAGE_KEY = 'muslimapp-quran-bookmark'

export function useBookmark() {
  const { t } = useI18n()
  const bookmark = useState<Bookmark | null>('quran-bookmark', () => null)

  // Load saved bookmark
  function load(): Bookmark | null {
    if (import.meta.server) return null

    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        bookmark.value = JSON.parse(saved)
        return bookmark.value
      }
      catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    return null
  }

  // Save current reading position
  function save(surahId: number, surahName: string, verseNumber: number) {
    const data: Bookmark = {
      surahId,
      surahName,
      verseKey: `${surahId}:${verseNumber}`,
      verseNumber,
      timestamp: Date.now(),
    }

    bookmark.value = data

    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
  }

  // Clear bookmark
  function clear() {
    bookmark.value = null
    if (import.meta.client) {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  // Format relative time since bookmark
  function timeAgo(): string {
    if (!bookmark.value) return ''

    const diff = Date.now() - bookmark.value.timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return t('timeAgo.daysAgo', { n: days }, days)
    if (hours > 0) return t('timeAgo.hoursAgo', { n: hours }, hours)
    if (minutes > 0) return t('timeAgo.minutesAgo', { n: minutes }, minutes)
    return t('timeAgo.justNow')
  }

  return {
    bookmark: readonly(bookmark),
    load,
    save,
    clear,
    timeAgo,
  }
}
