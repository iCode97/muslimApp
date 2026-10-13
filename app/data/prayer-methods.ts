/**
 * Aladhan API prayer calculation methods.
 * See: https://aladhan.com/prayer-times-api#tag/Prayer-Times/paths/~1v1~1timings~1%7Bdate%7D/get
 */

export interface PrayerMethod {
  id: number
  name: string
  region: string
}

export const PRAYER_METHODS: PrayerMethod[] = [
  { id: 13, name: 'Diyanet İşleri Başkanlığı', region: 'Türkei' },
  { id: 3, name: 'Muslim World League (MWL)', region: 'Europa / Global' },
  { id: 12, name: 'ISNA (Islamic Society of North America)', region: 'Nordamerika' },
  { id: 2, name: 'ISNA', region: 'Nordamerika' },
  { id: 1, name: 'University of Islamic Sciences, Karachi', region: 'Pakistan' },
  { id: 4, name: 'Umm al-Qura University, Makkah', region: 'Saudi-Arabien' },
  { id: 5, name: 'Egyptian General Authority of Survey', region: 'Ägypten' },
  { id: 7, name: 'Institute of Geophysics, University of Tehran', region: 'Iran' },
  { id: 8, name: 'Gulf Region', region: 'Golf-Staaten' },
  { id: 9, name: 'Kuwait', region: 'Kuwait' },
  { id: 10, name: 'Qatar', region: 'Katar' },
  { id: 11, name: 'Majlis Ugama Islam Singapura', region: 'Singapur' },
  { id: 14, name: 'JAKIM (Malaysia)', region: 'Malaysia' },
  { id: 15, name: 'Tunisia', region: 'Tunesien' },
  { id: 16, name: 'Algeria (MARA)', region: 'Algerien' },
]

export const DEFAULT_METHOD = 13

// ---------------------------------------------------------------------------
// Additional calculation parameters
// ---------------------------------------------------------------------------

/**
 * Asr juristic method (Aladhan `school` param).
 *   0 = Standard (Shafi'i, Maliki, Hanbali — shadow length 1×; also the
 *       Diyanet convention for the displayed Asr time)
 *   1 = Hanafi (shadow length 2× — Asr starts later)
 */
export type AsrSchool = 0 | 1
export const ASR_SCHOOLS: readonly AsrSchool[] = [0, 1]
export const DEFAULT_SCHOOL: AsrSchool = 0

/**
 * High-latitude rule (Aladhan `latitudeAdjustmentMethod` param).
 *   1 = Middle of the night, 2 = One seventh of the night, 3 = Angle based,
 *   0 = None (no adjustment — produces unusable times in northern summers),
 *   'auto' = angle based above HIGH_LATITUDE_THRESHOLD, Aladhan default otherwise.
 */
export type LatitudeAdjustmentSetting = 'auto' | 0 | 1 | 2 | 3
export const LATITUDE_ADJUSTMENT_OPTIONS: readonly LatitudeAdjustmentSetting[] = ['auto', 3, 1, 2, 0]
export const DEFAULT_LATITUDE_ADJUSTMENT: LatitudeAdjustmentSetting = 'auto'

/** |latitude| above which 'auto' explicitly requests the angle-based rule. */
export const HIGH_LATITUDE_THRESHOLD = 48

/**
 * Resolve the high-latitude setting to the value sent to Aladhan.
 * Returns undefined when the parameter should be omitted (Aladhan default).
 */
export function resolveLatitudeAdjustment(
  setting: LatitudeAdjustmentSetting,
  latitude: number,
): 0 | 1 | 2 | 3 | undefined {
  if (setting === 'auto') {
    return Math.abs(latitude) > HIGH_LATITUDE_THRESHOLD ? 3 : undefined
  }
  return setting
}

/**
 * Prayers the user can fine-tune by whole minutes. Adjustments are applied
 * client-side on top of the method's official times (see usePrayerTimes).
 */
export const ADJUSTABLE_PRAYERS = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const
export type AdjustablePrayer = typeof ADJUSTABLE_PRAYERS[number]
export type PrayerAdjustments = Record<AdjustablePrayer, number>

/** Maximum absolute per-prayer adjustment in minutes. */
export const MAX_PRAYER_ADJUSTMENT = 30

export function emptyAdjustments(): PrayerAdjustments {
  return { Fajr: 0, Sunrise: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0 }
}

/** Clamp an adjustment to an integer within ±MAX_PRAYER_ADJUSTMENT. */
export function clampAdjustment(minutes: unknown): number {
  const n = Math.round(Number(minutes))
  if (!Number.isFinite(n)) return 0
  return Math.max(-MAX_PRAYER_ADJUSTMENT, Math.min(MAX_PRAYER_ADJUSTMENT, n))
}
