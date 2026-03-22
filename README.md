# MuslimApp

Eine mobile-first Web-App für Muslime — mit Gebetszeiten, Koran-Reader und islamischem Kalender.

Gebaut mit Nuxt 4, TypeScript und einem Apple-inspirierten Liquid Glass Design.

---

## Features

### Gebetszeiten
- Tagesübersicht aller 6 Gebetszeiten (Fajr, Sonnenaufgang, Dhuhr, Asr, Maghrib, Isha)
- **Live-Countdown** zum nächsten Gebet (sekundengenau)
- Nächstes Gebet wird visuell hervorgehoben, vergangene Gebete ausgegraut
- Standorterkennung via **GPS** oder **manuelle Stadtsuche**
- Standort wird im Browser gespeichert (localStorage)

### Koran-Reader
- Alle **114 Suren** mit Name (lateinisch + arabisch), Versanzahl, Offenbarungsort
- Arabischer Text in **Uthmani-Schrift** (RTL)
- Zwei Übersetzungen parallel: **Türkisch** (Elmalılı Hamdi Yazır) + **Deutsch** (Bubenheim & Elyas)
- Übersetzungen ein-/ausschaltbar für reines Arabisch-Lesen
- **Volltextsuche** über den gesamten Koran
- **Lesezeichen** — letzter Lesestand wird gespeichert und auf dem Dashboard angezeigt
- Navigation zur vorherigen/nächsten Sure

### Islamischer Kalender
- **Hijri-Kalender** mit navigierbarer Monatsansicht
- Kalender-Grid zeigt Hijri-Tag + gregorianisches Datum
- Feiertage werden im Kalender markiert
- **11 islamische Feiertage & Kandil-Nächte** mit automatischer Datumsberechnung
- **Countdown** zum nächsten Feiertag (auf Dashboard + Kalender-Seite)
- Feiertage mit Typ-Badges: Feiertag, Kandil-Nacht, Gedenktag

### Dashboard
- Flexibler Startbildschirm mit allen wichtigen Infos auf einen Blick
- Begrüßung mit tageszeit-abhängigem Gruß + Hijri-Datum
- Gebetszeiten-Countdown, Feiertags-Countdown, Koran-Lesezeichen

---

## Datenquellen & APIs

Die App nutzt ausschließlich **kostenlose, öffentliche APIs** ohne API-Keys.

### Gebetszeiten — Aladhan API

| | |
|---|---|
| **API** | [Aladhan Prayer Times API](https://aladhan.com/prayer-times-api) |
| **Base-URL** | `https://api.aladhan.com/v1/` |
| **Berechnungsmethode** | Method 13 — **Diyanet İşleri Başkanlığı** (Türkei) |
| **Authentifizierung** | Keine (kostenlos, kein API-Key) |
| **Genutzte Endpoints** | `/timings/{date}` (Gebetszeiten), `/gToH/{date}` (Hijri-Konvertierung), `/hijriCalendar/{month}/{year}` (Kalender), `/hToG/{date}` (Hijri→Gregorian) |
| **Caching** | Gebetszeiten werden für den aktuellen Tag im localStorage gecacht |

Die Gebetszeiten basieren auf der **Diyanet-Berechnungsmethode** (Method 13), die auch von der türkischen Religionsbehörde verwendet wird. Alternativ unterstützt die Aladhan API 15+ weitere Methoden (ISNA, MWL, Ägypten etc.), die in einer zukünftigen Version wählbar sein werden.

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
| **Caching** | Suren-Liste + geladene Verse werden im localStorage gecacht |

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
| **App-Shell** (Layout, Navigation) | Ja | SSR-gerendert, nach erstem Laden im Browser-Cache |
| **Gebetszeiten** | Teilweise | Heutige Zeiten werden gecacht; für neue Tage ist eine Internetverbindung nötig |
| **Koran (Suren-Liste)** | Ja (nach erstem Laden) | Wird im localStorage gecacht |
| **Koran (Verse)** | Ja (nach erstem Laden) | Einmal geladene Suren werden im localStorage gecacht |
| **Kalender** | Nein | Benötigt Aladhan API für Hijri-Daten |
| **Feiertage** | Teilweise | Hijri-Daten sind lokal, gregorianische Umrechnung benötigt API |
| **Lesezeichen** | Ja | Komplett in localStorage |
| **Standort** | Ja | Wird nach erster Erkennung im localStorage gespeichert |

> **Hinweis:** Eine vollständige PWA mit Service Worker (für echte Offline-Nutzung und App-Installation) ist für Phase 4 geplant.

---

## Tech-Stack

| Komponente | Technologie | Version |
|---|---|---|
| **Framework** | [Nuxt](https://nuxt.com) | 4.4.2 |
| **Sprache** | TypeScript | 5.8 |
| **UI-Framework** | [Vue.js](https://vuejs.org) | 3.5 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) + Custom Liquid Glass CSS | 3.4 |
| **i18n** | [@nuxtjs/i18n](https://i18n.nuxtjs.org) | 9.5 |
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
│   └── de.json                     # Deutsche UI-Texte
├── public/
│   └── favicon.svg                 # App-Icon
└── app/
    ├── app.vue                     # Root-Komponente
    ├── layouts/
    │   └── default.vue             # Layout mit Bottom-Navigation
    ├── pages/
    │   ├── index.vue               # Dashboard
    │   ├── prayer.vue              # Gebetszeiten-Detail
    │   ├── quran/
    │   │   ├── index.vue           # Surenübersicht
    │   │   └── [surah].vue         # Einzelne Sure lesen
    │   ├── calendar.vue            # Hijri-Kalender + Feiertage
    │   └── settings.vue            # Einstellungen
    ├── components/
    │   ├── ui/                     # Liquid Glass Design System
    │   ├── prayer/                 # Gebetszeiten-Komponenten
    │   ├── quran/                  # Koran-Komponenten
    │   └── calendar/               # Kalender-Komponenten
    ├── composables/                # Business Logic
    │   ├── useLocation.ts          # GPS + Stadtsuche
    │   ├── usePrayerTimes.ts       # Gebetszeiten (Aladhan API)
    │   ├── useCountdown.ts         # Countdown-Timer
    │   ├── useQuran.ts             # Koran-Daten (quran.com API)
    │   ├── useBookmark.ts          # Lesezeichen (localStorage)
    │   └── useHolidays.ts          # Feiertage + Hijri-Kalender
    └── assets/css/
        └── main.css                # Tailwind + Liquid Glass Styles
```

---

## Lizenz

Dieses Projekt ist privat.

Koran-Text bereitgestellt durch [quran.com](https://quran.com). Gebetszeiten berechnet durch [Aladhan](https://aladhan.com). Geocoding durch [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org).
