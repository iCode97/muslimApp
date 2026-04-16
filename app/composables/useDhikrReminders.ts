/**
 * Dhikr reminder composable.
 * Schedules daily morning & evening adhkar nudges via the Service Worker
 * using the Notification Triggers API (TimestampTrigger).
 *
 * Falls back silently if background scheduling is unsupported — the toggle
 * still stores user preference but reminders only fire while the tab is open.
 */

interface DhikrSlot {
  enabled: boolean
  hour: number   // 0–23
  minute: number // 0–59
}

interface DhikrReminderSettings {
  enabled: boolean
  morning: DhikrSlot
  evening: DhikrSlot
}

const STORAGE_KEY = 'muslimapp-dhikr-reminders'
/** Days ahead to schedule notifications for (reduced to stay under any browser quotas) */
const SCHEDULE_HORIZON_DAYS = 7

export function useDhikrReminders() {
  const { t } = useI18n()

  const settings = useState<DhikrReminderSettings>('dhikr-reminder-settings', () => ({
    enabled: false,
    morning: { enabled: true, hour: 7, minute: 0 },
    evening: { enabled: true, hour: 19, minute: 0 },
  }))

  const permission = ref<NotificationPermission>('default')

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

  function supportsBackground(): boolean {
    if (import.meta.server || !('Notification' in window)) return false
    return 'showTrigger' in Notification.prototype
  }

  async function requestPermission(): Promise<boolean> {
    if (import.meta.server || !('Notification' in window)) return false
    const result = await Notification.requestPermission()
    permission.value = result
    return result === 'granted'
  }

  /** Build timestamps for the next N days at a given local hour:minute */
  function nextOccurrences(hour: number, minute: number, days: number): number[] {
    const result: number[] = []
    const now = new Date()
    for (let i = 0; i < days; i++) {
      const d = new Date(now)
      d.setDate(d.getDate() + i)
      d.setHours(hour, minute, 0, 0)
      if (d.getTime() > Date.now()) {
        result.push(d.getTime())
      }
    }
    return result
  }

  async function schedule() {
    if (import.meta.server || !('serviceWorker' in navigator)) return false
    if (!settings.value.enabled || permission.value !== 'granted') {
      await clear()
      return false
    }

    const items: Array<{ tag: string, title: string, body: string, timestamp: number, url: string }> = []

    if (settings.value.morning.enabled) {
      const times = nextOccurrences(
        settings.value.morning.hour,
        settings.value.morning.minute,
        SCHEDULE_HORIZON_DAYS,
      )
      times.forEach((ts) => {
        items.push({
          tag: `dhikr-morning-${ts}`,
          title: t('dhikrReminder.morningTitle'),
          body: t('dhikrReminder.morningBody'),
          timestamp: ts,
          url: '/dua?cat=morning',
        })
      })
    }

    if (settings.value.evening.enabled) {
      const times = nextOccurrences(
        settings.value.evening.hour,
        settings.value.evening.minute,
        SCHEDULE_HORIZON_DAYS,
      )
      times.forEach((ts) => {
        items.push({
          tag: `dhikr-evening-${ts}`,
          title: t('dhikrReminder.eveningTitle'),
          body: t('dhikrReminder.eveningBody'),
          timestamp: ts,
          url: '/dua?cat=evening',
        })
      })
    }

    if (items.length === 0) return false

    try {
      const reg = await navigator.serviceWorker.ready
      reg.active?.postMessage({ type: 'SCHEDULE_DHIKR_REMINDERS', items })
      return true
    } catch (err) {
      console.warn('[DhikrReminders] SW scheduling failed', err)
      return false
    }
  }

  async function clear() {
    if (import.meta.server || !('serviceWorker' in navigator)) return
    try {
      const reg = await navigator.serviceWorker.ready
      reg.active?.postMessage({ type: 'CLEAR_DHIKR_REMINDERS' })
    } catch { /* ignore */ }
  }

  async function toggleEnabled(): Promise<void> {
    if (!settings.value.enabled) {
      const granted = await requestPermission()
      if (granted) {
        settings.value.enabled = true
        saveSettings()
        await schedule()
      }
    } else {
      settings.value.enabled = false
      saveSettings()
      await clear()
    }
  }

  function toggleSlot(slot: 'morning' | 'evening') {
    settings.value[slot].enabled = !settings.value[slot].enabled
    saveSettings()
    if (settings.value.enabled) schedule()
  }

  function setSlotTime(slot: 'morning' | 'evening', hour: number, minute: number) {
    settings.value[slot].hour = hour
    settings.value[slot].minute = minute
    saveSettings()
    if (settings.value.enabled) schedule()
  }

  function formatTime(slot: DhikrSlot): string {
    const h = String(slot.hour).padStart(2, '0')
    const m = String(slot.minute).padStart(2, '0')
    return `${h}:${m}`
  }

  return {
    settings: readonly(settings),
    permission: readonly(permission),
    loadSettings,
    toggleEnabled,
    toggleSlot,
    setSlotTime,
    schedule,
    clear,
    supportsBackground,
    formatTime,
  }
}
