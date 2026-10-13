<script setup lang="ts">
/**
 * Round counter button with a progress ring ("2 / 3").
 * Emits `count`; the click does not bubble so a surrounding tap area
 * doesn't count twice.
 */
const props = withDefaults(defineProps<{
  count: number
  total: number
  /** Accessible name, should contain "x von y". */
  label: string
  size?: 'lg' | 'sm'
}>(), {
  size: 'lg',
})

const emit = defineEmits<{ count: [] }>()

const complete = computed(() => props.count >= props.total)
const radius = 44
const circumference = 2 * Math.PI * radius
const dashOffset = computed(() => {
  const p = props.total > 0 ? Math.min(props.count / props.total, 1) : 0
  return circumference * (1 - p)
})

const pulsing = ref(false)
let pulseTimer: ReturnType<typeof setTimeout> | undefined
function onClick() {
  emit('count')
  pulsing.value = true
  clearTimeout(pulseTimer)
  pulseTimer = setTimeout(() => (pulsing.value = false), 120)
}
onUnmounted(() => clearTimeout(pulseTimer))
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    :class="[
      'relative rounded-full !rounded-full flex-shrink-0 flex items-center justify-center select-none transition-transform duration-100 active:scale-95 counter-btn',
      size === 'lg' ? 'w-28 h-28' : 'w-16 h-16',
      pulsing ? 'scale-95' : '',
      complete ? 'glass-primary' : 'glass-strong',
    ]"
    @click.stop="onClick"
  >
    <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" :r="radius" fill="none" stroke="var(--glass-border)" stroke-width="4" />
      <circle
        cx="50" cy="50" :r="radius"
        fill="none"
        stroke="var(--color-primary-light)"
        stroke-width="4"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        class="transition-all duration-200"
      />
    </svg>
    <span v-if="complete" class="text-[var(--color-primary-light)]" aria-hidden="true">
      <AppIcon name="check" :size="size === 'lg' ? 40 : 24" :stroke="2.2" />
    </span>
    <span v-else class="flex flex-col items-center leading-none" aria-hidden="true">
      <span :class="['font-light tabular-nums', size === 'lg' ? 'text-4xl' : 'text-lg font-medium']">{{ count }}</span>
      <span :class="['text-themed-faint tabular-nums', size === 'lg' ? 'text-xs mt-1' : 'text-[10px]']">/ {{ total }}</span>
    </span>
  </button>
</template>

<style scoped>
.counter-btn:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 3px;
}
</style>
