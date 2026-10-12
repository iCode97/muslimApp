<script setup lang="ts">
import {
  ADJUSTABLE_PRAYERS,
  ASR_SCHOOLS,
  LATITUDE_ADJUSTMENT_OPTIONS,
  MAX_PRAYER_ADJUSTMENT,
  PRAYER_METHODS,
  type AdjustablePrayer,
  type LatitudeAdjustmentSetting,
} from '~/data/prayer-methods'
import { HADITHS } from '~/data/hadiths'
import { ALLAH_NAMES } from '~/data/allah-names'

const { t, locale, setLocale, locales } = useI18n()
const { location, ready: locationReady } = useLocation()
const theme = useTheme()
const notifications = useNotifications()
const dhikrReminders = useDhikrReminders()
const prayerTimes = usePrayerTimes()
const offlineQuran = useOfflineQuran()
const onboarding = useOnboarding()
const haptics = useHaptics()
const backup = useBackup()
const confirm = useConfirm()
const knowledge = useKnowledgeLevel()

const showMethodPicker = ref(false)
const showAdvanced = ref(false)
const importInput = ref<HTMLInputElement | null>(null)

// --- Advanced prayer calculation settings ---------------------------------

const LATITUDE_LABELS: Record<string, string> = {
  auto: 'settings.latAuto',
  0: 'settings.latNone',
  1: 'settings.latMiddle',
  2: 'settings.latSeventh',
  3: 'settings.latAngle',
}

function latitudeLabel(option: LatitudeAdjustmentSetting): string {
  return t(LATITUDE_LABELS[String(option)] ?? 'settings.latAuto')
}

const hasAdjustments = computed(() =>
  ADJUSTABLE_PRAYERS.some(p => prayerTimes.settings.value.adjustments[p] !== 0),
)

function adjust(prayer: AdjustablePrayer, delta: number) {
  prayerTimes.setAdjustment(prayer, prayerTimes.settings.value.adjustments[prayer] + delta)
}

function formatAdjustment(minutes: number): string {
  return minutes > 0 ? `+${minutes}` : String(minutes)
}

// --- Reminder delivery (Web Push vs. local) ---------------------------------

const anyReminderEnabled = computed(() =>
  notifications.settings.value.enabled || dhikrReminders.settings.value.enabled,
)

/** Why push isn't used (i18n key), shown below the "only while open" status. */
const localReason = computed(() => {
  if (notifications.iosNeedsInstall.value) return 'push.iosInstallHint'
  if (notifications.pushError.value) return notifications.pushError.value
  if (notifications.pushConfig.value && !notifications.pushConfig.value.enabled) return 'push.serverDisabled'
  return 'push.localHint'
})

/** Push could be used on this device (server configured, browser capable). */
const pushPossible = computed(() =>
  notifications.mode.value === 'push'
  || (!!notifications.pushConfig.value?.enabled && !notifications.iosNeedsInstall.value && notifications.mode.value !== 'unsupported'),
)

const testState = ref<'idle' | 'sending' | 'sent' | 'failed'>('idle')
let testResetTimer: ReturnType<typeof setTimeout> | undefined

async function sendTestNotification() {
  if (testState.value === 'sending') return
  testState.value = 'sending'
  const ok = await notifications.sendTest()
  testState.value = ok ? 'sent' : 'failed'
  if (testResetTimer) clearTimeout(testResetTimer)
  testResetTimer = setTimeout(() => { testState.value = 'idle' }, 4000)
}

// --- Dhikr reminder time inputs --------------------------------------------

function onDhikrTimeChange(slot: 'morning' | 'evening', event: Event) {
  const [h, m] = (event.target as HTMLInputElement).value.split(':').map(Number)
  if (h !== undefined && m !== undefined && !Number.isNaN(h) && !Number.isNaN(m)) {
    dhikrReminders.setSlotTime(slot, h, m)
  }
}

async function onImportFile(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  // Allow re-selecting the same file later
  input.value = ''
  if (file && await confirm({ message: t('settings.importConfirm') })) {
    backup.importData(file)
  }
}

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

async function resetArea(area: { progress: ReturnType<typeof useProgress> }) {
  if (await confirm({ message: t('common.resetConfirm'), danger: true })) {
    area.progress.resetAll()
  }
}

async function resetAllProgress() {
  if (await confirm({ message: t('common.resetConfirm'), danger: true })) {
    quranProgress.resetAll()
    seerahProgress.resetAll()
    hadithProgress.resetAll()
    namesProgress.resetAll()
  }
}

onMounted(() => {
  knowledge.load()
  notifications.loadSettings()
  dhikrReminders.loadSettings()
  notifications.refreshPushStatus()
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
  setLocale(code as Parameters<typeof setLocale>[0])
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

    <!-- Knowledge level -->
    <GlassCard>
      <div class="space-y-3">
        <div>
          <h3 id="knowledge-level-heading" class="text-sm font-medium text-themed-muted uppercase tracking-wider">
            {{ t('learn.levelHeading') }}
          </h3>
        </div>
        <div class="flex gap-2" role="radiogroup" aria-labelledby="knowledge-level-heading">
          <button
            v-for="lvl in knowledge.levels"
            :key="lvl.id"
            role="radio"
            :aria-checked="knowledge.level.value === lvl.id"
            :class="[
              'flex-1 py-2 px-2 rounded-xl text-sm font-medium transition-all duration-200',
              knowledge.level.value === lvl.id
                ? 'bg-[var(--color-primary)] text-white'
                : 'glass-subtle text-themed-secondary hover:text-themed',
            ]"
            @click="knowledge.setLevel(lvl.id)"
          >
            <span aria-hidden="true">{{ lvl.emoji }}</span>
            {{ t(`knowledge.${lvl.id}`) }}
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
        <template v-if="location">
          <!-- Tap to change (search / GPS) -->
          <LocationSelector />
          <p class="text-xs text-themed-faint">
            {{ Math.abs(location.latitude).toFixed(4) }}°{{ location.latitude >= 0 ? 'N' : 'S' }},
            {{ Math.abs(location.longitude).toFixed(4) }}°{{ location.longitude >= 0 ? 'E' : 'W' }}
            <template v-if="location.timezone">
              · {{ t('settings.timezone') }}: {{ location.timezone }}
            </template>
          </p>
        </template>
        <template v-else-if="locationReady">
          <p class="text-themed-muted italic text-sm">
            {{ t('settings.noLocation') }}
          </p>
          <LocationSetupCTA />
        </template>
      </div>
    </GlassCard>

    <!-- Notifications -->
    <GlassCard>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
            {{ t('notifications.title') }}
          </h3>
          <ToggleSwitch
            :model-value="notifications.settings.value.enabled"
            :aria-label="t('notifications.title')"
            @update:model-value="notifications.toggleEnabled()"
            />
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

        <!-- Delivery status (shared by prayer & dhikr reminders) -->
        <div v-if="anyReminderEnabled && notifications.permission.value === 'granted'" class="space-y-2 pt-1" data-testid="push-status">
          <div
            v-if="notifications.mode.value === 'push'"
            class="flex items-start gap-2 glass-primary rounded-xl px-3 py-2 text-xs text-[var(--color-primary-light)]"
          >
            <span aria-hidden="true">✓</span>
            <span>{{ t('push.statusPush') }}</span>
          </div>
          <div v-else-if="notifications.mode.value === 'unsupported'" class="glass-subtle rounded-xl px-3 py-2 text-xs text-themed-muted">
            {{ t('push.statusUnsupported') }}
          </div>
          <div v-else class="glass-subtle rounded-xl px-3 py-2 space-y-1">
            <p class="text-xs font-medium text-themed-secondary">{{ t('push.statusLocal') }}</p>
            <p class="text-[11px] text-themed-faint leading-relaxed">{{ t(localReason) }}</p>
          </div>

          <div class="flex items-center gap-3">
            <button
              type="button"
              class="glass-subtle rounded-lg px-3 py-1.5 text-xs font-medium text-themed-secondary disabled:opacity-50"
              :disabled="testState === 'sending'"
              @click="sendTestNotification"
            >
              {{ t('push.sendTest') }}
            </button>
            <span v-if="testState === 'sent'" class="text-[11px] text-[var(--color-primary-light)]" role="status">{{ t('push.testSent') }}</span>
            <span v-else-if="testState === 'failed'" class="text-[11px] text-[var(--color-danger)]" role="status">{{ t('push.testFailed') }}</span>
          </div>

          <p v-if="pushPossible" class="text-[11px] text-themed-faint leading-relaxed">
            {{ t('push.privacy') }}
          </p>
        </div>
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
          <ToggleSwitch
            :model-value="dhikrReminders.settings.value.enabled"
            :aria-label="t('dhikrReminder.title')"
            @update:model-value="dhikrReminders.toggleEnabled()"
            />
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
              @change="onDhikrTimeChange('morning', $event)"
            >
            <ToggleSwitch
              size="sm"
              :model-value="dhikrReminders.settings.value.morning.enabled"
              :aria-label="t('dhikrReminder.morning')"
              @update:model-value="dhikrReminders.toggleSlot('morning')"
              />
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
              @change="onDhikrTimeChange('evening', $event)"
            >
            <ToggleSwitch
              size="sm"
              :model-value="dhikrReminders.settings.value.evening.enabled"
              :aria-label="t('dhikrReminder.evening')"
              @update:model-value="dhikrReminders.toggleSlot('evening')"
              />
          </div>

          <p v-if="notifications.mode.value === 'push'" class="text-[11px] text-[var(--color-primary-light)]">
            ✓ {{ t('push.statusPush') }}
          </p>
          <p v-else-if="notifications.iosNeedsInstall.value" class="text-[11px] text-themed-faint">
            {{ t('push.iosInstallHint') }}
          </p>
          <p v-else-if="!dhikrReminders.supportsBackground()" class="text-[11px] text-themed-faint">
            {{ t('dhikrReminder.foregroundOnly') }}
          </p>
          <p v-if="dhikrReminders.permission.value === 'denied'" class="text-[11px] text-[var(--color-danger)]">
            {{ t('notifications.denied') }}
          </p>
        </template>
      </div>
    </GlassCard>

    <!-- Haptics -->
    <ClientOnly>
    <GlassCard v-if="haptics.isSupported.value">
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
              {{ t('settings.haptics') }}
            </h3>
            <p class="text-xs text-themed-faint mt-1">{{ t('settings.hapticsHint') }}</p>
          </div>
          <ToggleSwitch
            :model-value="haptics.enabled.value"
            :aria-label="t('settings.haptics')"
            @update:model-value="(v: boolean) => { haptics.setEnabled(v); haptics.medium() }"
            />
        </div>
      </div>
    </GlassCard>
    </ClientOnly>

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

        <!-- Advanced: Asr method, high latitudes, minute adjustments -->
        <button
          class="w-full flex items-center justify-between px-3 py-2 rounded-xl glass-subtle text-sm text-themed-secondary"
          :aria-expanded="showAdvanced"
          @click="showAdvanced = !showAdvanced"
        >
          <span>⚙️ {{ t('settings.advanced') }}</span>
          <span class="text-themed-faint">{{ showAdvanced ? '▲' : '▼' }}</span>
        </button>

        <Transition name="slide">
          <div v-if="showAdvanced" class="space-y-4 pt-1">
            <!-- Asr juristic method -->
            <div class="space-y-2">
              <p class="text-xs font-medium text-themed-muted">{{ t('settings.asrMethod') }}</p>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="school in ASR_SCHOOLS"
                  :key="school"
                  :class="[
                    'py-2 px-3 rounded-xl text-left transition-all',
                    prayerTimes.settings.value.school === school
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'glass-subtle text-themed-secondary hover:text-themed',
                  ]"
                  @click="prayerTimes.setSchool(school)"
                >
                  <p class="text-sm font-medium">{{ t(school === 0 ? 'settings.asrStandard' : 'settings.asrHanafi') }}</p>
                  <p class="text-[11px] opacity-75">{{ t(school === 0 ? 'settings.asrStandardHint' : 'settings.asrHanafiHint') }}</p>
                </button>
              </div>
            </div>

            <!-- High-latitude rule -->
            <div class="space-y-2">
              <p class="text-xs font-medium text-themed-muted">{{ t('settings.highLatitude') }}</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="option in LATITUDE_ADJUSTMENT_OPTIONS"
                  :key="String(option)"
                  :class="[
                    'py-1.5 px-3 rounded-lg text-xs font-medium transition-all',
                    prayerTimes.settings.value.latitudeAdjustment === option
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'glass-subtle text-themed-secondary hover:text-themed',
                  ]"
                  @click="prayerTimes.setLatitudeAdjustment(option)"
                >
                  {{ latitudeLabel(option) }}
                </button>
              </div>
              <p class="text-[11px] text-themed-faint">{{ t('settings.highLatitudeHint') }}</p>
            </div>

            <!-- Per-prayer minute adjustments -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-themed-muted">{{ t('settings.adjustments') }}</p>
                <button
                  v-if="hasAdjustments"
                  class="text-[11px] text-themed-faint hover:text-themed-secondary transition-colors"
                  @click="prayerTimes.resetAdjustments()"
                >
                  {{ t('settings.resetAdjustments') }}
                </button>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                <div
                  v-for="prayer in ADJUSTABLE_PRAYERS"
                  :key="prayer"
                  class="flex items-center justify-between gap-2 glass-subtle rounded-xl px-3 py-1.5"
                >
                  <span class="text-sm text-themed-secondary">{{ t(`prayer.${prayer.toLowerCase()}`) }}</span>
                  <div class="flex items-center gap-1.5">
                    <button
                      class="w-7 h-7 rounded-lg glass-subtle text-themed-secondary hover:text-themed text-sm font-bold disabled:opacity-40"
                      :disabled="prayerTimes.settings.value.adjustments[prayer] <= -MAX_PRAYER_ADJUSTMENT"
                      :aria-label="`${t(`prayer.${prayer.toLowerCase()}`)} −1 min`"
                      @click="adjust(prayer, -1)"
                    >
                      −
                    </button>
                    <span class="w-14 text-center text-xs tabular-nums text-themed">
                      {{ formatAdjustment(prayerTimes.settings.value.adjustments[prayer]) }} min
                    </span>
                    <button
                      class="w-7 h-7 rounded-lg glass-subtle text-themed-secondary hover:text-themed text-sm font-bold disabled:opacity-40"
                      :disabled="prayerTimes.settings.value.adjustments[prayer] >= MAX_PRAYER_ADJUSTMENT"
                      :aria-label="`${t(`prayer.${prayer.toLowerCase()}`)} +1 min`"
                      @click="adjust(prayer, 1)"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <p class="text-[11px] text-themed-faint">{{ t('settings.adjustmentsHint') }}</p>
            </div>
          </div>
        </Transition>
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

    <!-- Backup & Restore -->
    <GlassCard class="md:col-span-2">
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('settings.dataTitle') }}
        </h3>
        <p class="text-xs text-themed-faint">
          {{ t('settings.dataHint') }}
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            class="py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-medium transition-all hover:opacity-90"
            @click="backup.exportData()"
          >
            📤 {{ t('settings.exportData') }}
          </button>
          <button
            class="py-2.5 rounded-xl glass-subtle text-themed-secondary text-sm font-medium transition-all hover:text-themed"
            :disabled="backup.importing.value"
            @click="importInput?.click()"
          >
            📥 {{ t('settings.importData') }}
          </button>
          <input
            ref="importInput"
            type="file"
            accept="application/json,.json"
            class="hidden"
            @change="onImportFile"
          >
        </div>
        <p v-if="backup.importSuccess.value" class="text-xs text-[var(--color-primary-light)]">
          ✓ {{ t('settings.importSuccess') }}
        </p>
        <p v-if="backup.importError.value" class="text-xs text-[var(--color-danger)]">
          {{ t('settings.importError') }}
        </p>
      </div>
    </GlassCard>

    <!-- About -->
    <GlassCard variant="subtle" class="md:col-span-2">
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('settings.about') }}
        </h3>
        <p class="text-themed-muted text-sm">
          MuslimApp v0.6.0
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

