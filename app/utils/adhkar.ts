/**
 * Pure adhkar progress / streak logic (no Vue, no storage access) so it can be
 * unit-tested in isolation. The composable `useAdhkar` wires it to state and
 * localStorage.
 *
 * Storage shape (`muslimapp-adhkar`):
 *   {
 *     version: 1,
 *     date: '2026-10-12',                       // local day the progress belongs to
 *     progress: { morning: { 'morning-al-ikhlas': 2, … }, … },
 *     completed: { morning: ['2026-10-11', …], evening: [...] }, // for streaks
 *     prefs: { showTransliteration, showTranslation, mode }
 *   }
 * Progress is reset when the local date changes; completion history is kept
 * (bounded) so streaks survive the reset.
 */

export const ADHKAR_STORAGE_KEY = 'muslimapp-adhkar'
export const ADHKAR_STREAK_SET_IDS = ['morning', 'evening'] as const
export type AdhkarStreakSetId = typeof ADHKAR_STREAK_SET_IDS[number]
/** Bound the completion history (dates per set). */
export const ADHKAR_MAX_HISTORY_DAYS = 400

export type AdhkarViewMode = 'card' | 'list'

export interface AdhkarPrefs {
  showTransliteration: boolean
  showTranslation: boolean
  mode: AdhkarViewMode
}

export type AdhkarCounts = Record<string, number>

export interface AdhkarStore {
  version: 1
  date: string
  progress: Record<string, AdhkarCounts>
  completed: Record<AdhkarStreakSetId, string[]>
  prefs: AdhkarPrefs
}

export interface CountableDhikr {
  id: string
  repeat: number
}

export interface AdhkarSetProgress {
  doneItems: number
  totalItems: number
  doneReps: number
  totalReps: number
  /** 0–100; every item weighs equally, partial counts contribute proportionally. */
  percent: number
  complete: boolean
}

export const ADHKAR_DEFAULT_PREFS: AdhkarPrefs = {
  showTransliteration: true,
  showTranslation: true,
  mode: 'card',
}

// ---------------------------------------------------------------------------
// Dates (local time — adhkar belong to the user's local day)
// ---------------------------------------------------------------------------

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export function adhkarDateKey(date: Date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Shift a "YYYY-MM-DD" key by whole days (DST-safe: works on calendar dates). */
export function shiftAdhkarDate(key: string, days: number): string {
  const [y, m, d] = key.split('-').map(Number) as [number, number, number]
  const date = new Date(y, m - 1, d, 12) // noon avoids DST edge cases
  date.setDate(date.getDate() + days)
  return adhkarDateKey(date)
}

// ---------------------------------------------------------------------------
// Store parsing / rollover
// ---------------------------------------------------------------------------

export function emptyAdhkarStore(today: string): AdhkarStore {
  return {
    version: 1,
    date: today,
    progress: {},
    completed: { morning: [], evening: [] },
    prefs: { ...ADHKAR_DEFAULT_PREFS },
  }
}

function sanitizeCounts(value: unknown): AdhkarCounts {
  const out: AdhkarCounts = {}
  if (!value || typeof value !== 'object') return out
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    if (typeof v === 'number' && Number.isFinite(v) && v > 0) out[k] = Math.floor(v)
  }
  return out
}

function sanitizeDates(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  const set = new Set(value.filter((d): d is string => typeof d === 'string' && DATE_RE.test(d)))
  return [...set].sort().slice(-ADHKAR_MAX_HISTORY_DAYS)
}

function sanitizePrefs(value: unknown): AdhkarPrefs {
  const v = (value && typeof value === 'object' ? value : {}) as Partial<Record<keyof AdhkarPrefs, unknown>>
  return {
    showTransliteration: typeof v.showTransliteration === 'boolean' ? v.showTransliteration : ADHKAR_DEFAULT_PREFS.showTransliteration,
    showTranslation: typeof v.showTranslation === 'boolean' ? v.showTranslation : ADHKAR_DEFAULT_PREFS.showTranslation,
    mode: v.mode === 'list' || v.mode === 'card' ? v.mode : ADHKAR_DEFAULT_PREFS.mode,
  }
}

/** Drop yesterday's (or older) counts when the local date changed; keep history + prefs. */
export function rolloverAdhkarStore(store: AdhkarStore, today: string): AdhkarStore {
  if (store.date === today) return store
  return { ...store, date: today, progress: {} }
}

/** Parse the raw localStorage value defensively; never throws. */
export function parseAdhkarStore(raw: string | null, today: string): AdhkarStore {
  if (!raw) return emptyAdhkarStore(today)
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  }
  catch {
    return emptyAdhkarStore(today)
  }
  if (!parsed || typeof parsed !== 'object') return emptyAdhkarStore(today)
  const p = parsed as Record<string, unknown>

  const progress: Record<string, AdhkarCounts> = {}
  if (p.progress && typeof p.progress === 'object') {
    for (const [setId, counts] of Object.entries(p.progress as Record<string, unknown>)) {
      progress[setId] = sanitizeCounts(counts)
    }
  }
  const completedRaw = (p.completed && typeof p.completed === 'object' ? p.completed : {}) as Record<string, unknown>

  const store: AdhkarStore = {
    version: 1,
    date: typeof p.date === 'string' && DATE_RE.test(p.date) ? p.date : today,
    progress,
    completed: {
      morning: sanitizeDates(completedRaw.morning),
      evening: sanitizeDates(completedRaw.evening),
    },
    prefs: sanitizePrefs(p.prefs),
  }
  return rolloverAdhkarStore(store, today)
}

// ---------------------------------------------------------------------------
// Counting
// ---------------------------------------------------------------------------

export function adhkarCount(counts: AdhkarCounts, item: CountableDhikr): number {
  return Math.min(counts[item.id] ?? 0, item.repeat)
}

export function isDhikrComplete(counts: AdhkarCounts, item: CountableDhikr): boolean {
  return adhkarCount(counts, item) >= item.repeat
}

/**
 * Count one repetition. Never exceeds `repeat`.
 * Returns the new counts object (input is not mutated).
 */
export function incrementDhikr(counts: AdhkarCounts, item: CountableDhikr): {
  counts: AdhkarCounts
  count: number
  /** True only on the tap that reached the target. */
  justCompleted: boolean
} {
  const current = adhkarCount(counts, item)
  if (current >= item.repeat) return { counts, count: current, justCompleted: false }
  const next = current + 1
  return {
    counts: { ...counts, [item.id]: next },
    count: next,
    justCompleted: next >= item.repeat,
  }
}

export function adhkarSetProgress(items: CountableDhikr[], counts: AdhkarCounts): AdhkarSetProgress {
  let doneItems = 0
  let doneReps = 0
  let totalReps = 0
  let fraction = 0
  for (const item of items) {
    const c = adhkarCount(counts, item)
    doneReps += c
    totalReps += item.repeat
    fraction += item.repeat > 0 ? c / item.repeat : 1
    if (c >= item.repeat) doneItems++
  }
  const totalItems = items.length
  return {
    doneItems,
    totalItems,
    doneReps,
    totalReps,
    percent: totalItems === 0 ? 0 : Math.round((fraction / totalItems) * 100),
    complete: totalItems > 0 && doneItems === totalItems,
  }
}

/** Index of the first item not yet complete, or -1 if all are done. */
export function firstOpenDhikr(items: CountableDhikr[], counts: AdhkarCounts): number {
  return items.findIndex(i => !isDhikrComplete(counts, i))
}

/**
 * Next incomplete item after `from` (wrapping around), or -1 if every item is
 * complete. Used for auto-advance after an item reaches its count.
 */
export function nextOpenDhikr(items: CountableDhikr[], counts: AdhkarCounts, from: number): number {
  const n = items.length
  for (let step = 1; step <= n; step++) {
    const idx = (from + step) % n
    if (!isDhikrComplete(counts, items[idx]!)) return idx
  }
  return -1
}

// ---------------------------------------------------------------------------
// Streaks
// ---------------------------------------------------------------------------

/** Add `day` to a sorted, unique, bounded date list. */
export function addAdhkarCompletion(dates: string[], day: string): string[] {
  if (dates.includes(day)) return dates
  return [...dates, day].sort().slice(-ADHKAR_MAX_HISTORY_DAYS)
}

/**
 * Consecutive completed days. Today only counts once completed; an incomplete
 * today does not break a streak that ran until yesterday.
 */
export function adhkarStreak(dates: string[], today: string): number {
  const set = new Set(dates)
  let cursor = set.has(today) ? today : shiftAdhkarDate(today, -1)
  let count = 0
  while (set.has(cursor)) {
    count++
    cursor = shiftAdhkarDate(cursor, -1)
  }
  return count
}

// ---------------------------------------------------------------------------
// Time-of-day suggestion
// ---------------------------------------------------------------------------

/**
 * Morning adhkar from Fajr until Asr, evening adhkar from Asr until the next
 * Fajr. Uses today's prayer timestamps when known; otherwise a simple local
 * clock heuristic (03:00–15:00 → morning).
 */
export function suggestAdhkarSet(
  now: Date,
  times?: { fajr?: number | null, asr?: number | null },
): AdhkarStreakSetId {
  const t = now.getTime()
  const fajr = times?.fajr
  const asr = times?.asr
  if (typeof fajr === 'number' && typeof asr === 'number' && fajr < asr) {
    return t >= fajr && t < asr ? 'morning' : 'evening'
  }
  const h = now.getHours()
  return h >= 3 && h < 15 ? 'morning' : 'evening'
}
