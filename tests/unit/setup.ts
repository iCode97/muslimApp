/**
 * Minimal stand-ins for Nuxt auto-imports so composables/components can run under plain Vitest.
 */
import {
  computed, nextTick, onMounted, onUnmounted, reactive, readonly, ref, watch, type Ref,
} from 'vue'

import { useConfirm, useConfirmState } from '~/composables/useConfirm'

const g = globalThis as Record<string, unknown>

const stateStore = new Map<string, Ref<unknown>>()

g.ref = ref
g.reactive = reactive
g.computed = computed
g.watch = watch
g.readonly = readonly
g.nextTick = nextTick
g.onMounted = onMounted
g.onUnmounted = onUnmounted
g.useState = <T>(key: string, init?: () => T): Ref<T> => {
  if (!stateStore.has(key)) stateStore.set(key, ref(init ? init() : undefined) as Ref<unknown>)
  return stateStore.get(key) as Ref<T>
}

// Deterministic id + identity i18n (returns the key, appends params for visibility).
let idCounter = 0
g.useId = () => `test-id-${++idCounter}`
g.useI18n = () => ({
  t: (key: string, params?: Record<string, unknown>) =>
    params ? `${key}${JSON.stringify(params)}` : key,
  locale: ref('de'),
})

// Auto-imported project composables used inside components under test.
g.useConfirmState = useConfirmState
g.useConfirm = useConfirm

// Newer Node versions ship an experimental global `localStorage` that shadows
// happy-dom's and is unusable without a backing file — install a simple in-memory one.
class MemoryStorage implements Storage {
  private data = new Map<string, string>()
  get length() { return this.data.size }
  clear() { this.data.clear() }
  getItem(key: string) { return this.data.has(key) ? this.data.get(key)! : null }
  key(i: number) { return [...this.data.keys()][i] ?? null }
  removeItem(key: string) { this.data.delete(key) }
  setItem(key: string, value: string) { this.data.set(key, String(value)) }
  [name: string]: any
}
Object.defineProperty(globalThis, 'localStorage', { value: new MemoryStorage(), configurable: true, writable: true })

/** Reset all useState() values (call between tests that need fresh state). */
g.__resetNuxtState = () => stateStore.clear()
