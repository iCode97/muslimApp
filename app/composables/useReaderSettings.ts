/**
 * Quran reader settings (font sizes, translations, transliteration, word-by-word,
 * auto-scroll, tafsir choice). Shared across pages via useState and persisted in
 * localStorage under `muslimapp-quran-settings`.
 */
import {
  DEFAULT_READER_SETTINGS,
  TRANSLATION_IDS,
  normalizeReaderSettings,
  type ReaderSettings,
} from '~/utils/quran'

const STORAGE_KEY = 'muslimapp-quran-settings'

export function useReaderSettings() {
  const { locale } = useI18n()
  const settings = useState<ReaderSettings>('quran-reader-settings', () => ({ ...DEFAULT_READER_SETTINGS }))
  const loaded = useState<boolean>('quran-reader-settings-loaded', () => false)

  function load() {
    if (import.meta.server || loaded.value) return
    loaded.value = true
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) settings.value = normalizeReaderSettings(JSON.parse(raw))
    }
    catch {
      // corrupt or blocked storage → keep defaults
    }
  }

  function persist() {
    if (import.meta.server) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings.value))
    }
    catch {
      // storage full / unavailable — settings stay in memory
    }
  }

  function update(patch: Partial<ReaderSettings>) {
    settings.value = normalizeReaderSettings({ ...settings.value, ...patch })
    persist()
  }

  /** Active translation ids; before the user ever chose, the app locale's translation. */
  const activeTranslations = computed<number[]>(() => {
    if (settings.value.translations) return settings.value.translations
    // Arabic UI: Arabic text only by default; translations can be enabled in the reader settings.
    if (locale.value === 'ar') return []
    return [TRANSLATION_IDS[locale.value as keyof typeof TRANSLATION_IDS] ?? TRANSLATION_IDS.en]
  })

  function isTranslationActive(id: number): boolean {
    return activeTranslations.value.includes(id)
  }

  function toggleTranslation(id: number) {
    const current = activeTranslations.value
    update({ translations: current.includes(id) ? current.filter(x => x !== id) : [...current, id] })
  }

  function reset() {
    settings.value = { ...DEFAULT_READER_SETTINGS }
    persist()
  }

  return {
    settings: readonly(settings),
    activeTranslations,
    load,
    update,
    reset,
    isTranslationActive,
    toggleTranslation,
  }
}
