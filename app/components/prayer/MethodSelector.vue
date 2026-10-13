<script setup lang="ts">
/**
 * Prayer calculation method picker.
 * Shows the active method inline; tapping it opens a BottomSheet with the
 * full Aladhan method list. Changing the method changes the prayer cache key,
 * so the global prayer sync (app-init plugin) refetches automatically.
 */
import { PRAYER_METHODS } from '~/data/prayer-methods'

const { t } = useI18n()
const prayerTimes = usePrayerTimes()
const haptics = useHaptics()

const open = ref(false)

const activeMethod = computed(() =>
  PRAYER_METHODS.find(m => m.id === prayerTimes.method.value) ?? PRAYER_METHODS[0],
)

function choose(id: number) {
  if (id !== prayerTimes.method.value) {
    prayerTimes.setMethod(id)
    haptics.success()
  }
  open.value = false
}
</script>

<template>
  <GlassCard variant="subtle" padding="sm">
    <button
      class="w-full px-3 py-2 flex items-center justify-between gap-3 text-xs text-themed-muted hover:text-themed-secondary transition-colors"
      @click="haptics.light(); open = true"
    >
      <span class="truncate">
        {{ t('prayer.method') }}:
        <span class="text-themed-secondary">{{ activeMethod?.name }}</span>
      </span>
      <AppIcon name="chevronDown" :size="14" class="shrink-0" />
    </button>

    <BottomSheet v-model:open="open" :title="t('prayer.method')">
      <div class="space-y-1.5 pb-2">
        <button
          v-for="m in PRAYER_METHODS"
          :key="m.id"
          :class="[
            'w-full flex items-center justify-between gap-3 px-3 py-3 rounded-xl text-start transition-all',
            prayerTimes.method.value === m.id
              ? 'glass-primary text-[var(--color-primary-light)]'
              : 'glass-subtle text-themed-secondary hover:text-themed'
          ]"
          @click="choose(m.id)"
        >
          <div class="min-w-0">
            <p class="text-sm font-medium truncate">{{ m.name }}</p>
            <p class="text-xs text-themed-faint truncate">{{ m.region }} · Method {{ m.id }}</p>
          </div>
          <AppIcon v-if="prayerTimes.method.value === m.id" name="check" :size="18" class="shrink-0" />
        </button>
      </div>
    </BottomSheet>
  </GlassCard>
</template>
