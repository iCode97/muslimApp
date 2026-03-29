<script setup lang="ts">
/**
 * Detailed Prayer Times page.
 * Shows all prayers for today with countdown and location management.
 */

const { t } = useI18n()
const { location, prayerTimes, hijriDisplay, init, startRefresh, stopRefresh } = usePrayerInit()
const { setCity } = useLocation()

onMounted(async () => {
  await init()

  // Fallback to Berlin if no location detected
  if (!location.value) {
    await setCity('Berlin', 'Deutschland')
  }

  startRefresh()
})

onUnmounted(() => stopRefresh())
</script>

<template>
  <div class="app-container pt-6 space-y-5">
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold">
        {{ t('nav.prayer') }}
      </h1>
      <div v-if="hijriDisplay" class="text-sm text-[var(--color-gold)]">
        ☪ {{ hijriDisplay }}
      </div>
    </header>

    <LocationSelector />

    <PrayerCountdown />

    <PrayerTimesCard />

    <GlassCard variant="subtle" padding="sm">
      <div class="px-3 py-2 text-xs text-white/30 flex justify-between">
        <span>{{ t('prayer.method') }}: {{ t('prayer.diyanet') }}</span>
        <span>Method 13 (Aladhan)</span>
      </div>
    </GlassCard>
  </div>
</template>
