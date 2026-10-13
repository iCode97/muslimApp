<script setup lang="ts">
import type { Verse } from '~/composables/useQuran'
import type { QuranWord } from '~/composables/useQuranExtras'

const { t } = useI18n()

interface Props {
  verse: Verse
  surahId: number
  activeTranslations?: number[]
  /** Arabic font size in px. */
  arabicSize?: number
  /** Translation font size in px. */
  translationSize?: number
  /** Transliteration line (empty = hidden). */
  transliteration?: string
  /** Render the Arabic as tappable word chips (when words are available). */
  wordByWord?: boolean
  words?: QuranWord[]
  /** Word translations are shown in English because the app language has none. */
  wordsFallback?: boolean
  /** The recitation is currently on this verse (playing or paused). */
  current?: boolean
  /** The recitation on this verse is audible right now. */
  playing?: boolean
  /** Briefly highlighted after a deep-link jump. */
  flash?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  activeTranslations: () => [],
  arabicSize: 28,
  translationSize: 14,
  transliteration: '',
  wordByWord: false,
  words: () => [],
  wordsFallback: false,
  current: false,
  playing: false,
  flash: false,
})

const emit = defineEmits<{
  play: []
  tafsir: []
}>()

const { save } = useBookmark()
const favorites = useFavorites()
const wordApi = useQuranWords()

// Per-verse override: when user taps Arabic text, show translations for this verse only
const verseOverride = ref(false)

// Save bookmark when user taps on verse number
function handleBookmark() {
  save(props.surahId, '', props.verse.verseNumber)
}

const hintId = computed(() => `verse-hint-${props.verse.verseKey.replace(':', '-')}`)

// Toggle per-verse translations when tapping Arabic text
function toggleVerseTranslations() {
  verseOverride.value = !verseOverride.value
  handleBookmark()
}

// Translation definitions with their display properties
const TRANSLATION_DEFS = [
  { id: 52, labelKey: 'quran.turkishTranslation', source: 'Elmalılı Hamdi Yazır' },
  { id: 27, labelKey: 'quran.germanTranslation', source: 'Bubenheim & Elyas' },
  { id: 20, labelKey: 'quran.englishTranslation', source: 'Sahih International' },
] as const

// Get translation text by resource ID
function getTranslation(langId: number): string {
  const tr = props.verse.translations.find(tr => tr.id === langId)
  return tr?.text ?? ''
}

// Which translations to actually show for this verse
const visibleTranslations = computed(() => {
  const globalActive = props.activeTranslations.length > 0
  // If global translations are off but per-verse override is on, show all available
  if (verseOverride.value && !globalActive) {
    return TRANSLATION_DEFS.filter(d => getTranslation(d.id))
  }
  // If global translations are on and user tapped Arabic → hide for this verse
  if (verseOverride.value && globalActive) {
    return []
  }
  // Normal: show globally active translations
  if (!verseOverride.value && globalActive) {
    return TRANSLATION_DEFS.filter(d => props.activeTranslations.includes(d.id) && getTranslation(d.id))
  }
  // Global off, no override → no translations
  return []
})

// Reset per-verse override when global translations change
watch(() => props.activeTranslations, () => {
  verseOverride.value = false
}, { deep: true })

// ----- word by word -----
const showWords = computed(() => props.wordByWord && props.words.length > 0)
const selectedPosition = ref<number | null>(null)
const selectedWord = computed(() => props.words.find(w => w.position === selectedPosition.value && !w.isEnd) ?? null)

function onWord(word: QuranWord) {
  selectedPosition.value = word.position
  wordApi.playWord(word.audio)
}

watch(() => props.wordByWord, () => { selectedPosition.value = null })
</script>

<template>
  <article
    :id="`v${verse.verseNumber}`"
    class="glass-subtle px-4 py-4 space-y-3 transition-all duration-300 scroll-mt-24"
    :class="[
      current ? 'ring-1 ring-[var(--color-primary)] bg-[var(--color-primary)]/10' : '',
      flash ? 'ring-2 ring-[var(--color-gold)]' : '',
    ]"
    :aria-current="current ? 'true' : undefined"
    :data-verse-number="verse.verseNumber"
    :data-surah-id="surahId"
  >
    <!-- Verse number badge + actions -->
    <div class="flex items-center justify-between gap-2">
      <button
        type="button"
        class="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary-light)] text-xs font-semibold shrink-0 hover:bg-[var(--color-primary)]/30 transition-colors"
        :aria-label="t('a11y.setBookmark', { n: verse.verseNumber })"
        @click="handleBookmark"
      >
        {{ verse.verseNumber }}
      </button>

      <div class="flex items-center gap-1">
        <button
          type="button"
          class="h-8 px-3 flex items-center justify-center rounded-full text-xs font-medium text-themed-secondary hover:text-themed glass-subtle transition-colors"
          :aria-label="t('tafsir.openFor', { n: verse.verseNumber })"
          @click="emit('tafsir')"
        >
          {{ t('tafsir.title') }}
        </button>
        <button
          type="button"
          :class="[
            'w-8 h-8 flex items-center justify-center rounded-full transition-colors',
            playing ? 'bg-[var(--color-primary)] text-white' : 'text-themed-muted hover:text-themed',
          ]"
          :aria-pressed="playing"
          :aria-label="playing ? t('audio.pauseVerse', { n: verse.verseNumber }) : t('audio.playVerse', { n: verse.verseNumber })"
          @click="emit('play')"
        >
          <AppIcon :name="playing ? 'pause' : 'play'" :size="16" :stroke="2" />
        </button>
        <button
          type="button"
          :aria-pressed="favorites.isFavorite(verse.verseKey)"
          :class="[
            'w-8 h-8 flex items-center justify-center rounded-full transition-colors',
            favorites.isFavorite(verse.verseKey)
              ? 'text-red-400'
              : 'text-themed-faint hover:text-red-400',
          ]"
          :aria-label="t('favorites.title')"
          @click="favorites.toggle(verse, surahId)"
        >
          <AppIcon name="heart" :size="18" />
        </button>
      </div>
    </div>

    <!-- Word-by-word chips -->
    <div v-if="showWords" class="space-y-2">
      <div
        class="flex flex-wrap gap-x-1.5 gap-y-2 font-arabic leading-loose text-themed"
        dir="rtl"
        lang="ar"
        role="group"
        :aria-label="t('reader.wordByWord')"
        :style="{ fontSize: `${arabicSize}px` }"
      >
        <template v-for="w in words" :key="w.position">
          <span v-if="w.isEnd" class="text-[var(--color-gold)] px-1" aria-hidden="true">{{ w.text }}</span>
          <button
            v-else
            type="button"
            class="rounded-lg px-1.5 transition-colors hover:bg-[var(--color-primary)]/15 focus-visible:bg-[var(--color-primary)]/15"
            :class="selectedPosition === w.position ? 'bg-[var(--color-primary)]/25 text-[var(--color-primary-light)]' : ''"
            :aria-pressed="selectedPosition === w.position"
            :aria-label="`${w.translation || w.text}`"
            @click="onWord(w)"
          >
            {{ w.text }}
          </button>
        </template>
      </div>

      <div
        class="min-h-[2.75rem] rounded-xl bg-[var(--color-primary)]/10 px-3 py-2 text-sm"
        aria-live="polite"
      >
        <template v-if="selectedWord">
          <p class="font-medium text-themed" dir="auto">
            {{ selectedWord.translation || '–' }}
            <span v-if="wordsFallback" class="ms-1 text-[10px] uppercase text-themed-faint">EN</span>
          </p>
          <p v-if="selectedWord.transliteration" class="text-xs text-themed-muted italic">
            {{ selectedWord.transliteration }}
          </p>
        </template>
        <p v-else class="text-xs text-themed-faint">
          {{ t('reader.wordTapHint') }}
        </p>
      </div>
    </div>

    <!-- Arabic text (RTL) — tappable to toggle per-verse translations -->
    <p
      v-else-if="verse.textUthmani"
      class="font-arabic leading-loose text-themed text-end cursor-pointer hover:text-[var(--color-primary-light)] transition-colors duration-200"
      dir="rtl"
      lang="ar"
      role="button"
      tabindex="0"
      :style="{ fontSize: `${arabicSize}px` }"
      :aria-expanded="visibleTranslations.length > 0"
      :aria-describedby="hintId"
      @click="toggleVerseTranslations"
      @keydown.enter.prevent="toggleVerseTranslations"
      @keydown.space.prevent="toggleVerseTranslations"
    >
      {{ verse.textUthmani }}
    </p>
    <span :id="hintId" class="sr-only">{{ t('a11y.toggleVerseTranslation', { n: verse.verseNumber }) }}</span>

    <!-- Transliteration -->
    <p
      v-if="transliteration"
      class="text-themed-muted italic leading-relaxed"
      lang="en"
      dir="ltr"
      :style="{ fontSize: `${translationSize}px` }"
    >
      {{ transliteration }}
    </p>

    <!-- Translations -->
    <Transition name="slide-fade">
      <div v-if="visibleTranslations.length > 0" class="space-y-2 pt-2 border-t border-[var(--glass-border)]">
        <div v-for="def in visibleTranslations" :key="def.id">
          <span class="text-[10px] tracking-wider font-medium text-themed-secondary uppercase">{{ t(def.labelKey) }}</span>
          <span class="text-[10px] text-themed-faint ms-1.5">{{ def.source }}</span>
          <p class="text-themed-secondary leading-relaxed mt-0.5" :style="{ fontSize: `${translationSize}px` }" dir="auto">
            {{ getTranslation(def.id) }}
          </p>
        </div>
      </div>
    </Transition>
  </article>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
