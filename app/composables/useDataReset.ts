/**
 * "Delete all local data" — wipes everything MuslimApp keeps on this device:
 *   - push subscription (also deletes the stored record on the server)
 *   - all `muslimapp-*` localStorage / sessionStorage keys
 *   - the language cookie
 *   - the offline Quran IndexedDB
 *   - app-owned Cache Storage entries (API responses, Quran audio, visited pages)
 * and then reloads the app. Precache entries of the service worker (the app's
 * own code) are kept; they contain no personal data.
 */
const APP_KEY_PREFIX = 'muslimapp-'
const OFFLINE_DB_NAME = 'muslimapp-quran-offline'
const LOCALE_COOKIE = 'muslimapp-locale'

function clearStorageArea(storage: Storage) {
  const keys: string[] = []
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i)
    if (key && key.startsWith(APP_KEY_PREFIX)) keys.push(key)
  }
  keys.forEach(key => storage.removeItem(key))
}

function deleteIndexedDb(name: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(name)
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
    // Another tab holds the DB open: it is deleted as soon as that tab closes it.
    request.onblocked = () => resolve()
  })
}

export function useDataReset() {
  const notifications = useNotifications()
  const working = ref(false)
  const failed = ref(false)

  /** Runs every step even if one fails; reloads only when all succeeded (else `failed` is set). */
  async function deleteAllLocalData(): Promise<void> {
    if (import.meta.server || working.value) return
    working.value = true
    failed.value = false

    const step = async (fn: () => void | Promise<void>) => {
      try {
        await fn()
      }
      catch (err) {
        failed.value = true
        console.warn('[data-reset] step failed', err)
      }
    }

    await step(() => notifications.unsubscribePush())
    await step(() => clearStorageArea(localStorage))
    await step(() => clearStorageArea(sessionStorage))
    await step(() => {
      document.cookie = `${LOCALE_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax`
    })
    await step(() => deleteIndexedDb(OFFLINE_DB_NAME))
    await step(async () => {
      if (!('caches' in window)) return
      const names = await caches.keys()
      // App-owned runtime caches (muslimapp-*); Workbox precache stays.
      await Promise.all(names.filter(n => n.startsWith(APP_KEY_PREFIX)).map(n => caches.delete(n)))
    })

    if (failed.value) {
      // Keep the page open so the error hint is visible; user can retry or clear site data.
      working.value = false
      return
    }
    window.location.replace('/')
  }

  return { working: readonly(working), failed: readonly(failed), deleteAllLocalData }
}
