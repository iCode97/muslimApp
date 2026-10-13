<script setup lang="ts">
import { APP_ITEMS, EXTRA_FAVORITABLE_ITEMS, TOOL_ITEMS } from '~/composables/useNavigation'

// Initialize theme and PWA on app mount
const theme = useTheme()
const pwa = usePWA()

// <html lang dir> follows the active UI locale (Arabic → rtl).
const { t, locale, locales } = useI18n()
const htmlDir = computed<'ltr' | 'rtl'>(() => {
  const entry = (locales.value as Array<{ code: string, dir?: string }>).find(l => l.code === locale.value)
  return entry?.dir === 'rtl' ? 'rtl' : 'ltr'
})
useHead({
  htmlAttrs: {
    lang: () => locale.value,
    dir: () => htmlDir.value,
  },
})

// Localized default <title>, description and Open Graph tags for every route.
// Pages that call useHead/useSeoMeta themselves (learn, quran/[surah], privacy, …) override these.
const route = useRoute()
const ROUTE_NAV: Record<string, { title: string, desc?: string }> = {
  '/prayer': { title: 'nav.prayer' },
  '/quran': { title: 'nav.quran' },
  '/more': { title: 'more.title', desc: 'more.subtitle' },
  ...Object.fromEntries(
    [...TOOL_ITEMS, ...EXTRA_FAVORITABLE_ITEMS, ...APP_ITEMS].map(i => [i.path, { title: i.label, desc: i.desc }]),
  ),
}
const seo = computed(() => {
  const entry = ROUTE_NAV[route.path.replace(/\/$/, '') || '/']
  const name = t('app.name')
  const title = entry ? `${t(entry.title)} — ${name}` : `${name} — ${t('app.tagline')}`
  const description = entry?.desc ? t(entry.desc) : t('app.description')
  return { title, description }
})
const ogLocale = computed(() => (locales.value as Array<{ code: string, language?: string }>)
  .find(l => l.code === locale.value)?.language?.replace('-', '_'))
useSeoMeta({
  title: () => seo.value.title,
  description: () => seo.value.description,
  ogTitle: () => seo.value.title,
  ogDescription: () => seo.value.description,
  ogType: 'website',
  ogSiteName: 'MuslimApp',
  ogLocale: () => ogLocale.value,
  ogImage: '/icons/icon-512.png',
  twitterCard: 'summary',
})

onMounted(() => {
  theme.init()
  pwa.init()
})
</script>

<template>
  <!-- <link rel="manifest"> for the module-generated /manifest.webmanifest -->
  <NuxtPwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <UpdatePrompt />
  </ClientOnly>
</template>
