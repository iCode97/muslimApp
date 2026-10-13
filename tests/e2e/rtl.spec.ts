import { expect, test } from '@playwright/test'
import { collectConsoleErrors, mockExternalApis, seedStorage } from './helpers'

// Arabic UI language + right-to-left layout.

test.beforeEach(async ({ page, context, baseURL }) => {
  await seedStorage(context)
  await context.addCookies([{ name: 'muslimapp-locale', value: 'ar', url: baseURL! }])
  await mockExternalApis(page, baseURL!)
})

for (const path of ['/', '/settings']) {
  test(`${path} renders RTL with lang="ar" and no horizontal overflow`, async ({ page, baseURL }) => {
    const errors = collectConsoleErrors(page, baseURL!)
    await page.goto(path)

    const html = page.locator('html')
    await expect(html).toHaveAttribute('dir', 'rtl')
    await expect(html).toHaveAttribute('lang', 'ar')

    // Bottom navigation is visible (mobile viewport) and labelled in Arabic
    const nav = page.locator('.liquid-nav-pill')
    await expect(nav).toBeVisible()
    await expect(nav).toContainText('اليوم')

    // No horizontal page scroll in RTL
    await page.waitForLoadState('networkidle')
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(0)

    expect(errors, errors.join('\n')).toEqual([])
  })
}

test('bottom nav order mirrors in RTL (first tab on the right)', async ({ page }) => {
  await page.goto('/')
  const items = page.locator('.liquid-nav-item')
  await expect(items).toHaveCount(5)
  const first = await items.first().boundingBox()
  const last = await items.last().boundingBox()
  expect(first!.x).toBeGreaterThan(last!.x)
})

test('settings offers Arabic and switches back to German (ltr)', async ({ page }) => {
  await page.goto('/settings')
  await expect(page.getByRole('button', { name: 'العربية' })).toBeVisible()
  await page.locator('button[lang="de"]').click()
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
  await expect(page.locator('html')).toHaveAttribute('lang', 'de')
})

test('qibla compass is never mirrored (dir="ltr")', async ({ page }) => {
  await page.goto('/qibla')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await expect(page.locator('[dir="ltr"] svg[viewBox="0 0 300 300"]')).toHaveCount(1)
})

for (const path of ['/prayer', '/quran', '/calendar', '/tasbih', '/dua', '/hadith', '/adhkar', '/learn', '/more', '/zakat', '/tracker', '/learn/fiqh']) {
  test(`${path} has no horizontal overflow or console errors in Arabic/RTL`, async ({ page, baseURL }) => {
    const errors = collectConsoleErrors(page, baseURL!)
    await page.goto(path)
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await page.waitForLoadState('networkidle')
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(0)
    expect(errors, errors.join('\n')).toEqual([])
  })
}

test('Arabic quran reader shows only Arabic text by default', async ({ page }) => {
  await page.goto('/quran/1')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await expect(page.locator('p[lang="ar"]').first()).toBeVisible()
  await expect(page.getByText(/Translation \d+ v1/)).toHaveCount(0)
})
