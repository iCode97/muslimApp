/**
 * Verse favorites composable.
 * Stores hearted verses (Arabic + translations snapshot) in localStorage
 * so the favorites list works fully offline.
 */

import type { Verse } from '~/composables/useQuran'

export interface FavoriteVerse {
  verseKey: string        // e.g. "2:255"
  surahId: number
  verseNumber: number
  textUthmani: string
  translations: Verse['translations']
  savedAt: number
}

const STORAGE_KEY = 'muslimapp-favorites'

export function useFavorites() {
  const favorites = useState<FavoriteVerse[]>('verse-favorites', () => [])

  function load() {
    if (import.meta.server) return
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        favorites.value = JSON.parse(saved)
      }
      catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }

  function save() {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value))
    }
  }

  function isFavorite(verseKey: string): boolean {
    return favorites.value.some(f => f.verseKey === verseKey)
  }

  function add(verse: Verse, surahId: number) {
    if (isFavorite(verse.verseKey)) return
    favorites.value = [
      {
        verseKey: verse.verseKey,
        surahId,
        verseNumber: verse.verseNumber,
        textUthmani: verse.textUthmani,
        translations: [...verse.translations],
        savedAt: Date.now(),
      },
      ...favorites.value,
    ]
    save()
  }

  function remove(verseKey: string) {
    favorites.value = favorites.value.filter(f => f.verseKey !== verseKey)
    save()
  }

  function toggle(verse: Verse, surahId: number) {
    if (isFavorite(verse.verseKey)) {
      remove(verse.verseKey)
    }
    else {
      add(verse, surahId)
    }
  }

  const count = computed(() => favorites.value.length)

  return {
    favorites: readonly(favorites),
    count,
    load,
    isFavorite,
    add,
    remove,
    toggle,
  }
}
