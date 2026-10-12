<script setup lang="ts">
/**
 * Renders learning-center text. Supports **bold** only; everything is output as
 * text nodes (no v-html), so content can never inject markup.
 */
import { parseBold } from '~/data/learn'

const props = defineProps<{ text: string }>()

const segments = computed(() => parseBold(props.text))
</script>

<template>
  <span><template v-for="(seg, i) in segments" :key="i"><strong v-if="seg.bold" class="font-semibold text-themed"><HonorificText :text="seg.text" /></strong><HonorificText v-else :text="seg.text" /></template></span>
</template>
