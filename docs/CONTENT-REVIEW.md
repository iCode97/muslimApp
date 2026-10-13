# Fachliche Prüfliste — Lerninhalte

Alle Inhalte unter `app/data/learn/` tragen `review: 'draft'`. Die App zeigt dafür den Hinweis
„Inhalt wird noch fachlich geprüft". Nach der Prüfung durch eine fachkundige Person den Status
pro Lektion / Begriff / FAQ-Eintrag auf `'reviewed'` setzen.

Die folgenden Punkte haben die erstellenden Agents selbst als unsicher markiert. Sie sollten
zuerst geprüft werden. Darüber hinaus gilt: alle Hadith-Nummern stichprobenartig gegen
sunnah.com prüfen und alle Koran-Übersetzungen gegen die genannten Referenzübersetzungen
(Bubenheim/Elyas, Sahih International, Diyanet) abgleichen — sie sind teils gekürzt oder
paraphrasiert.

## Pfad „Grundlagen des Islam" (`paths/basics.ts`) + Glossar (`glossary.ts`, 116 Begriffe)

### Hadith-Nummern (wahrscheinlich korrekt, nicht verifiziert)
- [ ] Sahih Muslim 26 — „Wer stirbt und weiß, dass es keinen Gott außer Allah gibt …"
- [ ] Sahih Muslim 2996 — Engel aus Licht erschaffen
- [ ] Sahih Muslim 2664 — der starke Gläubige / „sag nicht ‚hätte ich doch …'" (gekürzt)
- [ ] Sahih Muslim 746 — „Sein Charakter war der Koran" (gekürzt)
- [ ] Sahih Muslim 1955 — Ihsan in allen Dingen (gekürzt)
- [ ] Sahih al-Bukhari 3559 / Sahih Muslim 2321 — die Besten mit dem besten Charakter
- [ ] Sunan at-Tirmidhi 1162 / Abi Dawud 4682 — Grad „hasan" (Tirmidhi: hasan sahih)
- [ ] Sahih al-Bukhari 4986/4987 — Koran-Sammlung unter Abu Bakr / Uthman (nur Quellenangabe)
- [ ] Sahih al-Bukhari 528 / Sahih Muslim 667 — Gleichnis vom Fluss
- [ ] Sahih al-Bukhari 631 — „Betet, wie ihr mich beten seht"
- [ ] Arabischer Text des Hadith Bukhari 8 (fünf Säulen)
- [ ] Glossar „Dua": Hadith „Das Bittgebet ist Gottesdienst" — Nummer fehlt

### Arabischer Korantext
Vereinfachte Standardschrift, teils Auszüge (Ref nennt ganzen Vers): 2:255, 31:13, 47:19, 48:29, 2:256.
- [ ] Alle `arabic`-Felder gegen Uthmani-Text prüfen

### Lehrinhaltliche Punkte
- [ ] Sechs „Bedingungen der Schahada" als spätere Gelehrtenzusammenfassung dargestellt
- [ ] Dreiteilung des Tawhid als Lehrhilfe (Athari vs. Asch'ari/Maturidi) markiert
- [ ] Rolle Mika'ils (Regen/Versorgung) „nach Überlieferung"
- [ ] Zunahme/Abnahme des Iman (Hanafi-Maturidi vs. Mehrheit)
- [ ] Theologische Schulen zu Qadar
- [ ] „Rund 2 Milliarden Muslime" (Pew-Schätzung)
- [ ] Versanzahl „über 6.200 (meist 6.236), je nach Zählweise"
- [ ] Alle vier Rechtsschulen verlangen Wudu zum Berühren des Mushaf
- [ ] Nisab 85 g Gold / 595 g Silber; hanafitische Unterscheidung wajib/makruh
- [ ] Lektion 8: Quiz-Erklärung zur Qibla nennt in DE Deutschland, in TR die Türkei (bewusste Lokalisierung)

## Pfad „Neu im Islam" (`paths/new-muslim.ts`) + FAQ (`faq.ts`, 35 Einträge)

- [ ] Ghusl-Hadith (Qays ibn Asim): Abu Dawud 355 / Tirmidhi 605, Grad hasan
- [ ] Ghusl bei Konversion: „Hanbali: Pflicht; Hanafi/Schafi'i: empfohlen, außer bei Dschanaba" — malikitische Position fehlt
- [ ] Schahada: Zeugen keine Bedingung; Aussprechen in eigener Sprache „nach vielen Gelehrten"
- [ ] Ablesen von Karte/Bildschirm im Gebet: Abu Hanifa → ungültig; andere erlauben es zumindest im freiwilligen Gebet
- [ ] Abu Dawud 832 (Dhikr für jemanden, der noch nicht rezitieren kann)
- [ ] Sahih Muslim 705 (Ibn Abbas, Zusammenlegen in Medina) und Aussage zur hanafitischen Position
- [ ] Tirmidhi 2801 (kein Sitzen an Tischen mit Alkohol) — Nummer und Grad
- [ ] Tattoo-Hadith Bukhari 5937 / Muslim 2124; Entfernung nicht nötig, wenn sie schadet
- [ ] Muslim 2139 (Namensänderung „Asiya" → „Jamila")
- [ ] Meerestiere: Abu Dawud 83 / Tirmidhi 69; hanafitische Position (Garnelen umstritten, Muscheln/Tintenfisch nicht erlaubt)
- [ ] Musik: Bukhari 5590 (Isnad u. a. von Ibn Hazm kritisiert), Bukhari 952 / Muslim 892, Deutung von 31:6; Formulierung Mehrheit/Minderheit
- [ ] Medikamente beim Fasten: Verallgemeinerung zu Fiqh-Räten (Injektionen ohne Nährwert, Inhalatoren/Tropfen umstritten), keine konkrete Resolution zitiert
- [ ] Gelatine/Istihala und Spuren von Alkohol: Darstellung Mehrheit/Minderheit
- [ ] Bukhari 7257 / Muslim 1840 („kein Gehorsam im Ungehorsam")
- [ ] Weihnachten: „viele zeitgenössische Gelehrte, besonders in Europa" erlauben Familienbesuche und Geschenke
- [ ] Hijab: bewusst ohne `scholarlyDifference`, Konsens der vier Schulen zur Haarbedeckung, druckfreier Ton — redaktionell bestätigen
- [ ] Sunniten/Schiiten: neutrale historische Darstellung, nur 3:103 und 49:10 als Quellen — ggf. historische Quelle ergänzen
- [ ] Notrufnummern (110, 112, TelefonSeelsorge 0800 111 0 111) sind deutschlandspezifisch, auch im EN/TR-Text — Lokalisierung klären
- [ ] Koran-Übersetzungen teils gekürzt: 5:3, 31:14-15, 47:19, 113, 114

## Kalender (`app/data/holiday-info.ts`, Fastentage in `app/utils/hijri-dates.ts`)

- [ ] Sahih Muslim 1162 (Arafah, Aschura, Montag), 1163 (Muharram), 1164 (sechs Tage Schawwal)
- [ ] Sahih al-Bukhari 1503 (Zakat al-Fitr), 2017 (ungerade Nächte der letzten zehn), 349 (Isra/Mi'radsch) — 349 unsicher
- [ ] Tirmidhi 745/747 (Fasten Montag/Donnerstag) — unsicher
- [ ] Ohne Nummer zitiert: Aschura (Bukhari), Weiße Tage (Tirmidhi/Nasa'i über Abu Dharr), Tasu'a (Muslim), Mondsichtung Ramadan, Fasten im Scha'ban
- [ ] Kandil-Nächte (Regaip, Miraç, Berat) als türkisch-islamische Tradition mit Hinweis auf Gelehrtenkritik — Formulierung prüfen

## Adhkar (`app/data/adhkar.ts`, 56 Einträge in 9 Sets)

Arabischer Wortlaut hat höchste Priorität — jeder Eintrag wird wörtlich rezitiert.

- [ ] Sayyid al-Istighfar (Bukhari 6306): „وَأَبُوءُ لَكَ بِذَنْبِي" vs. Hisn „وَأَبُوءُ بِذَنْبِي"
- [ ] Drei Quls 3× morgens/abends: Abu Dawud 5082 / Tirmidhi 3575 (hasan)
- [ ] „Allahumma bika asbahna/amsayna": Tirmidhi 3391 / Abu Dawud 5068 (hasan); Abendversion endet auf „وَإِلَيْكَ الْمَصِيرُ"?
- [ ] Al-'afw wal-'afiyah: Abu Dawud 5074 / Ibn Majah 3871 — „عَوْرَاتِي" vs. „عَوْرَتِي"
- [ ] „Raditu billahi rabba": Abu Dawud 5072 / Tirmidhi 3389 (hasan), Text mit „صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ" nach Hisn
- [ ] „Bismillah alladhi la yadurru": Abu Dawud 5088 / Tirmidhi 3388 (hasan)
- [ ] „A'udhu bi-kalimatillah…" abends 3× (Anzahl aus Hisn/Ahmad, Muslim 2709 ohne Anzahl); Reise 1× (Muslim 2708)
- [ ] Schlafen/Aufwachen: Bukhari 6324 — evtl. 6312/6314; Wortfolge variiert
- [ ] „Allahumma a'inni" nach dem Gebet: Abu Dawud 1522 (sahih)
- [ ] Haus verlassen „Bismillah, tawakkaltu…": Abu Dawud 5095 / Tirmidhi 3426
- [ ] Bismillah vergessen: Abu Dawud 3767 — „بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ" vs. Hisn „فِي أَوَّلِهِ وَآخِرِهِ"
- [ ] Nach dem Essen: Abu Dawud 4023 / Tirmidhi 3458 (hasan) inkl. Tugend „vergangene Sünden vergeben"
- [ ] Dua des Yunus: Tugend nach Tirmidhi 3505
- [ ] Kummer-Dua (Bukhari 6369): „وَالْبُخْلِ وَالْجُبْنِ" — Reihenfolge prüfen
- [ ] Tugend-Quellen: Ayat al-Kursi vor dem Schlafen (Bukhari 2311), letzte zwei Verse al-Baqara (Bukhari 5009, Muslim 807)
- [ ] 100× Tahlil im Morgen-Set: Bukhari 6403 / Muslim 2691
- [ ] Alle Übersetzungen eigene Wiedergabe — insbesondere Türkisch muttersprachlich prüfen
