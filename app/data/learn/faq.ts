/**
 * Frequently asked questions — practical answers for new Muslims, curious
 * non-Muslims and practising Muslims. Mainstream Sunni scholarship; where
 * the schools differ, `scholarlyDifference` is set and the answer says so.
 *
 * Quran translations follow Bubenheim/Elyas (de), Sahih International (en)
 * and Diyanet İşleri Başkanlığı Meali (tr).
 */
import type { FaqEntry } from './types'

export const FAQ: FaqEntry[] = [
  // ───────────────────────────────────────────────────────── belief
  {
    id: 'six-articles-of-faith',
    category: 'belief',
    question: {
      de: 'Woran glauben Muslime?',
      en: 'What do Muslims believe in?',
      tr: 'Müslümanlar neye inanır?',
    },
    answer: {
      de: 'Muslime glauben an sechs Grundpfeiler: an Allah, den Einen; an Seine Engel; an Seine offenbarten Schriften (u. a. Thora, Psalmen, Evangelium und Koran); an Seine Gesandten von Adam bis Muhammad ﷺ; an den Jüngsten Tag und an die göttliche Bestimmung (Qadar). Diese Glaubensartikel nannte der Prophet ﷺ im bekannten Hadith Dschibril.',
      en: 'Muslims believe in six pillars of faith: in Allah, the One; in His angels; in His revealed scriptures (including the Torah, Psalms, Gospel and the Quran); in His messengers from Adam to Muhammad ﷺ; in the Last Day; and in divine decree (qadar). The Prophet ﷺ named these articles of faith in the well-known Hadith of Jibril.',
      tr: "Müslümanlar altı iman esasına inanır: Bir olan Allah'a, meleklerine, indirdiği kitaplara (Tevrat, Zebur, İncil ve Kur'an dahil), Hz. Âdem'den Hz. Muhammed'e ﷺ kadar peygamberlerine, ahiret gününe ve kadere. Peygamber ﷺ bu iman esaslarını meşhur Cibrîl hadisinde saymıştır.",
    },
    sources: ['Sahih Muslim 8 (Hadith Jibril)', 'Quran 2:285, 4:136'],
    review: 'draft',
  },
  {
    id: 'is-allah-the-same-god',
    category: 'belief',
    question: {
      de: 'Ist Allah ein anderer Gott als der Gott der Juden und Christen?',
      en: 'Is Allah a different God from the God of Jews and Christians?',
      tr: 'Allah, Yahudilerin ve Hristiyanların Tanrısından farklı bir tanrı mı?',
    },
    answer: {
      de: '„Allah" ist schlicht das arabische Wort für Gott – auch arabischsprachige Christen und Juden verwenden es. Muslime glauben an den Gott Abrahams, Moses und Jesu und verstehen den Islam als Fortsetzung derselben Botschaft. Unterschiede gibt es im Gottesverständnis: Der Islam betont die strikte Einheit Gottes (Tauhid) und lehnt etwa die Dreifaltigkeit ab (Koran 112). Der Koran sagt: „Unser Gott und euer Gott ist einer" (29:46).',
      en: '"Allah" is simply the Arabic word for God – Arabic-speaking Christians and Jews use it too. Muslims believe in the God of Abraham, Moses and Jesus and understand Islam as the continuation of the same message. There are differences in how God is understood: Islam stresses God\'s strict oneness (tawhid) and rejects, for example, the Trinity (Quran 112). The Quran says: "Our God and your God is one" (29:46).',
      tr: '"Allah", Tanrı için kullanılan Arapça kelimedir – Arapça konuşan Hristiyanlar ve Yahudiler de onu kullanır. Müslümanlar Hz. İbrahim\'in, Hz. Musa\'nın ve Hz. İsa\'nın Rabbine inanır ve İslam\'ı aynı mesajın devamı olarak görür. Tanrı anlayışında farklar vardır: İslam Allah\'ın mutlak birliğini (tevhid) vurgular ve örneğin teslisi reddeder (Kur\'an 112). Kur\'an şöyle der: "Bizim ilahımız da sizin ilahınız da birdir" (29:46).',
    },
    sources: ['Quran 29:46', 'Quran 112:1-4'],
    review: 'draft',
  },
  {
    id: 'jesus-in-islam',
    category: 'belief',
    question: {
      de: 'Glauben Muslime an Jesus?',
      en: 'Do Muslims believe in Jesus?',
      tr: "Müslümanlar Hz. İsa'ya inanır mı?",
    },
    answer: {
      de: 'Ja. Jesus (arab. Isa) ist im Islam einer der größten Propheten. Muslime glauben an seine wundersame Geburt durch die Jungfrau Maria (Maryam), an seine Wunder mit Allahs Erlaubnis und dass er der Messias ist. Nach islamischem Verständnis ist er jedoch ein Diener und Gesandter Allahs und nicht Gott oder Gottes Sohn (Koran 19:30, 5:75). Maria ist die einzige Frau, nach der eine Sure benannt ist.',
      en: 'Yes. Jesus (Arabic: Isa) is one of the greatest prophets in Islam. Muslims believe in his miraculous birth to the Virgin Mary (Maryam), in his miracles by Allah\'s permission, and that he is the Messiah. In the Islamic understanding, however, he is a servant and messenger of Allah, not God or the son of God (Quran 19:30, 5:75). Mary is the only woman after whom a surah is named.',
      tr: "Evet. Hz. İsa İslam'da en büyük peygamberlerden biridir. Müslümanlar onun Hz. Meryem'den mucizevi doğumuna, Allah'ın izniyle gösterdiği mucizelere ve onun Mesih olduğuna inanır. Ancak İslam anlayışına göre o, Allah'ın kulu ve elçisidir; Tanrı veya Tanrı'nın oğlu değildir (Kur'an 19:30, 5:75). Hz. Meryem, adına bir sure verilmiş tek kadındır.",
    },
    sources: ['Quran 3:45, 19:30, 5:75', 'Sure 19 (Maryam)'],
    review: 'draft',
  },
  {
    id: 'sunni-shia',
    category: 'belief',
    question: {
      de: 'Was ist der Unterschied zwischen Sunniten und Schiiten?',
      en: 'What is the difference between Sunnis and Shias?',
      tr: 'Sünniler ile Şiiler arasındaki fark nedir?',
    },
    answer: {
      de: 'Die Trennung geht auf die Frage zurück, wer die Gemeinschaft nach dem Tod des Propheten ﷺ führen sollte. Sunniten – die große Mehrheit der Muslime weltweit – erkennen die ersten vier Kalifen Abu Bakr, Umar, Uthman und Ali als rechtgeleitet an; Schiiten sind der Ansicht, dass die Führung Ali ibn Abi Talib und seinen Nachkommen (den Imamen) zustand. Beide glauben an Allah, den Koran und den Propheten ﷺ und beten, fasten und pilgern; Unterschiede gibt es u. a. beim Verständnis der Führung, bei Hadith-Sammlungen und einigen rituellen Details. Diese App folgt der sunnitischen Hauptströmung und begegnet allen Muslimen mit Respekt.',
      en: 'The split goes back to the question of who should lead the community after the Prophet\'s ﷺ death. Sunnis – the large majority of Muslims worldwide – recognise the first four caliphs Abu Bakr, Umar, Uthman and Ali as rightly guided; Shias hold that leadership belonged to Ali ibn Abi Talib and his descendants (the Imams). Both believe in Allah, the Quran and the Prophet ﷺ, and pray, fast and make pilgrimage; differences include the understanding of leadership, hadith collections and some ritual details. This app follows mainstream Sunni scholarship and treats all Muslims with respect.',
      tr: "Ayrılık, Peygamber'in ﷺ vefatından sonra topluluğa kimin liderlik edeceği sorusuna dayanır. Dünyadaki Müslümanların büyük çoğunluğunu oluşturan Sünniler ilk dört halife Hz. Ebû Bekir, Hz. Ömer, Hz. Osman ve Hz. Ali'yi raşid halifeler olarak kabul eder; Şiiler ise liderliğin Hz. Ali'ye ve onun soyundan gelen imamlara ait olduğunu savunur. Her ikisi de Allah'a, Kur'an'a ve Peygamber'e ﷺ inanır; namaz kılar, oruç tutar ve hacca gider. Farklılıklar arasında liderlik (imamet) anlayışı, hadis kaynakları ve bazı ibadet detayları vardır. Bu uygulama Sünni ana akımı takip eder ve tüm Müslümanlara saygıyla yaklaşır.",
    },
    sources: ['Quran 3:103', 'Quran 49:10'],
    review: 'draft',
  },

  // ───────────────────────────────────────────────────────── prayer
  {
    id: 'arabic-for-prayer',
    category: 'prayer',
    question: {
      de: 'Muss ich Arabisch können, um zu beten?',
      en: 'Do I have to know Arabic to pray?',
      tr: 'Namaz kılmak için Arapça bilmem gerekir mi?',
    },
    answer: {
      de: 'Du musst kein Arabisch sprechen. Die festen Rezitationen im Gebet – vor allem Al-Fatiha – werden nach den vier Rechtsschulen auf Arabisch gesprochen, aber dafür reichen wenige kurze Texte, die du nach und nach lernst. Solange du sie noch nicht kannst, tust du, was dir möglich ist; viele Gelehrte empfehlen, in der Zwischenzeit einfache Lobpreisungen wie „Subhanallah, alhamdulillah, la ilaha illallah, Allahu akbar" zu sagen. Persönliche Bittgebete (Dua) außerhalb des Gebets kannst du in jeder Sprache sprechen; ob das auch innerhalb des Gebets geht, wird unterschiedlich gesehen.',
      en: 'You do not need to speak Arabic. According to the four schools, the fixed recitations in prayer – above all Al-Fatiha – are said in Arabic, but only a few short texts are needed, which you learn gradually. Until you know them, you do what you can; many scholars advise saying simple phrases of praise such as "Subhanallah, alhamdulillah, la ilaha illallah, Allahu akbar" in the meantime. Personal supplications (dua) outside prayer can be made in any language; whether this is also possible within prayer is viewed differently.',
      tr: 'Arapça konuşman gerekmez. Dört mezhebe göre namazdaki sabit okumalar – özellikle Fâtiha – Arapça okunur, ancak bunun için zamanla öğreneceğin birkaç kısa metin yeterlidir. Onları öğrenene kadar gücün yettiğini yaparsın; birçok âlim bu arada "Sübhânallah, elhamdülillah, lâ ilâhe illallah, Allahu ekber" gibi basit zikirlerin söylenmesini tavsiye eder. Namaz dışında kişisel dualarını her dilde yapabilirsin; namaz içinde bunun mümkün olup olmadığı farklı değerlendirilir.',
    },
    sources: ['Sahih al-Bukhari 756, Sahih Muslim 394', 'Sunan Abi Dawud 832', 'Quran 2:286'],
    scholarlyDifference: true,
    review: 'draft',
  },
  {
    id: 'missed-prayer',
    category: 'prayer',
    question: {
      de: 'Was, wenn ich ein Gebet verpasse?',
      en: 'What if I miss a prayer?',
      tr: 'Bir namazı kaçırırsam ne olur?',
    },
    answer: {
      de: 'Wer ein Gebet verschlafen oder vergessen hat, betet es, sobald er sich daran erinnert – so lehrte es der Prophet ﷺ. Wurde ein Gebet absichtlich ausgelassen, sehen die vier Rechtsschulen eine Nachholpflicht zusammen mit aufrichtiger Reue; einige Gelehrte betonen stattdessen Reue und vermehrte freiwillige Gebete. Gebete aus der Zeit vor deinem Islam musst du nicht nachholen. Lass dich von einem verpassten Gebet nicht entmutigen – bete das nächste.',
      en: 'Whoever slept through or forgot a prayer prays it as soon as they remember – this is what the Prophet ﷺ taught. If a prayer was missed deliberately, the four schools require making it up along with sincere repentance; some scholars instead emphasise repentance and increased voluntary prayers. You do not need to make up prayers from before you became Muslim. Do not let a missed prayer discourage you – pray the next one.',
      tr: 'Uyuyakalan veya unutan kimse, namazı hatırladığı anda kılar – Peygamber ﷺ böyle öğretmiştir. Bir namaz kasten terk edildiyse, dört mezhebe göre samimi tövbeyle birlikte kaza edilmesi gerekir; bazı âlimler ise tövbeyi ve nafile namazları artırmayı vurgular. Müslüman olmadan önceki namazları kaza etmen gerekmez. Kaçırdığın bir namaz seni yıldırmasın – bir sonrakini kıl.',
    },
    sources: ['Sahih al-Bukhari 597, Sahih Muslim 684', 'Sahih Muslim 121'],
    scholarlyDifference: true,
    review: 'draft',
  },
  {
    id: 'how-many-prayers',
    category: 'prayer',
    question: {
      de: 'Wie oft am Tag beten Muslime?',
      en: 'How often a day do Muslims pray?',
      tr: 'Müslümanlar günde kaç kez namaz kılar?',
    },
    answer: {
      de: 'Fünfmal: Fadschr (Morgengrauen, 2 Pflicht-Einheiten), Dhuhr (Mittag, 4), Asr (Nachmittag, 4), Maghrib (Sonnenuntergang, 3) und Ischa (Nacht, 4). Jedes Gebet hat ein festes Zeitfenster, das sich mit dem Sonnenstand verschiebt. Ein Pflichtgebet dauert meist nur fünf bis zehn Minuten. Die aktuellen Zeiten für deinen Ort findest du unter „Gebetszeiten" in der App.',
      en: 'Five times: Fajr (dawn, 2 obligatory units), Dhuhr (midday, 4), Asr (afternoon, 4), Maghrib (sunset, 3) and Isha (night, 4). Each prayer has a fixed time window that shifts with the position of the sun. An obligatory prayer usually takes only five to ten minutes. You can find the current times for your location under "Prayer times" in the app.',
      tr: 'Beş kez: Sabah (2 rekât farz), öğle (4), ikindi (4), akşam (3) ve yatsı (4). Her namazın güneşin konumuna göre değişen belirli bir vakti vardır. Bir farz namaz genellikle sadece beş ila on dakika sürer. Bulunduğun yerin güncel vakitlerini uygulamadaki "Namaz vakitleri" bölümünde bulabilirsin.',
    },
    sources: ['Quran 4:103', 'Sahih al-Bukhari 8, Sahih Muslim 16'],
    review: 'draft',
  },
  {
    id: 'qibla-direction',
    category: 'prayer',
    question: {
      de: 'Wie finde ich die Gebetsrichtung (Qibla)?',
      en: 'How do I find the prayer direction (qibla)?',
      tr: 'Kıble yönünü nasıl bulurum?',
    },
    answer: {
      de: 'Gebetet wird in Richtung der Kaaba in Mekka (Koran 2:144). Die Richtung wird über den kürzesten Weg auf der Erdkugel (Großkreis) von deinem Standort aus berechnet – in Deutschland liegt sie ungefähr im Südosten. Am einfachsten nutzt du den Qibla-Kompass der App; halte das Handy flach und fern von Metall oder Magneten. Wenn du die Richtung trotz Bemühen nicht genau bestimmen kannst, ist dein Gebet nach Ansicht der Gelehrten trotzdem gültig.',
      en: 'Prayer is performed facing the Kaaba in Mecca (Quran 2:144). The direction is calculated along the shortest path on the globe (great circle) from your location – in Germany it is roughly south-east. The easiest way is the app\'s qibla compass; hold your phone flat and away from metal or magnets. If you cannot determine the direction exactly despite making an effort, scholars hold that your prayer is still valid.',
      tr: "Namaz Mekke'deki Kâbe'ye yönelerek kılınır (Kur'an 2:144). Yön, bulunduğun yerden yerküre üzerindeki en kısa yol (büyük daire) hesaplanarak bulunur – Almanya'da kabaca güneydoğudur. En kolayı uygulamanın kıble pusulasını kullanmaktır; telefonu düz tut, metal ve mıknatıslardan uzak dur. Gayret etmene rağmen yönü tam belirleyemezsen, âlimlere göre namazın yine de geçerlidir.",
    },
    sources: ['Quran 2:144'],
    review: 'draft',
  },
  {
    id: 'menstruation-prayer-fasting',
    category: 'prayer',
    question: {
      de: 'Was gilt während der Menstruation für Gebet und Fasten?',
      en: 'What applies to prayer and fasting during menstruation?',
      tr: 'Hayız (adet) döneminde namaz ve oruç için ne geçerlidir?',
    },
    answer: {
      de: 'Während der Menstruation und der Wochenbettblutung entfallen Gebet und Fasten. Die Gebete werden nicht nachgeholt; die versäumten Fastentage des Ramadan werden später nachgeholt – so berichtete es Aischa. Dhikr, Bittgebete und das Anhören des Korans sind jederzeit möglich. Ob man den Koran auswendig rezitieren oder einen Mushaf berühren darf, beurteilen die Rechtsschulen unterschiedlich. Nach dem Ende der Blutung wird der Ghusl verrichtet.',
      en: 'During menstruation and postnatal bleeding, prayer and fasting are suspended. The prayers are not made up; the missed fasting days of Ramadan are made up later – as Aishah reported. Dhikr, supplications and listening to the Quran are possible at any time. Whether one may recite the Quran from memory or touch a printed Quran (mushaf) is judged differently by the schools. After the bleeding ends, ghusl is performed.',
      tr: "Hayız ve lohusalık süresince namaz ve oruç düşer. Namazlar kaza edilmez; Ramazan'da tutulamayan oruçlar ise daha sonra kaza edilir – Hz. Âişe böyle bildirmiştir. Zikir, dua ve Kur'an dinlemek her zaman mümkündür. Kur'an'ı ezberden okumanın veya Mushaf'a dokunmanın caiz olup olmadığı mezheplere göre farklıdır. Kanama bittikten sonra gusül alınır.",
    },
    sources: ['Sahih Muslim 335'],
    scholarlyDifference: true,
    review: 'draft',
  },
  {
    id: 'friday-prayer',
    category: 'prayer',
    question: {
      de: 'Muss ich zum Freitagsgebet?',
      en: 'Do I have to attend Friday prayer?',
      tr: 'Cuma namazına gitmek zorunda mıyım?',
    },
    answer: {
      de: 'Das Freitagsgebet (Dschumua) ist für erwachsene, gesunde und ortsansässige Männer Pflicht und ersetzt an diesem Tag das Mittagsgebet (Koran 62:9). Für Frauen, Reisende und Kranke ist es keine Pflicht – Frauen sind aber herzlich willkommen; wer teilnimmt, betet an dem Tag kein zusätzliches Mittagsgebet. Wenn deine Arbeitszeit kollidiert, sprich frühzeitig mit deinem Arbeitgeber über eine Pause oder Gleitzeit.',
      en: 'Friday prayer (Jumu\'ah) is obligatory for adult, healthy, resident men and replaces the midday prayer on that day (Quran 62:9). For women, travellers and the sick it is not obligatory – but women are warmly welcome; whoever attends does not pray an additional midday prayer that day. If your working hours clash, talk to your employer early about a break or flexitime.',
      tr: "Cuma namazı ergen, sağlıklı ve mukim erkeklere farzdır ve o gün öğle namazının yerine geçer (Kur'an 62:9). Kadınlara, yolculara ve hastalara farz değildir – ancak kadınlar da memnuniyetle katılabilir; katılan kişi o gün ayrıca öğle namazı kılmaz. Çalışma saatlerin çakışıyorsa işvereninle erkenden bir mola veya esnek çalışma hakkında konuş.",
    },
    sources: ['Quran 62:9'],
    review: 'draft',
  },

  // ───────────────────────────────────────────────────────── fasting
  {
    id: 'what-breaks-the-fast',
    category: 'fasting',
    question: {
      de: 'Was bricht das Fasten?',
      en: 'What breaks the fast?',
      tr: 'Orucu ne bozar?',
    },
    answer: {
      de: 'Das Fasten wird gebrochen durch absichtliches Essen, Trinken und Geschlechtsverkehr zwischen Morgendämmerung und Sonnenuntergang (Koran 2:187), außerdem durch absichtlich herbeigeführtes Erbrechen sowie den Beginn der Menstruation oder Wochenbettblutung. Wer aus Vergesslichkeit isst oder trinkt, fastet einfach weiter – sein Fasten ist gültig. Speichel schlucken, duschen oder Zähneputzen ohne Schlucken brechen das Fasten nicht. Bei Detailfragen (z. B. Medikamente) frag am besten einen Gelehrten.',
      en: 'The fast is broken by deliberate eating, drinking and sexual intercourse between dawn and sunset (Quran 2:187), as well as by deliberately induced vomiting and the onset of menstruation or postnatal bleeding. Whoever eats or drinks out of forgetfulness simply continues fasting – the fast is valid. Swallowing saliva, showering or brushing teeth without swallowing do not break the fast. For detailed questions (e.g. medication), it is best to ask a scholar.',
      tr: "Oruç, imsak ile güneşin batışı arasında kasten yemek, içmek ve cinsel ilişkiyle bozulur (Kur'an 2:187); ayrıca kasten kusmak ve hayız veya lohusalığın başlaması da orucu bozar. Unutarak yiyen veya içen kişi orucuna devam eder – orucu geçerlidir. Tükürük yutmak, duş almak veya yutmadan diş fırçalamak orucu bozmaz. Ayrıntılı sorularda (ör. ilaçlar) en iyisi bir âlime danışmaktır.",
    },
    sources: ['Quran 2:187', 'Sahih al-Bukhari 1933, Sahih Muslim 1155'],
    review: 'draft',
  },
  {
    id: 'medication-while-fasting',
    category: 'fasting',
    question: {
      de: 'Darf ich Medikamente während des Fastens nehmen?',
      en: 'May I take medication while fasting?',
      tr: 'Oruçluyken ilaç kullanabilir miyim?',
    },
    answer: {
      de: 'Tabletten oder Säfte, die geschluckt werden, brechen das Fasten nach allen Rechtsschulen. Bei anderen Formen gibt es unterschiedliche Ansichten: Viele zeitgenössische Gelehrte und Fiqh-Gremien sehen nicht-nährende Spritzen als unproblematisch an, während nährende Infusionen das Fasten brechen; bei Asthmasprays, Augen- oder Ohrentropfen gehen die Meinungen auseinander. Wichtig: Wer krank ist und tagsüber Medikamente braucht, ist vom Fasten befreit und holt die Tage später nach (Koran 2:184) – deine Gesundheit geht vor. Besprich dich mit deiner Ärztin und einem Gelehrten.',
      en: 'Tablets or syrups that are swallowed break the fast according to all schools. For other forms there are differing views: many contemporary scholars and fiqh councils consider non-nutritive injections unproblematic, while nutritive infusions break the fast; opinions differ on asthma inhalers and eye or ear drops. Important: whoever is ill and needs medication during the day is exempt from fasting and makes up the days later (Quran 2:184) – your health comes first. Consult your doctor and a scholar.',
      tr: "Yutulan tabletler veya şuruplar bütün mezheplere göre orucu bozar. Diğer yöntemlerde farklı görüşler vardır: Pek çok çağdaş âlim ve fıkıh kurulu besleyici olmayan iğneleri sorunsuz kabul ederken besleyici serumlar orucu bozar; astım spreyleri, göz veya kulak damlaları konusunda görüşler farklıdır. Önemli olan: Hasta olup gün içinde ilaca ihtiyaç duyan kişi oruçtan muaftır ve günleri sonra kaza eder (Kur'an 2:184) – sağlığın önce gelir. Doktoruna ve bir âlime danış.",
    },
    sources: ['Quran 2:184-185', 'Beschlüsse zeitgenössischer Fiqh-Gremien (z. B. Internationale Islamische Fiqh-Akademie)'],
    scholarlyDifference: true,
    review: 'draft',
  },
  {
    id: 'who-is-exempt-from-fasting',
    category: 'fasting',
    question: {
      de: 'Wer muss im Ramadan nicht fasten?',
      en: 'Who does not have to fast in Ramadan?',
      tr: "Ramazan'da kimler oruç tutmak zorunda değildir?",
    },
    answer: {
      de: 'Befreit sind Kranke und Reisende – sie holen die Tage später nach (Koran 2:184). Wer dauerhaft nicht fasten kann, etwa wegen hohen Alters oder chronischer Krankheit, speist stattdessen für jeden Tag einen bedürftigen Menschen (Fidya). Menstruierende Frauen und Frauen im Wochenbett fasten nicht und holen später nach; Kinder vor der Pubertät sind nicht verpflichtet. Bei Schwangeren und Stillenden, die um ihre oder die Gesundheit des Kindes fürchten, sind sich die Gelehrten einig, dass sie nicht fasten müssen – ob sie nachholen, Fidya zahlen oder beides, wird unterschiedlich gesehen.',
      en: 'The ill and travellers are exempt – they make up the days later (Quran 2:184). Whoever is permanently unable to fast, e.g. due to old age or chronic illness, instead feeds a needy person for each day (fidya). Menstruating women and women in postnatal bleeding do not fast and make up later; children before puberty are not obliged. For pregnant and breastfeeding women who fear for their own or their child\'s health, scholars agree they need not fast – whether they make up the days, pay fidya or both is viewed differently.',
      tr: "Hastalar ve yolcular muaftır – günleri sonra kaza ederler (Kur'an 2:184). Yaşlılık veya kronik hastalık gibi sebeplerle sürekli oruç tutamayan kişi her gün için bir yoksulu doyurur (fidye). Hayızlı ve lohusa kadınlar oruç tutmaz, sonra kaza eder; ergenlik çağına girmemiş çocuklar mükellef değildir. Kendi sağlıklarından veya çocuklarının sağlığından endişe eden hamile ve emziren kadınların oruç tutmak zorunda olmadığında âlimler hemfikirdir – kaza mı edecekleri, fidye mi verecekleri yoksa ikisini birden mi yapacakları farklı değerlendirilir.",
    },
    sources: ['Quran 2:184-185', 'Sahih Muslim 335'],
    scholarlyDifference: true,
    review: 'draft',
  },
  {
    id: 'zakat-al-fitr',
    category: 'fasting',
    question: {
      de: 'Was ist Zakat al-Fitr?',
      en: 'What is Zakat al-Fitr?',
      tr: 'Fitre (sadaka-i fıtır) nedir?',
    },
    answer: {
      de: 'Zakat al-Fitr ist eine kleine Pflichtabgabe am Ende des Ramadan, die jeder Muslim, der mehr als seinen Tagesbedarf besitzt, für sich und die Personen entrichtet, für die er sorgt. Der Prophet ﷺ legte sie als ein Sa\' (Hohlmaß) Grundnahrungsmittel fest, das vor dem Festgebet gegeben wird, damit auch Bedürftige das Fest feiern können. Ob man sie auch in Geld zahlen darf, sehen die Rechtsschulen unterschiedlich: Die hanafitische Schule erlaubt es, die anderen bevorzugen Nahrungsmittel. Moscheen geben jedes Jahr einen empfohlenen Betrag bekannt.',
      en: 'Zakat al-Fitr is a small obligatory charity at the end of Ramadan, paid by every Muslim who has more than their needs for the day, for themselves and those they support. The Prophet ﷺ set it at one sa\' (a measure of volume) of staple food, given before the Eid prayer so that the needy can also celebrate. Whether it may be paid in money is viewed differently by the schools: the Hanafi school permits it, the others prefer food. Mosques announce a recommended amount every year.',
      tr: "Fitre, Ramazan'ın sonunda günlük ihtiyacından fazlasına sahip her Müslümanın kendisi ve bakmakla yükümlü olduğu kişiler için verdiği küçük bir zorunlu sadakadır. Peygamber ﷺ onu bir sâ' (hacim ölçüsü) temel gıda olarak belirlemiş ve ihtiyaç sahiplerinin de bayramı kutlayabilmesi için bayram namazından önce verilmesini emretmiştir. Para olarak verilip verilemeyeceği mezheplere göre farklıdır: Hanefî mezhebi buna izin verir, diğerleri gıdayı tercih eder. Camiler her yıl tavsiye edilen miktarı duyurur.",
    },
    sources: ['Sahih al-Bukhari 1503, Sahih Muslim 984'],
    scholarlyDifference: true,
    review: 'draft',
  },

  // ───────────────────────────────────────────────────────── daily-life
  {
    id: 'music',
    category: 'daily-life',
    question: {
      de: 'Ist Musik erlaubt?',
      en: 'Is music allowed?',
      tr: 'Müzik caiz mi?',
    },
    answer: {
      de: 'Das ist eine Frage mit echten Meinungsunterschieden. Die Mehrheit der klassischen Gelehrten der vier Rechtsschulen hielt Musikinstrumente für nicht erlaubt – mit Ausnahmen wie der Rahmentrommel (Daff) bei Hochzeiten und Festen; sie stützen sich u. a. auf einen Hadith bei al-Bukhari. Eine Minderheit, früher und heute, hält Musik mit sauberem Inhalt für erlaubt. Einig sind sich alle, dass Inhalte, die zu Verbotenem aufrufen, zu meiden sind, und dass Gesang ohne Instrumente mit gutem Inhalt (z. B. Naschids) unproblematisch ist. Folge der Ansicht, der du nach ehrlicher Prüfung vertraust, und respektiere andere.',
      en: 'This is a question with genuine differences of opinion. The majority of classical scholars of the four schools held musical instruments to be impermissible – with exceptions such as the frame drum (daff) at weddings and festivals; they rely, among other things, on a hadith in al-Bukhari. A minority, past and present, considers music with clean content permissible. All agree that content calling to what is forbidden should be avoided and that singing without instruments with good content (e.g. nasheeds) is unproblematic. Follow the view you trust after honest examination, and respect others.',
      tr: 'Bu, gerçek görüş ayrılıklarının olduğu bir konudur. Dört mezhebin klasik âlimlerinin çoğunluğu müzik aletlerini – düğün ve bayramlardaki def gibi istisnalar dışında – caiz görmemiştir; bu konuda diğerlerinin yanı sıra Buhârî\'deki bir hadise dayanırlar. Geçmişte ve günümüzde bir azınlık ise içeriği temiz müziği caiz görür. Herkes, harama çağıran içeriklerden kaçınılması gerektiğinde ve güzel içerikli enstrümansız ilahilerin sorun olmadığında hemfikirdir. Samimi bir araştırmadan sonra güvendiğin görüşü takip et ve başkalarına saygı göster.',
    },
    sources: ['Sahih al-Bukhari 5590', 'Sahih al-Bukhari 952, Sahih Muslim 892 (Gesang am Festtag)', 'Quran 31:6 (Auslegung umstritten)'],
    scholarlyDifference: true,
    review: 'draft',
  },
  {
    id: 'hijab',
    category: 'daily-life',
    question: {
      de: 'Muss ich als neue Muslimin sofort Kopftuch tragen?',
      en: 'As a new Muslim woman, do I have to wear a headscarf right away?',
      tr: 'Yeni Müslüman bir kadın olarak hemen başörtüsü takmak zorunda mıyım?',
    },
    answer: {
      de: 'Die Gelehrten der vier Rechtsschulen sehen das Bedecken des Körpers einschließlich der Haare (außer Gesicht und Händen) für erwachsene Frauen gegenüber fremden Männern als Pflicht an (Koran 24:31, 33:59). Gleichzeitig ist der Hidschab ein Gottesdienst zwischen dir und Allah: Niemand darf dich dazu zwingen oder dich beschämen. Viele Konvertitinnen gehen diesen Schritt bewusst und in ihrem eigenen Tempo, wenn sie sich innerlich bereit fühlen – und berücksichtigen dabei Familie, Arbeitsplatz und Sicherheit. Sprich mit einer vertrauenswürdigen Lehrerin über deinen Weg.',
      en: 'Scholars of the four schools consider covering the body including the hair (except face and hands) obligatory for adult women in front of unrelated men (Quran 24:31, 33:59). At the same time, hijab is an act of worship between you and Allah: nobody may force or shame you. Many women converts take this step consciously and at their own pace when they feel inwardly ready – taking family, workplace and safety into account. Talk to a trustworthy female teacher about your path.',
      tr: "Dört mezhebin âlimleri, ergen kadınların yabancı erkeklerin yanında saçları dahil vücudunu (yüz ve eller hariç) örtmesini farz kabul eder (Kur'an 24:31, 33:59). Aynı zamanda tesettür, seninle Allah arasında bir ibadettir: Kimse seni buna zorlayamaz veya utandıramaz. Pek çok yeni Müslüman kadın bu adımı bilinçli olarak ve kendi hızında, kendini içten hazır hissettiğinde atar – aileyi, iş yerini ve güvenliği de göz önünde bulundurarak. Yolun hakkında güvendiğin bir hoca hanımla konuş.",
    },
    sources: ['Quran 24:31, 33:59', 'Quran 2:256'],
    review: 'draft',
  },
  {
    id: 'praying-at-work',
    category: 'daily-life',
    question: {
      de: 'Wie bete ich bei der Arbeit, in der Schule oder an der Uni?',
      en: 'How do I pray at work, school or university?',
      tr: 'İş yerinde, okulda veya üniversitede nasıl namaz kılarım?',
    },
    answer: {
      de: 'Die Zeitfenster für Dhuhr und Asr sind meist lang genug, um ein fünfminütiges Gebet in einer Pause unterzubringen. Ein ruhiger Raum, eine saubere Unterlage und Wudu vor dem Weg zur Arbeit helfen. Sprich offen und freundlich mit Vorgesetzten oder Lehrkräften – viele sind entgegenkommend. Ist es wirklich nicht anders möglich, erlauben einige Rechtsschulen bei Bedarf, Gebete zusammenzulegen (Dhuhr mit Asr, Maghrib mit Ischa), gestützt auf einen Bericht in Sahih Muslim; die hanafitische Schule erlaubt dies außerhalb der Pilgerfahrt nicht.',
      en: 'The time windows for Dhuhr and Asr are usually long enough to fit a five-minute prayer into a break. A quiet room, a clean mat and making wudu before leaving for work help. Speak openly and kindly with supervisors or teachers – many are accommodating. If it is truly not possible otherwise, some schools permit combining prayers when needed (Dhuhr with Asr, Maghrib with Isha), based on a report in Sahih Muslim; the Hanafi school does not permit this outside the pilgrimage.',
      tr: 'Öğle ve ikindi vakitleri genellikle bir moladaki beş dakikalık namaz için yeterince uzundur. Sessiz bir oda, temiz bir seccade ve işe çıkmadan önce abdest almak yardımcı olur. Amirlerinle veya öğretmenlerinle açık ve nazik bir şekilde konuş – çoğu anlayış gösterir. Gerçekten başka bir yol yoksa, bazı mezhepler Sahih Müslim\'deki bir rivayete dayanarak ihtiyaç hâlinde namazların cem edilmesine (öğle ile ikindi, akşam ile yatsı) izin verir; Hanefî mezhebi ise hac dışında buna izin vermez.',
    },
    sources: ['Quran 4:103', 'Sahih Muslim 705'],
    scholarlyDifference: true,
    review: 'draft',
  },
  {
    id: 'parties-with-alcohol',
    category: 'daily-life',
    question: {
      de: 'Darf ich auf Feiern gehen, auf denen Alkohol getrunken wird?',
      en: 'May I go to parties where alcohol is served?',
      tr: 'Alkol içilen kutlamalara gidebilir miyim?',
    },
    answer: {
      de: 'Alkohol selbst ist verboten (Koran 5:90), und viele Gelehrte raten, nicht an einem Tisch zu sitzen, an dem Alkohol getrunken wird. Im Alltag – etwa bei einer Betriebsfeier oder einem Geburtstag – wählen viele Muslime einen Mittelweg: Sie kommen zum Essen oder zur Begrüßung, trinken etwas Alkoholfreies und gehen, wenn das Trinken in den Mittelpunkt rückt. Wie weit man dabei geht, wird unterschiedlich beurteilt. Ein freundliches „Ich trinke keinen Alkohol" wird meist respektiert.',
      en: 'Alcohol itself is forbidden (Quran 5:90), and many scholars advise against sitting at a table where alcohol is being drunk. In everyday life – e.g. at a company party or a birthday – many Muslims choose a middle path: they come for the meal or to say hello, drink something non-alcoholic, and leave when drinking becomes the focus. How far one may go is judged differently. A friendly "I don\'t drink alcohol" is usually respected.',
      tr: "Alkolün kendisi haramdır (Kur'an 5:90) ve birçok âlim, içki içilen bir sofraya oturulmamasını tavsiye eder. Günlük hayatta – örneğin bir şirket kutlamasında veya doğum gününde – pek çok Müslüman orta bir yol seçer: Yemeğe veya selamlaşmaya gelir, alkolsüz bir şey içer ve içki ön plana çıktığında ayrılır. Bu konuda ne kadar ileri gidilebileceği farklı değerlendirilir. Nazik bir \"Alkol içmiyorum\" genellikle saygıyla karşılanır.",
    },
    sources: ['Quran 5:90', 'Jami at-Tirmidhi 2801'],
    scholarlyDifference: true,
    review: 'draft',
  },

  // ───────────────────────────────────────────────────────── new-muslim
  {
    id: 'change-name',
    category: 'new-muslim',
    question: {
      de: 'Muss ich meinen Namen ändern?',
      en: 'Do I have to change my name?',
      tr: 'Adımı değiştirmek zorunda mıyım?',
    },
    answer: {
      de: 'Nein. Einen neuen Namen anzunehmen ist keine Pflicht – die meisten Gefährten des Propheten ﷺ behielten ihre Namen. Nur ein Name mit schlechter Bedeutung, etwa einer, der Dienerschaft gegenüber jemand anderem als Allah ausdrückt, sollte geändert werden; der Prophet ﷺ änderte z. B. den Namen „Asiya" (Ungehorsame) in „Dschamila" (Schöne). Manche wählen gern zusätzlich einen arabischen Namen für die Gemeinde – das ist eine freie Entscheidung, keine Bedingung.',
      en: 'No. Taking a new name is not required – most of the Prophet\'s ﷺ Companions kept their names. Only a name with a bad meaning, such as one expressing servitude to someone other than Allah, should be changed; the Prophet ﷺ, for example, changed the name "Asiya" (disobedient) to "Jamila" (beautiful). Some like to choose an additional Arabic name for use in the community – this is a free choice, not a condition.',
      tr: 'Hayır. Yeni bir isim almak zorunlu değildir – Peygamber\'in ﷺ ashabının çoğu isimlerini korumuştur. Yalnızca kötü anlamlı bir isim, örneğin Allah\'tan başkasına kulluğu ifade eden bir isim değiştirilmelidir; Peygamber ﷺ örneğin "Âsiye" (isyankâr) ismini "Cemîle" (güzel) olarak değiştirmiştir. Bazıları topluluk içinde kullanmak üzere ayrıca Arapça bir isim seçmeyi sever – bu bir şart değil, serbest bir tercihtir.',
    },
    sources: ['Sahih Muslim 2139'],
    review: 'draft',
  },
  {
    id: 'tattoos-before-islam',
    category: 'new-muslim',
    question: {
      de: 'Darf ich Tattoos haben, die ich vor dem Islam gemacht habe?',
      en: 'May I keep tattoos I got before Islam?',
      tr: "İslam'dan önce yaptırdığım dövmeler sorun olur mu?",
    },
    answer: {
      de: 'Sich tätowieren zu lassen ist nach der Mehrheit der Gelehrten nicht erlaubt; für Tattoos aus der Zeit vor deinem Islam trägst du aber keine Sünde, denn der Islam löscht aus, was vorher war. Viele Gelehrte sagen, dass du ein Tattoo nicht entfernen musst, wenn das mit Schmerzen, Gesundheitsrisiken oder großen Kosten verbunden ist; andere empfehlen die Entfernung, wenn sie ohne Schaden möglich ist. Wudu und Ghusl sind gültig, da die Farbe unter der Haut liegt. Zeigt ein Tattoo etwas Anstößiges, solltest du es bedecken.',
      en: 'Getting a tattoo is not permitted according to the majority of scholars; but you bear no sin for tattoos from before you became Muslim, because Islam wipes out what came before. Many scholars say you do not have to remove a tattoo if this involves pain, health risks or great cost; others recommend removal if it is possible without harm. Wudu and ghusl are valid because the ink lies under the skin. If a tattoo shows something offensive, you should cover it.',
      tr: "Âlimlerin çoğunluğuna göre dövme yaptırmak caiz değildir; ancak Müslüman olmadan önce yaptırdığın dövmeler için günah taşımazsın, çünkü İslam öncesini siler. Pek çok âlim, dövmenin çıkarılması acı, sağlık riski veya büyük masraf gerektiriyorsa çıkarılması gerekmediğini söyler; diğerleri ise zarar vermeden mümkünse çıkarılmasını tavsiye eder. Mürekkep derinin altında olduğu için abdest ve gusül geçerlidir. Dövme uygunsuz bir şey gösteriyorsa onu örtmelisin.",
    },
    sources: ['Sahih Muslim 121', 'Sahih al-Bukhari 5937, Sahih Muslim 2124 (Verbot des Tätowierens)', 'Quran 2:286'],
    scholarlyDifference: true,
    review: 'draft',
  },
  {
    id: 'why-did-you-become-muslim',
    category: 'new-muslim',
    question: {
      de: 'Was sage ich, wenn mich jemand fragt, warum ich Muslim/a geworden bin?',
      en: 'What do I say when someone asks why I became Muslim?',
      tr: 'Biri bana neden Müslüman olduğumu sorduğunda ne demeliyim?',
    },
    answer: {
      de: 'Erzähl ehrlich und kurz deine eigene Geschichte – was dich berührt oder überzeugt hat, z. B. der Glaube an den einen Gott, der Koran oder das Gebet. Du musst nicht alle Antworten kennen; „Ich lerne noch" ist eine gute und ehrliche Antwort. Bleib freundlich, auch wenn die Frage kritisch gemeint ist – der Koran empfiehlt Weisheit und schöne Ermahnung (16:125). Niemand muss überzeugt werden, denn „es gibt keinen Zwang im Glauben" (2:256).',
      en: 'Tell your own story honestly and briefly – what touched or convinced you, e.g. belief in the one God, the Quran or prayer. You do not have to know all the answers; "I\'m still learning" is a good and honest answer. Stay friendly even if the question is meant critically – the Quran recommends wisdom and good instruction (16:125). Nobody has to be convinced, for "there is no compulsion in religion" (2:256).',
      tr: "Kendi hikâyeni dürüstçe ve kısaca anlat – seni neyin etkilediğini veya ikna ettiğini, örneğin tek Allah inancını, Kur'an'ı veya namazı. Bütün cevapları bilmek zorunda değilsin; \"Hâlâ öğreniyorum\" güzel ve dürüst bir cevaptır. Soru eleştirel olsa bile nazik kal – Kur'an hikmeti ve güzel öğüdü tavsiye eder (16:125). Kimseyi ikna etmek zorunda değilsin, çünkü \"dinde zorlama yoktur\" (2:256).",
    },
    sources: ['Quran 16:125', 'Quran 2:256'],
    review: 'draft',
  },
  {
    id: 'certificate-of-conversion',
    category: 'new-muslim',
    question: {
      de: 'Brauche ich eine Bescheinigung, dass ich Muslim/a bin?',
      en: 'Do I need a certificate that I am Muslim?',
      tr: 'Müslüman olduğuma dair bir belgeye ihtiyacım var mı?',
    },
    answer: {
      de: 'Für deinen Glauben vor Allah brauchst du kein Dokument – die aufrichtige Schahada genügt. Praktisch kann eine Bescheinigung über die Annahme des Islam aber nützlich sein, etwa für den Visumsantrag zur Umra oder zum Hadsch oder für eine islamische Eheschließung in manchen Ländern. Viele Moscheen und islamische Verbände stellen sie aus, wenn du die Schahada dort vor Zeugen sprichst.',
      en: 'For your faith before Allah you need no document – a sincere shahada is enough. In practice, however, a certificate of accepting Islam can be useful, e.g. for a visa application for Umrah or Hajj or for an Islamic marriage in some countries. Many mosques and Islamic associations issue one when you say the shahada there in front of witnesses.',
      tr: "Allah katında imanın için hiçbir belgeye ihtiyacın yoktur – samimi bir şehadet yeterlidir. Ancak pratikte, İslam'ı kabul ettiğine dair bir belge faydalı olabilir; örneğin umre veya hac vizesi başvurusu ya da bazı ülkelerde İslami nikâh için. Pek çok cami ve İslami kuruluş, şehadeti orada şahitler önünde getirdiğinde böyle bir belge düzenler.",
    },
    sources: ['Sahih al-Bukhari 8, Sahih Muslim 16'],
    review: 'draft',
  },
  {
    id: 'where-to-start',
    category: 'new-muslim',
    question: {
      de: 'Ich fühle mich überfordert – womit fange ich an?',
      en: 'I feel overwhelmed – where do I start?',
      tr: 'Kendimi bunalmış hissediyorum – nereden başlamalıyım?',
    },
    answer: {
      de: 'Mit dem Fundament: die Schahada verstehen, Reinigung lernen und mit den fünf Gebeten beginnen – auch wenn es anfangs unvollkommen ist. Danach kommen Schritt für Schritt Halal-Grundlagen, kurze Suren und guter Charakter. Der Prophet ﷺ sagte, dass Allah die beständigen Taten am meisten liebt, auch wenn sie klein sind. Der Lernpfad „Neu im Islam" in dieser App führt dich durch die ersten Schritte.',
      en: 'With the foundation: understand the shahada, learn purification and start with the five prayers – even if imperfect at first. Then, step by step, come halal basics, short surahs and good character. The Prophet ﷺ said that Allah loves consistent deeds most, even if they are small. The "New to Islam" learning path in this app guides you through the first steps.',
      tr: 'Temelden başla: Şehadeti anla, temizliği öğren ve başta eksik de olsa beş vakit namaza başla. Sonra adım adım helal-haram temelleri, kısa sureler ve güzel ahlak gelir. Peygamber ﷺ, Allah\'ın az da olsa devamlı olan amelleri en çok sevdiğini söylemiştir. Bu uygulamadaki "İslam\'a Yeni Başlayanlar" öğrenme yolu ilk adımlarında sana rehberlik eder.',
    },
    sources: ['Sahih al-Bukhari 6464, Sahih Muslim 783', 'Quran 2:185'],
    review: 'draft',
  },
  {
    id: 'past-sins',
    category: 'new-muslim',
    question: {
      de: 'Was ist mit den Sünden, die ich vor dem Islam begangen habe?',
      en: 'What about the sins I committed before Islam?',
      tr: "İslam'dan önce işlediğim günahlar ne olacak?",
    },
    answer: {
      de: 'Der Prophet ﷺ sagte, dass der Islam auslöscht, was vor ihm war – du beginnst mit einem reinen Blatt. Der Koran verspricht sogar, dass Allah bei denen, die bereuen und Gutes tun, schlechte Taten in gute verwandelt (25:70). Was du anderen Menschen schuldest, etwa Schulden, solltest du nach Möglichkeit begleichen. Lass dich von der Vergangenheit nicht lähmen.',
      en: 'The Prophet ﷺ said that Islam wipes out what came before it – you begin with a clean slate. The Quran even promises that for those who repent and do good, Allah replaces bad deeds with good ones (25:70). What you owe other people, such as debts, you should settle where possible. Do not let the past paralyse you.',
      tr: "Peygamber ﷺ, İslam'ın kendinden öncekini sildiğini söylemiştir – tertemiz bir sayfayla başlıyorsun. Kur'an, tövbe edip iyilik yapanların kötülüklerini Allah'ın iyiliklere çevireceğini bile vaat eder (25:70). Başkalarına olan borçlarını mümkün olduğunca ödemelisin. Geçmişin seni felç etmesine izin verme.",
    },
    sources: ['Sahih Muslim 121', 'Quran 25:70'],
    review: 'draft',
  },

  // ───────────────────────────────────────────────────────── family
  {
    id: 'christmas-with-family',
    category: 'family',
    question: {
      de: 'Darf ich als Muslim/a an Weihnachten mit meiner Familie feiern?',
      en: 'As a Muslim, may I celebrate Christmas with my family?',
      tr: 'Müslüman olarak ailemle Noel kutlayabilir miyim?',
    },
    answer: {
      de: 'Hier gibt es unterschiedliche Ansichten. Weitgehend einig sind sich die Gelehrten, dass Muslime nicht an religiösen Ritualen anderer Religionen teilnehmen, etwa an Gottesdienst-Handlungen. Gleichzeitig betont der Koran Güte gegenüber Eltern und Verwandten, auch nichtmuslimischen (31:15, 60:8). Viele zeitgenössische Gelehrte – besonders in Europa – halten es daher für erlaubt, die Familie an den Feiertagen zu besuchen, gemeinsam (halal) zu essen und Geschenke als Ausdruck der Verbundenheit anzunehmen oder zu geben; andere sind hier zurückhaltender, auch beim Gratulieren. Sprich mit einem vertrauenswürdigen Gelehrten und mit deiner Familie über deine Grenzen.',
      en: 'There are different views here. Scholars largely agree that Muslims do not take part in the religious rituals of other faiths, such as acts of worship in a service. At the same time, the Quran stresses kindness to parents and relatives, including non-Muslim ones (31:15, 60:8). Many contemporary scholars – particularly in Europe – therefore consider it permissible to visit family during the holidays, eat together (halal) and accept or give gifts as an expression of connection; others are more reserved, including about congratulating. Talk to a trustworthy scholar and to your family about your boundaries.',
      tr: "Bu konuda farklı görüşler vardır. Âlimler, Müslümanların başka dinlerin dinî ritüellerine, örneğin ayindeki ibadetlere katılmayacağı konusunda büyük ölçüde hemfikirdir. Aynı zamanda Kur'an, Müslüman olmayanlar da dahil anne babaya ve akrabalara iyiliği vurgular (31:15, 60:8). Bu nedenle – özellikle Avrupa'daki – pek çok çağdaş âlim, bayram günlerinde aileyi ziyaret etmeyi, birlikte (helal) yemek yemeyi ve bağlılığın ifadesi olarak hediye alıp vermeyi caiz görür; diğerleri, tebrik etme konusunda da dahil olmak üzere daha temkinlidir. Sınırların hakkında güvendiğin bir âlimle ve ailenle konuş.",
    },
    sources: ['Quran 31:14-15', 'Quran 60:8', 'Quran 109:6'],
    scholarlyDifference: true,
    review: 'draft',
  },
  {
    id: 'family-rejects-islam',
    category: 'family',
    question: {
      de: 'Meine Familie reagiert ablehnend auf meinen Islam – was kann ich tun?',
      en: 'My family is rejecting my Islam – what can I do?',
      tr: 'Ailem Müslüman olmama olumsuz tepki veriyor – ne yapabilirim?',
    },
    answer: {
      de: 'Gib ihnen Zeit: Oft steckt hinter Ablehnung Sorge oder ein falsches Bild vom Islam. Bleib freundlich, hilfsbereit und respektvoll – dein Verhalten ist das stärkste Argument, und der Koran gebietet Güte gegenüber Eltern, auch wenn sie anders glauben (31:15). Vermeide hitzige Debatten, mach Dua für sie und halte den Kontakt. Wenn du bedroht oder unter Druck gesetzt wirst, hol dir Hilfe bei einer Vertrauensperson, einer Beratungsstelle oder im Notfall bei der Polizei (110).',
      en: 'Give them time: rejection often comes from worry or a wrong image of Islam. Stay kind, helpful and respectful – your conduct is the strongest argument, and the Quran commands kindness to parents even if they believe differently (31:15). Avoid heated debates, make dua for them and keep in touch. If you are threatened or pressured, seek help from someone you trust, a counselling service or, in an emergency, the police (110 in Germany).',
      tr: "Onlara zaman tanı: Reddin arkasında çoğu zaman endişe veya İslam hakkında yanlış bir algı vardır. Nazik, yardımsever ve saygılı kal – davranışın en güçlü delildir ve Kur'an, farklı inansalar bile anne babaya iyiliği emreder (31:15). Hararetli tartışmalardan kaçın, onlar için dua et ve bağını koru. Tehdit ediliyor veya baskı görüyorsan güvendiğin birinden, bir danışma merkezinden ya da acil durumda polisten (Almanya'da 110) yardım iste.",
    },
    sources: ['Quran 31:14-15', 'Quran 16:125', 'Sahih al-Bukhari 2620, Sahih Muslim 1003'],
    review: 'draft',
  },
  {
    id: 'eating-with-non-muslim-family',
    category: 'family',
    question: {
      de: 'Darf ich mit meiner nichtmuslimischen Familie essen?',
      en: 'May I eat with my non-Muslim family?',
      tr: 'Müslüman olmayan ailemle yemek yiyebilir miyim?',
    },
    answer: {
      de: 'Ja, gemeinsames Essen ist eine wunderbare Möglichkeit, verbunden zu bleiben. Du verzichtest lediglich auf Schweinefleisch, Alkohol und andere verbotene Zutaten. Biete an, etwas mitzubringen oder mitzukochen – Vegetarisches, Fisch oder Halal-Fleisch ist meist eine einfache Lösung. Ob Fleisch, das nicht nach islamischen Regeln geschlachtet wurde, erlaubt ist, wird unterschiedlich gesehen (siehe Frage zum Supermarktfleisch).',
      en: 'Yes, shared meals are a wonderful way to stay connected. You simply avoid pork, alcohol and other forbidden ingredients. Offer to bring something or cook together – vegetarian dishes, fish or halal meat are usually an easy solution. Whether meat not slaughtered according to Islamic rules is permitted is viewed differently (see the question on supermarket meat).',
      tr: 'Evet, birlikte yemek yemek bağını korumanın harika bir yoludur. Sadece domuz eti, alkol ve diğer haram malzemelerden kaçınırsın. Bir şey getirmeyi veya birlikte pişirmeyi teklif et – vejetaryen yemekler, balık veya helal et genellikle kolay bir çözümdür. İslami usule göre kesilmemiş etin helal olup olmadığı farklı değerlendirilir (market eti sorusuna bak).',
    },
    sources: ['Quran 5:3, 5:5', 'Quran 60:8'],
    review: 'draft',
  },
  {
    id: 'obeying-parents',
    category: 'family',
    question: {
      de: 'Muss ich meinen Eltern gehorchen, auch wenn sie nicht muslimisch sind?',
      en: 'Do I have to obey my parents even if they are not Muslim?',
      tr: 'Müslüman olmasalar bile anne babama itaat etmek zorunda mıyım?',
    },
    answer: {
      de: 'Güte und Respekt gegenüber den Eltern gehören zu den wichtigsten Pflichten im Islam – unabhängig von ihrem Glauben (17:23, 31:14). Gehorsam gilt in allem Guten und Erlaubten; nur wenn sie etwas verlangen, das Allah verbietet, gehorchst du in diesem Punkt nicht. Der Prophet ﷺ sagte: „Kein Gehorsam in Ungehorsam (gegen Allah); Gehorsam gibt es nur im Guten." Auch dann bleibst du höflich und liebevoll (31:15).',
      en: 'Kindness and respect towards parents are among the most important duties in Islam – regardless of their faith (17:23, 31:14). Obedience applies in everything good and permissible; only if they ask for something Allah forbids do you not obey on that point. The Prophet ﷺ said: "There is no obedience in disobedience (to Allah); obedience is only in what is good." Even then you remain polite and loving (31:15).',
      tr: "Anne babaya iyilik ve saygı, inançları ne olursa olsun İslam'daki en önemli görevlerdendir (17:23, 31:14). İtaat her türlü iyi ve meşru şeyde geçerlidir; sadece Allah'ın yasakladığı bir şeyi isterlerse o konuda itaat etmezsin. Peygamber ﷺ şöyle buyurdu: \"Allah'a isyan olan konuda itaat yoktur; itaat ancak iyilikte (ma'ruf) olur.\" O zaman bile nazik ve sevgi dolu kalırsın (31:15).",
    },
    sources: ['Quran 17:23, 31:14-15', 'Sahih al-Bukhari 7257, Sahih Muslim 1840'],
    review: 'draft',
  },

  // ───────────────────────────────────────────────────────── food
  {
    id: 'supermarket-meat',
    category: 'food',
    question: {
      de: 'Ist Fleisch aus dem Supermarkt halal?',
      en: 'Is supermarket meat halal?',
      tr: 'Marketteki et helal mi?',
    },
    answer: {
      de: 'Schweinefleisch ist in jedem Fall verboten. Bei anderem Fleisch hängt es von der Schlachtung ab, und hier gehen die Meinungen auseinander: Gestützt auf Koran 5:5 („die Speise derer, denen die Schrift gegeben wurde, ist euch erlaubt") halten manche Gelehrte Fleisch aus christlich/jüdisch geprägten Ländern für erlaubt. Viele andere verlangen eine Schlachtung nach islamischen Regeln mit Nennung des Namens Allahs und sehen konventionelles Supermarktfleisch als nicht halal an. Im Zweifel greifen viele Muslime zu zertifiziertem Halal-Fleisch.',
      en: 'Pork is forbidden in any case. For other meat it depends on the slaughter, and opinions differ here: based on Quran 5:5 ("the food of those who were given the Scripture is lawful for you"), some scholars consider meat from countries with a Christian/Jewish tradition permissible. Many others require slaughter according to Islamic rules with mention of Allah\'s name and consider conventional supermarket meat not halal. When in doubt, many Muslims choose certified halal meat.',
      tr: "Domuz eti her durumda haramdır. Diğer etlerde ise kesim şekline bağlıdır ve burada görüşler farklıdır: Kur'an 5:5'e (\"kendilerine kitap verilenlerin yiyecekleri size helaldir\") dayanarak bazı âlimler Hristiyan/Yahudi geleneğine sahip ülkelerden gelen eti helal kabul eder. Diğer birçok âlim ise Allah'ın adı anılarak İslami usule göre kesim şartı arar ve geleneksel market etini helal saymaz. Şüphe durumunda pek çok Müslüman sertifikalı helal eti tercih eder.",
    },
    sources: ['Quran 5:3, 5:5', 'Quran 6:121'],
    scholarlyDifference: true,
    review: 'draft',
  },
  {
    id: 'seafood',
    category: 'food',
    question: {
      de: 'Darf ich Meeresfrüchte wie Garnelen oder Muscheln essen?',
      en: 'May I eat seafood such as prawns or mussels?',
      tr: 'Karides veya midye gibi deniz ürünleri yiyebilir miyim?',
    },
    answer: {
      de: 'Fisch ist nach allen Rechtsschulen erlaubt und muss nicht geschlachtet werden (Koran 5:96). Bei anderen Meerestieren gibt es Unterschiede: Die malikitische, schafiitische und hanbalitische Schule erlauben grundsätzlich alle Tiere, die nur im Meer leben. In der hanafitischen Schule ist nur Fisch erlaubt; ob Garnelen als Fisch gelten, ist innerhalb dieser Schule umstritten, Muscheln und Tintenfisch gelten dort als nicht erlaubt. Folge der Lehrmeinung, der du dich anschließt.',
      en: 'Fish is permitted according to all schools and does not need to be slaughtered (Quran 5:96). For other sea creatures there are differences: the Maliki, Shafi\'i and Hanbali schools generally permit all animals that live only in the sea. In the Hanafi school only fish is permitted; whether prawns count as fish is disputed within this school, while mussels and squid are considered impermissible there. Follow the school you adhere to.',
      tr: "Balık bütün mezheplere göre helaldir ve kesilmesi gerekmez (Kur'an 5:96). Diğer deniz canlılarında farklılıklar vardır: Mâlikî, Şâfiî ve Hanbelî mezhepleri yalnızca denizde yaşayan bütün hayvanları genel olarak helal kabul eder. Hanefî mezhebinde ise sadece balık helaldir; karidesin balık sayılıp sayılmadığı bu mezhep içinde tartışmalıdır, midye ve mürekkep balığı ise caiz görülmez. Bağlı olduğun mezhebin görüşünü takip et.",
    },
    sources: ['Quran 5:96', 'Sunan Abi Dawud 83, Jami at-Tirmidhi 69'],
    scholarlyDifference: true,
    review: 'draft',
  },
  {
    id: 'gelatine-and-alcohol-in-food',
    category: 'food',
    question: {
      de: 'Was ist mit Gelatine und Alkohol in Lebensmitteln?',
      en: 'What about gelatine and alcohol in food?',
      tr: 'Gıdalardaki jelatin ve alkol ne olacak?',
    },
    answer: {
      de: 'Gelatine vom Schwein wird von der Mehrheit der Gelehrten als nicht erlaubt angesehen; einige halten sie wegen der vollständigen chemischen Umwandlung (Istihala) für erlaubt. Gelatine aus Fisch, aus halal geschlachteten Rindern oder pflanzliche Alternativen sind unproblematisch. Alkohol als Zutat (z. B. in Tiramisu oder Soßen) wird gemieden. Bei winzigen, natürlich entstehenden Mengen – etwa in Brot oder Fruchtsaft – sehen die meisten Gelehrten kein Problem; bei Aromen mit Alkohol als Trägerstoff gehen die Meinungen auseinander.',
      en: 'Pork gelatine is considered impermissible by the majority of scholars; some consider it permissible due to complete chemical transformation (istihala). Gelatine from fish, from halal-slaughtered cattle or plant-based alternatives are unproblematic. Alcohol as an ingredient (e.g. in tiramisu or sauces) is avoided. With tiny, naturally occurring amounts – e.g. in bread or fruit juice – most scholars see no problem; opinions differ on flavourings with alcohol as a carrier.',
      tr: "Domuz jelatini âlimlerin çoğunluğuna göre helal değildir; bazıları ise tam kimyasal dönüşüm (istihâle) nedeniyle helal kabul eder. Balıktan, helal kesilmiş sığırdan elde edilen jelatin veya bitkisel alternatifler sorun teşkil etmez. Malzeme olarak alkol (ör. tiramisu veya soslarda) kullanılan ürünlerden kaçınılır. Ekmek veya meyve suyu gibi ürünlerde doğal olarak oluşan çok küçük miktarlarda çoğu âlim sorun görmez; alkolün taşıyıcı olarak kullanıldığı aromalarda ise görüşler farklıdır.",
    },
    sources: ['Quran 5:3', 'Quran 5:90', 'Sahih al-Bukhari 52, Sahih Muslim 1599'],
    scholarlyDifference: true,
    review: 'draft',
  },
  {
    id: 'alcohol-small-amounts',
    category: 'food',
    question: {
      de: 'Ist auch ein kleines Glas Alkohol verboten?',
      en: 'Is even a small glass of alcohol forbidden?',
      tr: 'Küçük bir kadeh alkol de haram mı?',
    },
    answer: {
      de: 'Ja. Der Koran nennt berauschende Getränke ein Werk des Satans, das man meiden soll (5:90), und der Prophet ﷺ sagte: „Jedes Berauschende ist Khamr, und jedes Berauschende ist verboten." Das Verbot gilt unabhängig von der Menge, also auch für ein einzelnes Glas. Alkoholfreie Alternativen und ein freundliches Nein helfen im Alltag.',
      en: 'Yes. The Quran calls intoxicating drinks a work of Satan to be avoided (5:90), and the Prophet ﷺ said: "Every intoxicant is khamr, and every intoxicant is forbidden." The prohibition applies regardless of the amount, so it includes a single glass. Non-alcoholic alternatives and a friendly no help in everyday life.',
      tr: "Evet. Kur'an sarhoş edici içkileri şeytanın işi olarak niteler ve onlardan kaçınılmasını emreder (5:90). Peygamber ﷺ de şöyle buyurmuştur: \"Sarhoş eden her şey hamrdır ve sarhoş eden her şey haramdır.\" Yasak miktardan bağımsızdır, yani tek bir kadeh için de geçerlidir. Günlük hayatta alkolsüz alternatifler ve nazik bir \"hayır\" yardımcı olur.",
    },
    sources: ['Quran 5:90', 'Sahih Muslim 2003'],
    review: 'draft',
  },

  // ───────────────────────────────────────────────────────── misc
  {
    id: 'madhhab',
    category: 'misc',
    question: {
      de: 'Was sind die Rechtsschulen (Madhhab)?',
      en: 'What are the schools of law (madhhab)?',
      tr: 'Mezhepler nedir?',
    },
    answer: {
      de: 'Die vier sunnitischen Rechtsschulen sind die hanafitische (nach Abu Hanifa), die malikitische (nach Malik ibn Anas), die schafiitische (nach asch-Schafii) und die hanbalitische (nach Ahmad ibn Hanbal). Sie sind keine Konfessionen, sondern Methoden, die praktischen Regeln aus Koran und Sunna abzuleiten; im Glauben stimmen sie überein und unterscheiden sich vor allem in Details der Praxis. Alle vier gelten als gleichermaßen legitim. Neue Muslime folgen oft der Schule ihrer Gemeinde oder ihres Lehrers – wichtig ist, respektvoll mit anderen Meinungen umzugehen.',
      en: 'The four Sunni schools of law are the Hanafi (after Abu Hanifa), Maliki (after Malik ibn Anas), Shafi\'i (after al-Shafi\'i) and Hanbali (after Ahmad ibn Hanbal). They are not denominations but methods of deriving practical rulings from the Quran and Sunnah; they agree in belief and differ mainly in details of practice. All four are regarded as equally legitimate. New Muslims often follow the school of their community or teacher – what matters is treating other opinions with respect.',
      tr: "Dört Sünni mezhep; Hanefî (Ebû Hanîfe), Mâlikî (Mâlik b. Enes), Şâfiî (İmam Şâfiî) ve Hanbelî (Ahmed b. Hanbel) mezhepleridir. Bunlar ayrı dinî gruplar değil, Kur'an ve sünnetten pratik hükümler çıkarma yöntemleridir; inançta birleşir, daha çok uygulama detaylarında ayrılırlar. Dördü de eşit derecede meşru kabul edilir. Yeni Müslümanlar genellikle topluluklarının veya hocalarının mezhebini takip eder – önemli olan diğer görüşlere saygı göstermektir.",
    },
    sources: ['Quran 16:43', 'Quran 4:59'],
    review: 'draft',
  },
  {
    id: 'who-pays-zakat',
    category: 'misc',
    question: {
      de: 'Wer muss Zakat zahlen?',
      en: 'Who has to pay zakat?',
      tr: 'Kimler zekât vermek zorundadır?',
    },
    answer: {
      de: 'Zakat ist Pflicht für jeden Muslim, dessen Vermögen über den Grundbedarf hinaus den Mindestbetrag (Nisab) erreicht und ein volles Mondjahr in seinem Besitz bleibt. Der Nisab entspricht dem Wert von 85 g Gold oder 595 g Silber; abgegeben werden 2,5 % des zakatpflichtigen Vermögens an die im Koran genannten Empfänger (9:60). Ob auch auf das Vermögen von Kindern Zakat fällig ist und ob man sich am Gold- oder Silberwert orientiert, sehen die Rechtsschulen unterschiedlich. Mit dem Zakat-Rechner der App kannst du deinen Betrag berechnen.',
      en: 'Zakat is obligatory for every Muslim whose wealth beyond basic needs reaches the minimum threshold (nisab) and remains in their possession for a full lunar year. The nisab equals the value of 85 g of gold or 595 g of silver; 2.5% of zakatable wealth is given to the recipients named in the Quran (9:60). Whether zakat is due on children\'s wealth and whether the gold or silver value is used is viewed differently by the schools. You can calculate your amount with the app\'s zakat calculator.',
      tr: "Zekât, temel ihtiyaçlarının dışındaki malı asgari miktara (nisap) ulaşan ve bu malı tam bir kameri yıl elinde tutan her Müslümana farzdır. Nisap 85 gr altın veya 595 gr gümüş değerine eşittir; zekâta tabi malın %2,5'i Kur'an'da belirtilen kişilere verilir (9:60). Çocukların malından zekât gerekip gerekmediği ve altın mı gümüş mü esas alınacağı mezheplere göre farklıdır. Miktarını uygulamadaki zekât hesaplayıcısıyla hesaplayabilirsin.",
    },
    sources: ['Quran 9:60, 2:43', 'Sahih al-Bukhari 8, Sahih Muslim 16'],
    scholarlyDifference: true,
    review: 'draft',
  },
  {
    id: 'everyday-phrases',
    category: 'misc',
    question: {
      de: 'Was bedeuten „Inschallah", „Maschallah" und „Assalamu alaikum"?',
      en: 'What do "Inshallah", "Mashallah" and "Assalamu alaikum" mean?',
      tr: '"İnşallah", "Maşallah" ve "Selamün aleyküm" ne demektir?',
    },
    answer: {
      de: '„Assalamu alaikum" heißt „Friede sei mit euch" und ist der islamische Gruß; man antwortet mit „Wa alaikumu s-salam" („Und mit euch sei Friede") – der Koran lehrt, einen Gruß gleich gut oder besser zu erwidern (4:86). „Inschallah" („wenn Allah will") sagt man über zukünftige Vorhaben (18:23-24). „Maschallah" („was Allah gewollt hat") drückt Bewunderung und Dankbarkeit aus, wenn man etwas Schönes sieht. Weitere häufige Ausdrücke sind „Alhamdulillah" (Lob sei Allah) und „Subhanallah" (gepriesen sei Allah).',
      en: '"Assalamu alaikum" means "Peace be upon you" and is the Islamic greeting; the reply is "Wa alaikumu s-salam" ("And upon you be peace") – the Quran teaches returning a greeting equally well or better (4:86). "Inshallah" ("if Allah wills") is said about future plans (18:23-24). "Mashallah" ("what Allah has willed") expresses admiration and gratitude when seeing something beautiful. Other common expressions are "Alhamdulillah" (praise be to Allah) and "Subhanallah" (glory be to Allah).',
      tr: '"Selamün aleyküm" "Selam/esenlik üzerinize olsun" demektir ve İslami selamlaşmadır; "Ve aleyküm selam" ("Selam sizin üzerinize de olsun") diye karşılık verilir – Kur\'an, bir selamı aynısıyla veya daha güzeliyle almayı öğretir (4:86). "İnşallah" ("Allah dilerse") gelecekteki planlar için söylenir (18:23-24). "Maşallah" ("Allah\'ın dilediği oldu") güzel bir şey görüldüğünde hayranlık ve şükrü ifade eder. Diğer sık kullanılan ifadeler "Elhamdülillah" (hamd Allah\'a mahsustur) ve "Sübhânallah"tır (Allah her türlü eksiklikten münezzehtir).',
    },
    sources: ['Quran 4:86', 'Quran 18:23-24', 'Quran 18:39'],
    review: 'draft',
  },
]
