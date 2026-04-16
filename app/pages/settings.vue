<script setup lang="ts">
import { PRAYER_METHODS } from '~/data/prayer-methods'
import { HADITHS } from '~/data/hadiths'
import { ALLAH_NAMES } from '~/data/allah-names'

const { t, locale, setLocale, locales } = useI18n()
const { location } = useLocation()
const theme = useTheme()
const notifications = useNotifications()
const dhikrReminders = useDhikrReminders()
const prayerTimes = usePrayerTimes()
const offlineQuran = useOfflineQuran()
const onboarding = useOnboarding()
const haptics = useHaptics()

const showMethodPicker = ref(false)

// Progress tracking
const quranProgress = useProgress('quran', 114)
const seerahProgress = useProgress('seerah', 11)
const hadithProgress = useProgress('hadith', HADITHS.length)
const namesProgress = useProgress('names', ALLAH_NAMES.length)

const progressAreas = computed(() => [
  { key: 'quran', label: t('nav.quran'), icon: '📖', progress: quranProgress },
  { key: 'seerah', label: 'Seerah', icon: '📕', progress: seerahProgress },
  { key: 'hadith', label: t('hadith.title'), icon: '📜', progress: hadithProgress },
  { key: 'names', label: t('names.title'), icon: '✨', progress: namesProgress },
])

function resetArea(area: { progress: ReturnType<typeof useProgress> }) {
  if (confirm(t('common.resetConfirm'))) {
    area.progress.resetAll()
  }
}

function resetAllProgress() {
  if (confirm(t('common.resetConfirm'))) {
    quranProgress.resetAll()
    seerahProgress.resetAll()
    hadithProgress.resetAll()
    namesProgress.resetAll()
  }
}

onMounted(() => {
  notifications.loadSettings()
  dhikrReminders.loadSettings()
  offlineQuran.checkStatus()
  quranProgress.load()
  seerahProgress.load()
  hadithProgress.load()
  namesProgress.load()
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
  <div class="app-container pt-6 space-y-5">
    <header>
      <h1 class="text-2xl font-semibold">
        {{ t('settings.title') }}
      </h1>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
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

    <!-- Dhikr Reminders -->
    <GlassCard>
      <div class="space-y-3">
        <div class="flex items-center justify-between gap-3">
          <div class="min-w-0">
            <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
              {{ t('dhikrReminder.title') }}
            </h3>
            <p class="text-xs text-themed-faint mt-0.5">
              {{ t('dhikrReminder.subtitle') }}
            </p>
          </div>
          <button
            :class="[
              'relative w-12 h-7 rounded-full transition-all duration-200 shrink-0',
              dhikrReminders.settings.value.enabled
                ? 'bg-[var(--color-primary)]'
                : 'glass-subtle'
            ]"
            :aria-label="t('dhikrReminder.title')"
            @click="dhikrReminders.toggleEnabled()"
          >
            <span
              :class="[
                'absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all duration-200',
                dhikrReminders.settings.value.enabled ? 'left-6' : 'left-1'
              ]"
            />
          </button>
        </div>

        <template v-if="dhikrReminders.settings.value.enabled">
          <!-- Morning slot -->
          <div class="flex items-center justify-between gap-3 glass-subtle rounded-xl px-3 py-2">
            <button
              class="flex items-center gap-2 flex-1 min-w-0 text-left"
              @click="dhikrReminders.toggleSlot('morning')"
            >
              <span class="text-lg">🌅</span>
              <div class="min-w-0">
                <p class="text-sm font-medium text-themed">{{ t('dhikrReminder.morning') }}</p>
                <p class="text-[11px] text-themed-faint">{{ dhikrReminders.formatTime(dhikrReminders.settings.value.morning) }}</p>
              </div>
            </button>
            <input
              type="time"
              :value="dhikrReminders.formatTime(dhikrReminders.settings.value.morning)"
              class="glass-subtle text-themed text-xs px-2 py-1 rounded-md tabular-nums"
              @change="(e) => {
                const [h, m] = (e.target as HTMLInputElement).value.split(':').map(Number)
                if (!isNaN(h) && !isNaN(m)) dhikrReminders.setSlotTime('morning', h, m)
              }"
            >
            <button
              :class="[
                'relative w-10 h-6 rounded-full transition-all shrink-0',
                dhikrReminders.settings.value.morning.enabled ? 'bg-[var(--color-primary)]' : 'bg-[var(--glass-border)]'
              ]"
              @click="dhikrReminders.toggleSlot('morning')"
            >
              <span
                :class="[
                  'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all',
                  dhikrReminders.settings.value.morning.enabled ? 'left-[18px]' : 'left-0.5'
                ]"
              />
            </button>
          </div>

          <!-- Evening slot -->
          <div class="flex items-center justify-between gap-3 glass-subtle rounded-xl px-3 py-2">
            <button
              class="flex items-center gap-2 flex-1 min-w-0 text-left"
              @click="dhikrReminders.toggleSlot('evening')"
            >
              <span class="text-lg">🌙</span>
              <div class="min-w-0">
                <p class="text-sm font-medium text-themed">{{ t('dhikrReminder.evening') }}</p>
                <p class="text-[11px] text-themed-faint">{{ dhikrReminders.formatTime(dhikrReminders.settings.value.evening) }}</p>
              </div>
            </button>
            <input
              type="time"
              :value="dhikrReminders.formatTime(dhikrReminders.settings.value.evening)"
              class="glass-subtle text-themed text-xs px-2 py-1 rounded-md tabular-nums"
              @change="(e) => {
                const [h, m] = (e.target as HTMLInputElement).value.split(':').map(Number)
                if (!isNaN(h) && !isNaN(m)) dhikrReminders.setSlotTime('evening', h, m)
              }"
            >
            <button
              :class="[
                'relative w-10 h-6 rounded-full transition-all shrink-0',
                dhikrReminders.settings.value.evening.enabled ? 'bg-[var(--color-primary)]' : 'bg-[var(--glass-border)]'
              ]"
              @click="dhikrReminders.toggleSlot('evening')"
            >
              <span
                :class="[
                  'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all',
                  dhikrReminders.settings.value.evening.enabled ? 'left-[18px]' : 'left-0.5'
                ]"
              />
            </button>
          </div>

          <p v-if="!dhikrReminders.supportsBackground()" class="text-[11px] text-themed-faint">
            {{ t('dhikrReminder.foregroundOnly') }}
          </p>
        </template>
      </div>
    </GlassCard>

    <!-- Haptics -->
    <GlassCard v-if="haptics.isSupported.value">
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
              {{ t('settings.haptics') }}
            </h3>
            <p class="text-xs text-themed-faint mt-1">{{ t('settings.hapticsHint') }}</p>
          </div>
          <button
            :class="[
              'relative w-12 h-7 rounded-full transition-all duration-200',
              haptics.enabled.value ? 'bg-[var(--color-primary)]' : 'glass-subtle',
            ]"
            @click="haptics.setEnabled(!haptics.enabled.value); haptics.medium()"
          >
            <span
              :class="[
                'absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all duration-200',
                haptics.enabled.value ? 'left-6' : 'left-1',
              ]"
            />
          </button>
        </div>
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

    <!-- Progress Overview -->
    <GlassCard class="md:col-span-2">
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
            {{ t('common.progress') }}
          </h3>
          <button
            class="text-xs text-themed-faint hover:text-red-400 transition-colors"
            @click="resetAllProgress()"
          >
            {{ t('common.reset') }}
          </button>
        </div>

        <div class="space-y-2">
          <div
            v-for="area in progressAreas"
            :key="area.key"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl glass-subtle"
          >
            <span class="text-base">{{ area.icon }}</span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-medium text-themed-secondary">{{ area.label }}</span>
                <span class="text-xs text-themed-faint tabular-nums">
                  {{ area.progress.count.value }}/{{ area.progress.summary.value.total }} · {{ area.progress.percent.value }}%
                </span>
              </div>
              <div class="w-full h-1.5 rounded-full glass-subtle overflow-hidden">
                <div
                  class="h-full rounded-full bg-[var(--color-primary-light)] transition-all duration-500"
                  :style="{ width: `${area.progress.percent.value}%` }"
                />
              </div>
            </div>
            <button
              class="text-xs text-themed-faint hover:text-red-400 transition-colors px-2"
              @click="resetArea(area)"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </GlassCard>

    <!-- About -->
    <GlassCard variant="subtle" class="md:col-span-2">
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('settings.about') }}
        </h3>
        <p class="text-themed-muted text-sm">
          MuslimApp v0.5.0 — Phase 4+
        </p>
        <p class="text-themed-faint text-xs">
          {{ t('settings.apiInfo') }}
        </p>
        <button
          class="text-xs text-themed-secondary hover:text-themed underline-offset-2 hover:underline transition-colors"
          @click="onboarding.openManually()"
        >
          ☪ {{ t('onboarding.reopen') }}
        </button>
      </div>
    </GlassCard>
    </div><!-- end grid -->
  </div>
</template>

