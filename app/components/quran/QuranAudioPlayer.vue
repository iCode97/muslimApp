<script setup lang="ts">
/**
 * Audio player for a surah — play/pause, seek bar, reciter picker.
 * Uses full-chapter recitations from the quran.com API.
 */

interface Props {
  surahId: number
}

const props = defineProps<Props>()

const { t } = useI18n()
const audio = useQuranAudio()

const showReciterPicker = ref(false)

onMounted(() => audio.loadReciter())

const isCurrentSurah = computed(() => audio.currentSurah.value === props.surahId)
const isPlayingThis = computed(() => isCurrentSurah.value && audio.isPlaying.value)

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function onSeek(event: Event) {
  audio.seek(Number((event.target as HTMLInputElement).value))
}

function selectReciter(id: number) {
  audio.setReciter(id)
  showReciterPicker.value = false
}
</script>

<template>
  <GlassCard>
    <div class="space-y-3">
      <div class="flex items-center gap-3">
        <!-- Play/Pause -->
        <button
          class="w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shrink-0 transition-all duration-200 hover:opacity-90 disabled:opacity-50"
          :disabled="audio.loading.value"
          :aria-label="isPlayingThis ? t('quran.pause') : t('quran.listen')"
          @click="audio.toggle(surahId)"
        >
          <LoadingSpinner v-if="audio.loading.value" size="sm" />
          <AppIcon v-else :name="isPlayingThis ? 'pause' : 'play'" :size="20" :stroke="2" />
        </button>

        <div class="flex-1 min-w-0 space-y-1">
          <!-- Reciter picker toggle -->
          <button
            class="flex items-center gap-1.5 text-sm font-medium text-themed-secondary hover:text-themed transition-colors"
            @click="showReciterPicker = !showReciterPicker"
          >
            <span class="truncate">🎙 {{ audio.reciter.value.name }}</span>
            <AppIcon :name="showReciterPicker ? 'chevronUp' : 'chevronDown'" :size="14" />
          </button>

          <!-- Seek bar (only while this surah is loaded) -->
          <div v-if="isCurrentSurah" class="flex items-center gap-2">
            <span class="text-[10px] text-themed-faint tabular-nums w-8">
              {{ formatTime(audio.currentTime.value) }}
            </span>
            <input
              type="range"
              min="0"
              :max="audio.duration.value || 0"
              step="1"
              :value="audio.currentTime.value"
              class="flex-1 h-1 accent-[var(--color-primary)] cursor-pointer"
              :aria-label="t('quran.listen')"
              @input="onSeek"
            >
            <span class="text-[10px] text-themed-faint tabular-nums w-8 text-right">
              {{ formatTime(audio.duration.value) }}
            </span>
          </div>
          <p v-else class="text-xs text-themed-faint">
            {{ t('quran.listen') }}
          </p>
        </div>
      </div>

      <!-- Reciter list -->
      <Transition name="slide">
        <div v-if="showReciterPicker" class="space-y-1">
          <button
            v-for="r in audio.RECITERS"
            :key="r.id"
            :class="[
              'w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-sm transition-all',
              audio.reciterId.value === r.id
                ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary-light)]'
                : 'glass-subtle text-themed-secondary hover:text-themed',
            ]"
            @click="selectReciter(r.id)"
          >
            {{ r.name }}
            <span v-if="audio.reciterId.value === r.id">✓</span>
          </button>
        </div>
      </Transition>

      <p v-if="audio.error.value" class="text-xs text-[var(--color-danger)]">
        {{ audio.error.value }}
      </p>
    </div>
  </GlassCard>
</template>
