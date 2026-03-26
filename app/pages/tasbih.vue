<script setup lang="ts">
/**
 * Tasbih — Prayer counter with multiple dhikr modes.
 * Large tap target, haptic feedback, progress ring.
 */
const { t } = useI18n()
const tasbih = useTasbih()

onMounted(() => {
  tasbih.loadState()
})

const showModeSelector = ref(false)

// SVG circle progress
const circumference = 2 * Math.PI * 120
const strokeOffset = computed(() => {
  return circumference - (tasbih.progress.value / 100) * circumference
})

// Pulse animation on tap
const isPulsing = ref(false)
function handleTap() {
  tasbih.increment()
  isPulsing.value = true
  setTimeout(() => { isPulsing.value = false }, 150)
}

// Next round after completion
function nextRound() {
  tasbih.resetCount()
}
</script>

<template>
  <div class="px-4 pt-6 max-w-lg mx-auto flex flex-col items-center min-h-[calc(100dvh-6rem)]">
    <!-- Header -->
    <header class="w-full mb-6 animate-fade-in">
      <h1 class="text-2xl font-semibold text-center">
        {{ t('tasbih.title') }}
      </h1>
      <p class="text-sm text-themed-muted text-center mt-1">
        {{ t('tasbih.subtitle') }}
      </p>
    </header>

    <!-- Mode selector button -->
    <button
      class="glass-subtle px-4 py-2 rounded-full text-sm text-themed-secondary mb-6 animate-fade-in stagger-1"
      @click="showModeSelector = !showModeSelector"
    >
      {{ t(tasbih.currentMode.value.i18nKey) }}
      <span class="ml-1 text-themed-faint">{{ showModeSelector ? '▲' : '▼' }}</span>
    </button>

    <!-- Mode selector dropdown -->
    <Transition name="slide">
      <div v-if="showModeSelector" class="w-full mb-6">
        <GlassCard>
          <div class="space-y-1">
            <button
              v-for="mode in tasbih.modes"
              :key="mode.id"
              :class="[
                'w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200',
                tasbih.state.value.modeId === mode.id
                  ? 'bg-[var(--color-primary)] bg-opacity-20 text-[var(--color-primary-light)]'
                  : 'hover:bg-[var(--glass-bg-subtle)] text-themed-secondary'
              ]"
              @click="tasbih.setMode(mode.id); showModeSelector = false"
            >
              <span class="text-sm font-medium">{{ t(mode.i18nKey) }}</span>
              <span v-if="mode.arabic" class="font-arabic text-base text-themed-muted">{{ mode.arabic }}</span>
              <span v-if="mode.target" class="text-xs text-themed-faint ml-2">{{ mode.target }}×</span>
            </button>
          </div>
        </GlassCard>
      </div>
    </Transition>

    <!-- Arabic text display -->
    <div v-if="tasbih.currentMode.value.arabic" class="font-arabic text-2xl text-[var(--color-gold)] mb-4 animate-fade-in stagger-2 text-center leading-relaxed">
      {{ tasbih.currentMode.value.arabic }}
    </div>

    <!-- Counter ring + tap target -->
    <div class="relative flex items-center justify-center my-4 animate-fade-in stagger-3">
      <!-- Progress ring -->
      <svg class="absolute w-64 h-64 -rotate-90" viewBox="0 0 260 260">
        <!-- Background ring -->
        <circle
          cx="130" cy="130" r="120"
          fill="none"
          stroke="var(--glass-border)"
          stroke-width="4"
        />
        <!-- Progress ring -->
        <circle
          cx="130" cy="130" r="120"
          fill="none"
          stroke="var(--color-primary-light)"
          stroke-width="4"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeOffset"
          class="transition-all duration-200"
        />
      </svg>

      <!-- Tap button -->
      <button
        :class="[
          'relative w-56 h-56 rounded-full glass-strong flex flex-col items-center justify-center',
          'active:scale-95 transition-transform duration-100 select-none',
          isPulsing ? 'scale-95' : '',
          tasbih.isRoundComplete.value ? 'ring-2 ring-[var(--color-primary-light)]' : ''
        ]"
        @click="handleTap"
      >
        <span class="text-6xl font-light tabular-nums">
          {{ tasbih.state.value.count }}
        </span>
        <span v-if="tasbih.currentMode.value.target" class="text-sm text-themed-muted mt-1">
          / {{ tasbih.currentMode.value.target }}
        </span>
      </button>
    </div>

    <!-- Round complete notification -->
    <Transition name="slide">
      <div
        v-if="tasbih.isRoundComplete.value"
        class="mt-4 animate-fade-in"
      >
        <button
          class="glass-primary px-6 py-3 rounded-xl text-sm font-medium text-[var(--color-primary-light)]"
          @click="nextRound"
        >
          ✓ {{ t('tasbih.roundComplete') }} — {{ t('tasbih.nextRound') }}
        </button>
      </div>
    </Transition>

    <!-- Stats row -->
    <div class="flex gap-4 mt-6 animate-fade-in stagger-4">
      <div class="glass-subtle px-4 py-3 rounded-xl text-center flex-1">
        <p class="text-xs text-themed-muted">{{ t('tasbih.rounds') }}</p>
        <p class="text-lg font-semibold tabular-nums">{{ tasbih.state.value.rounds }}</p>
      </div>
      <div class="glass-subtle px-4 py-3 rounded-xl text-center flex-1">
        <p class="text-xs text-themed-muted">{{ t('tasbih.total') }}</p>
        <p class="text-lg font-semibold tabular-nums">{{ tasbih.state.value.totalCount.toLocaleString() }}</p>
      </div>
    </div>

    <!-- Reset button -->
    <button
      class="mt-4 text-xs text-themed-faint hover:text-[var(--color-danger)] transition-colors"
      @click="tasbih.resetCount()"
    >
      {{ t('tasbih.reset') }}
    </button>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
