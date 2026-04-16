/**
 * Haptic feedback composable.
 *
 * Wraps the Web Vibration API with semantic intents and a global user
 * preference so haptics can be muted from Settings. Patterns are deliberately
 * short — long vibrations feel unnatural on the web and drain battery.
 */

const HAPTICS_KEY = 'muslimapp-haptics'

export function useHaptics() {
  const enabled = useState<boolean>('haptics-enabled', () => {
    if (import.meta.client) {
      const saved = localStorage.getItem(HAPTICS_KEY)
      return saved === null ? true : saved === '1'
    }
    return true
  })

  const isSupported = computed(() =>
    import.meta.client && typeof navigator !== 'undefined' && 'vibrate' in navigator,
  )

  function setEnabled(value: boolean) {
    enabled.value = value
    if (import.meta.client) {
      localStorage.setItem(HAPTICS_KEY, value ? '1' : '0')
    }
  }

  function fire(pattern: number | number[]) {
    if (!enabled.value) return
    if (!isSupported.value) return
    try {
      navigator.vibrate(pattern)
    } catch {
      // Some browsers throw on rapid repeated vibrations — ignore.
    }
  }

  const light = () => fire(8)
  const medium = () => fire(15)
  const heavy = () => fire(30)
  const tap = () => fire(6)
  const success = () => fire([10, 40, 10])
  const warn = () => fire([20, 60, 20])

  return {
    enabled,
    isSupported,
    setEnabled,
    light,
    medium,
    heavy,
    tap,
    success,
    warn,
  }
}
