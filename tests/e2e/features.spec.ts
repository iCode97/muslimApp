import { expect, test } from '@playwright/test'
import { mockExternalApis, seedStorage } from './helpers'

test.beforeEach(async ({ page, context, baseURL }) => {
  await seedStorage(context)
  await mockExternalApis(page, baseURL!)
})

const readBookmark = (page: import('@playwright/test').Page) =>
  page.evaluate(() => {
    const raw = localStorage.getItem('muslimapp-quran-bookmark')
    return raw ? JSON.parse(raw) as { surahId: number, verseNumber: number } : null
  })

test.describe('quran reading bookmark', () => {
  test('opening a surah does not set the bookmark immediately', async ({ page }) => {
    await page.goto('/quran/2', { waitUntil: 'networkidle' })
    await expect(page.locator('[data-verse-number]').first()).toBeVisible()
    // Well below the 2s dwell threshold.
    await page.waitForTimeout(800)
    expect(await readBookmark(page)).toBeNull()
  })

  test('a verse that stays in view for 2s becomes the bookmark', async ({ page }) => {
    await page.goto('/quran/2', { waitUntil: 'networkidle' })
    const verse = page.locator('[data-verse-number="3"]')
    await verse.scrollIntoViewIfNeeded()
    await expect.poll(() => readBookmark(page), { timeout: 8_000 }).not.toBeNull()
    const bookmark = await readBookmark(page)
    expect(bookmark?.surahId).toBe(2)
    expect(bookmark?.verseNumber).toBeGreaterThanOrEqual(1)
  })
})

test.describe('confirm dialog', () => {
  test('tasbih reset asks for confirmation (Esc keeps the count, confirm resets)', async ({ page }) => {
    await page.goto('/tasbih', { waitUntil: 'networkidle' })

    const counter = page.getByRole('button', { name: /^Zähler erhöhen/ })
    await counter.click()
    await counter.click()
    await expect(counter).toHaveAccessibleName(/: 2 von/)

    const reset = page.getByRole('button', { name: 'Zurücksetzen' })
    await reset.click()

    const dialog = page.getByRole('alertdialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('button', { name: 'Abbrechen' })).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(counter).toHaveAccessibleName(/: 2 von/)
    await expect(reset).toBeFocused()

    await reset.click()
    await page.getByRole('alertdialog').getByRole('button', { name: 'Zurücksetzen' }).click()
    await expect(counter).toHaveAccessibleName(/: 0 von/)
  })
})

test.describe('about page', () => {
  test('derives content counts from the data (no stale "43")', async ({ page }) => {
    await page.goto('/about', { waitUntil: 'networkidle' })
    const body = page.locator('main')
    await expect(body).toContainText('100 kuratierte Hadiths')
    await expect(body).toContainText('Version 0.6.0')
    await expect(body).not.toContainText('43 kuratierte')
  })
})

test.describe('accessibility basics on owned pages', () => {
  for (const route of ['/tasbih', '/quran', '/quran/1', '/calendar', '/dua', '/hadith', '/names', '/guide', '/seerah', '/about']) {
    test(`${route}: every button and link has an accessible name`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' })
      await page.waitForTimeout(300)

      const unnamed = await page.evaluate(() => {
        const nameOf = (el: Element) => {
          const label = el.getAttribute('aria-label')?.trim()
          if (label) return label
          const by = el.getAttribute('aria-labelledby')
          if (by && by.split(/\s+/).some(id => document.getElementById(id)?.textContent?.trim())) return 'labelledby'
          const text = Array.from(el.childNodes)
            .map(n => (n.nodeType === Node.TEXT_NODE ? n.textContent : (n as Element).getAttribute?.('aria-hidden') === 'true' ? '' : n.textContent))
            .join('')
            .trim()
          return text || el.getAttribute('title')?.trim() || ''
        }
        // Scoped to <main>: the shared layout/nav is owned elsewhere.
        return Array.from(document.querySelectorAll('main button, main a[href], main [role="button"], main [role="switch"]'))
          .filter(el => !(el as HTMLElement).closest('[aria-hidden="true"]'))
          .filter(el => !nameOf(el))
          .map(el => el.outerHTML.slice(0, 140))
      })
      expect(unnamed, unnamed.join('\n')).toEqual([])
    })
  }
})
