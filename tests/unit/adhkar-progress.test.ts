import { describe, expect, it } from 'vitest'
import {
  ADHKAR_DEFAULT_PREFS,
  ADHKAR_MAX_HISTORY_DAYS,
  ADHKAR_STORAGE_KEY,
  addAdhkarCompletion,
  adhkarCount,
  adhkarDateKey,
  adhkarSetProgress,
  adhkarStreak,
  emptyAdhkarStore,
  firstOpenDhikr,
  incrementDhikr,
  nextOpenDhikr,
  parseAdhkarStore,
  rolloverAdhkarStore,
  shiftAdhkarDate,
  suggestAdhkarSet,
} from '~/utils/adhkar'

const items = [
  { id: 'a', repeat: 1 },
  { id: 'b', repeat: 3 },
  { id: 'c', repeat: 100 },
]

describe('dates', () => {
  it('formats local date keys', () => {
    expect(adhkarDateKey(new Date(2026, 0, 5, 23, 59))).toBe('2026-01-05')
  })

  it('shifts across month / year / DST boundaries', () => {
    expect(shiftAdhkarDate('2026-03-01', -1)).toBe('2026-02-28')
    expect(shiftAdhkarDate('2025-12-31', 1)).toBe('2026-01-01')
    expect(shiftAdhkarDate('2026-03-29', -1)).toBe('2026-03-28') // EU DST switch
    expect(shiftAdhkarDate('2026-10-25', 1)).toBe('2026-10-26')
  })
})

describe('counting', () => {
  it('increments up to the repeat count and flags completion once', () => {
    let counts = {}
    const r1 = incrementDhikr(counts, items[1]!)
    expect(r1).toMatchObject({ count: 1, justCompleted: false })
    counts = r1.counts
    counts = incrementDhikr(counts, items[1]!).counts
    const r3 = incrementDhikr(counts, items[1]!)
    expect(r3).toMatchObject({ count: 3, justCompleted: true })
    const r4 = incrementDhikr(r3.counts, items[1]!)
    expect(r4.count).toBe(3)
    expect(r4.justCompleted).toBe(false)
    expect(r4.counts).toBe(r3.counts) // unchanged reference → nothing to save
  })

  it('does not mutate the input', () => {
    const counts = { a: 0 }
    incrementDhikr(counts, items[0]!)
    expect(counts).toEqual({ a: 0 })
  })

  it('clamps stored counts above the repeat count', () => {
    expect(adhkarCount({ a: 5 }, items[0]!)).toBe(1)
  })
})

describe('set progress', () => {
  it('weighs every item equally and reports completion', () => {
    expect(adhkarSetProgress(items, {})).toEqual({
      doneItems: 0, totalItems: 3, doneReps: 0, totalReps: 104, percent: 0, complete: false,
    })
    const half = adhkarSetProgress(items, { a: 1, c: 50 })
    expect(half.doneItems).toBe(1)
    expect(half.percent).toBe(50) // (1 + 0 + 0.5) / 3
    const all = adhkarSetProgress(items, { a: 1, b: 3, c: 100 })
    expect(all.complete).toBe(true)
    expect(all.percent).toBe(100)
  })

  it('handles empty sets', () => {
    expect(adhkarSetProgress([], {})).toMatchObject({ percent: 0, complete: false })
  })

  it('finds the first and next open items (wrapping)', () => {
    expect(firstOpenDhikr(items, {})).toBe(0)
    expect(firstOpenDhikr(items, { a: 1 })).toBe(1)
    expect(nextOpenDhikr(items, { a: 1 }, 0)).toBe(1)
    expect(nextOpenDhikr(items, { b: 3 }, 1)).toBe(2)
    expect(nextOpenDhikr(items, { b: 3, c: 100 }, 2)).toBe(0) // wraps to the skipped first item
    expect(nextOpenDhikr(items, { a: 1, b: 3, c: 100 }, 2)).toBe(-1)
    expect(firstOpenDhikr(items, { a: 1, b: 3, c: 100 })).toBe(-1)
  })
})

describe('streaks', () => {
  const today = '2026-10-12'

  it('counts consecutive days ending today', () => {
    expect(adhkarStreak(['2026-10-10', '2026-10-11', '2026-10-12'], today)).toBe(3)
  })

  it('an unfinished today does not break a streak until yesterday', () => {
    expect(adhkarStreak(['2026-10-10', '2026-10-11'], today)).toBe(2)
  })

  it('a gap resets the streak', () => {
    expect(adhkarStreak(['2026-10-09', '2026-10-10'], today)).toBe(0)
    expect(adhkarStreak(['2026-10-08', '2026-10-10', '2026-10-11', '2026-10-12'], today)).toBe(3)
    expect(adhkarStreak([], today)).toBe(0)
  })

  it('adds completions uniquely, sorted and bounded', () => {
    expect(addAdhkarCompletion(['2026-10-11'], '2026-10-11')).toEqual(['2026-10-11'])
    expect(addAdhkarCompletion(['2026-10-12'], '2026-10-11')).toEqual(['2026-10-11', '2026-10-12'])
    let dates: string[] = []
    let d = '2025-01-01'
    for (let i = 0; i < ADHKAR_MAX_HISTORY_DAYS + 20; i++) {
      dates = addAdhkarCompletion(dates, d)
      d = shiftAdhkarDate(d, 1)
    }
    expect(dates.length).toBe(ADHKAR_MAX_HISTORY_DAYS)
    expect(dates[dates.length - 1]).toBe(shiftAdhkarDate(d, -1))
  })
})

describe('store parsing & daily reset', () => {
  const today = '2026-10-12'

  it('uses a muslimapp- prefixed key (included in backups)', () => {
    expect(ADHKAR_STORAGE_KEY).toBe('muslimapp-adhkar')
  })

  it('returns an empty store for missing or corrupt data', () => {
    expect(parseAdhkarStore(null, today)).toEqual(emptyAdhkarStore(today))
    expect(parseAdhkarStore('{not json', today)).toEqual(emptyAdhkarStore(today))
    expect(parseAdhkarStore('42', today)).toEqual(emptyAdhkarStore(today))
  })

  it('keeps today’s progress', () => {
    const raw = JSON.stringify({ version: 1, date: today, progress: { morning: { a: 2 } }, completed: { morning: [], evening: [] } })
    expect(parseAdhkarStore(raw, today).progress).toEqual({ morning: { a: 2 } })
  })

  it('resets progress on a new day but keeps history and prefs', () => {
    const raw = JSON.stringify({
      version: 1,
      date: '2026-10-11',
      progress: { morning: { a: 2 } },
      completed: { morning: ['2026-10-11'], evening: [] },
      prefs: { showTransliteration: false, showTranslation: true, mode: 'list' },
    })
    const store = parseAdhkarStore(raw, today)
    expect(store.date).toBe(today)
    expect(store.progress).toEqual({})
    expect(store.completed.morning).toEqual(['2026-10-11'])
    expect(store.prefs).toEqual({ showTransliteration: false, showTranslation: true, mode: 'list' })
  })

  it('sanitizes invalid values', () => {
    const raw = JSON.stringify({
      date: today,
      progress: { morning: { a: -1, b: 'x', c: 2.7 } },
      completed: { morning: ['bad', '2026-10-10', '2026-10-10'], evening: 'nope' },
      prefs: { mode: 'grid', showTranslation: 'yes' },
    })
    const store = parseAdhkarStore(raw, today)
    expect(store.progress.morning).toEqual({ c: 2 })
    expect(store.completed).toEqual({ morning: ['2026-10-10'], evening: [] })
    expect(store.prefs).toEqual(ADHKAR_DEFAULT_PREFS)
  })

  it('rollover is a no-op on the same day', () => {
    const s = emptyAdhkarStore(today)
    expect(rolloverAdhkarStore(s, today)).toBe(s)
  })
})

describe('time-of-day suggestion', () => {
  const at = (h: number, m = 0) => new Date(2026, 9, 12, h, m)

  it('uses Fajr/Asr when available', () => {
    const fajr = at(5, 50).getTime()
    const asr = at(15, 40).getTime()
    expect(suggestAdhkarSet(at(5, 30), { fajr, asr })).toBe('evening')
    expect(suggestAdhkarSet(at(6), { fajr, asr })).toBe('morning')
    expect(suggestAdhkarSet(at(15, 30), { fajr, asr })).toBe('morning')
    expect(suggestAdhkarSet(at(15, 41), { fajr, asr })).toBe('evening')
    expect(suggestAdhkarSet(at(23), { fajr, asr })).toBe('evening')
  })

  it('falls back to a clock heuristic', () => {
    expect(suggestAdhkarSet(at(2))).toBe('evening')
    expect(suggestAdhkarSet(at(8))).toBe('morning')
    expect(suggestAdhkarSet(at(14, 59))).toBe('morning')
    expect(suggestAdhkarSet(at(15))).toBe('evening')
    expect(suggestAdhkarSet(at(20), { fajr: null, asr: undefined })).toBe('evening')
  })
})
