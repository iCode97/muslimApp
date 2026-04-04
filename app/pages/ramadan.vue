<script setup lang="ts">
/**
 * Ramadan Mode — Fasting tracker, Iftar/Suhoor countdown,
 * and Khatam (Quran completion) progress.
 */
const { t } = useI18n()
const ramadan = useRamadan()

// Load persisted state on mount
onMounted(() => {
  ramadan.loadState()
})

// Countdown timer
const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => { now.value = Date.now() }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const countdown = computed(() => {
  const target = ramadan.countdownTarget.value
  if (!target) return null
  const diff = target.timestamp - now.value
  if (diff <= 0) return null
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return { h, m, s }
})

const countdownLabel = computed(() => {
  if (ramadan.isFastingTime.value) return t('ramadan.untilIftar')
  return t('ramadan.untilSuhoor')
})

// Generate day grid (1-30)
const days = Array.from({ length: 30 }, (_, i) => i + 1)

// Display mode (kiosk/terminal view)
const displayMode = ref(false)

// Day summary for display mode
const daySummary = computed(() => {
  const day = ramadan.hijriDay.value
  if (!day) return null
  return {
    day,
    fasted: ramadan.fastedDaysCount.value,
    khatam: ramadan.state.value.khatamProgress,
  }
})
</script>

<template>
  <!-- Display Mode (Kiosk/Terminal) -->
  <div v-if="displayMode" class="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-8" @click="displayMode = false">
    <!-- Day info -->
    <p v-if="daySummary" class="text-sm text-themed-muted uppercase tracking-widest mb-2">
      {{ t('ramadan.title') }} · {{ t('ramadan.day') }} {{ daySummary.day }}/30
    </p>

    <!-- Countdown label -->
    <p class="text-lg text-themed-secondary uppercase tracking-wider mb-4">
      {{ countdownLabel }}
    </p>

    <!-- Large countdown -->
    <div v-if="countdown" class="flex items-center gap-6 mb-8">
      <div class="text-center">
        <span class="text-8xl md:text-9xl font-bold tabular-nums text-[var(--color-primary-light)]">{{ String(countdown.h).padStart(2, '0') }}</span>
        <p class="text-sm text-themed-faint mt-1">{{ t('calendar.hours') }}</p>
      </div>
      <span class="text-7xl md:text-8xl font-bold text-themed-faint">:</span>
      <div class="text-center">
        <span class="text-8xl md:text-9xl font-bold tabular-nums text-[var(--color-primary-light)]">{{ String(countdown.m).padStart(2, '0') }}</span>
        <p class="text-sm text-themed-faint mt-1">{{ t('calendar.minutes') }}</p>
      </div>
      <span class="text-7xl md:text-8xl font-bold text-themed-faint">:</span>
      <div class="text-center">
        <span class="text-8xl md:text-9xl font-bold tabular-nums text-[var(--color-primary-light)]">{{ String(countdown.s).padStart(2, '0') }}</span>
        <p class="text-sm text-themed-faint mt-1">{{ t('calendar.seconds') }}</p>
      </div>
    </div>
    <p v-else class="text-2xl text-themed-secondary mb-8">
      {{ t('ramadan.noTimesAvailable') }}
    </p>

    <!-- Iftar & Suhoor times -->
    <div v-if="ramadan.iftarTime.value || ramadan.suhoorEndTime.value" class="flex gap-12">
      <div v-if="ramadan.suhoorEndTime.value" class="text-center">
        <p class="text-xs text-themed-faint uppercase tracking-wider">{{ t('ramadan.suhoor') }}</p>
        <p class="text-2xl font-semibold text-themed-secondary mt-1">{{ ramadan.suhoorEndTime.value.time }}</p>
      </div>
      <div v-if="ramadan.iftarTime.value" class="text-center">
        <p class="text-xs text-themed-faint uppercase tracking-wider">{{ t('ramadan.iftar') }}</p>
        <p class="text-2xl font-semibold text-themed-secondary mt-1">{{ ramadan.iftarTime.value.time }}</p>
      </div>
    </div>

    <!-- Progress summary -->
    <div v-if="daySummary" class="flex gap-8 mt-8 text-sm text-themed-faint">
      <span>{{ t('ramadan.fastingTracker') }}: {{ daySummary.fasted }}/30</span>
      <span>{{ t('ramadan.khatamTracker') }}: {{ daySummary.khatam }}/30 {{ t('ramadan.juz') }}</span>
    </div>

    <p class="text-[10px] text-themed-faint mt-8">{{ t('ramadan.tapToExit') }}</p>
  </div>

  <div class="app-container pt-6 space-y-5">
    <!-- Header -->
    <header class="animate-fade-in">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold">
            {{ t('ramadan.title') }}
          </h1>
          <p class="text-sm text-themed-muted mt-1">
            {{ t('ramadan.subtitle') }}
          </p>
        </div>
        <button
          class="px-3 py-1.5 rounded-full text-xs font-medium glass-subtle text-themed-muted hover:text-themed transition-all"
          @click="displayMode = true"
        >
          🖥 {{ t('ramadan.displayMode') }}
        </button>
      </div>
    </header>

    <!-- Iftar / Suhoor Countdown -->
    <GlassCard variant="primary" class="animate-fade-in stagger-1">
      <div class="text-center space-y-3">
        <p class="text-xs text-themed-muted uppercase tracking-wider">
          {{ countdownLabel }}
        </p>
        <div v-if="countdown" class="flex justify-center gap-4">
          <div class="text-center">
            <span class="text-3xl font-bold tabular-nums text-[var(--color-primary-light)]">{{ String(countdown.h).padStart(2, '0') }}</span>
            <p class="text-[10px] text-themed-faint mt-0.5">{{ t('calendar.hours') }}</p>
          </div>
          <span class="text-3xl font-bold text-themed-faint">:</span>
          <div class="text-center">
            <span class="text-3xl font-bold tabular-nums text-[var(--color-primary-light)]">{{ String(countdown.m).padStart(2, '0') }}</span>
            <p class="text-[10px] text-themed-faint mt-0.5">{{ t('calendar.minutes') }}</p>
          </div>
          <span class="text-3xl font-bold text-themed-faint">:</span>
          <div class="text-center">
            <span class="text-3xl font-bold tabular-nums text-[var(--color-primary-light)]">{{ String(countdown.s).padStart(2, '0') }}</span>
            <p class="text-[10px] text-themed-faint mt-0.5">{{ t('calendar.seconds') }}</p>
          </div>
        </div>
        <p v-else class="text-sm text-themed-secondary">
          {{ t('ramadan.noTimesAvailable') }}
        </p>

        <!-- Iftar & Suhoor times -->
        <div v-if="ramadan.iftarTime.value || ramadan.suhoorEndTime.value" class="flex justify-center gap-6 pt-2 border-t border-[var(--glass-border)]">
          <div v-if="ramadan.suhoorEndTime.value" class="text-center">
            <p class="text-[10px] text-themed-faint">{{ t('ramadan.suhoor') }}</p>
            <p class="text-sm font-semibold">{{ ramadan.suhoorEndTime.value.time }}</p>
          </div>
          <div v-if="ramadan.iftarTime.value" class="text-center">
            <p class="text-[10px] text-themed-faint">{{ t('ramadan.iftar') }}</p>
            <p class="text-sm font-semibold">{{ ramadan.iftarTime.value.time }}</p>
          </div>
        </div>
      </div>
    </GlassCard>

    <!-- Fasting + Khatam: side-by-side on desktop -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <!-- Fasting Tracker -->
      <div class="space-y-3 animate-fade-in stagger-2">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
            {{ t('ramadan.fastingTracker') }}
          </h3>
          <span class="text-xs text-[var(--color-primary-light)] font-medium tabular-nums">
            {{ ramadan.fastedDaysCount.value }}/30 · {{ ramadan.fastingProgress.value }}%
          </span>
        </div>

        <!-- Progress bar -->
        <div class="w-full h-2 rounded-full glass-subtle overflow-hidden">
          <div
            class="h-full rounded-full bg-[var(--color-primary-light)] transition-all duration-500"
            :style="{ width: `${ramadan.fastingProgress.value}%` }"
          />
        </div>

        <!-- Day grid -->
        <GlassCard>
          <div class="grid grid-cols-6 gap-2">
            <button
              v-for="day in days"
              :key="day"
              :class="[
                'aspect-square rounded-xl text-xs font-medium transition-all duration-200 flex items-center justify-center',
                ramadan.isFasted(day)
                  ? 'bg-[var(--color-primary)] text-white shadow-sm'
                  : 'glass-subtle text-themed-secondary hover:text-themed',
                ramadan.hijriDay.value === day ? 'ring-2 ring-[var(--color-primary-light)] ring-offset-1 ring-offset-[var(--glass-bg)]' : ''
              ]"
              @click="ramadan.toggleFastingDay(day)"
            >
              {{ day }}
            </button>
          </div>
          <p class="text-[10px] text-themed-faint text-center mt-3">
            {{ t('ramadan.tapToMark') }}
          </p>
        </GlassCard>
      </div>

      <!-- Khatam Tracker -->
      <div class="space-y-3 animate-fade-in stagger-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
            {{ t('ramadan.khatamTracker') }}
          </h3>
          <span class="text-xs text-[var(--color-primary-light)] font-medium tabular-nums">
            {{ ramadan.state.value.khatamProgress }}/30 {{ t('ramadan.juz') }} · {{ ramadan.khatamProgress.value }}%
          </span>
        </div>

        <!-- Progress bar -->
        <div class="w-full h-2 rounded-full glass-subtle overflow-hidden">
          <div
            class="h-full rounded-full bg-[var(--color-gold)] transition-all duration-500"
            :style="{ width: `${ramadan.khatamProgress.value}%` }"
          />
        </div>

        <GlassCard>
          <div class="flex items-center justify-between">
            <button
              class="w-10 h-10 rounded-xl glass-subtle text-themed-secondary hover:text-themed flex items-center justify-center text-lg font-bold transition-all"
              :disabled="ramadan.state.value.khatamProgress <= 0"
              @click="ramadan.decrementKhatam()"
            >
              −
            </button>
            <div class="text-center">
              <span class="text-4xl font-bold text-[var(--color-gold)] tabular-nums">
                {{ ramadan.state.value.khatamProgress }}
              </span>
              <p class="text-[10px] text-themed-faint mt-0.5">{{ t('ramadan.juzCompleted') }}</p>
            </div>
            <button
              class="w-10 h-10 rounded-xl glass-subtle text-themed-secondary hover:text-themed flex items-center justify-center text-lg font-bold transition-all"
              :disabled="ramadan.state.value.khatamProgress >= 30"
              @click="ramadan.incrementKhatam()"
            >
              +
            </button>
          </div>
        </GlassCard>
      </div>
    </div>

    <!-- Reset -->
    <div class="text-center pb-6 animate-fade-in stagger-4">
      <button
        class="text-xs text-themed-faint hover:text-red-400 transition-colors"
        @click="ramadan.resetAll()"
      >
        {{ t('ramadan.resetAll') }}
      </button>
    </div>
  </div>
</template>
