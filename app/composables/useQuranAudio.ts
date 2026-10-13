/**
 * Verse-by-verse Quran recitation.
 *
 * - One global <audio> element (useState) shared by every page/component, so navigating
 *   between surahs never creates overlapping audio.
 * - Verse files come from quran.com `/recitations/{id}/by_chapter/{ch}` (served by
 *   verses.quran.com); URLs per reciter+surah are cached in memory.
 * - Repeat / Hifz-range / continue-to-next-surah logic lives in the pure state machine
 *   `nextAfterEnd` (app/utils/quran.ts).
 * - Media Session API gives lock-screen / headset controls with next/prev verse.
 *
 * Storage: `muslimapp-quran-reciter` (id) and `muslimapp-quran-audio` ({speed, repeatCount, continueNext}).
 */
import {
  DEFAULT_AUDIO_SETTINGS,
  DEFAULT_RECITER_ID,
  RECITERS,
  clampSpeed,
  isKnownReciter,
  nextAfterEnd,
  normalizeAudioSettings,
  normalizeRange,
  normalizeRepeatCount,
  stepVerse,
  verseAudioUrl,
  type PlaybackRange,
} from '~/utils/quran'

const RECITER_STORAGE_KEY = 'muslimapp-quran-reciter'
const AUDIO_STORAGE_KEY = 'muslimapp-quran-audio'

// Module-level (not reactive) bookkeeping for the single shared player.
let playToken = 0
let loadedKey: string | null = null
let preloadEl: HTMLAudioElement | null = null

export function useQuranAudio() {
  const config = useRuntimeConfig()
  const { t } = useI18n()
  const baseUrl = config.public.quranBaseUrl

  // ----- shared state -----
  const reciterId = useState<number>('quran-audio-reciter', () => DEFAULT_RECITER_ID)
  const surah = useState<number | null>('quran-audio-surah', () => null)
  const verse = useState<number | null>('quran-audio-verse', () => null)
  const repeatsDone = useState<number>('quran-audio-repeats-done', () => 0)
  const isPlaying = useState<boolean>('quran-audio-playing', () => false)
  const loading = useState<boolean>('quran-audio-loading', () => false)
  const error = useState<string | null>('quran-audio-error', () => null)
  const speed = useState<number>('quran-audio-speed', () => DEFAULT_AUDIO_SETTINGS.speed)
  const repeatCount = useState<number>('quran-audio-repeat', () => DEFAULT_AUDIO_SETTINGS.repeatCount)
  const continueNext = useState<boolean>('quran-audio-continue', () => DEFAULT_AUDIO_SETTINGS.continueNext)
  const range = useState<PlaybackRange | null>('quran-audio-range', () => null)
  const currentTime = useState<number>('quran-audio-time', () => 0)
  const duration = useState<number>('quran-audio-duration', () => 0)
  const settingsLoaded = useState<boolean>('quran-audio-settings-loaded', () => false)

  const audioEl = useState<HTMLAudioElement | null>('quran-audio-el', () => null)
  // `${reciterId}:${surah}` → { [verseNumber]: absoluteUrl }
  const urlCache = useState<Record<string, Record<number, string>>>('quran-audio-verse-urls', () => ({}))
  // Same key as useQuran → surah metadata for names and verse counts.
  const surahs = useState<Array<{ id: number, nameSimple: string, versesCount: number }>>('quran-surahs', () => [])

  const reciter = computed(() => RECITERS.find(r => r.id === reciterId.value) ?? RECITERS[0]!)

  function surahName(id: number): string {
    return surahs.value.find(s => s.id === id)?.nameSimple ?? `Surah ${id}`
  }

  function versesCount(id: number): number {
    const known = surahs.value.find(s => s.id === id)?.versesCount
    if (known) return known
    const cached = urlCache.value[`${reciterId.value}:${id}`]
    return cached ? Object.keys(cached).length : 286
  }

  // ----- settings -----
  function loadSettings() {
    if (import.meta.server || settingsLoaded.value) return
    settingsLoaded.value = true
    try {
      const savedReciter = Number(localStorage.getItem(RECITER_STORAGE_KEY))
      if (isKnownReciter(savedReciter)) reciterId.value = savedReciter
      const raw = localStorage.getItem(AUDIO_STORAGE_KEY)
      if (raw) {
        const s = normalizeAudioSettings(JSON.parse(raw))
        speed.value = s.speed
        repeatCount.value = s.repeatCount
        continueNext.value = s.continueNext
      }
    }
    catch {
      // corrupt / blocked storage → defaults
    }
  }

  function persistAudioSettings() {
    if (import.meta.server) return
    try {
      localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify({
        speed: speed.value,
        repeatCount: repeatCount.value,
        continueNext: continueNext.value,
      }))
    }
    catch { /* storage unavailable */ }
  }

  // ----- audio element & media session -----
  function setMediaSessionState() {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return
    navigator.mediaSession.playbackState = isPlaying.value ? 'playing' : 'paused'
  }

  function updateMediaSession() {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return
    if (surah.value === null || verse.value === null) return
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: `${surahName(surah.value)} ${surah.value}:${verse.value}`,
        artist: reciter.value.name,
        album: t('quran.title'),
      })
    }
    catch { /* MediaMetadata unsupported */ }
    setMediaSessionState()
  }

  function bindMediaSessionHandlers() {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return
    const handlers: Array<[MediaSessionAction, MediaSessionActionHandler]> = [
      ['play', () => { void resume() }],
      ['pause', () => pause()],
      ['previoustrack', () => { void prev() }],
      ['nexttrack', () => { void next() }],
      ['stop', () => stop()],
      ['seekto', (d) => { if (d.seekTime !== undefined) seek(d.seekTime) }],
    ]
    for (const [action, handler] of handlers) {
      try { navigator.mediaSession.setActionHandler(action, handler) }
      catch { /* action unsupported on this browser */ }
    }
  }

  function ensureAudioEl(): HTMLAudioElement {
    if (audioEl.value) return audioEl.value
    const el = new Audio()
    el.preload = 'auto'
    el.crossOrigin = 'anonymous' // audio hosts send CORS headers → responses are cacheable by the service worker
    el.addEventListener('timeupdate', () => { currentTime.value = el.currentTime })
    el.addEventListener('durationchange', () => { duration.value = Number.isFinite(el.duration) ? el.duration : 0 })
    el.addEventListener('play', () => { isPlaying.value = true; setMediaSessionState() })
    el.addEventListener('pause', () => { isPlaying.value = false; setMediaSessionState() })
    el.addEventListener('error', () => {
      if (!el.getAttribute('src')) return // src was cleared on purpose
      isPlaying.value = false
      loading.value = false
      error.value = t('quran.audioError')
    })
    el.addEventListener('ended', onEnded)
    audioEl.value = el
    bindMediaSessionHandlers()
    return el
  }

  function onEnded() {
    if (surah.value === null || verse.value === null) return
    const step = nextAfterEnd(
      { surah: surah.value, verse: verse.value, repeatsDone: repeatsDone.value },
      { repeatCount: repeatCount.value, range: range.value, continueNext: continueNext.value },
      versesCount,
    )
    if (step.type === 'stop') {
      isPlaying.value = false
      setMediaSessionState()
      return
    }
    void playVerse(step.surah, step.verse, step.repeatsDone)
  }

  // ----- data -----
  async function fetchVerseUrls(surahId: number): Promise<Record<number, string>> {
    const key = `${reciterId.value}:${surahId}`
    const cached = urlCache.value[key]
    if (cached) return cached

    const res = await $fetch<{ audio_files: Array<{ verse_key: string, url: string }> }>(
      `${baseUrl}/recitations/${reciterId.value}/by_chapter/${surahId}`,
      { params: { per_page: 300 } },
    )
    const map: Record<number, string> = {}
    for (const f of res.audio_files) {
      const n = Number(f.verse_key.split(':')[1])
      if (n) map[n] = verseAudioUrl(f.url)
    }
    urlCache.value = { ...urlCache.value, [key]: map }
    return map
  }

  /** Warm the HTTP cache with the following verse so the gap between verses stays small. */
  function preloadNext(urls: Record<number, string>, surahId: number, verseNumber: number) {
    if (repeatCount.value !== 1) return
    const nextStep = stepVerse({ surah: surahId, verse: verseNumber }, 1, versesCount, false)
    const url = nextStep ? urls[nextStep.verse] : undefined
    if (!url) return
    try {
      if (!preloadEl) {
        preloadEl = new Audio()
        preloadEl.preload = 'auto'
        preloadEl.crossOrigin = 'anonymous'
      }
      preloadEl.src = url
    }
    catch { /* best effort */ }
  }

  // ----- transport -----
  async function playVerse(surahId: number, verseNumber: number, repeats = 0) {
    if (import.meta.server) return
    loadSettings()
    const el = ensureAudioEl()
    const token = ++playToken
    error.value = null
    surah.value = surahId
    verse.value = verseNumber
    repeatsDone.value = repeats

    const key = `${reciterId.value}:${surahId}:${verseNumber}`
    try {
      // Same file again (verse repeat) → just rewind, no reload.
      if (loadedKey === key && el.getAttribute('src')) {
        el.currentTime = 0
        el.playbackRate = speed.value
        updateMediaSession()
        await el.play()
        return
      }

      loading.value = true
      const urls = await fetchVerseUrls(surahId)
      if (token !== playToken) return
      const url = urls[verseNumber]
      if (!url) throw new Error(`No audio for ${surahId}:${verseNumber}`)

      currentTime.value = 0
      duration.value = 0
      el.src = url
      loadedKey = key
      el.defaultPlaybackRate = speed.value
      el.playbackRate = speed.value
      updateMediaSession()
      await el.play()
      if (token === playToken) preloadNext(urls, surahId, verseNumber)
    }
    catch (err) {
      if (token !== playToken) return
      // AbortError = a newer play() superseded this one; not a user-facing error.
      if ((err as DOMException)?.name === 'AbortError') return
      isPlaying.value = false
      error.value = t('quran.audioError')
      console.error('Quran audio error:', err)
    }
    finally {
      if (token === playToken) loading.value = false
    }
  }

  async function resume() {
    if (import.meta.server) return
    const el = audioEl.value
    if (el && loadedKey && el.getAttribute('src') && !el.ended) {
      error.value = null
      try { await el.play() }
      catch { error.value = t('quran.audioError') }
      return
    }
    if (surah.value !== null) await playVerse(surah.value, verse.value ?? 1)
  }

  function pause() {
    audioEl.value?.pause()
  }

  /** Play/pause toggle for the current session. */
  async function toggle() {
    if (isPlaying.value) pause()
    else await resume()
  }

  /** Header button on a surah page: toggle if this surah is loaded, else start at verse 1. */
  async function toggleSurah(surahId: number) {
    if (surah.value === surahId && (isPlaying.value || loadedKey)) {
      await toggle()
    }
    else {
      await playVerse(surahId, 1)
    }
  }

  /** Per-verse play button: pause if that verse is playing, else play it. */
  async function toggleVerse(surahId: number, verseNumber: number) {
    if (surah.value === surahId && verse.value === verseNumber && isPlaying.value) {
      pause()
    }
    else if (surah.value === surahId && verse.value === verseNumber && loadedKey && !audioEl.value?.ended) {
      await resume()
    }
    else {
      await playVerse(surahId, verseNumber)
    }
  }

  async function next() {
    if (surah.value === null || verse.value === null) return
    const target = stepVerse({ surah: surah.value, verse: verse.value }, 1, versesCount)
    if (target) await playVerse(target.surah, target.verse)
  }

  async function prev() {
    if (surah.value === null || verse.value === null) return
    // After 3s into a verse, "previous" restarts it (like music players).
    if (currentTime.value > 3) {
      await playVerse(surah.value, verse.value)
      return
    }
    const target = stepVerse({ surah: surah.value, verse: verse.value }, -1, versesCount)
    if (target) await playVerse(target.surah, target.verse)
  }

  function seek(seconds: number) {
    const el = audioEl.value
    if (el && Number.isFinite(seconds)) {
      el.currentTime = Math.min(Math.max(0, seconds), duration.value || 0)
    }
  }

  function stop() {
    playToken++
    const el = audioEl.value
    if (el) {
      el.pause()
      el.removeAttribute('src')
      el.load()
    }
    loadedKey = null
    surah.value = null
    verse.value = null
    repeatsDone.value = 0
    currentTime.value = 0
    duration.value = 0
    isPlaying.value = false
    loading.value = false
    error.value = null
    if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
      navigator.mediaSession.metadata = null
      navigator.mediaSession.playbackState = 'none'
    }
  }

  // ----- options -----
  function setReciter(id: number) {
    if (!isKnownReciter(id)) return
    const wasPlaying = isPlaying.value
    reciterId.value = id
    if (import.meta.client) {
      try { localStorage.setItem(RECITER_STORAGE_KEY, String(id)) }
      catch { /* storage unavailable */ }
    }
    loadedKey = null // force a reload with the new reciter's file
    if (surah.value !== null && verse.value !== null) {
      if (wasPlaying) void playVerse(surah.value, verse.value)
      else audioEl.value?.pause()
      updateMediaSession()
    }
  }

  function setSpeed(value: number) {
    speed.value = clampSpeed(value)
    if (audioEl.value) {
      audioEl.value.defaultPlaybackRate = speed.value
      audioEl.value.playbackRate = speed.value
    }
    persistAudioSettings()
  }

  function setRepeatCount(value: number) {
    repeatCount.value = normalizeRepeatCount(value)
    persistAudioSettings()
  }

  function setContinueNext(value: boolean) {
    continueNext.value = value
    persistAudioSettings()
  }

  function setRange(surahId: number, from: number, to: number) {
    range.value = normalizeRange({ surah: surahId, from, to }, versesCount(surahId))
  }

  function clearRange() {
    range.value = null
  }

  return {
    RECITERS,
    reciter,
    reciterId: readonly(reciterId),
    /** Surah currently loaded in the player (null = idle). */
    surah: readonly(surah),
    verse: readonly(verse),
    repeatsDone: readonly(repeatsDone),
    isPlaying: readonly(isPlaying),
    loading: readonly(loading),
    error: readonly(error),
    speed: readonly(speed),
    repeatCount: readonly(repeatCount),
    continueNext: readonly(continueNext),
    range: readonly(range),
    currentTime: readonly(currentTime),
    duration: readonly(duration),
    loadSettings,
    playVerse,
    resume,
    pause,
    toggle,
    toggleSurah,
    toggleVerse,
    next,
    prev,
    seek,
    stop,
    setReciter,
    setSpeed,
    setRepeatCount,
    setContinueNext,
    setRange,
    clearRange,
  }
}
