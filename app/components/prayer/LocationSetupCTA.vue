<script setup lang="ts">
/**
 * First-run CTA when no location is configured yet. Opens a BottomSheet that
 * hosts the full GPS + search flow, keeping the inline surface minimal.
 */
const { t } = useI18n()
const { location, loading, error, detectGPS, searchLocations, selectSuggestion, suggestions, clearSuggestions, searchLoading } = useLocation()
const haptics = useHaptics()

const open = ref(false)
const searchQuery = ref('')
let searchTimeout: ReturnType<typeof setTimeout>

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

async function handleGPS() {
  clearSuggestions()
  await detectGPS()
  if (location.value) {
    haptics.success()
    open.value = false
  }
}

function handleSelect(suggestion: typeof suggestions.value[0]) {
  selectSuggestion(suggestion)
  haptics.success()
  open.value = false
  searchQuery.value = ''
  clearSuggestions()
}

function openSheet() {
  haptics.light()
  open.value = true
}
</script>

<template>
  <GlassCard v-if="!location" variant="primary" interactive class="text-center space-y-4">
    <div class="space-y-2">
      <div class="flex justify-center">
        <AppIcon name="location" :size="32" class="text-[var(--color-primary-light)]" />
      </div>
      <h3 class="text-lg font-semibold text-themed">
        {{ t('location.setupTitle') }}
      </h3>
      <p class="text-sm text-themed-secondary">
        {{ t('location.setupDescription') }}
      </p>
    </div>

    <button
      class="w-full px-4 py-3 rounded-xl bg-[var(--color-primary)] text-white font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
      @click="openSheet"
    >
      <AppIcon name="location" :size="16" />
      {{ t('location.setupTitle') }}
    </button>

    <BottomSheet v-model:open="open" :title="t('location.setupTitle')">
      <div class="space-y-3 pb-2">
        <button
          class="w-full px-4 py-3 rounded-xl bg-[var(--color-primary)] text-white font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
          :disabled="loading"
          @click="handleGPS"
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
  </GlassCard>
</template>
