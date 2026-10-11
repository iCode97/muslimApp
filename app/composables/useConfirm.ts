/**
 * Promise-based replacement for window.confirm().
 *
 *   const confirm = useConfirm()
 *   if (await confirm({ message: t('common.resetConfirm'), danger: true })) { ... }
 *   // or: const { confirm } = useConfirm()
 *
 * The dialog UI (<ConfirmDialog />) is mounted once by app/plugins/confirm.client.ts.
 * If it is not mounted for any reason, we fall back to the native confirm().
 */

import { reactive } from 'vue'

export interface ConfirmOptions {
  title?: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  /** Style the confirm button as destructive. */
  danger?: boolean
}

interface ConfirmState {
  open: boolean
  /** Set to true by the client plugin once <ConfirmDialog /> is mounted. */
  mounted: boolean
  options: ConfirmOptions
}

// Module-level on purpose: the dialog is a client-only singleton.
const confirmState = reactive<ConfirmState>({
  open: false,
  mounted: false,
  options: { message: '' },
})

let pending: ((ok: boolean) => void) | null = null

function settle(ok: boolean) {
  const resolve = pending
  pending = null
  confirmState.open = false
  resolve?.(ok)
}

function openConfirm(options: ConfirmOptions): Promise<boolean> {
  if (import.meta.server) return Promise.resolve(false)

  if (!confirmState.mounted) {
    return Promise.resolve(window.confirm(options.message))
  }

  // A new request supersedes an open one.
  if (pending) settle(false)

  confirmState.options = { ...options }
  confirmState.open = true
  return new Promise<boolean>((resolve) => {
    pending = resolve
  })
}

/** Internal: used by <ConfirmDialog /> and the mounting plugin. */
export function useConfirmState() {
  return {
    state: confirmState,
    accept: () => settle(true),
    cancel: () => settle(false),
  }
}

export function useConfirm() {
  // Callable AND destructurable: `const confirm = useConfirm()` or `const { confirm } = useConfirm()`.
  return Object.assign(openConfirm, { confirm: openConfirm })
}
