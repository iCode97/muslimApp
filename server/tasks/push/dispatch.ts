/**
 * Nitro task `push:dispatch` — scheduled every minute (nuxt.config.ts
 * `nitro.scheduledTasks`). Sends due prayer & dhikr reminders via Web Push.
 *
 * Manual run (dev): GET /_nitro/tasks/push:dispatch
 */
import { runPushDispatch } from '~~/server/utils/push-dispatch'

export default defineTask({
  meta: {
    name: 'push:dispatch',
    description: 'Send due prayer & dhikr reminders via Web Push',
  },
  async run() {
    const result = await runPushDispatch()
    if (result.planned || result.removed) console.info('[push] dispatch', JSON.stringify(result))
    return { result }
  },
})
