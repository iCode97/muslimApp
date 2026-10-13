/**
 * Prayer-time notifications + the client side of Web Push.
 *
 * Modes (`mode`):
 *   - 'push'        Server-side scheduling via Web Push (server/tasks/push/dispatch.ts).
 *                   Reminders arrive even when the app is closed. Requires VAPID keys
 *                   on the server, PushManager support and — on iOS — the app being
 *                   installed to the Home Screen (iOS 16.4+).
 *   - 'local'       Fallback: reminders are scheduled in the page (setTimeout, or the
 *                   SW Notification Triggers API where it exists) and only fire while
 *                   the app is open.
 *   - 'unsupported' No Notification / Service Worker support at all.
 *
 * The push subscription is shared by prayer and dhikr reminders: it exists
 * while at least one of them is enabled. Preferences (location rounded to
 * ~1 km, calculation params, toggles, locale) are kept in sync with the server
 * by the global `push-sync` client plugin (debounced watcher), so changes made
 * anywhere in the app are picked up. Local scheduling is driven from there
 * too, so it works on every route.
 */
import type { PushConfigResponse, PushPrefs, PushSubscriptionData } from '#shared/push/types'
import { resolveLatitudeAdjustment } from '~/data/prayer-methods'
import { deviceTimeZone } from '~/utils/time'
import { getSwRegistration } from '~/utils/sw'
import { defaultDhikrSettings, type DhikrReminderSettings } from './useDhikrReminders'

interface NotificationSettings {
  enabled: boolean
  prayerAlerts: Record<string, boolean>  // per-prayer toggle
  minutesBefore: number                   // notify X minutes before
  sound: boolean
}

export type NotificationMode = 'push' | 'local' | 'unsupported'

const STORAGE_KEY = 'muslimapp-notifications'
const PRAYER_NAMES = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const

// --- module-level client state (one app per page) ---------------------------
const scheduledTimers: ReturnType<typeof setTimeout>[] = []
let settingsLoaded = false
let configPromise: Promise<PushConfigResponse> | null = null
/** Serialises sync runs so subscribe/unsubscribe never race. */
let syncChain: Promise<void> = Promise.resolve()
/** JSON of the last prefs successfully stored on the server (this session). */
let lastSynced: string | null = null

function urlBase64ToUint8Array(base64: string): Uint8Array<ArrayBuffer> {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const raw = atob((base64 + padding).replace(/-/g, '+').replace(/_/g, '/'))
  const out = new Uint8Array(new ArrayBuffer(raw.length))
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i)
  return out
}

function sameKey(a: ArrayBuffer | null | undefined, b: Uint8Array): boolean {
  if (!a) return false
  const x = new Uint8Array(a)
  return x.length === b.length && x.every((v, i) => v === b[i])
}

function isIOS(): boolean {
  const ua = navigator.userAgent
  return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

function isStandalone(): boolean {
  return (navigator as Navigator & { standalone?: boolean }).standalone === true
    || window.matchMedia?.('(display-mode: standalone)').matches === true
}

function supportsTriggers(): boolean {
  return 'Notification' in window && 'showTrigger' in Notification.prototype
}

export function useNotifications() {
  const nuxtApp = useNuxtApp()
  const i18n = nuxtApp.$i18n
  const t = i18n.t

  const settings = useState<NotificationSettings>('notification-settings', () => ({
    enabled: false,
    prayerAlerts: Object.fromEntries(PRAYER_NAMES.map(p => [p, true])),
    minutesBefore: 10,
    sound: true,
  }))
  const permission = useState<NotificationPermission>('notification-permission', () => 'default')
  const mode = useState<NotificationMode>('notification-mode', () => 'local')
  const pushConfig = useState<PushConfigResponse | null>('push-config', () => null)
  /** True while this device has an active subscription stored on the server */
  const pushActive = useState<boolean>('push-active', () => false)
  /** i18n key of the last push setup error, if any */
  const pushError = useState<string | null>('push-error', () => null)
  /** iOS Safari outside the Home Screen app: push is impossible until installed */
  const iosNeedsInstall = useState<boolean>('push-ios-needs-install', () => false)

  // Other state the push prefs are built from (shared useState keys)
  const dhikr = useState<DhikrReminderSettings>('dhikr-reminder-settings', defaultDhikrSettings)
  const { location } = useLocation()
  const prayerTimes = usePrayerTimes()

  // ---------------------------------------------------------------------------
  // Settings
  // ---------------------------------------------------------------------------

  /** Load persisted settings (idempotent). */
  function loadSettings() {
    if (import.meta.server) return
    if (!settingsLoaded) {
      settingsLoaded = true
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
        settings.value = { ...settings.value, enabled: true }
      }
    }
    else {
      settings.value = { ...settings.value, enabled: false }
      clearScheduled()
    }
    saveSettings()
    await syncPush()
  }

  function togglePrayer(prayer: string) {
    settings.value = {
      ...settings.value,
      prayerAlerts: { ...settings.value.prayerAlerts, [prayer]: !settings.value.prayerAlerts[prayer] },
    }
    saveSettings()
  }

  function setMinutesBefore(minutes: number) {
    settings.value = { ...settings.value, minutesBefore: minutes }
    saveSettings()
  }

  // ---------------------------------------------------------------------------
  // Push: capability, config, mode
  // ---------------------------------------------------------------------------

  function notificationsSupported(): boolean {
    return import.meta.client && 'Notification' in window && 'serviceWorker' in navigator
  }

  function pushSupportedByBrowser(): boolean {
    return notificationsSupported() && 'PushManager' in window
  }

  async function loadPushConfig(): Promise<PushConfigResponse> {
    if (!configPromise) {
      configPromise = $fetch<PushConfigResponse>('/api/push/config')
        .catch(() => ({ enabled: false, publicKey: null }))
    }
    pushConfig.value = await configPromise
    return pushConfig.value
  }

  /**
   * Work out which mode this device can use (does not subscribe).
   * Returns true when push is possible.
   */
  async function refreshPushStatus(): Promise<boolean> {
    if (import.meta.server) return false
    loadSettings()
    iosNeedsInstall.value = isIOS() && !isStandalone()
    if (!notificationsSupported()) {
      mode.value = 'unsupported'
      return false
    }
    if (!pushSupportedByBrowser() || iosNeedsInstall.value) {
      mode.value = 'local'
      return false
    }
    const config = await loadPushConfig()
    if (!config.enabled || !config.publicKey) {
      mode.value = 'local'
      return false
    }
    // Push is possible; it is the active mode once a subscription is stored
    if (!pushActive.value && mode.value === 'push') mode.value = 'local'
    return true
  }

  /** Reminder preferences as sent to the server. */
  function buildPushPrefs(): PushPrefs {
    const loc = location.value
    const calc = prayerTimes.settings.value
    const tz = loc?.timezone ?? prayerTimes.data.value?.timezone ?? deviceTimeZone()
    const lam = loc ? resolveLatitudeAdjustment(calc.latitudeAdjustment, loc.latitude) : undefined
    const locale = i18n.locale.value
    return {
      // Server push copy exists in de/en/tr only → Arabic users get English
      locale: locale === 'tr' ? 'tr' : locale === 'en' || locale === 'ar' ? 'en' : 'de',
      timezone: deviceTimeZone(),
      location: loc
        ? { lat: Math.round(loc.latitude * 100) / 100, lng: Math.round(loc.longitude * 100) / 100, timezone: tz }
        : null,
      prayerParams: {
        method: prayerTimes.method.value,
        school: calc.school,
        latitudeAdjustmentMethod: lam ?? null,
        adjustments: { ...calc.adjustments },
      },
      prayersEnabled: settings.value.enabled,
      prayers: Object.fromEntries(PRAYER_NAMES.map(p => [p, settings.value.prayerAlerts[p] !== false])) as PushPrefs['prayers'],
      minutesBefore: settings.value.minutesBefore,
      dhikr: {
        enabled: dhikr.value.enabled,
        morning: { enabled: dhikr.value.morning.enabled, h: dhikr.value.morning.hour, m: dhikr.value.morning.minute },
        evening: { enabled: dhikr.value.evening.enabled, h: dhikr.value.evening.hour, m: dhikr.value.evening.minute },
      },
    }
  }

  async function postJson(url: string, body: Record<string, unknown>): Promise<unknown> {
    const response: unknown = await $fetch(url, { method: 'POST', body })
    return response
  }

  async function runSync(): Promise<void> {
    const wantReminders = (settings.value.enabled || dhikr.value.enabled) && permission.value === 'granted'
    const possible = await refreshPushStatus()
    if (!possible) {
      pushActive.value = false
      return
    }

    const reg = await getSwRegistration()
    if (!reg?.pushManager) {
      pushActive.value = false
      mode.value = 'local'
      return
    }
    let sub = await reg.pushManager.getSubscription()

    if (!wantReminders) {
      if (sub) {
        const endpoint = sub.endpoint
        await postJson('/api/push/unsubscribe', { endpoint }).catch(() => {})
        await sub.unsubscribe().catch(() => false)
      }
      pushActive.value = false
      lastSynced = null
      mode.value = 'local'
      return
    }

    const key = urlBase64ToUint8Array(pushConfig.value!.publicKey!)
    // Server keys were rotated → the old subscription can't receive our pushes
    if (sub && !sameKey(sub.options.applicationServerKey, key)) {
      await postJson('/api/push/unsubscribe', { endpoint: sub.endpoint }).catch(() => {})
      await sub.unsubscribe().catch(() => false)
      sub = null
    }
    if (!sub) {
      sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: key })
      lastSynced = null
    }

    const prefs = buildPushPrefs()
    const snapshot = JSON.stringify({ endpoint: sub.endpoint, prefs })
    if (snapshot !== lastSynced) {
      if (lastSynced === null) {
        await postJson('/api/push/subscribe', { subscription: sub.toJSON() as PushSubscriptionData, prefs })
      }
      else {
        try {
          await postJson('/api/push/update', { endpoint: sub.endpoint, prefs })
        }
        catch (err) {
          // Server lost the record (e.g. storage reset) → store it again
          if ((err as { statusCode?: number }).statusCode !== 404) throw err
          await postJson('/api/push/subscribe', { subscription: sub.toJSON() as PushSubscriptionData, prefs })
        }
      }
      lastSynced = snapshot
    }
    pushActive.value = true
    pushError.value = null
    mode.value = 'push'
  }

  /**
   * Bring the push subscription and server-side prefs in line with the
   * current settings: subscribe, update, or unsubscribe + delete. Falls back
   * to 'local' mode on any failure. Serialised; safe to call often.
   */
  function syncPush(): Promise<void> {
    if (import.meta.server) return Promise.resolve()
    syncChain = syncChain.then(runSync).catch((err) => {
      console.warn('[Notifications] push sync failed, using local reminders', err)
      pushActive.value = false
      pushError.value = 'push.setupFailed'
      lastSynced = null
      if (mode.value === 'push') mode.value = 'local'
    })
    return syncChain
  }

  /**
   * Remove this device's push subscription from the server (stored record is
   * deleted) and from the browser, and cancel locally scheduled reminders.
   * Used by "delete all local data"; does not touch the stored settings.
   */
  async function unsubscribePush(): Promise<void> {
    if (import.meta.server) return
    await syncChain.catch(() => {})
    const reg = await getSwRegistration()
    const sub = await reg?.pushManager?.getSubscription()
    if (sub) {
      await postJson('/api/push/unsubscribe', { endpoint: sub.endpoint }).catch(() => {})
      await sub.unsubscribe().catch(() => false)
    }
    pushActive.value = false
    lastSynced = null
    if (mode.value === 'push') mode.value = 'local'
    clearScheduled()
  }

  /** Send a test notification (via the server in push mode, locally otherwise). */
  async function sendTest(): Promise<boolean> {
    if (import.meta.server || permission.value !== 'granted') return false
    if (mode.value === 'push' && pushActive.value) {
      try {
        const reg = await getSwRegistration()
        const sub = await reg?.pushManager?.getSubscription()
        if (!sub) return false
        await postJson('/api/push/test', { endpoint: sub.endpoint })
        return true
      }
      catch {
        return false
      }
    }
    return showNotification(t('push.testTitle'), t('push.testBody'), 'muslimapp-test', true)
  }

  // ---------------------------------------------------------------------------
  // Local scheduling (fallback when push is unavailable)
  // ---------------------------------------------------------------------------

  /**
   * True when reminders also fire while the app is closed (push active, or the
   * Notification Triggers API is available).
   */
  function supportsBackgroundScheduling(): boolean {
    if (import.meta.server || !('Notification' in window)) return false
    return mode.value === 'push' || supportsTriggers()
  }

  /**
   * Post scheduled notifications to the Service Worker, which uses
   * TimestampTrigger to fire them at the right time.
   */
  async function scheduleViaServiceWorker(
    items: Array<{ tag: string, title: string, body: string, timestamp: number, prayerName: string }>,
  ): Promise<boolean> {
    try {
      const reg = await getSwRegistration()
      if (!reg?.active) return false
      reg.active.postMessage({ type: 'SCHEDULE_PRAYER_NOTIFICATIONS', items })
      return true
    }
    catch (err) {
      console.warn('[Notifications] SW scheduling failed', err)
      return false
    }
  }

  /** Show a notification immediately (prefers the SW so it persists). */
  function showNotification(title: string, body: string, tag?: string, force = false): boolean {
    if (import.meta.server || !('Notification' in window)) return false
    if ((!force && !settings.value.enabled) || permission.value !== 'granted') return false

    const options: NotificationOptions = {
      body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: tag || 'muslimapp-prayer',
      silent: !settings.value.sound,
    }

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SHOW_NOTIFICATION', title, body, tag: options.tag })
      return true
    }
    try {
      new Notification(title, options)
      return true
    }
    catch {
      return false
    }
  }

  /**
   * Schedule local notifications for the given prayers (next 24h).
   * Clears previously scheduled timers first. No-op in push mode.
   */
  async function schedulePrayerNotifications(
    prayers: ReadonlyArray<{ readonly name: string, readonly timestamp: number }>,
  ) {
    clearScheduled()

    if (mode.value === 'push') return
    if (!settings.value.enabled || permission.value !== 'granted') return

    const now = Date.now()
    const leadMs = settings.value.minutesBefore * 60 * 1000
    const horizon = 24 * 60 * 60 * 1000 // 24h

    const items = prayers
      .filter(p => settings.value.prayerAlerts[p.name])
      .map((p) => {
        const notifyAt = p.timestamp - leadMs
        return {
          tag: `prayer-${p.name}-${p.timestamp}`,
          prayerName: p.name,
          title: t(`prayer.${p.name.toLowerCase()}`),
          body: settings.value.minutesBefore > 0
            ? t('notifications.prayerIn', { minutes: settings.value.minutesBefore })
            : t('notifications.prayerNow'),
          timestamp: notifyAt,
        }
      })
      .filter(item => item.timestamp > now && item.timestamp - now < horizon)

    if (items.length === 0) return

    // Background scheduling via SW + TimestampTrigger where available
    if (supportsTriggers() && await scheduleViaServiceWorker(items)) return

    // Fallback: page-scope setTimeout (only works while the app is open)
    for (const item of items) {
      scheduledTimers.push(setTimeout(() => {
        showNotification(item.title, item.body, item.tag)
      }, item.timestamp - now))
    }
  }

  function clearScheduled() {
    scheduledTimers.forEach(clearTimeout)
    scheduledTimers.length = 0

    // Only trigger-scheduled notifications live in the SW (never close pushed ones)
    if (import.meta.client && supportsTriggers() && navigator.serviceWorker?.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_PRAYER_NOTIFICATIONS' })
    }
  }

  return {
    settings: readonly(settings),
    permission: readonly(permission),
    mode: readonly(mode),
    pushConfig: readonly(pushConfig),
    pushActive: readonly(pushActive),
    pushError: readonly(pushError),
    iosNeedsInstall: readonly(iosNeedsInstall),
    loadSettings,
    toggleEnabled,
    togglePrayer,
    setMinutesBefore,
    schedulePrayerNotifications,
    clearScheduled,
    supportsBackgroundScheduling,
    refreshPushStatus,
    buildPushPrefs,
    syncPush,
    unsubscribePush,
    sendTest,
    PRAYER_NAMES,
  }
}
