<script setup lang="ts">
/**
 * Dashboard widget — quick prayer tracking for today + current streak.
 * Tapping a prayer cycles its status; links to the full tracker page.
 */

const { t } = useI18n()
const tracker = usePrayerTracker()
const haptics = useHaptics()

onMounted(() => tracker.load())

const PRAYER_ICONS: Record<string, string> = {
  fajr: '🌅',
  dhuhr: '☀️',
  asr: '🌤',
  maghrib: '🌇',
  isha: '🌙',
}

function toggle(prayer: typeof tracker.TRACKED_PRAYERS[number]) {
  tracker.cycleStatus(prayer)
  haptics.light()
}
</script>

<template>
  <GlassCard class="h-full">
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('widgets.prayerTracker') }}
        </h3>
        <NuxtLink
          to="/tracker"
          class="text-xs text-themed-faint hover:text-themed-secondary transition-colors"
        >
          {{ t('widgets.openFull') }} ›
        </NuxtLink>
      </div>

      <div class="flex items-center justify-between gap-1.5">
        <button
          v-for="prayer in tracker.TRACKED_PRAYERS"
          :key="prayer"
          class="flex flex-col items-center gap-1 flex-1"
          @click="toggle(prayer)"
        >
          <span
            :class="[
              'w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-200',
              tracker.today.value[prayer] === 'done'
                ? 'bg-[var(--color-primary)] text-white'
                : tracker.today.value[prayer] === 'qada'
                  ? 'bg-[var(--color-gold)]/25 text-[var(--color-gold)]'
                  : 'glass-subtle',
            ]"
          >
            {{ tracker.today.value[prayer] === 'done' ? '✓' : tracker.today.value[prayer] === 'qada' ? 'Q' : PRAYER_ICONS[prayer] }}
          </span>
          <span class="text-[10px] text-themed-faint">
            {{ t(`prayer.${prayer}`) }}
          </span>
        </button>
      </div>

      <div class="flex items-center justify-between text-xs text-themed-muted pt-1">
        <span>🔥 {{ tracker.streak.value }} {{ t('tracker.streakDays') }}</span>
        <span class="tabular-nums">{{ tracker.todayCount.value }}/5</span>
      </div>
    </div>
  </GlassCard>
</template>
