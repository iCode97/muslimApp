<script setup lang="ts">
/**
 * Mosques nearby — OpenStreetMap data via the public Overpass API (client-side).
 */
import { RADIUS_OPTIONS_KM, detectMapPlatform, type MapPlatform } from '~/utils/mosques'

const { t } = useI18n()
const { location, ready } = useLocation()
const haptics = useHaptics()
const { mosques, loading, error, searched, search, cancel } = useMosques()

useHead({ title: () => t('mosques.title') })

const PAGE_SIZE = 25
const radius = ref<number>(5)
const visibleCount = ref(PAGE_SIZE)
const platform = ref<MapPlatform>('other')

const visibleMosques = computed(() => mosques.value.slice(0, visibleCount.value))
const hasMore = computed(() => mosques.value.length > visibleCount.value)

onMounted(() => {
  platform.value = detectMapPlatform(navigator.userAgent, navigator.maxTouchPoints)
})
onBeforeUnmount(cancel)

function runSearch() {
  const loc = location.value
  if (!loc) return
  visibleCount.value = PAGE_SIZE
  search(loc.latitude, loc.longitude, radius.value)
}

// One request per user action: page open / location change / radius change / retry.
watch(
  () => [location.value?.latitude, location.value?.longitude, radius.value] as const,
  () => runSearch(),
  { immediate: true },
)

function selectRadius(km: number) {
  if (km === radius.value) return
  haptics.light()
  radius.value = km
}

function retry() {
  haptics.light()
  runSearch()
}

const errorKey = computed(() => {
  if (error.value === 'timeout') return 'mosques.errorTimeout'
  if (error.value === 'busy') return 'mosques.errorBusy'
  return 'mosques.errorNetwork'
})
</script>

<template>
  <div class="app-container pt-6 space-y-5">
    <header>
      <h1 class="text-2xl font-semibold">
        {{ t('mosques.title') }}
      </h1>
      <p class="text-sm text-themed-muted mt-1">
        {{ t('mosques.subtitle') }}
      </p>
    </header>

    <!-- Saved location not restored yet (first client tick after hydration) -->
    <div v-if="!ready" class="w-full" />

    <!-- No location: open the location setup right here -->
    <div v-else-if="!location" class="space-y-3 animate-fade-in">
      <p class="text-sm text-themed-secondary text-center">
        {{ t('mosques.needLocation') }}
      </p>
      <LocationSetupCTA />
    </div>

    <template v-else>
      <LocationSelector />

      <!-- Radius chips -->
      <div role="group" :aria-label="t('mosques.radius')" class="flex gap-2 overflow-x-auto no-scrollbar">
        <button
          v-for="km in RADIUS_OPTIONS_KM"
          :key="km"
          type="button"
          :aria-pressed="radius === km"
          :class="[
            'px-4 min-h-[2.75rem] rounded-full text-sm font-medium whitespace-nowrap transition-all',
            radius === km
              ? 'bg-[var(--color-primary)] text-white'
              : 'glass-subtle text-themed-secondary',
          ]"
          @click="selectRadius(km)"
        >
          {{ km }} km
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="py-10" role="status" :aria-label="t('mosques.loading')">
        <LoadingSpinner />
        <p class="text-xs text-themed-muted text-center mt-3">
          {{ t('mosques.loading') }}
        </p>
      </div>

      <!-- Error -->
      <GlassCard v-else-if="error" variant="subtle" role="alert">
        <div class="flex items-start gap-3">
          <AppIcon name="alertCircle" :size="22" class="shrink-0 mt-0.5 text-[var(--color-danger)]" />
          <div class="flex-1 min-w-0 space-y-3">
            <p class="text-sm text-themed-secondary">
              {{ t(errorKey) }}
            </p>
            <GlassButton variant="primary" size="sm" @click="retry">
              {{ t('mosques.retry') }}
            </GlassButton>
          </div>
        </div>
      </GlassCard>

      <!-- Empty -->
      <GlassCard v-else-if="searched && mosques.length === 0" variant="subtle">
        <div class="flex items-start gap-3">
          <AppIcon name="mosque" :size="22" class="shrink-0 mt-0.5 text-themed-muted" />
          <div class="space-y-1">
            <p class="text-sm font-medium text-themed">
              {{ t('mosques.emptyTitle', { km: radius }) }}
            </p>
            <p class="text-xs text-themed-muted">
              {{ t('mosques.emptyHint') }}
            </p>
          </div>
        </div>
      </GlassCard>

      <!-- Results -->
      <template v-else-if="mosques.length > 0">
        <p class="text-xs text-themed-muted px-1" role="status">
          {{ t('mosques.resultCount', { count: mosques.length, km: radius }, mosques.length) }}
        </p>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <MosqueCard
            v-for="m in visibleMosques"
            :key="m.id"
            :mosque="m"
            :platform="platform"
          />
        </ul>
        <div v-if="hasMore" class="flex justify-center">
          <GlassButton @click="visibleCount += PAGE_SIZE">
            {{ t('mosques.showMore') }}
          </GlassButton>
        </div>
      </template>

      <!-- Attribution + data notes (required by the ODbL) -->
      <footer class="space-y-1.5 px-1 pt-2 text-[11px] text-themed-faint leading-relaxed">
        <p>
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-2"
          >© {{ t('mosques.attribution') }}</a>
        </p>
        <p>{{ t('mosques.dataNote') }}</p>
        <p>{{ t('mosques.privacyNote') }}</p>
      </footer>
    </template>
  </div>
</template>
