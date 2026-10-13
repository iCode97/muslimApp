/**
 * Learning path "Fiqh des Alltags" — 12 lessons for practising Muslims who
 * want to carry out their worship correctly and understand the reasons
 * behind the rules: sources and categories of fiqh, purification, prayer,
 * fasting, zakat and halal earning.
 *
 * Mainstream Sunni scholarship, neutral between the four schools of law
 * (Hanafi, Maliki, Shafi'i, Hanbali). Wherever they differ, a `note` block
 * (variant 'differences') names the positions. Personal cases belong with a
 * qualified local scholar — the lessons say so repeatedly.
 *
 * Quran translations are the authors' own renderings, checked against the
 * reference translations named in QURAN_REF (partly abridged). Glossary ids
 * resolve against GLOSSARY (`../glossary`) and FIQH_TERMS
 * (`../glossary-fiqh`). Everything ships as `review: 'draft'`.
 */
import type { LearningPath } from '../types'

/** Reference translations the Quran renderings in this path follow. */
const QURAN_REF = 'Koranübersetzungen (Referenz, eigene Wiedergabe, teils gekürzt): Bubenheim/Elyas (DE), Sahih International (EN), Diyanet İşleri Başkanlığı Kur\'an-ı Kerim Meali (TR)'

/** General reference works for the positions of the four schools. */
const FIQH_REF = 'Vergleichende Fiqh-Darstellung (Positionen der vier Rechtsschulen): u. a. Ibn Rushd, Bidayat al-Mujtahid; Abd ar-Rahman al-Jaziri, al-Fiqh ʿala al-Madhahib al-Arbaʿa; Wahba az-Zuhayli, al-Fiqh al-Islami wa Adillatuh'

export const FIQH_PATH: LearningPath = {
  id: 'fiqh',
  icon: '⚖️',
  level: 'practice',
  title: {
    de: 'Fiqh des Alltags',
    en: 'Everyday Fiqh',
    tr: 'Günlük Hayatta Fıkıh',
  },
  description: {
    de: "Für alle, die ihre Ibada richtig verrichten und die Gründe dahinter verstehen wollen: Quellen und Kategorien des Fiqh, Reinheit, Gebet, Fasten, Zakat und halal Verdienen — mit den Positionen der vier Rechtsschulen, wo sie sich unterscheiden.",
    en: "For everyone who wants to perform their worship correctly and understand the reasons behind it: sources and categories of fiqh, purification, prayer, fasting, zakat and halal earning — with the positions of the four schools where they differ.",
    tr: "İbadetlerini doğru yapmak ve gerekçelerini anlamak isteyenler için: fıkhın kaynakları ve hüküm çeşitleri, temizlik, namaz, oruç, zekât ve helal kazanç — farklılık gösterdikleri yerlerde dört mezhebin görüşleriyle.",
  },
  lessons: [
    // ─── 1 ───────────────────────────────────────────────────────────
    {
      id: 'what-is-fiqh',
      title: {
        de: 'Was ist Fiqh?',
        en: 'What is fiqh?',
        tr: 'Fıkıh nedir?',
      },
      summary: {
        de: "Woher islamische Regeln kommen — Koran, Sunna, Idschma und Qiyas — und warum es vier anerkannte Rechtsschulen gibt, die einander respektieren.",
        en: "Where Islamic rulings come from — Quran, Sunnah, ijma and qiyas — and why there are four recognised schools of law that respect one another.",
        tr: "İslami hükümlerin nereden geldiği — Kur'an, Sünnet, icma ve kıyas — ve birbirine saygı duyan dört mezhebin neden var olduğu.",
      },
      minutes: 6,
      blocks: [
        {
          type: 'text',
          text: {
            de: "**Fiqh** heißt wörtlich „tiefes Verstehen“. Als Fachbegriff bezeichnet es die islamische Rechts- und Pflichtenlehre: das Wissen darüber, wie man betet, fastet, Zakat gibt, Handel treibt oder heiratet — abgeleitet aus den Quellen des Islam. Fiqh ist also nicht abstrakte Theorie, sondern die Antwort auf die Frage: **Wie lebe ich meinen Glauben konkret richtig?**",
            en: "**Fiqh** literally means “deep understanding”. As a technical term it refers to Islamic law and the science of duties: knowing how to pray, fast, give zakat, trade or marry — derived from the sources of Islam. So fiqh is not abstract theory but the answer to the question: **How do I live my faith correctly in practice?**",
            tr: "**Fıkıh** sözlükte “derin anlayış” demektir. Terim olarak İslam'ın hüküm ve sorumluluklar ilmini ifade eder: namazın, orucun, zekâtın, ticaretin veya evliliğin nasıl olacağına dair, İslam'ın kaynaklarından çıkarılan bilgi. Yani fıkıh soyut bir teori değil, şu sorunun cevabıdır: **İnancımı somut olarak nasıl doğru yaşarım?**",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 71, Sahih Muslim 1037',
          narrator: "Mu'awiya",
          arabic: 'مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ',
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ sagte: „Wem Allah Gutes will, dem schenkt Er Verständnis in der Religion.“",
            en: "The Prophet ﷺ said: “When Allah wants good for someone, He gives him understanding of the religion.”",
            tr: "Peygamber ﷺ şöyle buyurdu: “Allah kimin hakkında hayır dilerse onu dinde fakih (derin anlayış sahibi) kılar.”",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die vier Quellen', en: 'The four sources', tr: 'Dört kaynak' },
        },
        {
          type: 'list',
          items: [
            {
              de: "**Koran** — das Wort Allahs und die erste Quelle. Rund 500 Verse enthalten nach gängiger Zählung unmittelbar rechtliche Regelungen.",
              en: "**Quran** — the word of Allah and the first source. By common counts, around 500 verses contain direct legal rulings.",
              tr: "**Kur'an** — Allah'ın kelamı ve ilk kaynak. Yaygın bir sayıma göre yaklaşık 500 ayet doğrudan hüküm içerir.",
            },
            {
              de: "**Sunna** — Worte, Taten und Billigungen des Propheten ﷺ. Sie erklärt und ergänzt den Koran: Dass das Mittagsgebet vier Rakat hat, steht z. B. nicht im Koran, sondern in der Sunna.",
              en: "**Sunnah** — the words, actions and approvals of the Prophet ﷺ. It explains and complements the Quran: that the noon prayer has four rak'ahs, for example, is not in the Quran but in the Sunnah.",
              tr: "**Sünnet** — Peygamber'in ﷺ sözleri, fiilleri ve onayları. Kur'an'ı açıklar ve tamamlar: Örneğin öğle namazının dört rekât olduğu Kur'an'da değil, Sünnet'te yer alır.",
            },
            {
              de: "**Idschma (Konsens)** — die Übereinstimmung der qualifizierten Gelehrten einer Epoche in einer Frage, z. B. dass es fünf tägliche Pflichtgebete gibt.",
              en: "**Ijma (consensus)** — the agreement of the qualified scholars of an era on a question, e.g. that there are five daily obligatory prayers.",
              tr: "**İcma** — bir dönemdeki ehil âlimlerin bir konuda görüş birliği; örneğin günde beş vakit farz namaz olduğu.",
            },
            {
              de: "**Qiyas (Analogieschluss)** — eine neue Frage wird nach einem Fall beurteilt, dessen Regel bekannt ist, weil beide denselben Grund teilen. Klassisches Beispiel: Wein ist verboten, weil er berauscht — also ist jedes Rauschmittel verboten.",
              en: "**Qiyas (analogy)** — a new question is judged by a case whose ruling is known because both share the same underlying reason. Classic example: wine is forbidden because it intoxicates — so every intoxicant is forbidden.",
              tr: "**Kıyas** — hükmü bilinen bir meseleyle aynı gerekçeyi (illet) paylaşan yeni bir meselenin ona göre hükme bağlanması. Klasik örnek: Şarap sarhoş ettiği için haramdır — dolayısıyla sarhoş eden her şey haramdır.",
            },
          ],
        },
        {
          type: 'quran',
          ref: '4:59',
          translation: {
            de: "O die ihr glaubt, gehorcht Allah und gehorcht dem Gesandten und den Befehlshabern unter euch! Wenn ihr miteinander über etwas streitet, so bringt es vor Allah und den Gesandten, wenn ihr wirklich an Allah und den Jüngsten Tag glaubt …",
            en: "O you who have believed, obey Allah and obey the Messenger and those in authority among you. And if you disagree over anything, refer it to Allah and the Messenger, if you should believe in Allah and the Last Day …",
            tr: "Ey iman edenler! Allah'a itaat edin, Peygamber'e itaat edin ve sizden olan ulü'l-emre de. Herhangi bir şeyde anlaşmazlığa düşerseniz, eğer Allah'a ve ahiret gününe gerçekten inanıyorsanız, onu Allah'a ve Resûl'e götürün …",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die vier Rechtsschulen', en: 'The four schools of law', tr: 'Dört mezhep' },
        },
        {
          type: 'text',
          text: {
            de: "Wo kein eindeutiger Text vorliegt, müssen qualifizierte Gelehrte die Belege abwägen (**Ijtihad**). Aus den Lehren großer Gelehrter der ersten Jahrhunderte entstanden Rechtsschulen (**Madhhab**). Vier davon haben sich im sunnitischen Islam durchgesetzt; alle gelten als gleichermaßen rechtgeleitet:",
            en: "Where no clear text exists, qualified scholars must weigh the evidence (**ijtihad**). From the teachings of great scholars of the first centuries, schools of law (**madhhab**) emerged. Four of them became established in Sunni Islam; all are considered equally rightly guided:",
            tr: "Açık bir nas bulunmayan konularda ehil âlimlerin delilleri tartması gerekir (**içtihat**). İlk asırların büyük âlimlerinin öğretilerinden mezhepler doğdu. Sünnî İslam'da bunlardan dördü yerleşti; hepsi eşit derecede meşru kabul edilir:",
          },
        },
        {
          type: 'list',
          items: [
            {
              de: "**Hanafitisch** — nach Abu Hanifa (gest. 150 n. H. / 767), heute u. a. in der Türkei, auf dem Balkan, in Zentral- und Südasien verbreitet",
              en: "**Hanafi** — after Abu Hanifa (d. 150 AH / 767), today widespread e.g. in Turkey, the Balkans, Central and South Asia",
              tr: "**Hanefî** — Ebû Hanîfe'ye (vf. 150/767) nispet edilir; bugün Türkiye, Balkanlar, Orta ve Güney Asya'da yaygındır",
            },
            {
              de: "**Malikitisch** — nach Malik ibn Anas (gest. 179 n. H. / 795), vor allem in Nord- und Westafrika",
              en: "**Maliki** — after Malik ibn Anas (d. 179 AH / 795), mainly in North and West Africa",
              tr: "**Mâlikî** — İmam Mâlik b. Enes'e (vf. 179/795) nispet edilir; özellikle Kuzey ve Batı Afrika'da",
            },
            {
              de: "**Schafiitisch** — nach Muhammad ibn Idris asch-Schafi'i (gest. 204 n. H. / 820), u. a. in Ägypten, Ostafrika, Jemen, Südostasien und bei vielen Kurden",
              en: "**Shafi'i** — after Muhammad ibn Idris al-Shafi'i (d. 204 AH / 820), e.g. in Egypt, East Africa, Yemen, Southeast Asia and among many Kurds",
              tr: "**Şâfiî** — İmam Şâfiî'ye (vf. 204/820) nispet edilir; Mısır, Doğu Afrika, Yemen, Güneydoğu Asya'da ve Kürtlerin çoğunluğu arasında",
            },
            {
              de: "**Hanbalitisch** — nach Ahmad ibn Hanbal (gest. 241 n. H. / 855), vor allem auf der Arabischen Halbinsel",
              en: "**Hanbali** — after Ahmad ibn Hanbal (d. 241 AH / 855), mainly on the Arabian Peninsula",
              tr: "**Hanbelî** — Ahmed b. Hanbel'e (vf. 241/855) nispet edilir; özellikle Arap Yarımadası'nda",
            },
          ],
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 7352, Sahih Muslim 1716',
          narrator: "'Amr ibn al-'As",
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ sagte: „Wenn ein Richter urteilt, sich dabei (nach Kräften) bemüht und richtig liegt, so hat er zwei Belohnungen. Und wenn er urteilt, sich bemüht und irrt, so hat er eine Belohnung.“",
            en: "The Prophet ﷺ said: “When a judge gives a ruling, strives (to reach the truth) and is right, he has two rewards. And when he gives a ruling, strives and errs, he has one reward.”",
            tr: "Peygamber ﷺ şöyle buyurdu: “Hâkim hüküm verirken içtihat eder de isabet ederse ona iki ecir vardır. Hüküm verirken içtihat eder de hata ederse ona bir ecir vardır.”",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Meinungsunterschiede zwischen den Rechtsschulen betreffen Detailfragen, nicht die Grundlagen: Alle vier sind sich einig über die fünf Gebete, das Ramadan-Fasten, die Zakat und den Hadsch. Schon die Prophetengefährten kamen bei derselben Anweisung zu unterschiedlichen Auslegungen, und der Prophet ﷺ tadelte keine der beiden Gruppen (Sahih al-Bukhari 946). Deshalb gilt unter Gelehrten: Andere Rechtsschulen werden respektiert, nicht bekämpft.",
            en: "Differences between the schools concern details, not the foundations: all four agree on the five prayers, the Ramadan fast, zakat and Hajj. Even the Companions reached different interpretations of the same instruction, and the Prophet ﷺ rebuked neither group (Sahih al-Bukhari 946). Hence scholars hold: other schools are respected, not fought.",
            tr: "Mezhepler arasındaki görüş ayrılıkları esaslarla değil ayrıntılarla ilgilidir: Dördü de beş vakit namaz, Ramazan orucu, zekât ve hac konusunda hemfikirdir. Sahabe bile aynı emri farklı yorumlamış, Peygamber ﷺ de iki gruptan hiçbirini kınamamıştır (Buhârî 946). Bu yüzden âlimler arasında şu ilke geçerlidir: Diğer mezheplere saygı gösterilir, onlarla mücadele edilmez.",
          },
        },
        {
          type: 'quran',
          ref: '16:43',
          arabic: 'فَاسْأَلُوا أَهْلَ الذِّكْرِ إِن كُنتُمْ لَا تَعْلَمُونَ',
          translation: {
            de: "So fragt die Leute der Ermahnung, wenn ihr (es) nicht wisst.",
            en: "So ask the people of the message if you do not know.",
            tr: "Eğer bilmiyorsanız bilenlere sorun.",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Für den Alltag empfehlen die meisten Gelehrten: Lerne die Praxis nach einer Rechtsschule — meist der deiner Gemeinde oder deines Lehrers — und bleib darin konsequent. Für persönliche Fälle (Krankheit, Familie, Finanzen) frag einen qualifizierten Gelehrten vor Ort; diese Lektionen ersetzen keine Fatwa.",
            en: "For daily life most scholars recommend: learn the practice according to one school — usually that of your community or teacher — and stay consistent within it. For personal cases (illness, family, finances) ask a qualified local scholar; these lessons do not replace a fatwa.",
            tr: "Günlük hayat için âlimlerin çoğu şunu tavsiye eder: İbadetlerini bir mezhebe göre — genellikle cemaatinin veya hocanın mezhebine göre — öğren ve onda tutarlı ol. Kişisel durumlar (hastalık, aile, mali konular) için yerel ve ehil bir âlime danış; bu dersler fetvanın yerini tutmaz.",
          },
        },
        { type: 'link', to: '/learn/glossary?term=madhhab', label: { de: 'Glossar: Madhhab', en: 'Glossary: madhhab', tr: 'Sözlük: mezhep' } },
        { type: 'terms', ids: ['fiqh', 'sharia', 'madhhab', 'ijma', 'qiyas', 'ijtihad', 'taqlid', 'hanafi', 'maliki', 'shafii', 'hanbali'] },
      ],
      quiz: [
        {
          question: {
            de: "Was bedeutet „Fiqh“ wörtlich?",
            en: "What does “fiqh” literally mean?",
            tr: "“Fıkıh” sözlükte ne anlama gelir?",
          },
          options: [
            { de: "Gesetzbuch", en: "Law book", tr: "Kanun kitabı" },
            { de: "Tiefes Verstehen", en: "Deep understanding", tr: "Derin anlayış" },
            { de: "Gebet", en: "Prayer", tr: "Namaz" },
          ],
          answer: 1,
          explanation: {
            de: "Fiqh bedeutet „tiefes Verstehen“ — gemeint ist das Verständnis der praktischen Regeln des Islam aus ihren Quellen.",
            en: "Fiqh means “deep understanding” — understanding the practical rulings of Islam from their sources.",
            tr: "Fıkıh “derin anlayış” demektir — İslam'ın pratik hükümlerini kaynaklarından anlamak kastedilir.",
          },
        },
        {
          question: {
            de: "Was ist Qiyas?",
            en: "What is qiyas?",
            tr: "Kıyas nedir?",
          },
          options: [
            { de: "Der Konsens aller Gelehrten", en: "The consensus of all scholars", tr: "Bütün âlimlerin görüş birliği" },
            { de: "Ein Analogieschluss von einem bekannten auf einen neuen Fall mit demselben Grund", en: "An analogy from a known case to a new case sharing the same reason", tr: "Aynı gerekçeyi paylaşan yeni bir meseleyi hükmü bilinen bir meseleye benzeterek hükme bağlamak" },
            { de: "Eine persönliche Meinung ohne Beleg", en: "A personal opinion without evidence", tr: "Delile dayanmayan kişisel görüş" },
          ],
          answer: 1,
          explanation: {
            de: "Beim Qiyas wird die Regel eines bekannten Falls auf einen neuen Fall übertragen, weil beide denselben Grund (Illa) haben — z. B. Wein und andere Rauschmittel.",
            en: "In qiyas the ruling of a known case is applied to a new case because both share the same reason ('illa) — e.g. wine and other intoxicants.",
            tr: "Kıyasta aynı illeti paylaştıkları için bilinen bir meselenin hükmü yeni meseleye uygulanır — örneğin şarap ve diğer sarhoş edici maddeler.",
          },
        },
        {
          question: {
            de: "Wie sehen die vier Rechtsschulen einander?",
            en: "How do the four schools view one another?",
            tr: "Dört mezhep birbirine nasıl bakar?",
          },
          options: [
            { de: "Nur eine ist richtig, die anderen sind Irrwege", en: "Only one is right, the others are misguided", tr: "Yalnızca biri doğrudur, diğerleri sapkındır" },
            { de: "Als anerkannte Auslegungen derselben Quellen, die einander respektieren", en: "As recognised interpretations of the same sources that respect one another", tr: "Aynı kaynakların birbirine saygı duyan, kabul görmüş yorumları olarak" },
            { de: "Sie unterscheiden sich in den fünf Säulen", en: "They differ on the five pillars", tr: "İslam'ın beş şartında ayrılırlar" },
          ],
          answer: 1,
          explanation: {
            de: "Alle vier stimmen in den Grundlagen überein und unterscheiden sich in Details. Wer sich nach bestem Bemühen irrt, wird nach dem Hadith sogar belohnt.",
            en: "All four agree on the foundations and differ in details. According to the hadith, even one who errs after sincere effort is rewarded.",
            tr: "Dördü de esaslarda birleşir, ayrıntılarda ayrılır. Hadise göre samimi bir çabadan sonra hata eden bile ecir alır.",
          },
        },
      ],
      sources: [
        'Quran 4:59, 16:43',
        'Sahih al-Bukhari 71, Sahih Muslim 1037',
        'Sahih al-Bukhari 7352, Sahih Muslim 1716',
        'Sahih al-Bukhari 946 (Asr-Gebet bei den Banu Qurayza)',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 2 ───────────────────────────────────────────────────────────
    {
      id: 'five-rulings',
      title: {
        de: 'Die fünf Kategorien: von Pflicht bis Verbot',
        en: 'The five categories: from obligatory to forbidden',
        tr: 'Beş hüküm: farzdan harama',
      },
      summary: {
        de: "Pflicht, empfohlen, erlaubt, verpönt, verboten — wie der Fiqh Handlungen einordnet und warum die hanafitische Schule zusätzlich „wajib“ unterscheidet.",
        en: "Obligatory, recommended, permissible, disliked, forbidden — how fiqh classifies actions and why the Hanafi school additionally distinguishes “wajib”.",
        tr: "Farz, müstehap, mübah, mekruh, haram — fıkhın amelleri nasıl sınıflandırdığı ve Hanefî mezhebinin neden ayrıca “vacip” kategorisini kullandığı.",
      },
      minutes: 6,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Jede bewusste Handlung eines Muslims lässt sich einer von fünf Kategorien zuordnen (al-ahkam al-khamsa). Sie beantworten zwei Fragen: Gibt es Lohn, wenn ich es tue? Gibt es Sünde, wenn ich es lasse — oder umgekehrt?",
            en: "Every conscious act of a Muslim can be assigned to one of five categories (al-ahkam al-khamsa). They answer two questions: Is there reward if I do it? Is there sin if I leave it — or vice versa?",
            tr: "Bir Müslüman'ın bilinçli her davranışı beş hükümden birine girer (el-ahkâmu'l-hamse). Bu hükümler iki soruya cevap verir: Yaparsam sevap var mı? Terk edersem günah var mı — ya da tersi?",
          },
        },
        {
          type: 'list',
          items: [
            {
              de: "**Fard (Pflicht)** — wer es tut, wird belohnt; wer es ohne Entschuldigung unterlässt, begeht eine Sünde. Beispiele: die fünf Gebete, das Ramadan-Fasten.",
              en: "**Fard (obligatory)** — whoever does it is rewarded; whoever omits it without excuse commits a sin. Examples: the five prayers, the Ramadan fast.",
              tr: "**Farz** — yapan sevap kazanır; özürsüz terk eden günaha girer. Örnekler: beş vakit namaz, Ramazan orucu.",
            },
            {
              de: "**Mustahabb / Sunna / Mandub (empfohlen)** — Lohn fürs Tun, keine Sünde fürs Lassen. Beispiele: Siwak, freiwillige Gebete, Fasten am Montag und Donnerstag.",
              en: "**Mustahabb / sunnah / mandub (recommended)** — reward for doing, no sin for leaving. Examples: miswak, voluntary prayers, fasting on Mondays and Thursdays.",
              tr: "**Müstehap / sünnet / mendup** — yapana sevap, terk edene günah yoktur. Örnekler: misvak, nafile namazlar, pazartesi ve perşembe orucu.",
            },
            {
              de: "**Mubah (erlaubt, neutral)** — weder Lohn noch Sünde. Beispiele: welches erlaubte Essen ich wähle, ein Spaziergang.",
              en: "**Mubah (permissible, neutral)** — neither reward nor sin. Examples: which permissible food I choose, going for a walk.",
              tr: "**Mübah** — ne sevap ne günah. Örnekler: helal yemeklerden hangisini seçtiğim, yürüyüşe çıkmak.",
            },
            {
              de: "**Makruh (verpönt)** — wer es lässt, wird belohnt; wer es tut, begeht keine Sünde im engeren Sinn. Beispiel: im Gebet ohne Grund herumschauen.",
              en: "**Makruh (disliked)** — whoever leaves it is rewarded; whoever does it does not commit a sin in the strict sense. Example: looking around in prayer without reason.",
              tr: "**Mekruh** — terk eden sevap kazanır; yapan dar anlamda günaha girmez. Örnek: namazda sebepsiz yere etrafa bakınmak.",
            },
            {
              de: "**Haram (verboten)** — wer es tut, sündigt; wer es Allah zuliebe lässt, wird belohnt. Beispiele: Lügen, Alkohol, Zins.",
              en: "**Haram (forbidden)** — whoever does it sins; whoever leaves it for Allah's sake is rewarded. Examples: lying, alcohol, interest.",
              tr: "**Haram** — yapan günaha girer; Allah rızası için terk eden sevap kazanır. Örnekler: yalan, içki, faiz.",
            },
          ],
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Die hanafitische Schule unterscheidet feiner: **Fard** ist, was durch einen absolut eindeutigen Beleg feststeht (z. B. die fünf Gebete); **Wajib** ist verpflichtend, aber durch einen weniger eindeutigen Beleg begründet — z. B. das Witr-Gebet, das Festgebet oder die Rezitation der Fatiha im Gebet. Wer ein Fard grundsätzlich leugnet, stellt seinen Glauben infrage; bei einem Wajib gilt das nicht. Entsprechend unterscheiden Hanafiten beim Makruh eine strengere, dem Verbot nahe Stufe (makruh tahriman) und eine leichtere (makruh tanzihan). Für Malikiten, Schafiiten und Hanbaliten sind Fard und Wajib grundsätzlich gleichbedeutend (die hanbalitische Schule kennt beim Gebet allerdings eigene „Wajibat“, deren Vergessen durch die Niederwerfung der Vergesslichkeit ausgeglichen wird — mehr dazu in Lektion 7).",
            en: "The Hanafi school distinguishes more finely: **fard** is what is established by absolutely definitive evidence (e.g. the five prayers); **wajib** is obligatory but based on less definitive evidence — e.g. the witr prayer, the Eid prayer or reciting the Fatiha in prayer. Whoever denies a fard in principle calls their faith into question; this does not apply to a wajib. Likewise, Hanafis distinguish a stricter grade of makruh close to forbidden (makruh tahriman) and a lighter one (makruh tanzihan). For Malikis, Shafi'is and Hanbalis, fard and wajib are in principle synonymous (although the Hanbali school has its own “wajibat” of prayer, whose forgetting is made up for by the prostration of forgetfulness — more on this in lesson 7).",
            tr: "Hanefî mezhebi daha ince bir ayrım yapar: **Farz**, kesin bir delille sabit olandır (ör. beş vakit namaz); **vacip** ise bağlayıcıdır ama daha az kesin bir delile dayanır — ör. vitir namazı, bayram namazı veya namazda Fâtiha okumak. Bir farzı inkâr etmek imanı zedeler; vacip için bu söz konusu değildir. Buna paralel olarak Hanefîler mekruhu harama yakın (tahrîmen mekruh) ve hafif (tenzîhen mekruh) olarak ikiye ayırır. Mâlikî, Şâfiî ve Hanbelîlere göre farz ile vacip esasen aynı anlamdadır (Hanbelî mezhebinin namazda ayrıca, unutulduğunda sehiv secdesiyle telafi edilen “vacipleri” vardır — ayrıntısı 7. derste).",
          },
        },
        {
          type: 'heading',
          text: { de: 'Grundsatz: Erlaubt, bis ein Verbot belegt ist', en: 'Principle: permissible unless a prohibition is proven', tr: 'İlke: Yasak delillenmedikçe serbesttir' },
        },
        {
          type: 'text',
          text: {
            de: "Für Dinge des Alltags — Essen, Kleidung, Technik, Handel — gilt nach der Mehrheit der Gelehrten der Grundsatz: **Alles ist erlaubt, solange kein Beleg es verbietet.** Bei Gottesdiensten gilt das Umgekehrte: Gebete und Rituale werden nicht erfunden, sondern so verrichtet, wie sie überliefert sind. Darum fragt man im Alltag „Gibt es ein Verbot?“, beim Gebet aber „Wie hat es der Prophet ﷺ getan?“.",
            en: "For everyday matters — food, clothing, technology, trade — the majority of scholars hold the principle: **everything is permissible unless evidence forbids it.** For acts of worship the reverse applies: prayers and rituals are not invented but performed as transmitted. So in daily life one asks “Is there a prohibition?”, but in prayer “How did the Prophet ﷺ do it?”.",
            tr: "Gündelik işlerde — yemek, giyim, teknoloji, ticaret — âlimlerin çoğunluğuna göre ilke şudur: **Bir delil yasaklamadıkça her şey mubahtır.** İbadetlerde ise tersi geçerlidir: Namaz ve ibadetler icat edilmez, nakledildiği şekilde yapılır. Bu yüzden günlük hayatta “Bir yasak var mı?”, namazda ise “Peygamber ﷺ bunu nasıl yaptı?” diye sorulur.",
          },
        },
        {
          type: 'quran',
          ref: '2:29',
          arabic: 'هُوَ الَّذِي خَلَقَ لَكُم مَّا فِي الْأَرْضِ جَمِيعًا',
          translation: {
            de: "Er ist es, der für euch alles, was auf der Erde ist, erschaffen hat …",
            en: "It is He who created for you all of that which is on the earth …",
            tr: "O, yeryüzünde ne varsa hepsini sizin için yaratandır …",
          },
        },
        {
          type: 'quran',
          ref: '2:185',
          arabic: 'يُرِيدُ اللَّهُ بِكُمُ الْيُسْرَ وَلَا يُرِيدُ بِكُمُ الْعُسْرَ',
          translation: {
            de: "Allah will für euch Erleichterung; Er will für euch nicht Erschwernis.",
            en: "Allah intends for you ease and does not intend for you hardship.",
            tr: "Allah sizin için kolaylık ister, zorluk istemez.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 7288, Sahih Muslim 1337',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ sagte: „Was ich euch verboten habe, das meidet. Und was ich euch befohlen habe, davon tut, so viel ihr könnt.“",
            en: "The Prophet ﷺ said: “What I have forbidden you, avoid. And what I have commanded you, do of it as much as you are able.”",
            tr: "Peygamber ﷺ şöyle buyurdu: “Size yasakladığım şeylerden kaçının. Size emrettiğim şeyleri de gücünüz yettiği kadar yapın.”",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Absicht macht den Unterschied', en: 'Intention makes the difference', tr: 'Farkı niyet belirler' },
        },
        {
          type: 'text',
          text: {
            de: "Auch eine neutrale (mubah) Handlung kann zur belohnten Tat werden: Wer isst und schläft, um Kraft für Gebet, Familie und Arbeit zu haben, oder sich gut kleidet, um andere zu erfreuen, wird für seine Absicht belohnt.",
            en: "Even a neutral (mubah) act can become a rewarded deed: whoever eats and sleeps to have strength for prayer, family and work, or dresses well to please others, is rewarded for the intention.",
            tr: "Mübah bir iş bile sevaplı bir amele dönüşebilir: Namaz, aile ve iş için güç toplamak amacıyla yiyip uyuyan ya da başkalarını sevindirmek için güzel giyinen kişi niyetinden dolayı sevap kazanır.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1, Sahih Muslim 1907',
          narrator: "'Umar ibn al-Khattab",
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ sagte: „Die Taten werden nur nach den Absichten bewertet, und jedem Menschen steht nur das zu, was er beabsichtigt hat.“",
            en: "The Prophet ﷺ said: “Actions are only by intentions, and every person will have only what they intended.”",
            tr: "Peygamber ﷺ şöyle buyurdu: “Ameller ancak niyetlere göredir. Herkese ancak niyet ettiği şey vardır.”",
          },
        },
        {
          type: 'note',
          variant: 'important',
          text: {
            de: "Nicht jede Sunna ist „nur optional“ im Sinne von unwichtig: Die regelmäßigen Sunna-Handlungen sind der Weg, auf dem der Prophet ﷺ gelebt hat, und schützen die Pflichten. Gleichzeitig darf niemand einem anderen eine Sunna wie eine Pflicht vorwerfen — die Kategorien schützen vor Übertreibung in beide Richtungen.",
            en: "Not every sunnah is “merely optional” in the sense of unimportant: the regular sunnah acts are the way the Prophet ﷺ lived, and they protect the obligations. At the same time, no one may reproach another over a sunnah as if it were an obligation — the categories protect against excess in both directions.",
            tr: "Her sünnet “önemsiz, isteğe bağlı” anlamında değildir: Düzenli sünnetler Peygamber'in ﷺ yaşadığı yoldur ve farzları korur. Öte yandan kimse bir başkasını bir sünneti farzmış gibi ayıplayamaz — hükümler iki yöndeki aşırılığa karşı da korur.",
          },
        },
        { type: 'link', to: '/learn/glossary?term=makruh', label: { de: 'Glossar: Makruh', en: 'Glossary: makruh', tr: 'Sözlük: mekruh' } },
        { type: 'terms', ids: ['fard', 'wajib', 'mustahabb', 'sunnah', 'mubah', 'makruh', 'haram', 'halal', 'niyyah'] },
      ],
      quiz: [
        {
          question: {
            de: "Wie nennt man eine Handlung, für die es Lohn gibt, deren Unterlassen aber keine Sünde ist?",
            en: "What is an act called that brings reward, but whose omission is not a sin?",
            tr: "Yapılmasında sevap olan, terkinde günah olmayan amele ne denir?",
          },
          options: [
            { de: "Fard", en: "Fard", tr: "Farz" },
            { de: "Mustahabb (Sunna)", en: "Mustahabb (sunnah)", tr: "Müstehap (sünnet)" },
            { de: "Makruh", en: "Makruh", tr: "Mekruh" },
          ],
          answer: 1,
          explanation: {
            de: "Mustahabb (auch Sunna oder Mandub) ist empfohlen: Lohn fürs Tun, keine Sünde fürs Lassen.",
            en: "Mustahabb (also sunnah or mandub) is recommended: reward for doing it, no sin for leaving it.",
            tr: "Müstehap (sünnet, mendup) tavsiye edilendir: Yapana sevap, terk edene günah yoktur.",
          },
        },
        {
          question: {
            de: "Was unterscheidet in der hanafitischen Schule Wajib von Fard?",
            en: "In the Hanafi school, what distinguishes wajib from fard?",
            tr: "Hanefî mezhebinde vacibi farzdan ayıran nedir?",
          },
          options: [
            { de: "Wajib ist nur empfohlen", en: "Wajib is only recommended", tr: "Vacip sadece tavsiye edilendir" },
            { de: "Wajib ist verpflichtend, aber durch einen weniger eindeutigen Beleg begründet", en: "Wajib is obligatory but based on less definitive evidence", tr: "Vacip bağlayıcıdır ama daha az kesin bir delile dayanır" },
            { de: "Es gibt keinen Unterschied", en: "There is no difference", tr: "Hiçbir fark yoktur" },
          ],
          answer: 1,
          explanation: {
            de: "Für Hanafiten ist Wajib ebenfalls verpflichtend, beruht aber auf einem nicht absolut eindeutigen Beleg, z. B. das Witr-Gebet. Die anderen Schulen verwenden beide Begriffe grundsätzlich gleichbedeutend.",
            en: "For Hanafis wajib is also obligatory but rests on evidence that is not absolutely definitive, e.g. the witr prayer. The other schools use both terms essentially synonymously.",
            tr: "Hanefîlere göre vacip de bağlayıcıdır, ancak kesinlik derecesi farz kadar olmayan bir delile dayanır; ör. vitir namazı. Diğer mezhepler iki terimi esasen eş anlamlı kullanır.",
          },
        },
        {
          question: {
            de: "Welcher Grundsatz gilt nach der Mehrheit der Gelehrten für Dinge des Alltags (Essen, Technik, Handel)?",
            en: "According to the majority of scholars, which principle applies to everyday matters (food, technology, trade)?",
            tr: "Âlimlerin çoğunluğuna göre gündelik işlerde (yemek, teknoloji, ticaret) hangi ilke geçerlidir?",
          },
          options: [
            { de: "Alles ist verboten, bis es erlaubt wird", en: "Everything is forbidden until permitted", tr: "İzin verilene kadar her şey haramdır" },
            { de: "Alles ist erlaubt, solange kein Beleg es verbietet", en: "Everything is permissible unless evidence forbids it", tr: "Bir delil yasaklamadıkça her şey mubahtır" },
            { de: "Alles ist makruh", en: "Everything is makruh", tr: "Her şey mekruhtur" },
          ],
          answer: 1,
          explanation: {
            de: "Im Alltag ist das Erlaubte die Grundregel (vgl. Koran 2:29). Bei Gottesdiensten dagegen folgt man der Überlieferung.",
            en: "In everyday matters permissibility is the default (cf. Quran 2:29). In worship, by contrast, one follows what has been transmitted.",
            tr: "Gündelik işlerde asıl olan mubahlıktır (bkz. Bakara 2:29). İbadetlerde ise nakledilene uyulur.",
          },
        },
      ],
      sources: [
        'Quran 2:29, 2:185',
        'Sahih al-Bukhari 7288, Sahih Muslim 1337',
        'Sahih al-Bukhari 1, Sahih Muslim 1907',
        FIQH_REF,
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 3 ───────────────────────────────────────────────────────────
    {
      id: 'tahara-water-najasa',
      title: {
        de: 'Tahara: Wasser, Unreinheit und Reinigung',
        en: 'Tahara: water, impurity and cleansing',
        tr: 'Taharet: su, necaset ve temizlik',
      },
      summary: {
        de: "Welches Wasser reinigt, was als Najasa (Unreinheit) gilt, wie man Kleidung und Körper reinigt — und warum Zweifel die Gewissheit nicht aufhebt.",
        en: "Which water purifies, what counts as najasa (impurity), how to clean clothes and body — and why doubt does not override certainty.",
        tr: "Hangi suyun temizlediği, neyin necaset sayıldığı, elbise ve bedenin nasıl temizlendiği — ve şüphenin neden kesinliği ortadan kaldırmadığı.",
      },
      minutes: 6,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Im Fiqh unterscheidet man zwei Arten von Reinheit: die Reinheit von **Najasa** — sichtbarer, materieller Unreinheit wie Urin oder Blut an Körper, Kleidung oder Gebetsplatz — und die Reinheit vom **rituellen Zustand** (Hadath), die durch Wudu oder Ghusl hergestellt wird. Diese Lektion behandelt die erste; Wudu und Ghusl folgen in den nächsten Lektionen.",
            en: "Fiqh distinguishes two kinds of purity: purity from **najasa** — visible, physical impurity such as urine or blood on the body, clothes or place of prayer — and purity from the **ritual state** (hadath), achieved through wudu or ghusl. This lesson covers the first; wudu and ghusl follow in the next lessons.",
            tr: "Fıkıhta iki tür temizlik vardır: **Necasetten** temizlik — beden, elbise veya namaz kılınan yerdeki idrar, kan gibi maddi pislikten — ve **hükmî kirlilikten** (hades) temizlik; bu da abdest veya gusülle sağlanır. Bu ders birincisini ele alıyor; abdest ve gusül sonraki derslerde.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 223',
          narrator: "Abu Malik al-Ash'ari",
          arabic: 'الطُّهُورُ شَطْرُ الْإِيمَانِ',
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ sagte: „Die Reinheit ist die Hälfte des Glaubens.“",
            en: "The Prophet ﷺ said: “Purity is half of faith.”",
            tr: "Peygamber ﷺ şöyle buyurdu: “Temizlik imanın yarısıdır.”",
          },
        },
        {
          type: 'heading',
          text: { de: 'Welches Wasser reinigt?', en: 'Which water purifies?', tr: 'Hangi su temizler?' },
        },
        {
          type: 'text',
          text: {
            de: "Grundsätzlich reinigt jedes natürliche Wasser: Regen-, Leitungs-, Brunnen-, Fluss- und Meerwasser — auch wenn es durch Lagerung, Erde oder Algen leicht verändert ist. Der Prophet ﷺ sagte über das Meer: „Sein Wasser ist rein, und seine toten Tiere sind erlaubt“ (Sunan Abi Dawud 83, Jami at-Tirmidhi 69). Nicht mehr zur rituellen Reinigung geeignet ist Wasser, das durch eine beigemischte Substanz so verändert ist, dass man es nicht mehr einfach „Wasser“ nennt (z. B. Tee, Saft), und Wasser, das durch Najasa in Farbe, Geruch oder Geschmack verändert ist.",
            en: "In principle every natural water purifies: rain, tap, well, river and sea water — even if slightly altered by storage, soil or algae. The Prophet ﷺ said of the sea: “Its water is pure and its dead animals are lawful” (Sunan Abi Dawud 83, Jami at-Tirmidhi 69). Water is no longer suitable for ritual purification if an added substance has changed it so much that it is no longer simply called “water” (e.g. tea, juice), or if najasa has changed its colour, smell or taste.",
            tr: "Esasen her tabii su temizler: yağmur, musluk, kuyu, nehir ve deniz suyu — bekleme, toprak veya yosun nedeniyle biraz değişmiş olsa bile. Peygamber ﷺ deniz hakkında “Onun suyu temiz, ölüsü helaldir” buyurmuştur (Ebû Dâvûd 83, Tirmizî 69). Karışan bir maddeyle artık “su” denmeyecek kadar değişen su (ör. çay, meyve suyu) ve necaset sebebiyle rengi, kokusu veya tadı değişen su ile hükmî temizlik yapılamaz.",
          },
        },
        {
          type: 'quran',
          ref: '25:48',
          arabic: 'وَأَنزَلْنَا مِنَ السَّمَاءِ مَاءً طَهُورًا',
          translation: {
            de: "… und Wir lassen vom Himmel reines Wasser herabkommen.",
            en: "… and We send down from the sky pure water.",
            tr: "… ve gökten tertemiz bir su indirdik.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Ob eine kleine Menge Najasa eine **kleine Wassermenge** unrein macht, auch wenn man nichts davon merkt, beurteilen die Schulen unterschiedlich: Nach malikitischer Schule bleibt Wasser rein, solange sich Farbe, Geruch oder Geschmack nicht verändern. Schafiiten und Hanbaliten setzen eine Grenze von „zwei Qulla“ (etwa 190–270 Liter, je nach Umrechnung): Darunter wird Wasser schon durch Kontakt mit Najasa unrein. Die hanafitische Schule unterscheidet zwischen stehendem großem und kleinem Wasser. Für Leitungswasser und Wasserhähne im Alltag spielt das kaum eine Rolle.",
            en: "Whether a small amount of najasa makes a **small quantity of water** impure even when nothing is noticeable is judged differently: in the Maliki school water stays pure as long as its colour, smell or taste do not change. Shafi'is and Hanbalis set a limit of “two qullas” (roughly 190–270 litres, depending on conversion): below it, water becomes impure through contact with najasa. The Hanafi school distinguishes between large and small standing water. For tap water in daily life this hardly matters.",
            tr: "Az miktardaki necasetin, hiçbir değişiklik fark edilmese bile **az suyu** necis yapıp yapmadığı konusunda mezhepler farklıdır: Mâlikî mezhebine göre rengi, kokusu veya tadı değişmedikçe su temiz kalır. Şâfiî ve Hanbelîler “iki kulle” (hesaplamaya göre yaklaşık 190–270 litre) sınırını esas alır: Bunun altındaki su necasete değmekle necis olur. Hanefî mezhebi durgun suyu çok ve az olarak ayırır. Gündelik hayattaki musluk suyu için bunun pek önemi yoktur.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Was ist Najasa?', en: 'What is najasa?', tr: 'Necaset nedir?' },
        },
        {
          type: 'list',
          items: [
            { de: "Urin und Kot von Menschen und — nach den meisten Gelehrten — von Tieren, deren Fleisch nicht gegessen wird", en: "Urine and faeces of humans and — according to most scholars — of animals whose meat is not eaten", tr: "İnsanın ve — âlimlerin çoğuna göre — eti yenmeyen hayvanların idrarı ve dışkısı" },
            { de: "Fließendes Blut (kleine Mengen sind nach vielen Gelehrten verziehen)", en: "Flowing blood (small amounts are excused according to many scholars)", tr: "Akan kan (birçok âlime göre az miktarı affedilir)" },
            { de: "Verendete Tiere (außer Fisch und Heuschrecken) und Schweine", en: "Carrion (except fish and locusts) and pigs", tr: "Leş (balık ve çekirge hariç) ve domuz" },
            { de: "Erbrochenes (nach den meisten Schulen), Eiter, Wadi und Madhi (Vorflüssigkeit)", en: "Vomit (according to most schools), pus, wadi and madhi (pre-seminal fluid)", tr: "Kusmuk (mezheplerin çoğuna göre), irin, vedi ve mezi" },
          ],
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Beim **Hund** unterscheiden sich die Schulen deutlich: Nach schafiitischer und hanbalitischer Schule ist der Hund insgesamt unrein; was er abgeleckt hat, wird siebenmal gewaschen, einmal davon mit Erde (Sahih Muslim 279). Nach hanafitischer Schule ist vor allem sein Speichel unrein, nicht sein Fell. Nach malikitischer Schule ist der lebende Hund rein; das siebenmalige Waschen eines abgeleckten Gefäßes gilt dort als gottesdienstliche Anweisung, nicht als Beseitigung von Unreinheit. Auch beim Wein (die Mehrheit: unrein) und bei Alkohol in Desinfektionsmitteln und Parfüm gibt es unterschiedliche Bewertungen.",
            en: "The schools differ clearly on **dogs**: in the Shafi'i and Hanbali schools the dog as a whole is impure; whatever it has licked is washed seven times, once with earth (Sahih Muslim 279). In the Hanafi school mainly its saliva is impure, not its fur. In the Maliki school the living dog is pure; washing a licked vessel seven times is considered a devotional instruction rather than removal of impurity. There are also differing assessments of wine (majority: impure) and of alcohol in disinfectants and perfume.",
            tr: "**Köpek** konusunda mezhepler belirgin şekilde ayrılır: Şâfiî ve Hanbelî mezheplerine göre köpeğin tamamı necistir; yaladığı kap biri toprakla olmak üzere yedi kez yıkanır (Müslim 279). Hanefî mezhebine göre özellikle salyası necistir, tüyü değil. Mâlikî mezhebine göre canlı köpek temizdir; yaladığı kabın yedi kez yıkanması necaseti gidermek için değil, taabbudî (ibadet niteliğinde) bir emirdir. Şarap (çoğunluğa göre necis) ile dezenfektan ve parfümlerdeki alkol hakkında da farklı değerlendirmeler vardır.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Wie reinigt man?', en: 'How to clean', tr: 'Nasıl temizlenir?' },
        },
        {
          type: 'list',
          items: [
            { de: "**Kleidung und Körper:** mit Wasser waschen, bis die Najasa entfernt ist. Bleibt nach gründlichem Waschen ein schwer entfernbarer Fleck (Farbe), ist das verziehen.", en: "**Clothes and body:** wash with water until the najasa is removed. If a hard-to-remove stain (colour) remains after thorough washing, it is excused.", tr: "**Elbise ve beden:** necaset gidinceye kadar su ile yıkanır. İyice yıkandıktan sonra çıkmayan bir leke (renk) kalırsa affedilir." },
            { de: "**Unsichtbare Najasa** (z. B. getrockneter Urin): die Stelle waschen; viele Gelehrte empfehlen dreimaliges Waschen.", en: "**Invisible najasa** (e.g. dried urine): wash the spot; many scholars recommend washing three times.", tr: "**Görünmeyen necaset** (ör. kurumuş idrar): yer yıkanır; birçok âlim üç kez yıkamayı tavsiye eder." },
            { de: "**Nach dem Toilettengang (Istinja):** mit Wasser reinigen; Papier ist ebenfalls zulässig, beides zusammen ist am besten. Achtsamkeit gegenüber Urinspritzern ist wichtig — der Prophet ﷺ nannte Nachlässigkeit darin als Grund für Strafe im Grab (Sahih al-Bukhari 218, Sahih Muslim 292).", en: "**After using the toilet (istinja):** clean with water; paper is also permitted, and both together are best. Care about urine splashes matters — the Prophet ﷺ named carelessness in this as a reason for punishment in the grave (Sahih al-Bukhari 218, Sahih Muslim 292).", tr: "**Tuvaletten sonra (istinca):** su ile temizlenir; kâğıt da caizdir, ikisi birlikte en iyisidir. İdrar sıçramalarına dikkat etmek önemlidir — Peygamber ﷺ bu konudaki dikkatsizliği kabir azabı sebeplerinden saymıştır (Buhârî 218, Müslim 292)." },
            { de: "**Teppich oder Boden:** die Stelle mit Wasser reinigen und trocknen lassen bzw. trocken tupfen.", en: "**Carpet or floor:** clean the spot with water and let it dry or pat it dry.", tr: "**Halı veya zemin:** yer su ile temizlenir, kurumaya bırakılır veya kurulanır." },
          ],
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Wie streng Najasa beim Gebet zu beachten ist, unterscheidet sich: Nach hanafitischer Schule ist eine kleine Menge (bis zur Größe einer Handfläche bzw. eines Dirhams) verziehen, auch wenn sie besser entfernt wird. Nach malikitischer Schule ist das Entfernen von Najasa Pflicht, wenn man davon weiß und es kann; wer sie vergessen hat, dessen Gebet bleibt gültig. Schafiiten und Hanbaliten betrachten die Freiheit von Najasa als Bedingung des Gebets, verzeihen aber kleine, schwer vermeidbare Mengen (z. B. etwas Blut).",
            en: "How strictly najasa must be observed in prayer differs: in the Hanafi school a small amount (up to the size of a palm hollow or a dirham) is excused, though it is better removed. In the Maliki school removing najasa is required when one knows of it and is able to; if one forgot it, the prayer remains valid. Shafi'is and Hanbalis consider freedom from najasa a condition of prayer but excuse small, hard-to-avoid amounts (e.g. a little blood).",
            tr: "Namazda necasete ne kadar titizlikle dikkat edileceği farklıdır: Hanefî mezhebinde az miktar (avuç içi çukuru, yani bir dirhem büyüklüğüne kadar) affedilir; yine de gidermek daha iyidir. Mâlikî mezhebinde bilip gücü yettiği hâlde necaseti gidermek gereklidir; unutan kişinin namazı geçerlidir. Şâfiî ve Hanbelîler necasetten temizliği namazın şartı sayar, ancak sakınılması zor az miktarları (ör. biraz kan) affeder.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Gewissheit wird durch Zweifel nicht aufgehoben', en: 'Certainty is not removed by doubt', tr: 'Kesinlik şüpheyle ortadan kalkmaz' },
        },
        {
          type: 'text',
          text: {
            de: "Eine der wichtigsten Regeln des Fiqh lautet: **Was sicher ist, wird durch bloßen Zweifel nicht aufgehoben.** Wer sicher ist, dass seine Kleidung rein war, und nur unsicher ist, ob ein Tropfen darauf kam, betrachtet sie als rein. Das schützt vor Zwangsgedanken (Waswasa) — Reinheit soll Ruhe bringen, keine Angst.",
            en: "One of the most important rules of fiqh is: **what is certain is not removed by mere doubt.** Whoever is sure their clothes were clean and only unsure whether a drop got on them considers them clean. This protects against obsessive thoughts (waswasa) — purity is meant to bring calm, not anxiety.",
            tr: "Fıkhın en önemli kurallarından biri şudur: **Kesin olan şey, şüpheyle ortadan kalkmaz.** Elbisesinin temiz olduğundan emin olan ve yalnızca üzerine bir damla sıçrayıp sıçramadığından şüphe eden kişi onu temiz kabul eder. Bu kural vesveseye karşı korur — temizlik huzur vermeli, korku değil.",
          },
        },
        {
          type: 'quran',
          ref: '2:222',
          arabic: 'إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ',
          translation: {
            de: "Gewiss, Allah liebt die sich (in Reue) Umkehrenden, und Er liebt die sich Reinigenden.",
            en: "Indeed, Allah loves those who are constantly repentant and loves those who purify themselves.",
            tr: "Şüphesiz Allah, çok tövbe edenleri sever, çok temizlenenleri sever.",
          },
        },
        { type: 'link', to: '/learn/glossary?term=najasa', label: { de: 'Glossar: Najasa', en: 'Glossary: najasa', tr: 'Sözlük: necaset' } },
        { type: 'terms', ids: ['tahara', 'najasa', 'istinja', 'wudu', 'ghusl'] },
      ],
      quiz: [
        {
          question: {
            de: "Kann man mit Meerwasser das Wudu verrichten?",
            en: "Can one perform wudu with sea water?",
            tr: "Deniz suyuyla abdest alınabilir mi?",
          },
          options: [
            { de: "Nein, nur mit Süßwasser", en: "No, only with fresh water", tr: "Hayır, yalnızca tatlı suyla" },
            { de: "Ja, der Prophet ﷺ nannte sein Wasser rein", en: "Yes, the Prophet ﷺ called its water pure", tr: "Evet, Peygamber ﷺ onun suyunun temiz olduğunu söyledi" },
            { de: "Nur im Notfall", en: "Only in an emergency", tr: "Yalnızca zorunlu durumda" },
          ],
          answer: 1,
          explanation: {
            de: "Meerwasser ist natürliches Wasser und reinigt. Der Prophet ﷺ sagte: „Sein Wasser ist rein, und seine toten Tiere sind erlaubt.“",
            en: "Sea water is natural water and purifies. The Prophet ﷺ said: “Its water is pure and its dead animals are lawful.”",
            tr: "Deniz suyu tabii sudur ve temizler. Peygamber ﷺ “Onun suyu temiz, ölüsü helaldir” buyurmuştur.",
          },
        },
        {
          question: {
            de: "Du bist sicher, dass deine Kleidung rein war, und zweifelst nur, ob ein Spritzer daraufkam. Was gilt?",
            en: "You are sure your clothes were clean and only doubt whether a splash got on them. What applies?",
            tr: "Elbisenin temiz olduğundan eminsin, yalnızca üzerine bir şey sıçrayıp sıçramadığından şüphe ediyorsun. Hüküm nedir?",
          },
          options: [
            { de: "Sie gilt als rein — Zweifel hebt Gewissheit nicht auf", en: "It counts as clean — doubt does not remove certainty", tr: "Temiz sayılır — şüphe kesinliği ortadan kaldırmaz" },
            { de: "Sie muss sicherheitshalber gewaschen werden, sonst ist das Gebet ungültig", en: "It must be washed to be safe, otherwise the prayer is invalid", tr: "Tedbiren yıkanmalıdır, yoksa namaz geçersizdir" },
            { de: "Man darf in ihr nie wieder beten", en: "One may never pray in it again", tr: "Onunla bir daha namaz kılınamaz" },
          ],
          answer: 0,
          explanation: {
            de: "Was sicher ist, wird durch bloßen Zweifel nicht aufgehoben. Diese Regel schützt auch vor Waswasa (zwanghaften Zweifeln).",
            en: "What is certain is not removed by mere doubt. This rule also protects against waswasa (obsessive doubts).",
            tr: "Kesin olan şey şüpheyle ortadan kalkmaz. Bu kural vesveseye karşı da korur.",
          },
        },
        {
          question: {
            de: "Wie sehen die Rechtsschulen den lebenden Hund?",
            en: "How do the schools view a living dog?",
            tr: "Mezhepler canlı köpeğe nasıl bakar?",
          },
          options: [
            { de: "Alle halten ihn für vollständig unrein", en: "All consider it entirely impure", tr: "Hepsi tamamen necis kabul eder" },
            { de: "Unterschiedlich: z. B. Schafiiten/Hanbaliten unrein, Malikiten rein, Hanafiten vor allem den Speichel unrein", en: "Differently: e.g. Shafi'is/Hanbalis impure, Malikis pure, Hanafis mainly the saliva impure", tr: "Farklı: ör. Şâfiî/Hanbelîler necis, Mâlikîler temiz, Hanefîler özellikle salyasını necis kabul eder" },
            { de: "Alle halten ihn für vollständig rein", en: "All consider it entirely pure", tr: "Hepsi tamamen temiz kabul eder" },
          ],
          answer: 1,
          explanation: {
            de: "Hier unterscheiden sich die Schulen deutlich. Folge der Lehrmeinung, die dir dein Lehrer erklärt, und respektiere die anderen.",
            en: "The schools clearly differ here. Follow the view your teacher explains to you and respect the others.",
            tr: "Mezhepler burada belirgin şekilde ayrılır. Hocanın sana açıkladığı görüşe uy, diğerlerine saygı göster.",
          },
        },
      ],
      sources: [
        'Quran 25:48, 2:222',
        'Sahih Muslim 223',
        'Sunan Abi Dawud 83, Jami at-Tirmidhi 69 (Meerwasser)',
        'Sahih Muslim 279 (Gefäß, das ein Hund abgeleckt hat)',
        'Sahih al-Bukhari 218, Sahih Muslim 292 (die zwei Gräber)',
        FIQH_REF,
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 4 ───────────────────────────────────────────────────────────
    {
      id: 'wudu-in-detail',
      title: {
        de: 'Wudu im Detail',
        en: 'Wudu in detail',
        tr: 'Ayrıntılı abdest',
      },
      summary: {
        de: "Pflichtteile und Sunna des Wudu, was es ungültig macht und wo die Rechtsschulen sich unterscheiden — z. B. bei Berührung oder Blutungen.",
        en: "The obligatory and sunnah parts of wudu, what breaks it and where the schools differ — e.g. on touching or bleeding.",
        tr: "Abdestin farzları ve sünnetleri, abdesti neyin bozduğu ve mezheplerin nerede ayrıldığı — ör. dokunma veya kanama konusunda.",
      },
      minutes: 8,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Den Ablauf des Wudu kennst du vielleicht schon. Hier geht es um das **Warum**: Welche Teile sind unverzichtbar, welche vervollständigen das Wudu, und was hebt es auf? Grundlage ist Koran 5:6, erklärt durch die Praxis des Propheten ﷺ.",
            en: "You may already know the sequence of wudu. This lesson is about the **why**: which parts are indispensable, which complete it, and what breaks it? The basis is Quran 5:6, explained by the practice of the Prophet ﷺ.",
            tr: "Abdestin sırasını belki biliyorsun. Burada konu **neden** sorusudur: Hangi parçalar vazgeçilmezdir, hangileri abdesti tamamlar ve abdesti ne bozar? Temel, Peygamber'in ﷺ uygulamasıyla açıklanan Mâide 5:6'dır.",
          },
        },
        {
          type: 'quran',
          ref: '5:6',
          translation: {
            de: "O die ihr glaubt, wenn ihr euch zum Gebet aufstellt, dann wascht euch das Gesicht und die Hände bis zu den Ellbogen und streicht euch über den Kopf und (wascht euch) die Füße bis zu den Knöcheln …",
            en: "O you who have believed, when you rise to [perform] prayer, wash your faces and your forearms to the elbows and wipe over your heads and wash your feet to the ankles …",
            tr: "Ey iman edenler! Namaza kalktığınız zaman yüzlerinizi, dirseklere kadar ellerinizi yıkayın; başlarınızı meshedin ve topuklara kadar ayaklarınızı yıkayın …",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Pflichtteile', en: 'The obligatory parts', tr: 'Abdestin farzları' },
        },
        {
          type: 'text',
          text: {
            de: "Alle vier Schulen sind sich über die vier im Vers genannten Teile einig: **Gesicht waschen** (von der Stirn bis zum Kinn, von Ohr zu Ohr), **Arme einschließlich Ellbogen waschen**, **über den Kopf streichen** und **Füße einschließlich Knöchel waschen**. Wie viel vom Kopf und welche weiteren Pflichtteile hinzukommen, ist unterschiedlich.",
            en: "All four schools agree on the four parts named in the verse: **washing the face** (from forehead to chin, ear to ear), **washing the arms including the elbows**, **wiping the head** and **washing the feet including the ankles**. How much of the head, and which further obligatory parts are added, differs.",
            tr: "Dört mezhep de ayette sayılan dört farzda hemfikirdir: **Yüzü yıkamak** (alından çeneye, kulaktan kulağa), **kolları dirseklerle birlikte yıkamak**, **başı meshetmek** ve **ayakları topuklarla birlikte yıkamak**. Başın ne kadarının meshedileceği ve hangi farzların ekleneceği ise farklıdır.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "**Hanafitisch:** vier Pflichtteile (die des Verses); über mindestens ein Viertel des Kopfes streichen; die Absicht ist Sunna. **Schafiitisch:** sechs — dazu Absicht und Reihenfolge; schon das Bestreichen eines Teils des Kopfes genügt. **Malikitisch:** sieben — dazu Absicht, Reiben der Glieder (Dalk) und Zügigkeit ohne lange Unterbrechung; über den ganzen Kopf streichen. **Hanbalitisch:** sechs — dazu Reihenfolge und Zügigkeit; Mund- und Nasenspülen gehören als Teil des Gesichts zur Pflicht, über den ganzen Kopf (mit den Ohren) streichen; die Absicht ist Bedingung, und das „Bismillah“ ist nach der bekannten Lehrmeinung Pflicht, sofern man daran denkt.",
            en: "**Hanafi:** four obligatory parts (those of the verse); wipe at least a quarter of the head; intention is sunnah. **Shafi'i:** six — adding intention and sequence; wiping any part of the head suffices. **Maliki:** seven — adding intention, rubbing the limbs (dalk) and continuity without long interruption; wipe the whole head. **Hanbali:** six — adding sequence and continuity; rinsing mouth and nose is obligatory as part of the face, wipe the whole head (with the ears); intention is a condition, and saying “Bismillah” is obligatory in the well-known position, if one remembers.",
            tr: "**Hanefî:** dört farz (ayettekiler); başın en az dörtte birini meshetmek; niyet sünnettir. **Şâfiî:** altı — niyet ve tertip eklenir; başın bir kısmını meshetmek yeterlidir. **Mâlikî:** yedi — niyet, organları ovmak (delk) ve ara vermeden peş peşe yıkamak (fevr) eklenir; başın tamamı meshedilir. **Hanbelî:** altı — tertip ve muvâlât eklenir; ağza ve burna su vermek yüzün parçası olarak farzdır, başın tamamı (kulaklarla) meshedilir; niyet şarttır ve meşhur görüşe göre hatırlandığında besmele vaciptir.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 60, Sahih Muslim 241',
          narrator: "'Abdullah ibn 'Amr",
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ sah Leute, deren Fersen beim Wudu trocken geblieben waren, und rief: „Wehe den Fersen vor dem Feuer!“",
            en: "The Prophet ﷺ saw people whose heels had remained dry during wudu and called out: “Woe to the heels from the Fire!”",
            tr: "Peygamber ﷺ abdest alırken topukları kuru kalan kimseleri gördü ve “Ateşe karşı vay o topukların haline!” diye seslendi.",
          },
        },
        {
          type: 'note',
          variant: 'important',
          text: {
            de: "Das Wasser muss die Haut erreichen. Was eine wasserdichte Schicht bildet — z. B. normaler Nagellack oder wasserfeste Farbe — muss vor dem Wudu entfernt werden. Henna oder Tinte, die nur eine Färbung hinterlassen, stören nicht.",
            en: "Water must reach the skin. Anything that forms a waterproof layer — e.g. regular nail polish or waterproof paint — must be removed before wudu. Henna or ink that only leaves a colour does not affect it.",
            tr: "Su cilde ulaşmalıdır. Su geçirmez bir tabaka oluşturan şeyler — ör. normal oje veya su geçirmez boya — abdestten önce çıkarılmalıdır. Yalnızca renk bırakan kına veya mürekkep engel değildir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Sunna des Wudu', en: 'The sunnah of wudu', tr: 'Abdestin sünnetleri' },
        },
        {
          type: 'list',
          items: [
            { de: "Mit „Bismillah“ beginnen und die Hände zu Beginn waschen", en: "Begin with “Bismillah” and wash the hands at the start", tr: "Besmele ile başlamak ve önce elleri yıkamak" },
            { de: "Siwak bzw. Zähneputzen", en: "Using miswak or brushing the teeth", tr: "Misvak kullanmak veya dişleri fırçalamak" },
            { de: "Mund und Nase spülen (nach hanbalitischer Schule Pflicht)", en: "Rinsing mouth and nose (obligatory in the Hanbali school)", tr: "Ağza ve burna su vermek (Hanbelî mezhebinde farz)" },
            { de: "Jedes Glied dreimal waschen und rechts beginnen", en: "Washing each limb three times and starting with the right", tr: "Her organı üç kez yıkamak ve sağdan başlamak" },
            { de: "Finger und Zehen sowie einen dichten Bart mit Wasser durchkämmen", en: "Running water between fingers and toes and through a thick beard", tr: "Parmak aralarını ve sık sakalı hilallemek" },
            { de: "Die Ohren bestreichen", en: "Wiping the ears", tr: "Kulakları meshetmek" },
            { de: "Nach dem Wudu das Glaubensbekenntnis sprechen", en: "Saying the testimony of faith after wudu", tr: "Abdestten sonra kelime-i şehadet getirmek" },
          ],
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 234',
          narrator: "'Uqba ibn 'Amir / 'Umar ibn al-Khattab",
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ sagte sinngemäß: Wer das Wudu sorgfältig verrichtet und dann sagt: „Ich bezeuge, dass es keinen Gott gibt außer Allah, allein, ohne Partner, und ich bezeuge, dass Muhammad Sein Diener und Gesandter ist“, dem werden die acht Tore des Paradieses geöffnet, und er tritt ein, durch welches er will.",
            en: "The Prophet ﷺ said (in meaning): whoever performs wudu thoroughly and then says: “I bear witness that there is no god but Allah alone, without partner, and I bear witness that Muhammad is His servant and Messenger”, the eight gates of Paradise are opened for him and he may enter through whichever he wishes.",
            tr: "Peygamber ﷺ meâlen şöyle buyurdu: Kim abdestini güzelce alır, sonra “Allah'tan başka ilah olmadığına, O'nun tek olup ortağı bulunmadığına şehadet ederim; Muhammed'in O'nun kulu ve elçisi olduğuna şehadet ederim” derse, ona cennetin sekiz kapısı açılır, dilediğinden girer.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Was das Wudu aufhebt', en: 'What breaks wudu', tr: 'Abdesti bozan şeyler' },
        },
        {
          type: 'list',
          items: [
            { de: "**Einigkeit:** alles, was aus den beiden Ausscheidungswegen austritt (Urin, Stuhl, Winde, Madhi)", en: "**Agreed:** anything exiting from the two passages (urine, stool, wind, madhi)", tr: "**İttifakla:** iki yoldan çıkan her şey (idrar, dışkı, yel, mezi)" },
            { de: "**Einigkeit:** Verlust des Bewusstseins durch Ohnmacht, Rausch oder Narkose", en: "**Agreed:** loss of consciousness through fainting, intoxication or anaesthesia", tr: "**İttifakla:** bayılma, sarhoşluk veya narkoz sebebiyle aklın gitmesi" },
            { de: "**Tiefer Schlaf** — ob auch Schlaf in fest sitzender Haltung zählt, regeln die Schulen im Detail unterschiedlich", en: "**Deep sleep** — whether sleep while sitting firmly also counts is regulated differently in detail by the schools", tr: "**Derin uyku** — sağlam oturarak uyumanın da bozup bozmadığı mezheplerde ayrıntılı olarak farklı düzenlenir" },
            { de: "**Alles, was Ghusl erfordert** (siehe nächste Lektion)", en: "**Anything that requires ghusl** (see next lesson)", tr: "**Gusül gerektiren her şey** (sonraki derse bakınız)" },
          ],
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "**Berührung des anderen Geschlechts:** Nach schafiitischer Schule hebt direkter Hautkontakt mit einer erwachsenen Person des anderen Geschlechts, die kein Mahram ist, das Wudu auf — gestützt auf den Wortlaut „oder ihr Frauen berührt habt“ (5:6). Malikiten und Hanbaliten: nur, wenn die Berührung mit Begierde geschieht. Hanafiten: Berührung hebt das Wudu nicht auf; sie verstehen den Vers als Umschreibung für Geschlechtsverkehr. **Blut und Erbrechen:** Nach hanafitischer Schule heben austretendes, fließendes Blut oder Eiter sowie Erbrechen in Mundvoll-Menge das Wudu auf; nach hanbalitischer Schule nur große Mengen; nach malikitischer und schafiitischer Schule nicht. **Berühren der eigenen Scham mit der Hand:** hebt nach schafiitischer, hanbalitischer und malikitischer Schule (mit Details) das Wudu auf, nach hanafitischer nicht. **Kamelfleisch** hebt nach hanbalitischer Schule das Wudu auf (Sahih Muslim 360), nach den anderen nicht. **Lautes Lachen im Gebet** hebt nach hanafitischer Schule auch das Wudu auf, nach den anderen nur das Gebet.",
            en: "**Touching the opposite sex:** in the Shafi'i school direct skin contact with an adult of the opposite sex who is not a mahram breaks wudu — based on the wording “or you have touched women” (5:6). Malikis and Hanbalis: only if the touch happens with desire. Hanafis: touch does not break wudu; they understand the verse as a euphemism for intercourse. **Blood and vomit:** in the Hanafi school flowing blood or pus leaving the body, and vomit filling the mouth, break wudu; in the Hanbali school only large amounts; in the Maliki and Shafi'i schools they do not. **Touching one's private part with the hand:** breaks wudu in the Shafi'i, Hanbali and Maliki schools (with details), not in the Hanafi school. **Camel meat** breaks wudu in the Hanbali school (Sahih Muslim 360), not in the others. **Laughing aloud in prayer** also breaks wudu in the Hanafi school; in the others it only invalidates the prayer.",
            tr: "**Karşı cinse dokunmak:** Şâfiî mezhebine göre mahrem olmayan yetişkin karşı cinsle doğrudan ten temasının abdesti bozduğu kabul edilir — “ya da kadınlara dokunmuşsanız” (5:6) ifadesinin lafzına dayanılır. Mâlikî ve Hanbelîler: yalnızca şehvetle dokunulursa. Hanefîler: dokunmak abdesti bozmaz; ayeti cinsel ilişkiden kinaye olarak anlarlar. **Kan ve kusmuk:** Hanefî mezhebine göre bedenden çıkıp akan kan veya irin ile ağız dolusu kusmak abdesti bozar; Hanbelî mezhebinde yalnızca çok miktarı; Mâlikî ve Şâfiî mezheplerinde bozmaz. **Avret mahalline elle dokunmak:** Şâfiî, Hanbelî ve (ayrıntılarıyla) Mâlikî mezhebinde abdesti bozar, Hanefî mezhebinde bozmaz. **Deve eti** Hanbelî mezhebinde abdesti bozar (Müslim 360), diğerlerinde bozmaz. **Namazda kahkaha** Hanefî mezhebinde abdesti de bozar, diğerlerinde yalnızca namazı bozar.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 137, Sahih Muslim 361',
          narrator: "'Abdullah ibn Zayd",
          grade: 'sahih',
          text: {
            de: "Man fragte den Propheten ﷺ nach jemandem, der im Gebet meint, etwas (einen Wind) zu spüren. Er sagte: „Er soll nicht weggehen, bis er einen Laut hört oder einen Geruch wahrnimmt.“",
            en: "The Prophet ﷺ was asked about someone who imagines feeling something (passing wind) during prayer. He said: “He should not leave until he hears a sound or perceives a smell.”",
            tr: "Peygamber'e ﷺ namazda bir şey (yel) hissettiğini sanan kişi soruldu. Şöyle buyurdu: “Bir ses duymadıkça veya bir koku almadıkça namazdan ayrılmasın.”",
          },
        },
        {
          type: 'heading',
          text: { de: 'Erleichterung: Über Socken streichen', en: 'Concession: wiping over socks', tr: 'Kolaylık: mest üzerine mesh' },
        },
        {
          type: 'text',
          text: {
            de: "Wer Ledersocken (Khuff) im Zustand des Wudu angezogen hat, darf beim nächsten Wudu darüber streichen, statt die Füße zu waschen — für Ansässige einen Tag und eine Nacht, für Reisende drei Tage und Nächte (Sahih Muslim 276). Das erkennen alle vier Schulen an. Für gewöhnliche dünne Stoffsocken verlangen die klassischen Schulen bestimmte Eigenschaften (z. B. dass sie fest sind und man darin gehen kann); einige Gelehrte sind hier großzügiger. Frag nach, welcher Ansicht deine Gemeinde folgt.",
            en: "Whoever has put on leather socks (khuff) in a state of wudu may wipe over them at the next wudu instead of washing the feet — for residents one day and night, for travellers three days and nights (Sahih Muslim 276). All four schools recognise this. For ordinary thin fabric socks the classical schools require certain properties (e.g. that they are sturdy and one can walk in them); some scholars are more lenient here. Ask which view your community follows.",
            tr: "Abdestli iken mest giyen kişi sonraki abdestlerde ayaklarını yıkamak yerine mestlerin üzerine mesh edebilir — mukim bir gün bir gece, yolcu üç gün üç gece (Müslim 276). Dört mezhep de bunu kabul eder. Sıradan ince kumaş çoraplar için klasik mezhepler belirli özellikler arar (ör. sağlam olması ve onlarla yürünebilmesi); bazı âlimler bu konuda daha geniş davranır. Cemaatinin hangi görüşü takip ettiğini sor.",
          },
        },
        { type: 'link', to: '/guide', label: { de: 'Wudu Schritt für Schritt', en: 'Wudu step by step', tr: 'Adım adım abdest' } },
        { type: 'terms', ids: ['wudu', 'niyyah', 'mash-khuffayn', 'mahram', 'najasa', 'fard', 'sunnah'] },
      ],
      quiz: [
        {
          question: {
            de: "Welche Pflichtteile des Wudu sind zwischen allen vier Schulen unstrittig?",
            en: "Which obligatory parts of wudu are undisputed among all four schools?",
            tr: "Abdestin hangi farzları dört mezhep arasında tartışmasızdır?",
          },
          options: [
            { de: "Die vier im Vers 5:6 genannten: Gesicht, Arme, Kopf (streichen), Füße", en: "The four named in verse 5:6: face, arms, head (wiping), feet", tr: "5:6'da sayılan dördü: yüz, kollar, baş (mesh), ayaklar" },
            { de: "Absicht und Reihenfolge", en: "Intention and sequence", tr: "Niyet ve tertip" },
            { de: "Mund- und Nasenspülen", en: "Rinsing mouth and nose", tr: "Ağza ve burna su vermek" },
          ],
          answer: 0,
          explanation: {
            de: "Die vier im Koran genannten Teile sind einstimmig Pflicht. Absicht, Reihenfolge, Zügigkeit oder Mund- und Nasenspülen sind nur nach einzelnen Schulen Pflicht.",
            en: "The four parts named in the Quran are obligatory by consensus. Intention, sequence, continuity or rinsing mouth and nose are obligatory only according to certain schools.",
            tr: "Kur'an'da sayılan dört farz ittifakla farzdır. Niyet, tertip, muvâlât veya ağza-burna su vermek ise yalnızca bazı mezheplere göre farzdır.",
          },
        },
        {
          question: {
            de: "Hebt das Berühren der Hand einer fremden Person des anderen Geschlechts das Wudu auf?",
            en: "Does touching the hand of an unrelated person of the opposite sex break wudu?",
            tr: "Yabancı karşı cinsten birinin eline dokunmak abdesti bozar mı?",
          },
          options: [
            { de: "Ja, nach allen Schulen", en: "Yes, according to all schools", tr: "Evet, bütün mezheplere göre" },
            { de: "Die Schulen unterscheiden sich: Schafiiten ja, Malikiten/Hanbaliten nur mit Begierde, Hanafiten nein", en: "The schools differ: Shafi'is yes, Malikis/Hanbalis only with desire, Hanafis no", tr: "Mezhepler farklıdır: Şâfiîler evet, Mâlikî/Hanbelîler yalnızca şehvetle, Hanefîler hayır" },
            { de: "Nein, nach allen Schulen", en: "No, according to all schools", tr: "Hayır, bütün mezheplere göre" },
          ],
          answer: 1,
          explanation: {
            de: "Die Frage hängt an der Auslegung von „oder ihr Frauen berührt habt“ in 5:6 — wörtliche Berührung oder Umschreibung für Geschlechtsverkehr.",
            en: "The question depends on interpreting “or you have touched women” in 5:6 — literal touch or a euphemism for intercourse.",
            tr: "Mesele 5:6'daki “ya da kadınlara dokunmuşsanız” ifadesinin yorumuna bağlıdır — lafzi dokunma mı, cinsel ilişkiden kinaye mi.",
          },
        },
        {
          question: {
            de: "Du hast im Gebet den Eindruck, ein Wind sei abgegangen, bist dir aber nicht sicher. Was lehrt der Hadith?",
            en: "In prayer you have the impression that you passed wind but are not sure. What does the hadith teach?",
            tr: "Namazda yel çıktığını sanıyorsun ama emin değilsin. Hadis ne öğretir?",
          },
          options: [
            { de: "Sofort abbrechen und neues Wudu nehmen", en: "Stop immediately and renew wudu", tr: "Hemen bırakıp abdest tazelemek" },
            { de: "Weiterbeten, solange kein Laut oder Geruch sicher wahrgenommen wird", en: "Continue praying unless a sound or smell is clearly perceived", tr: "Kesin bir ses veya koku olmadıkça namaza devam etmek" },
            { de: "Das Gebet später zweimal wiederholen", en: "Repeat the prayer twice later", tr: "Namazı sonra iki kez tekrarlamak" },
          ],
          answer: 1,
          explanation: {
            de: "Die Gewissheit, Wudu zu haben, wird durch bloßen Zweifel nicht aufgehoben (Sahih al-Bukhari 137, Sahih Muslim 361).",
            en: "The certainty of having wudu is not removed by mere doubt (Sahih al-Bukhari 137, Sahih Muslim 361).",
            tr: "Abdestli olma kesinliği yalnızca şüpheyle ortadan kalkmaz (Buhârî 137, Müslim 361).",
          },
        },
      ],
      sources: [
        'Quran 5:6',
        'Sahih al-Bukhari 60, Sahih Muslim 241 (die Fersen)',
        'Sahih Muslim 234 (Dua nach dem Wudu)',
        'Sahih al-Bukhari 137, Sahih Muslim 361 (Zweifel)',
        'Sahih Muslim 276 (Mash über die Khuff)',
        'Sahih Muslim 360 (Kamelfleisch)',
        FIQH_REF,
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 5 ───────────────────────────────────────────────────────────
    {
      id: 'ghusl-tayammum',
      title: {
        de: 'Ghusl und Tayammum',
        en: 'Ghusl and tayammum',
        tr: 'Gusül ve teyemmüm',
      },
      summary: {
        de: "Wann die Ganzkörperwaschung Pflicht ist, wie sie richtig geht — und wie die Trockenreinigung funktioniert, wenn Wasser fehlt oder schadet.",
        en: "When the full-body wash is obligatory, how to do it correctly — and how dry purification works when water is missing or harmful.",
        tr: "Boy abdestinin ne zaman farz olduğu, nasıl doğru alındığı — ve su bulunmadığında veya zarar verdiğinde teyemmümün nasıl yapıldığı.",
      },
      minutes: 7,
      blocks: [
        {
          type: 'heading',
          text: { de: 'Wann ist Ghusl Pflicht?', en: 'When is ghusl obligatory?', tr: 'Gusül ne zaman farzdır?' },
        },
        {
          type: 'list',
          items: [
            { de: "Nach Geschlechtsverkehr (auch ohne Samenerguss) und nach Samenerguss, auch im Schlaf (Dschanaba)", en: "After sexual intercourse (even without ejaculation) and after ejaculation, including in sleep (janaba)", tr: "Cinsel ilişkiden sonra (boşalma olmasa da) ve uykuda da olsa meni gelmesinden sonra (cünüplük)" },
            { de: "Nach dem Ende der Menstruation und der Wochenbettblutung (Nifas)", en: "After the end of menstruation and postnatal bleeding (nifas)", tr: "Hayız ve nifasın sona ermesinden sonra" },
            { de: "Für Verstorbene (eine Gemeinschaftspflicht der Lebenden)", en: "For the deceased (a communal obligation of the living)", tr: "Ölen kişi için (yaşayanlara farz-ı kifaye)" },
          ],
        },
        {
          type: 'quran',
          ref: '5:6',
          translation: {
            de: "… Und wenn ihr im Zustand der Unreinheit (dschunub) seid, dann reinigt euch. Und wenn ihr krank seid oder auf einer Reise oder einer von euch vom Abort kommt oder ihr Frauen berührt habt und dann kein Wasser findet, so wendet euch dem guten Erdboden zu und streicht euch damit über das Gesicht und die Hände. Allah will euch keine Bedrängnis auferlegen, sondern Er will euch reinigen …",
            en: "… And if you are in a state of janabah, then purify yourselves. But if you are ill or on a journey or one of you comes from the place of relieving himself or you have contacted women and do not find water, then seek clean earth and wipe over your faces and hands with it. Allah does not intend to make difficulty for you, but He intends to purify you …",
            tr: "… Eğer cünüp iseniz boy abdesti alın. Eğer hasta iseniz veya yolculukta iseniz yahut biriniz tuvaletten gelmişse ya da kadınlara dokunmuşsanız ve su bulamamışsanız temiz bir toprakla teyemmüm edin; yüzlerinizi ve ellerinizi onunla meshedin. Allah size güçlük çıkarmak istemez, fakat sizi temizlemek … ister …",
          },
        },
        {
          type: 'heading',
          text: { de: 'So geht der Ghusl', en: 'How to perform ghusl', tr: 'Gusül nasıl alınır?' },
        },
        {
          type: 'text',
          text: {
            de: "**Pflicht** ist im Kern: Wasser muss den gesamten Körper erreichen, einschließlich Haaransatz und Hautfalten. Die **Sunna-Form** beschreibt Aischa (Sahih al-Bukhari 248, Sahih Muslim 316): Absicht fassen, „Bismillah“, Hände waschen, Intimbereich reinigen, ein vollständiges Wudu verrichten, Wasser dreimal über den Kopf gießen und mit den Fingern bis zur Kopfhaut durchkämmen, dann den ganzen Körper waschen, rechts beginnend.",
            en: "The **obligation** at its core: water must reach the entire body, including the hairline and skin folds. The **sunnah form** is described by Aisha (Sahih al-Bukhari 248, Sahih Muslim 316): make the intention, say “Bismillah”, wash the hands, clean the private parts, perform a complete wudu, pour water over the head three times running the fingers through to the scalp, then wash the whole body, starting with the right side.",
            tr: "**Farz** olan özünde şudur: Su saç dipleri ve deri kıvrımları dahil bütün bedene ulaşmalıdır. **Sünnete uygun gusül**ü Hz. Âişe anlatır (Buhârî 248, Müslim 316): Niyet etmek, besmele çekmek, elleri yıkamak, avret mahallini temizlemek, tam bir abdest almak, başa üç kez su döküp parmaklarla saç diplerine ulaştırmak, sonra sağdan başlayarak bütün bedeni yıkamak.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "**Hanafitisch:** drei Pflichtteile — Mund spülen, Nase spülen und den ganzen Körper waschen; die Absicht ist Sunna. **Schafiitisch:** Absicht und das Waschen des ganzen Körpers; Mund- und Nasenspülen sind Sunna. **Malikitisch:** u. a. Absicht, den ganzen Körper waschen, Reiben (Dalk) und Zügigkeit. **Hanbalitisch:** den ganzen Körper einschließlich Mund und Nase waschen, mit der Absicht als Bedingung. Dass man bei Unsicherheit über ein Detail lieber gründlich wäscht, empfehlen alle.",
            en: "**Hanafi:** three obligatory parts — rinsing the mouth, rinsing the nose and washing the whole body; intention is sunnah. **Shafi'i:** intention and washing the whole body; rinsing mouth and nose are sunnah. **Maliki:** among others intention, washing the whole body, rubbing (dalk) and continuity. **Hanbali:** washing the whole body including mouth and nose, with intention as a condition. All recommend washing thoroughly when unsure about a detail.",
            tr: "**Hanefî:** üç farz — ağza su vermek, burna su vermek ve bütün bedeni yıkamak; niyet sünnettir. **Şâfiî:** niyet ve bütün bedeni yıkamak; ağza ve burna su vermek sünnettir. **Mâlikî:** diğerlerinin yanında niyet, bütün bedeni yıkamak, ovmak (delk) ve muvâlât. **Hanbelî:** ağız ve burun dahil bütün bedeni yıkamak; niyet şarttır. Bir ayrıntıda emin olunmadığında titizlikle yıkamayı hepsi tavsiye eder.",
          },
        },
        {
          type: 'note',
          variant: 'important',
          text: {
            de: "Im Zustand der Dschanaba sowie während Menstruation und Wochenbett sind u. a. das Gebet und der Tawaf nicht erlaubt; nach der Mehrheit auch das Berühren des Korans und der Aufenthalt in der Moschee. Bei der Rezitation des Korans aus dem Gedächtnis durch menstruierende Frauen unterscheiden sich die Schulen — die malikitische Schule erlaubt sie z. B. Lass den Ghusl nicht unnötig aufschieben, damit kein Gebet verpasst wird.",
            en: "In the state of janaba and during menstruation and postnatal bleeding, prayer and tawaf among other things are not permitted; according to the majority also touching the Quran and staying in the mosque. The schools differ on menstruating women reciting the Quran from memory — the Maliki school permits it, for example. Do not delay ghusl unnecessarily, so that no prayer is missed.",
            tr: "Cünüplük, hayız ve nifas hâlinde namaz ve tavaf gibi ibadetler yapılamaz; çoğunluğa göre Mushaf'a dokunmak ve mescitte kalmak da caiz değildir. Âdetli kadının ezberden Kur'an okuması konusunda mezhepler farklıdır — örneğin Mâlikî mezhebi buna izin verir. Hiçbir namazı kaçırmamak için guslü gereksiz yere geciktirme.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Tayammum: die Trockenreinigung', en: 'Tayammum: dry purification', tr: 'Teyemmüm: toprakla temizlenme' },
        },
        {
          type: 'text',
          text: {
            de: "Tayammum ersetzt Wudu **und** Ghusl, wenn kein Wasser vorhanden ist, es nur für Lebensnotwendiges reicht, oder wenn Wasser schaden würde (z. B. bei Krankheit oder Wunden nach ärztlichem Rat, bei gefährlicher Kälte ohne Möglichkeit, es zu erwärmen). **Ablauf:** Absicht fassen, „Bismillah“, die Hände auf reinen Erdboden schlagen, über das Gesicht streichen, dann über die Hände bzw. Arme.",
            en: "Tayammum replaces wudu **and** ghusl when there is no water, when water is only enough for essential needs, or when water would cause harm (e.g. illness or wounds on medical advice, dangerous cold with no way to warm it). **Steps:** make the intention, say “Bismillah”, strike the hands on clean earth, wipe the face, then the hands or arms.",
            tr: "Teyemmüm, su bulunmadığında, su yalnızca zaruri ihtiyaçlara yettiğinde veya suyun zarar vereceği durumlarda (ör. doktor tavsiyesiyle hastalık veya yara, ısıtma imkânı olmayan tehlikeli soğuk) abdestin **ve** guslün yerini tutar. **Yapılışı:** Niyet etmek, besmele çekmek, elleri temiz toprağa vurmak, yüzü meshetmek, ardından elleri veya kolları meshetmek.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 335, Sahih Muslim 521',
          narrator: 'Jabir ibn Abdullah',
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ nannte unter dem, was ihm gegeben wurde: „… die Erde wurde mir zur Gebetsstätte und zum Mittel der Reinigung gemacht. Wo immer einen Menschen meiner Gemeinschaft die Gebetszeit erreicht, soll er beten.“",
            en: "The Prophet ﷺ mentioned among what he was given: “… the earth has been made for me a place of prayer and a means of purification. So wherever the time of prayer reaches a man of my community, let him pray.”",
            tr: "Peygamber ﷺ kendisine verilenler arasında şunu saydı: “… Yeryüzü bana mescit ve temizlik aracı kılındı. Ümmetimden kime nerede namaz vakti girerse orada kılsın.”",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "**Wie oft schlagen, wie weit streichen?** Hanafiten und Schafiiten: zwei Schläge — einer für das Gesicht, einer für die Arme bis einschließlich Ellbogen. Hanbaliten: ein Schlag für Gesicht und Hände bis zu den Handgelenken (Hadith von 'Ammar, Sahih al-Bukhari 338, Sahih Muslim 368). Malikiten: Pflicht ist ein Schlag und die Hände bis zu den Handgelenken; ein zweiter Schlag und das Streichen bis zu den Ellbogen sind Sunna. **Womit?** Schafiiten und Hanbaliten: nur reiner Staub bzw. Erde mit Staub; Hanafiten und Malikiten: alles, was zur Erdoberfläche gehört, auch Sand und Stein. **Wie lange gilt es?** Hanafiten: wie Wudu, bis es aufgehoben wird oder Wasser verfügbar ist; Malikiten und Schafiiten: ein Tayammum pro Pflichtgebet; Hanbaliten: bis zum Ende der jeweiligen Gebetszeit.",
            en: "**How many strikes, how far to wipe?** Hanafis and Shafi'is: two strikes — one for the face, one for the arms up to and including the elbows. Hanbalis: one strike for the face and hands up to the wrists (hadith of 'Ammar, Sahih al-Bukhari 338, Sahih Muslim 368). Malikis: one strike and the hands up to the wrists are obligatory; a second strike and wiping up to the elbows are sunnah. **With what?** Shafi'is and Hanbalis: only clean dust or earth with dust; Hanafis and Malikis: anything belonging to the earth's surface, including sand and stone. **How long is it valid?** Hanafis: like wudu, until it is broken or water becomes available; Malikis and Shafi'is: one tayammum per obligatory prayer; Hanbalis: until the end of the respective prayer time.",
            tr: "**Kaç darbe, nereye kadar mesh?** Hanefî ve Şâfiîler: iki darbe — biri yüz, biri dirseklerle birlikte kollar için. Hanbelîler: yüz ve bileklere kadar eller için tek darbe (Ammâr hadisi, Buhârî 338, Müslim 368). Mâlikîler: tek darbe ve bileklere kadar eller farzdır; ikinci darbe ve dirseklere kadar mesh sünnettir. **Neyle?** Şâfiî ve Hanbelîler: yalnızca temiz toz veya tozlu toprak; Hanefî ve Mâlikîler: kum ve taş dahil yeryüzü cinsinden her şey. **Ne kadar geçerli?** Hanefîler: abdest gibi, bozulana veya su bulunana kadar; Mâlikî ve Şâfiîler: her farz namaz için bir teyemmüm; Hanbelîler: ilgili namaz vaktinin sonuna kadar.",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Bei Verbänden oder Gips wird beim Wudu bzw. Ghusl über den Verband gestrichen (Mash), wenn das Waschen der Stelle schaden würde; der Rest wird normal gewaschen. Die Details unterscheiden sich — bei längerer Krankheit lohnt sich die Frage an einen Gelehrten.",
            en: "With bandages or a cast, one wipes over the bandage (mash) during wudu or ghusl if washing the spot would cause harm; the rest is washed normally. The details differ — with longer illness it is worth asking a scholar.",
            tr: "Sargı veya alçı varsa, o yeri yıkamak zarar verecekse abdest veya gusülde sargının üzerine mesh edilir; geri kalan yerler normal yıkanır. Ayrıntılar farklıdır — uzun süren hastalıklarda bir âlime danışmak faydalıdır.",
          },
        },
        { type: 'link', to: '/learn/new-muslim/ghusl', label: { de: 'Ghusl für Einsteiger', en: 'Ghusl for beginners', tr: 'Yeni başlayanlar için gusül' } },
        { type: 'terms', ids: ['ghusl', 'tayammum', 'janaba', 'hayd', 'wudu', 'niyyah'] },
      ],
      quiz: [
        {
          question: {
            de: "Was ist der unverzichtbare Kern des Ghusl nach allen Schulen?",
            en: "What is the indispensable core of ghusl according to all schools?",
            tr: "Bütün mezheplere göre guslün vazgeçilmez özü nedir?",
          },
          options: [
            { de: "Dass Wasser den gesamten Körper erreicht", en: "That water reaches the entire body", tr: "Suyun bütün bedene ulaşması" },
            { de: "Dass man genau dreimal duscht", en: "Showering exactly three times", tr: "Tam üç kez duş almak" },
            { de: "Dass man dabei Seife benutzt", en: "Using soap", tr: "Sabun kullanmak" },
          ],
          answer: 0,
          explanation: {
            de: "Wasser muss den ganzen Körper erreichen. Ob zusätzlich Absicht, Mund- und Nasenspülen oder Reiben Pflicht sind, unterscheiden die Schulen.",
            en: "Water must reach the whole body. Whether intention, rinsing mouth and nose or rubbing are additionally obligatory differs between the schools.",
            tr: "Su bütün bedene ulaşmalıdır. Niyet, ağza-burna su vermek veya ovmanın ayrıca farz olup olmadığı mezheplere göre değişir.",
          },
        },
        {
          question: {
            de: "Kann Tayammum auch den Ghusl ersetzen?",
            en: "Can tayammum also replace ghusl?",
            tr: "Teyemmüm guslün yerini de tutar mı?",
          },
          options: [
            { de: "Nein, nur das Wudu", en: "No, only wudu", tr: "Hayır, yalnızca abdestin" },
            { de: "Ja, wenn Wasser fehlt oder schaden würde", en: "Yes, if water is missing or would cause harm", tr: "Evet, su yoksa veya zarar verecekse" },
            { de: "Nur auf Reisen", en: "Only when travelling", tr: "Yalnızca yolculukta" },
          ],
          answer: 1,
          explanation: {
            de: "Koran 5:6 nennt den Tayammum direkt nach der Dschanaba. Er ersetzt Wudu und Ghusl, solange der Grund besteht.",
            en: "Quran 5:6 mentions tayammum right after janaba. It replaces wudu and ghusl as long as the reason persists.",
            tr: "Mâide 5:6 teyemmümü cünüplükten hemen sonra zikreder. Özür devam ettiği sürece abdestin ve guslün yerini tutar.",
          },
        },
        {
          question: {
            de: "Worüber sind sich die Schulen beim Tayammum NICHT einig?",
            en: "On what do the schools NOT agree regarding tayammum?",
            tr: "Teyemmüm konusunda mezhepler hangisinde hemfikir DEĞİLDİR?",
          },
          options: [
            { de: "Dass Gesicht und Hände bestrichen werden", en: "That the face and hands are wiped", tr: "Yüzün ve ellerin meshedilmesi" },
            { de: "Wie viele Schläge nötig sind und ob bis zu den Ellbogen gestrichen wird", en: "How many strikes are needed and whether to wipe up to the elbows", tr: "Kaç darbe gerektiği ve dirseklere kadar meshedilip edilmeyeceği" },
            { de: "Dass er bei Wassermangel erlaubt ist", en: "That it is permitted when water is lacking", tr: "Su yokken caiz olduğu" },
          ],
          answer: 1,
          explanation: {
            de: "Gesicht und Hände und die Erlaubnis bei Wassermangel stehen im Koran. Anzahl der Schläge und Umfang beim Arm sind dagegen Gegenstand unterschiedlicher Auslegung.",
            en: "Face and hands and the permission when water is lacking are in the Quran. The number of strikes and how far up the arm, however, are subject to differing interpretation.",
            tr: "Yüz ve eller ile su yokken izin Kur'an'da geçer. Darbe sayısı ve kolun ne kadarının meshedileceği ise farklı yorumlara konudur.",
          },
        },
      ],
      sources: [
        'Quran 5:6',
        'Sahih al-Bukhari 248, Sahih Muslim 316 (Ghusl nach Aischa)',
        'Sahih al-Bukhari 335, Sahih Muslim 521',
        "Sahih al-Bukhari 338, Sahih Muslim 368 (Tayammum nach 'Ammar)",
        FIQH_REF,
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 6 ───────────────────────────────────────────────────────────
    {
      id: 'salah-conditions-pillars',
      title: {
        de: 'Bedingungen und Säulen des Gebets',
        en: 'Conditions and pillars of prayer',
        tr: 'Namazın şartları ve rükünleri',
      },
      summary: {
        de: "Was vor dem Gebet erfüllt sein muss (Reinheit, Awra, Zeit, Qibla, Absicht) und welche Teile das Gebet tragen — mit den Unterschieden zwischen den Schulen.",
        en: "What must be fulfilled before prayer (purity, awrah, time, qibla, intention) and which parts carry the prayer — with the differences between the schools.",
        tr: "Namazdan önce yerine getirilmesi gerekenler (temizlik, avret, vakit, kıble, niyet) ve namazı ayakta tutan rükünler — mezhepler arasındaki farklarla.",
      },
      minutes: 7,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Der Fiqh unterscheidet **Bedingungen** (Schurut) — sie müssen vor und während des Gebets erfüllt sein, sind aber nicht Teil davon — und **Säulen** (Arkan) — die wesentlichen Bestandteile des Gebets selbst. Fehlt eines von beiden, ist das Gebet ungültig und muss wiederholt werden.",
            en: "Fiqh distinguishes **conditions** (shurut) — they must be met before and during prayer but are not part of it — and **pillars** (arkan) — the essential components of the prayer itself. If either is missing, the prayer is invalid and must be repeated.",
            tr: "Fıkıh **şartlar** ile **rükünleri** ayırır: Şartlar namazdan önce ve namaz boyunca bulunması gereken, ama namazın parçası olmayan unsurlardır; rükünler ise namazın kendisini oluşturan temel parçalardır. Biri eksikse namaz geçersizdir ve yeniden kılınmalıdır.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Bedingungen', en: 'The conditions', tr: 'Şartlar' },
        },
        {
          type: 'list',
          items: [
            { de: "**Reinheit vom rituellen Zustand** — Wudu bzw. Ghusl (Sahih Muslim 224)", en: "**Purity from the ritual state** — wudu or ghusl (Sahih Muslim 224)", tr: "**Hadesten taharet** — abdest veya gusül (Müslim 224)" },
            { de: "**Reinheit von Najasa** an Körper, Kleidung und Gebetsplatz (mit den Unterschieden aus Lektion 3)", en: "**Purity from najasa** on body, clothes and place of prayer (with the differences from lesson 3)", tr: "**Necasetten taharet** — beden, elbise ve namaz yeri (3. dersteki farklarla)" },
            { de: "**Bedecken der Awra**", en: "**Covering the awrah**", tr: "**Setr-i avret** (avret yerlerini örtmek)" },
            { de: "**Eintritt der Gebetszeit**", en: "**The prayer time has begun**", tr: "**Vaktin girmesi**" },
            { de: "**Ausrichtung zur Qibla**", en: "**Facing the qibla**", tr: "**Kıbleye yönelmek**" },
            { de: "**Absicht** (im Herzen; nach hanafitischer und hanbalitischer Schule eine Bedingung, nach schafiitischer und malikitischer Schule Teil des Gebets selbst)", en: "**Intention** (in the heart; a condition in the Hanafi and Hanbali schools, part of the prayer itself in the Shafi'i and Maliki schools)", tr: "**Niyet** (kalpte; Hanefî ve Hanbelî mezheplerinde şart, Şâfiî ve Mâlikî mezheplerinde namazın bir parçası)" },
          ],
        },
        {
          type: 'quran',
          ref: '4:103',
          arabic: 'إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا',
          translation: {
            de: "Gewiss, das Gebet ist für die Gläubigen eine zeitlich festgesetzte Vorschrift.",
            en: "Indeed, prayer has been decreed upon the believers a decree of specified times.",
            tr: "Şüphesiz namaz, müminler üzerine vakitleri belirlenmiş bir farzdır.",
          },
        },
        {
          type: 'text',
          text: {
            de: "**Die Zeiten:** Fadschr von der echten Morgendämmerung bis Sonnenaufgang; Dhuhr ab dem Überschreiten des Zenits; Asr ab einer bestimmten Schattenlänge bis Sonnenuntergang (ohne Not nicht bis zur Vergilbung der Sonne aufschieben); Maghrib ab Sonnenuntergang bis die Abenddämmerung verschwindet; Ischa danach — bevorzugt vor Mitternacht.",
            en: "**The times:** Fajr from true dawn until sunrise; Dhuhr from when the sun passes its zenith; Asr from a certain shadow length until sunset (do not delay it until the sun turns yellow without need); Maghrib from sunset until twilight disappears; Isha thereafter — preferably before midnight.",
            tr: "**Vakitler:** Sabah, fecr-i sâdıktan güneşin doğuşuna kadar; öğle, güneşin zevalinden (tepe noktasını geçmesinden) itibaren; ikindi, belirli bir gölge uzunluğundan güneş batıncaya kadar (zaruret olmadıkça güneş sararıncaya kadar ertelenmez); akşam, güneşin batışından şafağın kaybolmasına kadar; yatsı ondan sonra — tercihen gece yarısından önce.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "**Asr-Beginn:** Nach Malikiten, Schafiiten, Hanbaliten (und den beiden Schülern Abu Hanifas) beginnt Asr, wenn der Schatten eines Gegenstands so lang ist wie der Gegenstand selbst (zuzüglich des Mittagsschattens); nach Abu Hanifa erst bei doppelter Länge. Darum zeigen Gebetszeiten-Apps oft zwei Asr-Zeiten — auch in dieser App kannst du in den Einstellungen die Asr-Berechnung wählen. **Maghrib-Ende:** Nach der Mehrheit verschwindet mit dem roten Abendrot die Maghrib-Zeit; nach Abu Hanifa erst mit dem späteren weißen Dämmerlicht.",
            en: "**Start of Asr:** according to Malikis, Shafi'is, Hanbalis (and Abu Hanifa's two students), Asr begins when an object's shadow equals its length (plus the noon shadow); according to Abu Hanifa only at twice the length. That is why prayer time apps often show two Asr times — in this app, too, you can choose the Asr calculation in the settings. **End of Maghrib:** according to the majority, Maghrib time ends with the red twilight; according to Abu Hanifa only with the later white twilight.",
            tr: "**İkindinin başlangıcı:** Mâlikî, Şâfiî, Hanbelîlere (ve Ebû Hanîfe'nin iki talebesine) göre ikindi, bir cismin gölgesi (zeval gölgesi hariç) boyu kadar olunca girer; Ebû Hanîfe'ye göre boyunun iki katı olunca. Bu yüzden namaz vakti uygulamaları çoğu zaman iki ikindi vakti gösterir — bu uygulamada da ayarlardan ikindi hesaplamasını seçebilirsin. **Akşamın sonu:** Çoğunluğa göre akşam vakti kızıllığın kaybolmasıyla biter; Ebû Hanîfe'ye göre daha sonraki beyazlığın kaybolmasıyla.",
          },
        },
        {
          type: 'quran',
          ref: '2:144',
          translation: {
            de: "… So wende dein Gesicht in Richtung der geschützten Gebetsstätte. Und wo immer ihr seid, wendet euer Gesicht in ihre Richtung …",
            en: "… So turn your face toward al-Masjid al-Haram. And wherever you [believers] are, turn your faces toward it …",
            tr: "… Artık yüzünü Mescid-i Haram tarafına çevir. Nerede olursanız olun yüzlerinizi o tarafa çevirin …",
          },
        },
        {
          type: 'text',
          text: {
            de: "Wer die Kaaba nicht sieht, wendet sich in ihre ungefähre **Richtung**; eine Abweichung von wenigen Grad schadet nicht. Wer sich nach bestem Bemühen in der Richtung geirrt hat, dessen Gebet ist nach der Mehrheit der Gelehrten gültig.",
            en: "Whoever cannot see the Kaaba faces its approximate **direction**; a deviation of a few degrees does no harm. Whoever erred in the direction after doing their best has a valid prayer according to the majority of scholars.",
            tr: "Kâbe'yi göremeyen kişi onun yaklaşık **yönüne** döner; birkaç derecelik sapma zarar vermez. Elinden geleni yaptıktan sonra yönü yanlış tayin eden kişinin namazı âlimlerin çoğunluğuna göre geçerlidir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Awra im Gebet', en: 'The awrah in prayer', tr: 'Namazda avret' },
        },
        {
          type: 'quran',
          ref: '7:31',
          arabic: 'يَا بَنِي آدَمَ خُذُوا زِينَتَكُمْ عِندَ كُلِّ مَسْجِدٍ',
          translation: {
            de: "O Kinder Adams, legt euren Schmuck bei jeder Gebetsstätte an …",
            en: "O children of Adam, take your adornment at every masjid …",
            tr: "Ey Âdemoğulları! Her mescide gidişinizde güzel giyiminizi kuşanın …",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "**Männer:** mindestens der Bereich zwischen Nabel und Knien; ob das Knie selbst dazugehört, ist unterschiedlich (hanafitisch: ja). Nach hanbalitischer Schule soll im Pflichtgebet zusätzlich mindestens eine Schulter bedeckt sein. **Frauen:** der ganze Körper außer Gesicht und Händen; nach der bekannten hanafitischen Lehrmeinung sind auch die Füße ausgenommen. Die malikitische Schule unterscheidet zwischen „schwerer“ und „leichter“ Awra mit unterschiedlichen Folgen, wenn etwas unbedeckt bleibt.",
            en: "**Men:** at least the area between navel and knees; whether the knee itself is included differs (Hanafi: yes). In the Hanbali school at least one shoulder should additionally be covered in obligatory prayer. **Women:** the whole body except face and hands; in the well-known Hanafi position the feet are also excepted. The Maliki school distinguishes between “severe” and “light” awrah, with different consequences if something remains uncovered.",
            tr: "**Erkekler:** en az göbek ile diz arası; dizin kendisinin dahil olup olmadığı farklıdır (Hanefî: dahil). Hanbelî mezhebine göre farz namazda ayrıca en az bir omuz örtülmelidir. **Kadınlar:** yüz ve eller dışında bütün beden; Hanefî mezhebinin meşhur görüşüne göre ayaklar da avret değildir. Mâlikî mezhebi “ağır” ve “hafif” avret ayrımı yapar; açık kalan yere göre sonuçlar farklıdır.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Säulen des Gebets', en: 'The pillars of prayer', tr: 'Namazın rükünleri' },
        },
        {
          type: 'list',
          items: [
            { de: "Eröffnungs-Takbir („Allahu akbar“)", en: "Opening takbir (“Allahu akbar”)", tr: "İftitah tekbiri (“Allahu ekber”)" },
            { de: "Stehen im Pflichtgebet, wenn man kann", en: "Standing in obligatory prayer, if able", tr: "Gücü yetene farz namazda kıyam" },
            { de: "Rezitation (Fatiha)", en: "Recitation (Fatiha)", tr: "Kıraat (Fâtiha)" },
            { de: "Verbeugung (Ruku) und Aufrichten danach", en: "Bowing (ruku) and straightening up after it", tr: "Rükû ve rükûdan doğrulmak" },
            { de: "Zwei Niederwerfungen (Sudschud) mit dem Sitzen dazwischen", en: "Two prostrations (sujud) with the sitting between them", tr: "İki secde ve aradaki oturuş" },
            { de: "Letztes Sitzen mit Taschahhud", en: "Final sitting with tashahhud", tr: "Son oturuş ve teşehhüt" },
            { de: "Ruhe in jeder Position (Tuma'nina) und die richtige Reihenfolge", en: "Stillness in each position (tuma'nina) and the correct order", tr: "Her rükünde itminan (tuma'nîne) ve tertip" },
            { de: "Abschließender Salam", en: "Closing salam", tr: "Selam" },
          ],
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Die Liste folgt der Mehrheit (malikitisch, schafiitisch, hanbalitisch, mit Details). Die **hanafitische Schule** zählt als Säulen (Fard) im engeren Sinn: Stehen, Rezitation (irgendeines Koranabschnitts), Ruku, Sudschud und das letzte Sitzen in Taschahhud-Länge; der Eröffnungs-Takbir ist dort eine Bedingung. Fatiha, Ruhe in den Positionen und der Salam sind bei Hanafiten **Wajib**: Wer sie vergisst, gleicht das mit der Niederwerfung der Vergesslichkeit aus — wer eine Säule auslässt, muss das Gebet (bzw. die Rakat) dagegen nachholen.",
            en: "The list follows the majority (Maliki, Shafi'i, Hanbali, with details). The **Hanafi school** counts as pillars (fard) in the strict sense: standing, recitation (of any portion of the Quran), ruku, sujud and the final sitting for the length of the tashahhud; the opening takbir is a condition there. Fatiha, stillness in the positions and the salam are **wajib** for Hanafis: whoever forgets them makes up for it with the prostration of forgetfulness — whereas whoever omits a pillar must redo the prayer (or the rak'ah).",
            tr: "Liste çoğunluğu (Mâlikî, Şâfiî, Hanbelî, ayrıntılarıyla) esas alır. **Hanefî mezhebi** dar anlamda farz (rükün) olarak şunları sayar: kıyam, kıraat (Kur'an'dan herhangi bir yer), rükû, secde ve teşehhüt miktarı son oturuş; iftitah tekbiri bu mezhepte şarttır. Fâtiha, tadil-i erkân ve selam Hanefîlere göre **vaciptir**: Bunları unutan sehiv secdesiyle telafi eder — bir rüknü terk eden ise namazı (veya rekâtı) yeniden kılmalıdır.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 757, Sahih Muslim 397',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Ein Mann betete hastig. Der Prophet ﷺ sagte dreimal: „Geh zurück und bete, denn du hast nicht gebetet.“ Dann lehrte er ihn, sich in Verbeugung, Aufrichten, Niederwerfung und Sitzen jeweils zur Ruhe kommen zu lassen.",
            en: "A man prayed hastily. The Prophet ﷺ said three times: “Go back and pray, for you have not prayed.” Then he taught him to come to rest in bowing, standing up, prostration and sitting.",
            tr: "Bir adam aceleyle namaz kıldı. Peygamber ﷺ ona üç kez “Dön ve namaz kıl, çünkü sen namaz kılmadın” dedi. Sonra ona rükûda, doğrulmada, secdede ve oturuşta her birinde tam olarak durmayı öğretti.",
          },
        },
        { type: 'link', to: '/prayer', label: { de: 'Gebetszeiten', en: 'Prayer times', tr: 'Namaz vakitleri' } },
        { type: 'link', to: '/qibla', label: { de: 'Qibla-Kompass', en: 'Qibla compass', tr: 'Kıble pusulası' } },
        { type: 'terms', ids: ['shart', 'rukn', 'awrah', 'qibla', 'niyyah', 'takbir', 'ruku', 'sujud', 'tashahhud'] },
      ],
      quiz: [
        {
          question: {
            de: "Was ist der Unterschied zwischen einer Bedingung (Shart) und einer Säule (Rukn) des Gebets?",
            en: "What is the difference between a condition (shart) and a pillar (rukn) of prayer?",
            tr: "Namazın şartı ile rüknü arasındaki fark nedir?",
          },
          options: [
            { de: "Es gibt keinen Unterschied", en: "There is no difference", tr: "Hiçbir fark yoktur" },
            { de: "Eine Bedingung liegt außerhalb des Gebets (z. B. Wudu), eine Säule ist Teil des Gebets (z. B. Ruku)", en: "A condition lies outside the prayer (e.g. wudu), a pillar is part of the prayer (e.g. ruku)", tr: "Şart namazın dışındadır (ör. abdest), rükün namazın parçasıdır (ör. rükû)" },
            { de: "Säulen sind nur empfohlen", en: "Pillars are only recommended", tr: "Rükünler yalnızca tavsiye edilir" },
          ],
          answer: 1,
          explanation: {
            de: "Beides ist für die Gültigkeit nötig. Bedingungen gehen dem Gebet voraus und begleiten es; Säulen bilden das Gebet selbst.",
            en: "Both are necessary for validity. Conditions precede and accompany the prayer; pillars make up the prayer itself.",
            tr: "İkisi de geçerlilik için gereklidir. Şartlar namazdan önce gelir ve namaz boyunca devam eder; rükünler namazın kendisini oluşturur.",
          },
        },
        {
          question: {
            de: "Warum zeigen Gebetszeiten oft zwei verschiedene Asr-Zeiten?",
            en: "Why do prayer timetables often show two different Asr times?",
            tr: "Namaz vakti cetvelleri neden çoğu zaman iki farklı ikindi vakti gösterir?",
          },
          options: [
            { de: "Wegen Sommer- und Winterzeit", en: "Because of daylight saving time", tr: "Yaz ve kış saati yüzünden" },
            { de: "Weil Abu Hanifa den Beginn bei doppelter Schattenlänge ansetzt, die Mehrheit bei einfacher", en: "Because Abu Hanifa sets the start at twice the shadow length, the majority at single length", tr: "Çünkü Ebû Hanîfe başlangıcı gölgenin iki katında, çoğunluk ise bir katında kabul eder" },
            { de: "Weil es zwei Asr-Gebete gibt", en: "Because there are two Asr prayers", tr: "Çünkü iki ikindi namazı vardır" },
          ],
          answer: 1,
          explanation: {
            de: "Die Mehrheit beginnt Asr bei einfacher Schattenlänge, Abu Hanifa bei doppelter. Beide Berechnungen sind anerkannt.",
            en: "The majority starts Asr at single shadow length, Abu Hanifa at double. Both calculations are recognised.",
            tr: "Çoğunluk ikindiyi gölgenin bir katında, Ebû Hanîfe iki katında başlatır. İki hesaplama da muteberdir.",
          },
        },
        {
          question: {
            de: "Was lehrt der Hadith vom Mann, der hastig betete?",
            en: "What does the hadith of the man who prayed hastily teach?",
            tr: "Aceleyle namaz kılan adamın hadisi ne öğretir?",
          },
          options: [
            { de: "Ruhe in jeder Position gehört wesentlich zum Gebet", en: "Stillness in each position is essential to the prayer", tr: "Her rükünde tam durmak namazın esasındandır" },
            { de: "Kurze Gebete sind besser", en: "Short prayers are better", tr: "Kısa namaz daha iyidir" },
            { de: "Man darf nur in der Moschee beten", en: "One may only pray in the mosque", tr: "Yalnızca camide namaz kılınabilir" },
          ],
          answer: 0,
          explanation: {
            de: "Der Prophet ﷺ ließ ihn wiederholen, weil er nicht in jeder Position zur Ruhe kam. Für die Mehrheit ist diese Ruhe eine Säule, für Hanafiten Wajib.",
            en: "The Prophet ﷺ had him repeat it because he did not come to rest in each position. For the majority this stillness is a pillar, for Hanafis wajib.",
            tr: "Peygamber ﷺ her rükünde tam durmadığı için namazı tekrarlattı. Bu duruş çoğunluğa göre rükün, Hanefîlere göre vaciptir.",
          },
        },
      ],
      sources: [
        'Quran 4:103, 2:144, 7:31',
        'Sahih Muslim 224 (kein Gebet ohne Reinheit)',
        'Sahih al-Bukhari 757, Sahih Muslim 397 (der hastig Betende)',
        FIQH_REF,
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 7 ───────────────────────────────────────────────────────────
    {
      id: 'mistakes-in-prayer',
      title: {
        de: 'Fehler im Gebet und versäumte Gebete',
        en: 'Mistakes in prayer and missed prayers',
        tr: 'Namazdaki hatalar ve kaçırılan namazlar',
      },
      summary: {
        de: "Die Niederwerfung der Vergesslichkeit, der richtige Umgang mit Zweifeln über die Zahl der Rakat — und wie man verpasste Gebete nachholt.",
        en: "The prostration of forgetfulness, how to deal correctly with doubts about the number of rak'ahs — and how to make up missed prayers.",
        tr: "Sehiv secdesi, rekât sayısındaki şüpheyle doğru başa çıkmak — ve kaçırılan namazların nasıl kaza edileceği.",
      },
      minutes: 7,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Auch dem Propheten ﷺ ist im Gebet einmal ein Versehen passiert — und gerade dadurch hat er seiner Gemeinschaft gezeigt, wie man damit umgeht. Vergesslichkeit ist menschlich; der Fiqh gibt dafür einen klaren, ruhigen Weg: die **Niederwerfung der Vergesslichkeit** (Sadschdat as-Sahw) — zwei zusätzliche Niederwerfungen am Ende des Gebets.",
            en: "Even the Prophet ﷺ once made a slip in prayer — and precisely through this he showed his community how to deal with it. Forgetfulness is human; fiqh offers a clear, calm way: the **prostration of forgetfulness** (sajdat as-sahw) — two additional prostrations at the end of the prayer.",
            tr: "Peygamber ﷺ de namazda bir kez yanılmıştır — ve tam da bu sayede ümmetine bununla nasıl başa çıkılacağını göstermiştir. Unutmak insanidir; fıkıh bunun için açık ve sakin bir yol sunar: **sehiv secdesi** — namazın sonunda yapılan iki ilave secde.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Wann ist sie nötig?', en: 'When is it needed?', tr: 'Ne zaman gerekir?' },
        },
        {
          type: 'list',
          items: [
            {
              de: "**Auslassen** eines Elements, das nicht Säule ist, aber verpflichtend bzw. betont ist — klassisches Beispiel: das erste Sitzen mit Taschahhud vergessen (Sahih al-Bukhari 1224, Sahih Muslim 570)",
              en: "**Omitting** an element that is not a pillar but is required or emphasised — classic example: forgetting the first sitting with tashahhud (Sahih al-Bukhari 1224, Sahih Muslim 570)",
              tr: "Rükün olmayan, fakat vacip veya müekked olan bir unsuru **terk etmek** — klasik örnek: ilk oturuşu ve teşehhüdü unutmak (Buhârî 1224, Müslim 570)",
            },
            {
              de: "**Hinzufügen** aus Versehen, z. B. eine fünfte Rakat oder ein zu früher Salam (Sahih al-Bukhari 1229, Sahih Muslim 573)",
              en: "**Adding** by mistake, e.g. a fifth rak'ah or a premature salam (Sahih al-Bukhari 1229, Sahih Muslim 573)",
              tr: "Yanlışlıkla **ilave etmek**, ör. beşinci bir rekât veya erken verilen selam (Buhârî 1229, Müslim 573)",
            },
            {
              de: "**Zweifel** über die Zahl der gebeteten Rakat",
              en: "**Doubt** about the number of rak'ahs prayed",
              tr: "Kılınan rekât sayısında **şüphe**",
            },
          ],
        },
        {
          type: 'note',
          variant: 'important',
          text: {
            de: "Eine vergessene **Säule** (z. B. eine Niederwerfung oder die Verbeugung) kann nicht durch die Sahw-Niederwerfungen ersetzt werden: Sie muss nachgeholt werden — bemerkt man es noch im Gebet, verrichtet man sie bzw. die betreffende Rakat erneut und macht danach Sahw.",
            en: "A forgotten **pillar** (e.g. a prostration or the bowing) cannot be replaced by the sahw prostrations: it must be made up — if noticed during the prayer, one performs it or the rak'ah in question again and then does sahw.",
            tr: "Unutulan bir **rükün** (ör. bir secde veya rükû) sehiv secdesiyle telafi edilemez: Yerine getirilmesi gerekir — namaz içinde fark edilirse o rükün veya ilgili rekât yeniden kılınır, ardından sehiv secdesi yapılır.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 571',
          narrator: "Abu Sa'id al-Khudri",
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ sagte: „Wenn einer von euch in seinem Gebet zweifelt und nicht weiß, ob er drei oder vier (Rakat) gebetet hat, dann soll er den Zweifel ablegen, auf dem aufbauen, dessen er sicher ist, und dann vor dem Salam zwei Niederwerfungen machen.“",
            en: "The Prophet ﷺ said: “If one of you is in doubt during his prayer and does not know whether he has prayed three or four (rak'ahs), let him cast aside the doubt, build on what he is certain of, and then make two prostrations before the salam.”",
            tr: "Peygamber ﷺ şöyle buyurdu: “Biriniz namazında şüpheye düşer de üç mü dört mü kıldığını bilemezse, şüpheyi bıraksın, emin olduğu üzerine bina etsin, sonra selam vermeden önce iki secde yapsın.”",
          },
        },
        {
          type: 'text',
          text: {
            de: "Bei Zweifel geht man also von der **geringeren Zahl** aus, betet die fehlende Rakat und macht Sahw. Eine weitere Überlieferung spricht davon, nach dem zu streben, was man für richtig hält (Sahih al-Bukhari 401, Sahih Muslim 572): Wer eine deutliche Tendenz hat, folgt ihr nach einigen Gelehrten. Wer ständig zweifelt, soll sich nicht von Zweifeln beherrschen lassen — viele Gelehrte raten dann, Zweifel nach dem Gebet ganz zu ignorieren.",
            en: "So in case of doubt one goes by the **lower number**, prays the missing rak'ah and does sahw. Another narration speaks of aiming for what one considers correct (Sahih al-Bukhari 401, Sahih Muslim 572): according to some scholars, whoever has a clear inclination follows it. Whoever doubts constantly should not let doubts rule them — many scholars then advise ignoring doubts after the prayer altogether.",
            tr: "Şüphe hâlinde **az olan sayı** esas alınır, eksik rekât kılınır ve sehiv secdesi yapılır. Başka bir rivayet, doğru olduğu kanaatine varılanı araştırmaktan söz eder (Buhârî 401, Müslim 572): Bazı âlimlere göre belirgin bir kanaati olan ona göre hareket eder. Sürekli şüphe eden kişi şüphelerin kendisine hükmetmesine izin vermemelidir — birçok âlim bu durumda namazdan sonra gelen şüphelere hiç itibar edilmemesini tavsiye eder.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "**Vor oder nach dem Salam?** Hanafiten: nach einem Salam (zur rechten Seite), dann zwei Niederwerfungen, erneut Taschahhud und Salam. Schafiiten: grundsätzlich vor dem Salam. Malikiten: vor dem Salam bei einem Auslassen, nach dem Salam bei einem Hinzufügen. Hanbaliten: grundsätzlich vor dem Salam, außer in bestimmten Fällen (z. B. wenn man vorzeitig den Salam gesprochen hat). **Wofür?** Auch was eine Sahw-Niederwerfung auslöst, ist unterschiedlich geregelt: bei Hanafiten das Vergessen eines Wajib, bei Hanbaliten das Vergessen eines der „Wajibat“ des Gebets, bei Malikiten und Schafiiten das Vergessen bestimmter betonter Sunna-Handlungen. Beide Formen sind vom Propheten ﷺ überliefert — es ist eine Frage der Gewichtung, nicht von richtig oder falsch.",
            en: "**Before or after the salam?** Hanafis: after one salam (to the right), then two prostrations, tashahhud again and salam. Shafi'is: in principle before the salam. Malikis: before the salam for an omission, after the salam for an addition. Hanbalis: in principle before the salam, except in certain cases (e.g. when one has said the salam prematurely). **For what?** What triggers a sahw prostration is also regulated differently: for Hanafis forgetting a wajib, for Hanbalis forgetting one of the “wajibat” of prayer, for Malikis and Shafi'is forgetting certain emphasised sunnah acts. Both forms are transmitted from the Prophet ﷺ — it is a question of weighting, not of right or wrong.",
            tr: "**Selamdan önce mi sonra mı?** Hanefîler: sağa tek selam verilir, iki secde yapılır, tekrar teşehhüt okunup selam verilir. Şâfiîler: esasen selamdan önce. Mâlikîler: eksiklikte selamdan önce, fazlalıkta selamdan sonra. Hanbelîler: esasen selamdan önce, bazı durumlar hariç (ör. vaktinden önce selam verildiğinde). **Neden dolayı?** Sehiv secdesini gerektiren durumlar da farklıdır: Hanefîlerde bir vacibin unutulması, Hanbelîlerde namazın “vaciplerinden” birinin unutulması, Mâlikî ve Şâfiîlerde bazı müekked sünnetlerin unutulması. Her iki şekil de Peygamber'den ﷺ nakledilmiştir — mesele doğru ile yanlış değil, tercih meselesidir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Versäumte Gebete nachholen (Qada)', en: 'Making up missed prayers (qada)', tr: 'Kaçırılan namazları kaza etmek' },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 597, Sahih Muslim 684',
          narrator: 'Anas ibn Malik',
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ sagte: „Wer ein Gebet vergisst (oder verschläft), der soll es beten, wenn er sich daran erinnert; es gibt keine andere Sühne dafür.“",
            en: "The Prophet ﷺ said: “Whoever forgets a prayer (or sleeps through it) should pray it when he remembers it; there is no other expiation for it.”",
            tr: "Peygamber ﷺ şöyle buyurdu: “Kim bir namazı unutursa (veya uyuyup kaçırırsa) hatırladığında onu kılsın; bunun bundan başka keffareti yoktur.”",
          },
        },
        {
          type: 'list',
          items: [
            { de: "Ein verschlafenes oder vergessenes Gebet wird so bald wie möglich nachgeholt — in derselben Form (z. B. vier Rakat für Dhuhr, mit lauter Rezitation bei Fadschr nach vielen Gelehrten).", en: "A prayer slept through or forgotten is made up as soon as possible — in the same form (e.g. four rak'ahs for Dhuhr, with audible recitation for Fajr according to many scholars).", tr: "Uykuda kaçırılan veya unutulan namaz en kısa sürede kaza edilir — aynı şekilde (ör. öğle için dört rekât; birçok âlime göre sabah namazında sesli kıraatle)." },
            { de: "Nach Menstruation und Wochenbett werden die Gebete nicht nachgeholt (Sahih Muslim 335).", en: "Prayers are not made up after menstruation and postnatal bleeding (Sahih Muslim 335).", tr: "Hayız ve nifas hâlinde kılınmayan namazlar kaza edilmez (Müslim 335)." },
            { de: "Wer über Jahre nicht gebetet hat, schätzt die Zahl ehrlich und plant realistisch, z. B. zu jedem Pflichtgebet ein Nachholgebet. Wichtig ist: ab heute regelmäßig beten.", en: "Whoever has not prayed for years estimates the number honestly and plans realistically, e.g. one make-up prayer with each obligatory prayer. What matters is: praying regularly from today on.", tr: "Yıllarca namaz kılmamış kişi sayıyı dürüstçe tahmin eder ve gerçekçi bir plan yapar; ör. her farz namazla birlikte bir kaza namazı. Önemli olan: bugünden itibaren düzenli kılmaktır." },
          ],
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "**Absichtlich versäumte Gebete:** Nach allen vier Rechtsschulen müssen sie nachgeholt werden, verbunden mit aufrichtiger Reue. Eine Minderheit (u. a. Ibn Hazm, Ibn Taymiyya) vertritt, sie könnten nicht gültig nachgeholt werden; man solle stattdessen bereuen und viele freiwillige Gebete verrichten. **Reihenfolge:** Hanafiten, Malikiten und Hanbaliten verlangen grundsätzlich, wenige versäumte Gebete in ihrer Reihenfolge und vor dem aktuellen Gebet nachzuholen (mit Ausnahmen, etwa bei knapper Zeit oder vielen versäumten Gebeten); Schafiiten empfehlen es.",
            en: "**Deliberately missed prayers:** according to all four schools they must be made up, together with sincere repentance. A minority (incl. Ibn Hazm, Ibn Taymiyya) holds they cannot validly be made up; one should instead repent and perform many voluntary prayers. **Order:** Hanafis, Malikis and Hanbalis in principle require a few missed prayers to be made up in their order and before the current prayer (with exceptions, e.g. when time is short or many prayers were missed); Shafi'is recommend it.",
            tr: "**Kasten kılınmayan namazlar:** Dört mezhebe göre samimi bir tövbeyle birlikte kaza edilmeleri gerekir. Bir azınlık (İbn Hazm, İbn Teymiyye gibi) bunların geçerli şekilde kaza edilemeyeceğini, bunun yerine tövbe edip çokça nafile kılınması gerektiğini savunur. **Tertip:** Hanefî, Mâlikî ve Hanbelîler az sayıdaki kaza namazlarının sırasıyla ve vakit namazından önce kılınmasını esasen şart koşar (vaktin darlığı veya kaza namazlarının çokluğu gibi istisnalarla); Şâfiîler bunu müstehap sayar.",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Im Gebets-Tracker der App kannst du Gebete als „nachgeholt“ markieren — das hilft, einen Plan durchzuhalten, ohne dich zu überfordern.",
            en: "In the app's prayer tracker you can mark prayers as “made up” (qada) — this helps you stick to a plan without overwhelming yourself.",
            tr: "Uygulamadaki namaz takipçisinde namazları “kaza” olarak işaretleyebilirsin — bu, kendini yormadan bir plana bağlı kalmana yardımcı olur.",
          },
        },
        { type: 'link', to: '/tracker', label: { de: 'Zum Gebets-Tracker', en: 'Open the prayer tracker', tr: 'Namaz takipçisine git' } },
        { type: 'terms', ids: ['sajdat-as-sahw', 'qada', 'rukn', 'wajib', 'rakah', 'sujud', 'tashahhud', 'tawba'] },
      ],
      quiz: [
        {
          question: {
            de: "Du bist dir im Dhuhr-Gebet unsicher, ob du drei oder vier Rakat gebetet hast, und hast keine Tendenz. Was lehrt der Hadith?",
            en: "In the Dhuhr prayer you are unsure whether you have prayed three or four rak'ahs and have no inclination. What does the hadith teach?",
            tr: "Öğle namazında üç mü dört mü kıldığından emin değilsin ve bir kanaatin yok. Hadis ne öğretir?",
          },
          options: [
            { de: "Von vier ausgehen und sofort den Salam sprechen", en: "Assume four and say the salam immediately", tr: "Dört kabul edip hemen selam vermek" },
            { de: "Von drei ausgehen, eine Rakat beten und die Sahw-Niederwerfungen machen", en: "Assume three, pray one more rak'ah and do the sahw prostrations", tr: "Üç kabul edip bir rekât daha kılmak ve sehiv secdesi yapmak" },
            { de: "Das Gebet abbrechen und am nächsten Tag nachholen", en: "Abandon the prayer and make it up the next day", tr: "Namazı bozup ertesi gün kaza etmek" },
          ],
          answer: 1,
          explanation: {
            de: "Man baut auf dem auf, dessen man sicher ist — der geringeren Zahl — und gleicht mit zwei Niederwerfungen aus (Sahih Muslim 571).",
            en: "One builds on what one is certain of — the lower number — and compensates with two prostrations (Sahih Muslim 571).",
            tr: "Emin olunan üzerine — az olan sayıya — bina edilir ve iki secdeyle telafi edilir (Müslim 571).",
          },
        },
        {
          question: {
            de: "Kann eine vergessene Verbeugung (Ruku) allein durch die Sahw-Niederwerfungen ausgeglichen werden?",
            en: "Can a forgotten bowing (ruku) be compensated by the sahw prostrations alone?",
            tr: "Unutulan bir rükû yalnızca sehiv secdesiyle telafi edilebilir mi?",
          },
          options: [
            { de: "Ja, immer", en: "Yes, always", tr: "Evet, her zaman" },
            { de: "Nein, eine Säule muss nachgeholt werden", en: "No, a pillar must be made up", tr: "Hayır, rükün yerine getirilmelidir" },
            { de: "Nur im freiwilligen Gebet", en: "Only in voluntary prayer", tr: "Yalnızca nafile namazda" },
          ],
          answer: 1,
          explanation: {
            de: "Säulen sind unverzichtbar. Sahw gleicht nur das Auslassen von nicht-wesentlichen Pflicht- bzw. Sunna-Elementen und Versehen aus.",
            en: "Pillars are indispensable. Sahw only compensates for omitting non-essential required or sunnah elements and for slips.",
            tr: "Rükünler vazgeçilmezdir. Sehiv secdesi yalnızca rükün olmayan vacip/sünnet unsurların terkini ve yanılmaları telafi eder.",
          },
        },
        {
          question: {
            de: "Müssen absichtlich versäumte Pflichtgebete nach den vier Rechtsschulen nachgeholt werden?",
            en: "According to the four schools, must deliberately missed obligatory prayers be made up?",
            tr: "Dört mezhebe göre kasten kılınmayan farz namazlar kaza edilmeli midir?",
          },
          options: [
            { de: "Ja, zusammen mit aufrichtiger Reue", en: "Yes, together with sincere repentance", tr: "Evet, samimi bir tövbeyle birlikte" },
            { de: "Nein, sie sind verfallen", en: "No, they have lapsed", tr: "Hayır, düşmüşlerdir" },
            { de: "Nur die Fadschr-Gebete", en: "Only the Fajr prayers", tr: "Yalnızca sabah namazları" },
          ],
          answer: 0,
          explanation: {
            de: "Alle vier Schulen verlangen das Nachholen. Eine Minderheitsmeinung sieht stattdessen Reue und viele freiwillige Gebete vor.",
            en: "All four schools require making them up. A minority view instead prescribes repentance and many voluntary prayers.",
            tr: "Dört mezhebin hepsi kazayı gerekli görür. Azınlıkta kalan bir görüş ise bunun yerine tövbe ve çokça nafileyi öngörür.",
          },
        },
      ],
      sources: [
        'Sahih Muslim 571 (Zweifel über die Zahl der Rakat)',
        "Sahih al-Bukhari 401, Sahih Muslim 572 (Ibn Mas'ud)",
        'Sahih al-Bukhari 1229, Sahih Muslim 573 (Dhul-Yadayn)',
        'Sahih al-Bukhari 1224, Sahih Muslim 570 (Ibn Buhayna, vergessenes erstes Sitzen)',
        'Sahih al-Bukhari 597, Sahih Muslim 684',
        'Sahih Muslim 335 (kein Nachholen der Gebete nach der Menstruation)',
        FIQH_REF,
      ],
      review: 'draft',
    },

    // ─── 8 ───────────────────────────────────────────────────────────
    {
      id: 'travel-and-special-situations',
      title: {
        de: 'Gebet auf Reisen und in besonderen Situationen',
        en: 'Prayer while travelling and in special situations',
        tr: 'Yolculukta ve özel durumlarda namaz',
      },
      summary: {
        de: "Kürzen (Qasr) und Zusammenlegen (Dscham') der Gebete, Beten im Sitzen bei Krankheit und im Flugzeug — Erleichterungen, die Allah geschenkt hat.",
        en: "Shortening (qasr) and combining (jam') prayers, praying seated when ill and on a plane — concessions granted by Allah.",
        tr: "Namazları kısaltmak (kasr) ve birleştirmek (cem), hastalıkta ve uçakta oturarak namaz — Allah'ın tanıdığı kolaylıklar.",
      },
      minutes: 6,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Das Gebet fällt niemals ganz weg, solange man bei Bewusstsein ist — aber es passt sich den Umständen an. Für Reisende, Kranke und schwierige Situationen gibt es **Erleichterungen** (Rukhsa). Sie sind kein Notbehelf zweiter Klasse, sondern ein Geschenk Allahs.",
            en: "Prayer never falls away entirely as long as one is conscious — but it adapts to circumstances. For travellers, the sick and difficult situations there are **concessions** (rukhsa). They are not a second-class makeshift but a gift from Allah.",
            tr: "Akıl yerinde olduğu sürece namaz hiçbir zaman tamamen düşmez — ama şartlara uyum sağlar. Yolcular, hastalar ve zor durumlar için **ruhsatlar** vardır. Bunlar ikinci sınıf bir çare değil, Allah'ın bir lütfudur.",
          },
        },
        {
          type: 'quran',
          ref: '4:101',
          translation: {
            de: "Und wenn ihr im Land umherreist, so ist es keine Sünde für euch, das Gebet zu kürzen, wenn ihr fürchtet, dass diejenigen, die ungläubig sind, euch Schaden zufügen …",
            en: "And when you travel throughout the land, there is no blame upon you for shortening the prayer, [especially] if you fear that those who disbelieve may disrupt [or attack] you …",
            tr: "Yeryüzünde sefere çıktığınız zaman, inkâr edenlerin size bir kötülük yapmasından endişe ederseniz namazı kısaltmanızda üzerinize bir günah yoktur …",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 686',
          narrator: "Ya'la ibn Umayya / 'Umar ibn al-Khattab",
          grade: 'sahih',
          text: {
            de: "'Umar wurde gefragt, warum man noch kürze, obwohl doch Sicherheit herrsche. Er sagte, er habe den Propheten ﷺ dasselbe gefragt, und dieser habe geantwortet: „Es ist eine Gabe (Sadaqa), die Allah euch gegeben hat, so nehmt Seine Gabe an.“",
            en: "'Umar was asked why people still shorten the prayer even though there is safety. He said he had asked the Prophet ﷺ the same, and he replied: “It is a charity (sadaqa) that Allah has bestowed on you, so accept His charity.”",
            tr: "Hz. Ömer'e artık güven ortamı varken namazın neden hâlâ kısaltıldığı soruldu. Aynı şeyi Peygamber'e ﷺ sorduğunu, onun da şöyle cevap verdiğini söyledi: “Bu, Allah'ın size verdiği bir sadakadır; O'nun sadakasını kabul edin.”",
          },
        },
        {
          type: 'heading',
          text: { de: 'Kürzen (Qasr)', en: 'Shortening (qasr)', tr: 'Kısaltma (kasr)' },
        },
        {
          type: 'text',
          text: {
            de: "Auf Reisen werden die Pflichtgebete mit vier Rakat — **Dhuhr, Asr und Ischa** — auf **zwei** Rakat gekürzt. Fadschr (2) und Maghrib (3) bleiben unverändert. Die Sunna-Gebete vor und nach den Pflichtgebeten darf man auf Reisen weglassen; viele Gelehrte empfehlen aber, die Sunna von Fadschr und das Witr beizubehalten. Wer hinter einem ansässigen Imam betet, betet nach der Mehrheit die volle Zahl mit.",
            en: "When travelling, the obligatory prayers of four rak'ahs — **Dhuhr, Asr and Isha** — are shortened to **two** rak'ahs. Fajr (2) and Maghrib (3) stay unchanged. The sunnah prayers before and after the obligatory ones may be left out when travelling; many scholars, however, recommend keeping the sunnah of Fajr and witr. Whoever prays behind a resident imam prays the full number along with him, according to the majority.",
            tr: "Yolculukta dört rekâtlı farzlar — **öğle, ikindi ve yatsı** — **iki** rekât kılınır. Sabah (2) ve akşam (3) değişmez. Yolculukta farzların önündeki ve sonrasındaki sünnetler terk edilebilir; ancak birçok âlim sabah namazının sünnetini ve vitri korumayı tavsiye eder. Mukim bir imamın arkasında kılan yolcu, çoğunluğa göre namazı imamla birlikte tam kılar.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "**Ab welcher Entfernung?** Malikiten, Schafiiten und Hanbaliten: rund 80–90 km (vier „Burud“, je nach Umrechnung); Hanafiten: eine Strecke von drei Tagesreisen, heute meist mit etwa 90 km angesetzt. **Wie lange?** Hanafiten: Wer beabsichtigt, 15 Tage oder länger an einem Ort zu bleiben, gilt als ansässig; Malikiten, Schafiiten und Hanbaliten setzen die Grenze bei etwa vier Tagen (mit unterschiedlicher Zählweise). **Pflicht oder Erleichterung?** Hanafiten: Das Kürzen ist verpflichtend (Wajib); Malikiten: betonte Sunna; Schafiiten und Hanbaliten: eine Erleichterung, die meist als vorzüglicher gilt, wobei das volle Gebet gültig bleibt.",
            en: "**From what distance?** Malikis, Shafi'is and Hanbalis: around 80–90 km (four “burud”, depending on conversion); Hanafis: a journey of three days, today usually set at about 90 km. **For how long?** Hanafis: whoever intends to stay 15 days or more in a place counts as resident; Malikis, Shafi'is and Hanbalis set the limit at about four days (with different ways of counting). **Obligation or concession?** Hanafis: shortening is obligatory (wajib); Malikis: an emphasised sunnah; Shafi'is and Hanbalis: a concession that is usually considered preferable, while the full prayer remains valid.",
            tr: "**Hangi mesafeden itibaren?** Mâlikî, Şâfiî ve Hanbelîler: yaklaşık 80–90 km (hesaplamaya göre dört “berîd”); Hanefîler: üç günlük yol, bugün çoğunlukla yaklaşık 90 km olarak kabul edilir. **Ne kadar süre?** Hanefîler: bir yerde 15 gün veya daha fazla kalmaya niyet eden mukim olur; Mâlikî, Şâfiî ve Hanbelîler sınırı (farklı hesaplama biçimleriyle) yaklaşık dört gün kabul eder. **Gerekli mi, ruhsat mı?** Hanefîler: kısaltmak vaciptir; Mâlikîler: müekked sünnettir; Şâfiî ve Hanbelîler: çoğunlukla daha faziletli sayılan bir ruhsattır, tam kılınan namaz da geçerlidir.",
          },
        },
        {
          type: 'heading',
          text: { de: "Zusammenlegen (Dscham')", en: "Combining (jam')", tr: 'Birleştirme (cem)' },
        },
        {
          type: 'text',
          text: {
            de: "Beim Zusammenlegen betet man **Dhuhr und Asr** bzw. **Maghrib und Ischa** nacheinander in der Zeit des ersten (vorgezogen) oder des zweiten Gebets (verschoben). Der Prophet ﷺ verschob auf Reisen manchmal das Dhuhr bis in die Asr-Zeit und betete beide zusammen (Sahih al-Bukhari 1111, Sahih Muslim 704).",
            en: "When combining, one prays **Dhuhr and Asr** or **Maghrib and Isha** one after the other in the time of the first (advanced) or the second prayer (delayed). When travelling, the Prophet ﷺ sometimes delayed Dhuhr into the time of Asr and prayed both together (Sahih al-Bukhari 1111, Sahih Muslim 704).",
            tr: "Cem ederken **öğle ile ikindi** veya **akşam ile yatsı** peş peşe, birincinin (takdim) veya ikincinin (te'hir) vaktinde kılınır. Peygamber ﷺ yolculukta bazen öğleyi ikindi vaktine erteleyip ikisini birlikte kılardı (Buhârî 1111, Müslim 704).",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Malikiten, Schafiiten und Hanbaliten erlauben das Zusammenlegen auf Reisen; dazu kommen je nach Schule weitere Gründe, etwa starker Regen (v. a. für Maghrib und Ischa) oder — bei Hanbaliten — Krankheit. Die **hanafitische Schule** erlaubt echtes Zusammenlegen nur am Tag von Arafa und in Muzdalifa während des Hadsch. Sie kennt aber das „formale Zusammenlegen“: Dhuhr am Ende seiner Zeit und Asr direkt zu Beginn seiner Zeit beten — so liegen beide Gebete nah beieinander, jedes in seiner eigenen Zeit.",
            en: "Malikis, Shafi'is and Hanbalis permit combining while travelling; depending on the school further grounds are added, such as heavy rain (especially for Maghrib and Isha) or — for Hanbalis — illness. The **Hanafi school** permits actual combining only on the day of Arafah and in Muzdalifah during Hajj. It does, however, know “formal combining”: praying Dhuhr at the end of its time and Asr right at the beginning of its time — so both prayers are close together, each in its own time.",
            tr: "Mâlikî, Şâfiî ve Hanbelîler yolculukta cemi caiz görür; mezhebe göre şiddetli yağmur (özellikle akşam ve yatsı için) veya — Hanbelîlerde — hastalık gibi başka sebepler de eklenir. **Hanefî mezhebi** gerçek cemi yalnızca hacda Arafat ve Müzdelife'de kabul eder. Bununla birlikte “sûrî cem”i bilir: Öğleyi vaktinin sonunda, ikindiyi de vaktinin hemen başında kılmak — böylece iki namaz birbirine yakın, her biri kendi vaktinde kılınır.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Krankheit, Sitzen, unterwegs', en: 'Illness, sitting, on the move', tr: 'Hastalık, oturarak, yolda' },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1117',
          narrator: "'Imran ibn Husayn",
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ sagte: „Bete im Stehen; wenn du es nicht kannst, dann im Sitzen; und wenn du es nicht kannst, dann auf der Seite (liegend).“",
            en: "The Prophet ﷺ said: “Pray standing; if you cannot, then sitting; and if you cannot, then (lying) on your side.”",
            tr: "Peygamber ﷺ şöyle buyurdu: “Ayakta kıl; gücün yetmezse oturarak; ona da gücün yetmezse yan üstü (yatarak) kıl.”",
          },
        },
        {
          type: 'list',
          items: [
            { de: "Wer nicht stehen kann oder dem es erheblich schadet, betet im Sitzen — auf dem Boden oder auf einem Stuhl.", en: "Whoever cannot stand, or for whom it causes significant harm, prays seated — on the floor or on a chair.", tr: "Ayakta duramayan veya ayakta durmak kendisine ciddi zarar veren kişi oturarak kılar — yerde veya sandalyede." },
            { de: "Wer sich nicht niederwerfen kann, deutet Verbeugung und Niederwerfung mit dem Kopf an — die Niederwerfung tiefer als die Verbeugung.", en: "Whoever cannot prostrate indicates bowing and prostration with the head — the prostration lower than the bowing.", tr: "Secde edemeyen kişi rükû ve secdeyi başıyla ima eder — secdeyi rükûdan daha aşağı eğilerek." },
            { de: "Im Flugzeug oder Zug betet man das Pflichtgebet möglichst im Stehen und Richtung Qibla; ist das nicht möglich und reicht die Zeit nicht bis zur Ankunft, betet man so gut es geht. Ob ein solches Gebet später wiederholt werden muss, sehen die Schulen unterschiedlich.", en: "On a plane or train one prays the obligatory prayer standing and facing the qibla if possible; if that is not possible and the time will not last until arrival, one prays as well as one can. Whether such a prayer must be repeated later is viewed differently by the schools.", tr: "Uçakta veya trende farz namaz mümkünse ayakta ve kıbleye dönerek kılınır; bu mümkün değilse ve vakit varışa kadar yetmeyecekse, kişi gücü yettiğince kılar. Böyle bir namazın sonradan iade edilip edilmeyeceği mezheplere göre farklıdır." },
            { de: "Freiwillige Gebete betete der Prophet ﷺ auf Reisen auch auf seinem Reittier, in Fahrtrichtung.", en: "When travelling, the Prophet ﷺ also prayed voluntary prayers on his mount, facing the direction of travel.", tr: "Peygamber ﷺ yolculukta nafile namazları bineği üzerinde, gittiği yöne doğru da kılardı." },
          ],
        },
        {
          type: 'quran',
          ref: '2:286',
          arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
          translation: {
            de: "Allah erlegt keiner Seele mehr auf, als sie zu leisten vermag.",
            en: "Allah does not charge a soul except [with that within] its capacity.",
            tr: "Allah hiç kimseye gücünün yeteceğinden fazlasını yüklemez.",
          },
        },
        { type: 'link', to: '/qibla', label: { de: 'Qibla unterwegs finden', en: 'Find the qibla on the go', tr: 'Yolda kıbleyi bul' } },
        { type: 'terms', ids: ['musafir', 'qasr', 'jam', 'rakah', 'qibla', 'qada'] },
      ],
      quiz: [
        {
          question: {
            de: "Welche Gebete werden auf Reisen gekürzt?",
            en: "Which prayers are shortened when travelling?",
            tr: "Yolculukta hangi namazlar kısaltılır?",
          },
          options: [
            { de: "Alle fünf", en: "All five", tr: "Beş vaktin hepsi" },
            { de: "Dhuhr, Asr und Ischa — von vier auf zwei Rakat", en: "Dhuhr, Asr and Isha — from four to two rak'ahs", tr: "Öğle, ikindi ve yatsı — dört rekâttan ikiye" },
            { de: "Nur Maghrib", en: "Only Maghrib", tr: "Yalnızca akşam" },
          ],
          answer: 1,
          explanation: {
            de: "Nur die Pflichtgebete mit vier Rakat werden gekürzt. Fadschr und Maghrib bleiben unverändert.",
            en: "Only the four-rak'ah obligatory prayers are shortened. Fajr and Maghrib stay unchanged.",
            tr: "Yalnızca dört rekâtlı farzlar kısaltılır. Sabah ve akşam değişmez.",
          },
        },
        {
          question: {
            de: "Wie sieht die hanafitische Schule das Zusammenlegen von Dhuhr und Asr auf einer gewöhnlichen Reise?",
            en: "How does the Hanafi school view combining Dhuhr and Asr on an ordinary journey?",
            tr: "Hanefî mezhebi sıradan bir yolculukta öğle ile ikindinin cem edilmesine nasıl bakar?",
          },
          options: [
            { de: "Es ist Pflicht", en: "It is obligatory", tr: "Farzdır" },
            { de: "Echtes Zusammenlegen nur bei Arafa und Muzdalifa; sonst jedes Gebet in seiner Zeit (ggf. nah beieinander)", en: "Actual combining only at Arafah and Muzdalifah; otherwise each prayer in its own time (possibly close together)", tr: "Gerçek cem yalnızca Arafat ve Müzdelife'de; aksi hâlde her namaz kendi vaktinde (gerekirse birbirine yakın)" },
            { de: "Es ist bei jeder Reise erlaubt", en: "It is permitted on every journey", tr: "Her yolculukta caizdir" },
          ],
          answer: 1,
          explanation: {
            de: "Hanafiten erlauben echtes Zusammenlegen nur im Hadsch. Malikiten, Schafiiten und Hanbaliten erlauben es auf Reisen.",
            en: "Hanafis permit actual combining only during Hajj. Malikis, Shafi'is and Hanbalis permit it while travelling.",
            tr: "Hanefîler gerçek cemi yalnızca hacda kabul eder. Mâlikî, Şâfiî ve Hanbelîler yolculukta caiz görür.",
          },
        },
        {
          question: {
            de: "Was gilt für jemanden, der wegen Krankheit nicht stehen kann?",
            en: "What applies to someone who cannot stand due to illness?",
            tr: "Hastalık nedeniyle ayakta duramayan kişi için hüküm nedir?",
          },
          options: [
            { de: "Das Gebet entfällt", en: "The prayer is waived", tr: "Namaz düşer" },
            { de: "Er betet im Sitzen, notfalls liegend", en: "He prays seated, if necessary lying down", tr: "Oturarak, gerekirse yatarak kılar" },
            { de: "Er holt alle Gebete nach der Genesung nach", en: "He makes up all prayers after recovering", tr: "İyileşince bütün namazları kaza eder" },
          ],
          answer: 1,
          explanation: {
            de: "„Bete im Stehen; wenn du es nicht kannst, dann im Sitzen …“ (Sahih al-Bukhari 1117). Allah verlangt nicht mehr, als man vermag (2:286).",
            en: "“Pray standing; if you cannot, then sitting …” (Sahih al-Bukhari 1117). Allah does not ask more than one is able to do (2:286).",
            tr: "“Ayakta kıl; gücün yetmezse oturarak …” (Buhârî 1117). Allah kimseye gücünden fazlasını yüklemez (2:286).",
          },
        },
      ],
      sources: [
        'Quran 4:101, 2:286',
        'Sahih Muslim 686',
        'Sahih al-Bukhari 1111, Sahih Muslim 704 (Zusammenlegen auf Reisen)',
        'Sahih al-Bukhari 1117',
        FIQH_REF,
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 9 ───────────────────────────────────────────────────────────
    {
      id: 'jumuah-and-congregation',
      title: {
        de: 'Freitagsgebet und Gemeinschaftsgebet',
        en: "Friday prayer and congregational prayer",
        tr: 'Cuma namazı ve cemaatle namaz',
      },
      summary: {
        de: "Wer zum Freitagsgebet verpflichtet ist, was dabei gilt, wie man hinter einem Imam richtig betet — und welchen Rang das Gemeinschaftsgebet hat.",
        en: "Who is obliged to attend the Friday prayer, what applies there, how to pray correctly behind an imam — and the status of congregational prayer.",
        tr: "Cuma namazının kimlere farz olduğu, nelere dikkat edileceği, imamın arkasında nasıl doğru kılınacağı — ve cemaatle namazın hükmü.",
      },
      minutes: 6,
      blocks: [
        {
          type: 'quran',
          ref: '62:9',
          translation: {
            de: "O die ihr glaubt, wenn am Freitag zum Gebet gerufen wird, dann eilt zu Allahs Gedenken und lasst das Kaufgeschäft. Das ist besser für euch, wenn ihr (es) nur wisst.",
            en: "O you who have believed, when [the adhan] is called for the prayer on the day of Jumu'ah, then proceed to the remembrance of Allah and leave trade. That is better for you, if you only knew.",
            tr: "Ey iman edenler! Cuma günü namaz için çağrı yapıldığı zaman Allah'ı anmaya koşun ve alışverişi bırakın. Eğer bilirseniz bu sizin için daha hayırlıdır.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Das Freitagsgebet (Dschumu‘a)', en: "The Friday prayer (Jumu'ah)", tr: 'Cuma namazı' },
        },
        {
          type: 'text',
          text: {
            de: "Das Freitagsgebet ersetzt am Freitag das Dhuhr-Gebet. Es besteht aus der **Predigt (Khutba)**, die vor dem Gebet gehalten wird, und **zwei Rakat** mit lauter Rezitation in Gemeinschaft. Verpflichtet sind nach allen Schulen erwachsene, geistig gesunde, ansässige Männer ohne Entschuldigung. Frauen, Reisende und Kranke sind nicht verpflichtet; wenn sie teilnehmen, ist ihr Gebet gültig und ersetzt das Dhuhr.",
            en: "On Friday the Friday prayer replaces the Dhuhr prayer. It consists of the **sermon (khutbah)**, given before the prayer, and **two rak'ahs** with audible recitation in congregation. According to all schools it is obligatory for adult, sane, resident men without an excuse. Women, travellers and the sick are not obliged; if they attend, their prayer is valid and replaces Dhuhr.",
            tr: "Cuma günü Cuma namazı öğle namazının yerini alır. Namazdan önce okunan **hutbe** ile cemaatle sesli kıraatle kılınan **iki rekâttan** oluşur. Bütün mezheplere göre ergen, akıllı, mukim ve özrü olmayan erkeklere farzdır. Kadınlar, yolcular ve hastalar yükümlü değildir; katılırlarsa namazları geçerlidir ve öğlenin yerine geçer.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 865',
          narrator: "'Abdullah ibn 'Umar, Abu Huraira",
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ sagte: „Die Leute sollen aufhören, die Freitagsgebete zu vernachlässigen, oder Allah wird ihre Herzen versiegeln, und dann werden sie zu den Achtlosen gehören.“",
            en: "The Prophet ﷺ said: “People must stop neglecting the Friday prayers, or else Allah will seal their hearts and they will be among the heedless.”",
            tr: "Peygamber ﷺ şöyle buyurdu: “İnsanlar ya Cuma namazlarını terk etmekten vazgeçerler ya da Allah onların kalplerini mühürler ve gafillerden olurlar.”",
          },
        },
        {
          type: 'list',
          items: [
            { de: "Sunna am Freitag: Ghusl, saubere Kleidung, Duft (für Männer), früh kommen", en: "Sunnah on Friday: ghusl, clean clothes, fragrance (for men), arriving early", tr: "Cuma günü sünnetler: gusül, temiz elbise, (erkekler için) güzel koku, erken gitmek" },
            { de: "Während der Khutba still zuhören — selbst „Sei still!“ zu sagen ist dann unnützes Reden (Sahih al-Bukhari 934, Sahih Muslim 851)", en: "Listen silently during the khutbah — even saying “Be quiet!” is then idle talk (Sahih al-Bukhari 934, Sahih Muslim 851)", tr: "Hutbe sırasında sessizce dinlemek — o anda “Sus!” demek bile boş söz sayılır (Buhârî 934, Müslim 851)" },
            { de: "Wer das Freitagsgebet als Verpflichteter verpasst, betet stattdessen Dhuhr mit vier Rakat", en: "Whoever is obliged and misses the Friday prayer prays Dhuhr with four rak'ahs instead", tr: "Yükümlü olup Cuma'yı kaçıran kişi yerine dört rekât öğle namazı kılar" },
          ],
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "**Mindestzahl der Teilnehmer:** nach Abu Hanifa drei Männer außer dem Imam; nach malikitischer Schule zwölf außer dem Imam; nach schafiitischer und hanbalitischer Schule vierzig Verpflichtete. **Gebet beim Betreten während der Khutba:** Schafiiten und Hanbaliten: zwei kurze Rakat beten, gestützt auf Sahih Muslim 875; Hanafiten und Malikiten: sich setzen und zuhören, weil das Zuhören Vorrang hat.",
            en: "**Minimum number of attendees:** according to Abu Hanifa three men besides the imam; in the Maliki school twelve besides the imam; in the Shafi'i and Hanbali schools forty obliged persons. **Praying on entering during the khutbah:** Shafi'is and Hanbalis: pray two short rak'ahs, based on Sahih Muslim 875; Hanafis and Malikis: sit down and listen, because listening takes precedence.",
            tr: "**Asgari cemaat sayısı:** Ebû Hanîfe'ye göre imam dışında üç erkek; Mâlikî mezhebine göre imam dışında on iki; Şâfiî ve Hanbelî mezheplerine göre yükümlü kırk kişi. **Hutbe sırasında camiye girince namaz:** Şâfiî ve Hanbelîler: Müslim 875'e dayanarak kısa iki rekât kılınır; Hanefî ve Mâlikîler: oturup dinlenir, çünkü hutbeyi dinlemek önceliklidir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Das Gemeinschaftsgebet', en: 'Congregational prayer', tr: 'Cemaatle namaz' },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 645, Sahih Muslim 650',
          narrator: "'Abdullah ibn 'Umar",
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ sagte: „Das Gebet in Gemeinschaft ist siebenundzwanzig Stufen vorzüglicher als das Gebet allein.“",
            en: "The Prophet ﷺ said: “Prayer in congregation is twenty-seven degrees superior to prayer offered alone.”",
            tr: "Peygamber ﷺ şöyle buyurdu: “Cemaatle kılınan namaz, tek başına kılınan namazdan yirmi yedi derece daha faziletlidir.”",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "**Rang des Gemeinschaftsgebets für Männer:** Hanafiten: betonte Sunna (nahe an Wajib); Malikiten: betonte Sunna; Schafiiten: Gemeinschaftspflicht (Fard Kifaya) nach der verlässlichen Lehrmeinung; Hanbaliten: individuelle Pflicht für jeden fähigen Mann — das allein verrichtete Gebet bleibt aber gültig. **Rezitation hinter dem Imam:** Hanafiten: der Betende hinter dem Imam rezitiert nicht; Schafiiten: die Fatiha wird in jedem Gebet rezitiert; Malikiten und Hanbaliten: in den leisen Gebeten rezitieren, in den lauten zuhören.",
            en: "**Status of congregational prayer for men:** Hanafis: an emphasised sunnah (close to wajib); Malikis: an emphasised sunnah; Shafi'is: a communal obligation (fard kifayah) in the relied-upon position; Hanbalis: an individual obligation for every able man — though prayer offered alone remains valid. **Recitation behind the imam:** Hanafis: the follower does not recite; Shafi'is: the Fatiha is recited in every prayer; Malikis and Hanbalis: recite in the silent prayers, listen in the audible ones.",
            tr: "**Erkekler için cemaatle namazın hükmü:** Hanefîler: vacibe yakın müekked sünnet; Mâlikîler: müekked sünnet; Şâfiîler: mutemet görüşe göre farz-ı kifaye; Hanbelîler: gücü yeten her erkeğe farz-ı ayn — ancak tek başına kılınan namaz da geçerlidir. **İmamın arkasında kıraat:** Hanefîler: cemaat okumaz; Şâfiîler: her namazda Fâtiha okunur; Mâlikî ve Hanbelîler: gizli okunan namazlarda okunur, açıktan okunanlarda dinlenir.",
          },
        },
        {
          type: 'list',
          items: [
            { de: "**Reihen gerade und geschlossen:** „Richtet eure Reihen gerade, denn das Geraderichten der Reihen gehört zur Vollkommenheit des Gebets“ (Sahih al-Bukhari 723, Sahih Muslim 433).", en: "**Straight, closed rows:** “Straighten your rows, for straightening the rows is part of the perfection of prayer” (Sahih al-Bukhari 723, Sahih Muslim 433).", tr: "**Düz ve sık saflar:** “Saflarınızı düzeltin; çünkü safları düzeltmek namazın tamamlanmasındandır” (Buhârî 723, Müslim 433)." },
            { de: "**Dem Imam folgen, nie vorauseilen:** Der Prophet ﷺ warnte eindringlich davor, den Kopf vor dem Imam zu heben (Sahih al-Bukhari 691, Sahih Muslim 427).", en: "**Follow the imam, never get ahead:** the Prophet ﷺ warned emphatically against raising one's head before the imam (Sahih al-Bukhari 691, Sahih Muslim 427).", tr: "**İmama uymak, asla önüne geçmemek:** Peygamber ﷺ imamdan önce başı kaldırmaya karşı şiddetle uyarmıştır (Buhârî 691, Müslim 427)." },
            { de: "**Zu spät gekommen?** Mit dem Takbir einsteigen und sich der aktuellen Position anschließen. Wer den Imam noch in der Verbeugung erreicht, dem zählt nach der Mehrheit diese Rakat; den Rest betet man nach dem Salam des Imams nach.", en: "**Arrived late?** Join with the takbir and take up the current position. Whoever catches the imam still in the bowing counts that rak'ah according to the majority; the rest is completed after the imam's salam.", tr: "**Geç mi kaldın?** Tekbirle namaza katıl ve imamın o anki hâline uy. İmama rükûda yetişen, çoğunluğa göre o rekâtı kazanmış olur; kalanını imamın selamından sonra tamamlar." },
            { de: "**Wer leitet?** Wer am meisten vom Koran kann und die Regeln des Gebets kennt (Sahih Muslim 673).", en: "**Who leads?** The one who knows the most Quran and knows the rules of prayer (Sahih Muslim 673).", tr: "**Kim imam olur?** Kur'an'ı en iyi okuyan ve namazın hükümlerini bilen (Müslim 673)." },
          ],
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Frauen sind in der Moschee willkommen: „Hindert die Dienerinnen Allahs nicht an den Moscheen Allahs“ (Sahih al-Bukhari 900, Sahih Muslim 442). Das Gebet zu Hause ist für sie ebenso vollwertig.",
            en: "Women are welcome in the mosque: “Do not prevent the female servants of Allah from the mosques of Allah” (Sahih al-Bukhari 900, Sahih Muslim 442). Prayer at home is equally complete for them.",
            tr: "Kadınlar camide hoş karşılanır: “Allah'ın kadın kullarını Allah'ın mescitlerinden men etmeyin” (Buhârî 900, Müslim 442). Evde kıldıkları namaz da onlar için tam bir namazdır.",
          },
        },
        { type: 'link', to: '/prayer', label: { de: 'Gebetszeiten ansehen', en: 'View prayer times', tr: 'Namaz vakitlerine bak' } },
        { type: 'terms', ids: ['jumuah', 'khutbah', 'imam', 'masjid', 'iqama', 'ghusl', 'musafir'] },
      ],
      quiz: [
        {
          question: {
            de: "Was ersetzt das Freitagsgebet?",
            en: "What does the Friday prayer replace?",
            tr: "Cuma namazı hangi namazın yerine geçer?",
          },
          options: [
            { de: "Das Fadschr-Gebet", en: "The Fajr prayer", tr: "Sabah namazının" },
            { de: "Das Dhuhr-Gebet", en: "The Dhuhr prayer", tr: "Öğle namazının" },
            { de: "Das Asr-Gebet", en: "The Asr prayer", tr: "İkindi namazının" },
          ],
          answer: 1,
          explanation: {
            de: "Am Freitag tritt das Freitagsgebet (Khutba + zwei Rakat) an die Stelle des Dhuhr. Wer es verpasst, betet Dhuhr.",
            en: "On Friday the Friday prayer (khutbah + two rak'ahs) takes the place of Dhuhr. Whoever misses it prays Dhuhr.",
            tr: "Cuma günü Cuma namazı (hutbe + iki rekât) öğlenin yerini alır. Kaçıran öğle namazını kılar.",
          },
        },
        {
          question: {
            de: "Du betrittst die Moschee, während die Khutba läuft. Was sagen die Schulen?",
            en: "You enter the mosque while the khutbah is under way. What do the schools say?",
            tr: "Hutbe okunurken camiye giriyorsun. Mezhepler ne der?",
          },
          options: [
            { de: "Alle: sofort vier Rakat beten", en: "All: pray four rak'ahs immediately", tr: "Hepsi: hemen dört rekât kılınır" },
            { de: "Schafiiten/Hanbaliten: zwei kurze Rakat; Hanafiten/Malikiten: sich setzen und zuhören", en: "Shafi'is/Hanbalis: two short rak'ahs; Hanafis/Malikis: sit down and listen", tr: "Şâfiî/Hanbelîler: kısa iki rekât; Hanefî/Mâlikîler: oturup dinlemek" },
            { de: "Alle: draußen warten", en: "All: wait outside", tr: "Hepsi: dışarıda beklemek" },
          ],
          answer: 1,
          explanation: {
            de: "Beide Positionen stützen sich auf Belege: die einen auf Sahih Muslim 875, die anderen auf das Gebot, der Khutba zuzuhören.",
            en: "Both positions rely on evidence: one on Sahih Muslim 875, the other on the command to listen to the khutbah.",
            tr: "İki görüş de delile dayanır: biri Müslim 875'e, diğeri hutbeyi dinleme emrine.",
          },
        },
        {
          question: {
            de: "Um wie viele Stufen ist das Gemeinschaftsgebet nach dem Hadith vorzüglicher?",
            en: "By how many degrees is congregational prayer superior according to the hadith?",
            tr: "Hadise göre cemaatle namaz kaç derece daha faziletlidir?",
          },
          options: [
            { de: "Sieben", en: "Seven", tr: "Yedi" },
            { de: "Zehn", en: "Ten", tr: "On" },
            { de: "Siebenundzwanzig", en: "Twenty-seven", tr: "Yirmi yedi" },
          ],
          answer: 2,
          explanation: {
            de: "Sahih al-Bukhari 645 und Sahih Muslim 650: siebenundzwanzig Stufen.",
            en: "Sahih al-Bukhari 645 and Sahih Muslim 650: twenty-seven degrees.",
            tr: "Buhârî 645 ve Müslim 650: yirmi yedi derece.",
          },
        },
      ],
      sources: [
        'Quran 62:9',
        'Sahih Muslim 865',
        'Sahih al-Bukhari 934, Sahih Muslim 851 (Schweigen während der Khutba)',
        'Sahih Muslim 875 (zwei Rakat beim Betreten während der Khutba)',
        'Sahih al-Bukhari 645, Sahih Muslim 650',
        'Sahih al-Bukhari 723, Sahih Muslim 433; Sahih al-Bukhari 691, Sahih Muslim 427',
        'Sahih Muslim 673; Sahih al-Bukhari 900, Sahih Muslim 442',
        FIQH_REF,
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 10 ──────────────────────────────────────────────────────────
    {
      id: 'fasting-in-detail',
      title: {
        de: 'Fasten im Detail',
        en: 'Fasting in detail',
        tr: 'Ayrıntılı oruç',
      },
      summary: {
        de: "Was das Fasten bricht und was nicht, wer vom Fasten befreit ist und wann Nachholen, Fidya oder Kaffara nötig sind — mit den Unterschieden der Schulen.",
        en: "What breaks the fast and what does not, who is exempt and when making up, fidya or kaffarah are required — with the differences between the schools.",
        tr: "Orucu neyin bozduğu ve neyin bozmadığı, kimlerin muaf olduğu ve ne zaman kaza, fidye veya keffaret gerektiği — mezheplerin farklarıyla.",
      },
      minutes: 8,
      blocks: [
        {
          type: 'quran',
          ref: '2:183',
          translation: {
            de: "O die ihr glaubt, vorgeschrieben ist euch das Fasten, so wie es denjenigen vor euch vorgeschrieben war, auf dass ihr gottesfürchtig werden möget.",
            en: "O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous.",
            tr: "Ey iman edenler! Oruç sizden öncekilere farz kılındığı gibi size de farz kılındı. Umulur ki sakınırsınız.",
          },
        },
        {
          type: 'text',
          text: {
            de: "Das Fasten (Sawm) bedeutet, sich von der echten Morgendämmerung bis zum Sonnenuntergang mit der Absicht, für Allah zu fasten, des Essens, Trinkens und Geschlechtsverkehrs zu enthalten. Die **Absicht** ist für das Pflichtfasten nötig; sie muss nicht ausgesprochen werden — wer zum Suhur aufsteht, um zu fasten, hat sie bereits.",
            en: "Fasting (sawm) means abstaining from food, drink and sexual intercourse from true dawn until sunset with the intention of fasting for Allah. The **intention** is needed for the obligatory fast; it does not have to be spoken — whoever gets up for suhoor in order to fast already has it.",
            tr: "Oruç (savm), Allah için oruç tutmaya niyet ederek fecr-i sâdıktan güneşin batışına kadar yemekten, içmekten ve cinsel ilişkiden uzak durmaktır. Farz oruç için **niyet** gereklidir; dille söylenmesi şart değildir — oruç tutmak için sahura kalkan kişi zaten niyet etmiştir.",
          },
        },
        {
          type: 'quran',
          ref: '2:187',
          translation: {
            de: "… Und esst und trinkt, bis sich für euch der weiße Faden vom schwarzen Faden der Morgendämmerung klar unterscheidet. Hierauf vollzieht das Fasten bis zur Nacht …",
            en: "… And eat and drink until the white thread of dawn becomes distinct to you from the black thread [of night]. Then complete the fast until the sunset …",
            tr: "… Tan yerinin ağartısı gecenin karanlığından ayırt edilinceye kadar yiyin, için. Sonra akşama kadar orucu tamamlayın …",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "**Zeitpunkt der Absicht:** Schafiiten und Hanbaliten: für jedes Pflichtfasten in der Nacht davor. Malikiten: eine Absicht zu Beginn des Ramadan genügt für den ganzen Monat (solange er nicht unterbrochen wird). Hanafiten: für das Ramadan-Fasten ist die Absicht bis vor die Mitte des Tages gültig, wenn man bis dahin nichts gegessen hat.",
            en: "**Timing of the intention:** Shafi'is and Hanbalis: for each obligatory fast during the night before. Malikis: one intention at the beginning of Ramadan suffices for the whole month (as long as it is not interrupted). Hanafis: for the Ramadan fast the intention is valid until before the middle of the day, provided one has eaten nothing until then.",
            tr: "**Niyetin vakti:** Şâfiî ve Hanbelîler: her farz oruç için bir önceki gece. Mâlikîler: Ramazan'ın başındaki tek niyet (kesintiye uğramadıkça) bütün ay için yeterlidir. Hanefîler: Ramazan orucu için, o zamana kadar bir şey yenmemişse niyet kuşluk vaktinin sonuna (dahve-i kübrâ) kadar geçerlidir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Was das Fasten bricht', en: 'What breaks the fast', tr: 'Orucu bozan şeyler' },
        },
        {
          type: 'list',
          items: [
            { de: "Absichtliches Essen, Trinken und Rauchen", en: "Deliberate eating, drinking and smoking", tr: "Kasten yemek, içmek ve sigara içmek" },
            { de: "Geschlechtsverkehr (zusätzlich mit Kaffara, siehe unten)", en: "Sexual intercourse (additionally with kaffarah, see below)", tr: "Cinsel ilişki (ayrıca keffaret gerektirir, aşağıya bakınız)" },
            { de: "Absichtliches Herbeiführen von Erbrechen (nach den meisten Gelehrten)", en: "Deliberately inducing vomiting (according to most scholars)", tr: "Kasten kusmak (âlimlerin çoğuna göre)" },
            { de: "Beginn der Menstruation oder Wochenbettblutung — auch kurz vor Sonnenuntergang", en: "Onset of menstruation or postnatal bleeding — even shortly before sunset", tr: "Hayız veya nifasın başlaması — güneş batmadan hemen önce bile olsa" },
            { de: "Nährstoffhaltige Infusionen", en: "Nutritional infusions", tr: "Besleyici serumlar" },
          ],
        },
        {
          type: 'heading',
          text: { de: 'Was das Fasten nicht bricht', en: 'What does not break the fast', tr: 'Orucu bozmayan şeyler' },
        },
        {
          type: 'list',
          items: [
            { de: "Essen oder Trinken aus **Vergesslichkeit** — man fastet einfach weiter", en: "Eating or drinking out of **forgetfulness** — one simply continues fasting", tr: "**Unutarak** yemek veya içmek — oruca devam edilir" },
            { de: "Unwillkürliches Erbrechen, Schlucken des eigenen Speichels, ein feuchter Traum", en: "Involuntary vomiting, swallowing one's own saliva, a wet dream", tr: "İstem dışı kusma, kendi tükürüğünü yutmak, ihtilam olmak" },
            { de: "Duschen, Baden, Zähneputzen ohne Schlucken (manche Gelehrte halten Zahnpasta für makruh)", en: "Showering, bathing, brushing the teeth without swallowing (some scholars consider toothpaste makruh)", tr: "Duş almak, yıkanmak, yutmadan diş fırçalamak (bazı âlimler diş macununu mekruh sayar)" },
            { de: "Blutabnahme und — nach den meisten Gelehrten — nicht nährende Injektionen", en: "Having blood taken and — according to most scholars — non-nutritional injections", tr: "Kan vermek ve — âlimlerin çoğuna göre — besleyici olmayan iğneler" },
          ],
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1933, Sahih Muslim 1155',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ sagte: „Wer fastet und aus Vergesslichkeit isst oder trinkt, soll sein Fasten vollenden; denn Allah hat ihn gespeist und getränkt.“",
            en: "The Prophet ﷺ said: “Whoever is fasting and forgets and eats or drinks, let him complete his fast, for it is Allah who has fed him and given him drink.”",
            tr: "Peygamber ﷺ şöyle buyurdu: “Oruçlu iken unutarak yiyen veya içen kişi orucunu tamamlasın; çünkü onu Allah yedirmiş ve içirmiştir.”",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "**Augentropfen und Kajal:** brechen nach hanafitischer und schafiitischer Schule das Fasten nicht; nach malikitischer und hanbalitischer Schule ja, wenn der Geschmack im Rachen ankommt. **Schröpfen (Hidschama):** bricht nach hanbalitischer Schule das Fasten, nach den anderen nicht (ist aber für Geschwächte makruh). **Nasen- und Ohrentropfen, Inhalatoren und moderne Behandlungen** werden von heutigen Gelehrten und Fiqh-Räten unterschiedlich bewertet. Bei Medikamenten frag am besten einen Gelehrten und deinen Arzt gemeinsam.",
            en: "**Eye drops and kohl:** do not break the fast in the Hanafi and Shafi'i schools; in the Maliki and Hanbali schools they do if the taste reaches the throat. **Cupping (hijama):** breaks the fast in the Hanbali school, not in the others (but is makruh for those it weakens). **Nose and ear drops, inhalers and modern treatments** are assessed differently by contemporary scholars and fiqh councils. With medication, it is best to ask a scholar and your doctor together.",
            tr: "**Göz damlası ve sürme:** Hanefî ve Şâfiî mezheplerine göre orucu bozmaz; Mâlikî ve Hanbelî mezheplerine göre tadı boğaza ulaşırsa bozar. **Hacamat:** Hanbelî mezhebinde orucu bozar, diğerlerinde bozmaz (ancak zayıf düşürüyorsa mekruhtur). **Burun ve kulak damlaları, inhalerler ve modern tedaviler** günümüz âlimleri ve fıkıh kurulları tarafından farklı değerlendirilir. İlaç konusunda en iyisi bir âlime ve doktoruna birlikte danışmaktır.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Wer nicht fasten muss', en: 'Who does not have to fast', tr: 'Kimler oruç tutmak zorunda değildir?' },
        },
        {
          type: 'quran',
          ref: '2:184',
          translation: {
            de: "… Wer aber von euch krank ist oder sich auf einer Reise befindet, der soll eine (gleiche) Anzahl von anderen Tagen (fasten). Und denjenigen, die es (nur mit großer Mühe) zu leisten vermögen, ist als Ersatz die Speisung eines Armen auferlegt …",
            en: "… So whoever among you is ill or on a journey [during them] — then an equal number of other days [are to be made up]. And upon those who are able [to fast, but with hardship] — a ransom [as substitute] of feeding a poor person …",
            tr: "… Sizden kim hasta veya yolculukta olursa, tutamadığı günler sayısınca başka günlerde tutar. Oruca güç yetiremeyenler ise bir yoksul doyumu kadar fidye verir …",
          },
        },
        {
          type: 'list',
          items: [
            { de: "**Kranke und Reisende:** dürfen das Fasten unterbrechen und holen die Tage nach (Qada).", en: "**The sick and travellers:** may break the fast and make up the days later (qada).", tr: "**Hastalar ve yolcular:** oruç tutmayabilir, sonra kaza ederler." },
            { de: "**Menstruierende und Wöchnerinnen:** fasten nicht und holen die Tage nach (Sahih Muslim 335).", en: "**Menstruating women and those with postnatal bleeding:** do not fast and make up the days (Sahih Muslim 335).", tr: "**Hayızlı ve lohusa kadınlar:** oruç tutmaz, sonra kaza eder (Müslim 335)." },
            { de: "**Ältere und dauerhaft Kranke ohne Aussicht auf Besserung:** fasten nicht und geben stattdessen Fidya — die Speisung eines Bedürftigen pro Tag.", en: "**The elderly and the chronically ill with no prospect of recovery:** do not fast and instead give fidya — feeding one needy person per day.", tr: "**Yaşlılar ve iyileşme ümidi olmayan hastalar:** oruç tutmaz, bunun yerine her gün için bir yoksulu doyuracak kadar fidye verir." },
            { de: "**Schwangere und Stillende,** die um sich oder ihr Kind fürchten: dürfen das Fasten unterlassen.", en: "**Pregnant and breastfeeding women** who fear for themselves or their child: may refrain from fasting.", tr: "**Hamile ve emziren kadınlar** kendileri veya çocukları için endişe ederlerse oruç tutmayabilir." },
          ],
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "**Schwangere und Stillende:** Hanafiten: nur Nachholen. Schafiiten und Hanbaliten: Fürchtet sie nur um das Kind, holt sie nach und gibt zusätzlich Fidya; fürchtet sie um sich selbst, nur Nachholen. Malikiten: Schwangere holen nur nach, Stillende holen nach und geben Fidya. **Ältere Menschen:** Die Fidya ist nach der Mehrheit Pflicht, nach malikitischer Schule empfohlen. **Höhe der Fidya:** nach Malikiten, Schafiiten und Hanbaliten ein Mudd Grundnahrungsmittel (bzw. ähnliches Maß) pro Tag, nach Hanafiten ein halber Sa' Weizen bzw. dessen Wert — Moscheen nennen meist einen Geldbetrag. **Nachholen über den nächsten Ramadan hinaus ohne Grund:** nach Malikiten, Schafiiten und Hanbaliten Nachholen plus Fidya pro Tag, nach Hanafiten nur Nachholen.",
            en: "**Pregnant and breastfeeding women:** Hanafis: only making up. Shafi'is and Hanbalis: if she fears only for the child, she makes up and additionally gives fidya; if she fears for herself, only making up. Malikis: pregnant women only make up, breastfeeding women make up and give fidya. **The elderly:** fidya is obligatory according to the majority, recommended in the Maliki school. **Amount of fidya:** for Malikis, Shafi'is and Hanbalis one mudd of staple food (or a similar measure) per day, for Hanafis half a sa' of wheat or its value — mosques usually state a monetary amount. **Making up beyond the next Ramadan without reason:** for Malikis, Shafi'is and Hanbalis making up plus fidya per day, for Hanafis only making up.",
            tr: "**Hamile ve emziren kadınlar:** Hanefîler: yalnızca kaza. Şâfiî ve Hanbelîler: yalnızca çocuğu için endişe ediyorsa kaza ile birlikte fidye; kendisi için endişe ediyorsa yalnızca kaza. Mâlikîler: hamile yalnızca kaza eder, emziren kaza eder ve fidye verir. **Yaşlılar:** Fidye çoğunluğa göre gereklidir, Mâlikî mezhebine göre müstehaptır. **Fidyenin miktarı:** Mâlikî, Şâfiî ve Hanbelîlere göre her gün için bir müd temel gıda (veya benzeri bir ölçü), Hanefîlere göre yarım sâ buğday veya değeri — camiler genellikle bir para miktarı bildirir. **Kazayı özürsüz olarak sonraki Ramazan'dan sonraya bırakmak:** Mâlikî, Şâfiî ve Hanbelîlere göre kaza ile birlikte her gün için fidye, Hanefîlere göre yalnızca kaza.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Kaffara: die Sühne', en: 'Kaffarah: the expiation', tr: 'Keffaret' },
        },
        {
          type: 'text',
          text: {
            de: "Wer einen Ramadan-Fastentag absichtlich durch Geschlechtsverkehr bricht, holt den Tag nach und leistet eine **Kaffara**: zwei Monate ununterbrochen fasten; wer das nicht kann, speist sechzig Bedürftige (Sahih al-Bukhari 1936, Sahih Muslim 1111). Die ursprünglich erste Stufe, das Freilassen eines Sklaven, ist heute nicht mehr anwendbar.",
            en: "Whoever deliberately breaks a Ramadan fast through intercourse makes up the day and performs a **kaffarah**: fasting two consecutive months; whoever cannot, feeds sixty needy people (Sahih al-Bukhari 1936, Sahih Muslim 1111). The original first level, freeing a slave, is no longer applicable today.",
            tr: "Ramazan orucunu cinsel ilişkiyle kasten bozan kişi o günü kaza eder ve **keffaret** öder: iki ay ara vermeden oruç tutmak; buna gücü yetmeyen altmış yoksulu doyurur (Buhârî 1936, Müslim 1111). Asıl ilk aşama olan köle azat etmek bugün uygulanamaz.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Ob auch **absichtliches Essen oder Trinken** im Ramadan eine Kaffara erfordert, ist umstritten: Hanafiten und Malikiten: ja; Schafiiten und Hanbaliten: nein — dann sind Reue und Nachholen nötig. Da es hier um schwere persönliche Fragen geht, wende dich vertraulich an einen Gelehrten.",
            en: "Whether **deliberate eating or drinking** in Ramadan also requires kaffarah is disputed: Hanafis and Malikis: yes; Shafi'is and Hanbalis: no — then repentance and making up are required. Since these are serious personal questions, turn to a scholar in confidence.",
            tr: "Ramazan'da **kasten yemek veya içmenin** de keffaret gerektirip gerektirmediği tartışmalıdır: Hanefî ve Mâlikîler: evet; Şâfiî ve Hanbelîler: hayır — bu durumda tövbe ve kaza gerekir. Bunlar ciddi kişisel meseleler olduğundan güvendiğin bir âlime danış.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1903',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ sagte: „Wer das lügnerische Reden und das Handeln danach nicht lässt, bei dem hat Allah kein Bedürfnis danach, dass er sein Essen und Trinken lässt.“",
            en: "The Prophet ﷺ said: “Whoever does not give up false speech and acting upon it, Allah has no need of his giving up his food and drink.”",
            tr: "Peygamber ﷺ şöyle buyurdu: “Kim yalan sözü ve onunla amel etmeyi bırakmazsa, Allah'ın onun yemesini ve içmesini bırakmasına ihtiyacı yoktur.”",
          },
        },
        { type: 'link', to: '/ramadan', label: { de: 'Ramadan-Begleiter', en: 'Ramadan companion', tr: 'Ramazan rehberi' } },
        { type: 'link', to: '/calendar', label: { de: 'Islamischer Kalender', en: 'Islamic calendar', tr: 'Hicri takvim' } },
        { type: 'terms', ids: ['sawm', 'ramadan', 'suhoor', 'iftar', 'niyyah', 'qada', 'fidya', 'kaffara', 'hayd'] },
      ],
      quiz: [
        {
          question: {
            de: "Du hast im Ramadan aus Vergesslichkeit etwas getrunken. Was gilt?",
            en: "In Ramadan you drank something out of forgetfulness. What applies?",
            tr: "Ramazan'da unutarak bir şey içtin. Hüküm nedir?",
          },
          options: [
            { de: "Das Fasten ist gebrochen und muss nachgeholt werden", en: "The fast is broken and must be made up", tr: "Oruç bozulmuştur, kaza edilmelidir" },
            { de: "Du fastest einfach weiter — das Fasten ist gültig", en: "You simply continue fasting — the fast is valid", tr: "Oruca devam edersin — oruç geçerlidir" },
            { de: "Du musst eine Kaffara leisten", en: "You must perform a kaffarah", tr: "Keffaret ödemelisin" },
          ],
          answer: 1,
          explanation: {
            de: "„… denn Allah hat ihn gespeist und getränkt“ (Sahih al-Bukhari 1933, Sahih Muslim 1155). Sobald man sich erinnert, hört man auf.",
            en: "“… for it is Allah who has fed him and given him drink” (Sahih al-Bukhari 1933, Sahih Muslim 1155). As soon as one remembers, one stops.",
            tr: "“… çünkü onu Allah yedirmiş ve içirmiştir” (Buhârî 1933, Müslim 1155). Hatırlar hatırlamaz bırakılır.",
          },
        },
        {
          question: {
            de: "Was ist die Fidya?",
            en: "What is fidya?",
            tr: "Fidye nedir?",
          },
          options: [
            { de: "Die Speisung eines Bedürftigen pro Tag für jemanden, der dauerhaft nicht fasten kann", en: "Feeding a needy person per day for someone permanently unable to fast", tr: "Kalıcı olarak oruç tutamayan kişinin her gün için bir yoksulu doyurması" },
            { de: "Zwei Monate ununterbrochenes Fasten", en: "Two consecutive months of fasting", tr: "İki ay kesintisiz oruç" },
            { de: "Die Zakat al-Fitr", en: "Zakat al-Fitr", tr: "Fitre" },
          ],
          answer: 0,
          explanation: {
            de: "Die Fidya (2:184) ersetzt das Fasten bei Menschen, die es dauerhaft nicht können. Zwei Monate Fasten sind dagegen die Kaffara.",
            en: "Fidya (2:184) replaces fasting for people permanently unable to fast. Two months of fasting, by contrast, is the kaffarah.",
            tr: "Fidye (2:184), kalıcı olarak oruç tutamayanlar için orucun yerini tutar. İki ay oruç ise keffarettir.",
          },
        },
        {
          question: {
            de: "Brechen Augentropfen das Fasten?",
            en: "Do eye drops break the fast?",
            tr: "Göz damlası orucu bozar mı?",
          },
          options: [
            { de: "Ja, nach allen Schulen", en: "Yes, according to all schools", tr: "Evet, bütün mezheplere göre" },
            { de: "Die Schulen unterscheiden sich: Hanafiten/Schafiiten nein, Malikiten/Hanbaliten ja, wenn der Geschmack den Rachen erreicht", en: "The schools differ: Hanafis/Shafi'is no, Malikis/Hanbalis yes if the taste reaches the throat", tr: "Mezhepler farklıdır: Hanefî/Şâfiîler hayır, Mâlikî/Hanbelîler tadı boğaza ulaşırsa evet" },
            { de: "Nein, nach allen Schulen", en: "No, according to all schools", tr: "Hayır, bütün mezheplere göre" },
          ],
          answer: 1,
          explanation: {
            de: "Hier gibt es eine bekannte Meinungsverschiedenheit. Bei Medikamenten im Ramadan: Gelehrten und Arzt fragen.",
            en: "This is a well-known difference of opinion. For medication in Ramadan: ask a scholar and your doctor.",
            tr: "Bu bilinen bir görüş ayrılığıdır. Ramazan'da ilaç kullanımı için bir âlime ve doktora danış.",
          },
        },
      ],
      sources: [
        'Quran 2:183, 2:184, 2:187',
        'Sahih al-Bukhari 1933, Sahih Muslim 1155',
        'Sahih al-Bukhari 1936, Sahih Muslim 1111 (Kaffara)',
        'Sahih Muslim 335 (Nachholen der Fastentage nach der Menstruation)',
        'Sahih al-Bukhari 1903',
        FIQH_REF,
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 11 ──────────────────────────────────────────────────────────
    {
      id: 'zakat-in-practice',
      title: {
        de: 'Zakat in der Praxis',
        en: 'Zakat in practice',
        tr: 'Uygulamada zekât',
      },
      summary: {
        de: "Nisab, Hawl und 2,5 %: auf welches Vermögen Zakat fällig ist, was davon ausgenommen ist und wer sie nach Koran 9:60 erhalten darf.",
        en: "Nisab, hawl and 2.5%: which wealth zakat is due on, what is exempt and who may receive it according to Quran 9:60.",
        tr: "Nisap, havl ve %2,5: hangi mallara zekât düştüğü, nelerin muaf olduğu ve Tevbe 9:60'a göre kimlerin alabileceği.",
      },
      minutes: 7,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Die Zakat ist die dritte Säule des Islam und wird im Koran oft direkt neben dem Gebet genannt. Sie ist keine freiwillige Spende, sondern ein **Recht der Bedürftigen** am Vermögen der Wohlhabenden — und sie reinigt den Besitz und das Herz des Gebenden.",
            en: "Zakat is the third pillar of Islam and is often mentioned in the Quran right next to prayer. It is not a voluntary donation but a **right of the needy** in the wealth of the well-off — and it purifies the wealth and the heart of the giver.",
            tr: "Zekât İslam'ın üçüncü şartıdır ve Kur'an'da çoğu zaman namazla birlikte anılır. Gönüllü bir bağış değil, zenginlerin malındaki **ihtiyaç sahiplerinin hakkıdır** — ve vereni hem malı hem de kalbi bakımından arındırır.",
          },
        },
        {
          type: 'quran',
          ref: '9:103',
          translation: {
            de: "Nimm von ihrem Besitz ein Almosen, mit dem du sie rein machst und läuterst …",
            en: "Take, [O Muhammad], from their wealth a charity by which you purify them and cause them increase …",
            tr: "Onların mallarından, kendilerini temizleyeceğin ve arındıracağın bir sadaka al …",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die drei Grundbegriffe', en: 'The three basic terms', tr: 'Üç temel kavram' },
        },
        {
          type: 'list',
          items: [
            { de: "**Nisab** — der Mindestbetrag: der Wert von 85 g Gold oder 595 g Silber. Wer darunter liegt, schuldet keine Zakat.", en: "**Nisab** — the threshold: the value of 85 g of gold or 595 g of silver. Whoever is below it owes no zakat.", tr: "**Nisap** — asgari sınır: 85 g altın veya 595 g gümüş değeri. Bunun altında olan zekât vermez." },
            { de: "**Hawl** — ein volles Mondjahr (ca. 354 Tage), das über dem Vermögen oberhalb des Nisab vergangen ist.", en: "**Hawl** — a full lunar year (about 354 days) that has passed over the wealth above the nisab.", tr: "**Havl** — nisabı aşan malın üzerinden tam bir kamerî yılın (yaklaşık 354 gün) geçmesi." },
            { de: "**2,5 %** (ein Vierzigstel) — der Satz für Geld, Ersparnisse, Gold, Silber und Handelswaren.", en: "**2.5%** (one fortieth) — the rate for money, savings, gold, silver and trade goods.", tr: "**%2,5** (kırkta bir) — para, birikim, altın, gümüş ve ticaret malları için oran." },
          ],
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Viele legen ein festes Zakat-Datum im Mondkalender fest, z. B. einen Tag im Ramadan. Wer lieber nach dem Sonnenjahr rechnet, verwendet nach Empfehlung vieler Gelehrter einen leicht höheren Satz (etwa 2,577 %), weil das Sonnenjahr länger ist.",
            en: "Many set a fixed zakat date in the lunar calendar, e.g. a day in Ramadan. Those who prefer to calculate by the solar year use, as many scholars recommend, a slightly higher rate (about 2.577%), because the solar year is longer.",
            tr: "Pek çok kişi hicri takvimde sabit bir zekât günü belirler, ör. Ramazan'da bir gün. Güneş yılına göre hesaplamayı tercih edenler, güneş yılı daha uzun olduğu için birçok âlimin tavsiyesiyle biraz daha yüksek bir oran (yaklaşık %2,577) kullanır.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Auf welches Vermögen?', en: 'On which wealth?', tr: 'Hangi mallara?' },
        },
        {
          type: 'list',
          items: [
            { de: "**Ja:** Bargeld, Bank- und Sparguthaben, Gold und Silber (als Anlage), Handelswaren, ausstehende Forderungen, die sicher zurückkommen; bei Aktien und Fonds gibt es heute verschiedene Berechnungsweisen", en: "**Yes:** cash, bank and savings balances, gold and silver (as investment), trade goods, receivables that are sure to be repaid; for shares and funds there are different calculation methods today", tr: "**Evet:** nakit para, banka ve tasarruf hesapları, (yatırım amaçlı) altın ve gümüş, ticaret malları, tahsili kesin alacaklar; hisse senetleri ve fonlar için bugün farklı hesaplama yöntemleri vardır" },
            { de: "**Nein:** selbst bewohntes Haus, Auto, Kleidung, Möbel, Arbeitsgeräte — also alles für den persönlichen Gebrauch", en: "**No:** the home one lives in, car, clothes, furniture, work tools — i.e. everything for personal use", tr: "**Hayır:** oturulan ev, araba, giysi, mobilya, iş aletleri — yani kişisel kullanıma ait her şey" },
            { de: "**Eigene Regeln** gelten für Ernteerträge (10 % bzw. 5 % bei künstlicher Bewässerung, ohne Hawl) und Nutztiere", en: "**Separate rules** apply to harvests (10%, or 5% with artificial irrigation, without hawl) and livestock", tr: "Toprak ürünleri (yağmurla sulananda %10, emekle sulananda %5, havl şartı olmadan) ve hayvanlar için **ayrı kurallar** geçerlidir" },
          ],
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "**Getragener Schmuck:** Nach hanafitischer Schule ist auf Gold- und Silberschmuck Zakat fällig, auch wenn er getragen wird; nach malikitischer, schafiitischer und hanbalitischer Schule nicht auf üblichen, erlaubten Schmuck, der regelmäßig getragen wird. **Nisab während des Jahres:** Nach hanafitischer Schule zählt, dass der Nisab am Anfang und am Ende des Jahres erreicht ist; nach schafiitischer und hanbalitischer Schule muss er das ganze Jahr über bestehen. **Schulden:** Ob und wie sie abgezogen werden, ist unterschiedlich geregelt (u. a. ziehen Hanafiten und Hanbaliten fällige Schulden grundsätzlich ab, nach schafiitischer Schule verhindern Schulden die Zakat nicht). **Gold- oder Silber-Nisab für Geld:** Hanafitische Gelehrte bevorzugen oft den niedrigeren Silber-Nisab, weil er den Armen mehr nützt; viele heutige Gelehrte verwenden den Gold-Nisab.",
            en: "**Jewellery that is worn:** in the Hanafi school zakat is due on gold and silver jewellery even if worn; in the Maliki, Shafi'i and Hanbali schools it is not due on customary, permissible jewellery that is worn regularly. **Nisab during the year:** in the Hanafi school what counts is that the nisab is reached at the beginning and end of the year; in the Shafi'i and Hanbali schools it must persist throughout the year. **Debts:** whether and how they are deducted is regulated differently (among others, Hanafis and Hanbalis in principle deduct debts that are due, while in the Shafi'i school debts do not prevent zakat). **Gold or silver nisab for money:** Hanafi scholars often prefer the lower silver nisab because it benefits the poor more; many contemporary scholars use the gold nisab.",
            tr: "**Kullanılan ziynet eşyası:** Hanefî mezhebine göre altın ve gümüş takılara, kullanılsa bile zekât düşer; Mâlikî, Şâfiî ve Hanbelî mezheplerine göre düzenli olarak takılan, örfe uygun ve mubah ziynete zekât düşmez. **Yıl içinde nisap:** Hanefî mezhebinde nisabın yılın başında ve sonunda bulunması esastır; Şâfiî ve Hanbelî mezheplerinde yıl boyunca devam etmesi gerekir. **Borçlar:** Düşülüp düşülmeyeceği farklı düzenlenmiştir (Hanefî ve Hanbelîler vadesi gelmiş borçları esasen düşer; Şâfiî mezhebine göre borç zekâta engel değildir). **Para için altın mı gümüş mü nisabı:** Hanefî âlimler fakirlere daha faydalı olduğu için çoğu zaman düşük olan gümüş nisabını tercih eder; günümüz âlimlerinin çoğu altın nisabını kullanır.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Wer darf Zakat erhalten?', en: 'Who may receive zakat?', tr: 'Zekât kimlere verilir?' },
        },
        {
          type: 'quran',
          ref: '9:60',
          translation: {
            de: "Die Almosen sind nur für die Armen, die Bedürftigen, diejenigen, die damit beschäftigt sind, diejenigen, deren Herzen vertraut gemacht werden sollen, (den Loskauf von) Sklaven, die Verschuldeten, auf dem Weg Allahs und (für) den Sohn des Weges (Reisenden), als Verpflichtung von Allah. Allah ist Allwissend und Allweise.",
            en: "Zakah expenditures are only for the poor and for the needy and for those employed to collect [zakah] and for bringing hearts together [for Islam] and for freeing captives [or slaves] and for those in debt and for the cause of Allah and for the [stranded] traveler — an obligation [imposed] by Allah. And Allah is Knowing and Wise.",
            tr: "Sadakalar (zekâtlar), Allah'tan bir farz olarak ancak yoksullara, düşkünlere, zekât toplayan memurlara, kalpleri İslam'a ısındırılacak olanlara, (hürriyetlerini satın almaları için) kölelere, borçlulara, Allah yolunda olanlara ve yolda kalmışlara verilir. Allah hakkıyla bilendir, hüküm ve hikmet sahibidir.",
          },
        },
        {
          type: 'note',
          variant: 'important',
          text: {
            de: "Nicht an eigene Eltern, Großeltern, Kinder und Enkel — für sie sorgt man ohnehin. Ob Ehepartner einander Zakat geben dürfen, ist unterschiedlich geregelt. Wer über eine Organisation gibt, sollte darauf achten, dass sie die Zakat getrennt verwaltet und nur an berechtigte Empfänger weitergibt.",
            en: "Not to one's own parents, grandparents, children and grandchildren — one supports them anyway. Whether spouses may give zakat to each other is regulated differently. Whoever gives through an organisation should make sure it manages zakat separately and passes it on only to eligible recipients.",
            tr: "Kişi kendi anne-babasına, dedesine-ninesine, çocuklarına ve torunlarına zekât veremez — onların bakımı zaten ona aittir. Eşlerin birbirine zekât verip veremeyeceği farklı değerlendirilir. Bir kuruluş aracılığıyla veren kişi, kuruluşun zekâtı ayrı yönettiğinden ve yalnızca hak sahiplerine ulaştırdığından emin olmalıdır.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1395, Sahih Muslim 19',
          narrator: "'Abdullah ibn 'Abbas",
          grade: 'sahih',
          text: {
            de: "Als der Prophet ﷺ Mu'adh in den Jemen sandte, sagte er u. a.: „… Allah hat ihnen eine Abgabe auf ihr Vermögen auferlegt, die von ihren Reichen genommen und ihren Armen gegeben wird.“",
            en: "When the Prophet ﷺ sent Mu'adh to Yemen, he said among other things: “… Allah has made obligatory upon them a charity on their wealth, to be taken from their rich and given to their poor.”",
            tr: "Peygamber ﷺ Muâz'ı Yemen'e gönderirken şöyle buyurdu: “… Allah onlara mallarında, zenginlerinden alınıp fakirlerine verilecek bir sadakayı (zekâtı) farz kılmıştır.”",
          },
        },
        {
          type: 'heading',
          text: { de: 'Zakat al-Fitr', en: 'Zakat al-Fitr', tr: 'Fitre' },
        },
        {
          type: 'text',
          text: {
            de: "Unabhängig von der Vermögens-Zakat gibt jeder Muslim, der mehr als den Bedarf für den Festtag besitzt, am Ende des Ramadan die **Zakat al-Fitr** — für sich und die Angehörigen, für die er sorgt: ursprünglich ein Sa' (ein Hohlmaß) Grundnahrungsmittel pro Person, zu geben vor dem Festgebet (Sahih al-Bukhari 1503, Sahih Muslim 984). Ob sie auch als Geldbetrag gegeben werden darf, sehen die Schulen unterschiedlich: Die hanafitische Schule erlaubt es, die Mehrheit bevorzugt Nahrungsmittel; viele Gemeinden in Europa geben einen Geldbetrag an.",
            en: "Independently of zakat on wealth, every Muslim who owns more than what is needed for the day of Eid gives **Zakat al-Fitr** at the end of Ramadan — for themselves and the dependants they support: originally one sa' (a measure of volume) of staple food per person, to be given before the Eid prayer (Sahih al-Bukhari 1503, Sahih Muslim 984). Whether it may also be given as money is viewed differently: the Hanafi school permits it, the majority prefer food; many communities in Europe state a monetary amount.",
            tr: "Mal zekâtından bağımsız olarak, bayram günü ihtiyacından fazlasına sahip olan her Müslüman Ramazan'ın sonunda kendisi ve bakmakla yükümlü olduğu kişiler için **fitre** verir: Aslı, kişi başı bir sâ (bir hacim ölçüsü) temel gıdadır ve bayram namazından önce verilir (Buhârî 1503, Müslim 984). Para olarak verilip verilemeyeceği konusunda mezhepler farklıdır: Hanefî mezhebi buna izin verir, çoğunluk gıdayı tercih eder; Avrupa'daki birçok cemaat bir para miktarı bildirir.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 2588',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ sagte: „Die Sadaqa vermindert das Vermögen nicht …“",
            en: "The Prophet ﷺ said: “Charity does not decrease wealth …”",
            tr: "Peygamber ﷺ şöyle buyurdu: “Sadaka malı eksiltmez …”",
          },
        },
        { type: 'link', to: '/zakat', label: { de: 'Zakat-Rechner', en: 'Zakat calculator', tr: 'Zekât hesaplayıcı' } },
        { type: 'terms', ids: ['zakat', 'nisab', 'hawl', 'zakat-al-fitr', 'sadaqa'] },
      ],
      quiz: [
        {
          question: {
            de: "Welcher Zakat-Satz gilt für Ersparnisse?",
            en: "What zakat rate applies to savings?",
            tr: "Birikimler için zekât oranı nedir?",
          },
          options: [
            { de: "10 %", en: "10%", tr: "%10" },
            { de: "2,5 %", en: "2.5%", tr: "%2,5" },
            { de: "5 %", en: "5%", tr: "%5" },
          ],
          answer: 1,
          explanation: {
            de: "Für Geld, Gold, Silber und Handelswaren beträgt die Zakat ein Vierzigstel, also 2,5 %. 10 % bzw. 5 % gelten für Ernteerträge.",
            en: "For money, gold, silver and trade goods zakat is one fortieth, i.e. 2.5%. 10% or 5% apply to harvests.",
            tr: "Para, altın, gümüş ve ticaret mallarında zekât kırkta bir, yani %2,5'tir. %10 veya %5 toprak ürünleri içindir.",
          },
        },
        {
          question: {
            de: "Ist auf das selbst bewohnte Haus und das private Auto Zakat fällig?",
            en: "Is zakat due on the home one lives in and one's private car?",
            tr: "Oturulan eve ve özel arabaya zekât düşer mi?",
          },
          options: [
            { de: "Ja, 2,5 % des Wertes", en: "Yes, 2.5% of the value", tr: "Evet, değerinin %2,5'i" },
            { de: "Nein, Dinge für den persönlichen Gebrauch sind ausgenommen", en: "No, items for personal use are exempt", tr: "Hayır, kişisel kullanım eşyaları muaftır" },
            { de: "Nur auf das Auto", en: "Only on the car", tr: "Yalnızca arabaya" },
          ],
          answer: 1,
          explanation: {
            de: "Zakat betrifft wachsendes bzw. angespartes Vermögen, nicht Dinge des persönlichen Bedarfs.",
            en: "Zakat concerns growing or saved wealth, not items of personal need.",
            tr: "Zekât, artan veya biriktirilen mallarla ilgilidir; kişisel ihtiyaç eşyalarıyla değil.",
          },
        },
        {
          question: {
            de: "Wo nennt der Koran die acht Empfängergruppen der Zakat?",
            en: "Where does the Quran name the eight recipient groups of zakat?",
            tr: "Kur'an zekâtın sekiz sınıf alıcısını nerede sayar?",
          },
          options: [
            { de: "Sure 9, Vers 60", en: "Surah 9, verse 60", tr: "Tevbe suresi 60. ayet" },
            { de: "Sure 1, Vers 1", en: "Surah 1, verse 1", tr: "Fâtiha suresi 1. ayet" },
            { de: "Sure 112", en: "Surah 112", tr: "İhlâs suresi" },
          ],
          answer: 0,
          explanation: {
            de: "Koran 9:60 nennt u. a. Arme, Bedürftige, Verschuldete und gestrandete Reisende.",
            en: "Quran 9:60 names, among others, the poor, the needy, debtors and stranded travellers.",
            tr: "Tevbe 9:60 fakirleri, yoksulları, borçluları ve yolda kalmışları sayar.",
          },
        },
      ],
      sources: [
        'Quran 9:60, 9:103',
        "Sahih al-Bukhari 1395, Sahih Muslim 19 (Mu'adh im Jemen)",
        'Sahih al-Bukhari 1503, Sahih Muslim 984 (Zakat al-Fitr)',
        'Sahih Muslim 2588',
        FIQH_REF,
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 12 ──────────────────────────────────────────────────────────
    {
      id: 'halal-in-daily-life',
      title: {
        de: 'Halal im Alltag: Essen, Arbeit, Geld',
        en: 'Halal in daily life: food, work, money',
        tr: 'Günlük hayatta helal: yemek, iş, para',
      },
      summary: {
        de: "Halal verdienen und ausgeben: Grundregeln für Essen und Arbeit, was Riba (Zins) ist, Ehrlichkeit im Handel — und wann man besser einen Gelehrten fragt.",
        en: "Earning and spending halal: basic rules for food and work, what riba (interest) is, honesty in trade — and when it is better to ask a scholar.",
        tr: "Helal kazanmak ve harcamak: yemek ve iş için temel kurallar, ribanın (faizin) ne olduğu, ticarette dürüstlük — ve ne zaman bir âlime danışmak gerektiği.",
      },
      minutes: 7,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Fiqh endet nicht an der Moscheetür. Wie man sein Geld verdient, was man isst und wie man mit anderen handelt, gehört ebenso zum Gottesdienst im weiten Sinn. Der Islam betont dabei: Halal ist das Normale und Weite, Haram ist die Ausnahme.",
            en: "Fiqh does not end at the mosque door. How one earns money, what one eats and how one deals with others are just as much part of worship in the broad sense. Islam stresses: halal is the normal and wide space, haram is the exception.",
            tr: "Fıkıh caminin kapısında bitmez. Nasıl para kazandığın, ne yediğin ve başkalarıyla nasıl alışveriş yaptığın da geniş anlamda ibadetin bir parçasıdır. İslam şunu vurgular: Helal olan geniş ve olağan alandır, haram istisnadır.",
          },
        },
        {
          type: 'quran',
          ref: '2:168',
          translation: {
            de: "O ihr Menschen, esst von dem, was es auf der Erde gibt, als Erlaubtes und Gutes, und folgt nicht den Fußstapfen des Satans …",
            en: "O mankind, eat from whatever is on earth [that is] lawful and good and do not follow the footsteps of Satan …",
            tr: "Ey insanlar! Yeryüzündeki şeylerden helal ve temiz olarak yiyin. Şeytanın adımlarına uymayın …",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 1015',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ sagte: „Allah ist gut und nimmt nur Gutes an …“ Dann erwähnte er einen Mann, der nach langer Reise zerzaust die Hände zum Himmel hebt und bittet — während sein Essen, Trinken und seine Kleidung aus Verbotenem stammen: „Wie sollte ihm da geantwortet werden?“",
            en: "The Prophet ﷺ said: “Allah is good and accepts only what is good …” Then he mentioned a man who, after a long journey and dishevelled, raises his hands to the sky in supplication — while his food, drink and clothing come from what is forbidden: “How then could he be answered?”",
            tr: "Peygamber ﷺ şöyle buyurdu: “Allah temizdir, yalnızca temiz olanı kabul eder …” Sonra uzun bir yolculuk yapmış, saçı başı dağınık hâlde ellerini göğe kaldırıp dua eden, ama yiyeceği, içeceği ve giyeceği haramdan olan bir adamı anlattı: “Böylesinin duası nasıl kabul edilsin?”",
          },
        },
        {
          type: 'heading',
          text: { de: 'Essen', en: 'Food', tr: 'Yemek' },
        },
        {
          type: 'text',
          text: {
            de: "Verboten sind vor allem Schweinefleisch, Blut, Verendetes, Fleisch, das nicht im Namen Allahs geschlachtet wurde, und Rauschmittel (Koran 5:3, 5:90). Alles andere Pflanzliche ist grundsätzlich erlaubt. Die Grundlagen dazu — und die unterschiedlichen Ansichten zu Supermarktfleisch, Meerestieren oder Gelatine — findest du im Pfad „Neu im Islam“.",
            en: "Forbidden are above all pork, blood, carrion, meat not slaughtered in the name of Allah, and intoxicants (Quran 5:3, 5:90). Everything else of plant origin is permissible in principle. The basics — and the differing views on supermarket meat, seafood or gelatine — are in the path “New to Islam”.",
            tr: "Başlıca haram olanlar: domuz eti, kan, leş, Allah'ın adı anılmadan kesilen hayvanın eti ve sarhoş edici maddeler (Kur'an 5:3, 5:90). Bitkisel olan diğer her şey esasen helaldir. Temel bilgileri — ve market eti, deniz ürünleri veya jelatin hakkındaki farklı görüşleri — “İslam'a Yeni Başlayanlar” yolunda bulabilirsin.",
          },
        },
        { type: 'link', to: '/learn/new-muslim/halal-food', label: { de: 'Lektion: Halal essen', en: 'Lesson: eating halal', tr: 'Ders: helal beslenme' } },
        {
          type: 'heading',
          text: { de: 'Arbeit und Verdienst', en: 'Work and earnings', tr: 'Çalışma ve kazanç' },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 2072',
          narrator: "al-Miqdam ibn Ma'dikarib",
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ sagte: „Niemand hat je eine bessere Speise gegessen als die, die er durch die Arbeit seiner eigenen Hände verdient hat …“",
            en: "The Prophet ﷺ said: “No one has ever eaten better food than what he has earned by the work of his own hands …”",
            tr: "Peygamber ﷺ şöyle buyurdu: “Hiç kimse elinin emeğiyle kazandığından daha hayırlı bir yemek yememiştir …”",
          },
        },
        {
          type: 'list',
          items: [
            { de: "Ehrliche Arbeit ist Ibada — auch einfache Tätigkeiten haben Würde.", en: "Honest work is worship — even simple jobs have dignity.", tr: "Dürüst çalışma ibadettir — basit işlerin de onuru vardır." },
            { de: "Eine Tätigkeit, deren Kern etwas Verbotenes ist (z. B. Alkohol ausschenken, Betrug, Glücksspiel betreiben), ist zu meiden.", en: "A job whose core is something forbidden (e.g. serving alcohol, fraud, running gambling) is to be avoided.", tr: "Özü haram olan bir işten (ör. içki servisi, dolandırıcılık, kumar işletmek) kaçınılmalıdır." },
            { de: "Bei Grenzfällen — etwa ein Supermarkt, der auch Alkohol verkauft, oder eine IT-Stelle in einer Bank — unterscheiden sich die Gelehrten; frag nach deiner konkreten Situation.", en: "In borderline cases — e.g. a supermarket that also sells alcohol, or an IT job in a bank — scholars differ; ask about your specific situation.", tr: "Sınır durumlarda — ör. içki de satan bir markette veya bir bankada bilişim alanında çalışmak — âlimlerin görüşleri farklıdır; kendi somut durumunu sor." },
            { de: "Arbeitszeit, Material und Vertrauen des Arbeitgebers sind eine Amana (anvertrautes Gut).", en: "Working hours, materials and the employer's trust are an amanah (a trust).", tr: "Mesai, malzeme ve işverenin güveni bir emanettir." },
          ],
        },
        {
          type: 'heading',
          text: { de: 'Riba: Zins und Wucher', en: 'Riba: interest and usury', tr: 'Riba: faiz' },
        },
        {
          type: 'quran',
          ref: '2:275',
          arabic: 'وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا',
          translation: {
            de: "… Allah hat den Handel erlaubt und die Zinsnahme verboten …",
            en: "… But Allah has permitted trade and has forbidden interest …",
            tr: "… Hâlbuki Allah alışverişi helal, faizi haram kılmıştır …",
          },
        },
        {
          type: 'text',
          text: {
            de: "**Riba** heißt „Zuwachs“. Gemeint ist vor allem ein vorab vereinbarter Aufschlag auf ein Darlehen: Wer 1.000 € leiht und 1.100 € zurückverlangt, nimmt Riba. Das Verbot ist im Koran eindeutig und nach dem Konsens der Gelehrten gilt es für Geber und Nehmer. Der Prophet ﷺ verfluchte den, der Riba nimmt, den, der sie gibt, den, der sie aufschreibt, und die beiden Zeugen (Sahih Muslim 1598). Daneben gibt es Regeln für den Tausch bestimmter Güter wie Gold, Silber und Grundnahrungsmittel (Sahih Muslim 1587).",
            en: "**Riba** means “increase”. It refers above all to a pre-agreed surcharge on a loan: whoever lends €1,000 and demands €1,100 back takes riba. The prohibition is clear in the Quran and, by scholarly consensus, applies to giver and taker. The Prophet ﷺ cursed the one who takes riba, the one who pays it, the one who records it and its two witnesses (Sahih Muslim 1598). There are also rules for exchanging certain goods such as gold, silver and staple foods (Sahih Muslim 1587).",
            tr: "**Riba** “artış” demektir. Özellikle bir borca önceden şart koşulan fazlalık kastedilir: 1.000 € borç verip 1.100 € geri isteyen kişi riba almış olur. Yasak Kur'an'da açıktır ve âlimlerin icmasıyla hem alan hem veren için geçerlidir. Peygamber ﷺ faizi yiyene, yedirene, onu yazana ve iki şahidine lanet etmiştir (Müslim 1598). Bunun yanında altın, gümüş ve temel gıdalar gibi bazı malların değişimine dair kurallar da vardır (Müslim 1587).",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Dass Zins auf Darlehen verboten ist, ist unstrittig. Wie **moderne Finanzprodukte** einzuordnen sind — Immobilienfinanzierung, Versicherungen, Girokonten, Aktien, Fonds oder Kryptowährungen —, beurteilen Gelehrte und Fiqh-Räte dagegen teils sehr unterschiedlich, oft abhängig von Land, Notlage und Ausgestaltung des Produkts. Diese Lektion gibt dazu bewusst keine Fatwa: Bitte frag einen qualifizierten Gelehrten, der sich mit Finanzfragen und deiner Lebenssituation auskennt.",
            en: "That interest on loans is forbidden is undisputed. How **modern financial products** should be classified — home financing, insurance, current accounts, shares, funds or cryptocurrencies — is, however, assessed very differently by scholars and fiqh councils, often depending on country, need and the structure of the product. This lesson deliberately gives no fatwa on these: please ask a qualified scholar who knows financial matters and your situation.",
            tr: "Borç üzerindeki faizin haram olduğu tartışmasızdır. Ancak **modern finans ürünlerinin** — konut finansmanı, sigorta, vadesiz hesaplar, hisse senetleri, fonlar veya kripto paralar — nasıl değerlendirileceği konusunda âlimler ve fıkıh kurulları, çoğu zaman ülkeye, zaruret durumuna ve ürünün yapısına göre oldukça farklı görüşlere sahiptir. Bu ders bilinçli olarak bu konularda fetva vermez: Lütfen finans konularını ve senin durumunu bilen ehil bir âlime danış.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Ehrlichkeit im Handel', en: 'Honesty in trade', tr: 'Ticarette dürüstlük' },
        },
        {
          type: 'quran',
          ref: '83:1-3',
          translation: {
            de: "Wehe den das Maß Verkürzenden, die, wenn sie sich von den Menschen zumessen lassen, volles Maß verlangen, wenn sie ihnen jedoch zumessen oder auswiegen, weniger geben.",
            en: "Woe to those who give less [than due], who, when they take a measure from people, take in full. But if they give by measure or by weight to them, they cause loss.",
            tr: "Eksik ölçüp tartanların vay haline! Onlar insanlardan ölçerek aldıkları zaman tam alırlar. Kendileri onlara ölçüp tartarak verdiklerinde ise eksik verirler.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 2079, Sahih Muslim 1532',
          narrator: 'Hakim ibn Hizam',
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ sagte: „Die beiden Handelspartner haben die Wahl, solange sie sich nicht getrennt haben. Wenn sie ehrlich sind und (Mängel) offenlegen, wird ihr Handel gesegnet; wenn sie verschweigen und lügen, wird der Segen ihres Handels ausgelöscht.“",
            en: "The Prophet ﷺ said: “The buyer and the seller have the option (to cancel) as long as they have not separated. If they are truthful and make (defects) clear, their transaction is blessed; if they conceal and lie, the blessing of their transaction is wiped out.”",
            tr: "Peygamber ﷺ şöyle buyurdu: “Alıcı ile satıcı birbirinden ayrılmadıkça muhayyerdir. Eğer doğru söyler ve (kusurları) açıklarlarsa alışverişleri bereketli olur; gizler ve yalan söylerlerse alışverişlerinin bereketi silinir.”",
          },
        },
        {
          type: 'list',
          items: [
            { de: "Mängel offenlegen — „Wer uns betrügt, gehört nicht zu uns“ (Sahih Muslim 102)", en: "Disclose defects — “Whoever cheats us is not one of us” (Sahih Muslim 102)", tr: "Kusurları açıklamak — “Bizi aldatan bizden değildir” (Müslim 102)" },
            { de: "Handel nur in gegenseitigem Einvernehmen, ohne Druck oder Täuschung (Koran 4:29)", en: "Trade only by mutual consent, without pressure or deception (Quran 4:29)", tr: "Alışveriş ancak karşılıklı rızayla, baskı ve aldatma olmadan (Kur'an 4:29)" },
            { de: "Verträge und Schulden aufschreiben, Fristen einhalten, Löhne pünktlich zahlen", en: "Write down contracts and debts, keep deadlines, pay wages on time", tr: "Sözleşmeleri ve borçları yazmak, vadelere uymak, ücretleri zamanında ödemek" },
          ],
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 52, Sahih Muslim 1599',
          narrator: "an-Nu'man ibn Bashir",
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ sagte: „Das Erlaubte ist klar, und das Verbotene ist klar, und dazwischen gibt es zweifelhafte Dinge, die viele Menschen nicht kennen. Wer sich vor dem Zweifelhaften hütet, der hat seine Religion und seine Ehre geschützt …“",
            en: "The Prophet ﷺ said: “The lawful is clear and the unlawful is clear, and between them are doubtful matters that many people do not know. Whoever guards against doubtful matters has protected his religion and his honour …”",
            tr: "Peygamber ﷺ şöyle buyurdu: “Helal bellidir, haram da bellidir. İkisinin arasında insanların çoğunun bilmediği şüpheli şeyler vardır. Kim şüpheli şeylerden sakınırsa dinini ve ırzını korumuş olur …”",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Zum Abschluss dieses Pfades: Fiqh will dir das Leben nicht schwer machen, sondern Klarheit geben. Lerne die Grundlagen gut, bleib in einer Lehrmeinung konsequent, respektiere andere — und frag bei persönlichen Fragen jemanden, der Wissen und dein Vertrauen hat.",
            en: "To close this path: fiqh does not want to make your life hard but to give you clarity. Learn the basics well, stay consistent within one school, respect others — and with personal questions, ask someone who has knowledge and your trust.",
            tr: "Bu yolun sonunda: Fıkıh hayatını zorlaştırmak değil, sana açıklık kazandırmak ister. Temelleri iyi öğren, bir mezhepte tutarlı ol, başkalarına saygı göster — ve kişisel sorularında ilim sahibi ve güvendiğin birine danış.",
          },
        },
        { type: 'link', to: '/hadith', label: { de: 'Weitere Hadithe lesen', en: 'Read more hadith', tr: 'Daha fazla hadis oku' } },
        { type: 'terms', ids: ['halal', 'haram', 'riba', 'zakat', 'sadaqa', 'taqwa', 'fatwa'] },
      ],
      quiz: [
        {
          question: {
            de: "Was ist Riba im Kern?",
            en: "What is riba at its core?",
            tr: "Riba özünde nedir?",
          },
          options: [
            { de: "Jeder Gewinn im Handel", en: "Any profit in trade", tr: "Ticaretteki her türlü kâr" },
            { de: "Ein vorab vereinbarter Aufschlag auf ein Darlehen", en: "A pre-agreed surcharge on a loan", tr: "Bir borca önceden şart koşulan fazlalık" },
            { de: "Eine freiwillige Spende", en: "A voluntary donation", tr: "Gönüllü bir bağış" },
          ],
          answer: 1,
          explanation: {
            de: "Gewinn durch Handel ist erlaubt (2:275). Riba ist der festgelegte Zuwachs auf geliehenes Geld.",
            en: "Profit through trade is permitted (2:275). Riba is the fixed increase on lent money.",
            tr: "Ticaretle kâr helaldir (2:275). Riba, ödünç verilen paraya şart koşulan artıştır.",
          },
        },
        {
          question: {
            de: "Was sagt der Hadith über einen Verkäufer, der Mängel verschweigt?",
            en: "What does the hadith say about a seller who conceals defects?",
            tr: "Hadis kusurları gizleyen satıcı hakkında ne der?",
          },
          options: [
            { de: "Der Segen seines Handels wird ausgelöscht", en: "The blessing of his transaction is wiped out", tr: "Alışverişinin bereketi silinir" },
            { de: "Das ist geschickter Handel", en: "That is clever business", tr: "Bu akıllıca bir ticarettir" },
            { de: "Es spielt keine Rolle", en: "It does not matter", tr: "Hiçbir önemi yoktur" },
          ],
          answer: 0,
          explanation: {
            de: "Ehrlichkeit und Offenlegung bringen Segen; Verschweigen und Lügen löschen ihn aus (Sahih al-Bukhari 2079, Sahih Muslim 1532).",
            en: "Honesty and disclosure bring blessing; concealment and lying wipe it out (Sahih al-Bukhari 2079, Sahih Muslim 1532).",
            tr: "Dürüstlük ve açıklık bereket getirir; gizlemek ve yalan söylemek onu siler (Buhârî 2079, Müslim 1532).",
          },
        },
        {
          question: {
            de: "Du bist unsicher, ob ein bestimmtes Finanzprodukt halal ist. Was ist der beste nächste Schritt?",
            en: "You are unsure whether a particular financial product is halal. What is the best next step?",
            tr: "Belirli bir finans ürününün helal olup olmadığından emin değilsin. En iyi adım nedir?",
          },
          options: [
            { de: "Einfach abschließen — im Zweifel ist alles erlaubt", en: "Just sign up — when in doubt everything is permitted", tr: "Hemen imzalamak — şüphede her şey serbesttir" },
            { de: "Einen qualifizierten Gelehrten mit Kenntnis in Finanzfragen fragen und sich bis dahin vor dem Zweifelhaften hüten", en: "Ask a qualified scholar familiar with financial matters and guard against the doubtful until then", tr: "Finans konularını bilen ehil bir âlime danışmak ve o zamana kadar şüpheliden sakınmak" },
            { de: "Im Internet die erstbeste Meinung übernehmen", en: "Adopt the first opinion found online", tr: "İnternette bulunan ilk görüşü benimsemek" },
          ],
          answer: 1,
          explanation: {
            de: "Bei modernen Finanzfragen gehen die Meinungen auseinander. Der Hadith über das Zweifelhafte (Sahih al-Bukhari 52) rät zur Vorsicht, Koran 16:43 zum Fragen.",
            en: "Opinions diverge on modern financial questions. The hadith on doubtful matters (Sahih al-Bukhari 52) advises caution, Quran 16:43 advises asking.",
            tr: "Modern finans konularında görüşler ayrışır. Şüpheli şeylerle ilgili hadis (Buhârî 52) ihtiyatı, Nahl 16:43 ise sormayı tavsiye eder.",
          },
        },
      ],
      sources: [
        'Quran 2:168, 2:275, 4:29, 5:3, 5:90, 83:1-3, 16:43',
        'Sahih Muslim 1015',
        'Sahih al-Bukhari 2072',
        'Sahih Muslim 1598 (Fluch über Riba), Sahih Muslim 1587 (Tausch von Gold, Silber, Grundnahrungsmitteln)',
        'Sahih al-Bukhari 2079, Sahih Muslim 1532',
        'Sahih Muslim 102',
        'Sahih al-Bukhari 52, Sahih Muslim 1599',
        QURAN_REF,
      ],
      review: 'draft',
    },
  ],
}
