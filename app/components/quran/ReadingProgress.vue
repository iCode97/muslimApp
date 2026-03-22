<script setup lang="ts">
const { t } = useI18n()
const { bookmark, load, timeAgo } = useBookmark()
const quran = useQuran()

onMounted(() => {
  load()
})

const surahName = computed(() => {
  if (!bookmark.value) return ''
  const surah = quran.getSurah(bookmark.value.surahId)
  return surah?.nameSimple ?? bookmark.value.surahName ?? `Surah ${bookmark.value.surahId}`
})
</script>

<template>
  <NuxtLink
    v-if="bookmark"
    :to="`/quran/${bookmark.surahId}`"
    class="block"
  >
    <GlassCard variant="primary" padding="md">
      <div class="flex items-center justify-between">
        <div class="space-y-1">
          <p class="text-xs text-themed-muted uppercase tracking-wider">
            {{ t('quran.continue') }}
          </p>
          <p class="font-medium text-[var(--color-primary-light)]">
            {{ surahName }}
          </p>
          <p class="text-xs text-themed-muted">
            {{ t('quran.verse') }} {{ bookmark.verseNumber }} · {{ timeAgo() }}
          </p>
        </div>
        <div class="text-3xl opacity-50">
          📖
        </div>
      </div>
    </GlassCard>
  </NuxtLink>
</template>
