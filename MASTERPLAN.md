# MuslimApp — Masterplan

> **Ziel:** Eine mobile-first Progressive Web App (PWA) für Muslime mit Gebetszeiten, islamischem Kalender und Koran-Reader.
> **Erstellt:** 22. März 2026 | **Letztes Update:** 26. März 2026 | **Status:** Phase 1–4 abgeschlossen

---

## 1. Übersicht & Entscheidungen

| Entscheidung | Geplant | Tatsächlich umgesetzt | Notizen |
|---|---|---|---|
| Framework | Nuxt 3 (Vue 3 + TypeScript) | **Nuxt 4.4.2** (Vue 3.5 + TypeScript) | Nuxt 4 statt 3 (aktuellere Version) |
| Styling | Tailwind CSS 4 + Liquid Glass | **Tailwind CSS 3.4** + Custom Glass CSS | Tailwind 4 war inkompatibel, v3 funktioniert einwandfrei |
| State Management | Pinia | **Nuxt `useState` Composables** | Pinia-Modul inkompatibel mit Nuxt 4, useState reicht aus |
| PWA | @vite-plugin-pwa | **Noch nicht implementiert** | Geplant für Phase 4 |
| i18n | @nuxtjs/i18n | **@nuxtjs/i18n 9.5** | DE implementiert, TR + EN vorbereitet |
| Deployment | Docker + Cloudflare Pages | **Docker implementiert** | CF Pages noch nicht konfiguriert |
| Gebetszeiten-API | Aladhan API (Method 13) | **Aladhan API (Method 13)** | Funktioniert wie geplant |
| Koran-Daten | quran.com API v4 + Offline-JSON | **quran.com API v4** | Offline-JSON-Bundle noch nicht integriert |
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
- [ ] ~~**PWA** — Installierbar, Offline-Cache~~ → Verschoben auf Phase 4

### Phase 2 — Koran ✅ Abgeschlossen
- [x] **Koran-Reader** — Surenübersicht (114 Suren) + Einzelansicht
- [x] **3 Sprachen** — Arabisch (Uthmani) + Türkisch (Elmalılı Hamdi Yazır) + Deutsch (Bubenheim)
- [x] **Suche** — Volltextsuche über den gesamten Koran (via quran.com API)
- [x] **Lesezeichen** — Letzten Lesestand speichern (localStorage) + "Weiterlesen"-Widget
- [x] **Übersetzungen Toggle** — Ein-/ausschaltbar für reines Arabisch-Lesen
- [x] **Suren-Navigation** — Vorherige/Nächste Sure am Ende des Readers
- [x] **Suren-Filter** — Surenübersicht nach Name/Nummer durchsuchbar
- [ ] ~~**Offline-Modus** — Koran-JSON lokal cachen~~ → Teilweise (localStorage), volles Offline-Bundle in Phase 4

### Phase 3 — Kalender & Feiertage ✅ Abgeschlossen
- [x] **Islamischer Kalender** — Monatsansicht mit navigierbaren Hijri-Monaten
- [x] **Kalender-Grid** — Hijri-Tag + gregorianisches Datum + Feiertags-Marker
- [x] **Feiertage** — 11 islamische Feiertage inkl. 5 Kandil-Nächte (türkisch-islamisch)
- [x] **Countdown** — Nächster Feiertag mit Tage-Countdown (Dashboard + Kalender)
- [x] **Feiertage-Liste** — Chronologisch sortiert mit Typ-Badges
- [x] **Hijri↔Gregorian** — Automatische Datumskonvertierung via Aladhan API
- [ ] ~~**Benachrichtigungen** — Push-Notifications für Feiertage~~ → Verschoben auf Phase 4

### Phase 4 — Erweiterungen ✅ Abgeschlossen
- [x] **PWA** — Service Worker, App-Installation, Offline-Cache
- [x] **Mehrsprachiges UI** — Deutsch + Türkisch + Englisch vollständig
- [x] **Dark/Light Mode** — Vollständiges Theme-System mit System-Erkennung
- [x] **Konfigurierbare Berechnungsmethode** — 15 Methoden wählbar (Aladhan API)
- [x] **Qibla-Kompass** — Richtung nach Mekka (Device Orientation API + Great Circle)
- [x] **Dua-Sammlung** — 14 Bittgebete in 8 Kategorien (AR + Transliteration + 3 Sprachen)
- [x] **Push-Notifications** — Gebetszeiten-Erinnerungen (pro Gebet konfigurierbar)
- [x] **Tasbih (Gebetszähler)** — 7 Dhikr-Modi, Fortschrittsring, Haptic Feedback
- [x] **Konfigurierbares Dashboard** — 7 Widgets, drag-reorder, ein/ausschaltbar
- [x] **"Mehr"-Hub** — Zentrale Seite für Werkzeuge (Tasbih, Qibla, Dua) + Einstellungen
- [x] **Zufälliger Vers Widget** — Random Quran-Vers auf dem Dashboard
- [ ] ~~**Audio-Rezitation**~~ → Geplant für Phase 5
- [ ] ~~**Koran Offline-Bundle**~~ → Geplant für Phase 5

---

## 3. Technische Architektur

### 3.1 Projektstruktur (Ist-Stand)

```
muslimApp/
├── nuxt.config.ts                  # Nuxt-Konfiguration (Module, i18n, Runtime Config)
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
│   │   ├── index.vue               # Dashboard (Gebetszeiten + Feiertag + Lesezeichen)
│   │   ├── prayer.vue              # Detaillierte Gebetszeiten
│   │   ├── quran/
│   │   │   ├── index.vue           # Surenübersicht + Suche
│   │   │   └── [surah].vue         # Einzelne Sure lesen
│   │   ├── calendar.vue            # Hijri-Kalender + Feiertage
│   │   └── settings.vue            # Einstellungen
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
│   │   │   └── LocationSelector.vue#   GPS-Erkennung + Stadtsuche
│   │   │
│   │   ├── quran/                  # Koran-Reader
│   │   │   ├── SurahList.vue       #   114 Suren mit Filter
│   │   │   ├── VerseDisplay.vue    #   Einzelner Vers (AR + TR + DE)
│   │   │   ├── QuranSearch.vue     #   Volltextsuche mit Debounce
│   │   │   └── ReadingProgress.vue #   Lesezeichen-Widget ("Weiterlesen")
│   │   │
│   │   └── calendar/               # Kalender & Feiertage
│   │       ├── HijriCalendar.vue   #   Monatskalender-Grid mit Navigation
│   │       ├── HolidayCountdown.vue#   Nächster Feiertag + Tage-Countdown
│   │       └── HolidayList.vue     #   Alle Feiertage chronologisch
│   │
│   └── composables/                # Shared Business Logic
│       ├── useLocation.ts          #   GPS + Stadtsuche + Persistenz
│       ├── usePrayerTimes.ts       #   Aladhan API + Caching + Refresh
│       ├── useCountdown.ts         #   Generischer Countdown-Timer
│       ├── useQuran.ts             #   quran.com API (Suren, Verse, Suche)
│       ├── useBookmark.ts          #   Koran-Lesezeichen (localStorage)
│       └── useHolidays.ts          #   Feiertage + Hijri-Kalender (Aladhan API)
│
├── data/
│   └── holidays.json               # 11 Feiertage + 12 Hijri-Monate (Statische Daten)
│
├── i18n/
│   └── de.json                     # Deutsche UI-Texte (50+ Übersetzungsschlüssel)
│
└── public/
    └── favicon.svg                 # App-Icon (SVG mit islamischem Grün)
```

### 3.2 Datenfluss-Architektur (Ist-Stand)

```
┌──────────────────────────────────────────────────────────┐
│                      BROWSER (Client)                     │
│                                                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ Dashboard │  │ Prayer   │  │  Quran   │  │ Calendar │ │
│  │   Page    │  │  Page    │  │  Pages   │  │   Page   │ │
│  └─────┬─────┘  └─────┬────┘  └─────┬────┘  └─────┬────┘ │
│        │               │             │              │      │
│  ┌─────┴───────────────┴─────────────┴──────────────┴───┐ │
│  │           Nuxt useState (Reactive State)              │ │
│  │  • location  • prayerTimes  • quranSurahs            │ │
│  │  • quranVerses  • holidays  • bookmark               │ │
│  └──────────────────────┬────────────────────────────────┘ │
│                          │                                  │
│  ┌───────────────────────┴───────────────────────────────┐ │
│  │              Composables (Business Logic)              │ │
│  │  useLocation / usePrayerTimes / useQuran /            │ │
│  │  useBookmark / useHolidays / useCountdown             │ │
│  └───────────┬───────────────────────┬───────────────────┘ │
│              │                       │                      │
│   ┌──────────┴──────────┐  ┌────────┴────────┐            │
│   │    localStorage      │  │   Browser APIs   │           │
│   │  • Standort          │  │  • Geolocation   │           │
│   │  • Gebetszeiten-Cache│  │  • (PWA Phase 4) │           │
│   │  • Koran-Cache       │  │                  │           │
│   │  • Lesezeichen       │  └──────────────────┘           │
│   └─────────────────────┘                                   │
└──────────────────────────┬──────────────────────────────────┘
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
| **Diyanet-Methode** | `method=13` |

**Genutzte Endpoints:**

| Endpoint | Verwendung | Composable |
|---|---|---|
| `GET /timings/{DD-MM-YYYY}?latitude&longitude&method=13` | Gebetszeiten für Koordinaten | `usePrayerTimes` |
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
| Background | `#0A0A0A` → `#1A1A2E` | App-Hintergrund (Gradient) |
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

### Cloudflare Pages (Geplant für Phase 4)

Noch nicht konfiguriert. Erfordert `nitro.preset: 'cloudflare-pages'` in nuxt.config.ts.

---

## 8. Performance-Strategie

| Maßnahme | Status | Details |
|---|---|---|
| **Lazy Loading** | ✅ | Koran-Verse werden pro Sure geladen |
| **API-Caching** | ✅ | Gebetszeiten + Koran-Daten in localStorage |
| **Code Splitting** | ✅ | Automatisch via Nuxt (route-basiert) |
| **Arabische Font** | ✅ | Amiri via Google Fonts mit `display=swap` |
| **Service Worker** | ❌ | Geplant für Phase 4 (PWA) |
| **Koran Offline-Bundle** | ❌ | Geplant für Phase 4 |

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

---

## 10. Offene Punkte / Phase 4+

| Feature | Priorität | Aufwand | Notizen |
|---|---|---|---|
| PWA (Service Worker, Installation) | Hoch | Mittel | `@vite-plugin-pwa` oder Nuxt PWA Module |
| Audio-Rezitation | Hoch | Mittel | quran.com API hat 12+ Rezitatoren |
| UI Mehrsprachigkeit (TR + EN) | Mittel | Gering | i18n-Grundstruktur steht, nur JSON-Dateien nötig |
| Weitere Gebetszeit-Methoden | Mittel | Gering | Aladhan unterstützt 15+ Methoden |
| Qibla-Kompass | Mittel | Mittel | Device Orientation API + Berechnung |
| Push-Notifications | Mittel | Hoch | Notification API + ggf. Backend |
| Dua-Sammlung | Niedrig | Mittel | Statische JSON-Daten + Reader |
| Light Mode | Niedrig | Gering | CSS-Variablen umschalten |
| Tasbih (Gebetszähler) | Niedrig | Gering | Einfacher Counter mit Haptic Feedback |
| Diyanet direkt scrapen | Niedrig | Hoch | Instabile Quelle, Aladhan reicht |
| User-Accounts / Cloud-Sync | Niedrig | Hoch | Erfordert Backend-Infrastruktur |
| Hadith-Sammlung | Niedrig | Mittel | sunnah.com API oder statische Daten |
