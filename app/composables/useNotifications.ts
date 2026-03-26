/**
 * Prayer time notifications composable.
 * Uses the Notification API for local notifications.
 * Schedules notifications for upcoming prayers.
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
    reschedule()
  }

  function setMinutesBefore(minutes: number) {
    settings.value.minutesBefore = minutes
    saveSettings()
    reschedule()
  }

  /**
   * Show a notification immediately
   */
  function showNotification(title: string, body: string, tag?: string) {
    if (import.meta.server) return
    if (!settings.value.enabled || permission.value !== 'granted') return

    new Notification(title, {
      body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: tag || 'muslimapp-prayer',
      silent: !settings.value.sound,
    })
  }

  /**
   * Schedule notifications for prayer times
   */
  function schedulePrayerNotifications(prayers: ReadonlyArray<{ readonly name: string, readonly timestamp: number }>) {
    clearScheduled()

    if (!settings.value.enabled || permission.value !== 'granted') return

    const now = Date.now()
    const leadMs = settings.value.minutesBefore * 60 * 1000

    for (const prayer of prayers) {
      if (!settings.value.prayerAlerts[prayer.name]) continue

      const notifyAt = prayer.timestamp - leadMs
      const delay = notifyAt - now

      if (delay > 0 && delay < 24 * 60 * 60 * 1000) { // Within 24h
        const timer = setTimeout(() => {
          const prayerI18nKey = `prayer.${prayer.name.toLowerCase()}`
          showNotification(
            t(prayerI18nKey),
            settings.value.minutesBefore > 0
              ? t('notifications.prayerIn', { minutes: settings.value.minutesBefore })
              : t('notifications.prayerNow'),
            `prayer-${prayer.name}`
          )
        }, delay)
        scheduledTimers.value.push(timer)
      }
    }
  }

  function clearScheduled() {
    scheduledTimers.value.forEach(clearTimeout)
    scheduledTimers.value = []
  }

  function reschedule() {
    // Will be called from the prayer times watcher
    // Implementation depends on current prayer data
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
    PRAYER_NAMES,
  }
}
