<script setup lang="ts">
/**
 * Single Surah view — Arabic text with Turkish, German & English translations.
 * Default translation matches app language; others can be toggled on.
 * Tapping Arabic text toggles per-verse translation visibility.
 */

import type { Verse } from '~/composables/useQuran'

const { t, locale } = useI18n()
const route = useRoute()
const quran = useQuran()
const { save: saveBookmark } = useBookmark()
const progress = useProgress('quran', 114)
const favorites = useFavorites()

const surahId = computed(() => Number(route.params.surah))

const surah = computed(() => quran.getSurah(surahId.value))

// useQuran exposes readonly state; VerseDisplay takes the plain Verse shape.
const verses = computed(() => quran.currentVerses.value as unknown as Verse[])

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
  progress.load()
  favorites.load()
  await quran.fetchSurahs()
  await quran.fetchVerses(surahId.value)
  observeVerses()
})

onBeforeUnmount(() => stopObserving())

// Re-fetch when surah changes (via navigation)
watch(surahId, async (newId) => {
  stopObserving()
  await quran.fetchVerses(newId)
  observeVerses()
})

/**
 * Reading bookmark: merely opening a surah must NOT move the bookmark.
 * It is only updated once a verse has stayed (mostly) in view for DWELL_MS,
 * i.e. the user is actually reading it.
 */
const DWELL_MS = 2000
const versesRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null
const dwellTimers = new Map<Element, ReturnType<typeof setTimeout>>()

function stopObserving() {
  observer?.disconnect()
  observer = null
  dwellTimers.forEach(clearTimeout)
  dwellTimers.clear()
}

function observeVerses() {
  if (!import.meta.client || typeof IntersectionObserver === 'undefined') return
  stopObserving()
  nextTick(() => {
    const root = versesRef.value
    if (!root) return
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement
        if (entry.isIntersecting) {
          if (dwellTimers.has(el)) continue
          dwellTimers.set(el, setTimeout(() => {
            dwellTimers.delete(el)
            const verseNumber = Number(el.dataset.verseNumber)
            if (!verseNumber || Number(el.dataset.surahId) !== surahId.value || !surah.value) return
            saveBookmark(surahId.value, surah.value.nameSimple, verseNumber)
          }, DWELL_MS))
        }
        else {
          const timer = dwellTimers.get(el)
          if (timer) clearTimeout(timer)
          dwellTimers.delete(el)
        }
      }
    }, { threshold: 0.6 })
    root.querySelectorAll('[data-verse-number]').forEach(el => observer!.observe(el))
  })
}

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
  <div class="app-container pt-6 pb-8 space-y-4 max-w-3xl mx-auto">
    <!-- Header -->
    <header class="space-y-2">
      <!-- Back link -->
      <NuxtLink
        to="/quran"
        class="inline-flex items-center gap-1 text-sm text-themed-muted hover:text-themed-secondary transition-colors"
      >
        <span aria-hidden="true">←</span> {{ t('quran.surahs') }}
      </NuxtLink>

      <div v-if="surah" class="text-center space-y-1">
        <p class="font-arabic text-3xl text-themed-secondary" lang="ar">
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

    <!-- Audio recitation -->
    <QuranAudioPlayer :surah-id="surahId" />

    <!-- Translation controls -->
    <div role="group" :aria-label="t('a11y.translations')" class="flex items-center justify-center gap-2 flex-wrap">
      <button
        v-for="opt in TRANSLATION_OPTIONS"
        :key="opt.id"
        type="button"
        :aria-pressed="isTranslationActive(opt.id)"
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
    <div v-if="quran.loading.value" class="space-y-4" role="status" :aria-label="t('common.loading')">
      <div v-for="i in 5" :key="i" class="glass p-4 space-y-3">
        <div class="flex justify-end">
          <div class="skeleton skeleton-text w-3/4" style="height: 1.5rem" />
        </div>
        <div class="skeleton skeleton-text w-full" />
        <div class="skeleton skeleton-text w-2/3" />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="quran.error.value" class="text-center py-8">
      <p class="text-[var(--color-danger)] text-sm" role="alert">{{ quran.error.value }}</p>
      <GlassButton variant="default" size="sm" class="mt-3" @click="quran.fetchVerses(surahId)">
        {{ t('common.retry') }}
      </GlassButton>
    </div>

    <!-- Verses -->
    <div v-else ref="versesRef" class="space-y-3">
      <VerseDisplay
        v-for="verse in verses"
        :key="verse.verseKey"
        :verse="verse"
        :surah-id="surahId"
        :active-translations="activeTranslations"
        class="animate-fade-in"
      />
    </div>

    <!-- Mark as read button -->
    <div v-if="surah && !quran.loading.value && !quran.error.value" class="flex justify-center pt-2">
      <button
        type="button"
        :aria-pressed="progress.isRead(surahId)"
        :class="[
          'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
          progress.isRead(surahId)
            ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary-light)]'
            : 'glass-subtle text-themed-secondary hover:text-themed'
        ]"
        @click="progress.toggleRead(surahId)"
      >
        <span aria-hidden="true">{{ progress.isRead(surahId) ? '✓' : '○' }}</span>
        {{ progress.isRead(surahId) ? t('common.read') : t('common.markAsRead') }}
      </button>
    </div>

    <!-- Surah Navigation -->
    <div class="flex justify-between pt-4">
      <NuxtLink
        v-if="prevSurah"
        :to="`/quran/${prevSurah}`"
        :aria-label="`${t('a11y.prevSurah')}: ${prevSurah}`"
        class="inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 active:scale-[0.97] glass hover:brightness-110 px-3 py-1.5 text-sm"
      >
        <span aria-hidden="true">← {{ prevSurah }}</span>
      </NuxtLink>
      <span v-else />

      <NuxtLink
        v-if="nextSurah"
        :to="`/quran/${nextSurah}`"
        :aria-label="`${t('a11y.nextSurah')}: ${nextSurah}`"
        class="inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 active:scale-[0.97] glass hover:brightness-110 px-3 py-1.5 text-sm"
      >
        <span aria-hidden="true">{{ nextSurah }} →</span>
      </NuxtLink>
    </div>
  </div>
</template>
