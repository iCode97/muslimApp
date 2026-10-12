import type { GlossaryTerm } from './types'

// PLACEHOLDER — replaced by the real content on merge. No logic here.
export const GLOSSARY: GlossaryTerm[] = [
  {
    id: 'tawhid',
    term: 'Tawhid',
    arabic: 'تَوْحِيد',
    aliases: ['Tauhid', 'Tevhid'],
    definition: { de: 'Die Einheit und Einzigkeit Allahs.', en: 'The oneness and uniqueness of Allah.', tr: 'Allah\'ın birliği ve tekliği.' },
    related: ['salah'],
    review: 'draft',
  },
  {
    id: 'salah',
    term: 'Salah',
    arabic: 'صَلَاة',
    aliases: ['Salat', 'Namaz'],
    definition: { de: 'Das rituelle Gebet, fünfmal täglich.', en: 'The ritual prayer, five times a day.', tr: 'Günde beş vakit kılınan ibadet.' },
    related: ['tawhid'],
    review: 'draft',
  },
  {
    id: 'zakat',
    term: 'Zakat',
    arabic: 'زَكَاة',
    aliases: ['Zekat'],
    definition: { de: 'Die verpflichtende Almosenabgabe.', en: 'The obligatory almsgiving.', tr: 'Farz olan mali ibadet.' },
    review: 'draft',
  },
]
