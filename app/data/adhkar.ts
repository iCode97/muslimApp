/**
 * Adhkar — recited routines (Hisn al-Muslim style) with repetition counts.
 *
 * Unlike `duas.ts` (a browsable collection of single supplications), every
 * set here is meant to be *worked through* item by item with a counter
 * (see /adhkar). Each item carries its source (collection + number or Quran
 * reference) and, for hadith, the grade.
 *
 * Content integrity:
 * - Only well-established adhkar whose wording and reference are well known.
 *   Where narrations differ slightly, the common Hisn al-Muslim wording is used.
 * - Everything ships with `review: 'draft'` until a qualified reviewer has
 *   checked Arabic, counts and references (UI shows LearnDraftBadge).
 * - Translations are our own renderings of the meaning, not a cited translation.
 */
import type { LocalizedText, ReviewStatus } from '~/data/learn/types'

export const ADHKAR_SET_IDS = [
  'morning', 'evening', 'after-prayer', 'sleep', 'waking', 'travel', 'home', 'food', 'distress',
] as const

export type AdhkarSetId = typeof ADHKAR_SET_IDS[number]

export interface Dhikr {
  /** Stable, globally unique id (used as progress key). */
  id: string
  /** Fully vowelled Arabic text. */
  arabic: string
  transliteration: string
  translation: LocalizedText
  /** How often it is recited in this set (≥ 1). */
  repeat: number
  /** Collection + number, e.g. "Sahih Muslim 2723" or "Quran 2:255". */
  source: string
  /** Hadith grade (omitted for pure Quran recitations). */
  grade?: 'sahih' | 'hasan'
  /** When/how to say it, e.g. "when leaving the house". */
  occasion?: LocalizedText
  /** Short virtue from the Sunnah. */
  virtue?: LocalizedText
  /** Source of the virtue if it differs from `source`. */
  virtueSource?: string
  review: ReviewStatus
}

export interface AdhkarSet {
  id: AdhkarSetId
  /** AppIcon name or emoji. */
  icon: string
  items: Dhikr[]
}

// ---------------------------------------------------------------------------
// Shared texts (used in several sets)
// ---------------------------------------------------------------------------

type DhikrText = Pick<Dhikr, 'arabic' | 'transliteration' | 'translation'>

const AYAT_AL_KURSI: DhikrText = {
  arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ',
  transliteration: 'Allahu la ilaha illa huwal-hayyul-qayyum, la ta’khudhuhu sinatun wa la nawm, lahu ma fis-samawati wa ma fil-ard, man dhal-ladhi yashfa’u ’indahu illa bi-idhnih, ya’lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bi-shay’im-min ’ilmihi illa bima sha’, wasi’a kursiyyuhus-samawati wal-ard, wa la ya’uduhu hifzuhuma, wa huwal-’aliyyul-’azim.',
  translation: {
    de: 'Allah – es gibt keinen Gott außer Ihm, dem Lebendigen, dem Beständigen. Ihn überkommt weder Schlummer noch Schlaf. Ihm gehört, was in den Himmeln und was auf der Erde ist. Wer könnte bei Ihm Fürsprache einlegen, außer mit Seiner Erlaubnis? Er weiß, was vor ihnen und was hinter ihnen liegt, sie aber erfassen nichts von Seinem Wissen, außer was Er will. Sein Kursi umfasst die Himmel und die Erde, und ihre Erhaltung ermüdet Ihn nicht. Er ist der Erhabene, der Allgewaltige.',
    en: 'Allah – there is no god but Him, the Ever-Living, the Sustainer of all. Neither drowsiness nor sleep overtakes Him. To Him belongs whatever is in the heavens and whatever is on the earth. Who could intercede with Him except by His permission? He knows what is before them and what is behind them, and they encompass nothing of His knowledge except what He wills. His Kursi extends over the heavens and the earth, and preserving them does not tire Him. He is the Most High, the Most Great.',
    tr: 'Allah, kendisinden başka ilah olmayandır. Diridir, kayyûmdur. O’nu ne uyuklama ne de uyku tutar. Göklerde ve yerde ne varsa O’nundur. İzni olmadan O’nun katında kim şefaat edebilir? O, kulların önlerindekini ve arkalarındakini bilir. Onlar O’nun ilminden, dilediği kadarı dışında hiçbir şey kavrayamazlar. O’nun kürsüsü gökleri ve yeri kaplamıştır; onları koruyup gözetmek O’na ağır gelmez. O, yücedir, büyüktür.',
  },
}

const BASMALA_AR = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'
const BASMALA_TR = 'Bismillahir-rahmanir-rahim.'

const AL_IKHLAS: DhikrText = {
  arabic: `${BASMALA_AR} قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ`,
  transliteration: `${BASMALA_TR} Qul huwallahu ahad. Allahus-samad. Lam yalid wa lam yulad. Wa lam yakul-lahu kufuwan ahad.`,
  translation: {
    de: 'Im Namen Allahs, des Allerbarmers, des Barmherzigen. Sprich: Er ist Allah, ein Einziger, Allah, der Absolute (auf den alle angewiesen sind). Er zeugt nicht und wurde nicht gezeugt, und niemand ist Ihm gleich.',
    en: 'In the name of Allah, the Most Gracious, the Most Merciful. Say: He is Allah, the One, Allah, the Eternal Refuge. He neither begets nor was He begotten, and there is none comparable to Him.',
    tr: 'Rahmân ve Rahîm olan Allah’ın adıyla. De ki: O Allah birdir. Allah Samed’dir (her şey O’na muhtaçtır). O doğurmamış ve doğurulmamıştır. Hiçbir şey O’na denk değildir.',
  },
}

const AL_FALAQ: DhikrText = {
  arabic: `${BASMALA_AR} قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ مِنْ شَرِّ مَا خَلَقَ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ`,
  transliteration: `${BASMALA_TR} Qul a’udhu bi-rabbil-falaq. Min sharri ma khalaq. Wa min sharri ghasiqin idha waqab. Wa min sharrin-naffathati fil-’uqad. Wa min sharri hasidin idha hasad.`,
  translation: {
    de: 'Im Namen Allahs, des Allerbarmers, des Barmherzigen. Sprich: Ich nehme Zuflucht beim Herrn des Tagesanbruchs vor dem Übel dessen, was Er erschaffen hat, vor dem Übel der Dunkelheit, wenn sie hereinbricht, vor dem Übel derer, die auf Knoten blasen, und vor dem Übel eines Neiders, wenn er neidet.',
    en: 'In the name of Allah, the Most Gracious, the Most Merciful. Say: I seek refuge with the Lord of daybreak from the evil of what He has created, from the evil of darkness when it settles, from the evil of those who blow on knots, and from the evil of an envier when he envies.',
    tr: 'Rahmân ve Rahîm olan Allah’ın adıyla. De ki: Yarattığı şeylerin şerrinden, karanlığı çöktüğünde gecenin şerrinden, düğümlere üfleyenlerin şerrinden ve haset ettiğinde hasetçinin şerrinden sabahın Rabbine sığınırım.',
  },
}

const AN_NAS: DhikrText = {
  arabic: `${BASMALA_AR} قُلْ أَعُوذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ إِلَٰهِ النَّاسِ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ مِنَ الْجِنَّةِ وَالنَّاسِ`,
  transliteration: `${BASMALA_TR} Qul a’udhu bi-rabbin-nas. Malikin-nas. Ilahin-nas. Min sharril-waswasil-khannas. Alladhi yuwaswisu fi sudurin-nas. Minal-jinnati wan-nas.`,
  translation: {
    de: 'Im Namen Allahs, des Allerbarmers, des Barmherzigen. Sprich: Ich nehme Zuflucht beim Herrn der Menschen, dem König der Menschen, dem Gott der Menschen, vor dem Übel des Einflüsterers, der sich zurückzieht, der in die Brüste der Menschen einflüstert – von den Dschinn und den Menschen.',
    en: 'In the name of Allah, the Most Gracious, the Most Merciful. Say: I seek refuge with the Lord of mankind, the King of mankind, the God of mankind, from the evil of the retreating whisperer, who whispers into the hearts of mankind – from among the jinn and mankind.',
    tr: 'Rahmân ve Rahîm olan Allah’ın adıyla. De ki: İnsanların kalplerine vesvese veren, cinlerden ve insanlardan olan sinsi vesvesecinin şerrinden; insanların Rabbine, insanların Melik’ine, insanların İlah’ına sığınırım.',
  },
}

const LAST_TWO_BAQARAH: DhikrText = {
  arabic: 'آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْ رُسُلِهِ وَقَالُوا سَمِعْنَا وَأَطَعْنَا غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
  transliteration: 'Amanar-rasulu bima unzila ilayhi mir-rabbihi wal-mu’minun, kullun amana billahi wa mala’ikatihi wa kutubihi wa rusulih, la nufarriqu bayna ahadim-mir-rusulih, wa qalu sami’na wa ata’na, ghufranaka rabbana wa ilaykal-masir. La yukallifullahu nafsan illa wus’aha, laha ma kasabat wa ’alayha maktasabat, rabbana la tu’akhidhna in nasina aw akhta’na, rabbana wa la tahmil ’alayna isran kama hamaltahu ’alal-ladhina min qablina, rabbana wa la tuhammilna ma la taqata lana bih, wa’fu ’anna, waghfir lana, warhamna, anta mawlana fansurna ’alal-qawmil-kafirin.',
  translation: {
    de: 'Der Gesandte glaubt an das, was ihm von seinem Herrn herabgesandt wurde, und ebenso die Gläubigen. Alle glauben an Allah, Seine Engel, Seine Bücher und Seine Gesandten: „Wir machen keinen Unterschied zwischen Seinen Gesandten.“ Und sie sagen: „Wir hören und gehorchen. (Wir bitten um) Deine Vergebung, unser Herr, und zu Dir ist die Heimkehr.“ Allah erlegt keiner Seele mehr auf, als sie zu leisten vermag. Ihr kommt zugute, was sie (an Gutem) erworben hat, und gegen sie ist, was sie (an Bösem) begangen hat. „Unser Herr, belange uns nicht, wenn wir vergessen oder Fehler begehen. Unser Herr, lege uns keine Last auf, wie Du sie denen vor uns auferlegt hast. Unser Herr, bürde uns nichts auf, wozu wir keine Kraft haben. Verzeih uns, vergib uns und erbarme Dich unser. Du bist unser Schutzherr, so hilf uns gegen das ungläubige Volk.“',
    en: 'The Messenger believes in what has been sent down to him from his Lord, and so do the believers. All believe in Allah, His angels, His books and His messengers: “We make no distinction between any of His messengers.” And they say: “We hear and we obey. (We seek) Your forgiveness, our Lord, and to You is the final return.” Allah does not burden a soul beyond its capacity. It will have what it has earned, and it will bear what it has incurred. “Our Lord, do not take us to task if we forget or err. Our Lord, do not lay on us a burden like the one You laid on those before us. Our Lord, do not burden us with what we have no strength to bear. Pardon us, forgive us and have mercy on us. You are our Protector, so help us against the disbelieving people.”',
    tr: 'Peygamber, Rabbinden kendisine indirilene iman etti, müminler de. Her biri Allah’a, meleklerine, kitaplarına ve peygamberlerine iman etti: “O’nun peygamberleri arasında ayrım yapmayız.” Ve dediler ki: “İşittik ve itaat ettik. Rabbimiz, bağışlamanı dileriz; dönüş Sanadır.” Allah hiç kimseye gücünün yeteceğinden fazlasını yüklemez. Herkesin kazandığı iyilik kendi lehine, işlediği kötülük kendi aleyhinedir. “Rabbimiz! Unutur ya da yanılırsak bizi sorumlu tutma. Rabbimiz! Bizden öncekilere yüklediğin gibi bize ağır yük yükleme. Rabbimiz! Gücümüzün yetmeyeceği şeyleri bize yükleme. Bizi affet, bizi bağışla, bize merhamet et. Sen bizim Mevlâmızsın; kâfirler topluluğuna karşı bize yardım et.”',
  },
}

const SAYYID_AL_ISTIGHFAR: DhikrText = {
  arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي، فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
  transliteration: 'Allahumma anta rabbi la ilaha illa ant, khalaqtani wa ana ’abduk, wa ana ’ala ’ahdika wa wa’dika mastata’t, a’udhu bika min sharri ma sana’t, abu’u laka bi-ni’matika ’alayya, wa abu’u laka bi-dhanbi, faghfir li, fa-innahu la yaghfirudh-dhunuba illa ant.',
  translation: {
    de: 'O Allah, Du bist mein Herr, es gibt keinen Gott außer Dir. Du hast mich erschaffen, und ich bin Dein Diener. Ich halte an Deinem Bund und Deinem Versprechen fest, so gut ich kann. Ich suche Zuflucht bei Dir vor dem Übel dessen, was ich getan habe. Ich bekenne Dir Deine Gnade, die Du mir erwiesen hast, und ich bekenne Dir meine Sünde. So vergib mir, denn niemand vergibt die Sünden außer Dir.',
    en: 'O Allah, You are my Lord; there is no god but You. You created me and I am Your servant. I hold to Your covenant and promise as best I can. I seek refuge with You from the evil of what I have done. I acknowledge Your favour upon me and I acknowledge my sin, so forgive me, for none forgives sins except You.',
    tr: 'Allah’ım! Sen benim Rabbimsin, Senden başka ilah yoktur. Beni Sen yarattın, ben Senin kulunum. Gücüm yettiğince Sana verdiğim söz ve ahdin üzerindeyim. Yaptıklarımın şerrinden Sana sığınırım. Bana verdiğin nimeti ikrar eder, günahımı itiraf ederim. Beni bağışla; çünkü günahları Senden başka bağışlayan yoktur.',
  },
}

const AFW_AFIYAH: DhikrText = {
  arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي، وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي',
  transliteration: 'Allahumma inni as’alukal-’afwa wal-’afiyata fid-dunya wal-akhirah. Allahumma inni as’alukal-’afwa wal-’afiyata fi dini wa dunyaya wa ahli wa mali. Allahummastur ’awrati, wa amin raw’ati. Allahummahfazni min bayni yadayya, wa min khalfi, wa ’an yamini, wa ’an shimali, wa min fawqi, wa a’udhu bi-’azamatika an ughtala min tahti.',
  translation: {
    de: 'O Allah, ich bitte Dich um Verzeihung und Wohlergehen im Diesseits und im Jenseits. O Allah, ich bitte Dich um Verzeihung und Wohlergehen in meiner Religion und meinem weltlichen Leben, in meiner Familie und meinem Besitz. O Allah, bedecke meine Schwächen und beruhige meine Ängste. O Allah, beschütze mich von vorn und von hinten, von rechts und von links und von oben, und ich suche Zuflucht bei Deiner Erhabenheit davor, von unten her heimtückisch vernichtet zu werden.',
    en: 'O Allah, I ask You for pardon and well-being in this world and the Hereafter. O Allah, I ask You for pardon and well-being in my religion and my worldly life, my family and my wealth. O Allah, cover my faults and calm my fears. O Allah, protect me from in front of me and behind me, from my right and my left, and from above me, and I seek refuge in Your greatness from being struck down unawares from beneath me.',
    tr: 'Allah’ım! Senden dünyada ve ahirette af ve afiyet dilerim. Allah’ım! Dinimde, dünyamda, ailemde ve malımda Senden af ve afiyet dilerim. Allah’ım! Ayıplarımı ört, korkularımdan beni emin kıl. Allah’ım! Beni önümden, arkamdan, sağımdan, solumdan ve üstümden koru. Altımdan ansızın helak edilmekten Senin azametine sığınırım.',
  },
}

const BISMILLAH_LA_YADURR: DhikrText = {
  arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
  transliteration: 'Bismillahil-ladhi la yadurru ma’asmihi shay’un fil-ardi wa la fis-sama’i wa huwas-sami’ul-’alim.',
  translation: {
    de: 'Im Namen Allahs, mit dessen Namen nichts auf der Erde und nichts im Himmel schaden kann. Er ist der Allhörende, der Allwissende.',
    en: 'In the name of Allah, with whose name nothing on earth or in heaven can cause harm. He is the All-Hearing, the All-Knowing.',
    tr: 'İsmiyle birlikte yerde ve gökte hiçbir şeyin zarar veremeyeceği Allah’ın adıyla. O, her şeyi işitendir, her şeyi bilendir.',
  },
}

const RADITU: DhikrText = {
  arabic: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
  transliteration: 'Raditu billahi rabba, wa bil-islami dina, wa bi-Muhammadin sallallahu ’alayhi wa sallama nabiyya.',
  translation: {
    de: 'Ich bin zufrieden mit Allah als Herrn, mit dem Islam als Religion und mit Muhammad ﷺ als Prophet.',
    en: 'I am pleased with Allah as Lord, with Islam as religion and with Muhammad ﷺ as Prophet.',
    tr: 'Rab olarak Allah’tan, din olarak İslam’dan, peygamber olarak Muhammed ﷺ’den razıyım.',
  },
}

const SUBHANALLAH_WA_BIHAMDIHI: DhikrText = {
  arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
  transliteration: 'Subhanallahi wa bihamdih.',
  translation: {
    de: 'Gepriesen sei Allah, und Ihm gebührt das Lob.',
    en: 'Glory be to Allah, and praise be to Him.',
    tr: 'Allah’ı hamdiyle tesbih ederim.',
  },
}

const TAHLIL: DhikrText = {
  arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
  transliteration: 'La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa ’ala kulli shay’in qadir.',
  translation: {
    de: 'Es gibt keinen Gott außer Allah, dem Einzigen ohne Partner. Ihm gehört die Herrschaft und Ihm gebührt das Lob, und Er hat Macht über alle Dinge.',
    en: 'There is no god but Allah alone, without partner. His is the dominion and His is the praise, and He has power over all things.',
    tr: 'Allah’tan başka ilah yoktur; O tektir, ortağı yoktur. Mülk O’nundur, hamd O’na mahsustur. O her şeye kadirdir.',
  },
}

const AUDHU_BI_KALIMAT: DhikrText = {
  arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
  transliteration: 'A’udhu bi-kalimatillahit-tammati min sharri ma khalaq.',
  translation: {
    de: 'Ich suche Zuflucht bei den vollkommenen Worten Allahs vor dem Übel dessen, was Er erschaffen hat.',
    en: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
    tr: 'Yarattığı şeylerin şerrinden Allah’ın eksiksiz kelimelerine sığınırım.',
  },
}

const SUBHANALLAH: DhikrText = {
  arabic: 'سُبْحَانَ اللَّهِ',
  transliteration: 'Subhanallah.',
  translation: { de: 'Gepriesen sei Allah.', en: 'Glory be to Allah.', tr: 'Allah’ı tesbih ederim (Allah her türlü eksiklikten münezzehtir).' },
}

const ALHAMDULILLAH: DhikrText = {
  arabic: 'الْحَمْدُ لِلَّهِ',
  transliteration: 'Alhamdulillah.',
  translation: { de: 'Alles Lob gebührt Allah.', en: 'All praise is for Allah.', tr: 'Hamd Allah’adır.' },
}

const ALLAHU_AKBAR: DhikrText = {
  arabic: 'اللَّهُ أَكْبَرُ',
  transliteration: 'Allahu akbar.',
  translation: { de: 'Allah ist größer.', en: 'Allah is the Greatest.', tr: 'Allah en büyüktür.' },
}

const BISMILLAH: DhikrText = {
  arabic: 'بِسْمِ اللَّهِ',
  transliteration: 'Bismillah.',
  translation: { de: 'Im Namen Allahs.', en: 'In the name of Allah.', tr: 'Allah’ın adıyla.' },
}

// Virtues reused across sets
const QULS_VIRTUE: LocalizedText = {
  de: 'Zusammen mit Al-Falaq und An-Nas morgens und abends je dreimal rezitiert, „genügen sie dir gegen alles“.',
  en: 'Recited together with Al-Falaq and An-Nas three times each morning and evening, “they will suffice you against everything”.',
  tr: 'Felak ve Nâs sureleriyle birlikte sabah ve akşam üçer kez okunduğunda “her şeye karşı sana yeterler”.',
}
const QULS_SOURCE = 'Sunan Abi Dawud 5082; Jami’ at-Tirmidhi 3575'

const DRAFT = 'draft' as const

// ---------------------------------------------------------------------------
// Morning & evening (shared core, with time-specific variants)
// ---------------------------------------------------------------------------

function morningEvening(prefix: 'morning' | 'evening'): Dhikr[] {
  const isMorning = prefix === 'morning'
  const items: Dhikr[] = [
    {
      id: `${prefix}-ayat-al-kursi`,
      ...AYAT_AL_KURSI,
      repeat: 1,
      source: 'Quran 2:255',
      review: DRAFT,
    },
    {
      id: `${prefix}-al-ikhlas`,
      ...AL_IKHLAS,
      repeat: 3,
      source: `Quran 112 · ${QULS_SOURCE}`,
      grade: 'hasan',
      virtue: QULS_VIRTUE,
      review: DRAFT,
    },
    {
      id: `${prefix}-al-falaq`,
      ...AL_FALAQ,
      repeat: 3,
      source: `Quran 113 · ${QULS_SOURCE}`,
      grade: 'hasan',
      review: DRAFT,
    },
    {
      id: `${prefix}-an-nas`,
      ...AN_NAS,
      repeat: 3,
      source: `Quran 114 · ${QULS_SOURCE}`,
      grade: 'hasan',
      review: DRAFT,
    },
    isMorning
      ? {
          id: 'morning-asbahna',
          arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
          transliteration: 'Asbahna wa asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa ’ala kulli shay’in qadir. Rabbi as’aluka khayra ma fi hadhal-yawmi wa khayra ma ba’dah, wa a’udhu bika min sharri ma fi hadhal-yawmi wa sharri ma ba’dah. Rabbi a’udhu bika minal-kasali wa su’il-kibar. Rabbi a’udhu bika min ’adhabin fin-nari wa ’adhabin fil-qabr.',
          translation: {
            de: 'Wir sind in den Morgen eingetreten, und die Herrschaft gehört Allah. Alles Lob gebührt Allah. Es gibt keinen Gott außer Allah, dem Einzigen ohne Partner. Ihm gehört die Herrschaft und Ihm gebührt das Lob, und Er hat Macht über alle Dinge. Mein Herr, ich bitte Dich um das Gute dieses Tages und das Gute danach, und ich suche Zuflucht bei Dir vor dem Übel dieses Tages und dem Übel danach. Mein Herr, ich suche Zuflucht bei Dir vor Trägheit und den Beschwerden des Alters. Mein Herr, ich suche Zuflucht bei Dir vor einer Strafe im Feuer und einer Strafe im Grab.',
            en: 'We have entered the morning and the dominion belongs to Allah. All praise is for Allah. There is no god but Allah alone, without partner. His is the dominion and His is the praise, and He has power over all things. My Lord, I ask You for the good of this day and the good of what follows it, and I seek refuge with You from the evil of this day and the evil of what follows it. My Lord, I seek refuge with You from laziness and the hardships of old age. My Lord, I seek refuge with You from punishment in the Fire and punishment in the grave.',
            tr: 'Sabaha erdik, mülk de Allah’ın olarak sabaha erdi. Hamd Allah’adır. Allah’tan başka ilah yoktur; O tektir, ortağı yoktur. Mülk O’nundur, hamd O’nadır ve O her şeye kadirdir. Rabbim! Bu günün hayrını ve ondan sonrakinin hayrını Senden isterim; bu günün şerrinden ve ondan sonrakinin şerrinden Sana sığınırım. Rabbim! Tembellikten ve ihtiyarlığın kötülüğünden Sana sığınırım. Rabbim! Cehennem azabından ve kabir azabından Sana sığınırım.',
          },
          repeat: 1,
          source: 'Sahih Muslim 2723',
          grade: 'sahih',
          review: DRAFT,
        }
      : {
          id: 'evening-amsayna',
          arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
          transliteration: 'Amsayna wa amsal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa ’ala kulli shay’in qadir. Rabbi as’aluka khayra ma fi hadhihil-laylati wa khayra ma ba’daha, wa a’udhu bika min sharri ma fi hadhihil-laylati wa sharri ma ba’daha. Rabbi a’udhu bika minal-kasali wa su’il-kibar. Rabbi a’udhu bika min ’adhabin fin-nari wa ’adhabin fil-qabr.',
          translation: {
            de: 'Wir sind in den Abend eingetreten, und die Herrschaft gehört Allah. Alles Lob gebührt Allah. Es gibt keinen Gott außer Allah, dem Einzigen ohne Partner. Ihm gehört die Herrschaft und Ihm gebührt das Lob, und Er hat Macht über alle Dinge. Mein Herr, ich bitte Dich um das Gute dieser Nacht und das Gute danach, und ich suche Zuflucht bei Dir vor dem Übel dieser Nacht und dem Übel danach. Mein Herr, ich suche Zuflucht bei Dir vor Trägheit und den Beschwerden des Alters. Mein Herr, ich suche Zuflucht bei Dir vor einer Strafe im Feuer und einer Strafe im Grab.',
            en: 'We have entered the evening and the dominion belongs to Allah. All praise is for Allah. There is no god but Allah alone, without partner. His is the dominion and His is the praise, and He has power over all things. My Lord, I ask You for the good of this night and the good of what follows it, and I seek refuge with You from the evil of this night and the evil of what follows it. My Lord, I seek refuge with You from laziness and the hardships of old age. My Lord, I seek refuge with You from punishment in the Fire and punishment in the grave.',
            tr: 'Akşama erdik, mülk de Allah’ın olarak akşama erdi. Hamd Allah’adır. Allah’tan başka ilah yoktur; O tektir, ortağı yoktur. Mülk O’nundur, hamd O’nadır ve O her şeye kadirdir. Rabbim! Bu gecenin hayrını ve ondan sonrakinin hayrını Senden isterim; bu gecenin şerrinden ve ondan sonrakinin şerrinden Sana sığınırım. Rabbim! Tembellikten ve ihtiyarlığın kötülüğünden Sana sığınırım. Rabbim! Cehennem azabından ve kabir azabından Sana sığınırım.',
          },
          repeat: 1,
          source: 'Sahih Muslim 2723',
          grade: 'sahih',
          review: DRAFT,
        },
    isMorning
      ? {
          id: 'morning-allahumma-bika',
          arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
          transliteration: 'Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu, wa ilaykan-nushur.',
          translation: {
            de: 'O Allah, durch Dich erreichen wir den Morgen und durch Dich den Abend, durch Dich leben wir und durch Dich sterben wir, und zu Dir ist die Auferstehung.',
            en: 'O Allah, by You we reach the morning and by You we reach the evening, by You we live and by You we die, and to You is the resurrection.',
            tr: 'Allah’ım! Senin sayende sabaha, Senin sayende akşama erdik. Senin sayende yaşar, Senin sayende ölürüz. Dönüş Sanadır.',
          },
          repeat: 1,
          source: 'Jami’ at-Tirmidhi 3391; Sunan Abi Dawud 5068',
          grade: 'hasan',
          review: DRAFT,
        }
      : {
          id: 'evening-allahumma-bika',
          arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
          transliteration: 'Allahumma bika amsayna, wa bika asbahna, wa bika nahya, wa bika namutu, wa ilaykal-masir.',
          translation: {
            de: 'O Allah, durch Dich erreichen wir den Abend und durch Dich den Morgen, durch Dich leben wir und durch Dich sterben wir, und zu Dir ist die Heimkehr.',
            en: 'O Allah, by You we reach the evening and by You we reach the morning, by You we live and by You we die, and to You is the final return.',
            tr: 'Allah’ım! Senin sayende akşama, Senin sayende sabaha erdik. Senin sayende yaşar, Senin sayende ölürüz. Varış Sanadır.',
          },
          repeat: 1,
          source: 'Jami’ at-Tirmidhi 3391; Sunan Abi Dawud 5068',
          grade: 'hasan',
          review: DRAFT,
        },
    {
      id: `${prefix}-sayyid-al-istighfar`,
      ...SAYYID_AL_ISTIGHFAR,
      repeat: 1,
      source: 'Sahih al-Bukhari 6306',
      grade: 'sahih',
      virtue: {
        de: 'Wer es tagsüber mit fester Überzeugung spricht und vor dem Abend stirbt, gehört zu den Bewohnern des Paradieses – ebenso, wer es nachts spricht und vor dem Morgen stirbt.',
        en: 'Whoever says it during the day with firm conviction and dies before evening is among the people of Paradise – and likewise whoever says it at night and dies before morning.',
        tr: 'Kim buna yürekten inanarak gündüz söyler de akşam olmadan ölürse cennet ehlindendir; gece söyler de sabah olmadan ölürse o da cennet ehlindendir.',
      },
      review: DRAFT,
    },
    {
      id: `${prefix}-afw-afiyah`,
      ...AFW_AFIYAH,
      repeat: 1,
      source: 'Sunan Abi Dawud 5074; Sunan Ibn Majah 3871',
      grade: 'sahih',
      review: DRAFT,
    },
    {
      id: `${prefix}-bismillah-la-yadurr`,
      ...BISMILLAH_LA_YADURR,
      repeat: 3,
      source: 'Sunan Abi Dawud 5088; Jami’ at-Tirmidhi 3388',
      grade: 'hasan',
      virtue: {
        de: 'Wer es morgens und abends dreimal spricht, dem wird nichts schaden.',
        en: 'Whoever says it three times in the morning and evening, nothing will harm him.',
        tr: 'Kim bunu sabah ve akşam üçer kez söylerse ona hiçbir şey zarar vermez.',
      },
      review: DRAFT,
    },
    {
      id: `${prefix}-raditu`,
      ...RADITU,
      repeat: 3,
      source: 'Sunan Abi Dawud 5072; Jami’ at-Tirmidhi 3389',
      grade: 'hasan',
      virtue: {
        de: 'Allah hat es auf Sich genommen, ihn am Tag der Auferstehung zufriedenzustellen.',
        en: 'It is a right upon Allah to please him on the Day of Resurrection.',
        tr: 'Kıyamet günü onu razı etmek Allah’ın üzerine bir haktır.',
      },
      review: DRAFT,
    },
  ]

  if (isMorning) {
    items.push({
      id: 'morning-subhanallah-adada-khalqihi',
      arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',
      transliteration: 'Subhanallahi wa bihamdihi, ’adada khalqihi, wa rida nafsihi, wa zinata ’arshihi, wa midada kalimatih.',
      translation: {
        de: 'Gepriesen sei Allah, und Ihm gebührt das Lob – so oft wie die Zahl Seiner Geschöpfe, so sehr es Ihm gefällt, so schwer wie Sein Thron und so viel wie die Tinte Seiner Worte.',
        en: 'Glory be to Allah and praise be to Him – as many times as the number of His creation, as much as pleases Him, as heavy as the weight of His Throne, and as much as the ink of His words.',
        tr: 'Allah’ı, yarattıklarının sayısınca, kendi rızası kadar, arşının ağırlığınca ve kelimelerinin mürekkebi miktarınca hamd ile tesbih ederim.',
      },
      repeat: 3,
      source: 'Sahih Muslim 2726',
      grade: 'sahih',
      virtue: {
        de: 'Der Prophet ﷺ sagte, diese Worte dreimal gesprochen wögen schwerer als alles, was Juwayriya seit dem Morgen (an Dhikr) gesagt hatte.',
        en: 'The Prophet ﷺ said these words, said three times, would outweigh everything Juwayriya had said (in dhikr) since the morning.',
        tr: 'Peygamber ﷺ, üç kez söylenen bu sözlerin Cüveyriye’nin sabahtan beri yaptığı zikirden daha ağır geleceğini bildirmiştir.',
      },
      review: DRAFT,
    })
  }

  items.push({
    id: `${prefix}-subhanallah-wa-bihamdihi`,
    ...SUBHANALLAH_WA_BIHAMDIHI,
    repeat: 100,
    source: 'Sahih Muslim 2692',
    grade: 'sahih',
    virtue: {
      de: 'Wer es morgens und abends hundertmal sagt, mit dem kommt am Tag der Auferstehung niemand mit etwas Besserem – außer wer dasselbe oder mehr gesagt hat.',
      en: 'Whoever says it a hundred times in the morning and evening, no one will come on the Day of Resurrection with anything better – except one who said the same or more.',
      tr: 'Kim bunu sabah ve akşam yüz kez söylerse, kıyamet günü hiç kimse onun getirdiğinden daha üstün bir şey getiremez; ancak onun gibi ya da daha fazla söyleyen müstesna.',
    },
    review: DRAFT,
  })

  if (isMorning) {
    items.push({
      id: 'morning-tahlil-100',
      ...TAHLIL,
      repeat: 100,
      source: 'Sahih al-Bukhari 6403; Sahih Muslim 2691',
      grade: 'sahih',
      occasion: {
        de: '100× im Laufe des Tages – gern schon am Morgen.',
        en: '100× in the course of the day – ideally in the morning.',
        tr: 'Gün içinde 100 kez – tercihen sabah.',
      },
      virtue: {
        de: 'Wer es an einem Tag hundertmal sagt, erhält Lohn wie für die Befreiung von zehn Sklaven; hundert gute Taten werden ihm angeschrieben, hundert Sünden getilgt, und es ist ihm an diesem Tag bis zum Abend ein Schutz vor dem Satan.',
        en: 'Whoever says it a hundred times in a day receives a reward like freeing ten slaves; a hundred good deeds are written for him, a hundred sins are erased, and it is a protection for him from Satan that day until evening.',
        tr: 'Kim bunu bir günde yüz kez söylerse, on köle azat etmiş gibi sevap alır; ona yüz iyilik yazılır, yüz günahı silinir ve o gün akşama kadar şeytana karşı korunur.',
      },
      review: DRAFT,
    })
  }
  else {
    items.splice(items.length - 1, 0, {
      id: 'evening-audhu-bi-kalimat',
      ...AUDHU_BI_KALIMAT,
      repeat: 3,
      source: 'Sahih Muslim 2709',
      grade: 'sahih',
      virtue: {
        de: 'Einem Mann, den ein Skorpion gestochen hatte, sagte der Prophet ﷺ: Hättest du am Abend diese Worte gesprochen, hätte er dir nicht geschadet.',
        en: 'To a man stung by a scorpion the Prophet ﷺ said: had you said these words in the evening, it would not have harmed you.',
        tr: 'Peygamber ﷺ, akrep sokan bir adama: “Akşam olunca bu sözleri söyleseydin sana zarar vermezdi” buyurmuştur.',
      },
      review: DRAFT,
    })
  }

  return items
}

// ---------------------------------------------------------------------------
// All sets
// ---------------------------------------------------------------------------

export const ADHKAR_SETS: AdhkarSet[] = [
  { id: 'morning', icon: 'sun', items: morningEvening('morning') },
  { id: 'evening', icon: 'moon', items: morningEvening('evening') },
  {
    id: 'after-prayer',
    icon: 'prayer',
    items: [
      {
        id: 'after-prayer-astaghfirullah',
        arabic: 'أَسْتَغْفِرُ اللَّهَ',
        transliteration: 'Astaghfirullah.',
        translation: { de: 'Ich bitte Allah um Vergebung.', en: 'I seek Allah’s forgiveness.', tr: 'Allah’tan bağışlanma dilerim.' },
        repeat: 3,
        source: 'Sahih Muslim 591',
        grade: 'sahih',
        occasion: {
          de: 'Direkt nach dem Friedensgruß (Salam) des Pflichtgebets.',
          en: 'Right after the closing salam of the obligatory prayer.',
          tr: 'Farz namazın selamından hemen sonra.',
        },
        review: DRAFT,
      },
      {
        id: 'after-prayer-antas-salam',
        arabic: 'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
        transliteration: 'Allahumma antas-salamu wa minkas-salam, tabarakta ya dhal-jalali wal-ikram.',
        translation: {
          de: 'O Allah, Du bist der Friede, und von Dir kommt der Friede. Segensreich bist Du, o Besitzer der Majestät und der Ehre.',
          en: 'O Allah, You are Peace and from You comes peace. Blessed are You, O Possessor of majesty and honour.',
          tr: 'Allah’ım! Sen Selam’sın, selamet Sendendir. Ey celal ve ikram sahibi, Sen ne yücesin.',
        },
        repeat: 1,
        source: 'Sahih Muslim 591',
        grade: 'sahih',
        review: DRAFT,
      },
      {
        id: 'after-prayer-la-mania',
        arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ، اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ',
        transliteration: 'La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa ’ala kulli shay’in qadir. Allahumma la mani’a lima a’tayt, wa la mu’tiya lima mana’t, wa la yanfa’u dhal-jaddi minkal-jadd.',
        translation: {
          de: 'Es gibt keinen Gott außer Allah, dem Einzigen ohne Partner. Ihm gehört die Herrschaft und Ihm gebührt das Lob, und Er hat Macht über alle Dinge. O Allah, niemand kann verwehren, was Du gibst, und niemand kann geben, was Du verwehrst, und dem Wohlhabenden nützt sein Reichtum nichts vor Dir.',
          en: 'There is no god but Allah alone, without partner. His is the dominion and His is the praise, and He has power over all things. O Allah, none can withhold what You give and none can give what You withhold, and the wealth of the wealthy is of no avail against You.',
          tr: 'Allah’tan başka ilah yoktur; O tektir, ortağı yoktur. Mülk O’nundur, hamd O’na mahsustur. O her şeye kadirdir. Allah’ım! Senin verdiğine engel olacak, engel olduğunu verecek kimse yoktur. Zenginlik sahibine zenginliği Sana karşı fayda vermez.',
        },
        repeat: 1,
        source: 'Sahih al-Bukhari 844; Sahih Muslim 593',
        grade: 'sahih',
        review: DRAFT,
      },
      {
        id: 'after-prayer-subhanallah',
        ...SUBHANALLAH,
        repeat: 33,
        source: 'Sahih Muslim 597',
        grade: 'sahih',
        review: DRAFT,
      },
      {
        id: 'after-prayer-alhamdulillah',
        ...ALHAMDULILLAH,
        repeat: 33,
        source: 'Sahih Muslim 597',
        grade: 'sahih',
        review: DRAFT,
      },
      {
        id: 'after-prayer-allahu-akbar',
        ...ALLAHU_AKBAR,
        repeat: 33,
        source: 'Sahih Muslim 597',
        grade: 'sahih',
        review: DRAFT,
      },
      {
        id: 'after-prayer-tahlil',
        ...TAHLIL,
        repeat: 1,
        source: 'Sahih Muslim 597',
        grade: 'sahih',
        occasion: {
          de: 'Vervollständigt die Hundert nach 33 × Subhanallah, 33 × Alhamdulillah und 33 × Allahu akbar.',
          en: 'Completes the hundred after 33 × Subhanallah, 33 × Alhamdulillah and 33 × Allahu akbar.',
          tr: '33 Sübhanallah, 33 Elhamdülillah ve 33 Allahu ekber’den sonra yüzü tamamlar.',
        },
        virtue: {
          de: 'Wer dies nach jedem Gebet spricht, dem werden seine Sünden vergeben, selbst wenn sie so zahlreich wären wie der Schaum des Meeres.',
          en: 'Whoever says this after every prayer, his sins are forgiven even if they were like the foam of the sea.',
          tr: 'Kim bunu her namazdan sonra söylerse, günahları deniz köpüğü kadar olsa bile bağışlanır.',
        },
        review: DRAFT,
      },
      {
        id: 'after-prayer-ainni',
        arabic: 'اللَّهُمَّ أَعِنِّي عَلَىٰ ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
        transliteration: 'Allahumma a’inni ’ala dhikrika wa shukrika wa husni ’ibadatik.',
        translation: {
          de: 'O Allah, hilf mir, Deiner zu gedenken, Dir zu danken und Dir auf schönste Weise zu dienen.',
          en: 'O Allah, help me to remember You, to thank You and to worship You in the best way.',
          tr: 'Allah’ım! Seni zikretmem, Sana şükretmem ve Sana güzelce ibadet etmem için bana yardım et.',
        },
        repeat: 1,
        source: 'Sunan Abi Dawud 1522',
        grade: 'sahih',
        occasion: {
          de: 'Der Prophet ﷺ riet Mu’adh, es am Ende jedes Gebets nicht zu unterlassen.',
          en: 'The Prophet ﷺ advised Mu’adh never to leave it at the end of every prayer.',
          tr: 'Peygamber ﷺ, Muaz’a bunu her namazın sonunda bırakmamasını tavsiye etmiştir.',
        },
        review: DRAFT,
      },
    ],
  },
  {
    id: 'sleep',
    icon: '🛏️',
    items: [
      {
        id: 'sleep-bismika',
        arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
        transliteration: 'Bismika Allahumma amutu wa ahya.',
        translation: {
          de: 'In Deinem Namen, o Allah, sterbe ich und lebe ich.',
          en: 'In Your name, O Allah, I die and I live.',
          tr: 'Allah’ım! Senin adınla ölür, Senin adınla dirilirim.',
        },
        repeat: 1,
        source: 'Sahih al-Bukhari 6324',
        grade: 'sahih',
        review: DRAFT,
      },
      {
        id: 'sleep-ayat-al-kursi',
        ...AYAT_AL_KURSI,
        repeat: 1,
        source: 'Quran 2:255',
        virtue: {
          de: 'Wer sie beim Schlafengehen rezitiert, über den wacht ein Beschützer von Allah, und kein Satan nähert sich ihm bis zum Morgen.',
          en: 'Whoever recites it when going to bed has a guardian from Allah watching over him, and no devil comes near him until morning.',
          tr: 'Kim onu yatarken okursa, Allah tarafından bir koruyucu onu gözetir ve sabaha kadar şeytan ona yaklaşamaz.',
        },
        virtueSource: 'Sahih al-Bukhari 2311',
        review: DRAFT,
      },
      {
        id: 'sleep-last-two-baqarah',
        ...LAST_TWO_BAQARAH,
        repeat: 1,
        source: 'Quran 2:285–286',
        virtue: {
          de: 'Wer die letzten beiden Verse der Sura Al-Baqara in der Nacht rezitiert, dem genügen sie.',
          en: 'Whoever recites the last two verses of Surat al-Baqarah at night, they will suffice him.',
          tr: 'Kim Bakara suresinin son iki ayetini gece okursa, bu ona yeter.',
        },
        virtueSource: 'Sahih al-Bukhari 5009; Sahih Muslim 807',
        review: DRAFT,
      },
      {
        id: 'sleep-three-quls',
        arabic: [AL_IKHLAS.arabic, AL_FALAQ.arabic, AN_NAS.arabic].join('\n'),
        transliteration: [AL_IKHLAS.transliteration, AL_FALAQ.transliteration, AN_NAS.transliteration].join('\n'),
        translation: {
          de: 'Die Suren Al-Ikhlas (112), Al-Falaq (113) und An-Nas (114).',
          en: 'The surahs Al-Ikhlas (112), Al-Falaq (113) and An-Nas (114).',
          tr: 'İhlâs (112), Felak (113) ve Nâs (114) sureleri.',
        },
        repeat: 3,
        source: 'Quran 112–114 · Sahih al-Bukhari 5017',
        grade: 'sahih',
        occasion: {
          de: 'Die Hände zusammenlegen, hineinhauchen, die drei Suren rezitieren und dann damit über den Körper streichen, so weit man reicht – dreimal.',
          en: 'Bring the palms together, blow lightly into them, recite the three surahs, then wipe over as much of the body as you can – three times.',
          tr: 'Avuçları birleştirip içine hafifçe üfle, üç sureyi oku, sonra elinin yetiştiği kadar vücudunu mesh et – üç kez.',
        },
        review: DRAFT,
      },
      {
        id: 'sleep-subhanallah',
        ...SUBHANALLAH,
        repeat: 33,
        source: 'Sahih al-Bukhari 6318; Sahih Muslim 2727',
        grade: 'sahih',
        review: DRAFT,
      },
      {
        id: 'sleep-alhamdulillah',
        ...ALHAMDULILLAH,
        repeat: 33,
        source: 'Sahih al-Bukhari 6318; Sahih Muslim 2727',
        grade: 'sahih',
        review: DRAFT,
      },
      {
        id: 'sleep-allahu-akbar',
        ...ALLAHU_AKBAR,
        repeat: 34,
        source: 'Sahih al-Bukhari 6318; Sahih Muslim 2727',
        grade: 'sahih',
        virtue: {
          de: 'Der Prophet ﷺ lehrte dies Ali und Fatima vor dem Schlafen und sagte, es sei besser für sie als ein Diener.',
          en: 'The Prophet ﷺ taught this to Ali and Fatima for bedtime and said it is better for them than a servant.',
          tr: 'Peygamber ﷺ bunu yatmadan önce Ali ve Fatıma’ya öğretmiş ve bunun onlar için bir hizmetçiden daha hayırlı olduğunu söylemiştir.',
        },
        review: DRAFT,
      },
    ],
  },
  {
    id: 'waking',
    icon: '🌄',
    items: [
      {
        id: 'waking-alhamdulillah-ahyana',
        arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
        transliteration: 'Alhamdu lillahil-ladhi ahyana ba’da ma amatana wa ilayhin-nushur.',
        translation: {
          de: 'Alles Lob gebührt Allah, der uns wieder lebendig gemacht hat, nachdem Er uns hat sterben lassen, und zu Ihm ist die Auferstehung.',
          en: 'All praise is for Allah who gave us life after He had caused us to die, and to Him is the resurrection.',
          tr: 'Bizi öldürdükten sonra dirilten Allah’a hamd olsun. Dönüş O’nadır.',
        },
        repeat: 1,
        source: 'Sahih al-Bukhari 6324',
        grade: 'sahih',
        occasion: { de: 'Beim Aufwachen.', en: 'Upon waking up.', tr: 'Uyanınca.' },
        review: DRAFT,
      },
      {
        id: 'waking-night',
        arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ، الْحَمْدُ لِلَّهِ، وَسُبْحَانَ اللَّهِ، وَلَا إِلَٰهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ، اللَّهُمَّ اغْفِرْ لِي',
        transliteration: 'La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa ’ala kulli shay’in qadir. Alhamdulillah, wa subhanallah, wa la ilaha illallah, wallahu akbar, wa la hawla wa la quwwata illa billah. Allahummaghfir li.',
        translation: {
          de: 'Es gibt keinen Gott außer Allah, dem Einzigen ohne Partner. Ihm gehört die Herrschaft und Ihm gebührt das Lob, und Er hat Macht über alle Dinge. Alles Lob gebührt Allah, gepriesen sei Allah, es gibt keinen Gott außer Allah, Allah ist größer, und es gibt keine Macht und keine Kraft außer bei Allah. O Allah, vergib mir.',
          en: 'There is no god but Allah alone, without partner. His is the dominion and His is the praise, and He has power over all things. All praise is for Allah, glory be to Allah, there is no god but Allah, Allah is the Greatest, and there is no might nor power except with Allah. O Allah, forgive me.',
          tr: 'Allah’tan başka ilah yoktur; O tektir, ortağı yoktur. Mülk O’nundur, hamd O’na mahsustur. O her şeye kadirdir. Hamd Allah’adır, Allah her türlü eksiklikten münezzehtir, Allah’tan başka ilah yoktur, Allah en büyüktür. Güç ve kuvvet ancak Allah’ladır. Allah’ım, beni bağışla.',
        },
        repeat: 1,
        source: 'Sahih al-Bukhari 1154',
        grade: 'sahih',
        occasion: { de: 'Wenn man nachts aufwacht.', en: 'When waking up during the night.', tr: 'Gece uyanınca.' },
        virtue: {
          de: 'Wer danach Bittgebete spricht, wird erhört; wer dann die Gebetswaschung vollzieht und betet, dessen Gebet wird angenommen.',
          en: 'If he then supplicates, he is answered; and if he performs ablution and prays, his prayer is accepted.',
          tr: 'Ardından dua ederse duası kabul edilir; abdest alıp namaz kılarsa namazı kabul olunur.',
        },
        review: DRAFT,
      },
    ],
  },
  {
    id: 'travel',
    icon: '✈️',
    items: [
      {
        id: 'travel-dua',
        arabic: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ، اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَٰذَا الْبِرَّ وَالتَّقْوَىٰ، وَمِنَ الْعَمَلِ مَا تَرْضَىٰ، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَٰذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ',
        transliteration: 'Allahu akbar, Allahu akbar, Allahu akbar. Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila rabbina la-munqalibun. Allahumma inna nas’aluka fi safarina hadhal-birra wat-taqwa, wa minal-’amali ma tarda. Allahumma hawwin ’alayna safarana hadha watwi ’anna bu’dah. Allahumma antas-sahibu fis-safar, wal-khalifatu fil-ahl. Allahumma inni a’udhu bika min wa’tha’is-safar, wa ka’abatil-manzar, wa su’il-munqalabi fil-mali wal-ahl.',
        translation: {
          de: 'Allah ist größer (3×). Gepriesen sei Der, der uns dies dienstbar gemacht hat, wozu wir selbst nicht imstande gewesen wären, und wahrlich, zu unserem Herrn kehren wir zurück. O Allah, wir bitten Dich auf dieser unserer Reise um Güte und Gottesfurcht und um Taten, die Dir gefallen. O Allah, erleichtere uns diese Reise und verkürze uns ihre Entfernung. O Allah, Du bist der Begleiter auf der Reise und der Statthalter bei der Familie. O Allah, ich suche Zuflucht bei Dir vor den Mühen der Reise, vor bedrückendem Anblick und vor schlimmer Heimkehr zu Besitz und Familie.',
          en: 'Allah is the Greatest (3×). Glory be to Him who has subjected this to us, though we could never have done so ourselves, and indeed to our Lord we will return. O Allah, we ask You on this journey of ours for righteousness and piety, and for deeds that please You. O Allah, make this journey easy for us and shorten its distance for us. O Allah, You are the Companion on the journey and the One who looks after the family. O Allah, I seek refuge with You from the hardships of travel, from distressing sights, and from an evil return to my wealth and family.',
          tr: 'Allah en büyüktür (3 kez). Bunu bizim hizmetimize veren Allah’ı tesbih ederiz; yoksa biz buna güç yetiremezdik. Şüphesiz biz Rabbimize döneceğiz. Allah’ım! Bu yolculuğumuzda Senden iyilik ve takva, razı olacağın amel isteriz. Allah’ım! Bu yolculuğu bize kolaylaştır, uzaklığını yakın et. Allah’ım! Yolculukta yoldaş, ailede vekil Sensin. Allah’ım! Yolculuğun zorluğundan, üzücü manzaradan, malda ve ailede kötü bir dönüşten Sana sığınırım.',
        },
        repeat: 1,
        source: 'Sahih Muslim 1342',
        grade: 'sahih',
        occasion: {
          de: 'Beim Aufbruch, sobald man im Fahrzeug bzw. auf dem Reittier sitzt.',
          en: 'When setting out, once seated in the vehicle or on the mount.',
          tr: 'Yola çıkarken, araca ya da bineğe yerleşince.',
        },
        review: DRAFT,
      },
      {
        id: 'travel-return',
        arabic: 'آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ',
        transliteration: 'Ayibuna, ta’ibuna, ’abiduna, li-rabbina hamidun.',
        translation: {
          de: 'Wir kehren zurück, bereuend, (Allah) dienend und unseren Herrn lobpreisend.',
          en: 'We return, repenting, worshipping, and praising our Lord.',
          tr: 'Dönüyoruz, tövbe ediyoruz, ibadet ediyoruz, Rabbimize hamd ediyoruz.',
        },
        repeat: 1,
        source: 'Sahih Muslim 1342',
        grade: 'sahih',
        occasion: {
          de: 'Bei der Rückkehr – zusätzlich zum Reisebittgebet.',
          en: 'On the way back – in addition to the travel supplication.',
          tr: 'Dönüşte – yolculuk duasına ek olarak.',
        },
        review: DRAFT,
      },
      {
        id: 'travel-stopping-place',
        ...AUDHU_BI_KALIMAT,
        repeat: 1,
        source: 'Sahih Muslim 2708',
        grade: 'sahih',
        occasion: {
          de: 'Wenn man unterwegs an einem Ort Halt macht oder einkehrt.',
          en: 'When stopping or settling at a place during a journey.',
          tr: 'Yolculukta bir yerde konaklarken.',
        },
        virtue: {
          de: 'Wer dies an einem Rastplatz spricht, dem schadet nichts, bis er von dort weiterzieht.',
          en: 'Whoever says this at a stopping place, nothing will harm him until he leaves it.',
          tr: 'Kim konakladığı yerde bunu söylerse, oradan ayrılana kadar hiçbir şey ona zarar vermez.',
        },
        review: DRAFT,
      },
    ],
  },
  {
    id: 'home',
    icon: '🏠',
    items: [
      {
        id: 'home-entering',
        ...BISMILLAH,
        repeat: 1,
        source: 'Sahih Muslim 2018',
        grade: 'sahih',
        occasion: {
          de: 'Beim Betreten des Hauses (und vor dem Essen) Allah erwähnen.',
          en: 'Mention Allah when entering the house (and before eating).',
          tr: 'Eve girerken (ve yemekten önce) Allah’ı anmak.',
        },
        virtue: {
          de: 'Dann sagt der Satan (zu seinen Gefährten): Hier gibt es für euch weder Unterkunft noch Abendessen.',
          en: 'Then Satan says (to his companions): there is no lodging and no dinner for you here.',
          tr: 'O zaman şeytan (arkadaşlarına): “Burada size ne kalacak yer var ne de akşam yemeği” der.',
        },
        review: DRAFT,
      },
      {
        id: 'home-leaving',
        arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
        transliteration: 'Bismillah, tawakkaltu ’alallah, wa la hawla wa la quwwata illa billah.',
        translation: {
          de: 'Im Namen Allahs. Ich vertraue auf Allah, und es gibt keine Macht und keine Kraft außer bei Allah.',
          en: 'In the name of Allah. I put my trust in Allah, and there is no might nor power except with Allah.',
          tr: 'Allah’ın adıyla. Allah’a tevekkül ettim. Güç ve kuvvet ancak Allah’ladır.',
        },
        repeat: 1,
        source: 'Sunan Abi Dawud 5095; Jami’ at-Tirmidhi 3426',
        grade: 'sahih',
        occasion: { de: 'Beim Verlassen des Hauses.', en: 'When leaving the house.', tr: 'Evden çıkarken.' },
        virtue: {
          de: 'Ihm wird gesagt: Du bist rechtgeleitet, versorgt und beschützt – und der Satan weicht von ihm.',
          en: 'It is said to him: you are guided, provided for and protected – and Satan turns away from him.',
          tr: 'Ona: “Hidayete erdin, ihtiyacın karşılandı ve korundun” denir ve şeytan ondan uzaklaşır.',
        },
        review: DRAFT,
      },
    ],
  },
  {
    id: 'food',
    icon: '🍽️',
    items: [
      {
        id: 'food-before',
        ...BISMILLAH,
        repeat: 1,
        source: 'Sahih al-Bukhari 5376; Sahih Muslim 2022',
        grade: 'sahih',
        occasion: {
          de: 'Vor dem Essen – und mit der rechten Hand essen.',
          en: 'Before eating – and eat with the right hand.',
          tr: 'Yemekten önce – ve sağ elle yemek.',
        },
        review: DRAFT,
      },
      {
        id: 'food-forgot',
        arabic: 'بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ',
        transliteration: 'Bismillahi awwalahu wa akhirah.',
        translation: {
          de: 'Im Namen Allahs – an seinem Anfang und an seinem Ende.',
          en: 'In the name of Allah – at its beginning and at its end.',
          tr: 'Başında da sonunda da Allah’ın adıyla.',
        },
        repeat: 1,
        source: 'Sunan Abi Dawud 3767',
        grade: 'sahih',
        occasion: {
          de: 'Wenn man vergessen hat, zu Beginn „Bismillah“ zu sagen.',
          en: 'If you forgot to say “Bismillah” at the beginning.',
          tr: 'Başta “Bismillah” demeyi unuttuysan.',
        },
        review: DRAFT,
      },
      {
        id: 'food-after-atamani',
        arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَٰذَا، وَرَزَقَنِيهِ، مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
        transliteration: 'Alhamdu lillahil-ladhi at’amani hadha, wa razaqanihi, min ghayri hawlin minni wa la quwwah.',
        translation: {
          de: 'Alles Lob gebührt Allah, der mir dies zu essen gab und es mir gewährte, ohne Macht und Kraft von meiner Seite.',
          en: 'All praise is for Allah who fed me this and provided it for me without any might or power on my part.',
          tr: 'Bana bunu yediren ve benim hiçbir güç ve kuvvetim olmadan bunu bana rızık olarak veren Allah’a hamd olsun.',
        },
        repeat: 1,
        source: 'Sunan Abi Dawud 4023; Jami’ at-Tirmidhi 3458',
        grade: 'hasan',
        occasion: { de: 'Nach dem Essen.', en: 'After eating.', tr: 'Yemekten sonra.' },
        virtue: {
          de: 'Wer es nach dem Essen spricht, dem werden seine vergangenen Sünden vergeben.',
          en: 'Whoever says it after eating, his past sins are forgiven.',
          tr: 'Kim bunu yemekten sonra söylerse geçmiş günahları bağışlanır.',
        },
        review: DRAFT,
      },
      {
        id: 'food-after-kathiran',
        arabic: 'الْحَمْدُ لِلَّهِ كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ، غَيْرَ مَكْفِيٍّ، وَلَا مُوَدَّعٍ، وَلَا مُسْتَغْنًى عَنْهُ رَبَّنَا',
        transliteration: 'Alhamdu lillahi kathiran tayyiban mubarakan fih, ghayra makfiyyin, wa la muwadda’in, wa la mustaghnan ’anhu rabbana.',
        translation: {
          de: 'Alles Lob gebührt Allah – reichliches, gutes und gesegnetes Lob; ein Lob, das nie genügt, nie aufgegeben wird und auf das man nie verzichten kann, unser Herr.',
          en: 'All praise is for Allah – abundant, good and blessed praise; praise that is never sufficient, never abandoned and never dispensed with, our Lord.',
          tr: 'Allah’a çok, temiz ve bereketli hamd olsun. Rabbimiz! Bu hamd yeterli görülemez, terk edilemez ve ondan müstağni kalınamaz.',
        },
        repeat: 1,
        source: 'Sahih al-Bukhari 5458',
        grade: 'sahih',
        occasion: { de: 'Nach dem Essen.', en: 'After eating.', tr: 'Yemekten sonra.' },
        review: DRAFT,
      },
    ],
  },
  {
    id: 'distress',
    icon: '🕊️',
    items: [
      {
        id: 'distress-karb',
        arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَٰهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَٰهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ',
        transliteration: 'La ilaha illallahul-’azimul-halim. La ilaha illallahu rabbul-’arshil-’azim. La ilaha illallahu rabbus-samawati wa rabbul-ardi wa rabbul-’arshil-karim.',
        translation: {
          de: 'Es gibt keinen Gott außer Allah, dem Gewaltigen, dem Nachsichtigen. Es gibt keinen Gott außer Allah, dem Herrn des gewaltigen Thrones. Es gibt keinen Gott außer Allah, dem Herrn der Himmel, dem Herrn der Erde und dem Herrn des edlen Thrones.',
          en: 'There is no god but Allah, the Mighty, the Forbearing. There is no god but Allah, Lord of the mighty Throne. There is no god but Allah, Lord of the heavens, Lord of the earth and Lord of the noble Throne.',
          tr: 'Azim ve Halim olan Allah’tan başka ilah yoktur. Büyük Arş’ın Rabbi olan Allah’tan başka ilah yoktur. Göklerin Rabbi, yerin Rabbi ve değerli Arş’ın Rabbi olan Allah’tan başka ilah yoktur.',
        },
        repeat: 1,
        source: 'Sahih al-Bukhari 6346; Sahih Muslim 2730',
        grade: 'sahih',
        occasion: {
          de: 'Der Prophet ﷺ sprach es in Zeiten großer Bedrängnis.',
          en: 'The Prophet ﷺ said it in times of distress.',
          tr: 'Peygamber ﷺ sıkıntı anında bunu söylerdi.',
        },
        review: DRAFT,
      },
      {
        id: 'distress-yunus',
        arabic: 'لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
        transliteration: 'La ilaha illa anta subhanaka inni kuntu minaz-zalimin.',
        translation: {
          de: 'Es gibt keinen Gott außer Dir. Gepriesen seist Du! Ich gehörte wahrlich zu den Unrechttuenden.',
          en: 'There is no god but You. Glory be to You! Indeed, I have been among the wrongdoers.',
          tr: 'Senden başka ilah yoktur. Seni tenzih ederim. Ben gerçekten zalimlerden oldum.',
        },
        repeat: 1,
        source: 'Quran 21:87',
        occasion: {
          de: 'Das Bittgebet des Propheten Yunus (Jona) im Bauch des Fisches.',
          en: 'The supplication of Prophet Yunus (Jonah) in the belly of the whale.',
          tr: 'Hz. Yunus’un balığın karnındaki duası.',
        },
        virtue: {
          de: 'Kein Muslim ruft damit in irgendeiner Angelegenheit zu seinem Herrn, ohne dass Er ihn erhört.',
          en: 'No Muslim calls upon his Lord with it in any matter without Him answering him.',
          tr: 'Hiçbir Müslüman herhangi bir konuda bununla Rabbine dua etmez ki, Allah onun duasını kabul etmesin.',
        },
        virtueSource: 'Jami’ at-Tirmidhi 3505',
        review: DRAFT,
      },
      {
        id: 'distress-hasbunallah',
        arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
        transliteration: 'Hasbunallahu wa ni’mal-wakil.',
        translation: {
          de: 'Allah genügt uns, und welch vortrefflicher Sachwalter ist Er!',
          en: 'Allah is sufficient for us, and He is the best Disposer of affairs.',
          tr: 'Allah bize yeter; O ne güzel vekildir.',
        },
        repeat: 1,
        source: 'Quran 3:173',
        virtue: {
          de: 'Ibrahim sagte es, als er ins Feuer geworfen wurde, und Muhammad ﷺ, als man ihm sagte, die Leute hätten sich gegen ihn versammelt.',
          en: 'Ibrahim said it when he was thrown into the fire, and Muhammad ﷺ when he was told that people had gathered against him.',
          tr: 'İbrahim ateşe atıldığında, Muhammed ﷺ ise insanların kendisine karşı toplandığı söylendiğinde bunu söylemiştir.',
        },
        virtueSource: 'Sahih al-Bukhari 4563',
        review: DRAFT,
      },
      {
        id: 'distress-hamm-hazan',
        arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ',
        transliteration: 'Allahumma inni a’udhu bika minal-hammi wal-hazan, wal-’ajzi wal-kasal, wal-bukhli wal-jubn, wa dala’id-dayni wa ghalabatir-rijal.',
        translation: {
          de: 'O Allah, ich suche Zuflucht bei Dir vor Sorge und Kummer, vor Unfähigkeit und Trägheit, vor Geiz und Feigheit, vor der Last der Schulden und davor, von Menschen überwältigt zu werden.',
          en: 'O Allah, I seek refuge with You from worry and grief, from helplessness and laziness, from miserliness and cowardice, from the burden of debt and from being overpowered by people.',
          tr: 'Allah’ım! Kaygıdan ve hüzünden, acizlikten ve tembellikten, cimrilikten ve korkaklıktan, borç yükünden ve insanların baskısından Sana sığınırım.',
        },
        repeat: 1,
        source: 'Sahih al-Bukhari 6369',
        grade: 'sahih',
        review: DRAFT,
      },
      {
        id: 'distress-musibah',
        arabic: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي، وَأَخْلِفْ لِي خَيْرًا مِنْهَا',
        transliteration: 'Inna lillahi wa inna ilayhi raji’un. Allahumma’jurni fi musibati, wa akhlif li khayran minha.',
        translation: {
          de: 'Wir gehören Allah, und zu Ihm kehren wir zurück. O Allah, belohne mich in meinem Unglück und gib mir dafür etwas Besseres als Ersatz.',
          en: 'To Allah we belong and to Him we shall return. O Allah, reward me in my affliction and replace it for me with something better.',
          tr: 'Biz Allah’a aidiz ve O’na döneceğiz. Allah’ım! Bu musibetimde bana ecir ver ve onun yerine bana daha hayırlısını ver.',
        },
        repeat: 1,
        source: 'Sahih Muslim 918',
        grade: 'sahih',
        occasion: {
          de: 'Bei einem Verlust oder Unglück.',
          en: 'When struck by a loss or misfortune.',
          tr: 'Bir kayıp ya da musibet anında.',
        },
        virtue: {
          de: 'Wer dies bei einem Unglück sagt, dem gibt Allah etwas Besseres als Ersatz.',
          en: 'Whoever says this when afflicted, Allah will replace it for him with something better.',
          tr: 'Kim musibet anında bunu söylerse Allah ona daha hayırlısını verir.',
        },
        review: DRAFT,
      },
    ],
  },
]

export function getAdhkarSet(id: string): AdhkarSet | undefined {
  return ADHKAR_SETS.find(s => s.id === id)
}

/** i18n key suffix for a set id ('after-prayer' → 'afterPrayer'). */
export function adhkarSetKey(id: AdhkarSetId): string {
  return id.replace(/-(\w)/g, (_, c: string) => c.toUpperCase())
}

export function isAdhkarSetId(id: unknown): id is AdhkarSetId {
  return typeof id === 'string' && (ADHKAR_SET_IDS as readonly string[]).includes(id)
}
