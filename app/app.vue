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
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
