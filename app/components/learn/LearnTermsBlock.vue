<script setup lang="ts">
import { getTerm } from '~/data/learn'

const props = defineProps<{ ids: string[] }>()
const emit = defineEmits<{ open: [id: string] }>()

const { t } = useI18n()
const haptics = useHaptics()

const terms = computed(() =>
  props.ids.map(id => getTerm(id)).filter((x): x is NonNullable<ReturnType<typeof getTerm>> => !!x),
)

function open(id: string) {
  haptics.light()
  emit('open', id)
}
</script>

<template>
  <div v-if="terms.length" class="space-y-2">
    <p class="text-xs font-medium text-themed-muted uppercase tracking-wider">{{ t('learn.relatedTerms') }}</p>
    <ul class="flex flex-wrap gap-2">
      <li v-for="term in terms" :key="term.id">
        <button
          type="button"
          class="term-chip inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-themed-secondary active:scale-[0.97] transition-transform"
          aria-haspopup="dialog"
          :aria-label="t('learn.termOpen', { term: term.term })"
          @click="open(term.id)"
        >
          <span>{{ term.term }}</span>
          <span class="font-arabic text-sm text-[var(--color-gold)]" lang="ar" dir="rtl" aria-hidden="true">{{ term.arabic }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.term-chip {
  background: var(--glass-bg-subtle);
  border: 1px solid var(--glass-border);
  min-height: 2.25rem;
}
.term-chip:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}
</style>
