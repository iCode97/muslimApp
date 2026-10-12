<script setup lang="ts">
/**
 * Hijri calendar month view with holiday markers.
 */

import { fastingKindsFor, type FastingKind } from '~/data/holiday-info'
import type { HijriDay, Holiday } from '~/composables/useHolidays'

const { t } = useI18n()
const haptics = useHaptics()
const {
  calendarDays,
  currentHijriMonth,
  currentHijriYear,
  loading,
  fetchTodayHijri,
  fetchCalendarMonth,
  getMonthInfo,
  getMonthName,
  getHolidayName,
} = useHolidays()

// Weekday keys for calendar positioning
const weekdayKeys = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Localized weekday labels
const weekdayLabels = computed(() => [
  t('calendar.weekMon'),
  t('calendar.weekTue'),
  t('calendar.weekWed'),
  t('calendar.weekThu'),
  t('calendar.weekFri'),
  t('calendar.weekSat'),
  t('calendar.weekSun'),
])

// "Mondays & Thursdays" markers can be switched off to reduce noise (per-viewer preference)
const MONTHU_KEY = 'muslimapp-cal-monthu'
const showMonThu = ref(true)

watch(showMonThu, (on) => {
  try {
    localStorage.setItem(MONTHU_KEY, on ? '1' : '0')
  }
  catch { /* storage unavailable — keep in-memory state */ }
})

// Initialize with current Hijri month
onMounted(async () => {
  try {
    if (localStorage.getItem(MONTHU_KEY) === '0') showMonThu.value = false
  }
  catch { /* storage unavailable */ }

  const today = await fetchTodayHijri()
  if (today) {
    await fetchCalendarMonth(today.month, today.year)
  }
})

// Current month info
const monthInfo = computed(() => getMonthInfo(currentHijriMonth.value))

// Localized month name
const monthName = computed(() => {
  const info = monthInfo.value
  return info ? getMonthName(info) : '...'
})

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

type Day = NonNullable<typeof calendarDays.value[number]>

/** Recommended fasting kinds shown for a day (respecting the Mon/Thu toggle). */
function fastingFor(day: Day): FastingKind[] {
  return fastingKindsFor(day).filter(k => k !== 'monThu' || showMonThu.value)
}

/** Dot style classes per fasting kind (key days gold, white days primary, Mon/Thu light). */
function dotClass(kind: FastingKind): string {
  if (kind === 'bid') return 'bg-[var(--color-primary-light)]'
  if (kind === 'monThu') return 'border border-[var(--color-primary-light)] opacity-60'
  return 'bg-[var(--color-gold)]'
}

function isInteractive(day: Day): boolean {
  return !!day.holiday || fastingFor(day).length > 0
}

// Accessible name of a day cell: "12, 03.04., Eid al-Fitr, today"
function dayLabel(day: Day): string {
  const parts = [`${day.hijriDay}`, `${day.gregorianDay}.${day.gregorianMonth}.`]
  if (day.holiday) parts.push(getHolidayName(day.holiday))
  for (const kind of fastingFor(day)) parts.push(t(`calendar.fasting.${kind}`))
  if (day.isToday) parts.push(t('dashboard.today'))
  return parts.join(', ')
}

function cellClass(day: Day | null): string {
  if (!day) return 'opacity-0'
  if (day.isToday) return 'glass-primary font-bold'
  if (day.holiday) return 'bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20'
  return 'hover:bg-white/5'
}

// Detail sheet for a tapped day
const selectedDay = ref<Day | null>(null)
const sheetOpen = ref(false)

function openDay(day: Day) {
  haptics.light()
  selectedDay.value = day
  sheetOpen.value = true
}

const sheetHoliday = computed<Holiday | null>(() => {
  const day = selectedDay.value
  if (!day?.holiday) return null
  return {
    ...(day.holiday as Holiday),
    gregorianDate: day.gregorianDate,
    gregorianIso: day.gregorianIso,
    hijriYear: day.hijriYear,
  }
})
const sheetKinds = computed(() => (selectedDay.value ? fastingFor(selectedDay.value) : []))
const sheetHijriLabel = computed(() => {
  const day = selectedDay.value
  if (!day) return undefined
  const info = getMonthInfo(day.hijriMonth)
  return `${day.hijriDay}. ${info ? getMonthName(info) : ''} ${day.hijriYear}`
})

// Shawwal: hint for the six recommended days after Ramadan
const shawwalOpen = ref(false)
const isShawwal = computed(() => currentHijriMonth.value === 10)

// Build calendar grid (7 columns for weekdays)
const calendarGrid = computed(() => {
  if (calendarDays.value.length === 0) return []

  const firstDay = calendarDays.value[0]
  if (!firstDay) return []

  // Determine weekday index (0=Mon, 6=Sun) using the internal key
  const weekdayMap: Record<string, number> = {
    Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6,
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
      <GlassButton variant="ghost" size="sm" :aria-label="t('a11y.prevMonth')" @click="prevMonth">
        <span aria-hidden="true">←</span>
      </GlassButton>

      <div class="text-center" aria-live="polite">
        <p class="font-semibold text-themed">
          {{ monthName }}
        </p>
        <p class="text-xs text-themed-muted">
          <span lang="ar">{{ monthInfo?.nameAR }}</span> · {{ currentHijriYear }} AH
        </p>
      </div>

      <GlassButton variant="ghost" size="sm" :aria-label="t('a11y.nextMonth')" @click="nextMonth">
        <span aria-hidden="true">→</span>
      </GlassButton>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="py-8">
      <LoadingSpinner size="sm" />
    </div>

    <!-- Calendar grid -->
    <div v-else>
      <!-- Weekday headers -->
      <div class="grid grid-cols-7 gap-1 mb-2" aria-hidden="true">
        <div
          v-for="(label, idx) in weekdayLabels"
          :key="idx"
          class="text-center text-[10px] text-themed-faint font-medium uppercase"
        >
          {{ label }}
        </div>
      </div>

      <!-- Days -->
      <div role="list" :aria-label="t('a11y.calendarGrid')" class="grid grid-cols-7 gap-1">
        <div
          v-for="(day, index) in calendarGrid"
          :key="index"
          class="relative aspect-square"
          :role="day ? 'listitem' : 'presentation'"
          :aria-hidden="day ? undefined : true"
        >
          <template v-if="day">
            <component
              :is="isInteractive(day) ? 'button' : 'div'"
              :type="isInteractive(day) ? 'button' : undefined"
              :class="[
                'cell absolute inset-0 flex flex-col items-center justify-center rounded-lg text-sm transition-all duration-200',
                cellClass(day),
                isInteractive(day) ? 'cursor-pointer active:scale-95' : '',
              ]"
              :aria-label="dayLabel(day)"
              :aria-current="day.isToday ? 'date' : undefined"
              :aria-haspopup="isInteractive(day) ? 'dialog' : undefined"
              :title="day.holiday ? getHolidayName(day.holiday) : undefined"
              @click="isInteractive(day) && openDay(day)"
            >
              <!-- Hijri day number -->
              <span :class="day.isToday ? 'text-[var(--color-primary-light)]' : 'text-themed-secondary'">
                {{ day.hijriDay }}
              </span>

              <!-- Gregorian day (small) -->
              <span class="text-[8px] text-themed-faint leading-none">
                {{ day.gregorianDay }}.{{ day.gregorianMonth }}
              </span>

              <!-- Recommended fasting markers -->
              <span
                v-if="fastingFor(day).length"
                class="absolute top-[3px] flex items-center gap-[3px]"
                aria-hidden="true"
              >
                <span
                  v-for="kind in fastingFor(day)"
                  :key="kind"
                  :class="['block h-[5px] w-[5px] rounded-full', dotClass(kind)]"
                />
              </span>

              <!-- Holiday marker -->
              <span
                v-if="day.holiday"
                class="absolute -top-0.5 -right-0.5 text-[8px]"
                aria-hidden="true"
              >
                {{ day.holiday.icon }}
              </span>
            </component>
          </template>
        </div>
      </div>

      <!-- Shawwal hint -->
      <button
        v-if="isShawwal"
        type="button"
        class="cell mt-3 flex w-full items-start gap-2 rounded-xl glass-subtle p-3 text-left"
        aria-haspopup="dialog"
        @click="haptics.light(); shawwalOpen = true"
      >
        <AppIcon name="lightbulb" :size="18" class="mt-0.5 shrink-0 text-[var(--color-gold)]" />
        <span class="text-xs text-themed-secondary leading-relaxed">{{ t('calendar.shawwalHint') }}</span>
      </button>

      <!-- Legend + Mon/Thu toggle -->
      <div class="mt-4 space-y-2" :aria-label="t('calendar.legendTitle')" role="group">
        <p class="text-[11px] font-semibold uppercase tracking-wider text-themed-muted">
          {{ t('calendar.legendTitle') }}
        </p>
        <ul class="space-y-1.5 text-xs text-themed-muted">
          <li class="flex items-center gap-2">
            <span class="block h-[7px] w-[7px] shrink-0 rounded-full" :class="dotClass('arafah')" aria-hidden="true" />
            {{ t('calendar.legendKey') }}
          </li>
          <li class="flex items-center gap-2">
            <span class="block h-[7px] w-[7px] shrink-0 rounded-full" :class="dotClass('bid')" aria-hidden="true" />
            {{ t('calendar.legendBid') }}
          </li>
          <li v-if="showMonThu" class="flex items-center gap-2">
            <span class="block h-[7px] w-[7px] shrink-0 rounded-full" :class="dotClass('monThu')" aria-hidden="true" />
            {{ t('calendar.legendMonThu') }}
          </li>
          <li class="flex items-center gap-2">
            <span class="block h-[9px] w-[9px] shrink-0 rounded-[3px] border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/15" aria-hidden="true" />
            {{ t('calendar.legendHoliday') }}
          </li>
        </ul>
        <div class="flex items-center justify-between gap-3 pt-1">
          <span id="monthu-toggle-label" class="text-xs text-themed-secondary">{{ t('calendar.toggleMonThu') }}</span>
          <ToggleSwitch v-model="showMonThu" size="sm" aria-labelledby="monthu-toggle-label" />
        </div>
      </div>

      <HolidaySheet
        v-model:open="sheetOpen"
        :holiday="sheetHoliday"
        :fasting-kinds="sheetKinds"
        :hijri-label="sheetHijriLabel"
        :date-label="selectedDay?.gregorianDate"
      />
      <HolidaySheet v-model:open="shawwalOpen" :fasting-kinds="['shawwal']" />
    </div>
  </GlassCard>
</template>

<style scoped>
.cell:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 1px;
}
</style>
