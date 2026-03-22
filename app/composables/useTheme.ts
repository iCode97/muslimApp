/**
 * Theme composable — Dark/Light/System with localStorage persistence.
 * Applies theme via `data-theme` attribute on <html> and updates CSS custom properties.
 */

type ThemeMode = 'dark' | 'light' | 'system'

const STORAGE_KEY = 'muslimapp-theme'

export function useTheme() {
  const mode = useState<ThemeMode>('theme-mode', () => 'system')
  const resolved = useState<'dark' | 'light'>('theme-resolved', () => 'dark')

  /**
   * Initialize theme from localStorage + system preference
   */
  function init() {
    if (import.meta.server) return

    // Load saved preference
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null
    if (saved && ['dark', 'light', 'system'].includes(saved)) {
      mode.value = saved
    }

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => {
      if (mode.value === 'system') {
        applyTheme()
      }
    })

    applyTheme()
  }

  /**
   * Set theme mode and persist
   */
  function setTheme(newMode: ThemeMode) {
    mode.value = newMode
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, newMode)
    }
    applyTheme()
  }

  /**
   * Resolve and apply the current theme
   */
  function applyTheme() {
    if (import.meta.server) return

    let effectiveTheme: 'dark' | 'light'

    if (mode.value === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    } else {
      effectiveTheme = mode.value
    }

    resolved.value = effectiveTheme
    document.documentElement.setAttribute('data-theme', effectiveTheme)
  }

  return {
    mode: readonly(mode),
    resolved: readonly(resolved),
    init,
    setTheme,
  }
}
