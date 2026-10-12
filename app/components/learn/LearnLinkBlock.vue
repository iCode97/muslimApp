<script setup lang="ts">
import { localize, type LocalizedText } from '~/data/learn'

defineProps<{ to: string, label: LocalizedText }>()

const { t, locale } = useI18n()
const haptics = useHaptics()
</script>

<template>
  <NuxtLink
    :to="to"
    class="link-block glass rounded-2xl p-4 flex items-center gap-3 active:scale-[0.99] transition-transform"
    @click="haptics.tap()"
  >
    <span class="link-icon" aria-hidden="true">
      <AppIcon name="arrowRight" :size="18" />
    </span>
    <span class="flex-1 min-w-0">
      <span class="block text-sm font-medium text-themed">{{ localize(label, locale) }}</span>
      <span class="block text-xs text-themed-muted mt-0.5">{{ t('learn.linkOpen') }}</span>
    </span>
    <AppIcon name="chevronRight" :size="18" class="text-themed-faint flex-shrink-0" />
  </NuxtLink>
</template>

<style scoped>
.link-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  background: var(--glass-bg-subtle);
  border: 1px solid var(--glass-border);
  color: var(--color-primary-light);
}
.link-block:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}
</style>
