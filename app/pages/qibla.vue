<script setup lang="ts">
/**
 * Qibla Compass — Shows direction to Mecca using Device Orientation API.
 * Falls back to static direction display when compass unavailable.
 */
const { t } = useI18n()
const { location } = useLocation()
const qibla = useQibla()

const compassStarted = ref(false)
const compassError = ref(false)

async function activateCompass() {
  const success = await qibla.startCompass()
  compassStarted.value = true
  compassError.value = !success
}

onMounted(() => {
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
  <div class="px-4 pt-6 max-w-lg mx-auto flex flex-col items-center min-h-[calc(100dvh-6rem)]">
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
      <!-- Compass -->
      <div class="relative w-72 h-72 my-6 animate-fade-in stagger-1">
        <!-- Outer ring -->
        <div class="absolute inset-0 rounded-full glass-strong">
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
