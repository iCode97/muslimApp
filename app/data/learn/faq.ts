import type { FaqEntry } from './types'

// PLACEHOLDER — replaced by the real content on merge. No logic here.
export const FAQ: FaqEntry[] = [
  {
    id: 'must-learn-arabic',
    category: 'new-muslim',
    question: { de: 'Muss ich Arabisch lernen?', en: 'Do I have to learn Arabic?', tr: 'Arapça öğrenmek zorunda mıyım?' },
    answer: { de: 'Nicht sofort. Für das Gebet lernst du nach und nach die nötigen Suren und Formeln.', en: 'Not right away. For prayer you gradually learn the necessary surahs and phrases.', tr: 'Hemen değil. Namaz için gerekli sureleri ve ifadeleri zamanla öğrenirsin.' },
    sources: ['Quran 2:286'],
    review: 'draft',
  },
  {
    id: 'combine-prayers',
    category: 'prayer',
    question: { de: 'Darf man Gebete zusammenlegen?', en: 'May prayers be combined?', tr: 'Namazlar birleştirilebilir mi?' },
    answer: { de: 'Das hängt von der Situation und der Rechtsschule ab.', en: 'It depends on the situation and the school of law.', tr: 'Duruma ve mezhebe göre değişir.' },
    sources: ['Sahih Muslim 705'],
    scholarlyDifference: true,
    review: 'draft',
  },
]
