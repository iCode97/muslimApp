<script setup lang="ts">
/**
 * Qibla Compass — Shows direction to Mecca using Device Orientation API.
 * Falls back to static direction display when compass unavailable.
 */
const { t } = useI18n()
const { location } = useLocation()
const qibla = useQibla()
const haptics = useHaptics()

const compassStarted = ref(false)
const compassError = ref(false)
const showCalibrationHint = ref(true)
const wasAligned = ref(false)

async function activateCompass() {
  const success = await qibla.startCompass()
  compassStarted.value = true
  compassError.value = !success
  if (success) haptics.light()
}

/** Alignment tolerance: when the needle is within 5° of Qibla */
const alignmentTolerance = 5
const isAligned = computed(() => {
  if (!qibla.hasCompass.value) return false
  const delta = Math.abs(qibla.needleRotation.value)
  return delta <= alignmentTolerance || delta >= 360 - alignmentTolerance
})

/** Rough accuracy indicator (0–100) based on how far off we are from Qibla */
const alignmentPercent = computed(() => {
  if (!qibla.hasCompass.value) return 0
  const delta = Math.min(qibla.needleRotation.value, 360 - qibla.needleRotation.value)
  // 0° => 100%, 180° => 0%
  return Math.max(0, Math.round(100 - (delta / 180) * 100))
})

// Haptic + visual feedback when user hits Qibla alignment
watch(isAligned, (aligned) => {
  if (aligned && !wasAligned.value) {
    haptics.success()
    wasAligned.value = true
  } else if (!aligned) {
    wasAligned.value = false
  }
})

function dismissCalibrationHint() {
  showCalibrationHint.value = false
  if (import.meta.client) {
    localStorage.setItem('muslimapp-qibla-hint-dismissed', '1')
  }
}

onMounted(() => {
  if (import.meta.client) {
    if (localStorage.getItem('muslimapp-qibla-hint-dismissed') === '1') {
      showCalibrationHint.value = false
    }
  }
  // Auto-start if location available
  if (location.value) {
    activateCompass()
  }
})

onUnmounted(() => {
  qibla.stopCompass()
})

// Watch for location becoming available
watch(location, (loc) => {
  if (loc && !compassStarted.value) {
    activateCompass()
  }
})
</script>

<template>
  <div class="app-container pt-6 flex flex-col items-center min-h-[calc(100dvh-6rem)]">
    <!-- Header -->
    <header class="w-full mb-6 animate-fade-in">
      <h1 class="text-2xl font-semibold text-center">
        {{ t('qibla.title') }}
      </h1>
      <p class="text-sm text-themed-muted text-center mt-1">
        {{ t('qibla.subtitle') }}
      </p>
    </header>

    <!-- No location -->
    <GlassCard v-if="!location" class="w-full animate-fade-in stagger-1">
      <div class="text-center py-6">
        <span class="text-4xl mb-3 block">📍</span>
        <p class="text-sm text-themed-secondary">{{ t('qibla.needLocation') }}</p>
        <NuxtLink to="/" class="mt-3 inline-block text-sm text-[var(--color-primary-light)]">
          {{ t('qibla.goToDashboard') }}
        </NuxtLink>
      </div>
    </GlassCard>

    <template v-else>
      <!-- Calibration hint (dismissible) -->
      <Transition name="expand">
        <GlassCard
          v-if="showCalibrationHint && qibla.hasCompass.value"
          variant="subtle"
          class="w-full animate-fade-in stagger-1 mb-4"
        >
          <div class="flex items-start gap-3">
            <span class="text-xl shrink-0">🧭</span>
            <div class="flex-1 min-w-0 space-y-1">
              <p class="text-sm font-medium text-themed">
                {{ t('qibla.calibrationTitle') }}
              </p>
              <p class="text-xs text-themed-muted leading-relaxed">
                {{ t('qibla.calibrationHint') }}
              </p>
            </div>
            <button
              class="text-themed-faint hover:text-themed-secondary transition-colors shrink-0"
              :aria-label="t('qibla.dismiss')"
              @click="dismissCalibrationHint"
            >
              <AppIcon name="close" :size="16" />
            </button>
          </div>
        </GlassCard>
      </Transition>

      <!-- Compass -->
      <div class="relative w-72 h-72 my-6 animate-fade-in stagger-1">
        <!-- Aligned glow halo -->
        <div
          :class="[
            'absolute inset-[-8px] rounded-full pointer-events-none transition-opacity duration-300',
            isAligned ? 'opacity-100' : 'opacity-0'
          ]"
          style="background: radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%); filter: blur(12px);"
        />

        <!-- Outer ring -->
        <div
          :class="[
            'absolute inset-0 rounded-full glass-strong transition-all duration-300',
            isAligned ? 'ring-2 ring-[var(--color-primary-light)]' : ''
          ]"
        >
          <!-- Cardinal directions -->
          <div class="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 300 300" class="w-full h-full" :style="{ transform: `rotate(${-qibla.compassHeading.value}deg)`, transition: 'transform 0.3s ease-out' }">
              <!-- Compass circle -->
              <circle cx="150" cy="150" r="140" fill="none" stroke="var(--glass-border)" stroke-width="1" />

              <!-- Degree markers -->
              <g v-for="i in 72" :key="i">
                <line
                  :x1="150"
                  :y1="15"
                  :x2="150"
                  :y2="i % 6 === 0 ? 30 : 22"
                  :stroke="i % 6 === 0 ? 'var(--color-text-secondary)' : 'var(--glass-border)'"
                  :stroke-width="i % 6 === 0 ? 1.5 : 0.5"
                  :transform="`rotate(${i * 5} 150 150)`"
                />
              </g>

              <!-- N/E/S/W labels -->
              <text x="150" y="48" text-anchor="middle" fill="var(--color-danger)" font-size="16" font-weight="600">N</text>
              <text x="262" y="155" text-anchor="middle" fill="var(--color-text-secondary)" font-size="13" font-weight="500">E</text>
              <text x="150" y="268" text-anchor="middle" fill="var(--color-text-secondary)" font-size="13" font-weight="500">S</text>
              <text x="38" y="155" text-anchor="middle" fill="var(--color-text-secondary)" font-size="13" font-weight="500">W</text>

              <!-- Qibla indicator (Kaaba icon direction) -->
              <g :transform="`rotate(${qibla.qiblaAngle.value} 150 150)`">
                <line x1="150" y1="55" x2="150" y2="80" stroke="var(--color-primary-light)" stroke-width="3" stroke-linecap="round" />
                <text x="150" y="50" text-anchor="middle" font-size="20">🕋</text>
              </g>
            </svg>
          </div>

          <!-- Center dot -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-3 h-3 rounded-full bg-[var(--color-primary-light)]" />
          </div>
        </div>
      </div>

      <!-- Qibla info -->
      <div class="w-full space-y-3 animate-fade-in stagger-2">
        <!-- Alignment badge -->
        <Transition name="expand">
          <GlassCard v-if="isAligned" class="w-full border border-[var(--color-primary-light)]/40">
            <div class="flex items-center justify-center gap-2 py-1">
              <span class="text-xl">🕋</span>
              <span class="text-sm font-semibold text-[var(--color-primary-light)]">
                {{ t('qibla.aligned') }}
              </span>
            </div>
          </GlassCard>
        </Transition>

        <!-- Accuracy bar (only when compass active) -->
        <GlassCard v-if="qibla.hasCompass.value" variant="subtle">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-xs">
              <span class="text-themed-muted">{{ t('qibla.accuracy') }}</span>
              <span class="text-themed-secondary tabular-nums font-medium">{{ alignmentPercent }}%</span>
            </div>
            <div class="h-1.5 rounded-full bg-[var(--glass-border)] overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-300"
                :style="{
                  width: `${alignmentPercent}%`,
                  background: isAligned
                    ? 'var(--color-primary-light)'
                    : 'linear-gradient(90deg, var(--color-danger) 0%, var(--color-gold) 50%, var(--color-primary-light) 100%)'
                }"
              />
            </div>
          </div>
        </GlassCard>

        <!-- Direction angle -->
        <GlassCard variant="subtle">
          <div class="flex items-center justify-between">
            <span class="text-sm text-themed-muted">{{ t('qibla.direction') }}</span>
            <span class="text-lg font-semibold text-[var(--color-primary-light)] tabular-nums">
              {{ qibla.qiblaAngle.value.toFixed(1) }}°
            </span>
          </div>
        </GlassCard>

        <!-- Distance -->
        <GlassCard variant="subtle">
          <div class="flex items-center justify-between">
            <span class="text-sm text-themed-muted">{{ t('qibla.distance') }}</span>
            <span class="text-lg font-semibold tabular-nums">
              {{ qibla.distanceToKaaba.value.toLocaleString() }} km
            </span>
          </div>
        </GlassCard>

        <!-- Compass status -->
        <div v-if="!qibla.hasCompass.value" class="text-center">
          <p v-if="compassError" class="text-xs text-themed-faint">
            {{ t('qibla.noCompass') }}
          </p>
          <button
            v-else
            class="text-sm text-[var(--color-primary-light)] glass-subtle px-4 py-2 rounded-xl"
            @click="activateCompass"
          >
            {{ t('qibla.activateCompass') }}
          </button>
        </div>
        <p v-else class="text-center text-xs text-themed-faint">
          {{ t('qibla.compassActive') }}
        </p>
      </div>
    </template>
  </div>
</template>
