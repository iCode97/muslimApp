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
</script>

<template>
  <GlassCard variant="primary" :glow="!countdown.isExpired" padding="lg">
    <div class="text-center">
      <p class="text-sm text-white/60 mb-1">
        {{ t('dashboard.nextPrayer') }}
      </p>
      <p class="text-2xl font-semibold text-[var(--color-primary-light)] mb-3">
        {{ nextPrayerName || '—' }}
      </p>
      <p class="text-4xl font-light tracking-wider tabular-nums">
        {{ countdown.display }}
      </p>
      <p
        v-if="prayerTimes.data.value?.nextPrayer"
        class="text-sm text-white/40 mt-2"
      >
        {{ prayerTimes.data.value.nextPrayer.time }} Uhr
      </p>
    </div>
  </GlassCard>
</template>
