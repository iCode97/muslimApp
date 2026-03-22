<script setup lang="ts">
/**
 * Detailed Prayer Times page.
 * Shows all prayers for today with countdown and location management.
 */

const { t } = useI18n()
const { location, loadSaved, detectGPS, setCity } = useLocation()
const prayerTimes = usePrayerTimes()

onMounted(async () => {
  const saved = loadSaved()
  if (!saved) {
    const detected = await detectGPS()
    if (!detected) await setCity('Berlin', 'Deutschland')
  }

  prayerTimes.loadCache()
  if (location.value) {
    await prayerTimes.fetchTimes(location.value.latitude, location.value.longitude)
  }
})

watch(location, async (newLoc) => {
  if (newLoc) {
    await prayerTimes.fetchTimes(newLoc.latitude, newLoc.longitude)
  }
})

let refreshInterval: ReturnType<typeof setInterval>
onMounted(() => {
  refreshInterval = setInterval(() => prayerTimes.refresh(), 30000)
})
onUnmounted(() => clearInterval(refreshInterval))

const hijriDisplay = computed(() => {
  const h = prayerTimes.data.value?.hijriDate
  if (!h) return ''
  return `${h.day}. ${h.month} ${h.year} ${h.designation}`
})
</script>

<template>
  <div class="px-4 pt-6 space-y-5 max-w-lg mx-auto">
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
