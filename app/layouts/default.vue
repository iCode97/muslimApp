<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

const navItems = [
  { path: '/', icon: '\u{1F3E0}', label: 'nav.dashboard' },
  { path: '/prayer', icon: '\u{1F54C}', label: 'nav.prayer' },
  { path: '/quran', icon: '\u{1F4D6}', label: 'nav.quran' },
  { path: '/calendar', icon: '\u{1F4C5}', label: 'nav.calendar' },
  { path: '/more', icon: '\u{2022}\u{2022}\u{2022}', label: 'nav.more' },
]

const moreRoutes = ['/more', '/settings', '/tasbih', '/qibla', '/dua', '/hadith']

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  if (path === '/more') return moreRoutes.some(r => route.path.startsWith(r))
  return route.path.startsWith(path)
}
</script>

<template>
  <div class="min-h-[100dvh] flex flex-col">
    <!-- Main Content Area -->
    <main class="flex-1 pb-24 safe-top">
      <slot />
    </main>

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 inset-x-0 glass-nav safe-bottom z-50">
      <div class="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="[
            'flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-200 min-w-[56px]',
            isActive(item.path)
              ? 'text-[var(--color-primary-light)] scale-105'
              : 'text-[var(--nav-inactive)] hover:text-[var(--nav-inactive-hover)]',
          ]"
        >
          <span class="text-xl leading-none">{{ item.icon }}</span>
          <span class="text-[10px] font-medium leading-tight">
            {{ t(item.label) }}
          </span>

          <!-- Active indicator dot -->
          <span
            v-if="isActive(item.path)"
            class="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[var(--color-primary-light)]"
          />
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>
