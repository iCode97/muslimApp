<script setup lang="ts">
/**
 * Countdown widget for the next upcoming Islamic holiday.
 * Used on Dashboard and Calendar page.
 */

const { t } = useI18n()
const { nextHoliday, fetchUpcomingHolidays, loading, getHolidayName, getHijriLabel } = useHolidays()
const haptics = useHaptics()
const sheetOpen = ref(false)

onMounted(() => {
  fetchUpcomingHolidays()
})
</script>

<template>
  <div v-if="loading" class="py-4">
    <LoadingSpinner size="sm" />
  </div>

  <GlassCard v-else-if="nextHoliday" variant="default" padding="md">
    <button
      type="button"
      class="flex w-full items-center gap-4 text-start countdown-btn"
      aria-haspopup="dialog"
      @click="haptics.light(); sheetOpen = true"
    >
      <!-- Icon -->
      <div class="text-3xl shrink-0" aria-hidden="true">
        {{ nextHoliday.icon }}
      </div>

      <!-- Info -->
      <div class="flex-1 min-w-0">
        <p class="text-xs text-themed-muted uppercase tracking-wider">
          {{ t('dashboard.nextHoliday') }}
        </p>
        <p class="font-semibold text-themed truncate mt-0.5" dir="auto">
          {{ getHolidayName(nextHoliday) }}
        </p>
        <p class="text-xs text-themed-muted mt-0.5">
          {{ nextHoliday.gregorianDate }}
        </p>
      </div>

      <!-- Days until -->
      <div class="text-center shrink-0">
        <p class="text-2xl font-bold text-[var(--color-primary-light)]">
          {{ nextHoliday.daysUntil }}
        </p>
        <p class="text-[10px] text-themed-muted uppercase">
          {{ t('calendar.days') }}
        </p>
      </div>
    </button>

    <HolidaySheet
      v-model:open="sheetOpen"
      :holiday="nextHoliday"
      :hijri-label="getHijriLabel(nextHoliday)"
    />
  </GlassCard>
</template>

<style scoped>
.countdown-btn:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 4px;
  border-radius: 0.75rem;
}
</style>
