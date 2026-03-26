# MuslimApp

Eine mobile-first Progressive Web App (PWA) für Muslime — mit Gebetszeiten, Koran-Reader, islamischem Kalender und spirituellen Werkzeugen.

Gebaut mit Nuxt 4, TypeScript und einem Apple-inspirierten Liquid Glass Design.

---

## Features

### Gebetszeiten
- Tagesübersicht aller 6 Gebetszeiten (Fajr, Sonnenaufgang, Dhuhr, Asr, Maghrib, Isha)
- **Live-Countdown** zum nächsten Gebet (sekundengenau)
- Nächstes Gebet wird visuell hervorgehoben, vergangene Gebete ausgegraut
- Standorterkennung via **GPS** oder **manuelle Stadtsuche** mit Autocomplete
- Standort wird im Browser gespeichert (localStorage)
- **15 Berechnungsmethoden** wählbar (Diyanet, ISNA, MWL, Ägypten u.v.m.)
- **Push-Notifications** für Gebetszeiten (pro Gebet einzeln konfigurierbar)

### Koran-Reader
- Alle **114 Suren** mit Name (lateinisch + arabisch), Versanzahl, Offenbarungsort
- Arabischer Text in **Uthmani-Schrift** (RTL)
- Übersetzungen parallel: **Türkisch** (Elmalılı Hamdi Yazır) + **Deutsch** (Bubenheim & Elyas)
- Übersetzungen ein-/ausschaltbar für reines Arabisch-Lesen
- **Volltextsuche** über den gesamten Koran (Arabisch, Türkisch, Deutsch, Englisch)
- **Lesezeichen** — letzter Lesestand wird gespeichert und auf dem Dashboard angezeigt
- Navigation zur vorherigen/nächsten Sure
- **Offline-Caching** via IndexedDB (nach erstem Laden vollständig offline verfügbar)

### Islamischer Kalender
- **Hijri-Kalender** mit navigierbarer Monatsansicht
- Kalender-Grid zeigt Hijri-Tag + gregorianisches Datum
- Feiertage werden im Kalender markiert
- **11 islamische Feiertage & Kandil-Nächte** mit automatischer Datumsberechnung
- **Countdown** zum nächsten Feiertag (auf Dashboard + Kalender-Seite)
- Feiertage mit Typ-Badges: Feiertag, Kandil-Nacht, Gedenktag

### Dashboard
- Flexibler Startbildschirm mit **7 konfigurierbaren Widgets**
- Begrüßung mit tageszeit-abhängigem Gruß + Hijri-Datum
- Widgets: Gebetszeiten-Countdown, Feiertags-Countdown, Koran-Lesezeichen, Tasbih-Schnellzähler, Hijri-Datum, Hadith des Tages, Zufälliger Vers
- Widgets ein-/ausschaltbar und neu sortierbar

### Werkzeuge (Mehr-Hub)
- **Tasbih (Gebetszähler)** — 7 Dhikr-Modi (Subhanallah, Alhamdulillah, Allahu Akbar u.a.), SVG-Fortschrittsring, Haptic Feedback
- **Qibla-Kompass** — Richtung nach Mekka via Device Orientation API + Great Circle Berechnung
- **Dua-Sammlung** — 14 Bittgebete in 8 Kategorien (Arabisch + Transliteration + 3 Sprachen)
- **Hadith-Sammlung** — 43 kuratierte Hadiths mit Kategorien und Volltext-Suche

### Einstellungen & App
- **Dark/Light Mode** + automatische System-Erkennung
- **3 Sprachen** — Deutsch (Standard), Türkisch, Englisch
- **PWA** — Installierbar auf Home Screen, Service Worker, Offline-Betrieb
- Berechnungsmethode für Gebetszeiten wählbar

---

## Datenquellen & APIs

Die App nutzt ausschließlich **kostenlose, öffentliche APIs** ohne API-Keys.

### Gebetszeiten — Aladhan API

| | |
|---|---|
| **API** | [Aladhan Prayer Times API](https://aladhan.com/prayer-times-api) |
| **Base-URL** | `https://api.aladhan.com/v1/` |
| **Standard-Berechnungsmethode** | Method 13 — **Diyanet İşleri Başkanlığı** (Türkei) |
| **Authentifizierung** | Keine (kostenlos, kein API-Key) |
| **Genutzte Endpoints** | `/timings/{date}`, `/gToH/{date}`, `/hijriCalendar/{month}/{year}`, `/hToG/{date}` |
| **Caching** | Gebetszeiten werden für den aktuellen Tag im localStorage gecacht |

15 Berechnungsmethoden werden unterstützt (Diyanet, ISNA, MWL, Ägypten, Karachi u.v.m.) und können in den Einstellungen gewechselt werden.

### Koran — quran.com API v4

| | |
|---|---|
| **API** | [quran.com API](https://api.quran.com) |
| **Base-URL** | `https://api.quran.com/api/v4/` |
| **Authentifizierung** | Keine (kostenlos, kein API-Key) |
| **Arabischer Text** | Uthmani-Schrift (`/quran/verses/uthmani`) |
| **Türkische Übersetzung** | Elmalılı Hamdi Yazır (Translation ID 52) |
| **Deutsche Übersetzung** | Bubenheim & Elyas (Translation ID 27) |
| **Suche** | Volltextsuche via `/search` Endpoint |
| **Caching** | Suren-Liste + geladene Verse werden im localStorage und IndexedDB gecacht |

### Standort — OpenStreetMap Nominatim

| | |
|---|---|
| **API** | [Nominatim](https://nominatim.openstreetmap.org) |
| **Verwendung** | Reverse Geocoding (GPS → Stadtname) und Vorwärts-Geocoding (Stadtname → Koordinaten) |
| **Authentifizierung** | Keine |

### Islamische Feiertage

Die Feiertage sind als **statische Daten** in `data/holidays.json` hinterlegt mit ihren Hijri-Daten. Die Umrechnung in gregorianische Daten erfolgt **dynamisch** über die Aladhan API (`/hToG/`), sodass die Daten für jedes Jahr automatisch korrekt sind.

Enthaltene Feiertage:
- Eid al-Fitr (Ramazan Bayramı), Eid al-Adha (Kurban Bayramı)
- Mawlid an-Nabi, Islamisches Neujahr, Aschura, Tag von Arafat
- Kandil-Nächte: Regaip, Miraç, Berat, Kadir Gecesi, Beginn Ramadan

---

## Offline-Fähigkeit

| Was | Offline verfügbar? | Details |
|---|---|---|
| **App-Shell** (Layout, Navigation) | Ja | Service Worker + SSR-Cache |
| **Gebetszeiten** | Teilweise | Heutige Zeiten gecacht; für neue Tage ist Internet nötig |
| **Koran (Suren-Liste)** | Ja | Wird im localStorage gecacht |
| **Koran (Verse)** | Ja | Einmal geladene Suren in localStorage + IndexedDB |
| **Koran (Offline-Bundle)** | Ja (nach Download) | Vollständiges Bundle via IndexedDB (in Einstellungen ladbar) |
| **Kalender** | Nein | Benötigt Aladhan API für Hijri-Daten |
| **Feiertage** | Teilweise | Hijri-Daten sind lokal, gregorianische Umrechnung benötigt API |
| **Lesezeichen** | Ja | Komplett in localStorage |
| **Standort** | Ja | Wird nach erster Erkennung im localStorage gespeichert |
| **Tasbih / Dua / Hadith** | Ja | Vollständig lokale Daten (statische JSON/TS-Dateien) |

---

## Tech-Stack

| Komponente | Technologie | Version |
|---|---|---|
| **Framework** | [Nuxt](https://nuxt.com) | 4.4.2 |
| **Sprache** | TypeScript | 5.8 |
| **UI-Framework** | [Vue.js](https://vuejs.org) | 3.5 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) + Custom Liquid Glass CSS | 3.4 |
| **i18n** | [@nuxtjs/i18n](https://i18n.nuxtjs.org) | 9.5 |
| **PWA** | [@vite-pwa/nuxt](https://vite-pwa-org.netlify.app/frameworks/nuxt) | 1.1.1 |
| **Datums-Hilfsbibliothek** | [dayjs](https://day.js.org) | 1.11 |
| **State** | Nuxt `useState` Composables | — |
| **Schriftarten** | Inter (UI) + Amiri (Arabisch) | Google Fonts |

---

## Schnellstart

### Voraussetzungen
- Node.js 22+
- npm

### Entwicklung

```bash
# Repository klonen
git clone https://github.com/iCode97/muslimApp.git
cd muslimApp

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die App läuft dann unter `http://localhost:3000`.

### Produktions-Build

```bash
npm run build
node .output/server/index.mjs
```

### Docker

```bash
# Build & Start
docker compose up -d

# Oder manuell
docker build -t muslimapp .
docker run -p 3000:3000 muslimapp
```

---

## Projektstruktur

```
muslimApp/
├── nuxt.config.ts                  # Nuxt-Konfiguration
├── Dockerfile                      # Multi-Stage Docker Build
├── docker-compose.yml              # Docker Compose Setup
├── data/
│   └── holidays.json               # Islamische Feiertage (Hijri-Daten)
├── i18n/
│   ├── de.json                     # Deutsche UI-Texte
│   ├── tr.json                     # Türkische UI-Texte
│   └── en.json                     # Englische UI-Texte
├── public/
│   ├── favicon.svg                 # App-Icon
│   ├── manifest.json               # PWA Manifest
│   └── sw.js                       # Service Worker
└── app/
    ├── app.vue                     # Root-Komponente
    ├── layouts/
    │   └── default.vue             # Layout mit Bottom-Navigation (5 Tabs)
    ├── pages/
    │   ├── index.vue               # Dashboard (konfigurierbare Widgets)
    │   ├── prayer.vue              # Gebetszeiten-Detail
    │   ├── calendar.vue            # Hijri-Kalender + Feiertage
    │   ├── settings.vue            # Einstellungen (Theme, Sprache, Methode)
    │   ├── more.vue                # Werkzeuge-Hub (Tasbih, Qibla, Dua, Hadith)
    │   ├── tasbih.vue              # Gebetszähler (7 Dhikr-Modi)
    │   ├── qibla.vue               # Qibla-Kompass
    │   ├── dua.vue                 # Dua-Sammlung (14 Bittgebete)
    │   ├── hadith.vue              # Hadith-Sammlung (43 Hadiths)
    │   └── quran/
    │       ├── index.vue           # Surenübersicht + Suche
    │       └── [surah].vue         # Einzelne Sure lesen
    ├── components/
    │   ├── ui/                     # Liquid Glass Design System
    │   │   ├── GlassCard.vue       #   Glassmorphism-Karte (4 Varianten)
    │   │   ├── GlassButton.vue     #   Button
    │   │   ├── GlassInput.vue      #   Eingabefeld mit Icon
    │   │   └── LoadingSpinner.vue  #   Lade-Animation
    │   ├── prayer/                 # Gebetszeiten-Komponenten
    │   │   ├── PrayerTimesCard.vue #   Liste aller 6 Gebetszeiten
    │   │   ├── PrayerCountdown.vue #   Countdown zum nächsten Gebet
    │   │   ├── PrayerTimeRow.vue   #   Einzelne Gebetszeit-Zeile
    │   │   └── LocationSelector.vue#   GPS-Erkennung + Stadtsuche
    │   ├── quran/                  # Koran-Komponenten
    │   │   ├── VerseDisplay.vue    #   Einzelner Vers (AR + TR + DE)
    │   │   └── ReadingProgress.vue #   Lesezeichen-Widget
    │   ├── calendar/               # Kalender-Komponenten
    │   │   ├── HijriCalendar.vue   #   Monatskalender-Grid
    │   │   ├── HolidayCountdown.vue#   Nächster Feiertag + Countdown
    │   │   └── HolidayList.vue     #   Alle Feiertage chronologisch
    │   └── widgets/                # Dashboard-Widgets
    │       ├── TasbihQuick.vue     #   Schnell-Tasbih auf Dashboard
    │       ├── HijriDateWidget.vue #   Hijri-Datum Anzeige
    │       ├── HadithOfDay.vue     #   Zufälliger Hadith des Tages
    │       └── RandomVerse.vue     #   Zufälliger Koran-Vers
    ├── composables/                # Business Logic
    │   ├── useLocation.ts          #   GPS + Stadtsuche + Persistenz
    │   ├── usePrayerTimes.ts       #   Gebetszeiten (Aladhan API + Caching)
    │   ├── useCountdown.ts         #   Generischer Countdown-Timer
    │   ├── useQuran.ts             #   Koran-Daten (quran.com API)
    │   ├── useBookmark.ts          #   Koran-Lesezeichen (localStorage)
    │   ├── useHolidays.ts          #   Feiertage + Hijri-Kalender
    │   ├── useDashboard.ts         #   Widget-Konfiguration
    │   ├── useNotifications.ts     #   Gebetszeit-Benachrichtigungen
    │   ├── useTheme.ts             #   Dark/Light Mode + System-Erkennung
    │   ├── usePWA.ts               #   PWA-Installation
    │   ├── useTasbih.ts            #   Gebetszähler-State (7 Modi)
    │   ├── useQibla.ts             #   Kompass-Berechnung (Great Circle)
    │   └── useOfflineQuran.ts      #   IndexedDB Offline-Caching
    ├── data/                       # Statische App-Daten
    │   ├── hadiths.ts              #   43 kuratierte Hadiths
    │   ├── duas.ts                 #   14 Bittgebete (8 Kategorien)
    │   ├── prayer-methods.ts       #   15 Berechnungsmethoden
    │   └── surah-names-de.ts       #   Deutsche Suren-Namen
    └── assets/css/
        └── main.css                # Tailwind + Liquid Glass Styles
```

---

## Lizenz

Dieses Projekt ist privat.

Koran-Text bereitgestellt durch [quran.com](https://quran.com). Gebetszeiten berechnet durch [Aladhan](https://aladhan.com). Geocoding durch [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org).
