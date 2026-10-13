<script setup lang="ts">
/**
 * Quran — Unified search: one input searches surahs (by name) and verses (full-text).
 * Surah filtering is instant (client-side), verse search is debounced (API).
 */
import type { SearchResult } from '~/composables/useQuran'
import { JUZ_STARTS, verseLink } from '~/utils/quran'

const { t, locale } = useI18n()
const quran = useQuran()
const progress = useProgress('quran', 114)
const audio = useQuranAudio()

type Tab = 'surahs' | 'juz'
const TABS: Tab[] = ['surahs', 'juz']
const tab = ref<Tab>('surahs')

function onTabKeydown(event: KeyboardEvent) {
  const i = TABS.indexOf(tab.value)
  let next = i
  // Left/Right follow the reading direction (RTL: Right = previous)
  const forward = isRtlLocale(locale.value) ? 'ArrowLeft' : 'ArrowRight'
  const backward = isRtlLocale(locale.value) ? 'ArrowRight' : 'ArrowLeft'
  if (event.key === forward || event.key === 'ArrowDown') next = (i + 1) % TABS.length
  else if (event.key === backward || event.key === 'ArrowUp') next = (i - 1 + TABS.length) % TABS.length
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = TABS.length - 1
  else return
  event.preventDefault()
  tab.value = TABS[next]!
  nextTick(() => document.getElementById(`quran-tab-${tab.value}`)?.focus())
}

const juzList = computed(() => JUZ_STARTS.map(([surahId, verse], i) => ({
  n: i + 1,
  surahId,
  verse,
  surahName: quran.getSurah(surahId)?.nameSimple ?? `${t('quran.surahs')} ${surahId}`,
  surahArabic: quran.getSurah(surahId)?.nameArabic ?? '',
  to: verseLink(surahId, verse),
})))

// Stop playback when leaving the Quran area — the mini player only lives on Quran routes.
onBeforeRouteLeave((to) => {
  if (!to.path.startsWith('/quran')) audio.pause()
})

const searchQuery = ref('')
const verseResults = ref<SearchResult[]>([])
const hasSearchedVerses = ref(false)

// Fetch surahs on mount and when locale changes
onMounted(() => {
  quran.fetchSurahs()
  progress.load()
  audio.loadSettings()
})

watch(locale, () => {
  quran.fetchSurahs(true)
})

// Client-side surah filtering (instant)
const filteredSurahs = computed(() => {
  if (!searchQuery.value.trim()) return quran.surahs.value

  const q = searchQuery.value.toLowerCase()
  return quran.surahs.value.filter(s =>
    s.nameSimple.toLowerCase().includes(q)
    || s.nameArabic.includes(q)
    || s.translatedName.toLowerCase().includes(q)
    || String(s.id).includes(q),
  )
})

// Is the user actively searching?
const isSearching = computed(() => searchQuery.value.trim().length > 0)

// Debounced verse search (API)
let searchTimeout: ReturnType<typeof setTimeout>
function onSearchInput() {
  clearTimeout(searchTimeout)
  hasSearchedVerses.value = false
  verseResults.value = []

  searchTimeout = setTimeout(async () => {
    if (searchQuery.value.trim().length >= 3) {
      hasSearchedVerses.value = true
      verseResults.value = await quran.search(searchQuery.value)
    }
  }, 500)
}

function revelationPlace(place: string): string {
  return place === 'makkah' ? t('quran.mecca') : t('quran.medina')
}
</script>

<template>
  <div class="app-container pt-6 space-y-4" :class="audio.surah.value !== null ? 'pb-36' : ''">
    <header>
      <h1 class="text-2xl font-semibold">
        {{ t('quran.title') }}
      </h1>
      <p class="text-sm text-themed-muted mt-1">
        114 {{ t('quran.surahs') }} · {{ t('quran.subtitle') }}
      </p>
    </header>

    <!-- Reading Progress Bar -->
    <ProgressBar
      :label="t('common.progress')"
      :current="progress.summary.value.read"
      :total="progress.summary.value.total"
      :percent="progress.summary.value.percent"
      :show-reset="true"
      @reset="progress.resetAll()"
    />

    <!-- Reading Progress / Bookmark -->
    <ReadingProgress />

    <!-- Unified Search Input -->
    <GlassInput
      v-model="searchQuery"
      :placeholder="t('quran.search')"
      :aria-label="t('quran.search')"
      icon="🔍"
      @update:model-value="onSearchInput"
    />

    <!-- Tabs: Surahs | Juz (hidden while searching) -->
    <div
      v-if="!isSearching"
      role="tablist"
      :aria-label="t('quran.title')"
      class="flex gap-1 p-1 glass-subtle rounded-2xl"
      @keydown="onTabKeydown"
    >
      <button
        v-for="id in TABS"
        :id="`quran-tab-${id}`"
        :key="id"
        type="button"
        role="tab"
        :aria-selected="tab === id"
        :aria-controls="`quran-panel-${id}`"
        :tabindex="tab === id ? 0 : -1"
        class="flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-colors"
        :class="tab === id
          ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary-light)]'
          : 'text-themed-muted hover:text-themed-secondary'"
        @click="tab = id"
      >
        {{ id === 'surahs' ? t('quran.tabSurahs') : t('quran.tabJuz') }}
      </button>
    </div>

    <!-- JUZ LIST -->
    <div
      v-if="!isSearching && tab === 'juz'"
      id="quran-panel-juz"
      role="tabpanel"
      aria-labelledby="quran-tab-juz"
      class="grid grid-cols-1 md:grid-cols-2 gap-2"
    >
      <NuxtLink v-for="j in juzList" :key="j.n" :to="j.to" class="block">
        <div class="glass flex items-center gap-4 px-4 py-3 hover:bg-white/10 transition-all duration-200 active:scale-[0.98]">
          <div class="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-[var(--color-primary-light)] font-semibold text-sm shrink-0">
            {{ j.n }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <span class="font-medium text-themed truncate">{{ t('quran.juz') }} {{ j.n }}</span>
              <span class="font-arabic text-xl text-themed-secondary shrink-0 ms-2" dir="rtl" lang="ar">{{ j.surahArabic }}</span>
            </div>
            <p class="text-xs text-themed-muted mt-0.5">
              {{ j.surahName }} {{ j.surahId }}:{{ j.verse }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Loading (initial surah load) -->
    <div v-if="quran.loading.value && quran.surahs.value.length === 0 && (isSearching || tab === 'surahs')" class="space-y-2" role="status" :aria-label="t('common.loading')">
      <SkeletonLoader variant="list" :rows="8" />
    </div>

    <!-- Error -->
    <div v-else-if="quran.error.value && !isSearching && tab === 'surahs'" class="text-center py-8">
      <p class="text-[var(--color-danger)] text-sm">{{ quran.error.value }}</p>
    </div>

    <template v-else>
      <!-- SEARCH ACTIVE: show matching surahs + verse results -->
      <template v-if="isSearching">
        <!-- Matching Surahs Section -->
        <div v-if="filteredSurahs.length > 0" class="space-y-2">
          <h2 class="text-xs font-semibold text-themed-muted uppercase tracking-wider px-1">
            <span aria-hidden="true">📖</span> {{ t('quran.surahs') }} ({{ filteredSurahs.length }})
          </h2>
          <NuxtLink
            v-for="surah in filteredSurahs"
            :key="surah.id"
            :to="`/quran/${surah.id}`"
            class="block"
          >
            <div class="glass flex items-center gap-4 px-4 py-3 hover:bg-white/10 transition-all duration-200 active:scale-[0.98]">
              <div class="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-[var(--color-primary-light)] font-semibold text-sm shrink-0">
                {{ surah.id }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <span class="font-medium text-themed truncate">{{ surah.nameSimple }}</span>
                  <span class="font-arabic text-xl text-themed-secondary shrink-0 ms-2" lang="ar">{{ surah.nameArabic }}</span>
                </div>
                <div class="flex items-center gap-2 text-xs text-themed-muted mt-0.5">
                  <span>{{ surah.translatedName }}</span>
                  <span>·</span>
                  <span>{{ surah.versesCount }} {{ t('quran.verses') }}</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Verse Results Section -->
        <div class="space-y-2">
          <h2 class="text-xs font-semibold text-themed-muted uppercase tracking-wider px-1">
            <span aria-hidden="true">🔍</span> {{ t('quran.verses') }}
          </h2>

          <!-- Verse search loading -->
          <div v-if="quran.searchLoading.value" class="py-6">
            <LoadingSpinner size="sm" />
          </div>

          <!-- Verse results -->
          <template v-else-if="verseResults.length > 0">
            <p class="text-xs text-themed-faint px-1">
              {{ verseResults.length }} {{ t('quran.results', verseResults.length) }}
            </p>
            <NuxtLink
              v-for="result in verseResults"
              :key="result.verseKey"
              :to="verseLink(Number(result.verseKey.split(':')[0]), result.verseNumber)"
              class="block"
            >
              <div class="glass-subtle px-4 py-3 hover:bg-white/5 transition-all duration-200">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-xs text-[var(--color-primary-light)] font-medium">
                    {{ result.surahName }}
                  </span>
                  <span class="text-xs text-themed-faint">
                    {{ t('quran.verse') }} {{ result.verseNumber }}
                  </span>
                </div>
                <p class="text-sm text-themed-secondary leading-relaxed line-clamp-3">
                  {{ result.text }}
                </p>
              </div>
            </NuxtLink>
          </template>

          <!-- Min chars hint -->
          <p v-else-if="searchQuery.trim().length < 3 && searchQuery.trim().length > 0" class="text-themed-faint text-xs text-center py-4">
            {{ t('quran.minChars') }}
          </p>

          <!-- No verse results -->
          <p v-else-if="hasSearchedVerses && !quran.searchLoading.value" class="text-themed-muted text-sm text-center py-4">
            {{ t('quran.noResults') }} "{{ searchQuery }}"
          </p>
        </div>

        <!-- No surahs + no verses -->
        <div v-if="filteredSurahs.length === 0 && hasSearchedVerses && verseResults.length === 0 && !quran.searchLoading.value" class="text-center py-4">
          <p class="text-themed-muted text-sm">
            {{ t('quran.noResults') }} "{{ searchQuery }}"
          </p>
        </div>
      </template>

      <!-- NO SEARCH: show full surah list -->
      <div
        v-else-if="tab === 'surahs'"
        id="quran-panel-surahs"
        role="tabpanel"
        aria-labelledby="quran-tab-surahs"
        class="grid grid-cols-1 md:grid-cols-2 gap-2"
      >
        <NuxtLink
          v-for="surah in quran.surahs.value"
          :key="surah.id"
          :to="`/quran/${surah.id}`"
          class="block"
        >
          <div class="glass flex items-center gap-4 px-4 py-3 hover:bg-white/10 transition-all duration-200 active:scale-[0.98]">
            <div
              :class="[
                'w-10 h-10 flex items-center justify-center rounded-lg font-semibold text-sm shrink-0 transition-colors',
                progress.isRead(surah.id)
                  ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary-light)]'
                  : 'bg-white/5 text-[var(--color-primary-light)]'
              ]"
            >
              <span v-if="progress.isRead(surah.id)" class="text-base" aria-hidden="true">✓</span>
              <span v-else>{{ surah.id }}</span>
              <span v-if="progress.isRead(surah.id)" class="sr-only">{{ surah.id }} · {{ t('common.read') }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <span class="font-medium text-themed truncate">{{ surah.nameSimple }}</span>
                <span class="font-arabic text-xl text-themed-secondary shrink-0 ms-2" lang="ar">{{ surah.nameArabic }}</span>
              </div>
              <div class="flex items-center gap-2 text-xs text-themed-muted mt-0.5">
                <span>{{ surah.translatedName }}</span>
                <span>·</span>
                <span>{{ surah.versesCount }} {{ t('quran.verses') }}</span>
                <span>·</span>
                <span>{{ revelationPlace(surah.revelationPlace) }}</span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </template>

    <QuranMiniPlayer />
  </div>
</template>
