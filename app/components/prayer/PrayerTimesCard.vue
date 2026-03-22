<script setup lang="ts">
const { t } = useI18n()
const prayerTimes = usePrayerTimes()

const prayers = computed(() => prayerTimes.data.value?.prayers ?? [])
const nextPrayerName = computed(() => prayerTimes.data.value?.nextPrayer?.name ?? null)
</script>

<template>
  <GlassCard variant="default" padding="sm">
    <div class="flex items-center justify-between px-4 pt-2 pb-1">
      <h2 class="text-sm font-semibold text-themed-muted uppercase tracking-wider">
        {{ t('dashboard.allPrayers') }}
      </h2>
      <span class="text-xs text-themed-faint">{{ t('prayer.diyanet') }}</span>
    </div>

    <div v-if="prayerTimes.loading.value" class="py-8">
      <LoadingSpinner />
    </div>

    <div v-else-if="prayerTimes.error.value" class="px-4 py-6 text-center">
      <p class="text-[var(--color-danger)] text-sm">{{ prayerTimes.error.value }}</p>
    </div>

    <div v-else class="space-y-0.5">
      <PrayerTimeRow
        v-for="(prayer, index) in prayers"
        :key="prayer.name"
        :name="prayer.name"
        :time="prayer.time"
        :passed="prayer.passed"
        :is-next="prayer.name === nextPrayerName"
        :class="['animate-fade-in', `stagger-${index + 1}`]"
      />
    </div>
  </GlassCard>
</template>
