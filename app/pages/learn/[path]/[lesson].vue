<script setup lang="ts">
/**
 * Lesson reader — renders the typed content blocks, sources, quiz,
 * completion and prev/next navigation.
 */
import { getLesson, getLessonIndex, getPath, localize, nextLesson, prevLesson } from '~/data/learn'

definePageMeta({
  validate: route => !!getLesson(String(route.params.path), String(route.params.lesson)),
})

const { t, locale } = useI18n()
const route = useRoute()
const haptics = useHaptics()
const progress = useLearnProgress()

const pathId = computed(() => String(route.params.path))
const lessonId = computed(() => String(route.params.lesson))
const path = computed(() => getPath(pathId.value))
const lesson = computed(() => getLesson(pathId.value, lessonId.value))
const index = computed(() => getLessonIndex(pathId.value, lessonId.value))
const total = computed(() => path.value?.lessons.length ?? 0)
const prev = computed(() => prevLesson(pathId.value, lessonId.value))
const next = computed(() => nextLesson(pathId.value, lessonId.value))
const completed = computed(() => progress.isCompleted(pathId.value, lessonId.value))

useSeoMeta({
  title: () => (lesson.value ? localize(lesson.value.title, locale.value) : t('learn.title')),
  description: () => (lesson.value ? localize(lesson.value.summary, locale.value) : ''),
})

const openTerm = ref<string | null>(null)
const titleRef = ref<HTMLElement | null>(null)

const nuxtApp = useNuxtApp()

onMounted(async () => {
  progress.load()
  progress.touch(pathId.value, lessonId.value)
  // Client-side navigation (e.g. prev/next): move focus to the new lesson title.
  // Not on the initial page load, so we do not steal focus from the browser.
  if (!nuxtApp.isHydrating) {
    await nextTick()
    titleRef.value?.focus({ preventScroll: true })
  }
})

// Safety net if the router reuses this component for another lesson:
// reset transient state, remember position, move focus to the title.
watch(lessonId, async () => {
  openTerm.value = null
  progress.touch(pathId.value, lessonId.value)
  await nextTick()
  titleRef.value?.focus({ preventScroll: true })
})

function completeLesson() {
  if (completed.value) return
  haptics.success()
  progress.markCompleted(pathId.value, lessonId.value)
}

function undoComplete() {
  haptics.light()
  progress.unmarkCompleted(pathId.value, lessonId.value)
}

function onQuizFinished(score: number, quizTotal: number) {
  progress.recordQuiz(pathId.value, lessonId.value, score, quizTotal)
  progress.markCompleted(pathId.value, lessonId.value)
}
</script>

<template>
  <article v-if="lesson && path" class="app-container pt-6 pb-10 space-y-6">
    <nav :aria-label="t('learn.breadcrumb')">
      <ol class="flex items-center gap-1.5 text-xs text-themed-muted flex-wrap">
        <li>
          <NuxtLink to="/learn" class="crumb hover:text-themed">{{ t('learn.title') }}</NuxtLink>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <NuxtLink :to="`/learn/${path.id}`" class="crumb hover:text-themed">{{ localize(path.title, locale) }}</NuxtLink>
        </li>
      </ol>
    </nav>

    <header class="space-y-3">
      <div class="flex items-center gap-2 text-[11px] text-themed-faint tabular-nums">
        <span>{{ t('learn.lessonOf', { n: index + 1, total }) }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ t('learn.minutes', { count: lesson.minutes }) }}</span>
        <span
          v-if="completed"
          class="inline-flex items-center gap-1 text-[var(--color-primary-light)] font-medium"
        >
          <AppIcon name="checkCircle" :size="12" />
          {{ t('learn.completed') }}
        </span>
      </div>
      <h1
        ref="titleRef"
        tabindex="-1"
        class="text-2xl font-semibold leading-tight outline-none"
      >
        {{ localize(lesson.title, locale) }}
      </h1>
      <p class="text-sm text-themed-muted leading-relaxed">{{ localize(lesson.summary, locale) }}</p>
      <LearnDraftBadge v-if="lesson.review === 'draft'" />
    </header>

    <!-- Content -->
    <div class="space-y-5">
      <LearnBlock
        v-for="(block, i) in lesson.blocks"
        :key="`${lesson.id}-${i}`"
        :block="block"
        @open-term="openTerm = $event"
      />
    </div>

    <!-- Sources -->
    <section v-if="lesson.sources.length" aria-labelledby="sources-heading" class="space-y-2">
      <h2 id="sources-heading" class="text-sm font-medium text-themed-muted uppercase tracking-wider">
        {{ t('learn.sources') }}
      </h2>
      <ul class="space-y-1 text-xs text-themed-muted leading-relaxed">
        <li v-for="(src, i) in lesson.sources" :key="i" class="flex gap-2">
          <span aria-hidden="true">·</span>
          <span class="min-w-0">{{ src }}</span>
        </li>
      </ul>
    </section>

    <!-- Quiz -->
    <LearnQuiz
      v-if="lesson.quiz?.length"
      :key="`quiz-${pathId}-${lessonId}`"
      :questions="lesson.quiz"
      :best="progress.bestScore(pathId, lessonId)"
      @finished="onQuizFinished"
    />

    <!-- Completion -->
    <div class="flex flex-col items-stretch gap-2">
      <button
        v-if="!completed"
        type="button"
        class="complete-btn"
        @click="completeLesson"
      >
        <AppIcon name="check" :size="18" />
        {{ t('learn.completeLesson') }}
      </button>
      <div v-else class="flex items-center justify-between gap-3 glass-subtle rounded-2xl px-4 py-3">
        <span role="status" class="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary-light)]">
          <AppIcon name="checkCircle" :size="18" />
          {{ t('learn.lessonCompleted') }}
        </span>
        <button type="button" class="text-xs text-themed-muted underline underline-offset-2" @click="undoComplete">
          {{ t('learn.undoComplete') }}
        </button>
      </div>
    </div>

    <!-- Prev / next -->
    <nav class="grid grid-cols-2 gap-3" :aria-label="t('learn.lessonList')">
      <NuxtLink
        v-if="prev"
        :to="`/learn/${path.id}/${prev.id}`"
        class="step-link glass rounded-2xl p-3 flex items-center gap-2"
        @click="haptics.tap()"
      >
        <AppIcon name="arrowLeft" :size="18" class="flex-shrink-0 text-themed-faint" />
        <span class="min-w-0">
          <span class="block text-[10px] uppercase tracking-wider text-themed-faint">{{ t('learn.prevLesson') }}</span>
          <span class="block text-xs font-medium truncate">{{ localize(prev.title, locale) }}</span>
        </span>
      </NuxtLink>
      <span v-else />

      <NuxtLink
        v-if="next"
        :to="`/learn/${path.id}/${next.id}`"
        class="step-link glass rounded-2xl p-3 flex items-center justify-end gap-2 text-right"
        @click="haptics.tap()"
      >
        <span class="min-w-0">
          <span class="block text-[10px] uppercase tracking-wider text-themed-faint">{{ t('learn.nextLesson') }}</span>
          <span class="block text-xs font-medium truncate">{{ localize(next.title, locale) }}</span>
        </span>
        <AppIcon name="arrowRight" :size="18" class="flex-shrink-0 text-[var(--color-primary-light)]" />
      </NuxtLink>
      <NuxtLink
        v-else
        :to="`/learn/${path.id}`"
        class="step-link glass rounded-2xl p-3 flex items-center justify-end gap-2 text-right"
        @click="haptics.tap()"
      >
        <span class="min-w-0">
          <span class="block text-xs font-medium truncate">{{ t('learn.backToPath') }}</span>
        </span>
        <AppIcon name="arrowRight" :size="18" class="flex-shrink-0 text-[var(--color-primary-light)]" />
      </NuxtLink>
    </nav>

    <p v-if="!next && completed" class="text-center text-sm text-themed-secondary">
      {{ t('learn.pathFinished') }}
    </p>

    <LearnTermSheet v-model:term-id="openTerm" show-glossary-link />
  </article>
</template>

<style scoped>
.crumb:focus-visible,
.step-link:focus-visible,
.complete-btn:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}
.complete-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3rem;
  border-radius: 9999px;
  background: var(--color-primary);
  color: #fff;
  font-size: 0.9375rem;
  font-weight: 600;
  transition: transform 0.15s ease;
}
.complete-btn:active { transform: scale(0.98); }
</style>
