<script setup lang="ts">
/**
 * Seerah — Life of the Prophet Muhammad ﷺ
 * Chronological chapters with reading progress.
 * Supports two view modes: list (expandable cards) and timeline (chronological rail).
 */
import { SEERAH_CHAPTERS, SEERAH_CATEGORIES, type SeerahChapter } from '~/data/seerah'

const { t, locale } = useI18n()
const haptics = useHaptics()

const selectedCategory = ref<string>('all')
const expandedIds = ref<Set<number>>(new Set())
const viewMode = ref<'list' | 'timeline'>('list')

// Reading progress (using universal progress system)
const progress = useProgress('seerah', SEERAH_CHAPTERS.length)

onMounted(() => {
  // Migrate from old localStorage key if present
  if (import.meta.client) {
    const oldKey = 'muslimapp-seerah-read'
    const saved = localStorage.getItem(oldKey)
    if (saved) {
      try {
        const ids: number[] = JSON.parse(saved)
        ids.forEach(id => progress.markRead(id))
        localStorage.removeItem(oldKey)
      }
      catch { /* ignore */ }
    }
    // Remember view mode preference
    const savedView = localStorage.getItem('muslimapp-seerah-view')
    if (savedView === 'list' || savedView === 'timeline') {
      viewMode.value = savedView
    }
  }
  progress.load()
})

watch(viewMode, (v) => {
  if (import.meta.client) localStorage.setItem('muslimapp-seerah-view', v)
})

const filteredChapters = computed(() => {
  if (selectedCategory.value === 'all') return SEERAH_CHAPTERS
  return SEERAH_CHAPTERS.filter(c => c.category === selectedCategory.value)
})

function toggleChapter(id: number) {
  haptics.tap()
  if (expandedIds.value.has(id)) {
    expandedIds.value.delete(id)
  } else {
    expandedIds.value.add(id)
    // Mark as read when opened
    progress.markRead(id)
  }
  expandedIds.value = new Set(expandedIds.value)
}

function setViewMode(mode: 'list' | 'timeline') {
  if (viewMode.value === mode) return
  haptics.light()
  viewMode.value = mode
}

function setCategory(cat: string) {
  if (selectedCategory.value === cat) return
  haptics.light()
  selectedCategory.value = cat
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
    <ProgressBar
      :label="t('seerah.progress')"
      :current="progress.summary.value.read"
      :total="progress.summary.value.total"
      :percent="progress.summary.value.percent"
      :show-reset="true"
      class="animate-fade-in stagger-1"
      @reset="progress.resetAll()"
    />

    <!-- View mode toggle -->
    <div class="flex items-center justify-between gap-3 animate-fade-in stagger-2">
      <div class="flex gap-1 glass-subtle rounded-full p-1">
        <button
          :class="[
            'px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5',
            viewMode === 'list' ? 'bg-[var(--color-primary)] text-white' : 'text-themed-secondary'
          ]"
          @click="setViewMode('list')"
        >
          <AppIcon name="more" :size="14" />
          {{ t('seerah.viewList') }}
        </button>
        <button
          :class="[
            'px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5',
            viewMode === 'timeline' ? 'bg-[var(--color-primary)] text-white' : 'text-themed-secondary'
          ]"
          @click="setViewMode('timeline')"
        >
          <AppIcon name="calendar" :size="14" />
          {{ t('seerah.viewTimeline') }}
        </button>
      </div>
    </div>

    <!-- Category filter -->
    <div class="flex gap-2 overflow-x-auto pb-2 no-scrollbar animate-fade-in stagger-2">
      <button
        :class="[
          'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
          selectedCategory === 'all'
            ? 'bg-[var(--color-primary)] text-white'
            : 'glass-subtle text-themed-secondary'
        ]"
        @click="setCategory('all')"
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
        @click="setCategory(cat)"
      >
        {{ categoryIcons[cat] }} {{ t(`seerah.cat_${cat}`) }}
      </button>
    </div>

    <!-- List view -->
    <div v-if="viewMode === 'list'" class="space-y-3">
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
                    v-if="progress.isRead(chapter.id)"
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

    <!-- Timeline view -->
    <div v-else class="relative pl-6 sm:pl-10">
      <!-- Vertical rail -->
      <div class="absolute left-[11px] sm:left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-gold)] to-[var(--color-primary)] opacity-40" />

      <div class="space-y-5">
        <div
          v-for="chapter in filteredChapters"
          :key="chapter.id"
          class="relative animate-fade-in"
        >
          <!-- Dot marker -->
          <div
            :class="[
              'absolute -left-6 sm:-left-10 top-1 flex items-center justify-center',
              'w-6 h-6 sm:w-10 sm:h-10 rounded-full transition-all',
              progress.isRead(chapter.id)
                ? 'bg-[var(--color-primary)] ring-2 ring-[var(--color-primary-light)]/40'
                : 'glass-strong'
            ]"
          >
            <span class="text-xs sm:text-base">{{ chapter.icon }}</span>
          </div>

          <GlassCard>
            <button
              class="w-full text-left space-y-2"
              @click="toggleChapter(chapter.id)"
            >
              <div class="flex items-baseline justify-between gap-2">
                <span class="text-[11px] font-semibold text-[var(--color-gold)] tracking-wide uppercase">
                  {{ chapter.year }}
                </span>
                <span
                  v-if="progress.isRead(chapter.id)"
                  class="text-[10px] text-[var(--color-primary-light)]"
                >✓ {{ t('seerah.readBadge') }}</span>
              </div>
              <p class="font-medium text-sm text-themed">
                {{ t(chapter.titleKey) }}
              </p>
              <span class="inline-block text-[10px] text-themed-faint glass-subtle px-2 py-0.5 rounded-full">
                {{ categoryIcons[chapter.category] }} {{ t(`seerah.cat_${chapter.category}`) }}
              </span>

              <!-- Expanded content in timeline -->
              <Transition name="expand">
                <div
                  v-if="expandedIds.has(chapter.id)"
                  class="space-y-3 pt-3 border-t border-[var(--glass-border)]"
                >
                  <p class="text-sm text-themed-secondary leading-relaxed whitespace-pre-line">
                    {{ getContent(chapter) }}
                  </p>
                  <p
                    v-if="chapter.quranReference"
                    class="text-xs text-[var(--color-gold)] flex items-center gap-1.5"
                  >
                    📖 {{ t('seerah.quranRef') }}: {{ chapter.quranReference }}
                  </p>
                </div>
              </Transition>
            </button>
          </GlassCard>
        </div>
      </div>
    </div>

    <!-- Count -->
    <p class="text-center text-xs text-themed-faint pb-4">
      {{ filteredChapters.length }} {{ t('seerah.chapters') }}
    </p>
  </div>
</template>
