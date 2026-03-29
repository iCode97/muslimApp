<script setup lang="ts">
interface Props {
  variant?: 'card' | 'list' | 'prayer-row' | 'text'
  rows?: number
}

withDefaults(defineProps<Props>(), {
  variant: 'card',
  rows: 3,
})
</script>

<template>
  <!-- Prayer row skeleton -->
  <template v-if="variant === 'prayer-row'">
    <div v-for="i in rows" :key="i" class="flex items-center justify-between px-4 py-3">
      <div class="flex items-center gap-3">
        <div class="skeleton skeleton-circle w-8 h-8" />
        <div class="skeleton skeleton-text w-20" />
      </div>
      <div class="skeleton skeleton-text w-14" />
    </div>
  </template>

  <!-- List item skeleton -->
  <template v-else-if="variant === 'list'">
    <div v-for="i in rows" :key="i" class="glass flex items-center gap-4 px-4 py-3">
      <div class="skeleton skeleton-circle w-10 h-10 shrink-0" />
      <div class="flex-1 space-y-2">
        <div class="skeleton skeleton-text w-3/4" />
        <div class="skeleton skeleton-text-sm w-1/2" />
      </div>
    </div>
  </template>

  <!-- Text block skeleton -->
  <template v-else-if="variant === 'text'">
    <div class="space-y-2.5">
      <div v-for="i in rows" :key="i" class="skeleton skeleton-text" :style="{ width: `${85 - (i * 10)}%` }" />
    </div>
  </template>

  <!-- Card skeleton (default) -->
  <template v-else>
    <div class="glass p-4 space-y-3">
      <div class="skeleton skeleton-text w-1/3" />
      <div class="space-y-2">
        <div v-for="i in rows" :key="i" class="skeleton skeleton-text" :style="{ width: `${95 - (i * 12)}%` }" />
      </div>
    </div>
  </template>
</template>
