<script setup lang="ts">
/**
 * Random Verse widget — Shows a random Quran verse on each load.
 * Fetches a random verse from the API and displays it beautifully.
 */
const { t, locale } = useI18n()
const config = useRuntimeConfig()

interface RandomVerseData {
  arabic: string
  translation: string
  verseKey: string
  surahName: string
}

const verse = ref<RandomVerseData | null>(null)
const loading = ref(false)

// Translation IDs based on locale
const TRANSLATION_MAP: Record<string, number> = {
  de: 27,   // Bubenheim & Elyas
  tr: 52,   // Elmalılı Hamdi Yazır
  en: 20,   // Sahih International
}

async function fetchRandomVerse() {
  loading.value = true
  try {
    // Random surah (1-114) and random verse
    const surahId = Math.floor(Math.random() * 114) + 1
    const translationId = TRANSLATION_MAP[locale.value] || 20

    // Fetch verse count for this surah
    const chapterRes = await $fetch<{ chapter: { verses_count: number, name_simple: string } }>(
      `${config.public.quranBaseUrl}/chapters/${surahId}`
    )
    const verseCount = chapterRes.chapter.verses_count
    const verseNum = Math.floor(Math.random() * verseCount) + 1

    // Fetch the verse with translation
    const verseRes = await $fetch<{
      verse: {
        text_uthmani: string
        translations: Array<{ text: string }>
        verse_key: string
      }
    }>(`${config.public.quranBaseUrl}/verses/by_key/${surahId}:${verseNum}`, {
      params: { translations: translationId, language: locale.value }
    })

    verse.value = {
      arabic: verseRes.verse.text_uthmani,
      translation: verseRes.verse.translations?.[0]?.text?.replace(/<[^>]*>/g, '') || '',
      verseKey: verseRes.verse.verse_key,
      surahName: chapterRes.chapter.name_simple,
    }
  } catch (err) {
    console.error('Random verse error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchRandomVerse()
})
</script>

<template>
  <GlassCard>
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('widgets.randomVerse') }}
        </h3>
        <button
          class="text-xs text-themed-faint hover:text-themed-secondary transition-colors"
          :disabled="loading"
          @click="fetchRandomVerse"
        >
          🔄
        </button>
      </div>

      <div v-if="loading" class="py-4 text-center">
        <LoadingSpinner size="sm" />
      </div>

      <div v-else-if="verse" class="space-y-3">
        <!-- Arabic text -->
        <p class="font-arabic text-xl text-right leading-[2.2] text-themed" dir="rtl">
          {{ verse.arabic }}
        </p>

        <!-- Translation -->
        <p class="text-sm text-themed-secondary leading-relaxed">
          {{ verse.translation }}
        </p>

        <!-- Reference -->
        <NuxtLink
          :to="`/quran/${verse.verseKey.split(':')[0]}`"
          class="inline-block text-xs text-[var(--color-primary-light)] hover:underline"
        >
          {{ verse.surahName }} · {{ t('quran.verse') }} {{ verse.verseKey.split(':')[1] }}
        </NuxtLink>
      </div>
    </div>
  </GlassCard>
</template>
