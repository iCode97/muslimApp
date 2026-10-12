import { describe, expect, it } from 'vitest'
import {
  nextAfterEnd,
  stepVerse,
  type PlaybackConfig,
  type PlaybackPos,
  type PlaybackStep,
} from '~/utils/quran'

const COUNTS: Record<number, number> = { 1: 7, 2: 286, 113: 5, 114: 6 }
const count = (s: number) => COUNTS[s] ?? 10

const base: PlaybackConfig = { repeatCount: 1, range: null, continueNext: true }

function step(pos: PlaybackPos, cfg: Partial<PlaybackConfig> = {}): PlaybackStep {
  return nextAfterEnd(pos, { ...base, ...cfg }, count)
}

function asPos(s: PlaybackStep): PlaybackPos {
  if (s.type !== 'play') throw new Error('unexpected stop')
  return { surah: s.surah, verse: s.verse, repeatsDone: s.repeatsDone }
}

describe('stepVerse', () => {
  it('moves within a surah', () => {
    expect(stepVerse({ surah: 1, verse: 3 }, 1, count)).toEqual({ surah: 1, verse: 4 })
    expect(stepVerse({ surah: 1, verse: 3 }, -1, count)).toEqual({ surah: 1, verse: 2 })
  })

  it('crosses surah borders', () => {
    expect(stepVerse({ surah: 1, verse: 7 }, 1, count)).toEqual({ surah: 2, verse: 1 })
    expect(stepVerse({ surah: 2, verse: 1 }, -1, count)).toEqual({ surah: 1, verse: 7 })
  })

  it('stops at the very beginning and end', () => {
    expect(stepVerse({ surah: 1, verse: 1 }, -1, count)).toBeNull()
    expect(stepVerse({ surah: 114, verse: 6 }, 1, count)).toBeNull()
  })

  it('does not cross when crossSurah is false', () => {
    expect(stepVerse({ surah: 1, verse: 7 }, 1, count, false)).toBeNull()
  })
})

describe('nextAfterEnd — plain playback', () => {
  it('advances to the next verse', () => {
    expect(step({ surah: 1, verse: 1, repeatsDone: 0 })).toEqual({ type: 'play', surah: 1, verse: 2, repeatsDone: 0 })
  })

  it('continues into the next surah when enabled', () => {
    expect(step({ surah: 1, verse: 7, repeatsDone: 0 })).toEqual({ type: 'play', surah: 2, verse: 1, repeatsDone: 0 })
  })

  it('stops after the last verse when continuation is off', () => {
    expect(step({ surah: 1, verse: 7, repeatsDone: 0 }, { continueNext: false })).toEqual({ type: 'stop' })
  })

  it('stops after Surah 114', () => {
    expect(step({ surah: 114, verse: 6, repeatsDone: 0 })).toEqual({ type: 'stop' })
  })
})

describe('nextAfterEnd — verse repeat', () => {
  it('repeats the verse N times before moving on', () => {
    let pos: PlaybackPos = { surah: 1, verse: 2, repeatsDone: 0 }
    const seen: string[] = []
    for (let i = 0; i < 4; i++) {
      pos = asPos(step(pos, { repeatCount: 3 }))
      seen.push(`${pos.verse}/${pos.repeatsDone}`)
    }
    expect(seen).toEqual(['2/1', '2/2', '3/0', '3/1'])
  })

  it('repeats forever with repeatCount 0', () => {
    let pos: PlaybackPos = { surah: 1, verse: 2, repeatsDone: 0 }
    for (let i = 0; i < 50; i++) {
      pos = asPos(step(pos, { repeatCount: 0 }))
      expect(pos.verse).toBe(2)
    }
  })

  it('repeatCount 1 never repeats', () => {
    expect(step({ surah: 1, verse: 2, repeatsDone: 0 }, { repeatCount: 1 })).toMatchObject({ verse: 3 })
  })
})

describe('nextAfterEnd — Hifz range loop', () => {
  const range = { surah: 2, from: 3, to: 5 }

  it('walks through the range and loops back to its start', () => {
    const cfg = { range }
    expect(step({ surah: 2, verse: 3, repeatsDone: 0 }, cfg)).toEqual({ type: 'play', surah: 2, verse: 4, repeatsDone: 0 })
    expect(step({ surah: 2, verse: 4, repeatsDone: 0 }, cfg)).toEqual({ type: 'play', surah: 2, verse: 5, repeatsDone: 0 })
    expect(step({ surah: 2, verse: 5, repeatsDone: 0 }, cfg)).toEqual({ type: 'play', surah: 2, verse: 3, repeatsDone: 0 })
  })

  it('combines verse repeats with the range loop', () => {
    const cfg = { range, repeatCount: 2 }
    expect(step({ surah: 2, verse: 5, repeatsDone: 0 }, cfg)).toEqual({ type: 'play', surah: 2, verse: 5, repeatsDone: 1 })
    expect(step({ surah: 2, verse: 5, repeatsDone: 1 }, cfg)).toEqual({ type: 'play', surah: 2, verse: 3, repeatsDone: 0 })
  })

  it('ignores the range when playing outside of it or in another surah', () => {
    expect(step({ surah: 2, verse: 8, repeatsDone: 0 }, { range })).toMatchObject({ verse: 9 })
    expect(step({ surah: 3, verse: 5, repeatsDone: 0 }, { range })).toMatchObject({ surah: 3, verse: 6 })
  })

  it('a single-verse range loops that verse', () => {
    const cfg = { range: { surah: 1, from: 4, to: 4 } }
    expect(step({ surah: 1, verse: 4, repeatsDone: 0 }, cfg)).toEqual({ type: 'play', surah: 1, verse: 4, repeatsDone: 0 })
  })
})
