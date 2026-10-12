<script setup lang="ts">
/**
 * Reader settings bottom sheet — font sizes, translations, transliteration,
 * word-by-word and auto-scroll. Persisted by useReaderSettings.
 */
import {
  ARABIC_SIZE_MAX,
  ARABIC_SIZE_MIN,
  TRANSLATION_SIZE_MAX,
  TRANSLATION_SIZE_MIN,
} from '~/utils/quran'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ 'update:open': [value: boolean] }>()

const { t } = useI18n()
const reader = useReaderSettings()
const words = useQuranWords()

const TRANSLATION_OPTIONS = [
  { id: 52, labelKey: 'quran.turkishTranslation' },
  { id: 27, labelKey: 'quran.germanTranslation' },
  { id: 20, labelKey: 'quran.englishTranslation' },
] as const

function onRange(key: 'arabicSize' | 'translationSize', event: Event) {
  reader.update({ [key]: Number((event.target as HTMLInputElement).value) })
}
</script>

<template>
  <BottomSheet :open="open" :title="t('reader.title')" @update:open="emit('update:open', $event)">
    <div class="space-y-5 pb-2 max-h-[70vh] overflow-y-auto pr-1">
      <!-- Preview -->
      <div class="glass-subtle rounded-2xl px-4 py-3 space-y-1">
        <p
          class="font-arabic text-right leading-loose text-themed"
          dir="rtl"
          lang="ar"
          :style="{ fontSize: `${reader.settings.value.arabicSize}px` }"
        >
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </p>
        <p class="text-themed-secondary" :style="{ fontSize: `${reader.settings.value.translationSize}px` }">
          {{ t('quran.bismillah') }}
        </p>
      </div>

      <!-- Sizes -->
      <div class="space-y-4">
        <label class="block">
          <span class="flex items-center justify-between text-sm text-themed-secondary">
            {{ t('reader.arabicSize') }}
            <span class="text-xs text-themed-faint tabular-nums">{{ reader.settings.value.arabicSize }} px</span>
          </span>
          <input
            type="range"
            :min="ARABIC_SIZE_MIN"
            :max="ARABIC_SIZE_MAX"
            step="2"
            :value="reader.settings.value.arabicSize"
            class="w-full mt-1 accent-[var(--color-primary)]"
            @input="onRange('arabicSize', $event)"
          >
        </label>
        <label class="block">
          <span class="flex items-center justify-between text-sm text-themed-secondary">
            {{ t('reader.translationSize') }}
            <span class="text-xs text-themed-faint tabular-nums">{{ reader.settings.value.translationSize }} px</span>
          </span>
          <input
            type="range"
            :min="TRANSLATION_SIZE_MIN"
            :max="TRANSLATION_SIZE_MAX"
            step="1"
            :value="reader.settings.value.translationSize"
            class="w-full mt-1 accent-[var(--color-primary)]"
            @input="onRange('translationSize', $event)"
          >
        </label>
      </div>

      <!-- Translations -->
      <div>
        <p class="text-[11px] font-semibold text-themed-muted uppercase tracking-wider mb-2">
          {{ t('reader.translations') }}
        </p>
        <div class="space-y-2">
          <div v-for="opt in TRANSLATION_OPTIONS" :key="opt.id" class="flex items-center justify-between gap-3">
            <span :id="`reader-tr-${opt.id}`" class="text-sm text-themed-secondary">{{ t(opt.labelKey) }}</span>
            <ToggleSwitch
              :model-value="reader.isTranslationActive(opt.id)"
              :aria-labelledby="`reader-tr-${opt.id}`"
              size="sm"
              @update:model-value="reader.toggleTranslation(opt.id)"
            />
          </div>
        </div>
      </div>

      <!-- Switches -->
      <div class="space-y-3">
        <div class="flex items-center justify-between gap-3">
          <span id="reader-translit" class="text-sm text-themed-secondary">{{ t('reader.transliteration') }}</span>
          <ToggleSwitch
            :model-value="reader.settings.value.showTransliteration"
            aria-labelledby="reader-translit"
            size="sm"
            @update:model-value="reader.update({ showTransliteration: $event })"
          />
        </div>

        <div>
          <div class="flex items-center justify-between gap-3">
            <span id="reader-wbw" class="text-sm text-themed-secondary">{{ t('reader.wordByWord') }}</span>
            <ToggleSwitch
              :model-value="reader.settings.value.wordByWord"
              aria-labelledby="reader-wbw"
              size="sm"
              @update:model-value="reader.update({ wordByWord: $event })"
            />
          </div>
          <p class="text-xs text-themed-faint mt-1">
            {{ t('reader.wordByWordHint') }}
            <template v-if="words.isFallback.value"> {{ t('reader.wordFallback') }}</template>
          </p>
        </div>

        <div class="flex items-center justify-between gap-3">
          <span id="reader-autoscroll" class="text-sm text-themed-secondary">{{ t('reader.autoScroll') }}</span>
          <ToggleSwitch
            :model-value="reader.settings.value.autoScroll"
            aria-labelledby="reader-autoscroll"
            size="sm"
            @update:model-value="reader.update({ autoScroll: $event })"
          />
        </div>
      </div>

      <GlassButton variant="default" size="sm" @click="reader.reset()">
        {{ t('reader.reset') }}
      </GlassButton>
    </div>
  </BottomSheet>
</template>
