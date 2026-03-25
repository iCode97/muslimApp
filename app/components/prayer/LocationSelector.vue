<script setup lang="ts">
const { t } = useI18n()
const { location, suggestions, loading, searchLoading, error, detectGPS, searchLocations, selectSuggestion, clearSuggestions, loadSaved } = useLocation()

const searchQuery = ref('')
const showSearch = ref(false)

let searchTimeout: ReturnType<typeof setTimeout>

onMounted(() => {
  loadSaved()
})

async function handleDetectGPS() {
  clearSuggestions()
  await detectGPS()
  showSearch.value = false
  searchQuery.value = ''
}

function onSearchInput() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(async () => {
    if (searchQuery.value.trim().length >= 2) {
      await searchLocations(searchQuery.value)
    }
    else {
      clearSuggestions()
    }
  }, 300)
}

function handleSelect(suggestion: typeof suggestions.value[0]) {
  selectSuggestion(suggestion)
  showSearch.value = false
  searchQuery.value = ''
  clearSuggestions()
}

function closeSearch() {
  showSearch.value = false
  searchQuery.value = ''
  clearSuggestions()
}

const locationDisplay = computed(() => {
  if (!location.value) return ''
  return location.value.displayName || `${location.value.city}, ${location.value.country}`
})
</script>

<template>
  <div>
    <!-- Location display row -->
    <div class="flex items-center gap-2">
      <!-- Location toggle -->
      <button
        class="flex items-center gap-1.5 text-sm text-themed-muted hover:text-themed-secondary transition-colors min-w-0 flex-1"
        @click="showSearch = !showSearch"
      >
        <span class="text-base shrink-0">📍</span>
        <span v-if="location" class="truncate">{{ locationDisplay }}</span>
        <span v-else class="italic truncate">{{ t('prayer.searchCity') }}</span>
        <span class="text-themed-faint text-xs shrink-0">{{ showSearch ? '▲' : '▼' }}</span>
      </button>

      <!-- GPS icon button — always visible -->
      <button
        class="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg glass-subtle hover:bg-[var(--color-primary)]/10 transition-colors text-themed-muted hover:text-[var(--color-primary-light)]"
        :title="t('prayer.detectLocation')"
        :disabled="loading"
        @click="handleDetectGPS"
      >
        <span v-if="loading" class="animate-spin text-sm">⟳</span>
        <span v-else class="text-sm">🎯</span>
      </button>
    </div>

    <!-- Search panel -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-2 scale-95"
      leave-to-class="opacity-0 -translate-y-2 scale-95"
    >
      <div v-if="showSearch" class="mt-2">
        <div class="relative">
          <GlassInput
            v-model="searchQuery"
            :placeholder="t('prayer.searchCity')"
            icon="🔍"
            @update:model-value="onSearchInput"
          />

          <!-- Search loading -->
          <div
            v-if="searchLoading"
            class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <span class="animate-spin inline-block text-themed-muted text-sm">⟳</span>
          </div>

          <!-- Suggestions dropdown -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            leave-active-class="transition-all duration-150 ease-in"
            enter-from-class="opacity-0 -translate-y-1"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <div
              v-if="suggestions.length > 0"
              class="absolute left-0 right-0 top-full mt-1 glass-strong rounded-xl overflow-hidden z-50 shadow-lg"
            >
              <button
                v-for="(suggestion, index) in suggestions"
                :key="index"
                class="w-full text-left px-4 py-3 text-sm hover:bg-[var(--color-primary)]/10 transition-colors border-b border-[var(--glass-border)] last:border-b-0 flex items-center gap-2"
                @click="handleSelect(suggestion)"
              >
                <span class="text-base shrink-0">📍</span>
                <span class="text-themed-secondary truncate">{{ suggestion.displayName }}</span>
              </button>
            </div>
          </Transition>
        </div>

        <p v-if="error" class="mt-1.5 text-xs text-[var(--color-danger)]">
          {{ error }}
        </p>
      </div>
    </Transition>
  </div>
</template>
