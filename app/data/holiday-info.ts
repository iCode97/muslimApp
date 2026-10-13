/**
 * Explanations for Islamic holidays, nights and recommended fasting days.
 *
 * Content status: DRAFT — shown in the UI together with LearnDraftBadge
 * ("Inhalt wird noch fachlich geprüft") until a qualified person has reviewed it.
 *
 * Kandil nights are a Turkish-Islamic tradition: described neutrally, without
 * attaching virtues; scholarly criticism is mentioned.
 */

export type Locale3 = 'de' | 'en' | 'tr'

export interface LocalizedInfo {
  de: string
  en: string
  tr: string
  /** Source line (language-neutral citation). */
  source: string
}

export const HOLIDAY_INFO: Record<string, LocalizedInfo> = {
  'islamic-new-year': {
    de: 'Mit dem 1. Muharram beginnt das islamische Mondjahr. Die Zeitrechnung der Hidschra wurde unter Kalif Umar eingeführt und erinnert an die Auswanderung des Propheten ﷺ von Mekka nach Medina. Für den Tag selbst ist keine besondere Feier überliefert; empfohlen wird der Muharram als Monat des Fastens (siehe Aschura), dazu Besinnung und Dank für das vergangene Jahr.',
    en: 'The 1st of Muharram marks the start of the Islamic lunar year. The Hijri calendar was introduced under Caliph Umar and commemorates the Prophet’s ﷺ migration from Mecca to Medina. No special celebration of the day itself is reported; the month of Muharram is recommended for fasting (see Ashura), along with reflection and gratitude for the past year.',
    tr: '1 Muharrem, İslami ay yılının başlangıcıdır. Hicri takvim Hz. Ömer döneminde kabul edilmiş olup Peygamber’in ﷺ Mekke’den Medine’ye hicretini esas alır. Günün kendisi için özel bir kutlama nakledilmemiştir; Muharrem ayında oruç tutmak (bkz. Aşure), geçen yılı değerlendirmek ve şükretmek tavsiye edilir.',
    source: 'Sahih Muslim 1163',
  },
  'ashura': {
    de: 'Der 10. Muharram ist ein Fastentag, den bereits der Prophet ﷺ in Medina beging; er wird mit der Rettung Musas (Moses) verbunden. Empfohlen wird das Fasten am 10. Muharram, nach einer Überlieferung zusammen mit dem 9. oder dem 11. Tag. Für Schiiten ist Aschura zudem ein Trauertag im Gedenken an Husain; in der türkischen Tradition wird Aşure-Pudding gekocht und verteilt.',
    en: 'The 10th of Muharram is a fasting day that the Prophet ﷺ already observed in Medina; it is linked to the rescue of Musa (Moses). Fasting on the 10th is recommended, according to one report together with the 9th or the 11th. For Shia Muslims Ashura is also a day of mourning in memory of Husayn; in Turkish tradition Aşure pudding is cooked and shared.',
    tr: 'Muharrem’in 10. günü, Peygamber’in ﷺ Medine’de de tuttuğu bir oruç günüdür; Hz. Musa’nın kurtuluşuyla ilişkilendirilir. 10. günü, bir rivayete göre 9. veya 11. günle birlikte oruç tutmak tavsiye edilir. Şiiler için Aşure ayrıca Hz. Hüseyin’i anma ve yas günüdür; Türk geleneğinde aşure pişirilip dağıtılır.',
    source: 'Sahih Muslim 1162; Sahih al-Bukhari, Kitab as-Saum',
  },
  'mawlid': {
    de: 'Mawlid an-Nabi erinnert an die Geburt des Propheten Muhammad ﷺ, traditionell auf den 12. Rabi al-Awwal datiert (Gelehrte nennen auch andere Tage). In vielen Ländern, in der Türkei als Mevlid Kandili, wird er mit Koranrezitation, Salawat und Gedenkversammlungen begangen. Andere Gelehrte sehen eine besondere jährliche Feier kritisch, da sie aus der Frühzeit nicht überliefert ist; unstrittig sind die Liebe zum Propheten ﷺ, Salawat und das Befolgen seiner Sunna.',
    en: 'Mawlid an-Nabi commemorates the birth of the Prophet Muhammad ﷺ, traditionally dated to the 12th of Rabi al-Awwal (scholars also name other days). In many countries, in Türkiye as Mevlid Kandili, it is observed with Quran recitation, salawat and commemorative gatherings. Other scholars view a special yearly celebration critically because it is not reported from the earliest generations; undisputed are love for the Prophet ﷺ, sending blessings upon him and following his Sunnah.',
    tr: 'Mevlid, Hz. Muhammed’in ﷺ doğumunu anar; geleneksel olarak Rebiülevvel’in 12. gününe tarihlenir (âlimler başka günler de zikreder). Birçok ülkede, Türkiye’de Mevlid Kandili olarak Kur’an tilaveti, salavat ve anma toplantılarıyla geçirilir. Bazı âlimler, ilk dönemlerden nakledilmediği için yıllık özel kutlamaya eleştirel bakar; Peygamber’i ﷺ sevmek, salavat getirmek ve sünnetine uymak ise tartışmasızdır.',
    source: 'Ibn Hisham, as-Sira an-Nabawiyya; Sahih Muslim 1162',
  },
  'regaip': {
    de: 'Der Regaip Kandili wird in der türkisch-islamischen Tradition in der Nacht vor dem ersten Freitag des Monats Radschab begangen. Üblich sind zusätzliche freiwillige Gebete, Koranrezitation und Bittgebete. Gelehrte bewerten die Überlieferungen zu dieser Nacht unterschiedlich, und einige Gelehrte sehen besondere Feiern dieser Nacht kritisch. Unabhängig davon gehört der Radschab zu den vier heiligen Monaten.',
    en: 'In Turkish-Islamic tradition the Regaip Kandili is observed on the night before the first Friday of the month of Rajab. Common practices are extra voluntary prayers, Quran recitation and supplications. Scholars assess the reports about this night differently, and some scholars view special celebrations of this night critically. Independently of this, Rajab is one of the four sacred months.',
    tr: 'Regaip Kandili, Türk-İslam geleneğinde Recep ayının ilk cuma gecesinde idrak edilir. Nafile namaz, Kur’an okuma ve dua yaygın uygulamalardır. Âlimler bu geceyle ilgili rivayetleri farklı değerlendirir; bazı âlimler bu geceye özel kutlamalara eleştirel bakar. Bundan bağımsız olarak Recep, dört haram aydan biridir.',
    source: 'Quran 9:36; Turkish-Islamic tradition',
  },
  'miraj': {
    de: 'Isra und Miradsch erinnern an die nächtliche Reise des Propheten ﷺ von Mekka nach Jerusalem und seinen Aufstieg durch die Himmel; im Koran wird sie in 17:1 und 53:1–18 angesprochen. Nach der Überlieferung wurde dabei das tägliche Gebet auferlegt. Das Datum (27. Radschab) ist Tradition, Gelehrte nennen verschiedene Daten. In der Türkei wird die Nacht als Miraç Kandili mit Gebet und Besinnung begangen; einige Gelehrte sehen besondere Feiern dieser Nacht kritisch.',
    en: 'Isra and Mi’raj commemorate the Prophet’s ﷺ night journey from Mecca to Jerusalem and his ascension through the heavens; the Quran refers to it in 17:1 and 53:1–18. According to the reports, the daily prayer was prescribed during it. The date (27th Rajab) is traditional; scholars name different dates. In Türkiye the night is observed as Miraç Kandili with prayer and reflection; some scholars view special celebrations of this night critically.',
    tr: 'İsra ve Miraç, Peygamber’in ﷺ Mekke’den Kudüs’e gece yolculuğunu ve göklere yükselişini anar; Kur’an’da 17:1 ve 53:1–18 ayetlerinde işaret edilir. Rivayetlere göre günlük namaz bu vesileyle farz kılınmıştır. Tarih (27 Recep) gelenekseldir, âlimler farklı günler zikreder. Türkiye’de gece Miraç Kandili olarak namaz ve tefekkürle geçirilir; bazı âlimler bu geceye özel kutlamalara eleştirel bakar.',
    source: 'Quran 17:1, 53:1–18; Sahih al-Bukhari 349',
  },
  'baraat': {
    de: 'Die Nacht des 15. Scha’ban wird in der türkisch-islamischen Tradition als Berat Kandili begangen (arab. Laylat al-Bara’a bzw. Nisf Scha’ban). Üblich sind Gebet, Koranrezitation und die Bitte um Vergebung. Gelehrte bewerten die Überlieferungen zu dieser Nacht unterschiedlich, und einige Gelehrte sehen besondere Feiern kritisch. Unabhängig davon ist vom Propheten ﷺ überliefert, dass er im Scha’ban häufig fastete.',
    en: 'The night of the 15th of Sha’ban is observed in Turkish-Islamic tradition as Berat Kandili (Arabic: Laylat al-Bara’a or Nisf Sha’ban). Common practices are prayer, Quran recitation and asking for forgiveness. Scholars assess the reports about this night differently, and some scholars view special celebrations critically. Independently of this, it is reported that the Prophet ﷺ fasted often in Sha’ban.',
    tr: 'Şaban’ın 15. gecesi Türk-İslam geleneğinde Berat Kandili olarak idrak edilir (Arapça: Leyle-i Berâe veya Nısf-ı Şaban). Namaz, Kur’an okuma ve af dileme yaygın uygulamalardır. Âlimler bu geceyle ilgili rivayetleri farklı değerlendirir; bazı âlimler özel kutlamalara eleştirel bakar. Bundan bağımsız olarak Peygamber’in ﷺ Şaban ayında çokça oruç tuttuğu nakledilmiştir.',
    source: 'Sahih al-Bukhari, Kitab as-Saum; Turkish-Islamic tradition',
  },
  'ramadan-start': {
    de: 'Mit dem Ramadan, dem Monat der Herabsendung des Korans, beginnt das Fasten von der Morgendämmerung bis zum Sonnenuntergang (Koran 2:183–185). Der Monat beginnt mit der Mondsichtung oder nach Berechnung; Länder und Verbände folgen teils unterschiedlichen Methoden, daher kann der Beginn um einen Tag abweichen. Empfohlen sind die Absicht (Niyya), Koranrezitation, die Taraweeh-Gebete, Spenden und das gemeinsame Fastenbrechen.',
    en: 'With Ramadan, the month in which the Quran was revealed, the fast from dawn to sunset begins (Quran 2:183–185). The month starts with the sighting of the moon or by calculation; countries and organisations partly follow different methods, so the start can differ by a day. Recommended are the intention (niyya), Quran recitation, the Taraweeh prayers, charity and breaking the fast together.',
    tr: 'Kur’an’ın indirildiği Ramazan ayıyla birlikte imsaktan akşama kadar oruç başlar (Kur’an 2:183–185). Ay, hilalin görülmesi veya hesapla başlar; ülkeler ve kuruluşlar kısmen farklı yöntemler izlediğinden başlangıç bir gün farklı olabilir. Niyet, Kur’an okuma, teravih namazı, sadaka ve birlikte iftar tavsiye edilir.',
    source: 'Quran 2:183–185; Sahih al-Bukhari, Kitab as-Saum',
  },
  'laylat-al-qadr': {
    de: 'Die Nacht der Bestimmung (Laylat al-Qadr) ist die Nacht, in der die Herabsendung des Korans begann; Sure 97 nennt sie besser als tausend Monate. Ihr genaues Datum ist nicht überliefert, sie wird in den ungeraden Nächten der letzten zehn Tage des Ramadan gesucht. Die 27. Nacht ist in vielen Ländern, auch in der türkischen Tradition (Kadir Gecesi), die am meisten begangene. Empfohlen sind Gebet, Koranrezitation und Bittgebete.',
    en: 'The Night of Decree (Laylat al-Qadr) is the night in which the revelation of the Quran began; Surah 97 calls it better than a thousand months. Its exact date is not reported; it is sought in the odd nights of the last ten days of Ramadan. The 27th night is the most commonly observed in many countries, including the Turkish tradition (Kadir Gecesi). Prayer, Quran recitation and supplication are recommended.',
    tr: 'Kadir Gecesi, Kur’an’ın inmeye başladığı gecedir; Kadr suresi (97) onu bin aydan hayırlı olarak niteler. Kesin tarihi bildirilmemiştir, Ramazan’ın son on gününün tek gecelerinde aranır. 27. gece, Türk geleneği (Kadir Gecesi) dâhil birçok ülkede en çok idrak edilen gecedir. Namaz, Kur’an okuma ve dua tavsiye edilir.',
    source: 'Quran 97:1–5; Sahih al-Bukhari 2017',
  },
  'eid-al-fitr': {
    de: 'Das Fest des Fastenbrechens am 1. Schawwal beschließt den Ramadan und dauert drei Tage. Am Morgen wird das Festgebet verrichtet; vorher ist die Zakat al-Fitr zu entrichten. Üblich sind der Takbir, Besuche bei Familie und Nachbarn, Geschenke und das Teilen von Speisen mit Bedürftigen. Am Festtag selbst ist das Fasten nicht erlaubt; im Anschluss sind sechs Tage Schawwal empfohlen.',
    en: 'The Festival of Breaking the Fast on 1 Shawwal concludes Ramadan and lasts three days. The festival prayer is performed in the morning; Zakat al-Fitr must be paid beforehand. Customary are the takbir, visits to family and neighbours, gifts and sharing food with those in need. Fasting is not permitted on the day of the festival itself; six days of Shawwal are recommended afterwards.',
    tr: 'Şevval’in 1. günündeki Ramazan Bayramı, Ramazan’ı tamamlar ve üç gün sürer. Sabah bayram namazı kılınır; fitre bundan önce verilmelidir. Tekbir, aile ve komşu ziyaretleri, hediyeleşme ve ihtiyaç sahipleriyle yemek paylaşmak yaygındır. Bayram gününün kendisinde oruç tutulmaz; ardından Şevval’den altı gün oruç tavsiye edilir.',
    source: 'Sahih al-Bukhari 1503; Sahih Muslim 1164',
  },
  'arafat': {
    de: 'Der Tag von Arafat (9. Dhu l-Hiddscha) ist der Höhepunkt der Hadsch, an dem die Pilger auf der Ebene von Arafat verweilen. Wer nicht pilgert, dem wird das Fasten an diesem Tag empfohlen; der Prophet ﷺ sagte, er hoffe, dass Allah dadurch die Sünden des vorangegangenen und des folgenden Jahres vergibt. Dazu sind Bittgebete, Dhikr und der Takbir an diesem Tag empfohlen.',
    en: 'The Day of Arafah (9 Dhul-Hijja) is the peak of the Hajj, when pilgrims stay on the plain of Arafat. For those not on pilgrimage, fasting on this day is recommended; the Prophet ﷺ said he hoped Allah would forgive the sins of the previous and the coming year through it. Supplications, dhikr and takbir are also recommended on this day.',
    tr: 'Arefe günü (Zilhicce’nin 9’u) haccın zirvesidir; hacılar Arafat ovasında vakfe yapar. Hacda olmayanlara bu gün oruç tutmak tavsiye edilir; Peygamber ﷺ, Allah’ın bununla önceki ve sonraki yılın günahlarını bağışlamasını umduğunu söylemiştir. Ayrıca dua, zikir ve tekbir tavsiye edilir.',
    source: 'Sahih Muslim 1162',
  },
  'eid-al-adha': {
    de: 'Das Opferfest beginnt am 10. Dhu l-Hiddscha und erinnert an die Bereitschaft Ibrahims (Abraham), seinen Sohn auf Allahs Gebot zu opfern, und an das Opfertier, das an dessen Stelle trat (Koran 37:102–107). Es beginnt mit dem Festgebet; wer dazu in der Lage ist, bringt ein Opfer (Qurbani) dar und teilt das Fleisch mit Familie, Nachbarn und Bedürftigen. An den Festtagen ist das Fasten nicht erlaubt; häufig gesprochen wird der Takbir.',
    en: 'The Festival of Sacrifice begins on 10 Dhul-Hijja and commemorates Ibrahim’s (Abraham’s) willingness to sacrifice his son at Allah’s command and the animal that took his place (Quran 37:102–107). It begins with the festival prayer; those who are able offer a sacrifice (Qurbani) and share the meat with family, neighbours and the needy. Fasting is not permitted on the festival days; the takbir is recited frequently.',
    tr: 'Kurban Bayramı Zilhicce’nin 10. günü başlar; Hz. İbrahim’in Allah’ın emriyle oğlunu kurban etmeye hazır oluşunu ve onun yerine gelen kurbanlığı anar (Kur’an 37:102–107). Bayram namazıyla başlar; gücü yetenler kurban keser ve eti aile, komşu ve ihtiyaç sahipleriyle paylaşır. Bayram günlerinde oruç tutulmaz; tekbir sıkça getirilir.',
    source: 'Quran 37:102–107, 22:34–37',
  },
}

/** Recommended (voluntary) fasting days that can be marked in the calendar. */
export type FastingKind = 'bid' | 'monThu' | 'arafah' | 'ashura' | 'tasua' | 'shawwal'

export const FASTING_INFO: Record<FastingKind, LocalizedInfo> = {
  bid: {
    de: 'Die „weißen Tage“ (Ayyam al-Bid) sind der 13., 14. und 15. jedes Hijri-Monats, an denen der Mond hell leuchtet. Das Fasten an diesen drei Tagen wird als Sunna empfohlen. Im Ramadan ist das Fasten ohnehin Pflicht; am 13. Dhu l-Hiddscha ist es nicht erlaubt.',
    en: 'The “white days” (Ayyam al-Bid) are the 13th, 14th and 15th of each Hijri month, when the moon shines brightly. Fasting on these three days is recommended as Sunnah. In Ramadan fasting is obligatory anyway; on 13 Dhul-Hijja it is not permitted.',
    tr: '„Eyyâm-ı Bîd“ (beyaz günler), her Hicri ayın 13., 14. ve 15. günleridir; ay bu günlerde parlak görünür. Bu üç günde oruç tutmak sünnet olarak tavsiye edilir. Ramazan’da oruç zaten farzdır; Zilhicce’nin 13. günü oruç caiz değildir.',
    source: 'Sunan at-Tirmidhi; Sunan an-Nasa’i (Abu Dharr)',
  },
  monThu: {
    de: 'Der Prophet ﷺ pflegte montags und donnerstags zu fasten. Er sagte, dass an diesen Tagen die Taten vor Allah vorgelegt werden und er gern fastend sei. Das Fasten ist freiwillig (Sunna).',
    en: 'The Prophet ﷺ used to fast on Mondays and Thursdays. He said that deeds are presented to Allah on these days and that he liked to be fasting. The fast is voluntary (Sunnah).',
    tr: 'Peygamber ﷺ pazartesi ve perşembe günleri oruç tutardı. Bu günlerde amellerin Allah’a arz edildiğini ve oruçlu iken arz edilmesini sevdiğini söylemiştir. Bu oruç nafiledir (sünnet).',
    source: 'Sunan at-Tirmidhi 745, 747; Sahih Muslim 1162',
  },
  arafah: {
    de: 'Das Fasten am Tag von Arafat (9. Dhu l-Hiddscha) wird allen empfohlen, die nicht auf der Pilgerreise sind. Der Prophet ﷺ sagte, er hoffe, dass Allah dadurch die Sünden des vorangegangenen und des folgenden Jahres vergibt.',
    en: 'Fasting on the Day of Arafah (9 Dhul-Hijja) is recommended for everyone who is not on pilgrimage. The Prophet ﷺ said he hoped Allah would forgive the sins of the previous and the coming year through it.',
    tr: 'Arefe günü (Zilhicce’nin 9’u) oruç tutmak, hacda olmayan herkese tavsiye edilir. Peygamber ﷺ, Allah’ın bununla önceki ve sonraki yılın günahlarını bağışlamasını umduğunu söylemiştir.',
    source: 'Sahih Muslim 1162',
  },
  ashura: {
    de: 'Das Fasten am 10. Muharram (Aschura) wird empfohlen; der Prophet ﷺ sagte, er hoffe, dass Allah dadurch die Sünden des vergangenen Jahres vergibt. Es wird mit der Rettung Musas (Moses) verbunden.',
    en: 'Fasting on the 10th of Muharram (Ashura) is recommended; the Prophet ﷺ said he hoped Allah would forgive the sins of the past year through it. It is linked to the rescue of Musa (Moses).',
    tr: 'Muharrem’in 10. günü (Aşure) oruç tutmak tavsiye edilir; Peygamber ﷺ, Allah’ın bununla geçen yılın günahlarını bağışlamasını umduğunu söylemiştir. Hz. Musa’nın kurtuluşuyla ilişkilendirilir.',
    source: 'Sahih Muslim 1162; Sahih al-Bukhari, Kitab as-Saum',
  },
  tasua: {
    de: 'Zusätzlich zum 10. Muharram wird das Fasten am 9. Muharram (Tasu’a) empfohlen. Der Prophet ﷺ äußerte gegen Ende seines Lebens die Absicht, im folgenden Jahr auch den 9. Tag zu fasten; so unterscheidet man sich vom alleinigen Fasten am 10.',
    en: 'In addition to the 10th of Muharram, fasting on the 9th of Muharram (Tasu’a) is recommended. Toward the end of his life the Prophet ﷺ expressed the intention to also fast the 9th the following year, so as not to fast on the 10th alone.',
    tr: 'Muharrem’in 10. gününe ek olarak 9. günü (Tâsûâ) de oruç tutmak tavsiye edilir. Peygamber ﷺ hayatının sonlarında ertesi yıl 9. günü de tutma niyetini dile getirmiştir; böylece yalnızca 10. günü tutmaktan ayrışılır.',
    source: 'Sahih Muslim, Kitab as-Siyam',
  },
  shawwal: {
    de: 'Nach dem Ramadan werden sechs weitere Fastentage im Schawwal empfohlen. Der Prophet ﷺ sagte, wer den Ramadan fastet und ihm sechs Tage Schawwal folgen lässt, dem sei es, als hätte er das ganze Jahr gefastet. Die Tage können zusammenhängend oder verteilt gefastet werden, frühestens ab dem 2. Schawwal.',
    en: 'After Ramadan, six further days of fasting in Shawwal are recommended. The Prophet ﷺ said that whoever fasts Ramadan and follows it with six days of Shawwal is as if they had fasted the whole year. The days may be fasted consecutively or spread out, from the 2nd of Shawwal at the earliest.',
    tr: 'Ramazan’dan sonra Şevval ayında altı gün daha oruç tutmak tavsiye edilir. Peygamber ﷺ, Ramazan’ı tutup ardından Şevval’den altı gün tutan kişinin bütün yıl oruç tutmuş gibi olacağını söylemiştir. Günler peş peşe veya ayrı ayrı, en erken Şevval’in 2. gününden itibaren tutulabilir.',
    source: 'Sahih Muslim 1164',
  },
}

export interface FastingContext {
  hijriDay: number
  hijriMonth: number
  /** Gregorian weekday key as used by the calendar grid: Mon … Sun. */
  weekday: string
}

/**
 * Recommended fasting kinds for a given Hijri day. Obligatory fasting (Ramadan)
 * and days on which fasting is forbidden (Eid al-Fitr, 10–13 Dhul-Hijja) yield none.
 * `shawwal` is not per-day (any day of the month) and therefore never returned here.
 */
export function fastingKindsFor(ctx: FastingContext): FastingKind[] {
  const { hijriDay: d, hijriMonth: m, weekday } = ctx
  if (m === 9) return [] // Ramadan: fasting is obligatory
  if (m === 10 && d === 1) return [] // Eid al-Fitr
  if (m === 12 && d >= 10 && d <= 13) return [] // Eid al-Adha + days of tashriq

  const kinds: FastingKind[] = []
  if (m === 12 && d === 9) kinds.push('arafah')
  if (m === 1 && d === 10) kinds.push('ashura')
  if (m === 1 && d === 9) kinds.push('tasua')
  if (d >= 13 && d <= 15) kinds.push('bid')
  if (weekday === 'Mon' || weekday === 'Thu') kinds.push('monThu')
  return kinds
}

export function pickLocalized(info: LocalizedInfo, locale: string): string {
  if (locale === 'tr') return info.tr
  if (locale === 'en' || locale === 'ar') return info.en // no Arabic copy: English fallback
  return info.de
}
