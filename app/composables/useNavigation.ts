/**
 * Navigation composable.
 *
 * Information architecture:
 * - Mobile: FIXED bottom bar with 5 tabs — Heute · Gebet · Koran · Lernen · Mehr.
 *   Personalisation lives in the Favorites row on /more (see useFavoriteTools).
 * - Desktop: sidebar with primary group, tools group and footer (Settings/About).
 */

export interface NavItem {
  id: string
  path: string
  /** AppIcon name — resolved to inline SVG in the layout. */
  icon: string
  /** i18n key (desktop sidebar + generic usage). */
  label: string
}

/** A tool that lives in the /more hub and can be pinned as a favorite. */
export interface ToolItem {
  id: string
  path: string
  icon: string
  /** i18n key — short name. */
  label: string
  /** i18n key — one-line description. */
  desc: string
}

export interface MobileTab {
  id: string
  path: string
  icon: string
  /** i18n key — short label that must fit 5 tabs at 320px width. */
  label: string
  /** Route prefixes for which this tab counts as active. */
  match: string[]
}

/** All navigation items. `icon` values map to AppIcon names. */
export const ALL_NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', path: '/', icon: 'dashboard', label: 'nav.dashboard' },
  { id: 'prayer', path: '/prayer', icon: 'prayer', label: 'nav.prayer' },
  { id: 'quran', path: '/quran', icon: 'quran', label: 'nav.quran' },
  { id: 'learn', path: '/learn', icon: 'learn', label: 'nav.learn' },
  { id: 'calendar', path: '/calendar', icon: 'calendar', label: 'nav.calendar' },
  { id: 'tasbih', path: '/tasbih', icon: 'tasbih', label: 'nav.tasbih' },
  { id: 'qibla', path: '/qibla', icon: 'qibla', label: 'nav.qibla' },
  { id: 'dua', path: '/dua', icon: 'dua', label: 'nav.dua' },
  { id: 'hadith', path: '/hadith', icon: 'hadith', label: 'nav.hadith' },
  { id: 'names', path: '/names', icon: 'names', label: 'nav.names' },
  { id: 'guide', path: '/guide', icon: 'guide', label: 'nav.guide' },
  { id: 'seerah', path: '/seerah', icon: 'seerah', label: 'nav.seerah' },
  { id: 'ramadan', path: '/ramadan', icon: 'ramadan', label: 'nav.ramadan' },
  { id: 'tracker', path: '/tracker', icon: 'tracker', label: 'nav.tracker' },
  { id: 'zakat', path: '/zakat', icon: 'zakat', label: 'nav.zakat' },
  { id: 'favorites', path: '/favorites', icon: 'heart', label: 'nav.favorites' },
  { id: 'settings', path: '/settings', icon: 'settings', label: 'nav.settings' },
  { id: 'about', path: '/about', icon: 'about', label: 'nav.about' },
]

function pick(ids: string[]): NavItem[] {
  return ids
    .map(id => ALL_NAV_ITEMS.find(i => i.id === id))
    .filter((i): i is NavItem => !!i)
}

/** Desktop sidebar groups */
export const DESKTOP_PRIMARY_ITEMS = pick(['dashboard', 'prayer', 'quran', 'learn', 'calendar'])
export const DESKTOP_TOOLS_ITEMS = pick([
  'tasbih', 'qibla', 'dua', 'hadith', 'names', 'guide', 'seerah', 'ramadan',
  'tracker', 'zakat', 'favorites',
])
export const DESKTOP_FOOTER_ITEMS = pick(['settings', 'about'])

/** Mobile bottom bar — fixed, not user-customizable. */
export const MOBILE_TABS: MobileTab[] = [
  { id: 'today', path: '/', icon: 'dashboard', label: 'nav.tabToday', match: ['/'] },
  { id: 'prayer', path: '/prayer', icon: 'prayer', label: 'nav.tabPrayer', match: ['/prayer', '/tracker'] },
  { id: 'quran', path: '/quran', icon: 'quran', label: 'nav.tabQuran', match: ['/quran', '/favorites'] },
  { id: 'learn', path: '/learn', icon: 'learn', label: 'nav.tabLearn', match: ['/learn', '/guide', '/seerah', '/names', '/hadith'] },
  {
    id: 'more',
    path: '/more',
    icon: 'more',
    label: 'nav.tabMore',
    match: ['/more', '/tasbih', '/qibla', '/dua', '/calendar', '/ramadan', '/zakat', '/settings', '/about'],
  },
]

/** Tools shown in the "Werkzeuge" section of /more (all can be pinned). */
export const TOOL_ITEMS: ToolItem[] = [
  { id: 'tasbih', path: '/tasbih', icon: 'tasbih', label: 'nav.tasbih', desc: 'more.tasbihDesc' },
  { id: 'qibla', path: '/qibla', icon: 'qibla', label: 'nav.qibla', desc: 'more.qiblaDesc' },
  { id: 'dua', path: '/dua', icon: 'dua', label: 'nav.dua', desc: 'more.duaDesc' },
  { id: 'calendar', path: '/calendar', icon: 'calendar', label: 'nav.calendar', desc: 'more.calendarDesc' },
  { id: 'ramadan', path: '/ramadan', icon: 'ramadan', label: 'nav.ramadan', desc: 'more.ramadanDesc' },
  { id: 'tracker', path: '/tracker', icon: 'tracker', label: 'nav.tracker', desc: 'more.trackerDesc' },
  { id: 'zakat', path: '/zakat', icon: 'zakat', label: 'nav.zakat', desc: 'more.zakatDesc' },
  { id: 'favorites', path: '/favorites', icon: 'heart', label: 'nav.favorites', desc: 'more.favoritesDesc' },
  { id: 'mosques', path: '/mosques', icon: 'mosque', label: 'nav.mosques', desc: 'more.mosquesDesc' },
]

/**
 * Tools that live elsewhere (Learn hub) but can still end up in the
 * favorites list, e.g. via migration from the old customizable nav.
 */
export const EXTRA_FAVORITABLE_ITEMS: ToolItem[] = [
  { id: 'hadith', path: '/hadith', icon: 'hadith', label: 'nav.hadith', desc: 'more.hadithDesc' },
  { id: 'names', path: '/names', icon: 'names', label: 'nav.names', desc: 'more.namesDesc' },
  { id: 'guide', path: '/guide', icon: 'guide', label: 'nav.guide', desc: 'more.guideDesc' },
  { id: 'seerah', path: '/seerah', icon: 'seerah', label: 'nav.seerah', desc: 'more.seerahDesc' },
]

export const FAVORITABLE_ITEMS: ToolItem[] = [...TOOL_ITEMS, ...EXTRA_FAVORITABLE_ITEMS]

/** App section of /more — always reachable. */
export const APP_ITEMS: ToolItem[] = [
  { id: 'settings', path: '/settings', icon: 'settings', label: 'nav.settings', desc: 'more.settingsDesc' },
  { id: 'about', path: '/about', icon: 'about', label: 'more.about', desc: 'more.aboutDesc' },
]

function normalize(path: string): string {
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path
}

function matchesPrefix(routePath: string, prefix: string): boolean {
  const p = normalize(routePath)
  if (prefix === '/') return p === '/'
  return p === prefix || p.startsWith(`${prefix}/`)
}

export function useNavigation() {
  const route = useRoute()

  /** Generic route matching (desktop sidebar). */
  function isActive(path: string): boolean {
    return matchesPrefix(route.path, path)
  }

  /** Is the given mobile tab active for the current route? */
  function isTabActive(tab: MobileTab): boolean {
    return tab.match.some(prefix => matchesPrefix(route.path, prefix))
  }

  return {
    // Desktop
    desktopPrimaryItems: DESKTOP_PRIMARY_ITEMS,
    desktopToolsItems: DESKTOP_TOOLS_ITEMS,
    desktopFooterItems: DESKTOP_FOOTER_ITEMS,
    // Mobile
    mobileTabs: MOBILE_TABS,
    isTabActive,
    // Shared
    isActive,
  }
}
