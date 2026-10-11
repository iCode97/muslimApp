/**
 * App-wide prayer-times controller.
 *
 * `startPrayerSync()` is called exactly once by the `app-init` client plugin.
 * It loads the saved location + calculation settings, fetches prayer times
 * whenever location or parameters change, and keeps "next prayer" up to date
 * with a single timer that fires at the next prayer / local midnight — no
 * polling loop, no per-page watchers, no duplicate fetches.
 *
 * Pages can use `usePrayerInit()` to get convenient shared refs. Its legacy
 * `init()` / `startRefresh()` / `stopRefresh()` functions are kept for
 * backwards compatibility but are no-ops beyond ensuring the sync is running.
 */

/** Safety net: re-evaluate at least this often (timers can drift/suspend). */
const MAX_TICK_INTERVAL_MS = 5 * 60_000

let syncStarted = false

/**
 * Start the global prayer-times sync. Idempotent; client-only.
 * Must be called within a Nuxt context (plugin or setup).
 */
export function startPrayerSync(): void {
  if (import.meta.server || syncStarted) return
  syncStarted = true

  const locationApi = useLocation()
  const { location } = locationApi
  const prayerTimes = usePrayerTimes()

  // 1. Restore persisted state (settings first, so the cache key is right)
  prayerTimes.loadSettings()
  locationApi.loadSaved()
  // Show cached times instantly (offline-capable), but only if they belong to this location
  if (location.value) prayerTimes.loadCache(location.value)

  function fetchForCurrentLocation() {
    const loc = location.value
    if (!loc) return
    prayerTimes.fetchTimes(loc.latitude, loc.longitude, loc.timezone)
  }

  // 2. Fetch whenever coordinates or calculation params change (one watcher app-wide).
  //    Minute adjustments don't affect the key — they are applied locally.
  const fetchKey = computed(() => {
    const loc = location.value
    return loc ? prayerTimes.paramsKeyFor(loc.latitude, loc.longitude) : null
  })
  watch(fetchKey, (key) => {
    if (key) fetchForCurrentLocation()
  }, { immediate: true })

  // 3. Remember the location's timezone once the API told us
  watch(() => prayerTimes.data.value?.timezone, (tz) => {
    if (tz && location.value && location.value.timezone !== tz) locationApi.setTimezone(tz)
  })

  // 4. One timer: wake up at the next prayer or local midnight (whichever is first)
  let timer: ReturnType<typeof setTimeout> | undefined

  function tick() {
    const result = prayerTimes.refresh()
    if (result === 'stale') fetchForCurrentLocation()
    schedule()
  }

  function schedule() {
    if (timer) clearTimeout(timer)
    const now = Date.now()
    let wakeAt = now + MAX_TICK_INTERVAL_MS
    const current = prayerTimes.data.value
    if (current) {
      const next = current.nextPrayer?.timestamp
      if (next && next > now) wakeAt = Math.min(wakeAt, next)
      wakeAt = Math.min(wakeAt, startOfNextDayInZone(current.timezone, now))
    }
    // +250ms so we land just *after* the boundary
    timer = setTimeout(tick, Math.max(1000, wakeAt - now + 250))
  }

  watch(() => prayerTimes.data.value, schedule, { immediate: true })

  // Timers are throttled/suspended in background tabs and on sleeping phones
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') tick()
  })
}

/**
 * Convenience accessor for pages showing prayer data.
 */
export function usePrayerInit() {
  const { location } = useLocation()
  const prayerTimes = usePrayerTimes()

  /** @deprecated Loading happens globally in the app-init plugin. Kept for compatibility. */
  async function init() {
    startPrayerSync()
  }

  /** @deprecated No-op: next-prayer state is refreshed globally. */
  function startRefresh(_intervalMs?: number) {}

  /** @deprecated No-op: next-prayer state is refreshed globally. */
  function stopRefresh() {}

  const hijriDisplay = computed(() => {
    const h = prayerTimes.data.value?.hijriDate
    if (!h) return ''
    return `${h.day}. ${h.month} ${h.year} ${h.designation}`
  })

  return {
    location,
    prayerTimes,
    hijriDisplay,
    init,
    startRefresh,
    stopRefresh,
  }
}
