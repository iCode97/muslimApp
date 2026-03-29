/**
 * Prayer Learning Guide — Step-by-step instructions for Islamic prayers.
 * Covers Wudu (ablution) and the complete prayer (Salah) with positions,
 * Arabic text, transliteration, and translations in DE/EN/TR.
 */

export interface PrayerStep {
  id: number
  position: string // emoji representing the position
  arabicText?: string
  transliteration?: string
  translations: {
    de: string
    en: string
    tr: string
  }
  instruction: {
    de: string
    en: string
    tr: string
  }
  repetitions?: number
}

export interface PrayerGuideSection {
  id: string
  icon: string
  titleKey: string // i18n key
  descKey: string  // i18n key
  steps: PrayerStep[]
}

export const WUDU_GUIDE: PrayerGuideSection = {
  id: 'wudu',
  icon: '💧',
  titleKey: 'guide.wuduTitle',
  descKey: 'guide.wuduDesc',
  steps: [
    {
      id: 1,
      position: '🤲',
      instruction: {
        de: 'Fasse die Absicht (Niyyah) im Herzen, die Gebetswaschung zu verrichten. Sage "Bismillah".',
        en: 'Make the intention (Niyyah) in your heart to perform Wudu. Say "Bismillah".',
        tr: 'Abdest almak için kalbinizde niyet edin. "Bismillah" deyin.',
      },
      arabicText: 'بِسْمِ ٱللَّهِ',
      transliteration: 'Bismillah',
      translations: {
        de: 'Im Namen Allahs',
        en: 'In the name of Allah',
        tr: 'Allah\'ın adıyla',
      },
    },
    {
      id: 2,
      position: '🖐️',
      instruction: {
        de: 'Wasche beide Hände bis zu den Handgelenken dreimal.',
        en: 'Wash both hands up to the wrists three times.',
        tr: 'Her iki elinizi bileklere kadar üç kez yıkayın.',
      },
      repetitions: 3,
      translations: { de: '', en: '', tr: '' },
    },
    {
      id: 3,
      position: '👄',
      instruction: {
        de: 'Spüle den Mund dreimal aus (Madmada).',
        en: 'Rinse the mouth three times (Madmada).',
        tr: 'Ağzınıza üç kez su alıp çalkalayın (Mazmaza).',
      },
      repetitions: 3,
      translations: { de: '', en: '', tr: '' },
    },
    {
      id: 4,
      position: '👃',
      instruction: {
        de: 'Reinige die Nase dreimal, indem du Wasser einziehst und ausbläst (Istinshaq).',
        en: 'Clean the nose three times by sniffing water and blowing it out (Istinshaq).',
        tr: 'Burnunuza üç kez su çekin ve sümkürün (İstinşak).',
      },
      repetitions: 3,
      translations: { de: '', en: '', tr: '' },
    },
    {
      id: 5,
      position: '😊',
      instruction: {
        de: 'Wasche das Gesicht dreimal — vom Haaransatz bis zum Kinn, von Ohr zu Ohr.',
        en: 'Wash the face three times — from the hairline to the chin, from ear to ear.',
        tr: 'Yüzünüzü üç kez yıkayın — saç çizgisinden çeneye, kulaktan kulağa.',
      },
      repetitions: 3,
      translations: { de: '', en: '', tr: '' },
    },
    {
      id: 6,
      position: '💪',
      instruction: {
        de: 'Wasche den rechten Arm dreimal bis einschliesslich des Ellbogens, dann den linken.',
        en: 'Wash the right arm three times up to and including the elbow, then the left.',
        tr: 'Önce sağ kolunuzu dirseğe kadar üç kez, sonra sol kolunuzu yıkayın.',
      },
      repetitions: 3,
      translations: { de: '', en: '', tr: '' },
    },
    {
      id: 7,
      position: '🧕',
      instruction: {
        de: 'Streiche mit feuchten Händen über den Kopf (Masah) — von vorne nach hinten und zurück.',
        en: 'Wipe over the head (Masah) with wet hands — from front to back and return.',
        tr: 'Islak ellerle başınızı mesh edin — önden arkaya ve geri.',
      },
      translations: { de: '', en: '', tr: '' },
    },
    {
      id: 8,
      position: '👂',
      instruction: {
        de: 'Reinige die Ohren — Zeigefinger innen, Daumen aussen.',
        en: 'Clean the ears — index finger inside, thumb outside.',
        tr: 'Kulaklarınızı temizleyin — işaret parmağı içte, baş parmak dışta.',
      },
      translations: { de: '', en: '', tr: '' },
    },
    {
      id: 9,
      position: '🦶',
      instruction: {
        de: 'Wasche den rechten Fuss dreimal bis einschliesslich des Knöchels, dann den linken.',
        en: 'Wash the right foot three times up to and including the ankle, then the left.',
        tr: 'Önce sağ ayağınızı topuğa kadar üç kez, sonra sol ayağınızı yıkayın.',
      },
      repetitions: 3,
      translations: { de: '', en: '', tr: '' },
    },
    {
      id: 10,
      position: '☝️',
      instruction: {
        de: 'Sprich das Dua nach der Wudu:',
        en: 'Recite the Dua after Wudu:',
        tr: 'Abdest duasını okuyun:',
      },
      arabicText: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
      transliteration: 'Ashhadu an la ilaha illallahu wahdahu la sharika lahu, wa ashhadu anna Muhammadan abduhu wa rasuluh',
      translations: {
        de: 'Ich bezeuge, dass es keinen Gott gibt ausser Allah, Er ist Einer ohne Partner, und ich bezeuge, dass Muhammad Sein Diener und Gesandter ist.',
        en: 'I bear witness that there is no god but Allah alone, without partner, and I bear witness that Muhammad is His servant and messenger.',
        tr: 'Şehadet ederim ki Allah\'tan başka ilah yoktur, O birdir, ortağı yoktur. Ve şehadet ederim ki Muhammed O\'nun kulu ve resulüdür.',
      },
    },
  ],
}

export const SALAH_GUIDE: PrayerGuideSection = {
  id: 'salah',
  icon: '🕌',
  titleKey: 'guide.salahTitle',
  descKey: 'guide.salahDesc',
  steps: [
    {
      id: 1,
      position: '🧍',
      instruction: {
        de: 'Stelle dich in Richtung Qibla (Mekka). Fasse die Absicht (Niyyah) für das jeweilige Gebet im Herzen.',
        en: 'Stand facing the Qibla (Mecca). Make the intention (Niyyah) for the specific prayer in your heart.',
        tr: 'Kıbleye dönün. Kalbinizde hangi namazı kılacağınıza niyet edin.',
      },
      translations: { de: '', en: '', tr: '' },
    },
    {
      id: 2,
      position: '🙌',
      instruction: {
        de: 'Hebe die Hände bis zu den Ohren und sage "Allahu Akbar" (Takbirat al-Ihram). Das Gebet beginnt.',
        en: 'Raise hands to ear level and say "Allahu Akbar" (Takbirat al-Ihram). The prayer begins.',
        tr: 'Ellerinizi kulak hizasına kaldırın ve "Allahu Ekber" deyin (İftitah Tekbiri). Namaz başlar.',
      },
      arabicText: 'ٱللَّهُ أَكْبَرُ',
      transliteration: 'Allahu Akbar',
      translations: {
        de: 'Allah ist der Grösste',
        en: 'Allah is the Greatest',
        tr: 'Allah en büyüktür',
      },
    },
    {
      id: 3,
      position: '🧍',
      instruction: {
        de: 'Stehe aufrecht (Qiyam). Lege die rechte Hand über die linke auf der Brust. Rezitiere die Fatiha (1. Sure).',
        en: 'Stand upright (Qiyam). Place right hand over left on the chest. Recite Al-Fatiha (1st Surah).',
        tr: 'Dik durun (Kıyam). Sağ elinizi sol elinizin üstüne göğsünüze koyun. Fatiha Suresi\'ni okuyun.',
      },
      arabicText: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ﴿١﴾ ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ ﴿٢﴾ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ﴿٣﴾ مَـٰلِكِ يَوْمِ ٱلدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ ﴿٦﴾ صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ ﴿٧﴾',
      transliteration: 'Bismillahir-Rahmanir-Rahim. Al-hamdu lillahi Rabbil-alamin. Ar-Rahmanir-Rahim. Maliki yawmid-din. Iyyaka na\'budu wa iyyaka nasta\'in. Ihdinas-siratal-mustaqim. Siratal-ladhina an\'amta alayhim, ghayril-maghdubi alayhim wa lad-dallin.',
      translations: {
        de: 'Im Namen Allahs, des Allerbarmers, des Barmherzigen. Lob sei Allah, dem Herrn der Welten. Dem Allerbarmer, dem Barmherzigen. Dem König des Tages des Gerichts. Dir allein dienen wir, und Dich allein bitten wir um Hilfe. Führe uns den geraden Weg. Den Weg derer, denen Du Gnade erwiesen hast, nicht derer, die Deinen Zorn erregt haben, noch derer, die in die Irre gegangen sind.',
        en: 'In the name of Allah, the Most Gracious, the Most Merciful. All praise is due to Allah, Lord of the Worlds. The Most Gracious, the Most Merciful. Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us to the straight path. The path of those upon whom You have bestowed favor, not of those who have evoked anger or of those who are astray.',
        tr: 'Rahman ve Rahim olan Allah\'ın adıyla. Hamd, Alemlerin Rabbi Allah\'a mahsustur. Rahman\'dır, Rahim\'dir. Din gününün sahibidir. Ancak sana kulluk eder ve ancak senden yardım dileriz. Bizi doğru yola ilet. Kendilerine nimet verdiklerinin yoluna, gazaba uğramışların ve sapıtmışların yoluna değil.',
      },
    },
    {
      id: 4,
      position: '🙇',
      instruction: {
        de: 'Beuge dich zur Verbeugung (Ruku) — Hände auf den Knien, Rücken gerade. Sage dreimal:',
        en: 'Bow down (Ruku) — hands on knees, back straight. Say three times:',
        tr: 'Rükuya gidin — ellerinizi dizlerinize koyun, sırtınız düz olsun. Üç kez söyleyin:',
      },
      arabicText: 'سُبْحَانَ رَبِّيَ ٱلْعَظِيمِ',
      transliteration: 'Subhana Rabbiyal-Azim',
      translations: {
        de: 'Gepriesen sei mein Herr, der Grossartige',
        en: 'Glory be to my Lord, the Magnificent',
        tr: 'Yüce Rabbimi tesbih ederim',
      },
      repetitions: 3,
    },
    {
      id: 5,
      position: '🧍',
      instruction: {
        de: 'Richte dich auf und sage:',
        en: 'Rise up and say:',
        tr: 'Doğrulun ve söyleyin:',
      },
      arabicText: 'سَمِعَ ٱللَّهُ لِمَنْ حَمِدَهُ ، رَبَّنَا وَلَكَ ٱلْحَمْدُ',
      transliteration: 'Sami\'allahu liman hamidah. Rabbana wa lakal-hamd.',
      translations: {
        de: 'Allah hört den, der Ihn lobt. Unser Herr, Dir gebührt alles Lob.',
        en: 'Allah hears whoever praises Him. Our Lord, to You belongs all praise.',
        tr: 'Allah kendisine hamd edeni işitir. Rabbimiz, hamd Sana mahsustur.',
      },
    },
    {
      id: 6,
      position: '🤲',
      instruction: {
        de: 'Gehe in die Niederwerfung (Sujud) — Stirn, Nase, beide Hände, Knie und Zehen berühren den Boden. Sage dreimal:',
        en: 'Go into prostration (Sujud) — forehead, nose, both hands, knees and toes touch the ground. Say three times:',
        tr: 'Secdeye gidin — alın, burun, iki el, dizler ve ayak parmakları yere değsin. Üç kez söyleyin:',
      },
      arabicText: 'سُبْحَانَ رَبِّيَ ٱلْأَعْلَىٰ',
      transliteration: 'Subhana Rabbiyal-A\'la',
      translations: {
        de: 'Gepriesen sei mein Herr, der Allerhöchste',
        en: 'Glory be to my Lord, the Most High',
        tr: 'En yüce Rabbimi tesbih ederim',
      },
      repetitions: 3,
    },
    {
      id: 7,
      position: '🧎',
      instruction: {
        de: 'Setze dich kurz auf (Julsa) und sage "Allahu Akbar", dann gehe zur zweiten Niederwerfung.',
        en: 'Sit briefly (Julsa) and say "Allahu Akbar", then go to the second prostration.',
        tr: 'Kısaca oturun (Celse) ve "Allahu Ekber" deyin, sonra ikinci secdeye gidin.',
      },
      translations: { de: '', en: '', tr: '' },
    },
    {
      id: 8,
      position: '🤲',
      instruction: {
        de: 'Zweite Niederwerfung (Sujud) — wie zuvor. Sage dreimal "Subhana Rabbiyal-A\'la". Dies beendet eine Raka.',
        en: 'Second prostration (Sujud) — as before. Say "Subhana Rabbiyal-A\'la" three times. This completes one Raka.',
        tr: 'İkinci secde — önceki gibi. Üç kez "Sübhane Rabbiyel A\'la" deyin. Bir rekat tamamlandı.',
      },
      arabicText: 'سُبْحَانَ رَبِّيَ ٱلْأَعْلَىٰ',
      transliteration: 'Subhana Rabbiyal-A\'la',
      translations: {
        de: 'Gepriesen sei mein Herr, der Allerhöchste',
        en: 'Glory be to my Lord, the Most High',
        tr: 'En yüce Rabbimi tesbih ederim',
      },
      repetitions: 3,
    },
    {
      id: 9,
      position: '🧎',
      instruction: {
        de: 'Nach der 2. (und 4.) Raka: Setze dich und rezitiere den Tashahhud (At-Tahiyyat):',
        en: 'After the 2nd (and 4th) Raka: Sit and recite the Tashahhud (At-Tahiyyat):',
        tr: '2. (ve 4.) rekattan sonra: Oturun ve Tahiyyat\'ı okuyun:',
      },
      arabicText: 'ٱلتَّحِيَّاتُ لِلَّهِ وَٱلصَّلَوَاتُ وَٱلطَّيِّبَاتُ ، ٱلسَّلَامُ عَلَيْكَ أَيُّهَا ٱلنَّبِيُّ وَرَحْمَةُ ٱللَّهِ وَبَرَكَاتُهُ ، ٱلسَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ ٱللَّهِ ٱلصَّالِحِينَ',
      transliteration: 'At-tahiyyatu lillahi was-salawatu wat-tayyibat. As-salamu alayka ayyuhan-nabiyyu wa rahmatullahi wa barakatuh. As-salamu alayna wa ala ibadillahis-salihin.',
      translations: {
        de: 'Alle Grüsse, Gebete und guten Taten gebühren Allah. Friede sei mit dir, o Prophet, und die Barmherzigkeit Allahs und Sein Segen. Friede sei mit uns und mit den rechtschaffenen Dienern Allahs.',
        en: 'All greetings, prayers and good deeds are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah.',
        tr: 'Tahiyyat, salavat ve tayyibat Allah\'a mahsustur. Ey Peygamber, Allah\'ın selamı, rahmeti ve bereketi senin üzerine olsun. Selam bizim ve Allah\'ın salih kullarının üzerine olsun.',
      },
    },
    {
      id: 10,
      position: '☝️',
      instruction: {
        de: 'Im letzten Sitzen: Rezitiere die Salavat (Grüsse an den Propheten):',
        en: 'In the final sitting: Recite the Salavat (blessings upon the Prophet):',
        tr: 'Son oturuşta: Salli-Barik dualarını okuyun:',
      },
      arabicText: 'ٱللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
      transliteration: 'Allahumma salli ala Muhammadin wa ala ali Muhammad, kama sallayta ala Ibrahim wa ala ali Ibrahim, innaka Hamidun Majid.',
      translations: {
        de: 'O Allah, segne Muhammad und die Familie Muhammads, wie Du Ibrahim und die Familie Ibrahims gesegnet hast. Wahrlich, Du bist der Lobenswerte, der Ruhmreiche.',
        en: 'O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You sent blessings upon Ibrahim and the family of Ibrahim. Indeed, You are the Praiseworthy, the Glorious.',
        tr: 'Allah\'ım, Muhammed\'e ve Muhammed\'in ailesine salat et, İbrahim\'e ve İbrahim\'in ailesine salat ettiğin gibi. Şüphesiz Sen Hamid\'sin, Mecid\'sin.',
      },
    },
    {
      id: 11,
      position: '🕊️',
      instruction: {
        de: 'Beende das Gebet mit dem Salam — drehe den Kopf erst nach rechts, dann nach links und sage jeweils:',
        en: 'End the prayer with Salam — turn your head first to the right, then to the left and say each time:',
        tr: 'Namazı selamla bitirin — başınızı önce sağa, sonra sola çevirip her seferinde söyleyin:',
      },
      arabicText: 'ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّهِ',
      transliteration: 'Assalamu alaykum wa rahmatullah',
      translations: {
        de: 'Friede sei mit euch und die Barmherzigkeit Allahs',
        en: 'Peace be upon you and the mercy of Allah',
        tr: 'Allah\'ın selamı ve rahmeti üzerinize olsun',
      },
      repetitions: 2,
    },
  ],
}

export const PRAYER_RAKA_INFO = [
  { nameKey: 'prayer.fajr', fard: 2, sunnah: 2, sunnahBefore: 2, sunnahAfter: 0 },
  { nameKey: 'prayer.dhuhr', fard: 4, sunnah: 6, sunnahBefore: 4, sunnahAfter: 2 },
  { nameKey: 'prayer.asr', fard: 4, sunnah: 0, sunnahBefore: 0, sunnahAfter: 0 },
  { nameKey: 'prayer.maghrib', fard: 3, sunnah: 2, sunnahBefore: 0, sunnahAfter: 2 },
  { nameKey: 'prayer.isha', fard: 4, sunnah: 2, sunnahBefore: 0, sunnahAfter: 2, witr: 3 },
] as const

export const GUIDE_SECTIONS: PrayerGuideSection[] = [WUDU_GUIDE, SALAH_GUIDE]
