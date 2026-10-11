import { expect, test } from '@playwright/test'
import { collectConsoleErrors, mockExternalApis, seedStorage } from './helpers'

const ROUTES = [
  '/',
  '/prayer',
  '/quran',
  '/quran/1',
  '/calendar',
  '/tasbih',
  '/qibla',
  '/dua',
  '/hadith',
  '/names',
  '/guide',
  '/seerah',
  '/ramadan',
  '/settings',
  '/about',
  '/more',
  '/learn',
  '/tracker',
  '/zakat',
  '/favorites',
]

test.beforeEach(async ({ page, context, baseURL }) => {
  await seedStorage(context)
  await mockExternalApis(page, baseURL!)
})

// Routes with a known, not-yet-fixed defect: reported to the owning agent, tracked as fixme.
const KNOWN_ISSUES: Record<string, string> = {
}

test.describe('route smoke tests (mobile)', () => {
  for (const route of ROUTES) {
    const run = KNOWN_ISSUES[route] ? test.fixme : test
    run(`${route} returns 200, renders an h1 and logs no console errors`, async ({ page, baseURL }) => {
      const errors = collectConsoleErrors(page, baseURL!)

      const response = await page.goto(route, { waitUntil: 'domcontentloaded' })
      expect(response?.status(), `HTTP status of ${route}`).toBe(200)

      await expect(page.locator('h1').first()).toBeVisible()

      // Let hydration + mocked API calls settle before judging the console.
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(300)

      expect(errors, errors.join('\n')).toEqual([])
    })
  }
})

test.describe('information architecture', () => {
  test('a link to /settings is reachable from "/" within 2 taps on mobile', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const settingsLink = page.locator('a[href="/settings"]:visible')
    if (await settingsLink.count() === 0) {
      // Tap 1: open the "more" hub from the bottom navigation.
      await page.locator('nav a[href="/more"]:visible').first().tap()
      await page.waitForURL('**/more')
    }
    // Tap 2: the settings link must now be visible and navigable.
    await expect(settingsLink.first()).toBeVisible()
    await settingsLink.first().tap()
    await expect(page).toHaveURL(/\/settings$/)
  })

  test('bottom navigation has 5 tabs including /more and /learn', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const tabs = page.locator('nav.liquid-nav-pill a')
    await expect(tabs).toHaveCount(5)
    const hrefs = await tabs.evaluateAll(els => els.map(el => el.getAttribute('href')))
    expect(hrefs).toContain('/more')
    expect(hrefs).toContain('/learn')
  })
})
