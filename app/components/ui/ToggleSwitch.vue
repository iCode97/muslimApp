<script setup lang="ts">
/**
 * ToggleSwitch — accessible on/off switch (button with role="switch").
 *
 * Usage:
 *   <ToggleSwitch v-model="enabled" :aria-label="t('settings.haptics')" />
 *   <ToggleSwitch v-model="enabled" aria-labelledby="my-label-id" size="sm" />
 */
interface Props {
  modelValue: boolean
  size?: 'sm' | 'md'
  disabled?: boolean
  /** Accessible name (use this or ariaLabelledby). */
  ariaLabel?: string
  /** id of an element that labels the switch. */
  ariaLabelledby?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [value: boolean]
}>()

function toggle() {
  if (props.disabled) return
  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    :disabled="disabled"
    :class="[
      'relative shrink-0 rounded-full transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none',
      size === 'sm' ? 'w-10 h-6' : 'w-12 h-7',
      modelValue ? 'bg-[var(--color-primary)]' : 'glass-subtle',
    ]"
    @click="toggle"
  >
    <span
      aria-hidden="true"
      :class="[
        'absolute rounded-full bg-white shadow transition-all duration-200 w-5 h-5',
        size === 'sm'
          ? ['top-0.5', modelValue ? 'start-[18px]' : 'start-0.5']
          : ['top-1', modelValue ? 'start-6' : 'start-1'],
      ]"
    />
  </button>
</template>
