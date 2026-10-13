<script setup lang="ts">
/**
 * Learning path overview — description, progress and the lesson list.
 */
import { getPath, localize, pathMinutes } from '~/data/learn'

definePageMeta({
  validate: route => !!getPath(String(route.params.path)),
})

const { t, locale } = useI18n()
const route = useRoute()
const haptics = useHaptics()
const knowledge = useKnowledgeLevel()
const progress = useLearnProgress()

const path = computed(() => getPath(String(route.params.path)))

useSeoMeta({
  title: () => (path.value ? localize(path.value.title, locale.value) : t('learn.title')),
  description: () => (path.value ? localize(path.value.description, locale.value) : ''),
})

onMounted(() => {
  progress.load()
  knowledge.load()
})

const lessons = computed(() => path.value?.lessons ?? [])
const summary = computed(() => progress.pathSummary(path.value?.id ?? ''))
const nextOpen = computed(() => (path.value ? progress.firstIncomplete(path.value.id) : undefined))
const finished = computed(() => summary.value.total > 0 && summary.value.done >= summary.value.total)
const started = computed(() => summary.value.done > 0)

const ctaLabel = computed(() => {
  if (finished.value) return t('learn.review')
  return started.value ? t('learn.resume') : t('learn.start')
})
const ctaTarget = computed(() => {
  const id = path.value?.id
  const lesson = nextOpen.value ?? lessons.value[0]
  return id && lesson ? `/learn/${id}/${lesson.id}` : '/learn'
})
</script>

<template>
  <div v-if="path" class="app-container pt-6 pb-8 space-y-6">
    <nav :aria-label="t('learn.breadcrumb')">
      <NuxtLink to="/learn" class="back-link inline-flex items-center gap-1.5 text-xs text-themed-muted hover:text-themed">
        <AppIcon name="arrowLeft" :size="14" />
        {{ t('learn.backToLearn') }}
      </NuxtLink>
    </nav>

    <header class="space-y-3">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-[10px] font-medium px-2 py-0.5 rounded-full glass-subtle text-themed-secondary">
          <span aria-hidden="true">{{ knowledge.levels.find(l => l.id === path!.level)?.emoji }}</span>
          {{ t(`knowledge.${path.level}`) }}
        </span>
        <span class="text-[11px] text-themed-faint tabular-nums">
          {{ t('learn.lessonsCount', { count: lessons.length }) }} · {{ t('learn.minutes', { count: pathMinutes(path) }) }}
        </span>
      </div>
      <h1 class="text-2xl font-semibold" dir="auto">{{ localize(path.title, locale) }}</h1>
      <p class="text-sm text-themed-muted leading-relaxed" dir="auto">{{ localize(path.description, locale) }}</p>
    </header>

    <!-- Progress + CTA -->
    <GlassCard variant="primary">
      <div class="space-y-3">
        <div class="flex items-center justify-between text-xs">
          <span class="text-themed-secondary">{{ t('learn.pathProgress') }}</span>
          <span class="font-semibold text-[var(--color-primary-light)] tabular-nums">
            {{ t('learn.lessonsDone', { done: summary.done, total: summary.total }) }} · {{ summary.percent }}%
          </span>
        </div>
        <div
          class="w-full h-2 rounded-full bg-[var(--glass-border)] overflow-hidden"
          role="progressbar"
          :aria-label="t('learn.pathProgress')"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-valuenow="summary.percent"
          :aria-valuetext="t('learn.lessonsDone', { done: summary.done, total: summary.total })"
        >
          <div class="h-full rounded-full bg-[var(--color-primary-light)] transition-all duration-500" :style="{ width: `${summary.percent}%` }" />
        </div>
        <NuxtLink
          :to="ctaTarget"
          class="cta inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          @click="haptics.tap()"
        >
          <AppIcon :name="finished ? 'check' : 'play'" :size="16" />
          {{ ctaLabel }}
        </NuxtLink>
        <p v-if="finished" class="text-xs text-themed-secondary">{{ t('learn.pathFinished') }}</p>
      </div>
    </GlassCard>

    <!-- Lessons -->
    <section aria-labelledby="lessons-heading" class="space-y-3">
      <h2 id="lessons-heading" class="text-sm font-medium text-themed-muted uppercase tracking-wider">
        {{ t('learn.lessonList') }}
      </h2>
      <ol class="space-y-2">
        <li v-for="(lesson, i) in lessons" :key="lesson.id">
          <NuxtLink
            :to="`/learn/${path.id}/${lesson.id}`"
            class="lesson-row glass flex items-center gap-3 p-3.5 rounded-2xl"
            @click="haptics.tap()"
          >
            <span
              :class="['lesson-num', progress.isCompleted(path.id, lesson.id) ? 'lesson-num--done' : '']"
              aria-hidden="true"
            >
              <AppIcon v-if="progress.isCompleted(path.id, lesson.id)" name="check" :size="16" :stroke="2.2" />
              <template v-else>{{ i + 1 }}</template>
            </span>
            <span class="flex-1 min-w-0">
              <span class="block text-sm font-medium leading-snug" dir="auto">{{ localize(lesson.title, locale) }}</span>
              <span class="flex items-center gap-2 mt-1 text-[11px] text-themed-faint flex-wrap">
                <span class="tabular-nums">{{ t('learn.minutes', { count: lesson.minutes }) }}</span>
                <span v-if="progress.isCompleted(path.id, lesson.id)" class="text-[var(--color-primary-light)]">
                  {{ t('learn.completed') }}
                </span>
                <LearnDraftBadge v-if="lesson.review === 'draft'" compact />
              </span>
            </span>
            <AppIcon name="chevronRight" :size="18" class="text-themed-faint flex-shrink-0" />
          </NuxtLink>
        </li>
      </ol>
    </section>

    <LearnDraftBadge v-if="lessons.some(l => l.review === 'draft')" />
  </div>
</template>

<style scoped>
.back-link:focus-visible,
.lesson-row:focus-visible,
.cta:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}
.cta {
  min-height: 2.75rem;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  background: var(--color-primary);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  transition: transform 0.15s ease;
}
.cta:active { transform: scale(0.97); }
.lesson-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  background: var(--glass-bg-subtle);
  border: 1px solid var(--glass-border-strong);
}
.lesson-num--done {
  color: #fff;
  background: var(--color-primary);
  border-color: var(--color-primary);
}
</style>
