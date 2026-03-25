<script setup lang="ts">
/**
 * Single Surah view — Arabic text with Turkish, German & English translations.
 * Default translation matches app language; others can be toggled on.
 * Tapping Arabic text toggles per-verse translation visibility.
 */

const { t, locale } = useI18n()
const route = useRoute()
const quran = useQuran()
const { save: saveBookmark } = useBookmark()

const surahId = computed(() => Number(route.params.surah))

const surah = computed(() => quran.getSurah(surahId.value))

// Available translation options
const TRANSLATION_OPTIONS = [
  { key: 'tr', id: 52, labelKey: 'quran.turkishTranslation' },
  { key: 'de', id: 27, labelKey: 'quran.germanTranslation' },
  { key: 'en', id: 20, labelKey: 'quran.englishTranslation' },
] as const

// Active translation IDs as reactive array (Vue tracks arrays better than Sets)
const activeTranslations = ref<number[]>([])

// Initialize active translations based on locale
function initTranslations() {
  const localeMap: Record<string, number> = { tr: 52, de: 27, en: 20 }
  const defaultId = localeMap[locale.value] ?? 20
  activeTranslations.value = [defaultId]
}

// Toggle a translation on/off
function toggleTranslation(id: number) {
  const idx = activeTranslations.value.indexOf(id)
  if (idx >= 0) {
    activeTranslations.value = activeTranslations.value.filter(x => x !== id)
  } else {
    activeTranslations.value = [...activeTranslations.value, id]
  }
}

// Is a specific translation active?
function isTranslationActive(id: number): boolean {
  return activeTranslations.value.includes(id)
}

// Global: are any translations active?
const showTranslations = computed(() => activeTranslations.value.length > 0)

// Fetch surah list (if not already loaded) + verses
onMounted(async () => {
  initTranslations()
  await quran.fetchSurahs()
  await quran.fetchVerses(surahId.value)

  // Auto-save bookmark when entering a surah
  if (surah.value) {
    saveBookmark(surahId.value, surah.value.nameSimple, 1)
  }
})

// Re-fetch when surah changes (via navigation)
watch(surahId, async (newId) => {
  await quran.fetchVerses(newId)
})

// Navigation helpers
const prevSurah = computed(() => surahId.value > 1 ? surahId.value - 1 : null)
const nextSurah = computed(() => surahId.value < 114 ? surahId.value + 1 : null)

// Revelation place localized
const revelationPlace = computed(() => {
  if (!surah.value) return ''
  return surah.value.revelationPlace === 'makkah' ? t('quran.mecca') : t('quran.medina')
})
</script>

<template>
  <div class="px-4 pt-6 pb-8 space-y-4 max-w-lg mx-auto">
    <!-- Header -->
    <header class="space-y-2">
      <!-- Back link -->
      <NuxtLink
        to="/quran"
        class="inline-flex items-center gap-1 text-sm text-themed-muted hover:text-themed-secondary transition-colors"
      >
        ← {{ t('quran.surahs') }}
      </NuxtLink>

      <div v-if="surah" class="text-center space-y-1">
        <p class="font-arabic text-3xl text-themed-secondary">
          {{ surah.nameArabic }}
        </p>
        <h1 class="text-xl font-semibold">
          {{ surah.nameSimple }}
        </h1>
        <p class="text-sm text-themed-muted">
          {{ surah.translatedName }} · {{ surah.versesCount }} {{ t('quran.verses') }} · {{ revelationPlace }}
        </p>
      </div>
    </header>

    <!-- Translation controls -->
    <div class="flex items-center justify-center gap-2 flex-wrap">
      <button
        v-for="opt in TRANSLATION_OPTIONS"
        :key="opt.id"
        class="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
        :class="isTranslationActive(opt.id)
          ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary-light)]'
          : 'glass-subtle text-themed-faint'"
        @click="toggleTranslation(opt.id)"
      >
        {{ t(opt.labelKey) }}
      </button>
    </div>
    <p v-if="!showTranslations" class="text-[10px] text-themed-faint text-center">
      {{ t('quran.tapArabic') }}
    </p>

    <!-- Bismillah -->
    <div
      v-if="surah?.bismillahPre"
      class="text-center py-4"
    >
      <p class="font-arabic text-2xl text-[var(--color-gold)]" dir="rtl" lang="ar">
        بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
      </p>
      <p class="text-xs text-themed-faint mt-1">
        {{ t('quran.bismillah') }}
      </p>
    </div>

    <!-- Loading -->
    <div v-if="quran.loading.value" class="py-12">
      <LoadingSpinner />
    </div>

    <!-- Error -->
    <div v-else-if="quran.error.value" class="text-center py-8">
      <p class="text-[var(--color-danger)] text-sm">{{ quran.error.value }}</p>
      <GlassButton variant="default" size="sm" class="mt-3" @click="quran.fetchVerses(surahId)">
        {{ t('common.retry') }}
      </GlassButton>
    </div>

    <!-- Verses -->
    <div v-else class="space-y-3">
      <VerseDisplay
        v-for="verse in quran.currentVerses.value"
        :key="verse.verseKey"
        :verse="verse"
        :surah-id="surahId"
        :active-translations="activeTranslations"
        class="animate-fade-in"
      />
    </div>

    <!-- Surah Navigation -->
    <div class="flex justify-between pt-4">
      <NuxtLink
        v-if="prevSurah"
        :to="`/quran/${prevSurah}`"
      >
        <GlassButton variant="default" size="sm">
          ← {{ prevSurah }}
        </GlassButton>
      </NuxtLink>
      <span v-else />

      <NuxtLink
        v-if="nextSurah"
        :to="`/quran/${nextSurah}`"
      >
        <GlassButton variant="default" size="sm">
          {{ nextSurah }} →
        </GlassButton>
      </NuxtLink>
    </div>
  </div>
</template>
