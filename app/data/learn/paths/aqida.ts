/**
 * Learning path "Aqida — Glaubenslehre vertieft" — 10 lessons for readers
 * who already know the basics (six articles of faith, see the path
 * "Grundlagen des Islam") and want to go deeper.
 *
 * Mainstream Sunni scholarship. The three Sunni theological schools
 * (Athari, Asch'ari, Maturidi) are presented neutrally and respectfully;
 * where they differ, a `note` block with variant 'differences' says so.
 * No polemics, no takfir; eschatology sticks to well-established texts.
 *
 * Quran translations are the authors' own renderings, checked against the
 * reference translations named in QURAN_REF (partly abridged). Everything
 * ships as `review: 'draft'` until a qualified reviewer has checked it.
 */
import type { LearningPath } from '../types'

/** Reference translations the Quran renderings in this path follow. */
const QURAN_REF = 'Koranübersetzungen (Referenz, eigene Wiedergabe, teils gekürzt): Bubenheim/Elyas (DE), Sahih International (EN), Diyanet İşleri Başkanlığı Kur\'an-ı Kerim Meali (TR)'

export const AQIDA_PATH: LearningPath = {
  id: 'aqida',
  icon: '💎',
  level: 'deepen',
  title: {
    de: 'Aqida — Glaubenslehre vertieft',
    en: 'Aqida — Islamic Creed in Depth',
    tr: 'Akaid — İnanç Esasları',
  },
  description: {
    de: "Für alle, die die Grundlagen kennen und tiefer verstehen wollen: Quellen und Schulen der Glaubenslehre, Allahs Namen und Eigenschaften, Iman, die unsichtbare Welt, Prophetentum, das Jenseits und die Bestimmung — sachlich, belegt und mit Respekt vor den sunnitischen Schulen.",
    en: "For everyone who knows the basics and wants to understand more deeply: the sources and schools of creed, Allah's names and attributes, iman, the unseen world, prophethood, the Hereafter and divine decree — factual, sourced and respectful of the Sunni schools.",
    tr: "Temelleri bilen ve daha derin anlamak isteyenler için: akaidin kaynakları ve ekolleri, Allah'ın isim ve sıfatları, iman, görünmeyen âlem, peygamberlik, ahiret ve kader — kaynaklı, sakin ve Sünni ekollere saygılı bir anlatımla.",
  },
  lessons: [
    // ─── 1 ───────────────────────────────────────────────────────────
    {
      id: 'what-is-aqida',
      title: {
        de: 'Was ist Aqida? Quellen, Methode, Schulen',
        en: 'What is aqida? Sources, method, schools',
        tr: 'Akaid nedir? Kaynaklar, yöntem, ekoller',
      },
      summary: {
        de: "Woher die islamische Glaubenslehre ihre Inhalte nimmt, wie Gelehrte mit Texten umgehen und welche sunnitischen Theologieschulen es gibt.",
        en: "Where Islamic creed draws its content from, how scholars work with the texts, and which Sunni theological schools exist.",
        tr: "İslam inanç esaslarının nereden alındığı, âlimlerin metinlerle nasıl çalıştığı ve hangi Sünni itikadi ekollerin bulunduğu.",
      },
      minutes: 7,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Das Wort **Aqida** kommt von der arabischen Wurzel ʿ-q-d, „knüpfen, fest binden“. Gemeint ist das, woran das Herz fest gebunden ist: die Grundüberzeugungen über Allah, die Engel, die Bücher, die Gesandten, den Jüngsten Tag und die Bestimmung. Die sechs Glaubensartikel kennst du aus dem Pfad „Grundlagen“. Hier gehen wir einen Schritt weiter: Wie begründen und erklären Gelehrte diese Inhalte?",
            en: "The word **aqida** comes from the Arabic root ʿ-q-d, “to tie, to bind firmly”. It means what the heart is firmly bound to: the core convictions about Allah, the angels, the books, the messengers, the Last Day and divine decree. You know the six articles of faith from the “Foundations” path. Here we go one step further: how do scholars ground and explain these beliefs?",
            tr: "**Akide** kelimesi Arapça ʿ-k-d kökünden gelir: “düğümlemek, sıkıca bağlamak”. Kalbin sıkıca bağlandığı şey kastedilir: Allah, melekler, kitaplar, peygamberler, ahiret günü ve kader hakkındaki temel inançlar. Altı iman esasını “Temeller” yolundan biliyorsun. Burada bir adım ileri gidiyoruz: Âlimler bu esasları nasıl temellendirir ve açıklar? (Bu ilmin çoğul adı **akaid**dir.)",
          },
        },
        {
          type: 'link',
          to: '/learn/basics/six-articles-of-faith',
          label: { de: 'Auffrischen: Die sechs Glaubensartikel', en: 'Refresher: the six articles of faith', tr: 'Hatırlatma: Altı iman esası' },
        },
        {
          type: 'heading',
          text: { de: 'Die Quellen', en: 'The sources', tr: 'Kaynaklar' },
        },
        {
          type: 'list',
          items: [
            { de: "**Der Koran** — Allahs Rede und die erste Quelle jeder Glaubensaussage.", en: "**The Quran** — Allah's speech and the first source of every statement of belief.", tr: "**Kur'an** — Allah'ın kelamı ve her inanç hükmünün ilk kaynağı." },
            { de: "**Die Sunna** — die authentisch überlieferten Worte und Taten des Propheten ﷺ, die den Koran erklären.", en: "**The Sunnah** — the authentically transmitted words and deeds of the Prophet ﷺ, which explain the Quran.", tr: "**Sünnet** — Peygamber'in ﷺ Kur'an'ı açıklayan, sahih yoldan nakledilmiş söz ve fiilleri." },
            { de: "**Der Konsens (Idschma')** — worin sich die Gelehrten der Gemeinschaft einig sind.", en: "**Consensus (ijma')** — what the scholars of the community agree upon.", tr: "**İcma** — ümmetin âlimlerinin üzerinde birleştiği hususlar." },
            { de: "**Die Vernunft ('aql)** — sie erkennt die Zeichen des Schöpfers und hilft, die Texte zu verstehen. Sie steht nicht in Konkurrenz zur Offenbarung, sondern ist ihr Werkzeug.", en: "**Reason ('aql)** — it recognises the signs of the Creator and helps to understand the texts. It is not a rival to revelation but its tool.", tr: "**Akıl** — Yaratıcı'nın delillerini tanır ve metinleri anlamaya yardım eder. Vahye rakip değil, onu anlamanın aracıdır." },
          ],
        },
        {
          type: 'quran',
          ref: '4:59',
          translation: {
            de: "… Wenn ihr aber über etwas uneinig seid, so bringt es vor Allah und den Gesandten, wenn ihr wirklich an Allah und den Jüngsten Tag glaubt. Das ist besser und nimmt den besten Ausgang.",
            en: "… And if you disagree over anything, refer it to Allah and the Messenger, if you truly believe in Allah and the Last Day. That is best and most fitting in outcome.",
            tr: "… Herhangi bir şeyde anlaşmazlığa düşerseniz, Allah'a ve ahiret gününe gerçekten inanıyorsanız onu Allah'a ve Resul'e götürün. Bu hem daha hayırlı hem de sonuç bakımından daha güzeldir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Eindeutige und mehrdeutige Verse', en: 'Clear and ambiguous verses', tr: 'Muhkem ve müteşabih ayetler' },
        },
        {
          type: 'quran',
          ref: '3:7',
          translation: {
            de: "Er ist es, der das Buch auf dich herabgesandt hat. Darin gibt es eindeutige Verse — sie sind der Kern des Buches — und andere, die mehrdeutig sind …",
            en: "It is He who has sent down to you the Book. In it are verses that are precise — they are the foundation of the Book — and others that are unspecific …",
            tr: "Sana Kitab'ı indiren O'dur. Onun bazı ayetleri muhkemdir; bunlar Kitab'ın anasıdır. Diğerleri ise müteşabihtir …",
          },
        },
        {
          type: 'text',
          text: {
            de: "Aus diesem Vers leiten die Gelehrten eine wichtige Methode ab: Die **eindeutigen (muhkam)** Aussagen sind die Grundlage; **mehrdeutige (mutaschabih)** Stellen werden im Licht der eindeutigen verstanden — niemals gegen sie. Außerdem verlangen Glaubensinhalte gesicherte Belege. Darum unterscheiden die Gelehrten sorgfältig zwischen dem, was durch viele Überlieferungswege gesichert ist, und Einzelberichten.",
            en: "From this verse scholars derive an important method: the **clear (muhkam)** statements are the foundation; **ambiguous (mutashabih)** passages are understood in the light of the clear ones — never against them. In addition, matters of belief require sound evidence. Scholars therefore carefully distinguish between what is secured through many chains of transmission and single reports.",
            tr: "Âlimler bu ayetten önemli bir yöntem çıkarır: **Muhkem** (anlamı açık) ifadeler temeldir; **müteşabih** ifadeler muhkemlerin ışığında anlaşılır — asla onlara aykırı biçimde değil. Ayrıca inanç konuları sağlam deliller gerektirir. Bu yüzden âlimler çok sayıda yolla sabit olan rivayetlerle tekil haberleri (âhâd) dikkatle ayırt eder.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Ob authentische Einzelberichte (Ahad-Hadithe) allein ausreichen, um eine Glaubensaussage zu begründen, wird unterschiedlich beantwortet: Atharitische Gelehrte bejahen es für authentische Berichte; viele aschʿaritische und maturiditische Gelehrte verlangen für die Grundpfeiler des Glaubens stärkere (z. B. vielfach überlieferte) Belege, nehmen Einzelberichte aber für Details an.",
            en: "Whether authentic single-chain reports (ahad hadith) alone suffice to establish a point of belief is answered differently: Athari scholars affirm this for authentic reports; many Ash'ari and Maturidi scholars require stronger (e.g. mass-transmitted) evidence for the pillars of faith, while accepting single reports for details.",
            tr: "Sahih âhâd haberlerin tek başına bir inanç esasını temellendirmeye yetip yetmediği farklı cevaplanır: Eserî âlimler sahih haberler için bunu kabul eder; birçok Eş'arî ve Mâtürîdî âlim ise imanın temel esasları için daha güçlü (ör. mütevatir) deliller arar, ayrıntılarda âhâd haberleri kabul eder.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 2652, Sahih Muslim 2533',
          narrator: "'Abdullah ibn Mas'ud",
          grade: 'sahih',
          text: {
            de: "Die besten Menschen sind meine Generation, dann diejenigen, die nach ihnen kommen, dann diejenigen, die nach ihnen kommen …",
            en: "The best of people are my generation, then those who come after them, then those who come after them …",
            tr: "İnsanların en hayırlısı benim neslimdir, sonra onları takip edenler, sonra da onları takip edenlerdir …",
          },
        },
        {
          type: 'text',
          text: {
            de: "Darum orientieren sich alle sunnitischen Gelehrten am Verständnis der ersten Generationen (**Salaf**): der Gefährten und ihrer Schüler. Die systematische Darstellung der Glaubenslehre entstand später, als neue Fragen und Streitpunkte aufkamen.",
            en: "This is why all Sunni scholars orient themselves by the understanding of the first generations (**salaf**): the companions and their students. The systematic presentation of creed came later, when new questions and disputes arose.",
            tr: "Bu yüzden bütün Sünni âlimler ilk nesillerin (**selef**), yani sahabenin ve onların talebelerinin anlayışını esas alır. Akaidin sistematik olarak yazılması, yeni sorular ve tartışmalar ortaya çıktığında daha sonra gerçekleşmiştir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Drei sunnitische Schulen', en: 'Three Sunni schools', tr: 'Üç Sünni ekol' },
        },
        {
          type: 'list',
          items: [
            {
              de: "**Athari** (auch Ahl al-Hadith): hält sich eng an den Wortlaut der Texte und an die Aussagen der Salaf, meidet spekulative Theologie. Prägende Gestalt: Imam Ahmad ibn Hanbal (gest. 241 H / 855).",
              en: "**Athari** (also Ahl al-Hadith): stays close to the wording of the texts and the statements of the salaf, avoids speculative theology. Formative figure: Imam Ahmad ibn Hanbal (d. 241 AH / 855).",
              tr: "**Eserî** (Ehl-i hadis): Metinlerin lafzına ve selefin sözlerine sıkı bağlıdır, spekülatif kelamdan uzak durur. Belirleyici ismi: İmam Ahmed b. Hanbel (ö. 241/855).",
            },
            {
              de: "**Asch'ari**: verteidigt dieselben Glaubensinhalte auch mit Vernunftargumenten (Kalam). Benannt nach Abu l-Hasan al-Asch'ari (gest. 324 H / 935–36); verbreitet besonders unter Schafi'iten und Malikiten.",
              en: "**Ash'ari**: defends the same beliefs also with rational arguments (kalam). Named after Abu l-Hasan al-Ash'ari (d. 324 AH / 935–36); widespread especially among Shafi'is and Malikis.",
              tr: "**Eş'arî**: Aynı inanç esaslarını aklî delillerle (kelam) de savunur. Ebu'l-Hasan el-Eş'arî'ye (ö. 324/935-36) nispet edilir; özellikle Şâfiî ve Mâlikîler arasında yaygındır.",
            },
            {
              de: "**Maturidi**: sehr nah an der aschʿaritischen Schule, gibt der Vernunft etwas mehr Raum. Benannt nach Abu Mansur al-Maturidi aus Samarkand (gest. 333 H / 944); verbreitet besonders unter Hanafiten, etwa in der Türkei, auf dem Balkan, in Zentral- und Südasien.",
              en: "**Maturidi**: very close to the Ash'ari school, gives reason somewhat more room. Named after Abu Mansur al-Maturidi of Samarkand (d. 333 AH / 944); widespread especially among Hanafis, e.g. in Turkey, the Balkans, Central and South Asia.",
              tr: "**Mâtürîdî**: Eş'arîliğe çok yakındır, akla biraz daha geniş yer verir. Semerkantlı Ebû Mansûr el-Mâtürîdî'ye (ö. 333/944) nispet edilir; özellikle Hanefîler arasında — Türkiye, Balkanlar, Orta ve Güney Asya'da — yaygındır.",
            },
          ],
        },
        {
          type: 'text',
          text: {
            de: "Ein Text, der über die Schulen hinweg geschätzt wird, ist das kurze Glaubensbekenntnis des hanafitischen Gelehrten **at-Tahawi** (gest. 321 H / 933), die „Aqida Tahawiyya“. Viele Gelehrte haben es kommentiert — Atharis wie Maturidis.",
            en: "A text valued across the schools is the short creed of the Hanafi scholar **at-Tahawi** (d. 321 AH / 933), the “Aqida Tahawiyya”. Many scholars have written commentaries on it — Atharis and Maturidis alike.",
            tr: "Ekoller arasında değer verilen bir metin, Hanefî âlim **Tahâvî**'nin (ö. 321/933) kısa inanç risalesi “Akîde-i Tahâviyye”dir. Eserîsinden Mâtürîdîsine birçok âlim onu şerh etmiştir.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Die drei Schulen stimmen in den Grundlagen überein — den sechs Glaubensartikeln, dem Tawhid, dem Rang des Korans und der Sunna. Unterschiede gibt es vor allem in der Methode: wie man über bestimmte Eigenschaften Allahs spricht (Lektion 2), wie man Iman definiert (Lektion 4) und welche Rolle Vernunftargumente spielen. In der Gelehrtentradition werden alle drei weithin zur **Ahl as-Sunna wa l-Dschama'a** gezählt; einzelne Gelehrte ziehen die Grenzen enger. Diese Unterschiede sind kein Grund für Feindschaft unter Muslimen.",
            en: "The three schools agree on the foundations — the six articles of faith, tawhid, the status of the Quran and Sunnah. Differences lie mainly in method: how to speak about certain attributes of Allah (lesson 2), how to define iman (lesson 4) and what role rational arguments play. In the scholarly tradition all three are widely counted among **Ahl as-Sunnah wa l-Jama'ah**; some scholars draw the boundaries more narrowly. These differences are no reason for hostility among Muslims.",
            tr: "Üç ekol temel esaslarda — altı iman esası, tevhid, Kur'an ve sünnetin yeri — birleşir. Farklar daha çok yöntemdedir: Allah'ın bazı sıfatlarından nasıl söz edileceği (2. ders), imanın nasıl tanımlanacağı (4. ders) ve aklî delillerin rolü. Âlimler geleneğinde üçü de yaygın olarak **Ehl-i Sünnet ve'l-Cemaat**ten sayılır; bazı âlimler sınırı daha dar çizer. Bu farklar Müslümanlar arasında düşmanlık sebebi değildir.",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Das Ziel der Aqida ist nicht, Debatten zu gewinnen, sondern Allah besser zu kennen und das Herz zu festigen. Lerne am besten mit einem Lehrer oder einer Lehrerin, die einer anerkannten Tradition folgen.",
            en: "The goal of aqida is not to win debates but to know Allah better and to steady the heart. It is best learned with a teacher who follows a recognised tradition.",
            tr: "Akaidin amacı tartışma kazanmak değil, Allah'ı daha iyi tanımak ve kalbi sağlamlaştırmaktır. En iyisi, köklü bir geleneğe bağlı bir hocadan öğrenmektir.",
          },
        },
        { type: 'terms', ids: ['aqida', 'kalam', 'athari', 'ashari', 'maturidi', 'ijma', 'sunnah', 'sahaba'] },
      ],
      quiz: [
        {
          question: {
            de: "Was bedeutet die arabische Wurzel des Wortes „Aqida“?",
            en: "What does the Arabic root of the word “aqida” mean?",
            tr: "“Akide” kelimesinin Arapça kökü ne anlama gelir?",
          },
          options: [
            { de: "Knüpfen, fest binden", en: "To tie, to bind firmly", tr: "Düğümlemek, sıkıca bağlamak" },
            { de: "Lesen, vortragen", en: "To read, to recite", tr: "Okumak" },
            { de: "Reisen", en: "To travel", tr: "Yolculuk etmek" },
          ],
          answer: 0,
          explanation: {
            de: "Aqida ist das, woran das Herz fest „gebunden“ ist — die Grundüberzeugungen des Glaubens.",
            en: "Aqida is what the heart is firmly “bound” to — the core convictions of faith.",
            tr: "Akide, kalbin sıkıca “bağlandığı” şeydir — imanın temel inançları.",
          },
        },
        {
          question: {
            de: "Wie werden mehrdeutige (mutaschabih) Verse nach Koran 3:7 verstanden?",
            en: "According to Quran 3:7, how are ambiguous (mutashabih) verses understood?",
            tr: "Âl-i İmrân 3:7'ye göre müteşabih ayetler nasıl anlaşılır?",
          },
          options: [
            { de: "Sie werden ignoriert", en: "They are ignored", tr: "Görmezden gelinir" },
            { de: "Im Licht der eindeutigen Verse, die der „Kern des Buches“ sind", en: "In the light of the clear verses, which are the “foundation of the Book”", tr: "Kitab'ın anası olan muhkem ayetlerin ışığında" },
            { de: "Jeder versteht sie, wie er möchte", en: "Everyone understands them as they like", tr: "Herkes istediği gibi anlar" },
          ],
          answer: 1,
          explanation: {
            de: "Die eindeutigen Verse sind die Grundlage; mehrdeutige Stellen werden nie gegen sie ausgelegt.",
            en: "The clear verses are the foundation; ambiguous passages are never interpreted against them.",
            tr: "Muhkem ayetler temeldir; müteşabih ifadeler asla onlara aykırı yorumlanmaz.",
          },
        },
        {
          question: {
            de: "Welche Theologieschule ist unter Hanafiten, z. B. in der Türkei, am weitesten verbreitet?",
            en: "Which theological school is most widespread among Hanafis, e.g. in Turkey?",
            tr: "Hanefîler arasında, örneğin Türkiye'de, en yaygın itikadi ekol hangisidir?",
          },
          options: [
            { de: "Maturidi", en: "Maturidi", tr: "Mâtürîdîlik" },
            { de: "Athari", en: "Athari", tr: "Eserîlik" },
            { de: "Asch'ari", en: "Ash'ari", tr: "Eş'arîlik" },
          ],
          answer: 0,
          explanation: {
            de: "Die maturiditische Schule ist eng mit der hanafitischen Rechtsschule verbunden; die aschʿaritische ist vor allem unter Schafi'iten und Malikiten verbreitet, die atharitische unter Hanbaliten.",
            en: "The Maturidi school is closely linked with the Hanafi school of law; the Ash'ari school is widespread mainly among Shafi'is and Malikis, the Athari among Hanbalis.",
            tr: "Mâtürîdîlik Hanefî mezhebiyle yakından bağlantılıdır; Eş'arîlik daha çok Şâfiî ve Mâlikîler, Eserîlik ise Hanbelîler arasında yaygındır.",
          },
        },
      ],
      sources: [
        'Quran 4:59, 3:7',
        'Sahih al-Bukhari 2652, Sahih Muslim 2533',
        "Abu Ja'far at-Tahawi: al-'Aqida at-Tahawiyya",
        'Lebensdaten der Schulgründer nach gängigen Nachschlagewerken (z. B. TDV İslâm Ansiklopedisi)',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 2 ───────────────────────────────────────────────────────────
    {
      id: 'names-and-attributes',
      title: {
        de: 'Allahs Namen und Eigenschaften',
        en: "Allah's names and attributes",
        tr: "Allah'ın isim ve sıfatları",
      },
      summary: {
        de: "Wie Muslime über Allah sprechen: die schönsten Namen, Seine Eigenschaften, der Grundsatz „Nichts ist Ihm gleich“ — und wie die Schulen schwierige Textstellen verstehen.",
        en: "How Muslims speak about Allah: the most beautiful names, His attributes, the principle “There is nothing like Him” — and how the schools understand difficult passages.",
        tr: "Müslümanların Allah hakkında nasıl konuştuğu: en güzel isimler, sıfatları, “O'nun benzeri hiçbir şey yoktur” ilkesi — ve ekollerin zor ifadeleri nasıl anladığı.",
      },
      minutes: 8,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Wir können Allah nicht sehen, und unser Verstand kann Ihn nicht erfassen. Aber Er hat Sich uns vorgestellt — durch Seine **Namen** und **Eigenschaften** im Koran und in der Sunna. Sie sind der Weg, Ihn zu kennen, zu lieben und anzurufen.",
            en: "We cannot see Allah, and our minds cannot encompass Him. But He has made Himself known to us — through His **names** and **attributes** in the Quran and Sunnah. They are the way to know Him, love Him and call upon Him.",
            tr: "Allah'ı göremeyiz ve aklımız O'nu kuşatamaz. Ama O, Kur'an ve sünnette **isimleri** ve **sıfatları** ile kendini bize tanıtmıştır. Bunlar O'nu tanımanın, sevmenin ve O'na dua etmenin yoludur.",
          },
        },
        {
          type: 'quran',
          ref: '7:180',
          arabic: 'وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا',
          translation: {
            de: "Und Allah gehören die schönsten Namen; so ruft Ihn damit an …",
            en: "And to Allah belong the best names, so invoke Him by them …",
            tr: "En güzel isimler Allah'ındır. O'na o isimlerle dua edin …",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 2736, Sahih Muslim 2677',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Allah hat neunundneunzig Namen — hundert weniger einen. Wer sie erfasst (ahsaha), tritt ins Paradies ein.",
            en: "Allah has ninety-nine names — one hundred less one. Whoever comprehends them (ahsaha) will enter Paradise.",
            tr: "Allah'ın doksan dokuz — yüzden bir eksik — ismi vardır. Onları sayıp koruyan (ahsâhâ) cennete girer.",
          },
        },
        {
          type: 'text',
          text: {
            de: "Was heißt „erfassen“? Die Gelehrten nennen mehrere Stufen: die Namen kennen und auswendig lernen, ihre Bedeutung verstehen, Allah mit ihnen anrufen und das eigene Leben von ihnen prägen lassen — wer weiß, dass Allah **al-Basir** (der Allsehende) ist, achtet auf sein Verhalten auch dann, wenn ihn niemand sieht.",
            en: "What does “comprehend” mean? Scholars name several levels: knowing and memorising the names, understanding their meaning, calling on Allah by them and letting them shape one's life — whoever knows that Allah is **al-Basir** (the All-Seeing) minds their conduct even when no one is watching.",
            tr: "“Sayıp korumak” ne demektir? Âlimler birkaç derece sayar: isimleri bilmek ve ezberlemek, anlamlarını kavramak, Allah'a onlarla dua etmek ve hayatını onlara göre şekillendirmek — Allah'ın **el-Basîr** (her şeyi gören) olduğunu bilen kişi, kimse görmediğinde de davranışına dikkat eder.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Namen und Eigenschaften', en: 'Names and attributes', tr: 'İsimler ve sıfatlar' },
        },
        {
          type: 'text',
          text: {
            de: "Jeder Name enthält eine Eigenschaft: **ar-Rahim** (der Barmherzige) die Barmherzigkeit, **al-'Alim** (der Allwissende) das Wissen. Gelehrte unterscheiden u. a. Eigenschaften des Wesens (z. B. Leben, Wissen, Macht) und Eigenschaften des Handelns (z. B. Erschaffen, Versorgen, Vergeben). Die aschʿaritische Schule hebt sieben Wesenseigenschaften besonders hervor — Leben, Wissen, Macht, Wille, Hören, Sehen und Sprechen; die maturiditische nennt zusätzlich das Ins-Dasein-Bringen (Takwin).",
            en: "Every name contains an attribute: **ar-Rahim** (the Merciful) contains mercy, **al-'Alim** (the All-Knowing) knowledge. Scholars distinguish, among others, attributes of the essence (e.g. life, knowledge, power) and attributes of action (e.g. creating, providing, forgiving). The Ash'ari school highlights seven essential attributes — life, knowledge, power, will, hearing, sight and speech; the Maturidi school adds bringing into existence (takwin).",
            tr: "Her isim bir sıfat içerir: **er-Rahîm** merhameti, **el-Alîm** ilmi. Âlimler zatî sıfatları (ör. hayat, ilim, kudret) ve fiilî sıfatları (ör. yaratmak, rızık vermek, bağışlamak) birbirinden ayırır. Eş'arîler yedi sıfatı özellikle vurgular: hayat, ilim, kudret, irade, semi', basar ve kelam; Mâtürîdîler bunlara tekvini (var etme) ekler.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Der Grundsatz: Nichts ist Ihm gleich', en: 'The principle: nothing is like Him', tr: "İlke: O'nun benzeri yoktur" },
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
          type: 'text',
          text: {
            de: "Dieser Vers enthält beides: eine **Verneinung** („Nichts ist Ihm gleich“) und eine **Bejahung** („Er ist der Allhörende, der Allsehende“). Allah hört und sieht wirklich — aber nicht so, wie Geschöpfe hören und sehen. Daraus ergibt sich der gemeinsame Grundsatz aller sunnitischen Schulen, der **Tanzih**: Allah ist über jede Unvollkommenheit und jede Ähnlichkeit mit der Schöpfung erhaben. Zwei Extreme werden darum abgelehnt: Allah zu vermenschlichen (**Taschbih**) und Seine Eigenschaften zu leugnen (**Ta'til**).",
            en: "This verse contains both a **negation** (“There is nothing like Him”) and an **affirmation** (“He is the All-Hearing, the All-Seeing”). Allah truly hears and sees — but not as created beings hear and see. From this follows the shared principle of all Sunni schools, **tanzih**: Allah is exalted above every imperfection and every likeness to creation. Two extremes are therefore rejected: likening Allah to creation (**tashbih**) and denying His attributes (**ta'til**).",
            tr: "Bu ayet hem bir **nefiy** (“O'nun benzeri hiçbir şey yoktur”) hem de bir **ispat** (“O hakkıyla işitendir, görendir”) içerir. Allah gerçekten işitir ve görür — ama yaratılmışların işitip gördüğü gibi değil. Buradan bütün Sünni ekollerin ortak ilkesi olan **tenzih** çıkar: Allah her eksiklikten ve yaratılmışlara benzemekten münezzehtir. Bu yüzden iki aşırılık reddedilir: Allah'ı yaratılmışlara benzetmek (**teşbih**) ve sıfatlarını inkâr etmek (**ta'tîl**).",
          },
        },
        {
          type: 'heading',
          text: { de: 'Schwierige Textstellen', en: 'Difficult passages', tr: 'Zor ifadeler' },
        },
        {
          type: 'text',
          text: {
            de: "Koran und Sunna sprechen manchmal mit Wörtern über Allah, die bei Menschen körperliche Bedeutungen haben — etwa Seine „Hand“ (48:10) oder dass Er Sich über den Thron „erhoben“ hat:",
            en: "The Quran and Sunnah sometimes speak of Allah with words that have physical meanings when used of humans — such as His “hand” (48:10) or that He “rose over” the Throne:",
            tr: "Kur'an ve sünnet bazen Allah hakkında, insanlar için kullanıldığında bedensel anlam taşıyan kelimeler kullanır — O'nun “eli” (48:10) veya Arş'a “istiva etmesi” gibi:",
          },
        },
        {
          type: 'quran',
          ref: '20:5',
          arabic: 'الرَّحْمَٰنُ عَلَى الْعَرْشِ اسْتَوَىٰ',
          translation: {
            de: "Der Allerbarmer hat Sich über den Thron erhoben (istawa).",
            en: "The Most Merciful rose over (istawa) the Throne.",
            tr: "Rahmân, Arş'a istiva etmiştir.",
          },
        },
        {
          type: 'text',
          text: {
            de: "Alle sunnitischen Gelehrten sind sich einig: Diese Aussagen sind wahr, und sie bedeuten **keine** Körperlichkeit. Wie man sie im Einzelnen versteht, dafür gibt es drei anerkannte Herangehensweisen:",
            en: "All Sunni scholars agree: these statements are true, and they do **not** imply corporeality. For how to understand them in detail, there are three recognised approaches:",
            tr: "Bütün Sünni âlimler şunda birleşir: Bu ifadeler haktır ve cisimlik **ifade etmez**. Ayrıntıda nasıl anlaşılacakları konusunda üç kabul görmüş yaklaşım vardır:",
          },
        },
        {
          type: 'list',
          items: [
            {
              de: "**Bejahen ohne Wie (ithbat bila kaif)** — vor allem atharitisch: Man bejaht die Eigenschaft so, wie sie überliefert ist, ohne sie mit Geschöpfen zu vergleichen und ohne nach dem „Wie“ zu fragen. Bekannt ist der Imam Malik zugeschriebene Satz sinngemäß: „Die Erhebung ist bekannt, das Wie ist unbekannt, der Glaube daran ist Pflicht, und die Frage danach ist eine Neuerung.“",
              en: "**Affirming without asking how (ithbat bila kayf)** — mainly Athari: one affirms the attribute as transmitted, without comparing it to creation and without asking “how”. Well known is the statement attributed to Imam Malik, roughly: “The rising is known, the how is unknown, believing in it is obligatory, and asking about it is an innovation.”",
              tr: "**Keyfiyetsiz ispat** — özellikle Eserî yaklaşım: Sıfat, yaratılmışlara benzetmeden ve “nasıl” diye sormadan nakledildiği gibi kabul edilir. İmam Mâlik'e nispet edilen meşhur söz kabaca şöyledir: “İstiva bilinmektedir, keyfiyeti bilinmemektedir, ona iman vaciptir, onu sormak bid'attir.”",
            },
            {
              de: "**Übergeben der Bedeutung (Tafwid)** — von vielen frühen Gelehrten und vielen Asch'aris und Maturidis vertreten: Man bejaht den Wortlaut, schließt jede körperliche Bedeutung aus und überlässt die genaue Bedeutung Allah.",
              en: "**Entrusting the meaning (tafwid)** — held by many early scholars and many Ash'aris and Maturidis: one affirms the wording, excludes any physical meaning and entrusts the precise meaning to Allah.",
              tr: "**Tefvîz** — birçok ilk dönem âliminin ve birçok Eş'arî ve Mâtürîdî'nin yolu: Lafız kabul edilir, her türlü bedensel anlam dışlanır ve kesin anlam Allah'a havale edilir.",
            },
            {
              de: "**Deutung (Ta'wil)** — vor allem spätere Asch'aris und Maturidis: Man versteht das Wort im Rahmen der arabischen Sprache in einer Gott angemessenen Bedeutung, z. B. „Hand“ als Macht oder Gunst, „Erhebung“ als Herrschaft — um einfache Menschen vor Vermenschlichung zu schützen.",
              en: "**Interpretation (ta'wil)** — mainly later Ash'aris and Maturidis: one understands the word within the Arabic language in a meaning befitting God, e.g. “hand” as power or favour, “rising” as dominion — to protect ordinary people from anthropomorphism.",
              tr: "**Te'vil** — özellikle sonraki Eş'arî ve Mâtürîdîler: Kelime Arap dili çerçevesinde Allah'a yakışan bir anlamla açıklanır; ör. “el” kudret veya nimet, “istiva” hâkimiyet olarak — sıradan insanları teşbihten korumak için.",
            },
          ],
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Alle drei Wege wollen dasselbe: den Text ehren und Allah von jeder Ähnlichkeit mit der Schöpfung freihalten. Es sind Unterschiede in der Methode zwischen angesehenen Gelehrten — die Diskussionen darüber sind teils sehr fachlich. Für den einzelnen Gläubigen genügt nach vielen Gelehrten: an das glauben, was Allah gesagt hat, so wie Er es gemeint hat, ohne Ihn mit etwas zu vergleichen.",
            en: "All three ways aim at the same thing: honouring the text and keeping Allah free of any likeness to creation. These are differences of method between respected scholars — the discussions are partly highly technical. For the individual believer, many scholars say it is enough to believe in what Allah said, as He meant it, without comparing Him to anything.",
            tr: "Üç yol da aynı şeyi amaçlar: metne saygı göstermek ve Allah'ı yaratılmışlara benzemekten tenzih etmek. Bunlar saygın âlimler arasındaki yöntem farklarıdır; tartışmalar kısmen çok tekniktir. Birçok âlime göre tek tek müminler için şu yeterlidir: Allah'ın söylediğine, O'nun murad ettiği şekilde, O'nu hiçbir şeye benzetmeden iman etmek.",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Lass die Namen in dein Bittgebet einfließen: „Ya Ghafur, vergib mir“, „Ya Razzaq, versorge mich“, „Ya Rahman, erbarme Dich meiner“. So werden aus Begriffen Beziehungen.",
            en: "Let the names flow into your supplication: “Ya Ghafur, forgive me”, “Ya Razzaq, provide for me”, “Ya Rahman, have mercy on me”. This turns concepts into a relationship.",
            tr: "İsimleri dualarına kat: “Yâ Gafûr, beni bağışla”, “Yâ Rezzâk, beni rızıklandır”, “Yâ Rahmân, bana merhamet et”. Böylece kavramlar bir bağa dönüşür.",
          },
        },
        { type: 'link', to: '/names', label: { de: 'Die 99 Namen Allahs mit Bedeutungen', en: 'The 99 names of Allah with meanings', tr: "Allah'ın 99 ismi ve anlamları" } },
        { type: 'terms', ids: ['asma-al-husna', 'sifat', 'tanzih', 'tawhid', 'athari', 'ashari', 'maturidi', 'kalam'] },
      ],
      quiz: [
        {
          question: {
            de: "Wozu fordert Koran 7:180 auf?",
            en: "What does Quran 7:180 call for?",
            tr: "A'râf 7:180 neye çağırır?",
          },
          options: [
            { de: "Allah mit Seinen schönsten Namen anzurufen", en: "To call upon Allah by His most beautiful names", tr: "Allah'a en güzel isimleriyle dua etmeye" },
            { de: "Allahs Namen geheim zu halten", en: "To keep Allah's names secret", tr: "Allah'ın isimlerini gizli tutmaya" },
            { de: "Neue Namen für Allah zu erfinden", en: "To invent new names for Allah", tr: "Allah'a yeni isimler uydurmaya" },
          ],
          answer: 0,
          explanation: {
            de: "„Allah gehören die schönsten Namen; so ruft Ihn damit an.“ Die Namen sind ein Weg des Bittgebets.",
            en: "“To Allah belong the best names, so invoke Him by them.” The names are a path of supplication.",
            tr: "“En güzel isimler Allah'ındır; O'na onlarla dua edin.” İsimler bir dua yoludur.",
          },
        },
        {
          question: {
            de: "Was enthält Koran 42:11?",
            en: "What does Quran 42:11 contain?",
            tr: "Şûrâ 42:11 neyi içerir?",
          },
          options: [
            { de: "Nur eine Verneinung", en: "Only a negation", tr: "Yalnızca bir nefiy" },
            { de: "Eine Verneinung (nichts ist Ihm gleich) und eine Bejahung (Er hört und sieht)", en: "A negation (nothing is like Him) and an affirmation (He hears and sees)", tr: "Bir nefiy (O'nun benzeri yoktur) ve bir ispat (işitir ve görür)" },
            { de: "Eine Beschreibung Allahs mit menschlichen Maßstäben", en: "A description of Allah by human standards", tr: "Allah'ın insani ölçülerle tasviri" },
          ],
          answer: 1,
          explanation: {
            de: "Allah hört und sieht wirklich — aber in einer Weise, die keinem Geschöpf gleicht. Das ist der Kern des Tanzih.",
            en: "Allah truly hears and sees — but in a way that resembles no creature. This is the core of tanzih.",
            tr: "Allah gerçekten işitir ve görür — ama hiçbir yaratılmışa benzemeyen bir şekilde. Tenzihin özü budur.",
          },
        },
        {
          question: {
            de: "Welcher Ansatz versteht Wörter wie „Hand“ im Rahmen der arabischen Sprache z. B. als „Macht“?",
            en: "Which approach understands words such as “hand” within Arabic usage, e.g. as “power”?",
            tr: "“El” gibi kelimeleri Arap dili çerçevesinde örneğin “kudret” olarak anlayan yaklaşım hangisidir?",
          },
          options: [
            { de: "Tafwid", en: "Tafwid", tr: "Tefvîz" },
            { de: "Ta'wil", en: "Ta'wil", tr: "Te'vil" },
            { de: "Taschbih", en: "Tashbih", tr: "Teşbih" },
          ],
          answer: 1,
          explanation: {
            de: "Ta'wil ist die Deutung im Rahmen der Sprache. Tafwid überlässt die Bedeutung Allah; Taschbih (Vermenschlichung) lehnen alle Schulen ab.",
            en: "Ta'wil is interpretation within the language. Tafwid entrusts the meaning to Allah; tashbih (anthropomorphism) is rejected by all schools.",
            tr: "Te'vil dil çerçevesinde yorumdur. Tefvîz anlamı Allah'a havale eder; teşbihi ise bütün ekoller reddeder.",
          },
        },
      ],
      sources: [
        'Quran 7:180, 42:11, 20:5, 48:10',
        'Sahih al-Bukhari 2736, Sahih Muslim 2677',
        "Aussage zur Istiwa': Imam Malik zugeschrieben, überliefert u. a. bei al-Bayhaqi (al-Asma' wa s-Sifat) — Wortlaut in Varianten",
        "Abu Ja'far at-Tahawi: al-'Aqida at-Tahawiyya; Darstellungen der Sifat in der aschʿaritischen und maturiditischen Kalam-Literatur",
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 3 ───────────────────────────────────────────────────────────
    {
      id: 'tawhid-and-shirk',
      title: {
        de: 'Tawhid und seine Gegenteile',
        en: 'Tawhid and its opposites',
        tr: 'Tevhid ve zıtları',
      },
      summary: {
        de: "Großer und kleiner Schirk, die stille Gefahr der Augendienerei (Riya') — und warum die Lehre vom Schirk der Selbstprüfung dient, nicht dem Urteil über andere.",
        en: "Major and minor shirk, the quiet danger of showing off (riya') — and why the teaching on shirk is for self-examination, not for judging others.",
        tr: "Büyük ve küçük şirk, gösterişin (riya) sessiz tehlikesi — ve şirk konusunun başkalarını yargılamak için değil, kendini sorgulamak için öğrenildiği.",
      },
      minutes: 7,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Im Pfad „Grundlagen“ hast du gelernt: **Schirk** (Shirk) ist das Gegenteil des Tawhid. Gelehrte unterscheiden verschiedene Formen — manche offensichtlich, manche verborgen im eigenen Herzen. Das Ziel dieser Lektion ist, den eigenen Glauben zu reinigen.",
            en: "In the “Foundations” path you learned: **shirk** is the opposite of tawhid. Scholars distinguish different forms — some obvious, some hidden in one's own heart. The aim of this lesson is to purify one's own faith.",
            tr: "“Temeller” yolunda öğrendin: **Şirk** tevhidin zıddıdır. Âlimler farklı türlerini ayırt eder — bazıları açık, bazıları insanın kendi kalbinde gizlidir. Bu dersin amacı kişinin kendi imanını arındırmasıdır.",
          },
        },
        {
          type: 'quran',
          ref: '4:48',
          translation: {
            de: "Gewiss, Allah vergibt nicht, dass Ihm (etwas) beigesellt wird. Doch was außer diesem ist, vergibt Er, wem Er will …",
            en: "Indeed, Allah does not forgive association with Him, but He forgives what is less than that for whom He wills …",
            tr: "Şüphesiz Allah kendisine ortak koşulmasını bağışlamaz. Bunun dışındakileri dilediği kimse için bağışlar …",
          },
        },
        {
          type: 'text',
          text: {
            de: "Nach den Gelehrten betrifft dieser Vers jemanden, der auf Schirk stirbt, ohne umzukehren. Wer zu Lebzeiten bereut, dem steht die Tür der Vergebung weit offen — auch für Schirk:",
            en: "According to the scholars, this verse concerns someone who dies upon shirk without turning back. For whoever repents during their lifetime, the door of forgiveness is wide open — even for shirk:",
            tr: "Âlimlere göre bu ayet, tövbe etmeden şirk üzere ölen kimse hakkındadır. Hayattayken tövbe eden için bağışlanma kapısı — şirk için bile — sonuna kadar açıktır:",
          },
        },
        {
          type: 'quran',
          ref: '39:53',
          arabic: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ',
          translation: {
            de: "Sag: O Meine Diener, die ihr gegen euch selbst maßlos gewesen seid, verliert nicht die Hoffnung auf Allahs Barmherzigkeit. Gewiss, Allah vergibt die Sünden allesamt …",
            en: "Say: O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins …",
            tr: "De ki: Ey kendi aleyhlerine haddi aşan kullarım! Allah'ın rahmetinden ümidinizi kesmeyin. Şüphesiz Allah bütün günahları bağışlar …",
          },
        },
        {
          type: 'heading',
          text: { de: 'Großer und kleiner Schirk', en: 'Major and minor shirk', tr: 'Büyük ve küçük şirk' },
        },
        {
          type: 'list',
          items: [
            {
              de: "**Großer Schirk** (asch-schirk al-akbar): jemanden neben Allah als Gottheit anbeten — sich vor ihm in Anbetung niederwerfen, ihm opfern oder ihn als Gott anrufen — oder glauben, ein anderer erschaffe oder lenke die Welt unabhängig von Allah. Er widerspricht dem Tawhid grundsätzlich.",
              en: "**Major shirk** (ash-shirk al-akbar): worshipping someone besides Allah as a deity — prostrating to them in worship, sacrificing to them or calling on them as a god — or believing that another creates or governs the world independently of Allah. It contradicts tawhid at its root.",
              tr: "**Büyük şirk** (şirk-i celî): Allah'ın yanında birine ilah olarak ibadet etmek — ona ibadet niyetiyle secde etmek, kurban kesmek veya onu ilah olarak çağırmak — ya da başka birinin Allah'tan bağımsız olarak yarattığına veya âlemi yönettiğine inanmak. Tevhide kökten aykırıdır.",
            },
            {
              de: "**Kleiner Schirk** (asch-schirk al-asghar): Handlungen, die die Aufrichtigkeit beschädigen, ohne aus dem Islam hinauszuführen — vor allem die **Augendienerei (Riya')** und, nach einem Hadith, das Schwören bei etwas anderem als Allah. Er ist dennoch ernst zu nehmen.",
              en: "**Minor shirk** (ash-shirk al-asghar): acts that damage sincerity without taking a person out of Islam — above all **showing off (riya')** and, according to a hadith, swearing by something other than Allah. It is nevertheless to be taken seriously.",
              tr: "**Küçük şirk** (şirk-i hafî): Kişiyi dinden çıkarmadan ihlası zedeleyen davranışlar — başta **riya (gösteriş)** ve bir hadise göre Allah'tan başkası adına yemin etmek. Yine de ciddiye alınmalıdır.",
            },
          ],
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 2654, Sahih Muslim 87',
          narrator: 'Abu Bakra',
          grade: 'sahih',
          text: {
            de: "„Soll ich euch nicht die größten der großen Sünden nennen?“ … „Allah etwas beizugesellen und den Eltern den gebührenden Respekt zu verweigern …“ (Auszug)",
            en: "“Shall I not tell you of the greatest of the major sins?” … “Associating partners with Allah and being undutiful to one's parents …” (excerpt)",
            tr: "“Size büyük günahların en büyüğünü haber vereyim mi?” … “Allah'a ortak koşmak ve anne babaya itaatsizlik etmek …” (özet)",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 6646, Sahih Muslim 1646',
          narrator: "'Abdullah ibn 'Umar",
          grade: 'sahih',
          text: {
            de: "Allah verbietet euch, bei euren Vätern zu schwören. Wer schwört, soll bei Allah schwören oder schweigen.",
            en: "Allah forbids you to swear by your fathers. Whoever swears, let him swear by Allah or remain silent.",
            tr: "Allah atalarınız adına yemin etmenizi yasaklar. Yemin eden, Allah adına yemin etsin ya da sussun.",
          },
        },
        {
          type: 'heading',
          text: { de: "Riya' — der Schirk im Verborgenen", en: "Riya' — the hidden shirk", tr: 'Riya — gizli şirk' },
        },
        {
          type: 'text',
          text: {
            de: "**Riya'** bedeutet, eine gute Tat oder ein Gebet zu verrichten, damit andere es sehen und loben. Die Tat sieht von außen gut aus, aber ihr Ziel hat sich verschoben: von Allah zu den Menschen. Ihr Gegenmittel ist die **Aufrichtigkeit (Ikhlas)**.",
            en: "**Riya'** means performing a good deed or a prayer so that others see it and praise it. The deed looks good from outside, but its aim has shifted: from Allah to people. Its remedy is **sincerity (ikhlas)**.",
            tr: "**Riya**, iyi bir ameli veya ibadeti başkaları görsün ve övsün diye yapmaktır. Amel dışarıdan güzel görünür ama hedefi kaymıştır: Allah'tan insanlara. İlacı **ihlas**tır.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 2985',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Allah, der Erhabene, sagt: „Ich bin von allen Teilhabern am wenigsten auf Teilhaberschaft angewiesen. Wer eine Tat verrichtet, bei der er Mir (in seiner Absicht) einen anderen beigesellt, den überlasse Ich ihm und seiner Beigesellung.“",
            en: "Allah, the Exalted, says: “I am the One most free of need of partners. Whoever does a deed in which he associates another with Me (in his intention), I leave him and his association.”",
            tr: "Yüce Allah buyurur: “Ben ortaklardan, ortaklığa en az muhtaç olanım. Kim bir amelde (niyetinde) bana başkasını ortak ederse, onu ortak koştuğu şeyle baş başa bırakırım.”",
          },
        },
        {
          type: 'quran',
          ref: '18:110',
          arabic: 'فَمَن كَانَ يَرْجُو لِقَاءَ رَبِّهِ فَلْيَعْمَلْ عَمَلًا صَالِحًا وَلَا يُشْرِكْ بِعِبَادَةِ رَبِّهِ أَحَدًا',
          translation: {
            de: "… Wer nun auf die Begegnung mit seinem Herrn hofft, der soll rechtschaffen handeln und beim Dienst an seinem Herrn niemanden beigesellen.",
            en: "… So whoever hopes to meet his Lord, let him do righteous work and not associate anyone in the worship of his Lord.",
            tr: "… Kim Rabbine kavuşmayı umuyorsa salih amel işlesin ve Rabbine ibadette hiç kimseyi ortak koşmasın.",
          },
        },
        {
          type: 'list',
          items: [
            { de: "Vor einer Tat kurz innehalten: Für wen tue ich das?", en: "Pause briefly before a deed: for whom am I doing this?", tr: "Bir amelden önce kısa bir an dur: Bunu kimin için yapıyorum?" },
            { de: "Freiwillige Taten (Spenden, Nachtgebet) gern im Verborgenen halten.", en: "Keep voluntary deeds (charity, night prayer) hidden where possible.", tr: "Nafile amelleri (sadaka, gece namazı) mümkünse gizli tut." },
            { de: "Gute Taten nicht aus Angst vor Riya' aufgeben — Gelehrte warnen, dass auch das eine Falle ist. Die Absicht korrigieren und weitermachen.", en: "Do not abandon good deeds out of fear of riya' — scholars warn that this too is a trap. Correct the intention and carry on.", tr: "Riya korkusuyla iyi amelleri bırakma — âlimler bunun da bir tuzak olduğunu söyler. Niyeti düzelt ve devam et." },
            { de: "Allah um Aufrichtigkeit bitten — Ikhlas ist selbst ein Geschenk.", en: "Ask Allah for sincerity — ikhlas is itself a gift.", tr: "Allah'tan ihlas iste — ihlas da bir lütuftur." },
          ],
        },
        {
          type: 'heading',
          text: { de: 'Kein Urteil über andere', en: 'No verdict on others', tr: 'Başkaları hakkında hüküm yok' },
        },
        {
          type: 'text',
          text: {
            de: "Die Lehre vom Schirk dient der **Selbstprüfung**. Einem Muslim den Glauben abzusprechen (**Takfir**) ist nicht Sache Einzelner. Die Gelehrten betonen, dass vor einem solchen Urteil zahlreiche Bedingungen und Hinderungsgründe zu prüfen sind — etwa Unwissenheit, ein Irrtum in der Deutung oder Zwang (vgl. 16:106). Im Alltag gilt: gut über andere denken, mit Weisheit erklären, für sie beten.",
            en: "The teaching on shirk is for **self-examination**. Declaring a Muslim to be outside the faith (**takfir**) is not a matter for individuals. Scholars stress that before any such verdict numerous conditions and impediments must be examined — such as ignorance, an error of interpretation or coercion (cf. 16:106). In daily life the rule is: think well of others, explain with wisdom, pray for them.",
            tr: "Şirk konusu **kendini sorgulamak** içindir. Bir Müslümanı dinden çıkmış saymak (**tekfir**) bireylerin işi değildir. Âlimler, böyle bir hükümden önce birçok şart ve engelin — cehalet, yorum hatası veya zorlama (bkz. 16:106) gibi — incelenmesi gerektiğini vurgular. Günlük hayatta ilke şudur: başkaları hakkında hüsnüzan beslemek, hikmetle anlatmak, onlar için dua etmek.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 6104, Sahih Muslim 60',
          narrator: "'Abdullah ibn 'Umar",
          grade: 'sahih',
          text: {
            de: "Wenn jemand zu seinem Bruder sagt: „Du Ungläubiger!“, dann trifft es einen von beiden.",
            en: "If a man says to his brother, “O disbeliever!”, then it applies to one of them.",
            tr: "Bir kimse kardeşine “Ey kâfir!” derse, bu söz ikisinden birine döner.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Bei manchen Praktiken — etwa bestimmten Formen des Tawassul (Allah „um der Ehre“ eines Propheten oder frommen Menschen willen bitten) oder einzelnen Bräuchen beim Besuch von Gräbern — urteilen sunnitische Gelehrte unterschiedlich: von erlaubt über unerwünscht bis unzulässig. Solche Detailfragen klärt man mit kundigen Gelehrten der eigenen Tradition; sie sind kein Anlass, anderen Muslimen den Glauben abzusprechen.",
            en: "For some practices — such as certain forms of tawassul (asking Allah “by the honour” of a prophet or pious person) or particular customs when visiting graves — Sunni scholars judge differently: from permitted to disliked to impermissible. Such detailed questions are best clarified with knowledgeable scholars of one's own tradition; they are no reason to declare other Muslims outside the faith.",
            tr: "Bazı uygulamalar hakkında — ör. belirli tevessül şekilleri (bir peygamber veya salih kişinin “hürmetine” Allah'tan istemek) ya da kabir ziyaretindeki bazı âdetler — Sünni âlimler farklı hükümler verir: caiz, mekruh veya caiz değil. Bu tür ayrıntılar kendi geleneğindeki ehil âlimlerle konuşulur; başka Müslümanları tekfir etmeye sebep değildir.",
          },
        },
        { type: 'terms', ids: ['shirk', 'tawhid', 'ikhlas', 'riya', 'niyyah', 'kufr', 'tawba'] },
      ],
      quiz: [
        {
          question: {
            de: "Wie wird Riya' (Augendienerei) eingeordnet?",
            en: "How is riya' (showing off) classified?",
            tr: "Riya (gösteriş) nasıl sınıflandırılır?",
          },
          options: [
            { de: "Als kleiner Schirk, der den Lohn der Tat gefährdet", en: "As minor shirk that endangers the reward of the deed", tr: "Amelin sevabını tehlikeye atan küçük şirk olarak" },
            { de: "Als harmlose Gewohnheit", en: "As a harmless habit", tr: "Zararsız bir alışkanlık olarak" },
            { de: "Als Säule des Islam", en: "As a pillar of Islam", tr: "İslam'ın bir şartı olarak" },
          ],
          answer: 0,
          explanation: {
            de: "Riya' führt nicht aus dem Islam hinaus, beschädigt aber die Aufrichtigkeit; nach Sahih Muslim 2985 nimmt Allah eine solche Tat nicht an.",
            en: "Riya' does not take a person out of Islam, but it damages sincerity; according to Sahih Muslim 2985 Allah does not accept such a deed.",
            tr: "Riya kişiyi dinden çıkarmaz ama ihlası zedeler; Müslim 2985'e göre Allah böyle bir ameli kabul etmez.",
          },
        },
        {
          question: {
            de: "Was lehrt Koran 39:53?",
            en: "What does Quran 39:53 teach?",
            tr: "Zümer 39:53 ne öğretir?",
          },
          options: [
            { de: "Manche Sünden können nie vergeben werden, auch nicht nach Reue", en: "Some sins can never be forgiven, even after repentance", tr: "Bazı günahlar tövbeden sonra bile asla bağışlanmaz" },
            { de: "Niemand soll an Allahs Barmherzigkeit verzweifeln; Er vergibt die Sünden allesamt", en: "No one should despair of Allah's mercy; He forgives all sins", tr: "Kimse Allah'ın rahmetinden ümit kesmemeli; O bütün günahları bağışlar" },
            { de: "Nur Gelehrten wird vergeben", en: "Only scholars are forgiven", tr: "Yalnızca âlimler bağışlanır" },
          ],
          answer: 1,
          explanation: {
            de: "Wer zu Lebzeiten aufrichtig umkehrt, dem steht Allahs Vergebung offen — sogar nach Schirk.",
            en: "Whoever sincerely turns back during their lifetime finds Allah's forgiveness open — even after shirk.",
            tr: "Hayattayken samimiyetle tövbe eden için Allah'ın bağışı açıktır — şirkten sonra bile.",
          },
        },
        {
          question: {
            de: "Wovor warnt der Hadith in Sahih al-Bukhari 6104?",
            en: "What does the hadith in Sahih al-Bukhari 6104 warn against?",
            tr: "Buhârî 6104'teki hadis neye karşı uyarır?",
          },
          options: [
            { de: "Vor dem Schwören bei Allah", en: "Against swearing by Allah", tr: "Allah adına yemin etmeye" },
            { de: "Davor, einen anderen Muslim leichtfertig „Ungläubiger“ zu nennen", en: "Against casually calling another Muslim a “disbeliever”", tr: "Başka bir Müslümana hafifçe “kâfir” demeye" },
            { de: "Vor dem Fasten an Feiertagen", en: "Against fasting on festival days", tr: "Bayram günlerinde oruç tutmaya" },
          ],
          answer: 1,
          explanation: {
            de: "Der Vorwurf fällt auf einen der beiden zurück — eine deutliche Warnung vor leichtfertigem Takfir.",
            en: "The accusation falls back on one of the two — a clear warning against casual takfir.",
            tr: "Suçlama ikisinden birine döner — hafifçe tekfire karşı açık bir uyarı.",
          },
        },
      ],
      sources: [
        'Quran 4:48, 39:53, 18:110, 16:106',
        'Sahih al-Bukhari 2654, Sahih Muslim 87',
        'Sahih al-Bukhari 6646, Sahih Muslim 1646',
        'Sahih Muslim 2985 (Hadith qudsi)',
        'Sahih al-Bukhari 6104, Sahih Muslim 60',
        "Bezeichnung des Riya' als „kleiner Schirk“: Musnad Ahmad (Mahmud ibn Labid), Nummer je nach Ausgabe",
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 4 ───────────────────────────────────────────────────────────
    {
      id: 'iman-in-depth',
      title: {
        de: 'Iman — was Glaube ist und wie er wächst',
        en: 'Iman — what faith is and how it grows',
        tr: 'İman — nedir ve nasıl güçlenir?',
      },
      summary: {
        de: "Die Bestandteile des Glaubens, sein Zu- und Abnehmen, das Verhältnis von Glaube und Taten — und wo die Schulen dies unterschiedlich erklären.",
        en: "The components of faith, its increase and decrease, the relationship between faith and deeds — and where the schools explain this differently.",
        tr: "İmanın unsurları, artıp eksilmesi, iman ile amel ilişkisi — ve ekollerin bunu nerede farklı açıkladığı.",
      },
      minutes: 7,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Was genau ist **Iman**? Die Gelehrten beschreiben ihn mit drei Elementen, die zusammengehören:",
            en: "What exactly is **iman**? Scholars describe it with three elements that belong together:",
            tr: "**İman** tam olarak nedir? Âlimler onu birbirine bağlı üç unsurla anlatır:",
          },
        },
        {
          type: 'list',
          items: [
            { de: "**Bestätigung mit dem Herzen** (tasdiq bi-l-qalb) — die innere Überzeugung.", en: "**Affirmation with the heart** (tasdiq bi-l-qalb) — inner conviction.", tr: "**Kalp ile tasdik** — içten inanmak." },
            { de: "**Bekenntnis mit der Zunge** (iqrar bi-l-lisan) — das Aussprechen der Schahada.", en: "**Declaration with the tongue** (iqrar bi-l-lisan) — saying the Shahada.", tr: "**Dil ile ikrar** — kelime-i şehadeti söylemek." },
            { de: "**Handeln mit den Gliedern** ('amal bi-l-dschawarih) — Gebet, Fasten, gute Taten.", en: "**Action with the limbs** ('amal bi-l-jawarih) — prayer, fasting, good deeds.", tr: "**Azalar ile amel** — namaz, oruç, iyi işler." },
          ],
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 9, Sahih Muslim 35',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Der Glaube hat über sechzig (bei Muslim: über siebzig) Zweige. Der vorzüglichste ist das Wort „La ilaha illa-llah“, der geringste das Entfernen von etwas Schädlichem vom Weg; und das Schamgefühl (Haya') ist ein Zweig des Glaubens.",
            en: "Faith has sixty-odd (in Muslim: seventy-odd) branches. The highest is saying “La ilaha illa-llah”, the lowest is removing something harmful from the road; and modesty (haya') is a branch of faith.",
            tr: "İman altmış küsur (Müslim'de: yetmiş küsur) şubedir. En üstünü “Lâ ilâhe illallah” sözü, en aşağısı yoldan eziyet veren bir şeyi kaldırmaktır; hayâ da imanın bir şubesidir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Glaube kann wachsen', en: 'Faith can grow', tr: 'İman güçlenebilir' },
        },
        {
          type: 'quran',
          ref: '8:2',
          translation: {
            de: "Gläubig sind nur diejenigen, deren Herzen sich ängstigen, wenn Allah erwähnt wird, und die, wenn ihnen Seine Verse verlesen werden, es ihren Glauben mehrt, und die sich auf ihren Herrn verlassen.",
            en: "The believers are only those who, when Allah is mentioned, their hearts become fearful, and when His verses are recited to them, it increases them in faith, and upon their Lord they rely.",
            tr: "Müminler ancak o kimselerdir ki Allah anıldığında kalpleri ürperir, O'nun ayetleri kendilerine okunduğunda imanlarını artırır ve yalnızca Rablerine tevekkül ederler.",
          },
        },
        {
          type: 'quran',
          ref: '48:4',
          translation: {
            de: "Er ist es, der die innere Ruhe in die Herzen der Gläubigen herabsandte, damit sie zu ihrem Glauben noch mehr Glauben hinzugewinnen …",
            en: "It is He who sent down tranquillity into the hearts of the believers that they would increase in faith along with their faith …",
            tr: "İmanlarına iman katsınlar diye müminlerin kalplerine huzur ve güven indiren O'dur …",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Hier unterscheiden sich die Schulen in der Definition: Nach atharitischer Lehre — und vielen Asch'aris — umfasst Iman Herz, Zunge und Taten und nimmt zu und ab. Nach hanafitisch-maturiditischer Lehre ist Iman im Kern die Bestätigung des Herzens (mit dem Bekenntnis der Zunge); dieser Kern nimmt nicht zu oder ab, wohl aber seine Stärke, sein Licht und seine Früchte; Taten sind nicht Teil der Definition, aber unverzichtbare Pflicht. Viele Gelehrte betonen, dass der Unterschied in der Praxis gering ist: Alle sagen, dass Taten verpflichtend sind, dass der Glaube durch Gehorsam erstarkt und durch Sünden geschwächt wird. Ähnlich bei der Formel „Ich bin gläubig, so Allah will“: Hanafiten meiden sie für den gegenwärtigen Glauben, andere erlauben sie im Sinn von Demut.",
            en: "Here the schools differ in definition: according to Athari teaching — and many Ash'aris — iman comprises heart, tongue and deeds and increases and decreases. According to Hanafi-Maturidi teaching, iman at its core is the affirmation of the heart (with the declaration of the tongue); this core does not increase or decrease, but its strength, light and fruits do; deeds are not part of the definition but an indispensable duty. Many scholars stress that the difference is small in practice: all say deeds are obligatory, that faith is strengthened by obedience and weakened by sins. Similarly with the formula “I am a believer, if Allah wills”: Hanafis avoid it for one's present faith, others permit it in the sense of humility.",
            tr: "Ekoller burada tanımda ayrılır: Eserîlere — ve birçok Eş'arîye — göre iman kalp, dil ve ameli kapsar; artar ve eksilir. Hanefî-Mâtürîdî anlayışa göre imanın özü kalbin tasdikidir (dilin ikrarıyla birlikte); bu öz artıp eksilmez, ama gücü, nuru ve meyveleri artıp eksilir; ameller tanımın parçası değil, vazgeçilmez bir görevdir. Birçok âlim farkın pratikte küçük olduğunu vurgular: Herkes amellerin farz olduğunu, imanın itaatle güçlenip günahla zayıfladığını söyler. “İnşallah müminim” ifadesinde de benzer bir fark vardır: Hanefîler mevcut iman için bunu kullanmaz, diğerleri tevazu anlamında caiz görür.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Islam und Iman', en: 'Islam and iman', tr: 'İslam ve iman' },
        },
        {
          type: 'quran',
          ref: '49:14',
          arabic: 'قَالَتِ الْأَعْرَابُ آمَنَّا ۖ قُل لَّمْ تُؤْمِنُوا وَلَٰكِن قُولُوا أَسْلَمْنَا',
          translation: {
            de: "Die Wüstenaraber sagen: „Wir glauben.“ Sag: Ihr glaubt nicht (wirklich), sondern sagt: „Wir sind Muslime geworden“, denn der Glaube ist noch nicht in eure Herzen eingezogen …",
            en: "The Bedouins say, “We have believed.” Say: You have not (yet) believed; but say, “We have submitted,” for faith has not yet entered your hearts …",
            tr: "Bedeviler “İman ettik” dediler. De ki: İman etmediniz; ama “Müslüman olduk” deyin. Çünkü iman henüz kalplerinize girmedi …",
          },
        },
        {
          type: 'text',
          text: {
            de: "Werden **Islam** und **Iman** zusammen genannt, meint Islam meist die äußere Hingabe (Taten) und Iman die innere Überzeugung — wie im Hadith Jibril. Wird nur eines von beiden genannt, schließt es das andere oft mit ein. Der Vers zeigt: Glaube ist ein Weg, auf dem man voranschreiten kann.",
            en: "When **islam** and **iman** are mentioned together, islam usually refers to outward submission (deeds) and iman to inner conviction — as in the Hadith of Jibril. When only one is mentioned, it often includes the other. The verse shows: faith is a path on which one can progress.",
            tr: "**İslam** ve **iman** birlikte anıldığında İslam çoğunlukla dış teslimiyeti (amelleri), iman ise iç inancı ifade eder — Cibril Hadisi'nde olduğu gibi. Yalnızca biri anıldığında çoğu zaman diğerini de kapsar. Ayet şunu gösterir: İman, ilerlenebilecek bir yoldur.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Sünde und Glaube', en: 'Sin and faith', tr: 'Günah ve iman' },
        },
        {
          type: 'text',
          text: {
            de: "Was geschieht mit dem Glauben eines Muslims, der eine schwere Sünde begeht? Die sunnitische Antwort ist ein Mittelweg: Er bleibt Muslim — sein Glaube ist geschwächt, und er soll bereuen. Abgelehnt wurden zwei Extreme der Frühzeit: dass schwere Sünde den Menschen zum Ungläubigen mache (eine Lehre der Khawaridsch), und dass Sünde dem Glauben überhaupt nicht schade. Der Koran nennt sogar zwei Gruppen, die einander bekämpfen, noch „Gläubige“ (49:9).",
            en: "What happens to the faith of a Muslim who commits a major sin? The Sunni answer is a middle way: he remains a Muslim — his faith is weakened, and he should repent. Two early extremes were rejected: that a major sin makes a person a disbeliever (a teaching of the Khawarij), and that sin does not harm faith at all. The Quran even still calls two groups who fight each other “believers” (49:9).",
            tr: "Büyük günah işleyen bir Müslümanın imanına ne olur? Sünni cevap orta yoldur: Müslüman olarak kalır — imanı zayıflamıştır ve tövbe etmelidir. Erken dönemdeki iki aşırılık reddedilmiştir: büyük günahın insanı kâfir yaptığı (Haricîlerin görüşü) ve günahın imana hiç zarar vermediği. Kur'an birbiriyle savaşan iki grubu bile hâlâ “müminler” diye anar (49:9).",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 13, Sahih Muslim 45',
          narrator: 'Anas ibn Malik',
          grade: 'sahih',
          text: {
            de: "Keiner von euch glaubt (vollkommen), bis er für seinen Bruder liebt, was er für sich selbst liebt.",
            en: "None of you (truly) believes until he loves for his brother what he loves for himself.",
            tr: "Sizden biriniz kendisi için istediğini kardeşi için de istemedikçe (gerçek anlamda) iman etmiş olmaz.",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Was den Glauben nährt: den Koran mit Nachdenken lesen, Allahs gedenken, das Gebet mit Präsenz verrichten, Wissen suchen, gute Gesellschaft, anderen helfen — und über die Schöpfung nachsinnen.",
            en: "What nourishes faith: reading the Quran with reflection, remembering Allah, praying with presence, seeking knowledge, good company, helping others — and contemplating creation.",
            tr: "İmanı besleyenler: Kur'an'ı tefekkürle okumak, Allah'ı zikretmek, namazı huzurla kılmak, ilim öğrenmek, iyi arkadaşlık, başkalarına yardım etmek — ve yaratılış üzerine düşünmek.",
          },
        },
        { type: 'terms', ids: ['iman', 'islam', 'ihsan', 'shahada', 'kufr', 'maturidi', 'athari', 'ashari'] },
      ],
      quiz: [
        {
          question: {
            de: "Welche drei Elemente nennen die Gelehrten beim Iman?",
            en: "Which three elements do scholars name for iman?",
            tr: "Âlimler iman için hangi üç unsuru sayar?",
          },
          options: [
            { de: "Herz, Zunge und Taten", en: "Heart, tongue and deeds", tr: "Kalp, dil ve amel" },
            { de: "Geld, Familie und Herkunft", en: "Money, family and origin", tr: "Para, aile ve soy" },
            { de: "Nur das Wissen im Kopf", en: "Only knowledge in the head", tr: "Yalnızca zihindeki bilgi" },
          ],
          answer: 0,
          explanation: {
            de: "Bestätigung mit dem Herzen, Bekenntnis mit der Zunge, Handeln mit den Gliedern — ob die Taten zur Definition gehören, sehen die Schulen unterschiedlich.",
            en: "Affirmation with the heart, declaration with the tongue, action with the limbs — whether deeds belong to the definition is viewed differently by the schools.",
            tr: "Kalp ile tasdik, dil ile ikrar, azalar ile amel — amellerin tanıma dahil olup olmadığını ekoller farklı değerlendirir.",
          },
        },
        {
          question: {
            de: "Was geschieht laut Koran 8:2 mit dem Glauben, wenn Allahs Verse verlesen werden?",
            en: "According to Quran 8:2, what happens to faith when Allah's verses are recited?",
            tr: "Enfâl 8:2'ye göre Allah'ın ayetleri okunduğunda imana ne olur?",
          },
          options: [
            { de: "Er bleibt immer gleich", en: "It always stays the same", tr: "Hep aynı kalır" },
            { de: "Er wird gemehrt", en: "It is increased", tr: "Artar" },
            { de: "Er verschwindet", en: "It disappears", tr: "Kaybolur" },
          ],
          answer: 1,
          explanation: {
            de: "„… und die, wenn ihnen Seine Verse verlesen werden, es ihren Glauben mehrt.“",
            en: "“… and when His verses are recited to them, it increases them in faith.”",
            tr: "“… O'nun ayetleri kendilerine okunduğunda imanlarını artırır.”",
          },
        },
        {
          question: {
            de: "Wie sieht die sunnitische Lehre einen Muslim, der eine schwere Sünde begangen hat?",
            en: "How does Sunni teaching view a Muslim who has committed a major sin?",
            tr: "Sünni anlayış büyük günah işleyen bir Müslümanı nasıl görür?",
          },
          options: [
            { de: "Er ist automatisch kein Muslim mehr", en: "He is automatically no longer Muslim", tr: "Otomatik olarak Müslüman olmaktan çıkar" },
            { de: "Er bleibt Muslim, sein Glaube ist geschwächt, und er soll bereuen", en: "He remains Muslim, his faith is weakened, and he should repent", tr: "Müslüman kalır, imanı zayıflamıştır ve tövbe etmelidir" },
            { de: "Sünden spielen für den Glauben keine Rolle", en: "Sins play no role for faith", tr: "Günahların imanla ilgisi yoktur" },
          ],
          answer: 1,
          explanation: {
            de: "Der sunnitische Mittelweg lehnt beide Extreme ab — das Für-ungläubig-Erklären (Khawaridsch) und die Verharmlosung der Sünde.",
            en: "The Sunni middle way rejects both extremes — declaring sinners disbelievers (Khawarij) and trivialising sin.",
            tr: "Sünni orta yol iki aşırılığı da reddeder — günahkârı tekfir etmeyi (Haricîler) ve günahı önemsizleştirmeyi.",
          },
        },
      ],
      sources: [
        'Quran 8:2, 48:4, 49:14, 49:9',
        'Sahih al-Bukhari 9, Sahih Muslim 35',
        'Sahih al-Bukhari 13, Sahih Muslim 45',
        'Sahih Muslim 8 (Hadith Jibril: Islam und Iman)',
        "Zur Definition des Iman: al-'Aqida at-Tahawiyya; al-Fiqh al-Akbar (Abu Hanifa zugeschrieben); Darstellungen in atharitischer und aschʿaritischer Literatur",
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 5 ───────────────────────────────────────────────────────────
    {
      id: 'angels-and-jinn',
      title: {
        de: 'Die Engel und die unsichtbare Welt',
        en: 'The angels and the unseen world',
        tr: 'Melekler ve görünmeyen âlem',
      },
      summary: {
        de: "Was Koran und Sunna über Engel und Dschinn sagen — nüchtern, belegt und ohne Sensationslust.",
        en: "What the Quran and Sunnah say about angels and jinn — sober, sourced and without sensationalism.",
        tr: "Kur'an ve sünnetin melekler ve cinler hakkında söyledikleri — sakin, kaynaklı ve abartısız.",
      },
      minutes: 7,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Muslime glauben, dass es mehr gibt als das, was wir sehen und messen können. Der Koran nennt das **al-Ghayb**, das Verborgene. Gleich zu Beginn der zweiten Sure werden die Gottesfürchtigen beschrieben als diejenigen,",
            en: "Muslims believe that there is more than what we can see and measure. The Quran calls it **al-ghayb**, the unseen. Right at the start of the second surah the God-conscious are described as those",
            tr: "Müslümanlar, görüp ölçebildiğimizden fazlasının var olduğuna inanır. Kur'an buna **gayb** der. İkinci surenin hemen başında muttakiler şöyle tanıtılır:",
          },
        },
        {
          type: 'quran',
          ref: '2:3',
          arabic: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ',
          translation: {
            de: "… die an das Verborgene glauben, das Gebet verrichten und von dem, womit Wir sie versorgt haben, ausgeben.",
            en: "… who believe in the unseen, establish prayer and spend out of what We have provided for them.",
            tr: "… Onlar gayba inanırlar, namazı dosdoğru kılarlar ve kendilerine verdiğimiz rızıktan infak ederler.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Engel — tiefer betrachtet', en: 'The angels — a closer look', tr: 'Meleklere daha yakından bakış' },
        },
        {
          type: 'text',
          text: {
            de: "Aus den „Grundlagen“ weißt du: Engel sind aus Licht erschaffen und führen Allahs Aufträge aus. Koran und Sunna sagen noch mehr: Sie essen und trinken nicht (vgl. die Gäste Ibrahims, 51:24–28), sie sind weder „Töchter Gottes“ noch weiblich gedacht (43:19), und sie werden in ihrem Dienst nicht müde.",
            en: "From the “Foundations” you know: angels are created from light and carry out Allah's commands. The Quran and Sunnah say more: they do not eat or drink (cf. Ibrahim's guests, 51:24–28), they are neither “daughters of God” nor to be thought of as female (43:19), and they do not tire in their service.",
            tr: "“Temeller”den biliyorsun: Melekler nurdan yaratılmıştır ve Allah'ın emirlerini yerine getirir. Kur'an ve sünnet daha fazlasını anlatır: Yiyip içmezler (bkz. Hz. İbrahim'in misafirleri, 51:24–28), “Allah'ın kızları” değildirler ve dişi olarak düşünülmezler (43:19), kulluklarında yorulmazlar.",
          },
        },
        {
          type: 'quran',
          ref: '21:19-20',
          translation: {
            de: "… Und diejenigen, die bei Ihm sind, sind nicht zu hochmütig, Ihm zu dienen, und werden nicht müde. Sie preisen (Ihn) Nacht und Tag, ohne nachzulassen.",
            en: "… And those near Him are not too arrogant to worship Him, nor do they tire. They exalt (Him) night and day and do not slacken.",
            tr: "… O'nun katında bulunanlar O'na ibadet etmekten büyüklenmezler ve yorulmazlar. Gece gündüz O'nu tesbih ederler, hiç ara vermezler.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 3207, Sahih Muslim 162',
          narrator: 'Anas ibn Malik',
          grade: 'sahih',
          text: {
            de: "(Aus dem Bericht über die Himmelsreise:) … Dann wurde mir das „bewohnte Haus“ (al-Bait al-Ma'mur) gezeigt. Jeden Tag betreten es siebzigtausend Engel, die nicht wieder dorthin zurückkehren. (Auszug)",
            en: "(From the account of the Night Journey:) … Then I was shown the “Frequented House” (al-Bayt al-Ma'mur). Every day seventy thousand angels enter it and never return to it. (excerpt)",
            tr: "(Mi'rac anlatımından:) … Sonra bana Beyt-i Ma'mûr gösterildi. Ona her gün yetmiş bin melek girer ve bir daha oraya dönmezler. (özet)",
          },
        },
        {
          type: 'text',
          text: {
            de: "Der Glaube an die Engel umfasst: dass es sie gibt; die Namen, die uns überliefert sind (z. B. Jibril, Mika'il und Israfil, die der Prophet ﷺ in einem Bittgebet zu Beginn des Nachtgebets nannte — Sahih Muslim 770); ihre Eigenschaften und Aufgaben; und dass wir sie lieben und ehren, ohne sie anzubeten.",
            en: "Belief in the angels includes: that they exist; the names transmitted to us (e.g. Jibril, Mika'il and Israfil, whom the Prophet ﷺ named in a supplication at the start of the night prayer — Sahih Muslim 770); their qualities and tasks; and that we love and honour them without worshipping them.",
            tr: "Meleklere iman şunları kapsar: var olduklarına; bize bildirilen isimlerine (ör. Peygamber'in ﷺ gece namazının başındaki duasında andığı Cebrail, Mikâil ve İsrafil — Müslim 770); özelliklerine ve görevlerine inanmak; onlara ibadet etmeden onları sevmek ve saygı göstermek.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Dschinn', en: 'The jinn', tr: 'Cinler' },
        },
        {
          type: 'text',
          text: {
            de: "Die **Dschinn** sind eine eigene Schöpfung, vor den Menschen aus Feuer erschaffen (15:27). Anders als die Engel haben sie — wie wir — einen freien Willen und tragen Verantwortung. Es gibt gläubige und ungläubige unter ihnen (72:11). Eine Gruppe von ihnen hörte den Koran und nahm den Glauben an:",
            en: "The **jinn** are a separate creation, created from fire before humans (15:27). Unlike angels, they — like us — have free will and bear responsibility. There are believers and disbelievers among them (72:11). A group of them heard the Quran and believed:",
            tr: "**Cinler** ayrı bir yaratılıştır; insanlardan önce ateşten yaratılmışlardır (15:27). Meleklerden farklı olarak — bizim gibi — iradeleri ve sorumlulukları vardır. Aralarında mümin olanlar da kâfir olanlar da vardır (72:11). Bir grubu Kur'an'ı dinleyip iman etmiştir:",
          },
        },
        {
          type: 'quran',
          ref: '72:1',
          translation: {
            de: "Sag: Mir ist (als Offenbarung) eingegeben worden, dass eine Schar von den Dschinn zuhörte und dann sagte: „Wir haben einen wunderbaren Koran gehört.“",
            en: "Say: It has been revealed to me that a group of the jinn listened and said, “Indeed, we have heard an amazing Quran.”",
            tr: "De ki: Bana vahyolundu ki cinlerden bir grup (Kur'an'ı) dinledi ve şöyle dediler: “Gerçekten biz harika bir Kur'an dinledik.”",
          },
        },
        {
          type: 'quran',
          ref: '51:56',
          arabic: 'وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ',
          translation: {
            de: "Und Ich habe die Dschinn und die Menschen nur (dazu) erschaffen, damit sie Mir dienen.",
            en: "And I did not create the jinn and mankind except to worship Me.",
            tr: "Ben cinleri ve insanları ancak bana kulluk etsinler diye yarattım.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Ob **Iblis** (der Satan) ursprünglich zu den Engeln gehörte, wurde in der Frühzeit diskutiert, weil er beim Befehl an die Engel, sich vor Adam niederzuwerfen, mit angesprochen war. Viele Gelehrte stützen sich auf 18:50: „Er gehörte zu den Dschinn.“ Einig sind sich alle: Er widersetzte sich aus Hochmut.",
            en: "Whether **Iblis** (Satan) originally belonged to the angels was discussed in early times, because he was included in the command to the angels to prostrate to Adam. Many scholars rely on 18:50: “He was of the jinn.” All agree: he disobeyed out of arrogance.",
            tr: "**İblis**'in (şeytan) aslen meleklerden olup olmadığı erken dönemde tartışılmıştır, çünkü meleklere verilen Âdem'e secde emrine o da dahildi. Birçok âlim Kehf 18:50'ye dayanır: “O cinlerdendi.” Herkes şunda birleşir: O, kibrinden dolayı isyan etti.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Nüchternheit statt Angst', en: 'Sobriety instead of fear', tr: 'Korku yerine sükûnet' },
        },
        {
          type: 'text',
          text: {
            de: "Um die Dschinn ranken sich viele Geschichten. Der Koran setzt klare Grenzen: Die Dschinn kennen das Verborgene nicht. Als der Prophet Sulaiman starb, merkten sie es lange nicht:",
            en: "Many stories surround the jinn. The Quran sets clear limits: the jinn do not know the unseen. When the prophet Sulayman died, they did not notice for a long time:",
            tr: "Cinler hakkında pek çok hikâye anlatılır. Kur'an açık sınırlar koyar: Cinler gaybı bilmez. Hz. Süleyman vefat ettiğinde uzun süre bunu fark etmediler:",
          },
        },
        {
          type: 'quran',
          ref: '34:14',
          translation: {
            de: "… Als er nun niederfiel, wurde den Dschinn klar, dass sie, wenn sie das Verborgene gewusst hätten, nicht in der schmachvollen Pein verweilt hätten.",
            en: "… And when he fell, it became clear to the jinn that if they had known the unseen, they would not have remained in humiliating toil.",
            tr: "… O yere yıkılınca cinler anladı ki eğer gaybı bilselerdi o alçaltıcı azap içinde kalmazlardı.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 2230',
          grade: 'sahih',
          text: {
            de: "Wer zu einem Wahrsager geht und ihn nach etwas fragt, dessen Gebet wird vierzig Nächte lang nicht angenommen.",
            en: "Whoever goes to a fortune-teller and asks him about anything, his prayer will not be accepted for forty nights.",
            tr: "Kim bir falcıya gidip ona bir şey sorarsa, kırk gece namazı kabul olunmaz.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 2814',
          narrator: "'Abdullah ibn Mas'ud",
          grade: 'sahih',
          text: {
            de: "Es gibt keinen unter euch, dem nicht ein Begleiter (Qarin) von den Dschinn zugeteilt ist. Sie fragten: „Auch dir, o Gesandter Allahs?“ Er sagte: „Auch mir — doch Allah hat mir gegen ihn geholfen, und er gebietet mir nur Gutes.“",
            en: "There is none of you but has been assigned a companion (qarin) from the jinn. They asked: “You too, O Messenger of Allah?” He said: “Me too — but Allah has helped me against him, and he only commands me to good.”",
            tr: "Sizden her birine cinlerden bir arkadaş (karîn) verilmiştir. “Sana da mı, ey Allah'ın Resulü?” dediler. “Bana da; ancak Allah ona karşı bana yardım etti, o bana yalnızca hayrı emreder” buyurdu.",
          },
        },
        {
          type: 'list',
          items: [
            { de: "Schutz suchen mit dem, was überliefert ist: Morgen- und Abendgedenken, der Thronvers (2:255) und die letzten beiden Suren (113, 114).", en: "Seek protection with what is transmitted: the morning and evening remembrances, the Verse of the Throne (2:255) and the last two surahs (113, 114).", tr: "Sünnette bildirilenlerle korun: sabah-akşam zikirleri, Âyetü'l-Kürsî (2:255) ve son iki sure (113, 114)." },
            { de: "Nicht jedes Problem den Dschinn zuschreiben. Krankheit — auch seelische — braucht ärztliche und therapeutische Hilfe; Bittgebet und Behandlung schließen sich nicht aus.", en: "Do not attribute every problem to jinn. Illness — including mental illness — needs medical and therapeutic help; supplication and treatment do not exclude each other.", tr: "Her sorunu cinlere bağlama. Hastalık — ruhsal olan da — tıbbi ve terapötik yardım gerektirir; dua ile tedavi birbirini dışlamaz." },
            { de: "Vorsicht vor Personen, die gegen Geld „Austreibungen“ oder Amulette mit unbekanntem Inhalt anbieten. Die Ruqya mit Koran und überlieferten Bittgebeten ist erlaubt — Magie und Wahrsagerei nicht.", en: "Beware of people who offer “exorcisms” for money or amulets with unknown content. Ruqyah with the Quran and transmitted supplications is permitted — magic and fortune-telling are not.", tr: "Para karşılığı “cin çıkarma” veya içeriği belirsiz muska teklif edenlere dikkat. Kur'an ve sünnetteki dualarla rukye caizdir — sihir ve falcılık değildir." },
          ],
        },
        {
          type: 'note',
          variant: 'important',
          text: {
            de: "Der Glaube an die unsichtbare Welt soll nicht Angst machen, sondern Vertrauen stärken: Allah ist mächtiger als alles Geschaffene, und Ihm allein gilt das Vertrauen.",
            en: "Belief in the unseen world is not meant to frighten but to strengthen trust: Allah is mightier than everything created, and trust is placed in Him alone.",
            tr: "Görünmeyen âleme iman korku vermek için değil, güveni güçlendirmek içindir: Allah yaratılmış her şeyden daha güçlüdür ve güven yalnızca O'nadır.",
          },
        },
        { type: 'link', to: '/dua', label: { de: 'Bittgebete und Schutzgebete', en: 'Supplications and protective prayers', tr: 'Dualar ve korunma duaları' } },
        { type: 'terms', ids: ['ghayb', 'malaika', 'jibril', 'jinn', 'iblis', 'tawakkul'] },
      ],
      quiz: [
        {
          question: {
            de: "Was sagt Koran 21:19–20 über die Engel?",
            en: "What does Quran 21:19–20 say about the angels?",
            tr: "Enbiyâ 21:19–20 melekler hakkında ne söyler?",
          },
          options: [
            { de: "Sie werden im Dienst an Allah nicht müde", en: "They do not tire in serving Allah", tr: "Allah'a kullukta yorulmazlar" },
            { de: "Sie brauchen Schlaf wie Menschen", en: "They need sleep like humans", tr: "İnsanlar gibi uykuya ihtiyaç duyarlar" },
            { de: "Sie sind Allahs Töchter", en: "They are Allah's daughters", tr: "Allah'ın kızlarıdır" },
          ],
          answer: 0,
          explanation: {
            de: "Sie preisen Allah Tag und Nacht, ohne nachzulassen. Die Vorstellung von „Töchtern Gottes“ weist der Koran zurück (43:19).",
            en: "They glorify Allah day and night without slackening. The Quran rejects the idea of “daughters of God” (43:19).",
            tr: "Gece gündüz ara vermeden Allah'ı tesbih ederler. Kur'an “Allah'ın kızları” düşüncesini reddeder (43:19).",
          },
        },
        {
          question: {
            de: "Was zeigt die Geschichte von Sulaimans Tod (34:14)?",
            en: "What does the story of Sulayman's death (34:14) show?",
            tr: "Hz. Süleyman'ın vefatı kıssası (34:14) neyi gösterir?",
          },
          options: [
            { de: "Die Dschinn kennen die Zukunft", en: "The jinn know the future", tr: "Cinler geleceği bilir" },
            { de: "Die Dschinn kennen das Verborgene nicht", en: "The jinn do not know the unseen", tr: "Cinler gaybı bilmez" },
            { de: "Sulaiman war ein Dschinn", en: "Sulayman was a jinn", tr: "Hz. Süleyman bir cindi" },
          ],
          answer: 1,
          explanation: {
            de: "Sie bemerkten seinen Tod lange nicht — hätten sie das Verborgene gekannt, wäre es anders gewesen. Darum ist es sinnlos, bei Wahrsagern Wissen über die Zukunft zu suchen.",
            en: "They did not notice his death for a long time — had they known the unseen, it would have been otherwise. So it is pointless to seek knowledge of the future from fortune-tellers.",
            tr: "Onun vefatını uzun süre fark etmediler — gaybı bilselerdi böyle olmazdı. Bu yüzden falcılardan gelecek bilgisi beklemek anlamsızdır.",
          },
        },
        {
          question: {
            de: "Worin unterscheiden sich Dschinn von Engeln?",
            en: "How do jinn differ from angels?",
            tr: "Cinler meleklerden nasıl ayrılır?",
          },
          options: [
            { de: "Dschinn haben einen freien Willen und tragen Verantwortung", en: "Jinn have free will and bear responsibility", tr: "Cinlerin iradesi ve sorumluluğu vardır" },
            { de: "Dschinn sind aus Licht erschaffen", en: "Jinn are created from light", tr: "Cinler nurdan yaratılmıştır" },
            { de: "Es gibt keinen Unterschied", en: "There is no difference", tr: "Hiçbir fark yoktur" },
          ],
          answer: 0,
          explanation: {
            de: "Dschinn sind aus Feuer erschaffen, haben einen freien Willen und es gibt Gläubige und Ungläubige unter ihnen; Engel sind aus Licht und gehorchen Allah vollkommen.",
            en: "Jinn are created from fire, have free will, and there are believers and disbelievers among them; angels are of light and obey Allah perfectly.",
            tr: "Cinler ateşten yaratılmıştır, iradeleri vardır ve aralarında mümin ve kâfir olanlar bulunur; melekler nurdandır ve Allah'a tam itaat eder.",
          },
        },
      ],
      sources: [
        'Quran 2:3, 21:19-20, 43:19, 51:24-28, 15:27, 72:1, 72:11, 51:56, 18:50, 34:14, 2:255, 113, 114',
        'Sahih al-Bukhari 3207, Sahih Muslim 162',
        'Sahih Muslim 770 (Bittgebet zu Beginn des Nachtgebets)',
        'Sahih Muslim 2230, Sahih Muslim 2814',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 6 ───────────────────────────────────────────────────────────
    {
      id: 'revelation-and-prophethood',
      title: {
        de: 'Offenbarung und Prophetentum',
        en: 'Revelation and prophethood',
        tr: 'Vahiy ve peygamberlik',
      },
      summary: {
        de: "Wie Offenbarung (Wahy) geschieht, welche Eigenschaften Propheten haben, was ein Wunder ist und was „Siegel der Propheten“ bedeutet.",
        en: "How revelation (wahy) happens, which qualities prophets have, what a miracle is and what “Seal of the Prophets” means.",
        tr: "Vahyin nasıl geldiği, peygamberlerin sıfatları, mucizenin ne olduğu ve “peygamberlerin sonuncusu” ifadesinin anlamı.",
      },
      minutes: 7,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Allah hat die Menschen nicht ohne Rechtleitung gelassen. Er wählte Menschen aus, denen Er Seine Botschaft offenbarte — die Propheten. Wie aber kommt die Offenbarung (**Wahy**) zu einem Propheten? Der Koran nennt drei Wege:",
            en: "Allah did not leave humanity without guidance. He chose human beings to whom He revealed His message — the prophets. But how does revelation (**wahy**) come to a prophet? The Quran names three ways:",
            tr: "Allah insanları hidayetsiz bırakmamıştır. Mesajını vahyettiği insanlar seçmiştir — peygamberleri. Peki **vahiy** bir peygambere nasıl gelir? Kur'an üç yol sayar:",
          },
        },
        {
          type: 'quran',
          ref: '42:51',
          translation: {
            de: "Und es steht keinem menschlichen Wesen zu, dass Allah zu ihm spricht, außer durch Eingebung oder hinter einem Vorhang, oder indem Er einen Gesandten (einen Engel) schickt, der dann mit Seiner Erlaubnis eingibt, was Er will …",
            en: "And it is not for any human being that Allah should speak to him except by inspiration, or from behind a veil, or by sending a messenger (an angel) who then reveals by His permission what He wills …",
            tr: "Allah bir insanla ancak vahiy yoluyla veya perde arkasından konuşur ya da bir elçi (melek) gönderip izniyle dilediğini vahyeder …",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 2, Sahih Muslim 2333',
          narrator: "'Aisha",
          grade: 'sahih',
          text: {
            de: "Al-Harith ibn Hischam fragte den Gesandten Allahs ﷺ, wie die Offenbarung zu ihm komme. Er sagte: „Manchmal kommt sie zu mir wie das Läuten einer Glocke — das ist für mich am schwersten —, und wenn sie von mir weicht, habe ich behalten, was gesagt wurde. Und manchmal erscheint mir der Engel in Gestalt eines Mannes, spricht zu mir, und ich behalte, was er sagt.“",
            en: "Al-Harith ibn Hisham asked the Messenger of Allah ﷺ how revelation came to him. He said: “Sometimes it comes to me like the ringing of a bell — this is the hardest on me — and when it leaves me I have retained what was said. And sometimes the angel appears to me in the form of a man, speaks to me, and I retain what he says.”",
            tr: "Hâris b. Hişâm, Resulullah'a ﷺ vahyin kendisine nasıl geldiğini sordu. Şöyle buyurdu: “Bazen çıngırak sesi gibi gelir — bu bana en ağır gelenidir — ve benden ayrıldığında söyleneni ezberlemiş olurum. Bazen de melek bana bir adam suretinde görünür, benimle konuşur, ben de söylediğini ezberlerim.”",
          },
        },
        {
          type: 'text',
          text: {
            de: "Die Offenbarung an Muhammad ﷺ begann mit wahren Träumen und dann in der Höhle Hira, wo Jibril ihm die ersten Verse von Sure al-'Alaq brachte (Sahih al-Bukhari 3). Über 23 Jahre folgte der Koran Stück für Stück.",
            en: "Revelation to Muhammad ﷺ began with true dreams and then in the cave of Hira, where Jibril brought him the first verses of Surah al-'Alaq (Sahih al-Bukhari 3). Over 23 years the Quran followed piece by piece.",
            tr: "Hz. Muhammed'e ﷺ vahiy sadık rüyalarla, ardından Cebrail'in Alak Suresi'nin ilk ayetlerini getirdiği Hira mağarasında başladı (Buhârî 3). Kur'an 23 yıl boyunca parça parça indi.",
          },
        },
        { type: 'link', to: '/seerah', label: { de: 'Der Beginn der Offenbarung in der Sira', en: 'The beginning of revelation in the Seerah', tr: "Siyer'de vahyin başlangıcı" } },
        {
          type: 'heading',
          text: { de: 'Eigenschaften der Propheten', en: 'Qualities of the prophets', tr: 'Peygamberlerin sıfatları' },
        },
        {
          type: 'text',
          text: {
            de: "Damit Menschen den Propheten vertrauen können, schreiben ihnen die Gelehrten bestimmte Eigenschaften zu. In vielen Lehrbüchern — besonders in der Türkei — werden fünf genannt:",
            en: "So that people can trust the prophets, scholars ascribe certain qualities to them. Many textbooks — especially in Turkey — list five:",
            tr: "İnsanların peygamberlere güvenebilmesi için âlimler onlara bazı sıfatlar nispet eder. Birçok ilmihalde beş sıfat sayılır:",
          },
        },
        {
          type: 'list',
          items: [
            { de: "**Sidq** — Wahrhaftigkeit: Sie lügen nie.", en: "**Sidq** — truthfulness: they never lie.", tr: "**Sıdk** — doğruluk: Asla yalan söylemezler." },
            { de: "**Amana** — Vertrauenswürdigkeit: Sie veruntreuen nichts und verändern die Botschaft nicht.", en: "**Amanah** — trustworthiness: they betray no trust and do not alter the message.", tr: "**Emanet** — güvenilirlik: Hiçbir emanete hıyanet etmez, mesajı değiştirmezler." },
            { de: "**Tabligh** — Übermittlung: Sie überbringen die ganze Botschaft, ohne etwas zu verschweigen (5:67).", en: "**Tabligh** — conveying: they deliver the whole message without concealing anything (5:67).", tr: "**Tebliğ** — Mesajın tamamını eksiksiz iletirler (5:67)." },
            { de: "**Fatana** — Klugheit und Urteilskraft.", en: "**Fatanah** — intelligence and sound judgement.", tr: "**Fetanet** — akıl ve sağlam muhakeme." },
            { de: "**'Isma** — Schutz durch Allah vor schweren Sünden und vor Fehlern in der Übermittlung.", en: "**'Ismah** — protection by Allah from major sins and from errors in conveying the message.", tr: "**İsmet** — Allah'ın onları büyük günahlardan ve tebliğde hatadan koruması." },
          ],
        },
        {
          type: 'quran',
          ref: '5:67',
          translation: {
            de: "O du Gesandter, übermittle, was zu dir von deinem Herrn (als Offenbarung) herabgesandt worden ist! Wenn du es nicht tust, so hast du Seine Botschaft nicht übermittelt …",
            en: "O Messenger, convey what has been revealed to you from your Lord. If you do not, then you have not conveyed His message …",
            tr: "Ey Peygamber! Rabbinden sana indirileni tebliğ et. Eğer bunu yapmazsan O'nun elçiliğini yerine getirmemiş olursun …",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Einig sind sich die Gelehrten, dass Propheten vor Unglauben, Lüge, schweren Sünden und Fehlern bei der Übermittlung geschützt sind. Ob ihnen kleine, unbeabsichtigte Versehen unterlaufen konnten (oft wird Adam genannt, 20:121), erklären die Schulen unterschiedlich; wer es bejaht, betont, dass solche Versehen sofort berichtigt wurden und die Würde der Propheten nicht minderten. Auch die genaue Abgrenzung zwischen **Nabi** (Prophet) und **Rasul** (Gesandter) wird verschieden formuliert; verbreitet ist: Jeder Gesandte ist ein Prophet, aber nicht umgekehrt.",
            en: "Scholars agree that prophets are protected from disbelief, lying, major sins and errors in conveying the message. Whether minor, unintentional slips could occur (Adam is often mentioned, 20:121) is explained differently by the schools; those who affirm it stress that such slips were immediately corrected and did not diminish the prophets' dignity. The exact distinction between **nabi** (prophet) and **rasul** (messenger) is also formulated differently; a common view is: every messenger is a prophet, but not vice versa.",
            tr: "Âlimler peygamberlerin küfürden, yalandan, büyük günahlardan ve tebliğde hatadan korunduğunda birleşir. Küçük ve kasıtsız sürçmelerin (zelle; sıkça Hz. Âdem örnek verilir, 20:121) mümkün olup olmadığını ekoller farklı açıklar; bunu kabul edenler, bu sürçmelerin hemen düzeltildiğini ve peygamberlerin şerefini azaltmadığını vurgular. **Nebi** ile **resul** arasındaki fark da farklı ifade edilir; yaygın görüş şudur: Her resul nebidir, ama her nebi resul değildir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Wunder (Mu\'dschiza)', en: "Miracles (mu'jizah)", tr: 'Mucize' },
        },
        {
          type: 'text',
          text: {
            de: "Allah bestätigte Seine Propheten durch **Wunder** — außergewöhnliche Zeichen, die nur mit Seiner Erlaubnis geschehen: der Stab Musas, die Heilungen durch Isa „mit Allahs Erlaubnis“ (3:49). Das bleibende Wunder Muhammads ﷺ ist der Koran selbst: Der Koran fordert dazu heraus, auch nur eine Sure wie ihn hervorzubringen (2:23).",
            en: "Allah confirmed His prophets through **miracles** — extraordinary signs that happen only by His permission: the staff of Musa, the healings by Isa “by Allah's permission” (3:49). The lasting miracle of Muhammad ﷺ is the Quran itself: it challenges anyone to produce even one surah like it (2:23).",
            tr: "Allah peygamberlerini **mucizelerle** desteklemiştir — yalnızca O'nun izniyle gerçekleşen olağanüstü olaylar: Hz. Musa'nın asası, Hz. İsa'nın “Allah'ın izniyle” yaptığı şifalar (3:49). Hz. Muhammed'in ﷺ kalıcı mucizesi Kur'an'ın kendisidir: Kur'an benzeri tek bir sure getirmeye meydan okur (2:23).",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 4981, Sahih Muslim 152',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Es gab keinen Propheten, dem nicht Zeichen gegeben wurden, aufgrund derer die Menschen glaubten. Was mir aber gegeben wurde, ist eine Offenbarung, die Allah mir eingegeben hat; so hoffe ich, dass ich am Tag der Auferstehung die meisten Anhänger haben werde.",
            en: "There was no prophet who was not given signs because of which people believed. But what I have been given is revelation that Allah has revealed to me, so I hope to have the most followers on the Day of Resurrection.",
            tr: "İnsanların kendisine iman etmesini sağlayacak mucizeler verilmemiş hiçbir peygamber yoktur. Bana verilen ise Allah'ın bana vahyettiği vahiydir. Bu yüzden kıyamet günü en çok ümmeti olan peygamber olmayı umarım.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Das Siegel der Propheten', en: 'The Seal of the Prophets', tr: 'Peygamberlerin sonuncusu' },
        },
        {
          type: 'quran',
          ref: '33:40',
          arabic: 'مَّا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِّن رِّجَالِكُمْ وَلَٰكِن رَّسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ',
          translation: {
            de: "Muhammad ist nicht der Vater irgendeines eurer Männer, sondern Allahs Gesandter und das Siegel der Propheten …",
            en: "Muhammad is not the father of any of your men, but he is the Messenger of Allah and the Seal of the Prophets …",
            tr: "Muhammed sizin erkeklerinizden hiçbirinin babası değildir; fakat o Allah'ın Resulü ve peygamberlerin sonuncusudur …",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 3535, Sahih Muslim 2286',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Mein Gleichnis und das der Propheten vor mir ist wie das eines Mannes, der ein Haus baute und es schön und vollkommen machte — bis auf den Platz eines Ziegelsteins in einer Ecke. Die Menschen gingen darum herum, bewunderten es und sagten: „Wäre doch dieser Ziegelstein eingesetzt!“ Ich bin dieser Ziegelstein, und ich bin das Siegel der Propheten.",
            en: "My example and that of the prophets before me is like a man who built a house and made it beautiful and complete — except for the place of one brick in a corner. People walked around it, admired it and said: “If only this brick were put in place!” I am that brick, and I am the Seal of the Prophets.",
            tr: "Benim ve benden önceki peygamberlerin durumu, bir ev yapıp onu güzelleştiren ve tamamlayan, yalnızca bir köşesinde bir tuğlalık yer bırakan adamın durumu gibidir. İnsanlar evin etrafında dolaşır, beğenir ve “Şu tuğla da konulsaydı!” derler. İşte o tuğla benim ve ben peygamberlerin sonuncusuyum.",
          },
        },
        {
          type: 'note',
          variant: 'important',
          text: {
            de: "Dass nach Muhammad ﷺ kein Prophet mehr kommt, ist Konsens aller Muslime der sunnitischen Tradition. Die Wiederkehr Isas am Ende der Zeit (Lektion 7) ist keine neue Prophetenschaft: Er kommt als einer, der der Botschaft Muhammads ﷺ folgt.",
            en: "That no prophet comes after Muhammad ﷺ is the consensus of the Sunni tradition. The return of Isa at the end of time (lesson 7) is not a new prophethood: he comes as one who follows the message of Muhammad ﷺ.",
            tr: "Hz. Muhammed'den ﷺ sonra peygamber gelmeyeceği Sünni geleneğin icmaıdır. Hz. İsa'nın ahir zamanda inişi (7. ders) yeni bir peygamberlik değildir: O, Hz. Muhammed'in ﷺ getirdiği dine tabi olarak gelecektir.",
          },
        },
        { type: 'terms', ids: ['wahy', 'nabi', 'rasul', 'mujiza', 'isma', 'khatam', 'quran', 'jibril'] },
      ],
      quiz: [
        {
          question: {
            de: "Welche Wege der Offenbarung nennt Koran 42:51?",
            en: "Which ways of revelation does Quran 42:51 name?",
            tr: "Şûrâ 42:51 hangi vahiy yollarını sayar?",
          },
          options: [
            { de: "Eingebung, hinter einem Vorhang, durch einen gesandten Engel", en: "Inspiration, from behind a veil, through a sent angel", tr: "İlham (vahiy), perde arkasından, gönderilen bir melek aracılığıyla" },
            { de: "Nur durch Träume", en: "Only through dreams", tr: "Yalnızca rüya yoluyla" },
            { de: "Durch Wahrsager", en: "Through fortune-tellers", tr: "Kâhinler aracılığıyla" },
          ],
          answer: 0,
          explanation: {
            de: "Der Vers nennt genau diese drei Wege. Der häufigste Weg der Koranoffenbarung war der Engel Jibril.",
            en: "The verse names exactly these three ways. The most common channel of Quranic revelation was the angel Jibril.",
            tr: "Ayet tam olarak bu üç yolu sayar. Kur'an vahyinin en yaygın yolu Cebrail aracılığıyla olmuştur.",
          },
        },
        {
          question: {
            de: "Was gilt als das bleibende Wunder Muhammads ﷺ?",
            en: "What is regarded as the lasting miracle of Muhammad ﷺ?",
            tr: "Hz. Muhammed'in ﷺ kalıcı mucizesi nedir?",
          },
          options: [
            { de: "Der Koran", en: "The Quran", tr: "Kur'an" },
            { de: "Der Stab Musas", en: "The staff of Musa", tr: "Hz. Musa'nın asası" },
            { de: "Ein Gebäude in Mekka", en: "A building in Mecca", tr: "Mekke'deki bir bina" },
          ],
          answer: 0,
          explanation: {
            de: "Nach Bukhari 4981 war das Besondere, das ihm gegeben wurde, die Offenbarung selbst — der Koran, der bis heute gelesen wird.",
            en: "According to Bukhari 4981, what was special that he was given is revelation itself — the Quran, still read today.",
            tr: "Buhârî 4981'e göre ona verilen özel şey vahyin kendisidir — bugün hâlâ okunan Kur'an.",
          },
        },
        {
          question: {
            de: "Was veranschaulicht das Gleichnis vom fehlenden Ziegelstein?",
            en: "What does the parable of the missing brick illustrate?",
            tr: "Eksik tuğla benzetmesi neyi anlatır?",
          },
          options: [
            { de: "Dass die Kaaba unvollendet ist", en: "That the Kaaba is unfinished", tr: "Kâbe'nin tamamlanmadığını" },
            { de: "Dass Muhammad ﷺ das Prophetentum abschließt", en: "That Muhammad ﷺ completes prophethood", tr: "Hz. Muhammed'in ﷺ peygamberliği tamamladığını" },
            { de: "Dass noch viele Propheten kommen", en: "That many more prophets will come", tr: "Daha çok peygamber geleceğini" },
          ],
          answer: 1,
          explanation: {
            de: "Er ist der letzte „Ziegelstein“ im Haus des Prophetentums — das Siegel der Propheten (33:40).",
            en: "He is the last “brick” in the house of prophethood — the Seal of the Prophets (33:40).",
            tr: "O, peygamberlik binasının son “tuğlası”dır — peygamberlerin sonuncusu (33:40).",
          },
        },
      ],
      sources: [
        'Quran 42:51, 5:67, 20:121, 3:49, 2:23, 33:40',
        'Sahih al-Bukhari 2, Sahih Muslim 2333; Sahih al-Bukhari 3',
        'Sahih al-Bukhari 4981, Sahih Muslim 152',
        'Sahih al-Bukhari 3535, Sahih Muslim 2286',
        'Fünf Eigenschaften der Propheten: verbreitete Lehrbuch-Einteilung (z. B. Diyanet-Ilmihal)',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 7 ───────────────────────────────────────────────────────────
    {
      id: 'barzakh-and-signs',
      title: {
        de: 'Das Barzakh und die Zeichen der Stunde',
        en: 'The barzakh and the signs of the Hour',
        tr: 'Berzah ve kıyamet alametleri',
      },
      summary: {
        de: "Was zwischen Tod und Auferstehung geschieht und welche Zeichen der Stunde überliefert sind — belegt, ohne Spekulation und ohne Datumsrechnerei.",
        en: "What happens between death and resurrection and which signs of the Hour are transmitted — sourced, without speculation or date-setting.",
        tr: "Ölüm ile diriliş arasında olanlar ve bildirilen kıyamet alametleri — kaynaklı, spekülasyonsuz ve tarih tahmini yapmadan.",
      },
      minutes: 7,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Mit dem Tod endet das Leben auf der Erde, aber nicht die Existenz des Menschen. Zwischen Tod und Auferstehung liegt eine Zwischenwelt, die der Koran **Barzakh** nennt — „Schranke“.",
            en: "Death ends life on earth, but not a person's existence. Between death and resurrection lies an intermediate realm that the Quran calls **barzakh** — “barrier”.",
            tr: "Ölümle dünya hayatı sona erer, ama insanın varlığı sona ermez. Ölüm ile diriliş arasında Kur'an'ın **berzah** — “perde, engel” — dediği bir ara âlem vardır.",
          },
        },
        {
          type: 'quran',
          ref: '23:99-100',
          arabic: 'وَمِن وَرَائِهِم بَرْزَخٌ إِلَىٰ يَوْمِ يُبْعَثُونَ',
          translation: {
            de: "Wenn dann zu einem von ihnen der Tod kommt, sagt er: „Mein Herr, schicke mich zurück, auf dass ich rechtschaffen handle in dem, was ich unterlassen habe.“ Keineswegs! … Und hinter ihnen ist eine Schranke (Barzakh) bis zu dem Tag, an dem sie auferweckt werden.",
            en: "Until, when death comes to one of them, he says: “My Lord, send me back, that I might do righteousness in what I left behind.” No! … And behind them is a barrier (barzakh) until the Day they are resurrected.",
            tr: "Nihayet onlardan birine ölüm gelince: “Rabbim! Beni geri gönder, terk ettiğim dünyada salih amel işleyeyim” der. Hayır! … Önlerinde, diriltilecekleri güne kadar bir berzah vardır.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Befragung im Grab', en: 'The questioning in the grave', tr: 'Kabir sorgusu' },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1369, Sahih Muslim 2871',
          narrator: "al-Bara' ibn 'Azib",
          grade: 'sahih',
          text: {
            de: "Wenn der Gläubige in seinem Grab aufgesetzt wird, kommt (der Engel) zu ihm, und er bezeugt, dass es keinen Gott gibt außer Allah und dass Muhammad der Gesandte Allahs ist. Das ist (gemeint mit) Seinem Wort: „Allah festigt diejenigen, die glauben, mit dem festen Wort im diesseitigen Leben und im Jenseits“ (14:27).",
            en: "When the believer is made to sit up in his grave, (the angel) comes to him, and he testifies that there is no deity but Allah and that Muhammad is the Messenger of Allah. That is (meant by) His words: “Allah keeps firm those who believe with the firm word in worldly life and in the Hereafter” (14:27).",
            tr: "Mümin kabrinde oturtulduğunda (melek) ona gelir; o da Allah'tan başka ilah olmadığına ve Muhammed'in Allah'ın Resulü olduğuna şahitlik eder. İşte “Allah iman edenleri dünya hayatında ve ahirette sağlam sözle sabit kılar” (14:27) ayeti bunu anlatır.",
          },
        },
        {
          type: 'text',
          text: {
            de: "Längere Überlieferungen nennen drei Fragen: „Wer ist dein Herr? Was ist deine Religion? Wer ist dieser Mann, der unter euch gesandt wurde?“ In einem Hadith bei at-Tirmidhi werden die beiden fragenden Engel **Munkar** und **Nakir** genannt. Wer im Leben mit dem Tawhid vertraut war, dem schenkt Allah die Antwort.",
            en: "Longer narrations mention three questions: “Who is your Lord? What is your religion? Who is this man who was sent among you?” A hadith in at-Tirmidhi names the two questioning angels **Munkar** and **Nakir**. Whoever was familiar with tawhid in life, Allah grants the answer.",
            tr: "Daha uzun rivayetlerde üç soru geçer: “Rabbin kim? Dinin ne? Aranızda gönderilen bu adam kim?” Tirmizî'deki bir hadiste sorgulayan iki melek **Münker** ve **Nekir** diye anılır. Hayatında tevhidle yaşayana Allah cevabı nasip eder.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 588',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Wenn einer von euch das letzte Taschahhud beendet hat, soll er bei Allah Zuflucht suchen vor vier Dingen: vor der Strafe der Hölle, vor der Strafe des Grabes, vor der Versuchung des Lebens und des Todes und vor dem Übel der Versuchung des Daddschal.",
            en: "When one of you has finished the last tashahhud, let him seek refuge with Allah from four things: from the punishment of Hell, from the punishment of the grave, from the trials of life and death, and from the evil of the trial of the Dajjal.",
            tr: "Biriniz son teşehhüdü bitirince dört şeyden Allah'a sığınsın: cehennem azabından, kabir azabından, hayatın ve ölümün fitnesinden ve Deccal'in fitnesinin şerrinden.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Die sunnitischen Schulen sind sich einig, dass es im Grab Ruhe und Bedrängnis gibt. Wie genau Seele und Körper daran teilhaben, beschreiben Gelehrte unterschiedlich; viele sagen, beide in einer Weise, die wir nicht wahrnehmen. Es gehört zum Verborgenen, das nicht mit irdischen Maßstäben gemessen wird.",
            en: "The Sunni schools agree that there is peace and distress in the grave. How exactly soul and body share in it is described differently; many say both, in a way we do not perceive. It belongs to the unseen, which is not measured by earthly standards.",
            tr: "Sünni ekoller kabirde huzur ve azap olduğunda birleşir. Ruh ve bedenin buna tam olarak nasıl katıldığını âlimler farklı anlatır; birçoğu, ikisinin de bizim algılamadığımız bir şekilde katıldığını söyler. Bu, dünyevi ölçülerle ölçülemeyen gayba aittir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Zeichen der Stunde', en: 'The signs of the Hour', tr: 'Kıyamet alametleri' },
        },
        {
          type: 'quran',
          ref: '7:187',
          translation: {
            de: "Sie fragen dich nach der Stunde, wann sie feststehen wird. Sag: Das Wissen darüber ist nur bei meinem Herrn. Nur Er wird sie zu ihrer Zeit erscheinen lassen …",
            en: "They ask you about the Hour: when will it arrive? Say: Its knowledge is only with my Lord. None will reveal it at its time except Him …",
            tr: "Sana kıyametin ne zaman gelip çatacağını soruyorlar. De ki: Onun bilgisi yalnızca Rabbimin katındadır. Onu vaktinde ancak O ortaya çıkarır …",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 8 (Hadith Jibril)',
          narrator: "'Umar ibn al-Khattab",
          grade: 'sahih',
          text: {
            de: "„Berichte mir über die Stunde.“ Er sagte: „Der Gefragte weiß darüber nicht mehr als der Fragende.“ — „Dann berichte mir über ihre Zeichen.“ Er sagte: „Dass die Sklavin ihre Herrin gebiert und dass du die barfüßigen, unbekleideten, mittellosen Hirten miteinander im Bau hoher Gebäude wetteifern siehst.“ (Auszug)",
            en: "“Tell me about the Hour.” He said: “The one asked knows no more about it than the one asking.” — “Then tell me about its signs.” He said: “That the slave-woman gives birth to her mistress, and that you see barefoot, unclothed, destitute shepherds competing in constructing tall buildings.” (excerpt)",
            tr: "“Bana kıyameti haber ver.” Buyurdu: “Bu konuda sorulan, sorandan daha bilgili değildir.” — “O hâlde alametlerini haber ver.” Buyurdu: “Cariyenin efendisini doğurması ve yalınayak, çıplak, yoksul çobanların yüksek binalar yapmakta yarıştıklarını görmendir.” (özet)",
          },
        },
        {
          type: 'text',
          text: {
            de: "Die Gelehrten unterscheiden **kleine Zeichen**, die sich über lange Zeit zeigen (wie die im Hadith Jibril genannten), und **große Zeichen** unmittelbar vor der Stunde. Zu den großen zählt ein Hadith in Sahih Muslim (2901) zehn Zeichen:",
            en: "Scholars distinguish **minor signs**, which appear over a long period (like those in the Hadith of Jibril), and **major signs** immediately before the Hour. A hadith in Sahih Muslim (2901) lists ten major signs:",
            tr: "Âlimler uzun zaman içinde görülen **küçük alametler** (Cibril Hadisi'ndekiler gibi) ile kıyametten hemen önceki **büyük alametleri** ayırt eder. Müslim'deki (2901) bir hadis on büyük alamet sayar:",
          },
        },
        {
          type: 'list',
          items: [
            { de: "der Rauch (Dukhan)", en: "the smoke (dukhan)", tr: "duman (duhân)" },
            { de: "der Daddschal", en: "the Dajjal", tr: "Deccal" },
            { de: "das Tier (Dabba)", en: "the beast (dabbah)", tr: "dâbbetü'l-arz" },
            { de: "der Aufgang der Sonne im Westen", en: "the rising of the sun from the west", tr: "güneşin batıdan doğması" },
            { de: "die Herabkunft Isas, des Sohnes der Maryam", en: "the descent of Isa, son of Maryam", tr: "Hz. İsa'nın inişi" },
            { de: "Ya'dschudsch und Ma'dschudsch (Gog und Magog)", en: "Ya'juj and Ma'juj (Gog and Magog)", tr: "Ye'cüc ve Me'cüc" },
            { de: "drei Erdeinbrüche — im Osten, im Westen und auf der Arabischen Halbinsel", en: "three landslides — in the east, in the west and in the Arabian Peninsula", tr: "üç yere batma — doğuda, batıda ve Arap Yarımadası'nda" },
            { de: "ein Feuer aus dem Jemen, das die Menschen zu ihrem Versammlungsort treibt", en: "a fire from Yemen that drives people to their place of gathering", tr: "Yemen'den çıkıp insanları toplanma yerlerine sürecek bir ateş" },
          ],
        },
        {
          type: 'text',
          text: {
            de: "Viele Gelehrte zählen auch das Erscheinen des **Mahdi** zu den Zeichen, gestützt auf Überlieferungen außerhalb von Bukhari und Muslim (z. B. bei Abu Dawud). Im Lauf der Geschichte haben sich immer wieder Menschen fälschlich als Mahdi ausgegeben — ein Grund mehr für Nüchternheit.",
            en: "Many scholars also count the appearance of the **Mahdi** among the signs, based on narrations outside Bukhari and Muslim (e.g. in Abu Dawud). Throughout history people have repeatedly falsely claimed to be the Mahdi — one more reason for sobriety.",
            tr: "Birçok âlim, Buhârî ve Müslim dışındaki rivayetlere (ör. Ebû Dâvûd) dayanarak **Mehdî**'nin zuhurunu da alametlerden sayar. Tarih boyunca pek çok kişi kendini yalan yere Mehdî ilan etmiştir — sükûnetli olmak için bir sebep daha.",
          },
        },
        {
          type: 'note',
          variant: 'important',
          text: {
            de: "Den Zeitpunkt der Stunde kennt allein Allah. Wer Daten berechnet oder aktuelle Ereignisse, Personen oder Staaten zu „Zeichen“ erklärt, geht über das Wissen hinaus, das uns gegeben wurde. Der Prophet ﷺ lenkte die Frage nach dem „Wann“ auf das, was zählt:",
            en: "Only Allah knows when the Hour will come. Whoever calculates dates or declares current events, people or states to be “signs” goes beyond the knowledge we have been given. The Prophet ﷺ redirected the question of “when” to what matters:",
            tr: "Kıyametin vaktini yalnızca Allah bilir. Tarih hesaplayan veya güncel olayları, kişileri, devletleri “alamet” ilan eden, bize verilen bilginin ötesine geçer. Peygamber ﷺ “ne zaman” sorusunu asıl önemli olana yöneltmiştir:",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 6171, Sahih Muslim 2639',
          narrator: 'Anas ibn Malik',
          grade: 'sahih',
          text: {
            de: "Ein Mann fragte den Propheten ﷺ: „Wann ist die Stunde?“ Er sagte: „Was hast du für sie vorbereitet?“ Der Mann sagte: „Nichts, außer dass ich Allah und Seinen Gesandten liebe.“ Er sagte: „Du bist mit denen, die du liebst.“",
            en: "A man asked the Prophet ﷺ: “When is the Hour?” He said: “What have you prepared for it?” The man said: “Nothing, except that I love Allah and His Messenger.” He said: “You will be with those you love.”",
            tr: "Bir adam Peygamber'e ﷺ “Kıyamet ne zaman?” diye sordu. “Onun için ne hazırladın?” buyurdu. Adam “Hiçbir şey; yalnız Allah'ı ve Resulü'nü seviyorum” dedi. Buyurdu: “Sen sevdiklerinle berabersin.”",
          },
        },
        { type: 'terms', ids: ['barzakh', 'ashrat-as-saah', 'dajjal', 'ghayb', 'akhirah', 'yawm-al-qiyamah'] },
      ],
      quiz: [
        {
          question: {
            de: "Was bezeichnet das Wort „Barzakh“?",
            en: "What does the word “barzakh” refer to?",
            tr: "“Berzah” kelimesi neyi ifade eder?",
          },
          options: [
            { de: "Die Zwischenwelt zwischen Tod und Auferstehung", en: "The intermediate realm between death and resurrection", tr: "Ölüm ile diriliş arasındaki ara âlem" },
            { de: "Einen Berg in Mekka", en: "A mountain in Mecca", tr: "Mekke'de bir dağ" },
            { de: "Das Paradies", en: "Paradise", tr: "Cennet" },
          ],
          answer: 0,
          explanation: {
            de: "„… hinter ihnen ist eine Schranke (Barzakh) bis zu dem Tag, an dem sie auferweckt werden“ (23:100).",
            en: "“… behind them is a barrier (barzakh) until the Day they are resurrected” (23:100).",
            tr: "“… Önlerinde, diriltilecekleri güne kadar bir berzah vardır” (23:100).",
          },
        },
        {
          question: {
            de: "Wer kennt den Zeitpunkt der Stunde?",
            en: "Who knows when the Hour will come?",
            tr: "Kıyametin vaktini kim bilir?",
          },
          options: [
            { de: "Gelehrte, die die Zeichen berechnen", en: "Scholars who calculate the signs", tr: "Alametleri hesaplayan âlimler" },
            { de: "Allein Allah", en: "Allah alone", tr: "Yalnızca Allah" },
            { de: "Der Engel Jibril", en: "The angel Jibril", tr: "Cebrail" },
          ],
          answer: 1,
          explanation: {
            de: "„Das Wissen darüber ist nur bei meinem Herrn“ (7:187). Selbst im Hadith Jibril heißt es: „Der Gefragte weiß darüber nicht mehr als der Fragende.“",
            en: "“Its knowledge is only with my Lord” (7:187). Even in the Hadith of Jibril: “The one asked knows no more about it than the one asking.”",
            tr: "“Onun bilgisi yalnızca Rabbimin katındadır” (7:187). Cibril Hadisi'nde de: “Bu konuda sorulan, sorandan daha bilgili değildir.”",
          },
        },
        {
          question: {
            de: "Wie antwortete der Prophet ﷺ auf die Frage „Wann ist die Stunde?“",
            en: "How did the Prophet ﷺ answer the question “When is the Hour?”",
            tr: "Peygamber ﷺ “Kıyamet ne zaman?” sorusuna nasıl cevap verdi?",
          },
          options: [
            { de: "Er nannte ein Jahr", en: "He named a year", tr: "Bir yıl söyledi" },
            { de: "„Was hast du für sie vorbereitet?“", en: "“What have you prepared for it?”", tr: "“Onun için ne hazırladın?”" },
            { de: "Er schwieg und ging weg", en: "He was silent and left", tr: "Susup gitti" },
          ],
          answer: 1,
          explanation: {
            de: "Statt zu spekulieren, lenkte er den Blick auf die eigene Vorbereitung (Bukhari 6171, Muslim 2639).",
            en: "Instead of speculating, he turned attention to one's own preparation (Bukhari 6171, Muslim 2639).",
            tr: "Spekülasyon yerine dikkati kişinin kendi hazırlığına çevirdi (Buhârî 6171, Müslim 2639).",
          },
        },
        {
          question: {
            de: "Welches der folgenden gehört nach Sahih Muslim 2901 zu den großen Zeichen?",
            en: "Which of the following is among the major signs according to Sahih Muslim 2901?",
            tr: "Müslim 2901'e göre aşağıdakilerden hangisi büyük alametlerdendir?",
          },
          options: [
            { de: "Der Aufgang der Sonne im Westen", en: "The rising of the sun from the west", tr: "Güneşin batıdan doğması" },
            { de: "Eine Sonnenfinsternis in einem bestimmten Jahr", en: "A solar eclipse in a certain year", tr: "Belirli bir yıldaki güneş tutulması" },
            { de: "Die Erfindung des Internets", en: "The invention of the internet", tr: "İnternetin icadı" },
          ],
          answer: 0,
          explanation: {
            de: "Die zehn großen Zeichen sind in Sahih Muslim 2901 aufgezählt. Aktuelle Ereignisse zu „Zeichen“ zu erklären, ist Spekulation.",
            en: "The ten major signs are listed in Sahih Muslim 2901. Declaring current events to be “signs” is speculation.",
            tr: "On büyük alamet Müslim 2901'de sayılmıştır. Güncel olayları “alamet” ilan etmek spekülasyondur.",
          },
        },
      ],
      sources: [
        'Quran 23:99-100, 14:27, 7:187',
        'Sahih al-Bukhari 1369, Sahih Muslim 2871',
        'Sahih Muslim 588, Sahih Muslim 8, Sahih Muslim 2901',
        'Sahih al-Bukhari 6171, Sahih Muslim 2639',
        'Drei Fragen im Grab: längerer Hadith des al-Bara\' ibn \'Azib (u. a. Sunan Abi Dawud 4753); Munkar und Nakir: Sunan at-Tirmidhi 1071 (hasan) — Nummern zu prüfen',
        'Mahdi: Überlieferungen u. a. in Sunan Abi Dawud (Kitab al-Mahdi)',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 8 ───────────────────────────────────────────────────────────
    {
      id: 'resurrection-and-judgement',
      title: {
        de: 'Auferstehung, Abrechnung, Waage, Brücke, Fürsprache',
        en: 'Resurrection, reckoning, scale, bridge, intercession',
        tr: 'Diriliş, hesap, mizan, sırat, şefaat',
      },
      summary: {
        de: "Die Stationen des Tages der Auferstehung, wie Koran und authentische Sunna sie beschreiben — und was sie für unser Leben heute bedeuten.",
        en: "The stations of the Day of Resurrection as described by the Quran and authentic Sunnah — and what they mean for our lives today.",
        tr: "Kur'an ve sahih sünnetin anlattığı şekliyle kıyamet gününün durakları — ve bugünkü hayatımız için anlamları.",
      },
      minutes: 8,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Der Jüngste Tag ist im Islam kein einzelner Augenblick, sondern ein Geschehen mit mehreren Stationen. Die Gelehrten nennen — gestützt auf Koran und Sunna — unter anderem:",
            en: "In Islam the Last Day is not a single moment but an event with several stations. Based on the Quran and Sunnah, scholars name among others:",
            tr: "İslam'da kıyamet günü tek bir an değil, birçok duraktan oluşan bir süreçtir. Âlimler Kur'an ve sünnete dayanarak şunları sayar:",
          },
        },
        {
          type: 'list',
          items: [
            { de: "der Stoß in das Horn und die **Auferstehung** (39:68)", en: "the blowing of the Horn and the **resurrection** (39:68)", tr: "Sûr'a üfürülmesi ve **diriliş** (ba's, 39:68)" },
            { de: "die **Versammlung** aller Menschen", en: "the **gathering** of all people", tr: "bütün insanların **toplanması** (haşir)" },
            { de: "das **Buch der Taten** und die **Abrechnung**", en: "the **book of deeds** and the **reckoning**", tr: "**amel defterleri** ve **hesap**" },
            { de: "die **Waage** (Mizan)", en: "the **scale** (mizan)", tr: "**mizan**" },
            { de: "die **Brücke** (Sirat)", en: "the **bridge** (sirat)", tr: "**sırat**" },
            { de: "die **Fürsprache** (Schafa'a) und das **Becken** (Hawd) des Propheten ﷺ", en: "the **intercession** (shafa'ah) and the **pool** (hawd) of the Prophet ﷺ", tr: "**şefaat** ve Peygamber'in ﷺ **havzı**" },
          ],
        },
        {
          type: 'heading',
          text: { de: 'Die Auferstehung', en: 'The resurrection', tr: 'Diriliş' },
        },
        {
          type: 'quran',
          ref: '36:78-79',
          arabic: 'قُلْ يُحْيِيهَا الَّذِي أَنشَأَهَا أَوَّلَ مَرَّةٍ',
          translation: {
            de: "Er sagt: „Wer macht die Knochen wieder lebendig, wenn sie zerfallen sind?“ Sag: Wieder lebendig macht sie Derjenige, der sie das erste Mal hat entstehen lassen, und Er weiß über jede Schöpfung Bescheid.",
            en: "He says: “Who will give life to bones while they are disintegrated?” Say: He will give them life who produced them the first time; and He is, of all creation, Knowing.",
            tr: "“Çürümüş kemikleri kim diriltecek?” dedi. De ki: Onları ilk defa yaratan diriltecek. O her türlü yaratmayı hakkıyla bilendir.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 6527, Sahih Muslim 2859',
          narrator: "'Aisha",
          grade: 'sahih',
          text: {
            de: "Ihr werdet barfuß, unbekleidet und unbeschnitten versammelt. ('Aisha fragte, ob Männer und Frauen einander dann ansehen würden.) Er sagte: „Die Lage ist zu ernst, als dass sie darauf achten würden.“",
            en: "You will be gathered barefoot, unclothed and uncircumcised. ('Aisha asked whether men and women would then look at one another.) He said: “The matter will be too grave for them to pay attention to that.”",
            tr: "Yalınayak, çıplak ve sünnetsiz olarak haşrolunacaksınız. (Hz. Âişe, erkek ve kadınların birbirine bakıp bakmayacağını sordu.) Buyurdu: “Durum, buna dikkat edemeyecekleri kadar çetindir.”",
          },
        },
        {
          type: 'heading',
          text: { de: 'Das Buch und die Abrechnung', en: 'The book and the reckoning', tr: 'Amel defteri ve hesap' },
        },
        {
          type: 'quran',
          ref: '17:13-14',
          arabic: 'اقْرَأْ كِتَابَكَ كَفَىٰ بِنَفْسِكَ الْيَوْمَ عَلَيْكَ حَسِيبًا',
          translation: {
            de: "… Und am Tag der Auferstehung bringen Wir ihm ein Buch heraus, das er aufgerollt vorfindet: „Lies dein Buch! Du selbst genügst heute als Abrechner gegen dich.“",
            en: "… And on the Day of Resurrection We will produce for him a record which he will find spread open: “Read your record. Sufficient is yourself against you this Day as accountant.”",
            tr: "… Kıyamet günü onun için açılmış olarak bulacağı bir kitap çıkarırız: “Kitabını oku! Bugün hesap sorucu olarak sana kendin yetersin.”",
          },
        },
        {
          type: 'text',
          text: {
            de: "Für manche wird die Abrechnung leicht sein: „Was nun denjenigen angeht, dem sein Buch in seine Rechte gegeben wird, mit ihm wird leicht abgerechnet, und er kehrt erfreut zu seinen Angehörigen zurück“ (84:7–9).",
            en: "For some the reckoning will be easy: “As for him who is given his record in his right hand, he will be judged with an easy account and will return to his people happy” (84:7–9).",
            tr: "Bazıları için hesap kolay olacaktır: “Kitabı sağından verilen kolay bir hesapla hesaba çekilecek ve ailesine sevinçle dönecektir” (84:7–9).",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Waage (Mizan)', en: 'The scale (mizan)', tr: 'Mizan' },
        },
        {
          type: 'quran',
          ref: '21:47',
          arabic: 'وَنَضَعُ الْمَوَازِينَ الْقِسْطَ لِيَوْمِ الْقِيَامَةِ فَلَا تُظْلَمُ نَفْسٌ شَيْئًا',
          translation: {
            de: "Und Wir stellen die gerechten Waagen für den Tag der Auferstehung auf, so dass keiner Seele in irgendetwas Unrecht zugefügt wird. Und wäre es auch das Gewicht eines Senfkorns, Wir bringen es bei …",
            en: "And We place the scales of justice for the Day of Resurrection, so no soul will be treated unjustly at all. And if there is (even) the weight of a mustard seed, We will bring it forth …",
            tr: "Kıyamet günü için adalet terazileri kurarız. Artık hiç kimseye hiçbir haksızlık edilmez. Hardal tanesi ağırlığınca bile olsa onu getiririz …",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 6406, Sahih Muslim 2694',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Zwei Worte sind leicht auf der Zunge, schwer auf der Waage und dem Allerbarmer lieb: „Subhana-llahi wa bi-hamdihi, subhana-llahi l-'azim.“",
            en: "Two words are light on the tongue, heavy on the scale and beloved to the Most Merciful: “Subhana-llahi wa bi-hamdihi, subhana-llahi l-'azim.”",
            tr: "İki kelime vardır ki dile hafif, mizanda ağır, Rahmân'a sevimlidir: “Sübhânallâhi ve bi-hamdihî, sübhânallâhi'l-azîm.”",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Brücke (Sirat)', en: 'The bridge (sirat)', tr: 'Sırat' },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 7439, Sahih Muslim 183',
          narrator: "Abu Sa'id al-Khudri",
          grade: 'sahih',
          text: {
            de: "… Dann wird die Brücke über die Hölle gelegt … Die Gläubigen gehen darüber hinweg — manche wie ein Wimpernschlag, manche wie der Blitz, wie der Wind, wie schnelle Pferde und Reittiere … (Auszug)",
            en: "… Then the bridge will be set over Hell … The believers will cross it — some like the blink of an eye, some like lightning, like the wind, like swift horses and mounts … (excerpt)",
            tr: "… Sonra köprü cehennemin üzerine kurulur … Müminler onun üzerinden geçer — kimi göz açıp kapayıncaya kadar, kimi şimşek gibi, rüzgâr gibi, hızlı atlar ve binekler gibi … (özet)",
          },
        },
        {
          type: 'text',
          text: {
            de: "Die Geschwindigkeit auf der Brücke hängt nach diesen Überlieferungen von den Taten ab. Die Botschaft für heute: Jede gute Tat, jedes Gebet, jede Geduld erleichtert den Weg.",
            en: "According to these narrations, speed on the bridge depends on one's deeds. The message for today: every good deed, every prayer, every act of patience eases the way.",
            tr: "Bu rivayetlere göre sırattaki hız amellere bağlıdır. Bugün için mesaj: Her iyi amel, her namaz, her sabır yolu kolaylaştırır.",
          },
        },
        {
          type: 'heading',
          text: { de: "Die Fürsprache (Schafa'a)", en: "Intercession (shafa'ah)", tr: 'Şefaat' },
        },
        {
          type: 'quran',
          ref: '2:255',
          arabic: 'مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ',
          translation: {
            de: "… Wer ist es denn, der bei Ihm Fürsprache einlegen könnte, außer mit Seiner Erlaubnis? … (aus dem Thronvers)",
            en: "… Who is it that can intercede with Him except by His permission? … (from the Verse of the Throne)",
            tr: "… İzni olmadan O'nun katında kim şefaat edebilir? … (Âyetü'l-Kürsî'den)",
          },
        },
        {
          type: 'text',
          text: {
            de: "Fürsprache geschieht also nur mit Allahs Erlaubnis. Nach authentischen Hadithen gehen die Menschen in der Not jenes Tages zu Adam, Nuh, Ibrahim, Musa und Isa — und schließlich zu Muhammad ﷺ, der sich niederwirft und für alle Fürsprache einlegt, damit das Gericht beginnt (Sahih al-Bukhari 4712, Sahih Muslim 194). Daneben gibt es die Fürsprache für Gläubige, die gesündigt haben; mit Allahs Erlaubnis legen auch andere Propheten, Engel und Gläubige Fürsprache ein.",
            en: "Intercession thus happens only with Allah's permission. According to authentic hadith, in the distress of that day people go to Adam, Nuh, Ibrahim, Musa and Isa — and finally to Muhammad ﷺ, who prostrates and intercedes for all so that the judgement may begin (Sahih al-Bukhari 4712, Sahih Muslim 194). There is also intercession for believers who sinned; with Allah's permission other prophets, angels and believers intercede as well.",
            tr: "Şefaat ancak Allah'ın izniyle olur. Sahih hadislere göre o günün sıkıntısında insanlar Hz. Âdem, Nuh, İbrahim, Musa ve İsa'ya, en sonunda da Hz. Muhammed'e ﷺ gider; o secdeye kapanır ve hesabın başlaması için herkese şefaat eder (Buhârî 4712, Müslim 194). Ayrıca günah işlemiş müminler için şefaat vardır; Allah'ın izniyle diğer peygamberler, melekler ve müminler de şefaat eder.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 99',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Der glücklichste Mensch mit meiner Fürsprache am Tag der Auferstehung ist, wer „La ilaha illa-llah“ aufrichtig aus seinem Herzen gesagt hat.",
            en: "The happiest of people with my intercession on the Day of Resurrection is the one who said “La ilaha illa-llah” sincerely from his heart.",
            tr: "Kıyamet günü şefaatime en çok nail olacak kişi, “Lâ ilâhe illallah” sözünü kalbinden ihlasla söyleyendir.",
          },
        },
        {
          type: 'text',
          text: {
            de: "Zu den überlieferten Gnaden jenes Tages gehört auch das **Becken (Hawd)** des Propheten ﷺ, aus dem seine Gemeinde trinkt; viele Gelehrte verbinden es mit al-Kawthar (108:1).",
            en: "Among the transmitted mercies of that day is also the **pool (hawd)** of the Prophet ﷺ, from which his community will drink; many scholars connect it with al-Kawthar (108:1).",
            tr: "O günün bildirilen ikramlarından biri de ümmetinin su içeceği Peygamber'in ﷺ **havzı**dır; birçok âlim onu Kevser'le (108:1) ilişkilendirir.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Über Einzelheiten — etwa die genaue Reihenfolge der Stationen oder ob es eine oder mehrere Waagen gibt — äußern sich Gelehrte unterschiedlich. Gemeinsam ist allen sunnitischen Schulen: Auferstehung, Abrechnung, Waage, Brücke, Becken und Fürsprache sind wirklich; ihr „Wie“ kennt Allah.",
            en: "On details — such as the exact order of the stations or whether there is one scale or several — scholars express different views. Common to all Sunni schools: resurrection, reckoning, scale, bridge, pool and intercession are real; their “how” is known to Allah.",
            tr: "Ayrıntılar hakkında — durakların tam sırası veya bir mi yoksa birden fazla mı mizan olduğu gibi — âlimler farklı görüşler bildirir. Bütün Sünni ekollerin ortak kanaati: Diriliş, hesap, mizan, sırat, havz ve şefaat gerçektir; “nasıl”ını Allah bilir.",
          },
        },
        { type: 'terms', ids: ['yawm-al-qiyamah', 'akhirah', 'mizan', 'sirat', 'shafaa', 'hawd'] },
      ],
      quiz: [
        {
          question: {
            de: "Wie antwortet Koran 36:79 auf die Frage, wer die zerfallenen Knochen wieder lebendig macht?",
            en: "How does Quran 36:79 answer the question of who will revive the decayed bones?",
            tr: "Yâsîn 36:79, çürümüş kemikleri kimin dirilteceği sorusuna nasıl cevap verir?",
          },
          options: [
            { de: "Niemand kann das", en: "No one can", tr: "Kimse yapamaz" },
            { de: "Derjenige, der sie das erste Mal erschaffen hat", en: "The One who created them the first time", tr: "Onları ilk defa yaratan" },
            { de: "Die Engel aus eigener Kraft", en: "The angels by their own power", tr: "Melekler kendi güçleriyle" },
          ],
          answer: 1,
          explanation: {
            de: "Wer etwas aus dem Nichts erschaffen hat, kann es erst recht wiedererschaffen.",
            en: "The One who created something from nothing can all the more re-create it.",
            tr: "Bir şeyi yoktan yaratan, onu yeniden yaratmaya elbette kadirdir.",
          },
        },
        {
          question: {
            de: "Welche zwei Worte sind nach Bukhari 6406 „schwer auf der Waage“?",
            en: "Which two phrases are “heavy on the scale” according to Bukhari 6406?",
            tr: "Buhârî 6406'ya göre “mizanda ağır” olan iki söz hangisidir?",
          },
          options: [
            { de: "„Subhana-llahi wa bi-hamdihi, subhana-llahi l-'azim“", en: "“Subhana-llahi wa bi-hamdihi, subhana-llahi l-'azim”", tr: "“Sübhânallâhi ve bi-hamdihî, sübhânallâhi'l-azîm”" },
            { de: "„Guten Morgen“ und „Gute Nacht“", en: "“Good morning” and “good night”", tr: "“Günaydın” ve “iyi geceler”" },
            { de: "Jedes beliebige Wort", en: "Any words at all", tr: "Herhangi iki kelime" },
          ],
          answer: 0,
          explanation: {
            de: "Leicht auf der Zunge, schwer auf der Waage und dem Allerbarmer lieb — ein einfacher Dhikr mit großem Gewicht.",
            en: "Light on the tongue, heavy on the scale and beloved to the Most Merciful — a simple dhikr with great weight.",
            tr: "Dile hafif, mizanda ağır, Rahmân'a sevimli — büyük değeri olan basit bir zikir.",
          },
        },
        {
          question: {
            de: "Unter welcher Bedingung geschieht Fürsprache (Schafa'a)?",
            en: "Under what condition does intercession (shafa'ah) take place?",
            tr: "Şefaat hangi şartla gerçekleşir?",
          },
          options: [
            { de: "Nur mit Allahs Erlaubnis", en: "Only with Allah's permission", tr: "Yalnızca Allah'ın izniyle" },
            { de: "Gegen Bezahlung", en: "In exchange for payment", tr: "Ücret karşılığında" },
            { de: "Ohne jede Bedingung für alle", en: "Unconditionally for everyone", tr: "Herkes için şartsız olarak" },
          ],
          answer: 0,
          explanation: {
            de: "„Wer ist es denn, der bei Ihm Fürsprache einlegen könnte, außer mit Seiner Erlaubnis?“ (2:255)",
            en: "“Who is it that can intercede with Him except by His permission?” (2:255)",
            tr: "“İzni olmadan O'nun katında kim şefaat edebilir?” (2:255)",
          },
        },
      ],
      sources: [
        'Quran 39:68, 36:78-79, 17:13-14, 84:7-9, 21:47, 2:255, 108:1',
        'Sahih al-Bukhari 6527, Sahih Muslim 2859',
        'Sahih al-Bukhari 6406, Sahih Muslim 2694',
        'Sahih al-Bukhari 7439, Sahih Muslim 183',
        'Sahih al-Bukhari 4712, Sahih Muslim 194; Sahih al-Bukhari 99',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 9 ───────────────────────────────────────────────────────────
    {
      id: 'paradise-and-hell',
      title: {
        de: 'Paradies und Hölle — Barmherzigkeit und Gerechtigkeit',
        en: 'Paradise and Hell — mercy and justice',
        tr: 'Cennet ve cehennem — rahmet ve adalet',
      },
      summary: {
        de: "Was über Paradies und Hölle überliefert ist, warum Allahs Barmherzigkeit Seinen Zorn überwiegt und wie Gläubige zwischen Hoffnung und Furcht leben.",
        en: "What is transmitted about Paradise and Hell, why Allah's mercy prevails over His wrath, and how believers live between hope and fear.",
        tr: "Cennet ve cehennem hakkında bildirilenler, Allah'ın rahmetinin neden gazabını geçtiği ve müminlerin ümit ile korku arasında nasıl yaşadığı.",
      },
      minutes: 7,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Paradies und Hölle sind im Islam keine Bilder, sondern Wirklichkeiten des Jenseits. Wer über sie spricht, sollte mit Allahs Barmherzigkeit beginnen — so wie Allah selbst sie betont:",
            en: "In Islam, Paradise and Hell are not metaphors but realities of the Hereafter. Whoever speaks about them should begin with Allah's mercy — just as Allah Himself emphasises it:",
            tr: "İslam'da cennet ve cehennem birer temsil değil, ahiretin gerçekleridir. Onlardan söz eden, Allah'ın kendisinin vurguladığı gibi, O'nun rahmetiyle başlamalıdır:",
          },
        },
        {
          type: 'quran',
          ref: '7:156',
          arabic: 'وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ',
          translation: {
            de: "… Er sagte: „Mit Meiner Strafe treffe Ich, wen Ich will. Doch Meine Barmherzigkeit umfasst alle Dinge. Ich werde sie für diejenigen bestimmen, die gottesfürchtig sind, die Abgabe entrichten und die an Unsere Zeichen glauben.“",
            en: "… He said: “My punishment — I afflict with it whom I will, but My mercy encompasses all things. So I will decree it for those who fear Me, give zakah and believe in Our signs.”",
            tr: "… Allah buyurdu: “Azabımı dilediğime isabet ettiririm. Rahmetim ise her şeyi kuşatmıştır. Onu, sakınanlara, zekâtı verenlere ve ayetlerimize iman edenlere yazacağım.”",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 3194, Sahih Muslim 2751',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Als Allah die Schöpfung erschuf, schrieb Er in Seinem Buch, das bei Ihm über dem Thron ist: „Meine Barmherzigkeit überwiegt Meinen Zorn.“",
            en: "When Allah created the creation, He wrote in His Book, which is with Him above the Throne: “My mercy prevails over My wrath.”",
            tr: "Allah yaratmayı tamamlayınca, Arş'ın üstünde, katındaki kitabına şunu yazdı: “Rahmetim gazabımı geçmiştir.”",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 6000, Sahih Muslim 2752',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Allah hat die Barmherzigkeit in hundert Teile geteilt. Neunundneunzig Teile hat Er bei Sich behalten und einen Teil auf die Erde herabgesandt. Durch diesen einen Teil erbarmen sich die Geschöpfe einander — sogar das Pferd hebt seinen Huf von seinem Fohlen, aus Sorge, es zu verletzen.",
            en: "Allah divided mercy into one hundred parts. He kept ninety-nine parts with Himself and sent down one part to the earth. Through that one part creatures show mercy to one another — even the horse lifts its hoof away from its foal, fearing to hurt it.",
            tr: "Allah rahmeti yüz parça yaptı. Doksan dokuzunu kendi katında tuttu, bir parçasını yeryüzüne indirdi. Yaratıklar o tek parça sayesinde birbirlerine merhamet eder — öyle ki at, yavrusuna zarar vermekten korkarak ayağını ondan kaldırır.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Das Paradies', en: 'Paradise', tr: 'Cennet' },
        },
        {
          type: 'quran',
          ref: '32:17',
          translation: {
            de: "Keine Seele weiß, was für sie an Freude der Augen verborgen gehalten wird, als Lohn für das, was sie zu tun pflegten.",
            en: "No soul knows what has been hidden for them of comfort for eyes as reward for what they used to do.",
            tr: "Yaptıklarına karşılık olarak onlar için gözleri aydınlatacak nelerin saklandığını hiç kimse bilemez.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 3244, Sahih Muslim 2824',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Allah sagt: „Ich habe für Meine rechtschaffenen Diener bereitet, was kein Auge gesehen, kein Ohr gehört hat und was keinem Menschen je in den Sinn gekommen ist.“",
            en: "Allah says: “I have prepared for My righteous servants what no eye has seen, no ear has heard, and what has never occurred to a human heart.”",
            tr: "Allah buyurur: “Salih kullarım için hiçbir gözün görmediği, hiçbir kulağın işitmediği ve hiçbir insanın aklından geçmeyen şeyler hazırladım.”",
          },
        },
        {
          type: 'text',
          text: {
            de: "Die größte Wonne des Paradieses ist nach Koran und Sunna, Allah zu sehen: „Gesichter werden an jenem Tag strahlen, zu ihrem Herrn schauend“ (75:22–23). Alle drei sunnitischen Schulen bejahen dieses Sehen — ohne Vergleich und ohne „Wie“.",
            en: "According to the Quran and Sunnah, the greatest bliss of Paradise is seeing Allah: “Faces that Day will be radiant, looking at their Lord” (75:22–23). All three Sunni schools affirm this vision — without comparison and without “how”.",
            tr: "Kur'an ve sünnete göre cennetin en büyük nimeti Allah'ı görmektir (rü'yetullah): “O gün bazı yüzler parıldar, Rablerine bakar” (75:22–23). Üç Sünni ekol de bu görmeyi — benzetmeden ve keyfiyetsiz olarak — kabul eder.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 554, Sahih Muslim 633',
          narrator: 'Jarir ibn Abdillah',
          grade: 'sahih',
          text: {
            de: "Ihr werdet euren Herrn sehen, so wie ihr diesen Mond seht, ohne dass ihr euch beim Sehen bedrängen müsst. (Auszug)",
            en: "You will see your Lord as you see this moon, without crowding one another to see Him. (excerpt)",
            tr: "Şu ayı gördüğünüz gibi Rabbinizi de göreceksiniz; onu görmekte birbirinizi sıkıştırmazsınız. (özet)",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Hölle und Allahs Gerechtigkeit', en: "Hell and Allah's justice", tr: "Cehennem ve Allah'ın adaleti" },
        },
        {
          type: 'text',
          text: {
            de: "Der Koran beschreibt die Hölle ernst und deutlich — als Warnung, die wachrütteln soll, nicht als Grund zur Verzweiflung. Allah tut niemandem Unrecht, „nicht einmal im Gewicht eines Stäubchens“ (4:40), und Er bestraft nicht, bevor Er einen Gesandten geschickt hat:",
            en: "The Quran describes Hell seriously and clearly — as a warning meant to awaken, not as a reason for despair. Allah wrongs no one, “not even an atom's weight” (4:40), and He does not punish before sending a messenger:",
            tr: "Kur'an cehennemi ciddi ve açık bir şekilde anlatır — umutsuzluğa sebep olarak değil, uyandırması gereken bir uyarı olarak. Allah kimseye “zerre kadar” haksızlık etmez (4:40) ve bir peygamber göndermeden azap etmez:",
          },
        },
        {
          type: 'quran',
          ref: '17:15',
          arabic: 'وَمَا كُنَّا مُعَذِّبِينَ حَتَّىٰ نَبْعَثَ رَسُولًا',
          translation: {
            de: "… Und Wir straften niemals, bevor Wir nicht einen Gesandten geschickt hätten.",
            en: "… And never would We punish until We sent a messenger.",
            tr: "… Biz bir peygamber göndermedikçe azap edici değiliz.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 44, Sahih Muslim 193',
          narrator: 'Anas ibn Malik',
          grade: 'sahih',
          text: {
            de: "Aus dem Feuer wird herauskommen, wer „La ilaha illa-llah“ gesagt hat und in dessen Herz Gutes im Gewicht eines Gerstenkorns ist … (Auszug)",
            en: "Whoever said “La ilaha illa-llah” and has in his heart good the weight of a barley grain will come out of the Fire … (excerpt)",
            tr: "“Lâ ilâhe illallah” deyip kalbinde arpa tanesi ağırlığınca hayır bulunan kimse ateşten çıkacaktır … (özet)",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Über Menschen, die die Botschaft nie (oder nur verzerrt) erreicht hat, und über früh verstorbene Kinder haben Gelehrte verschiedene Ansichten geäußert. Viele stützen sich auf 17:15: Allah straft niemanden, dem die Botschaft nicht zukam. Das Urteil über Einzelne liegt allein bei Allah, dem Gerechten und Barmherzigen.",
            en: "Scholars have expressed different views about people whom the message never reached (or reached only in distorted form) and about children who died young. Many rely on 17:15: Allah punishes no one whom the message did not reach. Judgement over individuals belongs to Allah alone, the Just and the Merciful.",
            tr: "Kendilerine tebliğ hiç ulaşmamış (veya çarpıtılmış olarak ulaşmış) insanlar ve küçük yaşta ölen çocuklar hakkında âlimler farklı görüşler bildirmiştir (ehl-i fetret meselesi). Birçoğu 17:15'e dayanır: Allah, mesajın ulaşmadığı kimseye azap etmez. Tek tek kişiler hakkındaki hüküm yalnızca adil ve merhametli olan Allah'a aittir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Zwischen Hoffnung und Furcht', en: 'Between hope and fear', tr: 'Ümit ile korku arasında' },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 6463, Sahih Muslim 2816',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Niemanden von euch wird sein Tun allein retten. Sie fragten: „Auch dich nicht, o Gesandter Allahs?“ Er sagte: „Auch mich nicht — es sei denn, Allah umhüllt mich mit Seiner Barmherzigkeit. Bemüht euch um das Rechte und nähert euch ihm …“",
            en: "No one's deeds alone will save him. They asked: “Not even you, O Messenger of Allah?” He said: “Not even me — unless Allah covers me with His mercy. So strive for what is right and draw near to it …”",
            tr: "Hiçbirinizi ameli tek başına kurtaramaz. “Seni de mi, ey Allah'ın Resulü?” dediler. Buyurdu: “Beni de — ancak Allah beni rahmetiyle kuşatırsa başka. Doğru olun ve (doğruya) yaklaşın …”",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Ein klassisches Bild beschreibt Hoffnung und Furcht als die zwei Flügel eines Vogels: Nur mit beiden fliegt er gerade. Die Furcht hält von Sünden ab, die Hoffnung lässt einen nach jedem Fehler zu Allah zurückkehren.",
            en: "A classical image describes hope and fear as the two wings of a bird: only with both does it fly straight. Fear keeps one from sin; hope lets one return to Allah after every mistake.",
            tr: "Klasik bir benzetme ümit ve korkuyu bir kuşun iki kanadına benzetir: Kuş ancak ikisiyle dengeli uçar. Korku günahtan alıkoyar, ümit ise her hatadan sonra Allah'a dönmeyi sağlar.",
          },
        },
        { type: 'terms', ids: ['jannah', 'jahannam', 'akhirah', 'taqwa', 'tawba', 'shafaa'] },
      ],
      quiz: [
        {
          question: {
            de: "Was steht nach Bukhari 3194 im Buch bei Allah über dem Thron?",
            en: "According to Bukhari 3194, what is written in the Book with Allah above the Throne?",
            tr: "Buhârî 3194'e göre Arş'ın üstündeki kitapta ne yazılıdır?",
          },
          options: [
            { de: "„Meine Barmherzigkeit überwiegt Meinen Zorn“", en: "“My mercy prevails over My wrath”", tr: "“Rahmetim gazabımı geçmiştir”" },
            { de: "„Mein Zorn überwiegt Meine Barmherzigkeit“", en: "“My wrath prevails over My mercy”", tr: "“Gazabım rahmetimi geçmiştir”" },
            { de: "Eine Liste aller Sünder", en: "A list of all sinners", tr: "Bütün günahkârların listesi" },
          ],
          answer: 0,
          explanation: {
            de: "Allahs Barmherzigkeit hat Vorrang — sie „umfasst alle Dinge“ (7:156).",
            en: "Allah's mercy takes precedence — it “encompasses all things” (7:156).",
            tr: "Allah'ın rahmeti önce gelir — “her şeyi kuşatmıştır” (7:156).",
          },
        },
        {
          question: {
            de: "Was ist nach Koran und Sunna die größte Wonne des Paradieses?",
            en: "According to the Quran and Sunnah, what is the greatest bliss of Paradise?",
            tr: "Kur'an ve sünnete göre cennetin en büyük nimeti nedir?",
          },
          options: [
            { de: "Reichtum", en: "Wealth", tr: "Zenginlik" },
            { de: "Allah zu sehen", en: "Seeing Allah", tr: "Allah'ı görmek" },
            { de: "Ruhm bei den Menschen", en: "Fame among people", tr: "İnsanlar arasında şöhret" },
          ],
          answer: 1,
          explanation: {
            de: "„Gesichter werden an jenem Tag strahlen, zu ihrem Herrn schauend“ (75:22–23).",
            en: "“Faces that Day will be radiant, looking at their Lord” (75:22–23).",
            tr: "“O gün bazı yüzler parıldar, Rablerine bakar” (75:22–23).",
          },
        },
        {
          question: {
            de: "Was lehrt Koran 17:15 über Allahs Gerechtigkeit?",
            en: "What does Quran 17:15 teach about Allah's justice?",
            tr: "İsrâ 17:15 Allah'ın adaleti hakkında ne öğretir?",
          },
          options: [
            { de: "Allah straft nicht, bevor Er einen Gesandten geschickt hat", en: "Allah does not punish before sending a messenger", tr: "Allah bir peygamber göndermeden azap etmez" },
            { de: "Allah straft ohne Warnung", en: "Allah punishes without warning", tr: "Allah uyarmadan azap eder" },
            { de: "Gerechtigkeit gibt es erst im Diesseits", en: "Justice only exists in this world", tr: "Adalet yalnızca dünyadadır" },
          ],
          answer: 0,
          explanation: {
            de: "Niemand wird für etwas zur Rechenschaft gezogen, wovor er nie gewarnt wurde.",
            en: "No one is held accountable for something they were never warned about.",
            tr: "Hiç kimse hakkında hiç uyarılmadığı bir şeyden sorumlu tutulmaz.",
          },
        },
      ],
      sources: [
        'Quran 7:156, 32:17, 75:22-23, 4:40, 17:15',
        'Sahih al-Bukhari 3194, Sahih Muslim 2751',
        'Sahih al-Bukhari 6000, Sahih Muslim 2752',
        'Sahih al-Bukhari 3244, Sahih Muslim 2824',
        'Sahih al-Bukhari 554, Sahih Muslim 633',
        'Sahih al-Bukhari 44, Sahih Muslim 193',
        'Sahih al-Bukhari 6463, Sahih Muslim 2816',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 10 ──────────────────────────────────────────────────────────
    {
      id: 'qadar-in-depth',
      title: {
        de: 'Qadar vertieft — Bestimmung und Verantwortung',
        en: 'Qadar in depth — decree and responsibility',
        tr: 'Kader derinlemesine — takdir ve sorumluluk',
      },
      summary: {
        de: "Die vier Stufen des Glaubens an die Bestimmung mit ihren Belegen, die Erklärungen der Schulen zur menschlichen Wahl — und wie Qadar im Alltag trägt.",
        en: "The four levels of belief in divine decree with their evidence, the schools' explanations of human choice — and how qadar carries us in daily life.",
        tr: "Kadere imanın dört mertebesi ve delilleri, ekollerin insan iradesine dair açıklamaları — ve kaderin günlük hayatta insana nasıl dayanak olduğu.",
      },
      minutes: 8,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Im Pfad „Grundlagen“ hast du die vier Punkte des Qadar kennengelernt: Allah **weiß** alles, Er hat alles **festgeschrieben**, nichts geschieht ohne Seinen **Willen**, und Er ist der **Schöpfer** aller Dinge. Hier schauen wir uns die Belege an — und die Frage, wie menschliche Verantwortung dazu passt.",
            en: "In the “Foundations” path you met the four points of qadar: Allah **knows** everything, He has **recorded** everything, nothing happens without His **will**, and He is the **Creator** of all things. Here we look at the evidence — and at how human responsibility fits in.",
            tr: "“Temeller” yolunda kaderin dört maddesini öğrendin: Allah her şeyi **bilir**, her şeyi **yazmıştır**, O'nun **dilemesi** olmadan hiçbir şey olmaz ve her şeyin **yaratıcısı** O'dur. Burada delillere ve insanın sorumluluğunun buna nasıl uyduğuna bakıyoruz.",
          },
        },
        {
          type: 'heading',
          text: { de: '1. Das Wissen', en: '1. Knowledge', tr: '1. İlim' },
        },
        {
          type: 'quran',
          ref: '6:59',
          translation: {
            de: "Und Er hat die Schlüssel zum Verborgenen; nur Er kennt sie. Und Er weiß, was auf dem Festland und was im Meer ist. Kein Blatt fällt herab, ohne dass Er es weiß …",
            en: "And with Him are the keys of the unseen; none knows them except Him. And He knows what is on the land and in the sea. Not a leaf falls but that He knows it …",
            tr: "Gaybın anahtarları O'nun katındadır. Onları ancak O bilir. Karada ve denizde ne varsa bilir. Düşen bir yaprak yoktur ki onu bilmesin …",
          },
        },
        {
          type: 'heading',
          text: { de: '2. Das Festschreiben', en: '2. Recording', tr: '2. Yazma' },
        },
        {
          type: 'quran',
          ref: '57:22',
          translation: {
            de: "Kein Unglück trifft auf der Erde oder euch selbst ein, ohne dass es in einem Buch (verzeichnet) wäre, bevor Wir es erschaffen — gewiss, das ist Allah ein Leichtes.",
            en: "No disaster strikes upon the earth or among yourselves except that it is in a register before We bring it into being — indeed that, for Allah, is easy.",
            tr: "Yeryüzünde ve kendi nefislerinizde meydana gelen hiçbir musibet yoktur ki biz onu yaratmadan önce bir kitapta yazılmış olmasın. Şüphesiz bu Allah'a kolaydır.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 2653',
          narrator: "'Abdullah ibn 'Amr ibn al-'As",
          grade: 'sahih',
          text: {
            de: "Allah hat die Bestimmungen der Geschöpfe fünfzigtausend Jahre, bevor Er die Himmel und die Erde erschuf, festgeschrieben.",
            en: "Allah wrote down the decrees of creation fifty thousand years before He created the heavens and the earth.",
            tr: "Allah, gökleri ve yeri yaratmadan elli bin yıl önce yaratılmışların kaderlerini yazmıştır.",
          },
        },
        {
          type: 'heading',
          text: { de: '3. Der Wille', en: '3. Will', tr: '3. Meşiet (dileme)' },
        },
        {
          type: 'quran',
          ref: '81:28-29',
          arabic: 'لِمَن شَاءَ مِنكُمْ أَن يَسْتَقِيمَ ۝ وَمَا تَشَاءُونَ إِلَّا أَن يَشَاءَ اللَّهُ رَبُّ الْعَالَمِينَ',
          translation: {
            de: "… für jemanden von euch, der sich recht verhalten will. Und ihr könnt nicht wollen, außer dass Allah will, der Herr der Weltenbewohner.",
            en: "… for whoever wills among you to take a right course. And you do not will except that Allah wills, Lord of the worlds.",
            tr: "… sizden doğru yolda gitmek isteyenler için. Âlemlerin Rabbi olan Allah dilemedikçe siz dileyemezsiniz.",
          },
        },
        {
          type: 'text',
          text: {
            de: "Der Vers enthält beides: Der Mensch **will** wirklich — und sein Wollen geschieht innerhalb von Allahs Willen.",
            en: "The verse contains both: the human being truly **wills** — and that willing takes place within Allah's will.",
            tr: "Ayet ikisini birden içerir: İnsan gerçekten **diler** — ve bu dileme Allah'ın iradesi dairesinde gerçekleşir.",
          },
        },
        {
          type: 'heading',
          text: { de: '4. Die Erschaffung', en: '4. Creation', tr: '4. Yaratma' },
        },
        {
          type: 'quran',
          ref: '37:96',
          arabic: 'وَاللَّهُ خَلَقَكُمْ وَمَا تَعْمَلُونَ',
          translation: {
            de: "… wo doch Allah euch und das, was ihr tut, erschaffen hat.",
            en: "… while Allah created you and that which you do.",
            tr: "… Oysa sizi de yaptıklarınızı da Allah yaratmıştır.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Und die Verantwortung?', en: 'And responsibility?', tr: 'Ya sorumluluk?' },
        },
        {
          type: 'quran',
          ref: '18:29',
          arabic: 'فَمَن شَاءَ فَلْيُؤْمِن وَمَن شَاءَ فَلْيَكْفُرْ',
          translation: {
            de: "Und sag: (Es ist) die Wahrheit von eurem Herrn. Wer nun will, der soll glauben, und wer will, der soll ungläubig sein …",
            en: "And say: The truth is from your Lord, so whoever wills — let him believe; and whoever wills — let him disbelieve …",
            tr: "De ki: Hak Rabbinizdendir. Artık dileyen iman etsin, dileyen inkâr etsin …",
          },
        },
        {
          type: 'text',
          text: {
            de: "Allahs Wissen zwingt niemanden: Er weiß, was wir wählen werden, aber wir wählen es tatsächlich. Darum fordert der Koran zu Taten auf, lobt und tadelt, verspricht Lohn und warnt vor Strafe. Die Sunniten haben in der Geschichte zwei Extreme zurückgewiesen: die Lehre, der Mensch habe gar keine Wahl (**Dschabriyya**), und die Lehre, Allah habe die Taten der Menschen weder vorher gewusst noch erschaffen (**Qadariyya**).",
            en: "Allah's knowledge compels no one: He knows what we will choose, but we really do choose it. This is why the Quran calls to action, praises and blames, promises reward and warns of punishment. Historically Sunnis rejected two extremes: the teaching that humans have no choice at all (**Jabriyya**), and the teaching that Allah neither foreknew nor created human acts (**Qadariyya**).",
            tr: "Allah'ın ilmi kimseyi zorlamaz: Neyi seçeceğimizi bilir, ama seçen gerçekten biziz. Bu yüzden Kur'an amele çağırır, över ve kınar, mükâfat vaat eder ve azaptan sakındırır. Sünniler tarihte iki aşırılığı reddetmiştir: insanın hiçbir seçimi olmadığını söyleyen **Cebriyye** ile Allah'ın insan fiillerini önceden bilmediğini ve yaratmadığını söyleyen **Kaderiyye**.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Wie Allahs Erschaffung der Taten und die Wahl des Menschen zusammengehen, erklären die Schulen mit eigenen Begriffen: Die **aschʿaritische** Schule spricht vom „Erwerb“ (Kasb) — Allah erschafft die Tat, der Mensch „erwirbt“ sie durch seine Wahl. Die **maturiditische** Schule unterscheidet den umfassenden Willen Allahs vom „Teilwillen“ des Menschen (türk. cüz'i irade), für den er verantwortlich ist. Die **atharitische** Schule betont, dass der Mensch eine wirkliche Fähigkeit und einen wirklichen Willen hat, die Allah erschaffen hat. Auch die Begriffe **Qada'** und **Qadar** werden in den Schulen teils unterschiedlich (sogar umgekehrt) definiert. Im Ergebnis sind sich alle einig: Allah bestimmt alles, und der Mensch ist verantwortlich.",
            en: "How Allah's creation of acts and human choice fit together, the schools explain with their own terms: the **Ash'ari** school speaks of “acquisition” (kasb) — Allah creates the act, the human “acquires” it through choice. The **Maturidi** school distinguishes Allah's all-encompassing will from the human's “partial will” (Turkish cüz'i irade), for which one is responsible. The **Athari** school stresses that humans have a real capacity and a real will, both created by Allah. The terms **qada'** and **qadar** are also defined differently (even inversely) in the schools. In the end all agree: Allah decrees everything, and humans are responsible.",
            tr: "Allah'ın fiilleri yaratması ile insanın seçiminin nasıl bir arada olduğunu ekoller kendi kavramlarıyla açıklar: **Eş'arîler** “kesb”ten söz eder — fiili Allah yaratır, insan onu seçimiyle “kazanır”. **Mâtürîdîler** Allah'ın külli iradesini insanın sorumlu olduğu **cüz'i irade**den ayırır. **Eserîler** insanın Allah'ın yarattığı gerçek bir güç ve iradeye sahip olduğunu vurgular. **Kaza** ve **kader** kavramları da ekollerde farklı (hatta ters) tanımlanır. Sonuçta hepsi birleşir: Allah her şeyi takdir eder ve insan sorumludur.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 4949, Sahih Muslim 2647',
          narrator: "'Ali ibn Abi Talib",
          grade: 'sahih',
          text: {
            de: "„Es gibt keinen unter euch, dessen Platz im Paradies oder im Feuer nicht schon festgeschrieben wäre.“ Sie sagten: „O Gesandter Allahs, sollen wir uns dann nicht darauf verlassen (und das Handeln lassen)?“ Er sagte: „Handelt, denn jedem wird das leicht gemacht, wofür er erschaffen wurde.“ Dann rezitierte er: „Was nun jemanden angeht, der gibt und gottesfürchtig ist und das Beste für wahr hält, dem werden Wir den Weg zum Leichteren ebnen“ (92:5–7).",
            en: "“There is none of you whose place in Paradise or in the Fire has not already been written.” They said: “O Messenger of Allah, shall we not then rely on that (and give up acting)?” He said: “Act, for each one will be eased towards what he was created for.” Then he recited: “As for he who gives and fears Allah and believes in the best, We will ease him towards ease” (92:5–7).",
            tr: "“Sizden cennetteki veya cehennemdeki yeri yazılmamış hiç kimse yoktur.” “Ey Allah'ın Resulü! O hâlde (yazılana) güvenip ameli bırakmayalım mı?” dediler. Buyurdu: “Amel edin! Herkes ne için yaratıldıysa o ona kolaylaştırılır.” Sonra şu ayetleri okudu: “Kim verir ve sakınırsa ve en güzeli tasdik ederse, biz de onu en kolaya hazırlarız” (92:5–7).",
          },
        },
        {
          type: 'heading',
          text: { de: 'Qadar im Alltag', en: 'Qadar in daily life', tr: 'Günlük hayatta kader' },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 5729, Sahih Muslim 2219',
          narrator: "'Abdullah ibn 'Abbas",
          grade: 'sahih',
          text: {
            de: "(Als 'Umar wegen einer Seuche in Syrien umkehrte, fragte ihn Abu 'Ubaida:) „Fliehst du vor der Bestimmung Allahs?“ 'Umar sagte: „Ja, wir fliehen von der Bestimmung Allahs zur Bestimmung Allahs.“ (Auszug)",
            en: "(When 'Umar turned back because of a plague in Syria, Abu 'Ubaydah asked him:) “Are you fleeing from the decree of Allah?” 'Umar said: “Yes, we flee from the decree of Allah to the decree of Allah.” (excerpt)",
            tr: "(Hz. Ömer Şam'daki veba yüzünden geri dönünce Ebû Ubeyde ona sordu:) “Allah'ın kaderinden mi kaçıyorsun?” Hz. Ömer dedi ki: “Evet, Allah'ın kaderinden yine Allah'ın kaderine kaçıyoruz.” (özet)",
          },
        },
        {
          type: 'list',
          items: [
            { de: "**Mittel ergreifen und vertrauen** (Tawakkul): lernen, arbeiten, sich behandeln lassen — und das Ergebnis Allah überlassen.", en: "**Use the means and trust** (tawakkul): learn, work, seek treatment — and leave the outcome to Allah.", tr: "**Sebeplere sarıl ve tevekkül et**: öğren, çalış, tedavi ol — sonucu Allah'a bırak." },
            { de: "**Qadar ist keine Ausrede für Sünden.** Vor der Tat zählt die Pflicht, nach einem Unglück der Trost der Bestimmung.", en: "**Qadar is no excuse for sin.** Before an act, duty counts; after a misfortune, the comfort of decree.", tr: "**Kader günaha bahane değildir.** Amelden önce sorumluluk, musibetten sonra kaderin tesellisi esastır." },
            { de: "**Das Bittgebet gehört selbst zur Bestimmung** — wer bittet, handelt innerhalb von Allahs Plan, nicht gegen ihn.", en: "**Supplication is itself part of the decree** — whoever asks acts within Allah's plan, not against it.", tr: "**Dua da kaderin bir parçasıdır** — dua eden, Allah'ın takdirine karşı değil, onun içinde hareket eder." },
            { de: "**Geduld und Dankbarkeit**: Beides macht jede Lage zum Guten für den Gläubigen (Sahih Muslim 2999).", en: "**Patience and gratitude**: both turn every situation into good for the believer (Sahih Muslim 2999).", tr: "**Sabır ve şükür**: İkisi de her durumu mümin için hayra çevirir (Müslim 2999)." },
          ],
        },
        {
          type: 'note',
          variant: 'important',
          text: {
            de: "Gelehrte raten, über das „Wie“ der Bestimmung nicht endlos zu grübeln — es übersteigt das menschliche Erfassen. Fragen und Zweifel sind keine Sünde; besprich sie mit einer kundigen, vertrauenswürdigen Person.",
            en: "Scholars advise against endlessly brooding over the “how” of decree — it exceeds human comprehension. Questions and doubts are not a sin; discuss them with a knowledgeable, trustworthy person.",
            tr: "Âlimler kaderin “nasıl”ı üzerinde sonsuzca kafa yormamayı tavsiye eder — bu, insan idrakini aşar. Soru ve şüpheler günah değildir; bunları bilgili ve güvenilir biriyle konuş.",
          },
        },
        { type: 'terms', ids: ['qadar', 'lawh-mahfuz', 'tawakkul', 'ghayb', 'ashari', 'maturidi', 'athari'] },
      ],
      quiz: [
        {
          question: {
            de: "Welche vier Stufen des Glaubens an Qadar nennen die Gelehrten?",
            en: "Which four levels of belief in qadar do scholars name?",
            tr: "Âlimler kadere imanın hangi dört mertebesini sayar?",
          },
          options: [
            { de: "Wissen, Festschreiben, Wille, Erschaffung", en: "Knowledge, recording, will, creation", tr: "İlim, yazma, dileme, yaratma" },
            { de: "Gebet, Fasten, Zakat, Hadsch", en: "Prayer, fasting, zakat, Hajj", tr: "Namaz, oruç, zekât, hac" },
            { de: "Glück, Zufall, Schicksal, Sterne", en: "Luck, chance, fate, stars", tr: "Şans, tesadüf, talih, yıldızlar" },
          ],
          answer: 0,
          explanation: {
            de: "Belege: Wissen (6:59), Festschreiben (57:22, Muslim 2653), Wille (81:29), Erschaffung (37:96).",
            en: "Evidence: knowledge (6:59), recording (57:22, Muslim 2653), will (81:29), creation (37:96).",
            tr: "Deliller: ilim (6:59), yazma (57:22, Müslim 2653), dileme (81:29), yaratma (37:96).",
          },
        },
        {
          question: {
            de: "Was antwortete der Prophet ﷺ, als die Gefährten fragten, ob sie sich auf das Festgeschriebene verlassen und das Handeln lassen sollten?",
            en: "What did the Prophet ﷺ reply when the companions asked whether they should rely on what was written and stop acting?",
            tr: "Sahabe yazılana güvenip ameli bırakıp bırakmamayı sorduğunda Peygamber ﷺ ne cevap verdi?",
          },
          options: [
            { de: "„Ja, es ist ohnehin alles entschieden“", en: "“Yes, everything is decided anyway”", tr: "“Evet, her şey zaten belirlendi”" },
            { de: "„Handelt, denn jedem wird das leicht gemacht, wofür er erschaffen wurde“", en: "“Act, for each one will be eased towards what he was created for”", tr: "“Amel edin! Herkes ne için yaratıldıysa o ona kolaylaştırılır”" },
            { de: "Er gab keine Antwort", en: "He gave no answer", tr: "Cevap vermedi" },
          ],
          answer: 1,
          explanation: {
            de: "Die Bestimmung ist kein Grund zur Untätigkeit, sondern ein Ansporn zum Handeln (Bukhari 4949, Muslim 2647).",
            en: "Decree is no reason for inaction but an incentive to act (Bukhari 4949, Muslim 2647).",
            tr: "Kader tembelliğe değil, amele teşviktir (Buhârî 4949, Müslim 2647).",
          },
        },
        {
          question: {
            de: "Was meinte 'Umar mit „Wir fliehen von der Bestimmung Allahs zur Bestimmung Allahs“?",
            en: "What did 'Umar mean by “We flee from the decree of Allah to the decree of Allah”?",
            tr: "Hz. Ömer “Allah'ın kaderinden yine Allah'ın kaderine kaçıyoruz” sözüyle neyi kastetti?",
          },
          options: [
            { de: "Dass Vorsichtsmaßnahmen selbst Teil der Bestimmung sind", en: "That precautions are themselves part of the decree", tr: "Tedbir almanın da kaderin parçası olduğunu" },
            { de: "Dass man vor Allah fliehen kann", en: "That one can flee from Allah", tr: "Allah'tan kaçılabileceğini" },
            { de: "Dass Seuchen nicht existieren", en: "That plagues do not exist", tr: "Salgınların olmadığını" },
          ],
          answer: 0,
          explanation: {
            de: "Sich zu schützen widerspricht dem Glauben an Qadar nicht — auch die Vorsicht geschieht innerhalb von Allahs Bestimmung.",
            en: "Protecting oneself does not contradict belief in qadar — caution, too, takes place within Allah's decree.",
            tr: "Korunmak kadere imana aykırı değildir — tedbir de Allah'ın takdiri dairesindedir.",
          },
        },
      ],
      sources: [
        'Quran 6:59, 57:22, 81:28-29, 37:96, 18:29, 92:5-7, 85:22',
        'Sahih Muslim 2653',
        'Sahih al-Bukhari 4949, Sahih Muslim 2647',
        'Sahih al-Bukhari 5729, Sahih Muslim 2219',
        'Sahih Muslim 2999',
        "Kasb (aschʿaritisch), cüz'i irade (maturiditisch): Darstellungen der Kalam-Literatur; vgl. al-'Aqida at-Tahawiyya zum Qadar",
        QURAN_REF,
      ],
      review: 'draft',
    },
  ],
}
