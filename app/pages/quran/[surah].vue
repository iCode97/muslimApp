<script setup lang="ts">
/**
 * Single Surah view — Arabic text with Turkish, German & English translations.
 * Default translation matches app language; others can be toggled on.
 * Tapping Arabic text toggles per-verse translation visibility.
 */

import type { Verse } from '~/composables/useQuran'
import { parseVerseTarget } from '~/utils/quran'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const quran = useQuran()
const { save: saveBookmark } = useBookmark()
const progress = useProgress('quran', 114)
const favorites = useFavorites()
const reader = useReaderSettings()
const audio = useQuranAudio()
const wordApi = useQuranWords()
const translit = useQuranTransliteration()

const surahId = computed(() => Number(route.params.surah))

const surah = computed(() => quran.getSurah(surahId.value))

// useQuran exposes readonly state; VerseDisplay takes the plain Verse shape.
const verses = computed(() => quran.currentVerses.value as unknown as Verse[])

// Available translation options (quick toggles; full control lives in the settings sheet)
const TRANSLATION_OPTIONS = [
  { key: 'tr', id: 52, labelKey: 'quran.turkishTranslation' },
  { key: 'de', id: 27, labelKey: 'quran.germanTranslation' },
  { key: 'en', id: 20, labelKey: 'quran.englishTranslation' },
] as const

const activeTranslations = reader.activeTranslations
const showTranslations = computed(() => activeTranslations.value.length > 0)

const settingsOpen = ref(false)
const tafsirOpen = ref(false)
const tafsirKey = ref<string | null>(null)
function openTafsir(verse: Verse) {
  tafsirKey.value = verse.verseKey
  tafsirOpen.value = true
}

const audioActive = computed(() => audio.surah.value !== null)

// ----- loading: verses first, then the optional per-surah extras -----
async function loadExtras() {
  const id = surahId.value
  if (reader.settings.value.showTransliteration) await translit.load(id)
  if (reader.settings.value.wordByWord) await wordApi.load(id)
}

async function loadSurah(id: number) {
  stopObserving()
  await quran.fetchVerses(id)
  observeVerses()
  await afterVersesLoaded()
  void loadExtras()
}

onMounted(async () => {
  reader.load()
  audio.loadSettings()
  progress.load()
  favorites.load()
  window.addEventListener('wheel', markUserScrolled, { passive: true })
  window.addEventListener('touchstart', markUserScrolled, { passive: true })
  await quran.fetchSurahs()
  await loadSurah(surahId.value)
})

onBeforeUnmount(() => {
  stopObserving()
  window.removeEventListener('wheel', markUserScrolled)
  window.removeEventListener('touchstart', markUserScrolled)
  clearTimeout(flashTimer)
})

// Re-fetch when surah changes (via navigation)
watch(surahId, id => loadSurah(id))

// Load extras when they get switched on (or the language changes word translations)
watch(
  () => [reader.settings.value.showTransliteration, reader.settings.value.wordByWord, wordApi.wbwLang.value] as const,
  () => { if (verses.value.length) void loadExtras() },
)

// Stop playback when leaving the Quran area — the mini player only exists on Quran routes.
onBeforeRouteLeave((to) => {
  if (!to.path.startsWith('/quran')) audio.pause()
})

// ----- deep links: /quran/2?verse=255 or /quran/2#255 -----
const flashVerse = ref<number | null>(null)
let flashTimer: ReturnType<typeof setTimeout> | undefined
let userScrolled = false
function markUserScrolled() { userScrolled = true }

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

function scrollToVerse(n: number, smooth = true): boolean {
  const el = document.getElementById(`v${n}`)
  if (!el) return false
  el.scrollIntoView({ behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto', block: 'center' })
  return true
}

async function jumpToTarget(): Promise<boolean> {
  const target = parseVerseTarget(route.query.verse, route.hash)
  const max = surah.value?.versesCount ?? verses.value.length
  if (!target || (max && target > max)) return false
  await nextTick()
  userScrolled = false
  if (!scrollToVerse(target, false)) return false
  flashVerse.value = target
  clearTimeout(flashTimer)
  flashTimer = setTimeout(() => { flashVerse.value = null }, 2500)
  // Extras (transliteration, word chips) change heights after the first scroll — correct once.
  setTimeout(() => { if (!userScrolled) scrollToVerse(target, false) }, 700)
  return true
}

async function afterVersesLoaded() {
  if (!verses.value.length) return
  if (await jumpToTarget()) return
  // Playback is running on this surah (e.g. followed from the previous one) → show it.
  if (audio.surah.value === surahId.value && audio.verse.value && reader.settings.value.autoScroll) {
    await nextTick()
    scrollToVerse(audio.verse.value)
  }
}

// Same-page deep links (e.g. from the bookmark card or search while already on the surah)
watch(() => [route.query.verse, route.hash], () => { void jumpToTarget() })

// ----- audio ↔ reader sync -----
watch(() => audio.verse.value, (v) => {
  if (v === null || audio.surah.value !== surahId.value) return
  if (!reader.settings.value.autoScroll || !audio.isPlaying.value && !audio.loading.value) return
  scrollToVerse(v)
})

// Continue-to-next-surah: follow the recitation when it rolls over to the next surah
watch(() => audio.surah.value, (next, prev) => {
  if (next === null || prev !== surahId.value || next === surahId.value) return
  if (reader.settings.value.autoScroll && audio.isPlaying.value) {
    router.push(`/quran/${next}`)
  }
})

const isCurrentVerse = (n: number) => audio.surah.value === surahId.value && audio.verse.value === n
const isPlayingVerse = (n: number) => isCurrentVerse(n) && audio.isPlaying.value

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
  <div class="app-container pt-6 space-y-4 max-w-3xl mx-auto" :class="audioActive ? 'pb-36' : 'pb-8'">
    <!-- Header -->
    <header class="space-y-2">
      <div class="flex items-center justify-between">
        <!-- Back link -->
        <NuxtLink
          to="/quran"
          class="inline-flex items-center gap-1 text-sm text-themed-muted hover:text-themed-secondary transition-colors"
        >
          <span aria-hidden="true">←</span> {{ t('quran.surahs') }}
        </NuxtLink>

        <button
          type="button"
          class="w-9 h-9 flex items-center justify-center rounded-full glass-subtle text-themed-secondary hover:text-themed transition-colors"
          :aria-label="t('reader.open')"
          aria-haspopup="dialog"
          @click="settingsOpen = true"
        >
          <AppIcon name="settings" :size="18" />
        </button>
      </div>

      <div v-if="surah" class="text-center space-y-1">
        <p class="font-arabic text-3xl text-themed-secondary" dir="rtl" lang="ar">
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

    <!-- About this surah -->
    <QuranSurahInfo v-if="surah" :surah-id="surahId" />

    <!-- Translation controls -->
    <div role="group" :aria-label="t('a11y.translations')" class="flex items-center justify-center gap-2 flex-wrap">
      <button
        v-for="opt in TRANSLATION_OPTIONS"
        :key="opt.id"
        type="button"
        :aria-pressed="reader.isTranslationActive(opt.id)"
        class="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
        :class="reader.isTranslationActive(opt.id)
          ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary-light)]'
          : 'glass-subtle text-themed-faint'"
        @click="reader.toggleTranslation(opt.id)"
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

    <p v-if="reader.settings.value.wordByWord && wordApi.error.value" class="text-xs text-[var(--color-danger)] text-center" role="alert">
      {{ wordApi.error.value }}
    </p>
    <p v-if="reader.settings.value.wordByWord && wordApi.isFallback.value" class="text-[11px] text-themed-faint text-center">
      {{ t('reader.wordFallback') }}
    </p>

    <!-- Verses -->
    <div v-if="!quran.loading.value && !quran.error.value" ref="versesRef" class="space-y-3">
      <VerseDisplay
        v-for="verse in verses"
        :key="verse.verseKey"
        :verse="verse"
        :surah-id="surahId"
        :active-translations="activeTranslations"
        :arabic-size="reader.settings.value.arabicSize"
        :translation-size="reader.settings.value.translationSize"
        :transliteration="reader.settings.value.showTransliteration ? translit.forVerse(surahId, verse.verseKey) : ''"
        :word-by-word="reader.settings.value.wordByWord"
        :words="reader.settings.value.wordByWord ? wordApi.wordsFor(surahId, verse.verseKey) : []"
        :words-fallback="wordApi.isFallback.value"
        :current="isCurrentVerse(verse.verseNumber)"
        :playing="isPlayingVerse(verse.verseNumber)"
        :flash="flashVerse === verse.verseNumber"
        class="animate-fade-in"
        @play="audio.toggleVerse(surahId, verse.verseNumber)"
        @tafsir="openTafsir(verse)"
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

    <QuranMiniPlayer />
    <QuranReaderSettings v-model:open="settingsOpen" />
    <QuranTafsirSheet v-model:open="tafsirOpen" :verse-key="tafsirKey" />
  </div>
</template>
