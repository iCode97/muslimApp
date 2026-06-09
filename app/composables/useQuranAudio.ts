/**
 * Quran audio recitation composable.
 * Streams full-chapter recitations from the quran.com API
 * (`/chapter_recitations/{reciter}/{chapter}`) — free, no API key.
 * Reciter choice is persisted; audio URLs are cached in-memory per session.
 */

export interface Reciter {
  id: number
  name: string
}

/** Curated subset of quran.com chapter-recitation reciters. */
export const RECITERS: Reciter[] = [
  { id: 7, name: 'Mishari Rashid al-Afasy' },
  { id: 2, name: 'AbdulBaset AbdulSamad' },
  { id: 3, name: 'Abdur-Rahman as-Sudais' },
  { id: 6, name: 'Mahmoud Khalil Al-Husary' },
  { id: 10, name: 'Saud ash-Shuraym' },
]

const RECITER_STORAGE_KEY = 'muslimapp-quran-reciter'
const DEFAULT_RECITER_ID = 7

export function useQuranAudio() {
  const config = useRuntimeConfig()
  const { t } = useI18n()
  const baseUrl = config.public.quranBaseUrl

  const reciterId = useState<number>('quran-audio-reciter', () => DEFAULT_RECITER_ID)
  const currentSurah = useState<number | null>('quran-audio-surah', () => null)
  const isPlaying = useState<boolean>('quran-audio-playing', () => false)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentTime = ref(0)
  const duration = ref(0)

  // One shared <audio> element per session (client only)
  const audioEl = useState<HTMLAudioElement | null>('quran-audio-el', () => null)
  // audio_url cache: `${reciterId}:${surahId}` → URL
  const urlCache = useState<Record<string, string>>('quran-audio-urls', () => ({}))

  function loadReciter() {
    if (import.meta.server) return
    const saved = Number(localStorage.getItem(RECITER_STORAGE_KEY))
    if (RECITERS.some(r => r.id === saved)) {
      reciterId.value = saved
    }
  }

  function setReciter(id: number) {
    if (!RECITERS.some(r => r.id === id)) return
    const wasPlaying = isPlaying.value
    const surah = currentSurah.value
    reciterId.value = id
    if (import.meta.client) {
      localStorage.setItem(RECITER_STORAGE_KEY, String(id))
    }
    // Restart current surah with the new reciter
    if (surah !== null) {
      stop()
      if (wasPlaying) {
        play(surah)
      }
    }
  }

  function ensureAudioEl(): HTMLAudioElement {
    if (!audioEl.value) {
      const el = new Audio()
      el.preload = 'none'
      el.addEventListener('timeupdate', () => { currentTime.value = el.currentTime })
      el.addEventListener('durationchange', () => { duration.value = el.duration || 0 })
      el.addEventListener('ended', () => { isPlaying.value = false })
      el.addEventListener('pause', () => { isPlaying.value = false })
      el.addEventListener('play', () => { isPlaying.value = true })
      audioEl.value = el
    }
    return audioEl.value
  }

  async function fetchAudioUrl(surahId: number): Promise<string> {
    const cacheKey = `${reciterId.value}:${surahId}`
    const cached = urlCache.value[cacheKey]
    if (cached) return cached

    const response = await $fetch<{
      audio_file: { audio_url: string }
    }>(`${baseUrl}/chapter_recitations/${reciterId.value}/${surahId}`)

    const url = response.audio_file.audio_url
    urlCache.value = { ...urlCache.value, [cacheKey]: url }
    return url
  }

  async function play(surahId: number) {
    if (import.meta.server) return
    error.value = null
    const el = ensureAudioEl()

    // Resume if it's the same surah already loaded
    if (currentSurah.value === surahId && el.src) {
      try {
        await el.play()
      }
      catch {
        error.value = t('quran.audioError')
      }
      return
    }

    loading.value = true
    try {
      const url = await fetchAudioUrl(surahId)
      currentSurah.value = surahId
      currentTime.value = 0
      duration.value = 0
      el.src = url
      await el.play()
    }
    catch (err) {
      error.value = t('quran.audioError')
      console.error('Quran audio error:', err)
    }
    finally {
      loading.value = false
    }
  }

  function pause() {
    audioEl.value?.pause()
  }

  function toggle(surahId: number) {
    if (isPlaying.value && currentSurah.value === surahId) {
      pause()
    }
    else {
      play(surahId)
    }
  }

  function seek(seconds: number) {
    const el = audioEl.value
    if (el && Number.isFinite(seconds)) {
      el.currentTime = Math.min(Math.max(0, seconds), duration.value || 0)
    }
  }

  function stop() {
    const el = audioEl.value
    if (el) {
      el.pause()
      el.removeAttribute('src')
      el.load()
    }
    currentSurah.value = null
    currentTime.value = 0
    duration.value = 0
    isPlaying.value = false
  }

  const reciter = computed(() =>
    RECITERS.find(r => r.id === reciterId.value) ?? RECITERS[0]!,
  )

  return {
    RECITERS,
    reciter,
    reciterId: readonly(reciterId),
    currentSurah: readonly(currentSurah),
    isPlaying: readonly(isPlaying),
    loading: readonly(loading),
    error: readonly(error),
    currentTime: readonly(currentTime),
    duration: readonly(duration),
    loadReciter,
    setReciter,
    play,
    pause,
    toggle,
    seek,
    stop,
  }
}
