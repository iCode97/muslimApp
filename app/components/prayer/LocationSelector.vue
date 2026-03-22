<script setup lang="ts">
const { t } = useI18n()
const { location, suggestions, loading, searchLoading, error, detectGPS, searchLocations, selectSuggestion, clearSuggestions, loadSaved } = useLocation()

const searchQuery = ref('')
const showSearch = ref(false)

// Debounce timer for autocomplete
let searchTimeout: ReturnType<typeof setTimeout>

// Load saved location on mount
onMounted(() => {
  loadSaved()
})

async function handleDetectGPS() {
  await detectGPS()
  showSearch.value = false
}

// Debounced autocomplete search
function onSearchInput() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(async () => {
    if (searchQuery.value.trim().length >= 2) {
      await searchLocations(searchQuery.value)
    } else {
      clearSuggestions()
    }
  }, 300)
}

// Select a suggestion from the dropdown
function handleSelect(suggestion: typeof suggestions.value[0]) {
  selectSuggestion(suggestion)
  showSearch.value = false
  searchQuery.value = ''
}

// Close search
function closeSearch() {
  showSearch.value = false
  searchQuery.value = ''
  clearSuggestions()
}

// Display name: prefer displayName, fall back to city + country
const locationDisplay = computed(() => {
  if (!location.value) return ''
  return location.value.displayName || `${location.value.city}, ${location.value.country}`
})
</script>

<template>
  <div>
    <!-- Current location display -->
    <div class="flex items-center justify-between">
      <button
        class="flex items-center gap-2 text-sm text-themed-muted hover:text-themed-secondary transition-colors"
        @click="showSearch = !showSearch"
      >
        <span class="text-base">📍</span>
        <span v-if="location">{{ locationDisplay }}</span>
        <span v-else class="italic">{{ t('prayer.searchCity') }}</span>
      </button>

      <GlassButton
        v-if="!location"
        size="sm"
        variant="primary"
        :disabled="loading"
        @click="handleDetectGPS"
      >
        <span v-if="loading" class="animate-spin mr-1">&#x21BB;</span>
        {{ t('prayer.detectLocation') }}
      </GlassButton>
    </div>

    <!-- Search panel -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-2 scale-95"
      leave-to-class="opacity-0 -translate-y-2 scale-95"
    >
      <div v-if="showSearch" class="mt-3 space-y-2">
        <form @submit.prevent class="flex gap-2">
          <div class="flex-1 relative">
            <GlassInput
              v-model="searchQuery"
              :placeholder="t('prayer.searchCity')"
              icon="🔍"
              @update:model-value="onSearchInput"
            />

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

            <!-- Search loading indicator -->
            <div
              v-if="searchLoading"
              class="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <span class="animate-spin inline-block text-themed-muted">⟳</span>
            </div>
          </div>

          <GlassButton variant="ghost" size="md" @click="closeSearch">
            ✕
          </GlassButton>
        </form>

        <div class="flex gap-2">
          <GlassButton size="sm" variant="ghost" @click="handleDetectGPS">
            {{ t('prayer.detectLocation') }}
          </GlassButton>
        </div>

        <p v-if="error" class="text-xs text-[var(--color-danger)]">
          {{ error }}
        </p>
      </div>
    </Transition>
  </div>
</template>
