<script setup lang="ts">
/**
 * Renders one lesson content block. Headings are h2 (the lesson title is the h1).
 */
import { localize, type LessonBlock } from '~/data/learn'

defineProps<{ block: LessonBlock }>()
const emit = defineEmits<{ 'open-term': [id: string] }>()

const { locale } = useI18n()
</script>

<template>
  <p v-if="block.type === 'text'" class="text-[15px] leading-[1.75] text-themed-secondary">
    <LearnRichText :text="localize(block.text, locale)" />
  </p>

  <h2 v-else-if="block.type === 'heading'" class="text-lg font-semibold pt-2 text-themed">
    <LearnRichText :text="localize(block.text, locale)" />
  </h2>

  <ul v-else-if="block.type === 'list'" class="space-y-2 text-[15px] leading-relaxed text-themed-secondary">
    <li v-for="(item, i) in block.items" :key="i" class="flex gap-3">
      <span class="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--color-primary-light)] flex-shrink-0" aria-hidden="true" />
      <span class="min-w-0"><LearnRichText :text="localize(item, locale)" /></span>
    </li>
  </ul>

  <LearnQuranBlock
    v-else-if="block.type === 'quran'"
    :reference="block.ref"
    :arabic="block.arabic"
    :translation="block.translation"
  />

  <LearnHadithBlock
    v-else-if="block.type === 'hadith'"
    :source="block.source"
    :narrator="block.narrator"
    :arabic="block.arabic"
    :text="block.text"
    :grade="block.grade"
  />

  <LearnNoteBlock v-else-if="block.type === 'note'" :variant="block.variant" :text="block.text" />

  <LearnTermsBlock
    v-else-if="block.type === 'terms'"
    :ids="block.ids"
    @open="emit('open-term', $event)"
  />

  <LearnLinkBlock v-else-if="block.type === 'link' && block.to.startsWith('/')" :to="block.to" :label="block.label" />
</template>
