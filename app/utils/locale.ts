/**
 * Locale helpers shared by the UI.
 *
 * Digit decision: all numbers, dates and times are rendered with Latin digits
 * (0–9) in every language — including Arabic. Prayer times, countdowns and
 * counters are already Latin-digit strings, so Intl-formatted dates/numbers
 * use the `latn` numbering system for 'ar' to keep the mixed UI consistent.
 */

/** Locales that read right-to-left. */
export const RTL_LOCALES = ['ar'] as const

export function isRtlLocale(locale: string): boolean {
  return (RTL_LOCALES as readonly string[]).includes(locale)
}

/** BCP-47 tag for Intl.* APIs; Arabic is forced to Latin digits. */
export function intlTag(locale: string): string {
  return locale === 'ar' ? 'ar-u-nu-latn' : locale
}

/** Era suffix of free-text years in content data ("570 n.Chr." → "570 م" in Arabic); other locales unchanged. */
export function localizeEra(year: string, locale: string): string {
  if (locale !== 'ar') return year
  return year.replace(/\s*v\.\s*Chr\./, ' ق.م').replace(/\s*n\.\s*Chr\./, ' م')
}
