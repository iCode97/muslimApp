/**
 * PWA install prompt composable.
 * Captures the beforeinstallprompt event and provides install functionality.
 */

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function usePWA() {
  const canInstall = useState<boolean>('pwa-can-install', () => false)
  const isInstalled = useState<boolean>('pwa-is-installed', () => false)

  let deferredPrompt: BeforeInstallPromptEvent | null = null

  function init() {
    if (import.meta.server) return

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

  return {
    canInstall: readonly(canInstall),
    isInstalled: readonly(isInstalled),
    init,
    install,
  }
}
