/**
 * Composable for fetching and managing prayer times via Aladhan API.
 * Uses Method 13 (Diyanet) as default.
 * Handles next-day Fajr when all today's prayers have passed.
 */

interface PrayerTime {
  name: string
  time: string       // "HH:mm" format
  timestamp: number  // Unix timestamp for today
  passed: boolean
  isNextDay?: boolean // true if this is tomorrow's prayer
}

interface PrayerTimesData {
  prayers: PrayerTime[]
  nextPrayer: PrayerTime | null
  hijriDate: {
    day: string
    month: string
    monthAr: string
    year: string
    designation: string
  }
  gregorianDate: string
  tomorrowFajr?: PrayerTime | null  // Pre-fetched for after Isha
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

const CACHE_KEY = 'muslimapp-prayer-times'
const DIYANET_METHOD = 13

export function usePrayerTimes() {
  const config = useRuntimeConfig()
  const { t } = useI18n()
  const data = useState<PrayerTimesData | null>('prayer-times', () => null)
  const loading = ref(false)
  const error = ref<string | null>(null)

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

  // Try to load from cache
  function loadCache(): PrayerTimesData | null {
    if (import.meta.server) return null
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null

    try {
      const parsed = JSON.parse(cached)
      // Only use cache if same day
      if (parsed.gregorianDate === formatDate()) {
        data.value = recalculatePassed(parsed)
        return data.value
      }
    }
    catch {
      localStorage.removeItem(CACHE_KEY)
    }
    return null
  }

  // Recalculate which prayers have passed (for countdown updates)
  function recalculatePassed(prayerData: PrayerTimesData): PrayerTimesData {
    const now = Date.now()
    const prayers = prayerData.prayers.map(p => ({
      ...p,
      passed: now > p.timestamp,
      isNextDay: false,
    }))

    // Find next upcoming prayer today
    let nextPrayer = prayers.find(p => !p.passed) || null

    // If all today's prayers have passed, use tomorrow's Fajr
    if (!nextPrayer && prayerData.tomorrowFajr) {
      nextPrayer = {
        ...prayerData.tomorrowFajr,
        passed: false,
        isNextDay: true,
      }
    }

    return { ...prayerData, prayers, nextPrayer }
  }

  // Fetch Fajr time for tomorrow
  async function fetchTomorrowFajr(latitude: number, longitude: number): Promise<PrayerTime | null> {
    try {
      const tomorrow = getTomorrow()
      const dateStr = formatDate(tomorrow)

      const response = await $fetch<{
        data: {
          timings: Record<string, string>
        }
      }>(`${config.public.aladhanBaseUrl}/timings/${dateStr}`, {
        params: {
          latitude,
          longitude,
          method: DIYANET_METHOD,
        },
      })

      const cleanTime = response.data.timings.Fajr.replace(/\s*\(.*\)/, '')
      const timestamp = timeToTimestamp(cleanTime, tomorrow)

      return {
        name: 'Fajr',
        time: cleanTime,
        timestamp,
        passed: false,
        isNextDay: true,
      }
    }
    catch (err) {
      console.error('Tomorrow Fajr fetch error:', err)
      return null
    }
  }

  // Fetch prayer times from Aladhan API
  async function fetchTimes(latitude: number, longitude: number): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const dateStr = formatDate()
      const response = await $fetch<{
        data: {
          timings: Record<string, string>
          date: {
            hijri: {
              day: string
              month: { en: string, ar: string, number: number }
              year: string
              designation: { abbreviated: string }
            }
          }
        }
      }>(`${config.public.aladhanBaseUrl}/timings/${dateStr}`, {
        params: {
          latitude,
          longitude,
          method: DIYANET_METHOD,
        },
      })

      const timings = response.data.timings
      const hijri = response.data.date.hijri

      const prayers: PrayerTime[] = PRAYER_KEYS.map(key => {
        // Aladhan sometimes returns " (EET)" suffix — strip it
        const cleanTime = timings[key].replace(/\s*\(.*\)/, '')
        const timestamp = timeToTimestamp(cleanTime)

        return {
          name: key,
          time: cleanTime,
          timestamp,
          passed: Date.now() > timestamp,
        }
      })

      // Check if all prayers have passed — pre-fetch tomorrow's Fajr
      const allPassed = prayers.every(p => p.passed)
      let tomorrowFajr: PrayerTime | null = null
      if (allPassed) {
        tomorrowFajr = await fetchTomorrowFajr(latitude, longitude)
      }

      const nextPrayer = prayers.find(p => !p.passed) || tomorrowFajr || null

      const prayerData: PrayerTimesData = {
        prayers,
        nextPrayer,
        hijriDate: {
          day: hijri.day,
          month: hijri.month.en,
          monthAr: hijri.month.ar,
          year: hijri.year,
          designation: hijri.designation.abbreviated,
        },
        gregorianDate: dateStr,
        tomorrowFajr,
      }

      data.value = prayerData

      // Cache for today
      if (import.meta.client) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(prayerData))
      }
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

    const updated = recalculatePassed(data.value)

    // If we just transitioned to all-passed and don't have tomorrowFajr yet,
    // we need to fetch it. But we can't do async here, so we trigger it separately.
    if (!updated.nextPrayer && !data.value.tomorrowFajr) {
      // Signal that we need tomorrow's data — handled by the watcher in the page
      data.value = updated
    }
    else {
      data.value = updated
    }
  }

  return {
    data: readonly(data),
    loading: readonly(loading),
    error: readonly(error),
    fetchTimes,
    fetchTomorrowFajr,
    loadCache,
    refresh,
    PRAYER_I18N,
  }
}
