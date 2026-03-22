// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

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
        { name: 'theme-color', content: '#0A0A0A' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Amiri:wght@400;700&display=swap',
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
    public: {
      aladhanBaseUrl: 'https://api.aladhan.com/v1',
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
