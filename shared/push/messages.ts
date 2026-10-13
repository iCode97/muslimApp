/**
 * Localised notification texts for server-sent pushes (de/en/tr).
 * Wording mirrors the app's i18n (`prayer.*`, `notifications.*`, `dhikrReminder.*`).
 */
import type { PushLocale, PushPrayer } from './types'

interface PushMessages {
  prayer: Record<PushPrayer, string>
  /** {minutes} is replaced */
  prayerIn: string
  prayerNow: string
  morningTitle: string
  morningBody: string
  eveningTitle: string
  eveningBody: string
  testTitle: string
  testBody: string
}

export const PUSH_MESSAGES: Record<PushLocale, PushMessages> = {
  de: {
    prayer: { Fajr: 'Fajr', Dhuhr: 'Dhuhr', Asr: 'Asr', Maghrib: 'Maghrib', Isha: 'Isha' },
    prayerIn: 'In {minutes} Minuten',
    prayerNow: 'Es ist Zeit für das Gebet',
    morningTitle: 'Morgen-Adhkar',
    morningBody: 'Beginne deinen Tag mit den Morgen-Bittgebeten.',
    eveningTitle: 'Abend-Adhkar',
    eveningBody: 'Beschliesse deinen Tag mit den Abend-Bittgebeten.',
    testTitle: 'MuslimApp',
    testBody: 'Test-Benachrichtigung: Push-Erinnerungen funktionieren.',
  },
  en: {
    prayer: { Fajr: 'Fajr', Dhuhr: 'Dhuhr', Asr: 'Asr', Maghrib: 'Maghrib', Isha: 'Isha' },
    prayerIn: 'In {minutes} minutes',
    prayerNow: 'It\'s time for prayer',
    morningTitle: 'Morning Adhkar',
    morningBody: 'Begin your day with the morning supplications.',
    eveningTitle: 'Evening Adhkar',
    eveningBody: 'Close your day with the evening supplications.',
    testTitle: 'MuslimApp',
    testBody: 'Test notification: push reminders are working.',
  },
  tr: {
    prayer: { Fajr: 'İmsak', Dhuhr: 'Öğle', Asr: 'İkindi', Maghrib: 'Akşam', Isha: 'Yatsı' },
    prayerIn: '{minutes} dakika içinde',
    prayerNow: 'Namaz vakti geldi',
    morningTitle: 'Sabah Zikri',
    morningBody: 'Güne sabah duaları ile başla.',
    eveningTitle: 'Akşam Zikri',
    eveningBody: 'Güne akşam duaları ile son ver.',
    testTitle: 'MuslimApp',
    testBody: 'Test bildirimi: Push hatırlatıcıları çalışıyor.',
  },
}

export function pushMessages(locale: PushLocale): PushMessages {
  return PUSH_MESSAGES[locale] ?? PUSH_MESSAGES.de
}

export function prayerReminderText(locale: PushLocale, prayer: PushPrayer, minutesBefore: number): { title: string, body: string } {
  const m = pushMessages(locale)
  return {
    title: m.prayer[prayer],
    body: minutesBefore > 0 ? m.prayerIn.replace('{minutes}', String(minutesBefore)) : m.prayerNow,
  }
}
