/**
 * Composable for managing user location (GPS + manual city search).
 * Persists location in localStorage for subsequent visits.
 * Supports autocomplete search via Nominatim with detailed addresses.
 */

interface LocationData {
  latitude: number
  longitude: number
  city: string
  state?: string
  country: string
  displayName: string // "Konstanz, Baden-Württemberg, Deutschland"
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
  const { t, locale } = useI18n()
  const location = useState<LocationData | null>('location', () => null)
  const suggestions = ref<LocationSuggestion[]>([])
  const loading = ref(false)
  const searchLoading = ref(false)
  const error = ref<string | null>(null)

  // Get accept-language header based on current locale
  function getAcceptLang(): string {
    return locale.value === 'tr' ? 'tr' : locale.value === 'en' ? 'en' : 'de'
  }

  // Build a display name from parts: "City, State, Country"
  function buildDisplayName(city: string, state?: string, country?: string): string {
    const parts = [city]
    if (state && state !== city) parts.push(state)
    if (country) parts.push(country)
    return parts.join(', ')
  }

  // Load from localStorage on init
  function loadSaved(): LocationData | null {
    if (import.meta.server) return null
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as LocationData
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
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
  }

  // Detect location via GPS
  async function detectGPS(): Promise<LocationData | null> {
    if (import.meta.server) return null

    loading.value = true
    error.value = null

    try {
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
      const city = addr.city || addr.town || addr.village || addr.municipality || t('common.unknown')
      const state = addr.state || ''
      const country = addr.country || t('common.unknown')
      const displayName = buildDisplayName(city, state, country)

      const locationData: LocationData = { latitude, longitude, city, state, country, displayName }
      save(locationData)

      return locationData
    }
    catch (err) {
      error.value = t('errors.locationDetect')
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

      suggestions.value = results.map(r => {
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
      suggestions.value = suggestions.value.filter(s => {
        if (seen.has(s.displayName)) return false
        seen.add(s.displayName)
        return true
      })

      return suggestions.value
    }
    catch {
      error.value = t('errors.locationSearch')
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
    suggestions: readonly(suggestions),
    loading: readonly(loading),
    searchLoading: readonly(searchLoading),
    error: readonly(error),
    loadSaved,
    detectGPS,
    searchLocations,
    selectSuggestion,
    clearSuggestions,
  }
}
