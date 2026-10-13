<script setup lang="ts">
/**
 * HonorificText — renders text and wraps the ﷺ ligature (U+FDFA) in a span with
 * the Amiri font, because Inter has no (or a badly rendered) glyph for it.
 * Safe: output is plain text nodes, no v-html.
 */
const props = defineProps<{ text: string }>()

const parts = computed(() =>
  props.text.split(/(ﷺ)/).filter(Boolean).map(value => ({ value, honorific: value === 'ﷺ' })),
)
</script>

<template>
  <span><template v-for="(part, i) in parts" :key="i"><span v-if="part.honorific" class="font-honorific" lang="ar">{{ part.value }}</span><template v-else>{{ part.value }}</template></template></span>
</template>
