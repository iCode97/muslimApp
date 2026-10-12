<script setup lang="ts">
/**
 * List of all upcoming Islamic holidays with countdown.
 */

import type { Holiday } from '~/composables/useHolidays'

const { t } = useI18n()
const {
  holidays, fetchUpcomingHolidays, loading, getHolidayName, getHolidayDescription,
  getHijriLabel, exportAllIcs, exporting,
} = useHolidays()
const haptics = useHaptics()

const selected = ref<Holiday | null>(null)
const sheetOpen = ref(false)
const exportNote = ref<string | null>(null)
let noteTimer: ReturnType<typeof setTimeout> | undefined
onBeforeUnmount(() => clearTimeout(noteTimer))

function openHoliday(holiday: Holiday) {
  haptics.light()
  selected.value = holiday
  sheetOpen.value = true
}

async function exportAll() {
  haptics.light()
  const count = await exportAllIcs()
  exportNote.value = count > 0 ? t('calendar.exportAllDone', { count }) : t('calendar.exportUnavailable')
  clearTimeout(noteTimer)
  noteTimer = setTimeout(() => (exportNote.value = null), 5000)
}

onMounted(() => {
  if (holidays.value.length === 0) {
    fetchUpcomingHolidays()
  }
})

function typeLabel(type: string): string {
  const map: Record<string, string> = {
    holiday: t('calendar.typeHoliday'),
    kandil: t('calendar.typeKandil'),
    observance: t('calendar.typeObservance'),
  }
  return map[type] ?? type
}

function typeBadgeClass(type: string): string {
  const map: Record<string, string> = {
    holiday: 'bg-[var(--color-primary)]/30 text-[var(--color-primary-light)]',
    kandil: 'bg-[var(--color-gold)]/20 text-[var(--color-gold)]',
    observance: 'glass-subtle text-themed-muted',
  }
  return map[type] ?? 'glass-subtle text-themed-muted'
}
</script>

<template>
  <div class="space-y-3">
    <h2 class="text-sm font-semibold text-themed-muted uppercase tracking-wider px-1">
      {{ t('calendar.holidays') }}
    </h2>

    <div v-if="loading" class="py-8">
      <LoadingSpinner />
    </div>

    <div v-else class="space-y-2">
      <button
        v-for="holiday in holidays"
        :key="holiday.id"
        type="button"
        class="glass flex w-full items-center gap-3 px-4 py-3 text-left transition-transform active:scale-[0.99] holiday-row"
        aria-haspopup="dialog"
        @click="openHoliday(holiday)"
      >
        <!-- Icon -->
        <span class="text-2xl shrink-0" aria-hidden="true">{{ holiday.icon }}</span>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span class="font-medium text-themed truncate text-sm">
              {{ getHolidayName(holiday) }}
            </span>
            <span
              :class="[
                'text-[10px] px-1.5 py-0.5 rounded-full font-medium uppercase',
                typeBadgeClass(holiday.type),
              ]"
            >
              {{ typeLabel(holiday.type) }}
            </span>
          </div>
          <p class="text-xs text-themed-muted mt-0.5">
            {{ holiday.gregorianDate || '—' }}
          </p>
          <p class="text-xs text-themed-faint mt-0.5">
            {{ getHolidayDescription(holiday) }}
          </p>
        </div>

        <!-- Days until -->
        <div class="text-center shrink-0 min-w-[48px]">
          <p
            :class="[
              'text-lg font-bold',
              (holiday.daysUntil ?? 0) <= 7
                ? 'text-[var(--color-gold)]'
                : 'text-[var(--color-primary-light)]',
            ]"
          >
            {{ holiday.daysUntil ?? '—' }}
          </p>
          <p class="text-[10px] text-themed-faint">
            {{ t('calendar.days') }}
          </p>
        </div>
      </button>

      <!-- ICS export of all holidays in the next 12 months -->
      <div class="pt-1 space-y-2">
        <GlassButton class="w-full" :disabled="exporting" @click="exportAll">
          <AppIcon name="calendar" :size="18" class="mr-2" />
          {{ t('calendar.exportAll') }}
        </GlassButton>
        <p v-if="exportNote" role="status" class="text-xs text-themed-muted text-center">
          {{ exportNote }}
        </p>
      </div>
    </div>

    <HolidaySheet
      v-model:open="sheetOpen"
      :holiday="selected"
      :hijri-label="selected ? getHijriLabel(selected) : undefined"
    />
  </div>
</template>

<style scoped>
.holiday-row:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}
</style>
