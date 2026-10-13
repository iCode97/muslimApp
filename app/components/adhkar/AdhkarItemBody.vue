<script setup lang="ts">
/**
 * Content of one dhikr: meta row (position, source, grade), occasion, Arabic,
 * optional transliteration/translation and the virtue. Shared by the card
 * (reading) mode and the list mode of /adhkar.
 */
import type { Dhikr } from '~/data/adhkar'
import { localize } from '~/data/learn'

const props = withDefaults(defineProps<{
  item: Dhikr
  showTransliteration: boolean
  showTranslation: boolean
  /** e.g. "3 / 13" — omitted in list mode. */
  position?: string
  size?: 'lg' | 'md'
}>(), {
  position: undefined,
  size: 'lg',
})

const { t, locale } = useI18n()

const gradeLabel = computed(() => {
  if (!props.item.grade) return ''
  return t(props.item.grade === 'sahih' ? 'learn.gradeSahih' : 'learn.gradeHasan')
})
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center gap-2 flex-wrap text-[11px]">
      <span v-if="position" class="glass-subtle px-2 py-0.5 rounded-full text-themed-muted tabular-nums">
        {{ position }}
      </span>
      <span class="glass-subtle px-2 py-0.5 rounded-full text-[var(--color-primary-light)] font-semibold tabular-nums">
        {{ t('adhkar.times', { n: item.repeat }) }}
      </span>
      <span v-if="item.grade" :class="['grade-badge', `grade-${item.grade}`]" :title="t('learn.gradeLabel')">
        <span class="sr-only">{{ t('learn.gradeLabel') }}: </span>{{ gradeLabel }}
      </span>
    </div>

    <p v-if="item.occasion" class="text-xs text-themed-muted leading-relaxed" dir="auto">
      <HonorificText :text="localize(item.occasion, locale)" />
    </p>

    <p
      :class="[
        'font-arabic text-end text-themed whitespace-pre-line',
        size === 'lg' ? 'text-2xl leading-[2.3]' : 'text-xl leading-[2.2]',
      ]"
      dir="rtl"
      lang="ar"
    >
      {{ item.arabic }}
    </p>

    <p
      v-if="showTransliteration"
      class="text-sm text-[var(--color-gold)] italic leading-relaxed whitespace-pre-line"
      dir="ltr"
    >
      {{ item.transliteration }}
    </p>

    <p v-if="showTranslation" class="text-sm text-themed-secondary leading-relaxed" dir="auto">
      <HonorificText :text="localize(item.translation, locale)" />
    </p>

    <div v-if="item.virtue" class="virtue rounded-xl px-3 py-2 text-xs leading-relaxed">
      <p class="font-semibold text-[var(--color-gold)] mb-0.5">{{ t('adhkar.virtue') }}</p>
      <p class="text-themed-secondary" dir="auto">
        <HonorificText :text="localize(item.virtue, locale)" />
      </p>
      <p v-if="item.virtueSource" class="text-themed-faint mt-1">{{ item.virtueSource }}</p>
    </div>

    <p class="text-[11px] text-themed-faint">
      <span class="font-medium">{{ t('adhkar.source') }}:</span> {{ item.source }}
    </p>
  </div>
</template>

<style scoped>
.virtue {
  background: color-mix(in srgb, var(--color-gold) 9%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-gold) 25%, transparent);
}
.grade-badge {
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
</style>
