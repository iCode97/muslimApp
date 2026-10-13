/**
 * PWA composable.
 *
 * - Install prompt: captures `beforeinstallprompt` and exposes `canInstall` /
 *   `install()` (used by pages/more.vue).
 * - Service worker updates: thin wrapper around `$pwa` from @vite-pwa/nuxt
 *   (registerType 'prompt'), exposing `needRefresh`, `offlineReady` and
 *   `updateServiceWorker()` for components/pwa/UpdatePrompt.vue.
 *
 * Note: @vite-pwa/nuxt also ships an auto-imported `usePWA`; nuxt.config.ts
 * removes that entry so this composable is the one in scope.
 */

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

// Module scope (client only): the captured event must be shared between the
// usePWA() call that registers the listener (app.vue) and the one that
// triggers the prompt (more.vue).
let deferredPrompt: BeforeInstallPromptEvent | null = null
let listenersAttached = false

export function usePWA() {
  const canInstall = useState<boolean>('pwa-can-install', () => false)
  const isInstalled = useState<boolean>('pwa-is-installed', () => false)

  const nuxtApp = useNuxtApp()

  /** A new service worker is waiting — offer a reload. */
  const needRefresh = computed(() => !!nuxtApp.$pwa?.needRefresh)
  /** The app shell has been precached for the first time. */
  const offlineReady = computed(() => !!nuxtApp.$pwa?.offlineReady)

  function init() {
    if (import.meta.server || listenersAttached) return
    listenersAttached = true

    // Check if already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      isInstalled.value = true
      return
    }

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt = e as BeforeInstallPromptEvent
      canInstall.value = true
    })

    // Listen for successful install
    window.addEventListener('appinstalled', () => {
      isInstalled.value = true
      canInstall.value = false
      deferredPrompt = null
    })
  }

  async function install(): Promise<boolean> {
    if (!deferredPrompt) return false

    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      isInstalled.value = true
      canInstall.value = false
      deferredPrompt = null
      return true
    }

    return false
  }

  /**
   * Activate the waiting service worker and reload into the new version.
   * workbox-window reloads once the new worker takes control; the timeout is
   * a safety net in case the `controlling` event never arrives.
   */
  async function updateServiceWorker() {
    if (import.meta.server) return
    const pwa = nuxtApp.$pwa
    if (!pwa) {
      window.location.reload()
      return
    }
    setTimeout(() => window.location.reload(), 4000)
    await pwa.updateServiceWorker(true)
  }

  function dismissUpdate() {
    if (nuxtApp.$pwa) nuxtApp.$pwa.needRefresh = false
  }

  function dismissOfflineReady() {
    if (nuxtApp.$pwa) nuxtApp.$pwa.offlineReady = false
  }

  return {
    canInstall: readonly(canInstall),
    isInstalled: readonly(isInstalled),
    needRefresh,
    offlineReady,
    init,
    install,
    updateServiceWorker,
    dismissUpdate,
    dismissOfflineReady,
  }
}
