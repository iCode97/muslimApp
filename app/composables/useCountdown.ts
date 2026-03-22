/**
 * Composable for countdown timers.
 * Used for next prayer countdown and holiday countdowns.
 */

interface CountdownResult {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalSeconds: number
  display: string       // "02:34:15" or "3d 05:12:30"
  shortDisplay: string  // "2h 34m" or "3d 5h"
  isExpired: boolean
}

export function useCountdown(targetTimestamp: Ref<number | null>) {
  const countdown = ref<CountdownResult>(getEmpty())
  let intervalId: ReturnType<typeof setInterval> | null = null

  function getEmpty(): CountdownResult {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      display: '--:--:--',
      shortDisplay: '--',
      isExpired: true,
    }
  }

  function calculate(): CountdownResult {
    if (!targetTimestamp.value) return getEmpty()

    const now = Date.now()
    const diff = targetTimestamp.value - now

    if (diff <= 0) {
      return getEmpty()
    }

    const totalSeconds = Math.floor(diff / 1000)
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const pad = (n: number) => String(n).padStart(2, '0')

    let display: string
    if (days > 0) {
      display = `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    }
    else {
      display = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    }

    let shortDisplay: string
    if (days > 0) {
      shortDisplay = `${days}d ${hours}h`
    }
    else if (hours > 0) {
      shortDisplay = `${hours}h ${minutes}m`
    }
    else {
      shortDisplay = `${minutes}m ${seconds}s`
    }

    return {
      days,
      hours,
      minutes,
      seconds,
      totalSeconds,
      display,
      shortDisplay,
      isExpired: false,
    }
  }

  function start() {
    stop()
    countdown.value = calculate()
    intervalId = setInterval(() => {
      countdown.value = calculate()
    }, 1000)
  }

  function stop() {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  // Auto-start when target changes
  watch(targetTimestamp, (val) => {
    if (val) start()
    else {
      stop()
      countdown.value = getEmpty()
    }
  }, { immediate: true })

  // Cleanup on unmount
  onUnmounted(stop)

  return {
    countdown: readonly(countdown),
  }
}
