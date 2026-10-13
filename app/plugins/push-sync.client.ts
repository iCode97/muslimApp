/**
 * Global reminder sync (runs once per app start, on every route).
 *
 *  - Restores notification + dhikr settings.
 *  - Push mode: keeps the server-side subscription/prefs in sync whenever the
 *    location, calculation params, minute adjustments, per-prayer toggles,
 *    lead time, locale or dhikr settings change (debounced).
 *  - Local mode (no push available): schedules the in-page reminders
 *    whenever prayer times or settings change — previously only done on the
 *    home page.
 *
 * Starts after hydration (like app-init, which loads location/prayer times
 * first — plugins run in alphabetical order).
 */
const SYNC_DEBOUNCE_MS = 1500

export default defineNuxtPlugin((nuxtApp) => {
  const start = () => nuxtApp.runWithContext(() => {
    const notifications = useNotifications()
    const dhikr = useDhikrReminders()
    const prayerTimes = usePrayerTimes()

    notifications.loadSettings()
    dhikr.loadSettings()

    // --- Server sync (push) --------------------------------------------------
    const wantsReminders = computed(() =>
      notifications.settings.value.enabled || dhikr.settings.value.enabled,
    )
    const prefsKey = computed(() => JSON.stringify(notifications.buildPushPrefs()))

    if (wantsReminders.value) void notifications.syncPush()
    else void notifications.refreshPushStatus()

    let debounce: ReturnType<typeof setTimeout> | undefined
    watch([prefsKey, wantsReminders], () => {
      if (debounce) clearTimeout(debounce)
      debounce = setTimeout(() => {
        // Toggling on/off syncs immediately from the toggle itself; this
        // catches every other change (and is a no-op when nothing changed).
        if (wantsReminders.value || notifications.pushActive.value) void notifications.syncPush()
      }, SYNC_DEBOUNCE_MS)
    })

    // --- Local scheduling fallback -------------------------------------------
    const prayerScheduleKey = computed(() => {
      const d = prayerTimes.data.value
      if (!d) return null
      return [...d.prayers, ...d.tomorrowPrayers].map(p => `${p.name}@${p.timestamp}`).join('|')
    })
    const localPrayerKey = computed(() => JSON.stringify([
      prayerScheduleKey.value,
      notifications.mode.value,
      notifications.permission.value,
      notifications.settings.value,
    ]))
    watch(localPrayerKey, () => {
      const d = prayerTimes.data.value
      if (!d) return
      void notifications.schedulePrayerNotifications([...d.prayers, ...d.tomorrowPrayers])
    }, { immediate: true })

    const localDhikrKey = computed(() => JSON.stringify([
      notifications.mode.value,
      notifications.permission.value,
      dhikr.settings.value,
    ]))
    watch(localDhikrKey, () => {
      void dhikr.schedule()
    }, { immediate: true })
  })

  if (nuxtApp.isHydrating) {
    nuxtApp.hooks.hookOnce('app:suspense:resolve', start)
  }
  else {
    start()
  }
})
