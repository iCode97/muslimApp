<script setup lang="ts">
/**
 * Single Surah view — Arabic text with Turkish + German translations.
 * Saves reading progress as bookmark on verse tap.
 */

const { t } = useI18n()
const route = useRoute()
const quran = useQuran()
const { save: saveBookmark } = useBookmark()

const surahId = computed(() => Number(route.params.surah))

const surah = computed(() => quran.getSurah(surahId.value))

const showTranslations = ref(true)

// Fetch surah list (if not already loaded) + verses
onMounted(async () => {
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
</script>

<template>
  <div class="px-4 pt-6 pb-8 space-y-4 max-w-lg mx-auto">
    <!-- Header -->
    <header class="space-y-2">
      <!-- Back link -->
      <NuxtLink
        to="/quran"
        class="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/60 transition-colors"
      >
        ← {{ t('quran.surahs') }}
      </NuxtLink>

      <div v-if="surah" class="text-center space-y-1">
        <p class="font-arabic text-3xl text-white/80">
          {{ surah.nameArabic }}
        </p>
        <h1 class="text-xl font-semibold">
          {{ surah.nameSimple }}
        </h1>
        <p class="text-sm text-white/40">
          {{ surah.translatedName }} · {{ surah.versesCount }} {{ t('quran.verses') }} · {{ surah.revelationPlace === 'makkah' ? 'Mekka' : 'Medina' }}
        </p>
      </div>
    </header>

    <!-- Translation toggle -->
    <div class="flex items-center justify-center gap-3">
      <GlassButton
        :variant="showTranslations ? 'primary' : 'default'"
        size="sm"
        @click="showTranslations = !showTranslations"
      >
        {{ showTranslations ? '🌐 Übersetzungen an' : '🌐 Übersetzungen aus' }}
      </GlassButton>
    </div>

    <!-- Bismillah -->
    <div
      v-if="surah?.bismillahPre"
      class="text-center py-4"
    >
      <p class="font-arabic text-2xl text-[var(--color-gold)]" dir="rtl" lang="ar">
        بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
      </p>
      <p class="text-xs text-white/30 mt-1">
        Im Namen Allahs, des Allerbarmers, des Barmherzigen
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
        :show-translations="showTranslations"
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
          ← Sure {{ prevSurah }}
        </GlassButton>
      </NuxtLink>
      <span v-else />

      <NuxtLink
        v-if="nextSurah"
        :to="`/quran/${nextSurah}`"
      >
        <GlassButton variant="default" size="sm">
          Sure {{ nextSurah }} →
        </GlassButton>
      </NuxtLink>
    </div>
  </div>
</template>
