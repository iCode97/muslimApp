import { describe, expect, it } from 'vitest'
import {
  DISPATCH_WINDOW_MS,
  computeDayPrayerTimes,
  isoDate,
  planDispatch,
  prayerMonthsNeeded,
  pruneSent,
  type DayTimings,
  type TimingsLookup,
} from '../../shared/push/dispatch'
import type { PushRecord } from '../../shared/push/types'
import type { YMD } from '../../shared/time'

const MIN = 60_000
const utc = (iso: string) => Date.parse(iso)

function record(overrides: Partial<PushRecord> = {}): PushRecord {
  return {
    id: 'rec-berlin',
    subscription: { endpoint: 'https://fcm.googleapis.com/fcm/send/x', expirationTime: null, keys: { p256dh: 'p', auth: 'a' } },
    createdAt: 0,
    updatedAt: 0,
    sent: {},
    locale: 'de',
    timezone: 'Europe/Berlin',
    location: { lat: 52.52, lng: 13.4, timezone: 'Europe/Berlin' },
    prayerParams: {
      method: 13,
      school: 0,
      latitudeAdjustmentMethod: 3,
      adjustments: { Fajr: 0, Sunrise: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0 },
    },
    prayersEnabled: true,
    prayers: { Fajr: true, Dhuhr: true, Asr: true, Maghrib: true, Isha: true },
    minutesBefore: 10,
    dhikr: {
      enabled: false,
      morning: { enabled: true, h: 7, m: 0 },
      evening: { enabled: true, h: 19, m: 0 },
    },
    ...overrides,
  }
}

const day = (t: Partial<Record<string, string>>): DayTimings => ({
  Fajr: '05:58 (CEST)', Sunrise: '07:35 (CEST)', Dhuhr: '13:01 (CEST)',
  Asr: '16:02 (CEST)', Maghrib: '18:26 (CEST)', Isha: '19:57 (CEST)', Imsak: '05:48 (CEST)',
  ...t,
} as DayTimings)

/** Lookup from a { "YYYY-MM-DD": timings } table (same table for every record). */
const table = (days: Record<string, DayTimings>): TimingsLookup => (_r, date: YMD) => days[isoDate(date)]

const BERLIN_OCT = table({
  '2026-10-11': day({}),
  '2026-10-12': day({}),
  '2026-10-13': day({ Fajr: '06:00 (CEST)' }),
})

describe('computeDayPrayerTimes', () => {
  it('converts wall-clock times in the location timezone to epoch', () => {
    const times = computeDayPrayerTimes(day({}), { year: 2026, month: 10, day: 12 }, 'Europe/Berlin', {})
    expect(times.map(t => t.name)).toEqual(['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'])
    expect(times[0]!.timestamp).toBe(utc('2026-10-12T03:58:00Z')) // CEST = UTC+2
  })

  it('applies minute adjustments, also across midnight', () => {
    const times = computeDayPrayerTimes(
      day({ Isha: '23:50' }),
      { year: 2026, month: 10, day: 12 },
      'Europe/Berlin',
      { Fajr: 2, Isha: 15 },
    )
    expect(times.find(t => t.name === 'Fajr')!.timestamp).toBe(utc('2026-10-12T04:00:00Z'))
    // 23:50 + 15 = 00:05 on the 13th (CEST)
    expect(times.find(t => t.name === 'Isha')!.timestamp).toBe(utc('2026-10-12T22:05:00Z'))
  })

  it('moves late prayers after midnight to the next day (high latitudes)', () => {
    // Oslo, June: Isha "00:30" belongs to the night after June 20
    const times = computeDayPrayerTimes(
      { Fajr: '01:30', Sunrise: '03:55', Dhuhr: '13:15', Asr: '17:40', Maghrib: '22:40', Isha: '00:30' },
      { year: 2026, month: 6, day: 20 },
      'Europe/Oslo',
      {},
    )
    expect(times.find(t => t.name === 'Isha')!.timestamp).toBe(utc('2026-06-20T22:30:00Z'))
  })

  it('handles DST days (fall back and spring forward)', () => {
    // Berlin 2026-10-25: 03:00 CEST → 02:00 CET
    const autumn = computeDayPrayerTimes(day({ Fajr: '06:12 (CET)' }), { year: 2026, month: 10, day: 25 }, 'Europe/Berlin', {})
    expect(autumn[0]!.timestamp).toBe(utc('2026-10-25T05:12:00Z'))
    // Berlin 2026-03-29: 02:00 CET → 03:00 CEST
    const spring = computeDayPrayerTimes(day({ Fajr: '04:50 (CEST)' }), { year: 2026, month: 3, day: 29 }, 'Europe/Berlin', {})
    expect(spring[0]!.timestamp).toBe(utc('2026-03-29T02:50:00Z'))
  })

  it('skips unparseable timings', () => {
    const times = computeDayPrayerTimes(day({ Asr: 'n/a' }), { year: 2026, month: 10, day: 12 }, 'Europe/Berlin', {})
    expect(times.map(t => t.name)).not.toContain('Asr')
  })
})

describe('planDispatch — prayers', () => {
  const fajrFire = utc('2026-10-12T03:48:00Z') // 05:58 CEST − 10 min

  it('sends a localised reminder minutesBefore the prayer (Europe/Berlin)', () => {
    const sends = planDispatch([record()], fajrFire + 500, BERLIN_OCT)
    expect(sends).toEqual([{
      recordId: 'rec-berlin',
      notificationId: 'prayer-Fajr-2026-10-12',
      fireAt: fajrFire,
      payload: { title: 'Fajr', body: 'In 10 Minuten', tag: 'push-prayer-Fajr-2026-10-12', url: '/prayer' },
      ttlSeconds: 20 * 60,
    }])
  })

  it('only sends within the dispatch window', () => {
    expect(planDispatch([record()], fajrFire - 1000, BERLIN_OCT)).toEqual([])
    expect(planDispatch([record()], fajrFire + DISPATCH_WINDOW_MS - 1000, BERLIN_OCT)).toHaveLength(1)
    expect(planDispatch([record()], fajrFire + DISPATCH_WINDOW_MS, BERLIN_OCT)).toEqual([])
  })

  it('dedupes notifications that were already sent', () => {
    const r = record({ sent: { 'prayer-Fajr-2026-10-12': fajrFire } })
    expect(planDispatch([r], fajrFire + 500, BERLIN_OCT)).toEqual([])
  })

  it('respects disabled prayers and the master switch', () => {
    expect(planDispatch([record({ prayers: { Fajr: false, Dhuhr: true, Asr: true, Maghrib: true, Isha: true } })], fajrFire + 500, BERLIN_OCT)).toEqual([])
    expect(planDispatch([record({ prayersEnabled: false })], fajrFire + 500, BERLIN_OCT)).toEqual([])
    expect(planDispatch([record({ location: null })], fajrFire + 500, BERLIN_OCT)).toEqual([])
  })

  it('applies minute adjustments', () => {
    const r = record({
      prayerParams: { ...record().prayerParams, adjustments: { Fajr: 3, Sunrise: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0 } },
    })
    expect(planDispatch([r], fajrFire + 500, BERLIN_OCT)).toEqual([])
    const sends = planDispatch([r], fajrFire + 3 * MIN + 500, BERLIN_OCT)
    expect(sends.map(s => s.notificationId)).toEqual(['prayer-Fajr-2026-10-12'])
  })

  it('minutesBefore = 0 → "time for prayer" at the prayer time (America/New_York, English)', () => {
    const r = record({
      id: 'rec-nyc',
      locale: 'en',
      timezone: 'America/New_York',
      location: { lat: 40.71, lng: -74.01, timezone: 'America/New_York' },
      minutesBefore: 0,
    })
    const nyc = table({
      '2026-10-11': day({ Dhuhr: '12:50 (EDT)' }),
      '2026-10-12': day({ Dhuhr: '12:50 (EDT)' }),
      '2026-10-13': day({ Dhuhr: '12:49 (EDT)' }),
    })
    const dhuhr = utc('2026-10-12T16:50:00Z') // EDT = UTC−4
    const sends = planDispatch([r], dhuhr + 1000, nyc)
    expect(sends).toHaveLength(1)
    expect(sends[0]).toMatchObject({
      recordId: 'rec-nyc',
      notificationId: 'prayer-Dhuhr-2026-10-12',
      fireAt: dhuhr,
      payload: { title: 'Dhuhr', body: 'It\'s time for prayer', url: '/prayer' },
    })
  })

  it('uses Turkish prayer names', () => {
    const sends = planDispatch([record({ locale: 'tr' })], fajrFire + 500, BERLIN_OCT)
    expect(sends[0]!.payload).toMatchObject({ title: 'İmsak', body: '10 dakika içinde' })
  })

  it('fires tomorrow\'s Fajr reminder before midnight (lead time crosses the date)', () => {
    const lookup = table({
      '2026-06-19': day({}),
      '2026-06-20': day({}),
      '2026-06-21': day({ Fajr: '00:20 (CEST)' }),
    })
    const fire = utc('2026-06-20T21:50:00Z') // 2026-06-20 23:50 CEST = 00:20 − 30 min
    const sends = planDispatch([record({ minutesBefore: 30 })], fire + 500, lookup)
    expect(sends.map(s => s.notificationId)).toEqual(['prayer-Fajr-2026-06-21'])
  })

  it('sends Isha after midnight for the previous date (high latitude)', () => {
    const oslo = { Fajr: '01:30', Sunrise: '03:55', Dhuhr: '13:15', Asr: '17:40', Maghrib: '22:40', Isha: '00:30' }
    const lookup = table({ '2026-06-20': oslo, '2026-06-21': oslo, '2026-06-22': oslo })
    const r = record({ location: { lat: 59.91, lng: 10.75, timezone: 'Europe/Oslo' }, minutesBefore: 0 })
    const sends = planDispatch([r], utc('2026-06-20T22:30:00Z') + 500, lookup) // 00:30 on June 21 local
    expect(sends.map(s => s.notificationId)).toEqual(['prayer-Isha-2026-06-20'])
  })

  it('works on the DST change day (Europe/Berlin, 2026-10-25)', () => {
    const lookup = table({
      '2026-10-24': day({ Fajr: '06:10 (CEST)' }),
      '2026-10-25': day({ Fajr: '05:11 (CET)' }),
      '2026-10-26': day({ Fajr: '05:12 (CET)' }),
    })
    const fire = utc('2026-10-25T04:01:00Z') // 05:11 CET − 10 min
    expect(planDispatch([record()], fire + 500, lookup).map(s => s.notificationId)).toEqual(['prayer-Fajr-2026-10-25'])
  })

  it('handles several subscribers, sorted by fire time', () => {
    const a = record({ id: 'a', minutesBefore: 0 })
    const b = record({ id: 'b', minutesBefore: 0, locale: 'en' })
    const sends = planDispatch([a, b], utc('2026-10-12T03:58:00Z') + 500, BERLIN_OCT)
    expect(sends.map(s => s.recordId).sort()).toEqual(['a', 'b'])
    expect(new Set(sends.map(s => s.fireAt)).size).toBe(1)
  })
})

describe('planDispatch — dhikr', () => {
  const dhikrOn = (overrides: Partial<PushRecord['dhikr']> = {}) => ({
    ...record().dhikr, enabled: true, ...overrides,
  })

  it('sends morning adhkar at the wall-clock time of the device timezone', () => {
    const r = record({ prayersEnabled: false, dhikr: dhikrOn(), locale: 'tr' })
    const fire = utc('2026-10-12T05:00:00Z') // 07:00 CEST
    const sends = planDispatch([r], fire + 500, BERLIN_OCT)
    expect(sends).toEqual([{
      recordId: 'rec-berlin',
      notificationId: 'dhikr-morning-2026-10-12',
      fireAt: fire,
      payload: { title: 'Sabah Zikri', body: 'Güne sabah duaları ile başla.', tag: 'push-dhikr-morning-2026-10-12', url: '/dua?cat=morning' },
      ttlSeconds: 7200,
    }])
  })

  it('uses its own timezone even without a location (New York evening)', () => {
    const r = record({ prayersEnabled: false, location: null, timezone: 'America/New_York', dhikr: dhikrOn({ evening: { enabled: true, h: 19, m: 30 } }) })
    const fire = utc('2026-10-12T23:30:00Z') // 19:30 EDT
    const sends = planDispatch([r], fire + 500, () => null)
    expect(sends.map(s => s.notificationId)).toEqual(['dhikr-evening-2026-10-12'])
    expect(sends[0]!.payload.url).toBe('/dua?cat=evening')
  })

  it('skips disabled slots, the master switch and already sent reminders', () => {
    const fire = utc('2026-10-12T05:00:00Z')
    expect(planDispatch([record({ dhikr: dhikrOn({ morning: { enabled: false, h: 7, m: 0 } }) })], fire + 500, BERLIN_OCT)).toEqual([])
    expect(planDispatch([record({ dhikr: { ...dhikrOn(), enabled: false } })], fire + 500, BERLIN_OCT)).toEqual([])
    expect(planDispatch([record({ dhikr: dhikrOn(), sent: { 'dhikr-morning-2026-10-12': fire } })], fire + 500, BERLIN_OCT)).toEqual([])
  })
})

describe('helpers', () => {
  it('prayerMonthsNeeded covers month boundaries in the location timezone', () => {
    // 2026-10-31 23:30 CET (= 22:30Z): yesterday/today/tomorrow → Oct + Nov
    expect(prayerMonthsNeeded(record(), utc('2026-10-31T22:30:00Z'))).toEqual(['2026-10', '2026-11'])
    expect(prayerMonthsNeeded(record(), utc('2026-10-12T10:00:00Z'))).toEqual(['2026-10'])
    expect(prayerMonthsNeeded(record({ prayersEnabled: false }), utc('2026-10-12T10:00:00Z'))).toEqual([])
  })

  it('pruneSent drops entries older than the retention period', () => {
    const now = utc('2026-10-12T10:00:00Z')
    const sent = { old: now - 4 * 86_400_000, recent: now - 3600_000 }
    expect(pruneSent(sent, now)).toEqual({ recent: now - 3600_000 })
  })
})
