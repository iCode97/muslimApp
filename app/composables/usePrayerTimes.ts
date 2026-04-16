/**
 * Composable for fetching and managing prayer times via Aladhan API.
 * Uses Method 13 (Diyanet) as default.
 *
 * Caching strategy:
 *   - Whole month is fetched once via /calendar/{year}/{month} and cached in
 *     localStorage. Daily timings are resolved from this cache, so opening
 *     the app offline still works for any day in the current month.
 *   - When the user crosses into a new month the next month is fetched.
 *   - A legacy single-day cache is read once (for users upgrading) and then
 *     replaced by the monthly cache.
 */

interface PrayerTime {
  name: string
  time: string       // "HH:mm" format
  timestamp: number  // Unix timestamp for the relevant day
  passed: boolean
  isNextDay?: boolean // true if this is tomorrow's prayer
}

interface HijriDate {
  day: string
  month: string
  monthAr: string
  year: string
  designation: string
}

interface PrayerTimesData {
  prayers: PrayerTime[]
  tomorrowPrayers: PrayerTime[]  // Full tomorrow prayer list for two-section view
  nextPrayer: PrayerTime | null
  hijriDate: HijriDate
  gregorianDate: string
}

/** Raw Aladhan timings for a single day, used inside the month cache. */
interface DayRaw {
  timings: Record<string, string>
  hijri: HijriDate
}

interface MonthCache {
  /** e.g. "2026-4" — identifies the Gregorian month this cache covers */
  key: string
  /** Coordinates used when fetching — invalidate if location changes */
  latitude: number
  longitude: number
  /** Calculation method used when fetching */
  method: number
  /** Map "DD-MM-YYYY" → raw day data */
  days: Record<string, DayRaw>
  fetchedAt: number
}

// Prayer name mapping
const PRAYER_KEYS = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const
const PRAYER_I18N: Record<string, string> = {
  Fajr: 'prayer.fajr',
  Sunrise: 'prayer.sunrise',
  Dhuhr: 'prayer.dhuhr',
  Asr: 'prayer.asr',
  Maghrib: 'prayer.maghrib',
  Isha: 'prayer.isha',
}

const LEGACY_CACHE_KEY = 'muslimapp-prayer-times'
const MONTH_CACHE_KEY = 'muslimapp-prayer-month'
const METHOD_KEY = 'muslimapp-prayer-method'
const DEFAULT_METHOD = 13

export function usePrayerTimes() {
  const { t } = useI18n()
  const data = useState<PrayerTimesData | null>('prayer-times', () => null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const method = useState<number>('prayer-method', () => {
    if (import.meta.client) {
      const saved = localStorage.getItem(METHOD_KEY)
      return saved ? Number(saved) : DEFAULT_METHOD
    }
    return DEFAULT_METHOD
  })

  function setMethod(methodId: number) {
    method.value = methodId
    if (import.meta.client) {
      localStorage.setItem(METHOD_KEY, String(methodId))
      // Invalidate caches when method changes
      localStorage.removeItem(LEGACY_CACHE_KEY)
      localStorage.removeItem(MONTH_CACHE_KEY)
    }
  }

  // Parse "HH:mm" to a specific day's timestamp
  function timeToTimestamp(timeStr: string, date?: Date): number {
    const [hours, minutes] = timeStr.split(':').map(Number)
    const d = date ?? new Date()
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), hours, minutes, 0).getTime()
  }

  // Format a date for Aladhan API (DD-MM-YYYY)
  function formatDate(date?: Date): string {
    const d = date ?? new Date()
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = d.getFullYear()
    return `${dd}-${mm}-${yyyy}`
  }

  // Get tomorrow's date
  function getTomorrow(): Date {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d
  }

  function monthCacheKey(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}`
  }

  function readMonthCache(): MonthCache | null {
    if (import.meta.server) return null
    const raw = localStorage.getItem(MONTH_CACHE_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as MonthCache
    } catch {
      localStorage.removeItem(MONTH_CACHE_KEY)
      return null
    }
  }

  function writeMonthCache(cache: MonthCache) {
    if (import.meta.client) {
      localStorage.setItem(MONTH_CACHE_KEY, JSON.stringify(cache))
    }
  }

  /**
   * Convert a raw Aladhan day into our PrayerTime[] list.
   * @param dayDate the Gregorian date the timings apply to
   */
  function dayToPrayers(day: DayRaw, dayDate: Date, isNextDay = false): PrayerTime[] {
    return PRAYER_KEYS.map(key => {
      const rawTime = day.timings[key] ?? '00:00'
      const cleanTime = rawTime.replace(/\s*\(.*\)/, '')
      const timestamp = timeToTimestamp(cleanTime, dayDate)
      return {
        name: key,
        time: cleanTime,
        timestamp,
        passed: !isNextDay && Date.now() > timestamp,
        isNextDay,
      }
    })
  }

  /**
   * Build a PrayerTimesData snapshot for a specific day using month-cache data.
   */
  function buildFromCache(cache: MonthCache, day: Date, tomorrow: Date): PrayerTimesData | null {
    const dayKey = formatDate(day)
    const tomorrowKey = formatDate(tomorrow)
    const today = cache.days[dayKey]
    if (!today) return null

    const prayers = dayToPrayers(today, day, false)
    const tomorrowDay = cache.days[tomorrowKey]
    const tomorrowPrayers = tomorrowDay ? dayToPrayers(tomorrowDay, tomorrow, true) : []

    const allPassed = prayers.every(p => p.passed)
    const tomorrowFajr = tomorrowPrayers.find(p => p.name === 'Fajr') || null
    const nextPrayer = prayers.find(p => !p.passed)
      || (allPassed && tomorrowFajr ? { ...tomorrowFajr, passed: false, isNextDay: true } : null)

    return {
      prayers,
      tomorrowPrayers,
      nextPrayer,
      hijriDate: today.hijri,
      gregorianDate: dayKey,
    }
  }

  // Recalculate which prayers have passed (for countdown updates)
  function recalculatePassed(prayerData: PrayerTimesData): PrayerTimesData {
    const now = Date.now()
    const prayers = prayerData.prayers.map(p => ({
      ...p,
      passed: now > p.timestamp,
      isNextDay: false,
    }))

    let nextPrayer = prayers.find(p => !p.passed) || null
    if (!nextPrayer && prayerData.tomorrowPrayers.length > 0) {
      const tomorrowFajr = prayerData.tomorrowPrayers.find(p => p.name === 'Fajr')
      if (tomorrowFajr) {
        nextPrayer = { ...tomorrowFajr, passed: false, isNextDay: true }
      }
    }

    return { ...prayerData, prayers, nextPrayer }
  }

  /**
   * Attempt to populate `data` from the month cache. Returns true on hit.
   */
  function loadCache(): PrayerTimesData | null {
    if (import.meta.server) return null

    // Prefer the month cache
    const cache = readMonthCache()
    if (cache) {
      const today = new Date()
      const snapshot = buildFromCache(cache, today, getTomorrow())
      if (snapshot) {
        data.value = snapshot
        return snapshot
      }
    }

    // Legacy single-day cache (pre-monthly release)
    const legacy = localStorage.getItem(LEGACY_CACHE_KEY)
    if (legacy) {
      try {
        const parsed = JSON.parse(legacy) as PrayerTimesData
        if (parsed.gregorianDate === formatDate()) {
          data.value = recalculatePassed(parsed)
          return data.value
        }
      } catch {
        localStorage.removeItem(LEGACY_CACHE_KEY)
      }
    }

    return null
  }

  /**
   * Fetch all timings for a given Gregorian month via Aladhan /calendar and
   * cache them.
   */
  async function fetchMonth(latitude: number, longitude: number, date: Date): Promise<MonthCache | null> {
    const year = date.getFullYear()
    const mon = date.getMonth() + 1
    try {
      const response = await $fetch<{
        data: Array<{
          timings: Record<string, string>
          date: {
            gregorian: { date: string }
            hijri: {
              day: string
              month: { en: string, ar: string, number: number }
              year: string
              designation: { abbreviated: string }
            }
          }
        }>
      }>(`/api/aladhan/calendar/${year}/${mon}`, {
        params: { latitude, longitude, method: method.value },
      })

      const days: Record<string, DayRaw> = {}
      for (const entry of response.data) {
        const dateStr = entry.date.gregorian.date // "DD-MM-YYYY"
        const h = entry.date.hijri
        days[dateStr] = {
          timings: entry.timings,
          hijri: {
            day: h.day,
            month: h.month.en,
            monthAr: h.month.ar,
            year: h.year,
            designation: h.designation.abbreviated,
          },
        }
      }

      const cache: MonthCache = {
        key: monthCacheKey(date),
        latitude,
        longitude,
        method: method.value,
        days,
        fetchedAt: Date.now(),
      }
      writeMonthCache(cache)
      return cache
    } catch (err) {
      console.error('Month calendar fetch error:', err)
      return null
    }
  }

  /**
   * Load today's + tomorrow's prayer times. Prefers the month cache, fetches
   * the calendar if the cache is stale, missing, or doesn't cover both days.
   */
  async function fetchTimes(latitude: number, longitude: number): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const today = new Date()
      const tomorrow = getTomorrow()
      const todayMonthKey = monthCacheKey(today)
      const tomorrowMonthKey = monthCacheKey(tomorrow)

      let cache = readMonthCache()
      const cacheValid = (c: MonthCache | null): c is MonthCache =>
        !!c
        && c.method === method.value
        && Math.abs(c.latitude - latitude) < 0.01
        && Math.abs(c.longitude - longitude) < 0.01

      // Need today's month
      if (!cacheValid(cache) || cache.key !== todayMonthKey) {
        cache = await fetchMonth(latitude, longitude, today)
      }

      if (!cache) {
        throw new Error('no prayer data available')
      }

      let snapshot = buildFromCache(cache, today, tomorrow)

      // If tomorrow rolls into the next month, fetch it and merge.
      if (!snapshot || todayMonthKey !== tomorrowMonthKey) {
        const nextCache = await fetchMonth(latitude, longitude, tomorrow)
        if (nextCache) {
          // Build snapshot using today's month + tomorrow's month merged on the fly
          const today_raw = cache.days[formatDate(today)]
          const tomorrow_raw = nextCache.days[formatDate(tomorrow)]
          if (today_raw) {
            const prayers = dayToPrayers(today_raw, today, false)
            const tomorrowPrayers = tomorrow_raw ? dayToPrayers(tomorrow_raw, tomorrow, true) : []
            const allPassed = prayers.every(p => p.passed)
            const tomorrowFajr = tomorrowPrayers.find(p => p.name === 'Fajr') || null
            const nextPrayer = prayers.find(p => !p.passed)
              || (allPassed && tomorrowFajr ? { ...tomorrowFajr, passed: false, isNextDay: true } : null)

            snapshot = {
              prayers,
              tomorrowPrayers,
              nextPrayer,
              hijriDate: today_raw.hijri,
              gregorianDate: formatDate(today),
            }
          }
        }
      }

      if (!snapshot) throw new Error('failed to build prayer snapshot')
      data.value = snapshot
    }
    catch (err) {
      error.value = t('errors.prayerLoad')
      console.error('Prayer times fetch error:', err)
    }
    finally {
      loading.value = false
    }
  }

  // Update passed/next prayer status (call every 30s)
  function refresh() {
    if (!data.value) return
    data.value = recalculatePassed(data.value)
  }

  return {
    data: readonly(data),
    loading: readonly(loading),
    error: readonly(error),
    method: readonly(method),
    fetchTimes,
    fetchMonth,
    loadCache,
    refresh,
    setMethod,
    PRAYER_I18N,
  }
}
