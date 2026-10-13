/**
 * Adhkar progress composable.
 *
 * Keeps today's per-set counters, the morning/evening completion history
 * (for streaks) and reading preferences in localStorage (`muslimapp-adhkar`,
 * picked up by useBackup). Counters reset automatically when the local date
 * changes. All logic lives in `~/utils/adhkar` (pure, unit-tested).
 */
import { getAdhkarSet, type AdhkarSetId, type Dhikr } from '~/data/adhkar'
import {
  ADHKAR_STORAGE_KEY,
  ADHKAR_STREAK_SET_IDS,
  addAdhkarCompletion,
  adhkarCount,
  adhkarDateKey,
  adhkarSetProgress,
  adhkarStreak,
  emptyAdhkarStore,
  incrementDhikr,
  parseAdhkarStore,
  rolloverAdhkarStore,
  type AdhkarCounts,
  type AdhkarPrefs,
  type AdhkarSetProgress,
  type AdhkarStore,
  type AdhkarStreakSetId,
} from '~/utils/adhkar'

const EMPTY_COUNTS: AdhkarCounts = Object.freeze({}) as AdhkarCounts

function isStreakSet(id: string): id is AdhkarStreakSetId {
  return (ADHKAR_STREAK_SET_IDS as readonly string[]).includes(id)
}

export function useAdhkar() {
  const store = useState<AdhkarStore>('adhkar-store', () => emptyAdhkarStore(adhkarDateKey()))
  const loaded = useState<boolean>('adhkar-loaded', () => false)

  function save() {
    if (import.meta.server) return
    try {
      localStorage.setItem(ADHKAR_STORAGE_KEY, JSON.stringify(store.value))
    }
    catch { /* storage unavailable — keep in-memory state */ }
  }

  function load() {
    if (import.meta.server) return
    let raw: string | null = null
    try {
      raw = localStorage.getItem(ADHKAR_STORAGE_KEY)
    }
    catch { /* storage unavailable */ }
    store.value = parseAdhkarStore(raw, adhkarDateKey())
    loaded.value = true
  }

  /** Reset counters if the app stayed open past midnight. */
  function ensureToday() {
    const today = adhkarDateKey()
    if (store.value.date !== today) {
      store.value = rolloverAdhkarStore(store.value, today)
      save()
    }
  }

  function countsFor(setId: AdhkarSetId): AdhkarCounts {
    return store.value.progress[setId] ?? EMPTY_COUNTS
  }

  function countOf(setId: AdhkarSetId, item: Dhikr): number {
    return adhkarCount(countsFor(setId), item)
  }

  function progressFor(setId: AdhkarSetId): AdhkarSetProgress {
    const set = getAdhkarSet(setId)
    return adhkarSetProgress(set?.items ?? [], countsFor(setId))
  }

  /**
   * Count one repetition of `item` in `setId`.
   * Returns flags so the UI can give feedback / auto-advance.
   */
  function increment(setId: AdhkarSetId, item: Dhikr): {
    count: number
    itemCompleted: boolean
    setCompleted: boolean
  } {
    ensureToday()
    const before = countsFor(setId)
    const result = incrementDhikr(before, item)
    if (result.counts === before) {
      return { count: result.count, itemCompleted: false, setCompleted: false }
    }
    const progress = { ...store.value.progress, [setId]: result.counts }
    let completed = store.value.completed
    const set = getAdhkarSet(setId)
    const setCompleted = result.justCompleted && !!set && adhkarSetProgress(set.items, result.counts).complete
    if (setCompleted && isStreakSet(setId)) {
      completed = { ...completed, [setId]: addAdhkarCompletion(completed[setId], store.value.date) }
    }
    store.value = { ...store.value, progress, completed }
    save()
    return { count: result.count, itemCompleted: result.justCompleted, setCompleted }
  }

  /** Clear today's counters of one set (streak history stays untouched). */
  function resetSet(setId: AdhkarSetId) {
    ensureToday()
    const progress = { ...store.value.progress }
    delete progress[setId]
    store.value = { ...store.value, progress }
    save()
  }

  function streak(setId: AdhkarStreakSetId): number {
    return adhkarStreak(store.value.completed[setId], adhkarDateKey())
  }

  function completedToday(setId: AdhkarStreakSetId): boolean {
    return store.value.completed[setId].includes(adhkarDateKey())
  }

  const prefs = computed(() => store.value.prefs)

  function setPref<K extends keyof AdhkarPrefs>(key: K, value: AdhkarPrefs[K]) {
    store.value = { ...store.value, prefs: { ...store.value.prefs, [key]: value } }
    save()
  }

  return {
    store: readonly(store),
    loaded: readonly(loaded),
    prefs,
    load,
    ensureToday,
    countsFor,
    countOf,
    progressFor,
    increment,
    resetSet,
    streak,
    completedToday,
    setPref,
  }
}
