/**
 * Mosques nearby — queries the public Overpass API (OpenStreetMap) from the client.
 *
 * Usage rules we follow: one request per user action (page open / radius change /
 * retry), 25 s client timeout, no polling, results cached in memory per
 * location + radius so switching chips back and forth costs nothing.
 */
import {
  OVERPASS_ENDPOINT,
  buildOverpassQuery,
  parseOverpassElements,
  type Mosque,
  type OverpassElement,
} from '~/utils/mosques'

export type MosqueSearchError = 'timeout' | 'busy' | 'network'

const REQUEST_TIMEOUT_MS = 25_000
const cache = new Map<string, Mosque[]>()

function cacheKey(lat: number, lon: number, radiusKm: number): string {
  return `${lat.toFixed(3)},${lon.toFixed(3)}:${radiusKm}`
}

export function useMosques() {
  const mosques = ref<Mosque[]>([])
  const loading = ref(false)
  const error = ref<MosqueSearchError | null>(null)
  /** True once at least one search finished (success or error). */
  const searched = ref(false)

  let controller: AbortController | null = null
  let requestId = 0

  function cancel() {
    controller?.abort()
    controller = null
  }

  async function search(lat: number, lon: number, radiusKm: number): Promise<void> {
    if (!import.meta.client) return
    const id = ++requestId
    cancel()
    error.value = null

    const key = cacheKey(lat, lon, radiusKm)
    const cached = cache.get(key)
    if (cached) {
      mosques.value = cached
      loading.value = false
      searched.value = true
      return
    }

    loading.value = true
    const ctrl = new AbortController()
    controller = ctrl
    let timedOut = false
    const timer = setTimeout(() => {
      timedOut = true
      ctrl.abort()
    }, REQUEST_TIMEOUT_MS)

    try {
      const response = await fetch(OVERPASS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: `data=${encodeURIComponent(buildOverpassQuery(lat, lon, radiusKm))}`,
        signal: ctrl.signal,
      })
      if (!response.ok) {
        throw Object.assign(new Error(`overpass_${response.status}`), { status: response.status })
      }
      const json = await response.json() as { elements?: OverpassElement[] }
      if (id !== requestId) return // a newer request superseded this one
      const parsed = parseOverpassElements(json.elements ?? [], lat, lon)
      cache.set(key, parsed)
      mosques.value = parsed
    }
    catch (err) {
      if (id !== requestId) return
      mosques.value = []
      const status = (err as { status?: number }).status
      if (timedOut || status === 504) error.value = 'timeout'
      else if (status === 429) error.value = 'busy'
      else error.value = 'network'
    }
    finally {
      clearTimeout(timer)
      if (id === requestId) {
        loading.value = false
        searched.value = true
        controller = null
      }
    }
  }

  return {
    mosques: readonly(mosques),
    loading: readonly(loading),
    error: readonly(error),
    searched: readonly(searched),
    search,
    cancel,
  }
}
