<script setup lang="ts">
/**
 * Hadith collection page.
 * Curated hadiths with Arabic text and translations, categorized, with authenticity grades.
 * Deep link: /hadith?id=N scrolls to, expands and highlights hadith N.
 */
import {
  HADITHS,
  HADITH_CATEGORIES,
  HADITH_COLLECTION_ORDER,
  HADITH_GRADES,
  primaryCollection,
  type Hadith,
  type HadithGrade,
} from '~/data/hadiths'

definePageMeta({
  // A deep link (?id=N) scrolls to its hadith itself — don't let the router jump back to the top.
  scrollToTop: to => !to.query.id,
})

const { t, locale } = useI18n()
const route = useRoute()
const progress = useProgress('hadith', HADITHS.length)

const selectedCategory = ref<string>('all')
const searchQuery = ref('')
/** Empty set = no grade filter (show all). */
const selectedGrades = ref<Set<HadithGrade>>(new Set())
const sortMode = ref<'topic' | 'collection'>('topic')

const gradeCounts = computed(() => {
  const counts: Record<HadithGrade, number> = { sahih: 0, hasan: 0, daif: 0, unverified: 0 }
  for (const h of HADITHS) counts[h.grade]++
  return counts
})

function toggleGrade(grade: HadithGrade) {
  const next = new Set(selectedGrades.value)
  if (next.has(grade)) next.delete(grade)
  else next.add(grade)
  selectedGrades.value = next
}

function collectionRank(h: Hadith): number {
  const i = HADITH_COLLECTION_ORDER.indexOf(primaryCollection(h))
  return i === -1 ? HADITH_COLLECTION_ORDER.length : i
}

function collectionNumber(h: Hadith): number {
  const n = Number.parseInt(h.collections[0]?.number ?? '', 10)
  return Number.isNaN(n) ? Number.POSITIVE_INFINITY : n
}

const filteredHadiths = computed(() => {
  let result = HADITHS

  if (selectedCategory.value !== 'all') {
    result = result.filter(h => h.category === selectedCategory.value)
  }

  if (selectedGrades.value.size > 0) {
    result = result.filter(h => selectedGrades.value.has(h.grade))
  }

  if (searchQuery.value.trim().length >= 2) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(h => {
      const translation = h.translations[locale.value as keyof typeof h.translations] || h.translations.en
      return (
        translation.toLowerCase().includes(q) ||
        h.arabic.includes(searchQuery.value) ||
        h.narrator?.toLowerCase().includes(q) ||
        h.source.toLowerCase().includes(q)
      )
    })
  }

  if (sortMode.value === 'collection') {
    result = [...result].sort((a, b) =>
      collectionRank(a) - collectionRank(b)
      || collectionNumber(a) - collectionNumber(b)
      || a.id - b.id,
    )
  }

  return result
})

// Expanded hadiths (to show full details)
const expandedIds = ref<Set<number>>(new Set())

function toggleHadith(id: number) {
  if (expandedIds.value.has(id)) {
    expandedIds.value.delete(id)
  } else {
    expandedIds.value.add(id)
    // Mark as read when expanded
    progress.markRead(id)
  }
  expandedIds.value = new Set(expandedIds.value)
}

function getTranslation(hadith: Hadith): string {
  return hadith.translations[locale.value as keyof typeof hadith.translations] || hadith.translations.en
}

// ── Deep links: /hadith?id=N ────────────────────────────────────────
const highlightedId = ref<number | null>(null)
let highlightTimer: ReturnType<typeof setTimeout> | undefined

function idFromQuery(): number | null {
  const q = route.query.id
  const raw = Array.isArray(q) ? q[0] : q
  const n = Number(raw)
  return Number.isInteger(n) && HADITHS.some(h => h.id === n) ? n : null
}

// Expand + highlight already during SSR so the target renders open on first paint.
const initialId = idFromQuery()
if (initialId !== null) {
  expandedIds.value = new Set([initialId])
  highlightedId.value = initialId
}

function focusHadith(id: number) {
  // Make sure the target is not hidden by the current filters.
  if (!filteredHadiths.value.some(h => h.id === id)) {
    selectedCategory.value = 'all'
    selectedGrades.value = new Set()
    searchQuery.value = ''
  }
  expandedIds.value = new Set([...expandedIds.value, id])
  progress.markRead(id)
  highlightedId.value = id
  clearTimeout(highlightTimer)
  // Wait for render before scrolling (the router's scroll-to-top is disabled for ?id=, see definePageMeta).
  nextTick(() => setTimeout(() => {
    const el = document.getElementById(`hadith-${id}`)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
  }, 150))
  highlightTimer = setTimeout(() => { highlightedId.value = null }, 3500)
}

onMounted(() => {
  progress.load()
  if (initialId !== null) focusHadith(initialId)
})

onBeforeUnmount(() => clearTimeout(highlightTimer))

watch(() => route.query.id, () => {
  const id = idFromQuery()
  if (id !== null) focusHadith(id)
})

// ── Toast (share fallback feedback) ─────────────────────────────────
const toastMessage = ref('')
let toastTimer: ReturnType<typeof setTimeout> | undefined
function showToast(message: string) {
  toastMessage.value = message
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastMessage.value = '' }, 2500)
}
onBeforeUnmount(() => clearTimeout(toastTimer))

const categoryIcons: Record<string, string> = {
  faith: '☪',
  character: '💎',
  prayer: '🕌',
  knowledge: '📚',
  community: '🤝',
  daily: '🏡',
  mercy: '💛',
  deeds: '✨',
}

const chipClass = (active: boolean) => [
  'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
  active ? 'bg-[var(--color-primary)] text-white' : 'glass-subtle text-themed-secondary',
]
</script>

<template>
  <div class="app-container pt-6 space-y-5">
    <!-- Header -->
    <header class="animate-fade-in">
      <h1 class="text-2xl font-semibold">
        {{ t('hadith.title') }}
      </h1>
      <p class="text-sm text-themed-muted mt-1">
        <HonorificText :text="t('hadith.subtitle')" />
      </p>
    </header>

    <!-- Progress -->
    <ProgressBar
      :label="t('common.progress')"
      :current="progress.summary.value.read"
      :total="progress.summary.value.total"
      :percent="progress.summary.value.percent"
      :show-reset="true"
      class="animate-fade-in stagger-1"
      @reset="progress.resetAll()"
    />

    <!-- Search -->
    <div class="animate-fade-in stagger-2">
      <GlassInput
        v-model="searchQuery"
        :placeholder="t('hadith.search')"
        icon="🔍"
      />
    </div>

    <!-- Category filter -->
    <div
      role="group"
      :aria-label="t('a11y.categories')"
      class="flex gap-2 overflow-x-auto pb-2 no-scrollbar animate-fade-in stagger-2"
    >
      <button
        type="button"
        :aria-pressed="selectedCategory === 'all'"
        :class="chipClass(selectedCategory === 'all')"
        @click="selectedCategory = 'all'"
      >
        {{ t('hadith.all') }}
      </button>
      <button
        v-for="cat in HADITH_CATEGORIES"
        :key="cat"
        type="button"
        :aria-pressed="selectedCategory === cat"
        :class="chipClass(selectedCategory === cat)"
        @click="selectedCategory = cat"
      >
        <span aria-hidden="true">{{ categoryIcons[cat] }}</span> {{ t(`hadith.cat_${cat}`) }}
      </button>
    </div>

    <!-- Grade filter (multi-select) + sort -->
    <div class="space-y-2 animate-fade-in stagger-2">
      <div
        role="group"
        :aria-label="t('hadith.filterGrade')"
        class="flex gap-2 overflow-x-auto pb-1 no-scrollbar"
      >
        <button
          v-for="g in HADITH_GRADES"
          :key="g"
          type="button"
          :aria-pressed="selectedGrades.has(g)"
          :class="chipClass(selectedGrades.has(g))"
          @click="toggleGrade(g)"
        >
          {{ t(`hadith.grade_${g}`) }}
          <span class="opacity-70 tabular-nums">· {{ gradeCounts[g] }}</span>
        </button>
      </div>
      <div
        role="group"
        :aria-label="t('hadith.sortLabel')"
        class="flex items-center gap-2 text-xs"
      >
        <span class="text-themed-faint" aria-hidden="true">{{ t('hadith.sortLabel') }}:</span>
        <button
          type="button"
          :aria-pressed="sortMode === 'topic'"
          :class="chipClass(sortMode === 'topic')"
          @click="sortMode = 'topic'"
        >
          {{ t('hadith.sortTopic') }}
        </button>
        <button
          type="button"
          :aria-pressed="sortMode === 'collection'"
          :class="chipClass(sortMode === 'collection')"
          @click="sortMode = 'collection'"
        >
          {{ t('hadith.sortCollection') }}
        </button>
      </div>
    </div>

    <!-- Explainer: what do the grades mean? -->
    <details class="grade-explainer glass-subtle rounded-2xl px-4 py-3 animate-fade-in stagger-2">
      <summary class="cursor-pointer text-sm font-medium text-themed-secondary">
        {{ t('hadith.explainerTitle') }}
      </summary>
      <div class="mt-3 space-y-3 text-xs leading-relaxed text-themed-muted">
        <div v-for="g in HADITH_GRADES" :key="g" class="space-y-1">
          <HadithGradeBadge :grade="g" />
          <p>{{ t(`hadith.explain_${g}`) }}</p>
        </div>
        <p>
          <NuxtLink to="/learn/glossary?term=sahih" class="text-[var(--color-primary-light)] font-medium">
            {{ t('hadith.explainerMore') }} ›
          </NuxtLink>
        </p>
      </div>
    </details>

    <!-- Hadith list -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div
        v-for="hadith in filteredHadiths"
        :id="`hadith-${hadith.id}`"
        :key="hadith.id"
        :class="['hadith-item rounded-2xl animate-fade-in', { 'is-highlighted': highlightedId === hadith.id }]"
      >
        <GlassCard>
          <div class="space-y-3">
            <!-- Category + Grade + Read status + Share -->
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-1.5 flex-wrap min-w-0">
                <span class="text-xs text-themed-faint glass-subtle px-2 py-0.5 rounded-full whitespace-nowrap">
                  <span aria-hidden="true">{{ categoryIcons[hadith.category] }}</span> {{ t(`hadith.cat_${hadith.category}`) }}
                </span>
                <HadithGradeBadge :grade="hadith.grade" :note="hadith.gradeNote" />
              </div>
              <div class="flex items-center gap-1 shrink-0">
                <span v-if="progress.isRead(hadith.id)" class="text-[10px] text-[var(--color-primary-light)]" role="img" :aria-label="t('common.read')">✓</span>
                <HadithShareButton
                  :hadith="hadith"
                  :text="getTranslation(hadith)"
                  @toast="showToast"
                />
              </div>
            </div>

            <button
              type="button"
              class="w-full text-start space-y-3"
              :aria-expanded="expandedIds.has(hadith.id)"
              @click="toggleHadith(hadith.id)"
            >
              <!-- Arabic text -->
              <p class="font-arabic text-xl text-end leading-[2.2] text-themed" dir="rtl" lang="ar">
                {{ hadith.arabic }}
              </p>

              <!-- Translation (always visible) -->
              <p class="text-sm text-themed-secondary leading-relaxed" dir="auto">
                {{ getTranslation(hadith) }}
              </p>

              <!-- Source -->
              <p class="text-[11px] text-themed-faint">
                {{ hadith.source }}
              </p>

              <!-- Expanded: narrator + grading + all translations -->
              <Transition name="expand">
                <div v-if="expandedIds.has(hadith.id)" class="space-y-2 pt-2 border-t border-[var(--glass-border)]">
                  <!-- Narrator -->
                  <p v-if="hadith.narrator" class="text-xs text-[var(--color-gold)]">
                    {{ t('hadith.narrator') }}: {{ hadith.narrator }}
                  </p>

                  <!-- Grading note -->
                  <p v-if="hadith.gradeNote" class="text-[11px] text-themed-muted">
                    {{ t('hadith.gradeNoteLabel') }}: {{ hadith.gradeNote }}
                  </p>

                  <!-- Other translations -->
                  <div v-for="lang in ['de', 'en', 'tr'].filter(l => l !== (locale === 'ar' ? 'en' : locale))" :key="lang">
                    <p class="text-[10px] text-themed-faint uppercase">
                      {{ lang === 'de' ? 'Deutsch' : lang === 'en' ? 'English' : 'Türkçe' }}
                    </p>
                    <p class="text-xs text-themed-muted leading-relaxed" dir="auto">
                      {{ hadith.translations[lang as keyof typeof hadith.translations] }}
                    </p>
                  </div>
                </div>
              </Transition>
            </button>
          </div>
        </GlassCard>
      </div>
    </div>

    <!-- Count -->
    <p v-if="filteredHadiths.length > 0" class="text-center text-xs text-themed-faint pb-4">
      {{ filteredHadiths.length }} {{ t('hadith.hadiths') }}
    </p>
    <p v-else class="text-center text-sm text-themed-muted py-8">
      {{ t('hadith.noResults') }}
    </p>

    <!-- Toast -->
    <div class="hadith-toast-region" aria-live="polite" role="status">
      <Transition name="hadith-toast">
        <p v-if="toastMessage" class="hadith-toast glass-strong text-sm">
          {{ toastMessage }}
        </p>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.hadith-item {
  scroll-margin-top: 96px;
  transition: box-shadow 0.4s ease;
}
.hadith-item.is-highlighted {
  box-shadow:
    0 0 0 2px var(--color-primary-light),
    0 0 24px var(--color-primary-glow);
}

.grade-explainer > summary {
  list-style-position: inside;
}

.hadith-toast-region {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(env(safe-area-inset-bottom, 0px) + 96px);
  z-index: 70;
  display: flex;
  justify-content: center;
  padding: 0 16px;
  pointer-events: none;
}
.hadith-toast {
  max-width: 420px;
  padding: 10px 16px;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}
.hadith-toast-enter-active,
.hadith-toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.hadith-toast-enter-from,
.hadith-toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
@media (prefers-reduced-motion: reduce) {
  .hadith-item,
  .hadith-toast-enter-active,
  .hadith-toast-leave-active {
    transition: none;
  }
}
</style>
