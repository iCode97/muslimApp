<script setup lang="ts">
/**
 * AppIcon — inline SVG icon registry.
 *
 * Using hand-picked 24x24 outline paths so navigation renders crisply on
 * high-DPI displays (emoji rendering varies wildly by OS and looks fuzzy at
 * small sizes). Each icon stays purely stroke-based so `currentColor`
 * inherits from the parent's text color for themed variants.
 */

interface Props {
  name: string
  size?: number | string
  /** Stroke width in SVG user units. */
  stroke?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  stroke: 1.6,
})

// Registry of { [id]: svg path body (as <path/> / <circle/> / etc markup) }.
// All icons share a 24x24 viewBox, none set fill (uses `none` on the <svg>).
const ICONS: Record<string, string> = {
  dashboard:
    '<path d="M4 12 L12 4 L20 12" /><path d="M6 10 V20 H10 V14 H14 V20 H18 V10" />',
  prayer:
    '<path d="M12 3 C9 7 9 10 12 10 C15 10 15 7 12 3 Z" /><path d="M5 21 V13 C5 11 6 10 8 10 H16 C18 10 19 11 19 13 V21" /><path d="M3 21 H21" /><path d="M12 10 V21" />',
  quran:
    '<path d="M6 4 H17 A2 2 0 0 1 19 6 V20 A1 1 0 0 1 18 21 H7 A3 3 0 0 1 4 18 V7 A3 3 0 0 1 7 4" /><path d="M7 4 V18 A1 1 0 0 1 6 19" /><path d="M10 9 H16 M10 13 H14" />',
  calendar:
    '<rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10 H20.5" /><path d="M8 3 V7 M16 3 V7" /><circle cx="8.5" cy="14" r="0.8" fill="currentColor" stroke="none" /><circle cx="12" cy="14" r="0.8" fill="currentColor" stroke="none" /><circle cx="15.5" cy="14" r="0.8" fill="currentColor" stroke="none" />',
  tasbih:
    '<circle cx="12" cy="12" r="8" /><circle cx="12" cy="4.5" r="1.2" fill="currentColor" stroke="none" /><circle cx="18.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" /><circle cx="18.5" cy="15.5" r="1.2" fill="currentColor" stroke="none" /><circle cx="12" cy="19.5" r="1.2" fill="currentColor" stroke="none" /><circle cx="5.5" cy="15.5" r="1.2" fill="currentColor" stroke="none" /><circle cx="5.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />',
  qibla:
    '<circle cx="12" cy="12" r="9" /><path d="M9 15 L12 5 L15 15 L12 13 Z" fill="currentColor" stroke="none" /><path d="M12 2 V4 M12 20 V22 M2 12 H4 M20 12 H22" />',
  dua:
    '<path d="M8 11 V7 A1.5 1.5 0 0 1 11 7 V11" /><path d="M13 11 V7 A1.5 1.5 0 0 1 16 7 V11" /><path d="M6 11 H18 V15 A6 6 0 0 1 12 21 A6 6 0 0 1 6 15 Z" /><path d="M9 4 V7 M15 4 V7" />',
  hadith:
    '<path d="M4 5 H16 A3 3 0 0 1 19 8 V19 A2 2 0 0 1 17 21 H6 A2 2 0 0 1 4 19 Z" /><path d="M7 9 H15 M7 13 H13 M7 17 H11" />',
  names:
    '<path d="M12 3 L14 9 L20 10 L15.5 14 L17 20 L12 17 L7 20 L8.5 14 L4 10 L10 9 Z" />',
  guide:
    '<path d="M4 4 H15 A3 3 0 0 1 18 7 V20 H7 A3 3 0 0 1 4 17 Z" /><path d="M4 17 A3 3 0 0 1 7 14 H18" /><path d="M8 8 H13" />',
  seerah:
    '<path d="M12 3 L21 7 V13 C21 17 17 20 12 21 C7 20 3 17 3 13 V7 Z" /><path d="M9 12 L11 14 L15 10" />',
  ramadan:
    '<path d="M20 14 A8 8 0 1 1 10 4 A6 6 0 0 0 20 14 Z" /><circle cx="17" cy="6" r="0.8" fill="currentColor" stroke="none" /><circle cx="20" cy="9" r="0.6" fill="currentColor" stroke="none" />',
  settings:
    '<circle cx="12" cy="12" r="3" /><path d="M19.4 15 A1.65 1.65 0 0 0 19.7 16.8 L19.8 16.9 A2 2 0 1 1 17 19.7 L16.9 19.6 A1.65 1.65 0 0 0 15 19.3 A1.65 1.65 0 0 0 13.9 20.8 V21 A2 2 0 1 1 9.9 21 V20.9 A1.65 1.65 0 0 0 8.8 19.4 A1.65 1.65 0 0 0 7 19.7 L6.9 19.8 A2 2 0 1 1 4.1 17 L4.2 16.9 A1.65 1.65 0 0 0 4.5 15 A1.65 1.65 0 0 0 3 13.9 H2.9 A2 2 0 1 1 2.9 9.9 H3 A1.65 1.65 0 0 0 4.5 8.8 A1.65 1.65 0 0 0 4.2 7 L4.1 6.9 A2 2 0 1 1 6.9 4.1 L7 4.2 A1.65 1.65 0 0 0 8.8 4.5 A1.65 1.65 0 0 0 9.9 3 V2.9 A2 2 0 1 1 13.9 2.9 V3 A1.65 1.65 0 0 0 15 4.5 A1.65 1.65 0 0 0 16.8 4.2 L16.9 4.1 A2 2 0 1 1 19.7 6.9 L19.6 7 A1.65 1.65 0 0 0 19.3 8.8 A1.65 1.65 0 0 0 20.8 9.9 H21 A2 2 0 1 1 21 13.9 H20.8 A1.65 1.65 0 0 0 19.4 15 Z" />',
  about:
    '<circle cx="12" cy="12" r="9" /><path d="M12 8 V8.01" /><path d="M11 12 H12 V17 H13" />',
  // Widget + UI helpers
  edit:
    '<path d="M4 20 H9 L20 9 L15 4 L4 15 Z" /><path d="M14 5 L19 10" />',
  check:
    '<path d="M5 12 L10 17 L19 7" />',
  plus:
    '<path d="M12 5 V19 M5 12 H19" />',
  close:
    '<path d="M6 6 L18 18 M18 6 L6 18" />',
  location:
    '<path d="M12 21 C7 15.5 4 12 4 9 A8 8 0 0 1 20 9 C20 12 17 15.5 12 21 Z" /><circle cx="12" cy="9" r="2.5" />',
  target:
    '<circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2 V5 M12 19 V22 M2 12 H5 M19 12 H22" />',
  chevronDown:
    '<path d="M6 9 L12 15 L18 9" />',
  chevronUp:
    '<path d="M6 15 L12 9 L18 15" />',
  search:
    '<circle cx="11" cy="11" r="7" /><path d="M20 20 L16 16" />',
  bell:
    '<path d="M6 15 V11 A6 6 0 0 1 18 11 V15 L20 18 H4 Z" /><path d="M10 21 A2 2 0 0 0 14 21" />',
  moon:
    '<path d="M20 14 A8 8 0 1 1 10 4 A6 6 0 0 0 20 14 Z" />',
  sun:
    '<circle cx="12" cy="12" r="4" /><path d="M12 2 V4 M12 20 V22 M4.93 4.93 L6.34 6.34 M17.66 17.66 L19.07 19.07 M2 12 H4 M20 12 H22 M4.93 19.07 L6.34 17.66 M17.66 6.34 L19.07 4.93" />',
  more:
    '<circle cx="6" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="18" cy="12" r="1.5" fill="currentColor" stroke="none" />',
}

const svg = computed(() => ICONS[props.name] ?? '')
const dimension = computed(() => typeof props.size === 'number' ? `${props.size}px` : props.size)
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
    :width="dimension"
    :height="dimension"
    :aria-hidden="true"
    v-html="svg"
  />
</template>
