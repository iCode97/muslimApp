/**
 * Prayer tracker composable.
 * Tracks the 5 daily prayers per day with three states:
 *   'none' (open) → 'done' (prayed on time) → 'qada' (made up later) → 'none'
 * Persisted in localStorage, fully offline.
 */

export const TRACKED_PRAYERS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const
export type TrackedPrayer = typeof TRACKED_PRAYERS[number]
export type PrayerStatus = 'none' | 'done' | 'qada'

export type DayRecord = Record<TrackedPrayer, PrayerStatus>
type TrackerData = Record<string, DayRecord>

const STORAGE_KEY = 'muslimapp-prayer-tracker'
/** Keep at most one year of history to bound localStorage usage. */
const MAX_DAYS = 366

function emptyDay(): DayRecord {
  return { fajr: 'none', dhuhr: 'none', asr: 'none', maghrib: 'none', isha: 'none' }
}

/** Local date key, e.g. "2026-06-09" (not UTC — prayers belong to the local day). */
export function dateKey(date: Date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function usePrayerTracker() {
  const data = useState<TrackerData>('prayer-tracker', () => ({}))

  function load() {
    if (import.meta.server) return
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        data.value = JSON.parse(saved)
      }
      catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }

  function save() {
    if (!import.meta.client) return
    // Prune oldest entries beyond MAX_DAYS (keys sort chronologically)
    const keys = Object.keys(data.value).sort()
    if (keys.length > MAX_DAYS) {
      for (const key of keys.slice(0, keys.length - MAX_DAYS)) {
        delete data.value[key]
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.value))
  }

  function getDay(key: string = dateKey()): DayRecord {
    return data.value[key] ?? emptyDay()
  }

  function setStatus(prayer: TrackedPrayer, status: PrayerStatus, key: string = dateKey()) {
    const day = { ...getDay(key), [prayer]: status }
    data.value = { ...data.value, [key]: day }
    save()
  }

  /** Cycle a prayer's status: none → done → qada → none */
  function cycleStatus(prayer: TrackedPrayer, key: string = dateKey()) {
    const current = getDay(key)[prayer]
    const next: PrayerStatus = current === 'none' ? 'done' : current === 'done' ? 'qada' : 'none'
    setStatus(prayer, next, key)
  }

  /** A day counts as complete when all 5 prayers are done or made up. */
  function isDayComplete(key: string): boolean {
    const day = data.value[key]
    if (!day) return false
    return TRACKED_PRAYERS.every(p => day[p] === 'done' || day[p] === 'qada')
  }

  function countPrayed(key: string): number {
    const day = data.value[key]
    if (!day) return 0
    return TRACKED_PRAYERS.filter(p => day[p] === 'done' || day[p] === 'qada').length
  }

  /**
   * Consecutive complete days. Today only counts when already complete;
   * an incomplete today doesn't break a streak that ran until yesterday.
   */
  const streak = computed(() => {
    let count = 0
    const cursor = new Date()
    if (!isDayComplete(dateKey(cursor))) {
      cursor.setDate(cursor.getDate() - 1)
    }
    while (isDayComplete(dateKey(cursor))) {
      count++
      cursor.setDate(cursor.getDate() - 1)
    }
    return count
  })

  /** Percentage of prayers marked done/qada over the last `days` days (incl. today). */
  function statsPercent(days: number): number {
    let prayed = 0
    const cursor = new Date()
    for (let i = 0; i < days; i++) {
      prayed += countPrayed(dateKey(cursor))
      cursor.setDate(cursor.getDate() - 1)
    }
    return Math.round((prayed / (days * TRACKED_PRAYERS.length)) * 100)
  }

  /** Last 7 days (oldest first) for the week grid. */
  const week = computed(() => {
    const result: { key: string, date: Date, record: DayRecord, complete: boolean }[] = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const key = dateKey(date)
      result.push({ key, date, record: getDay(key), complete: isDayComplete(key) })
    }
    return result
  })

  const today = computed(() => getDay(dateKey()))
  const todayCount = computed(() => countPrayed(dateKey()))

  function resetAll() {
    data.value = {}
    if (import.meta.client) {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return {
    data: readonly(data),
    today,
    todayCount,
    week,
    streak,
    load,
    getDay,
    setStatus,
    cycleStatus,
    isDayComplete,
    countPrayed,
    statsPercent,
    resetAll,
    TRACKED_PRAYERS,
  }
}
