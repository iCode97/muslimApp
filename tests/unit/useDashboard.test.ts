import { beforeEach, describe, expect, it } from 'vitest'
import { useDashboard } from '~/composables/useDashboard'

const resetState = () => (globalThis as any).__resetNuxtState()
const plain = (v: unknown) => JSON.parse(JSON.stringify(v))

describe('useDashboard', () => {
  beforeEach(() => {
    resetState()
    localStorage.clear()
  })

  it('starts with the default widgets', () => {
    const { widgets, enabledWidgets } = useDashboard()
    expect(widgets.value.length).toBe(12)
    expect(enabledWidgets.value.every(w => w.enabled)).toBe(true)
    const orders = enabledWidgets.value.map(w => w.order)
    expect(orders).toEqual([...orders].sort((a, b) => a - b))
  })

  it('toggleWidget flips enabled and persists', () => {
    const { widgets, toggleWidget } = useDashboard()
    const before = widgets.value.find(w => w.id === 'random-verse')!.enabled
    toggleWidget('random-verse')
    expect(widgets.value.find(w => w.id === 'random-verse')!.enabled).toBe(!before)
    const stored = JSON.parse(localStorage.getItem('muslimapp-dashboard')!)
    expect(stored.find((w: any) => w.id === 'random-verse').enabled).toBe(!before)
  })

  it('moveWidget swaps neighbours', () => {
    const { widgets, moveWidget } = useDashboard()
    const [first, second] = widgets.value.map(w => w.id)
    moveWidget(first!, 'down')
    expect(widgets.value[0]!.id).toBe(second)
    expect(widgets.value[1]!.id).toBe(first)
  })

  it('moveWidget at the edges is a no-op', () => {
    const { widgets, moveWidget } = useDashboard()
    const ids = widgets.value.map(w => w.id)
    moveWidget(ids[0]!, 'up')
    moveWidget(ids[ids.length - 1]!, 'down')
    expect(widgets.value.map(w => w.id)).toEqual(ids)
  })

  it('resetToDefaults restores the original state after toggle + move', () => {
    const { widgets, toggleWidget, moveWidget, resetToDefaults } = useDashboard()
    const snapshot = plain(widgets.value)

    toggleWidget('prayer-countdown')
    toggleWidget('random-verse')
    moveWidget('prayer-times', 'down')
    expect(plain(widgets.value)).not.toEqual(snapshot)

    resetToDefaults()
    expect(plain(widgets.value)).toEqual(snapshot)
  })

  it('mutations never leak back into the shared defaults (deep clone)', () => {
    const first = useDashboard()
    first.resetToDefaults()
    first.toggleWidget('prayer-countdown')
    first.moveWidget('prayer-times', 'up')

    resetState() // simulate a fresh app/request
    const second = useDashboard()
    expect(second.widgets.value.find(w => w.id === 'prayer-countdown')!.enabled).toBe(true)
    expect(second.widgets.value[0]!.id).toBe('prayer-countdown')
  })

  it('reset works repeatedly', () => {
    const { widgets, toggleWidget, resetToDefaults } = useDashboard()
    for (let i = 0; i < 3; i++) {
      toggleWidget('prayer-times')
      resetToDefaults()
      expect(widgets.value.find(w => w.id === 'prayer-times')!.enabled).toBe(true)
    }
  })

  it('reorderById renumbers order sequentially', () => {
    const { widgets, reorderById } = useDashboard()
    const last = widgets.value[widgets.value.length - 1]!.id
    reorderById(last, widgets.value[0]!.id)
    expect(widgets.value[0]!.id).toBe(last)
    expect(widgets.value.map(w => w.order)).toEqual(widgets.value.map((_, i) => i))
  })

  it('loadConfig merges saved state and keeps new default widgets', () => {
    localStorage.setItem('muslimapp-dashboard', JSON.stringify([
      { id: 'prayer-times', enabled: false, order: 0 },
      { id: 'prayer-countdown', enabled: true, order: 1 },
    ]))
    const { widgets, loadConfig } = useDashboard()
    loadConfig()
    expect(widgets.value.length).toBe(12)
    expect(widgets.value.find(w => w.id === 'prayer-times')!.enabled).toBe(false)
  })

  it('loadConfig survives corrupt storage', () => {
    localStorage.setItem('muslimapp-dashboard', '{not json')
    const { widgets, loadConfig } = useDashboard()
    expect(() => loadConfig()).not.toThrow()
    expect(widgets.value.length).toBe(12)
    expect(localStorage.getItem('muslimapp-dashboard')).toBeNull()
  })
})
