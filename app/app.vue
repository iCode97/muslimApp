<script setup lang="ts">
// Initialize theme on app mount
const theme = useTheme()

onMounted(() => {
  theme.init()
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
