import { expect, test } from '@playwright/test'
import { mockExternalApis, seedStorage } from './helpers'

test.beforeEach(async ({ page, context, baseURL }) => {
  await seedStorage(context)
  await mockExternalApis(page, baseURL!)
})

test.describe('privacy page', () => {
  test('is linked from /about, /settings and /more', async ({ page }) => {
    for (const route of ['/about', '/settings', '/more']) {
      await page.goto(route, { waitUntil: 'networkidle' })
      await expect(page.locator('main a[href="/privacy"]').first(), route).toBeVisible()
    }
  })

  test('renders the sections, the operator placeholder and loads fonts from our own origin', async ({ page, baseURL }) => {
    const external: string[] = []
    page.on('request', (req) => {
      const url = req.url()
      if (/fonts\.(googleapis|gstatic)\.com/.test(url)) external.push(url)
    })

    await page.goto('/privacy', { waitUntil: 'networkidle' })
    await expect(page.locator('h1')).toHaveText('Datenschutz')
    await expect(page.getByTestId('operator-placeholder')).toBeVisible()
    await expect(page.locator('main')).toContainText('api.quran.com')
    await expect(page.locator('main')).toContainText('Push-Erinnerungen')
    await expect(page.getByTestId('delete-all-data')).toBeVisible()
    expect(external, `Google Fonts requests from ${baseURL}`).toEqual([])

    const fontLoaded = await page.evaluate(async () => {
      await document.fonts.ready
      return [...document.fonts].some(f => f.family.replace(/["']/g, '') === 'Inter' && f.status === 'loaded')
    })
    expect(fontLoaded).toBe(true)
  })

  test('"Alle lokalen Daten löschen" asks first, then wipes muslimapp-* data and reloads', async ({ page }) => {
    await page.goto('/privacy', { waitUntil: 'networkidle' })
    await page.evaluate(async () => {
      localStorage.setItem('muslimapp-e2e-probe', '1')
      localStorage.setItem('unrelated-key', 'keep')
      await new Promise<void>((resolve, reject) => {
        const req = indexedDB.open('muslimapp-quran-offline', 1)
        req.onupgradeneeded = () => req.result.createObjectStore('verses', { keyPath: 'surahId' })
        req.onsuccess = () => { req.result.close(); resolve() }
        req.onerror = () => reject(req.error)
      })
    })

    const button = page.getByTestId('delete-all-data')
    await button.click()
    const dialog = page.getByRole('alertdialog')
    await expect(dialog).toBeVisible()

    // Cancel keeps everything
    await dialog.getByRole('button', { name: 'Abbrechen' }).click()
    await expect(dialog).toBeHidden()
    expect(await page.evaluate(() => localStorage.getItem('muslimapp-e2e-probe'))).toBe('1')

    // Confirm wipes and reloads to the dashboard
    await button.click()
    await page.getByRole('alertdialog').getByRole('button', { name: 'Alles löschen' }).click()
    await page.waitForURL(url => new URL(url).pathname === '/')
    await page.waitForLoadState('networkidle')

    expect(await page.evaluate(() => localStorage.getItem('muslimapp-e2e-probe'))).toBeNull()
    expect(await page.evaluate(() => localStorage.getItem('unrelated-key'))).toBe('keep')
    const dbs = await page.evaluate(async () => (await indexedDB.databases()).map(d => d.name))
    expect(dbs).not.toContain('muslimapp-quran-offline')
  })
})
