<script setup lang="ts">
/**
 * FAQ — category filter, search and accordion with sources and a hint
 * where scholars differ.
 */
import { FAQ, FAQ_CATEGORIES, localize, searchFaq, type FaqEntry } from '~/data/learn'

const { t, locale } = useI18n()
const haptics = useHaptics()
const uid = useId()

useSeoMeta({
  title: () => t('faq.title'),
  description: () => t('faq.subtitle'),
})

const query = ref('')
const category = ref<FaqEntry['category'] | 'all'>('all')
const expanded = ref<Set<string>>(new Set())

// Only offer categories that actually have entries.
const categories = computed(() => FAQ_CATEGORIES.filter(c => FAQ.some(e => e.category === c)))
const entries = computed(() => searchFaq(query.value, locale.value, category.value))

function setCategory(c: FaqEntry['category'] | 'all') {
  if (category.value === c) return
  haptics.light()
  category.value = c
}

function toggle(id: string) {
  haptics.tap()
  const next = new Set(expanded.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  expanded.value = next
}
</script>

<template>
  <div class="app-container pt-6 pb-8 space-y-5">
    <nav :aria-label="t('learn.breadcrumb')">
      <NuxtLink to="/learn" class="back-link inline-flex items-center gap-1.5 text-xs text-themed-muted hover:text-themed">
        <AppIcon name="arrowLeft" :size="14" />
        {{ t('learn.backToLearn') }}
      </NuxtLink>
    </nav>

    <header>
      <h1 class="text-2xl font-semibold">{{ t('faq.title') }}</h1>
      <p class="text-sm text-themed-muted mt-1">{{ t('faq.subtitle') }}</p>
    </header>

    <GlassInput
      v-model="query"
      :placeholder="t('faq.searchPlaceholder')"
      :aria-label="t('faq.searchPlaceholder')"
      icon="🔍"
    />

    <div role="group" :aria-label="t('faq.categories')" class="flex gap-2 overflow-x-auto no-scrollbar pb-1">
      <button
        type="button"
        :aria-pressed="category === 'all'"
        :class="['chip', category === 'all' ? 'chip--active' : 'glass-subtle text-themed-secondary']"
        @click="setCategory('all')"
      >
        {{ t('faq.all') }}
      </button>
      <button
        v-for="c in categories"
        :key="c"
        type="button"
        :aria-pressed="category === c"
        :class="['chip', category === c ? 'chip--active' : 'glass-subtle text-themed-secondary']"
        @click="setCategory(c)"
      >
        {{ t(`faq.cat_${c}`) }}
      </button>
    </div>

    <p v-if="entries.length === 0" class="text-sm text-themed-muted text-center py-6" role="status">
      {{ t('faq.noResults') }}
    </p>

    <ul v-else class="space-y-2">
      <li v-for="entry in entries" :key="entry.id" class="glass rounded-2xl">
        <h2 class="text-sm">
          <button
            type="button"
            class="faq-q w-full flex items-center gap-3 p-4 text-left"
            :aria-expanded="expanded.has(entry.id)"
            :aria-controls="`${uid}-${entry.id}`"
            @click="toggle(entry.id)"
          >
            <span class="flex-1 min-w-0 font-medium leading-snug">{{ localize(entry.question, locale) }}</span>
            <AppIcon
              name="chevronDown"
              :size="18"
              :class="['flex-shrink-0 text-themed-faint transition-transform duration-200', expanded.has(entry.id) ? 'rotate-180' : '']"
            />
          </button>
        </h2>
        <div
          v-show="expanded.has(entry.id)"
          :id="`${uid}-${entry.id}`"
          role="region"
          class="px-4 pb-4 space-y-3"
        >
          <p class="text-sm leading-relaxed text-themed-secondary">
            <LearnRichText :text="localize(entry.answer, locale)" />
          </p>

          <LearnNoteBlock
            v-if="entry.scholarlyDifference"
            variant="differences"
            :text="{ de: t('faq.scholarlyDifference'), en: t('faq.scholarlyDifference'), tr: t('faq.scholarlyDifference') }"
          />

          <div v-if="entry.sources.length" class="space-y-1">
            <h3 class="text-[11px] font-medium text-themed-muted uppercase tracking-wider">{{ t('faq.sources') }}</h3>
            <ul class="space-y-0.5 text-xs text-themed-muted">
              <li v-for="(src, i) in entry.sources" :key="i">· {{ src }}</li>
            </ul>
          </div>

          <LearnDraftBadge v-if="entry.review === 'draft'" compact />
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.back-link:focus-visible,
.faq-q:focus-visible,
.chip:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}
.faq-q {
  min-height: 3.25rem;
  border-radius: 1rem;
}
.chip {
  padding: 0.375rem 0.75rem;
  min-height: 2.25rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  transition: background-color 0.2s ease;
}
.chip--active {
  background: var(--color-primary);
  color: #fff;
}
</style>
