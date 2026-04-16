<script setup lang="ts">
/**
 * GlassCard — Liquid Glass surface with optional pointer-reactive specular
 * highlight and subtle 3D tilt. The interactive effects are opt-in via the
 * `interactive` prop and are skipped entirely on coarse pointers and when
 * prefers-reduced-motion is requested.
 */

interface Props {
  variant?: 'default' | 'strong' | 'subtle' | 'primary'
  padding?: 'sm' | 'md' | 'lg'
  glow?: boolean
  /** Enable pointer-reactive specular highlight + subtle tilt. */
  interactive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  glow: false,
  interactive: false,
})

const variantClass = computed(() => {
  const map: Record<string, string> = {
    default: 'glass',
    strong: 'glass-strong',
    subtle: 'glass-subtle',
    primary: 'glass-primary',
  }
  return map[props.variant]
})

const paddingClass = computed(() => {
  const map: Record<string, string> = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }
  return map[props.padding]
})

const root = ref<HTMLDivElement | null>(null)

function shouldAnimate(): boolean {
  if (!import.meta.client) return false
  // Skip on coarse pointers (touch) — tilting under a finger feels wrong.
  if (window.matchMedia('(pointer: coarse)').matches) return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return true
}

function onPointerMove(event: PointerEvent) {
  if (!props.interactive) return
  if (!shouldAnimate()) return
  const el = root.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width
  const y = (event.clientY - rect.top) / rect.height
  el.style.setProperty('--pointer-x', `${(x * 100).toFixed(2)}%`)
  el.style.setProperty('--pointer-y', `${(y * 100).toFixed(2)}%`)
  // Small tilt: map (0..1) to roughly (-3deg..+3deg)
  const tiltX = ((0.5 - y) * 4).toFixed(2)
  const tiltY = ((x - 0.5) * 4).toFixed(2)
  el.style.setProperty('--tilt-x', `${tiltX}deg`)
  el.style.setProperty('--tilt-y', `${tiltY}deg`)
  el.dataset.hover = '1'
}

function onPointerLeave() {
  const el = root.value
  if (!el) return
  el.style.setProperty('--tilt-x', '0deg')
  el.style.setProperty('--tilt-y', '0deg')
  delete el.dataset.hover
}
</script>

<template>
  <div
    ref="root"
    :class="[
      variantClass,
      paddingClass,
      glow ? 'glass-glow animate-pulse-glow' : '',
      interactive ? 'glass-interactive' : '',
      'transition-all duration-300',
    ]"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <slot />
  </div>
</template>
