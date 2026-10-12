<script setup lang="ts">
/**
 * Glossary — searchable A–Z list of Islamic terms.
 * Deep link: /learn/glossary?term=tawhid opens the term detail sheet.
 */
import { GLOSSARY, getTerm, groupByLetter, localize, searchGlossary } from '~/data/learn'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const haptics = useHaptics()

useSeoMeta({
  title: () => t('glossary.title'),
  description: () => t('glossary.subtitle'),
})

const query = ref('')
const openTerm = ref<string | null>(null)

const results = computed(() => searchGlossary(query.value, locale.value))
const searching = computed(() => query.value.trim().length > 0)
// While searching, keep relevance order in a single flat list; otherwise group A–Z.
const groups = computed(() => (searching.value ? [] : groupByLetter(results.value)))
const letters = computed(() => groups.value.map(g => g.letter))

function termFromQuery(): string | null {
  const q = route.query.term
  const id = Array.isArray(q) ? q[0] : q
  return id && getTerm(id) ? id : null
}

onMounted(() => {
  openTerm.value = termFromQuery()
})

// Keep the URL in sync so a term can be shared / bookmarked.
watch(() => route.query.term, () => {
  const id = termFromQuery()
  if (id !== openTerm.value) openTerm.value = id
})
watch(openTerm, (id) => {
  const current = termFromQuery()
  if (id === current) return
  const nextQuery = { ...route.query }
  if (id) nextQuery.term = id
  else delete nextQuery.term
  router.replace({ query: nextQuery })
})

function open(id: string) {
  haptics.light()
  openTerm.value = id
}

function jump(letter: string) {
  haptics.light()
  document.getElementById(`letter-${letter}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
      <h1 class="text-2xl font-semibold">{{ t('glossary.title') }}</h1>
      <p class="text-sm text-themed-muted mt-1">{{ t('glossary.subtitle') }}</p>
    </header>

    <GlassInput
      v-model="query"
      :placeholder="t('glossary.searchPlaceholder')"
      :aria-label="t('glossary.searchPlaceholder')"
      icon="🔍"
    />

    <p class="text-xs text-themed-faint tabular-nums" role="status" aria-live="polite">
      {{ results.length === 0 ? t('glossary.noResults') : t('glossary.count', { count: results.length }) }}
    </p>

    <!-- A–Z jump bar -->
    <nav
      v-if="!searching && letters.length > 1"
      :aria-label="t('glossary.jump')"
      class="flex gap-1.5 overflow-x-auto no-scrollbar pb-1"
    >
      <button
        v-for="l in letters"
        :key="l"
        type="button"
        class="letter-chip"
        :aria-label="t('glossary.letter', { letter: l })"
        @click="jump(l)"
      >
        {{ l }}
      </button>
    </nav>

    <!-- Searching: flat relevance-ordered list -->
    <ul v-if="searching && results.length" class="space-y-2">
      <li v-for="term in results" :key="term.id">
        <button type="button" class="term-row glass rounded-2xl" @click="open(term.id)">
          <span class="flex-1 min-w-0 text-left">
            <span class="block text-sm font-semibold">{{ term.term }}</span>
            <span class="block text-xs text-themed-muted line-clamp-2 mt-0.5">{{ localize(term.definition, locale) }}</span>
          </span>
          <span class="font-arabic text-xl text-[var(--color-gold)] flex-shrink-0" lang="ar" dir="rtl">{{ term.arabic }}</span>
        </button>
      </li>
    </ul>

    <!-- A–Z groups -->
    <div v-else-if="!searching" class="space-y-5">
      <section v-for="g in groups" :key="g.letter" :aria-labelledby="`letter-${g.letter}`" class="space-y-2">
        <h2
          :id="`letter-${g.letter}`"
          class="letter-heading sticky top-0 z-10 text-sm font-bold text-[var(--color-primary-light)] py-1.5 px-1"
        >
          {{ g.letter }}
        </h2>
        <ul class="space-y-2">
          <li v-for="term in g.terms" :key="term.id">
            <button type="button" class="term-row glass rounded-2xl" @click="open(term.id)">
              <span class="flex-1 min-w-0 text-left">
                <span class="block text-sm font-semibold">{{ term.term }}</span>
                <span class="block text-xs text-themed-muted line-clamp-2 mt-0.5">{{ localize(term.definition, locale) }}</span>
              </span>
              <span class="font-arabic text-xl text-[var(--color-gold)] flex-shrink-0" lang="ar" dir="rtl">{{ term.arabic }}</span>
            </button>
          </li>
        </ul>
      </section>
    </div>

    <p v-if="GLOSSARY.length === 0" class="text-sm text-themed-muted">{{ t('glossary.noResults') }}</p>

    <LearnTermSheet v-model:term-id="openTerm" />
  </div>
</template>

<style scoped>
.back-link:focus-visible,
.term-row:focus-visible,
.letter-chip:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}
.term-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  min-height: 3.5rem;
  padding: 0.75rem 1rem;
  transition: transform 0.15s ease;
}
.term-row:active { transform: scale(0.99); }
.letter-heading {
  background: linear-gradient(to bottom, var(--color-bg-start), transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.letter-chip {
  flex-shrink: 0;
  min-width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  background: var(--glass-bg-subtle);
  border: 1px solid var(--glass-border);
}
</style>
