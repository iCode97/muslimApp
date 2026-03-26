<script setup lang="ts">
/**
 * Hadith of the Day widget — Shows one hadith based on the current day.
 * Rotates daily through the collection.
 */
import { HADITHS } from '~/data/hadiths'

const { t, locale } = useI18n()

// Pick hadith based on day of year (deterministic, rotates daily)
const todayHadith = computed(() => {
  const now = new Date()
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  )
  const index = dayOfYear % HADITHS.length
  return HADITHS[index]!
})

const translation = computed(() => {
  const h = todayHadith.value
  return h.translations[locale.value as keyof typeof h.translations] || h.translations.en
})
</script>

<template>
  <GlassCard>
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('hadith.ofTheDay') }}
        </h3>
        <NuxtLink to="/hadith" class="text-xs text-[var(--color-primary-light)]">
          {{ t('widgets.openFull') }} ›
        </NuxtLink>
      </div>

      <!-- Arabic text -->
      <p class="font-arabic text-lg text-right leading-[2] text-themed" dir="rtl">
        {{ todayHadith.arabic }}
      </p>

      <!-- Translation -->
      <p class="text-sm text-themed-secondary leading-relaxed">
        {{ translation }}
      </p>

      <!-- Source -->
      <p class="text-[10px] text-themed-faint">
        {{ todayHadith.source }}
        <span v-if="todayHadith.narrator"> · {{ todayHadith.narrator }}</span>
      </p>
    </div>
  </GlassCard>
</template>
