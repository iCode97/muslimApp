<script setup lang="ts">
import { localize, type LocalizedText } from '~/data/learn/core'

const props = defineProps<{
  source: string
  narrator?: string
  arabic?: string
  text: LocalizedText
  grade?: 'sahih' | 'hasan' | 'daif'
}>()

const { t, locale } = useI18n()

const gradeLabel = computed(() => {
  if (!props.grade) return ''
  const map = { sahih: 'learn.gradeSahih', hasan: 'learn.gradeHasan', daif: 'learn.gradeDaif' } as const
  return t(map[props.grade])
})
</script>

<template>
  <figure class="hadith-block glass rounded-2xl p-4 space-y-3">
    <div class="flex items-center justify-between gap-2 flex-wrap">
      <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-gold)]">
        <AppIcon name="hadith" :size="14" />
        {{ t('learn.hadith') }}
      </span>
      <span
        v-if="grade"
        :class="['grade-badge', `grade-${grade}`]"
        :title="t('learn.gradeLabel')"
      >
        <span class="sr-only">{{ t('learn.gradeLabel') }}: </span>{{ gradeLabel }}
      </span>
    </div>
    <p
      v-if="arabic"
      class="font-arabic text-xl text-end leading-[2.2] text-themed"
      dir="rtl"
      lang="ar"
    >
      {{ arabic }}
    </p>
    <blockquote class="text-sm leading-relaxed text-themed-secondary">
      <LearnRichText :text="localize(text, locale)" />
    </blockquote>
    <figcaption class="text-xs text-themed-muted space-y-0.5">
      <p v-if="narrator">{{ t('learn.narratedBy', { name: narrator }) }}</p>
      <p class="font-medium text-themed-secondary">{{ source }}</p>
    </figcaption>
  </figure>
</template>

<style scoped>
.hadith-block {
  border-inline-start: 3px solid var(--color-gold);
}
.grade-badge {
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  border: 1px solid transparent;
}
.grade-sahih {
  color: var(--color-primary-light);
  background: color-mix(in srgb, var(--color-primary-light) 14%, transparent);
  border-color: color-mix(in srgb, var(--color-primary-light) 35%, transparent);
}
.grade-hasan {
  color: var(--color-gold);
  background: color-mix(in srgb, var(--color-gold) 14%, transparent);
  border-color: color-mix(in srgb, var(--color-gold) 35%, transparent);
}
.grade-daif {
  color: var(--color-danger);
  background: color-mix(in srgb, var(--color-danger) 12%, transparent);
  border-color: color-mix(in srgb, var(--color-danger) 35%, transparent);
}
</style>
