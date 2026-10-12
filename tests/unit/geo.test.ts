import { describe, expect, it } from 'vitest'
import { formatDistance, haversineKm, sortByDistance } from '~/utils/geo'
import {
  appleMapsUrl,
  buildOverpassQuery,
  detectMapPlatform,
  formatAddress,
  geoUri,
  osmDirectionsUrl,
  parseOverpassElements,
  type OverpassElement,
} from '~/utils/mosques'

describe('haversineKm', () => {
  it('is zero for identical points and symmetric', () => {
    expect(haversineKm(52.52, 13.405, 52.52, 13.405)).toBe(0)
    const ab = haversineKm(52.52, 13.405, 48.1351, 11.582)
    const ba = haversineKm(48.1351, 11.582, 52.52, 13.405)
    expect(ab).toBeCloseTo(ba, 9)
  })

  it('matches known distances', () => {
    // Berlin -> Munich ≈ 504 km
    expect(haversineKm(52.52, 13.405, 48.1351, 11.582)).toBeGreaterThan(500)
    expect(haversineKm(52.52, 13.405, 48.1351, 11.582)).toBeLessThan(508)
    // One degree of latitude ≈ 111.2 km
    expect(haversineKm(0, 0, 1, 0)).toBeCloseTo(111.19, 1)
    // Antipodal-ish points stay finite (half the circumference ≈ 20015 km)
    expect(haversineKm(0, 0, 0, 180)).toBeCloseTo(20015, -1)
  })
})

describe('formatDistance', () => {
  it('formats metres, decimals and whole kilometres', () => {
    expect(formatDistance(0.004)).toBe('10 m')
    expect(formatDistance(0.456)).toBe('460 m')
    expect(formatDistance(2.43, 'de')).toBe('2,4 km')
    expect(formatDistance(2.43, 'en')).toBe('2.4 km')
    expect(formatDistance(14.6)).toBe('15 km')
  })

  it('returns an empty string for invalid input', () => {
    expect(formatDistance(Number.NaN)).toBe('')
    expect(formatDistance(-1)).toBe('')
  })
})

describe('sortByDistance', () => {
  it('sorts ascending without mutating the input', () => {
    const input = [{ distanceKm: 3 }, { distanceKm: 1 }, { distanceKm: 2 }]
    expect(sortByDistance(input).map(i => i.distanceKm)).toEqual([1, 2, 3])
    expect(input.map(i => i.distanceKm)).toEqual([3, 1, 2])
  })
})

describe('buildOverpassQuery', () => {
  it('queries Muslim places of worship around the point, with centers and tags', () => {
    const q = buildOverpassQuery(52.52, 13.405, 5)
    expect(q).toContain('nwr["amenity"="place_of_worship"]["religion"="muslim"]')
    expect(q).toContain('(around:5000,52.52000,13.40500)')
    expect(q).toContain('out center tags;')
    expect(q).toContain('[timeout:')
  })
})

describe('parseOverpassElements', () => {
  const origin = { lat: 52.52, lon: 13.405 }
  const elements: OverpassElement[] = [
    { type: 'way', id: 2, center: { lat: 52.53, lon: 13.41 }, tags: { 'name': 'Far Moschee', 'operator': 'DITIB', 'addr:street': 'Hauptstr.', 'addr:housenumber': '5', 'addr:postcode': '10115', 'addr:city': 'Berlin' } },
    { type: 'node', id: 1, lat: 52.521, lon: 13.406, tags: { denomination: 'sunni', website: 'example.org' } },
    { type: 'node', id: 3, tags: { name: 'No coords' } },
    // same mosque tagged as node and as building way, ~10 m apart
    { type: 'node', id: 4, lat: 52.6, lon: 13.5, tags: { name: 'Merkez Camii' } },
    { type: 'way', id: 5, center: { lat: 52.6001, lon: 13.5001 }, tags: { name: 'merkez camii' } },
  ]
  const parsed = parseOverpassElements(elements, origin.lat, origin.lon)

  it('drops elements without coordinates and merges node/way twins', () => {
    expect(parsed.map(m => m.id)).toEqual(['node/1', 'way/2', 'node/4'])
  })

  it('sorts by distance and computes it', () => {
    const d = parsed.map(m => m.distanceKm)
    expect([...d].sort((a, b) => a - b)).toEqual(d)
    expect(parsed[0]!.distanceKm).toBeGreaterThan(0)
  })

  it('keeps raw operator/denomination, null for missing name and normalises websites', () => {
    expect(parsed[0]!.name).toBeNull()
    expect(parsed[0]!.denomination).toBe('sunni')
    expect(parsed[0]!.website).toBe('https://example.org/')
    expect(parsed[1]!.operator).toBe('DITIB')
    expect(parsed[1]!.address).toBe('Hauptstr. 5, 10115 Berlin')
  })

  it('rejects non-http(s) websites', () => {
    const [m] = parseOverpassElements(
      [{ type: 'node', id: 9, lat: 1, lon: 1, tags: { website: 'javascript:alert(1)' } }],
      1,
      1,
    )
    expect(m!.website).toBeNull()
  })
})

describe('formatAddress', () => {
  it('handles partial tags', () => {
    expect(formatAddress({})).toBeNull()
    expect(formatAddress({ 'addr:city': 'Köln' })).toBe('Köln')
    expect(formatAddress({ 'addr:street': 'Venloer Str.', 'addr:postcode': '50823' })).toBe('Venloer Str., 50823')
  })
})

describe('map links', () => {
  it('builds OSM, Apple and geo links', () => {
    expect(decodeURIComponent(osmDirectionsUrl(52.5, 13.4))).toBe('https://www.openstreetmap.org/directions?route=;52.5,13.4')
    expect(appleMapsUrl(52.5, 13.4)).toBe('https://maps.apple.com/?daddr=52.5,13.4&dirflg=d')
    expect(geoUri(52.5, 13.4, 'Yeni Camii')).toBe('geo:52.5,13.4?q=52.5,13.4(Yeni%20Camii)')
    expect(geoUri(52.5, 13.4)).toBe('geo:52.5,13.4?q=52.5,13.4')
  })

  it('detects the platform', () => {
    expect(detectMapPlatform('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)')).toBe('ios')
    expect(detectMapPlatform('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 5)).toBe('ios') // iPadOS
    expect(detectMapPlatform('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 0)).toBe('other')
    expect(detectMapPlatform('Mozilla/5.0 (Linux; Android 14)')).toBe('android')
  })
})
