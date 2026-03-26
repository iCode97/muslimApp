/**
 * Dashboard configuration composable.
 * Allows users to configure which widgets appear and their order.
 */

export interface DashboardWidget {
  id: string
  i18nKey: string
  icon: string
  enabled: boolean
  order: number
}

const STORAGE_KEY = 'muslimapp-dashboard'

const DEFAULT_WIDGETS: DashboardWidget[] = [
  { id: 'prayer-countdown', i18nKey: 'widgets.prayerCountdown', icon: '⏳', enabled: true, order: 0 },
  { id: 'prayer-times', i18nKey: 'widgets.prayerTimes', icon: '🕌', enabled: true, order: 1 },
  { id: 'holiday-countdown', i18nKey: 'widgets.holidayCountdown', icon: '🎉', enabled: true, order: 2 },
  { id: 'reading-progress', i18nKey: 'widgets.readingProgress', icon: '📖', enabled: true, order: 3 },
  { id: 'random-verse', i18nKey: 'widgets.randomVerse', icon: '✨', enabled: false, order: 4 },
  { id: 'tasbih-quick', i18nKey: 'widgets.tasbihQuick', icon: '📿', enabled: false, order: 5 },
  { id: 'hijri-date', i18nKey: 'widgets.hijriDate', icon: '☪', enabled: false, order: 6 },
  { id: 'hadith-of-day', i18nKey: 'widgets.hadithOfDay', icon: '📜', enabled: false, order: 7 },
]

export function useDashboard() {
  const widgets = useState<DashboardWidget[]>('dashboard-widgets', () => [...DEFAULT_WIDGETS])
  const isEditing = useState<boolean>('dashboard-editing', () => false)

  function loadConfig() {
    if (import.meta.server) return
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as DashboardWidget[]
        // Merge with defaults to pick up new widgets
        const merged = DEFAULT_WIDGETS.map(def => {
          const saved = parsed.find(w => w.id === def.id)
          return saved ? { ...def, enabled: saved.enabled, order: saved.order } : def
        })
        widgets.value = merged.sort((a, b) => a.order - b.order)
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }

  function saveConfig() {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets.value))
    }
  }

  function toggleWidget(id: string) {
    const widget = widgets.value.find(w => w.id === id)
    if (widget) {
      widget.enabled = !widget.enabled
      saveConfig()
    }
  }

  function moveWidget(id: string, direction: 'up' | 'down') {
    const idx = widgets.value.findIndex(w => w.id === id)
    if (idx < 0) return

    const swap = direction === 'up' ? idx - 1 : idx + 1
    if (swap < 0 || swap >= widgets.value.length) return

    const widgetA = widgets.value[idx]
    const widgetB = widgets.value[swap]
    if (!widgetA || !widgetB) return

    // Swap order values
    const temp = widgetA.order
    widgetA.order = widgetB.order
    widgetB.order = temp

    // Re-sort
    widgets.value = [...widgets.value].sort((a, b) => a.order - b.order)
    saveConfig()
  }

  function resetToDefaults() {
    widgets.value = [...DEFAULT_WIDGETS]
    saveConfig()
  }

  const enabledWidgets = computed(() =>
    widgets.value.filter(w => w.enabled).sort((a, b) => a.order - b.order)
  )

  return {
    widgets,
    enabledWidgets,
    isEditing,
    loadConfig,
    toggleWidget,
    moveWidget,
    resetToDefaults,
  }
}
