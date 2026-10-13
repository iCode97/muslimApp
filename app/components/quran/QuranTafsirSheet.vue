<script setup lang="ts">
/**
 * Tafsir bottom sheet for a single verse. The commentary text comes from quran.com as HTML and is
 * sanitized (whitelist, no attributes) before it is rendered with v-html.
 * quran.com offers no German or Turkish tafsir — only English and Arabic sources.
 */
import { TAFSIRS } from '~/utils/quran'
import type { TafsirEntry } from '~/composables/useQuranExtras'

const props = defineProps<{
  open: boolean
  /** e.g. "2:255" */
  verseKey: string | null
}>()
const emit = defineEmits<{ 'update:open': [value: boolean] }>()

const { t } = useI18n()
const reader = useReaderSettings()
const tafsirApi = useQuranTafsir()

const entry = ref<TafsirEntry | null>(null)

const selected = computed(() => TAFSIRS.find(s => s.id === reader.settings.value.tafsirId) ?? TAFSIRS[0]!)

async function refresh() {
  if (!props.open || !props.verseKey) return
  entry.value = null
  entry.value = await tafsirApi.load(selected.value.id, props.verseKey)
}

watch(() => [props.open, props.verseKey, selected.value.id] as const, refresh, { immediate: true })

function choose(id: number) {
  reader.update({ tafsirId: id })
}
</script>

<template>
  <BottomSheet
    :open="open"
    :title="`${t('tafsir.title')} · ${verseKey ?? ''}`"
    @update:open="emit('update:open', $event)"
  >
    <div class="space-y-3 pb-2">
      <!-- Source selector -->
      <div role="group" :aria-label="t('tafsir.select')" class="flex flex-wrap gap-1.5">
        <button
          v-for="s in TAFSIRS"
          :key="s.id"
          type="button"
          class="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
          :class="s.id === selected.id
            ? 'bg-[var(--color-primary)]/25 text-[var(--color-primary-light)]'
            : 'glass-subtle text-themed-secondary hover:text-themed'"
          :aria-pressed="s.id === selected.id"
          @click="choose(s.id)"
        >
          {{ s.name }}
          <span class="opacity-60 uppercase">· {{ s.lang }}</span>
        </button>
      </div>

      <p class="text-xs text-themed-faint">
        {{ t('tafsir.noLocalLang') }}
      </p>

      <!-- Content -->
      <div class="max-h-[55vh] overflow-y-auto pe-1" tabindex="0" :aria-label="`${t('tafsir.title')} ${verseKey ?? ''}`">
        <div v-if="tafsirApi.loading.value" class="py-8 flex justify-center" role="status" :aria-label="t('common.loading')">
          <LoadingSpinner size="sm" />
        </div>

        <div v-else-if="tafsirApi.error.value" class="py-6 text-center">
          <p class="text-sm text-[var(--color-danger)]" role="alert">{{ tafsirApi.error.value }}</p>
          <GlassButton variant="default" size="sm" class="mt-3" @click="refresh">
            {{ t('common.retry') }}
          </GlassButton>
        </div>

        <template v-else-if="entry">
          <p v-if="!entry.html" class="py-6 text-center text-sm text-themed-muted">
            {{ t('tafsir.empty') }}
          </p>
          <!-- eslint-disable-next-line vue/no-v-html -- sanitized by sanitizeQuranHtml (whitelist, no attributes) -->
          <div
            v-else
            class="tafsir-content text-sm text-themed-secondary leading-relaxed"
            :dir="selected.lang === 'ar' ? 'rtl' : 'ltr'"
            :lang="selected.lang"
            v-html="entry.html"
          />
          <p class="mt-4 text-[11px] text-themed-faint">
            {{ t('tafsir.source', { name: entry.name || selected.name }) }}
          </p>
        </template>
      </div>
    </div>
  </BottomSheet>
</template>

<style scoped>
.tafsir-content :deep(h2),
.tafsir-content :deep(h3),
.tafsir-content :deep(h4) {
  font-weight: 600;
  color: var(--color-primary-light);
  margin: 1rem 0 0.375rem;
}
.tafsir-content :deep(p) { margin: 0 0 0.75rem; }
.tafsir-content :deep(ul) { list-style: disc; padding-inline-start: 1.25rem; margin-bottom: 0.75rem; }
.tafsir-content :deep(ol) { list-style: decimal; padding-inline-start: 1.25rem; margin-bottom: 0.75rem; }
.tafsir-content :deep(blockquote) {
  border-inline-start: 2px solid var(--color-primary);
  padding-inline-start: 0.75rem;
  margin: 0 0 0.75rem;
  opacity: 0.9;
}
.tafsir-content[lang='ar'] { font-family: var(--font-arabic, inherit); font-size: 1.125rem; line-height: 2; }
</style>
