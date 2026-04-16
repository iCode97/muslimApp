<script setup lang="ts">
/**
 * First-run onboarding wizard.
 * Steps: Welcome → Location → Method → Notifications → Nav picker → Done.
 * Shown automatically on the first visit, and re-openable from Settings.
 */
import { PRAYER_METHODS } from '~/data/prayer-methods'

const { t } = useI18n()
const onboarding = useOnboarding()
const { location, loading: locLoading, detectGPS, searchLocations, selectSuggestion, suggestions, clearSuggestions } = useLocation()
const notifications = useNotifications()
const prayerTimes = usePrayerTimes()
const nav = useNavigation()

const searchQuery = ref('')
let searchTimeout: ReturnType<typeof setTimeout>

const steps = [
  { key: 'welcome', icon: '☪' },
  { key: 'location', icon: '📍' },
  { key: 'method', icon: '🕌' },
  { key: 'notifications', icon: '🔔' },
  { key: 'nav', icon: '🧭' },
  { key: 'done', icon: '✨' },
] as const

const maxStep = steps.length - 1

const currentStep = computed(() => steps[onboarding.step.value])
const canAdvance = computed(() => {
  if (onboarding.step.value === 1) return !!location.value
  return true
})

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
  searchQuery.value = ''
  clearSuggestions()
}

async function enableNotifications() {
  if (!notifications.settings.value.enabled) {
    await notifications.toggleEnabled()
  }
}

function finish() {
  onboarding.complete()
}

function skip() {
  onboarding.complete()
}

function next() {
  if (onboarding.step.value >= maxStep) {
    finish()
    return
  }
  onboarding.nextStep(maxStep)
}

function back() {
  onboarding.prevStep()
}

// Progress bar percentage
const progressPct = computed(() =>
  Math.round((onboarding.step.value / maxStep) * 100)
)
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="onboarding.isOpen.value"
        class="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
        style="background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);"
      >
        <Transition
          enter-active-class="transition-all duration-400 ease-out"
          leave-active-class="transition-all duration-250 ease-in"
          enter-from-class="opacity-0 translate-y-8 md:translate-y-0 md:scale-95"
          leave-to-class="opacity-0 translate-y-8 md:translate-y-0 md:scale-95"
        >
          <div
            v-if="onboarding.isOpen.value"
            class="glass-strong w-full md:max-w-lg rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col max-h-[90dvh]"
          >
            <!-- Progress bar -->
            <div class="h-1 w-full bg-[var(--glass-bg-subtle)]">
              <div
                class="h-full bg-[var(--color-primary-light)] transition-all duration-500"
                :style="{ width: `${progressPct}%` }"
              />
            </div>

            <!-- Header with icon + skip -->
            <div class="flex items-center justify-between px-6 pt-5 pb-2">
              <div class="text-3xl">{{ currentStep?.icon }}</div>
              <button
                v-if="onboarding.step.value < maxStep"
                class="text-xs text-themed-faint hover:text-themed-secondary transition-colors"
                @click="skip"
              >
                {{ t('onboarding.skip') }}
              </button>
            </div>

            <!-- Step body (scrollable) -->
            <div class="px-6 pb-4 flex-1 overflow-y-auto">
              <!-- Step 0: Welcome -->
              <div v-if="currentStep?.key === 'welcome'" class="space-y-4">
                <h2 class="text-2xl font-bold tracking-tight">
                  {{ t('onboarding.welcomeTitle') }}
                </h2>
                <p class="text-themed-secondary text-sm leading-relaxed">
                  {{ t('onboarding.welcomeBody') }}
                </p>
                <ul class="space-y-2 text-sm text-themed-secondary pt-2">
                  <li class="flex items-center gap-2">
                    <span>🕌</span>
                    <span>{{ t('onboarding.featurePrayer') }}</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span>📖</span>
                    <span>{{ t('onboarding.featureQuran') }}</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span>🧭</span>
                    <span>{{ t('onboarding.featureQibla') }}</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span>📿</span>
                    <span>{{ t('onboarding.featureTools') }}</span>
                  </li>
                </ul>
              </div>

              <!-- Step 1: Location -->
              <div v-else-if="currentStep?.key === 'location'" class="space-y-4">
                <h2 class="text-xl font-bold tracking-tight">
                  {{ t('onboarding.locationTitle') }}
                </h2>
                <p class="text-themed-secondary text-sm">
                  {{ t('onboarding.locationBody') }}
                </p>

                <div v-if="location" class="glass-primary rounded-xl px-4 py-3">
                  <p class="text-sm text-themed-secondary">
                    📍 {{ location.displayName }}
                  </p>
                  <p class="text-xs text-themed-faint mt-0.5">
                    {{ location.latitude.toFixed(3) }}°, {{ location.longitude.toFixed(3) }}°
                  </p>
                </div>

                <button
                  class="w-full px-4 py-3 rounded-xl bg-[var(--color-primary)] text-white font-medium text-sm transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
                  :disabled="locLoading"
                  @click="detectGPS()"
                >
                  <span v-if="locLoading" class="animate-spin">⟳</span>
                  <span v-else>🎯</span>
                  {{ locLoading ? t('common.loading') : t('location.detectGPS') }}
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
                  <div
                    v-if="suggestions.length > 0"
                    class="absolute left-0 right-0 top-full mt-1 glass-strong rounded-xl overflow-hidden z-50 shadow-lg max-h-60 overflow-y-auto"
                  >
                    <button
                      v-for="(s, i) in suggestions"
                      :key="i"
                      class="w-full text-left px-4 py-3 text-sm hover:bg-[var(--color-primary)]/10 transition-colors border-b border-[var(--glass-border)] last:border-b-0 flex items-center gap-2"
                      @click="handleSelect(s)"
                    >
                      <span>📍</span>
                      <span class="truncate">{{ s.displayName }}</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Step 2: Method -->
              <div v-else-if="currentStep?.key === 'method'" class="space-y-4">
                <h2 class="text-xl font-bold tracking-tight">
                  {{ t('onboarding.methodTitle') }}
                </h2>
                <p class="text-themed-secondary text-sm">
                  {{ t('onboarding.methodBody') }}
                </p>
                <div class="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                  <button
                    v-for="m in PRAYER_METHODS"
                    :key="m.id"
                    :class="[
                      'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all',
                      prayerTimes.method.value === m.id
                        ? 'glass-primary text-[var(--color-primary-light)]'
                        : 'glass-subtle text-themed-secondary hover:text-themed'
                    ]"
                    @click="prayerTimes.setMethod(m.id)"
                  >
                    <div>
                      <p class="text-sm font-medium">{{ m.name }}</p>
                      <p class="text-xs text-themed-faint">{{ m.region }}</p>
                    </div>
                    <span v-if="prayerTimes.method.value === m.id">✓</span>
                  </button>
                </div>
              </div>

              <!-- Step 3: Notifications -->
              <div v-else-if="currentStep?.key === 'notifications'" class="space-y-4">
                <h2 class="text-xl font-bold tracking-tight">
                  {{ t('onboarding.notificationsTitle') }}
                </h2>
                <p class="text-themed-secondary text-sm">
                  {{ t('onboarding.notificationsBody') }}
                </p>

                <div v-if="notifications.permission.value === 'denied'" class="glass-subtle rounded-xl px-4 py-3 text-xs text-[var(--color-danger)]">
                  {{ t('notifications.denied') }}
                </div>

                <button
                  v-else-if="!notifications.settings.value.enabled"
                  class="w-full px-4 py-3 rounded-xl bg-[var(--color-primary)] text-white font-medium text-sm transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
                  @click="enableNotifications"
                >
                  🔔 {{ t('onboarding.enableNotifications') }}
                </button>

                <div v-else class="glass-primary rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-[var(--color-primary-light)]">
                  <span>✓</span>
                  <span>{{ t('onboarding.notificationsEnabled') }}</span>
                </div>

                <p v-if="notifications.supportsBackgroundScheduling()" class="text-xs text-themed-faint">
                  {{ t('onboarding.backgroundSupported') }}
                </p>
                <p v-else class="text-xs text-themed-faint">
                  {{ t('onboarding.backgroundLimited') }}
                </p>
              </div>

              <!-- Step 4: Nav picker -->
              <div v-else-if="currentStep?.key === 'nav'" class="space-y-4">
                <h2 class="text-xl font-bold tracking-tight">
                  {{ t('onboarding.navTitle') }}
                </h2>
                <p class="text-themed-secondary text-sm">
                  {{ t('onboarding.navBody') }}
                </p>
                <div class="grid grid-cols-3 gap-2">
                  <button
                    v-for="item in nav.mobileChoosableItems.value"
                    :key="item.id"
                    :class="[
                      'flex flex-col items-center gap-1 py-3 px-1 rounded-xl transition-all text-[11px]',
                      item.selected
                        ? 'glass-primary text-[var(--color-primary-light)]'
                        : 'glass-subtle text-themed-faint',
                      !item.selected && nav.mobileNavIds.value.length >= nav.maxMobileItems
                        ? 'opacity-40 pointer-events-none'
                        : '',
                    ]"
                    @click="nav.toggleMobileNavItem(item.id)"
                  >
                    <AppIcon :name="item.icon" :size="20" />
                    <span class="leading-tight text-center">{{ t(item.label) }}</span>
                  </button>
                </div>
                <p class="text-xs text-themed-faint text-center">
                  {{ nav.mobileNavIds.value.length }}/{{ nav.maxMobileItems }} {{ t('onboarding.navSelected') }}
                </p>
              </div>

              <!-- Step 5: Done -->
              <div v-else-if="currentStep?.key === 'done'" class="space-y-4 text-center">
                <div class="text-6xl animate-pulse-glow">☪</div>
                <h2 class="text-2xl font-bold tracking-tight">
                  {{ t('onboarding.doneTitle') }}
                </h2>
                <p class="text-themed-secondary text-sm">
                  {{ t('onboarding.doneBody') }}
                </p>
              </div>
            </div>

            <!-- Footer: step dots + nav buttons -->
            <div class="px-6 pt-3 pb-5 border-t border-[var(--glass-border)] space-y-3">
              <!-- Step dots -->
              <div class="flex items-center justify-center gap-1.5">
                <span
                  v-for="(s, i) in steps"
                  :key="s.key"
                  :class="[
                    'h-1.5 rounded-full transition-all duration-300',
                    i === onboarding.step.value
                      ? 'w-6 bg-[var(--color-primary-light)]'
                      : i < onboarding.step.value
                        ? 'w-1.5 bg-[var(--color-primary-light)] opacity-60'
                        : 'w-1.5 bg-[var(--glass-border-strong)]',
                  ]"
                />
              </div>

              <!-- Buttons -->
              <div class="flex items-center gap-2">
                <button
                  v-if="onboarding.step.value > 0"
                  class="px-4 py-2.5 rounded-xl glass-subtle text-themed-secondary text-sm font-medium transition-all hover:text-themed"
                  @click="back"
                >
                  {{ t('onboarding.back') }}
                </button>
                <button
                  :disabled="!canAdvance"
                  :class="[
                    'flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                    canAdvance
                      ? 'bg-[var(--color-primary)] text-white hover:opacity-90 active:scale-[0.98]'
                      : 'glass-subtle text-themed-faint cursor-not-allowed',
                  ]"
                  @click="next"
                >
                  {{
                    onboarding.step.value >= maxStep
                      ? t('onboarding.finish')
                      : t('onboarding.next')
                  }}
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
