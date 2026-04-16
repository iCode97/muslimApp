/**
 * Prayer time notifications composable.
 * Uses the Notification API for local notifications.
 *
 * Scheduling strategy:
 *   1. If the browser supports Notification Triggers API (TimestampTrigger),
 *      hand scheduling off to the Service Worker — fires reliably even when
 *      the tab is closed.
 *   2. Otherwise, fall back to page-scope setTimeout so notifications at
 *      least work while the tab is open.
 */

interface NotificationSettings {
  enabled: boolean
  prayerAlerts: Record<string, boolean>  // per-prayer toggle
  minutesBefore: number                   // notify X minutes before
  sound: boolean
}

const STORAGE_KEY = 'muslimapp-notifications'
const PRAYER_NAMES = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const

export function useNotifications() {
  const { t } = useI18n()

  const settings = useState<NotificationSettings>('notification-settings', () => ({
    enabled: false,
    prayerAlerts: Object.fromEntries(PRAYER_NAMES.map(p => [p, true])),
    minutesBefore: 10,
    sound: true,
  }))

  const permission = ref<NotificationPermission>('default')
  const scheduledTimers = ref<ReturnType<typeof setTimeout>[]>([])

  function loadSettings() {
    if (import.meta.server) return
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        settings.value = { ...settings.value, ...JSON.parse(saved) }
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    permission.value = 'Notification' in window ? Notification.permission : 'denied'
  }

  function saveSettings() {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings.value))
    }
  }

  async function requestPermission(): Promise<boolean> {
    if (import.meta.server) return false
    if (!('Notification' in window)) return false

    const result = await Notification.requestPermission()
    permission.value = result
    return result === 'granted'
  }

  async function toggleEnabled(): Promise<void> {
    if (!settings.value.enabled) {
      // Enabling: request permission first
      const granted = await requestPermission()
      if (granted) {
        settings.value.enabled = true
      }
    } else {
      settings.value.enabled = false
      clearScheduled()
    }
    saveSettings()
  }

  function togglePrayer(prayer: string) {
    settings.value.prayerAlerts[prayer] = !settings.value.prayerAlerts[prayer]
    saveSettings()
  }

  function setMinutesBefore(minutes: number) {
    settings.value.minutesBefore = minutes
    saveSettings()
  }

  /**
   * True when the browser can schedule notifications that fire even when
   * the page is closed (Notification Triggers API, Chromium-only as of 2025).
   */
  function supportsBackgroundScheduling(): boolean {
    if (import.meta.server || !('Notification' in window)) return false
    return 'showTrigger' in Notification.prototype
  }

  /**
   * Post scheduled notifications to the Service Worker, which uses
   * TimestampTrigger to fire them at the right time.
   */
  async function scheduleViaServiceWorker(
    items: Array<{ tag: string, title: string, body: string, timestamp: number, prayerName: string }>,
  ): Promise<boolean> {
    if (import.meta.server) return false
    if (!('serviceWorker' in navigator)) return false

    try {
      const reg = await navigator.serviceWorker.ready
      reg.active?.postMessage({
        type: 'SCHEDULE_PRAYER_NOTIFICATIONS',
        items,
      })
      return true
    } catch (err) {
      console.warn('[Notifications] SW scheduling failed', err)
      return false
    }
  }

  /**
   * Show a notification immediately. Prefer the SW channel so the
   * notification persists across tab close.
   */
  function showNotification(title: string, body: string, tag?: string) {
    if (import.meta.server) return
    if (!settings.value.enabled || permission.value !== 'granted') return

    const options: NotificationOptions = {
      body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: tag || 'muslimapp-prayer',
      silent: !settings.value.sound,
    }

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SHOW_NOTIFICATION',
        title,
        body,
        tag: options.tag,
      })
      return
    }

    new Notification(title, options)
  }

  /**
   * Schedule notifications for prayer times.
   * Clears any previously scheduled timers/triggers first.
   */
  async function schedulePrayerNotifications(
    prayers: ReadonlyArray<{ readonly name: string, readonly timestamp: number }>,
  ) {
    clearScheduled()

    if (!settings.value.enabled || permission.value !== 'granted') return

    const now = Date.now()
    const leadMs = settings.value.minutesBefore * 60 * 1000
    const horizon = 24 * 60 * 60 * 1000 // 24h

    const items = prayers
      .filter(p => settings.value.prayerAlerts[p.name])
      .map(p => {
        const notifyAt = p.timestamp - leadMs
        const prayerI18nKey = `prayer.${p.name.toLowerCase()}`
        return {
          tag: `prayer-${p.name}-${p.timestamp}`,
          prayerName: p.name,
          title: t(prayerI18nKey),
          body: settings.value.minutesBefore > 0
            ? t('notifications.prayerIn', { minutes: settings.value.minutesBefore })
            : t('notifications.prayerNow'),
          timestamp: notifyAt,
        }
      })
      .filter(item => item.timestamp > now && item.timestamp - now < horizon)

    if (items.length === 0) return

    // Try background scheduling via SW + TimestampTrigger
    if (supportsBackgroundScheduling()) {
      const ok = await scheduleViaServiceWorker(items)
      if (ok) return
    }

    // Fallback: page-scope setTimeout (only works while tab is open)
    for (const item of items) {
      const delay = item.timestamp - now
      const timer = setTimeout(() => {
        showNotification(item.title, item.body, item.tag)
      }, delay)
      scheduledTimers.value.push(timer)
    }
  }

  function clearScheduled() {
    scheduledTimers.value.forEach(clearTimeout)
    scheduledTimers.value = []

    // Also ask the SW to drop any scheduled triggers
    if (import.meta.client && 'serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_PRAYER_NOTIFICATIONS' })
    }
  }

  return {
    settings: readonly(settings),
    permission: readonly(permission),
    loadSettings,
    toggleEnabled,
    togglePrayer,
    setMinutesBefore,
    schedulePrayerNotifications,
    clearScheduled,
    supportsBackgroundScheduling,
    PRAYER_NAMES,
  }
}
