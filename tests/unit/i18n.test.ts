import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'
import { ALLAH_NAMES } from '~/data/allah-names'
import { DUA_CATEGORIES } from '~/data/duas'
import { HADITH_CATEGORIES } from '~/data/hadiths'
import { NAME_CATEGORIES } from '~/data/allah-names'
import { SEERAH_CATEGORIES } from '~/data/seerah'

const ROOT = join(__dirname, '..', '..')
const APP_DIR = join(ROOT, 'app')
const LOCALES = ['de', 'en', 'tr'] as const

type Json = { [k: string]: Json | string }

function load(locale: string): Json {
  return JSON.parse(readFileSync(join(ROOT, 'i18n', `${locale}.json`), 'utf8'))
}

function flatten(obj: Json, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k
    if (v !== null && typeof v === 'object') Object.assign(out, flatten(v, key))
    else out[key] = v as string
  }
  return out
}

function walk(dir: string, exts: string[]): string[] {
  const files: string[] = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) files.push(...walk(p, exts))
    else if (exts.some(e => name.endsWith(e))) files.push(p)
  }
  return files
}

const messages = Object.fromEntries(LOCALES.map(l => [l, flatten(load(l))])) as Record<typeof LOCALES[number], Record<string, string>>

describe('i18n parity', () => {
  it('de, en and tr have identical key sets', () => {
    const de = Object.keys(messages.de).sort()
    for (const l of ['en', 'tr'] as const) {
      const keys = new Set(Object.keys(messages[l]))
      const missing = de.filter(k => !keys.has(k))
      const extra = [...keys].filter(k => !(k in messages.de))
      expect({ locale: l, missing, extra }).toEqual({ locale: l, missing: [], extra: [] })
    }
  })

  // Keys that are intentionally empty in some locales (e.g. German "Uhr" suffix after a clock time).
  const ALLOWED_EMPTY = new Set(['prayer.clock'])

  it('has no empty values (except the documented allow-list)', () => {
    for (const l of LOCALES) {
      const empty = Object.entries(messages[l])
        .filter(([k, v]) => !ALLOWED_EMPTY.has(k) && (typeof v !== 'string' || v.trim() === ''))
        .map(([k]) => k)
      expect({ locale: l, empty }).toEqual({ locale: l, empty: [] })
    }
  })

  it('uses the same {placeholders} in every locale', () => {
    const ph = (s: string) => [...new Set([...s.matchAll(/\{(\w+)\}/g)].map(m => m[1]))].sort().join(',')
    const mismatches: string[] = []
    for (const [key, de] of Object.entries(messages.de)) {
      for (const l of ['en', 'tr'] as const) {
        const other = messages[l][key]
        if (other !== undefined && ph(de) !== ph(other)) mismatches.push(`${l}:${key}`)
      }
    }
    expect(mismatches).toEqual([])
  })
})

describe('i18n key usage', () => {
  const sources = walk(APP_DIR, ['.vue', '.ts'])
  const literalKeys = new Map<string, string>() // key -> first file using it

  for (const file of sources) {
    const src = readFileSync(file, 'utf8')
    // t('a.b'), $t("a.b"), i18n.t('a.b') — only plain string literals
    for (const m of src.matchAll(/(?:^|[^\w])t\(\s*(['"])([A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)+)\1/g)) {
      if (!literalKeys.has(m[2]!)) literalKeys.set(m[2]!, relative(ROOT, file))
    }
    // data-driven keys: i18nKey: 'x.y', titleKey: 'x.y', descKey, nameKey, labelKey
    for (const m of src.matchAll(/\b(?:i18nKey|titleKey|descKey|nameKey|labelKey)\s*:\s*(['"])([A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)+)\1/g)) {
      if (!literalKeys.has(m[2]!)) literalKeys.set(m[2]!, relative(ROOT, file))
    }
  }

  it('finds a plausible number of literal keys (guards against a broken scanner)', () => {
    expect(literalKeys.size).toBeGreaterThan(150)
  })

  it('every literal key used in app/**/*.vue|ts exists in de.json', () => {
    const missing = [...literalKeys].filter(([k]) => !(k in messages.de)).map(([k, f]) => `${k}  (${f})`)
    expect(missing).toEqual([])
  })

  it('every literal key exists in en.json and tr.json too', () => {
    for (const l of ['en', 'tr'] as const) {
      const missing = [...literalKeys.keys()].filter(k => !(k in messages[l]))
      expect({ locale: l, missing }).toEqual({ locale: l, missing: [] })
    }
  })

  it('dynamic category keys exist for every category', () => {
    const expected = [
      ...DUA_CATEGORIES.map(c => `dua.cat_${c}`),
      ...HADITH_CATEGORIES.map(c => `hadith.cat_${c}`),
      ...NAME_CATEGORIES.map(c => `names.cat_${c}`),
      ...SEERAH_CATEGORIES.map(c => `seerah.cat_${c}`),
    ]
    const missing = expected.filter(k => !(k in messages.de))
    expect(missing).toEqual([])
    expect(ALLAH_NAMES.every(n => (NAME_CATEGORIES as readonly string[]).includes(n.category))).toBe(true)
  })

  it('prayer.* names used with dynamic keys exist', () => {
    for (const p of ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha']) {
      expect(messages.de[`prayer.${p}`], `prayer.${p}`).toBeTruthy()
    }
  })
})
