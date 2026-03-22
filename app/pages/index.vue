<script setup lang="ts">
/**
 * Dashboard — Main view with prayer countdown, all prayers, hijri date.
 * Designed as a flexible, always-visible home screen.
 */

const { t } = useI18n()
const { location, loadSaved, detectGPS, setCity } = useLocation()
const prayerTimes = usePrayerTimes()

// Initialize location + prayer times
onMounted(async () => {
  // Try loading saved location
  const saved = loadSaved()

  if (!saved) {
    // Try GPS auto-detect, fallback to Berlin
    const detected = await detectGPS()
    if (!detected) {
      await setCity('Berlin', 'Deutschland')
    }
  }

  // Load cached prayer times first
  prayerTimes.loadCache()

  // Fetch fresh data if we have location
  if (location.value) {
    await prayerTimes.fetchTimes(location.value.latitude, location.value.longitude)
  }
})

// Re-fetch when location changes
watch(location, async (newLoc) => {
  if (newLoc) {
    await prayerTimes.fetchTimes(newLoc.latitude, newLoc.longitude)
  }
})

// Refresh prayer status every 30 seconds
let refreshInterval: ReturnType<typeof setInterval>
onMounted(() => {
  refreshInterval = setInterval(() => {
    prayerTimes.refresh()
  }, 30000)
})
onUnmounted(() => {
  clearInterval(refreshInterval)
})

// Hijri date display
const hijriDisplay = computed(() => {
  const h = prayerTimes.data.value?.hijriDate
  if (!h) return ''
  return `${h.day}. ${h.month} ${h.year} ${h.designation}`
})

// Greeting based on time of day
const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 5) return 'Gute Nacht'
  if (hour < 12) return 'Guten Morgen'
  if (hour < 17) return 'Guten Nachmittag'
  if (hour < 21) return 'Guten Abend'
  return 'Gute Nacht'
})
</script>

<template>
  <div class="px-4 pt-6 space-y-5 max-w-lg mx-auto">
    <!-- Header -->
    <header class="space-y-1 animate-fade-in">
      <p class="text-sm text-white/50">
        {{ greeting }}
      </p>
      <h1 class="text-2xl font-semibold">
        {{ t('dashboard.greeting') }} 👋
      </h1>

      <!-- Hijri Date -->
      <div v-if="hijriDisplay" class="flex items-center gap-2 text-sm text-[var(--color-gold)]">
        <span>☪</span>
        <span>{{ hijriDisplay }}</span>
      </div>
    </header>

    <!-- Location Selector -->
    <div class="animate-fade-in stagger-1">
      <LocationSelector />
    </div>

    <!-- Next Prayer Countdown -->
    <div class="animate-fade-in stagger-2">
      <PrayerCountdown />
    </div>

    <!-- All Prayer Times -->
    <div class="animate-fade-in stagger-3">
      <PrayerTimesCard />
    </div>

    <!-- Placeholder widgets for future features -->
    <GlassCard variant="subtle" class="animate-fade-in stagger-4">
      <div class="text-center py-4">
        <p class="text-sm text-white/30">
          {{ t('dashboard.nextHoliday') }} — {{ t('common.loading') }}
        </p>
        <p class="text-xs text-white/20 mt-1">Phase 3</p>
      </div>
    </GlassCard>

    <GlassCard variant="subtle" class="animate-fade-in stagger-5">
      <div class="text-center py-4">
        <p class="text-sm text-white/30">
          {{ t('quran.title') }} — {{ t('quran.continue') }}
        </p>
        <p class="text-xs text-white/20 mt-1">Phase 2</p>
      </div>
    </GlassCard>
  </div>
</template>
