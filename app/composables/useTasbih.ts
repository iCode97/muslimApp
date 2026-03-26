/**
 * Tasbih (prayer counter) composable.
 * Tracks dhikr counts with multiple modes and localStorage persistence.
 */

interface TasbihMode {
  id: string
  i18nKey: string
  arabic: string
  target: number
}

interface TasbihState {
  modeId: string
  count: number
  totalCount: number  // lifetime total
  rounds: number      // completed rounds (target reached)
}

const STORAGE_KEY = 'muslimapp-tasbih'

const TASBIH_MODES: TasbihMode[] = [
  { id: 'subhanallah', i18nKey: 'tasbih.subhanallah', arabic: 'سُبْحَانَ ٱللَّٰهِ', target: 33 },
  { id: 'alhamdulillah', i18nKey: 'tasbih.alhamdulillah', arabic: 'ٱلْحَمْدُ لِلَّٰهِ', target: 33 },
  { id: 'allahuakbar', i18nKey: 'tasbih.allahuakbar', arabic: 'ٱللَّٰهُ أَكْبَرُ', target: 33 },
  { id: 'lailaha', i18nKey: 'tasbih.lailaha', arabic: 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ', target: 100 },
  { id: 'astaghfirullah', i18nKey: 'tasbih.astaghfirullah', arabic: 'أَسْتَغْفِرُ ٱللَّٰهَ', target: 100 },
  { id: 'salawat', i18nKey: 'tasbih.salawat', arabic: 'ٱللَّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ', target: 100 },
  { id: 'free', i18nKey: 'tasbih.freeMode', arabic: '', target: 0 },
]

export function useTasbih() {
  const state = useState<TasbihState>('tasbih-state', () => ({
    modeId: 'subhanallah',
    count: 0,
    totalCount: 0,
    rounds: 0,
  }))

  const currentMode = computed((): TasbihMode =>
    TASBIH_MODES.find(m => m.id === state.value.modeId) ?? TASBIH_MODES[0]!
  )

  const progress = computed(() => {
    const target = currentMode.value.target
    if (!target) return 0
    return Math.min((state.value.count / target) * 100, 100)
  })

  const isRoundComplete = computed(() => {
    const target = currentMode.value.target
    return target > 0 && state.value.count >= target
  })

  function loadState() {
    if (import.meta.server) return
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        state.value = { ...state.value, ...parsed }
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }

  function saveState() {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.value))
    }
  }

  function increment() {
    state.value.count++
    state.value.totalCount++

    // Check if target reached
    const target = currentMode.value.target
    if (target > 0 && state.value.count >= target) {
      state.value.rounds++
    }

    saveState()

    // Haptic feedback if available
    if (import.meta.client && navigator.vibrate) {
      navigator.vibrate(15)
    }
  }

  function resetCount() {
    state.value.count = 0
    saveState()
  }

  function setMode(modeId: string) {
    state.value.modeId = modeId
    state.value.count = 0
    saveState()
  }

  function resetAll() {
    state.value = {
      modeId: 'subhanallah',
      count: 0,
      totalCount: 0,
      rounds: 0,
    }
    saveState()
  }

  return {
    state: readonly(state),
    currentMode,
    progress,
    isRoundComplete,
    modes: TASBIH_MODES,
    loadState,
    increment,
    resetCount,
    setMode,
    resetAll,
  }
}
