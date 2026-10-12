<script setup lang="ts">
/**
 * Surah header card: start the verse-by-verse recitation of this surah and pick the
 * reciter. Once playing, the global QuranMiniPlayer takes over the transport controls.
 */

interface Props {
  surahId: number
}

const props = defineProps<Props>()

const { t } = useI18n()
const audio = useQuranAudio()

onMounted(() => audio.loadSettings())

const isCurrentSurah = computed(() => audio.surah.value === props.surahId)
const isPlayingThis = computed(() => isCurrentSurah.value && audio.isPlaying.value)

function onReciter(event: Event) {
  audio.setReciter(Number((event.target as HTMLSelectElement).value))
}
</script>

<template>
  <GlassCard>
    <div class="space-y-3">
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shrink-0 transition-all duration-200 hover:opacity-90 disabled:opacity-50"
          :disabled="audio.loading.value && isCurrentSurah"
          :aria-label="isPlayingThis ? t('quran.pause') : t('quran.listen')"
          @click="audio.toggleSurah(surahId)"
        >
          <LoadingSpinner v-if="audio.loading.value && isCurrentSurah" size="sm" />
          <AppIcon v-else :name="isPlayingThis ? 'pause' : 'play'" :size="20" :stroke="2" />
        </button>

        <div class="flex-1 min-w-0 space-y-1">
          <p class="text-sm font-medium text-themed">
            {{ t('quran.listen') }}
          </p>
          <label class="flex items-center gap-2">
            <span class="sr-only">{{ t('audio.reciter') }}</span>
            <span aria-hidden="true">🎙</span>
            <select
              class="min-w-0 flex-1 truncate glass-subtle rounded-lg px-2 py-1 text-xs text-themed-secondary bg-transparent"
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

      <p v-if="audio.error.value && isCurrentSurah" class="text-xs text-[var(--color-danger)]" role="alert">
        {{ audio.error.value }}
      </p>
    </div>
  </GlassCard>
</template>
