import { h, render } from 'vue'
import ConfirmDialog from '~/components/ui/ConfirmDialog.vue'

/**
 * Mounts <ConfirmDialog /> once, app-wide, so `useConfirm()` works from anywhere
 * without editing app.vue / layouts. The vnode reuses the main app context so
 * i18n, router and Nuxt composables are available inside the dialog.
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    const container = document.createElement('div')
    container.setAttribute('data-confirm-root', '')
    document.body.appendChild(container)

    const vnode = h(ConfirmDialog)
    vnode.appContext = nuxtApp.vueApp._context
    render(vnode, container)

    useConfirmState().state.mounted = true
  })
})
