/**
 * Timezone-aware date/time helpers.
 *
 * The implementation lives in `shared/time.ts` so the Nitro server (push
 * scheduler) uses exactly the same wall-clock → epoch conversion as the app.
 * This module re-exports it under the historic `~/utils/time` path (and keeps
 * the helpers available as Nuxt auto-imports in the app).
 */
export {
  isValidTimeZone,
  deviceTimeZone,
  resolveTimeZone,
  wallClockInZone,
  timeZoneOffsetMs,
  zonedWallTimeToEpoch,
  todayInZone,
  addDays,
  daysBetween,
  startOfNextDayInZone,
  formatDdMmYyyy,
  parseDdMmYyyy,
  monthKey,
  parseHHmm,
  formatHHmm,
  hijriDateInZone,
} from '#shared/time'
export type { YMD, ZonedParts } from '#shared/time'
