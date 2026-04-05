/**
 * Navigation composable.
 * - Desktop: shows all nav items in the sidebar
 * - Mobile: user can customize which items appear in the bottom nav (max 5)
 *   "Start" (dashboard) is always pinned at position 1
 */

export interface NavItem {
  id: string
  path: string
  icon: string
  label: string
  /** Items grouped under /more routes for active detection */
  childRoutes?: string[]
}

/** All available navigation items */
export const ALL_NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', path: '/', icon: '🏠', label: 'nav.dashboard' },
  { id: 'prayer', path: '/prayer', icon: '🕌', label: 'nav.prayer' },
  { id: 'quran', path: '/quran', icon: '📖', label: 'nav.quran' },
  { id: 'calendar', path: '/calendar', icon: '📅', label: 'nav.calendar' },
  { id: 'tasbih', path: '/tasbih', icon: '📿', label: 'nav.tasbih' },
  { id: 'qibla', path: '/qibla', icon: '🧭', label: 'nav.qibla' },
  { id: 'dua', path: '/dua', icon: '🤲', label: 'nav.dua' },
  { id: 'hadith', path: '/hadith', icon: '📜', label: 'nav.hadith' },
  { id: 'names', path: '/names', icon: '✨', label: 'nav.names' },
  { id: 'guide', path: '/guide', icon: '📘', label: 'nav.guide' },
  { id: 'seerah', path: '/seerah', icon: '📕', label: 'nav.seerah' },
  { id: 'ramadan', path: '/ramadan', icon: '🌙', label: 'nav.ramadan' },
  { id: 'settings', path: '/settings', icon: '⚙️', label: 'nav.settings' },
  { id: 'about', path: '/about', icon: '📋', label: 'nav.about' },
]

/** Desktop sidebar groups */
export const DESKTOP_PRIMARY_ITEMS = ALL_NAV_ITEMS.filter(i =>
  ['dashboard', 'prayer', 'quran', 'calendar'].includes(i.id)
)

export const DESKTOP_TOOLS_ITEMS = ALL_NAV_ITEMS.filter(i =>
  ['tasbih', 'qibla', 'dua', 'hadith', 'names', 'guide', 'seerah', 'ramadan'].includes(i.id)
)

export const DESKTOP_FOOTER_ITEMS = ALL_NAV_ITEMS.filter(i =>
  ['settings', 'about'].includes(i.id)
)

/** Mobile: items the user can choose from (excludes dashboard which is pinned) */
const MOBILE_CHOOSABLE_IDS = [
  'prayer', 'quran', 'calendar', 'tasbih', 'qibla',
  'dua', 'hadith', 'names', 'guide', 'seerah', 'ramadan', 'settings',
]

/** Default mobile nav bar (dashboard + 4 others) */
const DEFAULT_MOBILE_NAV_IDS = ['prayer', 'quran', 'calendar', 'settings']

const MOBILE_NAV_STORAGE_KEY = 'muslimapp-mobile-nav'
const MOBILE_MAX_ITEMS = 4 // plus dashboard = 5 total

export function useNavigation() {
  const route = useRoute()

  /** IDs of items selected for mobile nav (excluding dashboard) */
  const mobileNavIds = useState<string[]>('mobile-nav-ids', () => [...DEFAULT_MOBILE_NAV_IDS])
  const isEditingMobileNav = useState<boolean>('mobile-nav-editing', () => false)

  function loadMobileNav() {
    if (import.meta.server) return
    const saved = localStorage.getItem(MOBILE_NAV_STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as string[]
        // Validate: only keep known choosable IDs, cap at max
        const valid = parsed.filter(id => MOBILE_CHOOSABLE_IDS.includes(id))
        if (valid.length > 0) {
          mobileNavIds.value = valid.slice(0, MOBILE_MAX_ITEMS)
        }
      } catch {
        localStorage.removeItem(MOBILE_NAV_STORAGE_KEY)
      }
    }
  }

  function saveMobileNav() {
    if (import.meta.client) {
      localStorage.setItem(MOBILE_NAV_STORAGE_KEY, JSON.stringify(mobileNavIds.value))
    }
  }

  /** Toggle an item in/out of the mobile nav */
  function toggleMobileNavItem(id: string) {
    if (!MOBILE_CHOOSABLE_IDS.includes(id)) return
    const idx = mobileNavIds.value.indexOf(id)
    if (idx >= 0) {
      // Remove — but don't allow empty
      if (mobileNavIds.value.length > 1) {
        mobileNavIds.value = mobileNavIds.value.filter(i => i !== id)
      }
    } else if (mobileNavIds.value.length < MOBILE_MAX_ITEMS) {
      mobileNavIds.value = [...mobileNavIds.value, id]
    }
    saveMobileNav()
  }

  /** Move a mobile nav item up or down */
  function moveMobileNavItem(id: string, direction: 'up' | 'down') {
    const idx = mobileNavIds.value.indexOf(id)
    if (idx < 0) return
    const swap = direction === 'up' ? idx - 1 : idx + 1
    if (swap < 0 || swap >= mobileNavIds.value.length) return
    const arr = [...mobileNavIds.value]
    const temp = arr[idx]!
    arr[idx] = arr[swap]!
    arr[swap] = temp
    mobileNavIds.value = arr
    saveMobileNav()
  }

  function resetMobileNav() {
    mobileNavIds.value = [...DEFAULT_MOBILE_NAV_IDS]
    saveMobileNav()
  }

  /** The actual mobile nav items: dashboard pinned first + user selection */
  const mobileNavItems = computed<NavItem[]>(() => {
    const dashboard = ALL_NAV_ITEMS.find(i => i.id === 'dashboard')!
    const selected = mobileNavIds.value
      .map(id => ALL_NAV_ITEMS.find(i => i.id === id))
      .filter((i): i is NavItem => !!i)
    return [dashboard, ...selected]
  })

  /** All choosable items for the config UI */
  const mobileChoosableItems = computed(() =>
    MOBILE_CHOOSABLE_IDS.map(id => ({
      ...ALL_NAV_ITEMS.find(i => i.id === id)!,
      selected: mobileNavIds.value.includes(id),
    }))
  )

  /** Route-matching logic */
  function isActive(path: string): boolean {
    if (path === '/') return route.path === '/'
    return route.path.startsWith(path)
  }

  return {
    // Desktop
    desktopPrimaryItems: DESKTOP_PRIMARY_ITEMS,
    desktopToolsItems: DESKTOP_TOOLS_ITEMS,
    desktopFooterItems: DESKTOP_FOOTER_ITEMS,
    // Mobile
    mobileNavItems,
    mobileNavIds,
    mobileChoosableItems,
    isEditingMobileNav,
    loadMobileNav,
    toggleMobileNavItem,
    moveMobileNavItem,
    resetMobileNav,
    // Shared
    isActive,
    maxMobileItems: MOBILE_MAX_ITEMS,
  }
}
