<script setup lang="ts">
/**
 * Hijri Date widget — Large, prominent display of the Islamic date.
 */
const { t } = useI18n()
const prayerTimes = usePrayerTimes()

const hijri = computed(() => prayerTimes.data.value?.hijriDate)
</script>

<template>
  <GlassCard variant="subtle">
    <div v-if="hijri" class="text-center py-2">
      <p class="text-[var(--color-gold)] text-2xl font-semibold">
        {{ hijri.day }}. {{ hijri.month }}
      </p>
      <p class="text-sm text-themed-muted mt-1">
        {{ hijri.year }} {{ hijri.designation }}
      </p>
      <p v-if="hijri.monthAr" class="font-arabic text-lg text-themed-faint mt-1">
        {{ hijri.monthAr }}
      </p>
    </div>
    <div v-else class="text-center py-2 text-themed-muted text-sm">
      {{ t('common.loading') }}
    </div>
  </GlassCard>
</template>
