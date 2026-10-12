import { describe, expect, it } from 'vitest'
import {
  JUZ_STARTS,
  RECITERS,
  clampSpeed,
  inRange,
  juzOf,
  juzStart,
  makeVerseKey,
  normalizeAudioSettings,
  normalizeRange,
  normalizeReaderSettings,
  parseVerseKey,
  parseVerseTarget,
  resolveAudioUrl,
  sanitizeQuranHtml,
  stripHtml,
  verseAudioUrl,
  verseLink,
  wordAudioUrl,
} from '~/utils/quran'

describe('verse keys', () => {
  it('parses valid keys', () => {
    expect(parseVerseKey('2:255')).toEqual({ surah: 2, verse: 255 })
    expect(parseVerseKey(' 114:6 ')).toEqual({ surah: 114, verse: 6 })
  })

  it.each(['', '2', '2:', ':3', '0:1', '115:1', '2:0', '2:x', 'a:b', '2:255:1', null, undefined, 5])('rejects %s', (v) => {
    expect(parseVerseKey(v)).toBeNull()
  })

  it('round-trips through makeVerseKey', () => {
    expect(parseVerseKey(makeVerseKey(36, 58))).toEqual({ surah: 36, verse: 58 })
  })
})

describe('deep link parsing', () => {
  it('reads ?verse= and #hash variants', () => {
    expect(parseVerseTarget('255')).toBe(255)
    expect(parseVerseTarget(['7', '9'])).toBe(7)
    expect(parseVerseTarget(undefined, '#255')).toBe(255)
    expect(parseVerseTarget(undefined, '#v12')).toBe(12)
    expect(parseVerseTarget(undefined, '#verse-3')).toBe(3)
  })

  it('prefers the query over the hash', () => {
    expect(parseVerseTarget('5', '#9')).toBe(5)
  })

  it('ignores garbage', () => {
    expect(parseVerseTarget('abc', '#xyz')).toBeNull()
    expect(parseVerseTarget('0')).toBeNull()
    expect(parseVerseTarget('-4')).toBeNull()
    expect(parseVerseTarget('1234')).toBeNull()
    expect(parseVerseTarget(undefined, '')).toBeNull()
    expect(parseVerseTarget(null, null)).toBeNull()
  })

  it('falls back to the hash when the query is invalid', () => {
    expect(parseVerseTarget('nope', '#8')).toBe(8)
  })

  it('builds links', () => {
    expect(verseLink(2, 255)).toBe('/quran/2?verse=255')
    expect(verseLink(2, 1)).toBe('/quran/2')
    expect(verseLink(2)).toBe('/quran/2')
  })
})

describe('audio urls', () => {
  it('resolves relative, protocol-relative and absolute paths', () => {
    expect(verseAudioUrl('Alafasy/mp3/001001.mp3')).toBe('https://verses.quran.com/Alafasy/mp3/001001.mp3')
    expect(verseAudioUrl('//mirrors.quranicaudio.com/everyayah/Husary_64kbps/001001.mp3'))
      .toBe('https://mirrors.quranicaudio.com/everyayah/Husary_64kbps/001001.mp3')
    expect(resolveAudioUrl('https://example.com/a.mp3')).toBe('https://example.com/a.mp3')
    expect(wordAudioUrl('wbw/001_001_001.mp3')).toBe('https://audio.qurancdn.com/wbw/001_001_001.mp3')
  })

  it('clamps playback speed', () => {
    expect(clampSpeed(0.1)).toBe(0.75)
    expect(clampSpeed(5)).toBe(1.5)
    expect(clampSpeed(1.25)).toBe(1.25)
    expect(clampSpeed('x')).toBe(1)
  })

  it('has unique reciter ids', () => {
    expect(new Set(RECITERS.map(r => r.id)).size).toBe(RECITERS.length)
  })
})

describe('settings normalisation', () => {
  it('falls back to defaults on garbage', () => {
    expect(normalizeAudioSettings(null)).toEqual({ speed: 1, repeatCount: 1, continueNext: true })
    expect(normalizeAudioSettings({ speed: 9, repeatCount: 4, continueNext: 'yes' }))
      .toEqual({ speed: 1.5, repeatCount: 1, continueNext: true })
    expect(normalizeAudioSettings({ speed: 0.75, repeatCount: 0, continueNext: false }))
      .toEqual({ speed: 0.75, repeatCount: 0, continueNext: false })
  })

  it('clamps reader sizes and filters unknown translations / tafsirs', () => {
    const s = normalizeReaderSettings({ arabicSize: 999, translationSize: 1, translations: [52, 99, 52, 20], tafsirId: 1 })
    expect(s.arabicSize).toBe(48)
    expect(s.translationSize).toBe(12)
    expect(s.translations).toEqual([52, 20])
    expect(s.tafsirId).toBe(169)
    expect(normalizeReaderSettings(undefined).translations).toBeNull()
    expect(normalizeReaderSettings({ translations: [] }).translations).toEqual([])
  })
})

describe('sanitizeQuranHtml', () => {
  it('keeps whitelisted tags without attributes', () => {
    expect(sanitizeQuranHtml('<h2>Title</h2><p class="x" style="color:red">A <b>b</b> <em onclick="x()">c</em></p>'))
      .toBe('<h2>Title</h2><p>A <b>b</b> <em>c</em></p>')
  })

  it('removes script/style with their content', () => {
    expect(sanitizeQuranHtml('a<script>alert(1)</script>b<style>p{}</style>c')).toBe('abc')
    expect(sanitizeQuranHtml('a<script>alert(1)')).toBe('a')
    expect(sanitizeQuranHtml('<iframe src="x"></iframe>ok')).toBe('ok')
  })

  it('strips non-whitelisted tags but keeps their text', () => {
    expect(sanitizeQuranHtml('<a href="javascript:alert(1)">link</a> <img src=x onerror=alert(1)> <div>d</div>'))
      .toBe('link  d')
  })

  it('neutralises broken / unterminated tags and stray brackets', () => {
    const out = sanitizeQuranHtml('1 < 2 > 0 <img src=x onerror=alert(1)')
    expect(out).not.toMatch(/<img/i)
    expect(out).toBe('1 &lt; 2 &gt; 0 &lt;img src=x onerror=alert(1)')
  })

  it('does not get fooled by > inside quoted attribute values', () => {
    expect(sanitizeQuranHtml('<span title="a>b" onmouseover="x">t</span>')).toBe('<span>t</span>')
  })

  it('handles case and self-closing variants', () => {
    expect(sanitizeQuranHtml('<P>a<BR/>b<br>c</P>')).toBe('<p>a<br>b<br>c</p>')
  })

  it('re-balances tags', () => {
    expect(sanitizeQuranHtml('<ul><li>a<li>b</ul>')).toBe('<ul><li>a<li>b</li></li></ul>')
    expect(sanitizeQuranHtml('</p>x<p>y')).toBe('x<p>y</p>')
  })

  it('drops comments and handles non-strings', () => {
    expect(sanitizeQuranHtml('a<!-- <script>x</script> -->b')).toBe('ab')
    expect(sanitizeQuranHtml(undefined)).toBe('')
    expect(sanitizeQuranHtml(42)).toBe('')
  })

  it('keeps entities as-is', () => {
    expect(sanitizeQuranHtml('<p>a &amp; b &lt;script&gt;</p>')).toBe('<p>a &amp; b &lt;script&gt;</p>')
  })

  it('stripHtml removes all tags', () => {
    expect(stripHtml('<b>Bismi</b> <i>Allah</i>')).toBe('Bismi Allah')
    expect(stripHtml(null)).toBe('')
  })
})

describe('juz table', () => {
  it('has 30 monotonically increasing starts', () => {
    expect(JUZ_STARTS).toHaveLength(30)
    for (let i = 1; i < 30; i++) {
      const [ps, pv] = JUZ_STARTS[i - 1]!
      const [s, v] = JUZ_STARTS[i]!
      expect(s > ps || (s === ps && v > pv)).toBe(true)
    }
  })

  it('maps verses to juz', () => {
    expect(juzStart(1)).toEqual({ surah: 1, verse: 1 })
    expect(juzStart(30)).toEqual({ surah: 78, verse: 1 })
    expect(juzStart(31)).toBeNull()
    expect(juzOf(1, 7)).toBe(1)
    expect(juzOf(2, 141)).toBe(1)
    expect(juzOf(2, 142)).toBe(2)
    expect(juzOf(2, 255)).toBe(3)
    expect(juzOf(114, 6)).toBe(30)
  })
})

describe('ranges', () => {
  it('normalises order and bounds', () => {
    expect(normalizeRange({ surah: 2, from: 9, to: 3 }, 286)).toEqual({ surah: 2, from: 3, to: 9 })
    expect(normalizeRange({ surah: 1, from: 0, to: 99 }, 7)).toEqual({ surah: 1, from: 1, to: 7 })
    expect(normalizeRange(null, 7)).toBeNull()
  })

  it('inRange only matches the same surah', () => {
    const r = { surah: 2, from: 3, to: 5 }
    expect(inRange(r, 2, 4)).toBe(true)
    expect(inRange(r, 2, 6)).toBe(false)
    expect(inRange(r, 3, 4)).toBe(false)
    expect(inRange(null, 2, 4)).toBe(false)
  })
})
