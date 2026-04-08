/**
 * Curated Hadith collection.
 * ~50 well-known hadiths from Sahih Bukhari, Sahih Muslim, and other authentic sources.
 * Arabic text + translations in DE/EN/TR.
 */

export interface Hadith {
  id: number
  category: string
  arabic: string
  translations: {
    de: string
    en: string
    tr: string
  }
  source: string       // e.g. "Bukhari 1", "Muslim 2564"
  narrator?: string    // e.g. "Abu Huraira"
}

export const HADITH_CATEGORIES = [
  'faith', 'character', 'prayer', 'knowledge', 'community', 'daily', 'mercy', 'deeds',
  'ramadan', 'patience', 'gratitude', 'children', 'economy', 'afterlife',
] as const

export const HADITHS: Hadith[] = [
  // === FAITH ===
  {
    id: 1,
    category: 'faith',
    arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    translations: {
      de: 'Die Taten sind nur entsprechend den Absichten, und jedem Menschen steht nur das zu, was er beabsichtigt hat.',
      en: 'Actions are judged by intentions, and every person will get what they intended.',
      tr: 'Ameller niyetlere göredir. Herkese niyet ettiği şey vardır.',
    },
    source: 'Bukhari 1, Muslim 1907',
    narrator: 'Umar ibn al-Khattab',
  },
  {
    id: 2,
    category: 'faith',
    arabic: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
    translations: {
      de: 'Keiner von euch glaubt wahrhaftig, bis er für seinen Bruder wünscht, was er für sich selbst wünscht.',
      en: 'None of you truly believes until he loves for his brother what he loves for himself.',
      tr: 'Sizden biriniz kendisi için sevdiğini kardeşi için de sevmedikçe iman etmiş olmaz.',
    },
    source: 'Bukhari 13, Muslim 45',
    narrator: 'Anas ibn Malik',
  },
  {
    id: 3,
    category: 'faith',
    arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
    translations: {
      de: 'Wer an Allah und den Jüngsten Tag glaubt, der soll Gutes sagen oder schweigen.',
      en: 'Whoever believes in Allah and the Last Day, let him speak good or remain silent.',
      tr: 'Allah\'a ve ahiret gününe iman eden ya hayır söylesin ya da sussun.',
    },
    source: 'Bukhari 6018, Muslim 47',
    narrator: 'Abu Huraira',
  },
  {
    id: 4,
    category: 'faith',
    arabic: 'الدِّينُ النَّصِيحَةُ',
    translations: {
      de: 'Die Religion ist aufrichtiger Rat.',
      en: 'The religion is sincere advice.',
      tr: 'Din nasihattir.',
    },
    source: 'Muslim 55',
    narrator: 'Tamim ad-Dari',
  },

  // === CHARACTER ===
  {
    id: 5,
    category: 'character',
    arabic: 'إِنَّ مِنْ أَحَبِّكُمْ إِلَيَّ وَأَقْرَبِكُمْ مِنِّي مَجْلِسًا يَوْمَ الْقِيَامَةِ أَحَاسِنَكُمْ أَخْلَاقًا',
    translations: {
      de: 'Die mir Liebsten und am Jüngsten Tag am nächsten Sitzenden sind die mit dem besten Charakter.',
      en: 'The dearest to me and closest to me on the Day of Judgment are those with the best character.',
      tr: 'Kıyamet günü bana en sevgili ve en yakın olanınız, ahlakı en güzel olanınızdır.',
    },
    source: 'Tirmidhi 2018',
    narrator: 'Jabir',
  },
  {
    id: 6,
    category: 'character',
    arabic: 'لَا تَغْضَبْ',
    translations: {
      de: 'Werde nicht zornig.',
      en: 'Do not become angry.',
      tr: 'Kızma!',
    },
    source: 'Bukhari 6116',
    narrator: 'Abu Huraira',
  },
  {
    id: 7,
    category: 'character',
    arabic: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ',
    translations: {
      de: 'Dein Lächeln gegenüber deinem Bruder ist eine Spende.',
      en: 'Your smile to your brother is a charity.',
      tr: 'Kardeşinin yüzüne gülümsemen sadakadır.',
    },
    source: 'Tirmidhi 1956',
    narrator: 'Abu Dharr',
  },
  {
    id: 8,
    category: 'character',
    arabic: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ',
    translations: {
      de: 'Der Muslim ist derjenige, vor dessen Zunge und Hand die anderen Muslime sicher sind.',
      en: 'A Muslim is one from whose tongue and hand other Muslims are safe.',
      tr: 'Müslüman, dilinden ve elinden Müslümanların güvende olduğu kimsedir.',
    },
    source: 'Bukhari 10, Muslim 40',
    narrator: 'Abdullah ibn Amr',
  },
  {
    id: 9,
    category: 'character',
    arabic: 'مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلَّا عِزًّا',
    translations: {
      de: 'Eine Spende verringert niemals den Besitz. Allah erhöht durch Vergebung nur die Ehre eines Dieners.',
      en: 'Charity does not decrease wealth. Allah increases honor through forgiveness.',
      tr: 'Sadaka malı eksiltmez. Allah affeden kulun ancak şerefini artırır.',
    },
    source: 'Muslim 2588',
    narrator: 'Abu Huraira',
  },

  // === PRAYER ===
  {
    id: 10,
    category: 'prayer',
    arabic: 'الصَّلَاةُ عِمَادُ الدِّينِ',
    translations: {
      de: 'Das Gebet ist die Säule der Religion.',
      en: 'Prayer is the pillar of the religion.',
      tr: 'Namaz dinin direğidir.',
    },
    source: 'Baihaqi',
    narrator: 'Umar ibn al-Khattab',
  },
  {
    id: 11,
    category: 'prayer',
    arabic: 'أَقْرَبُ مَا يَكُونُ الْعَبْدُ مِنْ رَبِّهِ وَهُوَ سَاجِدٌ فَأَكْثِرُوا الدُّعَاءَ',
    translations: {
      de: 'Am nächsten ist der Diener seinem Herrn, wenn er in der Niederwerfung ist. Macht also viel Bittgebet.',
      en: 'The closest a servant is to his Lord is when he is in prostration, so increase your supplications.',
      tr: 'Kulun Rabbine en yakın olduğu an secdedeyken olduğu andır. O halde çok dua edin.',
    },
    source: 'Muslim 482',
    narrator: 'Abu Huraira',
  },
  {
    id: 12,
    category: 'prayer',
    arabic: 'مَنْ صَلَّى الْبَرْدَيْنِ دَخَلَ الْجَنَّةَ',
    translations: {
      de: 'Wer die beiden kühlen Gebete (Fajr und Asr) verrichtet, wird ins Paradies eintreten.',
      en: 'Whoever prays the two cool prayers (Fajr and Asr) will enter Paradise.',
      tr: 'İki serin vaktin (sabah ve ikindi) namazını kılan cennete girer.',
    },
    source: 'Bukhari 574, Muslim 635',
    narrator: 'Abu Musa al-Aschari',
  },

  // === KNOWLEDGE ===
  {
    id: 13,
    category: 'knowledge',
    arabic: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
    translations: {
      de: 'Das Streben nach Wissen ist eine Pflicht für jeden Muslim.',
      en: 'Seeking knowledge is an obligation upon every Muslim.',
      tr: 'İlim öğrenmek her Müslümana farzdır.',
    },
    source: 'Ibn Majah 224',
    narrator: 'Anas ibn Malik',
  },
  {
    id: 14,
    category: 'knowledge',
    arabic: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ',
    translations: {
      de: 'Wer einen Weg beschreitet, um Wissen zu suchen, dem erleichtert Allah einen Weg zum Paradies.',
      en: 'Whoever takes a path seeking knowledge, Allah will make easy for him a path to Paradise.',
      tr: 'Kim ilim aramak için bir yola girerse Allah ona cennete giden yolu kolaylaştırır.',
    },
    source: 'Muslim 2699',
    narrator: 'Abu Huraira',
  },
  {
    id: 15,
    category: 'knowledge',
    arabic: 'بَلِّغُوا عَنِّي وَلَوْ آيَةً',
    translations: {
      de: 'Übermittelt von mir, auch wenn es nur ein Vers ist.',
      en: 'Convey from me, even if it is one verse.',
      tr: 'Benden bir ayet bile olsa tebliğ edin.',
    },
    source: 'Bukhari 3461',
    narrator: 'Abdullah ibn Amr',
  },

  // === COMMUNITY ===
  {
    id: 16,
    category: 'community',
    arabic: 'مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ وَتَعَاطُفِهِمْ مَثَلُ الْجَسَدِ إِذَا اشْتَكَى مِنْهُ عُضْوٌ تَدَاعَى لَهُ سَائِرُ الْجَسَدِ بِالسَّهَرِ وَالْحُمَّى',
    translations: {
      de: 'Das Gleichnis der Gläubigen in ihrer gegenseitigen Liebe und ihrem Mitgefühl ist wie ein Körper: Wenn ein Glied leidet, reagiert der gesamte Körper mit Schlaflosigkeit und Fieber.',
      en: 'The believers in their mutual love and compassion are like one body; when one limb suffers, the whole body responds with sleeplessness and fever.',
      tr: 'Müminler sevgi ve merhamette bir vücut gibidir. Bir uzuv rahatsızlanınca diğer uzuvlar uykusuzluk ve ateşle ona ortak olurlar.',
    },
    source: 'Bukhari 6011, Muslim 2586',
    narrator: 'Nu\'man ibn Bashir',
  },
  {
    id: 17,
    category: 'community',
    arabic: 'الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا',
    translations: {
      de: 'Der Gläubige ist für den Gläubigen wie ein Bauwerk — einer stützt den anderen.',
      en: 'A believer to another believer is like a building — each part supports the other.',
      tr: 'Mümin müminin kardeşidir. Birbirlerini bir binanın tuğlaları gibi desteklerler.',
    },
    source: 'Bukhari 481, Muslim 2585',
    narrator: 'Abu Musa al-Aschari',
  },
  {
    id: 18,
    category: 'community',
    arabic: 'لَا يَدْخُلُ الْجَنَّةَ مَنْ لَا يَأْمَنُ جَارُهُ بَوَائِقَهُ',
    translations: {
      de: 'Wer ins Paradies eintreten möchte, vor dessen Übel sein Nachbar nicht sicher ist, wird es nicht betreten.',
      en: 'He will not enter Paradise whose neighbor is not safe from his harm.',
      tr: 'Komşusu zararından emin olmayan kişi cennete giremez.',
    },
    source: 'Muslim 46',
    narrator: 'Abu Huraira',
  },

  // === DAILY LIFE ===
  {
    id: 19,
    category: 'daily',
    arabic: 'مَنْ غَشَّنَا فَلَيْسَ مِنَّا',
    translations: {
      de: 'Wer uns betrügt, gehört nicht zu uns.',
      en: 'Whoever cheats us is not one of us.',
      tr: 'Bizi aldatan bizden değildir.',
    },
    source: 'Muslim 101',
    narrator: 'Abu Huraira',
  },
  {
    id: 20,
    category: 'daily',
    arabic: 'إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ',
    translations: {
      de: 'Allah liebt es, wenn jemand von euch eine Arbeit verrichtet, dass er sie gewissenhaft macht.',
      en: 'Allah loves that when one of you does work, they do it with excellence.',
      tr: 'Allah, birinizin bir iş yaptığında onu güzel yapmasını sever.',
    },
    source: 'Baihaqi, Tabarani',
    narrator: 'Aischa',
  },
  {
    id: 21,
    category: 'daily',
    arabic: 'كُلُّكُمْ رَاعٍ وَكُلُّكُمْ مَسْئُولٌ عَنْ رَعِيَّتِهِ',
    translations: {
      de: 'Jeder von euch ist ein Hirte, und jeder ist verantwortlich für seine Herde.',
      en: 'Each of you is a shepherd, and each is responsible for his flock.',
      tr: 'Hepiniz çobansınız ve hepiniz sürünüzden sorumlusunuz.',
    },
    source: 'Bukhari 893, Muslim 1829',
    narrator: 'Abdullah ibn Umar',
  },
  {
    id: 22,
    category: 'daily',
    arabic: 'خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ وَأَنَا خَيْرُكُمْ لِأَهْلِي',
    translations: {
      de: 'Der Beste unter euch ist der, der am besten zu seiner Familie ist. Und ich bin der Beste von euch zu meiner Familie.',
      en: 'The best of you are the best to their families, and I am the best of you to my family.',
      tr: 'En hayırlınız ailesine en hayırlı olanınızdır. Ben de aileme en hayırlı olanınızım.',
    },
    source: 'Tirmidhi 3895, Ibn Majah 1977',
    narrator: 'Aischa',
  },

  // === MERCY ===
  {
    id: 23,
    category: 'mercy',
    arabic: 'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ ارْحَمُوا مَنْ فِي الْأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ',
    translations: {
      de: 'Die Barmherzigen — der Allerbarmer erbarmt sich ihrer. Erbarmt euch derer auf der Erde, dann erbarmt sich eurer, Der im Himmel ist.',
      en: 'The merciful — the Most Merciful has mercy on them. Show mercy to those on earth, and the One in the heavens will show mercy to you.',
      tr: 'Merhamet edenler — Rahman onlara merhamet eder. Yeryüzündekilere merhamet edin ki gökteki de size merhamet etsin.',
    },
    source: 'Abu Dawud 4941, Tirmidhi 1924',
    narrator: 'Abdullah ibn Amr',
  },
  {
    id: 24,
    category: 'mercy',
    arabic: 'مَنْ لَا يَرْحَمُ النَّاسَ لَا يَرْحَمُهُ اللَّهُ',
    translations: {
      de: 'Wer den Menschen nicht barmherzig ist, dem erbarmt sich Allah nicht.',
      en: 'He who does not show mercy to the people, Allah will not show mercy to him.',
      tr: 'İnsanlara merhamet etmeyene Allah da merhamet etmez.',
    },
    source: 'Bukhari 7376, Muslim 2319',
    narrator: 'Jarir ibn Abdullah',
  },
  {
    id: 25,
    category: 'mercy',
    arabic: 'لَا تُنْزَعُ الرَّحْمَةُ إِلَّا مِنْ شَقِيٍّ',
    translations: {
      de: 'Barmherzigkeit wird nur dem Elenden entzogen.',
      en: 'Mercy is not removed except from a wretched person.',
      tr: 'Merhamet ancak bedbaht olandan alınır.',
    },
    source: 'Abu Dawud 4942, Tirmidhi 1923',
    narrator: 'Abu Huraira',
  },

  // === GOOD DEEDS ===
  {
    id: 26,
    category: 'deeds',
    arabic: 'أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ',
    translations: {
      de: 'Die beliebtesten Taten bei Allah sind die beständigsten, auch wenn sie gering sind.',
      en: 'The most beloved deeds to Allah are the most consistent, even if small.',
      tr: 'Allah\'a en sevimli ameller az da olsa devamlı yapılanıdır.',
    },
    source: 'Bukhari 6464, Muslim 783',
    narrator: 'Aischa',
  },
  {
    id: 27,
    category: 'deeds',
    arabic: 'اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ',
    translations: {
      de: 'Fürchte Allah, wo auch immer du bist. Lasse einer schlechten Tat eine gute folgen, sie wird sie auslöschen. Und behandle die Menschen mit gutem Charakter.',
      en: 'Fear Allah wherever you are, follow a bad deed with a good one to erase it, and behave well towards people.',
      tr: 'Nerede olursan ol Allah\'tan kork. Kötülüğün arkasından iyilik yap ki onu silsin. İnsanlara güzel ahlakla davran.',
    },
    source: 'Tirmidhi 1987',
    narrator: 'Abu Dharr & Muadh ibn Jabal',
  },
  {
    id: 28,
    category: 'deeds',
    arabic: 'مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ',
    translations: {
      de: 'Wer den Ramadan aus Glauben und in Hoffnung auf Belohnung fastet, dem werden seine vergangenen Sünden vergeben.',
      en: 'Whoever fasts Ramadan out of faith and hoping for reward, his past sins will be forgiven.',
      tr: 'Kim iman ederek ve sevabını Allah\'tan bekleyerek Ramazan orucunu tutarsa geçmiş günahları bağışlanır.',
    },
    source: 'Bukhari 38, Muslim 760',
    narrator: 'Abu Huraira',
  },
  {
    id: 29,
    category: 'deeds',
    arabic: 'إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ',
    translations: {
      de: 'Allah schaut nicht auf euer Äußeres und euren Besitz, sondern auf eure Herzen und eure Taten.',
      en: 'Allah does not look at your appearance or wealth, but at your hearts and your deeds.',
      tr: 'Allah sizin suretlerinize ve mallarınıza bakmaz, kalplerinize ve amellerinize bakar.',
    },
    source: 'Muslim 2564',
    narrator: 'Abu Huraira',
  },
  {
    id: 30,
    category: 'deeds',
    arabic: 'الطُّهُورُ شَطْرُ الْإِيمَانِ',
    translations: {
      de: 'Reinheit ist die Hälfte des Glaubens.',
      en: 'Cleanliness is half of faith.',
      tr: 'Temizlik imanın yarısıdır.',
    },
    source: 'Muslim 223',
    narrator: 'Abu Malik al-Aschari',
  },

  // === More FAITH ===
  {
    id: 31,
    category: 'faith',
    arabic: 'الدُّنْيَا سِجْنُ الْمُؤْمِنِ وَجَنَّةُ الْكَافِرِ',
    translations: {
      de: 'Das Diesseits ist das Gefängnis des Gläubigen und das Paradies des Ungläubigen.',
      en: 'The world is a prison for the believer and a paradise for the disbeliever.',
      tr: 'Dünya müminin zindanı, kâfirin cennetidir.',
    },
    source: 'Muslim 2956',
    narrator: 'Abu Huraira',
  },
  {
    id: 32,
    category: 'faith',
    arabic: 'يَسِّرُوا وَلَا تُعَسِّرُوا وَبَشِّرُوا وَلَا تُنَفِّرُوا',
    translations: {
      de: 'Macht es leicht und nicht schwer, und verkündet frohe Botschaft und schreckt nicht ab.',
      en: 'Make things easy and not difficult, and give glad tidings and do not drive people away.',
      tr: 'Kolaylaştırın, zorlaştırmayın. Müjdeleyin, nefret ettirmeyin.',
    },
    source: 'Bukhari 69, Muslim 1734',
    narrator: 'Anas ibn Malik',
  },

  // === More CHARACTER ===
  {
    id: 33,
    category: 'character',
    arabic: 'لَا يَحِلُّ لِمُسْلِمٍ أَنْ يَهْجُرَ أَخَاهُ فَوْقَ ثَلَاثَةِ أَيَّامٍ',
    translations: {
      de: 'Es ist einem Muslim nicht erlaubt, seinen Bruder mehr als drei Tage zu meiden.',
      en: 'It is not permissible for a Muslim to shun his brother for more than three days.',
      tr: 'Bir Müslümanın kardeşini üç günden fazla terk etmesi helal değildir.',
    },
    source: 'Bukhari 6077, Muslim 2559',
    narrator: 'Abu Ayyub al-Ansari',
  },
  {
    id: 34,
    category: 'character',
    arabic: 'إِيَّاكُمْ وَالظَّنَّ فَإِنَّ الظَّنَّ أَكْذَبُ الْحَدِيثِ',
    translations: {
      de: 'Hütet euch vor der Vermutung, denn die Vermutung ist die lügnerischste Rede.',
      en: 'Beware of suspicion, for suspicion is the most untruthful speech.',
      tr: 'Zandan sakının! Çünkü zan, sözlerin en yalanıdır.',
    },
    source: 'Bukhari 6064, Muslim 2563',
    narrator: 'Abu Huraira',
  },
  {
    id: 35,
    category: 'character',
    arabic: 'لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ',
    translations: {
      de: 'Der Starke ist nicht der gute Ringer, sondern der, der sich im Zorn beherrscht.',
      en: 'The strong man is not the good wrestler, but the one who controls himself when angry.',
      tr: 'Güçlü kişi güreşte yenen değil, öfke anında kendine hâkim olan kimsedir.',
    },
    source: 'Bukhari 6114, Muslim 2609',
    narrator: 'Abu Huraira',
  },

  // === More COMMUNITY ===
  {
    id: 36,
    category: 'community',
    arabic: 'خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ',
    translations: {
      de: 'Der beste Mensch ist der, der den Menschen am nützlichsten ist.',
      en: 'The best of people are those who are most beneficial to others.',
      tr: 'İnsanların en hayırlısı insanlara en faydalı olandır.',
    },
    source: 'Tabarani, Daraqutni',
    narrator: 'Jabir',
  },
  {
    id: 37,
    category: 'community',
    arabic: 'مَنْ كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ',
    translations: {
      de: 'Wer seinem Bruder in einer Angelegenheit hilft, dem hilft Allah in seiner Angelegenheit.',
      en: 'Whoever helps his brother in need, Allah will help him in his need.',
      tr: 'Kim kardeşinin ihtiyacını giderirse Allah da onun ihtiyacını giderir.',
    },
    source: 'Bukhari 2442, Muslim 2580',
    narrator: 'Abdullah ibn Umar',
  },

  // === More DEEDS ===
  {
    id: 38,
    category: 'deeds',
    arabic: 'مَنْ قَرَأَ حَرْفًا مِنْ كِتَابِ اللَّهِ فَلَهُ بِهِ حَسَنَةٌ وَالْحَسَنَةُ بِعَشْرِ أَمْثَالِهَا',
    translations: {
      de: 'Wer einen Buchstaben aus dem Buch Allahs liest, dem wird dafür eine gute Tat angerechnet. Und die gute Tat wird zehnfach belohnt.',
      en: 'Whoever reads a letter from the Book of Allah will receive a good deed, and each good deed is multiplied tenfold.',
      tr: 'Kim Allah\'ın kitabından bir harf okursa ona bir hasene yazılır. Her hasene on katıyla mükâfatlandırılır.',
    },
    source: 'Tirmidhi 2910',
    narrator: 'Abdullah ibn Masud',
  },
  {
    id: 39,
    category: 'deeds',
    arabic: 'إِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَمَلُهُ إِلَّا مِنْ ثَلَاثٍ صَدَقَةٍ جَارِيَةٍ أَوْ عِلْمٍ يُنْتَفَعُ بِهِ أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ',
    translations: {
      de: 'Wenn der Mensch stirbt, enden seine Taten, außer drei: eine fortlaufende Spende, nützliches Wissen oder ein rechtschaffenes Kind, das für ihn betet.',
      en: 'When a person dies, their deeds end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for them.',
      tr: 'İnsan öldüğünde ameli kesilir, ancak üç şey hariç: sadaka-i cariye, faydalı ilim ve kendisine dua eden salih evlat.',
    },
    source: 'Muslim 1631',
    narrator: 'Abu Huraira',
  },
  {
    id: 40,
    category: 'deeds',
    arabic: 'الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ',
    translations: {
      de: 'Ein gutes Wort ist eine Spende.',
      en: 'A good word is a charity.',
      tr: 'Güzel söz sadakadır.',
    },
    source: 'Bukhari 2989, Muslim 1009',
    narrator: 'Abu Huraira',
  },

  // === More MERCY / DAILY ===
  {
    id: 41,
    category: 'mercy',
    arabic: 'مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ',
    translations: {
      de: 'Wer einem Gläubigen eine weltliche Not erleichtert, dem erleichtert Allah eine Not am Tag der Auferstehung.',
      en: 'Whoever relieves a believer of a worldly hardship, Allah will relieve him of a hardship on the Day of Judgment.',
      tr: 'Kim bir müminin dünya sıkıntılarından birini giderirse Allah da onun kıyamet sıkıntılarından birini giderir.',
    },
    source: 'Muslim 2699',
    narrator: 'Abu Huraira',
  },
  {
    id: 42,
    category: 'daily',
    arabic: 'لَا ضَرَرَ وَلَا ضِرَارَ',
    translations: {
      de: 'Kein Schaden und keine Schädigung.',
      en: 'There should be neither harm nor reciprocal harm.',
      tr: 'Zarar vermek de zarara uğramak da yoktur.',
    },
    source: 'Ibn Majah 2341',
    narrator: 'Abu Said al-Khudri',
  },
  {
    id: 43,
    category: 'daily',
    arabic: 'مَنْ أَكَلَ طَيِّبًا وَعَمِلَ فِي سُنَّةٍ وَأَمِنَ النَّاسُ بَوَائِقَهُ دَخَلَ الْجَنَّةَ',
    translations: {
      de: 'Wer Erlaubtes isst, nach der Sunnah handelt und die Menschen vor seinem Übel sicher sind, der tritt ins Paradies ein.',
      en: 'Whoever eats what is lawful, acts upon the Sunnah, and people are safe from his harm, will enter Paradise.',
      tr: 'Helal yiyen, sünnete göre amel eden ve insanların zararından emin oldukları kişi cennete girer.',
    },
    source: 'Tirmidhi 2520',
    narrator: 'Abu Said al-Khudri',
  },

  // === RAMADAN ===
  {
    id: 44,
    category: 'ramadan',
    arabic: 'مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ',
    translations: {
      de: 'Wer den Ramadan aus Glauben und Hoffnung auf Belohnung fastet, dem werden seine vergangenen Sünden vergeben.',
      en: 'Whoever fasts Ramadan out of faith and seeking reward, his past sins will be forgiven.',
      tr: 'Kim inanarak ve karşılığını Allah\'tan bekleyerek Ramazan orucunu tutarsa geçmiş günahları bağışlanır.',
    },
    source: 'Bukhari 38, Muslim 760',
    narrator: 'Abu Huraira',
  },
  {
    id: 45,
    category: 'ramadan',
    arabic: 'مَنْ قَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ',
    translations: {
      de: 'Wer im Ramadan aus Glauben und Hoffnung auf Belohnung betet, dem werden seine vergangenen Sünden vergeben.',
      en: 'Whoever stands in prayer during Ramadan out of faith and seeking reward, his past sins will be forgiven.',
      tr: 'Kim inanarak ve karşılığını Allah\'tan bekleyerek Ramazan\'da namaz kılarsa geçmiş günahları bağışlanır.',
    },
    source: 'Bukhari 37, Muslim 759',
    narrator: 'Abu Huraira',
  },
  {
    id: 46,
    category: 'ramadan',
    arabic: 'إِذَا جَاءَ رَمَضَانُ فُتِحَتْ أَبْوَابُ الْجَنَّةِ وَغُلِّقَتْ أَبْوَابُ النَّارِ وَصُفِّدَتِ الشَّيَاطِينُ',
    translations: {
      de: 'Wenn der Ramadan kommt, werden die Tore des Paradieses geöffnet, die Tore der Hölle geschlossen und die Teufel in Ketten gelegt.',
      en: 'When Ramadan comes, the gates of Paradise are opened, the gates of Hellfire are closed, and the devils are chained.',
      tr: 'Ramazan geldiğinde cennet kapıları açılır, cehennem kapıları kapanır ve şeytanlar zincire vurulur.',
    },
    source: 'Bukhari 1899, Muslim 1079',
    narrator: 'Abu Huraira',
  },
  {
    id: 47,
    category: 'ramadan',
    arabic: 'مَنْ فَطَّرَ صَائِمًا كَانَ لَهُ مِثْلُ أَجْرِهِ غَيْرَ أَنَّهُ لَا يَنْقُصُ مِنْ أَجْرِ الصَّائِمِ شَيْئًا',
    translations: {
      de: 'Wer einem Fastenden das Fasten bricht, erhält die gleiche Belohnung, ohne dass die Belohnung des Fastenden gemindert wird.',
      en: 'Whoever provides food for a fasting person to break their fast will have a reward like theirs, without diminishing the fasting person\'s reward.',
      tr: 'Kim bir oruçluya iftar ettirirse, oruçlunun ecrinden hiçbir şey eksilmeksizin onun ecri kadar sevap kazanır.',
    },
    source: 'Tirmidhi 807',
    narrator: 'Zaid ibn Khalid al-Juhani',
  },
  {
    id: 48,
    category: 'ramadan',
    arabic: 'الصِّيَامُ جُنَّةٌ فَلَا يَرْفُثْ وَلَا يَجْهَلْ',
    translations: {
      de: 'Das Fasten ist ein Schutzschild. So soll man weder unanständig reden noch unwissend handeln.',
      en: 'Fasting is a shield. So one should not speak obscenely nor act ignorantly.',
      tr: 'Oruç bir kalkandır. Oruçlu kişi kötü söz söylemesin ve cahilce davranmasın.',
    },
    source: 'Bukhari 1894, Muslim 1151',
    narrator: 'Abu Huraira',
  },

  // === PATIENCE ===
  {
    id: 49,
    category: 'patience',
    arabic: 'عَجَبًا لِأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ',
    translations: {
      de: 'Wunderbar ist die Angelegenheit des Gläubigen, denn all seine Angelegenheiten sind gut für ihn.',
      en: 'How wonderful is the affair of the believer, for all his affairs are good.',
      tr: 'Müminin durumu ne güzeldir! Onun her hali hayırdır.',
    },
    source: 'Muslim 2999',
    narrator: 'Suhaib ar-Rumi',
  },
  {
    id: 50,
    category: 'patience',
    arabic: 'إِنَّمَا الصَّبْرُ عِنْدَ الصَّدْمَةِ الأُولَى',
    translations: {
      de: 'Wahre Geduld zeigt sich beim ersten Schock.',
      en: 'True patience is at the first stroke of calamity.',
      tr: 'Gerçek sabır, musibetin ilk anındaki sabırdır.',
    },
    source: 'Bukhari 1283, Muslim 926',
    narrator: 'Anas ibn Malik',
  },
  {
    id: 51,
    category: 'patience',
    arabic: 'مَا يُصِيبُ الْمُسْلِمَ مِنْ نَصَبٍ وَلَا وَصَبٍ وَلَا هَمٍّ وَلَا حُزْنٍ وَلَا أَذًى وَلَا غَمٍّ حَتَّى الشَّوْكَةِ يُشَاكُهَا إِلَّا كَفَّرَ اللَّهُ بِهَا مِنْ خَطَايَاهُ',
    translations: {
      de: 'Kein Muslim wird von Müdigkeit, Krankheit, Sorge, Trauer oder Leid getroffen – nicht einmal von einem Dorn – ohne dass Allah ihm dafür seine Sünden vergibt.',
      en: 'No Muslim is afflicted with fatigue, illness, worry, grief, or harm – not even a thorn prick – except that Allah expiates his sins thereby.',
      tr: 'Müslümanın başına gelen yorgunluk, hastalık, üzüntü, keder, sıkıntı ve gamdan, hatta batırılan dikene varıncaya kadar, Allah bunlar sebebiyle onun günahlarını bağışlar.',
    },
    source: 'Bukhari 5641, Muslim 2573',
    narrator: 'Abu Said al-Khudri',
  },
  {
    id: 52,
    category: 'patience',
    arabic: 'وَاعْلَمْ أَنَّ النَّصْرَ مَعَ الصَّبْرِ وَأَنَّ الْفَرَجَ مَعَ الْكَرْبِ وَأَنَّ مَعَ الْعُسْرِ يُسْرًا',
    translations: {
      de: 'Wisse, dass der Sieg mit der Geduld kommt, die Erleichterung mit der Not und die Leichtigkeit mit der Schwierigkeit.',
      en: 'Know that victory comes with patience, relief comes with affliction, and ease comes with hardship.',
      tr: 'Bil ki zafer sabırla, ferahlık sıkıntıyla ve kolaylık zorlukla birliktedir.',
    },
    source: 'Tirmidhi 2516',
    narrator: 'Abdullah ibn Abbas',
  },
  {
    id: 53,
    category: 'patience',
    arabic: 'وَمَنْ يَتَصَبَّرْ يُصَبِّرْهُ اللَّهُ وَمَا أُعْطِيَ أَحَدٌ عَطَاءً خَيْرًا وَأَوْسَعَ مِنَ الصَّبْرِ',
    translations: {
      de: 'Wer Geduld übt, dem gibt Allah Geduld. Und niemandem wurde eine bessere und umfassendere Gabe gegeben als Geduld.',
      en: 'Whoever exercises patience, Allah will grant him patience. No one is given a better or more generous gift than patience.',
      tr: 'Kim sabretmeye çalışırsa Allah ona sabır verir. Hiç kimseye sabırdan daha hayırlı ve geniş bir nimet verilmemiştir.',
    },
    source: 'Bukhari 1469, Muslim 1053',
    narrator: 'Abu Said al-Khudri',
  },

  // === GRATITUDE ===
  {
    id: 54,
    category: 'gratitude',
    arabic: 'مَنْ لَا يَشْكُرُ النَّاسَ لَا يَشْكُرُ اللَّهَ',
    translations: {
      de: 'Wer den Menschen nicht dankt, dankt Allah nicht.',
      en: 'Whoever does not thank people does not thank Allah.',
      tr: 'İnsanlara teşekkür etmeyen, Allah\'a şükretmez.',
    },
    source: 'Tirmidhi 1954',
    narrator: 'Abu Huraira',
  },
  {
    id: 55,
    category: 'gratitude',
    arabic: 'انْظُرُوا إِلَى مَنْ أَسْفَلَ مِنْكُمْ وَلَا تَنْظُرُوا إِلَى مَنْ هُوَ فَوْقَكُمْ فَهُوَ أَجْدَرُ أَنْ لَا تَزْدَرُوا نِعْمَةَ اللَّهِ',
    translations: {
      de: 'Schaut auf diejenigen, die weniger haben als ihr, und nicht auf diejenigen, die mehr haben. So werdet ihr die Gunst Allahs nicht gering schätzen.',
      en: 'Look at those below you and do not look at those above you, for that is more likely to prevent you from belittling Allah\'s blessings.',
      tr: 'Sizden aşağıda olanlara bakın, yukarıda olanlara bakmayın. Bu, Allah\'ın nimetini küçümsememeniz için daha uygundur.',
    },
    source: 'Muslim 2963',
    narrator: 'Abu Huraira',
  },
  {
    id: 56,
    category: 'gratitude',
    arabic: 'إِنَّ اللَّهَ لَيَرْضَى عَنِ الْعَبْدِ أَنْ يَأْكُلَ الأَكْلَةَ فَيَحْمَدَهُ عَلَيْهَا أَوْ يَشْرَبَ الشَّرْبَةَ فَيَحْمَدَهُ عَلَيْهَا',
    translations: {
      de: 'Allah ist wahrlich zufrieden mit dem Diener, der Ihm nach dem Essen dankt und Ihm nach dem Trinken dankt.',
      en: 'Allah is truly pleased with a servant who praises Him after eating and praises Him after drinking.',
      tr: 'Allah, yemek yiyip O\'na hamd eden ve su içip O\'na hamd eden kuldan razı olur.',
    },
    source: 'Muslim 2734',
    narrator: 'Anas ibn Malik',
  },
  {
    id: 57,
    category: 'gratitude',
    arabic: 'لَئِنْ شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
    translations: {
      de: 'Wenn ihr dankbar seid, werde Ich euch gewiss noch mehr geben.',
      en: 'If you are grateful, I will surely increase you.',
      tr: 'Şükrederseniz, elbette size nimetimi artırırım.',
    },
    source: 'Quran 14:7',
  },

  // === CHILDREN ===
  {
    id: 58,
    category: 'children',
    arabic: 'لَيْسَ مِنَّا مَنْ لَمْ يَرْحَمْ صَغِيرَنَا وَيُوَقِّرْ كَبِيرَنَا',
    translations: {
      de: 'Wer unsere Kleinen nicht mit Barmherzigkeit behandelt und unsere Älteren nicht respektiert, gehört nicht zu uns.',
      en: 'He is not one of us who does not show mercy to our young and respect to our elders.',
      tr: 'Küçüklerimize merhamet etmeyen ve büyüklerimize saygı göstermeyen bizden değildir.',
    },
    source: 'Tirmidhi 1919',
    narrator: 'Abdullah ibn Amr',
  },
  {
    id: 59,
    category: 'children',
    arabic: 'كُلُّكُمْ رَاعٍ وَكُلُّكُمْ مَسْئُولٌ عَنْ رَعِيَّتِهِ',
    translations: {
      de: 'Jeder von euch ist ein Hüter, und jeder von euch wird über seine Schutzbefohlenen befragt.',
      en: 'Each of you is a shepherd, and each of you is responsible for his flock.',
      tr: 'Hepiniz çobansınız ve hepiniz sürünüzden sorumlusunuz.',
    },
    source: 'Bukhari 893, Muslim 1829',
    narrator: 'Abdullah ibn Umar',
  },
  {
    id: 60,
    category: 'children',
    arabic: 'مَنْ عَالَ جَارِيَتَيْنِ حَتَّى تَبْلُغَا جَاءَ يَوْمَ الْقِيَامَةِ أَنَا وَهُوَ كَهَاتَيْنِ',
    translations: {
      de: 'Wer zwei Töchter aufzieht, bis sie erwachsen sind, der wird am Tag des Gerichts mit mir sein wie diese zwei Finger.',
      en: 'Whoever raises two daughters until they reach maturity, he and I will come on the Day of Judgment like these two fingers.',
      tr: 'Kim iki kız çocuğunu yetişkinliğe kadar yetiştirirse, kıyamet gününde o ve ben şu iki parmak gibi yanyana oluruz.',
    },
    source: 'Muslim 2631',
    narrator: 'Anas ibn Malik',
  },
  {
    id: 61,
    category: 'children',
    arabic: 'أَدِّبُوا أَوْلَادَكُمْ وَأَحْسِنُوا أَدَبَهُمْ',
    translations: {
      de: 'Erzieht eure Kinder und lehrt sie gutes Benehmen.',
      en: 'Discipline your children and teach them good manners.',
      tr: 'Çocuklarınızı terbiye edin ve onlara güzel ahlak öğretin.',
    },
    source: 'Ibn Majah 3671',
    narrator: 'Abdullah ibn Abbas',
  },

  // === ECONOMY ===
  {
    id: 62,
    category: 'economy',
    arabic: 'مَا أَكَلَ أَحَدٌ طَعَامًا قَطُّ خَيْرًا مِنْ أَنْ يَأْكُلَ مِنْ عَمَلِ يَدِهِ',
    translations: {
      de: 'Niemand hat je bessere Nahrung gegessen als die, die er mit seiner eigenen Hände Arbeit verdient hat.',
      en: 'No one has ever eaten better food than that earned by the work of his own hands.',
      tr: 'Hiçbir kimse kendi elinin emeğiyle kazandığından daha hayırlı bir yemek yememiştir.',
    },
    source: 'Bukhari 2072',
    narrator: 'Al-Miqdam',
  },
  {
    id: 63,
    category: 'economy',
    arabic: 'الْيَدُ الْعُلْيَا خَيْرٌ مِنَ الْيَدِ السُّفْلَى',
    translations: {
      de: 'Die gebende Hand ist besser als die nehmende Hand.',
      en: 'The upper hand (the giving hand) is better than the lower hand (the receiving hand).',
      tr: 'Veren el, alan elden hayırlıdır.',
    },
    source: 'Bukhari 1427, Muslim 1033',
    narrator: 'Abdullah ibn Umar',
  },
  {
    id: 64,
    category: 'economy',
    arabic: 'مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ',
    translations: {
      de: 'Almosen verringern den Reichtum nicht.',
      en: 'Charity does not decrease wealth.',
      tr: 'Sadaka malı eksiltmez.',
    },
    source: 'Muslim 2588',
    narrator: 'Abu Huraira',
  },
  {
    id: 65,
    category: 'economy',
    arabic: 'التَّاجِرُ الصَّدُوقُ الأَمِينُ مَعَ النَّبِيِّينَ وَالصِّدِّيقِينَ وَالشُّهَدَاءِ',
    translations: {
      de: 'Der ehrliche und vertrauenswürdige Kaufmann ist mit den Propheten, den Wahrhaftigen und den Märtyrern.',
      en: 'The honest and trustworthy merchant is with the Prophets, the truthful, and the martyrs.',
      tr: 'Doğru ve güvenilir tüccar, peygamberler, sıddıklar ve şehitlerle beraberdir.',
    },
    source: 'Tirmidhi 1209',
    narrator: 'Abu Said al-Khudri',
  },
  {
    id: 66,
    category: 'economy',
    arabic: 'مَنْ غَشَّنَا فَلَيْسَ مِنَّا',
    translations: {
      de: 'Wer uns betrügt, gehört nicht zu uns.',
      en: 'Whoever cheats us is not one of us.',
      tr: 'Bizi aldatan bizden değildir.',
    },
    source: 'Muslim 101',
    narrator: 'Abu Huraira',
  },

  // === PRAYER (extended) ===
  {
    id: 72,
    category: 'prayer',
    arabic: 'صَلَاةُ الْجَمَاعَةِ تَفْضُلُ صَلَاةَ الْفَذِّ بِسَبْعٍ وَعِشْرِينَ دَرَجَةً',
    translations: {
      de: 'Das Gebet in der Gemeinschaft übertrifft das Gebet des Einzelnen um siebenundzwanzig Grade.',
      en: 'The prayer in congregation is superior to the prayer performed individually by twenty-seven degrees.',
      tr: 'Cemaatle kılınan namaz, tek başına kılınan namazdan yirmi yedi derece üstündür.',
    },
    source: 'Bukhari 645, Muslim 650',
    narrator: 'Ibn Umar',
  },
  {
    id: 73,
    category: 'prayer',
    arabic: 'رَكْعَتَا الْفَجْرِ خَيْرٌ مِنَ الدُّنْيَا وَمَا فِيهَا',
    translations: {
      de: 'Die zwei Rak\'ahs des Fajr sind besser als die Welt und alles, was sie enthält.',
      en: 'The two rak\'ahs of Fajr are better than this world and everything in it.',
      tr: 'Sabah namazının iki rekâtlık sünneti, dünya ve içindekilerden daha hayırlıdır.',
    },
    source: 'Muslim 725',
    narrator: 'Aischa',
  },
  {
    id: 74,
    category: 'prayer',
    arabic: 'صَلِّ صَلَاةَ مُوَدِّعٍ',
    translations: {
      de: 'Bete, als ob es dein Abschiedsgebet wäre.',
      en: 'Pray as if it is your farewell prayer.',
      tr: 'Namazı sanki veda namazıymış gibi kıl.',
    },
    source: 'Ibn Majah 4171',
    narrator: 'Abu Ayyub al-Ansari',
  },

  // === KNOWLEDGE (extended) ===
  {
    id: 75,
    category: 'knowledge',
    arabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
    translations: {
      de: 'Der Beste unter euch ist derjenige, der den Quran lernt und ihn lehrt.',
      en: 'The best of you is the one who learns the Quran and teaches it.',
      tr: 'Sizin en hayırlınız Kur\'an\'ı öğrenen ve öğretendir.',
    },
    source: 'Bukhari 5027',
    narrator: 'Uthman ibn Affan',
  },
  {
    id: 76,
    category: 'knowledge',
    arabic: 'مَنْ سُئِلَ عَنْ عِلْمٍ فَكَتَمَهُ أُلْجِمَ يَوْمَ الْقِيَامَةِ بِلِجَامٍ مِنْ نَارٍ',
    translations: {
      de: 'Wer nach Wissen gefragt wird und es verbirgt, dem wird am Jüngsten Tag ein Zaumzeug aus Feuer angelegt.',
      en: 'Whoever is asked about knowledge and conceals it will be bridled with a bridle of fire on the Day of Judgment.',
      tr: 'Kendisine ilim sorulup da gizleyen kimse, kıyamet gününde ateşten bir gem ile gem vurulur.',
    },
    source: 'Abu Dawud 3658, Tirmidhi 2649',
    narrator: 'Abu Huraira',
  },
  {
    id: 77,
    category: 'knowledge',
    arabic: 'فَضْلُ الْعَالِمِ عَلَى الْعَابِدِ كَفَضْلِ الْقَمَرِ لَيْلَةَ الْبَدْرِ عَلَى سَائِرِ الْكَوَاكِبِ',
    translations: {
      de: 'Die Überlegenheit des Gelehrten über den einfachen Anbeter ist wie die Überlegenheit des Vollmonds über alle anderen Sterne.',
      en: 'The superiority of a scholar over a worshipper is like the superiority of the full moon over all other stars.',
      tr: 'Âlimin abide üstünlüğü, dolunayın diğer yıldızlara üstünlüğü gibidir.',
    },
    source: 'Abu Dawud 3641, Tirmidhi 2685',
    narrator: 'Abu Umama al-Bahili',
  },

  // === FAITH (extended) ===
  {
    id: 78,
    category: 'faith',
    arabic: 'بُنِيَ الإِسْلَامُ عَلَى خَمْسٍ شَهَادَةِ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ وَإِقَامِ الصَّلَاةِ وَإِيتَاءِ الزَّكَاةِ وَالْحَجِّ وَصَوْمِ رَمَضَانَ',
    translations: {
      de: 'Der Islam ist auf fünf Säulen errichtet: dem Zeugnis, dass es keinen Gott außer Allah gibt und dass Muhammad Sein Gesandter ist, dem Verrichten des Gebets, dem Entrichten der Zakat, der Pilgerfahrt und dem Fasten im Ramadan.',
      en: 'Islam is built on five pillars: bearing witness that there is no god but Allah and that Muhammad is His Messenger, establishing prayer, paying zakat, making Hajj, and fasting Ramadan.',
      tr: 'İslam beş temel üzerine kurulmuştur: Allah\'tan başka ilah olmadığına ve Muhammed\'in O\'nun elçisi olduğuna şahitlik etmek, namazı dosdoğru kılmak, zekâtı vermek, haccetmek ve Ramazan orucunu tutmak.',
    },
    source: 'Bukhari 8, Muslim 16',
    narrator: 'Ibn Umar',
  },
  {
    id: 79,
    category: 'faith',
    arabic: 'الإِيمَانُ بِضْعٌ وَسَبْعُونَ شُعْبَةً وَالْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ',
    translations: {
      de: 'Der Glaube hat mehr als siebzig Zweige, und Schamgefühl ist einer der Zweige des Glaubens.',
      en: 'Faith has more than seventy branches, and modesty is one of the branches of faith.',
      tr: 'İmanın yetmişten fazla şubesi vardır ve haya da imanın bir şubesidir.',
    },
    source: 'Bukhari 9, Muslim 35',
    narrator: 'Abu Huraira',
  },

  // === COMMUNITY (extended) ===
  {
    id: 80,
    category: 'community',
    arabic: 'أَفْشُوا السَّلَامَ بَيْنَكُمْ',
    translations: {
      de: 'Verbreitet den Salam (Friedensgruß) unter euch.',
      en: 'Spread the greeting of peace (salam) among yourselves.',
      tr: 'Aranızda selamı yayın.',
    },
    source: 'Muslim 54',
    narrator: 'Abu Huraira',
  },
  {
    id: 81,
    category: 'community',
    arabic: 'مَنْ عَادَ مَرِيضًا أَوْ زَارَ أَخًا لَهُ فِي اللَّهِ نَادَاهُ مُنَادٍ أَنْ طِبْتَ وَطَابَ مَمْشَاكَ',
    translations: {
      de: 'Wer einen Kranken oder einen Bruder um Allahs willen besucht, den ruft ein Rufer: „Du bist gut und dein Weg ist gesegnet."',
      en: 'Whoever visits a sick person or visits a brother for the sake of Allah, a caller proclaims: "You have done well, and blessed is your path."',
      tr: 'Kim hasta olan birisini veya Allah için bir kardeşini ziyaret ederse, bir münadi ona: "Sen güzelsin ve yolun mübarek olsun" diye seslenir.',
    },
    source: 'Tirmidhi 2008',
    narrator: 'Abu Huraira',
  },

  // === DAILY LIFE (extended) ===
  {
    id: 82,
    category: 'daily',
    arabic: 'سَمِّ اللَّهَ وَكُلْ بِيَمِينِكَ وَكُلْ مِمَّا يَلِيكَ',
    translations: {
      de: 'Nenne den Namen Allahs, iss mit deiner rechten Hand und iss von dem, was dir nahe ist.',
      en: 'Mention the name of Allah, eat with your right hand, and eat from what is nearest to you.',
      tr: 'Allah\'ın adını an, sağ elinle ye ve yanındakinden ye.',
    },
    source: 'Bukhari 5376, Muslim 2022',
    narrator: 'Umar ibn Abi Salama',
  },
  {
    id: 83,
    category: 'daily',
    arabic: 'إِذَا دَخَلَ الرَّجُلُ بَيْتَهُ فَذَكَرَ اللَّهَ عِنْدَ دُخُولِهِ وَعِنْدَ طَعَامِهِ قَالَ الشَّيْطَانُ لَا مَبِيتَ لَكُمْ وَلَا عَشَاءَ',
    translations: {
      de: 'Wenn ein Mann sein Haus betritt und beim Eintreten sowie beim Essen Allahs gedenkt, sagt der Teufel: „Hier ist kein Nachtlager und kein Abendessen für euch."',
      en: 'When a man enters his home and mentions Allah upon entering and before his meal, Satan says: "There is no lodging and no dinner for you here."',
      tr: 'Bir adam evine girdiğinde ve yemek yerken Allah\'ı anarsa, şeytan: "Burada sizin için gecelik ve akşam yemeği yok" der.',
    },
    source: 'Muslim 2018',
    narrator: 'Jabir',
  },

  // === MERCY (extended) ===
  {
    id: 84,
    category: 'mercy',
    arabic: 'إِنَّ اللَّهَ رَفِيقٌ يُحِبُّ الرِّفْقَ وَيُعْطِي عَلَى الرِّفْقِ مَا لَا يُعْطِي عَلَى الْعُنْفِ وَمَا لَا يُعْطِي عَلَى مَا سِوَاهُ',
    translations: {
      de: 'Allah ist sanft und liebt Sanftheit. Er gibt für Sanftheit, was Er für Härte und für alles andere nicht gibt.',
      en: 'Allah is gentle and loves gentleness, and He grants for gentleness what He does not grant for harshness or for anything else.',
      tr: 'Allah yumuşaktır ve yumuşaklığı sever. Yumuşaklığa, sertliğe ve başka şeylere vermediğini verir.',
    },
    source: 'Muslim 2593',
    narrator: 'Aischa',
  },

  // === GRATITUDE (extended) ===
  {
    id: 85,
    category: 'gratitude',
    arabic: 'نِعْمَتَانِ مَغْبُونٌ فِيهِمَا كَثِيرٌ مِنَ النَّاسِ الصِّحَّةُ وَالْفَرَاغُ',
    translations: {
      de: 'Zwei Segnungen, bei denen viele Menschen verlieren: Gesundheit und freie Zeit.',
      en: 'Two blessings in which many people suffer loss: health and free time.',
      tr: 'Pek çok insanın aldanmaya devam ettiği iki nimet: sağlık ve boş vakit.',
    },
    source: 'Bukhari 6412',
    narrator: 'Ibn Abbas',
  },
  {
    id: 86,
    category: 'gratitude',
    arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
    translations: {
      de: 'O Allah, hilf mir, Deiner zu gedenken, Dir zu danken und Dir gut zu dienen.',
      en: 'O Allah, help me to remember You, to be grateful to You, and to worship You well.',
      tr: 'Allah\'ım! Seni zikretmem, Sana şükretmem ve Sana güzel ibadet etmem konusunda bana yardım et.',
    },
    source: 'Abu Dawud 1522',
    narrator: 'Muadh ibn Jabal',
  },

  // === CHILDREN (extended) ===
  {
    id: 87,
    category: 'children',
    arabic: 'مَنْ كَانَ لَهُ ثَلَاثُ بَنَاتٍ فَصَبَرَ عَلَيْهِنَّ وَأَطْعَمَهُنَّ وَسَقَاهُنَّ وَكَسَاهُنَّ مِنْ جِدَتِهِ كُنَّ لَهُ حِجَابًا مِنَ النَّارِ يَوْمَ الْقِيَامَةِ',
    translations: {
      de: 'Wer drei Töchter hat, geduldig mit ihnen ist und sie aus seinen Mitteln ernährt, tränkt und kleidet, für den werden sie am Tag der Auferstehung eine Schutzwand vor dem Feuer sein.',
      en: 'Whoever has three daughters, is patient with them, and feeds, gives water, and clothes them from his wealth, they will be a shield for him from the Fire on the Day of Judgment.',
      tr: 'Üç kız çocuğu olan, onlara sabreden, imkânları ölçüsünde onları yediren, içiren ve giydiren kimse için bu kızlar, kıyamet günü ateşe karşı bir perde olur.',
    },
    source: 'Ibn Majah 3669',
    narrator: 'Ukba ibn Amir',
  },

  // === ECONOMY (extended) ===
  {
    id: 88,
    category: 'economy',
    arabic: 'الْحَلَالُ بَيِّنٌ وَالْحَرَامُ بَيِّنٌ وَبَيْنَهُمَا أُمُورٌ مُشْتَبِهَاتٌ لَا يَعْلَمُهُنَّ كَثِيرٌ مِنَ النَّاسِ',
    translations: {
      de: 'Das Erlaubte ist klar und das Verbotene ist klar. Dazwischen liegen zweifelhafte Angelegenheiten, die viele Menschen nicht kennen.',
      en: 'The halal is clear and the haram is clear. Between them are doubtful matters that many people do not know about.',
      tr: 'Helal açıktır, haram da açıktır. İkisi arasında ise pek çok insanın bilmediği şüpheli şeyler vardır.',
    },
    source: 'Bukhari 52, Muslim 1599',
    narrator: 'Nu\'man ibn Bashir',
  },

  // === AFTERLIFE (extended) ===
  {
    id: 67,
    category: 'afterlife',
    arabic: 'الدُّنْيَا سِجْنُ الْمُؤْمِنِ وَجَنَّةُ الْكَافِرِ',
    translations: {
      de: 'Die Welt ist das Gefängnis des Gläubigen und das Paradies des Ungläubigen.',
      en: 'The world is a prison for the believer and a paradise for the disbeliever.',
      tr: 'Dünya müminin zindanı, kâfirin cennetidir.',
    },
    source: 'Muslim 2956',
    narrator: 'Abu Huraira',
  },
  {
    id: 68,
    category: 'afterlife',
    arabic: 'أَكْثِرُوا ذِكْرَ هَاذِمِ اللَّذَّاتِ يَعْنِي الْمَوْتَ',
    translations: {
      de: 'Gedenkt häufig des Vernichters der Freuden – des Todes.',
      en: 'Remember often the destroyer of pleasures – death.',
      tr: 'Lezzetleri yok edeni, yani ölümü çokça hatırlayın.',
    },
    source: 'Tirmidhi 2307',
    narrator: 'Abu Huraira',
  },
  {
    id: 69,
    category: 'afterlife',
    arabic: 'كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيبٌ أَوْ عَابِرُ سَبِيلٍ',
    translations: {
      de: 'Sei in dieser Welt wie ein Fremder oder ein Reisender.',
      en: 'Be in this world as if you were a stranger or a traveler.',
      tr: 'Dünyada bir garip veya bir yolcu gibi ol.',
    },
    source: 'Bukhari 6416',
    narrator: 'Abdullah ibn Umar',
  },
  {
    id: 70,
    category: 'afterlife',
    arabic: 'إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلَّا مِنْ ثَلَاثَةٍ صَدَقَةٍ جَارِيَةٍ أَوْ عِلْمٍ يُنْتَفَعُ بِهِ أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ',
    translations: {
      de: 'Wenn der Mensch stirbt, enden seine Taten, außer drei: eine fortlaufende Spende, nützliches Wissen oder ein rechtschaffenes Kind, das für ihn betet.',
      en: 'When a person dies, his deeds end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.',
      tr: 'İnsan öldüğünde ameli kesilir, ancak üç şey hariç: sadaka-i cariye, faydalı ilim veya kendisine dua eden salih evlat.',
    },
    source: 'Muslim 1631',
    narrator: 'Abu Huraira',
  },
  {
    id: 71,
    category: 'afterlife',
    arabic: 'الْقَبْرُ أَوَّلُ مَنَازِلِ الآخِرَةِ',
    translations: {
      de: 'Das Grab ist die erste Station des Jenseits.',
      en: 'The grave is the first stage of the Hereafter.',
      tr: 'Kabir, ahiretin ilk durağıdır.',
    },
    source: 'Tirmidhi 2308',
    narrator: 'Uthman ibn Affan',
  },

  // === AFTERLIFE (extended) ===
  {
    id: 89,
    category: 'afterlife',
    arabic: 'لَا تَزُولُ قَدَمَا عَبْدٍ يَوْمَ الْقِيَامَةِ حَتَّى يُسْأَلَ عَنْ عُمُرِهِ فِيمَا أَفْنَاهُ وَعَنْ عِلْمِهِ فِيمَ فَعَلَ وَعَنْ مَالِهِ مِنْ أَيْنَ اكْتَسَبَهُ وَفِيمَ أَنْفَقَهُ وَعَنْ جِسْمِهِ فِيمَ أَبْلَاهُ',
    translations: {
      de: 'Die Füße eines Dieners werden am Tag der Auferstehung nicht von der Stelle weichen, bis er befragt wird: womit er sein Leben verbracht hat; wie er sein Wissen angewendet hat; woher er sein Vermögen erworben und wofür er es ausgegeben hat; und womit er seinen Körper verbraucht hat.',
      en: 'The feet of a servant will not move on the Day of Judgment until he is asked about his life and how he spent it, his knowledge and how he acted on it, his wealth and how he earned and spent it, and his body and how he used it.',
      tr: 'Kıyamet gününde bir kulun ayakları, ömrünü nerede tükettiği, ilmiyle ne yaptığı, malını nereden kazanıp nereye harcadığı ve bedenini nerede eskittiği sorulmadan yerinden kımıldamaz.',
    },
    source: 'Tirmidhi 2417',
    narrator: 'Abdullah ibn Masud',
  },
  {
    id: 90,
    category: 'afterlife',
    arabic: 'مَنْ أَحَبَّ لِقَاءَ اللَّهِ أَحَبَّ اللَّهُ لِقَاءَهُ',
    translations: {
      de: 'Wer die Begegnung mit Allah liebt, den liebt Allah, ihn zu treffen.',
      en: 'Whoever loves to meet Allah, Allah loves to meet him.',
      tr: 'Kim Allah\'a kavuşmayı severse, Allah da ona kavuşmayı sever.',
    },
    source: 'Bukhari 6508, Muslim 2683',
    narrator: 'Abu Huraira',
  },
  {
    id: 100,
    category: 'afterlife',
    arabic: 'لَوْ كَانَتِ الدُّنْيَا تَعْدِلُ عِنْدَ اللَّهِ جَنَاحَ بَعُوضَةٍ مَا سَقَى كَافِرًا مِنْهَا شَرْبَةَ مَاءٍ',
    translations: {
      de: 'Wenn die Welt bei Allah auch nur den Wert eines Moskitoflügels hätte, würde Er keinem Ungläubigen auch nur einen Schluck Wasser davon geben.',
      en: 'If this world were worth a mosquito wing with Allah, He would not give a disbeliever so much as a sip of water from it.',
      tr: 'Dünya Allah katında bir sivrisinek kanadı kadar değer taşısaydı, Allah kâfire ondan bir yudum su bile içirmezdi.',
    },
    source: 'Tirmidhi 2320',
    narrator: 'Sahl ibn Sa\'d',
  },

  // === RAMADAN (extended) ===
  {
    id: 91,
    category: 'ramadan',
    arabic: 'كُلُّ عَمَلِ ابْنِ آدَمَ لَهُ إِلَّا الصَّوْمَ فَإِنَّهُ لِي وَأَنَا أَجْزِي بِهِ',
    translations: {
      de: 'Jede Tat des Menschensohns gehört ihm, außer dem Fasten – denn es gehört Mir, und Ich belohne dafür.',
      en: 'Every deed of the son of Adam is for him, except fasting – it is for Me and I will reward for it.',
      tr: 'Âdemoğlunun her ameli kendinedir; ancak oruç hariç. Çünkü o Benim içindir ve onun karşılığını Ben veririm.',
    },
    source: 'Bukhari 7492, Muslim 1151',
    narrator: 'Abu Huraira',
  },
  {
    id: 92,
    category: 'ramadan',
    arabic: 'تَسَحَّرُوا فَإِنَّ فِي السَّحُورِ بَرَكَةً',
    translations: {
      de: 'Esst das Suhoor (Frühmorgenessen), denn im Suhoor liegt Segen.',
      en: 'Eat suhoor, for in suhoor there is blessing.',
      tr: 'Sahur yiyin, zira sahurda bereket vardır.',
    },
    source: 'Bukhari 1923, Muslim 1095',
    narrator: 'Anas ibn Malik',
  },

  // === CHARACTER (extended) ===
  {
    id: 93,
    category: 'character',
    arabic: 'الْمُؤْمِنُ مِرْآةُ الْمُؤْمِنِ',
    translations: {
      de: 'Der Gläubige ist der Spiegel des Gläubigen.',
      en: 'The believer is the mirror of his fellow believer.',
      tr: 'Mümin, müminin aynasıdır.',
    },
    source: 'Abu Dawud 4918',
    narrator: 'Abu Huraira',
  },
  {
    id: 94,
    category: 'character',
    arabic: 'أَكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا وَخِيَارُكُمْ خِيَارُكُمْ لِنِسَائِهِمْ',
    translations: {
      de: 'Die vollkommensten Gläubigen im Glauben sind diejenigen mit dem besten Charakter. Und die Besten von euch sind diejenigen, die am besten zu ihren Frauen sind.',
      en: 'The most complete believers in faith are those with the best character, and the best of you are those who are best to their wives.',
      tr: 'İmanı en mükemmel olan mümin, ahlakı en güzel olandır. En hayırlınız da eşlerine karşı en hayırlı olanınızdır.',
    },
    source: 'Tirmidhi 1162, Abu Dawud 4682',
    narrator: 'Abu Huraira',
  },

  // === GOOD DEEDS (extended) ===
  {
    id: 95,
    category: 'deeds',
    arabic: 'وَإِمَاطَةُ الأَذَى عَنِ الطَّرِيقِ صَدَقَةٌ',
    translations: {
      de: 'Das Entfernen von Schaden von der Straße ist eine Spende.',
      en: 'Removing harm from the road is a charity.',
      tr: 'Yoldan eziyeti kaldırmak sadakadır.',
    },
    source: 'Bukhari 2989, Muslim 1009',
    narrator: 'Abu Huraira',
  },
  {
    id: 96,
    category: 'deeds',
    arabic: 'مَنْ بَنَى مَسْجِدًا يَبْتَغِي بِهِ وَجْهَ اللَّهِ بَنَى اللَّهُ لَهُ مِثْلَهُ فِي الْجَنَّةِ',
    translations: {
      de: 'Wer eine Moschee baut, um damit Allahs Angesicht zu suchen, für den baut Allah etwas Ähnliches im Paradies.',
      en: 'Whoever builds a mosque seeking the face of Allah, Allah will build something like it for him in Paradise.',
      tr: 'Kim Allah\'ın rızasını umarak bir mescit inşa ederse, Allah da ona cennette benzerini inşa eder.',
    },
    source: 'Bukhari 450, Muslim 533',
    narrator: 'Uthman ibn Affan',
  },

  // === PATIENCE (extended) ===
  {
    id: 97,
    category: 'patience',
    arabic: 'إِنَّ عِظَمَ الْجَزَاءِ مَعَ عِظَمِ الْبَلَاءِ وَإِنَّ اللَّهَ إِذَا أَحَبَّ قَوْمًا ابْتَلَاهُمْ',
    translations: {
      de: 'Die Größe der Belohnung entspricht der Größe der Prüfung. Wenn Allah ein Volk liebt, prüft Er es.',
      en: 'The greater the trial, the greater the reward. When Allah loves a people, He tests them.',
      tr: 'Mükâfatın büyüklüğü, belanın büyüklüğüyle orantılıdır. Allah bir topluluğu sevdiğinde onları sınar.',
    },
    source: 'Tirmidhi 2396, Ibn Majah 4031',
    narrator: 'Anas ibn Malik',
  },
  {
    id: 98,
    category: 'patience',
    arabic: 'مَا يَزَالُ الْبَلَاءُ بِالْمُؤْمِنِ وَالْمُؤْمِنَةِ فِي نَفْسِهِ وَوَلَدِهِ وَمَالِهِ حَتَّى يَلْقَى اللَّهَ وَمَا عَلَيْهِ خَطِيئَةٌ',
    translations: {
      de: 'Prüfungen hören für den gläubigen Mann und die gläubige Frau nicht auf – in ihrer Person, ihren Kindern und ihrem Besitz –, bis sie Allah begegnen, ohne eine einzige Sünde auf sich zu haben.',
      en: 'Trials do not cease for the believing man and woman in themselves, their children, and their wealth, until they meet Allah with no sin upon them.',
      tr: 'Mümin erkek ve kadın üzerindeki bela; nefsi, evladı ve malı konusunda, hiçbir günahı kalmaksızın Allah\'a kavuşuncaya kadar devam eder.',
    },
    source: 'Tirmidhi 2399',
    narrator: 'Abu Huraira',
  },

  // === COMMUNITY (extended) ===
  {
    id: 99,
    category: 'community',
    arabic: 'انْصُرْ أَخَاكَ ظَالِمًا أَوْ مَظْلُومًا',
    translations: {
      de: 'Unterstütze deinen Bruder, ob er Unrecht tut oder Unrecht erleidet.',
      en: 'Support your brother whether he is an oppressor or the one being oppressed.',
      tr: 'Kardeşine zalim de olsa mazlum da olsa yardım et.',
    },
    source: 'Bukhari 2443',
    narrator: 'Anas ibn Malik',
  },
]
