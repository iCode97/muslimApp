/**
 * Favorite tools — user-pinned quick-access tools shown at the top of /more.
 *
 * Replaces the old customizable mobile nav. Stored in localStorage under
 * `muslimapp-favorite-tools` (NOT `muslimapp-favorites`, which already holds
 * the saved Quran verses, see useFavorites).
 *
 * Migration: if the legacy `muslimapp-mobile-nav` key exists and no favorites
 * have been stored yet, it seeds the favorites (without prayer/quran/settings)
 * and is deleted afterwards.
 */
import { FAVORITABLE_ITEMS, type ToolItem } from '~/composables/useNavigation'

const STORAGE_KEY = 'muslimapp-favorite-tools'
const LEGACY_NAV_KEY = 'muslimapp-mobile-nav'
const LEGACY_EXCLUDED = ['prayer', 'quran', 'settings']
export const MAX_FAVORITE_TOOLS = 6

const KNOWN_IDS = FAVORITABLE_ITEMS.map(i => i.id)

function sanitize(ids: unknown): string[] {
  if (!Array.isArray(ids)) return []
  const seen = new Set<string>()
  for (const id of ids) {
    if (typeof id === 'string' && KNOWN_IDS.includes(id)) seen.add(id)
  }
  return [...seen].slice(0, MAX_FAVORITE_TOOLS)
}

export function useFavoriteTools() {
  const ids = useState<string[]>('favorite-tool-ids', () => [])
  const loaded = useState<boolean>('favorite-tools-loaded', () => false)

  function save() {
    if (import.meta.server) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.value))
    }
    catch { /* storage unavailable — keep in-memory state */ }
  }

  function load() {
    if (import.meta.server || loaded.value) return
    loaded.value = true
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      const legacy = localStorage.getItem(LEGACY_NAV_KEY)

      if (saved !== null) {
        try {
          ids.value = sanitize(JSON.parse(saved))
        }
        catch {
          localStorage.removeItem(STORAGE_KEY)
        }
      }
      else if (legacy !== null) {
        try {
          const parsed = JSON.parse(legacy) as unknown
          const seeded = sanitize(
            Array.isArray(parsed) ? parsed.filter(id => !LEGACY_EXCLUDED.includes(id)) : [],
          )
          ids.value = seeded
          save()
        }
        catch { /* corrupt legacy value — ignore */ }
      }

      if (legacy !== null) localStorage.removeItem(LEGACY_NAV_KEY)
    }
    catch { /* storage unavailable */ }
  }

  const items = computed<ToolItem[]>(() =>
    ids.value
      .map(id => FAVORITABLE_ITEMS.find(i => i.id === id))
      .filter((i): i is ToolItem => !!i),
  )

  const isFavorite = (id: string) => ids.value.includes(id)
  const isFull = computed(() => ids.value.length >= MAX_FAVORITE_TOOLS)

  /** Add or remove a tool. Returns false if adding failed because the list is full. */
  function toggle(id: string): boolean {
    if (!KNOWN_IDS.includes(id)) return false
    if (ids.value.includes(id)) {
      ids.value = ids.value.filter(i => i !== id)
      save()
      return true
    }
    if (ids.value.length >= MAX_FAVORITE_TOOLS) return false
    ids.value = [...ids.value, id]
    save()
    return true
  }

  function remove(id: string) {
    if (!ids.value.includes(id)) return
    ids.value = ids.value.filter(i => i !== id)
    save()
  }

  /** Touch-friendly reorder (no drag-and-drop). */
  function move(id: string, direction: 'up' | 'down') {
    const idx = ids.value.indexOf(id)
    if (idx < 0) return
    const target = direction === 'up' ? idx - 1 : idx + 1
    if (target < 0 || target >= ids.value.length) return
    const next = [...ids.value]
    const tmp = next[idx]!
    next[idx] = next[target]!
    next[target] = tmp
    ids.value = next
    save()
  }

  return {
    ids: readonly(ids),
    items,
    maxFavorites: MAX_FAVORITE_TOOLS,
    isFull,
    isFavorite,
    toggle,
    remove,
    move,
    load,
  }
}
