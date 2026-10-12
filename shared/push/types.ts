/**
 * Web Push — types & constants shared by the client (useNotifications) and the
 * Nitro server (push API + scheduler). Pure, dependency-free.
 */

export const PUSH_LOCALES = ['de', 'en', 'tr'] as const
export type PushLocale = typeof PUSH_LOCALES[number]

/** Prayers a reminder can be sent for (Sunrise is not a prayer). */
export const PUSH_PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const
export type PushPrayer = typeof PUSH_PRAYERS[number]

/** Prayers with a per-minute adjustment (mirrors app/data/prayer-methods.ts). */
export const PUSH_ADJUSTABLE_PRAYERS = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const
export type PushAdjustablePrayer = typeof PUSH_ADJUSTABLE_PRAYERS[number]
export type PushAdjustments = Record<PushAdjustablePrayer, number>

/** Max. absolute per-prayer adjustment in minutes (mirrors MAX_PRAYER_ADJUSTMENT). */
export const PUSH_MAX_ADJUSTMENT = 30
/** Max. "notify X minutes before" lead time. */
export const PUSH_MAX_MINUTES_BEFORE = 60

/** Serialised PushSubscription (PushSubscription.toJSON()). */
export interface PushSubscriptionData {
  endpoint: string
  expirationTime: number | null
  keys: { p256dh: string, auth: string }
}

export interface DhikrSlotPrefs {
  enabled: boolean
  /** 0–23, wall-clock hour in the subscriber's timezone */
  h: number
  /** 0–59 */
  m: number
}

export interface PushLocation {
  /** Rounded to 2 decimals (~1 km) for privacy */
  lat: number
  lng: number
  /** IANA timezone of the location */
  timezone: string
}

export interface PushPrayerParams {
  /** Aladhan method id (0–23) */
  method: number
  /** Asr school: 0 = Standard, 1 = Hanafi */
  school: 0 | 1
  /** Resolved high-latitude rule, null = Aladhan default */
  latitudeAdjustmentMethod: 0 | 1 | 2 | 3 | null
  /** Per-prayer minute adjustments, applied on top of the method's times */
  adjustments: PushAdjustments
}

/** Everything the server needs to know to send a subscriber's reminders. */
export interface PushPrefs {
  locale: PushLocale
  /** Device IANA timezone — dhikr reminder times are wall-clock times in this zone */
  timezone: string
  /** null until the user picked a location (prayer reminders can't be sent then) */
  location: PushLocation | null
  prayerParams: PushPrayerParams
  /** Master switch for prayer reminders */
  prayersEnabled: boolean
  prayers: Record<PushPrayer, boolean>
  minutesBefore: number
  dhikr: {
    enabled: boolean
    morning: DhikrSlotPrefs
    evening: DhikrSlotPrefs
  }
}

/** A stored subscriber (Nitro storage `push:<id>`). */
export interface PushRecord extends PushPrefs {
  /** sha256(endpoint), hex */
  id: string
  subscription: PushSubscriptionData
  createdAt: number
  updatedAt: number
  /** notificationId → epoch ms it was sent (dedupe, pruned) */
  sent: Record<string, number>
}

/** Payload understood by the service worker's `push` handler. */
export interface PushPayload {
  title: string
  body: string
  tag: string
  url: string
}

/** GET /api/push/config */
export interface PushConfigResponse {
  enabled: boolean
  publicKey: string | null
}
