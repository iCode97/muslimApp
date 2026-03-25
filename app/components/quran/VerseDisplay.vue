<script setup lang="ts">
import type { Verse } from '~/composables/useQuran'

const { t } = useI18n()

interface Props {
  verse: Verse
  surahId: number
  activeTranslations?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  activeTranslations: () => [],
})

const { save } = useBookmark()

// Per-verse override: when user taps Arabic text, show translations for this verse only
const verseOverride = ref(false)

// Save bookmark when user taps on verse number
function handleBookmark() {
  save(props.surahId, '', props.verse.verseNumber)
}

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
</script>

<template>
  <div
    class="glass-subtle px-4 py-4 space-y-3 transition-all duration-200"
  >
    <!-- Verse number badge + bookmark -->
    <div class="flex items-start justify-between">
      <button
        class="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary-light)] text-xs font-semibold shrink-0 hover:bg-[var(--color-primary)]/30 transition-colors"
        @click="handleBookmark"
      >
        {{ verse.verseNumber }}
      </button>
    </div>

    <!-- Arabic text (RTL) — tappable to toggle per-verse translations -->
    <p
      v-if="verse.textUthmani"
      class="font-arabic text-2xl leading-loose text-themed text-right cursor-pointer hover:text-[var(--color-primary-light)] transition-colors duration-200"
      dir="rtl"
      lang="ar"
      @click="toggleVerseTranslations"
    >
      {{ verse.textUthmani }}
    </p>

    <!-- Translations -->
    <Transition name="slide-fade">
      <div v-if="visibleTranslations.length > 0" class="space-y-2 pt-2 border-t border-[var(--glass-border)]">
        <div v-for="def in visibleTranslations" :key="def.id">
          <span class="text-[10px] tracking-wider font-medium text-themed-secondary uppercase">{{ t(def.labelKey) }}</span>
          <span class="text-[10px] text-themed-faint ml-1.5">{{ def.source }}</span>
          <p class="text-sm text-themed-secondary leading-relaxed mt-0.5">
            {{ getTranslation(def.id) }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
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
