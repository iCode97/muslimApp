/**
 * Universal progress tracking composable.
 * Tracks read/completed items across different content areas
 * with localStorage persistence and a consistent API.
 *
 * Usage:
 *   const progress = useProgress('quran', 114)
 *   progress.markRead(1)        // mark surah 1 as read
 *   progress.toggleRead(1)      // toggle surah 1
 *   progress.isRead(1)          // check if read
 *   progress.percent.value      // 0-100
 *   progress.resetAll()         // clear all progress
 */

export type ProgressType = 'quran' | 'seerah' | 'hadith' | 'names' | 'guide'

const STORAGE_PREFIX = 'muslimapp-progress-'

export function useProgress(type: ProgressType, total: number) {
  const storageKey = `${STORAGE_PREFIX}${type}`

  const readIds = useState<Set<number>>(`progress-${type}`, () => new Set())

  function load() {
    if (import.meta.server) return
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        readIds.value = new Set(JSON.parse(saved))
      }
      catch {
        localStorage.removeItem(storageKey)
      }
    }
  }

  function save() {
    if (import.meta.client) {
      localStorage.setItem(storageKey, JSON.stringify([...readIds.value]))
    }
  }

  function markRead(id: number) {
    readIds.value.add(id)
    readIds.value = new Set(readIds.value) // trigger reactivity
    save()
  }

  function markUnread(id: number) {
    readIds.value.delete(id)
    readIds.value = new Set(readIds.value)
    save()
  }

  function toggleRead(id: number) {
    if (readIds.value.has(id)) {
      markUnread(id)
    }
    else {
      markRead(id)
    }
  }

  function isRead(id: number): boolean {
    return readIds.value.has(id)
  }

  function resetAll() {
    readIds.value = new Set()
    if (import.meta.client) {
      localStorage.removeItem(storageKey)
    }
  }

  const count = computed(() => readIds.value.size)

  const percent = computed(() =>
    total > 0 ? Math.round((readIds.value.size / total) * 100) : 0,
  )

  const summary = computed(() => ({
    read: readIds.value.size,
    total,
    percent: percent.value,
  }))

  return {
    readIds: readonly(readIds),
    count,
    percent,
    summary,
    load,
    markRead,
    markUnread,
    toggleRead,
    isRead,
    resetAll,
  }
}
