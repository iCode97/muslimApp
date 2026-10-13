// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  experimental: {
    // Smooth cross-fade between routes via the View Transitions API.
    // Falls back gracefully on browsers without support.
    viewTransition: true,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
    // @vite-pwa/nuxt auto-imports its own `usePWA` (a thin `$pwa` accessor),
    // which would shadow app/composables/usePWA.ts. Drop the module's entry so
    // ours (which wraps `$pwa` and keeps the install-prompt API) wins.
    (_options, nuxt) => {
      nuxt.hook('imports:extend', (imports) => {
        for (let i = imports.length - 1; i >= 0; i--) {
          const entry = imports[i]
          if (entry?.name === 'usePWA' && String(entry.from).includes('@vite-pwa/nuxt')) imports.splice(i, 1)
        }
      })
    },
  ],

  app: {
    head: {
      title: 'MuslimApp',
      meta: [
        { name: 'description', content: 'Gebetszeiten, Koran & islamischer Kalender' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#2D6A4F' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'MuslimApp' },
        { name: 'msapplication-TileColor', content: '#2D6A4F' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/icon-180.png' },
        // Fonts are self-hosted (public/fonts, @font-face in main.css); preload the Latin subset
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/inter-latin.woff2', crossorigin: 'anonymous' },
      ],
    },
  },

  // PWA: service worker (Workbox, injectManifest) + web app manifest.
  // The SW is registered by the module's client plugin (registerType 'prompt');
  // app/components/pwa/UpdatePrompt.vue shows the update / offline-ready UI.
  pwa: {
    strategies: 'injectManifest',
    // Resolved against Vite's root, which is Nuxt's srcDir (app/).
    srcDir: '../service-worker',
    filename: 'sw.ts', // emitted as /sw.js — same URL as the legacy worker
    scope: '/',
    base: '/',
    registerType: 'prompt',
    injectRegister: false,
    // Adds no-cache headers for /sw.js and /manifest.webmanifest in Nitro.
    registerWebManifestInRouteRules: true,
    manifestFilename: 'manifest.webmanifest',
    manifest: {
      id: '/',
      name: 'MuslimApp',
      short_name: 'MuslimApp',
      description: 'Gebetszeiten, Koran & islamischer Kalender',
      lang: 'de',
      dir: 'ltr',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#0A0A0A',
      theme_color: '#2D6A4F',
      categories: ['lifestyle', 'education'],
      icons: [
        { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        // Full-bleed square artwork (theme color), logo inside the 80% safe zone
        { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      ],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,svg,png,ico,woff2}'],
      globIgnores: ['**/node_modules/**', 'sw.js', 'workbox-*.js'],
      maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
    },
    client: {
      installPrompt: false, // custom install flow lives in app/composables/usePWA.ts
      periodicSyncForUpdates: 60 * 60, // check /sw.js for a new deploy hourly
    },
    devOptions: {
      // Keep the SW off in `nuxi dev` to avoid stale dev caches.
      enabled: false,
      type: 'module',
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  i18n: {
    locales: [
      { code: 'de', name: 'Deutsch', file: 'de.json', dir: 'ltr', language: 'de-DE' },
      { code: 'en', name: 'English', file: 'en.json', dir: 'ltr', language: 'en-US' },
      { code: 'tr', name: 'Türkçe', file: 'tr.json', dir: 'ltr', language: 'tr-TR' },
      { code: 'ar', name: 'العربية', file: 'ar.json', dir: 'rtl', language: 'ar' },
    ],
    defaultLocale: 'de',
    lazy: true,
    langDir: '../i18n/',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'muslimapp-locale',
      fallbackLocale: 'de',
    },
  },

  runtimeConfig: {
    // Server-only: upstream URL for the Aladhan proxy routes in /server/api/aladhan/**.
    // Override via NUXT_ALADHAN_BASE_URL in production if needed.
    aladhanBaseUrl: 'https://api.aladhan.com/v1',
    // Web Push (VAPID). Generate a pair with `npm run vapid`. Push is disabled
    // gracefully (local reminders only) unless all three are set:
    //   NUXT_VAPID_PRIVATE_KEY, NUXT_VAPID_SUBJECT ("mailto:…"), NUXT_PUBLIC_VAPID_PUBLIC_KEY
    vapidPrivateKey: '',
    vapidSubject: '',
    public: {
      quranBaseUrl: 'https://api.quran.com/api/v4',
      vapidPublicKey: '',
    },
  },

  nitro: {
    // Pre-compress build assets (gzip + brotli) so the bare Node server (see Dockerfile)
    // serves them compressed without needing a reverse proxy to do it.
    compressPublicAssets: true,
    experimental: {
      tasks: true,
    },
    // Server-side push scheduler (server/tasks/push/dispatch.ts)
    scheduledTasks: {
      '* * * * *': ['push:dispatch'],
    },
    storage: {
      // Push subscribers (one JSON file per subscription). Persist ./.data in
      // production (Docker volume on /app/.data, see docker-compose.yml).
      push: { driver: 'fs', base: './.data/push' },
    },
  },

  ssr: true,

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})
