/**
 * Learning path "Hajj & Umrah" — 8 practical lessons: meaning and
 * obligation, preparation, ihram, Umrah step by step, the forms of Hajj,
 * the days of Hajj (8–13 Dhul-Hijjah), visiting Medina and life after the
 * return.
 *
 * Mainstream Sunni fiqh; where the four schools of law differ, a `note`
 * block with variant 'differences' says so. Pilgrims should always follow
 * the guidance of their group's scholar and the current official rules.
 *
 * Quran translations are the authors' own renderings, checked against the
 * reference translations named in QURAN_REF (partly abridged). Everything
 * ships as `review: 'draft'` until a qualified reviewer has checked it.
 */
import type { LearningPath } from '../types'

/** Reference translations the Quran renderings in this path follow. */
const QURAN_REF = 'Koranübersetzungen (Referenz, eigene Wiedergabe, teils gekürzt): Bubenheim/Elyas (DE), Sahih International (EN), Diyanet İşleri Başkanlığı Kur\'an-ı Kerim Meali (TR)'

/** Primary description of the Prophet's ﷺ Hajj (long hadith of Jabir). */
const HAJJ_OF_PROPHET = "Sahih Muslim 1218 (Hadith Jabir über den Hadsch des Propheten ﷺ)"

export const HAJJ_PATH: LearningPath = {
  id: 'hajj',
  icon: '🕋',
  level: 'practice',
  title: {
    de: 'Hajj & Umrah',
    en: 'Hajj & Umrah',
    tr: 'Hac ve Umre',
  },
  description: {
    de: "Die Pilgerfahrt verstehen und vorbereiten: Bedeutung und Pflicht, Vorbereitung, Ihram, die Umra Schritt für Schritt, die Hadsch-Arten, die Tage von Mina bis Arafat, der Besuch in Medina — und wie es nach der Rückkehr weitergeht.",
    en: "Understanding and preparing for the pilgrimage: meaning and obligation, preparation, ihram, Umrah step by step, the forms of Hajj, the days from Mina to Arafat, the visit to Medina — and how life continues after the return.",
    tr: "Haccı anlamak ve hazırlanmak: anlamı ve farziyeti, hazırlık, ihram, adım adım umre, hac çeşitleri, Mina'dan Arafat'a hac günleri, Medine ziyareti — ve dönüşten sonrası.",
  },
  lessons: [
    // ─── 1 ───────────────────────────────────────────────────────────
    {
      id: 'meaning-and-obligation',
      title: {
        de: 'Bedeutung und Pflicht der Pilgerfahrt',
        en: 'The meaning and obligation of pilgrimage',
        tr: 'Haccın anlamı ve farziyeti',
      },
      summary: {
        de: "Warum Muslime nach Mekka pilgern, wer zum Hadsch verpflichtet ist und welchen Lohn der Prophet ﷺ dafür verheißen hat.",
        en: "Why Muslims travel to Mecca, who is obliged to perform Hajj, and what reward the Prophet ﷺ promised for it.",
        tr: "Müslümanların neden Mekke'ye gittiği, haccın kimlere farz olduğu ve Peygamber'in ﷺ müjdelediği mükâfat.",
      },
      minutes: 5,
      blocks: [
        {
          type: 'text',
          text: {
            de: "**Hadsch** (Hajj) bedeutet wörtlich „sich aufmachen zu einem bedeutenden Ziel“. Er ist die fünfte Säule des Islam: eine Reise zum Haus Allahs in Mekka mit festen Riten an festen Tagen im Monat Dhu l-Hiddscha. Die **Umra**, die „kleine Pilgerfahrt“, ist das ganze Jahr über möglich. Dieser Pfad erklärt beides praktisch — als Vorbereitung, nicht als Ersatz für die Anleitung durch die eigene Pilgergruppe.",
            en: "**Hajj** literally means “setting out for a significant destination”. It is the fifth pillar of Islam: a journey to the House of Allah in Mecca with fixed rites on fixed days in the month of Dhul-Hijjah. **Umrah**, the “lesser pilgrimage”, is possible all year round. This path explains both in practical terms — as preparation, not as a replacement for the guidance of your own pilgrim group.",
            tr: "**Hac** sözlükte “önemli bir hedefe yönelmek” demektir. İslam'ın beşinci şartıdır: Zilhicce ayında belirli günlerde, belirli menasikle Mekke'deki Beytullah'a yapılan yolculuk. **Umre** (“küçük hac”) ise yılın her döneminde yapılabilir. Bu yol ikisini de pratik olarak anlatır — kendi hac kafilenin rehberliğinin yerine değil, ona hazırlık olarak.",
          },
        },
        { type: 'link', to: '/learn/basics/fasting-zakat-hajj', label: { de: 'Auffrischen: Hadsch als fünfte Säule', en: 'Refresher: Hajj as the fifth pillar', tr: "Hatırlatma: İslam'ın beşinci şartı hac" } },
        {
          type: 'quran',
          ref: '3:96-97',
          translation: {
            de: "Gewiss, das erste (Gottes)haus, das für die Menschen errichtet wurde, ist wahrlich das in Bakka (Mekka), als ein gesegnetes (Haus) und als Rechtleitung für die Weltenbewohner. Darin sind klare Zeichen; (darunter) der Standort Ibrahims. Wer es betritt, ist sicher. Und Allah gegenüber ist es für die Menschen eine Pflicht, die Pilgerfahrt zum Hause zu unternehmen — für den, der dazu einen Weg zu finden vermag …",
            en: "Indeed, the first House established for mankind was that at Bakkah (Mecca) — blessed and a guidance for the worlds. In it are clear signs, (such as) the standing place of Ibrahim. And whoever enters it shall be safe. And pilgrimage to the House is a duty owed to Allah by people — for whoever is able to find a way there …",
            tr: "Şüphesiz insanlar için kurulan ilk ev, Mekke'deki o mübarek ve âlemlere hidayet kaynağı olan evdir. Orada apaçık deliller, (ezcümle) Makam-ı İbrahim vardır. Oraya giren güvenlikte olur. Yoluna gücü yetenlerin o evi haccetmesi, Allah'ın insanlar üzerindeki bir hakkıdır …",
          },
        },
        {
          type: 'heading',
          text: { de: 'Auf den Spuren Ibrahims', en: 'In the footsteps of Ibrahim', tr: "Hz. İbrahim'in izinde" },
        },
        {
          type: 'quran',
          ref: '22:27',
          arabic: 'وَأَذِّن فِي النَّاسِ بِالْحَجِّ يَأْتُوكَ رِجَالًا',
          translation: {
            de: "Und rufe unter den Menschen die Pilgerfahrt aus, so werden sie zu dir kommen zu Fuß und auf vielen hageren (Reittieren), die aus jedem tiefen Passweg daherkommen.",
            en: "And proclaim the pilgrimage among the people; they will come to you on foot and on every lean camel, coming from every distant pass.",
            tr: "İnsanlar arasında haccı ilan et ki gerek yaya olarak gerekse her derin vadiden gelen yorgun develer üzerinde sana gelsinler.",
          },
        },
        {
          type: 'text',
          text: {
            de: "Viele Riten erinnern an die Familie Ibrahims: Ibrahim und Isma'il errichteten die Kaaba (2:127); Hadschar lief auf der Suche nach Wasser zwischen as-Safa und al-Marwa hin und her, bis die Quelle Zamzam hervorsprudelte (Sahih al-Bukhari 3364). Wer pilgert, geht ihren Weg nach — in schlichter, gleicher Kleidung, Seite an Seite mit Menschen aus aller Welt.",
            en: "Many rites recall the family of Ibrahim: Ibrahim and Isma'il raised the Kaaba (2:127); Hajar ran back and forth between as-Safa and al-Marwah in search of water until the spring of Zamzam gushed forth (Sahih al-Bukhari 3364). Whoever makes pilgrimage retraces their path — in simple, identical clothing, side by side with people from all over the world.",
            tr: "Menasikin çoğu Hz. İbrahim'in ailesini hatırlatır: Hz. İbrahim ve Hz. İsmail Kâbe'yi inşa etti (2:127); Hz. Hâcer su ararken Safa ile Merve arasında koştu ve sonunda Zemzem fışkırdı (Buhârî 3364). Hacı onların yolunu yeniden yürür — sade ve aynı kıyafetlerle, dünyanın dört bir yanından insanlarla yan yana.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Für wen ist der Hadsch Pflicht?', en: 'For whom is Hajj obligatory?', tr: 'Hac kimlere farzdır?' },
        },
        {
          type: 'list',
          items: [
            { de: "Muslim, mündig (nach der Pubertät) und geistig gesund", en: "Muslim, adult (past puberty) and of sound mind", tr: "Müslüman, ergen (buluğ çağına ermiş) ve akıllı olmak" },
            { de: "körperlich in der Lage, die Reise und die Riten zu bewältigen", en: "physically able to manage the journey and the rites", tr: "Yolculuğa ve menasike bedenen gücü yetmek" },
            { de: "finanziell in der Lage: Reise und Aufenthalt bezahlen können, nachdem Schulden und der Unterhalt der Familie während der Abwesenheit gesichert sind", en: "financially able: able to pay for travel and stay after debts and the family's maintenance during one's absence are secured", tr: "Maddi güç: borçlar ve yokluk süresince ailenin geçimi karşılandıktan sonra yolculuk ve konaklama masraflarını ödeyebilmek" },
            { de: "ein sicherer Weg — und für Frauen nach mehreren Rechtsschulen eine geeignete Begleitung (Lektion 2)", en: "a safe route — and for women, according to several schools, suitable accompaniment (lesson 2)", tr: "Yol güvenliği — ve birçok mezhebe göre kadınlar için uygun bir refakat (2. ders)" },
          ],
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 1337',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "„O ihr Menschen, Allah hat euch den Hadsch vorgeschrieben, so vollzieht den Hadsch.“ Ein Mann fragte: „Jedes Jahr, o Gesandter Allahs?“ … Er sagte: „Hätte ich ja gesagt, wäre es Pflicht geworden, und ihr hättet es nicht vermocht.“ (Auszug)",
            en: "“O people, Allah has prescribed Hajj for you, so perform Hajj.” A man asked: “Every year, O Messenger of Allah?” … He said: “Had I said yes, it would have become obligatory, and you would not have been able to do it.” (excerpt)",
            tr: "“Ey insanlar! Allah size haccı farz kıldı; haccedin.” Bir adam “Her yıl mı, ey Allah'ın Resulü?” diye sordu … Buyurdu: “Evet deseydim farz olurdu ve siz buna güç yetiremezdiniz.” (özet)",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Der Hadsch ist einmal im Leben Pflicht. Ob man ihn, sobald man fähig ist, **sofort** antreten muss, beurteilen die Schulen unterschiedlich: nach Mehrheit (u. a. Malikiten, Hanbaliten und der bekannten hanafitischen Lehre) ja; nach schafi'itischer Lehre darf man ihn aufschieben, es wird aber empfohlen, ihn nicht zu verzögern. Auch die **Umra** wird verschieden eingestuft: nach Schafi'iten und Hanbaliten einmal im Leben Pflicht, nach Hanafiten und Malikiten eine stark betonte Sunna.",
            en: "Hajj is obligatory once in a lifetime. Whether one must undertake it **immediately** once able is judged differently: according to the majority (including Malikis, Hanbalis and the well-known Hanafi position) yes; according to the Shafi'i school it may be postponed, though it is recommended not to delay it. **Umrah** is also classified differently: obligatory once in a lifetime for Shafi'is and Hanbalis, a strongly emphasised sunnah for Hanafis and Malikis.",
            tr: "Hac ömürde bir kez farzdır. Gücü yeten kişinin onu **hemen** yapması gerekip gerekmediği farklı değerlendirilir: çoğunluğa göre (Mâlikî, Hanbelî ve meşhur Hanefî görüşü) evet; Şâfiîlere göre ertelenebilir, ancak geciktirmemek tavsiye edilir. **Umre** de farklı değerlendirilir: Şâfiî ve Hanbelîlere göre ömürde bir kez farz, Hanefî ve Mâlikîlere göre sünnet-i müekkededir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Der Lohn', en: 'The reward', tr: 'Mükâfatı' },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1521, Sahih Muslim 1350',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Wer den Hadsch vollzieht und dabei weder Unanständiges begeht noch frevelt, der kehrt zurück wie an dem Tag, an dem seine Mutter ihn gebar.",
            en: "Whoever performs Hajj and does not commit obscenity or wrongdoing returns like the day his mother gave birth to him.",
            tr: "Kim hacceder de kötü söz ve davranışlarda bulunmaz, günaha dalmazsa annesinden doğduğu günkü gibi (günahsız) döner.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1773, Sahih Muslim 1349',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Eine Umra bis zur nächsten ist eine Sühne für das, was zwischen ihnen liegt, und der angenommene Hadsch (al-hadsch al-mabrur) hat keinen anderen Lohn als das Paradies.",
            en: "One Umrah to the next is an expiation for what is between them, and an accepted Hajj (al-hajj al-mabrur) has no reward other than Paradise.",
            tr: "Bir umre, diğer umreye kadar aradaki günahlara keffarettir. Makbul haccın (hacc-ı mebrûr) karşılığı ise ancak cennettir.",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Noch nicht auf dem Weg? Die ersten zehn Tage des Dhu l-Hiddscha sind für alle besonders gesegnet: „Keine Taten an anderen Tagen sind vorzüglicher als an diesen“ (Sahih al-Bukhari 969). Wer nicht pilgert, kann am Tag von Arafa fasten (Sahih Muslim 1162) und am Opferfest teilnehmen.",
            en: "Not on the way yet? The first ten days of Dhul-Hijjah are especially blessed for everyone: “No deeds on other days are better than on these” (Sahih al-Bukhari 969). Those not on pilgrimage can fast on the Day of Arafah (Sahih Muslim 1162) and take part in the Festival of Sacrifice.",
            tr: "Henüz yola çıkmadın mı? Zilhicce'nin ilk on günü herkes için faziletlidir: “Başka günlerde yapılan ameller bu günlerde yapılanlardan daha faziletli değildir” (Buhârî 969). Hacca gitmeyenler Arefe günü oruç tutabilir (Müslim 1162) ve Kurban Bayramı'na katılabilir.",
          },
        },
        { type: 'link', to: '/calendar', label: { de: 'Dhu l-Hiddscha im Kalender', en: 'Dhul-Hijjah in the calendar', tr: 'Takvimde Zilhicce' } },
        { type: 'terms', ids: ['hajj', 'umrah', 'kaaba', 'mecca', 'hajj-mabrur', 'dhul-hijja', 'zamzam'] },
      ],
      quiz: [
        {
          question: {
            de: "Für wen ist der Hadsch nach Koran 3:97 Pflicht?",
            en: "For whom is Hajj obligatory according to Quran 3:97?",
            tr: "Âl-i İmrân 3:97'ye göre hac kimlere farzdır?",
          },
          options: [
            { de: "Für jeden, der dazu einen Weg zu finden vermag", en: "For whoever is able to find a way there", tr: "Yoluna gücü yetenlere" },
            { de: "Nur für Bewohner Mekkas", en: "Only for the inhabitants of Mecca", tr: "Yalnızca Mekke'de oturanlara" },
            { de: "Für alle, auch ohne Mittel", en: "For everyone, even without means", tr: "İmkânı olmayanlar dahil herkese" },
          ],
          answer: 0,
          explanation: {
            de: "Die Pflicht hängt von der Fähigkeit (Istita'a) ab: körperlich, finanziell und ein sicherer Weg.",
            en: "The obligation depends on ability (istita'ah): physical, financial and a safe route.",
            tr: "Farziyet istitaate bağlıdır: bedenî ve maddi güç ile yol güvenliği.",
          },
        },
        {
          question: {
            de: "Wie oft ist der Hadsch Pflicht?",
            en: "How often is Hajj obligatory?",
            tr: "Hac kaç kez farzdır?",
          },
          options: [
            { de: "Jedes Jahr", en: "Every year", tr: "Her yıl" },
            { de: "Einmal im Leben", en: "Once in a lifetime", tr: "Ömürde bir kez" },
            { de: "Alle zehn Jahre", en: "Every ten years", tr: "On yılda bir" },
          ],
          answer: 1,
          explanation: {
            de: "Nach Sahih Muslim 1337 hätte ein „Ja“ auf die Frage „Jedes Jahr?“ eine unerfüllbare Pflicht geschaffen — einmal im Leben genügt.",
            en: "According to Sahih Muslim 1337, a “yes” to “Every year?” would have created an impossible duty — once in a lifetime suffices.",
            tr: "Müslim 1337'ye göre “Her yıl mı?” sorusuna “evet” cevabı yerine getirilemez bir yükümlülük doğururdu — ömürde bir kez yeterlidir.",
          },
        },
        {
          question: {
            de: "Welchen Lohn nennt der Prophet ﷺ für den angenommenen Hadsch (Bukhari 1773)?",
            en: "What reward does the Prophet ﷺ name for an accepted Hajj (Bukhari 1773)?",
            tr: "Peygamber ﷺ makbul hac için hangi mükâfatı bildirir (Buhârî 1773)?",
          },
          options: [
            { de: "Reichtum im Diesseits", en: "Wealth in this world", tr: "Dünyada zenginlik" },
            { de: "Das Paradies", en: "Paradise", tr: "Cennet" },
            { de: "Einen Ehrentitel", en: "An honorary title", tr: "Bir unvan" },
          ],
          answer: 1,
          explanation: {
            de: "„… der angenommene Hadsch hat keinen anderen Lohn als das Paradies.“",
            en: "“… an accepted Hajj has no reward other than Paradise.”",
            tr: "“… Makbul haccın karşılığı ancak cennettir.”",
          },
        },
      ],
      sources: [
        'Quran 3:96-97, 22:27, 2:127',
        'Sahih al-Bukhari 3364',
        'Sahih Muslim 1337',
        'Sahih al-Bukhari 1521, Sahih Muslim 1350',
        'Sahih al-Bukhari 1773, Sahih Muslim 1349',
        'Sahih al-Bukhari 969, Sahih Muslim 1162',
        'Fiqh-Positionen (Sofortigkeit, Status der Umra): Standardwerke der vier Rechtsschulen, z. B. Ibn Qudama: al-Mughni; an-Nawawi: al-Majmu\'',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 2 ───────────────────────────────────────────────────────────
    {
      id: 'preparation',
      title: {
        de: 'Vorbereitung: Herz, Geld, Gesundheit, Begleitung',
        en: 'Preparation: heart, money, health, companions',
        tr: 'Hazırlık: kalp, para, sağlık, refakat',
      },
      summary: {
        de: "Was vor der Reise zu klären ist — Absicht, erlaubte Mittel, Schulden, Gesundheit, die Frage des Mahram — mit einer praktischen Checkliste.",
        en: "What to sort out before the journey — intention, lawful funds, debts, health, the question of a mahram — with a practical checklist.",
        tr: "Yolculuktan önce yapılması gerekenler — niyet, helal kazanç, borçlar, sağlık, mahrem meselesi — pratik bir kontrol listesiyle.",
      },
      minutes: 6,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Die Pilgerfahrt beginnt lange vor dem Abflug. Die Gelehrten betonen: Wer gut vorbereitet ist, kann sich vor Ort auf das Wesentliche konzentrieren — auf Allah.",
            en: "The pilgrimage begins long before the flight. Scholars stress: whoever is well prepared can focus on what matters on site — on Allah.",
            tr: "Hac, uçağa binmeden çok önce başlar. Âlimler şunu vurgular: İyi hazırlanan kişi orada asıl önemli olana — Allah'a — odaklanabilir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Absicht und Aufrichtigkeit', en: 'Intention and sincerity', tr: 'Niyet ve ihlas' },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1, Sahih Muslim 1907',
          narrator: "'Umar ibn al-Khattab",
          grade: 'sahih',
          text: {
            de: "Die Taten sind nur gemäß den Absichten, und jedem Menschen steht nur das zu, was er beabsichtigt hat …",
            en: "Actions are only by intentions, and every person will have only what they intended …",
            tr: "Ameller ancak niyetlere göredir. Herkese yalnızca niyet ettiği şey vardır …",
          },
        },
        {
          type: 'quran',
          ref: '2:197',
          arabic: 'وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ',
          translation: {
            de: "… Und versorgt euch mit Proviant; doch der beste Proviant ist die Gottesfurcht. Und fürchtet Mich, o die ihr Verstand besitzt!",
            en: "… And take provisions, but indeed the best provision is God-consciousness. So fear Me, O you of understanding.",
            tr: "… Azık edinin. Şüphesiz azığın en hayırlısı takvadır. Ey akıl sahipleri, bana karşı gelmekten sakının!",
          },
        },
        {
          type: 'heading',
          text: { de: 'Finanzen', en: 'Finances', tr: 'Maddi hazırlık' },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 1015',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "O ihr Menschen, Allah ist gut und nimmt nur Gutes an … (Auszug)",
            en: "O people, Allah is good and accepts only what is good … (excerpt)",
            tr: "Ey insanlar! Allah temizdir, yalnızca temiz olanı kabul eder … (özet)",
          },
        },
        {
          type: 'list',
          items: [
            { de: "Die Reise mit **erlaubt (halal) erworbenem** Geld bezahlen.", en: "Pay for the journey with **lawfully (halal) earned** money.", tr: "Yolculuğu **helal kazançla** karşıla." },
            { de: "**Schulden** begleichen oder mit den Gläubigern eine Regelung vereinbaren.", en: "Settle **debts** or agree an arrangement with creditors.", tr: "**Borçları** öde veya alacaklılarla anlaş." },
            { de: "Den **Unterhalt der Familie** für die Zeit der Abwesenheit sichern.", en: "Secure the **family's maintenance** for the time you are away.", tr: "Yokluğun süresince **ailenin geçimini** güvenceye al." },
            { de: "Gesamtkosten realistisch planen — inkl. Opfertier (bei Tamattu' und Qiran) und einer Reserve.", en: "Plan total costs realistically — including the sacrificial animal (for tamattu' and qiran) and a reserve.", tr: "Toplam masrafı gerçekçi planla — kurban (temettu ve kıranda) ve yedek para dahil." },
            { de: "Nur über **zugelassene Anbieter** bzw. die offiziellen Kanäle buchen; der Hadsch erfordert eine offizielle Genehmigung der saudischen Behörden.", en: "Book only through **licensed operators** or official channels; Hajj requires an official permit from the Saudi authorities.", tr: "Yalnızca **yetkili kuruluşlar** veya resmî kanallar üzerinden kayıt yaptır; hac için Suudi makamlarından resmî izin gerekir." },
          ],
        },
        {
          type: 'heading',
          text: { de: 'Gesundheit', en: 'Health', tr: 'Sağlık' },
        },
        {
          type: 'list',
          items: [
            { de: "Ärztlicher Check-up rechtzeitig vor der Reise; Medikamente mit Rezept bzw. ärztlicher Bescheinigung mitnehmen.", en: "A medical check-up well before the journey; carry medication with prescriptions or a doctor's certificate.", tr: "Yolculuktan yeterince önce sağlık kontrolü; ilaçları reçete veya doktor raporuyla birlikte götür." },
            { de: "Vorgeschriebene Impfungen (für den Hadsch u. a. gegen Meningokokken) — aktuelle Vorgaben beim Anbieter und ärztlich erfragen.", en: "Required vaccinations (for Hajj, among others, against meningococcal disease) — check current requirements with your operator and doctor.", tr: "Zorunlu aşılar (hac için diğerlerinin yanı sıra menenjit aşısı) — güncel şartları kurumuna ve doktoruna sor." },
            { de: "Ausdauer trainieren: Täglich viele Kilometer zu Fuß sind normal. Bequeme, eingelaufene Sandalen.", en: "Build stamina: walking many kilometres a day is normal. Comfortable, broken-in sandals.", tr: "Dayanıklılık kazan: Günde kilometrelerce yürümek olağandır. Rahat, alışılmış sandaletler." },
            { de: "Hitze ernst nehmen: viel trinken, Schatten und Schirm, unparfümierte Sonnencreme.", en: "Take the heat seriously: drink plenty, shade and an umbrella, unscented sunscreen.", tr: "Sıcağı ciddiye al: bol su, gölge ve şemsiye, kokusuz güneş kremi." },
          ],
        },
        {
          type: 'heading',
          text: { de: 'Begleitung (Mahram)', en: 'Companionship (mahram)', tr: 'Refakat (mahrem)' },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1862, Sahih Muslim 1341',
          narrator: "'Abdullah ibn 'Abbas",
          grade: 'sahih',
          text: {
            de: "„Eine Frau soll nur mit einem Mahram reisen …“ Ein Mann sagte: „O Gesandter Allahs, meine Frau ist zum Hadsch aufgebrochen, und ich bin für diesen und jenen Feldzug eingetragen.“ Er sagte: „Geh und vollziehe den Hadsch mit deiner Frau.“ (Auszug)",
            en: "“A woman should not travel except with a mahram …” A man said: “O Messenger of Allah, my wife has set out for Hajj, and I have been enlisted for such-and-such an expedition.” He said: “Go and perform Hajj with your wife.” (excerpt)",
            tr: "“Kadın ancak bir mahremiyle yolculuk yapsın …” Bir adam: “Ey Allah'ın Resulü! Hanımım hacca çıktı, ben de şu gazveye yazıldım” dedi. Buyurdu: “Git, hanımınla birlikte haccet.” (özet)",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Nach hanafitischer und hanbalitischer Lehre ist für eine Frau ein Mahram (oder der Ehemann) Voraussetzung dafür, dass der Hadsch für sie verpflichtend ist, wenn die Strecke eine Reisedistanz erreicht. Nach schafi'itischer und malikitischer Lehre genügt für den Pflicht-Hadsch eine sichere, vertrauenswürdige Reisegruppe (z. B. mit anderen Frauen). Die Einreisebestimmungen der saudischen Behörden haben sich in den letzten Jahren geändert — aktuelle Regeln beim Anbieter erfragen und die religiöse Frage mit einer kundigen Person der eigenen Rechtsschule klären.",
            en: "According to the Hanafi and Hanbali schools, a mahram (or husband) is a precondition for Hajj to be obligatory for a woman when the distance reaches travel distance. According to the Shafi'i and Maliki schools, a safe, trustworthy travel group (e.g. with other women) suffices for the obligatory Hajj. Saudi entry rules have changed in recent years — check current rules with your operator and clarify the religious question with a knowledgeable person of your own school.",
            tr: "Hanefî ve Hanbelîlere göre yolculuk mesafesi söz konusu olduğunda kadına haccın farz olması için mahrem (veya eş) şarttır. Şâfiî ve Mâlikîlere göre farz hac için güvenilir bir yol arkadaşlığı (ör. başka kadınlarla) yeterlidir. Suudi makamlarının giriş kuralları son yıllarda değişti — güncel kuralları kurumuna sor, dinî meseleyi kendi mezhebinden ehil birine danış.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Wissen und Beziehungen', en: 'Knowledge and relationships', tr: 'Bilgi ve ilişkiler' },
        },
        {
          type: 'list',
          items: [
            { de: "Die Riten vorher lernen — diesen Pfad, die Seminare der Gruppe, die wichtigsten Bittgebete und die Talbiya.", en: "Learn the rites beforehand — this path, your group's seminars, the key supplications and the talbiyah.", tr: "Menasiki önceden öğren — bu yol, kafilenin seminerleri, temel dualar ve telbiye." },
            { de: "Menschen um Verzeihung bitten, Streit beilegen, Anvertrautes zurückgeben.", en: "Ask people for forgiveness, settle disputes, return what was entrusted to you.", tr: "İnsanlardan helallik iste, küslükleri gider, emanetleri iade et." },
            { de: "Ein Testament (Wasiyya) aufsetzen bzw. aktualisieren.", en: "Draw up or update a will (wasiyyah).", tr: "Vasiyetini yaz veya güncelle." },
            { de: "Geduld einüben: Warteschlangen, Hitze und Menschenmengen gehören dazu.", en: "Practise patience: queues, heat and crowds are part of it.", tr: "Sabrı öğren: Kuyruklar, sıcak ve kalabalık işin parçasıdır." },
          ],
        },
        {
          type: 'heading',
          text: { de: 'Checkliste zum Packen', en: 'Packing checklist', tr: 'Bavul kontrol listesi' },
        },
        {
          type: 'list',
          items: [
            { de: "Reisepass, Visum/Genehmigung, Impfnachweise, Kopien aller Dokumente", en: "Passport, visa/permit, vaccination records, copies of all documents", tr: "Pasaport, vize/izin, aşı belgeleri, tüm belgelerin kopyaları" },
            { de: "Für Männer: zwei Ihram-Tücher (besser zwei Sets), Gürtel mit Tasche; für Frauen: schlichte, weite Kleidung", en: "For men: two ihram cloths (preferably two sets), belt with pouch; for women: simple, loose clothing", tr: "Erkekler için: iki parça ihram (tercihen iki takım), cepli kemer; kadınlar için: sade, bol kıyafetler" },
            { de: "Sandalen, unparfümierte Seife, Deo und Sonnencreme", en: "Sandals, unscented soap, deodorant and sunscreen", tr: "Sandalet, kokusuz sabun, deodorant ve güneş kremi" },
            { de: "Medikamente, Pflaster, Rezepte", en: "Medication, plasters, prescriptions", tr: "İlaçlar, yara bandı, reçeteler" },
            { de: "Kleiner Rucksack, Trinkflasche, Schirm, kleiner Gebetsteppich", en: "Small backpack, water bottle, umbrella, small prayer mat", tr: "Küçük sırt çantası, su şişesi, şemsiye, küçük seccade" },
            { de: "Koran bzw. Bittgebetsbüchlein (oder App), Kontaktnummern der Gruppe, Bargeld und Karte", en: "Quran or supplication booklet (or app), group contact numbers, cash and card", tr: "Kur'an veya dua kitapçığı (ya da uygulama), kafile iletişim numaraları, nakit ve kart" },
          ],
        },
        { type: 'link', to: '/dua', label: { de: 'Bittgebete für die Reise', en: 'Supplications for the journey', tr: 'Yolculuk duaları' } },
        { type: 'terms', ids: ['niyyah', 'ikhlas', 'mahram', 'halal', 'taqwa', 'hajj-mabrur'] },
      ],
      quiz: [
        {
          question: {
            de: "Was ist nach Koran 2:197 der beste Proviant?",
            en: "According to Quran 2:197, what is the best provision?",
            tr: "Bakara 2:197'ye göre azığın en hayırlısı nedir?",
          },
          options: [
            { de: "Viel Geld", en: "Plenty of money", tr: "Çok para" },
            { de: "Gottesfurcht (Taqwa)", en: "God-consciousness (taqwa)", tr: "Takva" },
            { de: "Gutes Essen", en: "Good food", tr: "Güzel yiyecekler" },
          ],
          answer: 1,
          explanation: {
            de: "Praktischer Proviant ist wichtig — doch der beste Proviant ist die Taqwa.",
            en: "Practical provisions matter — but the best provision is taqwa.",
            tr: "Maddi azık önemlidir — ama azığın en hayırlısı takvadır.",
          },
        },
        {
          question: {
            de: "Was lehrt Sahih Muslim 1015 für die Finanzierung der Pilgerfahrt?",
            en: "What does Sahih Muslim 1015 teach about financing the pilgrimage?",
            tr: "Müslim 1015 haccın finansmanı hakkında ne öğretir?",
          },
          options: [
            { de: "Allah nimmt nur Gutes an — also mit erlaubtem Geld pilgern", en: "Allah accepts only what is good — so travel with lawful money", tr: "Allah yalnızca temiz olanı kabul eder — helal parayla haccedilmeli" },
            { de: "Die Herkunft des Geldes spielt keine Rolle", en: "The origin of the money does not matter", tr: "Paranın kaynağı önemli değildir" },
            { de: "Man sollte Schulden für den Hadsch aufnehmen", en: "One should take on debt for Hajj", tr: "Hac için borçlanmak gerekir" },
          ],
          answer: 0,
          explanation: {
            de: "„Allah ist gut und nimmt nur Gutes an.“ Erlaubt erworbenes Geld gehört zur Vorbereitung.",
            en: "“Allah is good and accepts only what is good.” Lawfully earned money is part of the preparation.",
            tr: "“Allah temizdir, yalnızca temiz olanı kabul eder.” Helal kazanç hazırlığın parçasıdır.",
          },
        },
        {
          question: {
            de: "Was genügt nach schafi'itischer und malikitischer Lehre einer Frau für den Pflicht-Hadsch, wenn kein Mahram mitreist?",
            en: "According to the Shafi'i and Maliki schools, what suffices for a woman for the obligatory Hajj if no mahram travels with her?",
            tr: "Şâfiî ve Mâlikîlere göre mahremi olmayan bir kadın için farz hacda ne yeterlidir?",
          },
          options: [
            { de: "Nichts — sie darf nie reisen", en: "Nothing — she may never travel", tr: "Hiçbir şey — asla yolculuk yapamaz" },
            { de: "Eine sichere, vertrauenswürdige Reisegruppe", en: "A safe, trustworthy travel group", tr: "Güvenilir bir yol arkadaşlığı (kafile)" },
            { de: "Eine Erlaubnis des Reisebüros genügt religiös in jedem Fall", en: "A travel agency's permission always suffices religiously", tr: "Seyahat acentesinin izni dinen her durumda yeterlidir" },
          ],
          answer: 1,
          explanation: {
            de: "Hanafiten und Hanbaliten verlangen einen Mahram; Schafi'iten und Malikiten lassen für den Pflicht-Hadsch eine sichere Gruppe genügen.",
            en: "Hanafis and Hanbalis require a mahram; Shafi'is and Malikis accept a safe group for the obligatory Hajj.",
            tr: "Hanefî ve Hanbelîler mahrem şart koşar; Şâfiî ve Mâlikîler farz hac için güvenilir bir kafileyi yeterli görür.",
          },
        },
      ],
      sources: [
        'Quran 2:197',
        'Sahih al-Bukhari 1, Sahih Muslim 1907',
        'Sahih Muslim 1015',
        'Sahih al-Bukhari 1862, Sahih Muslim 1341',
        'Mahram-Frage: Standardwerke der vier Rechtsschulen (z. B. Ibn Qudama: al-Mughni; an-Nawawi: al-Majmu\')',
        'Impf- und Einreisevorgaben: jeweils aktuelle Bestimmungen der saudischen Behörden (ändern sich regelmäßig)',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 3 ───────────────────────────────────────────────────────────
    {
      id: 'ihram-and-miqat',
      title: {
        de: 'Ihram, Miqat und die Verbote',
        en: 'Ihram, miqat and the prohibitions',
        tr: 'İhram, mîkat ve yasaklar',
      },
      summary: {
        de: "Wo und wie man in den Weihezustand eintritt, was man trägt, was die Talbiya bedeutet und was im Ihram verboten ist.",
        en: "Where and how to enter the sacred state, what to wear, what the talbiyah means and what is forbidden in ihram.",
        tr: "İhrama nerede ve nasıl girilir, ne giyilir, telbiye ne anlama gelir ve ihramda neler yasaktır.",
      },
      minutes: 6,
      blocks: [
        {
          type: 'text',
          text: {
            de: "**Ihram** ist nicht in erster Linie Kleidung, sondern ein Zustand: Mit der **Absicht** für Umra oder Hadsch und der **Talbiya** tritt der Pilger in eine Zeit besonderer Hingabe ein, in der bestimmte sonst erlaubte Dinge verboten sind. Die schlichten Tücher der Männer erinnern daran, dass vor Allah alle gleich sind.",
            en: "**Ihram** is not primarily clothing but a state: with the **intention** for Umrah or Hajj and the **talbiyah**, the pilgrim enters a time of special devotion in which certain otherwise permitted things are forbidden. The simple cloths of the men are a reminder that all are equal before Allah.",
            tr: "**İhram** öncelikle bir kıyafet değil, bir hâldir: Umre veya hac **niyeti** ve **telbiye** ile hacı, normalde helal olan bazı şeylerin yasaklandığı özel bir ibadet dönemine girer. Erkeklerin sade örtüleri, Allah katında herkesin eşit olduğunu hatırlatır.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Miqat-Orte', en: 'The miqat points', tr: 'Mîkat yerleri' },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1524, Sahih Muslim 1181',
          narrator: "'Abdullah ibn 'Abbas",
          grade: 'sahih',
          text: {
            de: "Der Prophet ﷺ bestimmte für die Leute von Medina Dhu l-Hulaifa, für die Leute von asch-Scham al-Dschuhfa, für die Leute des Nadschd Qarn al-Manazil und für die Leute des Jemen Yalamlam. Sie gelten für sie und für jeden, der von anderswo an ihnen vorbeikommt und Hadsch oder Umra beabsichtigt … (Auszug)",
            en: "The Prophet ﷺ appointed Dhul-Hulayfah for the people of Medina, al-Juhfah for the people of ash-Sham, Qarn al-Manazil for the people of Najd and Yalamlam for the people of Yemen. They are for them and for everyone who passes them from elsewhere intending Hajj or Umrah … (excerpt)",
            tr: "Peygamber ﷺ Medineliler için Zülhuleyfe'yi, Şamlılar için Cuhfe'yi, Necidliler için Karnü'l-Menâzil'i ve Yemenliler için Yelemlem'i mîkat olarak belirledi. Bunlar hem oranın ahalisi hem de başka yerlerden gelip hac veya umre niyetiyle buralardan geçenler içindir … (özet)",
          },
        },
        {
          type: 'list',
          items: [
            { de: "**Dhu l-Hulaifa** (heute Abyar 'Ali) — für Reisende aus Medina", en: "**Dhul-Hulayfah** (today Abyar 'Ali) — for travellers from Medina", tr: "**Zülhuleyfe** (bugün Ebyâr-ı Ali) — Medine'den gelenler için" },
            { de: "**al-Dschuhfa** (bei Rabigh) — für Reisende aus Richtung Syrien, Ägypten, Nordafrika", en: "**al-Juhfah** (near Rabigh) — for travellers from the direction of Syria, Egypt, North Africa", tr: "**Cuhfe** (Râbiğ yakınında) — Suriye, Mısır, Kuzey Afrika yönünden gelenler için" },
            { de: "**Qarn al-Manazil** (as-Sail al-Kabir) — für Reisende aus dem Nadschd und über Ta'if", en: "**Qarn al-Manazil** (as-Sayl al-Kabir) — for travellers from Najd and via Ta'if", tr: "**Karnü'l-Menâzil** (es-Seylü'l-Kebîr) — Necid ve Taif yönünden gelenler için" },
            { de: "**Yalamlam** — für Reisende aus dem Jemen und dem Süden", en: "**Yalamlam** — for travellers from Yemen and the south", tr: "**Yelemlem** — Yemen ve güney yönünden gelenler için" },
            { de: "**Dhat 'Irq** — für Reisende aus dem Irak (nach Überlieferung von 'Umar festgelegt, Sahih al-Bukhari 1531)", en: "**Dhat 'Irq** — for travellers from Iraq (set according to transmission by 'Umar, Sahih al-Bukhari 1531)", tr: "**Zâtüırk** — Irak yönünden gelenler için (rivayete göre Hz. Ömer belirlemiştir, Buhârî 1531)" },
          ],
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Wer fliegt, überquert die Miqat-Linie meist in der Luft. Die Mehrheit der Gelehrten verlangt, den Ihram vor dem Überfliegen anzulegen — deshalb ziehen viele Pilger die Ihram-Kleidung schon vor dem Abflug oder im Flugzeug an und fassen die Absicht, wenn die Crew den Miqat ankündigt. Einige zeitgenössische Gelehrte und Gremien betrachten Dschidda als Miqat für Flugreisende, die dort landen; andere lehnen dies ab. Am besten folgt man der Anleitung der eigenen Gruppe.",
            en: "Those who fly usually cross the miqat line in the air. The majority of scholars require entering ihram before flying over it — so many pilgrims put on ihram clothing before departure or on the plane and make the intention when the crew announces the miqat. Some contemporary scholars and councils regard Jeddah as a miqat for air travellers landing there; others reject this. It is best to follow your group's guidance.",
            tr: "Uçakla gidenler mîkat sınırını genellikle havada geçer. Âlimlerin çoğunluğu bu sınır geçilmeden ihrama girilmesini şart koşar — bu yüzden birçok hacı ihram kıyafetini kalkıştan önce veya uçakta giyer ve mürettebat mîkatı duyurduğunda niyet eder. Bazı çağdaş âlim ve kurullar Cidde'yi oraya inen yolcular için mîkat sayar; diğerleri bunu kabul etmez. En iyisi kafilenin rehberliğine uymaktır.",
          },
        },
        {
          type: 'heading',
          text: { de: 'In den Ihram treten', en: 'Entering ihram', tr: 'İhrama girmek' },
        },
        {
          type: 'list',
          items: [
            { de: "Vorher Nägel schneiden und Körperpflege erledigen (empfohlen).", en: "Trim nails and attend to personal grooming beforehand (recommended).", tr: "Önceden tırnakları kesip vücut temizliğini yapmak (müstehap)." },
            { de: "Ganzkörperwaschung (Ghusl) — Sunna, auch für menstruierende Frauen.", en: "Full-body wash (ghusl) — sunnah, also for menstruating women.", tr: "Gusül — sünnettir, hayızlı kadınlar için de." },
            { de: "Männer dürfen den Körper (nicht die Ihram-Kleidung) vor dem Ihram parfümieren (Sahih al-Bukhari 1539).", en: "Men may perfume the body (not the ihram clothing) before ihram (Sahih al-Bukhari 1539).", tr: "Erkekler ihramdan önce bedenlerine (ihram örtüsüne değil) koku sürebilir (Buhârî 1539)." },
            { de: "Ihram-Kleidung anlegen; viele beten zwei Rak'a (s. Hinweis unten).", en: "Put on ihram clothing; many pray two rak'ahs (see note below).", tr: "İhram kıyafetini giymek; birçoğu iki rekât namaz kılar (aşağıdaki nota bak)." },
            { de: "Die Absicht fassen, z. B. „Labbaika 'umratan“ (für die Umra) oder „Labbaika hadschdschan“ (für den Hadsch) — und die Talbiya sprechen.", en: "Make the intention, e.g. “Labbayka 'umratan” (for Umrah) or “Labbayka hajjan” (for Hajj) — and recite the talbiyah.", tr: "Niyet etmek, ör. “Lebbeyke umraten” (umre için) veya “Lebbeyke haccen” (hac için) — ve telbiye getirmek." },
          ],
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1549, Sahih Muslim 1184',
          narrator: "'Abdullah ibn 'Umar",
          grade: 'sahih',
          arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
          text: {
            de: "(Die Talbiya des Propheten ﷺ:) „Hier bin ich, o Allah, hier bin ich. Hier bin ich, Du hast keinen Teilhaber, hier bin ich. Gewiss, das Lob und die Gnade gehören Dir und die Herrschaft. Du hast keinen Teilhaber.“",
            en: "(The talbiyah of the Prophet ﷺ:) “Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Indeed, all praise and blessings are Yours, and all sovereignty. You have no partner.”",
            tr: "(Peygamber'in ﷺ telbiyesi:) “Buyur Allah'ım, buyur! Buyur, Senin ortağın yoktur, buyur! Hamd de nimet de Senindir, mülk de. Senin ortağın yoktur.”",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Kleidung', en: 'The clothing', tr: 'Kıyafet' },
        },
        {
          type: 'text',
          text: {
            de: "**Männer** tragen zwei ungenähte Tücher — eines um die Hüfte (Izar), eines über den Schultern (Rida') —, keine Kopfbedeckung und keine dem Körper nachgeschneiderte Kleidung; dazu Sandalen. **Frauen** tragen ihre gewohnte, weite und bedeckende Kleidung in beliebiger Farbe, aber keinen Gesichtsschleier (Niqab) und keine Handschuhe.",
            en: "**Men** wear two unstitched cloths — one around the waist (izar), one over the shoulders (rida') — no head covering and no clothing tailored to the body; plus sandals. **Women** wear their usual loose, covering clothing in any colour, but no face veil (niqab) and no gloves.",
            tr: "**Erkekler** iki parça dikişsiz örtü giyer — biri belden aşağı (izar), diğeri omuzlara (rida) —, başlarını örtmez ve vücuda göre dikilmiş elbise giymezler; ayaklarında sandalet olur. **Kadınlar** her renkten olabilen, bol ve örtünen normal kıyafetlerini giyer; ancak peçe (nikap) ve eldiven takmazlar.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1838',
          narrator: "'Abdullah ibn 'Umar",
          grade: 'sahih',
          text: {
            de: "… Die Frau im Ihram soll keinen Gesichtsschleier und keine Handschuhe tragen. (Auszug)",
            en: "… The woman in ihram should not wear a face veil or gloves. (excerpt)",
            tr: "… İhramlı kadın peçe ve eldiven giymesin. (özet)",
          },
        },
        {
          type: 'heading',
          text: { de: 'Was im Ihram verboten ist', en: 'What is forbidden in ihram', tr: 'İhram yasakları' },
        },
        {
          type: 'quran',
          ref: '2:197',
          arabic: 'فَلَا رَفَثَ وَلَا فُسُوقَ وَلَا جِدَالَ فِي الْحَجِّ',
          translation: {
            de: "Die Pilgerfahrt findet in bekannten Monaten statt. Wer sich in ihnen die Pilgerfahrt auferlegt, für den gibt es während der Pilgerfahrt weder Beischlaf noch Frevel noch Streiterei …",
            en: "Hajj is (during) well-known months. Whoever undertakes Hajj in them — there is to be no sexual relations, no disobedience and no disputing during Hajj …",
            tr: "Hac bilinen aylardadır. Kim o aylarda haccı kendine farz kılarsa, artık hacda kadına yaklaşmak, günaha sapmak ve kavga etmek yoktur …",
          },
        },
        {
          type: 'list',
          items: [
            { de: "Haare oder Nägel entfernen", en: "Removing hair or nails", tr: "Saç, kıl veya tırnak gidermek" },
            { de: "Parfüm an Körper oder Kleidung, auch parfümierte Seife", en: "Perfume on body or clothing, including scented soap", tr: "Bedene veya elbiseye koku sürmek, kokulu sabun dahil" },
            { de: "Männer: genähte, körperförmige Kleidung und Kopfbedeckung; Frauen: Niqab und Handschuhe", en: "Men: stitched, body-shaped clothing and head covering; women: niqab and gloves", tr: "Erkekler: vücuda göre dikilmiş elbise ve başı örtmek; kadınlar: peçe ve eldiven" },
            { de: "Eheliche Beziehungen und alles, was dazu hinführt", en: "Marital relations and everything leading to them", tr: "Cinsel ilişki ve ona götüren davranışlar" },
            { de: "Jagd auf Landtiere (5:95); im heiligen Bezirk außerdem das Ausreißen von Pflanzen", en: "Hunting land animals (5:95); within the sacred precinct also uprooting plants", tr: "Kara hayvanı avlamak (5:95); Harem bölgesinde ayrıca bitki koparmak" },
            { de: "Streit, Beschimpfung und jede Sünde (2:197)", en: "Quarrelling, insults and every sin (2:197)", tr: "Kavga, sövme ve her türlü günah (2:197)" },
          ],
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Ob ein Ehevertrag im Ihram geschlossen werden darf, beurteilen die Schulen unterschiedlich (Mehrheit: nein, gestützt auf Sahih Muslim 1409; Hanafiten: der Vertrag ist gültig). Auch die Ausgleichsleistungen (Fidya) bei Verstößen — Fasten, Speisung Bedürftiger oder ein Opfertier (vgl. 2:196) — und ob ein Verstoß aus Vergesslichkeit oder Unwissen entschuldigt ist, regeln die Schulen im Detail unterschiedlich. Bei einem Versehen: Ruhe bewahren und den Gelehrten der Gruppe fragen.",
            en: "Whether a marriage contract may be concluded in ihram is judged differently (majority: no, based on Sahih Muslim 1409; Hanafis: the contract is valid). The compensations (fidyah) for violations — fasting, feeding the needy or a sacrificial animal (cf. 2:196) — and whether a violation out of forgetfulness or ignorance is excused are also regulated differently in detail. If a slip happens: stay calm and ask your group's scholar.",
            tr: "İhramlıyken nikâh akdi yapılıp yapılamayacağı farklı değerlendirilir (çoğunluk: hayır, Müslim 1409'a dayanarak; Hanefîler: akit geçerlidir). İhlallerde fidye — oruç, fakir doyurma veya kurban (bkz. 2:196) — ve unutarak ya da bilmeyerek yapılan ihlalin mazur sayılıp sayılmayacağı da mezheplerde ayrıntıda farklıdır. Bir hata olursa sakin ol ve kafilenin hocasına danış.",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Nach verbreiteter Ansicht erlaubt: Duschen ohne Parfüm, die Ihram-Tücher wechseln oder waschen, Schirm, Gürtel, Brille, Uhr und Geldbeutel.",
            en: "Commonly regarded as permitted: showering without perfume, changing or washing the ihram cloths, umbrella, belt, glasses, watch and wallet.",
            tr: "Yaygın görüşe göre caiz olanlar: kokusuz yıkanmak, ihram örtülerini değiştirmek veya yıkamak, şemsiye, kemer, gözlük, saat ve cüzdan.",
          },
        },
        { type: 'terms', ids: ['ihram', 'miqat', 'talbiya', 'niyyah', 'umrah', 'hajj'] },
      ],
      quiz: [
        {
          question: {
            de: "Womit tritt man in den Ihram ein?",
            en: "How does one enter ihram?",
            tr: "İhrama nasıl girilir?",
          },
          options: [
            { de: "Allein durch das Anziehen der Tücher", en: "Simply by putting on the cloths", tr: "Yalnızca örtüleri giyerek" },
            { de: "Durch die Absicht und die Talbiya", en: "Through the intention and the talbiyah", tr: "Niyet ve telbiye ile" },
            { de: "Durch die Ankunft in Mekka", en: "By arriving in Mecca", tr: "Mekke'ye varmakla" },
          ],
          answer: 1,
          explanation: {
            de: "Die Kleidung allein macht noch keinen Ihram; entscheidend sind Absicht und Talbiya.",
            en: "Clothing alone does not make ihram; the intention and talbiyah are decisive.",
            tr: "Kıyafet tek başına ihram değildir; belirleyici olan niyet ve telbiyedir.",
          },
        },
        {
          question: {
            de: "Welcher Miqat gilt für Reisende aus Medina?",
            en: "Which miqat applies to travellers from Medina?",
            tr: "Medine'den gelenlerin mîkatı neresidir?",
          },
          options: [
            { de: "Yalamlam", en: "Yalamlam", tr: "Yelemlem" },
            { de: "Dhu l-Hulaifa", en: "Dhul-Hulayfah", tr: "Zülhuleyfe" },
            { de: "Qarn al-Manazil", en: "Qarn al-Manazil", tr: "Karnü'l-Menâzil" },
          ],
          answer: 1,
          explanation: {
            de: "Nach Bukhari 1524 bestimmte der Prophet ﷺ Dhu l-Hulaifa für die Leute von Medina.",
            en: "According to Bukhari 1524, the Prophet ﷺ appointed Dhul-Hulayfah for the people of Medina.",
            tr: "Buhârî 1524'e göre Peygamber ﷺ Medineliler için Zülhuleyfe'yi belirlemiştir.",
          },
        },
        {
          question: {
            de: "Was tragen Frauen im Ihram?",
            en: "What do women wear in ihram?",
            tr: "Kadınlar ihramda ne giyer?",
          },
          options: [
            { de: "Zwei weiße ungenähte Tücher wie die Männer", en: "Two white unstitched cloths like the men", tr: "Erkekler gibi iki beyaz dikişsiz örtü" },
            { de: "Ihre gewohnte bedeckende Kleidung, ohne Niqab und Handschuhe", en: "Their usual covering clothing, without niqab and gloves", tr: "Normal örtünen kıyafetleri; peçe ve eldiven olmadan" },
            { de: "Ausschließlich schwarze Kleidung", en: "Only black clothing", tr: "Yalnızca siyah kıyafet" },
          ],
          answer: 1,
          explanation: {
            de: "Für Frauen gibt es keine besondere Ihram-Kleidung; nur Niqab und Handschuhe sind untersagt (Bukhari 1838).",
            en: "There is no special ihram garment for women; only niqab and gloves are prohibited (Bukhari 1838).",
            tr: "Kadınlar için özel bir ihram kıyafeti yoktur; yalnızca peçe ve eldiven yasaktır (Buhârî 1838).",
          },
        },
        {
          question: {
            de: "Was nennt Koran 2:197 als verboten während der Pilgerfahrt?",
            en: "What does Quran 2:197 name as forbidden during the pilgrimage?",
            tr: "Bakara 2:197 hacda neleri yasaklar?",
          },
          options: [
            { de: "Beischlaf, Frevel und Streiterei", en: "Sexual relations, disobedience and disputing", tr: "Kadına yaklaşmak, günaha sapmak ve kavga etmek" },
            { de: "Essen und Trinken", en: "Eating and drinking", tr: "Yemek ve içmek" },
            { de: "Schlafen", en: "Sleeping", tr: "Uyumak" },
          ],
          answer: 0,
          explanation: {
            de: "„… weder Beischlaf noch Frevel noch Streiterei“ — der Hadsch verlangt Selbstbeherrschung und guten Umgang.",
            en: "“… no sexual relations, no disobedience and no disputing” — Hajj demands self-restraint and good conduct.",
            tr: "“… kadına yaklaşmak, günaha sapmak ve kavga etmek yoktur” — hac nefsine hâkim olmayı ve güzel ahlakı gerektirir.",
          },
        },
      ],
      sources: [
        'Quran 2:197, 2:196, 5:95',
        'Sahih al-Bukhari 1524, Sahih Muslim 1181; Sahih al-Bukhari 1531 (Dhat \'Irq)',
        'Sahih al-Bukhari 1539 (Parfüm vor dem Ihram)',
        'Sahih al-Bukhari 1549, Sahih Muslim 1184 (Talbiya)',
        'Sahih al-Bukhari 1838 (Frau im Ihram)',
        'Sahih Muslim 1409 (Eheschließung im Ihram)',
        HAJJ_OF_PROPHET,
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 4 ───────────────────────────────────────────────────────────
    {
      id: 'umrah-step-by-step',
      title: {
        de: 'Die Umra Schritt für Schritt',
        en: 'Umrah step by step',
        tr: 'Adım adım umre',
      },
      summary: {
        de: "Ihram, Tawaf, Sa'i und Haare scheren bzw. kürzen — der Ablauf der Umra mit den wichtigsten Regeln und Bittgebeten.",
        en: "Ihram, tawaf, sa'i and shaving or shortening the hair — the sequence of Umrah with the key rules and supplications.",
        tr: "İhram, tavaf, sa'y ve tıraş — umrenin akışı, temel kuralları ve dualarıyla.",
      },
      minutes: 6,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Die Umra besteht aus vier Schritten. Sie dauert — je nach Andrang — meist nur wenige Stunden:",
            en: "Umrah consists of four steps. Depending on the crowds, it usually takes only a few hours:",
            tr: "Umre dört adımdan oluşur. Kalabalığa göre genellikle yalnızca birkaç saat sürer:",
          },
        },
        {
          type: 'list',
          items: [
            { de: "**1. Ihram** am Miqat — Absicht und Talbiya (Lektion 3)", en: "**1. Ihram** at the miqat — intention and talbiyah (lesson 3)", tr: "**1. İhram** — mîkatta niyet ve telbiye (3. ders)" },
            { de: "**2. Tawaf** — siebenmal um die Kaaba", en: "**2. Tawaf** — seven times around the Kaaba", tr: "**2. Tavaf** — Kâbe'nin etrafında yedi şavt" },
            { de: "**3. Sa'i** — siebenmal zwischen as-Safa und al-Marwa", en: "**3. Sa'i** — seven times between as-Safa and al-Marwah", tr: "**3. Sa'y** — Safa ile Merve arasında yedi şavt" },
            { de: "**4. Halq oder Taqsir** — Haare scheren oder kürzen", en: "**4. Halq or taqsir** — shaving or shortening the hair", tr: "**4. Halk veya taksir** — saçı tıraş etmek veya kısaltmak" },
          ],
        },
        {
          type: 'heading',
          text: { de: 'Der Tawaf', en: 'The tawaf', tr: 'Tavaf' },
        },
        {
          type: 'text',
          text: {
            de: "Man betritt die Heilige Moschee mit dem rechten Fuß und dem Bittgebet für das Betreten der Moschee. Bei Beginn des Tawaf endet die Talbiya der Umra. Männer legen beim Tawaf der Umra die rechte Schulter frei (Idtiba'). Der Tawaf beginnt an der Ecke des **Schwarzen Steins**: ihn küssen oder berühren, wenn es ohne Gedränge möglich ist — sonst genügt es, mit der Hand zu ihm zu weisen und „Bismillah, Allahu akbar“ zu sagen. Dann sieben Runden gegen den Uhrzeigersinn, die Kaaba zur Linken. Männer gehen in den ersten drei Runden, wenn möglich, mit kurzen, zügigen Schritten (Raml).",
            en: "Enter the Sacred Mosque with the right foot and the supplication for entering the mosque. At the start of tawaf, the talbiyah of Umrah ends. During the tawaf of Umrah men uncover the right shoulder (idtiba'). Tawaf begins at the corner of the **Black Stone**: kiss or touch it if possible without crowding — otherwise it is enough to point to it with the hand and say “Bismillah, Allahu akbar”. Then seven circuits anticlockwise, with the Kaaba on your left. In the first three circuits men walk briskly with short steps (raml) where possible.",
            tr: "Mescid-i Haram'a sağ ayakla ve mescide giriş duasıyla girilir. Tavafın başlamasıyla umre telbiyesi sona erer. Umre tavafında erkekler sağ omzu açar (ıztıba). Tavaf **Hacerülesved** köşesinden başlar: İzdiham olmadan mümkünse öpülür veya ona dokunulur — değilse el ile ona işaret edip “Bismillâhi Allâhu ekber” demek yeterlidir. Sonra Kâbe sol tarafta kalacak şekilde saat yönünün tersine yedi şavt yapılır. Erkekler ilk üç şavtta mümkünse kısa ve çevik adımlarla yürür (remel).",
          },
        },
        {
          type: 'text',
          text: {
            de: "Für die einzelnen Runden gibt es keine vorgeschriebenen Bittgebete — man darf in der eigenen Sprache beten, Koran rezitieren und Allahs gedenken. Zwischen der Jemenitischen Ecke und dem Schwarzen Stein sprechen viele Pilger das bekannte Bittgebet aus dem Koran:",
            en: "There are no prescribed supplications for individual circuits — you may pray in your own language, recite Quran and remember Allah. Between the Yemeni Corner and the Black Stone many pilgrims say the well-known supplication from the Quran:",
            tr: "Şavtlar için belirlenmiş zorunlu dualar yoktur — kendi dilinde dua edebilir, Kur'an okuyabilir, Allah'ı zikredebilirsin. Rüknü Yemânî ile Hacerülesved arasında birçok hacı Kur'an'daki şu bilinen duayı okur:",
          },
        },
        {
          type: 'quran',
          ref: '2:201',
          arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
          translation: {
            de: "Unser Herr, gib uns im Diesseits Gutes und im Jenseits Gutes, und bewahre uns vor der Strafe des (Höllen)feuers.",
            en: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
            tr: "Rabbimiz! Bize dünyada da iyilik ver, ahirette de iyilik ver ve bizi ateş azabından koru.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Rituelle Reinheit (Wudu) ist für den Tawaf nach malikitischer, schafi'itischer und hanbalitischer Lehre eine Gültigkeitsbedingung; nach hanafitischer Lehre ist sie Pflicht (wajib), ein Tawaf ohne Wudu ist aber gültig und wird durch eine Ausgleichsleistung ergänzt. Menstruierende Frauen verrichten alle Riten außer dem Tawaf und warten mit ihm, bis sie rein sind (Sahih al-Bukhari 305, Sahih Muslim 1211).",
            en: "Ritual purity (wudu) is a condition of validity for tawaf according to the Maliki, Shafi'i and Hanbali schools; according to the Hanafi school it is obligatory (wajib), but a tawaf without wudu is valid and is supplemented by a compensation. Menstruating women perform all rites except tawaf and wait with it until they are pure (Sahih al-Bukhari 305, Sahih Muslim 1211).",
            tr: "Mâlikî, Şâfiî ve Hanbelîlere göre abdest tavafın sıhhat şartıdır; Hanefîlere göre vaciptir, abdestsiz tavaf geçerlidir ama bir ceza (dem/sadaka) ile telafi edilir. Hayızlı kadınlar tavaf dışında bütün menasiki yapar ve tavafı temizlenene kadar erteler (Buhârî 305, Müslim 1211).",
          },
        },
        {
          type: 'text',
          text: {
            de: "Nach dem Tawaf betet man zwei Rak'a hinter dem **Maqam Ibrahim** — bei Gedränge irgendwo in der Moschee — und trinkt vom **Zamzam**-Wasser.",
            en: "After tawaf one prays two rak'ahs behind the **Maqam Ibrahim** — anywhere in the mosque if it is crowded — and drinks **Zamzam** water.",
            tr: "Tavaftan sonra **Makam-ı İbrahim**'in arkasında — kalabalıksa mescidin herhangi bir yerinde — iki rekât namaz kılınır ve **Zemzem** içilir.",
          },
        },
        {
          type: 'quran',
          ref: '2:125',
          arabic: 'وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى',
          translation: {
            de: "… Und nehmt die Stätte Ibrahims als Gebetsplatz …",
            en: "… And take the standing place of Ibrahim as a place of prayer …",
            tr: "… Makam-ı İbrahim'i namazgâh edinin …",
          },
        },
        {
          type: 'heading',
          text: { de: "Der Sa'i", en: "The sa'i", tr: "Sa'y" },
        },
        {
          type: 'quran',
          ref: '2:158',
          arabic: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ',
          translation: {
            de: "Gewiss, as-Safa und al-Marwa gehören zu den Kultzeichen Allahs. Wer also die Pilgerfahrt zum Hause oder die Besuchsfahrt (Umra) vollzieht, für den ist es keine Sünde, zwischen ihnen hin- und herzugehen …",
            en: "Indeed, as-Safa and al-Marwah are among the symbols of Allah. So whoever makes Hajj to the House or performs Umrah — there is no blame upon him for walking between them …",
            tr: "Şüphesiz Safa ile Merve Allah'ın nişanelerindendir. Kim Kâbe'yi hac veya umre niyetiyle ziyaret ederse, bu ikisi arasında sa'y etmesinde bir sakınca yoktur …",
          },
        },
        {
          type: 'text',
          text: {
            de: "Der Sa'i beginnt an **as-Safa**: Man wendet sich zur Kaaba, preist Allah und bittet. Der Weg von as-Safa nach al-Marwa zählt als eine Runde, zurück als zweite; nach der siebten Runde endet man bei **al-Marwa**. Männer laufen zwischen den grünen Markierungen zügiger — in Erinnerung an Hadschar, die hier nach Wasser für Isma'il suchte. Wudu ist für den Sa'i empfohlen, aber nach den meisten Gelehrten keine Bedingung.",
            en: "Sa'i begins at **as-Safa**: face the Kaaba, praise Allah and supplicate. The way from as-Safa to al-Marwah counts as one circuit, the way back as the second; after the seventh circuit you finish at **al-Marwah**. Men walk faster between the green markers — in memory of Hajar, who searched here for water for Isma'il. Wudu is recommended for sa'i but, according to most scholars, not a condition.",
            tr: "Sa'y **Safa**'dan başlar: Kâbe'ye dönülür, Allah'a hamd edilip dua edilir. Safa'dan Merve'ye gidiş bir şavt, dönüş ikinci şavt sayılır; yedinci şavttan sonra **Merve**'de bitirilir. Erkekler yeşil ışıklar arasında daha hızlı yürür (hervele) — burada İsmail için su arayan Hz. Hâcer'in hatırasına. Sa'y için abdest müstehaptır, ama âlimlerin çoğuna göre şart değildir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Haare scheren oder kürzen', en: 'Shaving or shortening the hair', tr: 'Tıraş olmak veya kısaltmak' },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1727, Sahih Muslim 1301',
          narrator: "'Abdullah ibn 'Umar",
          grade: 'sahih',
          text: {
            de: "„O Allah, erbarme Dich derer, die (ihr Haar) scheren.“ Sie sagten: „Und derer, die es kürzen, o Gesandter Allahs?“ Er wiederholte: „O Allah, erbarme Dich derer, die scheren.“ … Dann sagte er: „Und derer, die kürzen.“ (Auszug)",
            en: "“O Allah, have mercy on those who shave (their heads).” They said: “And those who shorten, O Messenger of Allah?” He repeated: “O Allah, have mercy on those who shave.” … Then he said: “And those who shorten.” (excerpt)",
            tr: "“Allah'ım! Tıraş olanlara rahmet et.” “Saçını kısaltanlara da, ey Allah'ın Resulü?” dediler. Tekrar “Allah'ım! Tıraş olanlara rahmet et” buyurdu … Sonra “Kısaltanlara da” buyurdu. (özet)",
          },
        },
        {
          type: 'text',
          text: {
            de: "Männer scheren den Kopf (vorzüglicher) oder kürzen das Haar; Frauen kürzen nur eine Fingerkuppe lang von den Haarspitzen. Damit ist die Umra vollendet, und die Verbote des Ihram sind aufgehoben.",
            en: "Men shave the head (preferable) or shorten the hair; women only shorten by a fingertip's length from the ends. With this, Umrah is complete and the prohibitions of ihram are lifted.",
            tr: "Erkekler başını tıraş eder (daha faziletli) veya saçını kısaltır; kadınlar saç uçlarından yalnızca parmak ucu kadar keser. Böylece umre tamamlanır ve ihram yasakları sona erer.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Wie viel Haar mindestens gekürzt werden muss, regeln die Schulen unterschiedlich: nach Hanafiten mindestens ein Viertel des Kopfes, nach Schafi'iten mindestens drei Haare, nach Malikiten und Hanbaliten das Haar des ganzen Kopfes.",
            en: "How much hair must at least be cut is regulated differently: according to Hanafis at least a quarter of the head, according to Shafi'is at least three hairs, according to Malikis and Hanbalis the hair of the whole head.",
            tr: "En az ne kadar saç kesilmesi gerektiği mezheplere göre değişir: Hanefîlere göre başın en az dörtte biri, Şâfiîlere göre en az üç tel, Mâlikî ve Hanbelîlere göre bütün baş.",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Den Schwarzen Stein zu küssen ist Sunna — andere zu drängen oder zu verletzen ist verboten. Wenn es voll ist: grüßen, mit der Hand weisen, weitergehen.",
            en: "Kissing the Black Stone is sunnah — pushing or hurting others is forbidden. When it is crowded: salute, point with the hand, move on.",
            tr: "Hacerülesved'i öpmek sünnettir — başkalarını itmek veya incitmek ise haramdır. Kalabalıksa: selamla, elinle işaret et, devam et.",
          },
        },
        { type: 'link', to: '/dua', label: { de: 'Bittgebete für Tawaf und Sa\'i', en: "Supplications for tawaf and sa'i", tr: "Tavaf ve sa'y duaları" } },
        { type: 'terms', ids: ['tawaf', 'sai', 'halq-taqsir', 'kaaba', 'zamzam', 'masjid-al-haram', 'umrah'] },
      ],
      quiz: [
        {
          question: {
            de: "Wo beginnt jede Runde des Tawaf?",
            en: "Where does each circuit of tawaf begin?",
            tr: "Her tavaf şavtı nereden başlar?",
          },
          options: [
            { de: "An der Ecke des Schwarzen Steins", en: "At the corner of the Black Stone", tr: "Hacerülesved köşesinden" },
            { de: "Am Tor der Moschee", en: "At the gate of the mosque", tr: "Mescidin kapısından" },
            { de: "Bei as-Safa", en: "At as-Safa", tr: "Safa'dan" },
          ],
          answer: 0,
          explanation: {
            de: "Der Tawaf beginnt und endet an der Ecke des Schwarzen Steins, die Kaaba zur Linken.",
            en: "Tawaf begins and ends at the corner of the Black Stone, with the Kaaba on the left.",
            tr: "Tavaf, Kâbe sol tarafta kalacak şekilde Hacerülesved köşesinden başlar ve orada biter.",
          },
        },
        {
          question: {
            de: "Wo beginnt und wo endet der Sa'i?",
            en: "Where does sa'i begin and end?",
            tr: "Sa'y nerede başlar ve nerede biter?",
          },
          options: [
            { de: "Beginn an al-Marwa, Ende an as-Safa", en: "Starts at al-Marwah, ends at as-Safa", tr: "Merve'de başlar, Safa'da biter" },
            { de: "Beginn an as-Safa, Ende an al-Marwa", en: "Starts at as-Safa, ends at al-Marwah", tr: "Safa'da başlar, Merve'de biter" },
            { de: "Beginn und Ende an der Kaaba", en: "Starts and ends at the Kaaba", tr: "Kâbe'de başlar ve biter" },
          ],
          answer: 1,
          explanation: {
            de: "Hin und zurück zählen je als eine Runde; so endet die siebte Runde an al-Marwa.",
            en: "Each way counts as one circuit, so the seventh ends at al-Marwah.",
            tr: "Her gidiş ve dönüş bir şavt sayılır; böylece yedinci şavt Merve'de biter.",
          },
        },
        {
          question: {
            de: "Was tun Frauen am Ende der Umra mit ihrem Haar?",
            en: "What do women do with their hair at the end of Umrah?",
            tr: "Kadınlar umrenin sonunda saçlarına ne yapar?",
          },
          options: [
            { de: "Den Kopf scheren", en: "Shave the head", tr: "Başlarını tıraş ederler" },
            { de: "Eine Fingerkuppe lang von den Spitzen kürzen", en: "Shorten by a fingertip's length from the ends", tr: "Saç uçlarından parmak ucu kadar keserler" },
            { de: "Nichts", en: "Nothing", tr: "Hiçbir şey" },
          ],
          answer: 1,
          explanation: {
            de: "Frauen scheren nicht, sondern kürzen nur ein kleines Stück (Taqsir).",
            en: "Women do not shave; they only shorten a small amount (taqsir).",
            tr: "Kadınlar tıraş olmaz, yalnızca biraz kısaltır (taksir).",
          },
        },
      ],
      sources: [
        'Quran 2:201, 2:125, 2:158',
        'Sahih al-Bukhari 1727, Sahih Muslim 1301',
        'Sahih al-Bukhari 305, Sahih Muslim 1211',
        'Sahih al-Bukhari 3364 (Hadschar zwischen as-Safa und al-Marwa)',
        HAJJ_OF_PROPHET,
        'Wudu beim Tawaf, Umfang des Haarekürzens: Standardwerke der vier Rechtsschulen',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 5 ───────────────────────────────────────────────────────────
    {
      id: 'types-of-hajj',
      title: {
        de: "Die drei Hadsch-Arten: Tamattu', Qiran, Ifrad",
        en: "The three forms of Hajj: tamattu', qiran, ifrad",
        tr: 'Üç hac çeşidi: temettu, kıran, ifrad',
      },
      summary: {
        de: "Wie man Umra und Hadsch verbinden kann, wann ein Opfertier Pflicht ist und welche Art die Schulen jeweils bevorzugen.",
        en: "How Umrah and Hajj can be combined, when a sacrificial animal is required and which form each school prefers.",
        tr: "Umre ile haccın nasıl birleştirilebileceği, kurbanın ne zaman gerektiği ve mezheplerin hangi çeşidi tercih ettiği.",
      },
      minutes: 5,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Es gibt drei anerkannte Arten, den Hadsch zu verrichten. Alle drei sind nach Konsens der Gelehrten gültig; schon beim Hadsch des Propheten ﷺ wählten die Gefährten unterschiedliche Arten.",
            en: "There are three recognised ways of performing Hajj. All three are valid by scholarly consensus; already during the Hajj of the Prophet ﷺ the companions chose different forms.",
            tr: "Haccı yapmanın kabul görmüş üç yolu vardır. Üçü de âlimlerin icmaıyla geçerlidir; Peygamber'in ﷺ haccında bile sahabe farklı çeşitleri seçmiştir.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1562, Sahih Muslim 1211',
          narrator: "'Aisha",
          grade: 'sahih',
          text: {
            de: "Wir zogen mit dem Gesandten Allahs ﷺ aus … Unter uns gab es solche, die den Ihram für die Umra antraten, solche, die ihn für Hadsch und Umra antraten, und solche, die ihn für den Hadsch antraten. (Auszug)",
            en: "We set out with the Messenger of Allah ﷺ … Among us were those who entered ihram for Umrah, those who entered it for Hajj and Umrah, and those who entered it for Hajj. (excerpt)",
            tr: "Resulullah ﷺ ile birlikte (hacca) çıktık … Kimimiz umre için, kimimiz hac ve umre için, kimimiz de yalnızca hac için ihrama girdi. (özet)",
          },
        },
        {
          type: 'list',
          items: [
            {
              de: "**Tamattu'** (Genuss): In den Hadsch-Monaten zuerst eine Umra verrichten, den Ihram lösen und am 8. Dhu l-Hiddscha in Mekka erneut für den Hadsch in den Ihram treten. **Opfertier: Pflicht.**",
              en: "**Tamattu'** (enjoyment): first perform Umrah in the Hajj months, leave ihram, and re-enter ihram for Hajj in Mecca on 8 Dhul-Hijjah. **Sacrificial animal: required.**",
              tr: "**Temettu** (faydalanma): Hac aylarında önce umre yapılır, ihramdan çıkılır ve 8 Zilhicce'de Mekke'de hac için yeniden ihrama girilir. **Kurban: gerekli.**",
            },
            {
              de: "**Qiran** (Verbindung): Mit einem einzigen Ihram Umra und Hadsch verbinden und bis zum Opfertag im Ihram bleiben. **Opfertier: Pflicht.**",
              en: "**Qiran** (combination): combine Umrah and Hajj in a single ihram and remain in ihram until the day of sacrifice. **Sacrificial animal: required.**",
              tr: "**Kıran** (birleştirme): Umre ve hac tek bir ihramla birleştirilir ve bayram gününe kadar ihramda kalınır. **Kurban: gerekli.**",
            },
            {
              de: "**Ifrad** (Einzeln): Nur für den Hadsch in den Ihram treten. **Opfertier: nicht Pflicht** (freiwillig möglich).",
              en: "**Ifrad** (single): enter ihram for Hajj only. **Sacrificial animal: not required** (voluntary).",
              tr: "**İfrad** (tek başına): Yalnızca hac için ihrama girilir. **Kurban: gerekli değil** (gönüllü kesilebilir).",
            },
          ],
        },
        {
          type: 'quran',
          ref: '2:196',
          translation: {
            de: "… Wer die Umra mit der Pilgerfahrt verbindet und sie bis dahin genießt (Tamattu'), der bringe ein Opfertier dar, das ihm leichtfällt. Wer aber keines findet, der soll drei Tage während der Pilgerfahrt fasten und sieben, wenn ihr zurückgekehrt seid; das sind volle zehn. Dies gilt für denjenigen, dessen Angehörige nicht in der Nähe der geschützten Gebetsstätte wohnen …",
            en: "… Whoever performs Umrah (and enjoys it) until the Hajj (tamattu') must offer what can be obtained with ease of sacrificial animals. And whoever cannot find one — then a fast of three days during Hajj and seven when you have returned; those are ten complete. This is for those whose family is not present at al-Masjid al-Haram …",
            tr: "… Kim umreyi hacca kadar birleştirerek faydalanırsa (temettu), kolayına gelen bir kurban kessin. Bulamayan kimse, üç günü hacda, yedi günü de döndüğünüzde olmak üzere tam on gün oruç tutsun. Bu, ailesi Mescid-i Haram civarında oturmayanlar içindir …",
          },
        },
        {
          type: 'text',
          text: {
            de: "Die Hadsch-Monate sind Schawwal, Dhu l-Qa'da und (die ersten Tage bzw. der ganze) Dhu l-Hiddscha (vgl. 2:197). Eine Umra außerhalb dieser Monate macht den Hadsch nicht zu Tamattu'. In der Praxis wählen viele Pilger aus dem Ausland **Tamattu'**: Sie kommen früh an und müssen nicht wochenlang im Ihram bleiben.",
            en: "The Hajj months are Shawwal, Dhul-Qa'dah and (the first days of, or the whole of) Dhul-Hijjah (cf. 2:197). An Umrah outside these months does not make the Hajj tamattu'. In practice many pilgrims from abroad choose **tamattu'**: they arrive early and do not have to remain in ihram for weeks.",
            tr: "Hac ayları Şevval, Zilkade ve Zilhicce'dir (ilk günleri veya tamamı; bkz. 2:197). Bu ayların dışında yapılan umre, haccı temettu yapmaz. Uygulamada yurt dışından gelen birçok hacı **temettu**yu seçer: Erken gelirler ve haftalarca ihramda kalmak zorunda kalmazlar.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Welche Art die vorzüglichste ist, beurteilen die Schulen unterschiedlich: nach Hanafiten Qiran, nach Malikiten und Schafi'iten Ifrad (Schafi'iten: wenn im selben Jahr noch eine Umra folgt), nach Hanbaliten Tamattu'. Grund sind unterschiedliche Lesarten der Berichte über den Hadsch des Propheten ﷺ (u. a. Sahih Muslim 1218), der nach vielen Gelehrten Qiran verrichtete und den Gefährten ohne Opfertier riet, ihren Ihram zur Umra zu machen. Alle drei Arten sind gültig.",
            en: "Which form is best is judged differently: according to Hanafis qiran, according to Malikis and Shafi'is ifrad (Shafi'is: if an Umrah follows in the same year), according to Hanbalis tamattu'. The reason is different readings of the reports on the Hajj of the Prophet ﷺ (including Sahih Muslim 1218), who according to many scholars performed qiran and advised companions without a sacrificial animal to turn their ihram into Umrah. All three forms are valid.",
            tr: "Hangi çeşidin en faziletli olduğu farklı değerlendirilir: Hanefîlere göre kıran, Mâlikî ve Şâfiîlere göre ifrad (Şâfiîler: aynı yıl umre de yapılırsa), Hanbelîlere göre temettu. Sebebi, birçok âlime göre kıran haccı yapan ve kurbanı olmayan sahabeye ihramlarını umreye çevirmelerini tavsiye eden Peygamber'in ﷺ haccına dair rivayetlerin (Müslim 1218 vb.) farklı yorumlanmasıdır. Üç çeşit de geçerlidir.",
          },
        },
        {
          type: 'note',
          variant: 'important',
          text: {
            de: "Die Art wird mit der Absicht beim Eintritt in den Ihram festgelegt, z. B.: „Labbaika 'umratan“ (Tamattu' — zunächst Umra), „Labbaika 'umratan wa hadschdschan“ (Qiran), „Labbaika hadschdschan“ (Ifrad). Kläre die Wahl vorher mit deiner Gruppe.",
            en: "The form is fixed with the intention when entering ihram, e.g.: “Labbayka 'umratan” (tamattu' — Umrah first), “Labbayka 'umratan wa hajjan” (qiran), “Labbayka hajjan” (ifrad). Settle the choice with your group in advance.",
            tr: "Çeşit, ihrama girerken niyetle belirlenir; ör.: “Lebbeyke umraten” (temettu — önce umre), “Lebbeyke umraten ve haccen” (kıran), “Lebbeyke haccen” (ifrad). Seçimini önceden kafilenle netleştir.",
          },
        },
        { type: 'terms', ids: ['tamattu', 'qiran', 'ifrad', 'hady', 'ihram', 'dhul-hijja'] },
      ],
      quiz: [
        {
          question: {
            de: "Bei welcher Hadsch-Art ist ein Opfertier nicht Pflicht?",
            en: "For which form of Hajj is a sacrificial animal not required?",
            tr: "Hangi hac çeşidinde kurban zorunlu değildir?",
          },
          options: [
            { de: "Tamattu'", en: "Tamattu'", tr: "Temettu" },
            { de: "Qiran", en: "Qiran", tr: "Kıran" },
            { de: "Ifrad", en: "Ifrad", tr: "İfrad" },
          ],
          answer: 2,
          explanation: {
            de: "Beim Ifrad tritt man nur für den Hadsch in den Ihram; ein Opfertier ist freiwillig.",
            en: "In ifrad one enters ihram for Hajj only; a sacrificial animal is voluntary.",
            tr: "İfradda yalnızca hac için ihrama girilir; kurban gönüllüdür.",
          },
        },
        {
          question: {
            de: "Was kennzeichnet den Tamattu'?",
            en: "What characterises tamattu'?",
            tr: "Temettunun özelliği nedir?",
          },
          options: [
            { de: "Erst Umra, Ihram lösen, dann am 8. Dhu l-Hiddscha neuer Ihram für den Hadsch", en: "Umrah first, leave ihram, then a new ihram for Hajj on 8 Dhul-Hijjah", tr: "Önce umre, ihramdan çıkış, sonra 8 Zilhicce'de hac için yeni ihram" },
            { de: "Nur Hadsch ohne Umra", en: "Only Hajj without Umrah", tr: "Umresiz yalnızca hac" },
            { de: "Umra und Hadsch in einem durchgehenden Ihram", en: "Umrah and Hajj in one continuous ihram", tr: "Umre ve hac tek ve kesintisiz bir ihramla" },
          ],
          answer: 0,
          explanation: {
            de: "Zwischen Umra und Hadsch „genießt“ man die Erleichterung, nicht im Ihram zu sein — daher der Name.",
            en: "Between Umrah and Hajj one “enjoys” the relief of not being in ihram — hence the name.",
            tr: "Umre ile hac arasında ihramsız olmanın kolaylığından “faydalanılır” — adı buradan gelir.",
          },
        },
        {
          question: {
            de: "Was tut nach Koran 2:196 ein Mutamatti', der kein Opfertier findet?",
            en: "According to Quran 2:196, what does someone performing tamattu' do if no sacrificial animal can be found?",
            tr: "Bakara 2:196'ya göre kurban bulamayan temettu hacısı ne yapar?",
          },
          options: [
            { de: "Er verzichtet auf den Hadsch", en: "He gives up Hajj", tr: "Haccı bırakır" },
            { de: "Drei Tage während des Hadsch und sieben nach der Rückkehr fasten", en: "Fast three days during Hajj and seven after returning", tr: "Üç gün hacda, yedi gün dönüşte oruç tutar" },
            { de: "Einen Geldbetrag an die Gruppe zahlen", en: "Pay an amount to the group", tr: "Kafileye para öder" },
          ],
          answer: 1,
          explanation: {
            de: "„… drei Tage während der Pilgerfahrt und sieben, wenn ihr zurückgekehrt seid; das sind volle zehn.“",
            en: "“… three days during Hajj and seven when you have returned; those are ten complete.”",
            tr: "“… üç günü hacda, yedi günü de döndüğünüzde olmak üzere tam on gün.”",
          },
        },
      ],
      sources: [
        'Quran 2:196, 2:197',
        'Sahih al-Bukhari 1562, Sahih Muslim 1211',
        HAJJ_OF_PROPHET,
        'Bevorzugte Hadsch-Art je Rechtsschule: Standardwerke der vier Rechtsschulen (z. B. Ibn Qudama: al-Mughni; an-Nawawi: al-Majmu\')',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 6 ───────────────────────────────────────────────────────────
    {
      id: 'days-of-hajj',
      title: {
        de: 'Die Hadsch-Tage: 8. bis 13. Dhu l-Hiddscha',
        en: 'The days of Hajj: 8th to 13th Dhul-Hijjah',
        tr: 'Hac günleri: 8–13 Zilhicce',
      },
      summary: {
        de: "Mina, Arafat, Muzdalifa, die Steinigung, das Opfer und der Tawaf al-Ifada — der Ablauf der Hadsch-Tage Tag für Tag.",
        en: "Mina, Arafat, Muzdalifah, the stoning, the sacrifice and tawaf al-ifadah — the days of Hajj day by day.",
        tr: "Mina, Arafat, Müzdelife, şeytan taşlama, kurban ve ifâza tavafı — hac günleri gün gün.",
      },
      minutes: 7,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Der eigentliche Hadsch dauert fünf bis sechs Tage. Grundlage für den Ablauf ist vor allem der ausführliche Bericht Jabirs über den Hadsch des Propheten ﷺ (Sahih Muslim 1218). Im Überblick:",
            en: "Hajj itself lasts five to six days. The basis for the sequence is above all Jabir's detailed report of the Prophet's ﷺ Hajj (Sahih Muslim 1218). An overview:",
            tr: "Asıl hac beş-altı gün sürer. Akışın temeli özellikle Câbir'in Peygamber'in ﷺ haccını ayrıntılı anlatan rivayetidir (Müslim 1218). Genel bakış:",
          },
        },
        {
          type: 'list',
          items: [
            { de: "**8. — Tag der Tarwiya:** Ihram (bei Tamattu' in Mekka), Aufbruch nach **Mina**; dort die Gebete von Dhuhr bis Fadschr, die Vier-Rak'a-Gebete verkürzt.", en: "**8th — Day of Tarwiyah:** ihram (for tamattu' in Mecca), departure to **Mina**; there the prayers from Dhuhr to Fajr, the four-rak'ah prayers shortened.", tr: "**8. gün — Terviye:** İhram (temettuda Mekke'de), **Mina**'ya hareket; orada öğleden sabaha kadar namazlar, dört rekâtlılar kısaltılarak." },
            { de: "**9. — Tag von Arafa:** nach Sonnenaufgang nach **Arafat**; Dhuhr und Asr zusammen und verkürzt; Verweilen (Wuquf) bis Sonnenuntergang; danach nach **Muzdalifa**.", en: "**9th — Day of Arafah:** after sunrise to **Arafat**; Dhuhr and Asr combined and shortened; standing (wuquf) until sunset; then to **Muzdalifah**.", tr: "**9. gün — Arefe:** Güneş doğduktan sonra **Arafat**'a; öğle ve ikindi birleştirilip kısaltılarak; güneş batana kadar vakfe; ardından **Müzdelife**'ye." },
            { de: "**Nacht zum 10.:** in Muzdalifa Maghrib und Ischa zusammen, Übernachtung, Gedenken nach dem Fadschr-Gebet.", en: "**Night before the 10th:** in Muzdalifah Maghrib and Isha combined, overnight stay, remembrance after Fajr.", tr: "**10. gece:** Müzdelife'de akşam ve yatsı birleştirilerek, geceleme, sabah namazından sonra zikir." },
            { de: "**10. — Opfertag:** Steinigung der großen Säule (Dschamrat al-'Aqaba), Opfer, Haare scheren/kürzen, Tawaf al-Ifada (und Sa'i).", en: "**10th — Day of Sacrifice:** stoning of the large pillar (Jamrat al-'Aqabah), sacrifice, shaving/shortening, tawaf al-ifadah (and sa'i).", tr: "**10. gün — Bayram:** Akabe cemresini taşlama, kurban, tıraş, ifâza tavafı (ve sa'y)." },
            { de: "**11.–13. — Tage der Taschriq:** Übernachten in Mina, täglich alle drei Säulen bewerfen; Aufbruch am 12. oder 13.; zum Schluss der Abschieds-Tawaf.", en: "**11th–13th — Days of Tashriq:** nights in Mina, stoning all three pillars daily; departure on the 12th or 13th; finally the farewell tawaf.", tr: "**11–13. günler — Teşrik:** Mina'da geceleme, her gün üç cemreyi taşlama; 12'sinde veya 13'ünde ayrılış; son olarak veda tavafı." },
          ],
        },
        {
          type: 'heading',
          text: { de: 'Der Tag von Arafa', en: 'The Day of Arafah', tr: 'Arefe günü' },
        },
        {
          type: 'text',
          text: {
            de: "Das Verweilen in **Arafat** ist das Herz des Hadsch — wer es versäumt, hat keinen Hadsch. Es braucht keine besonderen Handlungen: Man ist einfach da, im Gedenken und Bittgebet, mit erhobenen Händen, in der eigenen Sprache. Man muss dafür nicht auf den Berg der Barmherzigkeit (Dschabal ar-Rahma) steigen; ganz Arafat ist Verweilort.",
            en: "Standing at **Arafat** is the heart of Hajj — whoever misses it has no Hajj. It needs no special acts: one is simply there, in remembrance and supplication, with raised hands, in one's own language. There is no need to climb the Mount of Mercy (Jabal ar-Rahmah); all of Arafat is a place of standing.",
            tr: "**Arafat vakfesi** haccın kalbidir — onu kaçıranın haccı olmaz. Özel bir amel gerekmez: Kişi zikir ve dua ederek, elleri açık, kendi dilinde orada bulunur. Bunun için Cebel-i Rahme'ye çıkmak gerekmez; Arafat'ın tamamı vakfe yeridir.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 1348',
          narrator: "'Aisha",
          grade: 'sahih',
          text: {
            de: "Es gibt keinen Tag, an dem Allah mehr Diener vom Feuer befreit als am Tag von Arafa … (Auszug)",
            en: "There is no day on which Allah frees more servants from the Fire than the Day of Arafah … (excerpt)",
            tr: "Allah'ın Arefe gününden daha çok kulunu cehennemden azat ettiği bir gün yoktur … (özet)",
          },
        },
        {
          type: 'quran',
          ref: '5:3',
          arabic: 'الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ',
          translation: {
            de: "… Heute habe Ich euch eure Religion vervollkommnet, Meine Gunst an euch vollendet, und Ich bin mit dem Islam als Religion für euch zufrieden … (am Tag von Arafa offenbart, Sahih al-Bukhari 45)",
            en: "… This day I have perfected for you your religion, completed My favour upon you, and approved for you Islam as religion … (revealed on the Day of Arafah, Sahih al-Bukhari 45)",
            tr: "… Bugün sizin için dininizi kemale erdirdim, size nimetimi tamamladım ve size din olarak İslam'ı beğendim … (Arefe günü inmiştir, Buhârî 45)",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Welche Zeitspanne für das Verweilen genau zählt und ob man bis nach Sonnenuntergang bleiben muss, beurteilen die Schulen unterschiedlich (z. B. legen Malikiten besonderes Gewicht auf einen Teil der Nacht). Pilgergruppen bleiben in der Regel bis Sonnenuntergang. Auch die genaue Rangordnung der Riten unterscheidet sich: Arafat und Tawaf al-Ifada sind nach allen Schulen Pfeiler (Rukn); den Sa'i zählen Hanafiten zu den Pflichten (wajib), die anderen Schulen zu den Pfeilern.",
            en: "Which time span exactly counts for the standing and whether one must stay until after sunset is judged differently (e.g. Malikis place particular weight on part of the night). Pilgrim groups usually stay until sunset. The ranking of the rites also differs: Arafat and tawaf al-ifadah are pillars (rukn) in all schools; Hanafis count sa'i among the obligations (wajib), the other schools among the pillars.",
            tr: "Vakfe için tam olarak hangi zaman diliminin geçerli olduğu ve güneş batana kadar kalmanın gerekip gerekmediği mezheplerde farklıdır (ör. Mâlikîler gecenin bir kısmına özel önem verir). Kafileler genellikle güneş batana kadar kalır. Menasikin hükmü de farklıdır: Arafat vakfesi ve ifâza tavafı bütün mezheplere göre rükündür; sa'y Hanefîlere göre vacip, diğer mezheplere göre rükündür.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Muzdalifa', en: 'Muzdalifah', tr: 'Müzdelife' },
        },
        {
          type: 'quran',
          ref: '2:198',
          arabic: 'فَإِذَا أَفَضْتُم مِّنْ عَرَفَاتٍ فَاذْكُرُوا اللَّهَ عِندَ الْمَشْعَرِ الْحَرَامِ',
          translation: {
            de: "… Wenn ihr dann von Arafat herabströmt, so gedenkt Allahs bei der geschützten Kultstätte (al-Masch'ar al-Haram) …",
            en: "… But when you depart from Arafat, remember Allah at al-Mash'ar al-Haram …",
            tr: "… Arafat'tan akın edip ayrıldığınızda Meş'ar-i Haram'ın yanında Allah'ı zikredin …",
          },
        },
        {
          type: 'text',
          text: {
            de: "In Muzdalifa betet man Maghrib und Ischa zusammen, ruht und betet am Morgen Fadschr früh. Viele sammeln hier die Steinchen für die Steinigung (kleine, etwa kichererbsengroße Steine). Schwache, Ältere und Frauen mit ihren Begleitern durften nach authentischen Berichten schon in der Nacht nach Mina weiterziehen.",
            en: "In Muzdalifah one prays Maghrib and Isha together, rests and prays Fajr early in the morning. Many collect the pebbles for the stoning here (small stones about the size of a chickpea). According to authentic reports, the weak, the elderly and women with their companions were allowed to move on to Mina during the night.",
            tr: "Müzdelife'de akşam ve yatsı birleştirilerek kılınır, dinlenilir ve sabah namazı erkenden kılınır. Birçok hacı şeytan taşlama için taşları burada toplar (nohut büyüklüğünde küçük taşlar). Sahih rivayetlere göre zayıflara, yaşlılara ve kadınlarla refakatçilerine gece Mina'ya geçme izni verilmiştir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Der 10. Dhu l-Hiddscha — Opfertag', en: '10 Dhul-Hijjah — the Day of Sacrifice', tr: '10 Zilhicce — Bayram günü' },
        },
        {
          type: 'list',
          items: [
            { de: "**Steinigung** der Dschamrat al-'Aqaba mit sieben Steinchen, bei jedem „Allahu akbar“; die Talbiya endet.", en: "**Stoning** Jamrat al-'Aqabah with seven pebbles, saying “Allahu akbar” with each; the talbiyah ends.", tr: "Akabe cemresine yedi taş atmak, her birinde “Allâhu ekber” demek; telbiye sona erer." },
            { de: "**Opfer** (bei Tamattu' und Qiran Pflicht) — heute meist über offizielle Opfer-Gutscheine organisiert.", en: "**Sacrifice** (required for tamattu' and qiran) — today mostly organised via official sacrifice vouchers.", tr: "**Kurban** (temettu ve kıranda gerekli) — bugün çoğunlukla resmî kurban kuponlarıyla organize edilir." },
            { de: "**Haare scheren oder kürzen** — danach sind die meisten Ihram-Verbote aufgehoben, außer den ehelichen Beziehungen.", en: "**Shaving or shortening** — afterwards most ihram prohibitions are lifted, except marital relations.", tr: "**Tıraş olmak** — ardından cinsel ilişki dışındaki ihram yasaklarının çoğu kalkar." },
            { de: "**Tawaf al-Ifada** (Pfeiler des Hadsch) und, falls noch nicht verrichtet, der **Sa'i** — danach ist der Ihram vollständig gelöst.", en: "**Tawaf al-ifadah** (a pillar of Hajj) and, if not yet done, **sa'i** — after that ihram is fully released.", tr: "**İfâza tavafı** (haccın rüknü) ve henüz yapılmadıysa **sa'y** — bundan sonra ihramdan tamamen çıkılır." },
          ],
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 83, Sahih Muslim 1306',
          narrator: "'Abdullah ibn 'Amr ibn al-'As",
          grade: 'sahih',
          text: {
            de: "… An jenem Tag wurde der Prophet ﷺ nach nichts gefragt, das vorgezogen oder zurückgestellt worden war, ohne dass er sagte: „Tu es, es ist nicht schlimm.“ (Auszug)",
            en: "… On that day the Prophet ﷺ was not asked about anything done earlier or later without saying: “Do it, there is no harm.” (excerpt)",
            tr: "… O gün Peygamber'e ﷺ öne alınan veya geriye bırakılan ne sorulduysa “Yap, bir sakıncası yok” buyurdu. (özet)",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Die Reihenfolge Steinigen – Opfern – Scheren – Tawaf ist nach der Mehrheit Sunna, Abweichungen sind nach dem obigen Hadith unschädlich. Nach hanafitischer Lehre ist die Reihenfolge der ersten drei für Qiran und Tamattu' verpflichtend, eine Abweichung erfordert eine Ausgleichsleistung. Auch was genau die erste Lösung aus dem Ihram bewirkt, wird unterschiedlich erklärt.",
            en: "The order stoning – sacrifice – shaving – tawaf is sunnah according to the majority; deviations are harmless according to the hadith above. According to the Hanafi school, the order of the first three is obligatory for qiran and tamattu', and a deviation requires compensation. What exactly brings about the first release from ihram is also explained differently.",
            tr: "Taşlama – kurban – tıraş – tavaf sırası çoğunluğa göre sünnettir; yukarıdaki hadise göre sıranın değişmesinde sakınca yoktur. Hanefîlere göre ilk üçünün sırası kıran ve temettu hacıları için vaciptir; sıraya uyulmazsa ceza (dem) gerekir. İlk tahallülün (ihramdan ilk çıkışın) tam olarak neyle gerçekleştiği de farklı açıklanır.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Tage der Taschriq (11.–13.)', en: 'The days of Tashriq (11th–13th)', tr: 'Teşrik günleri (11–13)' },
        },
        {
          type: 'text',
          text: {
            de: "Die Pilger übernachten in **Mina** und bewerfen an jedem Tag nach Mittag alle drei **Dschamarat** — die kleine, die mittlere und die große — mit je sieben Steinchen; nach der ersten und zweiten bleibt man stehen und bittet. Wer krank oder schwach ist, darf sich nach verbreiteter Ansicht beim Steinigen vertreten lassen. Wer will, bricht am 12. vor Sonnenuntergang auf:",
            en: "Pilgrims spend the nights in **Mina** and each day after noon stone all three **jamarat** — the small, the middle and the large — with seven pebbles each; after the first and second one stops to supplicate. Whoever is ill or weak may, according to the common view, appoint someone to stone on their behalf. Whoever wishes leaves on the 12th before sunset:",
            tr: "Hacılar geceleri **Mina**'da kalır ve her gün öğleden sonra üç **cemre**yi — küçük, orta ve büyük — yedişer taşla taşlar; birinci ve ikinciden sonra durup dua edilir. Hasta veya zayıf olan, yaygın görüşe göre taşlama için vekil tayin edebilir. Dileyen 12'sinde güneş batmadan ayrılır:",
          },
        },
        {
          type: 'quran',
          ref: '2:203',
          arabic: 'فَمَن تَعَجَّلَ فِي يَوْمَيْنِ فَلَا إِثْمَ عَلَيْهِ',
          translation: {
            de: "Und gedenkt Allahs während einer bestimmten Anzahl von Tagen. Wer sich aber in zwei Tagen beeilt, für den ist es keine Sünde, und wer zurückbleibt, für den ist es (auch) keine Sünde — für den, der gottesfürchtig ist …",
            en: "And remember Allah during the appointed days. Then whoever hastens (his departure) in two days — there is no sin upon him; and whoever delays — there is no sin upon him — for him who fears Allah …",
            tr: "Sayılı günlerde Allah'ı anın. Kim iki gün içinde acele edip dönerse ona günah yoktur; kim de geri kalırsa ona da günah yoktur — sakınan kimse için …",
          },
        },
        {
          type: 'heading',
          text: { de: 'Der Abschied', en: 'The farewell', tr: 'Veda' },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1755, Sahih Muslim 1328',
          narrator: "'Abdullah ibn 'Abbas",
          grade: 'sahih',
          text: {
            de: "Den Menschen wurde geboten, dass ihre letzte Handlung (in Mekka) beim Haus (der Kaaba) sei; nur der menstruierenden Frau wurde dies erleichtert.",
            en: "The people were commanded that their last act (in Mecca) be at the House (the Kaaba); only for the menstruating woman was this lightened.",
            tr: "İnsanlara (Mekke'deki) son işlerinin Beytullah'ta olması emredildi; yalnızca hayızlı kadına bu konuda kolaylık tanındı.",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Am 10. Dhu l-Hiddscha feiern Muslime weltweit das Opferfest — auch wer nicht pilgert, ist mit den Pilgern verbunden. Im Kalender siehst du, wann die Tage in diesem Jahr liegen.",
            en: "On 10 Dhul-Hijjah Muslims worldwide celebrate the Festival of Sacrifice — even those not on pilgrimage are connected with the pilgrims. The calendar shows when the days fall this year.",
            tr: "10 Zilhicce'de dünyanın her yerindeki Müslümanlar Kurban Bayramı'nı kutlar — hacca gitmeyenler de hacılarla bağ içindedir. Bu yılın tarihlerini takvimde görebilirsin.",
          },
        },
        { type: 'link', to: '/calendar', label: { de: 'Hadsch-Tage und Opferfest im Kalender', en: 'Hajj days and Eid al-Adha in the calendar', tr: 'Takvimde hac günleri ve Kurban Bayramı' } },
        { type: 'terms', ids: ['arafat', 'muzdalifa', 'mina', 'jamarat', 'hady', 'tawaf-al-ifada', 'tawaf-al-wada', 'eid-al-adha'] },
      ],
      quiz: [
        {
          question: {
            de: "Welcher Ritus ist das Herz des Hadsch — ohne ihn gibt es keinen Hadsch?",
            en: "Which rite is the heart of Hajj — without it there is no Hajj?",
            tr: "Haccın kalbi olan, o olmadan haccın olmadığı rükün hangisidir?",
          },
          options: [
            { de: "Das Verweilen in Arafat", en: "Standing at Arafat", tr: "Arafat vakfesi" },
            { de: "Der Besuch in Medina", en: "The visit to Medina", tr: "Medine ziyareti" },
            { de: "Das Trinken von Zamzam", en: "Drinking Zamzam", tr: "Zemzem içmek" },
          ],
          answer: 0,
          explanation: {
            de: "Das Verweilen in Arafat am 9. Dhu l-Hiddscha ist der wichtigste Pfeiler des Hadsch.",
            en: "Standing at Arafat on 9 Dhul-Hijjah is the most important pillar of Hajj.",
            tr: "9 Zilhicce'deki Arafat vakfesi haccın en önemli rüknüdür.",
          },
        },
        {
          question: {
            de: "Was geschieht am 10. Dhu l-Hiddscha als Erstes in Mina?",
            en: "What happens first in Mina on 10 Dhul-Hijjah?",
            tr: "10 Zilhicce'de Mina'da ilk yapılan nedir?",
          },
          options: [
            { de: "Das Bewerfen der Dschamrat al-'Aqaba", en: "Stoning Jamrat al-'Aqabah", tr: "Akabe cemresini taşlamak" },
            { de: "Der Abschieds-Tawaf", en: "The farewell tawaf", tr: "Veda tavafı" },
            { de: "Das Verweilen in Arafat", en: "Standing at Arafat", tr: "Arafat vakfesi" },
          ],
          answer: 0,
          explanation: {
            de: "Die Sunna-Reihenfolge ist: Steinigen, Opfern, Scheren, Tawaf al-Ifada.",
            en: "The sunnah order is: stoning, sacrifice, shaving, tawaf al-ifadah.",
            tr: "Sünnete uygun sıra: taşlama, kurban, tıraş, ifâza tavafı.",
          },
        },
        {
          question: {
            de: "Was antwortete der Prophet ﷺ am Opfertag auf Fragen zur Reihenfolge der Riten?",
            en: "How did the Prophet ﷺ answer questions about the order of rites on the Day of Sacrifice?",
            tr: "Peygamber ﷺ bayram günü menasikin sırasıyla ilgili sorulara ne cevap verdi?",
          },
          options: [
            { de: "„Tu es, es ist nicht schlimm“", en: "“Do it, there is no harm”", tr: "“Yap, bir sakıncası yok”" },
            { de: "„Dein Hadsch ist ungültig“", en: "“Your Hajj is invalid”", tr: "“Haccın geçersiz”" },
            { de: "„Wiederhole alles im nächsten Jahr“", en: "“Repeat everything next year”", tr: "“Hepsini gelecek yıl tekrarla”" },
          ],
          answer: 0,
          explanation: {
            de: "Bukhari 83, Muslim 1306: eine Erleichterung für die Pilger. Die hanafitische Schule sieht für bestimmte Fälle dennoch eine Ausgleichsleistung vor.",
            en: "Bukhari 83, Muslim 1306: a relief for pilgrims. The Hanafi school nevertheless requires compensation in certain cases.",
            tr: "Buhârî 83, Müslim 1306: hacılar için bir kolaylık. Hanefî mezhebi yine de bazı durumlarda ceza (dem) öngörür.",
          },
        },
        {
          question: {
            de: "Darf man Mina schon am 12. Dhu l-Hiddscha verlassen?",
            en: "May one leave Mina already on 12 Dhul-Hijjah?",
            tr: "Mina'dan 12 Zilhicce'de ayrılmak caiz midir?",
          },
          options: [
            { de: "Ja — „wer sich in zwei Tagen beeilt, für den ist es keine Sünde“ (2:203)", en: "Yes — “whoever hastens in two days, there is no sin upon him” (2:203)", tr: "Evet — “Kim iki gün içinde acele ederse ona günah yoktur” (2:203)" },
            { de: "Nein, niemals", en: "No, never", tr: "Hayır, asla" },
            { de: "Nur mit Erlaubnis des Reisebüros", en: "Only with the travel agency's permission", tr: "Yalnızca acentenin izniyle" },
          ],
          answer: 0,
          explanation: {
            de: "Beides ist erlaubt: am 12. vor Sonnenuntergang aufbrechen oder bis zum 13. bleiben.",
            en: "Both are permitted: leaving on the 12th before sunset or staying until the 13th.",
            tr: "İkisi de caizdir: 12'sinde güneş batmadan ayrılmak veya 13'üne kadar kalmak.",
          },
        },
      ],
      sources: [
        HAJJ_OF_PROPHET,
        'Quran 5:3, 2:198, 2:203',
        'Sahih Muslim 1348; Sahih al-Bukhari 45 (Offenbarung von 5:3 am Tag von Arafa)',
        'Sahih al-Bukhari 83, Sahih Muslim 1306',
        'Sahih al-Bukhari 1755, Sahih Muslim 1328',
        'Rukn/Wajib-Einteilung, Reihenfolge am Opfertag, Dauer des Wuquf: Standardwerke der vier Rechtsschulen',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 7 ───────────────────────────────────────────────────────────
    {
      id: 'visiting-medina',
      title: {
        de: 'Der Besuch in Medina und seine Etikette',
        en: 'Visiting Medina and its etiquette',
        tr: 'Medine ziyareti ve adabı',
      },
      summary: {
        de: "Die Prophetenmoschee, die Rawda, der Gruß an den Propheten ﷺ und weitere Orte in Medina — mit Ruhe und Respekt.",
        en: "The Prophet's Mosque, the Rawdah, greeting the Prophet ﷺ and other places in Medina — with calm and respect.",
        tr: "Mescid-i Nebevî, Ravza, Peygamber'e ﷺ selam ve Medine'deki diğer mekânlar — sükûnet ve edeple.",
      },
      minutes: 5,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Der Besuch in **Medina** gehört nicht zu den Riten des Hadsch, doch die meisten Pilger verbinden ihre Reise damit. Medina ist die Stadt der Hidschra, in der der Prophet ﷺ die erste Gemeinde aufbaute und in der er begraben ist.",
            en: "The visit to **Medina** is not one of the rites of Hajj, but most pilgrims combine it with their journey. Medina is the city of the hijrah, where the Prophet ﷺ built the first community and where he is buried.",
            tr: "**Medine** ziyareti haccın menasikinden değildir, ama hacıların çoğu yolculuklarını bununla birleştirir. Medine, Peygamber'in ﷺ hicret ettiği, ilk toplumu kurduğu ve kabrinin bulunduğu şehirdir.",
          },
        },
        { type: 'link', to: '/seerah', label: { de: 'Die Hidschra nach Medina in der Sira', en: 'The hijrah to Medina in the Seerah', tr: "Siyer'de Medine'ye hicret" } },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1189, Sahih Muslim 1397',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Man soll nur zu drei Moscheen eigens aufbrechen: zur Heiligen Moschee, zur Moschee des Gesandten ﷺ und zur al-Aqsa-Moschee.",
            en: "Do not set out on a journey except to three mosques: the Sacred Mosque, the Mosque of the Messenger ﷺ and al-Aqsa Mosque.",
            tr: "Yalnızca üç mescide (ibadet maksadıyla) yolculuk yapılır: Mescid-i Haram, Resulullah'ın ﷺ mescidi ve Mescid-i Aksâ.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1190, Sahih Muslim 1394',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Ein Gebet in dieser meiner Moschee ist besser als tausend Gebete in anderen Moscheen, außer der Heiligen Moschee.",
            en: "A prayer in this mosque of mine is better than a thousand prayers in other mosques, except the Sacred Mosque.",
            tr: "Benim şu mescidimde kılınan bir namaz, Mescid-i Haram dışındaki diğer mescitlerde kılınan bin namazdan daha hayırlıdır.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Rawda', en: 'The Rawdah', tr: 'Ravza' },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1196, Sahih Muslim 1391',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: "Was zwischen meinem Haus und meiner Kanzel liegt, ist ein Garten von den Gärten des Paradieses …",
            en: "What is between my house and my pulpit is a garden from the gardens of Paradise …",
            tr: "Evimle minberim arası cennet bahçelerinden bir bahçedir …",
          },
        },
        {
          type: 'text',
          text: {
            de: "Viele Pilger möchten in der **Rawda** beten. Der Zugang ist heute oft zeitlich geregelt und nur mit Termin möglich — die aktuelle Regelung vor Ort oder beim Anbieter erfragen und geduldig bleiben.",
            en: "Many pilgrims wish to pray in the **Rawdah**. Access is often time-regulated today and only possible with an appointment — check the current arrangements locally or with your operator and remain patient.",
            tr: "Birçok hacı **Ravza**'da namaz kılmak ister. Giriş bugün genellikle saatlere bağlıdır ve randevuyla mümkündür — güncel düzenlemeyi orada veya kurumundan öğren ve sabırlı ol.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Der Gruß an den Propheten ﷺ', en: 'Greeting the Prophet ﷺ', tr: "Peygamber'e ﷺ selam" },
        },
        {
          type: 'text',
          text: {
            de: "Am Grab des Propheten ﷺ grüßt man ruhig und mit gesenkter Stimme: „As-salamu 'alaika ya Rasula-llah“ — und dann seine beiden Gefährten Abu Bakr und 'Umar, die neben ihm begraben sind. Für das eigene Bittgebet wenden sich viele nach dem Rat der Gelehrten zur Qibla.",
            en: "At the grave of the Prophet ﷺ one greets calmly and with a lowered voice: “As-salamu 'alayka ya Rasula-llah” — and then his two companions Abu Bakr and 'Umar, who are buried beside him. For one's own supplication, many scholars advise facing the qibla.",
            tr: "Peygamber'in ﷺ kabri önünde sakin ve alçak sesle selam verilir: “Es-selâmü aleyke yâ Resûlallah” — ardından yanında medfun olan iki arkadaşı Hz. Ebu Bekir ve Hz. Ömer'e. Kendi duası için birçok âlim kıbleye dönmeyi tavsiye eder.",
          },
        },
        {
          type: 'quran',
          ref: '49:2',
          arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَرْفَعُوا أَصْوَاتَكُمْ فَوْقَ صَوْتِ النَّبِيِّ',
          translation: {
            de: "O die ihr glaubt, erhebt nicht eure Stimmen über die Stimme des Propheten …",
            en: "O you who have believed, do not raise your voices above the voice of the Prophet …",
            tr: "Ey iman edenler! Seslerinizi Peygamber'in sesinin üstüne yükseltmeyin …",
          },
        },
        {
          type: 'hadith',
          source: 'Sunan Abi Dawud 2041',
          narrator: 'Abu Huraira',
          grade: 'hasan',
          text: {
            de: "Niemand grüßt mich, ohne dass Allah mir meine Seele zurückgibt, sodass ich seinen Gruß erwidere.",
            en: "No one sends greetings upon me except that Allah returns my soul to me so that I return his greeting.",
            tr: "Bana selam veren hiç kimse yoktur ki Allah ruhumu bana iade etmesin de ben de onun selamını almayayım.",
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: "Alle sind sich einig, dass der Besuch der Prophetenmoschee und das Grüßen des Propheten ﷺ empfohlen und segensreich sind. Ob man die Reise ausdrücklich mit der Absicht antritt, das Grab zu besuchen, oder mit der Absicht, die Moschee zu besuchen (und dann das Grab grüßt), beurteilen Gelehrte unterschiedlich — mit Bezug auf den Hadith über die drei Moscheen. Für den Pilger macht das in der Praxis kaum einen Unterschied.",
            en: "All agree that visiting the Prophet's Mosque and greeting the Prophet ﷺ are recommended and blessed. Whether one should set out explicitly with the intention of visiting the grave, or with the intention of visiting the mosque (and then greeting at the grave), is judged differently by scholars — with reference to the hadith about the three mosques. For the pilgrim this makes little practical difference.",
            tr: "Mescid-i Nebevî'yi ziyaret etmenin ve Peygamber'e ﷺ selam vermenin müstehap ve bereketli olduğunda herkes hemfikirdir. Yolculuğa açıkça kabri ziyaret niyetiyle mi, yoksa mescidi ziyaret niyetiyle mi (sonra kabre selam vermek üzere) çıkılacağı, üç mescit hadisi bağlamında âlimlerce farklı değerlendirilir. Hacı için bunun pratikte pek farkı yoktur.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Weitere Orte', en: 'Other places', tr: 'Diğer mekânlar' },
        },
        {
          type: 'list',
          items: [
            { de: "**Masdschid Quba'** — die erste Moschee; der Prophet ﷺ besuchte sie jeden Samstag zu Fuß oder reitend (Sahih al-Bukhari 1193, Sahih Muslim 1399).", en: "**Masjid Quba'** — the first mosque; the Prophet ﷺ visited it every Saturday on foot or riding (Sahih al-Bukhari 1193, Sahih Muslim 1399).", tr: "**Kuba Mescidi** — ilk mescit; Peygamber ﷺ onu her cumartesi yaya veya binekli ziyaret ederdi (Buhârî 1193, Müslim 1399)." },
            { de: "**Al-Baqi'** — der Friedhof Medinas, auf dem viele Gefährten ruhen.", en: "**Al-Baqi'** — the cemetery of Medina, where many companions rest.", tr: "**Bakî** — birçok sahabenin yattığı Medine kabristanı." },
            { de: "**Uhud** — der Berg der gleichnamigen Schlacht und die Gräber der Märtyrer, darunter Hamza.", en: "**Uhud** — the mountain of the battle of the same name and the graves of the martyrs, including Hamzah.", tr: "**Uhud** — aynı adı taşıyan savaşın dağı ve aralarında Hz. Hamza'nın da bulunduğu şehitlerin kabirleri." },
          ],
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 975',
          narrator: 'Buraida',
          grade: 'sahih',
          text: {
            de: "(Was der Prophet ﷺ beim Besuch der Friedhöfe zu sagen lehrte:) „Friede sei mit euch, ihr Bewohner dieser Stätten, Gläubige und Muslime! Wir werden, so Allah will, zu euch stoßen. Ich bitte Allah für uns und für euch um Wohlergehen.“",
            en: "(What the Prophet ﷺ taught to say when visiting graveyards:) “Peace be upon you, O inhabitants of these dwellings, believers and Muslims! We will, if Allah wills, join you. I ask Allah for well-being for us and for you.”",
            tr: "(Peygamber'in ﷺ kabristan ziyaretinde söylenmesini öğrettiği dua:) “Ey bu diyarın mümin ve Müslüman sakinleri, selam üzerinize olsun! İnşallah biz de size katılacağız. Allah'tan bizim ve sizin için afiyet dilerim.”",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Gelehrte raten, sich bei Besuchen an das Überlieferte zu halten: Gruß, Bittgebet für die Verstorbenen, Besinnung auf die Geschichte. Medina ist auch eine Stadt der Ruhe — Zeit für Koran, Gebet und gutes Benehmen gegenüber ihren Bewohnern.",
            en: "Scholars advise keeping to what is transmitted when visiting: greeting, supplication for the deceased, reflection on the history. Medina is also a city of calm — time for Quran, prayer and good conduct towards its inhabitants.",
            tr: "Âlimler ziyaretlerde sünnette bildirilenle yetinmeyi tavsiye eder: selam, ölüler için dua, tarih üzerine tefekkür. Medine aynı zamanda bir huzur şehridir — Kur'an, namaz ve ahalisine karşı güzel ahlak için bir fırsat.",
          },
        },
        { type: 'terms', ids: ['medina', 'masjid-an-nabawi', 'rawda', 'hijra', 'seerah', 'sahaba'] },
      ],
      quiz: [
        {
          question: {
            de: "Ist der Besuch in Medina ein Pfeiler des Hadsch?",
            en: "Is the visit to Medina a pillar of Hajj?",
            tr: "Medine ziyareti haccın bir rüknü müdür?",
          },
          options: [
            { de: "Ja, ohne ihn ist der Hadsch ungültig", en: "Yes, without it Hajj is invalid", tr: "Evet, o olmadan hac geçersizdir" },
            { de: "Nein, er ist kein Ritus des Hadsch, aber empfohlen", en: "No, it is not a rite of Hajj, but recommended", tr: "Hayır, haccın menasikinden değildir ama müstehaptır" },
          ],
          answer: 1,
          explanation: {
            de: "Der Hadsch ist ohne Medina-Besuch vollständig; der Besuch der Prophetenmoschee ist aber eine große Tugend.",
            en: "Hajj is complete without visiting Medina; visiting the Prophet's Mosque is nevertheless a great virtue.",
            tr: "Hac Medine ziyareti olmadan da tamdır; ancak Mescid-i Nebevî'yi ziyaret büyük bir fazilettir.",
          },
        },
        {
          question: {
            de: "Was sagte der Prophet ﷺ über den Bereich zwischen seinem Haus und seiner Kanzel?",
            en: "What did the Prophet ﷺ say about the area between his house and his pulpit?",
            tr: "Peygamber ﷺ evi ile minberi arasındaki alan hakkında ne buyurdu?",
          },
          options: [
            { de: "Er ist ein Garten von den Gärten des Paradieses", en: "It is a garden from the gardens of Paradise", tr: "Cennet bahçelerinden bir bahçedir" },
            { de: "Er ist ein Marktplatz", en: "It is a marketplace", tr: "Bir pazar yeridir" },
            { de: "Man darf ihn nicht betreten", en: "It must not be entered", tr: "Oraya girilmez" },
          ],
          answer: 0,
          explanation: {
            de: "Sahih al-Bukhari 1196, Sahih Muslim 1391 — dieser Bereich heißt heute Rawda.",
            en: "Sahih al-Bukhari 1196, Sahih Muslim 1391 — this area is today called the Rawdah.",
            tr: "Buhârî 1196, Müslim 1391 — bu alana bugün Ravza denir.",
          },
        },
        {
          question: {
            de: "Welche Haltung lehrt Koran 49:2 in der Nähe des Propheten ﷺ?",
            en: "What attitude does Quran 49:2 teach near the Prophet ﷺ?",
            tr: "Hucurât 49:2, Peygamber'in ﷺ huzurunda nasıl bir tavır öğretir?",
          },
          options: [
            { de: "Laut rufen, damit er es hört", en: "Shout loudly so that he hears", tr: "Duysun diye yüksek sesle bağırmak" },
            { de: "Die Stimme nicht erheben — Ruhe und Respekt", en: "Not raising one's voice — calm and respect", tr: "Sesi yükseltmemek — sükûnet ve edep" },
            { de: "Fotos machen, bevor man grüßt", en: "Take photos before greeting", tr: "Selam vermeden önce fotoğraf çekmek" },
          ],
          answer: 1,
          explanation: {
            de: "Gelehrte übertragen diese Etikette auch auf den Besuch an seinem Grab.",
            en: "Scholars extend this etiquette to visiting his grave as well.",
            tr: "Âlimler bu edebi kabrini ziyarete de uygular.",
          },
        },
      ],
      sources: [
        'Quran 49:2',
        'Sahih al-Bukhari 1189, Sahih Muslim 1397',
        'Sahih al-Bukhari 1190, Sahih Muslim 1394',
        'Sahih al-Bukhari 1196, Sahih Muslim 1391',
        'Sahih al-Bukhari 1193, Sahih Muslim 1399 (Quba\')',
        'Sahih Muslim 975 (Gruß an die Verstorbenen)',
        'Sunan Abi Dawud 2041 (hasan)',
        QURAN_REF,
      ],
      review: 'draft',
    },

    // ─── 8 ───────────────────────────────────────────────────────────
    {
      id: 'after-return',
      title: {
        de: 'Nach der Rückkehr — den Hadsch weiterleben',
        en: 'After the return — living on the Hajj',
        tr: 'Dönüşten sonra — haccı yaşatmak',
      },
      summary: {
        de: "Woran man einen angenommenen Hadsch erkennt, wie Demut bewahrt wird und wie die guten Gewohnheiten der Pilgerfahrt im Alltag bleiben.",
        en: "How an accepted Hajj shows itself, how humility is preserved and how the good habits of the pilgrimage remain in daily life.",
        tr: "Makbul haccın alametleri, tevazunun korunması ve haccın güzel alışkanlıklarının günlük hayatta sürdürülmesi.",
      },
      minutes: 4,
      blocks: [
        {
          type: 'text',
          text: {
            de: "Der Hadsch endet mit dem Abschieds-Tawaf — die Reise des Herzens geht weiter. Der Prophet ﷺ sprach bei der Heimkehr von einer Reise, einem Feldzug oder dem Hadsch:",
            en: "Hajj ends with the farewell tawaf — the journey of the heart continues. When returning from a journey, an expedition or Hajj, the Prophet ﷺ would say:",
            tr: "Hac veda tavafıyla biter — kalbin yolculuğu ise devam eder. Peygamber ﷺ bir yolculuktan, seferden veya hacdan dönerken şöyle derdi:",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 1797, Sahih Muslim 1344',
          narrator: "'Abdullah ibn 'Umar",
          grade: 'sahih',
          arabic: 'آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ',
          text: {
            de: "„Wir kehren zurück, in Reue, im Dienst und unseren Herrn lobpreisend.“ (Auszug aus dem Heimkehr-Bittgebet)",
            en: "“We return, repentant, worshipping and praising our Lord.” (excerpt from the supplication of return)",
            tr: "“Dönüyoruz; tövbe ederek, kulluk ederek ve Rabbimize hamd ederek.” (Dönüş duasından)",
          },
        },
        {
          type: 'quran',
          ref: '2:200',
          translation: {
            de: "Und wenn ihr eure Riten vollzogen habt, dann gedenkt Allahs, wie ihr eurer Väter gedenkt, oder mit noch stärkerem Gedenken …",
            en: "And when you have completed your rites, remember Allah as you remember your forefathers, or with greater remembrance …",
            tr: "Hac ibadetlerinizi bitirdiğinizde, atalarınızı andığınız gibi, hatta daha kuvvetli bir şekilde Allah'ı anın …",
          },
        },
        {
          type: 'heading',
          text: { de: 'Zeichen eines angenommenen Hadsch', en: 'Signs of an accepted Hajj', tr: 'Makbul haccın alametleri' },
        },
        {
          type: 'text',
          text: {
            de: "Ob ein Hadsch angenommen ist, weiß allein Allah. Gelehrte nennen aber als Zeichen, dass man danach **besser lebt als zuvor**:",
            en: "Only Allah knows whether a Hajj is accepted. But scholars name as a sign that one **lives better afterwards than before**:",
            tr: "Bir haccın kabul olup olmadığını yalnızca Allah bilir. Ama âlimler alameti olarak kişinin hacdan **sonra öncekinden daha iyi yaşamasını** sayar:",
          },
        },
        {
          type: 'list',
          items: [
            { de: "das Gebet beständiger und bewusster verrichten", en: "praying more consistently and consciously", tr: "namazı daha düzenli ve şuurlu kılmak" },
            { de: "Sünden meiden, die man vorher begangen hat", en: "avoiding sins one used to commit", tr: "önceden işlenen günahlardan uzak durmak" },
            { de: "freundlicher, geduldiger und großzügiger sein — zuerst in der eigenen Familie", en: "being kinder, more patient and more generous — first of all in one's own family", tr: "daha nazik, sabırlı ve cömert olmak — önce kendi ailesinde" },
            { de: "Rechte anderer achten und Versäumtes nachholen", en: "respecting others' rights and making up for what was neglected", tr: "kul hakkına dikkat etmek ve eksikleri telafi etmek" },
          ],
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 6464, Sahih Muslim 783',
          narrator: "'Aisha",
          grade: 'sahih',
          text: {
            de: "Die Taten, die Allah am liebsten sind, sind die beständigsten, auch wenn sie gering sind.",
            en: "The deeds most beloved to Allah are the most consistent, even if they are small.",
            tr: "Allah'a en sevimli gelen ameller, az da olsa devamlı olanlardır.",
          },
        },
        {
          type: 'note',
          variant: 'important',
          text: {
            de: "Demut bewahren: Der Titel „Hadschi“ (türk. Hacı) ist in vielen Kulturen eine schöne Ehrung, aber keine religiöse Pflicht — und kein Grund, sich über andere zu erheben. Der Hadsch war für Allah; Prahlen damit wäre Riya'.",
            en: "Preserve humility: the title “Hajji” (Turkish Hacı) is a lovely honour in many cultures, but not a religious requirement — and no reason to feel above others. The Hajj was for Allah; boasting about it would be riya'.",
            tr: "Tevazuyu koru: “Hacı” unvanı birçok kültürde güzel bir hürmettir ama dinî bir gereklilik değildir — ve kendini başkalarından üstün görmenin sebebi de değildir. Hac Allah içindi; onunla övünmek riya olur.",
          },
        },
        {
          type: 'link',
          to: '/learn/aqida/tawhid-and-shirk',
          label: { de: "Mehr über Ikhlas und Riya'", en: "More about ikhlas and riya'", tr: 'İhlas ve riya hakkında daha fazlası' },
        },
        {
          type: 'heading',
          text: { de: 'Praktisch weitermachen', en: 'Carrying on in practice', tr: 'Pratikte devam etmek' },
        },
        {
          type: 'list',
          items: [
            { de: "Eine Gewohnheit aus dem Hadsch beibehalten — z. B. tägliches Gedenken, das Nachtgebet oder eine Seite Koran.", en: "Keep one habit from Hajj — e.g. daily remembrance, the night prayer or a page of Quran.", tr: "Hacdan bir alışkanlığı sürdür — ör. günlük zikir, gece namazı veya bir sayfa Kur'an." },
            { de: "Die Bittgebete einlösen, um die einen andere gebeten haben.", en: "Fulfil the supplications others asked you to make.", tr: "Başkalarının senden istediği duaları yerine getir." },
            { de: "Verwandte besuchen, Erlebnisse bescheiden teilen, Zamzam und Datteln verschenken.", en: "Visit relatives, share experiences modestly, give Zamzam and dates as gifts.", tr: "Akrabaları ziyaret et, yaşadıklarını alçakgönüllülükle paylaş, zemzem ve hurma hediye et." },
            { de: "Andere, die die Pilgerfahrt planen, mit Rat und Erfahrung unterstützen.", en: "Support others planning the pilgrimage with advice and experience.", tr: "Hacca gitmeyi planlayanlara tavsiye ve tecrübeyle destek ol." },
          ],
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: "Unsicher, ob bei einem Ritus etwas schiefging? Nicht in Grübeln verfallen — einen kundigen Gelehrten fragen, ob eine Ausgleichsleistung nötig ist, und dann mit ruhigem Herzen weiterleben. Der Prophet ﷺ hat den Pilgern vieles erleichtert.",
            en: "Unsure whether something went wrong during a rite? Don't fall into brooding — ask a knowledgeable scholar whether a compensation is needed, and then carry on with a calm heart. The Prophet ﷺ made many things easy for pilgrims.",
            tr: "Bir menasikte hata olup olmadığından emin değil misin? Vesveseye kapılma — ehil bir hocaya ceza (fidye/dem) gerekip gerekmediğini sor, sonra gönül huzuruyla yoluna devam et. Peygamber ﷺ hacılara birçok kolaylık göstermiştir.",
          },
        },
        { type: 'link', to: '/dua', label: { de: 'Bittgebete für jeden Tag', en: 'Supplications for every day', tr: 'Her gün için dualar' } },
        { type: 'terms', ids: ['hajj-mabrur', 'ikhlas', 'riya', 'tawba', 'dhikr'] },
      ],
      quiz: [
        {
          question: {
            de: "Was nennen Gelehrte als Zeichen eines angenommenen Hadsch?",
            en: "What do scholars name as a sign of an accepted Hajj?",
            tr: "Âlimler makbul haccın alameti olarak neyi sayar?",
          },
          options: [
            { de: "Dass man danach besser lebt als zuvor", en: "That one lives better afterwards than before", tr: "Kişinin sonrasında öncekinden daha iyi yaşaması" },
            { de: "Dass man einen Ehrentitel trägt", en: "That one carries an honorary title", tr: "Bir unvan taşıması" },
            { de: "Dass man viele Fotos gemacht hat", en: "That one took many photos", tr: "Çok fotoğraf çekmiş olması" },
          ],
          answer: 0,
          explanation: {
            de: "Ob ein Hadsch angenommen ist, weiß nur Allah — aber eine bleibende Veränderung zum Guten ist ein hoffnungsvolles Zeichen.",
            en: "Only Allah knows whether a Hajj is accepted — but a lasting change for the better is a hopeful sign.",
            tr: "Haccın kabulünü yalnızca Allah bilir — ama iyiye doğru kalıcı bir değişim ümit verici bir alamettir.",
          },
        },
        {
          question: {
            de: "Welche Taten sind Allah nach Bukhari 6464 am liebsten?",
            en: "According to Bukhari 6464, which deeds are most beloved to Allah?",
            tr: "Buhârî 6464'e göre Allah'a en sevimli ameller hangileridir?",
          },
          options: [
            { de: "Die beständigsten, auch wenn sie gering sind", en: "The most consistent, even if small", tr: "Az da olsa devamlı olanlar" },
            { de: "Nur große, einmalige Taten", en: "Only big, one-off deeds", tr: "Yalnızca büyük ve tek seferlik ameller" },
            { de: "Taten, die alle sehen", en: "Deeds that everyone sees", tr: "Herkesin gördüğü ameller" },
          ],
          answer: 0,
          explanation: {
            de: "Eine kleine Gewohnheit aus dem Hadsch, die man beibehält, wiegt viel.",
            en: "A small habit from Hajj that one keeps up carries great weight.",
            tr: "Hacdan kalan ve sürdürülen küçük bir alışkanlık çok değerlidir.",
          },
        },
        {
          question: {
            de: "Wie sollte man mit dem Ehrentitel „Hadschi/Hacı“ umgehen?",
            en: "How should one treat the honorary title “Hajji/Hacı”?",
            tr: "“Hacı” unvanına nasıl yaklaşılmalı?",
          },
          options: [
            { de: "Er ist religiöse Pflicht und muss eingefordert werden", en: "It is a religious duty and must be demanded", tr: "Dinî bir zorunluluktur ve talep edilmelidir" },
            { de: "Als kulturelle Ehrung — ohne Stolz und Prahlerei", en: "As a cultural honour — without pride or boasting", tr: "Kültürel bir hürmet olarak — gurur ve övünme olmadan" },
            { de: "Er macht frühere Pflichten überflüssig", en: "It makes earlier duties unnecessary", tr: "Önceki yükümlülükleri ortadan kaldırır" },
          ],
          answer: 1,
          explanation: {
            de: "Der Hadsch war für Allah; damit zu prahlen wäre Riya' und würde seinen Wert mindern.",
            en: "The Hajj was for Allah; boasting about it would be riya' and diminish its worth.",
            tr: "Hac Allah içindi; onunla övünmek riya olur ve değerini düşürür.",
          },
        },
      ],
      sources: [
        'Quran 2:200',
        'Sahih al-Bukhari 1797, Sahih Muslim 1344 (Heimkehr-Bittgebet)',
        'Sahih al-Bukhari 6464, Sahih Muslim 783',
        'Sahih al-Bukhari 1773, Sahih Muslim 1349 (Hajj mabrur)',
        QURAN_REF,
      ],
      review: 'draft',
    },
  ],
}
