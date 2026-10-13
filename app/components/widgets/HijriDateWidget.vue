<script setup lang="ts">
/**
 * Hijri Date widget — Large, prominent display of the Islamic date.
 */
const { t, locale } = useI18n()
const isAr = computed(() => locale.value === 'ar')
const prayerTimes = usePrayerTimes()

const hijri = computed(() => prayerTimes.data.value?.hijriDate)
</script>

<template>
  <GlassCard variant="subtle">
    <div v-if="hijri" class="text-center py-2">
      <p class="text-[var(--color-gold)] text-2xl font-semibold">
        <template v-if="isAr">{{ hijri.day }} <span lang="ar">{{ hijri.monthAr || hijri.month }}</span></template>
        <template v-else>{{ hijri.day }}. {{ hijri.month }}</template>
      </p>
      <p class="text-sm text-themed-muted mt-1">
        {{ hijri.year }} {{ isAr ? 'هـ' : hijri.designation }}
      </p>
      <p v-if="hijri.monthAr && !isAr" class="font-arabic text-lg text-themed-faint mt-1" lang="ar">
        {{ hijri.monthAr }}
      </p>
    </div>
    <div v-else class="text-center py-2 text-themed-muted text-sm">
      {{ t('common.loading') }}
    </div>
  </GlassCard>
</template>
