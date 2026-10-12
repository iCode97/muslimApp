<script setup lang="ts">
/**
 * Lesson quiz — one question at a time, immediate feedback with explanation,
 * score summary and retry. Emits `finished` once per run.
 */
import { localize, type QuizQuestion } from '~/data/learn'

const props = defineProps<{
  questions: QuizQuestion[]
  /** Previously stored best score (shown in the summary). */
  best?: { best: number, total: number } | null
}>()
const emit = defineEmits<{ finished: [score: number, total: number] }>()

const { t, locale } = useI18n()
const haptics = useHaptics()
const uid = useId()

type Phase = 'intro' | 'question' | 'result'
const phase = ref<Phase>('intro')
const index = ref(0)
const selected = ref<number | null>(null)
const score = ref(0)

const total = computed(() => props.questions.length)
const current = computed(() => props.questions[index.value])
const answered = computed(() => selected.value !== null)
const isCorrect = computed(() => !!current.value && selected.value === current.value.answer)
const isLast = computed(() => index.value >= total.value - 1)

const headingRef = ref<HTMLElement | null>(null)
const optionRefs = ref<HTMLElement[]>([])

async function focusHeading() {
  await nextTick()
  headingRef.value?.focus({ preventScroll: false })
}

function start() {
  haptics.light()
  index.value = 0
  selected.value = null
  score.value = 0
  phase.value = 'question'
  focusHeading()
}

function choose(i: number) {
  if (answered.value || !current.value) return
  selected.value = i
  if (i === current.value.answer) {
    score.value++
    haptics.success()
  }
  else {
    haptics.light()
  }
}

function next() {
  haptics.light()
  if (isLast.value) {
    phase.value = 'result'
    emit('finished', score.value, total.value)
    focusHeading()
    return
  }
  index.value++
  selected.value = null
  focusHeading()
}

function onKeydown(event: KeyboardEvent, i: number) {
  if (answered.value) return
  const count = current.value?.options.length ?? 0
  let target = -1
  if (event.key === 'ArrowDown' || event.key === 'ArrowRight') target = (i + 1) % count
  else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') target = (i - 1 + count) % count
  if (target >= 0) {
    event.preventDefault()
    optionRefs.value[target]?.focus()
  }
}

const resultMessage = computed(() => {
  const ratio = total.value ? score.value / total.value : 0
  if (ratio >= 0.8) return t('learn.quizGreat')
  if (ratio >= 0.5) return t('learn.quizGood')
  return t('learn.quizTryAgain')
})

const correctText = computed(() =>
  current.value ? localize(current.value.options[current.value.answer], locale.value) : '',
)

function optionState(i: number): 'idle' | 'correct' | 'wrong' | 'dim' {
  if (!answered.value || !current.value) return 'idle'
  if (i === current.value.answer) return 'correct'
  if (i === selected.value) return 'wrong'
  return 'dim'
}
</script>

<template>
  <section class="glass rounded-2xl p-4 space-y-4" :aria-labelledby="`${uid}-title`">
    <h2 :id="`${uid}-title`" class="text-lg font-semibold flex items-center gap-2">
      <AppIcon name="target" :size="20" class="text-[var(--color-primary-light)]" />
      {{ t('learn.quizTitle') }}
    </h2>

    <!-- Intro -->
    <div v-if="phase === 'intro'" class="space-y-3">
      <p class="text-sm text-themed-muted">{{ t('learn.quizIntro', { count: total }) }}</p>
      <p v-if="best" class="text-xs text-[var(--color-primary-light)] tabular-nums">
        {{ t('learn.quizBest', { score: best.best, total: best.total }) }}
      </p>
      <button
        type="button"
        class="quiz-btn quiz-btn--primary"
        @click="start"
      >
        {{ t('learn.quizStart') }}
      </button>
    </div>

    <!-- Question -->
    <div v-else-if="phase === 'question' && current" class="space-y-4">
      <div class="flex items-center justify-between text-xs text-themed-muted">
        <span class="tabular-nums">{{ t('learn.quizQuestion', { n: index + 1, total }) }}</span>
        <div class="flex gap-1" aria-hidden="true">
          <span
            v-for="(_, i) in questions"
            :key="i"
            :class="['h-1.5 w-5 rounded-full transition-colors', i <= index ? 'bg-[var(--color-primary-light)]' : 'bg-[var(--glass-border-strong)]']"
          />
        </div>
      </div>

      <h3
        :id="`${uid}-q-${index}`"
        ref="headingRef"
        tabindex="-1"
        class="text-base font-medium leading-snug outline-none"
      >
        {{ localize(current.question, locale) }}
      </h3>

      <div
        role="radiogroup"
        :aria-labelledby="`${uid}-q-${index}`"
        class="space-y-2"
      >
        <button
          v-for="(opt, i) in current.options"
          :key="`${index}-${i}`"
          :ref="(el) => { if (el) optionRefs[i] = el as HTMLElement }"
          type="button"
          role="radio"
          :aria-checked="selected === i"
          :aria-disabled="answered"
          :tabindex="selected === i || (selected === null && i === 0) ? 0 : -1"
          :class="['quiz-option', `quiz-option--${optionState(i)}`]"
          @click="choose(i)"
          @keydown="onKeydown($event, i)"
        >
          <span class="quiz-letter" aria-hidden="true">{{ String.fromCharCode(65 + i) }}</span>
          <span class="flex-1 text-left text-sm leading-snug">{{ localize(opt, locale) }}</span>
          <AppIcon v-if="optionState(i) === 'correct'" name="checkCircle" :size="20" class="flex-shrink-0 text-[var(--color-primary-light)]" />
          <AppIcon v-else-if="optionState(i) === 'wrong'" name="close" :size="20" class="flex-shrink-0 text-[var(--color-danger)]" />
        </button>
      </div>

      <!-- Feedback (announced politely) -->
      <div role="status" aria-live="polite" class="min-h-[1px]">
        <div v-if="answered" :class="['quiz-feedback rounded-xl p-3 space-y-1', isCorrect ? 'quiz-feedback--ok' : 'quiz-feedback--no']">
          <p class="text-sm font-semibold">
            {{ isCorrect ? t('learn.quizCorrect') : t('learn.quizWrong') }}
          </p>
          <p v-if="!isCorrect" class="text-xs text-themed-secondary">
            {{ t('learn.quizCorrectAnswer', { answer: correctText }) }}
          </p>
          <p class="text-sm leading-relaxed text-themed-secondary">
            <LearnRichText :text="localize(current.explanation, locale)" />
          </p>
        </div>
      </div>

      <button v-if="answered" type="button" class="quiz-btn quiz-btn--primary" @click="next">
        {{ isLast ? t('learn.quizFinish') : t('learn.quizNext') }}
      </button>
    </div>

    <!-- Result -->
    <div v-else class="space-y-3 text-center py-2">
      <p
        ref="headingRef"
        tabindex="-1"
        class="text-3xl font-bold text-[var(--color-primary-light)] tabular-nums outline-none"
        role="status"
      >
        {{ t('learn.quizScore', { score, total }) }}
      </p>
      <p class="text-sm text-themed-secondary">{{ resultMessage }}</p>
      <p v-if="best" class="text-xs text-themed-muted tabular-nums">
        {{ t('learn.quizBest', { score: Math.max(best.best, score), total }) }}
      </p>
      <button type="button" class="quiz-btn quiz-btn--ghost" @click="start">
        {{ t('learn.quizRetry') }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.quiz-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: transform 0.15s ease, background-color 0.2s ease;
}
.quiz-btn:active { transform: scale(0.97); }
.quiz-btn:focus-visible,
.quiz-option:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}
.quiz-btn--primary {
  background: var(--color-primary);
  color: #fff;
}
.quiz-btn--ghost {
  background: var(--glass-bg-subtle);
  border: 1px solid var(--glass-border-strong);
  color: var(--color-text);
}

.quiz-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  min-height: 3rem;
  padding: 0.625rem 0.875rem;
  border-radius: 0.875rem;
  background: var(--glass-bg-subtle);
  border: 1px solid var(--glass-border);
  color: var(--color-text);
  transition: background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
}
.quiz-option--idle:hover { border-color: var(--glass-border-strong); }
.quiz-option--correct {
  border-color: var(--color-primary-light);
  background: color-mix(in srgb, var(--color-primary-light) 14%, transparent);
}
.quiz-option--wrong {
  border-color: var(--color-danger);
  background: color-mix(in srgb, var(--color-danger) 12%, transparent);
}
.quiz-option--dim { opacity: 0.55; }
.quiz-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  border: 1px solid var(--glass-border-strong);
}

.quiz-feedback--ok {
  background: color-mix(in srgb, var(--color-primary-light) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-primary-light) 30%, transparent);
}
.quiz-feedback--ok > p:first-child { color: var(--color-primary-light); }
.quiz-feedback--no {
  background: color-mix(in srgb, var(--color-danger) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-danger) 28%, transparent);
}
.quiz-feedback--no > p:first-child { color: var(--color-danger); }

@media (prefers-reduced-motion: reduce) {
  .quiz-btn, .quiz-option { transition: none; }
}
</style>
