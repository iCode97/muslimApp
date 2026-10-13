<script setup lang="ts">
/**
 * Authenticity grade pill for a hadith (sahih / hasan / da'if / not yet verified).
 * Same visual language as the grade badge in LearnHadithBlock.
 */
import type { HadithGrade } from '~/data/hadiths'

const props = defineProps<{
  grade: HadithGrade
  /** Optional grader note, shown as tooltip. */
  note?: string
}>()

const { t } = useI18n()

const label = computed(() => {
  const map = {
    sahih: 'hadith.grade_sahih',
    hasan: 'hadith.grade_hasan',
    daif: 'hadith.grade_daif',
    unverified: 'hadith.grade_unverified',
  } as const
  return t(map[props.grade])
})
</script>

<template>
  <span
    :class="['grade-badge', `grade-${grade}`]"
    :title="note || t('hadith.gradeLabel')"
  >
    <span class="sr-only">{{ t('hadith.gradeLabel') }}: </span>{{ label }}
  </span>
</template>

<style scoped>
.grade-badge {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1.4;
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
  --grade-amber: #f4a261;
  color: var(--grade-amber);
  background: color-mix(in srgb, var(--grade-amber) 14%, transparent);
  border-color: color-mix(in srgb, var(--grade-amber) 40%, transparent);
}
[data-theme="light"] .grade-daif {
  --grade-amber: #b45309;
}
.grade-unverified {
  color: var(--color-text-muted);
  background: var(--glass-bg-subtle);
  border-color: var(--glass-border);
}
</style>
