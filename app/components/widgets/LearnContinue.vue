<script setup lang="ts">
/**
 * Widget: Continue learning — resumes the last lesson, or suggests a learning
 * path matching the chosen knowledge level.
 */
import { LEARNING_PATHS, getLesson, getPath, localize } from '~/data/learn'

const { t, locale } = useI18n()
const progress = useLearnProgress()
const knowledge = useKnowledgeLevel()

onMounted(() => {
  progress.load()
  knowledge.load()
})

const card = computed(() => {
  const r = progress.resume.value
  if (r) {
    const path = getPath(r.pathId)
    const lesson = getLesson(r.pathId, r.lessonId)
    if (path && lesson) {
      const s = progress.pathSummary(r.pathId)
      return {
        heading: t('learn.widgetName'),
        title: localize(lesson.title, locale.value),
        sub: localize(path.title, locale.value),
        to: `/learn/${r.pathId}/${r.lessonId}`,
        percent: s.percent,
        label: t('learn.lessonsDone', { done: s.done, total: s.total }),
        icon: path.icon,
      }
    }
  }
  // Suggestion: first path of the user's level that is not finished, else first path overall.
  const open = (id: string) => progress.pathSummary(id).percent < 100
  const suggestion
    = LEARNING_PATHS.find(p => p.level === knowledge.level.value && open(p.id))
      ?? LEARNING_PATHS.find(p => open(p.id))
      ?? LEARNING_PATHS[0]
  if (!suggestion) return null
  return {
    heading: t('learn.suggested'),
    title: localize(suggestion.title, locale.value),
    sub: localize(suggestion.description, locale.value),
    to: `/learn/${suggestion.id}`,
    percent: progress.pathSummary(suggestion.id).percent,
    label: t('learn.lessonsCount', { count: suggestion.lessons.length }),
    icon: suggestion.icon,
  }
})
</script>

<template>
  <NuxtLink v-if="card" :to="card.to">
    <GlassCard interactive>
      <div class="space-y-3">
        <h3 class="text-xs font-semibold text-themed-muted uppercase tracking-wider">
          {{ card.heading }}
        </h3>
        <div class="flex items-center gap-3">
          <span class="widget-icon" aria-hidden="true">
            <AppIcon :name="card.icon" :size="20" />
          </span>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-themed truncate" dir="auto">{{ card.title }}</p>
            <p class="text-xs text-themed-muted mt-0.5 truncate" dir="auto">{{ card.sub }}</p>
          </div>
          <AppIcon name="chevronRight" :size="18" class="text-themed-faint flex-shrink-0" />
        </div>
        <div class="flex items-center gap-2" role="img" :aria-label="card.label">
          <div class="flex-1 h-1.5 rounded-full bg-[var(--glass-border)] overflow-hidden" aria-hidden="true">
            <div class="h-full rounded-full bg-[var(--color-primary-light)]" :style="{ width: `${card.percent}%` }" />
          </div>
          <span class="text-[11px] text-themed-faint tabular-nums" aria-hidden="true">{{ card.label }}</span>
        </div>
      </div>
    </GlassCard>
  </NuxtLink>
</template>

<style scoped>
.widget-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  background: var(--glass-bg-subtle);
  border: 1px solid var(--glass-border);
  color: var(--color-primary-light);
}
</style>
