<script setup lang="ts">
import { PRAYER_METHODS } from '~/data/prayer-methods'

const { t, locale, setLocale, locales } = useI18n()
const { location } = useLocation()
const theme = useTheme()
const notifications = useNotifications()
const prayerTimes = usePrayerTimes()
const offlineQuran = useOfflineQuran()

const showMethodPicker = ref(false)

onMounted(() => {
  notifications.loadSettings()
  offlineQuran.checkStatus()
})

// Available locales from config
const availableLocales = computed(() => {
  return (locales.value as Array<{ code: string, name: string }>).map(l => ({
    code: l.code,
    name: l.name,
  }))
})

function switchLocale(code: string) {
  setLocale(code)
  if (import.meta.client) {
    localStorage.setItem('muslimapp-locale', code)
  }
}

function switchTheme(mode: 'dark' | 'light' | 'system') {
  theme.setTheme(mode)
}

const minutesOptions = [0, 5, 10, 15, 30]
</script>

<template>
  <div class="px-4 pt-6 space-y-5 max-w-lg mx-auto">
    <header>
      <h1 class="text-2xl font-semibold">
        {{ t('settings.title') }}
      </h1>
    </header>

    <!-- Theme -->
    <GlassCard>
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('settings.theme') }}
        </h3>
        <div class="flex gap-2">
          <button
            v-for="mode in (['dark', 'light', 'system'] as const)"
            :key="mode"
            :class="[
              'flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200',
              theme.mode.value === mode
                ? 'bg-[var(--color-primary)] text-white'
                : 'glass-subtle text-themed-secondary hover:text-themed',
            ]"
            @click="switchTheme(mode)"
          >
            {{ mode === 'dark' ? '🌙' : mode === 'light' ? '☀️' : '💻' }}
            {{ t(`settings.theme${mode.charAt(0).toUpperCase() + mode.slice(1)}`) }}
          </button>
        </div>
      </div>
    </GlassCard>

    <!-- Language -->
    <GlassCard>
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('settings.language') }}
        </h3>
        <div class="flex gap-2">
          <button
            v-for="loc in availableLocales"
            :key="loc.code"
            :class="[
              'flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200',
              locale === loc.code
                ? 'bg-[var(--color-primary)] text-white'
                : 'glass-subtle text-themed-secondary hover:text-themed',
            ]"
            @click="switchLocale(loc.code)"
          >
            {{ loc.code === 'de' ? '🇩🇪' : loc.code === 'tr' ? '🇹🇷' : '🇬🇧' }}
            {{ loc.name }}
          </button>
        </div>
      </div>
    </GlassCard>

    <!-- Location -->
    <GlassCard>
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('settings.location') }}
        </h3>
        <p v-if="location" class="text-themed-secondary">
          📍 {{ location.displayName || `${location.city}, ${location.country}` }}
        </p>
        <p v-else class="text-themed-muted italic text-sm">
          {{ t('settings.noLocation') }}
        </p>
        <p v-if="location" class="text-xs text-themed-faint">
          {{ location.latitude.toFixed(4) }}°N, {{ location.longitude.toFixed(4) }}°E
        </p>
      </div>
    </GlassCard>

    <!-- Notifications -->
    <GlassCard>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
            {{ t('notifications.title') }}
          </h3>
          <button
            :class="[
              'relative w-12 h-7 rounded-full transition-all duration-200',
              notifications.settings.value.enabled
                ? 'bg-[var(--color-primary)]'
                : 'glass-subtle'
            ]"
            @click="notifications.toggleEnabled()"
          >
            <span
              :class="[
                'absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all duration-200',
                notifications.settings.value.enabled ? 'left-6' : 'left-1'
              ]"
            />
          </button>
        </div>

        <template v-if="notifications.settings.value.enabled">
          <!-- Minutes before -->
          <div class="space-y-2">
            <p class="text-xs text-themed-muted">{{ t('notifications.minutesBefore') }}</p>
            <div class="flex gap-2">
              <button
                v-for="min in minutesOptions"
                :key="min"
                :class="[
                  'flex-1 py-1.5 rounded-lg text-xs font-medium transition-all',
                  notifications.settings.value.minutesBefore === min
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'glass-subtle text-themed-secondary'
                ]"
                @click="notifications.setMinutesBefore(min)"
              >
                {{ min === 0 ? t('notifications.atTime') : `${min} min` }}
              </button>
            </div>
          </div>

          <!-- Per-prayer toggles -->
          <div class="space-y-2">
            <p class="text-xs text-themed-muted">{{ t('notifications.prayers') }}</p>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="prayer in notifications.PRAYER_NAMES"
                :key="prayer"
                :class="[
                  'py-2 px-3 rounded-xl text-xs font-medium transition-all',
                  notifications.settings.value.prayerAlerts[prayer]
                    ? 'bg-[var(--color-primary)] bg-opacity-20 text-[var(--color-primary-light)] border border-[var(--color-primary)]'
                    : 'glass-subtle text-themed-faint'
                ]"
                @click="notifications.togglePrayer(prayer)"
              >
                {{ t(`prayer.${prayer.toLowerCase()}`) }}
              </button>
            </div>
          </div>
        </template>

        <p v-if="notifications.permission.value === 'denied'" class="text-xs text-[var(--color-danger)]">
          {{ t('notifications.denied') }}
        </p>
      </div>
    </GlassCard>

    <!-- Offline Quran -->
    <GlassCard>
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('offline.title') }}
        </h3>

        <!-- Status -->
        <div v-if="offlineQuran.status.value.downloaded" class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-[var(--color-primary-light)]">✓</span>
            <span class="text-sm text-themed-secondary">{{ t('offline.downloaded') }}</span>
          </div>
          <p class="text-xs text-themed-faint">
            {{ offlineQuran.status.value.surahsDownloaded }}/114 {{ t('quran.surahs') }}
            · ~{{ offlineQuran.status.value.sizeEstimateMB }} MB
          </p>
          <button
            class="text-xs text-[var(--color-danger)] hover:underline"
            @click="offlineQuran.deleteAll()"
          >
            {{ t('offline.delete') }}
          </button>
        </div>

        <!-- Download in progress -->
        <div v-else-if="offlineQuran.downloading.value" class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span class="text-themed-secondary">{{ t('offline.downloading') }}</span>
            <span class="text-themed-muted tabular-nums">{{ offlineQuran.downloadProgress.value }}/114</span>
          </div>
          <!-- Progress bar -->
          <div class="w-full h-2 rounded-full glass-subtle overflow-hidden">
            <div
              class="h-full rounded-full bg-[var(--color-primary-light)] transition-all duration-300"
              :style="{ width: `${(offlineQuran.downloadProgress.value / 114) * 100}%` }"
            />
          </div>
          <p class="text-xs text-themed-faint">
            {{ t('offline.downloadHint') }}
          </p>
        </div>

        <!-- Not downloaded -->
        <div v-else class="space-y-2">
          <p class="text-sm text-themed-secondary">
            {{ t('offline.notDownloaded') }}
          </p>
          <button
            class="w-full py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-medium transition-all hover:opacity-90"
            @click="offlineQuran.downloadAll()"
          >
            📥 {{ t('offline.downloadButton') }}
          </button>
          <p class="text-xs text-themed-faint">
            {{ t('offline.sizeHint') }}
          </p>
        </div>

        <!-- Error -->
        <p v-if="offlineQuran.downloadError.value" class="text-xs text-[var(--color-danger)]">
          {{ offlineQuran.downloadError.value }}
        </p>
      </div>
    </GlassCard>

    <!-- Calculation Method -->
    <GlassCard>
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('settings.calculationMethod') }}
        </h3>

        <!-- Current method -->
        <button
          class="w-full flex items-center justify-between px-3 py-2 rounded-xl glass-subtle"
          @click="showMethodPicker = !showMethodPicker"
        >
          <div class="text-left">
            <p class="text-sm text-themed-secondary">
              🕌 {{ PRAYER_METHODS.find(m => m.id === prayerTimes.method.value)?.name || 'Diyanet' }}
            </p>
            <p class="text-xs text-themed-faint">
              {{ PRAYER_METHODS.find(m => m.id === prayerTimes.method.value)?.region }}
            </p>
          </div>
          <span class="text-themed-faint">{{ showMethodPicker ? '▲' : '▼' }}</span>
        </button>

        <!-- Method list -->
        <Transition name="slide">
          <div v-if="showMethodPicker" class="space-y-1 max-h-60 overflow-y-auto">
            <button
              v-for="m in PRAYER_METHODS"
              :key="m.id"
              :class="[
                'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all',
                prayerTimes.method.value === m.id
                  ? 'bg-[var(--color-primary)] bg-opacity-20 text-[var(--color-primary-light)]'
                  : 'hover:bg-[var(--glass-bg-subtle)] text-themed-secondary'
              ]"
              @click="prayerTimes.setMethod(m.id); showMethodPicker = false"
            >
              <div>
                <p class="text-sm font-medium">{{ m.name }}</p>
                <p class="text-xs text-themed-faint">{{ m.region }}</p>
              </div>
              <span v-if="prayerTimes.method.value === m.id" class="text-[var(--color-primary-light)]">✓</span>
            </button>
          </div>
        </Transition>

        <p class="text-xs text-themed-faint">
          {{ t('settings.methodHint') }}
        </p>
      </div>
    </GlassCard>

    <!-- About -->
    <GlassCard variant="subtle">
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('settings.about') }}
        </h3>
        <p class="text-themed-muted text-sm">
          MuslimApp v0.5.0 — Phase 4+
        </p>
        <p class="text-themed-faint text-xs">
          {{ t('settings.apiInfo') }}
        </p>
      </div>
    </GlassCard>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
