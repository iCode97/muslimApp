# MuslimApp — Masterplan

> **Ziel:** Eine mobile-first Progressive Web App (PWA) für Muslime mit Gebetszeiten, islamischem Kalender, Koran-Reader und spirituellen Werkzeugen.
> **Erstellt:** 22. März 2026 | **Letztes Update:** 26. März 2026 | **Status:** Phase 1–4 vollständig abgeschlossen

---

## 1. Übersicht & Entscheidungen

| Entscheidung | Geplant | Tatsächlich umgesetzt | Notizen |
|---|---|---|---|
| Framework | Nuxt 3 (Vue 3 + TypeScript) | **Nuxt 4.4.2** (Vue 3.5 + TypeScript) | Nuxt 4 statt 3 (aktuellere Version) |
| Styling | Tailwind CSS 4 + Liquid Glass | **Tailwind CSS 3.4** + Custom Glass CSS | Tailwind 4 war inkompatibel, v3 funktioniert einwandfrei |
| State Management | Pinia | **Nuxt `useState` Composables** | Pinia-Modul inkompatibel mit Nuxt 4, useState reicht aus |
| PWA | @vite-plugin-pwa | **@vite-pwa/nuxt 1.1.1** | Service Worker, Manifest, Install-Prompt — vollständig implementiert |
| i18n | @nuxtjs/i18n | **@nuxtjs/i18n 9.5** | DE + TR + EN vollständig implementiert |
| Deployment | Docker + Cloudflare Pages | **Docker implementiert** | CF Pages noch nicht konfiguriert |
| Gebetszeiten-API | Aladhan API (Method 13) | **Aladhan API (wählbar, Standard: Method 13)** | 15 Methoden konfigurierbar |
| Koran-Daten | quran.com API v4 + Offline-JSON | **quran.com API v4 + IndexedDB Offline-Bundle** | Offline-Bundle via IndexedDB implementiert |
| Hijri-Kalender | Aladhan API + dayjs-hijri | **Aladhan API** | dayjs-hijri nicht benötigt, API reicht |

---

## 2. Features — Phasen-Übersicht

### Phase 1 — MVP (Kernfunktionen) ✅ Abgeschlossen
- [x] Projekt-Setup (Nuxt 4, Tailwind CSS, TypeScript, Docker)
- [x] **Gebetszeiten** — Tagesansicht mit allen 6 Zeiten + Live-Countdown zum nächsten Gebet
- [x] **Standort** — GPS-Erkennung + manuelle Stadtsuche + localStorage-Persistenz
- [x] **Hijri-Datum** — Anzeige auf dem Dashboard (via Aladhan API)
- [x] **Liquid Glass UI** — GlassCard, GlassButton, GlassInput, LoadingSpinner
- [x] **Responsive Layout** — Mobile-first mit Bottom-Navigation (5 Tabs)
- [x] **Docker** — Multi-Stage Dockerfile + docker-compose.yml
- [x] **i18n** — Deutsche Lokalisierung (Grundstruktur für TR + EN vorbereitet)

### Phase 2 — Koran ✅ Abgeschlossen
- [x] **Koran-Reader** — Surenübersicht (114 Suren) + Einzelansicht
- [x] **3 Sprachen** — Arabisch (Uthmani) + Türkisch (Elmalılı Hamdi Yazır) + Deutsch (Bubenheim)
- [x] **Suche** — Volltextsuche über den gesamten Koran (via quran.com API)
- [x] **Lesezeichen** — Letzten Lesestand speichern (localStorage) + "Weiterlesen"-Widget
- [x] **Übersetzungen Toggle** — Ein-/ausschaltbar für reines Arabisch-Lesen
- [x] **Suren-Navigation** — Vorherige/Nächste Sure am Ende des Readers
- [x] **Suren-Filter** — Surenübersicht nach Name/Nummer durchsuchbar

### Phase 3 — Kalender & Feiertage ✅ Abgeschlossen
- [x] **Islamischer Kalender** — Monatsansicht mit navigierbaren Hijri-Monaten
- [x] **Kalender-Grid** — Hijri-Tag + gregorianisches Datum + Feiertags-Marker
- [x] **Feiertage** — 11 islamische Feiertage inkl. 5 Kandil-Nächte (türkisch-islamisch)
- [x] **Countdown** — Nächster Feiertag mit Tage-Countdown (Dashboard + Kalender)
- [x] **Feiertage-Liste** — Chronologisch sortiert mit Typ-Badges
- [x] **Hijri↔Gregorian** — Automatische Datumskonvertierung via Aladhan API

### Phase 4 — Erweiterungen ✅ Abgeschlossen
- [x] **PWA** — Service Worker, App-Installation, Offline-Cache
- [x] **Mehrsprachiges UI** — Deutsch + Türkisch + Englisch vollständig
- [x] **Dark/Light Mode** — Vollständiges Theme-System mit System-Erkennung
- [x] **Konfigurierbare Berechnungsmethode** — 15 Methoden wählbar (Aladhan API)
- [x] **Qibla-Kompass** — Richtung nach Mekka (Device Orientation API + Great Circle)
- [x] **Dua-Sammlung** — 14 Bittgebete in 8 Kategorien (AR + Transliteration + 3 Sprachen)
- [x] **Push-Notifications** — Gebetszeiten-Erinnerungen (pro Gebet konfigurierbar)
- [x] **Tasbih (Gebetszähler)** — 7 Dhikr-Modi, Fortschrittsring, Haptic Feedback
- [x] **Konfigurierbares Dashboard** — 7 Widgets, ein-/ausschaltbar, neu sortierbar
- [x] **"Mehr"-Hub** — Zentrale Seite für Werkzeuge (Tasbih, Qibla, Dua, Hadith) + PWA Install-Banner
- [x] **Zufälliger Vers Widget** — Random Quran-Vers auf dem Dashboard
- [x] **Hadith-Sammlung** — 43 kuratierte Hadiths mit Kategorien, Suche und Dashboard-Widget
- [x] **Koran Offline-Bundle** — IndexedDB-basiertes Offline-Caching aller Suren (in Einstellungen ladbar)
- [ ] ~~**Audio-Rezitation**~~ → Geplant für Phase 5

---

## 3. Technische Architektur

### 3.1 Projektstruktur (Ist-Stand)

```
muslimApp/
├── nuxt.config.ts                  # Nuxt-Konfiguration (Module, i18n, PWA, Runtime Config)
├── package.json                    # Dependencies & Scripts
├── tsconfig.json                   # TypeScript-Konfiguration
├── Dockerfile                      # Multi-Stage Production Build
├── docker-compose.yml              # Docker Compose Deployment
├── .dockerignore                   # Docker Build Excludes
├── .gitignore                      # Git Excludes
├── MASTERPLAN.md                   # Dieses Dokument
├── README.md                       # Projekt-Dokumentation
│
├── app/
│   ├── app.vue                     # Root-Komponente (NuxtLayout + NuxtPage)
│   │
│   ├── assets/css/
│   │   └── main.css                # Tailwind + Liquid Glass Design System
│   │
│   ├── layouts/
│   │   └── default.vue             # Haupt-Layout mit Bottom-Navigation (5 Tabs)
│   │
│   ├── pages/
│   │   ├── index.vue               # Dashboard (konfigurierbare Widgets)
│   │   ├── prayer.vue              # Detaillierte Gebetszeiten
│   │   ├── calendar.vue            # Hijri-Kalender + Feiertage
│   │   ├── settings.vue            # Einstellungen (Theme, Sprache, Methode, Notifications)
│   │   ├── more.vue                # Werkzeuge-Hub (Tasbih, Qibla, Dua, Hadith) + PWA-Install
│   │   ├── tasbih.vue              # Gebetszähler (7 Dhikr-Modi, SVG-Ring)
│   │   ├── qibla.vue               # Qibla-Kompass (Device Orientation API)
│   │   ├── dua.vue                 # Dua-Sammlung (14 Bittgebete, 8 Kategorien)
│   │   ├── hadith.vue              # Hadith-Sammlung (43 Hadiths, Kategorien, Suche)
│   │   └── quran/
│   │       ├── index.vue           # Surenübersicht + Suche
│   │       └── [surah].vue         # Einzelne Sure lesen
│   │
│   ├── components/
│   │   ├── ui/                     # Liquid Glass Design System
│   │   │   ├── GlassCard.vue       #   Glassmorphism-Karte (4 Varianten)
│   │   │   ├── GlassButton.vue     #   Button (3 Varianten + 3 Größen)
│   │   │   ├── GlassInput.vue      #   Eingabefeld mit Icon
│   │   │   └── LoadingSpinner.vue  #   Lade-Animation (3 Größen)
│   │   │
│   │   ├── prayer/                 # Gebetszeiten
│   │   │   ├── PrayerTimesCard.vue #   Liste aller 6 Gebetszeiten
│   │   │   ├── PrayerCountdown.vue #   Countdown zum nächsten Gebet
│   │   │   ├── PrayerTimeRow.vue   #   Einzelne Gebetszeit-Zeile mit Icon
│   │   │   └── LocationSelector.vue#   GPS-Erkennung + Stadtsuche mit Autocomplete
│   │   │
│   │   ├── quran/                  # Koran-Reader
│   │   │   ├── VerseDisplay.vue    #   Einzelner Vers (AR + TR + DE)
│   │   │   └── ReadingProgress.vue #   Lesezeichen-Widget ("Weiterlesen")
│   │   │
│   │   ├── calendar/               # Kalender & Feiertage
│   │   │   ├── HijriCalendar.vue   #   Monatskalender-Grid mit Navigation
│   │   │   ├── HolidayCountdown.vue#   Nächster Feiertag + Tage-Countdown
│   │   │   └── HolidayList.vue     #   Alle Feiertage chronologisch
│   │   │
│   │   └── widgets/                # Dashboard-Widgets
│   │       ├── TasbihQuick.vue     #   Schnell-Tasbih-Zähler auf Dashboard
│   │       ├── HijriDateWidget.vue #   Hijri-Datum Anzeige
│   │       ├── HadithOfDay.vue     #   Zufälliger Hadith des Tages
│   │       └── RandomVerse.vue     #   Zufälliger Koran-Vers
│   │
│   ├── composables/                # Shared Business Logic
│   │   ├── useLocation.ts          #   GPS + Stadtsuche + Persistenz
│   │   ├── usePrayerTimes.ts       #   Aladhan API + Caching + Refresh
│   │   ├── useCountdown.ts         #   Generischer Countdown-Timer
│   │   ├── useQuran.ts             #   quran.com API (Suren, Verse, Suche)
│   │   ├── useBookmark.ts          #   Koran-Lesezeichen (localStorage)
│   │   ├── useHolidays.ts          #   Feiertage + Hijri-Kalender (Aladhan API)
│   │   ├── useDashboard.ts         #   Widget-Konfiguration (Reihenfolge + Aktivierung)
│   │   ├── useNotifications.ts     #   Gebetszeit-Benachrichtigungen (pro Gebet)
│   │   ├── useTheme.ts             #   Dark/Light Mode + System-Erkennung
│   │   ├── usePWA.ts               #   Service Worker Registrierung + Install-Prompt
│   │   ├── useTasbih.ts            #   Zähler-State + 7 Dhikr-Modi + Fortschritt
│   │   ├── useQibla.ts             #   Kompass-Berechnung (Great Circle Formula)
│   │   └── useOfflineQuran.ts      #   IndexedDB Offline-Caching für Koran-Bundle
│   │
│   └── data/                       # Statische App-Daten
│       ├── hadiths.ts              #   43 kuratierte Hadiths mit Kategorien
│       ├── duas.ts                 #   14 Bittgebete in 8 Kategorien
│       ├── prayer-methods.ts       #   15 Berechnungsmethoden (Aladhan API)
│       └── surah-names-de.ts       #   Deutsche Suren-Namen (114 Suren)
│
├── data/
│   └── holidays.json               # 11 Feiertage + 12 Hijri-Monate (Statische Daten)
│
├── i18n/
│   ├── de.json                     # Deutsche UI-Texte (Standard)
│   ├── tr.json                     # Türkische UI-Texte
│   └── en.json                     # Englische UI-Texte
│
└── public/
    ├── favicon.svg                 # App-Icon (SVG mit islamischem Grün)
    ├── manifest.json               # PWA Web App Manifest
    └── sw.js                       # Service Worker (Offline-Cache)
```

### 3.2 Datenfluss-Architektur (Ist-Stand)

```
┌──────────────────────────────────────────────────────────────────┐
│                        BROWSER (Client)                           │
│                                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │ Dashboard│  │ Prayer   │  │  Quran   │  │ Calendar │         │
│  │   Page   │  │  Page    │  │  Pages   │  │   Page   │         │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘         │
│       │              │             │              │               │
│  ┌────┴──────────────┴─────────────┴──────────────┴───────────┐  │
│  │         More · Tasbih · Qibla · Dua · Hadith · Settings    │  │
│  └─────────────────────────────┬───────────────────────────────┘  │
│                                │                                  │
│  ┌─────────────────────────────┴──────────────────────────────┐  │
│  │             Nuxt useState (Reactive State)                  │  │
│  │  • location  • prayerTimes  • quranSurahs  • quranVerses   │  │
│  │  • holidays  • bookmark  • theme  • dashboardWidgets        │  │
│  └──────────────────────┬─────────────────────────────────────┘  │
│                          │                                        │
│  ┌───────────────────────┴───────────────────────────────────┐   │
│  │              Composables (Business Logic)                  │   │
│  │  useLocation / usePrayerTimes / useQuran / useBookmark     │   │
│  │  useHolidays / useCountdown / useDashboard                 │   │
│  │  useNotifications / useTheme / usePWA                      │   │
│  │  useTasbih / useQibla / useOfflineQuran                    │   │
│  └──────┬─────────────────────────────────────┬──────────────┘   │
│         │                                     │                  │
│  ┌──────┴──────────┐  ┌──────────────┐  ┌────┴─────────────┐    │
│  │   localStorage  │  │   IndexedDB  │  │   Browser APIs    │    │
│  │  • Standort     │  │  • Koran     │  │  • Geolocation    │    │
│  │  • Prayer-Cache │  │    Offline   │  │  • DeviceOrient.  │    │
│  │  • Quran-Cache  │  │    Bundle    │  │  • Notifications  │    │
│  │  • Lesezeichen  │  └──────────────┘  │  • Service Worker │    │
│  └─────────────────┘                    └──────────────────┘     │
└──────────────────────────┬────────────────────────────────────────┘
                           │ HTTP ($fetch / ofetch)
                           │
      ┌────────────────────┴────────────────────────────┐
      │              EXTERNE APIs (kostenlos)             │
      │                                                   │
      │  Aladhan API         quran.com API v4             │
      │  ├─ /timings         ├─ /chapters                 │
      │  ├─ /gToH            ├─ /verses/by_chapter        │
      │  ├─ /hToG            ├─ /quran/verses/uthmani     │
      │  └─ /hijriCalendar   └─ /search                   │
      │                                                   │
      │  Nominatim (OpenStreetMap)                        │
      │  └─ /reverse + /search (Geocoding)                │
      └───────────────────────────────────────────────────┘
```

---

## 4. API-Referenz

### 4.1 Aladhan — Gebetszeiten + Hijri-Kalender

| Eigenschaft | Wert |
|---|---|
| **Base-URL** | `https://api.aladhan.com/v1/` |
| **Auth** | Keine (kostenlos, kein API-Key) |
| **Rate-Limit** | Nicht dokumentiert, fair use |
| **Standard-Methode** | `method=13` (Diyanet, wählbar in Einstellungen) |

**Genutzte Endpoints:**

| Endpoint | Verwendung | Composable |
|---|---|---|
| `GET /timings/{DD-MM-YYYY}?latitude&longitude&method={n}` | Gebetszeiten für Koordinaten | `usePrayerTimes` |
| `GET /gToH/{DD-MM-YYYY}` | Gregorian → Hijri Konvertierung | `useHolidays` |
| `GET /hToG/{DD-MM-YYYY}` | Hijri → Gregorian Konvertierung | `useHolidays` |
| `GET /hijriCalendar/{month}/{year}` | Hijri-Monatskalender | `useHolidays` |

### 4.2 quran.com — Koran

| Eigenschaft | Wert |
|---|---|
| **Base-URL** | `https://api.quran.com/api/v4/` |
| **Auth** | Keine (kostenlos, kein API-Key) |

**Genutzte Endpoints:**

| Endpoint | Verwendung | Composable |
|---|---|---|
| `GET /chapters?language=de` | Alle 114 Suren laden | `useQuran` |
| `GET /quran/verses/uthmani?chapter_number={id}` | Arabischer Text (Uthmani) | `useQuran` |
| `GET /verses/by_chapter/{id}?translations=52,27` | Verse mit Übersetzungen | `useQuran` |
| `GET /search?q={query}&language={lang}` | Volltextsuche | `useQuran` |

**Translations-IDs:**

| ID | Sprache | Übersetzer |
|---|---|---|
| **52** | Türkisch | Elmalılı Hamdi Yazır |
| **27** | Deutsch | Bubenheim & Elyas |

### 4.3 Nominatim — Geocoding

| Endpoint | Verwendung |
|---|---|
| `GET /reverse?lat&lon&format=json` | GPS-Koordinaten → Stadtname |
| `GET /search?q={city}&format=json` | Stadtname → Koordinaten |

---

## 5. Islamische Feiertage — Datenmodell

Definiert in `data/holidays.json`. Alle Daten sind im Hijri-Kalender angegeben und werden automatisch in gregorianische Daten umgerechnet.

### Feiertage & Gedenktage

| Feiertag | Hijri-Datum | Typ | Türkisch |
|---|---|---|---|
| Islamisches Neujahr | 1. Muharram | Feiertag | Hicri Yılbaşı |
| Aschura | 10. Muharram | Gedenktag | Aşure Günü |
| Mawlid an-Nabi | 12. Rabi al-Awwal | Feiertag | Mevlid Kandili |
| Tag von Arafat | 9. Dhul-Hiddscha | Gedenktag | Arefe Günü |
| Eid al-Fitr | 1.–3. Schawwal | Feiertag | Ramazan Bayramı |
| Eid al-Adha | 10.–13. Dhul-Hiddscha | Feiertag | Kurban Bayramı |

### Kandil-Nächte (Türkisch-Islamisch)

| Kandil | Hijri-Datum | Türkisch |
|---|---|---|
| Regaip Kandili | 1. Rajab | Regaip Kandili |
| Miraç Kandili | 27. Rajab | Miraç Kandili |
| Berat Kandili | 15. Sha'ban | Berat Kandili |
| Beginn Ramadan | 1. Ramadan | Ramazan Başlangıcı |
| Kadir Gecesi | 27. Ramadan | Kadir Gecesi |

---

## 6. Liquid Glass Design System

### Implementierte Varianten

| CSS-Klasse | Verwendung | Eigenschaften |
|---|---|---|
| `.glass` | Standard-Karten | 8% weiß, 20px blur, 12% border |
| `.glass-strong` | Hervorgehobene Karten | 14% weiß, 40px blur, 20% border |
| `.glass-subtle` | Dezente Hintergründe | 4% weiß, 12px blur, 6% border |
| `.glass-primary` | Aktive Elemente (nächstes Gebet) | Grüner Gradient, 30px glow |
| `.glass-nav` | Bottom-Navigation | 10% weiß, 40px blur, top border |
| `.glass-glow` | Pulsierende Hervorhebung | Light-Gradient overlay |

### Farbpalette

| Rolle | Wert | Verwendung |
|---|---|---|
| Primary | `#2D6A4F` → `#40916C` | Islamisches Grün, aktive Elemente |
| Background | `#0A0A0A` → `#1A1A2E` | App-Hintergrund (Gradient, Dark Mode) |
| Gold | `#D4A574` | Hijri-Datum, Kandil-Nächte |
| Text | `#F0F0F0` / `#A0A0A0` | Primär / Sekundär |
| Danger | `#E63946` | Fehlermeldungen |

---

## 7. Deployment

### Docker (Implementiert)

```bash
# Bauen und starten
docker compose up -d

# Manuell
docker build -t muslimapp .
docker run -p 3000:3000 muslimapp
```

Umgebungsvariablen (optional, Defaults sind gesetzt):
- `NUXT_PUBLIC_ALADHAN_BASE_URL` — Aladhan API URL
- `NUXT_PUBLIC_QURAN_BASE_URL` — quran.com API URL

### Cloudflare Pages (Phase 5)

Noch nicht konfiguriert. Erfordert `nitro.preset: 'cloudflare-pages'` in nuxt.config.ts.

---

## 8. Performance-Strategie

| Maßnahme | Status | Details |
|---|---|---|
| **Lazy Loading** | ✅ | Koran-Verse werden pro Sure geladen |
| **API-Caching** | ✅ | Gebetszeiten + Koran-Daten in localStorage |
| **Code Splitting** | ✅ | Automatisch via Nuxt (route-basiert) |
| **Arabische Font** | ✅ | Amiri via Google Fonts mit `display=swap` |
| **Service Worker** | ✅ | PWA-Cache für App-Shell und statische Assets |
| **Koran Offline-Bundle** | ✅ | IndexedDB-basiertes Caching aller Suren |

---

## 9. Umsetzungshistorie

| Schritt | Beschreibung | Status | PR |
|---|---|---|---|
| 1 | Nuxt 4 + Tailwind + TypeScript + Docker Setup | ✅ | #2 |
| 2 | Liquid Glass Design System | ✅ | #2 |
| 3 | Layout + Bottom-Navigation + Dashboard | ✅ | #2 |
| 4 | Standort-Erkennung (GPS + manuelle Suche) | ✅ | #2 |
| 5 | Gebetszeiten via Aladhan API + Countdown | ✅ | #2 |
| 6 | Hijri-Datum auf Dashboard | ✅ | #2 |
| 7 | Docker-Setup | ✅ | #2 |
| 8 | Koran — Surenübersicht + Reader (AR + TR + DE) | ✅ | #3 |
| 9 | Koran — Suche + Lesezeichen | ✅ | #3 |
| 10 | Islamischer Kalender + Feiertage + Kandil-Nächte | ✅ | #4 |
| 11 | Countdown-Widget für nächsten Feiertag | ✅ | #4 |
| 12 | i18n Deutsch als Standard | ✅ | #2 |
| 13 | Mehrsprachiges UI (DE + TR + EN vollständig) | ✅ | #5 |
| 14 | Dark/Light Mode + System-Erkennung | ✅ | #5 |
| 15 | Standortsuche mit Autocomplete + Next-Day Fajr | ✅ | #6 |
| 16 | Verbesserte Gebetszeiten-UX (Zwei-Sektions-Ansicht) | ✅ | #7 |
| 17 | PWA — Service Worker, Manifest, App-Installation | ✅ | — |
| 18 | Konfigurierbare Berechnungsmethode (15 Methoden) | ✅ | — |
| 19 | Tasbih-Zähler (7 Dhikr-Modi, SVG-Ring, Haptic Feedback) | ✅ | — |
| 20 | Qibla-Kompass (Device Orientation API) | ✅ | — |
| 21 | Dua-Sammlung (14 Bittgebete, 8 Kategorien) | ✅ | — |
| 22 | Push-Notifications (pro Gebet konfigurierbar) | ✅ | — |
| 23 | Konfigurierbares Dashboard (7 Widgets, sortierbar) | ✅ | — |
| 24 | "Mehr"-Hub + PWA Install-Banner | ✅ | — |
| 25 | Zufälliger Vers Widget + Hadith-des-Tages Widget | ✅ | — |
| 26 | Hadith-Sammlung (43 Hadiths, Kategorien, Suche) | ✅ | — |
| 27 | Koran Offline-Bundle via IndexedDB | ✅ | — |

---

## 10. Phase 5 — Offene Punkte

| Feature | Priorität | Aufwand | Notizen |
|---|---|---|---|
| Audio-Rezitation | Hoch | Mittel | quran.com API hat 12+ Rezitatoren; Audio-Player + Rezitator-Auswahl |
| Cloudflare Pages Deployment | Mittel | Gering | `nitro.preset: 'cloudflare-pages'` in nuxt.config.ts; CI/CD Pipeline |
| Vollständige Koran-Offline-Optimierung | Mittel | Mittel | Komprimiertes Bundle, automatischer Download, Fortschrittsanzeige |
| Erweiterte Hadith-Sammlung | Niedrig | Mittel | Mehr Hadiths, weitere Kategorien, sunnah.com API |
| Erweiterte Dua-Sammlung | Niedrig | Gering | Mehr Bittgebete, Audio-Aussprache |
| User-Accounts / Cloud-Sync | Niedrig | Hoch | Erfordert Backend-Infrastruktur (Lesezeichen, Einstellungen) |
| Diyanet-Integration | Niedrig | Hoch | Instabile Quelle; Aladhan reicht für Gebetszeiten aus |
