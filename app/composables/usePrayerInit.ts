/**
 * Shared composable for initializing prayer times with location detection.
 * Used by both the Dashboard (index.vue) and Prayer page to avoid duplication.
 * Handles: location loading/detection, prayer time fetching, and periodic refresh.
 */
export function usePrayerInit() {
  const { location, loadSaved, detectGPS } = useLocation()
  const prayerTimes = usePrayerTimes()

  let refreshInterval: ReturnType<typeof setInterval> | undefined

  async function init() {
    const saved = loadSaved()
    if (!saved) {
      await detectGPS()
    }

    prayerTimes.loadCache()

    if (location.value) {
      await prayerTimes.fetchTimes(location.value.latitude, location.value.longitude)
    }
  }

  function startRefresh(intervalMs = 30000) {
    stopRefresh()
    refreshInterval = setInterval(() => prayerTimes.refresh(), intervalMs)
  }

  function stopRefresh() {
    if (refreshInterval) {
      clearInterval(refreshInterval)
      refreshInterval = undefined
    }
  }

  // Watch for location changes and re-fetch
  watch(location, async (newLoc) => {
    if (newLoc) {
      await prayerTimes.fetchTimes(newLoc.latitude, newLoc.longitude)
    }
  })

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
