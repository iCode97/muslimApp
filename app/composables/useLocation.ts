/**
 * Composable for managing user location (GPS + manual city search).
 * Persists location in localStorage for subsequent visits.
 * Supports autocomplete search via Nominatim with detailed addresses.
 *
 * The saved location is loaded once at app start by the `app-init` client
 * plugin — pages and components don't need to call `loadSaved()` themselves.
 * `ready` becomes true once that initial load has happened, so UIs can avoid
 * flashing a "no location" empty state during hydration.
 *
 * GPS is only ever requested via `detectGPS()` from an explicit user action
 * (button tap) — never automatically — so the one-time iOS permission prompt
 * is shown with context.
 */

export interface LocationData {
  latitude: number
  longitude: number
  city: string
  state?: string
  country: string
  displayName: string // "Konstanz, Baden-Württemberg, Deutschland"
  /**
   * IANA timezone of the location (e.g. "Europe/Istanbul"). Learned from the
   * prayer-times API after the first fetch; may be missing until then.
   */
  timezone?: string
}

export interface LocationSuggestion {
  latitude: number
  longitude: number
  city: string
  state: string
  country: string
  displayName: string
}

const STORAGE_KEY = 'muslimapp-location'

export function useLocation() {
  // Use the global i18n instance (instead of useI18n()) so this composable can
  // also be used outside component setup, e.g. from the app-init plugin.
  const i18n = useNuxtApp().$i18n
  const location = useState<LocationData | null>('location', () => null)
  const ready = useState<boolean>('location-ready', () => false)
  const suggestions = ref<LocationSuggestion[]>([])
  const loading = ref(false)
  const searchLoading = ref(false)
  const error = ref<string | null>(null)

  // Get accept-language header based on current locale
  function getAcceptLang(): string {
    const locale = i18n.locale.value
    return locale === 'tr' ? 'tr' : locale === 'en' ? 'en' : 'de'
  }

  // Build a display name from parts: "City, State, Country"
  function buildDisplayName(city: string, state?: string, country?: string): string {
    const parts = [city]
    if (state && state !== city) parts.push(state)
    if (country) parts.push(country)
    return parts.join(', ')
  }

  /** Load the persisted location into shared state (idempotent). */
  function loadSaved(): LocationData | null {
    if (import.meta.server) return null
    ready.value = true
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as LocationData
        if (!Number.isFinite(parsed.latitude) || !Number.isFinite(parsed.longitude)) {
          throw new Error('invalid saved location')
        }
        // Migrate old format without displayName
        if (!parsed.displayName) {
          parsed.displayName = buildDisplayName(parsed.city, parsed.state, parsed.country)
        }
        location.value = parsed
        return parsed
      }
      catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    return null
  }

  // Save to localStorage
  function save(data: LocationData) {
    location.value = data
    ready.value = true
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
  }

  /**
   * Attach the IANA timezone (from the prayer-times API) to the current
   * location and persist it. No-op if unchanged.
   */
  function setTimezone(timezone: string) {
    const current = location.value
    if (!current || current.timezone === timezone) return
    save({ ...current, timezone })
  }

  /**
   * Detect location via GPS. Must only be called from a user gesture
   * (button tap) — never automatically on load.
   */
  async function detectGPS(): Promise<LocationData | null> {
    if (import.meta.server) return null

    loading.value = true
    error.value = null

    try {
      if (!('geolocation' in navigator)) throw new Error('geolocation unsupported')

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 600000, // 10 min cache
        })
      })

      const { latitude, longitude } = position.coords

      // Reverse geocode via Nominatim for detailed address
      const geoResponse = await $fetch<{
        address: {
          city?: string
          town?: string
          village?: string
          municipality?: string
          state?: string
          country: string
        }
      }>(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=${getAcceptLang()}&addressdetails=1`, {
        headers: { 'User-Agent': 'MuslimApp/1.0' },
      })

      const addr = geoResponse.address
      const city = addr.city || addr.town || addr.village || addr.municipality || i18n.t('common.unknown')
      const state = addr.state || ''
      const country = addr.country || i18n.t('common.unknown')
      const displayName = buildDisplayName(city, state, country)

      const locationData: LocationData = { latitude, longitude, city, state, country, displayName }
      save(locationData)

      return locationData
    }
    catch (err) {
      error.value = i18n.t('errors.locationDetect')
      console.error('GPS error:', err)
      return null
    }
    finally {
      loading.value = false
    }
  }

  // Search for locations with autocomplete (returns multiple suggestions)
  async function searchLocations(query: string): Promise<LocationSuggestion[]> {
    if (!query.trim() || query.trim().length < 2) {
      suggestions.value = []
      return []
    }

    searchLoading.value = true
    error.value = null

    try {
      const results = await $fetch<Array<{
        lat: string
        lon: string
        display_name: string
        address?: {
          city?: string
          town?: string
          village?: string
          municipality?: string
          state?: string
          country?: string
        }
      }>>(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: query,
          format: 'json',
          limit: 5,
          addressdetails: 1,
          'accept-language': getAcceptLang(),
        },
        headers: { 'User-Agent': 'MuslimApp/1.0' },
      })

      const mapped = results.map((r) => {
        const addr = r.address || {}
        const city = addr.city || addr.town || addr.village || addr.municipality || query
        const state = addr.state || ''
        const country = addr.country || ''

        return {
          latitude: parseFloat(r.lat),
          longitude: parseFloat(r.lon),
          city,
          state,
          country,
          displayName: buildDisplayName(city, state, country),
        }
      })

      // Deduplicate by displayName
      const seen = new Set<string>()
      suggestions.value = mapped.filter((s) => {
        if (seen.has(s.displayName)) return false
        seen.add(s.displayName)
        return true
      })

      return suggestions.value
    }
    catch {
      error.value = i18n.t('errors.locationSearch')
      suggestions.value = []
      return []
    }
    finally {
      searchLoading.value = false
    }
  }

  // Select a suggestion and save it
  function selectSuggestion(suggestion: LocationSuggestion) {
    const locationData: LocationData = {
      latitude: suggestion.latitude,
      longitude: suggestion.longitude,
      city: suggestion.city,
      state: suggestion.state,
      country: suggestion.country,
      displayName: suggestion.displayName,
    }
    save(locationData)
    suggestions.value = []
  }

  // Clear suggestions
  function clearSuggestions() {
    suggestions.value = []
  }

  return {
    location: readonly(location),
    /** True once the saved location has been loaded on the client. */
    ready: readonly(ready),
    suggestions: readonly(suggestions),
    loading: readonly(loading),
    searchLoading: readonly(searchLoading),
    error: readonly(error),
    loadSaved,
    setTimezone,
    detectGPS,
    searchLocations,
    selectSuggestion,
    clearSuggestions,
  }
}
