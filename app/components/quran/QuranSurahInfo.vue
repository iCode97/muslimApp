<script setup lang="ts">
/**
 * "About this surah" — expandable chapter info (quran.com), sanitized, with source.
 * Loaded lazily on first expand.
 */
import type { ChapterInfo } from '~/composables/useQuranExtras'

const props = defineProps<{ surahId: number }>()

const { t, locale } = useI18n()
const infoApi = useQuranChapterInfo()

const expanded = ref(false)
const info = ref<ChapterInfo | null>(null)
const panelId = useId()

async function load() {
  info.value = await infoApi.load(props.surahId)
}

async function toggle() {
  expanded.value = !expanded.value
  if (expanded.value && !info.value) await load()
}

// New surah or language → collapse and drop the old text
watch(() => [props.surahId, locale.value], () => {
  expanded.value = false
  info.value = null
})
</script>

<template>
  <GlassCard padding="md">
    <button
      type="button"
      class="w-full flex items-center justify-between gap-2 text-start"
      :aria-expanded="expanded"
      :aria-controls="panelId"
      @click="toggle"
    >
      <span class="text-sm font-medium text-themed">{{ t('quran.aboutSurah') }}</span>
      <AppIcon :name="expanded ? 'chevronUp' : 'chevronDown'" :size="16" class="text-themed-muted" />
    </button>

    <div v-if="expanded" :id="panelId" class="mt-3 pt-3 border-t border-[var(--glass-border)]">
      <div v-if="infoApi.loading.value" class="py-4 flex justify-center" role="status" :aria-label="t('common.loading')">
        <LoadingSpinner size="sm" />
      </div>

      <div v-else-if="infoApi.error.value" class="text-center py-2">
        <p class="text-sm text-[var(--color-danger)]" role="alert">{{ infoApi.error.value }}</p>
        <GlassButton variant="default" size="sm" class="mt-2" @click="load">
          {{ t('common.retry') }}
        </GlassButton>
      </div>

      <template v-else-if="info">
        <p v-if="infoApi.isFallback(info)" class="text-xs text-themed-faint mb-2">
          {{ t('quran.infoFallback') }}
        </p>
        <!-- eslint-disable-next-line vue/no-v-html -- sanitized by sanitizeQuranHtml (whitelist, no attributes) -->
        <div
          v-if="info.html"
          class="info-content text-sm text-themed-secondary leading-relaxed max-h-[50vh] overflow-y-auto pe-1"
          lang="en"
          tabindex="0"
          :aria-label="t('quran.aboutSurah')"
          v-html="info.html"
        />
        <p v-if="info.source" class="mt-3 text-[11px] text-themed-faint">
          {{ t('quran.infoSource', { source: info.source }) }}
        </p>
      </template>
    </div>
  </GlassCard>
</template>

<style scoped>
.info-content :deep(h2),
.info-content :deep(h3),
.info-content :deep(h4) {
  font-weight: 600;
  color: var(--color-primary-light);
  margin: 1rem 0 0.375rem;
}
.info-content :deep(p) { margin: 0 0 0.75rem; }
.info-content :deep(ul) { list-style: disc; padding-inline-start: 1.25rem; margin-bottom: 0.75rem; }
.info-content :deep(ol) { list-style: decimal; padding-inline-start: 1.25rem; margin-bottom: 0.75rem; }
.info-content :deep(blockquote) {
  border-inline-start: 2px solid var(--color-primary);
  padding-inline-start: 0.75rem;
  margin: 0 0 0.75rem;
}
</style>
