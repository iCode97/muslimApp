<script setup lang="ts">
// Initialize theme and PWA on app mount
const theme = useTheme()
const pwa = usePWA()

// <html lang dir> follows the active UI locale (Arabic → rtl).
const { locale, locales } = useI18n()
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
