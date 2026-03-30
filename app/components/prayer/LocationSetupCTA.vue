<script setup lang="ts">
/**
 * Prominent CTA shown when no location is set.
 * Replaces empty placeholder states with an actionable setup prompt.
 */
const { t } = useI18n()
const { location, loading, error, detectGPS, searchLocations, selectSuggestion, suggestions, clearSuggestions, searchLoading } = useLocation()

const searchQuery = ref('')
const showSearch = ref(false)

let searchTimeout: ReturnType<typeof setTimeout>

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
</script>

<template>
  <GlassCard v-if="!location" variant="primary" class="text-center space-y-4">
    <div class="space-y-2">
      <p class="text-3xl">📍</p>
      <h3 class="text-lg font-semibold text-themed">
        {{ t('location.setupTitle') }}
      </h3>
      <p class="text-sm text-themed-secondary">
        {{ t('location.setupDescription') }}
      </p>
    </div>

    <!-- GPS Button -->
    <button
      class="w-full px-4 py-3 rounded-xl bg-[var(--color-primary)] text-white font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
      :disabled="loading"
      @click="detectGPS()"
    >
      <span v-if="loading" class="animate-spin">⟳</span>
      <span v-else>🎯</span>
      {{ loading ? t('common.loading') : t('location.detectGPS') }}
    </button>

    <!-- Or divider -->
    <div class="flex items-center gap-3">
      <div class="flex-1 h-px bg-[var(--glass-border)]" />
      <span class="text-xs text-themed-faint">{{ t('location.or') }}</span>
      <div class="flex-1 h-px bg-[var(--glass-border)]" />
    </div>

    <!-- Manual search -->
    <div class="relative">
      <GlassInput
        v-model="searchQuery"
        :placeholder="t('prayer.searchCity')"
        icon="🔍"
        @update:model-value="onSearchInput"
      />

      <!-- Suggestions -->
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
    </div>

    <p v-if="error" class="text-xs text-[var(--color-danger)]">
      {{ error }}
    </p>
  </GlassCard>
</template>
