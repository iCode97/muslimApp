import type { BrowserContext, ConsoleMessage, Page, Route } from '@playwright/test'

/** Saved location shape of app/composables/useLocation.ts (key: muslimapp-location). */
export const SEED_LOCATION = {
  latitude: 52.52,
  longitude: 13.405,
  city: 'Berlin',
  state: 'Berlin',
  country: 'Deutschland',
  displayName: 'Berlin, Deutschland',
}

/** Skip the onboarding wizard and pre-set a location. */
export async function seedStorage(context: BrowserContext) {
  await context.addInitScript((location) => {
    try {
      localStorage.setItem('muslimapp-onboarded', JSON.stringify({ version: 1, at: Date.now() }))
      localStorage.setItem('muslimapp-location', JSON.stringify(location))
    }
    catch { /* storage unavailable */ }
  }, SEED_LOCATION)
}

const json = (route: Route, body: unknown, status = 200) =>
  route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) })

function pad(n: number) { return String(n).padStart(2, '0') }

function quranChapter(id: number) {
  return {
    id,
    revelation_place: id % 2 ? 'makkah' : 'madinah',
    revelation_order: id,
    bismillah_pre: id !== 1 && id !== 9,
    name_simple: `Surah ${id}`,
    name_complex: `Surah ${id}`,
    name_arabic: 'سورة',
    verses_count: 7,
    pages: [1, 1],
    translated_name: { name: `Translated ${id}` },
  }
}

function mockQuranApi(route: Route) {
  const url = new URL(route.request().url())
  const path = url.pathname.replace(/^\/api\/v4/, '')
  if (path === '/chapters') {
    return json(route, { chapters: Array.from({ length: 114 }, (_, i) => quranChapter(i + 1)) })
  }
  const chapter = path.match(/^\/chapters\/(\d+)$/)
  if (chapter) return json(route, { chapter: quranChapter(Number(chapter[1])) })

  if (path === '/quran/verses/uthmani') {
    const ch = url.searchParams.get('chapter_number') ?? '1'
    return json(route, {
      verses: Array.from({ length: 7 }, (_, i) => ({
        id: i + 1, verse_number: i + 1, verse_key: `${ch}:${i + 1}`, text_uthmani: 'بِسْمِ ٱللَّهِ',
      })),
    })
  }
  const byChapter = path.match(/^\/verses\/by_chapter\/(\d+)$/)
  if (byChapter) {
    return json(route, {
      verses: Array.from({ length: 7 }, (_, i) => ({
        id: i + 1,
        verse_number: i + 1,
        verse_key: `${byChapter[1]}:${i + 1}`,
        translations: [52, 27, 20].map(resource_id => ({
          resource_id, text: `Translation ${resource_id} v${i + 1}`, resource_name: 'Mock', language_name: 'mock',
        })),
      })),
    })
  }
  const byKey = path.match(/^\/verses\/by_key\/(\d+):(\d+)$/)
  if (byKey) {
    return json(route, {
      verse: { text_uthmani: 'بِسْمِ ٱللَّهِ', translations: [{ text: 'Mock translation' }], verse_key: `${byKey[1]}:${byKey[2]}` },
    })
  }
  if (path === '/search') return json(route, { search: { results: [] } })
  if (path.startsWith('/chapter_recitations')) return json(route, { audio_file: { audio_url: 'http://127.0.0.1:9/mock.mp3' } })
  return json(route, {})
}

function hijriFor(day: number) {
  return {
    day: String(day),
    month: { number: 3, en: 'Rabīʿ al-awwal', ar: 'رَبيع الأوّل' },
    year: '1448',
    designation: { abbreviated: 'AH' },
    weekday: { en: 'Al Athnayn' },
  }
}

function mockAladhan(route: Route) {
  const path = new URL(route.request().url()).pathname
  const calendar = path.match(/\/api\/aladhan\/calendar\/(\d+)\/(\d+)/)
  if (calendar) {
    const year = Number(calendar[1])
    const month = Number(calendar[2])
    const days = new Date(year, month, 0).getDate()
    return json(route, {
      data: Array.from({ length: days }, (_, i) => ({
        timings: {
          Fajr: '05:00 (CET)', Sunrise: '06:30 (CET)', Dhuhr: '12:30 (CET)',
          Asr: '15:30 (CET)', Maghrib: '18:00 (CET)', Isha: '19:30 (CET)', Imsak: '04:50 (CET)',
        },
        date: {
          gregorian: { date: `${pad(i + 1)}-${pad(month)}-${year}` },
          hijri: hijriFor((i % 29) + 1),
        },
      })),
    })
  }
  if (path.includes('/api/aladhan/gToH/')) return json(route, { data: { hijri: hijriFor(10) } })
  if (path.includes('/api/aladhan/hToGCalendar/')) {
    const start = new Date()
    start.setDate(1)
    return json(route, {
      data: Array.from({ length: 30 }, (_, i) => {
        const d = new Date(start.getFullYear(), start.getMonth(), 1 + i)
        const weekday = d.toLocaleDateString('en-US', { weekday: 'long' })
        return {
          hijri: { ...hijriFor(i + 1), weekday: { en: weekday } },
          gregorian: {
            day: pad(d.getDate()), month: { number: d.getMonth() + 1 }, year: String(d.getFullYear()), weekday: { en: weekday },
          },
        }
      }),
    })
  }
  if (path.includes('/api/aladhan/hToG/')) {
    const d = new Date()
    d.setDate(d.getDate() + 40)
    return json(route, {
      data: {
        gregorian: {
          date: `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`,
          day: pad(d.getDate()),
          month: { number: d.getMonth() + 1, en: 'Month' },
          year: String(d.getFullYear()),
        },
      },
    })
  }
  return json(route, { data: {} })
}

/**
 * Mock every external dependency so tests are deterministic and offline-safe.
 * Later-registered routes take precedence, so the catch-all goes first.
 */
export async function mockExternalApis(page: Page, baseURL: string) {
  const origin = new URL(baseURL).origin

  // Catch-all: anything not served by the app itself resolves to an empty 204.
  await page.route('**/*', (route) => {
    const url = route.request().url()
    if (url.startsWith(origin) || url.startsWith('data:') || url.startsWith('blob:')) return route.fallback()
    return route.fulfill({ status: 204, body: '' })
  })

  await page.route('**://fonts.googleapis.com/**', route => route.fulfill({ status: 200, contentType: 'text/css', body: '' }))
  await page.route('**://api.quran.com/**', mockQuranApi)
  await page.route('**/api/aladhan/**', mockAladhan)
  // Web Push: report "not configured" so the app stays in local-reminder mode
  await page.route('**/api/push/config', route => json(route, { enabled: false, publicKey: null }))
  await page.route('**://nominatim.openstreetmap.org/**', (route) => {
    const url = route.request().url()
    if (url.includes('/reverse')) {
      return json(route, { address: { city: 'Berlin', state: 'Berlin', country: 'Deutschland' } })
    }
    return json(route, [])
  })
}

/** Console noise that is expected in headless test runs (permissions, external services). */
const IGNORED = [
  /geolocation/i,
  /notification/i,
  /permission/i,
  /Failed to load resource/i, // only reported when the failing URL is not same-origin, see below
  /ERR_BLOCKED|ERR_FAILED|ERR_CONNECTION/i,
]

export function collectConsoleErrors(page: Page, baseURL: string) {
  const origin = new URL(baseURL).origin
  const errors: string[] = []

  page.on('console', (msg: ConsoleMessage) => {
    if (msg.type() !== 'error') return
    const text = msg.text()
    const sameOrigin = msg.location().url?.startsWith(origin)
    // Same-origin resource failures (404 for an own asset) are real bugs: keep them.
    if (IGNORED.some(re => re.test(text)) && !(sameOrigin && /Failed to load resource/i.test(text))) return
    errors.push(`[console.error] ${text}`)
  })
  page.on('pageerror', (err) => {
    errors.push(`[pageerror] ${err.message}`)
  })
  return errors
}
