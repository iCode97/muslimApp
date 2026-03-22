<script setup lang="ts">
interface Props {
  variant?: 'default' | 'strong' | 'subtle' | 'primary'
  padding?: 'sm' | 'md' | 'lg'
  glow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  glow: false,
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
</script>

<template>
  <div
    :class="[
      variantClass,
      paddingClass,
      glow ? 'glass-glow animate-pulse-glow' : '',
      'transition-all duration-300',
    ]"
  >
    <slot />
  </div>
</template>
