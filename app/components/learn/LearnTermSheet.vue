<script setup lang="ts">
/**
 * Glossary term detail in a BottomSheet. Controlled via `termId`
 * (null = closed); related terms swap the content in place.
 */
import { getTerm, localize } from '~/data/learn'

const props = defineProps<{ termId: string | null, showGlossaryLink?: boolean }>()
const emit = defineEmits<{ 'update:termId': [id: string | null] }>()

const { t, locale } = useI18n()
const haptics = useHaptics()

const term = computed(() => (props.termId ? getTerm(props.termId) : undefined))
const related = computed(() =>
  (term.value?.related ?? []).map(id => getTerm(id)).filter((x): x is NonNullable<ReturnType<typeof getTerm>> => !!x),
)

function onOpenChange(open: boolean) {
  if (!open) emit('update:termId', null)
}
function openRelated(id: string) {
  haptics.light()
  emit('update:termId', id)
}
</script>

<template>
  <BottomSheet :open="!!term" :title="term?.term" @update:open="onOpenChange">
    <div v-if="term" class="space-y-4 pb-4">
      <div class="flex items-baseline justify-between gap-3">
        <span class="font-arabic text-3xl text-[var(--color-gold)] leading-relaxed" lang="ar" dir="rtl">{{ term.arabic }}</span>
        <span v-if="term.aliases?.length" class="text-xs text-themed-muted text-end">
          {{ t('glossary.alsoKnownAs', { aliases: term.aliases.join(', ') }) }}
        </span>
      </div>

      <p class="text-[15px] leading-relaxed text-themed-secondary">
        <LearnRichText :text="localize(term.definition, locale)" />
      </p>

      <LearnDraftBadge v-if="term.review === 'draft'" compact />

      <div v-if="related.length" class="space-y-2">
        <h3 class="text-xs font-medium text-themed-muted uppercase tracking-wider">{{ t('glossary.related') }}</h3>
        <ul class="flex flex-wrap gap-2">
          <li v-for="r in related" :key="r.id">
            <button
              type="button"
              class="sheet-chip px-3 py-1.5 rounded-full text-xs font-medium text-themed-secondary"
              @click="openRelated(r.id)"
            >
              {{ r.term }}
            </button>
          </li>
        </ul>
      </div>

      <NuxtLink
        v-if="showGlossaryLink"
        :to="{ path: '/learn/glossary', query: { term: term.id } }"
        class="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-primary-light)]"
        @click="emit('update:termId', null)"
      >
        {{ t('learn.glossaryTitle') }}
        <AppIcon name="chevronRight" :size="12" />
      </NuxtLink>
    </div>
  </BottomSheet>
</template>

<style scoped>
.sheet-chip {
  background: var(--glass-bg-subtle);
  border: 1px solid var(--glass-border);
  min-height: 2.25rem;
}
.sheet-chip:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}
</style>
