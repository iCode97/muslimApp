/**
 * Learning path: "Neu im Islam" — a gentle, practical first-steps path for
 * new Muslims (converts/reverts) and anyone who wants to start practising.
 *
 * Quran translations follow Bubenheim/Elyas (de), Sahih International (en)
 * and Diyanet İşleri Başkanlığı Meali (tr), partly abridged.
 */
import type { LearningPath } from '../types'

const TRANSLATIONS = 'Koranübersetzungen angelehnt an Bubenheim/Elyas (de), Sahih International (en), Diyanet Meali (tr)'

export const NEW_MUSLIM_PATH: LearningPath = {
  id: 'new-muslim',
  icon: '🤝',
  level: 'discover',
  title: {
    de: 'Neu im Islam',
    en: 'New to Islam',
    tr: "İslam'a Yeni Başlayanlar",
  },
  description: {
    de: 'Deine ersten Schritte als Muslim/a – Schahada, Reinigung, das erste Gebet, Halal im Alltag, Familie und Gemeinschaft. Ruhig, praktisch und Schritt für Schritt.',
    en: 'Your first steps as a Muslim – shahada, purification, your first prayer, halal in daily life, family and community. Calm, practical and step by step.',
    tr: 'Müslüman olarak ilk adımların – şehadet, temizlik, ilk namaz, günlük hayatta helal, aile ve topluluk. Sakin, pratik ve adım adım.',
  },
  lessons: [
    // ─────────────────────────────────────────────────────────── 1
    {
      id: 'welcome',
      title: {
        de: 'Willkommen – was jetzt?',
        en: 'Welcome – what now?',
        tr: 'Hoş geldin – şimdi ne olacak?',
      },
      summary: {
        de: 'Ein Neuanfang ohne Druck: Deine Vergangenheit ist vergeben, und du darfst Schritt für Schritt lernen.',
        en: 'A fresh start without pressure: your past is forgiven, and you may learn step by step.',
        tr: 'Baskısız bir yeni başlangıç: Geçmişin bağışlandı ve adım adım öğrenebilirsin.',
      },
      minutes: 4,
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Schön, dass du hier bist! Ob du gerade die Schahada gesprochen hast oder noch darüber nachdenkst: Viele neue Muslime fühlen sich am Anfang überwältigt – so viele Regeln, Begriffe und Meinungen. Atme durch. Niemand erwartet, dass du alles auf einmal weißt.',
            en: 'We are glad you are here! Whether you have just said the shahada or are still thinking about it: many new Muslims feel overwhelmed at first – so many rules, terms and opinions. Take a breath. Nobody expects you to know everything at once.',
            tr: 'Burada olmana çok sevindik! İster şehadet getirmiş ol, ister hâlâ düşünüyor ol: Pek çok yeni Müslüman başta kendini bunalmış hisseder – bir sürü kural, kavram ve görüş. Derin bir nefes al. Kimse her şeyi bir anda bilmeni beklemiyor.',
          },
        },
        {
          type: 'heading',
          text: {
            de: 'Ein echter Neuanfang',
            en: 'A true fresh start',
            tr: 'Gerçek bir yeni başlangıç',
          },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 121',
          narrator: 'Amr ibn al-As',
          grade: 'sahih',
          text: {
            de: 'Der Prophet ﷺ sagte: „Weißt du nicht, dass der Islam auslöscht, was vor ihm war?"',
            en: 'The Prophet ﷺ said: "Do you not know that Islam wipes out what came before it?"',
            tr: 'Peygamber ﷺ şöyle buyurdu: "Bilmez misin ki İslam, kendinden önceki (günahları) siler?"',
          },
        },
        {
          type: 'quran',
          ref: '25:70',
          translation: {
            de: 'Außer demjenigen, der bereut, glaubt und rechtschaffene Werke tut; jenen wird Allah ihre bösen Taten gegen gute eintauschen. Und Allah ist stets Allvergebend und Barmherzig.',
            en: 'Except for those who repent, believe and do righteous work. For them Allah will replace their evil deeds with good. And ever is Allah Forgiving and Merciful.',
            tr: 'Ancak tövbe eden, iman edip salih amel işleyenler başka. Allah onların kötülüklerini iyiliklere çevirir. Allah çok bağışlayandır, çok merhamet edendir.',
          },
        },
        {
          type: 'heading',
          text: {
            de: 'Was du jetzt nicht tun musst',
            en: 'What you do not have to do now',
            tr: 'Şimdi yapmak zorunda olmadıkların',
          },
        },
        {
          type: 'list',
          items: [
            {
              de: '**Deinen Namen ändern** – das ist keine Pflicht. Nur ein Name mit schlechter Bedeutung (z. B. einer, der Anbetung von etwas außer Allah ausdrückt) sollte geändert werden.',
              en: '**Change your name** – this is not required. Only a name with a bad meaning (e.g. one expressing worship of something other than Allah) should be changed.',
              tr: '**Adını değiştirmek** – bu bir zorunluluk değil. Yalnızca kötü anlamlı bir isim (ör. Allah\'tan başkasına kulluğu ifade eden) değiştirilmelidir.',
            },
            {
              de: '**Alles sofort wissen** – Wissen wächst mit der Zeit. Auch die Gefährten des Propheten ﷺ lernten nach und nach.',
              en: '**Know everything immediately** – knowledge grows over time. The Companions of the Prophet ﷺ also learned gradually.',
              tr: '**Her şeyi hemen bilmek** – ilim zamanla büyür. Peygamber\'in ﷺ ashabı da yavaş yavaş öğrendi.',
            },
            {
              de: '**Verpasste Gebete aus der Zeit vor dem Islam nachholen** – darüber sind sich die Gelehrten einig.',
              en: '**Make up prayers from the time before Islam** – scholars agree on this.',
              tr: '**İslam\'dan önceki dönemin namazlarını kaza etmek** – âlimler bu konuda hemfikirdir.',
            },
            {
              de: '**Dein ganzes Leben auf einmal umkrempeln** – Beziehungen, Arbeit und Gewohnheiten dürfen sich in Ruhe entwickeln.',
              en: '**Overhaul your whole life at once** – relationships, work and habits may develop calmly.',
              tr: '**Bütün hayatını bir anda değiştirmek** – ilişkiler, iş ve alışkanlıklar sakince gelişebilir.',
            },
          ],
        },
        {
          type: 'heading',
          text: {
            de: 'Klein, aber beständig',
            en: 'Small but consistent',
            tr: 'Az ama devamlı',
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 6464, Sahih Muslim 783',
          narrator: 'Aischa',
          grade: 'sahih',
          text: {
            de: 'Der Prophet ﷺ sagte: „Die bei Allah beliebtesten Taten sind die beständigsten, auch wenn sie gering sind."',
            en: 'The Prophet ﷺ said: "The most beloved of deeds to Allah are the most consistent of them, even if they are small."',
            tr: 'Peygamber ﷺ şöyle buyurdu: "Allah katında amellerin en sevimlisi, az da olsa devamlı olanıdır."',
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: 'Ein guter Plan für die ersten Wochen: 1) Schahada verstehen, 2) Reinigung (Ghusl, Wudu) lernen, 3) mit dem Gebet beginnen – auch wenn es noch holprig ist. Alles andere kommt danach.',
            en: 'A good plan for the first weeks: 1) understand the shahada, 2) learn purification (ghusl, wudu), 3) start praying – even if it is still clumsy. Everything else comes after.',
            tr: 'İlk haftalar için iyi bir plan: 1) Şehadeti anlamak, 2) temizliği (gusül, abdest) öğrenmek, 3) namaza başlamak – henüz aksasa bile. Gerisi sonra gelir.',
          },
        },
        { type: 'terms', ids: ['islam', 'shahada', 'tawba', 'sunnah'] },
      ],
      quiz: [
        {
          question: {
            de: 'Was geschieht laut Sahih Muslim 121 mit den Sünden vor dem Islam?',
            en: 'According to Sahih Muslim 121, what happens to sins committed before Islam?',
            tr: "Sahih Müslim 121'e göre İslam'dan önceki günahlara ne olur?",
          },
          options: [
            { de: 'Sie müssen einzeln abgebüßt werden', en: 'They must each be atoned for individually', tr: 'Her biri tek tek telafi edilmelidir' },
            { de: 'Der Islam löscht sie aus', en: 'Islam wipes them out', tr: 'İslam onları siler' },
            { de: 'Sie bleiben bis zum Jüngsten Tag bestehen', en: 'They remain until the Day of Judgement', tr: 'Kıyamet gününe kadar kalır' },
          ],
          answer: 1,
          explanation: {
            de: 'Der Prophet ﷺ sagte, dass der Islam auslöscht, was vor ihm war. Du beginnst mit einem reinen Blatt.',
            en: 'The Prophet ﷺ said that Islam wipes out what came before it. You begin with a clean slate.',
            tr: "Peygamber ﷺ İslam'ın kendinden öncekini sildiğini söyledi. Tertemiz bir sayfayla başlıyorsun.",
          },
        },
        {
          question: {
            de: 'Muss man beim Übertritt zum Islam seinen Namen ändern?',
            en: 'Do you have to change your name when becoming Muslim?',
            tr: 'Müslüman olunca isim değiştirmek zorunlu mu?',
          },
          options: [
            { de: 'Ja, immer', en: 'Yes, always', tr: 'Evet, her zaman' },
            { de: 'Nein, nur ein Name mit schlechter Bedeutung sollte geändert werden', en: 'No, only a name with a bad meaning should be changed', tr: 'Hayır, yalnızca kötü anlamlı bir isim değiştirilmelidir' },
            { de: 'Nur Frauen müssen ihn ändern', en: 'Only women have to change it', tr: 'Sadece kadınlar değiştirmeli' },
          ],
          answer: 1,
          explanation: {
            de: 'Ein neuer Name ist keine Pflicht. Viele Gefährten behielten ihre Namen; nur Namen mit schlechter Bedeutung wurden geändert.',
            en: 'A new name is not required. Many Companions kept their names; only names with bad meanings were changed.',
            tr: 'Yeni bir isim zorunlu değildir. Sahabelerin çoğu isimlerini korudu; yalnızca kötü anlamlı isimler değiştirildi.',
          },
        },
        {
          question: {
            de: 'Welche Taten liebt Allah laut dem Hadith am meisten?',
            en: 'According to the hadith, which deeds does Allah love most?',
            tr: 'Hadise göre Allah en çok hangi amelleri sever?',
          },
          options: [
            { de: 'Die größten und schwersten', en: 'The biggest and hardest ones', tr: 'En büyük ve en zor olanları' },
            { de: 'Die beständigsten, auch wenn sie klein sind', en: 'The most consistent, even if small', tr: 'Az da olsa devamlı olanları' },
            { de: 'Die, die andere sehen', en: 'The ones others see', tr: 'Başkalarının gördükleri' },
          ],
          answer: 1,
          explanation: {
            de: 'Beständigkeit zählt mehr als große Vorsätze, die man nicht durchhält (Bukhari 6464, Muslim 783).',
            en: 'Consistency counts more than big resolutions you cannot keep up (Bukhari 6464, Muslim 783).',
            tr: 'Devamlılık, sürdürülemeyen büyük kararlardan daha değerlidir (Buhârî 6464, Müslim 783).',
          },
        },
      ],
      sources: [
        'Sahih Muslim 121',
        'Sahih al-Bukhari 6464, Sahih Muslim 783',
        'Quran 25:70',
        TRANSLATIONS,
      ],
      review: 'draft',
    },

    // ─────────────────────────────────────────────────────────── 2
    {
      id: 'shahada',
      title: {
        de: 'Die Schahada bewusst sprechen',
        en: 'Saying the shahada consciously',
        tr: 'Şehadeti bilinçli olarak söylemek',
      },
      summary: {
        de: 'Was das Glaubensbekenntnis bedeutet und warum keine feierliche Zeremonie nötig ist.',
        en: 'What the declaration of faith means and why no formal ceremony is needed.',
        tr: 'İman beyanının anlamı ve neden resmî bir törene gerek olmadığı.',
      },
      minutes: 4,
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Die Schahada ist das Glaubensbekenntnis und die erste der fünf Säulen des Islam. Mit ihr bezeugst du, dass es keinen Gott gibt außer Allah und dass Muhammad ﷺ Sein Gesandter ist.',
            en: 'The shahada is the declaration of faith and the first of the five pillars of Islam. With it you testify that there is no god but Allah and that Muhammad ﷺ is His Messenger.',
            tr: "Şehadet, iman beyanıdır ve İslam'ın beş şartının ilkidir. Onunla Allah'tan başka ilah olmadığına ve Hz. Muhammed'in ﷺ O'nun elçisi olduğuna şahitlik edersin.",
          },
        },
        {
          type: 'text',
          text: {
            de: '**Aschhadu an la ilaha illa-llah, wa aschhadu anna Muhammadan rasulu-llah.** – „Ich bezeuge, dass es keinen Gott gibt außer Allah, und ich bezeuge, dass Muhammad der Gesandte Allahs ist."',
            en: '**Ashhadu an la ilaha illa-llah, wa ashhadu anna Muhammadan rasulu-llah.** – "I bear witness that there is no god but Allah, and I bear witness that Muhammad is the Messenger of Allah."',
            tr: '**Eşhedü en lâ ilâhe illallah ve eşhedü enne Muhammeden Resûlullah.** – "Şahitlik ederim ki Allah\'tan başka ilah yoktur ve yine şahitlik ederim ki Muhammed Allah\'ın elçisidir."',
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 8, Sahih Muslim 16',
          narrator: 'Abdullah ibn Umar',
          grade: 'sahih',
          text: {
            de: 'Der Prophet ﷺ sagte: „Der Islam ist auf fünf (Säulen) gebaut: dem Bezeugen, dass es keinen Gott gibt außer Allah und dass Muhammad der Gesandte Allahs ist, dem Verrichten des Gebets, dem Entrichten der Zakat, der Pilgerfahrt und dem Fasten im Ramadan."',
            en: 'The Prophet ﷺ said: "Islam is built upon five: testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, establishing the prayer, giving zakat, Hajj, and fasting in Ramadan."',
            tr: 'Peygamber ﷺ şöyle buyurdu: "İslam beş şey üzerine kurulmuştur: Allah\'tan başka ilah olmadığına ve Muhammed\'in Allah\'ın elçisi olduğuna şahitlik etmek, namaz kılmak, zekât vermek, hac yapmak ve Ramazan orucunu tutmak."',
          },
        },
        {
          type: 'heading',
          text: {
            de: 'Was die Worte bedeuten',
            en: 'What the words mean',
            tr: 'Kelimelerin anlamı',
          },
        },
        {
          type: 'list',
          items: [
            {
              de: '**La ilaha illa-llah:** Nichts und niemand verdient Anbetung außer Allah – kein Mensch, kein Idol, kein Geld, kein Ego. Das ist Tauhid, die Einheit Gottes.',
              en: '**La ilaha illa-llah:** nothing and no one deserves worship except Allah – no person, idol, money or ego. This is tawhid, the oneness of God.',
              tr: "**Lâ ilâhe illallah:** Allah'tan başka hiçbir şey ve hiç kimse ibadete layık değildir – ne bir insan, ne bir put, ne para, ne de nefis. Bu tevhiddir, Allah'ın birliği.",
            },
            {
              de: '**Muhammadun rasulu-llah:** Muhammad ﷺ ist der letzte Prophet. Wir lernen von seinem Vorbild (Sunna), wie wir Allah dienen.',
              en: '**Muhammadun rasulu-llah:** Muhammad ﷺ is the final Prophet. From his example (Sunnah) we learn how to serve Allah.',
              tr: "**Muhammedün Resûlullah:** Hz. Muhammed ﷺ son peygamberdir. Allah'a nasıl kulluk edeceğimizi onun örnekliğinden (sünnet) öğreniriz.",
            },
            {
              de: 'Gelehrte betonen, dass die Schahada mit **Wissen, Gewissheit und Aufrichtigkeit** gesprochen wird – also verstanden und von Herzen gemeint.',
              en: 'Scholars stress that the shahada is said with **knowledge, certainty and sincerity** – understood and meant from the heart.',
              tr: 'Âlimler şehadetin **bilgi, kesin inanç ve ihlasla** söylenmesi gerektiğini vurgular – yani anlaşılarak ve gönülden kastedilerek.',
            },
          ],
        },
        {
          type: 'quran',
          ref: '47:19',
          translation: {
            de: 'So wisse, dass es keinen Gott gibt außer Allah, und bitte um Vergebung für deine Sünde …',
            en: 'So know that there is no deity except Allah and ask forgiveness for your sin …',
            tr: "Bil ki, Allah'tan başka hiçbir ilah yoktur. Günahın için bağışlanma dile …",
          },
        },
        {
          type: 'heading',
          text: {
            de: 'Braucht es eine Zeremonie?',
            en: 'Is a ceremony needed?',
            tr: 'Bir tören gerekli mi?',
          },
        },
        {
          type: 'text',
          text: {
            de: 'Nein. Es gibt keine Taufe, keinen Priester und keine vorgeschriebene Feier. Wer die Schahada aufrichtig glaubt und ausspricht, ist Muslim/a. Viele sprechen sie trotzdem gern in einer Moschee vor Zeugen – das kann schön und praktisch sein.',
            en: 'No. There is no baptism, no priest and no prescribed ceremony. Whoever sincerely believes and says the shahada is Muslim. Many still like to say it in a mosque in front of witnesses – this can be beautiful and practical.',
            tr: 'Hayır. Vaftiz, rahip ya da belirlenmiş bir tören yoktur. Şehadete samimiyetle inanan ve onu dile getiren kişi Müslümandır. Yine de birçok kişi onu camide şahitler önünde söylemeyi sever – bu hem güzel hem de pratik olabilir.',
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: 'Zeugen sind nach verbreiteter Ansicht keine Bedingung für die Gültigkeit vor Allah, werden aber oft empfohlen – etwa damit die Gemeinschaft dich kennt und unterstützt, oder für praktische Fragen wie Heirat, Bestattung oder eine Bescheinigung für die Umra. Auch ob die Schahada auf Arabisch gesprochen werden muss, wird unterschiedlich gesehen; wer Arabisch (noch) nicht aussprechen kann, darf sie nach vielen Gelehrten in seiner eigenen Sprache sagen. Frag im Zweifel einen vertrauenswürdigen Imam.',
            en: 'According to a widespread view, witnesses are not a condition for validity before Allah, but they are often recommended – so that the community knows and supports you, or for practical matters such as marriage, burial or a certificate for Umrah. Whether the shahada must be said in Arabic is also viewed differently; according to many scholars, someone who cannot (yet) pronounce Arabic may say it in their own language. When in doubt, ask a trustworthy imam.',
            tr: "Yaygın görüşe göre şahitler Allah katında geçerlilik için şart değildir, ancak çoğu zaman tavsiye edilir – örneğin topluluğun seni tanıyıp desteklemesi için ya da evlilik, cenaze veya umre için belge gibi pratik konular için. Şehadetin Arapça söylenmesinin şart olup olmadığı da farklı değerlendirilir; birçok âlime göre Arapçayı (henüz) telaffuz edemeyen kişi onu kendi dilinde söyleyebilir. Şüphede kalırsan güvenilir bir imama danış.",
          },
        },
        { type: 'terms', ids: ['shahada', 'tawhid', 'rasul', 'iman'] },
      ],
      quiz: [
        {
          question: {
            de: 'Was bedeutet „La ilaha illa-llah"?',
            en: 'What does "La ilaha illa-llah" mean?',
            tr: '"Lâ ilâhe illallah" ne demektir?',
          },
          options: [
            { de: 'Allah ist groß', en: 'Allah is great', tr: 'Allah en büyüktür' },
            { de: 'Es gibt keinen Gott außer Allah', en: 'There is no god but Allah', tr: "Allah'tan başka ilah yoktur" },
            { de: 'Im Namen Allahs', en: 'In the name of Allah', tr: "Allah'ın adıyla" },
          ],
          answer: 1,
          explanation: {
            de: 'Der erste Teil der Schahada bekräftigt Tauhid: Nur Allah verdient Anbetung.',
            en: 'The first part of the shahada affirms tawhid: only Allah deserves worship.',
            tr: 'Şehadetin ilk kısmı tevhidi teyit eder: Yalnızca Allah ibadete layıktır.',
          },
        },
        {
          question: {
            de: 'Ist eine feierliche Zeremonie Voraussetzung, um Muslim/a zu werden?',
            en: 'Is a formal ceremony required to become Muslim?',
            tr: 'Müslüman olmak için resmî bir tören şart mı?',
          },
          options: [
            { de: 'Ja, mit einem Imam', en: 'Yes, with an imam', tr: 'Evet, bir imamla' },
            { de: 'Nein, aufrichtiger Glaube und das Aussprechen der Schahada genügen', en: 'No, sincere belief and saying the shahada are enough', tr: 'Hayır, samimi inanç ve şehadeti söylemek yeterlidir' },
            { de: 'Ja, nur in Mekka', en: 'Yes, only in Mecca', tr: "Evet, sadece Mekke'de" },
          ],
          answer: 1,
          explanation: {
            de: 'Der Islam kennt keine Taufe oder Priesterweihe. Zeugen werden oft empfohlen, sind aber nach verbreiteter Ansicht keine Bedingung.',
            en: 'Islam has no baptism or ordination. Witnesses are often recommended but, according to a widespread view, are not a condition.',
            tr: 'İslam\'da vaftiz veya ruhban takdisi yoktur. Şahitler sıklıkla tavsiye edilir, ancak yaygın görüşe göre şart değildir.',
          },
        },
      ],
      sources: [
        'Sahih al-Bukhari 8, Sahih Muslim 16',
        'Quran 47:19',
        TRANSLATIONS,
      ],
      review: 'draft',
    },

    // ─────────────────────────────────────────────────────────── 3
    {
      id: 'ghusl',
      title: {
        de: 'Ghusl – die Ganzkörperwaschung',
        en: 'Ghusl – the full-body purification',
        tr: 'Gusül – boy abdesti',
      },
      summary: {
        de: 'Wann der Ghusl nötig ist und wie du ihn Schritt für Schritt verrichtest.',
        en: 'When ghusl is required and how to perform it step by step.',
        tr: 'Guslün ne zaman gerektiği ve adım adım nasıl alınacağı.',
      },
      minutes: 5,
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Reinheit (Tahara) ist die Voraussetzung für das Gebet. Es gibt die kleine Waschung (Wudu) und die große Ganzkörperwaschung (Ghusl). Der Ghusl hebt den Zustand der „großen Unreinheit" auf.',
            en: 'Purity (tahara) is a prerequisite for prayer. There is the small ablution (wudu) and the full-body purification (ghusl). Ghusl removes the state of "major impurity".',
            tr: 'Temizlik (taharet) namazın ön şartıdır. Küçük abdest (abdest) ve boy abdesti (gusül) vardır. Gusül, "büyük hadesi" (cünüplük vb.) giderir.',
          },
        },
        {
          type: 'quran',
          ref: '5:6',
          translation: {
            de: '… Und wenn ihr im Zustand der Unreinheit (Dschanaba) seid, dann reinigt euch …',
            en: '… And if you are in a state of janabah, then purify yourselves …',
            tr: '… Eğer cünüp iseniz, iyice temizlenin (boy abdesti alın) …',
          },
        },
        {
          type: 'heading',
          text: {
            de: 'Wann ist Ghusl Pflicht?',
            en: 'When is ghusl obligatory?',
            tr: 'Gusül ne zaman farzdır?',
          },
        },
        {
          type: 'list',
          items: [
            { de: 'nach Geschlechtsverkehr oder Samenerguss (Dschanaba)', en: 'after sexual intercourse or ejaculation (janabah)', tr: 'cinsel ilişki veya meni gelmesinden sonra (cünüplük)' },
            { de: 'nach dem Ende der Menstruation', en: 'after menstruation ends', tr: 'hayız (adet) bittikten sonra' },
            { de: 'nach dem Ende der Wochenbettblutung', en: 'after postnatal bleeding ends', tr: 'lohusalık kanaması bittikten sonra' },
          ],
        },
        {
          type: 'heading',
          text: {
            de: 'Ghusl beim Eintritt in den Islam',
            en: 'Ghusl when entering Islam',
            tr: "İslam'a girerken gusül",
          },
        },
        {
          type: 'hadith',
          source: 'Sunan Abi Dawud 355, Jami at-Tirmidhi 605',
          narrator: 'Qais ibn Asim',
          grade: 'hasan',
          text: {
            de: 'Qais ibn Asim berichtete, dass er Muslim wurde und der Prophet ﷺ ihm auftrug, sich mit Wasser und Sidr (Lotusblättern) zu waschen.',
            en: 'Qays ibn Asim reported that he became Muslim and the Prophet ﷺ instructed him to wash with water and sidr (lote leaves).',
            tr: 'Kays b. Âsım, Müslüman olduğunu ve Peygamber\'in ﷺ kendisine su ve sidr (sedir yaprağı) ile yıkanmasını emrettiğini anlattı.',
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: 'Ob der Ghusl beim Übertritt Pflicht oder empfohlen ist, sehen die Rechtsschulen unterschiedlich: Unter anderem in der hanbalitischen Schule gilt er als Pflicht, in der hanafitischen und schafiitischen Schule als empfohlen – es sei denn, man befindet sich im Zustand großer Unreinheit, dann ist er für alle Pflicht. In der Praxis empfehlen fast alle Lehrer, ihn zu verrichten. Er ist keine Bedingung dafür, die Schahada zu sprechen.',
            en: 'Whether ghusl upon conversion is obligatory or recommended differs between the schools: among others, the Hanbali school considers it obligatory, the Hanafi and Shafi\'i schools recommended – unless one is in a state of major impurity, in which case it is obligatory for all. In practice almost all teachers advise doing it. It is not a condition for saying the shahada.',
            tr: 'İslam\'a girerken guslün farz mı yoksa müstehap mı olduğu mezheplere göre değişir: Örneğin Hanbelî mezhebinde farz, Hanefî ve Şâfiî mezheplerinde müstehap kabul edilir – kişi cünüp ise herkes için farzdır. Uygulamada hemen hemen tüm hocalar gusül alınmasını tavsiye eder. Şehadet getirmek için şart değildir.',
          },
        },
        {
          type: 'heading',
          text: {
            de: 'So geht der Ghusl (nach der Sunna)',
            en: 'How to do ghusl (according to the Sunnah)',
            tr: 'Sünnete göre gusül nasıl alınır',
          },
        },
        {
          type: 'list',
          items: [
            { de: '1. Fasse die Absicht (Niyya) im Herzen und sage „Bismillah".', en: '1. Make the intention (niyyah) in your heart and say "Bismillah".', tr: '1. Kalbinden niyet et ve "Bismillah" de.' },
            { de: '2. Wasche die Hände und dann den Intimbereich.', en: '2. Wash your hands and then the private parts.', tr: '2. Ellerini, ardından avret mahallini yıka.' },
            { de: '3. Verrichte das Wudu wie für das Gebet.', en: '3. Perform wudu as for prayer.', tr: '3. Namaz abdesti gibi abdest al.' },
            { de: '4. Gieße dreimal Wasser über den Kopf, sodass es die Haarwurzeln erreicht.', en: '4. Pour water over your head three times so that it reaches the roots of the hair.', tr: '4. Başına üç kez su dök, suyun saç diplerine ulaşmasını sağla.' },
            { de: '5. Wasche den ganzen Körper, beginnend mit der rechten Seite – kein Stück Haut darf trocken bleiben.', en: '5. Wash the whole body, starting with the right side – no part of the skin may remain dry.', tr: '5. Sağ taraftan başlayarak bütün vücudu yıka – hiçbir yer kuru kalmamalı.' },
          ],
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 248, Sahih Muslim 316',
          narrator: 'Aischa',
          grade: 'sahih',
          text: {
            de: 'Aischa beschrieb, dass der Prophet ﷺ beim Ghusl zuerst seine Hände wusch, dann das Wudu wie für das Gebet verrichtete, mit den Fingern Wasser an die Haarwurzeln brachte, dreimal Wasser über den Kopf goss und dann Wasser über den ganzen Körper fließen ließ.',
            en: 'Aishah described that in ghusl the Prophet ﷺ first washed his hands, then performed wudu as for prayer, worked water into the roots of his hair with his fingers, poured water over his head three times and then let water flow over his whole body.',
            tr: 'Hz. Âişe, Peygamber\'in ﷺ gusülde önce ellerini yıkadığını, sonra namaz abdesti gibi abdest aldığını, parmaklarıyla suyu saç diplerine ulaştırdığını, başına üç kez su döktüğünü ve ardından bütün vücuduna su akıttığını anlattı.',
          },
        },
        {
          type: 'note',
          variant: 'important',
          text: {
            de: 'Das Minimum für einen gültigen Ghusl: die Absicht und dass Wasser den gesamten Körper erreicht. In der hanafitischen Schule gehören auch Mund- und Nasenspülung zu den Pflichtteilen. Nagellack oder wasserfeste Schichten verhindern, dass Wasser die Haut/Nägel erreicht, und sollten vorher entfernt werden.',
            en: 'The minimum for a valid ghusl: the intention and water reaching the entire body. In the Hanafi school, rinsing the mouth and nose are also obligatory parts. Nail polish or waterproof layers prevent water from reaching skin/nails and should be removed first.',
            tr: 'Geçerli bir gusül için asgari şart: niyet ve suyun bütün vücuda ulaşması. Hanefî mezhebinde ağza ve burna su vermek de farzdır. Oje veya su geçirmeyen tabakalar suyun cilde/tırnaklara ulaşmasını engeller; önceden çıkarılmalıdır.',
          },
        },
        { type: 'terms', ids: ['ghusl', 'tahara', 'niyyah', 'wudu', 'bismillah'] },
      ],
      quiz: [
        {
          question: {
            de: 'Was ist das Minimum für einen gültigen Ghusl?',
            en: 'What is the minimum for a valid ghusl?',
            tr: 'Geçerli bir gusül için asgari şart nedir?',
          },
          options: [
            { de: 'Nur die Hände und das Gesicht waschen', en: 'Only washing hands and face', tr: 'Sadece elleri ve yüzü yıkamak' },
            { de: 'Absicht und Wasser auf dem gesamten Körper', en: 'Intention and water over the entire body', tr: 'Niyet ve suyun bütün vücuda ulaşması' },
            { de: 'Duschen mit Seife', en: 'Showering with soap', tr: 'Sabunla duş almak' },
          ],
          answer: 1,
          explanation: {
            de: 'Die Absicht und dass Wasser den ganzen Körper erreicht, sind das Kernstück. Die Hanafiten zählen Mund- und Nasenspülung dazu.',
            en: 'Intention and water reaching the whole body are the core. The Hanafis also count rinsing mouth and nose.',
            tr: 'Niyet ve suyun bütün vücuda ulaşması esastır. Hanefîler ağza ve burna su vermeyi de buna dahil eder.',
          },
        },
        {
          question: {
            de: 'Wann ist Ghusl für alle Pflicht?',
            en: 'When is ghusl obligatory for everyone?',
            tr: 'Gusül ne zaman herkes için farzdır?',
          },
          options: [
            { de: 'Nach jedem Gebet', en: 'After every prayer', tr: 'Her namazdan sonra' },
            { de: 'Nach Geschlechtsverkehr und nach Ende der Menstruation', en: 'After intercourse and after menstruation ends', tr: 'Cinsel ilişkiden sonra ve adet bittikten sonra' },
            { de: 'Nur am Freitag', en: 'Only on Friday', tr: 'Sadece cuma günü' },
          ],
          answer: 1,
          explanation: {
            de: 'Dschanaba, Menstruation und Wochenbettblutung erfordern den Ghusl. Ghusl am Freitag ist eine Sunna.',
            en: 'Janabah, menstruation and postnatal bleeding require ghusl. Ghusl on Friday is a Sunnah.',
            tr: 'Cünüplük, hayız ve lohusalık gusül gerektirir. Cuma günü gusül almak sünnettir.',
          },
        },
      ],
      sources: [
        'Quran 5:6',
        'Sahih al-Bukhari 248, Sahih Muslim 316',
        'Sunan Abi Dawud 355, Jami at-Tirmidhi 605 (Qais ibn Asim)',
        TRANSLATIONS,
      ],
      review: 'draft',
    },

    // ─────────────────────────────────────────────────────────── 4
    {
      id: 'wudu',
      title: {
        de: 'Wudu lernen',
        en: 'Learning wudu',
        tr: 'Abdest almayı öğrenmek',
      },
      summary: {
        de: 'Die rituelle Waschung vor dem Gebet – kurz erklärt, mit Schritt-für-Schritt-Anleitung in der App.',
        en: 'The ritual ablution before prayer – briefly explained, with a step-by-step guide in the app.',
        tr: 'Namazdan önceki abdest – kısaca anlatıldı, uygulamada adım adım rehberle.',
      },
      minutes: 3,
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Vor jedem Gebet brauchst du Wudu, die kleine rituelle Waschung. Sie dauert nur wenige Minuten und wird schnell zur Gewohnheit. Viele empfinden sie als Moment, in dem sie den Alltag „abwaschen" und zur Ruhe kommen.',
            en: 'Before each prayer you need wudu, the small ritual ablution. It only takes a few minutes and quickly becomes a habit. Many experience it as a moment to "wash off" daily life and calm down.',
            tr: 'Her namazdan önce abdest alman gerekir. Sadece birkaç dakika sürer ve kısa sürede alışkanlık hâline gelir. Pek çok kişi onu günlük hayatın yükünü "yıkayıp" huzura erdiği bir an olarak yaşar.',
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 135, Sahih Muslim 225',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: 'Der Prophet ﷺ sagte: „Allah nimmt das Gebet von keinem von euch an, wenn er seine Reinheit verloren hat, bis er das Wudu verrichtet."',
            en: 'The Prophet ﷺ said: "Allah does not accept the prayer of any of you if he has broken his ablution until he performs wudu."',
            tr: 'Peygamber ﷺ şöyle buyurdu: "Abdesti bozulan kimse abdest alıncaya kadar Allah onun namazını kabul etmez."',
          },
        },
        {
          type: 'heading',
          text: {
            de: 'Die Pflichtteile laut Koran 5:6',
            en: 'The obligatory parts according to Quran 5:6',
            tr: "Kur'an 5:6'ya göre farzlar",
          },
        },
        {
          type: 'quran',
          ref: '5:6',
          translation: {
            de: 'O die ihr glaubt, wenn ihr euch zum Gebet aufstellt, dann wascht euch das Gesicht und die Hände bis zu den Ellbogen und streicht euch über den Kopf und (wascht euch) die Füße bis zu den Knöcheln …',
            en: 'O you who have believed, when you rise to [perform] prayer, wash your faces and your forearms to the elbows and wipe over your heads and wash your feet to the ankles …',
            tr: 'Ey iman edenler! Namaza kalktığınız zaman yüzlerinizi, dirseklere kadar ellerinizi yıkayın; başlarınızı meshedin, topuklara kadar ayaklarınızı da yıkayın …',
          },
        },
        {
          type: 'list',
          items: [
            { de: 'Gesicht waschen', en: 'Wash the face', tr: 'Yüzü yıkamak' },
            { de: 'Arme bis einschließlich Ellbogen waschen', en: 'Wash the arms up to and including the elbows', tr: 'Kolları dirseklerle birlikte yıkamak' },
            { de: 'Über den Kopf streichen', en: 'Wipe over the head', tr: 'Başı meshetmek' },
            { de: 'Füße bis einschließlich Knöchel waschen', en: 'Wash the feet up to and including the ankles', tr: 'Ayakları topuklarla birlikte yıkamak' },
          ],
        },
        {
          type: 'text',
          text: {
            de: 'Dazu kommen Sunna-Handlungen wie Hände waschen, Mund und Nase spülen und jeden Schritt dreimal wiederholen. Die vollständige Abfolge mit Bildern findest du im Gebets-Guide.',
            en: 'Sunnah acts are added, such as washing the hands, rinsing mouth and nose, and repeating each step three times. You will find the complete sequence with illustrations in the prayer guide.',
            tr: 'Bunlara elleri yıkamak, ağza ve burna su vermek ve her adımı üç kez tekrarlamak gibi sünnetler eklenir. Resimli tam sıralamayı namaz rehberinde bulabilirsin.',
          },
        },
        {
          type: 'link',
          to: '/guide',
          label: { de: 'Wudu Schritt für Schritt', en: 'Wudu step by step', tr: 'Adım adım abdest' },
        },
        {
          type: 'heading',
          text: {
            de: 'Was das Wudu aufhebt',
            en: 'What breaks wudu',
            tr: 'Abdesti bozan şeyler',
          },
        },
        {
          type: 'list',
          items: [
            { de: 'Toilettengang (Urin, Stuhl) und Abgang von Winden', en: 'Using the toilet (urine, stool) and passing wind', tr: 'Tuvalet ihtiyacı (idrar, dışkı) ve yel çıkması' },
            { de: 'Tiefer Schlaf', en: 'Deep sleep', tr: 'Derin uyku' },
            { de: 'Bewusstlosigkeit', en: 'Loss of consciousness', tr: 'Bilinç kaybı' },
            { de: 'Alles, was einen Ghusl erforderlich macht', en: 'Anything that requires ghusl', tr: 'Gusül gerektiren her şey' },
          ],
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: 'Bei einigen Punkten unterscheiden sich die Rechtsschulen, z. B. ob Blutungen oder Erbrechen das Wudu aufheben (hanafitische Schule: ja, bei bestimmter Menge) oder ob das Berühren der Haut des anderen Geschlechts es aufhebt (schafiitische Schule: ja; andere Schulen: nein bzw. nur unter Bedingungen). Folge am besten konsequent einer Lehrmeinung, die dir ein vertrauenswürdiger Lehrer erklärt.',
            en: 'The schools differ on some points, e.g. whether bleeding or vomiting breaks wudu (Hanafi school: yes, above a certain amount) or whether touching the skin of the opposite sex breaks it (Shafi\'i school: yes; other schools: no or only under conditions). It is best to consistently follow one view explained to you by a trustworthy teacher.',
            tr: 'Bazı konularda mezhepler farklılık gösterir; örneğin kan akması veya kusmanın abdesti bozup bozmadığı (Hanefî mezhebi: belirli miktarda evet) ya da karşı cinsin tenine dokunmanın abdesti bozup bozmadığı (Şâfiî mezhebi: evet; diğer mezhepler: hayır veya belirli şartlarla). En iyisi, güvenilir bir hocanın sana açıkladığı bir görüşü tutarlı şekilde takip etmektir.',
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: 'Kein Wasser verfügbar oder krank? Dann gibt es die Trockenreinigung (Tayammum) mit sauberer Erde (Koran 5:6).',
            en: 'No water available or ill? Then there is dry purification (tayammum) with clean earth (Quran 5:6).',
            tr: "Su yok ya da hasta mısın? O zaman temiz toprakla teyemmüm yapılır (Kur'an 5:6).",
          },
        },
        { type: 'terms', ids: ['wudu', 'tayammum', 'tahara', 'fard', 'sunnah'] },
      ],
      quiz: [
        {
          question: {
            de: 'Welcher Teil gehört laut Koran 5:6 zu den Pflichtteilen des Wudu?',
            en: 'Which part is among the obligatory parts of wudu according to Quran 5:6?',
            tr: "Kur'an 5:6'ya göre aşağıdakilerden hangisi abdestin farzlarındandır?",
          },
          options: [
            { de: 'Die Ohren waschen', en: 'Washing the ears', tr: 'Kulakları yıkamak' },
            { de: 'Die Arme bis zu den Ellbogen waschen', en: 'Washing the arms up to the elbows', tr: 'Kolları dirseklere kadar yıkamak' },
            { de: 'Den Hals waschen', en: 'Washing the neck', tr: 'Boynu yıkamak' },
          ],
          answer: 1,
          explanation: {
            de: 'Der Vers nennt Gesicht, Arme bis zu den Ellbogen, Kopf (streichen) und Füße bis zu den Knöcheln.',
            en: 'The verse names the face, arms up to the elbows, head (wiping) and feet up to the ankles.',
            tr: 'Ayet yüzü, dirseklere kadar kolları, başı (mesh) ve topuklara kadar ayakları sayar.',
          },
        },
        {
          question: {
            de: 'Was hebt das Wudu nach allen Rechtsschulen auf?',
            en: 'What breaks wudu according to all schools?',
            tr: 'Bütün mezheplere göre abdesti ne bozar?',
          },
          options: [
            { de: 'Toilettengang', en: 'Using the toilet', tr: 'Tuvalet ihtiyacını gidermek' },
            { de: 'Lachen außerhalb des Gebets', en: 'Laughing outside prayer', tr: 'Namaz dışında gülmek' },
            { de: 'Essen', en: 'Eating', tr: 'Yemek yemek' },
          ],
          answer: 0,
          explanation: {
            de: 'Urin, Stuhl und Winde heben das Wudu einstimmig auf. Bei anderen Punkten gibt es Meinungsunterschiede.',
            en: 'Urine, stool and wind break wudu by consensus. On other points there are differences of opinion.',
            tr: 'İdrar, dışkı ve yel abdesti ittifakla bozar. Diğer konularda görüş farklılıkları vardır.',
          },
        },
      ],
      sources: [
        'Quran 5:6',
        'Sahih al-Bukhari 135, Sahih Muslim 225',
        TRANSLATIONS,
      ],
      review: 'draft',
    },

    // ─────────────────────────────────────────────────────────── 5
    {
      id: 'first-prayer',
      title: {
        de: 'Dein erstes Gebet – Schritt für Schritt',
        en: 'Your first prayer – step by step',
        tr: 'İlk namazın – adım adım',
      },
      summary: {
        de: 'Wie du mit dem Gebet beginnst, auch wenn du noch nicht alles auswendig kannst.',
        en: 'How to start praying, even if you have not memorised everything yet.',
        tr: 'Henüz her şeyi ezberlemesen bile namaza nasıl başlayacağın.',
      },
      minutes: 6,
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Das Gebet (Salah) ist nach der Schahada die wichtigste Säule. Fünfmal am Tag stehst du vor Allah – kurz, persönlich und ohne Vermittler. Am Anfang wird es sich ungewohnt anfühlen. Das ist völlig normal.',
            en: 'Prayer (salah) is the most important pillar after the shahada. Five times a day you stand before Allah – briefly, personally and without intermediary. At first it will feel unfamiliar. That is completely normal.',
            tr: "Namaz, şehadetten sonra en önemli rükündür. Günde beş kez Allah'ın huzurunda durursun – kısa, kişisel ve aracısız. Başta alışılmadık gelecektir. Bu tamamen normaldir.",
          },
        },
        {
          type: 'quran',
          ref: '4:103',
          translation: {
            de: '… Gewiss, das Gebet ist für die Gläubigen eine zeitgebundene Vorschrift.',
            en: '… Indeed, prayer has been decreed upon the believers a decree of specified times.',
            tr: '… Şüphesiz namaz, müminler üzerine vakitleri belirlenmiş bir farzdır.',
          },
        },
        {
          type: 'heading',
          text: {
            de: 'Der Ablauf einer Gebetseinheit (Rak\'a)',
            en: 'The sequence of one prayer unit (rak\'ah)',
            tr: 'Bir rekâtın sıralaması',
          },
        },
        {
          type: 'list',
          items: [
            { de: '1. Richte dich zur Qibla aus und fasse die Absicht.', en: '1. Face the qibla and make the intention.', tr: '1. Kıbleye dön ve niyet et.' },
            { de: '2. Takbir: „Allahu akbar" – Hände heben, das Gebet beginnt.', en: '2. Takbir: "Allahu akbar" – raise your hands, the prayer begins.', tr: '2. Tekbir: "Allahu ekber" – ellerini kaldır, namaz başlar.' },
            { de: '3. Im Stehen: Al-Fatiha rezitieren (danach, wenn möglich, eine kurze Sure).', en: '3. Standing: recite Al-Fatiha (then, if possible, a short surah).', tr: "3. Ayakta: Fâtiha'yı oku (sonra mümkünse kısa bir sure)." },
            { de: '4. Ruku: verbeugen, „Subhana rabbiyal-azim".', en: '4. Ruku: bow, "Subhana rabbiyal-azim".', tr: '4. Rükû: eğil, "Sübhâne rabbiye\'l-azîm".' },
            { de: '5. Aufrichten, dann zwei Niederwerfungen (Sudschud): „Subhana rabbiyal-a\'la".', en: '5. Stand up, then two prostrations (sujud): "Subhana rabbiyal-a\'la".', tr: '5. Doğrul, sonra iki secde: "Sübhâne rabbiye\'l-a\'lâ".' },
            { de: '6. Nach der letzten Einheit: Sitzen mit Taschahhud, dann Salam nach rechts und links.', en: '6. After the last unit: sit for the tashahhud, then salam to the right and left.', tr: '6. Son rekâttan sonra: oturup Tahiyyat\'ı oku, sonra sağa ve sola selam ver.' },
          ],
        },
        {
          type: 'link',
          to: '/guide',
          label: { de: 'Gebets-Guide mit allen Positionen', en: 'Prayer guide with all positions', tr: 'Tüm pozisyonlarla namaz rehberi' },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 631',
          narrator: 'Malik ibn al-Huwairith',
          grade: 'sahih',
          text: {
            de: 'Der Prophet ﷺ sagte: „Betet, wie ihr mich beten gesehen habt."',
            en: 'The Prophet ﷺ said: "Pray as you have seen me praying."',
            tr: 'Peygamber ﷺ şöyle buyurdu: "Beni nasıl namaz kılarken gördüyseniz, öyle kılın."',
          },
        },
        {
          type: 'heading',
          text: {
            de: 'Ein sanfter Einstieg',
            en: 'A gentle start',
            tr: 'Yumuşak bir başlangıç',
          },
        },
        {
          type: 'list',
          items: [
            {
              de: '**Beginne mit dem Pflichtteil (Fard):** Das Morgengebet (Fadschr) hat nur zwei Einheiten – ideal zum Üben. Die freiwilligen Sunna-Gebete kannst du später ergänzen.',
              en: '**Start with the obligatory part (fard):** the dawn prayer (Fajr) has only two units – ideal for practising. You can add the voluntary Sunnah prayers later.',
              tr: '**Farzlarla başla:** Sabah namazının farzı sadece iki rekâttır – pratik yapmak için ideal. Sünnet namazları sonra ekleyebilirsin.',
            },
            {
              de: '**Lerne Al-Fatiha zuerst:** Sie wird in jeder Einheit rezitiert. Lerne Vers für Vers mit Audio.',
              en: '**Learn Al-Fatiha first:** it is recited in every unit. Learn verse by verse with audio.',
              tr: "**Önce Fâtiha'yı öğren:** Her rekâtta okunur. Ses kaydıyla ayet ayet öğren.",
            },
            {
              de: '**Bete mit anderen:** In der Moschee oder mit einer Freundin/einem Freund kannst du einfach mitmachen – der Imam rezitiert laut.',
              en: '**Pray with others:** in the mosque or with a friend you can simply follow along – the imam recites aloud.',
              tr: '**Başkalarıyla kıl:** Camide ya da bir arkadaşınla kolayca uyabilirsin – imam sesli okur.',
            },
          ],
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 756, Sahih Muslim 394',
          narrator: 'Ubada ibn as-Samit',
          grade: 'sahih',
          text: {
            de: 'Der Prophet ﷺ sagte: „Es gibt kein Gebet für den, der nicht die Eröffnende (Al-Fatiha) des Buches rezitiert."',
            en: 'The Prophet ﷺ said: "There is no prayer for the one who does not recite the Opening (Al-Fatiha) of the Book."',
            tr: 'Peygamber ﷺ şöyle buyurdu: "Fâtiha\'yı okumayanın namazı yoktur."',
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: 'Was tun, solange man Al-Fatiha noch nicht auswendig kann? Gelehrte sind sich einig, dass man das tut, was man kann, und weiterlernt (Koran 2:286). Viele raten, in der Zwischenzeit bekannte Lobpreisungen (z. B. „Subhanallah, alhamdulillah, la ilaha illallah, Allahu akbar") zu sagen. Ob man im Gebet von einem Zettel oder Bildschirm ablesen darf, wird unterschiedlich beurteilt: Nach Abu Hanifa macht Ablesen aus dem Koran das Gebet ungültig, andere Gelehrte erlauben es zumindest bei freiwilligen Gebeten. Frag deinen Lehrer, was er dir für die Übergangszeit empfiehlt.',
            en: 'What to do while you do not yet know Al-Fatiha by heart? Scholars agree that you do what you can and keep learning (Quran 2:286). Many advise saying well-known phrases of praise in the meantime (e.g. "Subhanallah, alhamdulillah, la ilaha illallah, Allahu akbar"). Whether you may read from a card or screen during prayer is judged differently: according to Abu Hanifa, reading from the Quran invalidates the prayer, while other scholars permit it at least in voluntary prayers. Ask your teacher what they recommend for the transition period.',
            tr: "Fâtiha'yı henüz ezbere bilmiyorsan ne yapmalısın? Âlimler, kişinin gücü yettiğini yapıp öğrenmeye devam edeceği konusunda hemfikirdir (Kur'an 2:286). Pek çoğu bu arada bilinen zikirlerin (ör. \"Sübhânallah, elhamdülillah, lâ ilâhe illallah, Allahu ekber\") söylenmesini tavsiye eder. Namazda bir karttan veya ekrandan okumanın caiz olup olmadığı farklı değerlendirilir: Ebû Hanîfe'ye göre Mushaf'tan bakarak okumak namazı bozar; diğer bazı âlimler en azından nafile namazlarda buna izin verir. Geçiş dönemi için hocana danış.",
          },
        },
        {
          type: 'heading',
          text: {
            de: 'Zeit und Richtung',
            en: 'Time and direction',
            tr: 'Vakit ve yön',
          },
        },
        {
          type: 'text',
          text: {
            de: 'Jedes Gebet hat ein Zeitfenster – du musst nicht auf die Minute genau beten, sondern innerhalb des Fensters. Gebetet wird in Richtung der Kaaba in Mekka (Qibla).',
            en: 'Each prayer has a time window – you do not have to pray at the exact minute, but within the window. Prayer is performed facing the Kaaba in Mecca (qibla).',
            tr: "Her namazın bir vakit aralığı vardır – tam dakikasında değil, bu aralık içinde kılman gerekir. Namaz Mekke'deki Kâbe yönüne (kıble) doğru kılınır.",
          },
        },
        {
          type: 'link',
          to: '/prayer',
          label: { de: 'Gebetszeiten', en: 'Prayer times', tr: 'Namaz vakitleri' },
        },
        {
          type: 'link',
          to: '/qibla',
          label: { de: 'Qibla-Kompass', en: 'Qibla compass', tr: 'Kıble pusulası' },
        },
        {
          type: 'link',
          to: '/quran/1',
          label: { de: 'Al-Fatiha lesen und anhören', en: 'Read and listen to Al-Fatiha', tr: "Fâtiha'yı oku ve dinle" },
        },
        { type: 'terms', ids: ['salah', 'rakah', 'takbir', 'ruku', 'sujud', 'tashahhud', 'qibla'] },
      ],
      quiz: [
        {
          question: {
            de: 'Wie viele Pflicht-Einheiten (Rak\'a) hat das Morgengebet (Fadschr)?',
            en: 'How many obligatory units (rak\'ah) does the dawn prayer (Fajr) have?',
            tr: 'Sabah namazının farzı kaç rekâttır?',
          },
          options: [
            { de: '2', en: '2', tr: '2' },
            { de: '3', en: '3', tr: '3' },
            { de: '4', en: '4', tr: '4' },
          ],
          answer: 0,
          explanation: {
            de: 'Fadschr hat zwei Pflicht-Einheiten und eignet sich gut zum Üben.',
            en: 'Fajr has two obligatory units and is well suited for practising.',
            tr: 'Sabah namazının farzı iki rekâttır ve pratik yapmak için çok uygundur.',
          },
        },
        {
          question: {
            de: 'Welche Sure wird in jeder Gebetseinheit rezitiert?',
            en: 'Which surah is recited in every prayer unit?',
            tr: 'Her rekâtta hangi sure okunur?',
          },
          options: [
            { de: 'Al-Ikhlas', en: 'Al-Ikhlas', tr: 'İhlâs' },
            { de: 'Al-Fatiha', en: 'Al-Fatiha', tr: 'Fâtiha' },
            { de: 'Al-Baqara', en: 'Al-Baqarah', tr: 'Bakara' },
          ],
          answer: 1,
          explanation: {
            de: 'Al-Fatiha ist das Herzstück jeder Einheit (Bukhari 756, Muslim 394).',
            en: 'Al-Fatiha is the heart of every unit (Bukhari 756, Muslim 394).',
            tr: 'Fâtiha her rekâtın özüdür (Buhârî 756, Müslim 394).',
          },
        },
        {
          question: {
            de: 'Muss man genau zur Minute des Gebetsbeginns beten?',
            en: 'Do you have to pray at the exact minute the prayer time begins?',
            tr: 'Namaz, vaktin girdiği dakikada mı kılınmalı?',
          },
          options: [
            { de: 'Ja, sonst ist es ungültig', en: 'Yes, otherwise it is invalid', tr: 'Evet, yoksa geçersiz olur' },
            { de: 'Nein, innerhalb des Zeitfensters', en: 'No, within the time window', tr: 'Hayır, vakit aralığı içinde' },
          ],
          answer: 1,
          explanation: {
            de: 'Jedes Gebet hat ein Zeitfenster. Früh zu beten ist besser, aber innerhalb des Fensters ist das Gebet gültig.',
            en: 'Each prayer has a time window. Praying early is better, but within the window the prayer is valid.',
            tr: 'Her namazın bir vakit aralığı vardır. Erken kılmak daha faziletlidir, ancak vakit içinde kılınan namaz geçerlidir.',
          },
        },
      ],
      sources: [
        'Quran 4:103, 2:286',
        'Sahih al-Bukhari 631',
        'Sahih al-Bukhari 756, Sahih Muslim 394',
        TRANSLATIONS,
      ],
      review: 'draft',
    },

    // ─────────────────────────────────────────────────────────── 6
    {
      id: 'first-surahs-duas',
      title: {
        de: 'Die ersten Suren und Duas',
        en: 'Your first surahs and duas',
        tr: 'İlk sureler ve dualar',
      },
      summary: {
        de: 'Al-Fatiha, Al-Ikhlas, Al-Falaq und An-Nas – kurze Suren, die dich ein Leben lang begleiten.',
        en: 'Al-Fatiha, Al-Ikhlas, Al-Falaq and An-Nas – short surahs that accompany you for life.',
        tr: 'Fâtiha, İhlâs, Felak ve Nâs – ömür boyu sana eşlik edecek kısa sureler.',
      },
      minutes: 6,
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Für das Gebet brauchst du zunächst nur wenige kurze Suren. Lerne sie langsam, Vers für Vers, am besten mit Audio. Jeder Vers, den du lernst, ist ein Gewinn.',
            en: 'For prayer you need only a few short surahs at first. Learn them slowly, verse by verse, ideally with audio. Every verse you learn is a gain.',
            tr: 'Namaz için başlangıçta sadece birkaç kısa sureye ihtiyacın var. Onları yavaş yavaş, ayet ayet, tercihen sesli olarak öğren. Öğrendiğin her ayet bir kazançtır.',
          },
        },
        {
          type: 'heading',
          text: { de: '1. Al-Fatiha – Die Eröffnende', en: '1. Al-Fatiha – The Opening', tr: '1. Fâtiha Suresi' },
        },
        {
          type: 'quran',
          ref: '1:1-7',
          arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
          translation: {
            de: 'Im Namen Allahs, des Allerbarmers, des Barmherzigen. (Alles) Lob gehört Allah, dem Herrn der Weltenbewohner, dem Allerbarmer, dem Barmherzigen, dem Herrscher am Tag des Gerichts. Dir (allein) dienen wir, und zu Dir (allein) flehen wir um Hilfe. Leite uns den geraden Weg, den Weg derjenigen, denen Du Gunst erwiesen hast, nicht derjenigen, die (Deinen) Zorn erregt haben, und nicht der Irregehenden!',
            en: 'In the name of Allah, the Entirely Merciful, the Especially Merciful. [All] praise is [due] to Allah, Lord of the worlds – the Entirely Merciful, the Especially Merciful, Sovereign of the Day of Recompense. It is You we worship and You we ask for help. Guide us to the straight path – the path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who are astray.',
            tr: "Rahmân ve Rahîm olan Allah'ın adıyla. Hamd, âlemlerin Rabbi Allah'a mahsustur. O, Rahmân'dır ve Rahîm'dir. Ceza gününün sahibidir. (Allah'ım!) Yalnız sana kulluk eder ve yalnız senden yardım dileriz. Bize doğru yolu göster; kendilerine nimet verdiklerinin yolunu; gazaba uğramışların ve sapmışların yolunu değil.",
          },
        },
        {
          type: 'link',
          to: '/quran/1',
          label: { de: 'Al-Fatiha mit Audio', en: 'Al-Fatiha with audio', tr: 'Sesli Fâtiha' },
        },
        {
          type: 'heading',
          text: { de: '2. Al-Ikhlas – Die Aufrichtigkeit', en: '2. Al-Ikhlas – Sincerity', tr: '2. İhlâs Suresi' },
        },
        {
          type: 'quran',
          ref: '112:1-4',
          arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
          translation: {
            de: 'Sag: Er ist Allah, ein Einziger, Allah, der Überlegene (auf den alle angewiesen sind). Er hat nicht gezeugt und ist nicht gezeugt worden, und niemand ist Ihm jemals gleich.',
            en: 'Say: He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.',
            tr: "De ki: O, Allah'tır, bir tektir. Allah Samed'dir (her şey O'na muhtaçtır, O hiçbir şeye muhtaç değildir). O, doğurmamış ve doğmamıştır. Hiçbir şey O'na denk değildir.",
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 5013',
          narrator: 'Abu Said al-Khudri',
          grade: 'sahih',
          text: {
            de: 'Der Prophet ﷺ sagte über Sure Al-Ikhlas, dass sie einem Drittel des Korans gleichkommt.',
            en: 'The Prophet ﷺ said about Surah Al-Ikhlas that it is equal to a third of the Quran.',
            tr: "Peygamber ﷺ İhlâs Suresi için Kur'an'ın üçte birine denk olduğunu söyledi.",
          },
        },
        {
          type: 'link',
          to: '/quran/112',
          label: { de: 'Al-Ikhlas mit Audio', en: 'Al-Ikhlas with audio', tr: 'Sesli İhlâs' },
        },
        {
          type: 'heading',
          text: { de: '3. & 4. Al-Falaq und An-Nas – Suren des Schutzes', en: '3. & 4. Al-Falaq and An-Nas – surahs of protection', tr: '3. ve 4. Felak ve Nâs – korunma sureleri' },
        },
        {
          type: 'quran',
          ref: '113:1-2',
          translation: {
            de: 'Sag: Ich nehme Zuflucht beim Herrn des Tagesanbruchs vor dem Übel dessen, was Er erschaffen hat …',
            en: 'Say: I seek refuge in the Lord of daybreak from the evil of that which He created …',
            tr: 'De ki: Yarattığı şeylerin kötülüğünden sabahın Rabbine sığınırım …',
          },
        },
        {
          type: 'quran',
          ref: '114:1-4',
          translation: {
            de: 'Sag: Ich nehme Zuflucht beim Herrn der Menschen, dem König der Menschen, dem Gott der Menschen, vor dem Übel des Einflüsterers, des Davonschleichenden …',
            en: 'Say: I seek refuge in the Lord of mankind, the Sovereign of mankind, the God of mankind, from the evil of the retreating whisperer …',
            tr: 'De ki: Sinsi vesvesecinin şerrinden, insanların Rabbine, insanların Melik\'ine, insanların İlah\'ına sığınırım …',
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 5017',
          narrator: 'Aischa',
          grade: 'sahih',
          text: {
            de: 'Jeden Abend vor dem Schlafen legte der Prophet ﷺ die Hände zusammen, rezitierte Al-Ikhlas, Al-Falaq und An-Nas, hauchte hinein und strich damit über seinen Körper – dreimal.',
            en: 'Every night before sleeping, the Prophet ﷺ would cup his hands, recite Al-Ikhlas, Al-Falaq and An-Nas, blow into them and wipe over his body with them – three times.',
            tr: 'Peygamber ﷺ her gece yatmadan önce ellerini birleştirir, İhlâs, Felak ve Nâs surelerini okuyup ellerine üfler ve onlarla vücudunu meshederdi – üç kez.',
          },
        },
        {
          type: 'heading',
          text: { de: 'Duas für den Alltag', en: 'Duas for daily life', tr: 'Günlük dualar' },
        },
        {
          type: 'list',
          items: [
            { de: '**Bismillah** – vor dem Essen und vor vielen Tätigkeiten', en: '**Bismillah** – before eating and many activities', tr: '**Bismillah** – yemekten ve birçok işten önce' },
            { de: '**Alhamdulillah** – nach dem Essen und wenn dir etwas Gutes widerfährt', en: '**Alhamdulillah** – after eating and when something good happens', tr: '**Elhamdülillah** – yemekten sonra ve güzel bir şey olduğunda' },
            { de: '**Astaghfirullah** – „Ich bitte Allah um Vergebung"', en: '**Astaghfirullah** – "I seek Allah\'s forgiveness"', tr: '**Estağfirullah** – "Allah\'tan bağışlanma dilerim"' },
            { de: 'Und: Du darfst Allah jederzeit in deiner eigenen Sprache um alles bitten.', en: 'And: you may ask Allah for anything at any time in your own language.', tr: "Ve: Allah'tan her zaman kendi dilinde her şeyi isteyebilirsin." },
          ],
        },
        {
          type: 'link',
          to: '/dua',
          label: { de: 'Dua-Sammlung öffnen', en: 'Open dua collection', tr: 'Dua koleksiyonunu aç' },
        },
        { type: 'terms', ids: ['surah', 'ayah', 'dua', 'dhikr', 'bismillah', 'alhamdulillah', 'istighfar'] },
      ],
      quiz: [
        {
          question: {
            de: 'Welcher Sure entspricht laut Hadith einem Drittel des Korans?',
            en: 'According to the hadith, which surah is equal to a third of the Quran?',
            tr: "Hadise göre hangi sure Kur'an'ın üçte birine denktir?",
          },
          options: [
            { de: 'An-Nas', en: 'An-Nas', tr: 'Nâs' },
            { de: 'Al-Ikhlas', en: 'Al-Ikhlas', tr: 'İhlâs' },
            { de: 'Al-Falaq', en: 'Al-Falaq', tr: 'Felak' },
          ],
          answer: 1,
          explanation: {
            de: 'Al-Ikhlas fasst den Tauhid zusammen und entspricht einem Drittel des Korans (Bukhari 5013).',
            en: 'Al-Ikhlas summarises tawhid and is equal to a third of the Quran (Bukhari 5013).',
            tr: "İhlâs tevhidi özetler ve Kur'an'ın üçte birine denktir (Buhârî 5013).",
          },
        },
        {
          question: {
            de: 'Darf man Dua in der eigenen Sprache machen?',
            en: 'May you make dua in your own language?',
            tr: 'Kendi dilinde dua edebilir misin?',
          },
          options: [
            { de: 'Ja, Allah versteht jede Sprache', en: 'Yes, Allah understands every language', tr: 'Evet, Allah her dili bilir' },
            { de: 'Nein, nur auf Arabisch', en: 'No, only in Arabic', tr: 'Hayır, sadece Arapça' },
          ],
          answer: 0,
          explanation: {
            de: 'Persönliche Bittgebete außerhalb der festen Gebetsworte darfst du in jeder Sprache sprechen.',
            en: 'Personal supplications outside the fixed wording of prayer may be said in any language.',
            tr: 'Namazın sabit sözleri dışındaki kişisel duaları istediğin dilde yapabilirsin.',
          },
        },
      ],
      sources: [
        'Quran 1:1-7, 112:1-4, 113:1-2, 114:1-4',
        'Sahih al-Bukhari 5013',
        'Sahih al-Bukhari 5017',
        TRANSLATIONS,
      ],
      review: 'draft',
    },

    // ─────────────────────────────────────────────────────────── 7
    {
      id: 'halal-food',
      title: {
        de: 'Halal im Alltag – Essen & Trinken',
        en: 'Halal in daily life – food & drink',
        tr: 'Günlük hayatta helal – yeme & içme',
      },
      summary: {
        de: 'Was erlaubt und was verboten ist – die Grundlagen, ohne dich zu überfordern.',
        en: 'What is permitted and what is forbidden – the basics, without overwhelming you.',
        tr: 'Neyin helal neyin haram olduğu – seni bunaltmadan temel bilgiler.',
      },
      minutes: 5,
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Gute Nachricht zuerst: Das meiste ist erlaubt! Gelehrte formulieren die Grundregel so: Speisen und Dinge sind grundsätzlich erlaubt, solange kein Beleg sie verbietet. Die Liste des Verbotenen ist kurz.',
            en: 'Good news first: most things are permitted! Scholars phrase the basic rule like this: foods and things are permissible in principle unless there is evidence forbidding them. The list of what is forbidden is short.',
            tr: 'Önce güzel haber: Çoğu şey helaldir! Âlimler temel kuralı şöyle ifade eder: Yiyecekler ve eşyalar, onları yasaklayan bir delil olmadıkça aslen mubahtır. Haramların listesi kısadır.',
          },
        },
        {
          type: 'quran',
          ref: '2:168',
          translation: {
            de: 'O ihr Menschen, esst von dem, was es auf der Erde gibt, als Erlaubtes und Gutes, und folgt nicht den Fußstapfen des Satans! Gewiss, er ist euch ein deutlicher Feind.',
            en: 'O mankind, eat from whatever is on earth [that is] lawful and good and do not follow the footsteps of Satan. Indeed, he is to you a clear enemy.',
            tr: 'Ey insanlar! Yeryüzündeki şeylerden helal ve temiz olarak yiyin. Şeytanın adımlarına uymayın. Çünkü o, sizin için apaçık bir düşmandır.',
          },
        },
        {
          type: 'heading',
          text: { de: 'Was ist verboten?', en: 'What is forbidden?', tr: 'Neler haramdır?' },
        },
        {
          type: 'quran',
          ref: '5:3',
          translation: {
            de: 'Verboten ist euch (der Genuss von) Verendetem, Blut, Schweinefleisch und dem, worüber ein anderer (Name) als Allah angerufen worden ist …',
            en: 'Prohibited to you are dead animals, blood, the flesh of swine, and that which has been dedicated to other than Allah …',
            tr: "Ölü hayvan, kan, domuz eti, Allah'tan başkası adına kesilen … size haram kılındı …",
          },
        },
        {
          type: 'list',
          items: [
            { de: 'Schweinefleisch und Produkte daraus', en: 'Pork and products made from it', tr: 'Domuz eti ve ondan yapılan ürünler' },
            { de: 'Blut sowie Tiere, die verendet sind oder nicht islamisch geschlachtet wurden', en: 'Blood, and animals that died or were not slaughtered Islamically', tr: 'Kan ve kendiliğinden ölmüş ya da İslami usulle kesilmemiş hayvanlar' },
            { de: 'Fleisch, das einem anderen als Allah geweiht wurde', en: 'Meat dedicated to other than Allah', tr: "Allah'tan başkası adına kesilmiş et" },
            { de: 'Alkohol und alle berauschenden Mittel (Koran 5:90)', en: 'Alcohol and all intoxicants (Quran 5:90)', tr: "Alkol ve sarhoş eden her şey (Kur'an 5:90)" },
          ],
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 52, Sahih Muslim 1599',
          narrator: 'an-Numan ibn Baschir',
          grade: 'sahih',
          text: {
            de: 'Der Prophet ﷺ sagte: „Das Erlaubte ist klar, und das Verbotene ist klar, und dazwischen liegen zweifelhafte Dinge, die viele Menschen nicht kennen. Wer sich vor dem Zweifelhaften hütet, der bewahrt seine Religion und seine Ehre …"',
            en: 'The Prophet ﷺ said: "The lawful is clear and the unlawful is clear, and between them are doubtful matters which many people do not know. Whoever guards against doubtful matters protects his religion and his honour …"',
            tr: 'Peygamber ﷺ şöyle buyurdu: "Helal bellidir, haram da bellidir. İkisinin arasında insanların çoğunun bilmediği şüpheli şeyler vardır. Kim şüpheli şeylerden sakınırsa dinini ve ırzını korumuş olur …"',
          },
        },
        {
          type: 'heading',
          text: { de: 'Fleisch – das häufigste Thema', en: 'Meat – the most common topic', tr: 'Et – en sık sorulan konu' },
        },
        {
          type: 'quran',
          ref: '5:5',
          translation: {
            de: 'Heute sind euch die guten Dinge erlaubt. Und die Speise derjenigen, denen die Schrift gegeben wurde, ist euch erlaubt, und eure Speise ist ihnen erlaubt …',
            en: 'This day [all] good foods have been made lawful, and the food of those who were given the Scripture is lawful for you and your food is lawful for them …',
            tr: 'Bugün size temiz ve hoş şeyler helal kılındı. Kendilerine kitap verilenlerin yiyecekleri size helal, sizin yiyecekleriniz de onlara helaldir …',
          },
        },
        {
          type: 'note',
          variant: 'differences',
          text: {
            de: 'Wie Koran 5:5 auf heutiges Supermarktfleisch anzuwenden ist, wird unterschiedlich gesehen: Manche Gelehrte halten Fleisch aus Ländern mit christlicher/jüdischer Tradition für erlaubt, viele verlangen aber eine Schlachtung nach islamischen Regeln (u. a. mit Nennung des Namens Allahs) und sehen die industrielle Schlachtung kritisch. Auch zur Betäubung gibt es unterschiedliche Positionen. Viele Muslime in Deutschland kaufen daher zertifiziertes Halal-Fleisch oder essen auswärts vegetarisch oder Fisch.',
            en: 'How Quran 5:5 applies to today\'s supermarket meat is viewed differently: some scholars consider meat from countries with a Christian/Jewish tradition permissible, but many require slaughter according to Islamic rules (including mentioning Allah\'s name) and view industrial slaughter critically. There are also different positions on stunning. Many Muslims in Germany therefore buy certified halal meat or eat vegetarian or fish when eating out.',
            tr: "Kur'an 5:5'in bugünkü market etine nasıl uygulanacağı farklı değerlendirilir: Bazı âlimler Hristiyan/Yahudi geleneğine sahip ülkelerden gelen eti helal sayar; ancak birçoğu İslami usule göre kesim (Allah'ın adının anılması dahil) şartı arar ve endüstriyel kesime eleştirel bakar. Bayıltma konusunda da farklı görüşler vardır. Bu yüzden Almanya'daki birçok Müslüman sertifikalı helal et alır veya dışarıda vejetaryen ya da balık tercih eder.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Praktische Tipps', en: 'Practical tips', tr: 'Pratik ipuçları' },
        },
        {
          type: 'list',
          items: [
            { de: 'Zutatenlisten lesen: Gelatine, Schmalz, Alkohol (z. B. in Desserts oder Soßen) sind häufige Stolpersteine.', en: 'Read ingredient lists: gelatine, lard and alcohol (e.g. in desserts or sauces) are common pitfalls.', tr: 'İçindekiler listesini oku: Jelatin, domuz yağı ve alkol (ör. tatlılarda veya soslarda) sık karşılaşılan tuzaklardır.' },
            { de: 'Im Restaurant: Vegetarisch, Fisch oder Halal-Restaurants sind einfache Lösungen.', en: 'In restaurants: vegetarian dishes, fish or halal restaurants are easy solutions.', tr: 'Restoranda: Vejetaryen yemekler, balık veya helal restoranlar kolay çözümlerdir.' },
            { de: 'Nicht übertreiben: Du musst nicht jede E-Nummer kennen. Meide das Klare und frag bei Unsicherheit.', en: 'Do not overdo it: you do not have to know every additive code. Avoid what is clearly forbidden and ask when unsure.', tr: 'Aşırıya kaçma: Her katkı maddesi kodunu bilmek zorunda değilsin. Açık haramlardan kaçın, emin olmadığında sor.' },
          ],
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: 'In echter Not – wenn es nichts anderes gibt – ist auch Verbotenes zum Überleben erlaubt (Koran 2:173). Allah will es dir leicht machen.',
            en: 'In genuine necessity – when there is nothing else – even what is forbidden is allowed for survival (Quran 2:173). Allah wants ease for you.',
            tr: "Gerçek bir zaruret durumunda – başka hiçbir şey yoksa – hayatta kalmak için haram olan da mubah olur (Kur'an 2:173). Allah sana kolaylık diler.",
          },
        },
        { type: 'terms', ids: ['halal', 'haram', 'makruh'] },
      ],
      quiz: [
        {
          question: {
            de: 'Was ist laut Koran 5:3 verboten?',
            en: 'What is forbidden according to Quran 5:3?',
            tr: "Kur'an 5:3'e göre ne haramdır?",
          },
          options: [
            { de: 'Rindfleisch', en: 'Beef', tr: 'Sığır eti' },
            { de: 'Schweinefleisch', en: 'Pork', tr: 'Domuz eti' },
            { de: 'Fisch', en: 'Fish', tr: 'Balık' },
          ],
          answer: 1,
          explanation: {
            de: 'Der Vers nennt u. a. Verendetes, Blut und Schweinefleisch als verboten.',
            en: 'The verse names, among others, dead animals, blood and pork as forbidden.',
            tr: 'Ayet, diğerlerinin yanı sıra ölü hayvanı, kanı ve domuz etini haram olarak sayar.',
          },
        },
        {
          question: {
            de: 'Was ist die Grundregel bei Speisen?',
            en: 'What is the basic rule for food?',
            tr: 'Yiyeceklerde temel kural nedir?',
          },
          options: [
            { de: 'Alles ist verboten, außer es ist ausdrücklich erlaubt', en: 'Everything is forbidden unless explicitly permitted', tr: 'Açıkça helal kılınmadıkça her şey haramdır' },
            { de: 'Grundsätzlich erlaubt, solange kein Beleg es verbietet', en: 'Permissible in principle unless evidence forbids it', tr: 'Onu yasaklayan bir delil olmadıkça aslen mubahtır' },
          ],
          answer: 1,
          explanation: {
            de: 'Die Liste des Verbotenen ist begrenzt; das Allermeiste ist erlaubt.',
            en: 'The list of forbidden things is limited; the vast majority is permitted.',
            tr: 'Haramların listesi sınırlıdır; büyük çoğunluk helaldir.',
          },
        },
      ],
      sources: [
        'Quran 2:168, 2:173, 5:3, 5:5, 5:90',
        'Sahih al-Bukhari 52, Sahih Muslim 1599',
        TRANSLATIONS,
      ],
      review: 'draft',
    },

    // ─────────────────────────────────────────────────────────── 8
    {
      id: 'family-friends',
      title: {
        de: 'Familie, Freunde und Umfeld',
        en: 'Family, friends and surroundings',
        tr: 'Aile, arkadaşlar ve çevre',
      },
      summary: {
        de: 'Warum Güte zu deinen Eltern – auch nichtmuslimischen – Teil deines Glaubens ist.',
        en: 'Why kindness to your parents – including non-Muslim ones – is part of your faith.',
        tr: 'Anne babana – Müslüman olmasalar bile – iyilik etmenin neden imanının bir parçası olduğu.',
      },
      minutes: 5,
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Für viele Konvertiten ist das Gespräch mit der Familie die größte Herausforderung. Manche Familien reagieren offen, andere besorgt, verletzt oder ablehnend. Wichtig: Der Islam verlangt nicht, dass du dich von deiner Familie abwendest – im Gegenteil.',
            en: 'For many converts, talking to family is the biggest challenge. Some families react openly, others with worry, hurt or rejection. Important: Islam does not require you to turn away from your family – quite the opposite.',
            tr: 'Pek çok yeni Müslüman için aileyle konuşmak en büyük zorluktur. Bazı aileler açık davranır, bazıları endişeli, kırgın veya reddedici. Önemli olan: İslam senden ailene sırt çevirmeni istemez – tam tersine.',
          },
        },
        {
          type: 'quran',
          ref: '31:14-15',
          translation: {
            de: 'Und Wir haben dem Menschen seine Eltern anbefohlen – seine Mutter hat ihn unter wiederholter Schwäche getragen … Sei Mir und deinen Eltern dankbar … Wenn sie sich aber darum bemühen, dass du Mir etwas beigesellst, wovon du kein Wissen hast, dann gehorche ihnen nicht, doch geh mit ihnen im Diesseits in rechtlicher Weise um …',
            en: 'And We have enjoined upon man [care] for his parents. His mother carried him, [increasing her] in weakness upon weakness … Be grateful to Me and to your parents … But if they endeavor to make you associate with Me that of which you have no knowledge, do not obey them but accompany them in [this] world with appropriate kindness …',
            tr: 'Biz insana, anne babasına iyi davranmasını emrettik. Annesi onu zayıflık üstüne zayıflıkla karnında taşımıştır … Bana ve anne babana şükret … Eğer onlar seni, hakkında bilgin olmayan bir şeyi bana ortak koşman için zorlarlarsa, onlara itaat etme. Onlarla dünyada iyi geçin …',
          },
        },
        {
          type: 'text',
          text: {
            de: 'Diese Verse (vgl. auch 29:8) zeigen: Selbst wenn Eltern einen anderen Glauben haben, bleibt Güte zu ihnen Pflicht. Nur bei dem, was Allah ausdrücklich verbietet, gehorchst du nicht – aber auch dann bleibst du freundlich.',
            en: 'These verses (cf. also 29:8) show: even if parents have a different faith, kindness to them remains a duty. Only in what Allah explicitly forbids do you not obey – but even then you remain kind.',
            tr: 'Bu ayetler (bkz. 29:8) gösteriyor ki: Anne baba farklı bir inanca sahip olsa bile onlara iyilik etmek görevdir. Sadece Allah\'ın açıkça yasakladığı şeylerde itaat etmezsin – ama o zaman bile nazik kalırsın.',
          },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 2620, Sahih Muslim 1003',
          narrator: 'Asma bint Abi Bakr',
          grade: 'sahih',
          text: {
            de: 'Asma berichtete: Meine Mutter, die damals Götzendienerin war, kam zu mir. Ich fragte den Propheten ﷺ: „Soll ich die Verbindung zu ihr pflegen?" Er sagte: „Ja, pflege die Verbindung zu deiner Mutter."',
            en: 'Asma reported: My mother, who was a polytheist at the time, came to me. I asked the Prophet ﷺ: "Should I keep good relations with her?" He said: "Yes, keep good relations with your mother."',
            tr: 'Esmâ anlattı: O zaman müşrik olan annem yanıma geldi. Peygamber\'e ﷺ "Onunla ilgilenip ona iyilik edeyim mi?" diye sordum. "Evet, annene iyilik et" buyurdu.',
          },
        },
        {
          type: 'quran',
          ref: '60:8',
          translation: {
            de: 'Allah verbietet euch nicht, gegenüber denjenigen, die nicht gegen euch der Religion wegen gekämpft und euch nicht aus euren Wohnstätten vertrieben haben, gütig zu sein und sie gerecht zu behandeln. Gewiss, Allah liebt die Gerechten.',
            en: 'Allah does not forbid you from those who do not fight you because of religion and do not expel you from your homes – from being righteous toward them and acting justly toward them. Indeed, Allah loves those who act justly.',
            tr: 'Allah, sizinle din konusunda savaşmayan, sizi yurtlarınızdan çıkarmayan kimselere iyilik etmenizi ve onlara adaletli davranmanızı yasaklamaz. Şüphesiz Allah adaletli olanları sever.',
          },
        },
        {
          type: 'heading',
          text: { de: 'Tipps für Gespräche', en: 'Tips for conversations', tr: 'Konuşmalar için ipuçları' },
        },
        {
          type: 'list',
          items: [
            { de: '**Zeig es durch Charakter:** Mehr Geduld, Ehrlichkeit und Hilfsbereitschaft sagen oft mehr als Argumente.', en: '**Show it through character:** more patience, honesty and helpfulness often say more than arguments.', tr: '**Bunu karakterinle göster:** Daha fazla sabır, dürüstlük ve yardımseverlik çoğu zaman tartışmalardan daha etkilidir.' },
            { de: '**Wähle den Zeitpunkt:** Du musst es nicht sofort allen erzählen. Es ist in Ordnung, einen ruhigen Moment abzuwarten.', en: '**Choose the timing:** you do not have to tell everyone immediately. It is fine to wait for a calm moment.', tr: '**Zamanı seç:** Herkese hemen anlatmak zorunda değilsin. Sakin bir anı beklemek gayet normaldir.' },
            { de: '**Bleib verbunden:** Gemeinsame Essen (ohne Verbotenes), Feiertage als Familienzeit, Anrufe – Beziehungen pflegen ist Gottesdienst.', en: '**Stay connected:** shared meals (without forbidden items), holidays as family time, phone calls – maintaining relationships is worship.', tr: '**Bağını koru:** Ortak yemekler (haramsız), bayramları aile zamanı olarak geçirmek, telefonlaşmak – akrabalık bağlarını korumak ibadettir.' },
            { de: '**Nicht debattieren, sondern zuhören:** Ängste der Familie (z. B. durch Medienbilder) ernst nehmen.', en: '**Listen rather than debate:** take your family\'s fears (e.g. from media images) seriously.', tr: '**Tartışmak yerine dinle:** Ailenin (ör. medya kaynaklı) endişelerini ciddiye al.' },
          ],
        },
        {
          type: 'note',
          variant: 'important',
          text: {
            de: 'Deine Sicherheit geht vor. Wenn du wegen deines Glaubens bedroht, eingesperrt oder unter Druck gesetzt wirst, wende dich an eine Vertrauensperson, eine Beratungsstelle oder im Notfall an die Polizei (110). Niemand – weder Familie noch Gemeinde – darf dich zu etwas zwingen.',
            en: 'Your safety comes first. If you are threatened, confined or pressured because of your faith, turn to someone you trust, a counselling service or, in an emergency, the police (110 in Germany). Nobody – neither family nor community – may force you into anything.',
            tr: "Güvenliğin her şeyden önce gelir. İnancın yüzünden tehdit ediliyor, kapatılıyor veya baskı görüyorsan güvendiğin birine, bir danışma merkezine ya da acil durumda polise (Almanya'da 110) başvur. Hiç kimse – ne aile ne cemaat – seni bir şeye zorlayamaz.",
          },
        },
        { type: 'terms', ids: ['ihsan', 'sunnah', 'ummah'] },
      ],
      quiz: [
        {
          question: {
            de: 'Wie soll man laut Koran 31:15 mit Eltern umgehen, die einen anderen Glauben haben?',
            en: 'According to Quran 31:15, how should you treat parents of a different faith?',
            tr: "Kur'an 31:15'e göre farklı inançtaki anne babaya nasıl davranılmalı?",
          },
          options: [
            { de: 'Den Kontakt abbrechen', en: 'Cut off contact', tr: 'İlişkiyi kesmek' },
            { de: 'Im Diesseits gütig mit ihnen umgehen', en: 'Accompany them in this world with kindness', tr: 'Dünyada onlarla iyi geçinmek' },
            { de: 'Ihnen in allem gehorchen', en: 'Obey them in everything', tr: 'Onlara her konuda itaat etmek' },
          ],
          answer: 1,
          explanation: {
            de: 'Der Vers trennt Gehorsam in Glaubensfragen von Güte im Alltag: Güte bleibt in jedem Fall.',
            en: 'The verse separates obedience in matters of faith from kindness in daily life: kindness remains in every case.',
            tr: 'Ayet, inanç konularındaki itaati günlük hayattaki iyilikten ayırır: İyilik her durumda devam eder.',
          },
        },
        {
          question: {
            de: 'Was riet der Prophet ﷺ Asma bezüglich ihrer nichtmuslimischen Mutter?',
            en: 'What did the Prophet ﷺ advise Asma regarding her non-Muslim mother?',
            tr: "Peygamber ﷺ Esmâ'ya Müslüman olmayan annesi hakkında ne tavsiye etti?",
          },
          options: [
            { de: 'Sie zu meiden', en: 'To avoid her', tr: 'Ondan uzak durmasını' },
            { de: 'Die Verbindung zu ihr zu pflegen', en: 'To keep good relations with her', tr: 'Ona iyilik etmesini' },
          ],
          answer: 1,
          explanation: {
            de: '„Ja, pflege die Verbindung zu deiner Mutter." (Bukhari 2620, Muslim 1003)',
            en: '"Yes, keep good relations with your mother." (Bukhari 2620, Muslim 1003)',
            tr: '"Evet, annene iyilik et." (Buhârî 2620, Müslim 1003)',
          },
        },
      ],
      sources: [
        'Quran 31:14-15, 29:8, 60:8',
        'Sahih al-Bukhari 2620, Sahih Muslim 1003',
        TRANSLATIONS,
      ],
      review: 'draft',
    },

    // ─────────────────────────────────────────────────────────── 9
    {
      id: 'community',
      title: {
        de: 'Gemeinschaft finden',
        en: 'Finding community',
        tr: 'Topluluk bulmak',
      },
      summary: {
        de: 'Moschee, Freitagsgebet, gute Lehrer – und wie du Extremen aus dem Weg gehst.',
        en: 'Mosque, Friday prayer, good teachers – and how to steer clear of extremes.',
        tr: 'Cami, cuma namazı, iyi hocalar – ve aşırılıklardan nasıl uzak durulacağı.',
      },
      minutes: 5,
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Glaube wächst leichter in Gemeinschaft. Gerade am Anfang kann es einsam sein – besonders, wenn dein bisheriges Umfeld nicht muslimisch ist. Es lohnt sich, aktiv Kontakte zu suchen.',
            en: 'Faith grows more easily in community. Especially at the beginning it can be lonely – particularly if your existing circle is not Muslim. It is worth actively seeking contact.',
            tr: 'İman toplulukla daha kolay büyür. Özellikle başlangıçta – mevcut çevren Müslüman değilse – yalnız hissedebilirsin. Aktif olarak bağlantı kurmaya değer.',
          },
        },
        {
          type: 'heading',
          text: { de: 'Die Moschee und das Freitagsgebet', en: 'The mosque and Friday prayer', tr: 'Cami ve cuma namazı' },
        },
        {
          type: 'quran',
          ref: '62:9',
          translation: {
            de: 'O die ihr glaubt, wenn zum Gebet am Freitag gerufen wird, dann eilt zu Allahs Gedenken und lasst das Kaufgeschäft. Das ist besser für euch, wenn ihr wisst.',
            en: 'O you who have believed, when [the adhan] is called for the prayer on the day of Jumu\'ah, then proceed to the remembrance of Allah and leave trade. That is better for you, if you only knew.',
            tr: "Ey iman edenler! Cuma günü namaz için çağrı yapıldığı zaman, hemen Allah'ı anmaya koşun ve alışverişi bırakın. Eğer bilirseniz bu sizin için daha hayırlıdır.",
          },
        },
        {
          type: 'list',
          items: [
            { de: 'Das Freitagsgebet ist für erwachsene, ortsansässige Männer Pflicht; Frauen sind herzlich willkommen, müssen aber nicht.', en: 'Friday prayer is obligatory for adult, resident men; women are warmly welcome but not obliged.', tr: 'Cuma namazı ergen, mukim erkeklere farzdır; kadınlar da memnuniyetle katılabilir ama zorunlu değildir.' },
            { de: 'Sprich den Imam oder den Vorstand an – viele Moscheen haben Ansprechpartner für neue Muslime, Kurse oder Konvertitentreffen.', en: 'Talk to the imam or the board – many mosques have contact persons for new Muslims, courses or convert meet-ups.', tr: 'İmamla veya yönetimle konuş – birçok camide yeni Müslümanlar için irtibat kişileri, kurslar veya buluşmalar vardır.' },
            { de: 'Probier verschiedene Moscheen aus. Es ist normal, dass sich nicht jede sofort wie zu Hause anfühlt.', en: 'Try different mosques. It is normal that not every one feels like home immediately.', tr: 'Farklı camileri dene. Her birinin hemen yuva gibi hissettirmemesi normaldir.' },
          ],
        },
        {
          type: 'heading',
          text: { de: 'Wissen suchen – aber bei wem?', en: 'Seeking knowledge – but from whom?', tr: 'İlim öğrenmek – ama kimden?' },
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 2699',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: 'Der Prophet ﷺ sagte: „Wer einen Weg beschreitet, um Wissen zu suchen, dem erleichtert Allah dadurch einen Weg ins Paradies."',
            en: 'The Prophet ﷺ said: "Whoever takes a path seeking knowledge, Allah makes easy for him thereby a path to Paradise."',
            tr: 'Peygamber ﷺ şöyle buyurdu: "Kim ilim öğrenmek için bir yola girerse, Allah ona cennete giden yolu kolaylaştırır."',
          },
        },
        {
          type: 'quran',
          ref: '16:43',
          translation: {
            de: '… So fragt die Leute der Ermahnung, wenn ihr (es) nicht wisst.',
            en: '… So ask the people of the message if you do not know.',
            tr: '… Eğer bilmiyorsanız bilenlere sorun.',
          },
        },
        {
          type: 'list',
          items: [
            { de: '✓ Ein guter Lehrer nennt seine Quellen, erklärt Meinungsunterschiede und sagt auch mal „Ich weiß es nicht".', en: '✓ A good teacher cites sources, explains differences of opinion and sometimes says "I don\'t know".', tr: '✓ İyi bir hoca kaynaklarını belirtir, görüş farklılıklarını açıklar ve gerektiğinde "Bilmiyorum" der.' },
            { de: '✓ Er ermutigt dich, gut zu deiner Familie zu sein, statt dich von ihr zu isolieren.', en: '✓ They encourage you to be good to your family rather than isolating you from them.', tr: '✓ Seni ailenden koparmak yerine onlara iyi davranmaya teşvik eder.' },
            { de: '✗ Vorsicht bei Menschen, die Hass predigen, andere Muslime pauschal verurteilen, Geld fordern oder dich unter Druck setzen.', en: '✗ Be careful with people who preach hatred, condemn other Muslims wholesale, demand money or put you under pressure.', tr: '✗ Nefret vaaz eden, diğer Müslümanları toptan yargılayan, para isteyen veya sana baskı yapan kişilere dikkat et.' },
            { de: '✗ Online-Videos sind kein Ersatz für einen echten Lehrer – besonders bei emotional aufgeladenen Themen.', en: '✗ Online videos are no substitute for a real teacher – especially on emotionally charged topics.', tr: '✗ İnternet videoları gerçek bir hocanın yerini tutmaz – özellikle duygusal açıdan yüklü konularda.' },
          ],
        },
        {
          type: 'heading',
          text: { de: 'Der Weg der Mitte', en: 'The middle way', tr: 'Orta yol' },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 39',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: 'Der Prophet ﷺ sagte: „Die Religion ist leicht, und niemand übertreibt es in der Religion, ohne dass sie ihn überwältigt. So haltet den rechten Kurs, kommt (dem Ideal) nahe und freut euch …"',
            en: 'The Prophet ﷺ said: "The religion is easy, and no one overburdens himself in religion except that it overwhelms him. So be moderate, come close (to perfection) and receive glad tidings …"',
            tr: 'Peygamber ﷺ şöyle buyurdu: "Din kolaylıktır. Kim dinde aşırı zorlamaya giderse din ona galip gelir. Doğru olanı yapın, ona yaklaşın ve müjdeleyin …"',
          },
        },
        {
          type: 'quran',
          ref: '2:143',
          translation: {
            de: 'Und so haben Wir euch zu einer Gemeinschaft der Mitte gemacht …',
            en: 'And thus We have made you a just (middle) community …',
            tr: 'Böylece sizi vasat (orta yolu tutan) bir ümmet yaptık …',
          },
        },
        { type: 'terms', ids: ['masjid', 'jumuah', 'khutbah', 'imam', 'ummah', 'madhhab'] },
      ],
      quiz: [
        {
          question: {
            de: 'Woran erkennt man eher einen vertrauenswürdigen Lehrer?',
            en: 'What is more likely a sign of a trustworthy teacher?',
            tr: 'Güvenilir bir hocayı daha çok ne ile tanırsın?',
          },
          options: [
            { de: 'Er verlangt, dass du den Kontakt zur Familie abbrichst', en: 'They demand that you cut off your family', tr: 'Ailenle bağını koparmanı ister' },
            { de: 'Er nennt Quellen und erklärt Meinungsunterschiede', en: 'They cite sources and explain differences of opinion', tr: 'Kaynak gösterir ve görüş farklılıklarını açıklar' },
            { de: 'Er verurteilt alle anderen Muslime', en: 'They condemn all other Muslims', tr: 'Diğer tüm Müslümanları kınar' },
          ],
          answer: 1,
          explanation: {
            de: 'Gute Lehrer sind transparent, ausgewogen und ermutigen zu gutem Charakter.',
            en: 'Good teachers are transparent, balanced and encourage good character.',
            tr: 'İyi hocalar şeffaf ve dengelidir, güzel ahlakı teşvik eder.',
          },
        },
        {
          question: {
            de: 'Was sagt der Hadith in Bukhari 39 über die Religion?',
            en: 'What does the hadith in Bukhari 39 say about religion?',
            tr: 'Buhârî 39\'daki hadis din hakkında ne söyler?',
          },
          options: [
            { de: 'Sie ist leicht, und Übertreibung überwältigt den Menschen', en: 'It is easy, and excess overwhelms a person', tr: 'Din kolaydır ve aşırılık insanı yener' },
            { de: 'Je härter, desto besser', en: 'The harder, the better', tr: 'Ne kadar zor, o kadar iyi' },
          ],
          answer: 0,
          explanation: {
            de: 'Der Islam ist ein Weg der Mitte. Übertreibung führt eher dazu, dass man aufgibt.',
            en: 'Islam is a middle way. Excess tends to lead to giving up.',
            tr: 'İslam orta yoldur. Aşırılık daha çok bırakıp gitmeye yol açar.',
          },
        },
      ],
      sources: [
        'Quran 62:9, 16:43, 2:143',
        'Sahih Muslim 2699',
        'Sahih al-Bukhari 39',
        TRANSLATIONS,
      ],
      review: 'draft',
    },

    // ─────────────────────────────────────────────────────────── 10
    {
      id: 'doubts-growth',
      title: {
        de: 'Zweifel, Rückschläge und Wachstum',
        en: 'Doubts, setbacks and growth',
        tr: 'Şüpheler, aksilikler ve gelişim',
      },
      summary: {
        de: 'Warum Rückschläge normal sind, wie Reue funktioniert und wo du Hilfe findest.',
        en: 'Why setbacks are normal, how repentance works and where to find help.',
        tr: 'Aksiliklerin neden normal olduğu, tövbenin nasıl işlediği ve nereden yardım bulacağın.',
      },
      minutes: 5,
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Nach der ersten Begeisterung kommen oft schwierige Phasen: Gebete werden verpasst, alte Gewohnheiten melden sich, Fragen tauchen auf. Das bedeutet nicht, dass du „kein richtiger Muslim" bist. Der Glaube (Iman) steigt und sinkt – bei allen Menschen.',
            en: 'After the first enthusiasm, difficult phases often follow: prayers are missed, old habits return, questions arise. This does not mean you are "not a real Muslim". Faith (iman) rises and falls – for everyone.',
            tr: 'İlk heyecanın ardından çoğu zaman zor dönemler gelir: Namazlar kaçırılır, eski alışkanlıklar geri döner, sorular belirir. Bu, "gerçek bir Müslüman olmadığın" anlamına gelmez. İman artar ve azalır – herkeste.',
          },
        },
        {
          type: 'quran',
          ref: '39:53',
          translation: {
            de: 'Sag: O Meine Diener, die ihr gegen euch selbst maßlos gewesen seid, verliert nicht die Hoffnung auf Allahs Barmherzigkeit. Gewiss, Allah vergibt die Sünden alle. Er ist ja der Allvergebende und Barmherzige.',
            en: 'Say: O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.',
            tr: "De ki: Ey kendilerinin aleyhine aşırı giden kullarım! Allah'ın rahmetinden ümidinizi kesmeyin. Çünkü Allah bütün günahları bağışlar. Şüphesiz O, çok bağışlayandır, çok merhamet edendir.",
          },
        },
        {
          type: 'heading',
          text: { de: 'Tauba – die Rückkehr zu Allah', en: 'Tawba – returning to Allah', tr: "Tövbe – Allah'a dönüş" },
        },
        {
          type: 'list',
          items: [
            { de: 'Die Sünde ehrlich bereuen', en: 'Sincerely regret the sin', tr: 'Günahtan samimiyetle pişman olmak' },
            { de: 'Damit aufhören', en: 'Stop doing it', tr: 'Onu bırakmak' },
            { de: 'Sich fest vornehmen, es nicht wieder zu tun', en: 'Firmly resolve not to return to it', tr: 'Bir daha yapmamaya kesin karar vermek' },
            { de: 'Wenn Rechte anderer verletzt wurden: diese wiedergutmachen', en: 'If others\' rights were violated: make amends', tr: 'Başkalarının hakkı çiğnendiyse: telafi etmek' },
          ],
        },
        {
          type: 'hadith',
          source: 'Sahih Muslim 2749',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: 'Der Prophet ﷺ sagte: „Bei Dem, in Dessen Hand meine Seele ist: Würdet ihr nicht sündigen, würde Allah euch wegnehmen und ein Volk bringen, das sündigt und dann Allah um Vergebung bittet, und Er würde ihnen vergeben."',
            en: 'The Prophet ﷺ said: "By Him in whose hand is my soul, if you did not sin, Allah would replace you with a people who would sin and then seek Allah\'s forgiveness, and He would forgive them."',
            tr: 'Peygamber ﷺ şöyle buyurdu: "Nefsim elinde olana yemin ederim ki, eğer siz günah işlemeseydiniz, Allah sizi yok eder, yerinize günah işleyip sonra Allah\'tan bağışlanma dileyen bir topluluk getirirdi ve onları bağışlardı."',
          },
        },
        {
          type: 'heading',
          text: { de: 'Wenn Zweifel kommen', en: 'When doubts come', tr: 'Şüpheler geldiğinde' },
        },
        {
          type: 'text',
          text: {
            de: 'Fragen sind kein Zeichen von Unglauben. Schreib sie auf und such dir jemanden mit Wissen, der sie ernst nimmt (Koran 16:43). Viele Fragen haben ausführliche Antworten in der islamischen Gelehrsamkeit – du bist nicht der erste Mensch, der sie stellt.',
            en: 'Questions are not a sign of disbelief. Write them down and find someone knowledgeable who takes them seriously (Quran 16:43). Many questions have detailed answers in Islamic scholarship – you are not the first person to ask them.',
            tr: "Sorular inançsızlık belirtisi değildir. Onları not al ve onları ciddiye alan bilgili birini bul (Kur'an 16:43). Pek çok sorunun İslami ilim geleneğinde ayrıntılı cevapları vardır – onları soran ilk kişi sen değilsin.",
          },
        },
        {
          type: 'quran',
          ref: '94:5-6',
          arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
          translation: {
            de: 'Gewiss, mit der Erschwernis ist Erleichterung. Gewiss, mit der Erschwernis ist Erleichterung.',
            en: 'For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.',
            tr: 'Muhakkak ki zorlukla beraber bir kolaylık vardır. Gerçekten, zorlukla beraber bir kolaylık vardır.',
          },
        },
        {
          type: 'heading',
          text: { de: 'Seelische Gesundheit', en: 'Mental wellbeing', tr: 'Ruh sağlığı' },
        },
        {
          type: 'hadith',
          source: 'Sahih al-Bukhari 5678',
          narrator: 'Abu Huraira',
          grade: 'sahih',
          text: {
            de: 'Der Prophet ﷺ sagte: „Allah hat keine Krankheit herabgesandt, ohne für sie eine Heilung herabzusenden."',
            en: 'The Prophet ﷺ said: "Allah has not sent down a disease without sending down a cure for it."',
            tr: 'Peygamber ﷺ şöyle buyurdu: "Allah, şifasını indirmediği hiçbir hastalık indirmemiştir."',
          },
        },
        {
          type: 'note',
          variant: 'important',
          text: {
            de: 'Psychologische Hilfe zu suchen ist kein Zeichen schwachen Glaubens. Wenn Einsamkeit, Angst oder Traurigkeit dich überwältigen, sprich mit einer Ärztin, einem Therapeuten oder einer Beratungsstelle – gern auch mit muslimischen Fachleuten. In akuten Krisen in Deutschland: TelefonSeelsorge 0800 111 0 111 (kostenlos, rund um die Uhr) oder Notruf 112.',
            en: 'Seeking psychological help is not a sign of weak faith. If loneliness, anxiety or sadness overwhelm you, talk to a doctor, therapist or counselling service – Muslim professionals too, if you prefer. In acute crises in Germany: TelefonSeelsorge 0800 111 0 111 (free, 24/7) or emergency number 112.',
            tr: "Psikolojik yardım almak zayıf imanın işareti değildir. Yalnızlık, kaygı veya üzüntü seni bunaltıyorsa bir doktora, terapiste veya danışma merkezine – istersen Müslüman uzmanlara da – başvur. Almanya'da acil krizlerde: TelefonSeelsorge 0800 111 0 111 (ücretsiz, 7/24) veya acil numara 112.",
          },
        },
        {
          type: 'note',
          variant: 'tip',
          text: {
            de: 'Kleine Anker für schwere Tage: die Pflichtgebete halten (auch kurz), ein paar Minuten Dhikr, eine Sure anhören, eine gute Freundin anrufen. Allah sieht jeden kleinen Schritt.',
            en: 'Small anchors for hard days: keep the obligatory prayers (even briefly), a few minutes of dhikr, listen to a surah, call a good friend. Allah sees every small step.',
            tr: 'Zor günler için küçük çapalar: Farz namazları kıl (kısa da olsa), birkaç dakika zikir, bir sure dinle, iyi bir arkadaşını ara. Allah her küçük adımı görür.',
          },
        },
        { type: 'terms', ids: ['tawba', 'istighfar', 'iman', 'dhikr', 'qadar'] },
      ],
      quiz: [
        {
          question: {
            de: 'Was sagt Koran 39:53 Menschen, die gesündigt haben?',
            en: 'What does Quran 39:53 tell people who have sinned?',
            tr: "Kur'an 39:53 günah işleyenlere ne söyler?",
          },
          options: [
            { de: 'Verliert nicht die Hoffnung auf Allahs Barmherzigkeit', en: 'Do not despair of Allah\'s mercy', tr: "Allah'ın rahmetinden ümit kesmeyin" },
            { de: 'Eure Sünden können nicht vergeben werden', en: 'Your sins cannot be forgiven', tr: 'Günahlarınız bağışlanamaz' },
            { de: 'Ihr müsst erst perfekt werden', en: 'You must first become perfect', tr: 'Önce mükemmel olmalısınız' },
          ],
          answer: 0,
          explanation: {
            de: 'Allah vergibt alle Sünden dem, der aufrichtig bereut. Hoffnung ist Teil des Glaubens.',
            en: 'Allah forgives all sins for whoever sincerely repents. Hope is part of faith.',
            tr: 'Allah samimiyetle tövbe edenin bütün günahlarını bağışlar. Ümit imanın bir parçasıdır.',
          },
        },
        {
          question: {
            de: 'Was gehört NICHT zu einer aufrichtigen Tauba?',
            en: 'What is NOT part of sincere tawba?',
            tr: 'Aşağıdakilerden hangisi samimi tövbenin parçası DEĞİLDİR?',
          },
          options: [
            { de: 'Reue', en: 'Regret', tr: 'Pişmanlık' },
            { de: 'Mit der Sünde aufhören', en: 'Stopping the sin', tr: 'Günahı bırakmak' },
            { de: 'Die Sünde öffentlich vor allen bekennen', en: 'Confessing the sin publicly to everyone', tr: 'Günahı herkesin önünde itiraf etmek' },
          ],
          answer: 2,
          explanation: {
            de: 'Tauba geschieht zwischen dir und Allah – ein öffentliches Bekenntnis ist nicht nötig.',
            en: 'Tawba happens between you and Allah – a public confession is not needed.',
            tr: 'Tövbe seninle Allah arasındadır – herkesin önünde itiraf gerekmez.',
          },
        },
        {
          question: {
            de: 'Ist es ein Zeichen schwachen Glaubens, psychologische Hilfe zu suchen?',
            en: 'Is seeking psychological help a sign of weak faith?',
            tr: 'Psikolojik yardım almak zayıf imanın işareti midir?',
          },
          options: [
            { de: 'Ja', en: 'Yes', tr: 'Evet' },
            { de: 'Nein – Behandlung zu suchen entspricht der Sunna', en: 'No – seeking treatment is in line with the Sunnah', tr: 'Hayır – tedavi aramak sünnete uygundur' },
          ],
          answer: 1,
          explanation: {
            de: 'Der Prophet ﷺ lehrte, dass Allah für jede Krankheit eine Heilung herabgesandt hat (Bukhari 5678).',
            en: 'The Prophet ﷺ taught that Allah has sent down a cure for every disease (Bukhari 5678).',
            tr: "Peygamber ﷺ, Allah'ın her hastalık için bir şifa indirdiğini öğretti (Buhârî 5678).",
          },
        },
      ],
      sources: [
        'Quran 39:53, 94:5-6, 16:43',
        'Sahih Muslim 2749',
        'Sahih al-Bukhari 5678',
        TRANSLATIONS,
      ],
      review: 'draft',
    },
  ],
}
