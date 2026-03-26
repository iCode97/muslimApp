/**
 * Dua (supplication) collection.
 * Static data with Arabic text, transliteration, and translations.
 */

export interface Dua {
  id: number
  category: string
  arabic: string
  transliteration: string
  translations: {
    de: string
    en: string
    tr: string
  }
  source?: string
}

export const DUA_CATEGORIES = [
  'morning', 'evening', 'prayer', 'food', 'travel', 'protection', 'forgiveness', 'general',
] as const

export const DUAS: Dua[] = [
  // Morning
  {
    id: 1,
    category: 'morning',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: 'Asbahna wa asbahal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la sharika lah.',
    translations: {
      de: 'Wir sind in den Morgen eingetreten und die Herrschaft gehört Allah. Alles Lob gebührt Allah. Es gibt keinen Gott außer Allah, dem Einzigen, ohne Partner.',
      en: 'We have reached the morning and the sovereignty belongs to Allah. All praise is for Allah. There is no god but Allah alone, with no partner.',
      tr: 'Sabaha erdik ve mülk Allah\'ındır. Hamd Allah\'adır. Allah\'tan başka ilah yoktur, O tektir, ortağı yoktur.',
    },
    source: 'Muslim',
  },
  {
    id: 2,
    category: 'morning',
    arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
    transliteration: 'Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaykan-nushur.',
    translations: {
      de: 'O Allah, mit Dir treten wir in den Morgen ein und mit Dir in den Abend. Mit Dir leben wir und mit Dir sterben wir, und zu Dir ist die Auferstehung.',
      en: 'O Allah, by You we enter the morning and by You we enter the evening. By You we live and by You we die, and to You is the resurrection.',
      tr: 'Allah\'ım, Senin sayende sabaha erdik ve Senin sayende akşama erdik. Senin sayende yaşıyor ve Senin sayende ölüyoruz. Dönüş Sanadır.',
    },
    source: 'Tirmidhi',
  },
  // Evening
  {
    id: 3,
    category: 'evening',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: 'Amsayna wa amsal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la sharika lah.',
    translations: {
      de: 'Wir sind in den Abend eingetreten und die Herrschaft gehört Allah. Alles Lob gebührt Allah. Es gibt keinen Gott außer Allah, dem Einzigen, ohne Partner.',
      en: 'We have reached the evening and the sovereignty belongs to Allah. All praise is for Allah. There is no god but Allah alone, with no partner.',
      tr: 'Akşama erdik ve mülk Allah\'ındır. Hamd Allah\'adır. Allah\'tan başka ilah yoktur, O tektir, ortağı yoktur.',
    },
    source: 'Muslim',
  },
  // Before prayer
  {
    id: 4,
    category: 'prayer',
    arabic: 'اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ',
    transliteration: 'Allahumma ba\'id bayni wa bayna khatayaya kama ba\'adta baynal-mashriqi wal-maghrib.',
    translations: {
      de: 'O Allah, entferne mich von meinen Sünden, wie Du den Osten vom Westen entfernt hast.',
      en: 'O Allah, distance me from my sins as You have distanced the East from the West.',
      tr: 'Allah\'ım, doğu ile batıyı birbirinden uzaklaştırdığın gibi, beni de hatalarımdan uzaklaştır.',
    },
    source: 'Bukhari & Muslim',
  },
  // Before eating
  {
    id: 5,
    category: 'food',
    arabic: 'بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ',
    transliteration: 'Bismillahi wa \'ala barakatillah.',
    translations: {
      de: 'Im Namen Allahs und mit dem Segen Allahs.',
      en: 'In the name of Allah and with the blessings of Allah.',
      tr: 'Allah\'ın adıyla ve Allah\'ın bereketiyle.',
    },
    source: 'Abu Dawud',
  },
  {
    id: 6,
    category: 'food',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    transliteration: 'Alhamdu lillahil-ladhi at\'amana wa saqana wa ja\'alana muslimin.',
    translations: {
      de: 'Alles Lob gebührt Allah, der uns gespeist und getränkt hat und uns zu Muslimen gemacht hat.',
      en: 'All praise is for Allah who fed us, gave us drink, and made us Muslims.',
      tr: 'Bizi yediren, içiren ve Müslüman kılan Allah\'a hamd olsun.',
    },
    source: 'Abu Dawud & Tirmidhi',
  },
  // Travel
  {
    id: 7,
    category: 'travel',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    transliteration: 'Subhanal-ladhi sakh-khara lana hadha wa ma kunna lahu muqrinin, wa inna ila rabbina lamunqalibun.',
    translations: {
      de: 'Preis sei Dem, Der uns dies dienstbar gemacht hat, denn wir hätten es nicht vermocht. Und zu unserem Herrn werden wir gewiss zurückkehren.',
      en: 'Glory to Him who has subjected this to us, for we could never have it by ourselves. And to our Lord we shall surely return.',
      tr: 'Bunu bizim hizmetimize veren Allah\'ı tenzih ederiz. Yoksa biz buna güç yetiremezdik. Şüphesiz biz Rabbimize döneceğiz.',
    },
    source: 'Quran 43:13-14',
  },
  // Protection
  {
    id: 8,
    category: 'protection',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismillahil-ladhi la yadurru ma\'asmihi shay\'un fil-ardi wa la fis-sama\'i wa huwas-Sami\'ul-\'Alim.',
    translations: {
      de: 'Im Namen Allahs, mit dessen Namen nichts auf Erden und im Himmel Schaden zufügen kann. Und Er ist der Allhörende, der Allwissende.',
      en: 'In the name of Allah, with whose name nothing on earth or in heaven can cause harm. And He is the All-Hearing, the All-Knowing.',
      tr: 'Allah\'ın adıyla. O\'nun adı anılınca yerde ve gökte hiçbir şey zarar veremez. O her şeyi işiten ve bilendir.',
    },
    source: 'Abu Dawud & Tirmidhi',
  },
  {
    id: 9,
    category: 'protection',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    transliteration: 'A\'udhu bikalima-tillahit-tammati min sharri ma khalaq.',
    translations: {
      de: 'Ich suche Zuflucht bei den vollkommenen Worten Allahs vor dem Übel dessen, was Er erschaffen hat.',
      en: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
      tr: 'Allah\'ın tam kelimelerine, yarattıklarının şerrinden sığınırım.',
    },
    source: 'Muslim',
  },
  // Forgiveness
  {
    id: 10,
    category: 'forgiveness',
    arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullaha l-\'Azim alladhi la ilaha illa huwa l-Hayyu l-Qayyumu wa atubu ilayh.',
    translations: {
      de: 'Ich bitte Allah den Gewaltigen um Vergebung, außer Dem es keinen Gott gibt, den Lebendigen, den Beständigen, und ich wende mich Ihm reuig zu.',
      en: 'I seek forgiveness from Allah the Almighty, besides whom there is no god, the Ever-Living, the Self-Sustaining, and I repent to Him.',
      tr: 'Kendisinden başka ilah olmayan, Hay ve Kayyum olan yüce Allah\'tan bağışlanma diler ve O\'na tövbe ederim.',
    },
    source: 'Abu Dawud & Tirmidhi',
  },
  {
    id: 11,
    category: 'forgiveness',
    arabic: 'رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    transliteration: 'Rabbana zalamna anfusana wa in lam taghfir lana wa tarhamna lanakunnanna minal-khasirin.',
    translations: {
      de: 'Unser Herr, wir haben uns selbst Unrecht getan. Wenn Du uns nicht vergibst und Dich unser erbarmst, werden wir ganz gewiss zu den Verlierern gehören.',
      en: 'Our Lord, we have wronged ourselves. If You do not forgive us and have mercy upon us, we will surely be among the losers.',
      tr: 'Rabbimiz! Biz kendimize zulmettik. Eğer bizi bağışlamaz ve bize merhamet etmezsen, hüsrana uğrayanlardan oluruz.',
    },
    source: 'Quran 7:23',
  },
  // General
  {
    id: 12,
    category: 'general',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina \'adhaban-nar.',
    translations: {
      de: 'Unser Herr, gib uns im Diesseits Gutes und im Jenseits Gutes und bewahre uns vor der Strafe des Feuers.',
      en: 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',
      tr: 'Rabbimiz! Bize dünyada da iyilik ver, ahirette de iyilik ver ve bizi ateş azabından koru.',
    },
    source: 'Quran 2:201',
  },
  {
    id: 13,
    category: 'general',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى',
    transliteration: 'Allahumma inni as\'alukal-huda wat-tuqa wal-\'afafa wal-ghina.',
    translations: {
      de: 'O Allah, ich bitte Dich um Rechtleitung, Gottesfurcht, Keuschheit und Genügsamkeit.',
      en: 'O Allah, I ask You for guidance, piety, chastity, and sufficiency.',
      tr: 'Allah\'ım! Senden hidayet, takva, iffet ve zenginlik isterim.',
    },
    source: 'Muslim',
  },
  {
    id: 14,
    category: 'general',
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    transliteration: 'Hasbunallahu wa ni\'mal-wakil.',
    translations: {
      de: 'Allah genügt uns, und Er ist der beste Sachwalter.',
      en: 'Allah is sufficient for us, and He is the best Disposer of affairs.',
      tr: 'Allah bize yeter, O ne güzel vekildir.',
    },
    source: 'Quran 3:173',
  },
]
