<script setup lang="ts">
import { localize, pathMinutes, type LearningPath } from '~/data/learn/core'

const props = defineProps<{
  path: LearningPath
  done: number
}>()

const { t, locale } = useI18n()
const haptics = useHaptics()

const total = computed(() => props.path.lessons.length)
const percent = computed(() => (total.value ? Math.round((props.done / total.value) * 100) : 0))
const finished = computed(() => total.value > 0 && props.done >= total.value)
</script>

<template>
  <NuxtLink
    :to="`/learn/${path.id}`"
    class="path-card flex items-center gap-4 p-4 rounded-2xl"
    @click="haptics.tap()"
  >
    <span class="icon-tile" aria-hidden="true">
      <AppIcon :name="finished ? 'checkCircle' : path.icon" :size="22" />
    </span>
    <span class="flex-1 min-w-0 space-y-1.5">
      <span class="block font-medium text-sm" dir="auto">{{ localize(path.title, locale) }}</span>
      <span class="block text-xs text-themed-muted line-clamp-2" dir="auto">{{ localize(path.description, locale) }}</span>
      <span class="flex items-center gap-2 text-[11px] text-themed-faint tabular-nums">
        <span>{{ t('learn.lessonsCount', { count: total }) }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ t('learn.minutes', { count: pathMinutes(path) }) }}</span>
      </span>
      <span class="flex items-center gap-2" role="img" :aria-label="t('learn.lessonsDone', { done, total })">
        <span class="flex-1 h-1.5 rounded-full bg-[var(--glass-border)] overflow-hidden" aria-hidden="true">
          <span class="block h-full rounded-full bg-[var(--color-primary-light)] transition-all duration-500" :style="{ width: `${percent}%` }" />
        </span>
        <span class="text-[11px] font-medium text-[var(--color-primary-light)] tabular-nums" aria-hidden="true">{{ done }}/{{ total }}</span>
      </span>
    </span>
    <AppIcon name="chevronRight" :size="18" class="text-themed-faint flex-shrink-0" />
  </NuxtLink>
</template>

<style scoped>
.icon-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 0.875rem;
  background: var(--glass-bg-subtle);
  border: 1px solid var(--glass-border);
  color: var(--color-primary-light);
}
.path-card:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}
</style>
