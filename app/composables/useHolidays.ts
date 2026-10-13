/**
 * Composable for Islamic holidays and Hijri calendar.
 * Uses Aladhan API for Hijri date conversion and local holiday data.
 */

import holidayData from '../../data/holidays.json'
import { HOLIDAY_INFO, pickLocalized } from '../data/holiday-info'
import { addDaysIso, buildIcs, downloadIcs, makeUid, type IcsEvent } from '../utils/ics'
import { daysBetweenIso, firstFridayOnOrAfter, isoToDisplay, toIso, todayIso } from '../utils/hijri-dates'

export interface Holiday {
  id: string
  nameDE: string
  nameEN: string
  nameTR: string
  type: 'holiday' | 'kandil' | 'observance'
  hijriMonth: number
  hijriDay: number
  durationDays?: number
  icon: string
  descriptionDE: string
  descriptionEN: string
  descriptionTR: string
  isKandil?: boolean
  /** Observed on the first Friday of the Hijri month (Regaip) instead of a fixed day. */
  firstFriday?: boolean
  // Computed for the next occurrence
  gregorianDate?: string
  /** ISO `YYYY-MM-DD` of the next occurrence. */
  gregorianIso?: string
  /** Hijri year of that occurrence. */
  hijriYear?: number
  daysUntil?: number
  isPast?: boolean
}

export interface HijriDay {
  hijriDay: number
  hijriMonth: number
  hijriYear: number
  hijriMonthName: string
  gregorianDate: string
  gregorianIso: string
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
  nameEN: string
  nameTR: string
  nameAR: string
}

export function useHolidays() {
  const { t, locale } = useI18n()

  const holidays = useState<Holiday[]>('holidays', () => [])
  const calendarDays = useState<HijriDay[]>('calendar-days', () => [])
  const currentHijriMonth = useState<number>('hijri-month', () => 0)
  const currentHijriYear = useState<number>('hijri-year', () => 0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const hijriMonths: HijriMonthInfo[] = holidayData.hijriMonths as HijriMonthInfo[]

  // Get localized holiday name
  function getHolidayName(holiday: Holiday | { nameDE: string, nameEN?: string, nameTR: string }): string {
    if (locale.value === 'tr') return holiday.nameTR
    // ar: no Arabic holiday names in the data set → English fallback
    if (locale.value === 'en' || locale.value === 'ar') return (holiday as Holiday).nameEN ?? holiday.nameDE
    return holiday.nameDE
  }

  // Get localized holiday description
  function getHolidayDescription(holiday: Holiday): string {
    if (locale.value === 'tr') return holiday.descriptionTR
    if (locale.value === 'en' || locale.value === 'ar') return holiday.descriptionEN
    return holiday.descriptionDE
  }

  // Get localized month name
  function getMonthName(monthInfo: HijriMonthInfo): string {
    if (locale.value === 'tr') return monthInfo.nameTR
    if (locale.value === 'ar') return monthInfo.nameAR
    if (locale.value === 'en') return monthInfo.nameEN
    return monthInfo.nameDE
  }

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
      }>(`/api/aladhan/gToH/${dd}-${mm}-${yyyy}`)

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
      }>(`/api/aladhan/hToGCalendar/${month}/${year}`)

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
        const weekdayEn = day.gregorian.weekday.en
        const holiday = (holidayData.holidays as Holiday[]).find(h =>
          h.hijriMonth === hMonth
          && (h.firstFriday ? hDay <= 7 && weekdayEn === 'Friday' : h.hijriDay === hDay),
        )

        return {
          hijriDay: hDay,
          hijriMonth: hMonth,
          hijriYear: parseInt(day.hijri.year),
          hijriMonthName: day.hijri.month.en,
          gregorianDate: `${String(gDay).padStart(2, '0')}.${String(gMonth).padStart(2, '0')}.${gYear}`,
          gregorianIso: toIso(gYear, gMonth, gDay),
          gregorianDay: gDay,
          gregorianMonth: gMonth,
          gregorianYear: gYear,
          weekday: mapWeekdayToKey(weekdayEn),
          holiday,
          isToday: checkStr === todayStr,
        }
      })

      currentHijriMonth.value = month
      currentHijriYear.value = year
    }
    catch (err) {
      error.value = t('errors.calendarLoad')
      console.error('Calendar fetch error:', err)
    }
    finally {
      loading.value = false
    }
  }

  // Resolve the Gregorian date of a holiday in a given Hijri year via the Aladhan proxy
  async function resolveOccurrence(h: Holiday, hijriYear: number): Promise<string> {
    const dd = String(h.hijriDay).padStart(2, '0')
    const mm = String(h.hijriMonth).padStart(2, '0')
    const response = await $fetch<{
      data: { gregorian: { day: string, month: { number: number }, year: string } }
    }>(`/api/aladhan/hToG/${dd}-${mm}-${hijriYear}`)
    const g = response.data.gregorian
    const iso = toIso(parseInt(g.year), g.month.number, parseInt(g.day))
    return h.firstFriday ? firstFridayOnOrAfter(iso) : iso
  }

  // Calculate upcoming holidays with gregorian dates (next occurrence of each)
  async function fetchUpcomingHolidays(): Promise<void> {
    loading.value = true

    try {
      const today = await fetchTodayHijri()
      if (!today) return

      const allHolidays = holidayData.holidays as Holiday[]
      const todayStr = todayIso()

      const withDates = await Promise.all(allHolidays.map(async (h): Promise<Holiday> => {
        try {
          // This Hijri year first; if it already passed, take the next one.
          let year = today.year
          let iso = await resolveOccurrence(h, year)
          if (daysBetweenIso(todayStr, iso) < 0) {
            year += 1
            iso = await resolveOccurrence(h, year)
          }
          const daysUntil = daysBetweenIso(todayStr, iso)
          return {
            ...h,
            gregorianDate: isoToDisplay(iso),
            gregorianIso: iso,
            hijriYear: year,
            daysUntil,
            isPast: false,
          }
        }
        catch {
          // Keep holidays whose conversion failed (shown without date, sorted last)
          return { ...h, daysUntil: 999, isPast: false }
        }
      }))

      holidays.value = withDates.sort((a, b) => (a.daysUntil ?? 999) - (b.daysUntil ?? 999))
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

  // Map English weekday to a short key used for calendar grid positioning
  function mapWeekdayToKey(en: string): string {
    const map: Record<string, string> = {
      Monday: 'Mon',
      Tuesday: 'Tue',
      Wednesday: 'Wed',
      Thursday: 'Thu',
      Friday: 'Fri',
      Saturday: 'Sat',
      Sunday: 'Sun',
    }
    return map[en] ?? en
  }

  // ---- Explanations -------------------------------------------------------

  /** Localized explanation + source for a holiday (undefined for unknown ids). */
  function getHolidayInfo(holiday: { id: string }): { text: string, source: string } | undefined {
    const info = HOLIDAY_INFO[holiday.id]
    return info ? { text: pickLocalized(info, locale.value), source: info.source } : undefined
  }

  /** "10. Muharram 1448" (month only for holidays tied to a weekday, e.g. Regaip). */
  function getHijriLabel(h: { hijriDay: number, hijriMonth: number, firstFriday?: boolean, hijriYear?: number }): string {
    const info = getMonthInfo(h.hijriMonth)
    const month = info ? getMonthName(info) : ''
    return [h.firstFriday ? '' : `${h.hijriDay}.`, month, h.hijriYear ?? ''].filter(Boolean).join(' ')
  }

  // ---- ICS export ---------------------------------------------------------

  const exporting = ref(false)

  function holidayToEvent(h: Holiday, iso: string): IcsEvent {
    const parts = [getHolidayDescription(h)]
    if (h.type === 'kandil' || h.isKandil) parts.push(t('calendar.kandilNote'))
    parts.push(t('calendar.dateNote'))
    return {
      uid: makeUid(h.id, iso),
      summary: getHolidayName(h),
      description: parts.join('\n\n'),
      startDate: iso,
      days: h.durationDays,
    }
  }

  /** Download a single holiday as .ics. Returns false when its date is unknown. */
  function exportHolidayIcs(h: Holiday): boolean {
    if (!h.gregorianIso) return false
    const ics = buildIcs([holidayToEvent(h, h.gregorianIso)], { calendarName: t('calendar.icsName') })
    downloadIcs(`muslimapp-${h.id}-${h.gregorianIso}.ics`, ics)
    return true
  }

  /**
   * Download all holidays of the next 12 months as one .ics file.
   * A Hijri year is ~354 days, so holidays happening within the first days
   * from now occur a second time before the 12 months are over.
   */
  async function exportAllIcs(): Promise<number> {
    exporting.value = true
    try {
      if (holidays.value.length === 0) await fetchUpcomingHolidays()
      const todayStr = todayIso()
      const limitIso = addDaysIso(todayStr, 365)
      const events: IcsEvent[] = []

      for (const h of holidays.value as Holiday[]) {
        if (!h.gregorianIso) continue
        events.push(holidayToEvent(h, h.gregorianIso))

        if (h.hijriYear && (h.daysUntil ?? 999) <= 12) {
          try {
            const iso = await resolveOccurrence(h, h.hijriYear + 1)
            if (iso <= limitIso) events.push(holidayToEvent(h, iso))
          }
          catch { /* second occurrence unavailable — skip */ }
        }
      }

      if (events.length === 0) return 0
      events.sort((a, b) => a.startDate.localeCompare(b.startDate))
      downloadIcs('muslimapp-feiertage.ics', buildIcs(events, { calendarName: t('calendar.icsName') }))
      return events.length
    }
    finally {
      exporting.value = false
    }
  }

  // ---- Hijri date converter -----------------------------------------------

  const localeTag = computed(() => (locale.value === 'tr' ? 'tr-TR' : locale.value === 'en' ? 'en-GB' : locale.value === 'ar' ? intlTag('ar') : 'de-DE'))

  /** Gregorian ISO date → Hijri parts (via proxy). */
  async function gregorianToHijri(iso: string): Promise<{ day: number, month: number, year: number }> {
    const [y, m, d] = iso.split('-')
    const response = await $fetch<{
      data: { hijri: { day: string, month: { number: number }, year: string } }
    }>(`/api/aladhan/gToH/${d}-${m}-${y}`)
    const h = response.data.hijri
    return { day: parseInt(h.day), month: h.month.number, year: parseInt(h.year) }
  }

  /** Hijri date → Gregorian ISO date (via proxy). */
  async function hijriToGregorian(day: number, month: number, year: number): Promise<string> {
    const dd = String(day).padStart(2, '0')
    const mm = String(month).padStart(2, '0')
    const response = await $fetch<{
      data: { gregorian: { day: string, month: { number: number }, year: string } }
    }>(`/api/aladhan/hToG/${dd}-${mm}-${year}`)
    const g = response.data.gregorian
    return toIso(parseInt(g.year), g.month.number, parseInt(g.day))
  }

  /** Long localized Gregorian date incl. weekday, e.g. "Freitag, 3. April 2026". */
  function formatGregorian(iso: string): string {
    const [y, m, d] = iso.split('-').map(Number)
    return new Intl.DateTimeFormat(localeTag.value, {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
    }).format(new Date(Date.UTC(y!, m! - 1, d!)))
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
    getHolidayName,
    getHolidayDescription,
    getMonthName,
    getHolidayInfo,
    getHijriLabel,
    exporting: readonly(exporting),
    exportHolidayIcs,
    exportAllIcs,
    gregorianToHijri,
    hijriToGregorian,
    formatGregorian,
  }
}
