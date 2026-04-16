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
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/icon-180.png' },
        // Preconnect to Google Fonts for faster font loading
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Amiri:wght@400;700&display=swap',
        },
      ],
      script: [
        {
          children: `if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('/sw.js').catch(() => {}) }) }`,
        },
      ],
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  i18n: {
    locales: [
      { code: 'de', name: 'Deutsch', file: 'de.json' },
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'tr', name: 'Türkçe', file: 'tr.json' },
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
    public: {
      quranBaseUrl: 'https://api.quran.com/api/v4',
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
