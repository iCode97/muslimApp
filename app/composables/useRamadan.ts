/**
 * Ramadan composable — Manages Ramadan-specific state:
 * - Detects if current month is Ramadan (via Hijri date from prayer times)
 * - Fasting tracker (mark days as fasted)
 * - Khatam tracker (Quran completion in 30 days — 1 Juz per day)
 * - Iftar/Suhoor times derived from existing prayer times (Maghrib = Iftar, Fajr = Suhoor end)
 */

interface RamadanState {
  fastingDays: Record<number, boolean> // day number (1-30) → fasted
  khatamProgress: number // juz completed (0-30)
  year: number // Hijri year to detect reset
}

const STORAGE_KEY = 'muslimapp-ramadan'

export function useRamadan() {
  const prayerTimes = usePrayerTimes()

  const state = useState<RamadanState>('ramadan', () => ({
    fastingDays: {},
    khatamProgress: 0,
    year: 0,
  }))

  // Check if currently Ramadan based on cached Hijri date
  const isRamadan = computed(() => {
    const h = prayerTimes.data.value?.hijriDate
    if (!h) return false
    // Month name check (Aladhan API returns English month names)
    return h.month.toLowerCase().includes('ramad') || h.month.toLowerCase().includes('ramazan')
  })

  // Current Hijri day (for marking today's fast)
  const hijriDay = computed(() => {
    const h = prayerTimes.data.value?.hijriDate
    return h ? Number(h.day) : 0
  })

  const hijriYear = computed(() => {
    const h = prayerTimes.data.value?.hijriDate
    return h ? Number(h.year) : 0
  })

  // Iftar time = Maghrib prayer time
  const iftarTime = computed(() => {
    const prayers = prayerTimes.data.value?.prayers
    if (!prayers) return null
    return prayers.find(p => p.name === 'Maghrib') || null
  })

  // Suhoor end = Fajr prayer time
  const suhoorEndTime = computed(() => {
    const prayers = prayerTimes.data.value?.prayers
    if (!prayers) return null
    return prayers.find(p => p.name === 'Fajr') || null
  })

  // Is it currently fasting time? (between Fajr and Maghrib)
  const isFastingTime = computed(() => {
    if (!suhoorEndTime.value || !iftarTime.value) return false
    const now = Date.now()
    return now >= suhoorEndTime.value.timestamp && now < iftarTime.value.timestamp
  })

  // Countdown target: Iftar during fasting, Suhoor end before Fajr
  const countdownTarget = computed(() => {
    if (isFastingTime.value) return iftarTime.value
    return suhoorEndTime.value
  })

  // Fasting stats
  const fastedDaysCount = computed(() =>
    Object.values(state.value.fastingDays).filter(Boolean).length,
  )

  const fastingProgress = computed(() =>
    Math.round((fastedDaysCount.value / 30) * 100),
  )

  const khatamProgress = computed(() =>
    Math.round((state.value.khatamProgress / 30) * 100),
  )

  function loadState() {
    if (import.meta.server) return
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as RamadanState
        // Reset if new Hijri year
        if (hijriYear.value && parsed.year !== hijriYear.value) {
          state.value = { fastingDays: {}, khatamProgress: 0, year: hijriYear.value }
          saveState()
        } else {
          state.value = parsed
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    } else if (hijriYear.value) {
      state.value.year = hijriYear.value
    }
  }

  function saveState() {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.value))
    }
  }

  function toggleFastingDay(day: number) {
    state.value.fastingDays[day] = !state.value.fastingDays[day]
    state.value = { ...state.value }
    saveState()
  }

  function isFasted(day: number): boolean {
    return !!state.value.fastingDays[day]
  }

  function incrementKhatam() {
    if (state.value.khatamProgress < 30) {
      state.value.khatamProgress++
      state.value = { ...state.value }
      saveState()
    }
  }

  function decrementKhatam() {
    if (state.value.khatamProgress > 0) {
      state.value.khatamProgress--
      state.value = { ...state.value }
      saveState()
    }
  }

  function resetAll() {
    state.value = { fastingDays: {}, khatamProgress: 0, year: hijriYear.value || state.value.year }
    saveState()
  }

  return {
    state: readonly(state),
    isRamadan,
    hijriDay,
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
