/**
 * Global client-side app initialisation.
 *
 * Runs once per app start for every route (incl. reloads and deep links like
 * /qibla or /settings): restores the saved location and prayer settings and
 * starts the app-wide prayer-times sync (see startPrayerSync).
 *
 * The state is restored only after hydration has finished, so the
 * server-rendered markup (which never knows the location) matches the first
 * client render — no hydration mismatches. Components can use
 * `useLocation().ready` to avoid flashing a "no location" state meanwhile.
 *
 * Never requests GPS — that only happens on an explicit user action.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const start = () => {
    nuxtApp.runWithContext(() => startPrayerSync())
  }

  if (nuxtApp.isHydrating) {
    nuxtApp.hooks.hookOnce('app:suspense:resolve', start)
  }
  else {
    start()
  }
})
