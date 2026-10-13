<script setup lang="ts">
import { localize, parseQuranRef, type LocalizedText } from '~/data/learn/core'

const props = defineProps<{
  reference: string
  arabic?: string
  translation: LocalizedText
}>()

const { t, locale } = useI18n()

const parsed = computed(() => parseQuranRef(props.reference))
const link = computed(() =>
  parsed.value ? `/quran/${parsed.value.surah}?verse=${parsed.value.from}` : null,
)
</script>

<template>
  <figure class="quran-block glass rounded-2xl p-4 space-y-3">
    <p
      v-if="arabic"
      class="font-arabic text-2xl text-end leading-[2.2] text-themed"
      dir="rtl"
      lang="ar"
    >
      {{ arabic }}
    </p>
    <blockquote class="text-sm leading-relaxed text-themed-secondary">
      <LearnRichText :text="localize(translation, locale)" />
    </blockquote>
    <figcaption class="flex items-center gap-2 text-xs">
      <AppIcon name="quran" :size="14" class="text-[var(--color-primary-light)]" />
      <NuxtLink
        v-if="link"
        :to="link"
        class="ref-chip inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium text-[var(--color-primary-light)] tabular-nums"
        :aria-label="`${t('learn.openVerse')}: ${t('learn.quran')} ${reference}`"
      >
        {{ t('learn.quran') }} {{ reference }}
        <AppIcon name="chevronRight" :size="12" />
      </NuxtLink>
      <span v-else class="tabular-nums text-themed-muted">{{ t('learn.quran') }} {{ reference }}</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.quran-block {
  border-inline-start: 3px solid var(--color-primary-light);
}
.ref-chip {
  background: var(--glass-bg-subtle);
  border: 1px solid var(--glass-border);
}
.ref-chip:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}
</style>
