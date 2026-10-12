<script setup lang="ts">
/**
 * Global mini player for verse-by-verse recitation. Rendered by the Quran pages
 * (not the layout): fixed above the mobile bottom nav, bottom-right area on md+.
 * Controls: prev / play-pause / next verse, seek, speed, repeat, Hifz range loop,
 * continue-to-next-surah, reciter.
 */
import { REPEAT_OPTIONS, SPEED_OPTIONS, verseLink } from '~/utils/quran'

const { t } = useI18n()
const route = useRoute()
const audio = useQuranAudio()
const quran = useQuran()

const showOptions = ref(false)

onMounted(() => audio.loadSettings())

const active = computed(() => audio.surah.value !== null && audio.verse.value !== null)

const surahInfo = computed(() => audio.surah.value ? quran.getSurah(audio.surah.value) : undefined)
const title = computed(() => {
  if (audio.surah.value === null) return ''
  const name = surahInfo.value?.nameSimple ?? `${t('quran.surahs')} ${audio.surah.value}`
  return `${name} ${audio.surah.value}:${audio.verse.value}`
})

const versesCount = computed(() => surahInfo.value?.versesCount ?? audio.verse.value ?? 1)
const verseNumbers = computed(() => Array.from({ length: versesCount.value }, (_, i) => i + 1))

// The reader page for the playing surah is already open?
const onPlayingSurah = computed(() => route.path === `/quran/${audio.surah.value}`)
const playingLink = computed(() => audio.surah.value ? verseLink(audio.surah.value, audio.verse.value) : '/quran')

// Hifz range inputs
const rangeFrom = ref(1)
const rangeTo = ref(1)
watch(() => [audio.surah.value, audio.verse.value] as const, ([s, v]) => {
  if (!audio.range.value && v) {
    rangeFrom.value = v
    rangeTo.value = Math.min(versesCount.value, v + 4)
  }
  if (s === null) showOptions.value = false
}, { immediate: true })

const rangeActive = computed(() => {
  const r = audio.range.value
  return r && r.surah === audio.surah.value ? r : null
})

function startRange() {
  if (audio.surah.value === null) return
  const from = Number(rangeFrom.value)
  const to = Number(rangeTo.value)
  audio.setRange(audio.surah.value, from, to)
  const r = audio.range.value
  if (r && audio.verse.value !== null && (audio.verse.value < r.from || audio.verse.value > r.to)) {
    void audio.playVerse(r.surah, r.from)
  }
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function onSeek(event: Event) {
  audio.seek(Number((event.target as HTMLInputElement).value))
}

function onReciter(event: Event) {
  audio.setReciter(Number((event.target as HTMLSelectElement).value))
}

function repeatLabel(n: number): string {
  return n === 0 ? t('audio.repeatInfinite') : t('audio.repeatTimes', { n })
}

const repeatStatus = computed(() => {
  const total = audio.repeatCount.value
  if (total === 1) return ''
  return t('audio.repeatProgress', {
    current: audio.repeatsDone.value + 1,
    total: total === 0 ? '∞' : total,
  })
})

const chipBase = 'px-3 py-1.5 rounded-full text-xs font-medium transition-colors'
const chipOn = 'bg-[var(--color-primary)]/25 text-[var(--color-primary-light)]'
const chipOff = 'glass-subtle text-themed-secondary hover:text-themed'
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="miniplayer">
        <div v-if="active" class="quran-miniplayer" role="region" :aria-label="t('audio.player')">
          <div class="quran-miniplayer-inner glass">
            <!-- Main row -->
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="w-9 h-9 shrink-0 flex items-center justify-center rounded-full glass-subtle text-themed-secondary hover:text-themed"
                :aria-label="t('audio.prev')"
                @click="audio.prev()"
              >
                <AppIcon name="chevronRight" :size="16" class="rotate-180" />
              </button>
              <button
                type="button"
                class="w-11 h-11 shrink-0 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center transition-opacity hover:opacity-90"
                :aria-label="audio.isPlaying.value ? t('quran.pause') : t('audio.play')"
                @click="audio.toggle()"
              >
                <LoadingSpinner v-if="audio.loading.value" size="sm" />
                <AppIcon v-else :name="audio.isPlaying.value ? 'pause' : 'play'" :size="20" :stroke="2" />
              </button>
              <button
                type="button"
                class="w-9 h-9 shrink-0 flex items-center justify-center rounded-full glass-subtle text-themed-secondary hover:text-themed"
                :aria-label="t('audio.next')"
                @click="audio.next()"
              >
                <AppIcon name="chevronRight" :size="16" />
              </button>

              <div class="flex-1 min-w-0 px-1">
                <p class="text-sm font-medium text-themed truncate" aria-live="polite">
                  {{ title }}
                </p>
                <p class="text-[11px] text-themed-muted truncate">
                  {{ audio.reciter.value.name }}
                  <template v-if="repeatStatus"> · {{ repeatStatus }}</template>
                  <template v-if="rangeActive"> · {{ t('audio.rangeActive', { from: rangeActive.from, to: rangeActive.to }) }}</template>
                </p>
              </div>

              <NuxtLink
                v-if="!onPlayingSurah"
                :to="playingLink"
                class="hidden sm:flex h-9 px-3 items-center rounded-full glass-subtle text-xs text-themed-secondary hover:text-themed"
              >
                {{ t('audio.goToVerse') }}
              </NuxtLink>
              <button
                type="button"
                class="w-9 h-9 shrink-0 flex items-center justify-center rounded-full glass-subtle text-themed-secondary hover:text-themed"
                :aria-expanded="showOptions"
                aria-controls="quran-player-options"
                :aria-label="t('audio.options')"
                @click="showOptions = !showOptions"
              >
                <AppIcon :name="showOptions ? 'chevronDown' : 'chevronUp'" :size="16" />
              </button>
              <button
                type="button"
                class="w-9 h-9 shrink-0 flex items-center justify-center rounded-full glass-subtle text-themed-secondary hover:text-themed"
                :aria-label="t('audio.close')"
                @click="audio.stop()"
              >
                <AppIcon name="close" :size="16" />
              </button>
            </div>

            <!-- Seek -->
            <div class="flex items-center gap-2 mt-2">
              <span class="text-[10px] text-themed-faint tabular-nums w-8">{{ formatTime(audio.currentTime.value) }}</span>
              <input
                type="range"
                min="0"
                :max="audio.duration.value || 0"
                step="0.1"
                :value="audio.currentTime.value"
                class="flex-1 h-1 accent-[var(--color-primary)] cursor-pointer"
                :aria-label="t('a11y.seek')"
                :aria-valuetext="`${formatTime(audio.currentTime.value)} / ${formatTime(audio.duration.value)}`"
                @input="onSeek"
              >
              <span class="text-[10px] text-themed-faint tabular-nums w-8 text-right">{{ formatTime(audio.duration.value) }}</span>
            </div>

            <p v-if="audio.error.value" class="text-xs text-[var(--color-danger)] mt-2" role="alert">
              {{ audio.error.value }}
            </p>

            <!-- Options -->
            <div v-if="showOptions" id="quran-player-options" class="mt-3 pt-3 border-t border-[var(--glass-border)] space-y-3 max-h-[45vh] overflow-y-auto">
              <div>
                <p class="text-[11px] font-semibold text-themed-muted uppercase tracking-wider mb-1.5">{{ t('audio.speed') }}</p>
                <div class="flex flex-wrap gap-1.5" role="group" :aria-label="t('audio.speed')">
                  <button
                    v-for="s in SPEED_OPTIONS"
                    :key="s"
                    type="button"
                    :class="[chipBase, audio.speed.value === s ? chipOn : chipOff]"
                    :aria-pressed="audio.speed.value === s"
                    @click="audio.setSpeed(s)"
                  >
                    {{ s }}×
                  </button>
                </div>
              </div>

              <div>
                <p class="text-[11px] font-semibold text-themed-muted uppercase tracking-wider mb-1.5">{{ t('audio.repeat') }}</p>
                <div class="flex flex-wrap gap-1.5" role="group" :aria-label="t('audio.repeat')">
                  <button
                    v-for="n in REPEAT_OPTIONS"
                    :key="n"
                    type="button"
                    :class="[chipBase, audio.repeatCount.value === n ? chipOn : chipOff]"
                    :aria-pressed="audio.repeatCount.value === n"
                    @click="audio.setRepeatCount(n)"
                  >
                    {{ repeatLabel(n) }}
                  </button>
                </div>
              </div>

              <div>
                <p class="text-[11px] font-semibold text-themed-muted uppercase tracking-wider mb-1.5">{{ t('audio.range') }}</p>
                <div class="flex flex-wrap items-center gap-2">
                  <label class="flex items-center gap-1.5 text-xs text-themed-secondary">
                    {{ t('audio.rangeFrom') }}
                    <select v-model.number="rangeFrom" class="glass-subtle rounded-lg px-2 py-1 text-xs text-themed bg-transparent">
                      <option v-for="n in verseNumbers" :key="n" :value="n" class="text-black">{{ n }}</option>
                    </select>
                  </label>
                  <label class="flex items-center gap-1.5 text-xs text-themed-secondary">
                    {{ t('audio.rangeTo') }}
                    <select v-model.number="rangeTo" class="glass-subtle rounded-lg px-2 py-1 text-xs text-themed bg-transparent">
                      <option v-for="n in verseNumbers" :key="n" :value="n" class="text-black">{{ n }}</option>
                    </select>
                  </label>
                  <button type="button" :class="[chipBase, chipOn]" @click="startRange">
                    {{ t('audio.rangeStart') }}
                  </button>
                  <button v-if="rangeActive" type="button" :class="[chipBase, chipOff]" @click="audio.clearRange()">
                    {{ t('audio.rangeClear') }}
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between gap-3">
                <span id="quran-continue-label" class="text-sm text-themed-secondary">{{ t('audio.continueNext') }}</span>
                <ToggleSwitch
                  :model-value="audio.continueNext.value"
                  aria-labelledby="quran-continue-label"
                  size="sm"
                  @update:model-value="audio.setContinueNext($event)"
                />
              </div>

              <label class="block">
                <span class="text-[11px] font-semibold text-themed-muted uppercase tracking-wider">{{ t('audio.reciter') }}</span>
                <select
                  class="mt-1.5 w-full glass-subtle rounded-xl px-3 py-2 text-sm text-themed bg-transparent"
                  :value="audio.reciterId.value"
                  @change="onReciter"
                >
                  <option v-for="r in audio.RECITERS" :key="r.id" :value="r.id" class="text-black">
                    {{ r.name }}{{ r.teaching ? ` · ${t('audio.teaching')}` : '' }}
                  </option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<style scoped>
/* Sits above the floating mobile nav (≈ 4.5rem pill + 0.75rem gap + safe area). */
.quran-miniplayer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(6.5rem + env(safe-area-inset-bottom, 0px));
  z-index: 55;
  padding: 0 0.75rem;
  pointer-events: none;
}

.quran-miniplayer-inner {
  pointer-events: auto;
  max-width: 48rem;
  margin: 0 auto;
  padding: 0.625rem 0.75rem;
  border-radius: 1.25rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

@media (min-width: 768px) {
  .quran-miniplayer {
    bottom: 1rem;
    padding-left: calc(4.5rem + 0.75rem); /* desktop icon rail */
  }
}

.miniplayer-enter-active,
.miniplayer-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.miniplayer-enter-from,
.miniplayer-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
@media (prefers-reduced-motion: reduce) {
  .miniplayer-enter-active,
  .miniplayer-leave-active {
    transition: none;
  }
}
</style>
