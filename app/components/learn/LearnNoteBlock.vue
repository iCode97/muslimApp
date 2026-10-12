<script setup lang="ts">
import { localize, type LocalizedText } from '~/data/learn'

const props = defineProps<{
  variant: 'tip' | 'important' | 'differences'
  text: LocalizedText
}>()

const { t, locale } = useI18n()

const meta = computed(() => {
  const map = {
    tip: { icon: 'lightbulb', label: 'learn.noteTip' },
    important: { icon: 'alertCircle', label: 'learn.noteImportant' },
    differences: { icon: 'scale', label: 'learn.noteDifferences' },
  } as const
  return map[props.variant]
})
</script>

<template>
  <aside :class="['note-block rounded-2xl p-4 flex gap-3', `note-${variant}`]" role="note">
    <AppIcon :name="meta.icon" :size="20" class="note-icon flex-shrink-0 mt-0.5" />
    <div class="min-w-0 space-y-1">
      <p class="note-label text-xs font-semibold uppercase tracking-wider">{{ t(meta.label) }}</p>
      <p class="text-sm leading-relaxed text-themed-secondary">
        <LearnRichText :text="localize(text, locale)" />
      </p>
    </div>
  </aside>
</template>

<style scoped>
.note-block {
  border: 1px solid var(--note-border);
  background: var(--note-bg);
}
.note-icon,
.note-label {
  color: var(--note-accent);
}
.note-tip {
  --note-accent: var(--color-primary-light);
  --note-bg: color-mix(in srgb, var(--color-primary-light) 10%, transparent);
  --note-border: color-mix(in srgb, var(--color-primary-light) 30%, transparent);
}
.note-important {
  --note-accent: var(--color-gold);
  --note-bg: color-mix(in srgb, var(--color-gold) 11%, transparent);
  --note-border: color-mix(in srgb, var(--color-gold) 35%, transparent);
}
.note-differences {
  --note-accent: #6d8fd6;
  --note-bg: color-mix(in srgb, #6d8fd6 11%, transparent);
  --note-border: color-mix(in srgb, #6d8fd6 32%, transparent);
}
[data-theme='light'] .note-differences {
  --note-accent: #3d5fa8;
}
</style>
