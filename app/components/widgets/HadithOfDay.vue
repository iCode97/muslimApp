<script setup lang="ts">
/**
 * Hadith of the Day widget — Shows one hadith based on the current day.
 * Rotates daily through the sahih/hasan hadiths of the collection.
 */
import { HADITHS } from '~/data/hadiths'

const { t, locale } = useI18n()

// Only well-authenticated hadiths are featured as "hadith of the day".
const POOL = HADITHS.filter(h => h.grade === 'sahih' || h.grade === 'hasan')

// Pick hadith based on day of year (deterministic, rotates daily)
const todayHadith = computed(() => {
  const pool = POOL.length > 0 ? POOL : HADITHS
  const now = new Date()
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  )
  const index = dayOfYear % pool.length
  return pool[index]!
})

const translation = computed(() => {
  const h = todayHadith.value
  return h.translations[locale.value as keyof typeof h.translations] || h.translations.en
})
</script>

<template>
  <GlassCard interactive>
    <div class="space-y-3">
      <div class="flex items-center justify-between gap-2">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('hadith.ofTheDay') }}
        </h3>
        <NuxtLink :to="`/hadith?id=${todayHadith.id}`" class="text-xs text-[var(--color-primary-light)] whitespace-nowrap">
          {{ t('widgets.openFull') }} ›
        </NuxtLink>
      </div>

      <!-- Arabic text -->
      <p class="font-arabic text-lg text-end leading-[2] text-themed" dir="rtl" lang="ar">
        {{ todayHadith.arabic }}
      </p>

      <!-- Translation -->
      <p class="text-sm text-themed-secondary leading-relaxed" dir="auto">
        {{ translation }}
      </p>

      <!-- Source + grade -->
      <div class="flex items-center justify-between gap-2 flex-wrap">
        <p class="text-[10px] text-themed-faint">
          {{ todayHadith.source }}
          <span v-if="todayHadith.narrator"> · {{ todayHadith.narrator }}</span>
        </p>
        <HadithGradeBadge :grade="todayHadith.grade" :note="todayHadith.gradeNote" />
      </div>
    </div>
  </GlassCard>
</template>
