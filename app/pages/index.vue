<script setup lang="ts">
/**
 * Dashboard — Configurable widget-based home screen.
 * Users can enable/disable and reorder widgets via edit mode.
 */

const { t } = useI18n()
const { location, prayerTimes, hijriDisplay, init, startRefresh, stopRefresh } = usePrayerInit()
const dashboard = useDashboard()
const notifications = useNotifications()

// Initialize location + prayer times + notifications
onMounted(async () => {
  dashboard.loadConfig()
  notifications.loadSettings()

  await init()

  // Schedule prayer notifications
  if (prayerTimes.data.value?.prayers) {
    notifications.schedulePrayerNotifications(prayerTimes.data.value.prayers)
  }

  startRefresh()
})

onUnmounted(() => stopRefresh())

// Reschedule notifications when prayer data changes
watch(() => prayerTimes.data.value?.prayers, (prayers) => {
  if (prayers) {
    notifications.schedulePrayerNotifications(prayers)
  }
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

// Widget component mapping — resolved at runtime for dynamic <component :is="...">
const widgetComponents: Record<string, ReturnType<typeof resolveComponent>> = {
  'prayer-countdown': resolveComponent('PrayerCountdown'),
  'prayer-times': resolveComponent('PrayerTimesCard'),
  'holiday-countdown': resolveComponent('HolidayCountdown'),
  'reading-progress': resolveComponent('ReadingProgress'),
  'random-verse': resolveComponent('RandomVerse'),
  'tasbih-quick': resolveComponent('TasbihQuick'),
  'hijri-date': resolveComponent('HijriDateWidget'),
  'hadith-of-day': resolveComponent('HadithOfDay'),
  'name-of-day': resolveComponent('NameOfDay'),
  'seerah-teaser': resolveComponent('SeerahTeaser'),
}
</script>

<template>
  <div class="app-container pt-6 space-y-5">
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

    <!-- Location: prominent CTA if not set, compact selector if set -->
    <div class="animate-fade-in stagger-1">
      <LocationSetupCTA />
      <LocationSelector v-if="location" />
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

    <!-- Dynamic Widgets — responsive grid on wider screens -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
      <template v-for="(widget, idx) in dashboard.enabledWidgets.value" :key="widget.id">
        <div
          :class="[
            'animate-fade-in',
            `stagger-${Math.min(idx + 2, 6)}`,
            widget.id === 'prayer-times' || widget.id === 'prayer-countdown' ? 'md:col-span-2' : '',
          ]"
        >
          <component :is="widgetComponents[widget.id]" />
        </div>
      </template>
    </div>
  </div>
</template>

