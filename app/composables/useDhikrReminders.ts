/**
 * Dhikr reminder composable — daily morning & evening adhkar nudges.
 *
 * Delivery follows the notification mode of useNotifications():
 *   - 'push':  the server sends the reminders via Web Push (works while the
 *              app is closed); prefs are synced by the push-sync plugin.
 *   - 'local': scheduled in the Service Worker via the Notification Triggers
 *              API where available, otherwise page-scope timers (only while
 *              the app is open).
 */

export interface DhikrSlot {
  enabled: boolean
  hour: number   // 0–23
  minute: number // 0–59
}

export interface DhikrReminderSettings {
  enabled: boolean
  morning: DhikrSlot
  evening: DhikrSlot
}

export function defaultDhikrSettings(): DhikrReminderSettings {
  return {
    enabled: false,
    morning: { enabled: true, hour: 7, minute: 0 },
    evening: { enabled: true, hour: 19, minute: 0 },
  }
}

const STORAGE_KEY = 'muslimapp-dhikr-reminders'
/** Days ahead to schedule trigger notifications for (stays under browser quotas) */
const SCHEDULE_HORIZON_DAYS = 7
/** Page-timer fallback only covers the next 24h */
const TIMER_HORIZON_MS = 24 * 60 * 60 * 1000

const dhikrTimers: ReturnType<typeof setTimeout>[] = []
let dhikrLoaded = false

export function useDhikrReminders() {
  const i18n = useNuxtApp().$i18n
  const t = i18n.t
  const notifications = useNotifications()

  const settings = useState<DhikrReminderSettings>('dhikr-reminder-settings', defaultDhikrSettings)
  const permission = useState<NotificationPermission>('notification-permission', () => 'default')

  function loadSettings() {
    if (import.meta.server) return
    if (!dhikrLoaded) {
      dhikrLoaded = true
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          settings.value = { ...settings.value, ...JSON.parse(saved) }
        }
        catch {
          localStorage.removeItem(STORAGE_KEY)
        }
      }
    }
    permission.value = 'Notification' in window ? Notification.permission : 'denied'
  }

  function saveSettings() {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings.value))
    }
  }

  /** True when reminders also fire while the app is closed. */
  function supportsBackground(): boolean {
    if (import.meta.server || !('Notification' in window)) return false
    return notifications.mode.value === 'push' || 'showTrigger' in Notification.prototype
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

  function clearTimers() {
    dhikrTimers.forEach(clearTimeout)
    dhikrTimers.length = 0
  }

  /** Schedule local reminders (no-op in push mode — the server sends them). */
  async function schedule() {
    if (import.meta.server) return false
    clearTimers()
    if (!settings.value.enabled || permission.value !== 'granted' || notifications.mode.value === 'push') {
      await clear()
      return false
    }

    const items: Array<{ tag: string, title: string, body: string, timestamp: number, url: string }> = []
    for (const slot of ['morning', 'evening'] as const) {
      const prefs = settings.value[slot]
      if (!prefs.enabled) continue
      for (const ts of nextOccurrences(prefs.hour, prefs.minute, SCHEDULE_HORIZON_DAYS)) {
        items.push({
          tag: `dhikr-${slot}-${ts}`,
          title: t(slot === 'morning' ? 'dhikrReminder.morningTitle' : 'dhikrReminder.eveningTitle'),
          body: t(slot === 'morning' ? 'dhikrReminder.morningBody' : 'dhikrReminder.eveningBody'),
          timestamp: ts,
          url: `/adhkar?set=${slot}`,
        })
      }
    }
    if (items.length === 0) return false

    // Notification Triggers API (fires while closed) where available
    if ('Notification' in window && 'showTrigger' in Notification.prototype) {
      try {
        const reg = await getSwRegistration()
        if (reg?.active) {
          reg.active.postMessage({ type: 'SCHEDULE_DHIKR_REMINDERS', items })
          return true
        }
      }
      catch (err) {
        console.warn('[DhikrReminders] SW scheduling failed', err)
      }
    }

    // Fallback: page-scope timers (only while the app is open)
    const now = Date.now()
    for (const item of items) {
      const delay = item.timestamp - now
      if (delay <= 0 || delay > TIMER_HORIZON_MS) continue
      dhikrTimers.push(setTimeout(() => {
        if (!('Notification' in window) || Notification.permission !== 'granted') return
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'SHOW_NOTIFICATION', title: item.title, body: item.body, tag: item.tag, url: item.url,
          })
        }
        else {
          try {
            new Notification(item.title, { body: item.body, tag: item.tag, icon: '/favicon.svg' })
          }
          catch { /* ignore */ }
        }
      }, delay))
    }
    return true
  }

  async function clear() {
    clearTimers()
    if (import.meta.server || !('serviceWorker' in navigator)) return
    if (!('Notification' in window) || !('showTrigger' in Notification.prototype)) return
    try {
      const reg = await getSwRegistration()
      reg?.active?.postMessage({ type: 'CLEAR_DHIKR_REMINDERS' })
    }
    catch { /* ignore */ }
  }

  async function toggleEnabled(): Promise<void> {
    if (!settings.value.enabled) {
      const granted = await requestPermission()
      if (granted) {
        settings.value = { ...settings.value, enabled: true }
        saveSettings()
      }
    }
    else {
      settings.value = { ...settings.value, enabled: false }
      saveSettings()
      await clear()
    }
    await notifications.syncPush()
  }

  function toggleSlot(slot: 'morning' | 'evening') {
    settings.value = { ...settings.value, [slot]: { ...settings.value[slot], enabled: !settings.value[slot].enabled } }
    saveSettings()
  }

  function setSlotTime(slot: 'morning' | 'evening', hour: number, minute: number) {
    settings.value = { ...settings.value, [slot]: { ...settings.value[slot], hour, minute } }
    saveSettings()
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
