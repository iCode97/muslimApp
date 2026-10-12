/**
 * Learning path "Grundlagen des Islam" — 12 lessons for readers with no
 * prior knowledge (curious non-Muslims, new Muslims, anyone revisiting the
 * basics). Mainstream Sunni scholarship; differences between the schools
 * are flagged with `note` blocks (variant 'differences').
 *
 * Quran translations are the authors' own renderings, checked against the
 * reference translations named in QURAN_REF. Everything ships as
 * `review: 'draft'` until a qualified reviewer has checked it.
 */
import type { LearningPath } from '../types'

/** Reference translations the Quran renderings in this path follow. */
const QURAN_REF = 'Koranübersetzungen (Referenz, eigene Wiedergabe): Bubenheim/Elyas (DE), Sahih International (EN), Diyanet İşleri Başkanlığı Kur\'an-ı Kerim Meali (TR)'

export const BASICS_PATH: LearningPath = {
  id: 'basics',
  icon: '🌱',
  level: 'discover',
  title: {
    de: 'Grundlagen des Islam',
    en: 'Foundations of Islam',
    tr: "İslam'ın Temelleri",
  },
  description: {
    de: "Ein ruhiger Einstieg ohne Vorwissen: Was Muslime glauben, wie sie beten und fasten, woher der Koran kommt und warum guter Charakter im Mittelpunkt steht — in zwölf kurzen Lektionen.",
    en: "A calm introduction with no prior knowledge needed: what Muslims believe, how they pray and fast, where the Quran comes from and why good character is at the centre — in twelve short lessons.",
    tr: "Ön bilgi gerektirmeyen sakin bir başlangıç: Müslümanların neye inandığı, nasıl namaz kılıp oruç tuttuğu, Kur'an'ın nereden geldiği ve güzel ahlakın neden merkezde olduğu — on iki kısa derste.",
  },
  lessons: [
    // ─── 1 ───────────────────────────────────────────────────────────
    {
      id: 'what-is-islam',
      title: {
        de: 'Was ist der Islam?',
        en: 'What is Islam?',
        tr: 'İslam nedir?',
      },
      summary: {
        de: "Die Bedeutung der Wörter „Islam“ und „Muslim“, wer Allah ist und wie der Islam sich in die Reihe der Propheten einordnet.",
        en: "The meaning of the words “Islam” and “Muslim”, who Allah is, and how Islam sees itself in the line of the prophets.",
        tr: "“İslam” ve “Müslüman” kelimelerinin anlamı, Allah'ın kim olduğu ve İslam'ın peygamberler zincirindeki yeri.",
      },
      minutes: 5,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Das arabische Wort **Islam** bedeutet „Hingabe“ oder „Ergebung“ — gemeint ist die bewusste, freiwillige Hingabe des Menschen an Gott. Es stammt von derselben Wurzel wie **salam**, „Frieden“. Ein **Muslim** (weiblich: Muslima) ist demnach „jemand, der sich Gott hingibt“.",
            en: "The Arabic word **Islam** means “submission” or “surrender” — the conscious, free surrender of a human being to God. It comes from the same root as **salam**, “peace”. A **Muslim** is therefore “one who submits to God”.",
            tr: "Arapça **İslam** kelimesi “teslim olmak” anlamına gelir — insanın bilinçli ve özgür iradesiyle Allah'a teslim olması kastedilir. **Selâm** (barış, esenlik) kelimesiyle aynı köktendir. **Müslüman** ise “Allah'a teslim olan kişi” demektir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Wer ist Allah?', en: 'Who is Allah?', tr: 'Allah kimdir?' },
        },
        {
          type: 'text',
          text: {
            de: "**Allah** ist das arabische Wort für den einen Gott — keine besondere „Gottheit der Muslime“. Auch arabischsprachige Christen beten zu „Allah“. Muslime glauben an den einen Schöpfer, der alles erschaffen hat, alles erhält und keinen Partner hat. Er ist barmherzig, gerecht und den Menschen nah.",
            en: "**Allah** is the Arabic word for the one God (it is not a special “god of the Muslims”). Arabic-speaking Christians also pray to “Allah”. Muslims believe in the one Creator who made and sustains everything and has no partner. He is merciful, just and close to His creation.",
            tr: "**Allah**, tek Yaratıcı'nın Arapça adıdır; “Müslümanlara özgü bir tanrı” değildir. Arapça konuşan Hristiyanlar da “Allah”a dua eder. Müslümanlar her şeyi yaratan, ayakta tutan ve ortağı olmayan tek Yaratıcı'ya inanır. O merhametli, adil ve kullarına yakındır.",
          },
        },
        {
          type: 'quran',
          ref: '3:19',
          arabic: 'إِنَّ الدِّينَ عِندَ اللَّهِ الْإِسْلَامُ',
          translation: {
            de: "Gewiss, die Religion ist bei Allah der Islam (die Hingabe an Ihn).",
            en: "Indeed, the religion in the sight of Allah is Islam (submission to Him).",
            tr: "Şüphesiz Allah katında din İslam'dır (O'na teslimiyettir).",
          },
        },
        {
          type: 'heading',
          text: { de: 'Eine alte Botschaft', en: 'An ancient message', tr: 'Köklü bir mesaj' },
        },
        {
          type: 'text',
          text: {
            de: "Muslime verstehen den Islam nicht als neue Religion, sondern als die ursprüngliche Botschaft aller Propheten: Gott ist einer — dient Ihm allein und tut Gutes. Diese Botschaft brachten nach islamischem Glauben viele Propheten, darunter:",
            en: "Muslims do not see Islam as a new religion but as the original message of all prophets: God is One — worship Him alone and do good. According to Islamic belief this message was brought by many prophets, including:",
            tr: "Müslümanlar İslam'ı yeni bir din olarak değil, bütün peygamberlerin getirdiği asıl mesaj olarak görür: Allah birdir — yalnızca O'na kulluk edin ve iyilik yapın. İslam inancına göre bu mesajı birçok peygamber getirmiştir, örneğin:",
          },
        },
        {
          type: 'list',
          items: [
            { de: "Adam — der erste Mensch und erste Prophet", en: "Adam — the first human and the first prophet", tr: "Hz. Âdem — ilk insan ve ilk peygamber" },
            { de: "Nuh (Noah)", en: "Nuh (Noah)", tr: "Hz. Nuh" },
            { de: "Ibrahim (Abraham) — Stammvater vieler Propheten", en: "Ibrahim (Abraham) — forefather of many prophets", tr: "Hz. İbrahim — birçok peygamberin atası" },
            { de: "Musa (Mose) — ihm wurde die Tora offenbart", en: "Musa (Moses) — to whom the Torah was revealed", tr: "Hz. Musa — Tevrat ona indirildi" },
            { de: "Isa (Jesus) — ihm wurde das Evangelium offenbart", en: "Isa (Jesus) — to whom the Gospel was revealed", tr: "Hz. İsa — İncil ona indirildi" },
            { de: "Muhammad ﷺ — der letzte Prophet, dem der Koran offenbart wurde", en: "Muhammad ﷺ — the final prophet, to whom the Quran was revealed", tr: "Hz. Muhammed ﷺ — Kur'an'ın indirildiği son peygamber" },
          ],
        },
        {
          type: 'quran',
          ref: '2:136',
          translation: {
            de: "Sagt: „Wir glauben an Allah und an das, was zu uns herabgesandt wurde, und an das, was zu Ibrahim, Isma'il, Ishaq, Ya'qub und den Stämmen herabgesandt wurde, und an das, was Musa und 'Isa gegeben wurde, und an das, was den Propheten von ihrem Herrn gegeben wurde. Wir machen keinen Unterschied zwischen einem von ihnen, und wir sind Ihm ergeben.“",
            en: "Say: “We believe in Allah and what has been revealed to us, and what was revealed to Ibrahim, Isma'il, Ishaq, Ya'qub and the Tribes, and what was given to Musa and 'Isa, and what was given to the prophets from their Lord. We make no distinction between any of them, and to Him we have submitted.”",
            tr: "Deyin ki: “Biz Allah'a, bize indirilene, İbrahim'e, İsmail'e, İshak'a, Yakub'a ve torunlarına indirilene, Musa ile İsa'ya verilene ve peygamberlere Rableri tarafından verilene iman ettik. Onlardan hiçbirini diğerinden ayırt etmeyiz ve biz O'na teslim olmuşuz.”",
          },
        },
        {
          type: 'heading',
          text: { de: 'Eine weltweite Gemeinschaft', en: 'A worldwide community', tr: 'Dünya çapında bir topluluk' },
        },
        {
          type: 'text',
          text: {
            de: "Heute leben nach Schätzungen rund zwei Milliarden Muslime auf der Welt — etwa jeder vierte Mensch. Nur ein kleiner Teil von ihnen sind Araber; das Land mit den meisten Muslimen ist Indonesien. Die weltweite Gemeinschaft der Muslime heißt **Umma**. Sie ist bunt: verschiedene Sprachen, Kulturen und Traditionen, verbunden durch denselben Glauben.",
            en: "Today an estimated two billion Muslims live around the world — roughly one in four people. Only a minority of them are Arabs; the country with the most Muslims is Indonesia. The worldwide Muslim community is called the **ummah**. It is diverse: many languages, cultures and traditions, united by the same faith.",
            tr: "Bugün dünyada tahminen yaklaşık iki milyar Müslüman yaşıyor — kabaca her dört insandan biri. Bunların yalnızca küçük bir kısmı Araptır; en çok Müslüman'ın yaşadığı ülke Endonezya'dır. Dünya çapındaki Müslüman topluluğuna **ümmet** denir. Farklı diller, kültürler ve gelenekler aynı imanla birbirine bağlıdır.",
          },
        },
        {
          type: 'quran',
          ref: '49:13',
          translation: {
            de: "O ihr Menschen, Wir haben euch ja von einem männlichen und einem weiblichen Wesen erschaffen, und Wir haben euch zu Völkern und Stämmen gemacht, damit ihr einander kennenlernt. Gewiss, der Geehrteste von euch bei Allah ist der Gottesfürchtigste von euch.",
            en: "O mankind, We have created you from a male and a female and made you peoples and tribes so that you may get to know one another. Indeed, the most noble of you in the sight of Allah is the most God-conscious of you.",
            tr: "Ey insanlar! Şüphesiz sizi bir erkek ile bir dişiden yarattık. Birbirinizi tanıyasınız diye sizi milletlere ve kabilelere ayırdık. Allah katında en değerliniz, takvaca en ileri olanınızdır.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 10',
          narrator: "'Abdullah ibn 'Amr",
          grade: 'sahih',
          text: {
            de: "Der Muslim ist derjenige, vor dessen Zunge und Hand die Muslime sicher sind.",
            en: "The Muslim is the one from whose tongue and hand the Muslims are safe.",
            tr: "Müslüman, dilinden ve elinden Müslümanların emin olduğu kimsedir.",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Du musst nichts sofort verstehen oder übernehmen. Diese Lektionen erklären, was Muslime glauben und warum — in deinem Tempo.",
            en: "You don't have to understand or accept anything right away. These lessons explain what Muslims believe and why — at your own pace.",
            tr: "Hiçbir şeyi hemen anlaman ya da kabul etmen gerekmiyor. Bu dersler Müslümanların neye ve neden inandığını kendi hızında anlatır.",
          },
        },
        { type: 'terms', ids: ['islam', 'muslim', 'allah', 'salam', 'ummah', 'nabi'] },
      ],
      quiz: [
        {
          question: {
            de: "Was bedeutet das Wort „Islam“ wörtlich?",
            en: "What does the word “Islam” literally mean?",
            tr: "“İslam” kelimesi sözlükte ne anlama gelir?",
          },
          options: [
            { de: "Gebet", en: "Prayer", tr: "Namaz" },
            { de: "Hingabe (an Gott)", en: "Submission (to God)", tr: "(Allah'a) teslimiyet" },
            { de: "Arabien", en: "Arabia", tr: "Arabistan" },
          ],
          answer: 1,
          explanation: {
            de: "Islam bedeutet „Hingabe“ an Gott und ist mit „salam“ (Frieden) verwandt.",
            en: "Islam means “submission” to God and is related to “salam” (peace).",
            tr: "İslam, Allah'a “teslimiyet” demektir ve “selâm” (esenlik) kelimesiyle aynı köktendir.",
          },
        },
        {
          question: {
            de: "Wie verstehen Muslime das Verhältnis des Islam zu früheren Propheten wie Ibrahim, Musa und Isa?",
            en: "How do Muslims understand the relationship of Islam to earlier prophets such as Ibrahim, Musa and Isa?",
            tr: "Müslümanlar İslam'ın Hz. İbrahim, Hz. Musa ve Hz. İsa gibi önceki peygamberlerle ilişkisini nasıl anlar?",
          },
          options: [
            { de: "Sie hatten nichts mit dem Islam zu tun", en: "They had nothing to do with Islam", tr: "İslam'la hiçbir ilgileri yoktur" },
            { de: "Sie brachten dieselbe Grundbotschaft vom einen Gott", en: "They brought the same core message of the One God", tr: "Tek Allah'a dair aynı temel mesajı getirmişlerdir" },
            { de: "Sie waren Engel, keine Menschen", en: "They were angels, not humans", tr: "İnsan değil melektiler" },
          ],
          answer: 1,
          explanation: {
            de: "Nach Koran 2:136 glauben Muslime an alle Propheten und machen keinen Unterschied zwischen ihnen — sie alle verkündeten den einen Gott.",
            en: "According to Quran 2:136, Muslims believe in all the prophets and make no distinction between them — they all proclaimed the One God.",
            tr: "Bakara 2:136'ya göre Müslümanlar bütün peygamberlere iman eder ve aralarında ayrım yapmaz — hepsi tek Allah'ı tebliğ etmiştir.",
          },
        },
        {
          question: {
            de: "Welches Land hat die meisten Muslime?",
            en: "Which country has the largest Muslim population?",
            tr: "En çok Müslüman'ın yaşadığı ülke hangisidir?",
          },
          options: [
            { de: "Saudi-Arabien", en: "Saudi Arabia", tr: "Suudi Arabistan" },
            { de: "Ägypten", en: "Egypt", tr: "Mısır" },
            { de: "Indonesien", en: "Indonesia", tr: "Endonezya" },
          ],
          answer: 2,
          explanation: {
            de: "Indonesien hat die größte muslimische Bevölkerung. Die meisten Muslime weltweit sind keine Araber.",
            en: "Indonesia has the largest Muslim population. Most Muslims worldwide are not Arabs.",
            tr: "En büyük Müslüman nüfus Endonezya'dadır. Dünyadaki Müslümanların çoğu Arap değildir.",
          },
        },
      ],
      sources: [
        'Quran 3:19, 2:136, 49:13',
        'Sahih al-Bukhari 10',
        'Pew Research Center: The Future of World Religions (Bevölkerungsschätzungen)',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 2 ───────────────────────────────────────────────────────────
    {
      id: 'tawhid',
      title: {
        de: 'Tawhid — der Glaube an den Einen Gott',
        en: 'Tawhid — belief in the One God',
        tr: 'Tevhid — tek Allah inancı',
      },
      summary: {
        de: "Das Herz des Islam: Allah ist einer, ohne Partner und ohne Ebenbild. Was das bedeutet und was das Gegenteil (Shirk) ist.",
        en: "The heart of Islam: Allah is One, without partner and without equal. What this means and what its opposite (shirk) is.",
        tr: "İslam'ın kalbi: Allah birdir, ortağı ve benzeri yoktur. Bunun anlamı ve zıddı olan şirk.",
      },
      minutes: 5,
      blocks: [
        {
          type: 'text',
          text: {
            de: "**Tawhid** heißt wörtlich „Einsmachen“ — gemeint ist das Bekenntnis, dass Allah einer und einzig ist. Alles andere im Islam baut darauf auf: das Gebet, das Fasten, die Ethik. Die kürzeste Zusammenfassung des Tawhid ist eine Sure mit nur vier Versen.",
            en: "**Tawhid** literally means “making one” — the affirmation that Allah (God) is one and unique. Everything else in Islam is built on it: prayer, fasting, ethics. The shortest summary of tawhid is a surah of only four verses.",
            tr: "**Tevhid** sözlükte “birlemek” demektir — Allah'ın bir ve tek olduğunu kabul etmek. İslam'daki her şey bunun üzerine kuruludur: namaz, oruç, ahlak. Tevhidin en kısa özeti yalnızca dört ayetlik bir suredir.",
          },
        },
        {
          type: 'quran',
          ref: '112:1-4',
          arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
          translation: {
            de: "Sag: Er ist Allah, ein Einziger. Allah, der Absolute (auf den alle angewiesen sind). Er hat nicht gezeugt und ist nicht gezeugt worden, und niemand ist Ihm jemals gleich.",
            en: "Say: He is Allah, the One. Allah, the Eternal Refuge (on whom all depend). He neither begets nor was He begotten, and there is none comparable to Him.",
            tr: "De ki: O Allah birdir. Allah sameddir (her şey O'na muhtaçtır, O hiçbir şeye muhtaç değildir). O doğurmamış ve doğurulmamıştır. Hiçbir şey O'na denk değildir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Drei Blickwinkel auf den Tawhid', en: 'Three perspectives on tawhid', tr: 'Tevhide üç bakış' },
        },
        {
          type: 'text',
          text: {
            de: "Zur Erklärung unterscheiden viele Gelehrte drei Aspekte. Sie sind keine getrennten „Glaubenssätze“, sondern Blickwinkel auf dieselbe Wahrheit:",
            en: "To explain it, many scholars distinguish three aspects. They are not separate “doctrines” but perspectives on the same truth:",
            tr: "Açıklamak için birçok âlim üç yönden söz eder. Bunlar ayrı “inanç maddeleri” değil, aynı hakikate farklı bakışlardır:",
          },
        },
        {
          type: 'list',
          items: [
            {
              de: "**Allah allein ist der Schöpfer und Herr** — Er erschafft, versorgt und lenkt alles.",
              en: "**Allah alone is the Creator and Lord** — He creates, provides for and governs everything.",
              tr: "**Yaratan ve Rab yalnızca Allah'tır** — her şeyi O yaratır, rızıklandırır ve yönetir.",
            },
            {
              de: "**Allah allein gebührt Anbetung** — Gebet, Bittgebet und Hingabe richten sich nur an Ihn, nicht an Menschen, Heilige oder Dinge.",
              en: "**Allah alone deserves worship** — prayer, supplication and devotion are directed only to Him, not to people, saints or objects.",
              tr: "**İbadete layık olan yalnızca Allah'tır** — namaz, dua ve teslimiyet yalnızca O'na yöneltilir; insanlara, velilere veya eşyalara değil.",
            },
            {
              de: "**Allah ist einzigartig in Seinen Namen und Eigenschaften** — Er ist der Barmherzige, der Allwissende, der Gerechte, und nichts gleicht Ihm.",
              en: "**Allah is unique in His names and attributes** — He is the Most Merciful, the All-Knowing, the Just, and nothing is like Him.",
              tr: "**Allah isim ve sıfatlarında eşsizdir** — O Rahmân'dır, Alîm'dir, Adl'dir ve hiçbir şey O'na benzemez.",
            },
          ],
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Die Einteilung in drei Aspekte ist eine Lehr-Hilfe, die vor allem in der hanbalitisch-atharitischen Tradition verbreitet ist. Die aschʿaritische und die maturiditische Schule erklären den Tawhid mit anderen Begriffen (z. B. Einheit im Wesen, in den Eigenschaften und in den Handlungen). Im Kern — Allah ist einer und allein anbetungswürdig — sind sich alle einig.",
            en: "The three-part division is a teaching aid used especially in the Hanbali-Athari tradition. The Ash'ari and Maturidi schools explain tawhid with other terms (e.g. oneness in essence, attributes and acts). On the core — Allah is One and alone worthy of worship — they all agree.",
            tr: "Üçlü ayrım, özellikle Hanbelî-Eserî gelenekte yaygın olan bir öğretim aracıdır. Eş'arî ve Mâtürîdî ekoller tevhidi farklı kavramlarla açıklar (ör. zatta, sıfatlarda ve fiillerde birlik). Özde — Allah birdir ve yalnızca O'na ibadet edilir — hepsi hemfikirdir.",
          },
        },
        {
          type: 'quran',
          ref: '2:255',
          arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
          translation: {
            de: "Allah — es gibt keinen Gott außer Ihm, dem Lebendigen und Beständigen. Ihn überkommt weder Schlummer noch Schlaf … (Anfang des „Thronverses“)",
            en: "Allah — there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep … (opening of the “Verse of the Throne”)",
            tr: "Allah, kendisinden başka hiçbir ilah olmayandır. Diridir, her şeyi ayakta tutandır. O'nu ne bir uyuklama ne de uyku tutar … (Âyetü'l-Kürsî'nin başı)",
          },
        },
        {
          type: 'quran',
          ref: '42:11',
          arabic: 'لَيْسَ كَمِثْلِهِ شَيْءٌ ۖ وَهُوَ السَّمِيعُ الْبَصِيرُ',
          translation: {
            de: "Nichts ist Ihm gleich; und Er ist der Allhörende, der Allsehende.",
            en: "There is nothing like Him, and He is the All-Hearing, the All-Seeing.",
            tr: "O'nun benzeri hiçbir şey yoktur. O, hakkıyla işitendir, hakkıyla görendir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Das Gegenteil: Shirk', en: 'The opposite: shirk', tr: 'Zıddı: şirk' },
        },
        {
          type: 'text',
          text: {
            de: "**Shirk** bedeutet, Allah etwas „beizugesellen“ — also jemand anderen anzubeten oder ihm Eigenschaften zuzuschreiben, die nur Allah gehören. Der Koran nennt Shirk ein „gewaltiges Unrecht“, weil es dem Schöpfer nicht gerecht wird. Gleichzeitig betont der Islam: Wer umkehrt, dem vergibt Allah — die Tür der Reue steht offen.",
            en: "**Shirk** means “associating” something with Allah — worshipping someone else or attributing to them qualities that belong only to Allah. The Quran calls shirk a “great injustice” because it fails to do justice to the Creator. At the same time Islam stresses: whoever turns back, Allah forgives — the door of repentance is open.",
            tr: "**Şirk**, Allah'a ortak koşmak, yani başkasına ibadet etmek veya yalnızca Allah'a ait sıfatları başkasına yakıştırmaktır. Kur'an şirki “büyük bir zulüm” olarak niteler, çünkü Yaratıcı'nın hakkını vermemektir. Aynı zamanda İslam şunu vurgular: Tövbe edeni Allah bağışlar — tövbe kapısı açıktır.",
          },
        },
        {
          type: 'quran',
          ref: '31:13',
          arabic: 'إِنَّ الشِّرْكَ لَظُلْمٌ عَظِيمٌ',
          translation: {
            de: "Gewiss, die Beigesellung ist fürwahr ein gewaltiges Unrecht. (Aus dem Rat Luqmans an seinen Sohn)",
            en: "Indeed, associating others with Allah is a great injustice. (From Luqman's advice to his son)",
            tr: "Şüphesiz şirk büyük bir zulümdür. (Lokman'ın oğluna öğüdünden)",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Allah stellt sich im Koran mit vielen schönen Namen vor, z. B. ar-Rahman (der Allerbarmer) und al-Wadud (der Liebevolle). Sie zu lernen ist ein schöner Weg, Ihn besser kennenzulernen.",
            en: "In the Quran Allah introduces Himself with many beautiful names, e.g. ar-Rahman (the Most Merciful) and al-Wadud (the Most Loving). Learning them is a lovely way to come to know Him better.",
            tr: "Allah Kur'an'da kendini birçok güzel isimle tanıtır, ör. er-Rahmân (çok merhametli) ve el-Vedûd (çok seven). Bu isimleri öğrenmek O'nu daha iyi tanımanın güzel bir yoludur.",
          },
        },
        { type: 'link', to: '/names', label: { de: 'Die 99 Namen Allahs ansehen', en: 'Explore the 99 names of Allah', tr: "Allah'ın 99 ismini incele" } },
        { type: 'terms', ids: ['tawhid', 'shirk', 'allah', 'aqida', 'tawba'] },
      ],
      quiz: [
        {
          question: {
            de: "Welche Sure fasst den Tawhid in vier Versen zusammen?",
            en: "Which surah summarises tawhid in four verses?",
            tr: "Tevhidi dört ayette özetleyen sure hangisidir?",
          },
          options: [
            { de: "Sure al-Ikhlas (112)", en: "Surah al-Ikhlas (112)", tr: "İhlâs Suresi (112)" },
            { de: "Sure al-Baqara (2)", en: "Surah al-Baqarah (2)", tr: "Bakara Suresi (2)" },
            { de: "Sure an-Nas (114)", en: "Surah an-Nas (114)", tr: "Nâs Suresi (114)" },
          ],
          answer: 0,
          explanation: {
            de: "Sure 112 (al-Ikhlas, „die Aufrichtigkeit“) beschreibt Allah als einen, absoluten Gott, der weder zeugt noch gezeugt wurde.",
            en: "Surah 112 (al-Ikhlas, “Sincerity”) describes Allah as the One, the Eternal Refuge, who neither begets nor was begotten.",
            tr: "112. sure (İhlâs) Allah'ı bir, samed, doğurmamış ve doğurulmamış olarak tanıtır.",
          },
        },
        {
          question: {
            de: "Was bezeichnet das Wort „Shirk“?",
            en: "What does the word “shirk” refer to?",
            tr: "“Şirk” kelimesi neyi ifade eder?",
          },
          options: [
            { de: "Das Fasten im Ramadan", en: "Fasting in Ramadan", tr: "Ramazan orucu" },
            { de: "Allah etwas beizugesellen", en: "Associating partners with Allah", tr: "Allah'a ortak koşmak" },
            { de: "Eine Rechtsschule", en: "A school of law", tr: "Bir mezhep" },
          ],
          answer: 1,
          explanation: {
            de: "Shirk ist das Gegenteil von Tawhid: jemanden oder etwas neben Allah anzubeten oder Ihm gleichzustellen.",
            en: "Shirk is the opposite of tawhid: worshipping someone or something besides Allah or treating it as His equal.",
            tr: "Şirk tevhidin zıddıdır: Allah'ın yanında başkasına ibadet etmek veya onu O'na denk tutmak.",
          },
        },
        {
          question: {
            de: "Was sagt Koran 42:11 über Allah?",
            en: "What does Quran 42:11 say about Allah?",
            tr: "Şûrâ 42:11 Allah hakkında ne söyler?",
          },
          options: [
            { de: "Nichts ist Ihm gleich", en: "There is nothing like Him", tr: "O'nun benzeri hiçbir şey yoktur" },
            { de: "Er hat einen Sohn", en: "He has a son", tr: "O'nun bir oğlu vardır" },
            { de: "Er schläft nachts", en: "He sleeps at night", tr: "O geceleri uyur" },
          ],
          answer: 0,
          explanation: {
            de: "„Nichts ist Ihm gleich“ — Allah ist mit nichts in Seiner Schöpfung vergleichbar.",
            en: "“There is nothing like Him” — Allah cannot be compared with anything in His creation.",
            tr: "“O'nun benzeri hiçbir şey yoktur” — Allah yarattıklarından hiçbirine benzetilemez.",
          },
        },
      ],
      sources: [
        'Quran 112:1-4, 2:255, 42:11, 31:13',
        "Zur Einteilung des Tawhid: Darstellungen in Werken der atharitischen sowie der aschʿaritisch/maturiditischen Kalam-Tradition (z. B. al-ʿAqida at-Tahawiyya)",
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 3 ───────────────────────────────────────────────────────────
    {
      id: 'shahada',
      title: {
        de: 'Die Schahada — das Glaubensbekenntnis',
        en: 'The Shahada — the declaration of faith',
        tr: 'Kelime-i Şehadet',
      },
      summary: {
        de: "Ein Satz mit zwei Teilen, der das Fundament des Islam bildet: was er bedeutet und was ihn lebendig macht.",
        en: "One sentence in two parts that forms the foundation of Islam: what it means and what brings it to life.",
        tr: "İslam'ın temelini oluşturan iki bölümlü bir cümle: anlamı ve onu canlı kılan şeyler.",
      },
      minutes: 5,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Die **Schahada** ist das Glaubensbekenntnis des Islam und die erste seiner fünf Säulen. Auf Arabisch lautet sie: **„Aschhadu an la ilaha illa-llah, wa aschhadu anna Muhammadan rasulu-llah.“** Auf Deutsch: „Ich bezeuge, dass es keine Gottheit gibt außer Allah, und ich bezeuge, dass Muhammad der Gesandte Allahs ist.“",
            en: "The **Shahada** is Islam's declaration of faith and the first of its five pillars. In Arabic: **“Ashhadu an la ilaha illa-llah, wa ashhadu anna Muhammadan rasulu-llah.”** In English: “I bear witness that there is no deity but Allah (God), and I bear witness that Muhammad is the Messenger of Allah.”",
            tr: "**Kelime-i şehadet**, İslam'ın inanç beyanı ve beş şartının ilkidir. Arapçası: **“Eşhedü en lâ ilâhe illallâh ve eşhedü enne Muhammeden Resûlullâh.”** Anlamı: “Allah'tan başka ilah olmadığına şahitlik ederim ve Muhammed'in Allah'ın Resulü olduğuna şahitlik ederim.”",
          },
        },
        {
          type: 'heading',
          text: { de: 'Teil 1: „Es gibt keine Gottheit außer Allah“', en: "Part 1: “There is no deity but Allah”", tr: "1. bölüm: “Allah'tan başka ilah yoktur”" },
        },
        {
          type: 'text',
          text: {
            de: "Der erste Teil hat zwei Seiten: ein **Nein** und ein **Ja**. „La ilaha“ — nichts verdient Anbetung: weder Geld noch Macht, weder Menschen noch Idole. „Illa-llah“ — außer Allah. Damit ist die Schahada eine Befreiung: Der Mensch beugt sich nur vor seinem Schöpfer.",
            en: "The first part has two sides: a **no** and a **yes**. “La ilaha” — nothing deserves worship: not money or power, not people or idols. “Illa-llah” — except Allah. In this sense the Shahada is a liberation: a person bows only before their Creator.",
            tr: "İlk bölümün iki yönü vardır: bir **hayır** ve bir **evet**. “Lâ ilâhe” — hiçbir şey ibadete layık değildir: ne para ne güç, ne insanlar ne putlar. “İllallâh” — ancak Allah. Bu anlamda şehadet bir özgürleşmedir: İnsan yalnızca Yaratıcısı'nın önünde eğilir.",
          },
        },
        {
          type: 'quran',
          ref: '47:19',
          arabic: 'فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ إِلَّا اللَّهُ',
          translation: {
            de: "So wisse, dass es keinen Gott gibt außer Allah …",
            en: "So know that there is no deity except Allah …",
            tr: "Bil ki, Allah'tan başka hiçbir ilah yoktur …",
          },
        },
        {
          type: 'heading',
          text: { de: 'Teil 2: „Muhammad ist der Gesandte Allahs“', en: "Part 2: “Muhammad is the Messenger of Allah”", tr: "2. bölüm: “Muhammed Allah'ın Resulüdür”" },
        },
        {
          type: 'text',
          text: {
            de: "Der zweite Teil bestätigt, dass Muhammad ﷺ von Allah gesandt wurde. Daraus folgt: Man glaubt, was er von Allah überbracht hat, folgt seiner Lebensweise (Sunna) und betet Allah so an, wie er es gelehrt hat. Zugleich war er ein Mensch — kein Gott und kein Gottessohn.",
            en: "The second part affirms that Muhammad ﷺ was sent by Allah. It follows that one believes what he conveyed from Allah, follows his way (Sunnah) and worships Allah as he taught. At the same time he was a human being — not God and not a son of God.",
            tr: "İkinci bölüm, Hz. Muhammed'in ﷺ Allah tarafından gönderildiğini teyit eder. Bundan şu çıkar: Onun Allah'tan getirdiklerine inanılır, sünnetine uyulur ve Allah'a onun öğrettiği şekilde ibadet edilir. Bununla birlikte o bir insandı — ne ilah ne de ilahın oğlu.",
          },
        },
        {
          type: 'quran',
          ref: '48:29',
          arabic: 'مُّحَمَّدٌ رَّسُولُ اللَّهِ',
          translation: {
            de: "Muhammad ist der Gesandte Allahs …",
            en: "Muhammad is the Messenger of Allah …",
            tr: "Muhammed Allah'ın Resulüdür …",
          },
        },
        {
          type: 'heading',
          text: { de: 'Was die Schahada lebendig macht', en: 'What brings the Shahada to life', tr: 'Şehadeti canlı kılanlar' },
        },
        {
          type: 'text',
          text: {
            de: "Die Schahada ist mehr als eine Formel. Gelehrte haben aus Koran und Sunna Bedingungen abgeleitet, die sie mit Leben füllen. Häufig genannt werden:",
            en: "The Shahada is more than a formula. Scholars have derived conditions from the Quran and Sunnah that give it life. Commonly mentioned are:",
            tr: "Şehadet bir formülden fazlasıdır. Âlimler Kur'an ve sünnetten onu canlı kılan şartlar çıkarmıştır. Sıkça sayılanlar şunlardır:",
          },
        },
        {
          type: 'list',
          items: [
            { de: "**Wissen** um ihre Bedeutung", en: "**Knowledge** of its meaning", tr: "Anlamını **bilmek**" },
            { de: "**Gewissheit** ohne Zweifel", en: "**Certainty** without doubt", tr: "Şüphesiz **kesin inanç**" },
            { de: "**Aufrichtigkeit** — sie gilt allein Allah", en: "**Sincerity** — it is for Allah alone", tr: "**İhlas** — yalnızca Allah için olması" },
            { de: "**Wahrhaftigkeit** — Herz und Zunge stimmen überein", en: "**Truthfulness** — heart and tongue agree", tr: "**Sadakat** — kalp ile dilin uyumu" },
            { de: "**Annahme und Hingabe** — man nimmt an, was sie bedeutet", en: "**Acceptance and submission** — accepting what it entails", tr: "**Kabul ve teslimiyet** — gerektirdiklerini kabul etmek" },
            { de: "**Liebe** zu Allah und Seinem Gesandten ﷺ", en: "**Love** for Allah and His Messenger ﷺ", tr: "Allah'a ve Resulü'ne ﷺ **sevgi**" },
          ],
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 26',
          narrator: "'Uthman ibn 'Affan",
          grade: 'sahih',
          text: {
            de: "Wer stirbt und dabei weiß, dass es keinen Gott gibt außer Allah, tritt ins Paradies ein.",
            en: "Whoever dies knowing that there is no deity except Allah will enter Paradise.",
            tr: "Allah'tan başka ilah olmadığını bilerek ölen kimse cennete girer.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Muslim werden', en: 'Becoming Muslim', tr: 'Müslüman olmak' },
        },
        {
          type: 'text',
          text: {
            de: "Wer die Schahada aus Überzeugung und freiem Willen ausspricht, wird Muslim. Es braucht keine Taufe, keine Gebühr und keinen Geistlichen; viele sprechen sie aber gern vor Zeugen in einer Moschee, um in der Gemeinschaft willkommen geheißen zu werden. Zwang ist ausgeschlossen:",
            en: "Whoever says the Shahada out of conviction and free will becomes Muslim. No baptism, fee or clergy is required, although many like to say it in front of witnesses at a mosque so the community can welcome them. Compulsion is ruled out:",
            tr: "Şehadeti inanarak ve özgür iradesiyle söyleyen kişi Müslüman olur. Vaftiz, ücret veya din adamı gerekmez; yine de birçok kişi toplulukça karşılanmak için onu bir camide şahitler önünde söylemeyi tercih eder. Zorlama söz konusu olamaz:",
          },
        },
        {
          type: 'quran',
          ref: '2:256',
          arabic: 'لَا إِكْرَاهَ فِي الدِّينِ',
          translation: {
            de: "Es gibt keinen Zwang im Glauben …",
            en: "There is no compulsion in religion …",
            tr: "Dinde zorlama yoktur …",
          },
        },
        {
          type: 'note',
          variant: 'important',
          text: {
            de: "Die Schahada ist ein Anfang, kein Abschluss. Niemand muss am ersten Tag alles wissen oder können — der Islam wird Schritt für Schritt gelernt.",
            en: "The Shahada is a beginning, not an end. Nobody has to know or be able to do everything on day one — Islam is learned step by step.",
            tr: "Şehadet bir başlangıçtır, son değil. Kimse ilk gün her şeyi bilmek veya yapabilmek zorunda değildir — İslam adım adım öğrenilir.",
          },
        },
        { type: 'terms', ids: ['shahada', 'tawhid', 'rasul', 'sunnah', 'muslim'] },
      ],
      quiz: [
        {
          question: {
            de: "Aus welchen zwei Teilen besteht die Schahada?",
            en: "What are the two parts of the Shahada?",
            tr: "Kelime-i şehadet hangi iki bölümden oluşur?",
          },
          options: [
            {
              de: "Gebet und Fasten",
              en: "Prayer and fasting",
              tr: "Namaz ve oruç",
            },
            {
              de: "Es gibt keine Gottheit außer Allah — Muhammad ist Sein Gesandter",
              en: "There is no deity but Allah — Muhammad is His Messenger",
              tr: "Allah'tan başka ilah yoktur — Muhammed O'nun Resulüdür",
            },
            {
              de: "Glaube an Engel — Glaube an Bücher",
              en: "Belief in angels — belief in books",
              tr: "Meleklere iman — kitaplara iman",
            },
          ],
          answer: 1,
          explanation: {
            de: "Der erste Teil bekräftigt den Tawhid, der zweite die Gesandtschaft Muhammads ﷺ.",
            en: "The first part affirms tawhid, the second the messengership of Muhammad ﷺ.",
            tr: "İlk bölüm tevhidi, ikinci bölüm Hz. Muhammed'in ﷺ peygamberliğini teyit eder.",
          },
        },
        {
          question: {
            de: "Was ist nötig, um Muslim zu werden?",
            en: "What is required to become Muslim?",
            tr: "Müslüman olmak için ne gerekir?",
          },
          options: [
            { de: "Eine Prüfung bei einem Imam", en: "An exam with an imam", tr: "Bir imam önünde sınav" },
            { de: "Die Schahada aus Überzeugung und freiem Willen", en: "Saying the Shahada with conviction and free will", tr: "Şehadeti inanarak ve özgür iradeyle söylemek" },
            { de: "Eine Reise nach Mekka", en: "A journey to Mecca", tr: "Mekke'ye yolculuk" },
          ],
          answer: 1,
          explanation: {
            de: "Die aufrichtige Schahada genügt. Zeugen in einer Moschee sind schön, aber keine Bedingung — und Zwang ist ausgeschlossen (2:256).",
            en: "A sincere Shahada is enough. Witnesses at a mosque are nice but not a condition — and compulsion is ruled out (2:256).",
            tr: "Samimi bir şehadet yeterlidir. Camide şahitler güzeldir ama şart değildir — ve zorlama olamaz (2:256).",
          },
        },
      ],
      sources: [
        'Quran 47:19, 48:29, 2:256',
        'Sahih Muslim 26',
        "Bedingungen der Schahada: verbreitete Zusammenfassung späterer Gelehrter auf Grundlage von Koran und Sunna",
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 4 ───────────────────────────────────────────────────────────
    {
      id: 'six-articles-of-faith',
      title: {
        de: 'Die sechs Glaubensartikel',
        en: 'The six articles of faith',
        tr: 'Altı iman esası',
      },
      summary: {
        de: "Woran glauben Muslime? Der berühmte „Hadith Dschibril“ fasst den Glauben in sechs Punkten zusammen.",
        en: "What do Muslims believe? The famous “Hadith of Jibril” sums up faith in six points.",
        tr: "Müslümanlar neye inanır? Meşhur “Cibril Hadisi” imanı altı maddede özetler.",
      },
      minutes: 6,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Eines Tages saß der Prophet ﷺ mit seinen Gefährten zusammen, als ein Mann mit strahlend weißer Kleidung und tiefschwarzem Haar erschien. Niemand kannte ihn, und doch waren an ihm keine Spuren einer Reise zu sehen. Er setzte sich vor den Propheten ﷺ und stellte ihm Fragen: über den Islam, den Glauben (Iman), die Vollkommenheit (Ihsan) und die Stunde. Später erklärte der Prophet ﷺ: Es war der Engel **Jibril** (Gabriel), der gekommen war, um die Menschen ihre Religion zu lehren.",
            en: "One day the Prophet ﷺ was sitting with his companions when a man appeared in brilliant white clothes with jet-black hair. No one knew him, yet he showed no signs of travel. He sat before the Prophet ﷺ and asked him about Islam, faith (iman), excellence (ihsan) and the Hour. Later the Prophet ﷺ explained: it was the angel **Jibril** (Gabriel), who had come to teach people their religion.",
            tr: "Bir gün Peygamber ﷺ ashabıyla otururken bembeyaz elbiseli, simsiyah saçlı bir adam çıkageldi. Kimse onu tanımıyordu, üzerinde yolculuk izi de yoktu. Peygamber'in ﷺ önüne oturdu ve ona İslam'ı, imanı, ihsanı ve kıyameti sordu. Daha sonra Peygamber ﷺ açıkladı: Bu, insanlara dinlerini öğretmek için gelen **Cebrail** idi.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 8 (Hadith Jibril)',
          narrator: "'Umar ibn al-Khattab",
          grade: 'sahih',
          text: {
            de: "Er sagte: „Berichte mir über den Glauben (Iman).“ Er (der Prophet ﷺ) sagte: „Dass du an Allah glaubst, an Seine Engel, Seine Bücher, Seine Gesandten und den Jüngsten Tag, und dass du an die Bestimmung glaubst, an ihr Gutes und ihr Schlechtes.“",
            en: "He said: “Tell me about faith (iman).” He (the Prophet ﷺ) said: “That you believe in Allah, His angels, His books, His messengers and the Last Day, and that you believe in divine decree, its good and its bad.”",
            tr: "“Bana imanı anlat” dedi. Peygamber ﷺ şöyle buyurdu: “Allah'a, meleklerine, kitaplarına, peygamberlerine ve ahiret gününe iman etmen; kadere, hayrına ve şerrine iman etmendir.”",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die sechs Artikel im Überblick', en: 'The six articles at a glance', tr: 'Altı esas bir bakışta' },
        },
        {
          type: 'list',
          items: [
            { de: "**Allah** — der eine Schöpfer, ohne Partner (Tawhid)", en: "**Allah** — the one Creator, without partner (tawhid)", tr: "**Allah** — ortağı olmayan tek Yaratıcı (tevhid)" },
            { de: "**Die Engel** — Geschöpfe aus Licht, die Allahs Aufträge ausführen", en: "**The angels** — beings of light who carry out Allah's commands", tr: "**Melekler** — Allah'ın emirlerini yerine getiren nurdan varlıklar" },
            { de: "**Die Bücher** — die Offenbarungen, u. a. Tora, Psalter, Evangelium und Koran", en: "**The books** — the revelations, including the Torah, Psalms, Gospel and Quran", tr: "**Kitaplar** — Tevrat, Zebur, İncil ve Kur'an gibi vahiyler" },
            { de: "**Die Gesandten** — von Adam bis Muhammad ﷺ", en: "**The messengers** — from Adam to Muhammad ﷺ", tr: "**Peygamberler** — Hz. Âdem'den Hz. Muhammed'e ﷺ" },
            { de: "**Der Jüngste Tag** — Auferstehung, Rechenschaft und Jenseits", en: "**The Last Day** — resurrection, accountability and the Hereafter", tr: "**Ahiret günü** — diriliş, hesap ve ahiret hayatı" },
            { de: "**Die Bestimmung (Qadar)** — Allahs Wissen und Wille umfassen alles", en: "**Divine decree (qadar)** — Allah's knowledge and will encompass everything", tr: "**Kader** — Allah'ın ilmi ve iradesi her şeyi kuşatır" },
          ],
        },
        {
          type: 'quran',
          ref: '2:285',
          translation: {
            de: "Der Gesandte glaubt an das, was zu ihm von seinem Herrn herabgesandt wurde, und ebenso die Gläubigen: Alle glauben an Allah, Seine Engel, Seine Bücher und Seine Gesandten. „Wir machen keinen Unterschied zwischen jemandem von Seinen Gesandten.“ Und sie sagen: „Wir hören und gehorchen. (Gewähre uns) Deine Vergebung, unser Herr! Und zu Dir ist der Ausgang.“",
            en: "The Messenger has believed in what was revealed to him from his Lord, and so have the believers. All of them have believed in Allah, His angels, His books and His messengers: “We make no distinction between any of His messengers.” And they say: “We hear and we obey. (We seek) Your forgiveness, our Lord, and to You is the final return.”",
            tr: "Peygamber, Rabbinden kendisine indirilene iman etti, müminler de. Hepsi Allah'a, meleklerine, kitaplarına ve peygamberlerine iman ettiler: “O'nun peygamberlerinden hiçbiri arasında ayrım yapmayız.” Ve dediler ki: “İşittik ve itaat ettik. Rabbimiz! Bağışlamanı dileriz. Dönüş ancak sanadır.”",
          },
        },
        {
          type: 'quran',
          ref: '4:136',
          translation: {
            de: "O die ihr glaubt, glaubt an Allah und Seinen Gesandten und an das Buch, das Er Seinem Gesandten offenbart hat, und an die Schrift, die Er zuvor herabgesandt hat. Wer Allah, Seine Engel, Seine Bücher, Seine Gesandten und den Jüngsten Tag verleugnet, der ist fürwahr weit abgeirrt.",
            en: "O you who believe, believe in Allah and His Messenger and the Book He sent down to His Messenger and the Scripture He sent down before. Whoever disbelieves in Allah, His angels, His books, His messengers and the Last Day has certainly gone far astray.",
            tr: "Ey iman edenler! Allah'a, Resulü'ne, Resulü'ne indirdiği Kitap'a ve daha önce indirdiği kitaplara iman edin. Kim Allah'ı, meleklerini, kitaplarını, peygamberlerini ve ahiret gününü inkâr ederse, şüphesiz derin bir sapıklığa düşmüştür.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Islam, Iman und Ihsan', en: 'Islam, iman and ihsan', tr: 'İslam, iman ve ihsan' },
        },
        {
          type: 'text',
          text: {
            de: "Der Hadith Jibril beschreibt drei Ebenen der Religion: **Islam** (die äußeren Handlungen wie Gebet und Fasten), **Iman** (der innere Glaube) und **Ihsan** (Allah so zu dienen, als sähe man Ihn). Die fünf Säulen lernst du in Lektion 7 kennen, Ihsan in Lektion 12.",
            en: "The Hadith of Jibril describes three levels of religion: **islam** (outward acts such as prayer and fasting), **iman** (inner faith) and **ihsan** (serving Allah as though you see Him). You will meet the five pillars in lesson 7 and ihsan in lesson 12.",
            tr: "Cibril Hadisi dinin üç boyutunu anlatır: **İslam** (namaz ve oruç gibi dış ameller), **iman** (iç inanç) ve **ihsan** (Allah'a O'nu görüyormuş gibi kulluk etmek). Beş şartı 7. derste, ihsanı 12. derste öğreneceksin.",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Glaube ist im Islam nicht nur ein Gedanke im Kopf. Nach dem Verständnis der meisten Gelehrten kann er wachsen und abnehmen — er wächst durch gute Taten, Gebet und Nachdenken.",
            en: "In Islam faith is not merely a thought in the head. According to most scholars it can increase and decrease — it grows through good deeds, prayer and reflection.",
            tr: "İslam'da iman yalnızca zihindeki bir düşünce değildir. Âlimlerin çoğuna göre artıp eksilebilir — iyi ameller, namaz ve tefekkürle güçlenir.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Ob der Glaube selbst zu- und abnimmt oder nur seine Früchte, wird unterschiedlich erklärt: Die hanafitisch-maturiditische Tradition versteht Iman vor allem als Bestätigung des Herzens (und Bekenntnis der Zunge), die Taten als seine Frucht; die Mehrheit der übrigen Gelehrten zählt die Taten zum Iman. Einig sind sich alle, dass gute Taten wichtig sind.",
            en: "Whether faith itself increases and decreases, or only its fruits, is explained differently: the Hanafi-Maturidi tradition defines iman mainly as affirmation of the heart (and tongue), with deeds as its fruit; most other scholars count deeds as part of iman. All agree that good deeds matter.",
            tr: "İmanın kendisinin mi yoksa yalnızca meyvelerinin mi artıp eksildiği farklı açıklanır: Hanefî-Mâtürîdî gelenek imanı esas olarak kalbin tasdiki (ve dilin ikrarı) olarak tanımlar, amelleri onun meyvesi sayar; diğer âlimlerin çoğu ise amelleri imandan sayar. Hepsi iyi amellerin önemli olduğunda hemfikirdir.",
          },
        },
        { type: 'terms', ids: ['iman', 'jibril', 'malaika', 'kutub', 'rasul', 'yawm-al-qiyamah', 'qadar'] },
      ],
      quiz: [
        {
          question: {
            de: "Wer war der Fremde im „Hadith Jibril“?",
            en: "Who was the stranger in the “Hadith of Jibril”?",
            tr: "“Cibril Hadisi”ndeki yabancı kimdi?",
          },
          options: [
            { de: "Ein Kaufmann aus Syrien", en: "A merchant from Syria", tr: "Şamlı bir tüccar" },
            { de: "Der Engel Jibril (Gabriel)", en: "The angel Jibril (Gabriel)", tr: "Cebrail" },
            { de: "Ein Gefährte namens Abu Bakr", en: "A companion named Abu Bakr", tr: "Hz. Ebu Bekir" },
          ],
          answer: 1,
          explanation: {
            de: "Der Prophet ﷺ erklärte, es sei Jibril gewesen, der gekommen war, um die Menschen ihre Religion zu lehren (Sahih Muslim 8).",
            en: "The Prophet ﷺ explained it was Jibril, who had come to teach people their religion (Sahih Muslim 8).",
            tr: "Peygamber ﷺ onun, insanlara dinlerini öğretmek için gelen Cebrail olduğunu açıkladı (Müslim 8).",
          },
        },
        {
          question: {
            de: "Welcher der folgenden Punkte gehört NICHT zu den sechs Glaubensartikeln?",
            en: "Which of the following is NOT one of the six articles of faith?",
            tr: "Aşağıdakilerden hangisi altı iman esasından biri DEĞİLDİR?",
          },
          options: [
            { de: "Der Glaube an die Engel", en: "Belief in the angels", tr: "Meleklere iman" },
            { de: "Der Glaube an die Bestimmung", en: "Belief in divine decree", tr: "Kadere iman" },
            { de: "Die Pilgerfahrt nach Mekka", en: "The pilgrimage to Mecca", tr: "Hac" },
            { de: "Der Glaube an den Jüngsten Tag", en: "Belief in the Last Day", tr: "Ahiret gününe iman" },
          ],
          answer: 2,
          explanation: {
            de: "Die Pilgerfahrt (Hadsch) ist eine der fünf Säulen — also eine Handlung, kein Glaubensartikel.",
            en: "The pilgrimage (Hajj) is one of the five pillars — an act, not an article of faith.",
            tr: "Hac İslam'ın beş şartından biridir — yani bir ibadettir, iman esası değildir.",
          },
        },
        {
          question: {
            de: "Welche drei Ebenen der Religion nennt der Hadith Jibril?",
            en: "Which three levels of religion does the Hadith of Jibril mention?",
            tr: "Cibril Hadisi dinin hangi üç boyutunu sayar?",
          },
          options: [
            { de: "Islam, Iman, Ihsan", en: "Islam, iman, ihsan", tr: "İslam, iman, ihsan" },
            { de: "Gebet, Fasten, Pilgerfahrt", en: "Prayer, fasting, pilgrimage", tr: "Namaz, oruç, hac" },
            { de: "Koran, Sunna, Fiqh", en: "Quran, Sunnah, fiqh", tr: "Kur'an, sünnet, fıkıh" },
          ],
          answer: 0,
          explanation: {
            de: "Islam (äußere Praxis), Iman (innerer Glaube) und Ihsan (Vollkommenheit im Dienst an Allah).",
            en: "Islam (outward practice), iman (inner faith) and ihsan (excellence in serving Allah).",
            tr: "İslam (dış uygulama), iman (iç inanç) ve ihsan (Allah'a kullukta mükemmellik).",
          },
        },
      ],
      sources: [
        'Sahih Muslim 8 (Hadith Jibril)',
        'Quran 2:285, 4:136',
        QURAN_REF,
      ],
      review: 'draft',
    },
    // ─── 5 ───────────────────────────────────────────────────────────
    {
      id: 'angels-books-messengers',
      title: {
        de: 'Engel, Bücher und Gesandte',
        en: 'Angels, books and messengers',
        tr: 'Melekler, kitaplar ve peygamberler',
      },
      summary: {
        de: "Wie Allah mit den Menschen in Verbindung tritt: durch Engel, offenbarte Schriften und auserwählte Propheten.",
        en: "How Allah communicates with humanity: through angels, revealed scriptures and chosen prophets.",
        tr: "Allah'ın insanlarla nasıl iletişim kurduğu: melekler, indirilen kitaplar ve seçilmiş peygamberler aracılığıyla.",
      },
      minutes: 6,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Drei der sechs Glaubensartikel hängen eng zusammen: Allah sendet Seine Botschaft durch einen **Engel** (meist Jibril) an einen **Gesandten**, und diese Botschaft wird teilweise als **Buch** festgehalten. So erklärt der Islam, wie Rechtleitung zu den Menschen kommt.",
            en: "Three of the six articles of faith are closely linked: Allah (God) sends His message through an **angel** (usually Jibril) to a **messenger**, and this message is in some cases preserved as a **book**. This is how Islam explains how guidance reaches humanity.",
            tr: "Altı iman esasından üçü birbiriyle yakından bağlantılıdır: Allah mesajını bir **melek** (çoğunlukla Cebrail) aracılığıyla bir **peygambere** gönderir ve bu mesaj bazen bir **kitap** olarak korunur. İslam, hidayetin insanlara böyle ulaştığını anlatır.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Engel', en: 'The angels', tr: 'Melekler' },
        },
        {
          type: 'text',
          text: {
            de: "Engel (arabisch **Mala'ika**) sind Geschöpfe Allahs, die wir normalerweise nicht sehen. Sie haben keinen eigenen Willen zur Sünde, sondern dienen Allah vollkommen. Sie sind keine Götter und keine Vermittler, zu denen man betet.",
            en: "Angels (Arabic **mala'ika**) are creations of Allah that we normally cannot see. They have no inclination to sin but serve Allah perfectly. They are not gods, nor intermediaries to whom one prays.",
            tr: "Melekler, normalde göremediğimiz, Allah'ın yarattığı varlıklardır. Günah işleme eğilimleri yoktur; Allah'a kusursuzca kulluk ederler. İlah değildirler; kendilerine dua edilen aracılar da değildirler.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 2996',
          narrator: "'A'ischa",
          grade: 'sahih',
          text: {
            de: "Die Engel wurden aus Licht erschaffen, die Dschinn aus rauchloser Feuerflamme, und Adam aus dem, was euch beschrieben worden ist.",
            en: "The angels were created from light, the jinn were created from a smokeless flame of fire, and Adam was created from what has been described to you.",
            tr: "Melekler nurdan, cinler dumansız ateşten, Âdem de size anlatılan şeyden yaratıldı.",
          },
        },
        {
          type: 'list',
          items: [
            { de: "**Jibril** (Gabriel) überbringt die Offenbarung an die Propheten.", en: "**Jibril** (Gabriel) brings revelation to the prophets.", tr: "**Cebrail** vahyi peygamberlere getirir." },
            { de: "**Mika'il** (Michael) wird nach der Überlieferung u. a. mit Regen und Versorgung verbunden.", en: "**Mika'il** (Michael) is associated in tradition with rain and provision, among other things.", tr: "**Mikâil** rivayetlere göre yağmur ve rızık gibi işlerle görevlidir." },
            { de: "**Der Engel des Todes** nimmt die Seelen (32:11).", en: "**The angel of death** takes the souls (32:11).", tr: "**Ölüm meleği** ruhları alır (32:11)." },
            { de: "**Die edlen Schreiber** zeichnen die Taten jedes Menschen auf (82:10–12).", en: "**The noble scribes** record every person's deeds (82:10–12).", tr: "**Değerli yazıcılar** (Kirâmen Kâtibîn) her insanın amellerini yazar (82:10–12)." },
          ],
        },
        {
          type: 'quran',
          ref: '66:6',
          translation: {
            de: "… (Engel), die sich Allah nicht widersetzen in dem, was Er ihnen befiehlt, und die tun, was ihnen befohlen wird.",
            en: "… (angels) who do not disobey Allah in what He commands them, but do what they are commanded.",
            tr: "… (melekler) Allah'ın kendilerine verdiği emirlere karşı gelmezler ve emrolundukları şeyi yaparlar.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die offenbarten Bücher', en: 'The revealed books', tr: 'İndirilen kitaplar' },
        },
        {
          type: 'text',
          text: {
            de: "Muslime glauben, dass Allah den Menschen zu verschiedenen Zeiten Schriften offenbart hat. Der Koran nennt namentlich:",
            en: "Muslims believe that Allah revealed scriptures to humanity at different times. The Quran names:",
            tr: "Müslümanlar, Allah'ın farklı zamanlarda insanlara kitaplar indirdiğine inanır. Kur'an şunları adıyla anar:",
          },
        },
        {
          type: 'list',
          items: [
            { de: "die **Blätter (Suhuf)** Ibrahims und Musas (87:18–19)", en: "the **scrolls (suhuf)** of Ibrahim and Musa (87:18–19)", tr: "Hz. İbrahim ve Hz. Musa'nın **sahifeleri** (87:18–19)" },
            { de: "die **Tora (Tawrat)**, offenbart an Musa (Mose)", en: "the **Torah (Tawrat)**, revealed to Musa (Moses)", tr: "Hz. Musa'ya indirilen **Tevrat**" },
            { de: "den **Psalter (Zabur)**, gegeben an Dawud (David) (4:163)", en: "the **Psalms (Zabur)**, given to Dawud (David) (4:163)", tr: "Hz. Davud'a verilen **Zebur** (4:163)" },
            { de: "das **Evangelium (Injil)**, gegeben an Isa (Jesus) (5:46)", en: "the **Gospel (Injil)**, given to Isa (Jesus) (5:46)", tr: "Hz. İsa'ya verilen **İncil** (5:46)" },
            { de: "den **Koran**, offenbart an Muhammad ﷺ", en: "the **Quran**, revealed to Muhammad ﷺ", tr: "Hz. Muhammed'e ﷺ indirilen **Kur'an**" },
          ],
        },
        {
          type: 'text',
          text: {
            de: "Muslime glauben an die ursprünglichen Offenbarungen. Der Koran versteht sich als letzte Schrift, die die früheren bestätigt und über ihnen als Maßstab steht (5:48).",
            en: "Muslims believe in the original revelations. The Quran sees itself as the final scripture, confirming the earlier ones and standing over them as a criterion (5:48).",
            tr: "Müslümanlar önceki vahiylerin aslına iman eder. Kur'an kendini, öncekileri tasdik eden ve onlar üzerinde ölçü olan son kitap olarak tanıtır (5:48).",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Propheten und Gesandten', en: 'The prophets and messengers', tr: 'Nebiler ve resuller' },
        },
        {
          type: 'text',
          text: {
            de: "Propheten sind Menschen — keine Engel und keine Götter —, die Allah auserwählt hat, um Seine Botschaft zu überbringen. Sie gelten als Vorbilder in Aufrichtigkeit und Charakter. Der Koran nennt 25 von ihnen beim Namen, doch Allah hat zu jedem Volk Gesandte geschickt — auch solche, von denen wir nichts wissen (4:164).",
            en: "Prophets are human beings — not angels and not gods — whom Allah chose to convey His message. They are role models in sincerity and character. The Quran names 25 of them, but Allah sent messengers to every nation — including some we know nothing about (4:164).",
            tr: "Peygamberler, Allah'ın mesajını iletmek için seçtiği insanlardır — melek de ilah da değildirler. Doğruluk ve ahlakta örnektirler. Kur'an 25 peygamberin adını verir, ama Allah her topluma peygamber göndermiştir — bazılarını hiç bilmeyiz (4:164).",
          },
        },
        {
          type: 'quran',
          ref: '16:36',
          translation: {
            de: "Und Wir haben ja in jeder Gemeinschaft einen Gesandten erstehen lassen: „Dient Allah und meidet die falschen Götter.“",
            en: "And We certainly sent to every nation a messenger, (saying): “Worship Allah and avoid false gods.”",
            tr: "Andolsun biz her ümmete “Allah'a kulluk edin ve tâğuttan kaçının” diye bir peygamber gönderdik.",
          },
        },
        {
          type: 'quran',
          ref: '33:40',
          translation: {
            de: "Muhammad ist nicht der Vater irgendeines eurer Männer, sondern Allahs Gesandter und das Siegel der Propheten.",
            en: "Muhammad is not the father of any of your men, but he is the Messenger of Allah and the Seal of the Prophets.",
            tr: "Muhammed sizin erkeklerinizden hiçbirinin babası değildir; fakat o Allah'ın Resulü ve peygamberlerin sonuncusudur.",
          },
        },
        {
          type: 'note',
          variant: 'important',
          text: {
            de: "Muslime lieben und ehren alle Propheten, auch Musa und Isa (Jesus). Isa gilt im Islam als einer der größten Propheten und als Messias, nicht aber als Gott oder Sohn Gottes.",
            en: "Muslims love and honour all the prophets, including Musa (Moses) and Isa (Jesus). In Islam Jesus is one of the greatest prophets and the Messiah, but not God or the son of God.",
            tr: "Müslümanlar Hz. Musa ve Hz. İsa dahil bütün peygamberleri sever ve onlara saygı duyar. Hz. İsa İslam'da en büyük peygamberlerden biri ve Mesih'tir; ancak ilah ya da Allah'ın oğlu değildir.",
          },
        },
        { type: 'terms', ids: ['malaika', 'jibril', 'jinn', 'kutub', 'tawrat', 'zabur', 'injil', 'nabi', 'rasul', 'wahy'] },
      ],
      quiz: [
        {
          question: {
            de: "Woraus wurden die Engel nach Sahih Muslim 2996 erschaffen?",
            en: "According to Sahih Muslim 2996, what were the angels created from?",
            tr: "Müslim 2996'ya göre melekler neden yaratılmıştır?",
          },
          options: [
            { de: "Aus Lehm", en: "From clay", tr: "Çamurdan" },
            { de: "Aus Licht", en: "From light", tr: "Nurdan" },
            { de: "Aus rauchlosem Feuer", en: "From smokeless fire", tr: "Dumansız ateşten" },
          ],
          answer: 1,
          explanation: {
            de: "Die Engel wurden aus Licht erschaffen, die Dschinn aus rauchlosem Feuer und Adam aus Erde.",
            en: "The angels were created from light, the jinn from smokeless fire and Adam from earth.",
            tr: "Melekler nurdan, cinler dumansız ateşten, Hz. Âdem ise topraktan yaratılmıştır.",
          },
        },
        {
          question: {
            de: "Welche Schrift wurde dem Propheten Dawud (David) gegeben?",
            en: "Which scripture was given to the prophet Dawud (David)?",
            tr: "Hz. Davud'a hangi kitap verilmiştir?",
          },
          options: [
            { de: "Die Tora", en: "The Torah", tr: "Tevrat" },
            { de: "Das Evangelium", en: "The Gospel", tr: "İncil" },
            { de: "Der Psalter (Zabur)", en: "The Psalms (Zabur)", tr: "Zebur" },
          ],
          answer: 2,
          explanation: {
            de: "Koran 4:163 erwähnt, dass Dawud der Zabur (Psalter) gegeben wurde.",
            en: "Quran 4:163 mentions that Dawud was given the Zabur (Psalms).",
            tr: "Nisâ 4:163, Hz. Davud'a Zebur verildiğini bildirir.",
          },
        },
        {
          question: {
            de: "Was bedeutet „Siegel der Propheten“ (33:40)?",
            en: "What does “Seal of the Prophets” (33:40) mean?",
            tr: "“Peygamberlerin sonuncusu” (Hâtemü'n-nebiyyîn, 33:40) ne demektir?",
          },
          options: [
            { de: "Muhammad ﷺ ist der letzte Prophet", en: "Muhammad ﷺ is the final prophet", tr: "Hz. Muhammed ﷺ son peygamberdir" },
            { de: "Muhammad ﷺ war der erste Prophet", en: "Muhammad ﷺ was the first prophet", tr: "Hz. Muhammed ﷺ ilk peygamberdir" },
            { de: "Muhammad ﷺ war ein Engel", en: "Muhammad ﷺ was an angel", tr: "Hz. Muhammed ﷺ bir melektir" },
          ],
          answer: 0,
          explanation: {
            de: "Mit Muhammad ﷺ ist die Reihe der Propheten abgeschlossen; nach ihm kommt kein Prophet mehr.",
            en: "The line of prophets is completed with Muhammad ﷺ; no prophet comes after him.",
            tr: "Peygamberlik zinciri Hz. Muhammed ﷺ ile tamamlanmıştır; ondan sonra peygamber gelmeyecektir.",
          },
        },
      ],
      sources: [
        'Sahih Muslim 2996',
        'Quran 66:6, 32:11, 82:10-12, 87:18-19, 4:163, 5:46, 5:48, 4:164, 16:36, 33:40',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 6 ───────────────────────────────────────────────────────────
    {
      id: 'last-day-and-qadar',
      title: {
        de: 'Der Jüngste Tag und die Vorherbestimmung (Qadar)',
        en: 'The Last Day and divine decree (Qadar)',
        tr: 'Ahiret günü ve kader',
      },
      summary: {
        de: "Was nach dem Tod kommt, warum jede Tat zählt — und wie Allahs Bestimmung und menschliche Verantwortung zusammengehen.",
        en: "What comes after death, why every deed counts — and how Allah's decree and human responsibility fit together.",
        tr: "Ölümden sonra ne olacağı, her amelin neden önemli olduğu — ve Allah'ın takdiri ile insanın sorumluluğunun nasıl bir arada olduğu.",
      },
      minutes: 7,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Muslime glauben, dass das Leben auf der Erde nicht alles ist. Nach dem Tod folgt das **Jenseits (Akhira)**. Am **Jüngsten Tag** wird Allah alle Menschen auferwecken und jedem gerecht und barmherzig vergelten, was er getan hat.",
            en: "Muslims believe that life on earth is not everything. After death comes the **Hereafter (akhirah)**. On the **Last Day** Allah (God) will raise all people and repay everyone justly and mercifully for what they did.",
            tr: "Müslümanlar dünya hayatının her şey olmadığına inanır. Ölümden sonra **ahiret** gelir. **Kıyamet gününde** Allah bütün insanları diriltecek ve herkese yaptığının karşılığını adaletle ve merhametle verecektir.",
          },
        },
        {
          type: 'quran',
          ref: '3:185',
          arabic: 'كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ',
          translation: {
            de: "Jede Seele wird den Tod kosten. Und euch wird am Tag der Auferstehung euer Lohn voll zukommen …",
            en: "Every soul will taste death. And you will only be given your full reward on the Day of Resurrection …",
            tr: "Her canlı ölümü tadacaktır. Ancak yaptıklarınızın karşılığı kıyamet günü size tastamam verilecektir …",
          },
        },
        {
          type: 'heading',
          text: { de: 'Jede Tat zählt', en: 'Every deed counts', tr: 'Her amel önemlidir' },
        },
        {
          type: 'quran',
          ref: '99:7-8',
          arabic: 'فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ ۝ وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ',
          translation: {
            de: "Wer also im Gewicht eines Stäubchens Gutes tut, wird es sehen. Und wer im Gewicht eines Stäubchens Böses tut, wird es sehen.",
            en: "So whoever does an atom's weight of good will see it, and whoever does an atom's weight of evil will see it.",
            tr: "Kim zerre ağırlığınca bir hayır işlerse onu görür. Kim de zerre ağırlığınca bir şer işlerse onu görür.",
          },
        },
        {
          type: 'text',
          text: {
            de: "Der Glaube an den Jüngsten Tag gibt dem Leben Sinn und Richtung: Ungerechtigkeit bleibt nicht ungesühnt, und kein gutes Wort ist verloren. Die Belohnung ist das **Paradies (Janna)**, die Warnung die **Hölle (Dschahannam)**. Muslime leben dabei zwischen Hoffnung auf Allahs Barmherzigkeit und Ehrfurcht vor Seiner Gerechtigkeit.",
            en: "Belief in the Last Day gives life meaning and direction: injustice does not go unanswered, and no kind word is lost. The reward is **Paradise (jannah)**, the warning is **Hell (jahannam)**. Muslims live between hope in Allah's mercy and awe of His justice.",
            tr: "Ahiret inancı hayata anlam ve yön verir: Zulüm karşılıksız kalmaz, hiçbir güzel söz kaybolmaz. Mükâfat **cennet**, uyarı **cehennemdir**. Müslümanlar Allah'ın rahmetini umma ile adaletinden korkma arasında yaşar.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Bestimmung (Qadar)', en: 'Divine decree (qadar)', tr: 'Kader' },
        },
        {
          type: 'text',
          text: {
            de: "Der sechste Glaubensartikel ist der Glaube an **Qadar**, die göttliche Bestimmung. Gelehrte fassen ihn oft in vier Punkten zusammen: Allah **weiß** alles; Er hat alles **festgeschrieben**; nichts geschieht ohne Seinen **Willen**; und Er ist der **Schöpfer** aller Dinge.",
            en: "The sixth article of faith is belief in **qadar**, divine decree. Scholars often summarise it in four points: Allah **knows** everything; He has **recorded** everything; nothing happens without His **will**; and He is the **Creator** of all things.",
            tr: "Altıncı iman esası **kadere** imandır. Âlimler bunu çoğu zaman dört maddede özetler: Allah her şeyi **bilir**; her şeyi **yazmıştır**; O'nun **dilemesi** olmadan hiçbir şey olmaz; ve her şeyin **yaratıcısı** O'dur.",
          },
        },
        {
          type: 'quran',
          ref: '54:49',
          arabic: 'إِنَّا كُلَّ شَيْءٍ خَلَقْنَاهُ بِقَدَرٍ',
          translation: {
            de: "Gewiss, Wir haben alles nach einem Maß (einer Bestimmung) erschaffen.",
            en: "Indeed, We have created all things according to a measure (decree).",
            tr: "Şüphesiz biz her şeyi bir ölçüye (kadere) göre yarattık.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Und der freie Wille?', en: 'And free will?', tr: 'Ya özgür irade?' },
        },
        {
          type: 'text',
          text: {
            de: "Qadar bedeutet nicht, dass der Mensch eine Marionette ist. Der Koran spricht den Menschen immer wieder als verantwortlich an: Er kann wählen, und er wird nur für das gefragt, was in seiner Macht lag. Allahs Wissen zwingt niemanden — es umfasst nur, was geschehen wird.",
            en: "Qadar does not mean that humans are puppets. The Quran repeatedly addresses people as responsible: they can choose, and they are only held to account for what was within their power. Allah's knowledge forces no one — it simply encompasses what will happen.",
            tr: "Kader, insanın bir kukla olduğu anlamına gelmez. Kur'an insanı sürekli sorumlu bir varlık olarak muhatap alır: İnsan seçebilir ve yalnızca gücü dahilindekilerden sorumludur. Allah'ın ilmi kimseyi zorlamaz — yalnızca olacak olanı kuşatır.",
          },
        },
        {
          type: 'quran',
          ref: '2:286',
          arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
          translation: {
            de: "Allah erlegt keiner Seele mehr auf, als sie zu leisten vermag …",
            en: "Allah does not burden a soul beyond what it can bear …",
            tr: "Allah hiç kimseye gücünün yeteceğinden fazlasını yüklemez …",
          },
        },
        {
          type: 'quran',
          ref: '13:11',
          arabic: 'إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ',
          translation: {
            de: "Gewiss, Allah ändert nicht den Zustand eines Volkes, bis sie das ändern, was in ihnen selbst ist.",
            en: "Indeed, Allah will not change the condition of a people until they change what is within themselves.",
            tr: "Bir toplum kendi durumunu değiştirmedikçe Allah onların durumunu değiştirmez.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 2664',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Strebe nach dem, was dir nützt, suche Hilfe bei Allah und gib nicht auf. Und wenn dich etwas trifft, dann sag nicht: „Hätte ich doch nur dies und jenes getan“, sondern sag: „Allah hat es bestimmt, und was Er will, tut Er.“ (Auszug)",
            en: "Strive for what benefits you, seek help from Allah and do not give up. If something befalls you, do not say, “If only I had done such-and-such,” but say, “Allah has decreed it, and what He wills He does.” (excerpt)",
            tr: "Sana fayda verecek şeye gayret et, Allah'tan yardım iste ve aciz kalma. Başına bir şey gelirse “Keşke şöyle yapsaydım” deme; “Allah takdir etti, O dilediğini yapar” de. (özet)",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Wie Allahs Schöpfung der Taten und die Wahl des Menschen genau zusammenwirken, erklären die sunnitischen Theologieschulen (aschʿaritisch, maturiditisch, atharitisch) mit unterschiedlichen Begriffen. Einig sind sie sich: Allah bestimmt alles, und der Mensch ist dennoch für seine Taten verantwortlich. Gelehrte raten, über das Wie nicht zu grübeln, sondern zu handeln und zu vertrauen.",
            en: "How exactly Allah's creation of acts and human choice interact is explained with different terms by the Sunni theological schools (Ash'ari, Maturidi, Athari). They agree: Allah decrees everything, and humans are nonetheless responsible for their deeds. Scholars advise not to agonise over the “how” but to act and trust.",
            tr: "Allah'ın fiilleri yaratması ile insanın seçiminin tam olarak nasıl bir arada olduğunu Sünni kelam ekolleri (Eş'arî, Mâtürîdî, Eserî) farklı kavramlarla açıklar. Hepsi şunda birleşir: Allah her şeyi takdir eder ve insan yine de amellerinden sorumludur. Âlimler “nasıl”ı derinlemesine kurcalamak yerine gayret edip tevekkül etmeyi tavsiye eder.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 2999',
          narrator: 'Suhaib',
          grade: 'sahih',
          text: {
            de: "Wie wunderbar ist die Angelegenheit des Gläubigen! Alles ist für ihn gut … Trifft ihn etwas Erfreuliches, ist er dankbar, und das ist gut für ihn. Trifft ihn ein Unglück, ist er geduldig, und das ist gut für ihn.",
            en: "How wonderful is the affair of the believer! All of it is good for him … If something good happens to him, he is grateful, and that is good for him. If something bad befalls him, he is patient, and that is good for him.",
            tr: "Müminin durumu ne hoştur! Her işi onun için hayırlıdır … Ona sevindirici bir şey olursa şükreder, bu onun için hayır olur. Başına bir sıkıntı gelirse sabreder, bu da onun için hayır olur.",
          },
        },
        { type: 'terms', ids: ['akhirah', 'yawm-al-qiyamah', 'jannah', 'jahannam', 'qadar', 'inshallah'] },
      ],
      quiz: [
        {
          question: {
            de: "Was lehrt Koran 99:7–8?",
            en: "What does Quran 99:7–8 teach?",
            tr: "Zilzâl 99:7–8 ne öğretir?",
          },
          options: [
            { de: "Nur große Taten zählen", en: "Only big deeds count", tr: "Yalnızca büyük ameller önemlidir" },
            { de: "Selbst das Gewicht eines Stäubchens an Gutem oder Bösem wird man sehen", en: "Even an atom's weight of good or evil will be seen", tr: "Zerre kadar hayır veya şer bile görülecektir" },
            { de: "Taten spielen keine Rolle", en: "Deeds do not matter", tr: "Amellerin önemi yoktur" },
          ],
          answer: 1,
          explanation: {
            de: "Kein noch so kleines Gutes geht verloren, und auch kleines Unrecht wird nicht übersehen.",
            en: "No good, however small, is lost, and even small wrongs are not overlooked.",
            tr: "Ne kadar küçük olursa olsun hiçbir iyilik kaybolmaz; küçük kötülükler de gözden kaçmaz.",
          },
        },
        {
          question: {
            de: "Bedeutet der Glaube an Qadar, dass der Mensch keine Verantwortung trägt?",
            en: "Does belief in qadar mean humans bear no responsibility?",
            tr: "Kadere iman, insanın hiçbir sorumluluğu olmadığı anlamına mı gelir?",
          },
          options: [
            { de: "Ja, alles ist ohnehin festgelegt", en: "Yes, everything is fixed anyway", tr: "Evet, her şey zaten belirlenmiştir" },
            { de: "Nein, der Mensch wählt und ist für seine Taten verantwortlich", en: "No, people choose and are responsible for their deeds", tr: "Hayır, insan seçer ve amellerinden sorumludur" },
          ],
          answer: 1,
          explanation: {
            de: "Allahs Wissen und Bestimmung heben die Verantwortung nicht auf. Allah verlangt nichts über die Kraft eines Menschen hinaus (2:286).",
            en: "Allah's knowledge and decree do not remove responsibility. Allah asks nothing beyond a person's capacity (2:286).",
            tr: "Allah'ın ilmi ve takdiri sorumluluğu ortadan kaldırmaz. Allah kimseye gücünün üstünde bir şey yüklemez (2:286).",
          },
        },
        {
          question: {
            de: "Was empfiehlt der Prophet ﷺ, wenn einen ein Unglück trifft (Sahih Muslim 2664)?",
            en: "What does the Prophet ﷺ recommend when misfortune strikes (Sahih Muslim 2664)?",
            tr: "Peygamber ﷺ başa bir musibet geldiğinde ne söylemeyi tavsiye eder (Müslim 2664)?",
          },
          options: [
            { de: "„Hätte ich doch nur …“ sagen", en: "Say “If only I had …”", tr: "“Keşke …” demek" },
            { de: "„Allah hat es bestimmt, und was Er will, tut Er“", en: "“Allah has decreed it, and what He wills He does”", tr: "“Allah takdir etti, O dilediğini yapar”" },
            { de: "Aufgeben", en: "Give up", tr: "Pes etmek" },
          ],
          answer: 1,
          explanation: {
            de: "Erst sich anstrengen und Allah um Hilfe bitten — und wenn es anders kommt, das Ergebnis vertrauensvoll annehmen.",
            en: "First strive and ask Allah for help — and if things turn out otherwise, accept the outcome with trust.",
            tr: "Önce gayret edip Allah'tan yardım istemek — sonuç farklı olursa da onu tevekkülle kabul etmek.",
          },
        },
      ],
      sources: [
        'Quran 3:185, 99:7-8, 54:49, 2:286, 13:11',
        'Sahih Muslim 2664, Sahih Muslim 2999',
        'Sahih Muslim 8 (Hadith Jibril: Glaube an die Bestimmung)',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 7 ───────────────────────────────────────────────────────────
    {
      id: 'five-pillars',
      title: {
        de: 'Die fünf Säulen im Überblick',
        en: 'The five pillars at a glance',
        tr: "İslam'ın beş şartı",
      },
      summary: {
        de: "Bekenntnis, Gebet, Zakat, Fasten und Pilgerfahrt — die fünf Säulen, auf denen die gelebte Praxis des Islam ruht.",
        en: "Declaration, prayer, zakat, fasting and pilgrimage — the five pillars on which Islamic practice rests.",
        tr: "Şehadet, namaz, zekât, oruç ve hac — İslam'ın üzerine kurulu olduğu beş temel.",
      },
      minutes: 4,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Wenn der Glaube (Iman) das Fundament ist, dann sind die fünf Säulen das tragende Gerüst des Hauses. Sie sind die grundlegenden Gottesdienste, die jeder erwachsene, gesunde Muslim kennt — mit Erleichterungen für alle, die sie nicht leisten können.",
            en: "If faith (iman) is the foundation, the five pillars are the supporting frame of the house. They are the basic acts of worship that every adult, healthy Muslim knows — with concessions for those who cannot perform them.",
            tr: "İman temel ise, beş şart evin taşıyıcı direkleridir. Her ergen ve sağlıklı Müslüman'ın bildiği temel ibadetlerdir — bunları yerine getiremeyenler için kolaylıklar da vardır.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 8, Sahih Muslim 16',
          narrator: "'Abdullah ibn 'Umar",
          arabic: 'بُنِيَ الإِسْلَامُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلَاةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ',
          grade: 'sahih',
          text: {
            de: "Der Islam ist auf fünf (Säulen) gebaut: dem Bezeugen, dass es keinen Gott gibt außer Allah und dass Muhammad der Gesandte Allahs ist, dem Verrichten des Gebets, dem Entrichten der Zakat, der Pilgerfahrt und dem Fasten im Ramadan.",
            en: "Islam is built upon five: testifying that there is no deity but Allah and that Muhammad is the Messenger of Allah, establishing the prayer, giving zakat, the pilgrimage, and fasting in Ramadan.",
            tr: "İslam beş temel üzerine kurulmuştur: Allah'tan başka ilah olmadığına ve Muhammed'in Allah'ın Resulü olduğuna şahitlik etmek, namazı kılmak, zekâtı vermek, haccetmek ve Ramazan orucunu tutmak.",
          },
        },
        {
          type: 'list',
          items: [
            { de: "**1. Schahada** — das Glaubensbekenntnis (Lektion 3)", en: "**1. Shahada** — the declaration of faith (lesson 3)", tr: "**1. Kelime-i şehadet** — inanç beyanı (3. ders)" },
            { de: "**2. Salah** — fünf tägliche Gebete (Lektion 8)", en: "**2. Salah** — five daily prayers (lesson 8)", tr: "**2. Namaz** — günde beş vakit (8. ders)" },
            { de: "**3. Zakat** — die jährliche Pflichtabgabe an Bedürftige (Lektion 9)", en: "**3. Zakat** — the annual obligatory alms for those in need (lesson 9)", tr: "**3. Zekât** — ihtiyaç sahiplerine yıllık farz mali ibadet (9. ders)" },
            { de: "**4. Saum** — Fasten im Monat Ramadan (Lektion 9)", en: "**4. Sawm** — fasting in the month of Ramadan (lesson 9)", tr: "**4. Oruç** — Ramazan ayında oruç (9. ders)" },
            { de: "**5. Hadsch** — die Pilgerfahrt nach Mekka, einmal im Leben für alle, die es können (Lektion 9)", en: "**5. Hajj** — the pilgrimage to Mecca, once in a lifetime for those who are able (lesson 9)", tr: "**5. Hac** — gücü yetenlere ömürde bir kez Mekke'ye hac (9. ders)" },
          ],
        },
        {
          type: 'quran',
          ref: '98:5',
          translation: {
            de: "Und doch wurde ihnen nur befohlen, Allah zu dienen und dabei Ihm gegenüber aufrichtig in der Religion zu sein, als Anhänger des rechten Glaubens, das Gebet zu verrichten und die Zakat zu entrichten; das ist die Religion der Geradlinigkeit.",
            en: "And they were not commanded except to worship Allah, sincere to Him in religion, inclining to truth, and to establish prayer and give zakat. And that is the upright religion.",
            tr: "Hâlbuki onlara ancak dini Allah'a has kılarak, hakka yönelerek O'na kulluk etmeleri, namazı kılmaları ve zekâtı vermeleri emredilmişti. İşte doğru din budur.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Mehr als Rituale', en: 'More than rituals', tr: 'Ritüellerden fazlası' },
        },
        {
          type: 'text',
          text: {
            de: "Jede Säule hat eine innere Seite: Das Gebet hält das Herz mit Allah verbunden, die Zakat befreit von Geiz und hilft der Gesellschaft, das Fasten lehrt Selbstbeherrschung und Mitgefühl, die Pilgerfahrt erinnert daran, dass alle Menschen vor Allah gleich sind. Und alles beginnt mit der **Absicht (Niyya)**: Gottesdienst geschieht für Allah, nicht für die Augen der Menschen.",
            en: "Each pillar has an inner dimension: prayer keeps the heart connected to Allah, zakat frees from greed and helps society, fasting teaches self-control and compassion, and the pilgrimage reminds that all people are equal before Allah. And everything begins with the **intention (niyyah)**: worship is for Allah, not to be seen by people.",
            tr: "Her şartın bir iç boyutu vardır: Namaz kalbi Allah'a bağlı tutar, zekât cimrilikten arındırır ve topluma yardım eder, oruç nefse hâkimiyeti ve merhameti öğretir, hac bütün insanların Allah katında eşit olduğunu hatırlatır. Ve her şey **niyetle** başlar: İbadet Allah için yapılır, insanlara gösteriş için değil.",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Für Neue gilt: Schritt für Schritt. Viele beginnen mit dem Gebet und lernen die übrigen Säulen nach und nach kennen. Wer krank ist, reist oder nicht genug Vermögen hat, für den gibt es Erleichterungen oder Befreiungen.",
            en: "For newcomers: step by step. Many begin with prayer and get to know the other pillars gradually. Those who are ill, travelling or without sufficient wealth have concessions or exemptions.",
            tr: "Yeni başlayanlar için: adım adım. Birçok kişi namazla başlar, diğer şartları zamanla öğrenir. Hasta, yolcu veya yeterli malı olmayanlar için kolaylıklar ya da muafiyetler vardır.",
          },
        },
        { type: 'terms', ids: ['shahada', 'salah', 'zakat', 'sawm', 'hajj', 'niyyah'] },
      ],
      quiz: [
        {
          question: {
            de: "Welche Überlieferung nennt die fünf Säulen des Islam?",
            en: "Which narration lists the five pillars of Islam?",
            tr: "İslam'ın beş şartını hangi hadis sayar?",
          },
          options: [
            { de: "Sahih al-Bukhari 8, Sahih Muslim 16", en: "Sahih al-Bukhari 8, Sahih Muslim 16", tr: "Buhârî 8, Müslim 16" },
            { de: "Sure al-Fatiha", en: "Surah al-Fatiha", tr: "Fâtiha Suresi" },
            { de: "Sahih Muslim 2999", en: "Sahih Muslim 2999", tr: "Müslim 2999" },
          ],
          answer: 0,
          explanation: {
            de: "Ibn 'Umar überliefert: „Der Islam ist auf fünf gebaut …“ (Bukhari 8, Muslim 16).",
            en: "Ibn 'Umar narrates: “Islam is built upon five …” (Bukhari 8, Muslim 16).",
            tr: "İbn Ömer rivayet eder: “İslam beş temel üzerine kurulmuştur …” (Buhârî 8, Müslim 16).",
          },
        },
        {
          question: {
            de: "Welche der folgenden ist KEINE der fünf Säulen?",
            en: "Which of the following is NOT one of the five pillars?",
            tr: "Aşağıdakilerden hangisi beş şarttan biri DEĞİLDİR?",
          },
          options: [
            { de: "Das Fasten im Ramadan", en: "Fasting in Ramadan", tr: "Ramazan orucu" },
            { de: "Die Zakat", en: "Zakat", tr: "Zekât" },
            { de: "Der Glaube an die Engel", en: "Belief in the angels", tr: "Meleklere iman" },
            { de: "Das Gebet", en: "Prayer", tr: "Namaz" },
          ],
          answer: 2,
          explanation: {
            de: "Der Glaube an die Engel ist ein Glaubensartikel (Iman), keine Säule der Praxis.",
            en: "Belief in the angels is an article of faith (iman), not a pillar of practice.",
            tr: "Meleklere iman bir iman esasıdır, İslam'ın şartlarından değildir.",
          },
        },
      ],
      sources: [
        'Sahih al-Bukhari 8, Sahih Muslim 16',
        'Quran 98:5',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 8 ───────────────────────────────────────────────────────────
    {
      id: 'salah-overview',
      title: {
        de: 'Das Gebet (Salah) — Sinn und Ablauf im Überblick',
        en: 'Prayer (Salah) — meaning and structure at a glance',
        tr: 'Namaz — anlamı ve kılınışına genel bakış',
      },
      summary: {
        de: "Warum Muslime fünfmal am Tag beten, was man dafür braucht und wie ein Gebet grob abläuft.",
        en: "Why Muslims pray five times a day, what is needed for it and how a prayer roughly unfolds.",
        tr: "Müslümanların neden günde beş vakit namaz kıldığı, bunun için neler gerektiği ve bir namazın genel olarak nasıl kılındığı.",
      },
      minutes: 7,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Das **Gebet (Salah)** ist die zweite Säule des Islam und die wichtigste tägliche Handlung eines Muslims. Es ist ein Gespräch mit Allah: Fünfmal am Tag unterbricht man den Alltag, wendet sich nach Mekka und stellt sich vor seinen Schöpfer.",
            en: "**Prayer (salah)** is the second pillar of Islam and a Muslim's most important daily act. It is a conversation with Allah (God): five times a day one pauses daily life, turns towards Mecca and stands before one's Creator.",
            tr: "**Namaz**, İslam'ın ikinci şartı ve bir Müslüman'ın en önemli günlük ibadetidir. Allah ile bir buluşmadır: Günde beş kez gündelik işlere ara verilir, Kâbe'ye yönelinir ve Yaratıcı'nın huzuruna durulur.",
          },
        },
        {
          type: 'quran',
          ref: '20:14',
          arabic: 'إِنَّنِي أَنَا اللَّهُ لَا إِلَٰهَ إِلَّا أَنَا فَاعْبُدْنِي وَأَقِمِ الصَّلَاةَ لِذِكْرِي',
          translation: {
            de: "Gewiss, Ich bin Allah. Es gibt keinen Gott außer Mir. So diene Mir und verrichte das Gebet zu Meinem Gedenken.",
            en: "Indeed, I am Allah. There is no deity except Me, so worship Me and establish prayer for My remembrance.",
            tr: "Şüphesiz ben Allah'ım. Benden başka ilah yoktur. Öyleyse bana kulluk et ve beni anmak için namaz kıl.",
          },
        },
        {
          type: 'quran',
          ref: '29:45',
          arabic: 'إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ',
          translation: {
            de: "Gewiss, das Gebet hält ab von Schändlichem und Verwerflichem …",
            en: "Indeed, prayer restrains from immorality and wrongdoing …",
            tr: "Şüphesiz namaz hayasızlıktan ve kötülükten alıkoyar …",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 528, Sahih Muslim 667',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Was meint ihr: Wenn vor der Tür eines von euch ein Fluss wäre, in dem er sich jeden Tag fünfmal wäscht — bliebe dann noch etwas von seinem Schmutz? … So ist es mit den fünf Gebeten: Durch sie tilgt Allah die Verfehlungen.",
            en: "What do you think: if there were a river at the door of one of you in which he bathed five times every day, would any dirt remain on him? … That is how the five prayers are: through them Allah wipes away sins.",
            tr: "Ne dersiniz, birinizin kapısının önünde bir nehir olsa ve her gün beş kez onda yıkansa, üzerinde kirden bir şey kalır mı? … İşte beş vakit namaz da böyledir; Allah onlarla günahları siler.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die fünf täglichen Gebete', en: 'The five daily prayers', tr: 'Beş vakit namaz' },
        },
        {
          type: 'quran',
          ref: '4:103',
          arabic: 'إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا',
          translation: {
            de: "Gewiss, das Gebet ist für die Gläubigen eine zu bestimmten Zeiten festgesetzte Vorschrift.",
            en: "Indeed, prayer has been decreed upon the believers at specified times.",
            tr: "Şüphesiz namaz, müminlere belirli vakitlerde farz kılınmıştır.",
          },
        },
        {
          type: 'list',
          items: [
            { de: "**Fadschr** — Morgendämmerung bis Sonnenaufgang: 2 Pflicht-Rak'as", en: "**Fajr** — dawn until sunrise: 2 obligatory rak'ahs", tr: "**Sabah** — tan yerinin ağarmasından güneşin doğuşuna: 2 rekât farz" },
            { de: "**Dhuhr** — nach dem Zenit der Sonne (mittags): 4 Rak'as", en: "**Dhuhr** — after the sun passes its zenith (midday): 4 rak'ahs", tr: "**Öğle** — güneş tepe noktasını geçince: 4 rekât farz" },
            { de: "**Asr** — Nachmittag: 4 Rak'as", en: "**Asr** — afternoon: 4 rak'ahs", tr: "**İkindi** — öğleden sonra: 4 rekât farz" },
            { de: "**Maghrib** — direkt nach Sonnenuntergang: 3 Rak'as", en: "**Maghrib** — just after sunset: 3 rak'ahs", tr: "**Akşam** — güneş batınca: 3 rekât farz" },
            { de: "**Ischa** — nach Einbruch der Nacht: 4 Rak'as", en: "**Isha** — after nightfall: 4 rak'ahs", tr: "**Yatsı** — gece karanlığı çökünce: 4 rekât farz" },
          ],
        },
        { type: 'link', to: '/prayer', label: { de: 'Gebetszeiten für deinen Ort', en: 'Prayer times for your location', tr: 'Bulunduğun yer için namaz vakitleri' } },
        {
          type: 'heading',
          text: { de: 'Vor dem Gebet', en: 'Before the prayer', tr: 'Namazdan önce' },
        },
        {
          type: 'list',
          items: [
            { de: "**Reinheit:** die Gebetswaschung (Wudu), ein sauberer Körper, saubere Kleidung und ein sauberer Platz (5:6)", en: "**Purity:** the ablution (wudu), a clean body, clean clothes and a clean place (5:6)", tr: "**Temizlik:** abdest; beden, elbise ve namaz yerinin temiz olması (5:6)" },
            { de: "**Bedeckung:** angemessene, die 'Awra bedeckende Kleidung", en: "**Covering:** appropriate clothing that covers the 'awrah", tr: "**Örtünme:** avret yerlerini örten uygun kıyafet" },
            { de: "**Zeit:** die Gebetszeit muss eingetreten sein", en: "**Time:** the prayer time must have begun", tr: "**Vakit:** namaz vaktinin girmiş olması" },
            { de: "**Richtung:** zur Kaaba in Mekka (Qibla)", en: "**Direction:** towards the Kaaba in Mecca (qibla)", tr: "**Yön:** Mekke'deki Kâbe'ye (kıble) yönelmek" },
            { de: "**Absicht (Niyya):** im Herzen wissen, welches Gebet man verrichtet", en: "**Intention (niyyah):** knowing in one's heart which prayer one is performing", tr: "**Niyet:** hangi namazı kıldığını kalben bilmek" },
          ],
        },
        { type: 'link', to: '/qibla', label: { de: 'Gebetsrichtung finden', en: 'Find the qibla', tr: 'Kıbleyi bul' } },
        {
          type: 'heading',
          text: { de: 'Der Ablauf einer Gebetseinheit (Rak\'a)', en: "The structure of a prayer unit (rak'ah)", tr: 'Bir rekâtın kılınışı' },
        },
        {
          type: 'list',
          items: [
            { de: "**Eröffnung:** Hände heben und „Allahu akbar“ sagen (Takbir)", en: "**Opening:** raise the hands and say “Allahu akbar” (takbir)", tr: "**Başlangıç:** elleri kaldırıp “Allahu ekber” demek (iftitah tekbiri)" },
            { de: "**Stehen:** die Fatiha (Sure 1) rezitieren, in den ersten beiden Rak'as gefolgt von einem weiteren Koranabschnitt", en: "**Standing:** recite al-Fatiha (surah 1), followed in the first two rak'ahs by another passage of the Quran", tr: "**Kıyam:** Fâtiha'yı okumak; ilk iki rekâtta ardından bir sure veya ayetler okumak" },
            { de: "**Verbeugung (Ruku'):** Allah preisen", en: "**Bowing (ruku'):** glorify Allah", tr: "**Rükû:** eğilip Allah'ı tesbih etmek" },
            { de: "**Aufrichten**, dann **zwei Niederwerfungen (Sudschud)** mit kurzem Sitzen dazwischen", en: "**Rise**, then **two prostrations (sujud)** with a short sitting in between", tr: "**Doğrulmak**, ardından aralarında kısa oturuşla **iki secde**" },
            { de: "**Sitzen (Taschahhud)** nach jeder zweiten Rak'a und am Ende", en: "**Sitting (tashahhud)** after every second rak'ah and at the end", tr: "Her iki rekâtta bir ve sonda **oturuş (teşehhüd)**" },
            { de: "**Abschluss:** „As-salamu 'alaikum wa rahmatullah“ nach rechts und links", en: "**Closing:** “As-salamu 'alaykum wa rahmatullah” to the right and left", tr: "**Bitiriş:** sağa ve sola “Esselâmü aleyküm ve rahmetullah” diyerek selam vermek" },
          ],
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 631',
          narrator: 'Malik ibn al-Huwairith',
          grade: 'sahih',
          text: {
            de: "Betet so, wie ihr mich beten gesehen habt.",
            en: "Pray as you have seen me praying.",
            tr: "Beni nasıl namaz kılarken gördüyseniz öyle kılın.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Die vier Rechtsschulen stimmen im Grundablauf überein, unterscheiden sich aber in Details — etwa wo die Hände beim Stehen liegen, ob man hinter dem Imam die Fatiha rezitiert, oder ob das Witr-Gebet verpflichtend (hanafitisch: wajib) oder stark empfohlen ist. Alle diese Formen gelten als gültig. Folge am besten der Schule bzw. Moschee, bei der du lernst.",
            en: "The four schools of law agree on the basic structure but differ in details — for example where the hands are placed while standing, whether one recites al-Fatiha behind the imam, or whether the witr prayer is obligatory (Hanafi: wajib) or strongly recommended. All these forms are considered valid. It is best to follow the school or mosque where you are learning.",
            tr: "Dört mezhep namazın temel kılınışında birleşir ama ayrıntılarda ayrılır — örneğin kıyamda ellerin nerede bağlanacağı, imamın arkasında Fâtiha okunup okunmayacağı veya vitir namazının vâcib (Hanefî) mi yoksa müekked sünnet mi olduğu gibi. Bu şekillerin hepsi geçerlidir. En iyisi, öğrendiğin mezhebe veya camiye uymaktır.",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Eine Schritt-für-Schritt-Anleitung mit allen Rezitationen findest du im Gebets-Guide der App.",
            en: "You can find a step-by-step guide with all recitations in the app's prayer guide.",
            tr: "Tüm okunuşlarıyla adım adım anlatımı uygulamanın namaz rehberinde bulabilirsin.",
          },
        },
        { type: 'link', to: '/guide', label: { de: 'Zum Gebets-Guide', en: 'Open the prayer guide', tr: 'Namaz rehberine git' } },
        { type: 'terms', ids: ['salah', 'wudu', 'qibla', 'rakah', 'takbir', 'ruku', 'sujud', 'tashahhud', 'adhan'] },
      ],
      quiz: [
        {
          question: {
            de: "Wie viele Pflicht-Rak'as hat das Maghrib-Gebet?",
            en: "How many obligatory rak'ahs does the Maghrib prayer have?",
            tr: "Akşam namazının farzı kaç rekâttır?",
          },
          options: [
            { de: "2", en: "2", tr: "2" },
            { de: "3", en: "3", tr: "3" },
            { de: "4", en: "4", tr: "4" },
          ],
          answer: 1,
          explanation: {
            de: "Maghrib hat 3 Pflicht-Rak'as; Fadschr 2; Dhuhr, Asr und Ischa je 4.",
            en: "Maghrib has 3 obligatory rak'ahs; Fajr 2; Dhuhr, Asr and Isha 4 each.",
            tr: "Akşam namazının farzı 3 rekâttır; sabahın 2; öğle, ikindi ve yatsının 4'er rekât.",
          },
        },
        {
          question: {
            de: "In welche Richtung beten Muslime?",
            en: "In which direction do Muslims pray?",
            tr: "Müslümanlar namazda hangi yöne yönelir?",
          },
          options: [
            { de: "Nach Osten", en: "East", tr: "Doğuya" },
            { de: "Nach Jerusalem", en: "Towards Jerusalem", tr: "Kudüs'e" },
            { de: "Zur Kaaba in Mekka", en: "Towards the Kaaba in Mecca", tr: "Mekke'deki Kâbe'ye" },
          ],
          answer: 2,
          explanation: {
            de: "Die Gebetsrichtung (Qibla) ist die Kaaba in Mekka — von Deutschland aus etwa südöstlich.",
            en: "The direction of prayer (qibla) is the Kaaba in Mecca.",
            tr: "Kıble, Mekke'deki Kâbe'dir — Türkiye'den bakıldığında yaklaşık güneydoğu yönüdür.",
          },
        },
        {
          question: {
            de: "Was gehört zu den Voraussetzungen des Gebets?",
            en: "Which of these is a precondition of prayer?",
            tr: "Aşağıdakilerden hangisi namazın şartlarındandır?",
          },
          options: [
            { de: "Rituelle Reinheit (z. B. Wudu)", en: "Ritual purity (e.g. wudu)", tr: "Abdest gibi taharet" },
            { de: "Arabisch fließend sprechen", en: "Speaking Arabic fluently", tr: "Akıcı Arapça konuşmak" },
            { de: "In einer Moschee sein", en: "Being in a mosque", tr: "Camide bulunmak" },
          ],
          answer: 0,
          explanation: {
            de: "Reinheit, Bedeckung, Gebetszeit, Qibla und Absicht gehören zu den Voraussetzungen. Beten kann man an jedem sauberen Ort.",
            en: "Purity, covering, the prayer time, the qibla and intention are among the preconditions. One can pray in any clean place.",
            tr: "Taharet, örtünme, vakit, kıble ve niyet namazın şartlarındandır. Temiz olan her yerde namaz kılınabilir.",
          },
        },
      ],
      sources: [
        'Quran 20:14, 29:45, 4:103, 5:6',
        'Sahih al-Bukhari 528, Sahih Muslim 667',
        'Sahih al-Bukhari 631',
        QURAN_REF,
      ],
      review: 'draft',
    },
    // ─── 9 ───────────────────────────────────────────────────────────
    {
      id: 'fasting-zakat-hajj',
      title: {
        de: 'Fasten, Zakat und Hadsch',
        en: 'Fasting, zakat and Hajj',
        tr: 'Oruç, zekât ve hac',
      },
      summary: {
        de: "Die Säulen drei bis fünf: worum es beim Fasten im Ramadan, bei der Pflichtabgabe und bei der Pilgerfahrt eigentlich geht.",
        en: "Pillars three to five: what fasting in Ramadan, the obligatory alms and the pilgrimage are really about.",
        tr: "Üçüncü, dördüncü ve beşinci şartlar: Ramazan orucunun, zekâtın ve haccın asıl amacı.",
      },
      minutes: 7,
      blocks: [
        {
          type: 'heading',
          text: { de: 'Das Fasten im Ramadan (Saum)', en: 'Fasting in Ramadan (sawm)', tr: 'Ramazan orucu' },
        },
        {
          type: 'text',
          text: {
            de: "Im **Ramadan**, dem neunten Monat des islamischen Mondkalenders, fasten Muslime von der Morgendämmerung bis zum Sonnenuntergang: kein Essen, kein Trinken, kein Geschlechtsverkehr. Vor der Dämmerung isst man das **Suhur**, bei Sonnenuntergang bricht man das Fasten mit dem **Iftar** — oft gemeinsam mit Familie, Freunden und Nachbarn.",
            en: "In **Ramadan**, the ninth month of the Islamic lunar calendar, Muslims fast from dawn until sunset: no food, no drink, no sexual relations. Before dawn they eat **suhoor**, and at sunset they break the fast with **iftar** — often together with family, friends and neighbours.",
            tr: "Hicri takvimin dokuzuncu ayı olan **Ramazan**'da Müslümanlar tan yerinin ağarmasından güneşin batışına kadar oruç tutar: yemek, içmek ve cinsel ilişki yoktur. Şafaktan önce **sahur** yapılır, güneş batınca **iftar** ile oruç açılır — çoğu zaman aile, dostlar ve komşularla birlikte.",
          },
        },
        {
          type: 'quran',
          ref: '2:183',
          arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
          translation: {
            de: "O die ihr glaubt, vorgeschrieben ist euch das Fasten, so wie es denjenigen vor euch vorgeschrieben war, auf dass ihr gottesfürchtig werden möget.",
            en: "O you who believe, fasting has been prescribed for you as it was prescribed for those before you, so that you may become God-conscious.",
            tr: "Ey iman edenler! Oruç sizden öncekilere farz kılındığı gibi size de farz kılındı. Umulur ki takvaya erersiniz.",
          },
        },
        {
          type: 'text',
          text: {
            de: "Ziel des Fastens ist **Taqwa** — ein waches Bewusstsein für Allah. Wer hungert, spürt, wie es Bedürftigen geht; wer auf Erlaubtes verzichtet, lernt, auch Unerlaubtes zu lassen. Im Ramadan begann die Offenbarung des Korans, und in seinen letzten zehn Nächten liegt die **Nacht der Bestimmung (Laylat al-Qadr)**.",
            en: "The aim of fasting is **taqwa** — a wakeful awareness of Allah (God). Those who go hungry feel what the needy go through; those who give up what is permitted learn to leave what is forbidden. The revelation of the Quran began in Ramadan, and the **Night of Decree (Laylat al-Qadr)** lies in its last ten nights.",
            tr: "Orucun amacı **takvadır** — Allah'ı sürekli hatırda tutan uyanık bir bilinç. Aç kalan, ihtiyaç sahiplerinin hâlini hisseder; helal olandan uzak durabilen, haramı bırakmayı da öğrenir. Kur'an'ın inişi Ramazan'da başlamıştır ve son on gecesinde **Kadir Gecesi** vardır.",
          },
        },
        {
          type: 'quran',
          ref: '2:185',
          arabic: 'يُرِيدُ اللَّهُ بِكُمُ الْيُسْرَ وَلَا يُرِيدُ بِكُمُ الْعُسْرَ',
          translation: {
            de: "… Allah will für euch Erleichterung; Er will für euch nicht Erschwernis …",
            en: "… Allah intends ease for you and does not intend hardship for you …",
            tr: "… Allah sizin için kolaylık ister, zorluk istemez …",
          },
        },
        {
          type: 'note',
          variant: 'important',
          text: {
            de: "Nicht fasten müssen u. a. Kinder, Kranke, Reisende, Schwangere und Stillende, wenn sie um ihre oder des Kindes Gesundheit fürchten, sowie Frauen während der Menstruation. Je nach Fall werden Tage später nachgeholt oder es wird eine Ersatzleistung (Fidya) gegeben. Bei gesundheitlichen Fragen: ärztlichen Rat einholen.",
            en: "Among those not required to fast are children, the ill, travellers, pregnant and breastfeeding women who fear for their own or the child's health, and women during menstruation. Depending on the case, days are made up later or a compensation (fidya) is given. For health questions: seek medical advice.",
            tr: "Çocuklar, hastalar, yolcular, kendi veya çocuğunun sağlığından endişe eden hamile ve emziren kadınlar ile hayız dönemindeki kadınlar oruç tutmakla yükümlü değildir. Duruma göre günler sonra kaza edilir veya fidye verilir. Sağlıkla ilgili sorularda doktora danışılmalıdır.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 38, Sahih Muslim 760',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Wer im Ramadan aus Glauben und in Hoffnung auf (Allahs) Lohn fastet, dem werden seine vergangenen Sünden vergeben.",
            en: "Whoever fasts Ramadan out of faith and seeking (Allah's) reward will have his past sins forgiven.",
            tr: "Kim inanarak ve sevabını Allah'tan umarak Ramazan orucunu tutarsa geçmiş günahları bağışlanır.",
          },
        },
        { type: 'link', to: '/ramadan', label: { de: 'Ramadan-Begleiter öffnen', en: 'Open the Ramadan companion', tr: 'Ramazan rehberini aç' } },
        {
          type: 'heading',
          text: { de: 'Die Zakat', en: 'Zakat', tr: 'Zekât' },
        },
        {
          type: 'text',
          text: {
            de: "**Zakat** heißt „Reinigung“ und „Wachstum“. Wer über ein Mondjahr hinweg Vermögen oberhalb eines Mindestbetrags (**Nisab**) besitzt, gibt davon in der Regel **2,5 %** an Bedürftige. Die Zakat ist kein Almosen aus Gnade, sondern ein Recht der Armen am Vermögen der Wohlhabenden. Der Koran nennt acht Empfängergruppen, darunter Arme, Bedürftige, Verschuldete und Reisende in Not (9:60).",
            en: "**Zakat** means “purification” and “growth”. Whoever holds wealth above a minimum threshold (**nisab**) for a lunar year usually gives **2.5%** of it to those in need. Zakat is not charity out of kindness but a right of the poor in the wealth of the rich. The Quran names eight groups of recipients, including the poor, the needy, those in debt and stranded travellers (9:60).",
            tr: "**Zekât** “arınma” ve “artma” demektir. Bir kamerî yıl boyunca asgari miktarın (**nisap**) üzerinde mala sahip olan kişi genellikle bunun **%2,5**'ini ihtiyaç sahiplerine verir. Zekât lütuf olarak verilen bir sadaka değil, yoksulların zenginlerin malındaki hakkıdır. Kur'an, aralarında fakirler, yoksullar, borçlular ve yolda kalmışların bulunduğu sekiz grup sayar (9:60).",
          },
        },
        {
          type: 'quran',
          ref: '9:103',
          translation: {
            de: "Nimm von ihrem Besitz ein Almosen, mit dem du sie reinigst und läuterst …",
            en: "Take from their wealth a charity by which you purify them and cause them to grow …",
            tr: "Onların mallarından, kendilerini temizleyeceğin ve arındıracağın bir sadaka al …",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "In Einzelheiten unterscheiden sich die Rechtsschulen, z. B. ob der Nisab heute nach Gold oder Silber bemessen wird und ob getragener Schmuck zakatpflichtig ist (hanafitisch: ja; Mehrheit der anderen Schulen: Schmuck für den persönlichen Gebrauch nein). Für die eigene Berechnung lohnt sich Rat bei einer kundigen Person.",
            en: "The schools of law differ in details, e.g. whether the nisab today is measured by gold or silver, and whether jewellery that is worn is subject to zakat (Hanafi: yes; most other schools: not for personal-use jewellery). For your own calculation it is worth asking a knowledgeable person.",
            tr: "Mezhepler ayrıntılarda farklıdır; örneğin nisabın bugün altına mı gümüşe mi göre hesaplanacağı ve kullanılan ziynet eşyasının zekâta tabi olup olmadığı (Hanefî: evet; diğer mezheplerin çoğu: kişisel kullanım için olan ziynette hayır). Kendi hesabın için bilgili birine danışmak faydalıdır.",
          },
        },
        { type: 'link', to: '/zakat', label: { de: 'Zakat-Rechner', en: 'Zakat calculator', tr: 'Zekât hesaplayıcı' } },
        {
          type: 'heading',
          text: { de: 'Die Pilgerfahrt (Hadsch)', en: 'The pilgrimage (Hajj)', tr: 'Hac' },
        },
        {
          type: 'text',
          text: {
            de: "Einmal im Leben soll jeder Muslim, der körperlich und finanziell dazu in der Lage ist, die Pilgerfahrt nach **Mekka** unternehmen. Sie findet jedes Jahr in den Tagen um den 8. bis 13. Dhu l-Hiddscha statt. Millionen Menschen aus aller Welt tragen dabei schlichte, gleiche Kleidung — reich und arm, schwarz und weiß stehen nebeneinander vor Allah. Die Riten erinnern an Ibrahim, Hadschar (Hagar) und Isma'il.",
            en: "Once in a lifetime, every Muslim who is physically and financially able should make the pilgrimage to **Mecca**. It takes place every year around the 8th to 13th of Dhul-Hijjah. Millions of people from all over the world wear simple, identical garments — rich and poor, black and white stand side by side before Allah. The rites recall Ibrahim, Hajar (Hagar) and Isma'il.",
            tr: "Bedenen ve maddeten gücü yeten her Müslüman ömründe bir kez **Mekke**'ye hacca gitmelidir. Hac her yıl Zilhicce ayının 8–13. günleri civarında yapılır. Dünyanın her yerinden milyonlarca insan sade ve aynı kıyafetler giyer — zengin ve fakir, siyah ve beyaz Allah'ın huzurunda yan yana durur. Hac menasiki Hz. İbrahim'i, Hz. Hâcer'i ve Hz. İsmail'i hatırlatır.",
          },
        },
        {
          type: 'quran',
          ref: '3:97',
          arabic: 'وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا',
          translation: {
            de: "… Und Allah gegenüber ist es für die Menschen eine Pflicht, die Pilgerfahrt zum Hause zu unternehmen — für den, der dazu einen Weg zu finden vermag …",
            en: "… And pilgrimage to the House is a duty owed to Allah by people — for whoever is able to find a way there …",
            tr: "… Yoluna gücü yetenlerin o evi (Kâbe'yi) haccetmesi, Allah'ın insanlar üzerindeki bir hakkıdır …",
          },
        },
        {
          type: 'text',
          text: {
            de: "Neben dem Hadsch gibt es die **'Umra**, die „kleine Pilgerfahrt“, die das ganze Jahr über möglich ist. Am Ende des Hadsch feiern Muslime weltweit das **Opferfest ('Id al-Adha)**.",
            en: "Besides Hajj there is **'umrah**, the “lesser pilgrimage”, which can be made throughout the year. At the end of Hajj, Muslims worldwide celebrate the **Festival of Sacrifice ('Id al-Adha)**.",
            tr: "Hacdan ayrı olarak yılın her döneminde yapılabilen **umre** (“küçük hac”) vardır. Hac sırasında dünyanın her yerindeki Müslümanlar **Kurban Bayramı**'nı kutlar.",
          },
        },
        { type: 'terms', ids: ['sawm', 'ramadan', 'suhoor', 'iftar', 'taqwa', 'laylat-al-qadr', 'zakat', 'nisab', 'sadaqa', 'hajj', 'umrah', 'kaaba', 'eid-al-adha'] },
      ],
      quiz: [
        {
          question: {
            de: "Was nennt Koran 2:183 als Ziel des Fastens?",
            en: "According to Quran 2:183, what is the purpose of fasting?",
            tr: "Bakara 2:183'e göre orucun amacı nedir?",
          },
          options: [
            { de: "Abnehmen", en: "Losing weight", tr: "Kilo vermek" },
            { de: "Gottesbewusstsein (Taqwa)", en: "God-consciousness (taqwa)", tr: "Takva" },
            { de: "Geld sparen", en: "Saving money", tr: "Para biriktirmek" },
          ],
          answer: 1,
          explanation: {
            de: "„… auf dass ihr gottesfürchtig werden möget“ — das Ziel ist Taqwa.",
            en: "“… so that you may become God-conscious” — the aim is taqwa.",
            tr: "“… Umulur ki takvaya erersiniz” — amaç takvadır.",
          },
        },
        {
          question: {
            de: "Wie hoch ist die Zakat in der Regel auf Ersparnisse oberhalb des Nisab?",
            en: "What is the usual rate of zakat on savings above the nisab?",
            tr: "Nisabı aşan birikimde zekât oranı genellikle ne kadardır?",
          },
          options: [
            { de: "2,5 %", en: "2.5%", tr: "%2,5" },
            { de: "10 %", en: "10%", tr: "%10" },
            { de: "50 %", en: "50%", tr: "%50" },
          ],
          answer: 0,
          explanation: {
            de: "Auf Geld und Handelswaren beträgt die Zakat 2,5 % pro Mondjahr. Für andere Vermögensarten (z. B. Ernte, Vieh) gelten eigene Regeln.",
            en: "On money and trade goods zakat is 2.5% per lunar year. Other kinds of wealth (e.g. crops, livestock) have their own rules.",
            tr: "Para ve ticaret mallarında zekât, kamerî yılda %2,5'tir. Ürün ve hayvan gibi diğer mal türleri için ayrı kurallar vardır.",
          },
        },
        {
          question: {
            de: "Für wen ist der Hadsch Pflicht?",
            en: "For whom is Hajj obligatory?",
            tr: "Hac kimlere farzdır?",
          },
          options: [
            { de: "Jedes Jahr für alle Muslime", en: "Every year for all Muslims", tr: "Her yıl bütün Müslümanlara" },
            { de: "Einmal im Leben für alle, die körperlich und finanziell dazu fähig sind", en: "Once in a lifetime for those who are physically and financially able", tr: "Bedenen ve maddeten gücü yetenlere ömürde bir kez" },
            { de: "Nur für Gelehrte", en: "Only for scholars", tr: "Yalnızca âlimlere" },
          ],
          answer: 1,
          explanation: {
            de: "Koran 3:97: Pflicht für den, „der dazu einen Weg zu finden vermag“ — einmal im Leben.",
            en: "Quran 3:97: a duty for “whoever is able to find a way there” — once in a lifetime.",
            tr: "Âl-i İmrân 3:97: “Yoluna gücü yetenler” için — ömürde bir kez.",
          },
        },
      ],
      sources: [
        'Quran 2:183, 2:185, 9:60, 9:103, 3:97',
        'Sahih al-Bukhari 38, Sahih Muslim 760',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 10 ──────────────────────────────────────────────────────────
    {
      id: 'the-quran',
      title: {
        de: 'Der Koran — Offenbarung, Aufbau, Umgang',
        en: 'The Quran — revelation, structure, etiquette',
        tr: "Kur'an — vahiy, yapı ve adab",
      },
      summary: {
        de: "Wie der Koran offenbart und bewahrt wurde, wie er aufgebaut ist und wie Muslime mit ihm umgehen.",
        en: "How the Quran was revealed and preserved, how it is structured and how Muslims treat it.",
        tr: "Kur'an'ın nasıl indirildiği ve korunduğu, nasıl düzenlendiği ve Müslümanların ona nasıl davrandığı.",
      },
      minutes: 6,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Im Jahr 610 zog sich Muhammad ﷺ, damals etwa 40 Jahre alt, wie so oft zum Nachdenken in die Höhle Hira bei Mekka zurück. Dort erschien ihm der Engel Jibril mit dem ersten Wort der Offenbarung: **„Lies!“**",
            en: "In the year 610, Muhammad ﷺ, then about 40 years old, retreated as he often did to the cave of Hira near Mecca to reflect. There the angel Jibril appeared to him with the first word of revelation: **“Read!”**",
            tr: "610 yılında, o sırada yaklaşık 40 yaşında olan Hz. Muhammed ﷺ, sık sık yaptığı gibi tefekkür için Mekke yakınlarındaki Hira mağarasına çekilmişti. Orada Cebrail ona vahyin ilk kelimesiyle göründü: **“Oku!”**",
          },
        },
        {
          type: 'quran',
          ref: '96:1-5',
          arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ ۝ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۝ الَّذِي عَلَّمَ بِالْقَلَمِ ۝ عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ',
          translation: {
            de: "Lies im Namen deines Herrn, Der erschaffen hat, den Menschen erschaffen hat aus einem Anhängsel. Lies, und dein Herr ist der Edelste, Der (das Schreiben) mit dem Schreibrohr gelehrt hat, den Menschen gelehrt hat, was er nicht wusste.",
            en: "Read in the name of your Lord who created — created man from a clinging substance. Read, and your Lord is the Most Generous, who taught by the pen — taught man what he did not know.",
            tr: "Yaratan Rabbinin adıyla oku! O, insanı bir aleka'dan (embriyodan) yarattı. Oku! Rabbin sonsuz kerem sahibidir. O, kalemle (yazmayı) öğretendir. İnsana bilmediğini öğretendir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Was ist der Koran?', en: 'What is the Quran?', tr: "Kur'an nedir?" },
        },
        {
          type: 'text',
          text: {
            de: "Für Muslime ist der **Koran** das wörtliche Wort Allahs, offenbart in arabischer Sprache über rund 23 Jahre. Er ist kein Buch, das Muhammad ﷺ verfasst hat, sondern Offenbarung, die er empfing und weitergab. Der Name bedeutet „das (viel) Gelesene“ oder „das Vorgetragene“.",
            en: "For Muslims the **Quran** is the literal word of Allah (God), revealed in Arabic over about 23 years. It is not a book Muhammad ﷺ wrote but revelation he received and passed on. The name means “that which is (often) read” or “recited”.",
            tr: "Müslümanlara göre **Kur'an**, yaklaşık 23 yıl boyunca Arapça olarak indirilen, Allah'ın lafzen sözüdür. Hz. Muhammed'in ﷺ yazdığı bir kitap değil, aldığı ve aktardığı vahiydir. Adı “(çok) okunan” anlamına gelir.",
          },
        },
        {
          type: 'quran',
          ref: '2:2',
          translation: {
            de: "Dies ist das Buch, an dem es keinen Zweifel gibt, eine Rechtleitung für die Gottesfürchtigen.",
            en: "This is the Book about which there is no doubt, a guidance for those conscious of Allah.",
            tr: "Bu, kendisinde hiçbir şüphe olmayan kitaptır; takva sahipleri için bir yol göstericidir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Aufbau', en: 'Structure', tr: 'Yapısı' },
        },
        {
          type: 'list',
          items: [
            { de: "**114 Suren** (Kapitel), von sehr lang (Sure 2 mit 286 Versen) bis sehr kurz (3 Verse)", en: "**114 surahs** (chapters), from very long (surah 2 with 286 verses) to very short (3 verses)", tr: "**114 sure**: çok uzundan (286 ayetlik Bakara) çok kısaya (3 ayet)" },
            { de: "über **6.200 Verse (Ayat)** — die genaue Zahl hängt von der Zählweise ab (verbreitet: 6.236)", en: "over **6,200 verses (ayat)** — the exact number depends on the counting method (commonly 6,236)", tr: "**6.200'ü aşkın ayet** — kesin sayı sayım yöntemine bağlıdır (yaygın: 6.236)" },
            { de: "**30 gleich lange Teile (Dschuz')** zum Lesen, z. B. ein Teil pro Tag im Ramadan", en: "**30 equal parts (juz')** for reading, e.g. one part per day in Ramadan", tr: "Okumayı kolaylaştıran **30 eşit cüz**; ör. Ramazan'da günde bir cüz" },
            { de: "**Mekkanische** Suren (vor der Auswanderung) betonen Glaube und Jenseits, **medinensische** auch das Gemeinschaftsleben", en: "**Meccan** surahs (before the emigration) emphasise faith and the Hereafter, **Medinan** ones also communal life", tr: "**Mekkî** sureler (hicretten önce) iman ve ahireti, **Medenî** sureler ayrıca toplum hayatını öne çıkarır" },
            { de: "Die Reihenfolge ist nicht chronologisch; sie beginnt mit **al-Fatiha** („die Eröffnende“)", en: "The order is not chronological; it begins with **al-Fatiha** (“the Opening”)", tr: "Sıralama nüzul sırasına göre değildir; **Fâtiha** (“açılış”) suresiyle başlar" },
          ],
        },
        {
          type: 'heading',
          text: { de: 'Bewahrung', en: 'Preservation', tr: 'Korunması' },
        },
        {
          type: 'text',
          text: {
            de: "Schon zu Lebzeiten des Propheten ﷺ lernten viele Gefährten den Koran auswendig und schrieben ihn auf. Unter dem ersten Kalifen Abu Bakr wurde er in einem Band gesammelt, unter dem dritten Kalifen 'Uthman in einheitlichen Abschriften verbreitet. Bis heute lernen Millionen Menschen — **Hafiz** genannt — den ganzen Koran auswendig.",
            en: "Already during the Prophet's ﷺ lifetime many companions memorised and wrote down the Quran. Under the first caliph Abu Bakr it was compiled into one volume, and under the third caliph 'Uthman it was distributed in standardised copies. To this day millions of people — called **hafiz** — memorise the entire Quran.",
            tr: "Daha Peygamber ﷺ hayattayken birçok sahabi Kur'an'ı ezberliyor ve yazıyordu. İlk halife Hz. Ebu Bekir döneminde tek bir mushafta toplandı, üçüncü halife Hz. Osman döneminde çoğaltılarak yayıldı. Bugün hâlâ milyonlarca kişi — **hafız** — Kur'an'ın tamamını ezberler.",
          },
        },
        {
          type: 'quran',
          ref: '15:9',
          arabic: 'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ',
          translation: {
            de: "Gewiss, Wir sind es, die Wir die Ermahnung offenbart haben, und Wir werden fürwahr ihr Hüter sein.",
            en: "Indeed, it is We who sent down the Reminder, and indeed, We will be its guardian.",
            tr: "Şüphesiz Zikr'i (Kur'an'ı) biz indirdik, onun koruyucusu da elbette biziz.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Umgang mit dem Koran', en: 'How Muslims treat the Quran', tr: "Kur'an'a karşı adab" },
        },
        {
          type: 'list',
          items: [
            { de: "Muslime begegnen dem Koran mit Respekt: man legt ihn an einen sauberen, erhöhten Platz und beginnt das Lesen mit „Bismillah“.", en: "Muslims treat the Quran with respect: it is kept in a clean, raised place, and reading begins with “Bismillah”.", tr: "Müslümanlar Kur'an'a saygı gösterir: temiz ve yüksek bir yerde muhafaza edilir, okumaya besmeleyle başlanır." },
            { de: "Rezitiert wird auf Arabisch, oft nach den Regeln des **Tadschwid**. Übersetzungen gelten als Wiedergabe der Bedeutung, nicht als Koran selbst.", en: "It is recited in Arabic, often following the rules of **tajwid**. Translations are considered renderings of the meaning, not the Quran itself.", tr: "Arapça olarak, çoğunlukla **tecvid** kurallarına uygun okunur. Meâller anlamın aktarımıdır, Kur'an'ın kendisi sayılmaz." },
            { de: "Zum Verstehen helfen Übersetzungen und Erklärungen (**Tafsir**) von Gelehrten.", en: "Translations and scholarly commentary (**tafsir**) help with understanding.", tr: "Anlamak için meâller ve âlimlerin **tefsirleri** yardımcı olur." },
          ],
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Nach der Mehrheit der Gelehrten (u. a. aller vier Rechtsschulen) soll man das arabische Koran-Exemplar (Mushaf) nur im Zustand der Gebetswaschung berühren; eine Minderheit sieht dies als Empfehlung. Lesen aus dem Gedächtnis, das Hören und das Lesen von Übersetzungen ist ohne Wudu erlaubt; beim Lesen auf dem Smartphone sehen viele Gelehrte Erleichterungen.",
            en: "According to the majority of scholars (including all four schools of law), the Arabic copy of the Quran (mushaf) should be touched only in a state of ablution; a minority regard this as a recommendation. Reciting from memory, listening and reading translations are allowed without wudu; many scholars see leeway for reading on a smartphone.",
            tr: "Âlimlerin çoğunluğuna (dört mezhep dahil) göre Arapça mushafa ancak abdestli olarak dokunulmalıdır; azınlık bunu bir tavsiye olarak görür. Ezberden okumak, dinlemek ve meâl okumak abdestsiz de caizdir; birçok âlim akıllı telefondan okumada kolaylık görür.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 5027',
          narrator: "'Uthman ibn 'Affan",
          grade: 'sahih',
          text: {
            de: "Der Beste unter euch ist, wer den Koran lernt und ihn lehrt.",
            en: "The best of you are those who learn the Quran and teach it.",
            tr: "Sizin en hayırlınız Kur'an'ı öğrenen ve öğretendir.",
          },
        },
        {
          type: 'quran',
          ref: '54:17',
          arabic: 'وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ',
          translation: {
            de: "Und Wir haben den Koran ja leicht gemacht zum Bedenken. Gibt es also jemanden, der bedenkt?",
            en: "And We have certainly made the Quran easy to remember. So is there anyone who will take heed?",
            tr: "Andolsun biz Kur'an'ı öğüt almak için kolaylaştırdık. Öğüt alan yok mu?",
          },
        },
        { type: 'link', to: '/quran', label: { de: 'Koran lesen und hören', en: 'Read and listen to the Quran', tr: "Kur'an oku ve dinle" } },
        { type: 'terms', ids: ['quran', 'surah', 'ayah', 'wahy', 'hafiz', 'tajwid', 'tafsir', 'khatam'] },
      ],
      quiz: [
        {
          question: {
            de: "Mit welchem Wort begann die Offenbarung des Korans?",
            en: "With which word did the revelation of the Quran begin?",
            tr: "Kur'an'ın inişi hangi kelimeyle başladı?",
          },
          options: [
            { de: "„Bete!“", en: "“Pray!”", tr: "“Namaz kıl!”" },
            { de: "„Lies!“", en: "“Read!”", tr: "“Oku!”" },
            { de: "„Faste!“", en: "“Fast!”", tr: "“Oruç tut!”" },
          ],
          answer: 1,
          explanation: {
            de: "Die ersten offenbarten Verse sind 96:1–5: „Lies im Namen deines Herrn …“",
            en: "The first revealed verses are 96:1–5: “Read in the name of your Lord …”",
            tr: "İlk inen ayetler Alak 96:1–5'tir: “Yaratan Rabbinin adıyla oku …”",
          },
        },
        {
          question: {
            de: "Wie viele Suren hat der Koran?",
            en: "How many surahs does the Quran have?",
            tr: "Kur'an'da kaç sure vardır?",
          },
          options: [
            { de: "99", en: "99", tr: "99" },
            { de: "114", en: "114", tr: "114" },
            { de: "30", en: "30", tr: "30" },
          ],
          answer: 1,
          explanation: {
            de: "Der Koran hat 114 Suren. 30 ist die Zahl der Lese-Teile (Dschuz'), 99 die der bekannten Namen Allahs.",
            en: "The Quran has 114 surahs. 30 is the number of reading parts (juz'), 99 the number of Allah's well-known names.",
            tr: "Kur'an'da 114 sure vardır. 30 cüz sayısı, 99 ise Allah'ın bilinen isimlerinin sayısıdır.",
          },
        },
        {
          question: {
            de: "Was ist eine Koranübersetzung aus islamischer Sicht?",
            en: "From an Islamic perspective, what is a translation of the Quran?",
            tr: "İslami bakış açısına göre bir Kur'an meâli nedir?",
          },
          options: [
            { de: "Ein gleichwertiger Koran", en: "An equivalent Quran", tr: "Kur'an'ın aynısı" },
            { de: "Eine Wiedergabe der Bedeutung", en: "A rendering of the meaning", tr: "Anlamın aktarımı" },
          ],
          answer: 1,
          explanation: {
            de: "Der Koran ist das arabische Wort Allahs; Übersetzungen geben seine Bedeutung wieder und sind eine wertvolle Hilfe zum Verstehen.",
            en: "The Quran is Allah's word in Arabic; translations convey its meaning and are a valuable aid to understanding.",
            tr: "Kur'an, Allah'ın Arapça sözüdür; meâller anlamını aktarır ve anlamak için değerli bir yardımcıdır.",
          },
        },
      ],
      sources: [
        'Quran 96:1-5, 2:2, 15:9, 54:17',
        'Sahih al-Bukhari 5027',
        'Sahih al-Bukhari 3 (Beginn der Offenbarung in der Höhle Hira)',
        'Sahih al-Bukhari 4986 (Sammlung des Korans unter Abu Bakr), 4987 (Abschriften unter Uthman)',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 11 ──────────────────────────────────────────────────────────
    {
      id: 'prophet-and-sunnah',
      title: {
        de: 'Der Prophet Muhammad ﷺ und die Sunna',
        en: 'The Prophet Muhammad ﷺ and the Sunnah',
        tr: 'Hz. Muhammed ﷺ ve sünnet',
      },
      summary: {
        de: "Wer war Muhammad ﷺ, warum ist er für Muslime ein Vorbild, und was ist die Sunna?",
        en: "Who was Muhammad ﷺ, why is he a role model for Muslims, and what is the Sunnah?",
        tr: "Hz. Muhammed ﷺ kimdi, Müslümanlar için neden örnektir ve sünnet nedir?",
      },
      minutes: 6,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Muhammad ﷺ wurde um 570 in **Mekka** geboren und wuchs als Waise auf. Schon vor seiner Berufung nannte man ihn „al-Amin“ — den Vertrauenswürdigen. Mit etwa 40 Jahren empfing er die erste Offenbarung. Nach Jahren der Verfolgung wanderte er 622 nach **Medina** aus (die **Hidschra**); dort entstand die erste muslimische Gemeinschaft. Er starb 632 in Medina.",
            en: "Muhammad ﷺ was born around 570 in **Mecca** and grew up an orphan. Even before his calling he was known as “al-Amin” — the Trustworthy. At about 40 he received the first revelation. After years of persecution he emigrated to **Medina** in 622 (the **Hijra**), where the first Muslim community took shape. He passed away in Medina in 632.",
            tr: "Hz. Muhammed ﷺ yaklaşık 570 yılında **Mekke**'de doğdu ve yetim büyüdü. Peygamberlikten önce bile ona “el-Emin” — güvenilir kişi — denirdi. Yaklaşık 40 yaşında ilk vahyi aldı. Yıllarca süren baskılardan sonra 622'de **Medine**'ye hicret etti; orada ilk Müslüman toplum oluştu. 632'de Medine'de vefat etti.",
          },
        },
        { type: 'link', to: '/seerah', label: { de: 'Sein Leben in Kapiteln (Sira)', en: 'His life in chapters (Seerah)', tr: 'Hayatı bölüm bölüm (Siyer)' } },
        {
          type: 'heading',
          text: { de: 'Ein Vorbild — und eine Barmherzigkeit', en: 'A role model — and a mercy', tr: 'Bir örnek — ve bir rahmet' },
        },
        {
          type: 'quran',
          ref: '33:21',
          arabic: 'لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ لِّمَن كَانَ يَرْجُو اللَّهَ وَالْيَوْمَ الْآخِرَ وَذَكَرَ اللَّهَ كَثِيرًا',
          translation: {
            de: "Ihr habt ja im Gesandten Allahs ein schönes Vorbild, (und zwar) für jeden, der auf Allah und den Jüngsten Tag hofft und Allahs viel gedenkt.",
            en: "There has certainly been for you in the Messenger of Allah an excellent example for whoever hopes in Allah and the Last Day and remembers Allah often.",
            tr: "Andolsun, Allah'ın Resulü'nde sizin için, Allah'a ve ahiret gününe kavuşmayı umanlar ve Allah'ı çokça ananlar için güzel bir örnek vardır.",
          },
        },
        {
          type: 'quran',
          ref: '21:107',
          arabic: 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ',
          translation: {
            de: "Und Wir haben dich nur als Barmherzigkeit für die Weltenbewohner gesandt.",
            en: "And We have not sent you except as a mercy to the worlds.",
            tr: "(Ey Muhammed!) Biz seni ancak âlemlere rahmet olarak gönderdik.",
          },
        },
        {
          type: 'text',
          text: {
            de: "Muslime lieben den Propheten ﷺ und sprechen nach seinem Namen einen Segenswunsch: „Sallallahu 'alaihi wa sallam“ — „Allah segne ihn und schenke ihm Frieden“ (in Schrift oft ﷺ). Er ist aber kein Gegenstand der Anbetung: Er war ein Mensch und Diener Allahs, dessen Größe in seiner Hingabe und seinem Charakter liegt.",
            en: "Muslims love the Prophet ﷺ and say a blessing after his name: “Sallallahu 'alayhi wa sallam” — “May Allah bless him and grant him peace” (often written ﷺ). Yet he is not an object of worship: he was a human being and servant of Allah whose greatness lies in his devotion and character.",
            tr: "Müslümanlar Peygamber'i ﷺ sever ve adı anıldığında “Sallallâhu aleyhi ve sellem” — “Allah'ın salat ve selamı onun üzerine olsun” der (yazıda çoğu zaman ﷺ). Ancak o ibadet edilen biri değildir: Allah'ın kulu ve elçisi olan bir insandı; büyüklüğü kulluğunda ve ahlakındadır.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 746',
          narrator: "'A'ischa",
          grade: 'sahih',
          text: {
            de: "Auf die Frage nach dem Charakter des Propheten ﷺ sagte sie: „Sein Charakter war der Koran.“ (Auszug)",
            en: "Asked about the character of the Prophet ﷺ, she said: “His character was the Quran.” (excerpt)",
            tr: "Peygamber'in ﷺ ahlakı sorulduğunda şöyle dedi: “Onun ahlakı Kur'an'dı.” (özet)",
          },
        },
        {
          type: 'heading',
          text: { de: 'Was ist die Sunna?', en: 'What is the Sunnah?', tr: 'Sünnet nedir?' },
        },
        {
          type: 'text',
          text: {
            de: "Die **Sunna** ist der gelebte Weg des Propheten ﷺ: was er sagte, was er tat und was er bei anderen guthieß. Sie erklärt den Koran praktisch — der Koran gebietet zum Beispiel das Gebet, die Sunna zeigt, wie man betet. Deshalb ist sie nach dem Koran die zweite Quelle des Islam.",
            en: "The **Sunnah** is the lived way of the Prophet ﷺ: what he said, what he did and what he approved of in others. It explains the Quran in practice — the Quran commands prayer, for example, and the Sunnah shows how to pray. That is why it is the second source of Islam after the Quran.",
            tr: "**Sünnet**, Peygamber'in ﷺ yaşayarak gösterdiği yoldur: söyledikleri, yaptıkları ve başkalarında onayladıkları. Kur'an'ı uygulamada açıklar — örneğin Kur'an namazı emreder, sünnet nasıl kılınacağını gösterir. Bu yüzden Kur'an'dan sonra İslam'ın ikinci kaynağıdır.",
          },
        },
        {
          type: 'quran',
          ref: '3:31',
          translation: {
            de: "Sag: „Wenn ihr Allah liebt, dann folgt mir, so liebt euch Allah und vergibt euch eure Sünden.“ Allah ist Allvergebend und Barmherzig.",
            en: "Say: “If you love Allah, then follow me; Allah will love you and forgive you your sins.” And Allah is Forgiving and Merciful.",
            tr: "De ki: “Eğer Allah'ı seviyorsanız bana uyun ki Allah da sizi sevsin ve günahlarınızı bağışlasın.” Allah çok bağışlayandır, çok merhametlidir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Hadithe: wie die Sunna überliefert wurde', en: 'Hadith: how the Sunnah was transmitted', tr: 'Hadisler: sünnet nasıl aktarıldı' },
        },
        {
          type: 'text',
          text: {
            de: "Die Sunna ist in **Hadithen** überliefert — Berichten der Gefährten über den Propheten ﷺ. Jeder Hadith hat eine Überliefererkette (**Isnad**). Gelehrte haben über Jahrhunderte geprüft, wie zuverlässig jede Kette ist, und Hadithe in Stufen eingeteilt: **sahih** (authentisch), **hasan** (gut) und **da'if** (schwach). Die bekanntesten Sammlungen sind Sahih al-Bukhari und Sahih Muslim.",
            en: "The Sunnah is transmitted in **hadiths** — reports by the companions about the Prophet ﷺ. Each hadith has a chain of narrators (**isnad**). Over centuries scholars examined how reliable each chain is and graded hadiths: **sahih** (authentic), **hasan** (good) and **da'if** (weak). The best-known collections are Sahih al-Bukhari and Sahih Muslim.",
            tr: "Sünnet **hadislerle** aktarılmıştır — sahabenin Peygamber ﷺ hakkındaki rivayetleri. Her hadisin bir ravi zinciri (**isnad**) vardır. Âlimler yüzyıllar boyunca her zincirin güvenilirliğini incelemiş ve hadisleri derecelendirmiştir: **sahih**, **hasen** ve **zayıf**. En bilinen külliyatlar Sahîh-i Buhârî ve Sahîh-i Müslim'dir.",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Die Hadithe in dieser App sind mit Sammlung und Nummer angegeben, damit du sie selbst nachschlagen kannst.",
            en: "The hadiths in this app are cited with collection and number so you can look them up yourself.",
            tr: "Bu uygulamadaki hadisler, kendin de bakabilmen için kaynak ve numarasıyla verilmiştir.",
          },
        },
        { type: 'link', to: '/hadith', label: { de: 'Hadith-Sammlung öffnen', en: 'Open the hadith collection', tr: 'Hadis koleksiyonunu aç' } },
        { type: 'terms', ids: ['sunnah', 'hadith', 'isnad', 'sahih', 'hasan', 'daif', 'seerah', 'hijra', 'sahaba'] },
      ],
      quiz: [
        {
          question: {
            de: "In welchem Jahr wanderte der Prophet ﷺ nach Medina aus?",
            en: "In which year did the Prophet ﷺ emigrate to Medina?",
            tr: "Peygamber ﷺ Medine'ye hangi yıl hicret etti?",
          },
          options: [
            { de: "570", en: "570", tr: "570" },
            { de: "610", en: "610", tr: "610" },
            { de: "622", en: "622", tr: "622" },
            { de: "632", en: "632", tr: "632" },
          ],
          answer: 2,
          explanation: {
            de: "Die Hidschra fand 622 statt; mit ihr beginnt der islamische Kalender. 570 ist das ungefähre Geburtsjahr, 610 das Jahr der ersten Offenbarung, 632 sein Todesjahr.",
            en: "The Hijra took place in 622; the Islamic calendar begins with it. 570 is the approximate year of birth, 610 the year of the first revelation, 632 the year of his passing.",
            tr: "Hicret 622'de gerçekleşti; hicri takvim onunla başlar. 570 yaklaşık doğum yılı, 610 ilk vahiy yılı, 632 vefat yılıdır.",
          },
        },
        {
          question: {
            de: "Was umfasst die Sunna?",
            en: "What does the Sunnah include?",
            tr: "Sünnet neleri kapsar?",
          },
          options: [
            { de: "Nur die Gebete des Propheten ﷺ", en: "Only the Prophet's ﷺ prayers", tr: "Yalnızca Peygamber'in ﷺ namazlarını" },
            { de: "Seine Worte, Taten und Billigungen", en: "His sayings, actions and approvals", tr: "Sözlerini, fiillerini ve onaylarını" },
            { de: "Die Gesetze späterer Herrscher", en: "The laws of later rulers", tr: "Sonraki yöneticilerin kanunlarını" },
          ],
          answer: 1,
          explanation: {
            de: "Die Sunna ist alles, was der Prophet ﷺ sagte, tat oder stillschweigend billigte.",
            en: "The Sunnah is everything the Prophet ﷺ said, did or tacitly approved.",
            tr: "Sünnet, Peygamber'in ﷺ söylediği, yaptığı veya onayladığı her şeydir.",
          },
        },
        {
          question: {
            de: "Was ist ein „Isnad“?",
            en: "What is an “isnad”?",
            tr: "“İsnad” nedir?",
          },
          options: [
            { de: "Die Überliefererkette eines Hadith", en: "The chain of narrators of a hadith", tr: "Bir hadisin ravi zinciri" },
            { de: "Ein Kapitel des Korans", en: "A chapter of the Quran", tr: "Kur'an'ın bir bölümü" },
            { de: "Ein Gebetsruf", en: "A call to prayer", tr: "Bir ezan" },
          ],
          answer: 0,
          explanation: {
            de: "Der Isnad ist die Kette der Überlieferer, über die ein Hadith bis zum Propheten ﷺ zurückverfolgt wird.",
            en: "The isnad is the chain of narrators through which a hadith is traced back to the Prophet ﷺ.",
            tr: "İsnad, bir hadisin Peygamber'e ﷺ kadar ulaştığı ravi zinciridir.",
          },
        },
      ],
      sources: [
        'Quran 33:21, 21:107, 3:31',
        'Sahih Muslim 746',
        'Sira: Ibn Hisham, as-Sira an-Nabawiyya (Eckdaten)',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 12 ──────────────────────────────────────────────────────────
    {
      id: 'ihsan-and-character',
      title: {
        de: 'Ihsan und gutes Benehmen',
        en: 'Ihsan and good character',
        tr: 'İhsan ve güzel ahlak',
      },
      summary: {
        de: "Die höchste Stufe der Religion: Allah dienen, als sähe man Ihn — und den Menschen mit bestem Charakter begegnen.",
        en: "The highest level of religion: serving Allah as though you see Him — and meeting people with the best character.",
        tr: "Dinin en yüksek mertebesi: Allah'a O'nu görüyormuş gibi kulluk etmek — ve insanlara en güzel ahlakla davranmak.",
      },
      minutes: 5,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Im Hadith Jibril (Lektion 4) fragte der Engel zuletzt nach der dritten und höchsten Ebene der Religion: **Ihsan** — Vollkommenheit, Schönheit, das Beste geben.",
            en: "In the Hadith of Jibril (lesson 4) the angel finally asked about the third and highest level of religion: **ihsan** — excellence, beauty, giving one's best.",
            tr: "Cibril Hadisi'nde (4. ders) melek son olarak dinin üçüncü ve en yüksek mertebesini sordu: **ihsan** — mükemmellik, güzellik, en iyisini yapmak.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 8 (Hadith Jibril)',
          narrator: "'Umar ibn al-Khattab",
          grade: 'sahih',
          text: {
            de: "„Berichte mir über den Ihsan.“ Er sagte: „Dass du Allah dienst, als ob du Ihn sähest; und wenn du Ihn auch nicht siehst, so sieht Er doch dich.“",
            en: "“Tell me about ihsan.” He said: “That you worship Allah as though you see Him; and although you do not see Him, He surely sees you.”",
            tr: "“Bana ihsanı anlat.” Buyurdu ki: “Allah'a O'nu görüyormuş gibi kulluk etmendir; sen O'nu görmesen de O seni görür.”",
          },
        },
        {
          type: 'text',
          text: {
            de: "Ihsan ist eine Haltung des Herzens: Man betet nicht mechanisch, sondern aufmerksam; man arbeitet ehrlich, auch wenn niemand hinsieht; man behandelt Menschen gut, weil Allah es sieht. Ihsan gilt für alles — auch für den Umgang mit Tieren und der Natur.",
            en: "Ihsan is an attitude of the heart: one prays not mechanically but attentively; one works honestly even when no one is watching; one treats people well because Allah (God) sees. Ihsan applies to everything — including how we treat animals and nature.",
            tr: "İhsan bir kalp hâlidir: Namaz mekanik olarak değil, huzurla kılınır; kimse görmese de dürüst çalışılır; Allah gördüğü için insanlara iyi davranılır. İhsan her şeyi kapsar — hayvanlara ve tabiata davranışı da.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 1955',
          narrator: "Shaddad ibn Aws",
          grade: 'sahih',
          text: {
            de: "Allah hat Ihsan (das Gute und Vollkommene) bei allen Dingen vorgeschrieben … (Auszug)",
            en: "Allah has prescribed ihsan (excellence) in all things … (excerpt)",
            tr: "Allah her şeyde ihsanı (iyiliği, güzel yapmayı) emretmiştir … (özet)",
          },
        },
        {
          type: 'quran',
          ref: '16:90',
          arabic: 'إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَىٰ وَيَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ وَالْبَغْيِ ۚ يَعِظُكُمْ لَعَلَّكُمْ تَذَكَّرُونَ',
          translation: {
            de: "Gewiss, Allah gebietet Gerechtigkeit, Güte (Ihsan) und Freigebigkeit gegenüber den Verwandten; und Er verbietet das Schändliche, das Verwerfliche und die Gewalttätigkeit. Er ermahnt euch, auf dass ihr bedenken möget.",
            en: "Indeed, Allah commands justice, excellence (ihsan) and giving to relatives, and forbids immorality, wrongdoing and oppression. He admonishes you so that you may take heed.",
            tr: "Şüphesiz Allah adaleti, iyiliği (ihsanı) ve yakınlara yardım etmeyi emreder; hayasızlığı, kötülüğü ve azgınlığı yasaklar. Düşünüp öğüt alasınız diye size öğüt veriyor.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Guter Charakter (Akhlaq)', en: 'Good character (akhlaq)', tr: 'Güzel ahlak' },
        },
        {
          type: 'text',
          text: {
            de: "Im Islam ist guter Charakter kein „Extra“, sondern Kern des Glaubens. Allah lobt Seinen Propheten ﷺ gerade dafür:",
            en: "In Islam good character is not an “extra” but the core of faith. Allah praises His Prophet ﷺ precisely for it:",
            tr: "İslam'da güzel ahlak bir “ekstra” değil, imanın özüdür. Allah Peygamberini ﷺ tam da bununla över:",
          },
        },
        {
          type: 'quran',
          ref: '68:4',
          arabic: 'وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ',
          translation: {
            de: "Und du bist wahrlich von gewaltig großartiger Wesensart.",
            en: "And indeed, you are of a great moral character.",
            tr: "Ve şüphesiz sen yüce bir ahlak üzeresin.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 3559, Sahih Muslim 2321',
          narrator: "'Abdullah ibn 'Amr",
          grade: 'sahih',
          text: {
            de: "Zu den Besten unter euch gehören diejenigen, die den besten Charakter haben.",
            en: "The best among you are those with the best character.",
            tr: "Sizin en hayırlılarınız ahlakı en güzel olanlarınızdır.",
          },
        },
        {
          type: 'hadith',
          source: 'Sunan at-Tirmidhi 1162, Sunan Abi Dawud 4682',
          narrator: 'Abu Huraira',
          grade: 'hasan',
          text: {
            de: "Die Gläubigen mit dem vollkommensten Glauben sind diejenigen mit dem besten Charakter. (at-Tirmidhi: hasan sahih)",
            en: "The most complete of the believers in faith are those with the best character. (at-Tirmidhi: hasan sahih)",
            tr: "İman bakımından müminlerin en mükemmeli, ahlakı en güzel olanıdır. (Tirmizî: hasen sahih)",
          },
        },
        {
          type: 'list',
          items: [
            { de: "**Wahrhaftigkeit:** ehrlich sein, Versprechen halten", en: "**Truthfulness:** being honest and keeping promises", tr: "**Doğruluk:** dürüst olmak, sözünde durmak" },
            { de: "**Gute Rede:** „Wer an Allah und den Jüngsten Tag glaubt, soll Gutes sagen oder schweigen“ (Bukhari 6018, Muslim 47)", en: "**Good speech:** “Whoever believes in Allah and the Last Day, let him speak good or remain silent” (Bukhari 6018, Muslim 47)", tr: "**Güzel söz:** “Allah'a ve ahiret gününe iman eden ya hayır söylesin ya da sussun” (Buhârî 6018, Müslim 47)" },
            { de: "**Respekt vor den Eltern**, Freundlichkeit zu Nachbarn, Gästen und Fremden", en: "**Respect for parents**, kindness to neighbours, guests and strangers", tr: "**Anne babaya saygı**, komşulara, misafirlere ve yabancılara nezaket" },
            { de: "**Barmherzigkeit** mit Schwachen, Kindern und Tieren", en: "**Mercy** towards the weak, children and animals", tr: "Zayıflara, çocuklara ve hayvanlara **merhamet**" },
            { de: "**Gerechtigkeit**, auch gegenüber Menschen, die man nicht mag", en: "**Justice**, even towards people one dislikes", tr: "Sevmediğimiz insanlara karşı bile **adalet**" },
          ],
        },
        {
          type: 'quran',
          ref: '2:83',
          arabic: 'وَقُولُوا لِلنَّاسِ حُسْنًا',
          translation: {
            de: "… und sprecht zu den Menschen auf schöne Weise …",
            en: "… and speak to people good words …",
            tr: "… insanlara güzel söz söyleyin …",
          },
        },
        {
          type: 'note',
          variant: 'important',
          text: {
            de: "Glaube, Gottesdienst und Charakter gehören zusammen. Ein Gebet, das einen Menschen nicht freundlicher, ehrlicher und gerechter macht, hat sein Ziel noch nicht erreicht — darum ist der Weg des Ihsan ein lebenslanger.",
            en: "Faith, worship and character belong together. A prayer that does not make a person kinder, more honest and more just has not yet reached its goal — that is why the path of ihsan is lifelong.",
            tr: "İman, ibadet ve ahlak birbirinden ayrılmaz. İnsanı daha nazik, daha dürüst ve daha adil yapmayan bir namaz henüz amacına ulaşmamıştır — bu yüzden ihsan yolu bir ömür sürer.",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Glückwunsch — du hast die Grundlagen abgeschlossen! Als Nächstes kannst du den Gebets-Guide ausprobieren oder in der Hadith-Sammlung stöbern.",
            en: "Congratulations — you have completed the foundations! Next, you could try the prayer guide or browse the hadith collection.",
            tr: "Tebrikler — temelleri tamamladın! Sırada namaz rehberini denemek veya hadis koleksiyonuna göz atmak olabilir.",
          },
        },
        { type: 'link', to: '/guide', label: { de: 'Zum Gebets-Guide', en: 'Open the prayer guide', tr: 'Namaz rehberine git' } },
        { type: 'terms', ids: ['ihsan', 'akhlaq', 'taqwa', 'iman', 'islam'] },
      ],
      quiz: [
        {
          question: {
            de: "Wie beschreibt der Prophet ﷺ den Ihsan im Hadith Jibril?",
            en: "How does the Prophet ﷺ describe ihsan in the Hadith of Jibril?",
            tr: "Peygamber ﷺ Cibril Hadisi'nde ihsanı nasıl tanımlar?",
          },
          options: [
            { de: "Viel Geld zu spenden", en: "Donating a lot of money", tr: "Çok para bağışlamak" },
            { de: "Allah zu dienen, als ob man Ihn sähe", en: "Worshipping Allah as though you see Him", tr: "Allah'a O'nu görüyormuş gibi kulluk etmek" },
            { de: "Den ganzen Koran auswendig zu kennen", en: "Knowing the entire Quran by heart", tr: "Kur'an'ın tamamını ezberlemek" },
          ],
          answer: 1,
          explanation: {
            de: "„Dass du Allah dienst, als ob du Ihn sähest; und wenn du Ihn auch nicht siehst, so sieht Er doch dich“ (Sahih Muslim 8).",
            en: "“That you worship Allah as though you see Him; and although you do not see Him, He surely sees you” (Sahih Muslim 8).",
            tr: "“Allah'a O'nu görüyormuş gibi kulluk etmendir; sen O'nu görmesen de O seni görür” (Müslim 8).",
          },
        },
        {
          question: {
            de: "Wofür lobt Allah den Propheten ﷺ in Koran 68:4?",
            en: "For what does Allah praise the Prophet ﷺ in Quran 68:4?",
            tr: "Allah, Kalem 68:4'te Peygamber'i ﷺ neyle över?",
          },
          options: [
            { de: "Für seinen Reichtum", en: "For his wealth", tr: "Zenginliğiyle" },
            { de: "Für seine großartige Wesensart (Charakter)", en: "For his great moral character", tr: "Yüce ahlakıyla" },
            { de: "Für seine Siege", en: "For his victories", tr: "Zaferleriyle" },
          ],
          answer: 1,
          explanation: {
            de: "„Und du bist wahrlich von gewaltig großartiger Wesensart.“ Der Charakter steht im Zentrum.",
            en: "“And indeed, you are of a great moral character.” Character is at the centre.",
            tr: "“Ve şüphesiz sen yüce bir ahlak üzeresin.” Ahlak merkezdedir.",
          },
        },
        {
          question: {
            de: "Wer gehört laut Bukhari 3559 / Muslim 2321 zu den Besten?",
            en: "According to Bukhari 3559 / Muslim 2321, who are among the best?",
            tr: "Buhârî 3559 / Müslim 2321'e göre en hayırlılar kimlerdir?",
          },
          options: [
            { de: "Die mit dem besten Charakter", en: "Those with the best character", tr: "Ahlakı en güzel olanlar" },
            { de: "Die Ältesten", en: "The oldest", tr: "En yaşlılar" },
            { de: "Die Reichsten", en: "The richest", tr: "En zenginler" },
          ],
          answer: 0,
          explanation: {
            de: "Der Maßstab ist der Charakter, nicht Herkunft, Alter oder Besitz.",
            en: "The measure is character, not origin, age or possessions.",
            tr: "Ölçü soy, yaş veya mal değil, ahlaktır.",
          },
        },
      ],
      sources: [
        'Sahih Muslim 8 (Hadith Jibril)',
        'Sahih Muslim 1955',
        'Sahih al-Bukhari 3559, Sahih Muslim 2321',
        'Sunan at-Tirmidhi 1162, Sunan Abi Dawud 4682',
        'Sahih al-Bukhari 6018, Sahih Muslim 47',
        'Quran 16:90, 68:4, 2:83',
        QURAN_REF,
      ],
      review: 'draft',
    },
  ],
}
