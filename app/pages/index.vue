<script setup lang="ts">
/**
 * Dashboard — Configurable widget-based home screen.
 * Users can enable/disable and reorder widgets via edit mode.
 */

const { t } = useI18n()
const { location, prayerTimes, hijriDisplay, init, startRefresh, stopRefresh } = usePrayerInit()
const dashboard = useDashboard()
const notifications = useNotifications()

// Drag-and-drop reordering for the dashboard editor
const dashboardDnd = useDragReorder({
  getId: (w: { id: string }) => w.id,
  onReorder: (fromId, toId) => dashboard.reorderById(fromId, toId),
})

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
  'progress-overview': resolveComponent('ProgressOverview'),
}
</script>

<template>
  <div class="app-container pt-8 lg:pt-10 space-y-6 lg:space-y-8">
    <!-- Header — more breathing room on desktop -->
    <header class="animate-fade-in">
      <div class="flex items-start justify-between">
        <div class="space-y-1.5">
          <p class="text-sm lg:text-base text-themed-muted tracking-wide">
            {{ greeting }}
          </p>
          <h1 class="text-3xl lg:text-4xl font-bold tracking-tight">
            {{ t('dashboard.greeting') }}
          </h1>
          <!-- Hijri Date -->
          <div v-if="hijriDisplay" class="flex items-center gap-2 text-sm text-[var(--color-gold)] pt-1">
            <span>☪</span>
            <span>{{ hijriDisplay }}</span>
          </div>
        </div>

        <!-- Edit dashboard button -->
        <button
          :class="[
            'px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 mt-1',
            dashboard.isEditing.value
              ? 'bg-[var(--color-primary)] text-white'
              : 'glass-subtle text-themed-muted hover:text-themed-secondary'
          ]"
          @click="dashboard.isEditing.value = !dashboard.isEditing.value"
        >
          {{ dashboard.isEditing.value ? '✓ ' + t('widgets.done') : '✎ ' + t('widgets.edit') }}
        </button>
      </div>
    </header>

    <!-- Location -->
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
              :draggable="true"
              :class="[
                'flex items-center gap-3 px-3 py-2 rounded-xl glass-subtle transition-all cursor-grab active:cursor-grabbing',
                dashboardDnd.dragOverId.value === widget.id ? 'ring-2 ring-[var(--color-primary-light)] scale-[1.01]' : '',
                dashboardDnd.draggingId.value === widget.id ? 'opacity-50' : '',
              ]"
              @dragstart="dashboardDnd.handlers(widget.id).dragstart($event)"
              @dragover="dashboardDnd.handlers(widget.id).dragover($event)"
              @dragleave="dashboardDnd.handlers(widget.id).dragleave()"
              @drop="dashboardDnd.handlers(widget.id).drop($event)"
              @dragend="dashboardDnd.handlers(widget.id).dragend()"
            >
              <span class="text-themed-faint text-sm select-none" aria-hidden="true">⋮⋮</span>

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

              <span class="text-base">{{ widget.icon }}</span>
              <span :class="['text-sm flex-1', widget.enabled ? 'text-themed' : 'text-themed-faint']">
                {{ t(widget.i18nKey) }}
              </span>

              <!-- Fallback arrows for non-DnD (touch) users -->
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

    <!-- Dynamic Widgets — Bento Grid -->
    <div class="bento-grid">
      <template v-for="(widget, idx) in dashboard.enabledWidgets.value" :key="widget.id">
        <div
          :class="[
            'animate-fade-in',
            `stagger-${Math.min(idx + 2, 6)}`,
            widget.colSpan === 3 ? 'bento-span-3' : '',
            widget.colSpan === 2 ? 'bento-span-2' : '',
          ]"
        >
          <component :is="widgetComponents[widget.id]" />
        </div>
      </template>
    </div>
  </div>
</template>
