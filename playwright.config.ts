import { defineConfig, devices } from '@playwright/test'

// Never use port 3000 (reserved for the dev server).
const PORT = Number(process.env.E2E_PORT ?? 3104)
const BASE_URL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  outputDir: 'tests/.output/test-results',
  reporter: process.env.CI ? [['github'], ['html', { open: 'never', outputFolder: 'tests/.output/report' }]] : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    // The PWA service worker would cache/serve stale responses and bypass page.route mocks.
    serviceWorkers: 'block',
    locale: 'de-DE',
  },
  projects: [
    {
      name: 'chromium-mobile',
      // iPhone 13 viewport/touch/UA, but run on Chromium only.
      use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' },
    },
  ],
  webServer: {
    // Production build + production server, exactly what ships.
    command: 'npx nuxi build && node .output/server/index.mjs',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
    stdout: 'ignore',
    stderr: 'pipe',
    env: {
      PORT: String(PORT),
      NITRO_PORT: String(PORT),
      NITRO_HOST: '127.0.0.1',
    },
  },
})
