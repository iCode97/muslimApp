<script setup lang="ts">
/**
 * Dashboard — Configurable widget-based home screen.
 * Users can enable/disable and reorder widgets via edit mode.
 */

const { t } = useI18n()
const { location, loadSaved, detectGPS } = useLocation()
const prayerTimes = usePrayerTimes()
const dashboard = useDashboard()

// Initialize location + prayer times
onMounted(async () => {
  dashboard.loadConfig()

  const saved = loadSaved()
  if (!saved) {
    await detectGPS()
  }

  prayerTimes.loadCache()

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
  if (hour < 5) return t('dashboard.goodNight')
  if (hour < 12) return t('dashboard.goodMorning')
  if (hour < 17) return t('dashboard.goodAfternoon')
  if (hour < 21) return t('dashboard.goodEvening')
  return t('dashboard.goodNight')
})

// Widget component mapping
const widgetComponents: Record<string, string> = {
  'prayer-countdown': 'PrayerCountdown',
  'prayer-times': 'PrayerTimesCard',
  'holiday-countdown': 'HolidayCountdown',
  'reading-progress': 'ReadingProgress',
  'random-verse': 'RandomVerse',
  'tasbih-quick': 'TasbihQuick',
  'hijri-date': 'HijriDateWidget',
}
</script>

<template>
  <div class="px-4 pt-6 space-y-5 max-w-lg mx-auto">
    <!-- Header -->
    <header class="space-y-1 animate-fade-in">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-themed-muted">
            {{ greeting }}
          </p>
          <h1 class="text-2xl font-semibold">
            {{ t('dashboard.greeting') }}
          </h1>
        </div>

        <!-- Edit dashboard button -->
        <button
          :class="[
            'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
            dashboard.isEditing.value
              ? 'bg-[var(--color-primary)] text-white'
              : 'glass-subtle text-themed-muted'
          ]"
          @click="dashboard.isEditing.value = !dashboard.isEditing.value"
        >
          {{ dashboard.isEditing.value ? '✓ ' + t('widgets.done') : '✎ ' + t('widgets.edit') }}
        </button>
      </div>

      <!-- Hijri Date (compact, always shown) -->
      <div v-if="hijriDisplay" class="flex items-center gap-2 text-sm text-[var(--color-gold)]">
        <span>☪</span>
        <span>{{ hijriDisplay }}</span>
      </div>
    </header>

    <!-- Location Selector -->
    <div class="animate-fade-in stagger-1">
      <LocationSelector />
    </div>

    <!-- Edit Mode: Widget configuration -->
    <Transition name="slide">
      <GlassCard v-if="dashboard.isEditing.value">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
              {{ t('widgets.configure') }}
            </h3>
            <button
              class="text-xs text-themed-faint hover:text-themed-secondary transition-colors"
              @click="dashboard.resetToDefaults()"
            >
              {{ t('widgets.resetDefaults') }}
            </button>
          </div>

          <div class="space-y-2">
            <div
              v-for="widget in dashboard.widgets.value"
              :key="widget.id"
              class="flex items-center gap-3 px-3 py-2 rounded-xl glass-subtle"
            >
              <!-- Enable/disable toggle -->
              <button
                :class="[
                  'w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-all',
                  widget.enabled
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'glass-subtle text-themed-faint'
                ]"
                @click="dashboard.toggleWidget(widget.id)"
              >
                {{ widget.enabled ? '✓' : '' }}
              </button>

              <!-- Icon + Name -->
              <span class="text-base">{{ widget.icon }}</span>
              <span :class="['text-sm flex-1', widget.enabled ? 'text-themed' : 'text-themed-faint']">
                {{ t(widget.i18nKey) }}
              </span>

              <!-- Reorder buttons -->
              <div class="flex gap-1">
                <button
                  class="w-6 h-6 rounded text-xs text-themed-faint hover:text-themed-secondary transition-colors"
                  @click="dashboard.moveWidget(widget.id, 'up')"
                >
                  ▲
                </button>
                <button
                  class="w-6 h-6 rounded text-xs text-themed-faint hover:text-themed-secondary transition-colors"
                  @click="dashboard.moveWidget(widget.id, 'down')"
                >
                  ▼
                </button>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </Transition>

    <!-- Dynamic Widgets -->
    <template v-for="(widget, idx) in dashboard.enabledWidgets.value" :key="widget.id">
      <div :class="['animate-fade-in', `stagger-${Math.min(idx + 2, 6)}`]">
        <PrayerCountdown v-if="widget.id === 'prayer-countdown'" />
        <PrayerTimesCard v-else-if="widget.id === 'prayer-times'" />
        <HolidayCountdown v-else-if="widget.id === 'holiday-countdown'" />
        <ReadingProgress v-else-if="widget.id === 'reading-progress'" />
        <RandomVerse v-else-if="widget.id === 'random-verse'" />
        <TasbihQuick v-else-if="widget.id === 'tasbih-quick'" />
        <HijriDateWidget v-else-if="widget.id === 'hijri-date'" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
