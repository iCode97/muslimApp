/// <reference lib="webworker" />
/**
 * MuslimApp Service Worker (built by @vite-pwa/nuxt, strategy: injectManifest).
 *
 * Served at /sw.js with scope "/" — the same URL the legacy hand-written
 * worker used, so existing installs pick this one up via the normal SW
 * update check.
 *
 * Caching:
 *  - Hashed client build assets: precached (self.__WB_MANIFEST).
 *  - Navigations (SSR HTML): NetworkFirst (3s timeout) → cached copy of the
 *    same URL → cached "/" as last resort. Never cache-first, so a deploy is
 *    picked up on the next online navigation.
 *  - Aladhan proxy (/api/aladhan/**) and api.quran.com: NetworkFirst + expiry.
 *  - Quran verse / word audio (verses.quran.com, audio.qurancdn.com, mirrors.quranicaudio.com):
 *    CacheFirst on whole files, answered as byte ranges (needed by <audio> in Safari).
 *  - Google Fonts: stylesheets StaleWhileRevalidate, font files CacheFirst.
 *  - Nominatim geocoding: network only.
 *
 * Notifications: message-driven scheduling of prayer / dhikr notifications
 * (TimestampTrigger where supported), Web Push and notificationclick.
 */
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute, setCatchHandler } from 'workbox-routing'
import { CacheFirst, NetworkFirst, NetworkOnly, StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { RangeRequestsPlugin } from 'workbox-range-requests'
import { clientsClaim } from 'workbox-core'

declare let self: ServiceWorkerGlobalScope

// Non-standard Notification Triggers API (Chromium origin trial / flag).
declare class TimestampTrigger {
  constructor(timestamp: number)
}

type SWNotificationOptions = NotificationOptions & {
  showTrigger?: TimestampTrigger
}

const DAY = 24 * 60 * 60
const PAGES_CACHE = 'muslimapp-pages'
const LEGACY_CACHE = /^muslimapp-v\d+$/

// ============================================
// LIFECYCLE
// ============================================

/**
 * Caches written by the legacy hand-written worker (public/sw.js) were named
 * `muslimapp-v<N>`. Our own caches never match that prefix.
 */
async function getLegacyCacheKeys(): Promise<string[]> {
  const keys = await caches.keys()
  return keys.filter(key => LEGACY_CACHE.test(key))
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    // Warm the offline fallback for navigations. Failure must not block install.
    try {
      const cache = await caches.open(PAGES_CACHE)
      await cache.add(new Request('/', { credentials: 'same-origin' }))
    } catch {
      /* offline during install — '/' will be cached on first online visit */
    }

    // Migration: the legacy worker served documents cache-first and its pages
    // have no update UI, so a waiting worker would never be activated from
    // there. Take over immediately in that one case only.
    if ((await getLegacyCacheKeys()).length > 0) {
      await self.skipWaiting()
    }
  })())
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const legacy = await getLegacyCacheKeys()
    await Promise.all(legacy.map(key => caches.delete(key)))
  })())
})

clientsClaim()
cleanupOutdatedCaches()

// ============================================
// PRECACHE (hashed client assets from the build)
// ============================================

precacheAndRoute(self.__WB_MANIFEST)

// ============================================
// NAVIGATIONS — network-first, never stale after a deploy
// ============================================

const navigationStrategy = new NetworkFirst({
  cacheName: PAGES_CACHE,
  networkTimeoutSeconds: 3,
  plugins: [
    new CacheableResponsePlugin({ statuses: [200] }),
    new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 30 * DAY }),
  ],
})

registerRoute(new NavigationRoute(navigationStrategy, {
  // Server endpoints are never app pages.
  denylist: [/^\/api\//, /^\/_nuxt\//, /^\/__/],
}))

// Last resort for a failed navigation (offline + URL never visited):
// the cached app shell at "/" — the client router then renders the route.
setCatchHandler(async ({ request }) => {
  if (request.mode === 'navigate') {
    const cache = await caches.open(PAGES_CACHE)
    const fallback = await cache.match('/', { ignoreSearch: true })
    if (fallback) return fallback
  }
  return Response.error()
})

// ============================================
// RUNTIME CACHING — APIs & fonts
// ============================================

// Aladhan proxy (same origin, Nitro routes under /api/aladhan/**)
registerRoute(
  ({ url, sameOrigin }) => sameOrigin && url.pathname.startsWith('/api/aladhan/'),
  new NetworkFirst({
    cacheName: 'muslimapp-api-aladhan',
    networkTimeoutSeconds: 5,
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({ maxEntries: 120, maxAgeSeconds: 60 * DAY, purgeOnQuotaError: true }),
    ],
  }),
)

// Quran.com API (called directly from the client)
registerRoute(
  ({ url }) => url.origin === 'https://api.quran.com',
  new NetworkFirst({
    cacheName: 'muslimapp-api-quran',
    networkTimeoutSeconds: 5,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 300, maxAgeSeconds: 90 * DAY, purgeOnQuotaError: true }),
    ],
  }),
)

// Quran verse + word-by-word audio. These hosts send `Access-Control-Allow-Origin: *` and the
// app loads them with crossOrigin="anonymous", so responses are cacheable (not opaque) and
// RangeRequestsPlugin can answer byte-range requests from a cached full file.
const QURAN_AUDIO_CACHE = 'muslimapp-quran-audio'
const QURAN_AUDIO_HOSTS = new Set(['verses.quran.com', 'audio.qurancdn.com', 'mirrors.quranicaudio.com'])
const quranAudioStrategy = new CacheFirst({
  cacheName: QURAN_AUDIO_CACHE,
  plugins: [
    new CacheableResponsePlugin({ statuses: [200] }),
    new RangeRequestsPlugin(),
    new ExpirationPlugin({ maxEntries: 300, maxAgeSeconds: 90 * DAY, purgeOnQuotaError: true }),
  ],
})
registerRoute(
  ({ url }) => QURAN_AUDIO_HOSTS.has(url.hostname),
  async ({ request, event }) => {
    // Media elements ask for `Range: bytes=0-` and get a 206, which can't be cached. On a miss we
    // pass that request through and fetch the whole file once in the background to fill the cache.
    if (request.headers.has('range')) {
      const cache = await caches.open(QURAN_AUDIO_CACHE)
      if (!(await cache.match(request.url))) {
        event.waitUntil(
          quranAudioStrategy.handle({ request: new Request(request.url, { mode: 'cors' }), event }).catch(() => {}),
        )
        return fetch(request)
      }
    }
    return quranAudioStrategy.handle({ request, event })
  },
)

// Google Fonts stylesheets
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 365 * DAY }),
    ],
  }),
)

// Google Fonts files (immutable)
registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 30, maxAgeSeconds: 365 * DAY }),
    ],
  }),
)

// Nominatim geocoding: always live (usage policy + location privacy)
registerRoute(
  ({ url }) => url.hostname === 'nominatim.openstreetmap.org',
  new NetworkOnly(),
)

// ============================================
// SCHEDULED PRAYER NOTIFICATIONS
// ============================================
// Uses the Notification Triggers API (TimestampTrigger) when available —
// this lets notifications fire reliably even if the SW is terminated.
// Falls back to showNotification-on-message for the page to trigger while open.

const NOTIFY_TAG_PREFIX = 'prayer-'
const DHIKR_TAG_PREFIX = 'dhikr-'

interface ScheduleItem {
  tag: string
  title: string
  body: string
  timestamp: number
  url?: string
  prayerName?: string
}

function supportsNotificationTriggers(): boolean {
  return typeof Notification !== 'undefined' && 'showTrigger' in Notification.prototype
}

async function closePendingByPrefix(prefix: string, label: string) {
  try {
    const all = await self.registration.getNotifications(
      { includeTriggered: false } as GetNotificationOptions,
    )
    all
      .filter(n => n.tag && n.tag.startsWith(prefix))
      .forEach(n => n.close())
  } catch (err) {
    console.warn(`[SW] Failed to clear ${label}`, err)
  }
}

/**
 * Clear all currently scheduled/pending prayer notifications so we can
 * reschedule cleanly on each page load.
 */
function clearScheduledPrayerNotifications() {
  return closePendingByPrefix(NOTIFY_TAG_PREFIX, 'notifications')
}

/** Schedule a batch of prayer notifications. */
async function schedulePrayerNotifications(items: ScheduleItem[]) {
  await clearScheduledPrayerNotifications()

  const supportsTrigger = supportsNotificationTriggers()
  const now = Date.now()

  for (const item of items) {
    if (item.timestamp <= now) continue

    const options: SWNotificationOptions = {
      body: item.body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: item.tag,
      data: { url: item.url || '/', prayerName: item.prayerName },
    }

    if (supportsTrigger) {
      try {
        options.showTrigger = new TimestampTrigger(item.timestamp)
        await self.registration.showNotification(item.title, options)
      } catch (err) {
        console.warn('[SW] TimestampTrigger failed, notification not scheduled', err)
      }
    }
    // else: page-scope setTimeout fallback handles scheduling while tab is open
  }
}

// ============================================
// DHIKR REMINDERS (morning/evening nudges)
// ============================================

function clearScheduledDhikrReminders() {
  return closePendingByPrefix(DHIKR_TAG_PREFIX, 'dhikr reminders')
}

/**
 * Schedule dhikr reminders (the page sends the next N daily occurrences).
 */
async function scheduleDhikrReminders(items: ScheduleItem[]) {
  await clearScheduledDhikrReminders()

  if (!supportsNotificationTriggers()) return

  const now = Date.now()

  for (const item of items) {
    if (item.timestamp <= now) continue

    const options: SWNotificationOptions = {
      body: item.body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: item.tag,
      data: { url: item.url || '/dua', kind: 'dhikr' },
    }

    try {
      options.showTrigger = new TimestampTrigger(item.timestamp)
      await self.registration.showNotification(item.title, options)
    } catch (err) {
      console.warn('[SW] Dhikr TimestampTrigger failed', err)
    }
  }
}

// ============================================
// MESSAGES FROM THE PAGE
// ============================================

self.addEventListener('message', (event) => {
  const data = event.data
  if (!data || typeof data !== 'object') return

  switch (data.type) {
    case 'SKIP_WAITING':
      // Sent by workbox-window when the user accepts the update prompt.
      void self.skipWaiting()
      break
    case 'SCHEDULE_PRAYER_NOTIFICATIONS':
      event.waitUntil(schedulePrayerNotifications(Array.isArray(data.items) ? data.items : []))
      break
    case 'CLEAR_PRAYER_NOTIFICATIONS':
      event.waitUntil(clearScheduledPrayerNotifications())
      break
    case 'SCHEDULE_DHIKR_REMINDERS':
      event.waitUntil(scheduleDhikrReminders(Array.isArray(data.items) ? data.items : []))
      break
    case 'CLEAR_DHIKR_REMINDERS':
      event.waitUntil(clearScheduledDhikrReminders())
      break
    case 'SHOW_NOTIFICATION':
      // Direct show from page (used as fallback when Triggers API unavailable)
      event.waitUntil(
        self.registration.showNotification(data.title || 'MuslimApp', {
          body: data.body || '',
          icon: '/favicon.svg',
          badge: '/favicon.svg',
          tag: data.tag || 'muslimapp',
          data: { url: data.url || '/' },
        }),
      )
      break
  }
})

// ============================================
// WEB PUSH
// ============================================
// Payload: JSON { title, body, tag?, url? }

interface PushPayload {
  title?: string
  body?: string
  tag?: string
  url?: string
}

function parsePushPayload(event: PushEvent): PushPayload {
  if (!event.data) return {}
  try {
    const json = event.data.json()
    return json && typeof json === 'object' ? json as PushPayload : {}
  } catch {
    return { body: event.data.text() }
  }
}

self.addEventListener('push', (event) => {
  const payload = parsePushPayload(event)
  event.waitUntil(
    self.registration.showNotification(payload.title || 'MuslimApp', {
      body: payload.body || '',
      icon: '/icons/icon-192.png',
      badge: '/favicon.svg',
      tag: payload.tag || 'muslimapp',
      data: { url: payload.url || '/' },
    }),
  )
})

// The push service rotated/expired our subscription: subscribe again with the
// same VAPID key and let the server move the stored reminder settings over
// (POST /api/push/subscribe with `oldEndpoint`). The page also re-syncs on the
// next app start, so a failure here is not fatal.
interface PushSubscriptionChangeEventLike extends ExtendableEvent {
  oldSubscription?: PushSubscription | null
  newSubscription?: PushSubscription | null
}

self.addEventListener('pushsubscriptionchange', ((event: PushSubscriptionChangeEventLike) => {
  event.waitUntil((async () => {
    const old = event.oldSubscription ?? null
    let next = event.newSubscription ?? null
    if (!next) {
      const key = old?.options?.applicationServerKey
      if (!key) return
      next = await self.registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: key })
    }
    if (!old?.endpoint) return
    await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscription: next.toJSON(), oldEndpoint: old.endpoint }),
    })
  })().catch(err => console.warn('[SW] pushsubscriptionchange failed', err)))
}) as EventListener)

// ============================================
// NOTIFICATION CLICK
// ============================================

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const rawUrl: string = event.notification.data?.url || '/'
  const target = new URL(rawUrl, self.location.origin)
  // Never navigate to foreign origins from a notification.
  const url = target.origin === self.location.origin
    ? target.pathname + target.search + target.hash
    : '/'

  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })

    // 1. An app window already showing this URL → focus it.
    for (const client of windows) {
      if (client.url.includes(url) && 'focus' in client) {
        return client.focus()
      }
    }

    // 2. Any app window → navigate it there and focus.
    const existing = windows.find(c => 'focus' in c && 'navigate' in c)
    if (existing) {
      try {
        const navigated = await existing.navigate(url)
        return (navigated ?? existing).focus()
      } catch {
        /* navigate() fails for uncontrolled clients — open a new window instead */
      }
    }

    // 3. No window → open one.
    return self.clients.openWindow(url)
  })())
})
