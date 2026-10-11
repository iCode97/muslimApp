<script setup lang="ts">
// Initialize theme and PWA on app mount
const theme = useTheme()
const pwa = usePWA()

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
