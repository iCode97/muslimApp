/**
 * Composable for Islamic holidays and Hijri calendar.
 * Uses Aladhan API for Hijri date conversion and local holiday data.
 */

import holidayData from '../../data/holidays.json'

export interface Holiday {
  id: string
  nameDE: string
  nameTR: string
  type: 'holiday' | 'kandil' | 'observance'
  hijriMonth: number
  hijriDay: number
  durationDays?: number
  icon: string
  description: string
  isKandil?: boolean
  // Computed for current year
  gregorianDate?: string
  daysUntil?: number
  isPast?: boolean
}

export interface HijriDay {
  hijriDay: number
  hijriMonth: number
  hijriYear: number
  hijriMonthName: string
  gregorianDate: string
  gregorianDay: number
  gregorianMonth: number
  gregorianYear: number
  weekday: string
  holiday?: Holiday
  isToday: boolean
}

export interface HijriMonthInfo {
  number: number
  nameDE: string
  nameTR: string
  nameAR: string
}

export function useHolidays() {
  const config = useRuntimeConfig()

  const holidays = useState<Holiday[]>('holidays', () => [])
  const calendarDays = useState<HijriDay[]>('calendar-days', () => [])
  const currentHijriMonth = useState<number>('hijri-month', () => 0)
  const currentHijriYear = useState<number>('hijri-year', () => 0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const hijriMonths: HijriMonthInfo[] = holidayData.hijriMonths

  // Get today's Hijri date via Aladhan API
  async function fetchTodayHijri(): Promise<{ day: number, month: number, year: number } | null> {
    try {
      const now = new Date()
      const dd = String(now.getDate()).padStart(2, '0')
      const mm = String(now.getMonth() + 1).padStart(2, '0')
      const yyyy = now.getFullYear()

      const response = await $fetch<{
        data: {
          hijri: {
            day: string
            month: { number: number, en: string }
            year: string
          }
        }
      }>(`${config.public.aladhanBaseUrl}/gToH/${dd}-${mm}-${yyyy}`)

      const hijri = response.data.hijri
      const month = hijri.month.number
      const year = parseInt(hijri.year)

      currentHijriMonth.value = month
      currentHijriYear.value = year

      return { day: parseInt(hijri.day), month, year }
    }
    catch (err) {
      console.error('Hijri date fetch error:', err)
      return null
    }
  }

  // Fetch Hijri calendar for a specific month
  async function fetchCalendarMonth(month: number, year: number): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch<{
        data: Array<{
          hijri: {
            day: string
            month: { number: number, en: string }
            year: string
            weekday: { en: string }
          }
          gregorian: {
            day: string
            month: { number: number }
            year: string
            weekday: { en: string }
          }
        }>
      }>(`${config.public.aladhanBaseUrl}/hijriCalendar/${month}/${year}`)

      const today = new Date()
      const todayStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`

      calendarDays.value = response.data.map(day => {
        const hDay = parseInt(day.hijri.day)
        const hMonth = day.hijri.month.number
        const gDay = parseInt(day.gregorian.day)
        const gMonth = day.gregorian.month.number
        const gYear = parseInt(day.gregorian.year)
        const checkStr = `${gDay}-${gMonth}-${gYear}`

        // Check if there's a holiday on this day
        const holiday = holidayData.holidays.find(
          h => h.hijriMonth === hMonth && h.hijriDay === hDay,
        ) as Holiday | undefined

        return {
          hijriDay: hDay,
          hijriMonth: hMonth,
          hijriYear: parseInt(day.hijri.year),
          hijriMonthName: day.hijri.month.en,
          gregorianDate: `${String(gDay).padStart(2, '0')}.${String(gMonth).padStart(2, '0')}.${gYear}`,
          gregorianDay: gDay,
          gregorianMonth: gMonth,
          gregorianYear: gYear,
          weekday: translateWeekday(day.gregorian.weekday.en),
          holiday,
          isToday: checkStr === todayStr,
        }
      })

      currentHijriMonth.value = month
      currentHijriYear.value = year
    }
    catch (err) {
      error.value = 'Kalender konnte nicht geladen werden.'
      console.error('Calendar fetch error:', err)
    }
    finally {
      loading.value = false
    }
  }

  // Calculate upcoming holidays with gregorian dates
  async function fetchUpcomingHolidays(): Promise<void> {
    loading.value = true

    try {
      const today = await fetchTodayHijri()
      if (!today) return

      const allHolidays = holidayData.holidays as Holiday[]

      // For each holiday, calculate days until it occurs
      const withDates: Holiday[] = []

      for (const h of allHolidays) {
        // Determine the Hijri year of this holiday occurrence
        let targetYear = today.year
        if (
          h.hijriMonth < today.month
          || (h.hijriMonth === today.month && h.hijriDay < today.day)
        ) {
          targetYear = today.year + 1 // Next year
        }

        // Get gregorian date for this holiday via API
        try {
          const dd = String(h.hijriDay).padStart(2, '0')
          const mm = String(h.hijriMonth).padStart(2, '0')

          const response = await $fetch<{
            data: {
              gregorian: {
                date: string // DD-MM-YYYY
                day: string
                month: { number: number, en: string }
                year: string
              }
            }
          }>(`${config.public.aladhanBaseUrl}/hToG/${dd}-${mm}-${targetYear}`)

          const g = response.data.gregorian
          const gDate = new Date(
            parseInt(g.year),
            g.month.number - 1,
            parseInt(g.day),
          )
          const now = new Date()
          now.setHours(0, 0, 0, 0)
          const diffMs = gDate.getTime() - now.getTime()
          const daysUntil = Math.ceil(diffMs / 86400000)

          withDates.push({
            ...h,
            gregorianDate: `${g.day}.${String(g.month.number).padStart(2, '0')}.${g.year}`,
            daysUntil: Math.max(0, daysUntil),
            isPast: daysUntil < 0,
          })
        }
        catch {
          // Skip holidays that fail to convert
          withDates.push({
            ...h,
            daysUntil: 999,
            isPast: false,
          })
        }
      }

      // Sort by days until
      holidays.value = withDates
        .filter(h => !h.isPast)
        .sort((a, b) => (a.daysUntil ?? 999) - (b.daysUntil ?? 999))
    }
    finally {
      loading.value = false
    }
  }

  // Get next upcoming holiday
  const nextHoliday = computed(() => {
    return holidays.value.find(h => (h.daysUntil ?? 999) >= 0) ?? null
  })

  // Get Hijri month info
  function getMonthInfo(monthNumber: number): HijriMonthInfo | undefined {
    return hijriMonths.find(m => m.number === monthNumber)
  }

  // Translate weekday to German
  function translateWeekday(en: string): string {
    const map: Record<string, string> = {
      Monday: 'Mo',
      Tuesday: 'Di',
      Wednesday: 'Mi',
      Thursday: 'Do',
      Friday: 'Fr',
      Saturday: 'Sa',
      Sunday: 'So',
    }
    return map[en] ?? en
  }

  return {
    holidays: readonly(holidays),
    calendarDays: readonly(calendarDays),
    currentHijriMonth: readonly(currentHijriMonth),
    currentHijriYear: readonly(currentHijriYear),
    loading: readonly(loading),
    error: readonly(error),
    hijriMonths,
    nextHoliday,
    fetchTodayHijri,
    fetchCalendarMonth,
    fetchUpcomingHolidays,
    getMonthInfo,
  }
}
