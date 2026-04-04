<script setup lang="ts">
/**
 * Reading Progress widget — compact overview of all content area progress.
 * Shows Quran, Seerah, Hadith, and 99 Names progress at a glance.
 */
import { HADITHS } from '~/data/hadiths'
import { ALLAH_NAMES } from '~/data/allah-names'

const { t } = useI18n()

const quranProgress = useProgress('quran', 114)
const seerahProgress = useProgress('seerah', 11)
const hadithProgress = useProgress('hadith', HADITHS.length)
const namesProgress = useProgress('names', ALLAH_NAMES.length)

onMounted(() => {
  quranProgress.load()
  seerahProgress.load()
  hadithProgress.load()
  namesProgress.load()
})

const areas = computed(() => [
  {
    key: 'quran',
    label: t('nav.quran'),
    icon: '📖',
    current: quranProgress.summary.value.read,
    total: quranProgress.summary.value.total,
    percent: quranProgress.summary.value.percent,
    link: '/quran',
  },
  {
    key: 'seerah',
    label: 'Seerah',
    icon: '📕',
    current: seerahProgress.summary.value.read,
    total: seerahProgress.summary.value.total,
    percent: seerahProgress.summary.value.percent,
    link: '/seerah',
  },
  {
    key: 'hadith',
    label: t('hadith.title'),
    icon: '📜',
    current: hadithProgress.summary.value.read,
    total: hadithProgress.summary.value.total,
    percent: hadithProgress.summary.value.percent,
    link: '/hadith',
  },
  {
    key: 'names',
    label: t('names.title'),
    icon: '✨',
    current: namesProgress.summary.value.read,
    total: namesProgress.summary.value.total,
    percent: namesProgress.summary.value.percent,
    link: '/names',
  },
])
</script>

<template>
  <GlassCard>
    <div class="space-y-3">
      <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
        {{ t('common.progress') }}
      </h3>

      <div class="grid grid-cols-2 gap-3">
        <NuxtLink
          v-for="area in areas"
          :key="area.key"
          :to="area.link"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl glass-subtle hover:bg-[var(--glass-bg-subtle)] transition-all group"
        >
          <span class="text-lg">{{ area.icon }}</span>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-themed-secondary truncate">{{ area.label }}</span>
              <span class="text-[10px] text-themed-faint tabular-nums">{{ area.current }}/{{ area.total }}</span>
            </div>
            <div class="w-full h-1.5 rounded-full glass-subtle overflow-hidden mt-1">
              <div
                class="h-full rounded-full bg-[var(--color-primary-light)] transition-all duration-500"
                :style="{ width: `${area.percent}%` }"
              />
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </GlassCard>
</template>
