/**
 * Ramadan composable — Manages Ramadan-specific state:
 * - Detects if today is in Ramadan (Hijri month 9) via the prayer-times API's
 *   Hijri date, falling back to a local Umm al-Qura calculation (Intl)
 * - Fasting tracker + Khatam tracker, stored per Hijri year
 * - Countdown to the next Ramadan when outside of it
 * - Iftar/Suhoor times derived from the shared prayer times
 *   (Maghrib = Iftar, Fajr = end of Suhoor)
 *
 * Storage (`muslimapp-ramadan`):
 *   { version: 2, years: { "1447": { fastingDays: { 1: true, … }, khatamProgress: 12 } } }
 * The pre-v2 shape `{ fastingDays, khatamProgress, year }` is migrated to the
 * Ramadan it most likely belongs to (see migrateLegacy).
 */

import {
  addDays,
  daysBetween,
  hijriDateInZone,
  parseDdMmYyyy,
  resolveTimeZone,
  todayInZone,
  type YMD,
} from '~/utils/time'

export interface RamadanYearData {
  fastingDays: Record<number, boolean> // day number (1-30) → fasted
  khatamProgress: number // juz completed (0-30)
}

interface RamadanStore {
  version: 2
  years: Record<string, RamadanYearData>
}

interface LegacyRamadanState {
  fastingDays?: Record<number, boolean>
  khatamProgress?: number
  year?: number
}

const STORAGE_KEY = 'muslimapp-ramadan'
const RAMADAN_MONTH = 9
const RAMADAN_DAYS = 30

function emptyYear(): RamadanYearData {
  return { fastingDays: {}, khatamProgress: 0 }
}

function hasProgress(data: RamadanYearData | undefined): boolean {
  return !!data && (Object.values(data.fastingDays).some(Boolean) || data.khatamProgress > 0)
}

/** Hijri year of the most recent Ramadan that has started (incl. the current one). */
function lastRamadanYearOf(hijri: YMD): number {
  return hijri.month >= RAMADAN_MONTH ? hijri.year : hijri.year - 1
}

/** Hijri year of the next Ramadan that hasn't started yet. */
function nextRamadanYearOf(hijri: YMD): number {
  return hijri.month < RAMADAN_MONTH ? hijri.year : hijri.year + 1
}

export function useRamadan() {
  const prayerTimes = usePrayerTimes()
  const { location, ready } = useLocation()

  const store = useState<RamadanStore>('ramadan-store', () => ({ version: 2, years: {} }))
  const nextStart = useState<{ year: number, date: YMD } | null>('ramadan-next-start', () => null)
  /** Show last year's tracker (read-only) while outside Ramadan */
  const showPastYear = ref(false)

  const timeZone = computed(() => resolveTimeZone(prayerTimes.data.value?.timezone ?? location.value?.timezone))

  /**
   * Today's Hijri date. Prefers the API date (same source as the rest of the
   * app); falls back to a local calculation when no prayer data is available.
   * Only evaluated on the client after hydration to avoid SSR mismatches.
   */
  const hijriToday = computed<YMD | null>(() => {
    const h = prayerTimes.data.value?.hijriDate
    if (h?.monthNumber) {
      return { day: Number(h.day), month: h.monthNumber, year: Number(h.year) }
    }
    if (!ready.value) return null
    // Re-evaluate when the prayer data's date changes (e.g. at midnight)
    void prayerTimes.data.value?.gregorianDate
    return hijriDateInZone(Date.now(), timeZone.value)
  })

  const isRamadan = computed(() => hijriToday.value?.month === RAMADAN_MONTH)

  // Current Hijri day during Ramadan (for marking today's fast), else 0
  const hijriDay = computed(() => (isRamadan.value ? hijriToday.value!.day : 0))

  const hijriYear = computed(() => hijriToday.value?.year ?? 0)

  const lastRamadanYear = computed(() => (hijriToday.value ? lastRamadanYearOf(hijriToday.value) : 0))
  const nextRamadanYear = computed(() => (hijriToday.value ? nextRamadanYearOf(hijriToday.value) : 0))

  /** Hijri year whose tracker is shown, or null if none should be shown. */
  const trackerYear = computed<number | null>(() => {
    if (!hijriToday.value) return null
    if (isRamadan.value) return hijriToday.value.year
    return showPastYear.value ? lastRamadanYear.value : null
  })

  /** Trackers can only be edited for the ongoing Ramadan. */
  const isReadOnly = computed(() => !isRamadan.value)

  /** Whether last year's Ramadan has any recorded progress. */
  const hasPastData = computed(() => hasProgress(store.value.years[String(lastRamadanYear.value)]))

  /** Tracker data of the shown year (backwards-compatible `state` shape). */
  const state = computed(() => {
    const year = trackerYear.value ?? 0
    const data = store.value.years[String(year)] ?? emptyYear()
    return { ...data, year }
  })

  // Iftar/Suhoor are derived from the `passed` flags, which the global prayer
  // sync updates exactly at Fajr/Maghrib — so these are reactive without polling.
  const todayPrayers = computed(() => prayerTimes.data.value?.prayers ?? [])
  const tomorrowPrayers = computed(() => prayerTimes.data.value?.tomorrowPrayers ?? [])
  const findPrayer = <T extends { name: string }>(list: readonly T[], name: string): T | undefined =>
    list.find(p => p.name === name)

  /** Upcoming end of Suhoor (today's Fajr, or tomorrow's once it passed). */
  const suhoorEndTime = computed(() => {
    const fajr = findPrayer(todayPrayers.value, 'Fajr')
    if (!fajr) return null
    return fajr.passed ? (findPrayer(tomorrowPrayers.value, 'Fajr') ?? fajr) : fajr
  })

  /** Upcoming Iftar (today's Maghrib, or tomorrow's once it passed). */
  const iftarTime = computed(() => {
    const maghrib = findPrayer(todayPrayers.value, 'Maghrib')
    if (!maghrib) return null
    return maghrib.passed ? (findPrayer(tomorrowPrayers.value, 'Maghrib') ?? maghrib) : maghrib
  })

  // Is it currently fasting time? (between Fajr and Maghrib)
  const isFastingTime = computed(() => {
    const fajr = findPrayer(todayPrayers.value, 'Fajr')
    const maghrib = findPrayer(todayPrayers.value, 'Maghrib')
    return !!fajr && !!maghrib && fajr.passed && !maghrib.passed
  })

  // Countdown target: Iftar during fasting, otherwise the next Suhoor end
  const countdownTarget = computed(() => (isFastingTime.value ? iftarTime.value : suhoorEndTime.value))

  // Tracker stats (for the shown year)
  const fastedDaysCount = computed(() =>
    Object.values(state.value.fastingDays).filter(Boolean).length,
  )

  const fastingProgress = computed(() =>
    Math.round((fastedDaysCount.value / RAMADAN_DAYS) * 100),
  )

  const khatamProgress = computed(() =>
    Math.round((state.value.khatamProgress / RAMADAN_DAYS) * 100),
  )

  // Next Ramadan countdown
  const daysUntilRamadan = computed<number | null>(() => {
    if (!nextStart.value || nextStart.value.year !== nextRamadanYear.value) return null
    // Re-evaluate when the prayer data's date changes (e.g. at midnight)
    void prayerTimes.data.value?.gregorianDate
    return Math.max(0, daysBetween(todayInZone(timeZone.value), nextStart.value.date))
  })

  const nextRamadanStartDate = computed(() =>
    nextStart.value && nextStart.value.year === nextRamadanYear.value ? nextStart.value.date : null,
  )

  /**
   * Resolve the Gregorian start date of the next Ramadan (1 Ramadan) via the
   * Aladhan proxy, falling back to a local Umm al-Qura scan when offline.
   */
  async function loadNextRamadanStart(): Promise<void> {
    const year = nextRamadanYear.value
    if (!year || nextStart.value?.year === year) return
    try {
      const response = await $fetch<{ data: { gregorian: { date: string } } }>(`/api/aladhan/hToG/01-09-${year}`)
      const date = parseDdMmYyyy(response.data.gregorian.date)
      if (!date) throw new Error('invalid hToG date')
      nextStart.value = { year, date }
    }
    catch {
      const tz = timeZone.value
      let day = todayInZone(tz)
      for (let i = 0; i < 400; i++) {
        day = addDays(day, 1)
        // Noon avoids DST edge cases when mapping a calendar day to an instant
        const h = hijriDateInZone(Date.UTC(day.year, day.month - 1, day.day, 12), 'UTC')
        if (h && h.month === RAMADAN_MONTH && h.day === 1) {
          nextStart.value = { year, date: day }
          return
        }
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Persistence
  // ---------------------------------------------------------------------------

  /**
   * Map a pre-v2 tracker to a Hijri year. `legacy.year` was the Hijri year at
   * the time of saving; if that year's Ramadan hasn't happened yet, the data
   * belongs to the previous Ramadan. Unknown year → most recent Ramadan.
   */
  function migrateLegacy(legacy: LegacyRamadanState): RamadanStore {
    const migrated: RamadanStore = { version: 2, years: {} }
    const data: RamadanYearData = {
      fastingDays: legacy.fastingDays ?? {},
      khatamProgress: Number(legacy.khatamProgress) || 0,
    }
    if (!hasProgress(data)) return migrated

    const today = hijriToday.value ?? hijriDateInZone(Date.now(), timeZone.value)
    let targetYear = Number(legacy.year) || 0
    if (today) {
      if (!targetYear) targetYear = lastRamadanYearOf(today)
      else if (targetYear >= today.year && today.month < RAMADAN_MONTH) targetYear = today.year - 1
    }
    if (targetYear) migrated.years[String(targetYear)] = data
    return migrated
  }

  function loadState() {
    if (import.meta.server) return
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return
    try {
      const parsed = JSON.parse(saved) as RamadanStore | LegacyRamadanState
      if ('version' in parsed && parsed.version === 2 && parsed.years) {
        store.value = parsed
      }
      else {
        store.value = migrateLegacy(parsed as LegacyRamadanState)
        saveState()
      }
    }
    catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  function saveState() {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store.value))
    }
  }

  /** Apply a change to the ongoing Ramadan's tracker (no-op when read-only). */
  function updateCurrentYear(mutate: (data: RamadanYearData) => RamadanYearData) {
    if (isReadOnly.value || !trackerYear.value) return
    const key = String(trackerYear.value)
    const current = store.value.years[key] ?? emptyYear()
    store.value = { ...store.value, years: { ...store.value.years, [key]: mutate(current) } }
    saveState()
  }

  function toggleFastingDay(day: number) {
    updateCurrentYear(d => ({ ...d, fastingDays: { ...d.fastingDays, [day]: !d.fastingDays[day] } }))
  }

  function isFasted(day: number): boolean {
    return !!state.value.fastingDays[day]
  }

  function incrementKhatam() {
    updateCurrentYear(d => ({ ...d, khatamProgress: Math.min(RAMADAN_DAYS, d.khatamProgress + 1) }))
  }

  function decrementKhatam() {
    updateCurrentYear(d => ({ ...d, khatamProgress: Math.max(0, d.khatamProgress - 1) }))
  }

  function resetAll() {
    updateCurrentYear(() => emptyYear())
  }

  return {
    state,
    isRamadan,
    hijriDay,
    hijriYear,
    hijriToday,
    trackerYear,
    isReadOnly,
    showPastYear,
    hasPastData,
    lastRamadanYear,
    nextRamadanYear,
    nextRamadanStartDate,
    daysUntilRamadan,
    loadNextRamadanStart,
    iftarTime,
    suhoorEndTime,
    isFastingTime,
    countdownTarget,
    fastedDaysCount,
    fastingProgress,
    khatamProgress,
    loadState,
    toggleFastingDay,
    isFasted,
    incrementKhatam,
    decrementKhatam,
    resetAll,
  }
}
