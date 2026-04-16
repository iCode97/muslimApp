/**
 * Onboarding state composable.
 * Tracks whether the user has completed the first-run wizard.
 */

const STORAGE_KEY = 'muslimapp-onboarded'

export function useOnboarding() {
  const isOnboarded = useState<boolean>('onboarded', () => true) // default true for SSR, corrected on client mount
  const isOpen = useState<boolean>('onboarding-open', () => false)
  const step = useState<number>('onboarding-step', () => 0)

  /** Must run on client mount in the layout to decide whether to show the wizard. */
  function checkFirstRun() {
    if (import.meta.server) return
    const flag = localStorage.getItem(STORAGE_KEY)
    if (!flag) {
      isOnboarded.value = false
      isOpen.value = true
      step.value = 0
    } else {
      isOnboarded.value = true
    }
  }

  function complete() {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, at: Date.now() }))
    }
    isOnboarded.value = true
    isOpen.value = false
    step.value = 0
  }

  function openManually() {
    step.value = 0
    isOpen.value = true
  }

  function nextStep(max: number) {
    if (step.value < max) step.value++
  }

  function prevStep() {
    if (step.value > 0) step.value--
  }

  return {
    isOnboarded,
    isOpen,
    step,
    checkFirstRun,
    complete,
    openManually,
    nextStep,
    prevStep,
  }
}
