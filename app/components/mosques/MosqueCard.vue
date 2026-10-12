<script setup lang="ts">
/**
 * One mosque result: name, address, distance, raw operator/denomination tags and route links.
 */
import { formatDistance } from '~/utils/geo'
import {
  appleMapsUrl,
  geoUri,
  osmDirectionsUrl,
  osmObjectUrl,
  type MapPlatform,
  type Mosque,
} from '~/utils/mosques'

const props = defineProps<{
  mosque: Mosque
  platform: MapPlatform
}>()

const { t, locale } = useI18n()

const displayName = computed(() => props.mosque.name ?? t('mosques.fallbackName'))
const distance = computed(() => formatDistance(props.mosque.distanceKm, locale.value))
const websiteHost = computed(() => {
  if (!props.mosque.website) return null
  try {
    return new URL(props.mosque.website).host.replace(/^www\./, '')
  }
  catch {
    return null
  }
})

const nativeLink = computed(() => {
  if (props.platform === 'ios') {
    return { href: appleMapsUrl(props.mosque.lat, props.mosque.lon), label: t('mosques.openAppleMaps') }
  }
  if (props.platform === 'android') {
    return { href: geoUri(props.mosque.lat, props.mosque.lon, props.mosque.name), label: t('mosques.openMapsApp') }
  }
  return null
})
</script>

<template>
  <li class="glass rounded-2xl p-4 space-y-3">
    <div class="flex items-start gap-3">
      <span class="icon-tile" aria-hidden="true">
        <AppIcon name="mosque" :size="22" />
      </span>
      <div class="flex-1 min-w-0">
        <h3 class="font-medium text-sm text-themed break-words">
          {{ displayName }}
        </h3>
        <p v-if="mosque.address" class="text-xs text-themed-muted mt-0.5 break-words">
          {{ mosque.address }}
        </p>
        <div v-if="mosque.operator || mosque.denomination" class="flex flex-wrap gap-1.5 mt-2">
          <span v-if="mosque.operator" class="tag-chip">
            {{ t('mosques.operator') }}: {{ mosque.operator }}
          </span>
          <span v-if="mosque.denomination" class="tag-chip">
            {{ t('mosques.denomination') }}: {{ mosque.denomination }}
          </span>
        </div>
      </div>
      <div class="text-right shrink-0">
        <p class="text-sm font-semibold text-[var(--color-primary-light)]">
          {{ distance }}
        </p>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <a
        :href="osmDirectionsUrl(mosque.lat, mosque.lon)"
        target="_blank"
        rel="noopener noreferrer"
        class="action-btn bg-[var(--color-primary)] text-white"
        :aria-label="`${t('mosques.route')}: ${displayName}`"
      >
        <AppIcon name="arrowRight" :size="16" />
        {{ t('mosques.route') }}
      </a>
      <a
        v-if="nativeLink"
        :href="nativeLink.href"
        class="action-btn glass-subtle text-themed-secondary"
        :aria-label="`${nativeLink.label}: ${displayName}`"
      >
        {{ nativeLink.label }}
      </a>
      <a
        v-if="mosque.website"
        :href="mosque.website"
        target="_blank"
        rel="noopener noreferrer"
        class="action-btn glass-subtle text-themed-secondary"
      >
        {{ websiteHost ?? t('mosques.website') }}
      </a>
      <a
        :href="osmObjectUrl(mosque.id)"
        target="_blank"
        rel="noopener noreferrer"
        class="text-[11px] text-themed-faint underline underline-offset-2 ml-auto py-2"
      >
        {{ t('mosques.viewOnOsm') }}
      </a>
    </div>
  </li>
</template>

<style scoped>
.icon-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 0.875rem;
  background: var(--glass-bg-subtle);
  border: 1px solid var(--glass-border);
  color: var(--color-primary-light);
}
.tag-chip {
  font-size: 0.6875rem;
  line-height: 1.2;
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  color: var(--color-text-secondary, inherit);
  background: var(--glass-bg-subtle);
  border: 1px solid var(--glass-border);
}
.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 2.75rem;
  padding: 0 1rem;
  border-radius: 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
}
.action-btn:focus-visible,
a:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}
</style>
