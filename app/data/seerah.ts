/**
 * Seerah — Life of the Prophet Muhammad ﷺ
 * Chronological chapters covering key events from birth to passing.
 * Each chapter includes a summary in DE/EN/TR.
 */

export interface SeerahChapter {
  id: number
  icon: string
  year: string // approximate year or period
  titleKey: string // i18n key for title
  content: {
    de: string
    en: string
    tr: string
  }
  quranReference?: string // relevant Quran verse if applicable
  category: 'early-life' | 'prophethood' | 'mecca' | 'medina' | 'legacy'
}

export const SEERAH_CATEGORIES = ['early-life', 'prophethood', 'mecca', 'medina', 'legacy'] as const

export const SEERAH_CHAPTERS: SeerahChapter[] = [
  {
    id: 1,
    icon: '⭐',
    year: '570 n.Chr.',
    titleKey: 'seerah.ch1_title',
    content: {
      de: 'Muhammad ﷺ wurde im Jahr des Elefanten (ca. 570 n.Chr.) in Mekka geboren. Er gehörte zum Stamm der Quraisch, dem Clan der Banu Haschim. Sein Vater Abdullah starb vor seiner Geburt. Seine Mutter Amina gab ihn gemäss arabischer Tradition zur Stillmutter Halima as-Sa\'diya in die Wüste, wo er seine ersten Lebensjahre verbrachte. Als er sechs Jahre alt war, starb seine Mutter. Sein Grossvater Abdul-Muttalib nahm ihn auf, und nach dessen Tod wurde sein Onkel Abu Talib sein Vormund.',
      en: 'Muhammad ﷺ was born in the Year of the Elephant (approx. 570 CE) in Mecca. He belonged to the Quraysh tribe, the Banu Hashim clan. His father Abdullah died before his birth. His mother Amina sent him to the wet nurse Halima as-Sa\'diya in the desert according to Arab tradition, where he spent his early years. When he was six, his mother passed away. His grandfather Abdul-Muttalib took him in, and after his death, his uncle Abu Talib became his guardian.',
      tr: 'Muhammed ﷺ Fil Yılı\'nda (yaklaşık 570) Mekke\'de doğdu. Kureyş kabilesinin Haşimoğulları kolundandır. Babası Abdullah doğumundan önce vefat etti. Annesi Amine, Arap geleneğine uyarak onu sütanne Halime es-Sa\'diye\'ye verdi. Altı yaşında annesi vefat etti. Dedesi Abdülmuttalib onu himayesine aldı, o da vefat edince amcası Ebu Talib vasisi oldu.',
    },
    category: 'early-life',
  },
  {
    id: 2,
    icon: '🐪',
    year: '595 n.Chr.',
    titleKey: 'seerah.ch2_title',
    content: {
      de: 'Als junger Mann war Muhammad ﷺ für seine Ehrlichkeit und Vertrauenswürdigkeit bekannt — man nannte ihn "Al-Amin" (der Vertrauenswürdige). Er arbeitete als Kaufmann und führte Handelskarawanen für die wohlhabende Geschäftsfrau Khadidscha bint Khuwaylid. Beeindruckt von seinem Charakter und seiner Integrität, bot sie ihm die Ehe an. Er war 25, sie 40 Jahre alt. Ihre Ehe war von tiefer Liebe und gegenseitigem Respekt geprägt. Khadidscha wurde später die erste Person, die an seine Prophetschaft glaubte.',
      en: 'As a young man, Muhammad ﷺ was known for his honesty and trustworthiness — he was called "Al-Amin" (the Trustworthy). He worked as a merchant, leading trade caravans for the wealthy businesswoman Khadijah bint Khuwaylid. Impressed by his character and integrity, she proposed marriage. He was 25 and she was 40. Their marriage was marked by deep love and mutual respect. Khadijah later became the first person to believe in his prophethood.',
      tr: 'Genç bir adam olarak Muhammed ﷺ dürüstlüğü ve güvenilirliğiyle tanınırdı — ona "El-Emin" (Güvenilir) denirdi. Zengin iş kadını Hatice bint Hüveylid\'in ticaret kervanlarını yönetiyordu. Karakterinden ve dürüstlüğünden etkilenen Hatice ona evlilik teklif etti. O 25, Hatice 40 yaşındaydı. Evlilikleri derin sevgi ve karşılıklı saygıyla doluydu. Hatice daha sonra peygamberliğine inanan ilk kişi oldu.',
    },
    category: 'early-life',
  },
  {
    id: 3,
    icon: '🕯️',
    year: '610 n.Chr.',
    titleKey: 'seerah.ch3_title',
    content: {
      de: 'Im Alter von 40 Jahren zog sich Muhammad ﷺ regelmässig in die Höhle Hira am Berg Nur zurück, um zu meditieren. Dort erschien ihm der Engel Dschibril (Gabriel) und überbrachte die ersten Verse des Quran: "Lies im Namen deines Herrn, der erschaffen hat" (Sure 96:1-5). Zutiefst erschüttert kehrte er zu Khadidscha zurück, die ihn beruhigte und bestärkte. So begann die Offenbarung des Quran, die sich über 23 Jahre erstrecken sollte.',
      en: 'At age 40, Muhammad ﷺ regularly retreated to the Cave of Hira on Mount Nur to meditate. There, the angel Jibril (Gabriel) appeared and conveyed the first verses of the Quran: "Read in the name of your Lord who created" (Surah 96:1-5). Deeply shaken, he returned to Khadijah, who comforted and reassured him. Thus began the revelation of the Quran, which would span 23 years.',
      tr: '40 yaşında Muhammed ﷺ düzenli olarak Nur Dağı\'ndaki Hira Mağarası\'na çekilip tefekkür ediyordu. Orada Cebrail (as) göründü ve Kuran\'ın ilk ayetlerini getirdi: "Yaratan Rabbinin adıyla oku" (Alak 96:1-5). Derinden sarsılarak Hatice\'ye döndü, o da onu teselli etti ve destekledi. Böylece 23 yıl sürecek Kuran vahyi başladı.',
    },
    quranReference: '96:1-5',
    category: 'prophethood',
  },
  {
    id: 4,
    icon: '📢',
    year: '613 n.Chr.',
    titleKey: 'seerah.ch4_title',
    content: {
      de: 'Nach drei Jahren geheimer Verkündung begann Muhammad ﷺ auf Allahs Befehl, öffentlich zum Islam aufzurufen. Die Quraisch reagierten mit zunehmendem Widerstand. Die frühen Muslime — darunter Abu Bakr, Ali, Bilal und Sumayya — wurden verfolgt, gefoltert und ausgegrenzt. Bilal, ein abessinischer Sklave, wurde in der sengenden Hitze gefoltert, rief aber standhaft "Ahad! Ahad!" (Einer! Einer!). Sumayya bint Khayyat wurde die erste Märtyrerin des Islam.',
      en: 'After three years of secret preaching, Muhammad ﷺ began to publicly call people to Islam by Allah\'s command. The Quraysh responded with increasing resistance. The early Muslims — including Abu Bakr, Ali, Bilal, and Sumayya — were persecuted, tortured, and ostracized. Bilal, an Abyssinian slave, was tortured in the scorching heat but steadfastly called out "Ahad! Ahad!" (One! One!). Sumayya bint Khayyat became the first martyr of Islam.',
      tr: 'Üç yıllık gizli tebliğden sonra Muhammed ﷺ Allah\'ın emriyle açıkça İslam\'a davet etmeye başladı. Kureyş artan bir direnişle karşılık verdi. İlk Müslümanlar — Ebu Bekir, Ali, Bilal ve Sümeyye dahil — zulme, işkenceye ve dışlanmaya maruz kaldılar. Habeşistanlı köle Bilal kavurucu sıcakta işkence gördü ama kararlılıkla "Ehad! Ehad!" (Bir! Bir!) diye haykırdı. Sümeyye bint Hayyat İslam\'ın ilk şehidi oldu.',
    },
    category: 'mecca',
  },
  {
    id: 5,
    icon: '🌙',
    year: '621 n.Chr.',
    titleKey: 'seerah.ch5_title',
    content: {
      de: 'In einer einzigen Nacht wurde Muhammad ﷺ vom Engel Dschibril von der Heiligen Moschee in Mekka zur Al-Aqsa-Moschee in Jerusalem geführt (Isra), und von dort durch die sieben Himmel emporgetragen (Mi\'radsch). Er traf die früheren Propheten — Ibrahim, Musa, Isa und andere — und empfing das Gebot der fünf täglichen Gebete. Dieses Ereignis stärkte den Glauben der Muslime und wird bis heute als Kandil-Nacht gefeiert.',
      en: 'In a single night, Muhammad ﷺ was taken by angel Jibril from the Sacred Mosque in Mecca to Al-Aqsa Mosque in Jerusalem (Isra), and from there ascended through the seven heavens (Mi\'raj). He met the earlier prophets — Ibrahim, Musa, Isa, and others — and received the command of the five daily prayers. This event strengthened the faith of the Muslims and is still celebrated as a Kandil night.',
      tr: 'Tek bir gecede Muhammed ﷺ Cebrail (as) tarafından Mekke\'deki Mescid-i Haram\'dan Kudüs\'teki Mescid-i Aksa\'ya götürüldü (İsra), oradan yedi kat semaya yükseltildi (Miraç). Önceki peygamberlerle — İbrahim, Musa, İsa ve diğerleriyle — buluştu ve beş vakit namaz emrini aldı. Bu olay Müslümanların imanını güçlendirdi ve bugün hâlâ Kandil gecesi olarak kutlanır.',
    },
    quranReference: '17:1',
    category: 'mecca',
  },
  {
    id: 6,
    icon: '🕊️',
    year: '622 n.Chr.',
    titleKey: 'seerah.ch6_title',
    content: {
      de: 'Als die Verfolgung in Mekka unerträglich wurde, wanderten die Muslime nach Yathrib (Medina) aus. Muhammad ﷺ und Abu Bakr flohen heimlich und versteckten sich drei Tage in der Höhle Thawr. In Medina wurde Muhammad ﷺ begeistert empfangen. Er gründete die erste Moschee (Masdschid an-Nabawi) und erliess die Gemeindeordnung von Medina — ein wegweisendes Dokument für das Zusammenleben von Muslimen, Juden und anderen Gruppen. Die Hidschra markiert den Beginn der islamischen Zeitrechnung.',
      en: 'As persecution in Mecca became unbearable, the Muslims emigrated to Yathrib (Medina). Muhammad ﷺ and Abu Bakr fled secretly and hid for three days in the Cave of Thawr. In Medina, Muhammad ﷺ was warmly received. He built the first mosque (Masjid an-Nabawi) and issued the Constitution of Medina — a groundbreaking document for coexistence among Muslims, Jews, and other groups. The Hijra marks the beginning of the Islamic calendar.',
      tr: 'Mekke\'deki zulüm dayanılmaz hale gelince Müslümanlar Yesrib\'e (Medine) hicret ettiler. Muhammed ﷺ ve Ebu Bekir gizlice kaçarak üç gün Sevr Mağarası\'nda gizlendiler. Medine\'de coşkuyla karşılandılar. İlk mescidi (Mescid-i Nebevi) inşa etti ve Medine Vesikası\'nı ilan etti — Müslümanlar, Yahudiler ve diğer grupların birlikte yaşamasını düzenleyen çığır açıcı bir belge. Hicret, İslami takvimin başlangıcıdır.',
    },
    category: 'medina',
  },
  {
    id: 7,
    icon: '⚔️',
    year: '624 n.Chr.',
    titleKey: 'seerah.ch7_title',
    content: {
      de: 'In Badr trafen 313 schlecht ausgerüstete Muslime auf eine Armee von über 1000 Quraisch-Kriegern. Trotz der Übermacht errangen die Muslime einen entscheidenden Sieg — ein Wendepunkt, der die junge Gemeinschaft stärkte und als Zeichen göttlicher Unterstützung gesehen wurde. Ein Jahr später, in der Schlacht von Uhud (625), erlitten die Muslime jedoch einen Rückschlag, als Bogenschützen ihren Posten verliessen. Der Prophet ﷺ selbst wurde verwundet. Es war eine Lektion über Disziplin und Gehorsam.',
      en: 'At Badr, 313 poorly equipped Muslims faced an army of over 1,000 Quraysh warriors. Despite being outnumbered, the Muslims achieved a decisive victory — a turning point that strengthened the young community and was seen as a sign of divine support. A year later, at the Battle of Uhud (625), the Muslims suffered a setback when archers abandoned their posts. The Prophet ﷺ himself was wounded. It was a lesson in discipline and obedience.',
      tr: 'Bedir\'de 313 az donanımlı Müslüman, 1000\'den fazla Kureyş savaşçısına karşı savaştı. Sayıca az olmalarına rağmen kesin bir zafer kazandılar — genç toplumu güçlendiren ve ilahi destek işareti olarak görülen bir dönüm noktası. Bir yıl sonra Uhud Savaşı\'nda (625) okçuların mevzilerini terk etmesiyle Müslümanlar zor anlar yaşadı. Peygamber ﷺ bizzat yaralandı. Bu, disiplin ve itaat konusunda bir ders oldu.',
    },
    quranReference: '3:123-126',
    category: 'medina',
  },
  {
    id: 8,
    icon: '🏰',
    year: '627 n.Chr.',
    titleKey: 'seerah.ch8_title',
    content: {
      de: 'Eine Koalition von 10.000 Kriegern marschierte auf Medina zu. Auf Vorschlag von Salman al-Farisi liess der Prophet ﷺ einen Graben um die Stadt ausheben — eine in Arabien unbekannte Taktik. Die Belagerung dauerte fast einen Monat, doch der Graben hielt stand. Ein heftiger Sturm und interne Zwietracht trieben die Koalition schliesslich zum Rückzug. Es war der letzte grosse Angriff auf Medina.',
      en: 'A coalition of 10,000 warriors marched on Medina. On the suggestion of Salman al-Farisi, the Prophet ﷺ had a trench dug around the city — a tactic unknown in Arabia. The siege lasted nearly a month, but the trench held. A fierce storm and internal discord finally drove the coalition to retreat. It was the last major attack on Medina.',
      tr: '10.000 savaşçıdan oluşan bir koalisyon Medine\'ye yürüdü. Selman-ı Farisi\'nin önerisiyle Peygamber ﷺ şehrin etrafına hendek kazdırdı — Arabistan\'da bilinmeyen bir taktik. Kuşatma yaklaşık bir ay sürdü ama hendek dayanıklı çıktı. Şiddetli bir fırtına ve iç anlaşmazlıklar koalisyonu geri çekilmeye zorladı. Bu, Medine\'ye yönelik son büyük saldırıydı.',
    },
    quranReference: '33:9-27',
    category: 'medina',
  },
  {
    id: 9,
    icon: '🕋',
    year: '630 n.Chr.',
    titleKey: 'seerah.ch9_title',
    content: {
      de: 'Mit 10.000 Gefährten marschierte der Prophet ﷺ friedlich in Mekka ein. Er betrat die Kaaba und zerstörte alle 360 Götzenbilder mit den Worten: "Die Wahrheit ist gekommen, und die Falschheit ist vergangen." Dann sprach er zu den Mekkanern, die ihn jahrelang verfolgt hatten: "Geht, ihr seid frei!" Diese beispiellose Grosszügigkeit führte dazu, dass ganz Mekka den Islam annahm. Es war ein Triumph der Vergebung über die Rache.',
      en: 'With 10,000 companions, the Prophet ﷺ peacefully entered Mecca. He entered the Kaaba and destroyed all 360 idols, saying: "Truth has come, and falsehood has departed." Then he addressed the Meccans who had persecuted him for years: "Go, you are free!" This unprecedented generosity led all of Mecca to embrace Islam. It was a triumph of forgiveness over revenge.',
      tr: '10.000 sahabiyle Peygamber ﷺ barışçıl bir şekilde Mekke\'ye girdi. Kabe\'ye girerek 360 putu "Hak geldi, batıl yok oldu" diyerek kırdı. Ardından yıllarca kendisine zulmeden Mekkelilere seslendi: "Gidin, hepiniz serbestsiniz!" Bu emsalsiz cömertlik tüm Mekke\'nin İslam\'ı kabul etmesine yol açtı. Bu, intikam yerine affın zaferi oldu.',
    },
    quranReference: '17:81',
    category: 'medina',
  },
  {
    id: 10,
    icon: '🏔️',
    year: '632 n.Chr.',
    titleKey: 'seerah.ch10_title',
    content: {
      de: 'Auf dem Berg Arafat hielt der Prophet ﷺ vor über 100.000 Pilgern seine berühmte Abschiedspredigt. Er verkündete die Gleichheit aller Menschen: "Ein Araber hat keinen Vorzug vor einem Nicht-Araber, ausser durch Gottesfurcht." Er betonte die Rechte der Frauen, verbot Zinsen und Blutrache und ermahnte: "Ich hinterlasse euch zwei Dinge — das Buch Allahs und meine Sunnah." Dann wurde der Vers offenbart: "Heute habe Ich euch eure Religion vervollständigt" (5:3).',
      en: 'On Mount Arafat, the Prophet ﷺ delivered his famous Farewell Sermon before over 100,000 pilgrims. He proclaimed the equality of all people: "An Arab has no superiority over a non-Arab except through piety." He emphasized women\'s rights, prohibited interest and blood feuds, and admonished: "I leave you two things — the Book of Allah and my Sunnah." Then the verse was revealed: "Today I have perfected for you your religion" (5:3).',
      tr: 'Arafat Dağı\'nda Peygamber ﷺ 100.000\'den fazla hacıya ünlü Veda Hutbesi\'ni verdi. Tüm insanların eşitliğini ilan etti: "Bir Arabın Arap olmayana üstünlüğü yoktur, ancak takva ile." Kadın haklarını vurguladı, faizi ve kan davasını yasakladı ve şöyle buyurdu: "Size iki şey bırakıyorum — Allah\'ın Kitabı ve Sünnetim." Ardından şu ayet indi: "Bugün dininizi tamamladım" (5:3).',
    },
    quranReference: '5:3',
    category: 'legacy',
  },
  {
    id: 11,
    icon: '🌹',
    year: '632 n.Chr.',
    titleKey: 'seerah.ch11_title',
    content: {
      de: 'Am 12. Rabi al-Awwal 11 n.H. (8. Juni 632 n.Chr.) verstarb der Prophet Muhammad ﷺ in Medina, im Haus seiner Frau Aischa, mit dem Kopf auf ihrem Schoss. Seine letzten Worte waren: "O Allah, mit dem höchsten Gefährten..." Er war 63 Jahre alt. Sein Tod erschütterte die Gemeinschaft zutiefst. Abu Bakr beruhigte die Menschen mit den Worten: "Wer Muhammad anbetete — Muhammad ist gestorben. Wer Allah anbetet — Allah lebt und stirbt nicht." Er wurde in der Prophetenmoschee in Medina beigesetzt, wo sein Grab bis heute verehrt wird.',
      en: 'On 12 Rabi al-Awwal 11 AH (June 8, 632 CE), Prophet Muhammad ﷺ passed away in Medina, in the house of his wife Aisha, with his head on her lap. His last words were: "O Allah, with the highest companion..." He was 63 years old. His death deeply shook the community. Abu Bakr calmed the people saying: "Whoever worshipped Muhammad — Muhammad has died. Whoever worships Allah — Allah lives and does not die." He was buried in the Prophet\'s Mosque in Medina, where his grave is revered to this day.',
      tr: '12 Rebiülevvel 11 H. (8 Haziran 632) tarihinde Peygamber Muhammed ﷺ Medine\'de eşi Ayşe\'nin evinde, başı onun kucağında vefat etti. Son sözleri: "Allah\'ım, en yüce dosta..." oldu. 63 yaşındaydı. Vefatı topluluğu derinden sarstı. Ebu Bekir insanları şu sözlerle sakinleştirdi: "Kim Muhammed\'e tapıyorsa — Muhammed vefat etti. Kim Allah\'a tapıyorsa — Allah diridir, ölmez." Medine\'deki Mescid-i Nebevi\'ye defnedildi, kabri bugün hâlâ ziyaret edilmektedir.',
    },
    category: 'legacy',
  },
]
