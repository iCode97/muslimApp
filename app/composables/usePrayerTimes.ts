/**
 * Composable for fetching and managing prayer times via Aladhan API.
 * Uses Method 13 (Diyanet) as default.
 */

interface PrayerTime {
  name: string
  time: string       // "HH:mm" format
  timestamp: number  // Unix timestamp for today
  passed: boolean
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

  // Parse "HH:mm" to today's timestamp
  function timeToTimestamp(timeStr: string): number {
    const [hours, minutes] = timeStr.split(':').map(Number)
    const now = new Date()
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0)
    return date.getTime()
  }

  // Format today's date for Aladhan API (DD-MM-YYYY)
  function formatDate(): string {
    const now = new Date()
    const dd = String(now.getDate()).padStart(2, '0')
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const yyyy = now.getFullYear()
    return `${dd}-${mm}-${yyyy}`
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
    }))

    // Find next upcoming prayer
    const nextPrayer = prayers.find(p => !p.passed) || null

    return { ...prayerData, prayers, nextPrayer }
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

      const nextPrayer = prayers.find(p => !p.passed) || null

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

  // Update passed/next prayer status (call every minute)
  function refresh() {
    if (data.value) {
      data.value = recalculatePassed(data.value)
    }
  }

  return {
    data: readonly(data),
    loading: readonly(loading),
    error: readonly(error),
    fetchTimes,
    loadCache,
    refresh,
    PRAYER_I18N,
  }
}
