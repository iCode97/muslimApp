<script setup lang="ts">
/**
 * Hijri calendar month view with holiday markers.
 */

const { t } = useI18n()
const {
  calendarDays,
  currentHijriMonth,
  currentHijriYear,
  loading,
  fetchTodayHijri,
  fetchCalendarMonth,
  getMonthInfo,
} = useHolidays()

const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

// Initialize with current Hijri month
onMounted(async () => {
  const today = await fetchTodayHijri()
  if (today) {
    await fetchCalendarMonth(today.month, today.year)
  }
})

// Current month info
const monthInfo = computed(() => getMonthInfo(currentHijriMonth.value))

// Navigate months
async function prevMonth() {
  let m = currentHijriMonth.value - 1
  let y = currentHijriYear.value
  if (m < 1) {
    m = 12
    y -= 1
  }
  await fetchCalendarMonth(m, y)
}

async function nextMonth() {
  let m = currentHijriMonth.value + 1
  let y = currentHijriYear.value
  if (m > 12) {
    m = 1
    y += 1
  }
  await fetchCalendarMonth(m, y)
}

// Build calendar grid (7 columns for weekdays)
const calendarGrid = computed(() => {
  if (calendarDays.value.length === 0) return []

  const firstDay = calendarDays.value[0]
  if (!firstDay) return []

  // Determine weekday index (0=Mo, 6=So)
  const weekdayMap: Record<string, number> = {
    Mo: 0, Di: 1, Mi: 2, Do: 3, Fr: 4, Sa: 5, So: 6,
  }
  const startOffset = weekdayMap[firstDay.weekday] ?? 0

  // Create grid with empty slots for offset
  const grid: (typeof calendarDays.value[0] | null)[] = []
  for (let i = 0; i < startOffset; i++) {
    grid.push(null)
  }
  grid.push(...calendarDays.value)

  return grid
})
</script>

<template>
  <GlassCard variant="default" padding="md">
    <!-- Month header with navigation -->
    <div class="flex items-center justify-between mb-4">
      <GlassButton variant="ghost" size="sm" @click="prevMonth">
        ←
      </GlassButton>

      <div class="text-center">
        <p class="font-semibold text-white/90">
          {{ monthInfo?.nameDE ?? '...' }}
        </p>
        <p class="text-xs text-white/40">
          {{ monthInfo?.nameAR }} · {{ currentHijriYear }} AH
        </p>
      </div>

      <GlassButton variant="ghost" size="sm" @click="nextMonth">
        →
      </GlassButton>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="py-8">
      <LoadingSpinner size="sm" />
    </div>

    <!-- Calendar grid -->
    <div v-else>
      <!-- Weekday headers -->
      <div class="grid grid-cols-7 gap-1 mb-2">
        <div
          v-for="day in weekdays"
          :key="day"
          class="text-center text-[10px] text-white/30 font-medium uppercase"
        >
          {{ day }}
        </div>
      </div>

      <!-- Days -->
      <div class="grid grid-cols-7 gap-1">
        <div
          v-for="(day, index) in calendarGrid"
          :key="index"
          :class="[
            'relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all duration-200',
            day?.isToday
              ? 'glass-primary font-bold'
              : day?.holiday
                ? 'bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20'
                : 'hover:bg-white/5',
            !day ? 'opacity-0' : '',
          ]"
          :title="day?.holiday?.nameDE"
        >
          <!-- Hijri day number -->
          <span
            v-if="day"
            :class="[
              day.isToday ? 'text-[var(--color-primary-light)]' : 'text-white/70',
            ]"
          >
            {{ day.hijriDay }}
          </span>

          <!-- Gregorian day (small) -->
          <span
            v-if="day"
            class="text-[8px] text-white/25 leading-none"
          >
            {{ day.gregorianDay }}.{{ day.gregorianMonth }}
          </span>

          <!-- Holiday marker -->
          <span
            v-if="day?.holiday"
            class="absolute -top-0.5 -right-0.5 text-[8px]"
          >
            {{ day.holiday.icon }}
          </span>
        </div>
      </div>
    </div>
  </GlassCard>
</template>
