import { beforeEach, describe, expect, it } from 'vitest'
import { LEARN_PROGRESS_KEY, parseLearnProgress, useLearnProgress } from '~/composables/useLearnProgress'
import { LEARNING_PATHS } from '~/data/learn'

const path = LEARNING_PATHS[0]!
const [first, second] = path.lessons

function fresh() {
  ;(globalThis as unknown as { __resetNuxtState: () => void }).__resetNuxtState()
  localStorage.clear()
  return useLearnProgress()
}

describe('useLearnProgress', () => {
  beforeEach(() => {
    fresh()
  })

  it('starts empty', () => {
    const p = useLearnProgress()
    expect(p.summary.value.done).toBe(0)
    expect(p.summary.value.started).toBe(false)
    expect(p.resume.value).toBeNull()
    expect(p.isCompleted(path.id, first!.id)).toBe(false)
  })

  it('marks lessons completed and persists them under muslimapp-learn-progress', () => {
    const p = useLearnProgress()
    p.markCompleted(path.id, first!.id)
    p.markCompleted(path.id, first!.id) // idempotent
    expect(p.isCompleted(path.id, first!.id)).toBe(true)
    expect(p.pathSummary(path.id).done).toBe(1)
    const stored = JSON.parse(localStorage.getItem(LEARN_PROGRESS_KEY)!)
    expect(stored.paths[path.id].completed).toEqual([first!.id])
    expect(LEARN_PROGRESS_KEY.startsWith('muslimapp-')).toBe(true) // picked up by useBackup
  })

  it('reloads persisted state', () => {
    const p = useLearnProgress()
    p.markCompleted(path.id, first!.id)
    p.recordQuiz(path.id, first!.id, 1, 2)
    ;(globalThis as unknown as { __resetNuxtState: () => void }).__resetNuxtState()
    const again = useLearnProgress()
    expect(again.isCompleted(path.id, first!.id)).toBe(false) // SSR-safe: empty until load()
    again.load()
    expect(again.isCompleted(path.id, first!.id)).toBe(true)
    expect(again.bestScore(path.id, first!.id)).toEqual({ best: 1, total: 2 })
  })

  it('keeps the best quiz score only', () => {
    const p = useLearnProgress()
    p.recordQuiz(path.id, first!.id, 2, 3)
    p.recordQuiz(path.id, first!.id, 1, 3)
    expect(p.bestScore(path.id, first!.id)).toEqual({ best: 2, total: 3 })
    p.recordQuiz(path.id, first!.id, 3, 3)
    expect(p.bestScore(path.id, first!.id)).toEqual({ best: 3, total: 3 })
  })

  it('unmarks completion', () => {
    const p = useLearnProgress()
    p.markCompleted(path.id, first!.id)
    p.unmarkCompleted(path.id, first!.id)
    expect(p.isCompleted(path.id, first!.id)).toBe(false)
  })

  it('finds the first incomplete lesson and computes percent', () => {
    const p = useLearnProgress()
    expect(p.firstIncomplete(path.id)?.id).toBe(first!.id)
    p.markCompleted(path.id, first!.id)
    expect(p.firstIncomplete(path.id)?.id).toBe(second?.id)
    expect(p.pathSummary(path.id).percent).toBe(Math.round((1 / path.lessons.length) * 100))
    for (const l of path.lessons) p.markCompleted(path.id, l.id)
    expect(p.firstIncomplete(path.id)).toBeUndefined()
    expect(p.pathSummary(path.id).percent).toBe(100)
  })

  it('resumes at the last touched lesson, or the next open one when it is done', () => {
    const p = useLearnProgress()
    p.touch(path.id, first!.id)
    expect(p.resume.value).toEqual({ pathId: path.id, lessonId: first!.id })
    p.markCompleted(path.id, first!.id)
    expect(p.resume.value).toEqual(second ? { pathId: path.id, lessonId: second.id } : null)
  })

  it('ignores unknown lesson ids in summaries and resume', () => {
    const p = useLearnProgress()
    p.markCompleted(path.id, 'does-not-exist')
    expect(p.pathSummary(path.id).done).toBe(0)
    p.touch(path.id, 'does-not-exist')
    expect(p.resume.value).toBeNull()
  })

  it('resetAll clears state and storage', () => {
    const p = useLearnProgress()
    p.markCompleted(path.id, first!.id)
    p.resetAll()
    expect(p.summary.value.done).toBe(0)
    expect(localStorage.getItem(LEARN_PROGRESS_KEY)).toBeNull()
  })
})

describe('parseLearnProgress', () => {
  it('survives corrupt or foreign data', () => {
    expect(parseLearnProgress(null).paths).toEqual({})
    expect(parseLearnProgress('not json').paths).toEqual({})
    expect(parseLearnProgress('42').paths).toEqual({})
    const s = parseLearnProgress(JSON.stringify({ paths: { a: { completed: ['x', 5], quiz: { x: { best: 1, total: 2 }, y: 'bad' } }, b: null }, last: { pathId: 1 } }))
    expect(s.paths.a).toEqual({ completed: ['x'], quiz: { x: { best: 1, total: 2 } } })
    expect(s.paths.b).toBeUndefined()
    expect(s.last).toBeNull()
  })
})
