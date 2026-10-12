import type { LearningPath } from '../types'

// PLACEHOLDER — replaced by the real content on merge. No logic here.
export const BASICS_PATH: LearningPath = {
  id: 'basics',
  icon: 'learn',
  level: 'discover',
  title: { de: 'Grundlagen des Islam', en: 'Foundations of Islam', tr: 'İslam\'ın Temelleri' },
  description: {
    de: 'Die fünf Säulen und die wichtigsten Begriffe einfach erklärt.',
    en: 'The five pillars and the most important terms, explained simply.',
    tr: 'Beş şart ve en önemli kavramlar basitçe anlatılır.',
  },
  lessons: [
    {
      id: 'five-pillars',
      title: { de: 'Die fünf Säulen', en: 'The five pillars', tr: 'Beş şart' },
      summary: { de: 'Ein Überblick über die fünf Säulen.', en: 'An overview of the five pillars.', tr: 'Beş şartın genel bir özeti.' },
      minutes: 5,
      blocks: [
        { type: 'text', text: { de: 'Der Islam ruht auf **fünf Säulen**: Glaubensbekenntnis, Gebet, Zakat, Fasten und Hadsch.', en: 'Islam rests on **five pillars**: the declaration of faith, prayer, zakat, fasting and hajj.', tr: 'İslam **beş şart** üzerine kuruludur: şehadet, namaz, zekât, oruç ve hac.' } },
        { type: 'heading', text: { de: 'Die Grundlage', en: 'The foundation', tr: 'Temel' } },
        { type: 'list', items: [
          { de: 'Schahada', en: 'Shahada', tr: 'Şehadet' },
          { de: 'Salat', en: 'Salah', tr: 'Namaz' },
        ] },
        { type: 'quran', ref: '112:1-4', arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', translation: { de: 'Sprich: Er ist Allah, der Eine.', en: 'Say: He is Allah, the One.', tr: 'De ki: O, Allah\'tır, bir tektir.' } },
        { type: 'hadith', source: 'Sahih al-Bukhari 8, Sahih Muslim 16', narrator: 'Ibn Umar', text: { de: 'Der Islam ist auf fünf Dinge gegründet.', en: 'Islam is built on five things.', tr: 'İslam beş şey üzerine bina edilmiştir.' }, grade: 'sahih' },
        { type: 'note', variant: 'tip', text: { de: 'Beginne mit einer Säule nach der anderen.', en: 'Start with one pillar at a time.', tr: 'Her seferinde bir şartla başla.' } },
        { type: 'note', variant: 'differences', text: { de: 'Bei Details gibt es Unterschiede zwischen den Rechtsschulen.', en: 'Details differ between the schools of law.', tr: 'Ayrıntılarda mezhepler arasında farklar vardır.' } },
        { type: 'terms', ids: ['tawhid', 'salah'] },
        { type: 'link', to: '/guide', label: { de: 'Gebetsanleitung öffnen', en: 'Open the prayer guide', tr: 'Namaz rehberini aç' } },
      ],
      quiz: [
        {
          question: { de: 'Wie viele Säulen hat der Islam?', en: 'How many pillars does Islam have?', tr: 'İslam\'ın kaç şartı vardır?' },
          options: [
            { de: 'Drei', en: 'Three', tr: 'Üç' },
            { de: 'Fünf', en: 'Five', tr: 'Beş' },
            { de: 'Sieben', en: 'Seven', tr: 'Yedi' },
          ],
          answer: 1,
          explanation: { de: 'Es sind fünf Säulen.', en: 'There are five pillars.', tr: 'Beş şart vardır.' },
        },
      ],
      sources: ['Sahih al-Bukhari 8', 'Sahih Muslim 16'],
      review: 'draft',
    },
    {
      id: 'tawhid-intro',
      title: { de: 'Tawhid – Die Einheit Gottes', en: 'Tawhid – the oneness of God', tr: 'Tevhid – Allah\'ın birliği' },
      summary: { de: 'Der Kern des islamischen Glaubens.', en: 'The core of the Islamic faith.', tr: 'İslam inancının özü.' },
      minutes: 4,
      blocks: [
        { type: 'text', text: { de: 'Tawhid bedeutet, Allah als den **Einen** zu bekennen.', en: 'Tawhid means affirming Allah as the **One**.', tr: 'Tevhid, Allah\'ı **bir** bilmektir.' } },
      ],
      sources: ['Quran 112:1-4'],
      review: 'draft',
    },
  ],
}
