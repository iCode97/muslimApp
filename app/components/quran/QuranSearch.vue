<script setup lang="ts">
import type { SearchResult } from '~/composables/useQuran'

const { t } = useI18n()
const quran = useQuran()

const searchQuery = ref('')
const results = ref<SearchResult[]>([])
const hasSearched = ref(false)

async function handleSearch() {
  if (!searchQuery.value.trim()) return

  hasSearched.value = true
  results.value = await quran.search(searchQuery.value)
}

// Debounced search
let searchTimeout: ReturnType<typeof setTimeout>
function onInput() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    if (searchQuery.value.trim().length >= 2) {
      handleSearch()
    }
  }, 500)
}
</script>

<template>
  <div class="space-y-4">
    <form @submit.prevent="handleSearch">
      <GlassInput
        v-model="searchQuery"
        :placeholder="t('quran.search')"
        icon="🔍"
        @update:model-value="onInput"
      />
    </form>

    <!-- Loading -->
    <div v-if="quran.loading.value" class="py-8">
      <LoadingSpinner size="sm" />
    </div>

    <!-- Results -->
    <div v-else-if="results.length > 0" class="space-y-2">
      <p class="text-xs text-white/40 px-1">
        {{ results.length }} Ergebnis{{ results.length !== 1 ? 'se' : '' }}
      </p>

      <NuxtLink
        v-for="result in results"
        :key="result.verseKey"
        :to="`/quran/${result.verseKey.split(':')[0]}`"
        class="block"
      >
        <div class="glass-subtle px-4 py-3 hover:bg-white/5 transition-all duration-200">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs text-[var(--color-primary-light)] font-medium">
              {{ result.surahName }}
            </span>
            <span class="text-xs text-white/30">
              Vers {{ result.verseNumber }}
            </span>
          </div>
          <p class="text-sm text-white/70 leading-relaxed line-clamp-3">
            {{ result.text }}
          </p>
        </div>
      </NuxtLink>
    </div>

    <!-- No results -->
    <div v-else-if="hasSearched && !quran.loading.value" class="text-center py-8">
      <p class="text-white/40 text-sm">
        Keine Ergebnisse für "{{ searchQuery }}"
      </p>
    </div>
  </div>
</template>
