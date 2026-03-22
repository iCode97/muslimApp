/**
 * Composable for managing user location (GPS + manual city search).
 * Persists location in localStorage for subsequent visits.
 */

interface LocationData {
  latitude: number
  longitude: number
  city: string
  country: string
}

const STORAGE_KEY = 'muslimapp-location'

export function useLocation() {
  const { t, locale } = useI18n()
  const location = useState<LocationData | null>('location', () => null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Load from localStorage on init
  function loadSaved(): LocationData | null {
    if (import.meta.server) return null
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as LocationData
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

      // Reverse geocode via Aladhan (free, no key needed)
      const response = await $fetch<{
        data: { city: string, country: string }[]
      }>(`https://api.aladhan.com/v1/qibla/${latitude}/${longitude}`)

      // Fallback: use nominatim for city name
      const acceptLang = locale.value === 'tr' ? 'tr' : locale.value === 'en' ? 'en' : 'de'
      const geoResponse = await $fetch<{
        address: { city?: string, town?: string, state?: string, country: string }
      }>(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=${acceptLang}`, {
        headers: { 'User-Agent': 'MuslimApp/1.0' },
      })

      const addr = geoResponse.address
      const city = addr.city || addr.town || addr.state || t('common.unknown')
      const country = addr.country || t('common.unknown')

      const locationData: LocationData = { latitude, longitude, city, country }
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

  // Set location manually by city name
  async function setCity(city: string, country: string): Promise<LocationData | null> {
    loading.value = true
    error.value = null

    try {
      // Geocode via Nominatim
      const results = await $fetch<Array<{
        lat: string
        lon: string
        display_name: string
      }>>(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city + ', ' + country)}&format=json&limit=1`, {
        headers: { 'User-Agent': 'MuslimApp/1.0' },
      })

      if (!results.length) {
        error.value = t('errors.cityNotFound', { city })
        return null
      }

      const locationData: LocationData = {
        latitude: parseFloat(results[0].lat),
        longitude: parseFloat(results[0].lon),
        city,
        country,
      }
      save(locationData)

      return locationData
    }
    catch {
      error.value = t('errors.locationSearch')
      return null
    }
    finally {
      loading.value = false
    }
  }

  return {
    location: readonly(location),
    loading: readonly(loading),
    error: readonly(error),
    loadSaved,
    detectGPS,
    setCity,
  }
}
