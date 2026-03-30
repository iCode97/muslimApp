<script setup lang="ts">
/**
 * Calendar page — Hijri calendar + Islamic holidays & Kandil nights.
 */

const { t } = useI18n()
</script>

<template>
  <div class="app-container pt-6 space-y-5">
    <header>
      <h1 class="text-2xl font-semibold">
        {{ t('calendar.title') }}
      </h1>
      <p class="text-sm text-themed-muted mt-1">
        {{ t('calendar.subtitle') }}
      </p>
    </header>

    <!-- Next Holiday Countdown -->
    <HolidayCountdown />

    <!-- Calendar + Holidays: side-by-side on desktop -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <!-- Hijri Calendar -->
      <HijriCalendar />

      <!-- All Holidays -->
      <HolidayList />
    </div>
  </div>
</template>
