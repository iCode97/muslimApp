/**
 * Small geo helpers (pure functions).
 */

const EARTH_RADIUS_KM = 6371.0088

const toRad = (deg: number) => (deg * Math.PI) / 180

/** Great-circle distance between two WGS84 points in kilometres (haversine). */
export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a
    = Math.sin(dLat / 2) ** 2
    + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(a)))
}

/**
 * Human friendly distance: metres below 1 km (rounded to 10 m, min 10 m),
 * one decimal below 10 km, whole kilometres above.
 */
export function formatDistance(km: number, locale = 'de'): string {
  if (!Number.isFinite(km) || km < 0) return ''
  const nf = (digits: number) => new Intl.NumberFormat(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
  if (km < 1) return `${Math.max(10, Math.round((km * 1000) / 10) * 10)} m`
  if (km < 10) return `${nf(1).format(km)} km`
  return `${nf(0).format(Math.round(km))} km`
}

/** Sort items by ascending distance (stable, returns a new array). */
export function sortByDistance<T extends { distanceKm: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.distanceKm - b.distanceKm)
}
