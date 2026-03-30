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

const moreRoutes = ['/more', '/settings', '/tasbih', '/qibla', '/dua', '/hadith', '/names', '/guide', '/seerah', '/ramadan']

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  if (path === '/more') return moreRoutes.some(r => route.path.startsWith(r))
  return route.path.startsWith(path)
}
</script>

<template>
  <div class="min-h-[100dvh] flex flex-col md:flex-row">
    <!-- Desktop Sidebar Navigation (lg+) -->
    <aside class="hidden md:flex md:flex-col md:w-56 md:fixed md:inset-y-0 md:left-0 glass-nav md:border-r md:border-t-0 safe-top z-50">
      <!-- App branding -->
      <div class="px-5 pt-6 pb-4">
        <h2 class="text-lg font-semibold text-[var(--color-primary-light)]">MuslimApp</h2>
        <p class="text-[10px] text-themed-faint mt-0.5">Gebetszeiten &amp; Koran</p>
      </div>

      <!-- Nav links -->
      <nav class="flex-1 px-3 space-y-1">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
            isActive(item.path)
              ? 'glass-primary text-[var(--color-primary-light)]'
              : 'text-themed-secondary hover:text-themed hover:bg-[var(--glass-bg-subtle)]',
          ]"
        >
          <span class="text-lg leading-none w-6 text-center">{{ item.icon }}</span>
          <span class="text-sm font-medium">{{ t(item.label) }}</span>
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 pb-24 md:pb-6 md:ml-56 safe-top">
      <slot />
    </main>

    <!-- Mobile Bottom Navigation (below lg) -->
    <nav class="md:hidden fixed bottom-0 inset-x-0 glass-nav safe-bottom z-50">
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
