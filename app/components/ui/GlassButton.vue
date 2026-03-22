<script setup lang="ts">
interface Props {
  variant?: 'default' | 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  disabled: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :disabled="disabled"
    :class="[
      // Base
      'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200',
      'active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none',

      // Variant
      variant === 'default' && 'glass hover:bg-white/15',
      variant === 'primary' && 'glass-primary hover:shadow-[0_0_40px_rgba(45,106,79,0.25)]',
      variant === 'ghost' && 'hover:bg-white/5',

      // Size
      size === 'sm' && 'px-3 py-1.5 text-sm',
      size === 'md' && 'px-4 py-2.5 text-sm',
      size === 'lg' && 'px-6 py-3 text-base',
    ]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
