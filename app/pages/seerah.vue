<script setup lang="ts">
/**
 * Seerah — Life of the Prophet Muhammad ﷺ
 * Chronological chapters with reading progress.
 */
import { SEERAH_CHAPTERS, SEERAH_CATEGORIES, type SeerahChapter } from '~/data/seerah'

const { t, locale } = useI18n()

const selectedCategory = ref<string>('all')
const expandedIds = ref<Set<number>>(new Set())

// Reading progress (persisted in localStorage)
const readChapters = ref<Set<number>>(new Set())

onMounted(() => {
  if (import.meta.client) {
    const saved = localStorage.getItem('muslimapp-seerah-read')
    if (saved) {
      try { readChapters.value = new Set(JSON.parse(saved)) } catch { /* ignore */ }
    }
  }
})

function saveProgress() {
  if (import.meta.client) {
    localStorage.setItem('muslimapp-seerah-read', JSON.stringify([...readChapters.value]))
  }
}

const filteredChapters = computed(() => {
  if (selectedCategory.value === 'all') return SEERAH_CHAPTERS
  return SEERAH_CHAPTERS.filter(c => c.category === selectedCategory.value)
})

const progressPercent = computed(() =>
  Math.round((readChapters.value.size / SEERAH_CHAPTERS.length) * 100),
)

function toggleChapter(id: number) {
  if (expandedIds.value.has(id)) {
    expandedIds.value.delete(id)
  } else {
    expandedIds.value.add(id)
    // Mark as read when opened
    readChapters.value.add(id)
    saveProgress()
  }
  expandedIds.value = new Set(expandedIds.value)
  readChapters.value = new Set(readChapters.value)
}

function getContent(chapter: SeerahChapter): string {
  return chapter.content[locale.value as keyof typeof chapter.content] || chapter.content.en
}

const categoryIcons: Record<string, string> = {
  'early-life': '👶',
  'prophethood': '🕯️',
  'mecca': '🕋',
  'medina': '🕌',
  'legacy': '🌹',
}
</script>

<template>
  <div class="app-container pt-6 space-y-5">
    <!-- Header -->
    <header class="animate-fade-in">
      <h1 class="text-2xl font-semibold">
        {{ t('seerah.title') }}
      </h1>
      <p class="text-sm text-themed-muted mt-1">
        {{ t('seerah.subtitle') }}
      </p>
    </header>

    <!-- Reading progress -->
    <GlassCard variant="subtle" padding="sm" class="animate-fade-in stagger-1">
      <div class="flex items-center gap-3 px-1">
        <div class="flex-1">
          <div class="flex justify-between text-xs mb-1.5">
            <span class="text-themed-muted">{{ t('seerah.progress') }}</span>
            <span class="text-[var(--color-primary-light)] font-medium">{{ readChapters.size }}/{{ SEERAH_CHAPTERS.length }}</span>
          </div>
          <div class="w-full h-2 rounded-full glass-subtle overflow-hidden">
            <div
              class="h-full rounded-full bg-[var(--color-primary-light)] transition-all duration-500"
              :style="{ width: `${progressPercent}%` }"
            />
          </div>
        </div>
        <span class="text-lg font-semibold text-[var(--color-primary-light)] tabular-nums">{{ progressPercent }}%</span>
      </div>
    </GlassCard>

    <!-- Category filter -->
    <div class="flex gap-2 overflow-x-auto pb-2 no-scrollbar animate-fade-in stagger-2">
      <button
        :class="[
          'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
          selectedCategory === 'all'
            ? 'bg-[var(--color-primary)] text-white'
            : 'glass-subtle text-themed-secondary'
        ]"
        @click="selectedCategory = 'all'"
      >
        {{ t('seerah.all') }}
      </button>
      <button
        v-for="cat in SEERAH_CATEGORIES"
        :key="cat"
        :class="[
          'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
          selectedCategory === cat
            ? 'bg-[var(--color-primary)] text-white'
            : 'glass-subtle text-themed-secondary'
        ]"
        @click="selectedCategory = cat"
      >
        {{ categoryIcons[cat] }} {{ t(`seerah.cat_${cat}`) }}
      </button>
    </div>

    <!-- Chapters -->
    <div class="space-y-3">
      <div
        v-for="chapter in filteredChapters"
        :key="chapter.id"
        class="animate-fade-in"
      >
        <GlassCard>
          <button
            class="w-full text-left space-y-3"
            @click="toggleChapter(chapter.id)"
          >
            <!-- Chapter header -->
            <div class="flex items-center gap-3">
              <span class="text-2xl">{{ chapter.icon }}</span>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <span class="text-xs text-[var(--color-gold)]">{{ chapter.year }}</span>
                  <span
                    v-if="readChapters.has(chapter.id)"
                    class="text-[10px] text-[var(--color-primary-light)]"
                  >✓</span>
                </div>
                <p class="font-medium text-sm text-themed">
                  {{ t(chapter.titleKey) }}
                </p>
              </div>
              <span class="text-themed-faint text-xs">
                {{ expandedIds.has(chapter.id) ? '▲' : '▼' }}
              </span>
            </div>

            <!-- Expanded content -->
            <Transition name="expand">
              <div v-if="expandedIds.has(chapter.id)" class="space-y-3 pt-3 border-t border-[var(--glass-border)]">
                <p class="text-sm text-themed-secondary leading-relaxed whitespace-pre-line">
                  {{ getContent(chapter) }}
                </p>

                <p
                  v-if="chapter.quranReference"
                  class="text-xs text-[var(--color-gold)] flex items-center gap-1.5"
                >
                  📖 {{ t('seerah.quranRef') }}: {{ chapter.quranReference }}
                </p>

                <span class="inline-block text-[10px] text-themed-faint glass-subtle px-2 py-0.5 rounded-full">
                  {{ categoryIcons[chapter.category] }} {{ t(`seerah.cat_${chapter.category}`) }}
                </span>
              </div>
            </Transition>
          </button>
        </GlassCard>
      </div>
    </div>

    <!-- Count -->
    <p class="text-center text-xs text-themed-faint pb-4">
      {{ filteredChapters.length }} {{ t('seerah.chapters') }}
    </p>
  </div>
</template>
