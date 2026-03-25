<script setup lang="ts">
/**
 * Quran — Unified search: one input searches surahs (by name) and verses (full-text).
 * Surah filtering is instant (client-side), verse search is debounced (API).
 */
import type { SearchResult } from '~/composables/useQuran'

const { t, locale } = useI18n()
const quran = useQuran()

const searchQuery = ref('')
const verseResults = ref<SearchResult[]>([])
const hasSearchedVerses = ref(false)

// Fetch surahs on mount and when locale changes
onMounted(() => {
  quran.fetchSurahs()
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
  <div class="px-4 pt-6 space-y-4 max-w-lg mx-auto">
    <header>
      <h1 class="text-2xl font-semibold">
        {{ t('quran.title') }}
      </h1>
      <p class="text-sm text-themed-muted mt-1">
        114 {{ t('quran.surahs') }} · {{ t('quran.subtitle') }}
      </p>
    </header>

    <!-- Reading Progress / Bookmark -->
    <ReadingProgress />

    <!-- Unified Search Input -->
    <GlassInput
      v-model="searchQuery"
      :placeholder="t('quran.search')"
      icon="🔍"
      @update:model-value="onSearchInput"
    />

    <!-- Loading (initial surah load) -->
    <div v-if="quran.loading.value && quran.surahs.value.length === 0" class="py-12">
      <LoadingSpinner />
    </div>

    <!-- Error -->
    <div v-else-if="quran.error.value && !isSearching" class="text-center py-8">
      <p class="text-[var(--color-danger)] text-sm">{{ quran.error.value }}</p>
    </div>

    <template v-else>
      <!-- SEARCH ACTIVE: show matching surahs + verse results -->
      <template v-if="isSearching">
        <!-- Matching Surahs Section -->
        <div v-if="filteredSurahs.length > 0" class="space-y-2">
          <h3 class="text-xs font-semibold text-themed-muted uppercase tracking-wider px-1">
            📖 {{ t('quran.surahs') }} ({{ filteredSurahs.length }})
          </h3>
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
                  <span class="font-arabic text-xl text-themed-secondary shrink-0 ml-2">{{ surah.nameArabic }}</span>
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
          <h3 class="text-xs font-semibold text-themed-muted uppercase tracking-wider px-1">
            🔍 {{ t('quran.verses') }}
          </h3>

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
              :to="`/quran/${result.verseKey.split(':')[0]}`"
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
      <div v-else class="space-y-2">
        <NuxtLink
          v-for="surah in quran.surahs.value"
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
                <span class="font-arabic text-xl text-themed-secondary shrink-0 ml-2">{{ surah.nameArabic }}</span>
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
  </div>
</template>
