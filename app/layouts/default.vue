<script setup lang="ts">
const { t } = useI18n()
const nav = useNavigation()

onMounted(() => nav.loadMobileNav())
</script>

<template>
  <div class="min-h-[100dvh] flex flex-col md:flex-row">
    <!-- Desktop Sidebar — slim icon rail, expands on hover -->
    <aside class="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 sidebar-modern safe-top z-50">
      <!-- App branding -->
      <div class="flex items-center gap-3 px-5 pt-7 pb-5">
        <span class="text-xl text-[var(--color-primary-light)] flex-shrink-0">☪</span>
        <div class="sidebar-brand-text">
          <h2 class="text-base font-semibold text-[var(--color-primary-light)] leading-tight">MuslimApp</h2>
          <p class="text-[10px] text-themed-faint">{{ t('app.tagline') }}</p>
        </div>
      </div>

      <!-- Primary nav -->
      <nav class="flex-1 px-3 space-y-1 overflow-y-auto no-scrollbar">
        <NuxtLink
          v-for="item in nav.desktopPrimaryItems"
          :key="item.id"
          :to="item.path"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200',
            nav.isActive(item.path)
              ? 'glass-primary text-[var(--color-primary-light)]'
              : 'text-themed-secondary hover:text-themed hover:bg-[var(--glass-bg-subtle)]',
          ]"
        >
          <span class="text-lg leading-none w-6 text-center flex-shrink-0">{{ item.icon }}</span>
          <span class="text-sm font-medium sidebar-label">{{ t(item.label) }}</span>
        </NuxtLink>

        <!-- Divider -->
        <div class="my-3 mx-2 border-t border-[var(--glass-border)]" />

        <!-- Tools -->
        <NuxtLink
          v-for="item in nav.desktopToolsItems"
          :key="item.id"
          :to="item.path"
          :class="[
            'flex items-center gap-3 px-3 py-2 rounded-2xl transition-all duration-200',
            nav.isActive(item.path)
              ? 'glass-primary text-[var(--color-primary-light)]'
              : 'text-themed-secondary hover:text-themed hover:bg-[var(--glass-bg-subtle)]',
          ]"
        >
          <span class="text-base leading-none w-6 text-center flex-shrink-0">{{ item.icon }}</span>
          <span class="text-sm sidebar-label">{{ t(item.label) }}</span>
        </NuxtLink>
      </nav>

      <!-- Footer: Settings + About -->
      <div class="px-3 pb-4 space-y-1">
        <div class="mb-2 mx-2 border-t border-[var(--glass-border)]" />
        <NuxtLink
          v-for="item in nav.desktopFooterItems"
          :key="item.id"
          :to="item.path"
          :class="[
            'flex items-center gap-3 px-3 py-2 rounded-2xl transition-all duration-200',
            nav.isActive(item.path)
              ? 'glass-primary text-[var(--color-primary-light)]'
              : 'text-themed-faint hover:text-themed-secondary hover:bg-[var(--glass-bg-subtle)]',
          ]"
        >
          <span class="text-base leading-none w-6 text-center flex-shrink-0">{{ item.icon }}</span>
          <span class="text-sm sidebar-label">{{ t(item.label) }}</span>
        </NuxtLink>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 pb-28 md:pb-6 md:ml-[4.5rem] safe-top">
      <slot />
    </main>

    <!-- Mobile Bottom Navigation — iOS 26 Liquid Glass Pill -->
    <div class="md:hidden liquid-nav">
      <!-- Edit button -->
      <div class="flex justify-center mb-1.5">
        <button
          :class="[
            'px-3 py-1 rounded-full text-[10px] font-medium transition-all duration-200',
            nav.isEditingMobileNav.value
              ? 'bg-[var(--color-primary)] text-white'
              : 'text-transparent',
          ]"
          @click="nav.isEditingMobileNav.value = !nav.isEditingMobileNav.value"
        >
          {{ nav.isEditingMobileNav.value ? t('nav.editNavDone') : '' }}
        </button>
      </div>

      <!-- Nav editor panel (slides up above pill) -->
      <Transition name="slide">
        <div v-if="nav.isEditingMobileNav.value" class="liquid-nav-editor mb-2">
          <div class="glass-strong rounded-2xl p-3 max-w-[22rem] mx-auto">
            <div class="flex items-center justify-between mb-2">
              <p class="text-[11px] text-themed-muted">{{ t('nav.editNavHint') }}</p>
              <button
                class="text-[10px] text-themed-faint hover:text-themed-secondary"
                @click="nav.resetMobileNav()"
              >
                {{ t('nav.editNavReset') }}
              </button>
            </div>
            <div class="grid grid-cols-4 gap-1.5">
              <button
                v-for="item in nav.mobileChoosableItems.value"
                :key="item.id"
                :class="[
                  'flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl transition-all text-[10px]',
                  item.selected
                    ? 'glass-primary text-[var(--color-primary-light)]'
                    : 'glass-subtle text-themed-faint',
                  !item.selected && nav.mobileNavIds.value.length >= nav.maxMobileItems
                    ? 'opacity-40 pointer-events-none'
                    : '',
                ]"
                @click="nav.toggleMobileNavItem(item.id)"
              >
                <span class="text-base">{{ item.icon }}</span>
                <span class="leading-tight">{{ t(item.label) }}</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- The pill nav bar -->
      <nav class="liquid-nav-pill">
        <div class="flex items-center">
          <NuxtLink
            v-for="item in nav.mobileNavItems.value"
            :key="item.id"
            :to="item.path"
            :class="[
              'liquid-nav-item',
              nav.isActive(item.path)
                ? 'liquid-nav-item--active text-[var(--color-primary-light)]'
                : 'text-[var(--nav-inactive)]',
            ]"
          >
            <span class="text-xl leading-none">{{ item.icon }}</span>
            <span class="text-[10px] font-medium leading-tight">
              {{ t(item.label) }}
            </span>
          </NuxtLink>

          <!-- Edit nav button (small gear icon) -->
          <button
            :class="[
              'liquid-nav-item',
              nav.isEditingMobileNav.value
                ? 'text-[var(--color-primary-light)]'
                : 'text-[var(--nav-inactive)]',
            ]"
            @click="nav.isEditingMobileNav.value = !nav.isEditingMobileNav.value"
          >
            <span class="text-sm leading-none">•••</span>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>
