<script setup lang="ts">
const { t } = useI18n()
const prayerTimes = usePrayerTimes()

const targetTimestamp = computed(() => {
  return prayerTimes.data.value?.nextPrayer?.timestamp ?? null
})

const { countdown } = useCountdown(targetTimestamp)

const nextPrayerName = computed(() => {
  const key = prayerTimes.data.value?.nextPrayer?.name
  if (!key) return ''
  return t(prayerTimes.PRAYER_I18N[key] ?? key)
})

const isNextDay = computed(() => {
  return prayerTimes.data.value?.nextPrayer?.isNextDay ?? false
})

const clockSuffix = computed(() => {
  const suffix = t('prayer.clock')
  return suffix ? ` ${suffix}` : ''
})
</script>

<template>
  <GlassCard variant="primary" :glow="!countdown.isExpired" padding="lg" interactive>
    <div class="text-center">
      <p class="text-sm text-themed-muted mb-1">
        {{ t('dashboard.nextPrayer') }}
      </p>
      <p class="text-2xl font-semibold text-[var(--color-primary-light)] mb-3">
        {{ nextPrayerName || '—' }}
      </p>

      <!-- Next day badge -->
      <div
        v-if="isNextDay"
        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-subtle text-xs text-[var(--color-gold)] mb-3"
      >
        <span>☀️</span>
        <span>{{ t('prayer.tomorrow') }}</span>
      </div>

      <p class="text-4xl font-light tracking-wider tabular-nums">
        {{ countdown.display }}
      </p>
      <p
        v-if="prayerTimes.data.value?.nextPrayer"
        class="text-sm text-themed-muted mt-2"
      >
        {{ prayerTimes.data.value.nextPrayer.time }}{{ clockSuffix }}
      </p>
    </div>
  </GlassCard>
</template>
