import type { LearningPath } from '../types'

// PLACEHOLDER — replaced by the real content on merge. No logic here.
export const NEW_MUSLIM_PATH: LearningPath = {
  id: 'new-muslim',
  icon: 'heart',
  level: 'discover',
  title: { de: 'Neu im Islam', en: 'New to Islam', tr: 'İslam\'a yeni' },
  description: {
    de: 'Ein sanfter Einstieg für Neumuslime und Interessierte.',
    en: 'A gentle start for new Muslims and the curious.',
    tr: 'Yeni Müslümanlar ve meraklılar için yumuşak bir başlangıç.',
  },
  lessons: [
    {
      id: 'first-steps',
      title: { de: 'Die ersten Schritte', en: 'First steps', tr: 'İlk adımlar' },
      summary: { de: 'Was du jetzt wissen musst.', en: 'What you need to know now.', tr: 'Şimdi bilmen gerekenler.' },
      minutes: 4,
      blocks: [
        { type: 'text', text: { de: 'Mach dir keinen Druck: **Schritt für Schritt** ist der beste Weg.', en: 'No pressure: **step by step** is the best way.', tr: 'Baskı yok: **adım adım** en iyi yoldur.' } },
        { type: 'terms', ids: ['salah'] },
      ],
      quiz: [
        {
          question: { de: 'Muss man alles sofort lernen?', en: 'Must you learn everything at once?', tr: 'Her şeyi hemen öğrenmek gerekir mi?' },
          options: [
            { de: 'Ja', en: 'Yes', tr: 'Evet' },
            { de: 'Nein', en: 'No', tr: 'Hayır' },
          ],
          answer: 1,
          explanation: { de: 'Schritt für Schritt.', en: 'Step by step.', tr: 'Adım adım.' },
        },
      ],
      sources: ['Sahih al-Bukhari 39'],
      review: 'draft',
    },
  ],
}
