<script setup lang="ts">
/**
 * Prayer Tracker — mark the 5 daily prayers as done / qada per day.
 * Shows today's checklist, a 7-day grid, streak and 7/30-day stats.
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

function statusClass(status: string): string {
  if (status === 'done') return 'bg-[var(--color-primary)] text-white'
  if (status === 'qada') return 'bg-[var(--color-gold)]/25 text-[var(--color-gold)] border border-[var(--color-gold)]/40'
  return 'glass-subtle text-themed-faint'
}

function statusSymbol(status: string): string {
  if (status === 'done') return '✓'
  if (status === 'qada') return 'Q'
  return '○'
}

const weekdayFormat = computed(() => new Intl.DateTimeFormat(undefined, { weekday: 'short' }))

const stats7 = computed(() => tracker.statsPercent(7))
const stats30 = computed(() => tracker.statsPercent(30))
</script>

<template>
  <div class="app-container pt-6 pb-8 space-y-5 max-w-3xl mx-auto">
    <header>
      <h1 class="text-2xl font-semibold">
        {{ t('tracker.title') }}
      </h1>
      <p class="text-sm text-themed-muted mt-1">
        {{ t('tracker.subtitle') }}
      </p>
    </header>

    <!-- Streak + stats -->
    <div class="grid grid-cols-3 gap-3">
      <GlassCard variant="primary">
        <div class="text-center space-y-1">
          <p class="text-2xl font-bold tabular-nums">🔥 {{ tracker.streak.value }}</p>
          <p class="text-[11px] text-themed-muted">{{ t('tracker.streak') }}</p>
        </div>
      </GlassCard>
      <GlassCard>
        <div class="text-center space-y-1">
          <p class="text-2xl font-bold tabular-nums">{{ stats7 }}%</p>
          <p class="text-[11px] text-themed-muted">{{ t('tracker.last7') }}</p>
        </div>
      </GlassCard>
      <GlassCard>
        <div class="text-center space-y-1">
          <p class="text-2xl font-bold tabular-nums">{{ stats30 }}%</p>
          <p class="text-[11px] text-themed-muted">{{ t('tracker.last30') }}</p>
        </div>
      </GlassCard>
    </div>

    <!-- Today's checklist -->
    <GlassCard>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
            {{ t('tracker.today') }}
          </h3>
          <span class="text-xs text-themed-faint tabular-nums">
            {{ tracker.todayCount.value }}/5
          </span>
        </div>

        <div class="space-y-2">
          <button
            v-for="prayer in tracker.TRACKED_PRAYERS"
            :key="prayer"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl glass-subtle transition-all duration-200 text-left"
            @click="toggle(prayer)"
          >
            <span class="text-lg">{{ PRAYER_ICONS[prayer] }}</span>
            <span class="flex-1 text-sm font-medium text-themed-secondary">
              {{ t(`prayer.${prayer}`) }}
            </span>
            <span
              v-if="tracker.today.value[prayer] === 'qada'"
              class="text-[10px] text-[var(--color-gold)] uppercase tracking-wider"
            >
              {{ t('tracker.qada') }}
            </span>
            <span
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200',
                statusClass(tracker.today.value[prayer]),
              ]"
            >
              {{ statusSymbol(tracker.today.value[prayer]) }}
            </span>
          </button>
        </div>

        <p class="text-[11px] text-themed-faint">
          {{ t('tracker.tapHint') }}
        </p>
      </div>
    </GlassCard>

    <!-- Week grid -->
    <GlassCard>
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('tracker.week') }}
        </h3>

        <div class="grid grid-cols-7 gap-1.5">
          <div
            v-for="day in tracker.week.value"
            :key="day.key"
            class="flex flex-col items-center gap-1.5"
          >
            <span class="text-[10px] text-themed-faint">
              {{ weekdayFormat.format(day.date) }}
            </span>
            <div
              :class="[
                'w-9 h-9 rounded-xl flex items-center justify-center text-xs font-semibold tabular-nums transition-all',
                day.complete
                  ? 'bg-[var(--color-primary)] text-white'
                  : tracker.countPrayed(day.key) > 0
                    ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary-light)]'
                    : 'glass-subtle text-themed-faint',
              ]"
            >
              {{ day.complete ? '✓' : tracker.countPrayed(day.key) }}
            </div>
            <!-- 5 prayer dots -->
            <div class="flex gap-0.5">
              <span
                v-for="prayer in tracker.TRACKED_PRAYERS"
                :key="prayer"
                :class="[
                  'w-1 h-1 rounded-full',
                  day.record[prayer] === 'done'
                    ? 'bg-[var(--color-primary-light)]'
                    : day.record[prayer] === 'qada'
                      ? 'bg-[var(--color-gold)]'
                      : 'bg-[var(--glass-border)]',
                ]"
              />
            </div>
          </div>
        </div>

        <!-- Legend -->
        <div class="flex items-center gap-4 text-[11px] text-themed-faint pt-1">
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-[var(--color-primary-light)]" />
            {{ t('tracker.done') }}
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-[var(--color-gold)]" />
            {{ t('tracker.qada') }}
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-[var(--glass-border)]" />
            {{ t('tracker.open') }}
          </span>
        </div>
      </div>
    </GlassCard>
  </div>
</template>
