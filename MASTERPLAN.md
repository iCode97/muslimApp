# MuslimApp — Masterplan

> **Ziel:** Eine mobile-first Progressive Web App (PWA) für Muslime mit Gebetszeiten, islamischem Kalender und Koran-Reader.
> **Erstellt:** 22. März 2026 | **Status:** Planung

---

## 1. Übersicht & Entscheidungen

| Entscheidung | Wahl | Begründung |
|---|---|---|
| Framework | **Nuxt 3** (Vue 3 + TypeScript) | SSR/SSG, PWA-ready, TypeScript-nativ, kostenlos deploybar |
| Styling | **Tailwind CSS 4** + Custom Liquid Glass Utilities | Apple Liquid Glass Ästhetik via Glassmorphism |
| State Management | **Pinia** | Standard für Vue 3, leichtgewichtig |
| PWA | **@vite-plugin-pwa** | Offline-Fähigkeit, Smartphone-Install |
| i18n | **@nuxtjs/i18n** | Mehrsprachigkeit (Start: DE, später TR + EN) |
| Deployment | **Docker (Self-Hosting)** + **Cloudflare Pages** als Alternative | Beides kostenlos möglich |
| Gebetszeiten-API | **Aladhan API** (Method 13 = Diyanet) | Kostenlos, kein API-Key, zuverlässig |
| Koran-Daten | **quran.com API v4** + **Offline-JSON-Bundle** | Flexibel, Elmalılı Hamdi verfügbar |
| Hijri-Kalender | **Aladhan API** + **dayjs-hijri** (client-side) | Leichtgewichtig, kein moment.js nötig |

---

## 2. Features — Phasen-Übersicht

### Phase 1 — MVP (Kernfunktionen)
- [x] Projekt-Setup (Nuxt 3, Tailwind, TypeScript, Docker)
- [ ] **Gebetszeiten** — Tagesansicht mit allen 6 Zeiten + Countdown zum nächsten Gebet
- [ ] **Standort** — GPS-Erkennung + manuelle Stadtsuche
- [ ] **Hijri-Datum** — Anzeige auf dem Dashboard
- [ ] **Liquid Glass UI** — Basis-Komponenten (GlassCard, GlassNav, GlassButton)
- [ ] **PWA** — Installierbar, Offline-Cache für statische Assets
- [ ] **Responsive Layout** — Mobile-first, Smartphone-optimiert

### Phase 2 — Koran
- [ ] **Koran-Reader** — Surenübersicht + Einzelansicht
- [ ] **3 Sprachen** — Arabisch (Uthmani) + Türkisch (Elmalılı Hamdi) + Deutsch (Bubenheim)
- [ ] **Suche** — Volltextsuche über alle Suren
- [ ] **Lesezeichen** — Letzten Lesestand speichern (localStorage)
- [ ] **Offline-Modus** — Koran-JSON lokal cachen

### Phase 3 — Kalender & Feiertage
- [ ] **Islamischer Kalender** — Monatsansicht mit Hijri-Daten
- [ ] **Feiertage** — Alle islamischen Feiertage inkl. türkisch-islamische Kandil-Nächte
- [ ] **Countdown** — Nächster Feiertag mit Countdown-Widget
- [ ] **Benachrichtigungen** — Push-Notifications für Feiertage (optional)

### Phase 4 — Erweiterungen
- [ ] **Audio-Rezitation** — Verschiedene Rezitatoren (via quran.com API)
- [ ] **Mehrsprachiges UI** — Türkisch + Englisch
- [ ] **Weitere Gebetszeit-Quellen** — IGMG, Fazilet etc.
- [ ] **Qibla-Kompass** — Richtung nach Mekka
- [ ] **Dua-Sammlung** — Bittgebete für verschiedene Anlässe
- [ ] **Dark Mode** — Automatisch + manuell

---

## 3. Technische Architektur

### 3.1 Projektstruktur

```
muslimApp/
├── nuxt.config.ts              # Nuxt-Konfiguration
├── tailwind.config.ts          # Tailwind + Liquid Glass Theme
├── Dockerfile                  # Multi-Stage Build
├── docker-compose.yml          # Deployment-Config
├── app.config.ts               # App-Konstanten (API-URLs, Method-IDs)
│
├── app/
│   ├── components/
│   │   ├── ui/                 # Liquid Glass Design System
│   │   │   ├── GlassCard.vue
│   │   │   ├── GlassButton.vue
│   │   │   ├── GlassNav.vue
│   │   │   ├── GlassModal.vue
│   │   │   └── GlassInput.vue
│   │   │
│   │   ├── prayer/             # Gebetszeiten
│   │   │   ├── PrayerTimesCard.vue      # Hauptwidget
│   │   │   ├── PrayerCountdown.vue      # Countdown nächstes Gebet
│   │   │   ├── PrayerTimeRow.vue        # Einzelne Gebetszeit-Zeile
│   │   │   └── LocationSelector.vue     # Stadt/GPS Auswahl
│   │   │
│   │   ├── quran/              # Koran-Reader
│   │   │   ├── SurahList.vue            # Surenübersicht
│   │   │   ├── SurahView.vue            # Sure lesen
│   │   │   ├── VerseDisplay.vue         # Einzelner Vers (AR + Übersetzung)
│   │   │   ├── QuranSearch.vue          # Suchfeld + Ergebnisse
│   │   │   └── ReadingProgress.vue      # Lesezeichen-Anzeige
│   │   │
│   │   └── calendar/           # Kalender & Feiertage
│   │       ├── HijriCalendar.vue        # Monatskalender
│   │       ├── HolidayCard.vue          # Feiertag-Karte
│   │       ├── HolidayCountdown.vue     # Countdown nächster Feiertag
│   │       └── HolidayList.vue          # Jahresübersicht
│   │
│   ├── composables/            # Shared Business Logic
│   │   ├── usePrayerTimes.ts            # Gebetszeiten laden + cachen
│   │   ├── useLocation.ts              # GPS + Geocoding
│   │   ├── useHijriDate.ts             # Hijri-Konvertierung
│   │   ├── useQuran.ts                 # Koran-Daten laden
│   │   ├── useQuranSearch.ts           # Koran-Suche
│   │   ├── useHolidays.ts             # Feiertage berechnen
│   │   ├── useBookmark.ts             # Lesezeichen (localStorage)
│   │   └── useCountdown.ts            # Generischer Countdown
│   │
│   ├── pages/
│   │   ├── index.vue                   # Dashboard (Gebetszeiten + Hijri + nächster Feiertag)
│   │   ├── prayer.vue                  # Detaillierte Gebetszeiten (Woche/Monat)
│   │   ├── quran/
│   │   │   ├── index.vue               # Surenübersicht
│   │   │   └── [surah].vue             # Einzelne Sure lesen
│   │   ├── calendar.vue                # Hijri-Kalender + Feiertage
│   │   └── settings.vue                # Einstellungen (Standort, Sprache, Methode)
│   │
│   ├── layouts/
│   │   └── default.vue                 # Haupt-Layout mit Bottom-Nav
│   │
│   ├── server/
│   │   └── api/                        # Nuxt Server-Routes (API-Proxy)
│   │       ├── prayer-times.get.ts     # Proxy → Aladhan API
│   │       ├── quran/
│   │       │   ├── [surah].get.ts      # Proxy → quran.com API
│   │       │   └── search.get.ts       # Proxy → quran.com Search
│   │       └── hijri.get.ts            # Proxy → Aladhan Hijri
│   │
│   └── assets/
│       └── css/
│           ├── main.css                # Tailwind Imports
│           └── glass.css               # Liquid Glass Custom Styles
│
├── data/
│   ├── holidays.json                   # Islamische Feiertage (Hijri-basiert)
│   └── kandil.json                     # Türkisch-islamische Kandil-Nächte
│
├── public/
│   ├── icons/                          # PWA-Icons (192x192, 512x512)
│   ├── fonts/                          # Arabische Schriftart (z.B. Amiri)
│   └── manifest.json                   # PWA Manifest
│
├── i18n/
│   ├── de.json                         # Deutsche UI-Texte
│   ├── tr.json                         # Türkische UI-Texte (Phase 4)
│   └── en.json                         # Englische UI-Texte (Phase 4)
│
└── tests/
    ├── composables/                    # Unit Tests
    └── components/                     # Component Tests
```

### 3.2 Datenfluss-Architektur

```
┌──────────────────────────────────────────────────────┐
│                    BROWSER (Client)                    │
│                                                        │
│  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │Dashboard │  │  Prayer  │  │  Quran   │  │Calendar│ │
│  │  Page    │  │  Page    │  │  Pages   │  │  Page  │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬────┘ │
│       │              │             │             │      │
│  ┌────┴──────────────┴─────────────┴─────────────┴──┐  │
│  │              Pinia Store (State)                   │  │
│  │  • prayerTimes  • quranData  • holidays           │  │
│  │  • location     • bookmarks  • settings           │  │
│  └──────────────────────┬────────────────────────────┘  │
│                         │                                │
│  ┌──────────────────────┴────────────────────────────┐  │
│  │            Composables (Business Logic)            │  │
│  │  usePrayerTimes / useQuran / useHolidays / etc.   │  │
│  └──────────────────────┬────────────────────────────┘  │
│                         │                                │
│       ┌─────────────────┤ localStorage                   │
│       │  Offline Cache  │ (Bookmarks, Settings,          │
│       │  (Service Worker)│  cached Prayer Times)         │
│       └─────────────────┘                                │
└─────────────────────────┬────────────────────────────────┘
                          │ HTTP (fetch/ofetch)
┌─────────────────────────┴────────────────────────────────┐
│                 NUXT SERVER (SSR / API Proxy)             │
│                                                           │
│  /api/prayer-times  →  https://api.aladhan.com/v1/       │
│  /api/quran/:surah  →  https://api.quran.com/api/v4/     │
│  /api/hijri         →  https://api.aladhan.com/v1/gToH/  │
└──────────────────────────────────────────────────────────┘
```

---

## 4. API-Referenz (verifiziert)

### 4.1 Aladhan — Gebetszeiten

| Eigenschaft | Wert |
|---|---|
| **Base-URL** | `https://api.aladhan.com/v1/` |
| **Auth** | Keine (kostenlos, kein API-Key) |
| **Rate-Limit** | Nicht dokumentiert, fair use |
| **Diyanet-Methode** | `method=13` |

**Wichtige Endpoints:**

```
# Gebetszeiten nach Koordinaten
GET /v1/timings/{DD-MM-YYYY}?latitude={lat}&longitude={lng}&method=13

# Gebetszeiten nach Stadt
GET /v1/timingsByCity/{DD-MM-YYYY}?city=Berlin&country=Germany&method=13

# Monatskalender
GET /v1/calendarByCity/{year}/{month}?city=Berlin&country=Germany&method=13

# Gregorian → Hijri
GET /v1/gToH/{DD-MM-YYYY}

# Hijri Kalender (ganzer Monat)
GET /v1/hijriCalendar/{month}/{year}
```

**Response-Felder (Gebetszeiten):**
`Fajr`, `Sunrise`, `Dhuhr`, `Asr`, `Sunset`, `Maghrib`, `Isha`, `Imsak`, `Midnight`

### 4.2 quran.com — Koran

| Eigenschaft | Wert |
|---|---|
| **Base-URL** | `https://api.quran.com/api/v4/` |
| **Auth** | Keine (kostenlos, kein API-Key) |

**Wichtige Endpoints:**

```
# Alle Suren
GET /api/v4/chapters

# Verse einer Sure mit Übersetzung
GET /api/v4/verses/by_chapter/{surah_id}?translations=52,27&language=de
# 52 = Elmalılı Hamdi Yazır (TR)
# 27 = Bubenheim (DE)

# Arabischer Text (Uthmani)
GET /api/v4/quran/verses/uthmani?chapter_number={id}

# Volltextsuche
GET /api/v4/search?q={query}&language=tr

# Verfügbare Übersetzungen
GET /api/v4/resources/translations
```

**Translations-IDs für uns:**

| ID | Sprache | Übersetzer |
|---|---|---|
| **52** | Türkisch | Elmalılı Hamdi Yazır |
| 77 | Türkisch | Diyanet İşleri |
| **27** | Deutsch | Bubenheim & Elyas |

### 4.3 Hijri-Kalender (Client-Side)

```
npm: dayjs + dayjs-hijri
```
Für Offline-Konvertierung ohne API-Call. Aladhan als Fallback/Verifizierung.

---

## 5. Islamische Feiertage — Datenmodell

### Standard-Feiertage (jährlich wiederkehrend im Hijri-Kalender)

| Feiertag | Hijri-Datum | Typ |
|---|---|---|
| Islamisches Neujahr (Muharrem) | 1. Muharrem | Feiertag |
| Aschura | 10. Muharrem | Gedenktag |
| Mawlid an-Nabī (Geburtstag des Propheten) | 12. Rabīʿ al-Awwal | Feiertag |
| Isrā und Miʿrāǧ | 27. Rajab | Gedenktag |
| Lailat al-Barāʾa (Beraat) | 15. Schaʿbān | Kandil |
| Beginn Ramadan | 1. Ramadan | Fastenmonat |
| Lailat al-Qadr | 27. Ramadan | Kandil |
| Eid al-Fitr (Ramazan Bayramı) | 1.-3. Schawwāl | Feiertag |
| Eid al-Adha (Kurban Bayramı) | 10.-13. Dhū l-Ḥiǧǧa | Feiertag |

### Kandil-Nächte (türkisch-islamisch)

| Kandil | Hijri-Datum |
|---|---|
| Mevlid Kandili | 12. Rabīʿ al-Awwal |
| Regaip Kandili | 1. Freitagnacht im Rajab |
| Mirac Kandili | 27. Rajab |
| Berat Kandili | 15. Schaʿbān |
| Kadir Gecesi | 27. Ramadan |

> **Hinweis:** Genaue gregorianische Daten variieren jährlich. Diese werden entweder über die Aladhan-API berechnet oder als jährlich gepflegte JSON-Datei bereitgestellt.

---

## 6. Liquid Glass Design System

### Grundprinzipien

Apple's Liquid Glass basiert auf:
1. **Glassmorphism** — Halbtransparente Hintergründe mit Blur
2. **Dynamische Lichtbrechung** — Subtile Farbverläufe die auf Kontext reagieren
3. **Weiche Tiefe** — Mehrstufige Schatten, keine harten Kanten
4. **Flüssige Animationen** — Smooth Transitions überall

### Tailwind-Umsetzung

```css
/* glass.css — Custom Utilities */

@layer components {
  .glass {
    @apply bg-white/10 backdrop-blur-xl border border-white/20
           rounded-2xl shadow-lg shadow-black/5;
  }

  .glass-strong {
    @apply bg-white/20 backdrop-blur-2xl border border-white/30
           rounded-2xl shadow-xl shadow-black/10;
  }

  .glass-subtle {
    @apply bg-white/5 backdrop-blur-md border border-white/10
           rounded-xl;
  }

  .glass-nav {
    @apply bg-white/15 backdrop-blur-2xl border-t border-white/20
           shadow-[0_-4px_30px_rgba(0,0,0,0.1)];
  }

  .glass-dark {
    @apply bg-black/20 backdrop-blur-xl border border-white/10
           rounded-2xl shadow-lg;
  }

  /* Liquid Light Effect */
  .glass-glow {
    @apply relative overflow-hidden;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0.15) 100%
    );
  }
}
```

### Farbpalette

```
Primary Gradient:  #1B4332 → #2D6A4F (Islamisches Grün)
Accent:            #40916C (Helles Grün)
Background:        #0A0A0A → #1A1A2E (Dunkler Gradient)
Glass-Tint:        rgba(255, 255, 255, 0.05–0.20)
Text Primary:      #F0F0F0
Text Secondary:    #A0A0A0
Danger/Alert:      #E63946
```

---

## 7. Deployment

### Docker (Self-Hosting)

```dockerfile
# Dockerfile — Multi-Stage Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.output ./.output
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

```yaml
# docker-compose.yml
version: "3.8"
services:
  muslimapp:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NUXT_PUBLIC_ALADHAN_BASE_URL=https://api.aladhan.com/v1
      - NUXT_PUBLIC_QURAN_BASE_URL=https://api.quran.com/api/v4
    restart: unless-stopped
```

### Cloudflare Pages (Kostenlos-Alternative)

```bash
# nuxt.config.ts → preset: 'cloudflare-pages'
# Dann: npx wrangler pages deploy .output/public
```

**Kostenfrei:** Unlimited Requests, Global CDN, Auto-SSL.

---

## 8. Performance-Strategie

| Maßnahme | Umsetzung |
|---|---|
| **Lazy Loading** | Koran-Daten nur bei Bedarf laden (per Sure) |
| **API-Caching** | Gebetszeiten für den Tag cachen (localStorage + Pinia) |
| **Service Worker** | Statische Assets + Schriftarten offline verfügbar |
| **Image-Optimierung** | Nuxt Image für PWA-Icons |
| **Code Splitting** | Automatisch via Nuxt (route-basiert) |
| **Arabische Font** | `font-display: swap` + Subset für Koran-Zeichen |

---

## 9. Nächste Schritte (Umsetzungsreihenfolge)

```
Schritt 1:  Nuxt 3 Projekt initialisieren + Tailwind + TypeScript + PWA
Schritt 2:  Liquid Glass Design System (GlassCard, GlassNav, GlassButton)
Schritt 3:  Layout + Bottom-Navigation + Dashboard-Seite (Skeleton)
Schritt 4:  Standort-Erkennung (GPS + manuelle Suche)
Schritt 5:  Gebetszeiten via Aladhan API (Method 13) + Countdown
Schritt 6:  Hijri-Datum-Anzeige auf Dashboard
Schritt 7:  Docker-Setup + erstes Deployment
Schritt 8:  Koran — Surenübersicht + Reader (Arabisch + TR + DE)
Schritt 9:  Koran — Suche + Lesezeichen
Schritt 10: Islamischer Kalender + Feiertage + Kandil-Nächte
Schritt 11: Countdown-Widget für nächsten Feiertag
Schritt 12: i18n vorbereiten (DE als Standard)
```

---

## 10. Offene Punkte / Zukunft

- [ ] Diyanet-Daten direkt scrapen als Alternative zu Aladhan?
- [ ] Push-Notifications für Gebetszeiten (erfordert Notification API)
- [ ] User-Accounts / Cloud-Sync für Lesezeichen?
- [ ] Tasbih (digitaler Gebetszähler)?
- [ ] Hadith-Sammlung?
- [ ] Widget für Android/iOS Homescreen?
