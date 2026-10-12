import { describe, expect, it } from 'vitest'
import {
  isAllowedPushEndpoint,
  roundCoord,
  validateEndpointBody,
  validatePrefs,
  validateSubscribeBody,
  validateSubscription,
  validateUpdateBody,
} from '../../shared/push/validate'

const ENDPOINT = 'https://fcm.googleapis.com/fcm/send/abc123:APA91bHxyz'

const subscription = () => ({
  endpoint: ENDPOINT,
  expirationTime: null,
  keys: {
    p256dh: 'BNcRdreALRFXTkOOUHK1EtK2wtaz5Ry4YfYCA_0QTpQtUbVlUls0VJXg7A8u-Ts1XbjhazAkj7I99e8QcYP7DkM',
    auth: 'tBHItJI5svbpez7KI4CCXg',
  },
})

const prefs = (): Record<string, any> => ({
  locale: 'de',
  timezone: 'Europe/Berlin',
  location: { lat: 52.520008, lng: 13.404954, timezone: 'Europe/Berlin' },
  prayerParams: {
    method: 13,
    school: 0,
    latitudeAdjustmentMethod: 3,
    adjustments: { Fajr: 0, Sunrise: 0, Dhuhr: 2, Asr: 0, Maghrib: -1, Isha: 0 },
  },
  prayersEnabled: true,
  prayers: { Fajr: true, Dhuhr: true, Asr: false, Maghrib: true, Isha: true },
  minutesBefore: 10,
  dhikr: {
    enabled: true,
    morning: { enabled: true, h: 7, m: 0 },
    evening: { enabled: false, h: 19, m: 30 },
  },
})

describe('push endpoint allow-list', () => {
  it.each([
    'https://fcm.googleapis.com/fcm/send/x',
    'https://android.googleapis.com/gcm/send/x',
    'https://updates.push.services.mozilla.com/wpush/v2/x',
    'https://web.push.apple.com/QGx',
    'https://wns2-par02p.notify.windows.com/w/?token=x',
  ])('accepts %s', (url) => {
    expect(isAllowedPushEndpoint(url)).toBe(true)
  })

  it.each([
    'http://fcm.googleapis.com/fcm/send/x', // not https
    'https://evil.example.com/push',
    'https://googleapis.com.evil.com/x', // suffix trick
    'https://evilgoogleapis.com/x', // no dot boundary
    'https://169.254.169.254/latest/meta-data',
    'https://localhost/x',
    'https://fcm.googleapis.com:8443/x', // custom port
    'https://user:pw@fcm.googleapis.com/x', // credentials
    'not a url',
    `https://fcm.googleapis.com/${'a'.repeat(3000)}`,
    42,
    null,
  ])('rejects %s', (url) => {
    expect(isAllowedPushEndpoint(url)).toBe(false)
  })
})

describe('validateSubscription', () => {
  it('accepts a browser PushSubscription JSON', () => {
    const result = validateSubscription(subscription())
    expect(result).toEqual({ ok: true, value: subscription() })
  })

  it('rejects missing/invalid keys', () => {
    expect(validateSubscription({ ...subscription(), keys: undefined }).ok).toBe(false)
    expect(validateSubscription({ ...subscription(), keys: { p256dh: 'short', auth: 'tBHItJI5svbpez7KI4CCXg' } }).ok).toBe(false)
    expect(validateSubscription({ ...subscription(), keys: { p256dh: subscription().keys.p256dh, auth: 'has spaces in it!' } }).ok).toBe(false)
    expect(validateSubscription({ ...subscription(), expirationTime: 'soon' }).ok).toBe(false)
  })

  it('drops unknown fields', () => {
    const result = validateSubscription({ ...subscription(), extra: 'x' })
    expect(result.ok && 'extra' in result.value).toBe(false)
  })
})

describe('validatePrefs', () => {
  it('accepts valid prefs and rounds coordinates to 2 decimals', () => {
    const result = validatePrefs(prefs())
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.value.location).toEqual({ lat: 52.52, lng: 13.4, timezone: 'Europe/Berlin' })
    expect(result.value.prayerParams.adjustments.Dhuhr).toBe(2)
    expect(result.value.prayers.Asr).toBe(false)
  })

  it('accepts a missing location and a null high-latitude rule', () => {
    const p = prefs()
    p.location = null
    p.prayerParams.latitudeAdjustmentMethod = null
    const result = validatePrefs(p)
    expect(result.ok && result.value.location).toBe(null)
    expect(result.ok && result.value.prayerParams.latitudeAdjustmentMethod).toBe(null)
  })

  it('drops unknown keys (never stored)', () => {
    const result = validatePrefs({ ...prefs(), email: 'x@example.com', city: 'Berlin' })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value).not.toHaveProperty('email')
      expect(result.value).not.toHaveProperty('city')
    }
  })

  const cases: Array<[string, (p: Record<string, any>) => void, string]> = [
    ['locale', p => { p.locale = 'fr' }, 'invalid_locale'],
    ['device timezone', p => { p.timezone = 'Mars/Olympus' }, 'invalid_timezone'],
    ['location timezone', p => { p.location.timezone = '../../etc' }, 'invalid_timezone'],
    ['latitude', p => { p.location.lat = 91 }, 'invalid_location'],
    ['longitude NaN', p => { p.location.lng = Number.NaN }, 'invalid_location'],
    ['method', p => { p.prayerParams.method = 99 }, 'invalid_method'],
    ['school', p => { p.prayerParams.school = 2 }, 'invalid_school'],
    ['high-latitude rule', p => { p.prayerParams.latitudeAdjustmentMethod = 7 }, 'invalid_latitude_adjustment'],
    ['adjustment > 30', p => { p.prayerParams.adjustments.Fajr = 31 }, 'invalid_adjustments'],
    ['adjustment not integer', p => { p.prayerParams.adjustments.Isha = 1.5 }, 'invalid_adjustments'],
    ['prayers missing one', p => { delete p.prayers.Isha }, 'invalid_prayers'],
    ['prayersEnabled', p => { p.prayersEnabled = 'yes' }, 'invalid_prayers_enabled'],
    ['minutesBefore', p => { p.minutesBefore = 120 }, 'invalid_minutes_before'],
    ['dhikr hour', p => { p.dhikr.morning.h = 24 }, 'invalid_dhikr'],
    ['dhikr minute', p => { p.dhikr.evening.m = -1 }, 'invalid_dhikr'],
  ]
  it.each(cases)('rejects invalid %s', (_name, mutate, error) => {
    const p = prefs()
    mutate(p)
    expect(validatePrefs(p)).toEqual({ ok: false, error })
  })
})

describe('request bodies', () => {
  it('subscribe: { subscription, prefs }', () => {
    const result = validateSubscribeBody({ subscription: subscription(), prefs: prefs() })
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.value.oldEndpoint).toBe(null)
  })

  it('subscribe: { subscription, oldEndpoint } without prefs (SW re-subscribe)', () => {
    const result = validateSubscribeBody({ subscription: subscription(), oldEndpoint: 'https://fcm.googleapis.com/fcm/send/old' })
    expect(result).toEqual({
      ok: true,
      value: { subscription: subscription(), prefs: null, oldEndpoint: 'https://fcm.googleapis.com/fcm/send/old' },
    })
  })

  it('subscribe: rejects missing prefs without oldEndpoint, and forged oldEndpoint', () => {
    expect(validateSubscribeBody({ subscription: subscription() }).ok).toBe(false)
    expect(validateSubscribeBody({ subscription: subscription(), oldEndpoint: 'https://evil.example.com' }).ok).toBe(false)
    expect(validateSubscribeBody([]).ok).toBe(false)
  })

  it('update / unsubscribe / test bodies require an allowed endpoint', () => {
    expect(validateUpdateBody({ endpoint: ENDPOINT, prefs: prefs() }).ok).toBe(true)
    expect(validateUpdateBody({ endpoint: 'https://evil.example.com', prefs: prefs() }).ok).toBe(false)
    expect(validateEndpointBody({ endpoint: ENDPOINT })).toEqual({ ok: true, value: { endpoint: ENDPOINT } })
    expect(validateEndpointBody({}).ok).toBe(false)
    expect(validateEndpointBody('x').ok).toBe(false)
  })

  it('roundCoord rounds to ~1 km', () => {
    expect(roundCoord(47.67891)).toBe(47.68)
    expect(roundCoord(-73.98561)).toBe(-73.99)
  })
})
