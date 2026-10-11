<script setup lang="ts">
/**
 * Reusable progress bar component.
 * Used across Seerah, Quran, Hadith, Names, Guide for consistent UX.
 */
const props = withDefaults(defineProps<{
  label: string
  current: number
  total: number
  percent: number
  showReset?: boolean
}>(), {
  showReset: false,
})

const emit = defineEmits<{
  reset: []
}>()

const { t } = useI18n()
const confirm = useConfirm()

async function onReset() {
  const ok = await confirm({
    message: t('common.resetConfirm'),
    confirmLabel: t('common.reset'),
    danger: true,
  })
  if (ok) emit('reset')
}
</script>

<template>
  <GlassCard variant="subtle" padding="sm">
    <div class="flex items-center gap-3 px-1">
      <div class="flex-1">
        <div class="flex justify-between text-xs mb-1.5">
          <span class="text-themed-muted">{{ label }}</span>
          <div class="flex items-center gap-2">
            <span class="text-[var(--color-primary-light)] font-medium tabular-nums">{{ current }}/{{ total }}</span>
            <button
              v-if="showReset && current > 0"
              type="button"
              class="text-themed-faint hover:text-red-400 transition-colors px-1"
              :title="t('common.reset')"
              :aria-label="t('common.reset')"
              @click.stop="onReset"
            >
              <span aria-hidden="true">↺</span>
            </button>
          </div>
        </div>
        <div
          class="w-full h-2 rounded-full glass-subtle overflow-hidden"
          role="progressbar"
          :aria-label="label"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-valuenow="percent"
          :aria-valuetext="`${current}/${total} (${t('a11y.progressValue', { percent })})`"
        >
          <div
            class="h-full rounded-full bg-[var(--color-primary-light)] transition-all duration-500"
            :style="{ width: `${percent}%` }"
          />
        </div>
      </div>
      <span class="text-lg font-semibold text-[var(--color-primary-light)] tabular-nums">{{ percent }}%</span>
    </div>
  </GlassCard>
</template>
