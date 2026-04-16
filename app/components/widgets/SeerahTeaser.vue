<script setup lang="ts">
/**
 * Widget: Seerah Teaser — Shows a rotating chapter preview from the Prophet's life.
 * Rotates based on day of year.
 */
import { SEERAH_CHAPTERS } from '~/data/seerah'

const { t, locale } = useI18n()

const todayChapter = computed(() => {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000)
  return SEERAH_CHAPTERS[dayOfYear % SEERAH_CHAPTERS.length]
})

const preview = computed(() => {
  const ch = todayChapter.value
  const text = ch.content[locale.value as keyof typeof ch.content] || ch.content.en
  return text.length > 120 ? text.slice(0, 120) + '…' : text
})
</script>

<template>
  <NuxtLink to="/seerah">
    <GlassCard interactive>
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-semibold text-themed-muted uppercase tracking-wider">
            {{ t('seerah.storyOfDay') }}
          </h3>
          <span class="text-xs text-[var(--color-gold)]">{{ todayChapter.year }}</span>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-2xl">{{ todayChapter.icon }}</span>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-themed">
              {{ t(todayChapter.titleKey) }}
            </p>
            <p class="text-xs text-themed-muted mt-1 leading-relaxed line-clamp-3">
              {{ preview }}
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  </NuxtLink>
</template>
