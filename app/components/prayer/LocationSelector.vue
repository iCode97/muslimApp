<script setup lang="ts">
/**
 * Location display row + bottom-sheet editor.
 * Tapping the row (or its GPS button) opens a sheet containing the full
 * search / GPS flow, replacing the legacy inline dropdown.
 */
const { t } = useI18n()
const { location, suggestions, loading, searchLoading, error, detectGPS, searchLocations, selectSuggestion, clearSuggestions, loadSaved } = useLocation()
const haptics = useHaptics()

const open = ref(false)
const searchQuery = ref('')

let searchTimeout: ReturnType<typeof setTimeout>

onMounted(() => {
  loadSaved()
})

function openSheet() {
  haptics.light()
  open.value = true
}

async function handleDetectGPS() {
  clearSuggestions()
  await detectGPS()
  if (location.value) {
    haptics.success()
    open.value = false
    searchQuery.value = ''
  }
}

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

function handleSelect(suggestion: typeof suggestions.value[0]) {
  selectSuggestion(suggestion)
  haptics.success()
  open.value = false
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
    <!-- Display row -->
    <div class="flex items-center gap-2">
      <button
        class="flex items-center gap-1.5 text-sm text-themed-muted hover:text-themed-secondary transition-colors min-w-0 flex-1"
        @click="openSheet"
      >
        <AppIcon name="location" :size="16" class="shrink-0" />
        <span v-if="location" class="truncate">{{ locationDisplay }}</span>
        <span v-else class="italic truncate">{{ t('prayer.searchCity') }}</span>
        <AppIcon name="chevronDown" :size="14" class="shrink-0 text-themed-faint" />
      </button>

      <button
        class="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg glass-subtle hover:bg-[var(--color-primary)]/10 transition-colors text-themed-muted hover:text-[var(--color-primary-light)]"
        :title="t('prayer.detectLocation')"
        :disabled="loading"
        @click="handleDetectGPS"
      >
        <span v-if="loading" class="animate-spin text-sm">⟳</span>
        <AppIcon v-else name="target" :size="16" />
      </button>
    </div>

    <!-- Editor sheet -->
    <BottomSheet v-model:open="open" :title="t('location.setupTitle')">
      <div class="space-y-3 pb-2">
        <!-- GPS button -->
        <button
          class="w-full px-4 py-3 rounded-xl bg-[var(--color-primary)] text-white font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
          :disabled="loading"
          @click="handleDetectGPS"
        >
          <span v-if="loading" class="animate-spin">⟳</span>
          <AppIcon v-else name="target" :size="18" />
          {{ loading ? t('common.loading') : t('location.detectGPS') }}
        </button>

        <div class="flex items-center gap-3">
          <div class="flex-1 h-px bg-[var(--glass-border)]" />
          <span class="text-xs text-themed-faint">{{ t('location.or') }}</span>
          <div class="flex-1 h-px bg-[var(--glass-border)]" />
        </div>

        <div class="relative">
          <GlassInput
            v-model="searchQuery"
            :placeholder="t('prayer.searchCity')"
            icon="🔍"
            @update:model-value="onSearchInput"
          />
          <div v-if="searchLoading" class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <span class="animate-spin inline-block text-themed-muted text-sm">⟳</span>
          </div>
        </div>

        <!-- Suggestions list -->
        <div v-if="suggestions.length > 0" class="space-y-1 max-h-60 overflow-y-auto">
          <button
            v-for="(suggestion, index) in suggestions"
            :key="index"
            class="w-full text-left px-3 py-2.5 rounded-lg glass-subtle hover:bg-[var(--color-primary)]/10 transition-colors flex items-center gap-2"
            @click="handleSelect(suggestion)"
          >
            <AppIcon name="location" :size="14" class="shrink-0 text-themed-muted" />
            <span class="text-themed-secondary text-sm truncate">{{ suggestion.displayName }}</span>
          </button>
        </div>

        <p v-if="error" class="text-xs text-[var(--color-danger)]">
          {{ error }}
        </p>
      </div>
    </BottomSheet>
  </div>
</template>
