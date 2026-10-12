<script setup lang="ts">
/**
 * Calm notice for content that has not been reviewed by a qualified person yet.
 * `compact` renders only a small chip (for lists).
 */
defineProps<{ compact?: boolean }>()

const { t } = useI18n()
</script>

<template>
  <span
    v-if="compact"
    class="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full draft-chip"
  >
    <AppIcon name="clock" :size="11" />
    {{ t('learn.draftShort') }}
  </span>
  <div v-else class="draft-note flex items-start gap-3 rounded-2xl p-3" role="note">
    <AppIcon name="clock" :size="18" class="flex-shrink-0 mt-0.5 draft-icon" />
    <div class="min-w-0">
      <p class="text-xs font-semibold draft-title">{{ t('learn.draftBadge') }}</p>
      <p class="text-xs text-themed-muted mt-0.5 leading-relaxed">{{ t('learn.draftHint') }}</p>
    </div>
  </div>
</template>

<style scoped>
.draft-note {
  background: color-mix(in srgb, var(--color-gold) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-gold) 35%, transparent);
}
.draft-icon,
.draft-title {
  color: var(--color-gold);
}
.draft-chip {
  color: var(--color-gold);
  background: color-mix(in srgb, var(--color-gold) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-gold) 30%, transparent);
}
</style>
