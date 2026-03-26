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
