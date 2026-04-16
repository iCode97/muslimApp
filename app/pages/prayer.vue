<script setup lang="ts">
/**
 * Detailed Prayer Times page.
 * Shows all prayers for today with countdown and location management.
 */

const { t } = useI18n()
const { location, prayerTimes, hijriDisplay, init, startRefresh, stopRefresh } = usePrayerInit()

onMounted(async () => {
  await init()
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

    <LocationSetupCTA />
    <LocationSelector v-if="location" />

    <template v-if="location">
      <PrayerCountdown />

      <PrayerTimesCard />

      <MethodSelector />
    </template>
  </div>
</template>
