<script setup lang="ts">
import type { Verse } from '~/composables/useQuran'

interface Props {
  verse: Verse
  surahId: number
  showTranslations?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showTranslations: true,
})

const { save } = useBookmark()

// Save bookmark when user taps on a verse
function handleBookmark() {
  save(props.surahId, '', props.verse.verseNumber)
}

// Get translation by language
function getTranslation(langId: number): string {
  const t = props.verse.translations.find(tr => tr.id === langId)
  return t?.text ?? ''
}

// Turkish translation (Elmalılı Hamdi)
const turkishText = computed(() => getTranslation(52))
// German translation (Bubenheim)
const germanText = computed(() => getTranslation(27))
</script>

<template>
  <div
    class="glass-subtle px-4 py-4 space-y-3 hover:bg-white/5 transition-all duration-200"
    @click="handleBookmark"
  >
    <!-- Verse number badge -->
    <div class="flex items-start justify-between">
      <div class="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary-light)] text-xs font-semibold shrink-0">
        {{ verse.verseNumber }}
      </div>
    </div>

    <!-- Arabic text (RTL) -->
    <p
      v-if="verse.textUthmani"
      class="font-arabic text-2xl leading-loose text-white/90 text-right"
      dir="rtl"
      lang="ar"
    >
      {{ verse.textUthmani }}
    </p>

    <!-- Translations -->
    <div v-if="showTranslations" class="space-y-2 pt-2 border-t border-white/5">
      <!-- Turkish (Elmalılı Hamdi) -->
      <div v-if="turkishText">
        <span class="text-[10px] uppercase tracking-wider text-[var(--color-primary-light)]/60 font-medium">Türkçe</span>
        <p class="text-sm text-white/60 leading-relaxed mt-0.5">
          {{ turkishText }}
        </p>
      </div>

      <!-- German (Bubenheim) -->
      <div v-if="germanText">
        <span class="text-[10px] uppercase tracking-wider text-[var(--color-gold)]/60 font-medium">Deutsch</span>
        <p class="text-sm text-white/60 leading-relaxed mt-0.5">
          {{ germanText }}
        </p>
      </div>
    </div>
  </div>
</template>
