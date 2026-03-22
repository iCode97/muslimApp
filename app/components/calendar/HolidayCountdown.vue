<script setup lang="ts">
/**
 * Countdown widget for the next upcoming Islamic holiday.
 * Used on Dashboard and Calendar page.
 */

const { t } = useI18n()
const { nextHoliday, fetchUpcomingHolidays, loading, getHolidayName } = useHolidays()

onMounted(() => {
  fetchUpcomingHolidays()
})
</script>

<template>
  <div v-if="loading" class="py-4">
    <LoadingSpinner size="sm" />
  </div>

  <GlassCard v-else-if="nextHoliday" variant="default" padding="md">
    <div class="flex items-center gap-4">
      <!-- Icon -->
      <div class="text-3xl shrink-0">
        {{ nextHoliday.icon }}
      </div>

      <!-- Info -->
      <div class="flex-1 min-w-0">
        <p class="text-xs text-themed-muted uppercase tracking-wider">
          {{ t('dashboard.nextHoliday') }}
        </p>
        <p class="font-semibold text-themed truncate mt-0.5">
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
    </div>
  </GlassCard>
</template>
