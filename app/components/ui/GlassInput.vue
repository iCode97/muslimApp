<script setup lang="ts">
interface Props {
  modelValue: string
  placeholder?: string
  type?: string
  icon?: string
  /** Accessible name; falls back to the placeholder. */
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  type: 'text',
  icon: '',
  ariaLabel: undefined,
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="glass flex items-center gap-3 px-4 py-3 focus-within:ring-2 focus-within:ring-[var(--color-primary-light)]">
    <span v-if="icon" class="text-[var(--color-text-secondary)] text-lg" aria-hidden="true">
      {{ icon }}
    </span>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :aria-label="props.ariaLabel || props.placeholder || undefined"
      class="bg-transparent w-full outline-none text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]/50"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>
