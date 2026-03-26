/**
 * Qibla direction composable.
 * Calculates the direction to Mecca using GPS coordinates
 * and Device Orientation API for compass heading.
 */

// Kaaba coordinates
const KAABA_LAT = 21.4225
const KAABA_LNG = 39.8262

export function useQibla() {
  const { location } = useLocation()
  const qiblaAngle = ref(0)       // Angle from north to Qibla
  const compassHeading = ref(0)   // Device compass heading
  const hasCompass = ref(false)
  const permissionGranted = ref(false)

  /**
   * Calculate Qibla direction using the Great Circle formula.
   * Returns bearing in degrees from north (0-360).
   */
  function calculateQibla(lat: number, lng: number): number {
    const toRad = (deg: number) => (deg * Math.PI) / 180
    const toDeg = (rad: number) => (rad * 180) / Math.PI

    const lat1 = toRad(lat)
    const lng1 = toRad(lng)
    const lat2 = toRad(KAABA_LAT)
    const lng2 = toRad(KAABA_LNG)

    const dLng = lng2 - lng1

    const y = Math.sin(dLng) * Math.cos(lat2)
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng)

    let bearing = toDeg(Math.atan2(y, x))
    return (bearing + 360) % 360
  }

  /**
   * The rotation angle for the compass needle.
   * = qiblaAngle - compassHeading
   * When device faces Qibla, this should be ~0
   */
  const needleRotation = computed(() => {
    return (qiblaAngle.value - compassHeading.value + 360) % 360
  })

  /**
   * Distance to Kaaba in km (Haversine formula)
   */
  const distanceToKaaba = computed(() => {
    if (!location.value) return 0
    const toRad = (deg: number) => (deg * Math.PI) / 180
    const R = 6371 // Earth radius in km

    const lat1 = toRad(location.value.latitude)
    const lat2 = toRad(KAABA_LAT)
    const dLat = toRad(KAABA_LAT - location.value.latitude)
    const dLng = toRad(KAABA_LNG - location.value.longitude)

    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return Math.round(R * c)
  })

  let orientationHandler: ((e: DeviceOrientationEvent) => void) | null = null

  /**
   * Request compass permission and start listening
   */
  async function startCompass(): Promise<boolean> {
    if (import.meta.server) return false

    // Calculate qibla angle from location
    if (location.value) {
      qiblaAngle.value = calculateQibla(location.value.latitude, location.value.longitude)
    }

    // iOS 13+ requires permission
    const DOE = DeviceOrientationEvent as any
    if (typeof DOE.requestPermission === 'function') {
      try {
        const permission = await DOE.requestPermission()
        if (permission !== 'granted') return false
      } catch {
        return false
      }
    }

    orientationHandler = (event: DeviceOrientationEvent) => {
      // webkitCompassHeading for iOS, alpha for Android
      const heading = (event as any).webkitCompassHeading ?? (event.alpha ? 360 - event.alpha : 0)
      compassHeading.value = heading
      hasCompass.value = true
    }

    window.addEventListener('deviceorientation', orientationHandler, true)
    permissionGranted.value = true
    return true
  }

  function stopCompass() {
    if (orientationHandler) {
      window.removeEventListener('deviceorientation', orientationHandler, true)
      orientationHandler = null
    }
  }

  // Update qibla angle when location changes
  watch(location, (loc) => {
    if (loc) {
      qiblaAngle.value = calculateQibla(loc.latitude, loc.longitude)
    }
  })

  return {
    qiblaAngle: readonly(qiblaAngle),
    compassHeading: readonly(compassHeading),
    needleRotation,
    distanceToKaaba,
    hasCompass: readonly(hasCompass),
    permissionGranted: readonly(permissionGranted),
    startCompass,
    stopCompass,
  }
}
