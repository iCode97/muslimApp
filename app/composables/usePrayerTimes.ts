/**
 * Composable for fetching and managing prayer times via the Aladhan API
 * (through our Nitro proxy). Method 13 (Diyanet) is the default.
 *
 * All state is shared app-wide (useState). Loading is orchestrated centrally
 * by the `app-init` client plugin — components only read `data`.
 *
 * Timezones:
 *   Aladhan returns wall-clock strings in the *location's* timezone
 *   (`meta.timezone`, IANA). Timestamps are computed from that wall-clock
 *   time via `zonedWallTimeToEpoch`, and "today/tomorrow" is determined in the
 *   location's timezone, so countdowns are correct even when the selected
 *   city is in a different timezone than the device. Displayed times stay the
 *   API's wall-clock strings (plus the user's minute adjustments).
 *
 * Caching strategy:
 *   - Whole months are fetched via /calendar/{year}/{month} and cached in
 *     localStorage, keyed by coordinates + calculation parameters
 *     (method, Asr school, high-latitude rule). Changing any of them busts
 *     the cache and triggers a refetch.
 *   - Today's and tomorrow's months are kept; older months are pruned.
 *   - "Next prayer"/"passed" state is recomputed locally (`refresh()`); the
 *     network is only hit when the date, location or parameters change.
 *
 * Minute adjustments:
 *   Per-prayer adjustments are applied client-side on top of the method's
 *   official times. (Aladhan's `tune` param *replaces* a method's built-in
 *   offsets — e.g. Diyanet's Sunrise −7 / Dhuhr +5 / Asr +4 / Maghrib +7 —
 *   instead of adding to them, so it can't express "+2 min on top".)
 */

import {
  ADJUSTABLE_PRAYERS,
  DEFAULT_LATITUDE_ADJUSTMENT,
  DEFAULT_METHOD,
  DEFAULT_SCHOOL,
  LATITUDE_ADJUSTMENT_OPTIONS,
  PRAYER_METHODS,
  clampAdjustment,
  emptyAdjustments,
  resolveLatitudeAdjustment,
  type AdjustablePrayer,
  type AsrSchool,
  type LatitudeAdjustmentSetting,
  type PrayerAdjustments,
} from '~/data/prayer-methods'
import {
  addDays,
  formatDdMmYyyy,
  formatHHmm,
  isValidTimeZone,
  monthKey,
  parseHHmm,
  resolveTimeZone,
  todayInZone,
  zonedWallTimeToEpoch,
  type YMD,
} from '~/utils/time'

export interface PrayerTime {
  name: string
  time: string // "HH:mm" wall-clock time at the location
  timestamp: number // epoch ms
  passed: boolean
  isNextDay?: boolean // true if this is tomorrow's prayer
}

export interface HijriDate {
  day: string
  month: string
  monthAr: string
  year: string
  designation: string
  /** 1–12 (9 = Ramadan). Missing in caches written by older app versions. */
  monthNumber?: number
}

export interface PrayerTimesData {
  prayers: PrayerTime[]
  tomorrowPrayers: PrayerTime[] // Full tomorrow prayer list for two-section view
  nextPrayer: PrayerTime | null
  hijriDate: HijriDate
  gregorianDate: string // "DD-MM-YYYY" — today's date in `timezone`
  /** IANA timezone the times refer to (location timezone, or device as fallback) */
  timezone: string
}

/** User-configurable calculation settings (besides the method). */
export interface PrayerCalcSettings {
  school: AsrSchool
  latitudeAdjustment: LatitudeAdjustmentSetting
  adjustments: PrayerAdjustments
}

/** Raw Aladhan timings for a single day, used inside the month cache. */
interface DayRaw {
  timings: Record<string, string>
  hijri: HijriDate
}

interface PrayerCache {
  version: 2
  /** Coordinates + calculation params the cached months were fetched with */
  paramsKey: string
  /** IANA timezone reported by Aladhan for this location */
  timezone: string | null
  /** "YYYY-MM" → days ("DD-MM-YYYY" → raw day) */
  months: Record<string, { days: Record<string, DayRaw>, fetchedAt: number }>
}

/** Pre-v2 single-month cache shape (read once for migration). */
interface LegacyMonthCache {
  key: string
  latitude: number
  longitude: number
  method: number
  days: Record<string, DayRaw>
  fetchedAt: number
}

interface AladhanCalendarEntry {
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
  meta?: { timezone?: string }
}

export type PrayerRefreshResult = 'ok' | 'stale' | 'empty'

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

const CACHE_KEY = 'muslimapp-prayer-cache'
const LEGACY_MONTH_CACHE_KEY = 'muslimapp-prayer-month'
const LEGACY_DAY_CACHE_KEY = 'muslimapp-prayer-times'
const METHOD_KEY = 'muslimapp-prayer-method'
const SETTINGS_KEY = 'muslimapp-prayer-settings'

const MINUTES_PER_DAY = 24 * 60

/** Prayers that can fall after local midnight in high-latitude summers. */
const LATE_PRAYERS = new Set<string>(['Asr', 'Maghrib', 'Isha'])

// Monotonic counter so that only the latest fetch may write state.
let fetchGeneration = 0

function defaultSettings(): PrayerCalcSettings {
  return {
    school: DEFAULT_SCHOOL,
    latitudeAdjustment: DEFAULT_LATITUDE_ADJUSTMENT,
    adjustments: emptyAdjustments(),
  }
}

/** Cache identity for a location + calculation parameters. */
function buildParamsKey(
  latitude: number,
  longitude: number,
  method: number,
  school: AsrSchool,
  latitudeAdjustment: 0 | 1 | 2 | 3 | undefined,
): string {
  return `${latitude.toFixed(4)},${longitude.toFixed(4)}|m${method}|s${school}|l${latitudeAdjustment ?? 'd'}`
}

function lookupDay(cache: PrayerCache, date: YMD): DayRaw | undefined {
  return cache.months[monthKey(date)]?.days[formatDdMmYyyy(date)]
}

/**
 * Convert a raw Aladhan day into our PrayerTime[] list, applying minute
 * adjustments and computing timestamps in the location's timezone.
 */
function buildPrayerList(
  day: DayRaw,
  date: YMD,
  timeZone: string,
  adjustments: PrayerAdjustments,
  now: number,
  isNextDay: boolean,
): PrayerTime[] {
  let dhuhrTimestamp = Number.NEGATIVE_INFINITY

  return PRAYER_KEYS.map((key) => {
    const parsed = parseHHmm(day.timings[key] ?? '') ?? { hour: 0, minute: 0 }
    let total = parsed.hour * 60 + parsed.minute + (adjustments[key] ?? 0)
    // Adjustments may push a time across midnight
    const dayShift = Math.floor(total / MINUTES_PER_DAY)
    total -= dayShift * MINUTES_PER_DAY
    const hour = Math.floor(total / 60)
    const minute = total % 60

    let timestamp = zonedWallTimeToEpoch(date.year, date.month, date.day + dayShift, hour, minute, timeZone)
    // e.g. Isha "00:12" in Oslo in June belongs to the night *after* this date
    if (LATE_PRAYERS.has(key) && timestamp < dhuhrTimestamp) {
      timestamp = zonedWallTimeToEpoch(date.year, date.month, date.day + dayShift + 1, hour, minute, timeZone)
    }
    if (key === 'Dhuhr') dhuhrTimestamp = timestamp

    return {
      name: key,
      time: formatHHmm(hour, minute),
      timestamp,
      passed: !isNextDay && now >= timestamp,
      isNextDay,
    }
  })
}

function findNextPrayer(prayers: PrayerTime[], tomorrowPrayers: PrayerTime[]): PrayerTime | null {
  const upcoming = prayers.find(p => !p.passed)
  if (upcoming) return upcoming
  const tomorrowFajr = tomorrowPrayers.find(p => p.name === 'Fajr')
  return tomorrowFajr ? { ...tomorrowFajr, passed: false, isNextDay: true } : null
}

/** Build today's + tomorrow's snapshot from the cache, or null if today is missing. */
function buildSnapshot(
  cache: PrayerCache,
  timeZone: string,
  adjustments: PrayerAdjustments,
  now: number,
): PrayerTimesData | null {
  const today = todayInZone(timeZone, now)
  const tomorrow = addDays(today, 1)
  const todayRaw = lookupDay(cache, today)
  if (!todayRaw) return null
  const tomorrowRaw = lookupDay(cache, tomorrow)

  const prayers = buildPrayerList(todayRaw, today, timeZone, adjustments, now, false)
  const tomorrowPrayers = tomorrowRaw
    ? buildPrayerList(tomorrowRaw, tomorrow, timeZone, adjustments, now, true)
    : []

  return {
    prayers,
    tomorrowPrayers,
    nextPrayer: findNextPrayer(prayers, tomorrowPrayers),
    hijriDate: todayRaw.hijri,
    gregorianDate: formatDdMmYyyy(today),
    timezone: timeZone,
  }
}

function sanitizeSettings(raw: unknown): PrayerCalcSettings {
  const result = defaultSettings()
  if (!raw || typeof raw !== 'object') return result
  const obj = raw as Partial<Record<keyof PrayerCalcSettings, unknown>>

  if (obj.school === 0 || obj.school === 1) result.school = obj.school
  if (LATITUDE_ADJUSTMENT_OPTIONS.includes(obj.latitudeAdjustment as LatitudeAdjustmentSetting)) {
    result.latitudeAdjustment = obj.latitudeAdjustment as LatitudeAdjustmentSetting
  }
  if (obj.adjustments && typeof obj.adjustments === 'object') {
    const adj = obj.adjustments as Record<string, unknown>
    for (const key of ADJUSTABLE_PRAYERS) {
      result.adjustments[key] = clampAdjustment(adj[key] ?? 0)
    }
  }
  return result
}

export function usePrayerTimes() {
  const nuxtApp = useNuxtApp()
  const data = useState<PrayerTimesData | null>('prayer-times', () => null)
  const loading = useState<boolean>('prayer-times-loading', () => false)
  const errorKey = useState<string | null>('prayer-times-error', () => null)
  const method = useState<number>('prayer-method', () => DEFAULT_METHOD)
  const settings = useState<PrayerCalcSettings>('prayer-settings', defaultSettings)

  /** Translated error message (reactive to locale changes). */
  const error = computed(() => (errorKey.value ? nuxtApp.$i18n.t(errorKey.value) : null))

  // ---------------------------------------------------------------------------
  // Settings
  // ---------------------------------------------------------------------------

  /** Load method + calculation settings from localStorage (called once at app start). */
  function loadSettings() {
    if (import.meta.server) return
    const savedMethod = Number(localStorage.getItem(METHOD_KEY))
    if (localStorage.getItem(METHOD_KEY) !== null && Number.isInteger(savedMethod)) {
      method.value = savedMethod
    }
    try {
      const raw = localStorage.getItem(SETTINGS_KEY)
      settings.value = sanitizeSettings(raw ? JSON.parse(raw) : null)
    }
    catch {
      localStorage.removeItem(SETTINGS_KEY)
      settings.value = defaultSettings()
    }
  }

  function persistSettings() {
    if (import.meta.client) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings.value))
    }
  }

  /**
   * Change the calculation method. The app-init plugin notices the changed
   * cache key and refetches automatically.
   */
  function setMethod(methodId: number) {
    method.value = methodId
    if (import.meta.client) {
      localStorage.setItem(METHOD_KEY, String(methodId))
    }
  }

  /** Change the Asr juristic method (triggers a refetch via the plugin). */
  function setSchool(school: AsrSchool) {
    settings.value = { ...settings.value, school }
    persistSettings()
  }

  /** Change the high-latitude rule (triggers a refetch via the plugin). */
  function setLatitudeAdjustment(value: LatitudeAdjustmentSetting) {
    settings.value = { ...settings.value, latitudeAdjustment: value }
    persistSettings()
  }

  /** Set a per-prayer minute adjustment (applied locally, no refetch). */
  function setAdjustment(prayer: AdjustablePrayer, minutes: number) {
    settings.value = {
      ...settings.value,
      adjustments: { ...settings.value.adjustments, [prayer]: clampAdjustment(minutes) },
    }
    persistSettings()
    loadCache()
  }

  /** Reset all minute adjustments to 0. */
  function resetAdjustments() {
    settings.value = { ...settings.value, adjustments: emptyAdjustments() }
    persistSettings()
    loadCache()
  }

  /** Aladhan query params (besides coordinates) for the current settings. */
  function requestParams(latitude: number) {
    return {
      method: method.value,
      school: settings.value.school,
      latitudeAdjustmentMethod: resolveLatitudeAdjustment(settings.value.latitudeAdjustment, latitude),
    }
  }

  /**
   * Cache identity for a location with the current calculation settings.
   * Changes whenever a refetch is required.
   */
  function paramsKeyFor(latitude: number, longitude: number): string {
    const p = requestParams(latitude)
    return buildParamsKey(latitude, longitude, p.method, p.school, p.latitudeAdjustmentMethod)
  }

  // ---------------------------------------------------------------------------
  // Cache
  // ---------------------------------------------------------------------------

  function readCache(): PrayerCache | null {
    if (import.meta.server) return null
    const raw = localStorage.getItem(CACHE_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as PrayerCache
        if (parsed.version === 2 && parsed.months && typeof parsed.paramsKey === 'string') return parsed
      }
      catch { /* fall through */ }
      localStorage.removeItem(CACHE_KEY)
    }
    return migrateLegacyCache()
  }

  /** One-time migration of the pre-v2 single-month cache. */
  function migrateLegacyCache(): PrayerCache | null {
    const raw = localStorage.getItem(LEGACY_MONTH_CACHE_KEY)
    localStorage.removeItem(LEGACY_MONTH_CACHE_KEY)
    localStorage.removeItem(LEGACY_DAY_CACHE_KEY)
    if (!raw) return null
    try {
      const legacy = JSON.parse(raw) as LegacyMonthCache
      const [y, m] = legacy.key.split('-').map(Number)
      if (!y || !m || !legacy.days) return null
      const cache: PrayerCache = {
        version: 2,
        // Legacy caches were fetched with school 0 and Aladhan's default high-latitude rule
        paramsKey: buildParamsKey(legacy.latitude, legacy.longitude, legacy.method, 0, undefined),
        timezone: null,
        months: { [monthKey({ year: y, month: m, day: 1 })]: { days: legacy.days, fetchedAt: legacy.fetchedAt } },
      }
      writeCache(cache)
      return cache
    }
    catch {
      return null
    }
  }

  function writeCache(cache: PrayerCache) {
    if (import.meta.client) {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
      }
      catch (err) {
        console.warn('Prayer cache write failed:', err)
      }
    }
  }

  /** Drop months before the previous month (relative to `today`). */
  function pruneCache(cache: PrayerCache, today: YMD) {
    const oldest = monthKey(addDays({ ...today, day: 1 }, -1))
    for (const key of Object.keys(cache.months)) {
      if (key < oldest) delete cache.months[key]
    }
  }

  /**
   * Populate `data` from the localStorage cache (no network).
   * If a location is given, the cache is only used when it matches the
   * location and current calculation settings.
   */
  function loadCache(location?: { latitude: number, longitude: number, timezone?: string } | null): PrayerTimesData | null {
    if (import.meta.server) return null
    const cache = readCache()
    if (!cache) return null
    if (location && cache.paramsKey !== paramsKeyFor(location.latitude, location.longitude)) return null

    const timeZone = resolveTimeZone(cache.timezone ?? location?.timezone ?? data.value?.timezone)
    const snapshot = buildSnapshot(cache, timeZone, settings.value.adjustments, Date.now())
    if (snapshot) data.value = snapshot
    return snapshot
  }

  // ---------------------------------------------------------------------------
  // Network
  // ---------------------------------------------------------------------------

  async function fetchMonthRaw(latitude: number, longitude: number, year: number, month: number) {
    const response = await $fetch<{ data: AladhanCalendarEntry[] }>(`/api/aladhan/calendar/${year}/${month}`, {
      params: { latitude, longitude, ...requestParams(latitude) },
    })

    const days: Record<string, DayRaw> = {}
    let timezone: string | null = null
    for (const entry of response.data) {
      const h = entry.date.hijri
      days[entry.date.gregorian.date] = {
        timings: entry.timings,
        hijri: {
          day: h.day,
          month: h.month.en,
          monthAr: h.month.ar,
          monthNumber: h.month.number,
          year: h.year,
          designation: h.designation.abbreviated,
        },
      }
      if (!timezone && isValidTimeZone(entry.meta?.timezone)) timezone = entry.meta!.timezone!
    }
    return { days, timezone }
  }

  /**
   * Load today's + tomorrow's prayer times for a location. Uses the month
   * cache and only fetches months that are missing. Concurrent calls are
   * safe: only the most recent call writes state.
   *
   * @param timezoneHint the location's IANA timezone if already known
   */
  async function fetchTimes(latitude: number, longitude: number, timezoneHint?: string): Promise<void> {
    if (import.meta.server) return
    const generation = ++fetchGeneration
    const paramsKey = paramsKeyFor(latitude, longitude)
    errorKey.value = null

    let cache = readCache()
    if (!cache || cache.paramsKey !== paramsKey) {
      cache = { version: 2, paramsKey, timezone: null, months: {} }
    }

    try {
      // Two passes: the first fetch may reveal the location's timezone, which
      // can move "today" into a different month than the device date suggested.
      for (let pass = 0; pass < 2; pass++) {
        const timeZone = resolveTimeZone(cache.timezone ?? timezoneHint)
        const today = todayInZone(timeZone)
        const needed = [...new Set([today, addDays(today, 1)].map(monthKey))]
        const missing = needed.filter(key => !cache!.months[key])
        if (missing.length === 0) break

        loading.value = true
        for (const key of missing) {
          const [year, month] = key.split('-').map(Number) as [number, number]
          const result = await fetchMonthRaw(latitude, longitude, year, month)
          if (generation !== fetchGeneration) return
          cache.months[key] = { days: result.days, fetchedAt: Date.now() }
          if (result.timezone) cache.timezone = result.timezone
        }
      }

      const timeZone = resolveTimeZone(cache.timezone ?? timezoneHint)
      pruneCache(cache, todayInZone(timeZone))
      writeCache(cache)

      const snapshot = buildSnapshot(cache, timeZone, settings.value.adjustments, Date.now())
      if (!snapshot) throw new Error('failed to build prayer snapshot')
      data.value = snapshot
    }
    catch (err) {
      if (generation !== fetchGeneration) return
      console.error('Prayer times fetch error:', err)
      // Keep whatever valid data the cache can still provide (offline use)
      const timeZone = resolveTimeZone(cache.timezone ?? timezoneHint)
      const fallback = buildSnapshot(cache, timeZone, settings.value.adjustments, Date.now())
      data.value = fallback
      if (!fallback) errorKey.value = 'errors.prayerLoad'
    }
    finally {
      if (generation === fetchGeneration) loading.value = false
    }
  }

  // ---------------------------------------------------------------------------
  // Local recomputation
  // ---------------------------------------------------------------------------

  /**
   * Recompute passed/next prayer locally (no network). If the date at the
   * location has changed, the snapshot is rebuilt from the cache.
   *
   * @returns 'stale' when the cache can't cover today/tomorrow anymore and a
   *          fetch is needed, 'empty' when there's no data, otherwise 'ok'.
   */
  function refresh(now: number = Date.now()): PrayerRefreshResult {
    const current = data.value
    if (!current) return 'empty'

    if (formatDdMmYyyy(todayInZone(current.timezone, now)) !== current.gregorianDate) {
      const cache = readCache()
      const snapshot = cache ? buildSnapshot(cache, current.timezone, settings.value.adjustments, now) : null
      if (!snapshot) return 'stale'
      data.value = snapshot
      return snapshot.tomorrowPrayers.length > 0 ? 'ok' : 'stale'
    }

    const prayers = current.prayers.map(p => ({ ...p, passed: now >= p.timestamp, isNextDay: false }))
    const nextPrayer = findNextPrayer(prayers, current.tomorrowPrayers)
    const changed = prayers.some((p, i) => p.passed !== current.prayers[i]?.passed)
      || nextPrayer?.name !== current.nextPrayer?.name
      || nextPrayer?.timestamp !== current.nextPrayer?.timestamp
    // Only assign when something changed, to avoid needless reactive updates
    if (changed) data.value = { ...current, prayers, nextPrayer }
    return current.tomorrowPrayers.length > 0 ? 'ok' : 'stale'
  }

  /** Display name of the active calculation method. */
  const methodName = computed(() =>
    PRAYER_METHODS.find(m => m.id === method.value)?.name ?? `Method ${method.value}`,
  )

  return {
    data: readonly(data),
    loading: readonly(loading),
    error,
    method: readonly(method),
    methodName,
    settings: readonly(settings),
    fetchTimes,
    loadCache,
    loadSettings,
    refresh,
    setMethod,
    setSchool,
    setLatitudeAdjustment,
    setAdjustment,
    resetAdjustments,
    paramsKeyFor,
    PRAYER_I18N,
  }
}
