import { describe, expect, it } from 'vitest'
import {
  getLesson,
  getPath,
  getTerm,
  glossaryLetter,
  groupByLetter,
  LEARNING_PATHS,
  localize,
  nextLesson,
  normalizeSearch,
  parseBold,
  parseQuranRef,
  prevLesson,
  searchFaq,
  searchGlossary,
  type FaqEntry,
  type GlossaryTerm,
} from '~/data/learn'

const T = (id: string, term: string, extra: Partial<GlossaryTerm> = {}): GlossaryTerm => ({
  id,
  term,
  arabic: extra.arabic ?? 'ك',
  definition: extra.definition ?? { de: `${term} de`, en: `${term} en`, tr: `${term} tr` },
  review: 'draft',
  ...extra,
})

describe('parseBold', () => {
  it('splits bold segments', () => {
    expect(parseBold('a **b** c')).toEqual([
      { text: 'a ', bold: false },
      { text: 'b', bold: true },
      { text: ' c', bold: false },
    ])
  })

  it('handles leading/trailing bold and multiple groups', () => {
    expect(parseBold('**a** and **b**')).toEqual([
      { text: 'a', bold: true },
      { text: ' and ', bold: false },
      { text: 'b', bold: true },
    ])
  })

  it('keeps an unmatched marker literally', () => {
    expect(parseBold('x **y')).toEqual([{ text: 'x **y', bold: false }])
    expect(parseBold('**a** **b')).toEqual([
      { text: 'a', bold: true },
      { text: ' **b', bold: false },
    ])
  })

  it('returns plain text and empty input as-is', () => {
    expect(parseBold('plain')).toEqual([{ text: 'plain', bold: false }])
    expect(parseBold('')).toEqual([])
  })

  it('never interprets HTML (stays plain text)', () => {
    const segs = parseBold('<b>x</b> **<img src=x onerror=alert(1)>**')
    expect(segs.map(s => s.text).join('')).toBe('<b>x</b> <img src=x onerror=alert(1)>')
    expect(segs.some(s => s.bold && s.text.startsWith('<img'))).toBe(true)
  })
})

describe('normalizeSearch', () => {
  it('lower-cases and strips Latin accents', () => {
    expect(normalizeSearch('Ṣalāh')).toBe('salah')
    expect(normalizeSearch('Hadîth')).toBe('hadith')
    expect(normalizeSearch('ÄÖÜ')).toBe('aou')
  })

  it('folds Turkish letters and ß', () => {
    expect(normalizeSearch('Şükür')).toBe('sukur')
    expect(normalizeSearch('ıslam')).toBe('islam')
    expect(normalizeSearch('İslam')).toBe('islam')
    expect(normalizeSearch('Gruß')).toBe('gruss')
  })

  it('removes transliteration marks and treats hyphens as spaces', () => {
    expect(normalizeSearch("Qur'an")).toBe('quran')
    expect(normalizeSearch('ʿIbādah')).toBe('ibadah')
    expect(normalizeSearch('Al-Fatiha')).toBe('al fatiha')
    expect(normalizeSearch('  a   b ')).toBe('a b')
  })

  it('strips Arabic diacritics and unifies letter variants', () => {
    expect(normalizeSearch('تَوْحِيد')).toBe('توحيد')
    expect(normalizeSearch('أَحَد')).toBe('احد')
    expect(normalizeSearch('زَكَاة')).toBe(normalizeSearch('زكاه'))
  })
})

describe('localize', () => {
  const text = { de: 'Hallo', en: 'Hello', tr: 'Merhaba' }
  it('returns the requested locale', () => {
    expect(localize(text, 'en')).toBe('Hello')
    expect(localize(text, 'tr')).toBe('Merhaba')
  })
  it('falls back de → en for unknown or empty locales', () => {
    expect(localize(text, 'fr')).toBe('Hallo')
    expect(localize({ de: '', en: 'Hello', tr: '' }, 'tr')).toBe('Hello')
    expect(localize({ de: '  ', en: 'Hello', tr: 'x' }, 'fr')).toBe('Hello')
  })
  it('falls back ar → en → de', () => {
    expect(localize(text, 'ar')).toBe('Hello')
    expect(localize({ de: 'Hallo', en: '', tr: '' }, 'ar')).toBe('Hallo')
  })
  it('handles missing text', () => {
    expect(localize(undefined, 'de')).toBe('')
  })
})

describe('searchGlossary', () => {
  const terms = [
    T('tawhid', 'Tawhid', { aliases: ['Tauhid', 'Tevhid'], arabic: 'تَوْحِيد' }),
    T('salah', 'Salah', { aliases: ['Salat', 'Namaz'], definition: { de: 'Das Gebet', en: 'The prayer', tr: 'Namaz ibadeti' } }),
    T('zakat', 'Zakat', { definition: { de: 'Almosen-Abgabe', en: 'Almsgiving', tr: 'Mali ibadet' } }),
    T('ihsan', 'Iḥsān', { definition: { de: 'Vollkommenheit im Glauben', en: 'Excellence', tr: 'İhsan' } }),
  ]
  const index = terms.map(term => ({
    term,
    keys: [term.term, ...(term.aliases ?? []), term.arabic].map(normalizeSearch),
    definitions: {
      de: normalizeSearch(localize(term.definition, 'de')),
      en: normalizeSearch(localize(term.definition, 'en')),
      tr: normalizeSearch(localize(term.definition, 'tr')),
    },
    letter: glossaryLetter(term.term),
  }))
  const ids = (q: string, loc = 'de') => searchGlossary(q, loc, index).map(t => t.id)

  it('returns all terms A–Z for an empty query', () => {
    expect(ids('')).toEqual(['ihsan', 'salah', 'tawhid', 'zakat'])
  })
  it('matches term, aliases and Arabic (diacritic-insensitive)', () => {
    expect(ids('tauhid')).toEqual(['tawhid'])
    expect(ids('NAMAZ')).toEqual(['salah'])
    expect(ids('توحيد')).toEqual(['tawhid'])
    expect(ids('تَوْحِيد')).toEqual(['tawhid'])
    expect(ids('ihsan')).toEqual(['ihsan'])
  })
  it('matches the definition in the current locale only', () => {
    expect(ids('gebet', 'de')).toEqual(['salah'])
    expect(ids('prayer', 'de')).toEqual([])
    expect(ids('prayer', 'en')).toEqual(['salah'])
    expect(ids('mali', 'tr')).toEqual(['zakat'])
  })
  it('ranks term matches above definition matches', () => {
    const idx2 = [
      ...index,
      { ...index[0]!, term: T('x', 'Xyz', { definition: { de: 'enthält salah', en: '', tr: '' } }), keys: ['xyz'], definitions: { de: 'enthalt salah', en: '', tr: '' }, letter: 'X' },
    ]
    expect(searchGlossary('salah', 'de', idx2).map(t => t.id)).toEqual(['salah', 'x'])
  })
  it('returns nothing for unknown queries', () => {
    expect(ids('qqqq')).toEqual([])
  })
})

describe('glossary grouping', () => {
  it('derives letters from the normalized term', () => {
    expect(glossaryLetter('Ṣalāh')).toBe('S')
    expect(glossaryLetter('İhsan')).toBe('I')
    expect(glossaryLetter('ʿUmrah')).toBe('U')
    expect(glossaryLetter('')).toBe('#')
  })
  it('groups A–Z with # last', () => {
    const groups = groupByLetter([T('b', 'Bismillah'), T('a', 'Adhan'), T('a2', 'Aqida'), T('n', '1st')])
    expect(groups.map(g => g.letter)).toEqual(['A', 'B', '#'])
    expect(groups[0]!.terms.map(t => t.id)).toEqual(['a', 'a2'])
  })
})

describe('searchFaq', () => {
  const entries: FaqEntry[] = [
    { id: 'a', category: 'prayer', question: { de: 'Wie bete ich?', en: 'How do I pray?', tr: 'Nasıl namaz kılarım?' }, answer: { de: 'Mit Wudu', en: 'With wudu', tr: 'Abdestle' }, sources: ['x'], review: 'draft' },
    { id: 'b', category: 'food', question: { de: 'Ist das erlaubt?', en: 'Is this allowed?', tr: 'Caiz mi?' }, answer: { de: 'Halal Fleisch', en: 'Halal meat', tr: 'Helal et' }, sources: ['x'], review: 'draft' },
  ]
  it('filters by category and query (question + answer, accent-insensitive)', () => {
    expect(searchFaq('', 'de', 'all', entries).map(e => e.id)).toEqual(['a', 'b'])
    expect(searchFaq('', 'de', 'food', entries).map(e => e.id)).toEqual(['b'])
    expect(searchFaq('wudu', 'de', 'all', entries).map(e => e.id)).toEqual(['a'])
    expect(searchFaq('nasil', 'tr', 'all', entries).map(e => e.id)).toEqual(['a'])
    expect(searchFaq('wudu', 'de', 'food', entries)).toEqual([])
  })
})

describe('parseQuranRef', () => {
  it('parses single verses and ranges', () => {
    expect(parseQuranRef('2:255')).toEqual({ surah: 2, from: 255, to: 255 })
    expect(parseQuranRef('112:1-4')).toEqual({ surah: 112, from: 1, to: 4 })
  })
  it('rejects malformed refs and surahs out of range', () => {
    expect(parseQuranRef('0:1')).toBeNull()
    expect(parseQuranRef('115:1')).toBeNull()
    expect(parseQuranRef('2')).toBeNull()
    expect(parseQuranRef('2:1-')).toBeNull()
    expect(parseQuranRef('a:b')).toBeNull()
  })
})

describe('lookup helpers', () => {
  const path = LEARNING_PATHS[0]!
  const first = path.lessons[0]!
  const second = path.lessons[1]

  it('finds paths, lessons and terms', () => {
    expect(getPath(path.id)).toBe(path)
    expect(getPath('nope')).toBeUndefined()
    expect(getLesson(path.id, first.id)).toBe(first)
    expect(getLesson(path.id, 'nope')).toBeUndefined()
    expect(getTerm('nope')).toBeUndefined()
  })

  it('navigates between lessons', () => {
    expect(prevLesson(path.id, first.id)).toBeUndefined()
    if (second) {
      expect(nextLesson(path.id, first.id)).toBe(second)
      expect(prevLesson(path.id, second.id)).toBe(first)
    }
    const last = path.lessons[path.lessons.length - 1]!
    expect(nextLesson(path.id, last.id)).toBeUndefined()
    expect(nextLesson('nope', 'x')).toBeUndefined()
  })
})
