/**
 * Tasbih (prayer counter) composable.
 * Tracks dhikr counts with multiple modes and localStorage persistence.
 *
 * The first three dhikr (SubhanAllah, Alhamdulillah, Allahu Akbar) form
 * a linked sequence of 3×33 = 99. After each 33, the counter automatically
 * advances to the next dhikr. Completing all three counts as one round.
 */

interface TasbihMode {
  id: string
  i18nKey: string
  arabic: string
  target: number
  /** If true, this mode is part of the 3×33 tasbih sequence */
  sequence?: boolean
}

interface TasbihState {
  modeId: string
  count: number
  totalCount: number  // lifetime total
  rounds: number      // completed rounds (target reached)
}

const STORAGE_KEY = 'muslimapp-tasbih'

/** The three dhikr that form the tasbih sequence (3×33 = 99) */
const SEQUENCE_IDS = ['subhanallah', 'alhamdulillah', 'allahuakbar'] as const

const TASBIH_MODES: TasbihMode[] = [
  { id: 'subhanallah', i18nKey: 'tasbih.subhanallah', arabic: 'سُبْحَانَ ٱللَّٰهِ', target: 33, sequence: true },
  { id: 'alhamdulillah', i18nKey: 'tasbih.alhamdulillah', arabic: 'ٱلْحَمْدُ لِلَّٰهِ', target: 33, sequence: true },
  { id: 'allahuakbar', i18nKey: 'tasbih.allahuakbar', arabic: 'ٱللَّٰهُ أَكْبَرُ', target: 33, sequence: true },
  { id: 'lailaha', i18nKey: 'tasbih.lailaha', arabic: 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ', target: 100 },
  { id: 'astaghfirullah', i18nKey: 'tasbih.astaghfirullah', arabic: 'أَسْتَغْفِرُ ٱللَّٰهَ', target: 100 },
  { id: 'salawat', i18nKey: 'tasbih.salawat', arabic: 'ٱللَّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ', target: 100 },
  { id: 'free', i18nKey: 'tasbih.freeMode', arabic: '', target: 0 },
]

export function useTasbih() {
  const haptics = useHaptics()

  const state = useState<TasbihState>('tasbih-state', () => ({
    modeId: 'subhanallah',
    count: 0,
    totalCount: 0,
    rounds: 0,
  }))

  const currentMode = computed((): TasbihMode =>
    TASBIH_MODES.find(m => m.id === state.value.modeId) ?? TASBIH_MODES[0]!
  )

  /** Whether the current mode is part of the 3×33 sequence */
  const isSequenceMode = computed(() => !!currentMode.value.sequence)

  /** Current step index within the sequence (0, 1, 2) */
  const sequenceStep = computed(() => {
    const idx = SEQUENCE_IDS.indexOf(state.value.modeId as typeof SEQUENCE_IDS[number])
    return idx >= 0 ? idx : 0
  })

  const progress = computed(() => {
    const target = currentMode.value.target
    if (!target) return 0
    return Math.min((state.value.count / target) * 100, 100)
  })

  /** Overall sequence progress (0–100) across all 3 steps */
  const sequenceProgress = computed(() => {
    if (!isSequenceMode.value) return progress.value
    const completedSteps = sequenceStep.value
    const currentStepProgress = state.value.count / 33
    return ((completedSteps + currentStepProgress) / 3) * 100
  })

  const isStepComplete = computed(() => {
    const target = currentMode.value.target
    return target > 0 && state.value.count >= target
  })

  /** True when the full sequence (all 3×33) is complete */
  const isSequenceComplete = computed(() => {
    return isSequenceMode.value && sequenceStep.value === 2 && state.value.count >= 33
  })

  /** For non-sequence modes, same as isStepComplete */
  const isRoundComplete = computed(() => {
    if (isSequenceMode.value) return isSequenceComplete.value
    return isStepComplete.value
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
    if (isStepComplete.value) return

    state.value.count++
    state.value.totalCount++

    // In sequence mode: auto-advance after reaching 33
    let stepCompleted = false
    if (isSequenceMode.value && state.value.count >= 33) {
      const step = sequenceStep.value
      stepCompleted = true
      if (step < 2) {
        // Advance to next dhikr in sequence after a brief moment
        setTimeout(() => {
          state.value.modeId = SEQUENCE_IDS[step + 1]
          state.value.count = 0
          saveState()
        }, 600)
      } else {
        // Final step complete — round done
        state.value.rounds++
      }
    } else if (!isSequenceMode.value) {
      const target = currentMode.value.target
      if (target > 0 && state.value.count >= target) {
        state.value.rounds++
        stepCompleted = true
      }
    }

    saveState()

    // Haptic feedback — heavier pulse when a step completes.
    if (stepCompleted) {
      haptics.success()
    } else {
      haptics.medium()
    }
  }

  /** Reset current count (and go back to step 1 in sequence mode) */
  function resetCount() {
    if (isSequenceMode.value) {
      state.value.modeId = 'subhanallah'
    }
    state.value.count = 0
    saveState()
  }

  /** Start a new round in sequence mode (back to SubhanAllah) */
  function nextRound() {
    state.value.modeId = 'subhanallah'
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
    sequenceProgress,
    isSequenceMode,
    sequenceStep,
    isStepComplete,
    isRoundComplete,
    isSequenceComplete,
    modes: TASBIH_MODES,
    sequenceIds: SEQUENCE_IDS,
    loadState,
    increment,
    resetCount,
    nextRound,
    setMode,
    resetAll,
  }
}
