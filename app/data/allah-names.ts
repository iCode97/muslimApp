/**
 * The 99 Names of Allah (Asma ul-Husna)
 * Each name includes Arabic text, transliteration, and meanings in DE/EN/TR.
 * Sourced from authentic Islamic scholarship.
 */

export interface AllahName {
  id: number
  arabic: string
  transliteration: string
  meanings: {
    de: string
    en: string
    tr: string
  }
  category: string
}

export const NAME_CATEGORIES = [
  'majesty',      // Erhabenheit & Grösse
  'mercy',        // Barmherzigkeit & Güte
  'power',        // Macht & Stärke
  'knowledge',    // Wissen & Weisheit
  'creation',     // Schöpfung & Versorgung
  'justice',      // Gerechtigkeit
  'protection',   // Schutz & Bewahrung
  'uniqueness',   // Einzigartigkeit
] as const

export type NameCategory = typeof NAME_CATEGORIES[number]

export const ALLAH_NAMES: AllahName[] = [
  { id: 1, arabic: 'ٱلرَّحْمَـٰنُ', transliteration: 'Ar-Rahman', meanings: { de: 'Der Allerbarmer', en: 'The Most Gracious', tr: 'Rahman' }, category: 'mercy' },
  { id: 2, arabic: 'ٱلرَّحِيمُ', transliteration: 'Ar-Raheem', meanings: { de: 'Der Barmherzige', en: 'The Most Merciful', tr: 'Rahim' }, category: 'mercy' },
  { id: 3, arabic: 'ٱلْمَلِكُ', transliteration: 'Al-Malik', meanings: { de: 'Der König', en: 'The King', tr: 'Melik' }, category: 'majesty' },
  { id: 4, arabic: 'ٱلْقُدُّوسُ', transliteration: 'Al-Quddus', meanings: { de: 'Der Heilige', en: 'The Most Holy', tr: 'Kuddüs' }, category: 'uniqueness' },
  { id: 5, arabic: 'ٱلسَّلَامُ', transliteration: 'As-Salam', meanings: { de: 'Der Frieden', en: 'The Source of Peace', tr: 'Selam' }, category: 'mercy' },
  { id: 6, arabic: 'ٱلْمُؤْمِنُ', transliteration: 'Al-Mu\'min', meanings: { de: 'Der Gewährer der Sicherheit', en: 'The Guardian of Faith', tr: 'Mü\'min' }, category: 'protection' },
  { id: 7, arabic: 'ٱلْمُهَيْمِنُ', transliteration: 'Al-Muhaymin', meanings: { de: 'Der Beschützer', en: 'The Protector', tr: 'Müheymin' }, category: 'protection' },
  { id: 8, arabic: 'ٱلْعَزِيزُ', transliteration: 'Al-Aziz', meanings: { de: 'Der Allmächtige', en: 'The Almighty', tr: 'Aziz' }, category: 'power' },
  { id: 9, arabic: 'ٱلْجَبَّارُ', transliteration: 'Al-Jabbar', meanings: { de: 'Der Unterwerfer', en: 'The Compeller', tr: 'Cebbar' }, category: 'power' },
  { id: 10, arabic: 'ٱلْمُتَكَبِّرُ', transliteration: 'Al-Mutakabbir', meanings: { de: 'Der Erhabene', en: 'The Supreme', tr: 'Mütekebbir' }, category: 'majesty' },
  { id: 11, arabic: 'ٱلْخَالِقُ', transliteration: 'Al-Khaliq', meanings: { de: 'Der Schöpfer', en: 'The Creator', tr: 'Halık' }, category: 'creation' },
  { id: 12, arabic: 'ٱلْبَارِئُ', transliteration: 'Al-Bari', meanings: { de: 'Der Erschaffer', en: 'The Originator', tr: 'Bari' }, category: 'creation' },
  { id: 13, arabic: 'ٱلْمُصَوِّرُ', transliteration: 'Al-Musawwir', meanings: { de: 'Der Formgebende', en: 'The Fashioner', tr: 'Musavvir' }, category: 'creation' },
  { id: 14, arabic: 'ٱلْغَفَّارُ', transliteration: 'Al-Ghaffar', meanings: { de: 'Der Allvergebende', en: 'The Ever-Forgiving', tr: 'Gaffar' }, category: 'mercy' },
  { id: 15, arabic: 'ٱلْقَهَّارُ', transliteration: 'Al-Qahhar', meanings: { de: 'Der Bezwinger', en: 'The Subduer', tr: 'Kahhar' }, category: 'power' },
  { id: 16, arabic: 'ٱلْوَهَّابُ', transliteration: 'Al-Wahhab', meanings: { de: 'Der Schenkende', en: 'The Bestower', tr: 'Vehhab' }, category: 'mercy' },
  { id: 17, arabic: 'ٱلرَّزَّاقُ', transliteration: 'Ar-Razzaq', meanings: { de: 'Der Versorger', en: 'The Provider', tr: 'Rezzak' }, category: 'creation' },
  { id: 18, arabic: 'ٱلْفَتَّاحُ', transliteration: 'Al-Fattah', meanings: { de: 'Der Öffner', en: 'The Opener', tr: 'Fettah' }, category: 'mercy' },
  { id: 19, arabic: 'ٱلْعَلِيمُ', transliteration: 'Al-Aleem', meanings: { de: 'Der Allwissende', en: 'The All-Knowing', tr: 'Alim' }, category: 'knowledge' },
  { id: 20, arabic: 'ٱلْقَابِضُ', transliteration: 'Al-Qabid', meanings: { de: 'Der Zurückhaltende', en: 'The Withholder', tr: 'Kabıd' }, category: 'justice' },
  { id: 21, arabic: 'ٱلْبَاسِطُ', transliteration: 'Al-Basit', meanings: { de: 'Der Ausbreitende', en: 'The Expander', tr: 'Basıt' }, category: 'mercy' },
  { id: 22, arabic: 'ٱلْخَافِضُ', transliteration: 'Al-Khafid', meanings: { de: 'Der Erniedrigende', en: 'The Abaser', tr: 'Hafıd' }, category: 'justice' },
  { id: 23, arabic: 'ٱلرَّافِعُ', transliteration: 'Ar-Rafi', meanings: { de: 'Der Erhöhende', en: 'The Exalter', tr: 'Rafi' }, category: 'justice' },
  { id: 24, arabic: 'ٱلْمُعِزُّ', transliteration: 'Al-Mu\'izz', meanings: { de: 'Der Ehrende', en: 'The Giver of Honor', tr: 'Muiz' }, category: 'justice' },
  { id: 25, arabic: 'ٱلْمُذِلُّ', transliteration: 'Al-Mudhill', meanings: { de: 'Der Demütigende', en: 'The Giver of Dishonor', tr: 'Müzil' }, category: 'justice' },
  { id: 26, arabic: 'ٱلسَّمِيعُ', transliteration: 'As-Sami', meanings: { de: 'Der Allhörende', en: 'The All-Hearing', tr: 'Semi' }, category: 'knowledge' },
  { id: 27, arabic: 'ٱلْبَصِيرُ', transliteration: 'Al-Basir', meanings: { de: 'Der Allsehende', en: 'The All-Seeing', tr: 'Basir' }, category: 'knowledge' },
  { id: 28, arabic: 'ٱلْحَكَمُ', transliteration: 'Al-Hakam', meanings: { de: 'Der Richter', en: 'The Judge', tr: 'Hakem' }, category: 'justice' },
  { id: 29, arabic: 'ٱلْعَدْلُ', transliteration: 'Al-Adl', meanings: { de: 'Der Gerechte', en: 'The Just', tr: 'Adl' }, category: 'justice' },
  { id: 30, arabic: 'ٱللَّطِيفُ', transliteration: 'Al-Latif', meanings: { de: 'Der Feinfühlige', en: 'The Subtle One', tr: 'Latif' }, category: 'mercy' },
  { id: 31, arabic: 'ٱلْخَبِيرُ', transliteration: 'Al-Khabir', meanings: { de: 'Der Kundige', en: 'The All-Aware', tr: 'Habir' }, category: 'knowledge' },
  { id: 32, arabic: 'ٱلْحَلِيمُ', transliteration: 'Al-Haleem', meanings: { de: 'Der Nachsichtige', en: 'The Forbearing', tr: 'Halim' }, category: 'mercy' },
  { id: 33, arabic: 'ٱلْعَظِيمُ', transliteration: 'Al-Azeem', meanings: { de: 'Der Grossartige', en: 'The Magnificent', tr: 'Azim' }, category: 'majesty' },
  { id: 34, arabic: 'ٱلْغَفُورُ', transliteration: 'Al-Ghafur', meanings: { de: 'Der Vergebende', en: 'The All-Forgiving', tr: 'Gafur' }, category: 'mercy' },
  { id: 35, arabic: 'ٱلشَّكُورُ', transliteration: 'Ash-Shakur', meanings: { de: 'Der Dankbare', en: 'The Appreciative', tr: 'Şekur' }, category: 'mercy' },
  { id: 36, arabic: 'ٱلْعَلِيُّ', transliteration: 'Al-Ali', meanings: { de: 'Der Erhabene', en: 'The Most High', tr: 'Ali' }, category: 'majesty' },
  { id: 37, arabic: 'ٱلْكَبِيرُ', transliteration: 'Al-Kabir', meanings: { de: 'Der Grosse', en: 'The Greatest', tr: 'Kebir' }, category: 'majesty' },
  { id: 38, arabic: 'ٱلْحَفِيظُ', transliteration: 'Al-Hafiz', meanings: { de: 'Der Bewahrer', en: 'The Preserver', tr: 'Hafiz' }, category: 'protection' },
  { id: 39, arabic: 'ٱلْمُقِيتُ', transliteration: 'Al-Muqit', meanings: { de: 'Der Ernährer', en: 'The Sustainer', tr: 'Mukit' }, category: 'creation' },
  { id: 40, arabic: 'ٱلْحَسِيبُ', transliteration: 'Al-Hasib', meanings: { de: 'Der Abrechnende', en: 'The Reckoner', tr: 'Hasib' }, category: 'justice' },
  { id: 41, arabic: 'ٱلْجَلِيلُ', transliteration: 'Al-Jalil', meanings: { de: 'Der Majestätische', en: 'The Majestic', tr: 'Celil' }, category: 'majesty' },
  { id: 42, arabic: 'ٱلْكَرِيمُ', transliteration: 'Al-Karim', meanings: { de: 'Der Grosszügige', en: 'The Most Generous', tr: 'Kerim' }, category: 'mercy' },
  { id: 43, arabic: 'ٱلرَّقِيبُ', transliteration: 'Ar-Raqib', meanings: { de: 'Der Wachsame', en: 'The Watchful', tr: 'Rakib' }, category: 'knowledge' },
  { id: 44, arabic: 'ٱلْمُجِيبُ', transliteration: 'Al-Mujib', meanings: { de: 'Der Erhörende', en: 'The Responsive', tr: 'Mücib' }, category: 'mercy' },
  { id: 45, arabic: 'ٱلْوَاسِعُ', transliteration: 'Al-Wasi', meanings: { de: 'Der Allumfassende', en: 'The All-Encompassing', tr: 'Vasi' }, category: 'majesty' },
  { id: 46, arabic: 'ٱلْحَكِيمُ', transliteration: 'Al-Hakim', meanings: { de: 'Der Allweise', en: 'The All-Wise', tr: 'Hakim' }, category: 'knowledge' },
  { id: 47, arabic: 'ٱلْوَدُودُ', transliteration: 'Al-Wadud', meanings: { de: 'Der Liebevolle', en: 'The Most Loving', tr: 'Vedud' }, category: 'mercy' },
  { id: 48, arabic: 'ٱلْمَجِيدُ', transliteration: 'Al-Majid', meanings: { de: 'Der Ruhmreiche', en: 'The Most Glorious', tr: 'Mecid' }, category: 'majesty' },
  { id: 49, arabic: 'ٱلْبَاعِثُ', transliteration: 'Al-Ba\'ith', meanings: { de: 'Der Erweckende', en: 'The Resurrector', tr: 'Bais' }, category: 'power' },
  { id: 50, arabic: 'ٱلشَّهِيدُ', transliteration: 'Ash-Shahid', meanings: { de: 'Der Zeuge', en: 'The Witness', tr: 'Şehid' }, category: 'knowledge' },
  { id: 51, arabic: 'ٱلْحَقُّ', transliteration: 'Al-Haqq', meanings: { de: 'Die Wahrheit', en: 'The Truth', tr: 'Hakk' }, category: 'uniqueness' },
  { id: 52, arabic: 'ٱلْوَكِيلُ', transliteration: 'Al-Wakil', meanings: { de: 'Der Sachwalter', en: 'The Trustee', tr: 'Vekil' }, category: 'protection' },
  { id: 53, arabic: 'ٱلْقَوِيُّ', transliteration: 'Al-Qawiy', meanings: { de: 'Der Starke', en: 'The Most Strong', tr: 'Kavi' }, category: 'power' },
  { id: 54, arabic: 'ٱلْمَتِينُ', transliteration: 'Al-Matin', meanings: { de: 'Der Feste', en: 'The Firm', tr: 'Metin' }, category: 'power' },
  { id: 55, arabic: 'ٱلْوَلِيُّ', transliteration: 'Al-Waliy', meanings: { de: 'Der Schutzherr', en: 'The Protecting Friend', tr: 'Veli' }, category: 'protection' },
  { id: 56, arabic: 'ٱلْحَمِيدُ', transliteration: 'Al-Hamid', meanings: { de: 'Der Lobenswerte', en: 'The Praiseworthy', tr: 'Hamid' }, category: 'majesty' },
  { id: 57, arabic: 'ٱلْمُحْصِي', transliteration: 'Al-Muhsi', meanings: { de: 'Der Aufzählende', en: 'The Accounter', tr: 'Muhsi' }, category: 'knowledge' },
  { id: 58, arabic: 'ٱلْمُبْدِئُ', transliteration: 'Al-Mubdi', meanings: { de: 'Der Urheber', en: 'The Originator', tr: 'Mübdi' }, category: 'creation' },
  { id: 59, arabic: 'ٱلْمُعِيدُ', transliteration: 'Al-Mu\'id', meanings: { de: 'Der Wiederhersteller', en: 'The Restorer', tr: 'Muid' }, category: 'creation' },
  { id: 60, arabic: 'ٱلْمُحْيِي', transliteration: 'Al-Muhyi', meanings: { de: 'Der Lebengebende', en: 'The Giver of Life', tr: 'Muhyi' }, category: 'creation' },
  { id: 61, arabic: 'ٱلْمُمِيتُ', transliteration: 'Al-Mumit', meanings: { de: 'Der Todbringende', en: 'The Taker of Life', tr: 'Mümit' }, category: 'power' },
  { id: 62, arabic: 'ٱلْحَيُّ', transliteration: 'Al-Hayy', meanings: { de: 'Der Lebendige', en: 'The Ever-Living', tr: 'Hay' }, category: 'uniqueness' },
  { id: 63, arabic: 'ٱلْقَيُّومُ', transliteration: 'Al-Qayyum', meanings: { de: 'Der Beständige', en: 'The Self-Subsisting', tr: 'Kayyum' }, category: 'uniqueness' },
  { id: 64, arabic: 'ٱلْوَاجِدُ', transliteration: 'Al-Wajid', meanings: { de: 'Der Findende', en: 'The Perceiver', tr: 'Vacid' }, category: 'knowledge' },
  { id: 65, arabic: 'ٱلْمَاجِدُ', transliteration: 'Al-Majid', meanings: { de: 'Der Glorreiche', en: 'The Noble', tr: 'Macid' }, category: 'majesty' },
  { id: 66, arabic: 'ٱلْوَاحِدُ', transliteration: 'Al-Wahid', meanings: { de: 'Der Einzige', en: 'The Unique', tr: 'Vahid' }, category: 'uniqueness' },
  { id: 67, arabic: 'ٱلْأَحَدُ', transliteration: 'Al-Ahad', meanings: { de: 'Der Eine', en: 'The One', tr: 'Ehad' }, category: 'uniqueness' },
  { id: 68, arabic: 'ٱلصَّمَدُ', transliteration: 'As-Samad', meanings: { de: 'Der Unabhängige', en: 'The Eternal', tr: 'Samed' }, category: 'uniqueness' },
  { id: 69, arabic: 'ٱلْقَادِرُ', transliteration: 'Al-Qadir', meanings: { de: 'Der Fähige', en: 'The Able', tr: 'Kadir' }, category: 'power' },
  { id: 70, arabic: 'ٱلْمُقْتَدِرُ', transliteration: 'Al-Muqtadir', meanings: { de: 'Der Mächtige', en: 'The Powerful', tr: 'Muktedir' }, category: 'power' },
  { id: 71, arabic: 'ٱلْمُقَدِّمُ', transliteration: 'Al-Muqaddim', meanings: { de: 'Der Voranbringende', en: 'The Expediter', tr: 'Mukaddim' }, category: 'justice' },
  { id: 72, arabic: 'ٱلْمُؤَخِّرُ', transliteration: 'Al-Mu\'akhkhir', meanings: { de: 'Der Zurückstellende', en: 'The Delayer', tr: 'Muahhir' }, category: 'justice' },
  { id: 73, arabic: 'ٱلْأَوَّلُ', transliteration: 'Al-Awwal', meanings: { de: 'Der Erste', en: 'The First', tr: 'Evvel' }, category: 'uniqueness' },
  { id: 74, arabic: 'ٱلْآخِرُ', transliteration: 'Al-Akhir', meanings: { de: 'Der Letzte', en: 'The Last', tr: 'Ahir' }, category: 'uniqueness' },
  { id: 75, arabic: 'ٱلظَّاهِرُ', transliteration: 'Az-Zahir', meanings: { de: 'Der Offenbare', en: 'The Manifest', tr: 'Zahir' }, category: 'uniqueness' },
  { id: 76, arabic: 'ٱلْبَاطِنُ', transliteration: 'Al-Batin', meanings: { de: 'Der Verborgene', en: 'The Hidden', tr: 'Batın' }, category: 'uniqueness' },
  { id: 77, arabic: 'ٱلْوَالِي', transliteration: 'Al-Wali', meanings: { de: 'Der Herrscher', en: 'The Governor', tr: 'Vali' }, category: 'majesty' },
  { id: 78, arabic: 'ٱلْمُتَعَالِي', transliteration: 'Al-Muta\'ali', meanings: { de: 'Der Überlegene', en: 'The Most Exalted', tr: 'Müteali' }, category: 'majesty' },
  { id: 79, arabic: 'ٱلْبَرُّ', transliteration: 'Al-Barr', meanings: { de: 'Der Gütige', en: 'The Source of Goodness', tr: 'Berr' }, category: 'mercy' },
  { id: 80, arabic: 'ٱلتَّوَّابُ', transliteration: 'At-Tawwab', meanings: { de: 'Der Reueannehmer', en: 'The Acceptor of Repentance', tr: 'Tevvab' }, category: 'mercy' },
  { id: 81, arabic: 'ٱلْمُنْتَقِمُ', transliteration: 'Al-Muntaqim', meanings: { de: 'Der Vergeltende', en: 'The Avenger', tr: 'Müntakim' }, category: 'justice' },
  { id: 82, arabic: 'ٱلْعَفُوُّ', transliteration: 'Al-Afuw', meanings: { de: 'Der Verzeihende', en: 'The Pardoner', tr: 'Afüv' }, category: 'mercy' },
  { id: 83, arabic: 'ٱلرَّؤُوفُ', transliteration: 'Ar-Ra\'uf', meanings: { de: 'Der Mitleidvolle', en: 'The Most Kind', tr: 'Rauf' }, category: 'mercy' },
  { id: 84, arabic: 'مَالِكُ ٱلْمُلْكِ', transliteration: 'Malik al-Mulk', meanings: { de: 'Der Herr der Herrschaft', en: 'The Owner of Sovereignty', tr: 'Malik-ül Mülk' }, category: 'majesty' },
  { id: 85, arabic: 'ذُو ٱلْجَلَالِ وَٱلْإِكْرَامِ', transliteration: 'Dhul-Jalali wal-Ikram', meanings: { de: 'Der Herr der Majestät und Ehre', en: 'The Lord of Majesty and Generosity', tr: 'Zül-Celali vel-İkram' }, category: 'majesty' },
  { id: 86, arabic: 'ٱلْمُقْسِطُ', transliteration: 'Al-Muqsit', meanings: { de: 'Der Gerechte', en: 'The Equitable', tr: 'Muksit' }, category: 'justice' },
  { id: 87, arabic: 'ٱلْجَامِعُ', transliteration: 'Al-Jami', meanings: { de: 'Der Versammelnde', en: 'The Gatherer', tr: 'Cami' }, category: 'power' },
  { id: 88, arabic: 'ٱلْغَنِيُّ', transliteration: 'Al-Ghani', meanings: { de: 'Der Unabhängige', en: 'The Self-Sufficient', tr: 'Gani' }, category: 'uniqueness' },
  { id: 89, arabic: 'ٱلْمُغْنِي', transliteration: 'Al-Mughni', meanings: { de: 'Der Bereichernde', en: 'The Enricher', tr: 'Muğni' }, category: 'creation' },
  { id: 90, arabic: 'ٱلْمَانِعُ', transliteration: 'Al-Mani', meanings: { de: 'Der Verhinderer', en: 'The Preventer of Harm', tr: 'Mani' }, category: 'protection' },
  { id: 91, arabic: 'ٱلضَّارُّ', transliteration: 'Ad-Darr', meanings: { de: 'Der Schaden Zufügende', en: 'The Distresser', tr: 'Darr' }, category: 'power' },
  { id: 92, arabic: 'ٱلنَّافِعُ', transliteration: 'An-Nafi', meanings: { de: 'Der Nutzen Bringende', en: 'The Propitious', tr: 'Nafi' }, category: 'mercy' },
  { id: 93, arabic: 'ٱلنُّورُ', transliteration: 'An-Nur', meanings: { de: 'Das Licht', en: 'The Light', tr: 'Nur' }, category: 'uniqueness' },
  { id: 94, arabic: 'ٱلْهَادِي', transliteration: 'Al-Hadi', meanings: { de: 'Der Rechtleitende', en: 'The Guide', tr: 'Hadi' }, category: 'mercy' },
  { id: 95, arabic: 'ٱلْبَدِيعُ', transliteration: 'Al-Badi', meanings: { de: 'Der Unvergleichliche Schöpfer', en: 'The Incomparable', tr: 'Bedi' }, category: 'creation' },
  { id: 96, arabic: 'ٱلْبَاقِي', transliteration: 'Al-Baqi', meanings: { de: 'Der Ewige', en: 'The Everlasting', tr: 'Baki' }, category: 'uniqueness' },
  { id: 97, arabic: 'ٱلْوَارِثُ', transliteration: 'Al-Warith', meanings: { de: 'Der Erbe', en: 'The Inheritor', tr: 'Varis' }, category: 'majesty' },
  { id: 98, arabic: 'ٱلرَّشِيدُ', transliteration: 'Ar-Rashid', meanings: { de: 'Der Rechtgeleitete', en: 'The Guide to the Right Path', tr: 'Reşid' }, category: 'knowledge' },
  { id: 99, arabic: 'ٱلصَّبُورُ', transliteration: 'As-Sabur', meanings: { de: 'Der Geduldige', en: 'The Patient', tr: 'Sabur' }, category: 'mercy' },
]
