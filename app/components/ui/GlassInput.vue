<script setup lang="ts">
interface Props {
  modelValue: string
  placeholder?: string
  type?: string
  icon?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: '',
  type: 'text',
  icon: '',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="glass flex items-center gap-3 px-4 py-3">
    <span v-if="icon" class="text-[var(--color-text-secondary)] text-lg">
      {{ icon }}
    </span>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      class="bg-transparent w-full outline-none text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]/50"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>
