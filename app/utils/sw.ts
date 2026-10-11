/**
 * Resolve the active service worker registration, or null.
 *
 * `navigator.serviceWorker.ready` never settles when no worker is registered
 * (e.g. `nuxi dev`, or a failed registration), which would hang callers and
 * skip their page-level fallbacks — so race it against a timeout.
 */
export async function getSwRegistration(timeoutMs = 3000): Promise<ServiceWorkerRegistration | null> {
  if (import.meta.server || !('serviceWorker' in navigator)) return null
  const timeout = new Promise<null>(resolve => setTimeout(() => resolve(null), timeoutMs))
  return Promise.race([navigator.serviceWorker.ready, timeout])
}
