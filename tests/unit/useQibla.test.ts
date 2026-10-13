import { beforeEach, describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'
import { useQibla } from '~/composables/useQibla'

const location = ref<{ latitude: number, longitude: number } | null>(null)
;(globalThis as any).useLocation = () => ({ location })

async function bearingFor(latitude: number, longitude: number) {
  location.value = null
  const { qiblaAngle } = useQibla()
  location.value = { latitude, longitude }
  await nextTick()
  return qiblaAngle.value
}

describe('useQibla bearing', () => {
  beforeEach(() => { location.value = null })

  it.each([
    ['Berlin', 52.52, 13.405, 136],
    ['Istanbul', 41.0082, 28.9784, 152],
    ['New York', 40.7128, -74.006, 58],
    ['Jakarta', -6.2088, 106.8456, 295],
    ['Sydney', -33.8688, 151.2093, 277],
  ])('%s points towards Mecca (~%d deg)', async (_name, lat, lng, expected) => {
    const bearing = await bearingFor(lat, lng)
    expect(Math.abs(bearing - expected)).toBeLessThan(1.5)
  })

  it('always returns a bearing within [0, 360)', async () => {
    for (const [lat, lng] of [[0, 0], [89, 10], [-89, -170], [21.5, 39.9], [10, -179]]) {
      const b = await bearingFor(lat!, lng!)
      expect(b).toBeGreaterThanOrEqual(0)
      expect(b).toBeLessThan(360)
    }
  })

  it('computes the distance to the Kaaba (Berlin ~4,100 km)', () => {
    location.value = { latitude: 52.52, longitude: 13.405 }
    const { distanceToKaaba } = useQibla()
    expect(distanceToKaaba.value).toBeGreaterThan(4000)
    expect(distanceToKaaba.value).toBeLessThan(4300)
  })

  it('needleRotation equals the qibla angle when the heading is 0', async () => {
    const { needleRotation, qiblaAngle } = useQibla()
    location.value = { latitude: 52.52, longitude: 13.405 }
    await nextTick()
    expect(needleRotation.value).toBeCloseTo(qiblaAngle.value, 5)
  })
})
