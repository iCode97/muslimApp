/**
 * Qibla direction composable.
 * Calculates the direction to Mecca from the saved location (great circle)
 * and reads the compass heading via the Device Orientation API.
 *
 * The Qibla angle is derived reactively from the shared location, so it is
 * correct immediately after a reload/deep link once the app-init plugin has
 * restored the location — independent of whether the compass is running.
 */

// Kaaba coordinates
const KAABA_LAT = 21.4225
const KAABA_LNG = 39.8262

/**
 * Bearing from (lat, lng) to the Kaaba in degrees from true north (0–360),
 * using the great-circle (initial bearing) formula.
 */
function calculateQibla(lat: number, lng: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const toDeg = (rad: number) => (rad * 180) / Math.PI

  const lat1 = toRad(lat)
  const lat2 = toRad(KAABA_LAT)
  const dLng = toRad(KAABA_LNG) - toRad(lng)

  const y = Math.sin(dLng) * Math.cos(lat2)
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng)

  return (toDeg(Math.atan2(y, x)) + 360) % 360
}

type OrientationPermissionApi = { requestPermission?: () => Promise<'granted' | 'denied' | 'default'> }

export function useQibla() {
  const { location } = useLocation()
  const compassHeading = ref(0) // Device compass heading
  const hasCompass = ref(false)
  const permissionGranted = ref(false)

  /** Angle from north to Qibla (0 if no location yet). */
  const qiblaAngle = computed(() =>
    location.value ? calculateQibla(location.value.latitude, location.value.longitude) : 0,
  )

  /**
   * True if the compass needs an explicit permission prompt (iOS 13+), which
   * may only be triggered from a user gesture.
   */
  const needsPermission = computed(() => {
    if (import.meta.server || typeof DeviceOrientationEvent === 'undefined') return false
    return typeof (DeviceOrientationEvent as unknown as OrientationPermissionApi).requestPermission === 'function'
  })

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
  let orientationEvent: 'deviceorientationabsolute' | 'deviceorientation' = 'deviceorientation'

  /**
   * Request compass permission (if needed) and start listening.
   * On iOS this must be called from a user gesture.
   */
  async function startCompass(): Promise<boolean> {
    if (import.meta.server || typeof DeviceOrientationEvent === 'undefined') return false
    stopCompass()

    // iOS 13+ requires permission
    const api = DeviceOrientationEvent as unknown as OrientationPermissionApi
    if (typeof api.requestPermission === 'function') {
      try {
        const permission = await api.requestPermission()
        if (permission !== 'granted') return false
      }
      catch {
        return false
      }
    }

    orientationHandler = (event: DeviceOrientationEvent) => {
      // webkitCompassHeading for iOS; absolute alpha (counter-clockwise) elsewhere
      const webkitHeading = (event as DeviceOrientationEvent & { webkitCompassHeading?: number }).webkitCompassHeading
      let heading: number | null = null
      if (typeof webkitHeading === 'number') heading = webkitHeading
      else if (event.alpha !== null && (event.absolute || orientationEvent === 'deviceorientationabsolute')) heading = 360 - event.alpha
      if (heading === null) return
      compassHeading.value = heading
      hasCompass.value = true
    }

    // Chrome/Android: 'deviceorientation' is relative to the start position —
    // prefer the absolute (true-north based) event when available.
    orientationEvent = 'ondeviceorientationabsolute' in window ? 'deviceorientationabsolute' : 'deviceorientation'
    window.addEventListener(orientationEvent, orientationHandler as EventListener, true)
    permissionGranted.value = true
    return true
  }

  function stopCompass() {
    if (orientationHandler) {
      window.removeEventListener(orientationEvent, orientationHandler as EventListener, true)
      orientationHandler = null
    }
  }

  return {
    qiblaAngle,
    compassHeading: readonly(compassHeading),
    needleRotation,
    distanceToKaaba,
    hasCompass: readonly(hasCompass),
    permissionGranted: readonly(permissionGranted),
    needsPermission,
    startCompass,
    stopCompass,
  }
}
