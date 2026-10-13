/**
 * Pure helpers for the "Mosques nearby" feature (Overpass query, parsing, map links).
 * Data © OpenStreetMap contributors (ODbL).
 */
import { haversineKm, sortByDistance } from './geo'

export const OVERPASS_ENDPOINT = 'https://overpass-api.de/api/interpreter'
export const RADIUS_OPTIONS_KM = [2, 5, 10, 25] as const
export type RadiusKm = typeof RADIUS_OPTIONS_KM[number]

export interface OverpassElement {
  type: 'node' | 'way' | 'relation'
  id: number
  lat?: number
  lon?: number
  center?: { lat: number, lon: number }
  tags?: Record<string, string>
}

export interface Mosque {
  /** OSM object, e.g. `way/12345` */
  id: string
  /** Raw OSM name, `null` when untagged (UI shows a fallback). */
  name: string | null
  lat: number
  lon: number
  distanceKm: number
  address: string | null
  /** Raw OSM `operator` tag (e.g. DITIB, IGMG) — shown as-is. */
  operator: string | null
  /** Raw OSM `denomination` tag — shown as-is. */
  denomination: string | null
  website: string | null
}

/** Overpass QL: all Muslim places of worship (nodes, ways, relations) within `radiusKm`. */
export function buildOverpassQuery(lat: number, lon: number, radiusKm: number): string {
  const r = Math.round(radiusKm * 1000)
  return `[out:json][timeout:20];nwr["amenity"="place_of_worship"]["religion"="muslim"](around:${r},${lat.toFixed(5)},${lon.toFixed(5)});out center tags;`
}

function clean(value: string | undefined): string | null {
  const v = value?.trim()
  return v ? v : null
}

/** "Straße 12, 12345 Stadt" from addr:* tags (any part may be missing). */
export function formatAddress(tags: Record<string, string> = {}): string | null {
  const street = [clean(tags['addr:street']), clean(tags['addr:housenumber'])].filter(Boolean).join(' ')
  const city = [clean(tags['addr:postcode']), clean(tags['addr:city'])].filter(Boolean).join(' ')
  const full = [street, city].filter(Boolean).join(', ')
  return full || null
}

function safeWebsite(value: string | null): string | null {
  if (!value) return null
  const url = /^https?:\/\//i.test(value) ? value : `https://${value}`
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? parsed.href : null
  }
  catch {
    return null
  }
}

/**
 * Convert Overpass elements into mosques sorted by distance from the origin.
 * Elements without coordinates are dropped; a node and a building outline of the
 * same mosque (same name, < 60 m apart) are merged into one entry.
 */
export function parseOverpassElements(
  elements: OverpassElement[],
  originLat: number,
  originLon: number,
): Mosque[] {
  const result: Mosque[] = []

  for (const el of elements) {
    const lat = el.lat ?? el.center?.lat
    const lon = el.lon ?? el.center?.lon
    if (typeof lat !== 'number' || typeof lon !== 'number') continue
    const tags = el.tags ?? {}

    result.push({
      id: `${el.type}/${el.id}`,
      name: clean(tags.name) ?? clean(tags['name:de']) ?? clean(tags['name:en']) ?? clean(tags['name:tr']),
      lat,
      lon,
      distanceKm: haversineKm(originLat, originLon, lat, lon),
      address: formatAddress(tags),
      operator: clean(tags.operator),
      denomination: clean(tags.denomination),
      website: safeWebsite(clean(tags.website) ?? clean(tags['contact:website'])),
    })
  }

  const sorted = sortByDistance(result)
  const deduped: Mosque[] = []
  for (const m of sorted) {
    const twin = m.name
      ? deduped.find(d =>
        d.name?.toLowerCase() === m.name!.toLowerCase()
        && haversineKm(d.lat, d.lon, m.lat, m.lon) < 0.06)
      : undefined
    if (!twin) deduped.push(m)
  }
  return deduped
}

/** OpenStreetMap directions to the destination (origin left blank for the user to fill in). */
export function osmDirectionsUrl(lat: number, lon: number): string {
  return `https://www.openstreetmap.org/directions?route=${encodeURIComponent(`;${lat},${lon}`)}`
}

/** Apple Maps directions (iOS/macOS). */
export function appleMapsUrl(lat: number, lon: number): string {
  return `https://maps.apple.com/?daddr=${lat},${lon}&dirflg=d`
}

/** `geo:` URI — opens the default maps app on Android. */
export function geoUri(lat: number, lon: number, label?: string | null): string {
  const q = label ? `(${encodeURIComponent(label)})` : ''
  return `geo:${lat},${lon}?q=${lat},${lon}${q}`
}

export function osmObjectUrl(id: string): string {
  return `https://www.openstreetmap.org/${id}`
}

export type MapPlatform = 'ios' | 'android' | 'other'

/** Best-effort platform detection from a user-agent string (+ touch Macs = iPadOS). */
export function detectMapPlatform(userAgent: string, maxTouchPoints = 0): MapPlatform {
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'ios'
  if (/Macintosh/i.test(userAgent) && maxTouchPoints > 1) return 'ios'
  if (/Android/i.test(userAgent)) return 'android'
  return 'other'
}
