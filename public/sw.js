/**
 * MuslimApp Service Worker
 * Provides offline caching, background sync, and scheduled prayer notifications.
 */

const CACHE_NAME = 'muslimapp-v3'
const STATIC_ASSETS = [
  '/',
  '/prayer',
  '/quran',
  '/calendar',
  '/settings',
  '/favicon.svg',
]

// External API domains we cache (quran.com is still called directly from client)
const API_HOSTS = [
  'api.quran.com',
]

// Same-origin API path prefixes we cache (Nitro proxy routes — Aladhan)
const API_PATH_PREFIXES = [
  '/api/aladhan/',
]

// Install: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Some routes may not be available at install time
        console.log('[SW] Some static assets not available, skipping')
      })
    })
  )
  self.skipWaiting()
})

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    })
  )
  self.clients.claim()
})

// Fetch: network-first for API, cache-first for static
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // API requests: network-first with cache fallback
  const isExternalApi = API_HOSTS.some((host) => url.hostname === host)
  const isProxyApi = url.origin === self.location.origin
    && API_PATH_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))
  if (isExternalApi || isProxyApi) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful API responses
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone)
            })
          }
          return response
        })
        .catch(() => {
          // Fallback to cache when offline
          return caches.match(event.request)
        })
    )
    return
  }

  // Navigation & static: cache-first with network fallback
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone)
            })
          }
          return response
        })
      }).catch(() => caches.match('/'))
    )
    return
  }

  // Other assets (CSS, JS, fonts): stale-while-revalidate
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request).then((response) => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone)
          })
        }
        return response
      }).catch(() => cached)

      return cached || fetchPromise
    })
  )
})

// ============================================
// SCHEDULED PRAYER NOTIFICATIONS
// ============================================
// Uses the Notification Triggers API (TimestampTrigger) when available —
// this lets notifications fire reliably even if the SW is terminated.
// Falls back to showNotification-on-message for the page to trigger while open.

const NOTIFY_TAG_PREFIX = 'prayer-'
const DHIKR_TAG_PREFIX = 'dhikr-'

/**
 * Clear all currently scheduled/pending prayer notifications so we can
 * reschedule cleanly on each page load.
 */
async function clearScheduledPrayerNotifications() {
  try {
    const all = await self.registration.getNotifications({ includeTriggered: false })
    all
      .filter((n) => n.tag && n.tag.startsWith(NOTIFY_TAG_PREFIX))
      .forEach((n) => n.close())
  } catch (err) {
    console.warn('[SW] Failed to clear notifications', err)
  }
}

/**
 * Schedule a batch of prayer notifications.
 * @param {Array<{tag: string, title: string, body: string, timestamp: number, url?: string}>} items
 */
async function schedulePrayerNotifications(items) {
  await clearScheduledPrayerNotifications()

  const supportsTrigger = 'showTrigger' in Notification.prototype
  const now = Date.now()

  for (const item of items) {
    if (item.timestamp <= now) continue

    const options = {
      body: item.body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: item.tag,
      data: { url: item.url || '/', prayerName: item.prayerName },
    }

    if (supportsTrigger) {
      try {
        // eslint-disable-next-line no-undef
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

async function clearScheduledDhikrReminders() {
  try {
    const all = await self.registration.getNotifications({ includeTriggered: false })
    all
      .filter((n) => n.tag && n.tag.startsWith(DHIKR_TAG_PREFIX))
      .forEach((n) => n.close())
  } catch (err) {
    console.warn('[SW] Failed to clear dhikr reminders', err)
  }
}

/**
 * Schedule dhikr reminders. Items include timestamp + repeat intervals.
 * We schedule the next N occurrences (one per day) up to a horizon.
 * @param {Array<{tag: string, title: string, body: string, timestamp: number, url?: string}>} items
 */
async function scheduleDhikrReminders(items) {
  await clearScheduledDhikrReminders()

  const supportsTrigger = 'showTrigger' in Notification.prototype
  if (!supportsTrigger) return

  const now = Date.now()

  for (const item of items) {
    if (item.timestamp <= now) continue

    const options = {
      body: item.body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: item.tag,
      data: { url: item.url || '/dua', kind: 'dhikr' },
    }

    try {
      // eslint-disable-next-line no-undef
      options.showTrigger = new TimestampTrigger(item.timestamp)
      await self.registration.showNotification(item.title, options)
    } catch (err) {
      console.warn('[SW] Dhikr TimestampTrigger failed', err)
    }
  }
}

// Handle messages from the page
self.addEventListener('message', (event) => {
  const data = event.data
  if (!data || typeof data !== 'object') return

  if (data.type === 'SCHEDULE_PRAYER_NOTIFICATIONS') {
    event.waitUntil(schedulePrayerNotifications(data.items || []))
  } else if (data.type === 'CLEAR_PRAYER_NOTIFICATIONS') {
    event.waitUntil(clearScheduledPrayerNotifications())
  } else if (data.type === 'SCHEDULE_DHIKR_REMINDERS') {
    event.waitUntil(scheduleDhikrReminders(data.items || []))
  } else if (data.type === 'CLEAR_DHIKR_REMINDERS') {
    event.waitUntil(clearScheduledDhikrReminders())
  } else if (data.type === 'SHOW_NOTIFICATION') {
    // Direct show from page (used as fallback when Triggers API unavailable)
    event.waitUntil(
      self.registration.showNotification(data.title || 'MuslimApp', {
        body: data.body || '',
        icon: '/favicon.svg',
        badge: '/favicon.svg',
        tag: data.tag || 'muslimapp',
        data: { url: data.url || '/' },
      })
    )
  }
})

// Push notification handler (for future server-push support)
self.addEventListener('push', (event) => {
  if (!event.data) return

  const data = event.data.json()
  event.waitUntil(
    self.registration.showNotification(data.title || 'MuslimApp', {
      body: data.body || '',
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: data.tag || 'muslimapp',
      data: data.url ? { url: data.url } : undefined,
    })
  )
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url || '/'

  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      // Focus existing window or open new
      for (const client of clients) {
        if (client.url.includes(url) && 'focus' in client) {
          return client.focus()
        }
      }
      return self.clients.openWindow(url)
    })
  )
})
