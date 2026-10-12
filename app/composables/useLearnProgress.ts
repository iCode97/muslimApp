/**
 * Learning center progress — completed lessons and best quiz scores per path.
 * Persisted in localStorage (`muslimapp-learn-progress`), so useBackup picks it up
 * automatically. State is useState-backed and starts empty; call `load()` on the
 * client (onMounted) to keep SSR and hydration consistent.
 */
import { LEARNING_PATHS, getPath, type Lesson } from '~/data/learn'

export const LEARN_PROGRESS_KEY = 'muslimapp-learn-progress'

export interface QuizScore {
  best: number
  total: number
}

export interface PathProgress {
  completed: string[]
  quiz: Record<string, QuizScore>
}

export interface LearnProgressState {
  version: 1
  paths: Record<string, PathProgress>
  last: { pathId: string, lessonId: string } | null
}

export interface PathSummary {
  done: number
  total: number
  percent: number
}

function emptyState(): LearnProgressState {
  return { version: 1, paths: {}, last: null }
}

/** Defensive parse: drops anything that is not the expected shape. */
export function parseLearnProgress(raw: string | null): LearnProgressState {
  const state = emptyState()
  if (!raw) return state
  try {
    const data = JSON.parse(raw) as Partial<LearnProgressState> | null
    if (!data || typeof data !== 'object') return state
    for (const [pathId, p] of Object.entries(data.paths ?? {})) {
      if (!p || typeof p !== 'object') continue
      const completed = Array.isArray(p.completed) ? p.completed.filter(x => typeof x === 'string') : []
      const quiz: Record<string, QuizScore> = {}
      for (const [lessonId, q] of Object.entries(p.quiz ?? {})) {
        if (q && typeof q.best === 'number' && typeof q.total === 'number') {
          quiz[lessonId] = { best: q.best, total: q.total }
        }
      }
      state.paths[pathId] = { completed, quiz }
    }
    if (data.last && typeof data.last.pathId === 'string' && typeof data.last.lessonId === 'string') {
      state.last = { pathId: data.last.pathId, lessonId: data.last.lessonId }
    }
  }
  catch { /* corrupt → start fresh */ }
  return state
}

export function useLearnProgress() {
  const state = useState<LearnProgressState>('learn-progress', () => emptyState())
  const loaded = useState<boolean>('learn-progress-loaded', () => false)

  function load() {
    if (import.meta.server) return
    try {
      state.value = parseLearnProgress(localStorage.getItem(LEARN_PROGRESS_KEY))
    }
    catch { /* storage unavailable */ }
    loaded.value = true
  }

  function save() {
    if (import.meta.server) return
    try {
      localStorage.setItem(LEARN_PROGRESS_KEY, JSON.stringify(state.value))
    }
    catch { /* storage unavailable / quota */ }
  }

  function ensurePath(pathId: string): PathProgress {
    const existing = state.value.paths[pathId]
    if (existing) return existing
    const fresh: PathProgress = { completed: [], quiz: {} }
    state.value = { ...state.value, paths: { ...state.value.paths, [pathId]: fresh } }
    return state.value.paths[pathId]!
  }

  function isCompleted(pathId: string, lessonId: string): boolean {
    return state.value.paths[pathId]?.completed.includes(lessonId) ?? false
  }

  function markCompleted(pathId: string, lessonId: string) {
    const p = ensurePath(pathId)
    if (!p.completed.includes(lessonId)) {
      state.value = {
        ...state.value,
        paths: { ...state.value.paths, [pathId]: { ...p, completed: [...p.completed, lessonId] } },
      }
    }
    save()
  }

  function unmarkCompleted(pathId: string, lessonId: string) {
    const p = state.value.paths[pathId]
    if (!p) return
    state.value = {
      ...state.value,
      paths: { ...state.value.paths, [pathId]: { ...p, completed: p.completed.filter(id => id !== lessonId) } },
    }
    save()
  }

  /** Remember where the learner is (for "Weiterlernen"). */
  function touch(pathId: string, lessonId: string) {
    const last = state.value.last
    if (last && last.pathId === pathId && last.lessonId === lessonId) return
    state.value = { ...state.value, last: { pathId, lessonId } }
    save()
  }

  /** Stores the quiz result if it beats the previous best. */
  function recordQuiz(pathId: string, lessonId: string, score: number, total: number) {
    const p = ensurePath(pathId)
    const prev = p.quiz[lessonId]
    if (!prev || score > prev.best || total !== prev.total) {
      const best = prev && total === prev.total ? Math.max(prev.best, score) : score
      state.value = {
        ...state.value,
        paths: {
          ...state.value.paths,
          [pathId]: { ...p, quiz: { ...p.quiz, [lessonId]: { best, total } } },
        },
      }
    }
    save()
  }

  function bestScore(pathId: string, lessonId: string): QuizScore | null {
    return state.value.paths[pathId]?.quiz[lessonId] ?? null
  }

  function pathSummary(pathId: string): PathSummary {
    const path = getPath(pathId)
    const total = path?.lessons.length ?? 0
    const ids = new Set(path?.lessons.map(l => l.id) ?? [])
    const done = (state.value.paths[pathId]?.completed ?? []).filter(id => ids.has(id)).length
    return { done, total, percent: total > 0 ? Math.round((done / total) * 100) : 0 }
  }

  /** First lesson of the path that is not completed yet (undefined when all done). */
  function firstIncomplete(pathId: string): Lesson | undefined {
    return getPath(pathId)?.lessons.find(l => !isCompleted(pathId, l.id))
  }

  /** Where "Weiterlernen" should lead, or null when nothing was started. */
  const resume = computed<{ pathId: string, lessonId: string } | null>(() => {
    const last = state.value.last
    if (!last) return null
    const path = getPath(last.pathId)
    if (!path || !path.lessons.some(l => l.id === last.lessonId)) return null
    // If the last lesson is done, point to the next open one in that path.
    if (isCompleted(last.pathId, last.lessonId)) {
      const open = firstIncomplete(last.pathId)
      return open ? { pathId: last.pathId, lessonId: open.id } : null
    }
    return last
  })

  /** Aggregated numbers for dashboards. */
  const summary = computed(() => {
    const paths = LEARNING_PATHS.map(p => ({ id: p.id, ...pathSummary(p.id) }))
    const done = paths.reduce((s, p) => s + p.done, 0)
    const total = paths.reduce((s, p) => s + p.total, 0)
    return {
      done,
      total,
      percent: total > 0 ? Math.round((done / total) * 100) : 0,
      started: done > 0 || state.value.last !== null,
      paths,
    }
  })

  function resetAll() {
    state.value = emptyState()
    if (import.meta.client) {
      try { localStorage.removeItem(LEARN_PROGRESS_KEY) }
      catch { /* ignore */ }
    }
  }

  return {
    state: readonly(state),
    loaded: readonly(loaded),
    summary,
    resume,
    load,
    isCompleted,
    markCompleted,
    unmarkCompleted,
    touch,
    recordQuiz,
    bestScore,
    pathSummary,
    firstIncomplete,
    resetAll,
  }
}
