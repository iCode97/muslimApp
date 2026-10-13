<script setup lang="ts">
const { t } = useI18n()

interface Props {
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  size: 'md',
})
</script>

<template>
  <div class="flex items-center justify-center" role="status" :aria-label="t('common.loading')">
    <div
      aria-hidden="true"
      :class="[
        'rounded-full border-2 border-white/10 border-t-[var(--color-primary-light)] animate-spin',
        size === 'sm' && 'w-4 h-4',
        size === 'md' && 'w-8 h-8',
        size === 'lg' && 'w-12 h-12',
      ]"
    />
  </div>
</template>
