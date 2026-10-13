import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ToggleSwitch from '~/components/ui/ToggleSwitch.vue'
import HonorificText from '~/components/ui/HonorificText.vue'
import ConfirmDialog from '~/components/ui/ConfirmDialog.vue'
import { useConfirm, useConfirmState } from '~/composables/useConfirm'

describe('ToggleSwitch', () => {
  it('is an accessible switch reflecting its value', () => {
    const w = mount(ToggleSwitch, { props: { modelValue: false, ariaLabel: 'Haptik' } })
    const btn = w.get('button')
    expect(btn.attributes('role')).toBe('switch')
    expect(btn.attributes('aria-checked')).toBe('false')
    expect(btn.attributes('aria-label')).toBe('Haptik')
    expect(btn.classes()).toContain('glass-subtle')
  })

  it('shows the on-state styling and aria-checked=true', () => {
    const w = mount(ToggleSwitch, { props: { modelValue: true, ariaLabelledby: 'lbl' } })
    expect(w.get('button').attributes('aria-checked')).toBe('true')
    expect(w.get('button').attributes('aria-labelledby')).toBe('lbl')
    expect(w.get('button').classes()).toContain('bg-[var(--color-primary)]')
  })

  it('emits update:modelValue with the toggled value (v-model)', async () => {
    const w = mount(ToggleSwitch, { props: { modelValue: false } })
    await w.get('button').trigger('click')
    expect(w.emitted('update:modelValue')).toEqual([[true]])
    await w.setProps({ modelValue: true })
    await w.get('button').trigger('click')
    expect(w.emitted('update:modelValue')?.[1]).toEqual([false])
  })

  it('does not emit when disabled and supports the sm size', async () => {
    const w = mount(ToggleSwitch, { props: { modelValue: false, disabled: true, size: 'sm' } })
    expect(w.get('button').classes()).toContain('w-10')
    await w.get('button').trigger('click')
    expect(w.emitted('update:modelValue')).toBeUndefined()
  })
})

describe('HonorificText', () => {
  it('wraps the ﷺ ligature in a .font-honorific span and keeps the rest as text', () => {
    const w = mount(HonorificText, { props: { text: 'Aussprüche des Propheten ﷺ heute' } })
    const spans = w.findAll('.font-honorific')
    expect(spans).toHaveLength(1)
    expect(spans[0]!.text()).toBe('ﷺ')
    expect(w.text()).toBe('Aussprüche des Propheten ﷺ heute')
  })

  it('renders plain text untouched and never injects HTML', () => {
    const w = mount(HonorificText, { props: { text: '<b>x</b>' } })
    expect(w.find('b').exists()).toBe(false)
    expect(w.text()).toBe('<b>x</b>')
    expect(w.find('.font-honorific').exists()).toBe(false)
  })
})

describe('useConfirm', () => {
  afterEach(() => {
    const { state, cancel } = useConfirmState()
    cancel()
    state.mounted = false
  })

  it('falls back to window.confirm when no dialog is mounted', async () => {
    const spy = vi.spyOn(window, 'confirm').mockReturnValue(true)
    const confirm = useConfirm()
    await expect(confirm({ message: 'sure?' })).resolves.toBe(true)
    expect(spy).toHaveBeenCalledWith('sure?')
    spy.mockRestore()
  })

  it('resolves true on accept and false on cancel; works destructured too', async () => {
    const { state, accept, cancel } = useConfirmState()
    state.mounted = true
    const { confirm } = useConfirm()

    const p1 = confirm({ message: 'a', danger: true })
    expect(state.open).toBe(true)
    expect(state.options).toMatchObject({ message: 'a', danger: true })
    accept()
    await expect(p1).resolves.toBe(true)
    expect(state.open).toBe(false)

    const p2 = useConfirm()({ message: 'b' })
    cancel()
    await expect(p2).resolves.toBe(false)
  })

  it('a new request supersedes (cancels) an open one', async () => {
    const { state, accept } = useConfirmState()
    state.mounted = true
    const confirm = useConfirm()
    const first = confirm({ message: 'first' })
    const second = confirm({ message: 'second' })
    await expect(first).resolves.toBe(false)
    expect(state.options.message).toBe('second')
    accept()
    await expect(second).resolves.toBe(true)
  })
})

describe('ConfirmDialog', () => {
  it('renders an accessible alertdialog bound to the confirm state and closes on Escape', async () => {
    const { state } = useConfirmState()
    state.mounted = true
    const w = mount(ConfirmDialog, { attachTo: document.body, global: { stubs: { Teleport: true } } })

    const pending = useConfirm()({ title: 'Löschen?', message: 'Wirklich löschen?', confirmLabel: 'Ja', danger: true })
    await w.vm.$nextTick()

    const dialog = w.get('[role="alertdialog"]')
    expect(dialog.attributes('aria-modal')).toBe('true')
    const labelledby = dialog.attributes('aria-labelledby')!
    const describedby = dialog.attributes('aria-describedby')!
    expect(w.get(`#${labelledby}`).text()).toBe('Löschen?')
    expect(w.get(`#${describedby}`).text()).toBe('Wirklich löschen?')
    expect(w.findAll('button').map(b => b.text())).toEqual(['common.cancel', 'Ja'])

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await expect(pending).resolves.toBe(false)
    await w.vm.$nextTick()
    expect(w.find('[role="alertdialog"]').exists()).toBe(false)

    w.unmount()
    state.mounted = false
  })
})
