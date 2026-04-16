<script setup lang="ts">
/**
 * Widget: Name of the Day — Shows one of Allah's 99 Names daily.
 * Rotates based on day of year for consistent daily experience.
 */
import { ALLAH_NAMES } from '~/data/allah-names'

const { t, locale } = useI18n()

const todayName = computed(() => {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000)
  return ALLAH_NAMES[dayOfYear % 99]
})

const meaning = computed(() => {
  const n = todayName.value
  return n.meanings[locale.value as keyof typeof n.meanings] || n.meanings.en
})
</script>

<template>
  <NuxtLink to="/names">
    <GlassCard interactive>
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-semibold text-themed-muted uppercase tracking-wider">
            {{ t('names.nameOfDay') }}
          </h3>
          <span class="text-xs text-themed-faint">#{{ todayName.id }}/99</span>
        </div>

        <p class="font-arabic text-2xl text-center text-[var(--color-gold)] leading-relaxed" dir="rtl">
          {{ todayName.arabic }}
        </p>

        <p class="text-sm text-themed-secondary text-center font-medium">
          {{ todayName.transliteration }}
        </p>

        <p class="text-xs text-themed-muted text-center">
          {{ meaning }}
        </p>
      </div>
    </GlassCard>
  </NuxtLink>
</template>
