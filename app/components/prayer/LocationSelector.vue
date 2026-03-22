<script setup lang="ts">
const { t } = useI18n()
const { location, loading, error, detectGPS, setCity, loadSaved } = useLocation()

const searchQuery = ref('')
const showSearch = ref(false)

// Load saved location on mount
onMounted(() => {
  loadSaved()
})

async function handleDetectGPS() {
  await detectGPS()
}

async function handleSearch() {
  if (!searchQuery.value.trim()) return

  // Attempt to parse "City, Country" format
  const parts = searchQuery.value.split(',').map(s => s.trim())
  const city = parts[0]
  const country = parts[1] || 'Deutschland'

  await setCity(city, country)
  showSearch.value = false
  searchQuery.value = ''
}
</script>

<template>
  <div>
    <!-- Current location display -->
    <div class="flex items-center justify-between">
      <button
        class="flex items-center gap-2 text-sm text-themed-muted hover:text-themed-secondary transition-colors"
        @click="showSearch = !showSearch"
      >
        <span class="text-base">{{'📍'}}</span>
        <span v-if="location">{{ location.city }}, {{ location.country }}</span>
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
        <form @submit.prevent="handleSearch" class="flex gap-2">
          <div class="flex-1">
            <GlassInput
              v-model="searchQuery"
              :placeholder="t('prayer.searchCity')"
              icon="🔍"
            />
          </div>
          <GlassButton variant="primary" size="md" @click="handleSearch">
            OK
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
