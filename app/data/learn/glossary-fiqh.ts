/**
 * Learning center — additional glossary terms for the path
 * "Fiqh des Alltags" (`paths/fiqh.ts`).
 *
 * Same rules as `glossary.ts`: short, neutral definitions reflecting
 * mainstream Sunni usage; where the schools differ, the definition says so.
 * `related` ids point to GLOSSARY or FIQH_TERMS. All entries ship as
 * `review: 'draft'` until checked by a qualified reviewer.
 */
import type { GlossaryTerm } from './types'

export const FIQH_TERMS: GlossaryTerm[] = [
  // ─── Methodik & Kategorien ────────────────────────────────────────
  {
    id: 'mubah',
    term: 'Mubah',
    arabic: 'مباح',
    aliases: ['Mübah', 'erlaubt', 'neutral', 'permissible'],
    definition: {
      de: "Erlaubt und neutral: eine Handlung, für die es weder Lohn noch Sünde gibt, z. B. Spazierengehen oder eine bestimmte Speise wählen. Mit einer guten Absicht kann auch eine erlaubte Handlung belohnt werden.",
      en: "Permissible and neutral: an act that brings neither reward nor sin, e.g. going for a walk or choosing a particular meal. With a good intention, even a permissible act can be rewarded.",
      tr: "Serbest ve nötr: yapılmasında sevap, terk edilmesinde günah olmayan iş; örneğin yürüyüşe çıkmak veya bir yemeği tercih etmek. İyi bir niyetle mübah bir iş de sevaba dönüşebilir.",
    },
    related: ['halal', 'mustahabb', 'makruh', 'niyyah'],
    review: 'draft',
  },
  {
    id: 'ijtihad',
    term: 'Ijtihad',
    arabic: 'اجتهاد',
    aliases: ['Idschtihad', 'İçtihat', 'İctihad'],
    definition: {
      de: "Die gewissenhafte Anstrengung eines qualifizierten Gelehrten, aus Koran und Sunna eine Rechtsregel abzuleiten, wo kein eindeutiger Text vorliegt. Unterschiedliche Ergebnisse des Ijtihad sind der Hauptgrund für Meinungsunterschiede zwischen den Rechtsschulen.",
      en: "The conscientious effort of a qualified scholar to derive a ruling from the Quran and Sunnah where no clear text exists. Differing results of ijtihad are the main reason for differences between the schools of law.",
      tr: "Açık bir naslın bulunmadığı konularda ehil bir âlimin Kur'an ve Sünnet'ten hüküm çıkarmak için gösterdiği titiz çaba. İçtihatların farklı sonuçlanması, mezhepler arasındaki görüş ayrılıklarının başlıca sebebidir.",
    },
    related: ['fiqh', 'qiyas', 'madhhab', 'taqlid'],
    review: 'draft',
  },
  {
    id: 'taqlid',
    term: 'Taqlid',
    arabic: 'تقليد',
    aliases: ['Taklid', 'Befolgen einer Rechtsschule'],
    definition: {
      de: "Das Befolgen der Lehrmeinung eines qualifizierten Gelehrten oder einer Rechtsschule, ohne selbst alle Belege prüfen zu können. Für die meisten Muslime ist das der normale, von den Gelehrten empfohlene Weg (Koran 16:43).",
      en: "Following the opinion of a qualified scholar or school of law without being able to examine all the evidence oneself. For most Muslims this is the normal path recommended by scholars (Quran 16:43).",
      tr: "Delillerin tamamını bizzat inceleyemeyen kişinin ehil bir âlimin veya bir mezhebin görüşüne uyması. Müslümanların çoğu için âlimlerin tavsiye ettiği olağan yol budur (Kur'an 16:43).",
    },
    related: ['madhhab', 'ijtihad', 'fatwa'],
    review: 'draft',
  },
  {
    id: 'shart',
    term: 'Shart',
    arabic: 'شرط',
    aliases: ['Schart', 'Şart', 'Bedingung', 'Shurut'],
    definition: {
      de: "Eine Bedingung, die vor und während einer Handlung erfüllt sein muss, aber nicht Teil von ihr ist — z. B. die rituelle Reinheit oder das Bedecken der Awra beim Gebet. Fehlt sie, ist die Handlung ungültig.",
      en: "A condition that must be met before and during an act but is not part of it — e.g. ritual purity or covering the awrah in prayer. If it is missing, the act is invalid.",
      tr: "Bir ibadetten önce ve ibadet boyunca bulunması gereken, fakat ibadetin bir parçası olmayan şart — örneğin namazda hadesten taharet veya avret yerlerinin örtülmesi. Şart eksikse ibadet geçersizdir.",
    },
    related: ['rukn', 'salah', 'tahara', 'awrah'],
    review: 'draft',
  },
  {
    id: 'rukn',
    term: 'Rukn',
    arabic: 'ركن',
    aliases: ['Rükün', 'Säule', 'Arkan', 'Erkan'],
    definition: {
      de: "Ein wesentlicher Bestandteil (Säule) einer Handlung, z. B. die Verbeugung (Ruku) im Gebet. Wird ein Rukn ausgelassen, ist die Handlung ungültig; er kann nicht durch eine Niederwerfung der Vergesslichkeit ersetzt werden. Welche Teile als Rukn gelten, unterscheiden die Rechtsschulen teilweise.",
      en: "An essential component (pillar) of an act, e.g. bowing (ruku) in prayer. If a rukn is omitted, the act is invalid; it cannot be replaced by the prostration of forgetfulness. The schools partly differ on which parts count as a rukn.",
      tr: "Bir ibadetin özünü oluşturan temel parça; örneğin namazdaki rükû. Rükün terk edilirse ibadet geçersiz olur; sehiv secdesiyle telafi edilemez. Hangi parçaların rükün sayıldığı konusunda mezhepler kısmen farklıdır.",
    },
    related: ['shart', 'salah', 'sajdat-as-sahw', 'fard'],
    review: 'draft',
  },
  // ─── Reinheit ─────────────────────────────────────────────────────
  {
    id: 'istinja',
    term: 'Istinja',
    arabic: 'استنجاء',
    aliases: ['Istindscha', 'İstinca', 'Intimreinigung'],
    definition: {
      de: "Das Reinigen der Ausscheidungsorgane nach dem Toilettengang, vorzugsweise mit Wasser; Papier oder Steine sind ebenfalls zulässig, die Kombination gilt als am besten.",
      en: "Cleaning the private parts after using the toilet, preferably with water; paper or stones are also permitted, and combining both is considered best.",
      tr: "Tuvalet ihtiyacından sonra avret mahallinin temizlenmesi; tercihen su ile yapılır. Kâğıt veya taş da caizdir; ikisini birlikte kullanmak en faziletlisi sayılır.",
    },
    related: ['tahara', 'najasa', 'wudu'],
    review: 'draft',
  },
  {
    id: 'janaba',
    term: 'Janaba',
    arabic: 'جنابة',
    aliases: ['Dschanaba', 'Cünüplük', 'Junub', 'große Unreinheit'],
    definition: {
      de: "Der Zustand großer ritueller Unreinheit nach Geschlechtsverkehr oder Samenerguss (auch im Schlaf). Er wird durch den Ghusl aufgehoben; vorher sind u. a. Gebet und Tawaf nicht möglich.",
      en: "The state of major ritual impurity after sexual intercourse or ejaculation (including in sleep). It is lifted by ghusl; until then, prayer and tawaf among other things are not possible.",
      tr: "Cinsel ilişki veya meninin gelmesi (uykuda da olsa) sonrasında oluşan büyük hadesli hâl. Gusülle kalkar; o zamana kadar namaz ve tavaf gibi ibadetler yapılamaz.",
    },
    related: ['ghusl', 'tahara', 'hayd'],
    review: 'draft',
  },
  {
    id: 'hayd',
    term: 'Hayd',
    arabic: 'حيض',
    aliases: ['Haid', 'Hayız', 'Menstruation', 'Nifas', 'Lohusalık'],
    definition: {
      de: "Die Menstruation. In dieser Zeit (und im Wochenbett, Nifas) betet und fastet eine Frau nicht; versäumte Fastentage holt sie nach, die Gebete nicht. Danach verrichtet sie den Ghusl. Mindest- und Höchstdauer bemessen die Rechtsschulen unterschiedlich.",
      en: "Menstruation. During this time (and during postnatal bleeding, nifas) a woman does not pray or fast; she makes up the missed fasts but not the prayers. Afterwards she performs ghusl. The schools set the minimum and maximum durations differently.",
      tr: "Âdet hâli. Bu sürede (ve lohusalıkta, nifasta) kadın namaz kılmaz ve oruç tutmaz; oruçları kaza eder, namazları kaza etmez. Sonrasında gusül alır. Asgari ve azami süreleri mezhepler farklı belirler.",
    },
    related: ['ghusl', 'janaba', 'qada'],
    review: 'draft',
  },
  {
    id: 'mash-khuffayn',
    term: 'Mash ʿala al-Khuffayn',
    arabic: 'المسح على الخفين',
    aliases: ['Mesh', 'Mest üzerine mesh', 'Strümpfe bestreichen', 'Wiping over socks'],
    definition: {
      de: "Das Bestreichen der Ledersocken (Khuff) beim Wudu statt der Fußwaschung — eine Erleichterung, die alle vier Rechtsschulen anerkennen: einen Tag und eine Nacht für Ansässige, drei Tage für Reisende. Voraussetzung ist u. a., dass sie im Zustand des Wudu angezogen wurden. Für dünne Stoffsocken gelten unterschiedliche Ansichten.",
      en: "Wiping over leather socks (khuff) in wudu instead of washing the feet — a concession recognised by all four schools: one day and night for residents, three days for travellers. One condition is that they were put on in a state of wudu. Views differ on thin fabric socks.",
      tr: "Abdestte ayakları yıkamak yerine mestlerin üzerine mesh etmek — dört mezhebin de kabul ettiği bir kolaylık: mukim için bir gün bir gece, yolcu için üç gün. Şartlardan biri, mestlerin abdestli iken giyilmiş olmasıdır. İnce kumaş çoraplar hakkında farklı görüşler vardır.",
    },
    related: ['wudu', 'musafir'],
    review: 'draft',
  },
  // ─── Gebet ────────────────────────────────────────────────────────
  {
    id: 'qada',
    term: 'Qada',
    arabic: 'قضاء',
    aliases: ['Kaza', 'Nachholen', 'Nachholgebet', 'Qadha'],
    definition: {
      de: "Das Nachholen einer Pflicht-Ibada nach Ablauf ihrer Zeit, z. B. eines verschlafenen Gebets oder eines Fastentags, der wegen Krankheit ausgefallen ist. Die Gegenform heißt Ada' (fristgerechte Verrichtung).",
      en: "Making up an obligatory act of worship after its time has passed, e.g. a prayer slept through or a fasting day missed due to illness. Its counterpart is ada' (performing it on time).",
      tr: "Vaktinde yapılamayan farz bir ibadetin sonradan yerine getirilmesi; örneğin uykuda kaçırılan bir namaz ya da hastalık nedeniyle tutulamayan bir oruç. Vaktinde yapılmasına edâ denir.",
    },
    related: ['salah', 'sawm', 'fard'],
    review: 'draft',
  },
  {
    id: 'sajdat-as-sahw',
    term: 'Sajdat as-Sahw',
    arabic: 'سجدة السهو',
    aliases: ['Sehiv secdesi', 'Niederwerfung der Vergesslichkeit', 'Sujud as-Sahw', 'Sahw'],
    definition: {
      de: "Zwei zusätzliche Niederwerfungen, mit denen bestimmte Fehler im Gebet ausgeglichen werden — etwa das Vergessen des ersten Taschahhud, eine versehentliche Zusatzhandlung oder Zweifel über die Zahl der Rakat. Ob sie vor oder nach dem Salam erfolgen, regeln die Rechtsschulen unterschiedlich.",
      en: "Two additional prostrations that compensate for certain mistakes in prayer — e.g. forgetting the first tashahhud, an accidental extra action or doubt about the number of rak'ahs. The schools differ on whether they come before or after the salam.",
      tr: "Namazdaki bazı hataları telafi eden iki ilave secde — örneğin ilk oturuşu unutmak, yanlışlıkla fazladan bir şey yapmak veya rekât sayısında şüpheye düşmek. Selamdan önce mi sonra mı yapılacağı mezheplere göre değişir.",
    },
    related: ['sujud', 'salah', 'rukn', 'tashahhud'],
    review: 'draft',
  },
  {
    id: 'musafir',
    term: 'Musafir',
    arabic: 'مسافر',
    aliases: ['Müsafir', 'Seferî', 'Reisender', 'Traveller'],
    definition: {
      de: "Ein Reisender im rechtlichen Sinn. Ab einer bestimmten Entfernung und solange er sich nicht für längere Zeit niederlässt, gelten für ihn Erleichterungen wie das Kürzen (Qasr) der Gebete und die Erlaubnis, das Fasten nachzuholen. Entfernung und Aufenthaltsdauer bemessen die Rechtsschulen unterschiedlich.",
      en: "A traveller in the legal sense. Beyond a certain distance, and as long as he does not settle for a longer period, concessions apply such as shortening (qasr) the prayers and being allowed to make up fasts later. The schools set the distance and length of stay differently.",
      tr: "Fıkhi anlamda yolcu. Belirli bir mesafeyi aştığında ve bir yerde uzun süre kalmaya niyet etmedikçe namazları kısaltma (kasr) ve orucu sonra tutma gibi ruhsatlardan yararlanır. Mesafe ve kalış süresi mezheplere göre farklı belirlenir.",
    },
    related: ['qasr', 'jam', 'mash-khuffayn'],
    review: 'draft',
  },
  {
    id: 'qasr',
    term: 'Qasr',
    arabic: 'قصر',
    aliases: ['Kasr', 'Kürzen des Gebets', 'Shortening'],
    definition: {
      de: "Das Kürzen der vier-Rakat-Pflichtgebete (Dhuhr, Asr, Ischa) auf zwei Rakat während einer Reise (Koran 4:101). Fadschr und Maghrib werden nicht gekürzt. Nach hanafitischer Schule ist das Kürzen verpflichtend, nach den anderen Schulen eine (meist vorzuziehende) Erleichterung.",
      en: "Shortening the four-rak'ah obligatory prayers (Dhuhr, Asr, Isha) to two rak'ahs while travelling (Quran 4:101). Fajr and Maghrib are not shortened. In the Hanafi school shortening is obligatory; in the other schools it is a (usually preferable) concession.",
      tr: "Yolculukta dört rekâtlı farz namazların (öğle, ikindi, yatsı) iki rekât kılınması (Kur'an 4:101). Sabah ve akşam namazları kısaltılmaz. Hanefî mezhebinde kısaltmak gereklidir; diğer mezheplerde (çoğunlukla tercih edilen) bir ruhsattır.",
    },
    related: ['musafir', 'jam', 'salah'],
    review: 'draft',
  },
  {
    id: 'jam',
    term: "Jam'",
    arabic: 'جمع',
    aliases: ['Cem', 'Zusammenlegen der Gebete', 'Combining prayers', 'Jama'],
    definition: {
      de: "Das Zusammenlegen zweier Gebete in der Zeit eines von beiden: Dhuhr mit Asr, Maghrib mit Ischa. Malikiten, Schafiiten und Hanbaliten erlauben es u. a. auf Reisen (mit unterschiedlichen weiteren Gründen), die hanafitische Schule nur am Tag von Arafa und in Muzdalifa während der Pilgerfahrt.",
      en: "Combining two prayers in the time of one of them: Dhuhr with Asr, Maghrib with Isha. Malikis, Shafi'is and Hanbalis permit it while travelling among other reasons (with differing further grounds); the Hanafi school only on the day of Arafah and in Muzdalifah during Hajj.",
      tr: "İki namazı birinin vaktinde birlikte kılmak: öğle ile ikindi, akşam ile yatsı. Mâlikî, Şâfiî ve Hanbelî mezhepleri bunu yolculukta (ve farklı başka sebeplerle) caiz görür; Hanefî mezhebi ise yalnızca hac sırasında Arafat ve Müzdelife'de kabul eder.",
    },
    related: ['qasr', 'musafir', 'salah', 'hajj'],
    review: 'draft',
  },
  // ─── Fasten & Zakat ───────────────────────────────────────────────
  {
    id: 'fidya',
    term: 'Fidya',
    arabic: 'فدية',
    aliases: ['Fidye', 'Ersatzleistung', 'Ransom'],
    definition: {
      de: "Eine Ersatzleistung, meist die Speisung eines Bedürftigen pro versäumtem Fastentag — z. B. für alte oder dauerhaft kranke Menschen, die nicht fasten können (Koran 2:184). Höhe und genaue Fälle bemessen die Rechtsschulen unterschiedlich.",
      en: "A compensation, usually feeding one needy person per missed fasting day — e.g. for elderly or chronically ill people who cannot fast (Quran 2:184). The schools set the amount and the exact cases differently.",
      tr: "Bir telafi bedeli; genellikle tutulamayan her oruç günü için bir yoksulu doyurmak — örneğin oruç tutamayan yaşlılar veya iyileşme ümidi olmayan hastalar için (Kur'an 2:184). Miktarı ve hangi durumlarda gerektiği mezheplere göre farklıdır.",
    },
    related: ['sawm', 'kaffara', 'qada'],
    review: 'draft',
  },
  {
    id: 'kaffara',
    term: 'Kaffara',
    arabic: 'كفارة',
    aliases: ['Keffaret', 'Kaffarah', 'Sühne', 'Expiation'],
    definition: {
      de: "Eine Sühneleistung für bestimmte schwere Verstöße, z. B. das absichtliche Brechen eines Ramadan-Fastentags durch Geschlechtsverkehr: 60 aufeinanderfolgende Tage fasten oder, wer das nicht kann, 60 Bedürftige speisen. Ob auch absichtliches Essen oder Trinken eine Kaffara erfordert, ist zwischen den Schulen umstritten.",
      en: "An expiation for certain serious violations, e.g. deliberately breaking a Ramadan fast through intercourse: fasting 60 consecutive days or, for those unable to, feeding 60 needy people. Whether deliberate eating or drinking also requires kaffarah is disputed between the schools.",
      tr: "Bazı ağır ihlaller için öngörülen keffaret; örneğin Ramazan orucunu cinsel ilişkiyle kasten bozmak: 60 gün art arda oruç tutmak, buna gücü yetmeyen için 60 yoksulu doyurmak. Kasten yiyip içmenin de keffaret gerektirip gerektirmediği mezhepler arasında tartışmalıdır.",
    },
    related: ['sawm', 'fidya', 'ramadan'],
    review: 'draft',
  },
  {
    id: 'hawl',
    term: 'Hawl',
    arabic: 'حول',
    aliases: ['Havl', 'Yıl dolması', 'Zakat-Jahr'],
    definition: {
      de: "Das (Mond-)Jahr, das über einem Vermögen oberhalb des Nisab vergehen muss, bevor darauf Zakat fällig wird. Für Ernteerträge gilt kein Hawl; ihre Zakat ist zur Erntezeit fällig.",
      en: "The (lunar) year that must pass over wealth above the nisab before zakat becomes due on it. Harvests have no hawl; their zakat is due at harvest time.",
      tr: "Nisap miktarını aşan bir malın üzerinden zekâtın farz olması için geçmesi gereken (kamerî) yıl. Toprak ürünlerinde havl şartı yoktur; zekâtı hasat zamanında verilir.",
    },
    related: ['zakat', 'nisab'],
    review: 'draft',
  },
  {
    id: 'riba',
    term: 'Riba',
    arabic: 'ربا',
    aliases: ['Faiz', 'Zins', 'Wucher', 'Interest', 'Usury'],
    definition: {
      de: "Wörtlich „Zuwachs“: ungerechtfertigter Mehrwert, vor allem der vorab vereinbarte Aufschlag auf ein Darlehen (Zins). Der Koran verbietet Riba ausdrücklich (2:275). Wie moderne Finanzprodukte einzuordnen sind, beurteilen Gelehrte und Fiqh-Räte teilweise unterschiedlich.",
      en: "Literally “increase”: an unjustified surplus, above all a pre-agreed addition on a loan (interest). The Quran explicitly forbids riba (2:275). Scholars and fiqh councils partly differ on how modern financial products should be classified.",
      tr: "Sözlükte “artış”: haksız fazlalık, özellikle bir borca önceden şart koşulan ek (faiz). Kur'an ribayı açıkça haram kılar (2:275). Modern finans ürünlerinin nasıl değerlendirileceği konusunda âlimler ve fıkıh kurulları kısmen farklı görüşlere sahiptir.",
    },
    related: ['haram', 'halal', 'zakat'],
    review: 'draft',
  },
]
