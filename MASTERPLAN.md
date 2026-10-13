# MuslimApp — Masterplan

> **Vision:** Der Anlaufpunkt für alle, die sich mit dem Islam befassen — vom Neugierigen über die Praktizierende bis zum Vertiefenden. Eine mobile-first Progressive Web App (PWA) mit Gebetszeiten, Koran-Reader, Lernzentrum, Adhkar, Hadith, islamischem Kalender und praktischen Werkzeugen.
> **Erstellt:** 22. März 2026 | **Letztes Update:** 13. Oktober 2026 | **Status:** Phase 1–10 abgeschlossen · Version 2.0 umgesetzt (siehe [V2-PLAN.md](./V2-PLAN.md)) · **Phase 11 (Plattform) in Arbeit** — Arabisch/RTL sowie Aqida- und Hajj-Lernpfad werden gerade ergänzt

---

## 1. Übersicht & Entscheidungen

| Entscheidung | Geplant | Tatsächlich umgesetzt | Notizen |
|---|---|---|---|
| Framework | Nuxt 3 (Vue 3 + TypeScript) | **Nuxt 4.4.2** (Vue 3.5 + TypeScript) | Nuxt 4 statt 3 (aktuellere Version) |
| Styling | Tailwind CSS 4 + Liquid Glass | **Tailwind CSS 3.4** + Custom Glass CSS | Tailwind 4 war inkompatibel, v3 funktioniert einwandfrei |
| State Management | Pinia | **Nuxt `useState` Composables** | Pinia-Modul inkompatibel mit Nuxt 4, useState reicht aus |
| PWA | @vite-plugin-pwa | **@vite-pwa/nuxt 1.1.1 (injectManifest)** + Workbox | Eigener Service Worker in `service-worker/sw.ts`, Update-Hinweis (`registerType: 'prompt'`), Navigationen network-first |
| i18n | @nuxtjs/i18n | **@nuxtjs/i18n 9.5** | DE + TR + EN vollständig; Arabisch/RTL in Arbeit (Phase 11) |
| Deployment | Docker + Cloudflare Pages | **Docker implementiert** (inkl. Volume für `.data`) | Cloudflare Pages zurückgestellt: Web Push braucht einen dauerhaft laufenden Node-Prozess (Scheduler) |
| Gebetszeiten-API | Aladhan API (Method 13) | **Aladhan API über eigenen Nitro-Proxy** (wählbar, Standard: Method 13) | 15 Methoden, Asr-Madhhab, Hochbreiten-Regel, Minutenkorrektur |
| Koran-Daten | quran.com API v4 + Offline-JSON | **quran.com API v4 + IndexedDB Offline-Bundle** | Zusätzlich Vers-/Wort-Audio, Tafsir, Transliteration |
| Hijri-Kalender | Aladhan API + dayjs-hijri | **Aladhan API (Proxy)** | dayjs-hijri nicht benötigt, API reicht |
| Push | Browser-Notifications | **Web Push (VAPID) + Nitro-Scheduler** | Serverseitig geplant, erreicht auch die geschlossene App; lokale Erinnerungen als Fallback |
| Tests/CI | — | **Vitest + Playwright + GitHub Actions** | Typecheck, Unit, Build, E2E-Smoke |

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
- [x] **Dua-Sammlung** — Bittgebete in Kategorien (AR + Transliteration + 3 Sprachen)
- [x] **Push-Notifications** — Gebetszeiten-Erinnerungen (pro Gebet konfigurierbar; zunächst nur lokal, serverseitig seit Phase 6)
- [x] **Tasbih (Gebetszähler)** — 7 Dhikr-Modi, Fortschrittsring, Haptic Feedback
- [x] **Konfigurierbares Dashboard** — Widgets ein-/ausschaltbar, neu sortierbar (damals 7, inzwischen 14)
- [x] **"Mehr"-Hub** — Zentrale Seite für Werkzeuge + PWA Install-Banner
- [x] **Zufälliger Vers Widget** — Random Quran-Vers auf dem Dashboard
- [x] **Hadith-Sammlung** — Kuratierte Hadiths mit Kategorien, Suche und Dashboard-Widget (damals 43, inzwischen 100 — Phase 9)
- [x] **Koran Offline-Bundle** — IndexedDB-basiertes Offline-Caching aller Suren (in Einstellungen ladbar)
- [x] **Audio-Rezitation** — in Version 2.0 umgesetzt (Kapitel 10), Vers-Audio in Phase 7

### Phase 5 — Stabilisierung & Fundament ✅ Abgeschlossen
Ausgangspunkt war ein QA-Durchlauf der Version 2.0. Behobene Befunde und neu gelegtes Fundament:
- [x] **Navigation:** feste 5-Tab-Leiste (Heute · Gebet · Koran · Lernen · Mehr) statt frei konfigurierbarer Leiste; Einstellungen und „Über“ sind jetzt immer erreichbar (vorher konnten sie über den Navigations-Editor aus der Leiste verschwinden); Favoriten-Reihe im „Mehr“-Hub; eigene Fehlerseite
- [x] **Globale Standort-Initialisierung:** Standort und Gebetszeiten werden zentral beim App-Start (Plugin `app-init`) wiederhergestellt — Ramadan-, Countdown- und Tracker-Seiten funktionieren auch nach einem Reload, ohne Umweg über `/prayer`
- [x] **Service Worker neu:** Migration vom handgeschriebenen `sw.js` auf `@vite-pwa/nuxt` (Workbox, injectManifest); Navigationen **network-first** (kein veralteter Stand nach Deploys), Update-Hinweis statt stiller Übernahme, Range-Requests für Audio, Bereinigung der Alt-Caches; Hänger von `serviceWorker.ready` ohne registrierten Worker behoben
- [x] **Typecheck sauber** (`nuxi typecheck`), danach als CI-Gate
- [x] **Tests & CI:** Vitest (Unit) + Playwright (E2E-Smoke aller Routen, Mobile-Chromium) + GitHub-Actions-Workflow (Typecheck → Unit → Build, separater E2E-Job)
- [x] **A11y-Primitives:** BottomSheet mit Fokus-Management, ConfirmDialog (`useConfirm`), ToggleSwitch, ProgressBar, Skeleton-Loader, globaler `focus-visible`-Stil, ARIA-Rollen/Labels (aria-pressed/expanded, Tablist, Progressbar); Einstellungs-Seite barrierefrei
- [x] **Dashboard-Reset** repariert (Zurücksetzen/Umschalten/Verschieben veränderten die gemeinsamen Standard-Widgets; jetzt tiefe Kopie)
- [x] **Zeitzonen-korrekte Gebetszeiten:** Zeiten und „heute/morgen“ werden in der Zeitzone des gewählten Ortes berechnet, nicht des Geräts; Monatsabruf mit Cache pro Standort + Parametern
- [x] **Asr-Madhhab** (Standard/Hanafi), **Hochbreiten-Regel** und **Minutenkorrektur pro Gebet** (additiv zu den Offsets der Methode)
- [x] **Ramadan pro Hijri-Jahr:** Fasten-/Khatam-Tracker getrennt je Jahr, Countdown zum nächsten Ramadan, Vorjahr schreibgeschützt einsehbar
- [x] **Layout-Fixes:** horizontaler Überlauf des Dashboard-Bento-Grids auf Mobilgeräten, Hydration-Mismatches (u. a. Tracker, Einstellungen)
- [x] **Aladhan-Proxy** (`/api/aladhan/**`): serverseitig gecacht, Parameter validiert, Timeout und einheitliche Fehler

### Phase 6 — Web Push ✅ Abgeschlossen
- [x] **Serverseitiger Versand** von Gebets- und Dhikr-Erinnerungen (VAPID, `web-push`), auch bei geschlossener App
- [x] **Nitro Scheduled Task** `push:dispatch` (jede Minute): lädt die (gecachten) Aladhan-Monate je Abonnent, berechnet fällige Erinnerungen (Zeitzone, Minutenkorrektur, Mitternachts-Übergänge) und sendet sie mit Dedupe
- [x] **Push-API:** `config`, `subscribe`, `update`, `unsubscribe`, `test` — Body-Limit, JSON-Validierung (`shared/push/validate.ts`), Rate-Limit pro IP, Obergrenze für Abonnenten, tote Subscriptions (404/410) werden entfernt
- [x] **Speicherung:** Nitro Storage `push` (fs, `./.data/push`), nur minimale Daten; Standort auf 2 Nachkommastellen gerundet
- [x] **Client:** `useNotifications` (Gebets-Erinnerungen mit Vorlaufzeit), `useDhikrReminders` (Morgen/Abend-Adhkar), Plugin `push-sync` hält die Server-Präferenzen aktuell; Service Worker verarbeitet `push` und `notificationclick`
- [x] **Graceful Fallback:** ohne VAPID-Keys → lokale Erinnerungen (nur bei geöffneter App)
- [x] Push-Texte in DE · TR · EN (`shared/push/messages.ts`)

### Phase 7 — Koran vertiefen ✅ Abgeschlossen (Tajwid-Farben offen)
- [x] **Vers-für-Vers-Audio** mit Hervorhebung, 6 Rezitatoren, Geschwindigkeit, Wiederholung, „weiter zur nächsten Sure“, Mini-Player
- [x] **Hifz-Schleife** (Verse/Bereiche wiederholen)
- [x] **Wort-für-Wort** inkl. Wort-Audio
- [x] **Transliteration** pro Vers und zusätzliche **englische Übersetzung** (neben DE/TR), Übersetzungen einzeln wählbar
- [x] **Tafsir** pro Vers (Ibn Kathir, Ma'arif al-Qur'an, al-Muyassar, as-Sa'di) und **Sureninfo**
- [x] **Juz-Ansicht**
- [x] **Reader-Einstellungen** (Schriftgrößen, Auto-Scroll, Tafsir-Wahl) mit Persistenz
- [x] Audio offline: Service Worker cached ganze Dateien (cache-first) und beantwortet Byte-Ranges (Safari)
- [ ] **Tajwid-Farben** — offen (Datenquelle/Schrift noch zu klären)
- [ ] Khatm-Planer (Leseplan) — offen (Khatam-Tracker existiert nur im Ramadan-Modus)

### Phase 8 — Lernzentrum ✅ Abgeschlossen (Aqida & Hajj in Arbeit)
Neuer Tab **Lernen** mit Wissensstufen (Entdecken · Praktizieren · Vertiefen), Lernpfaden, Lektionsleser, Quiz, Glossar und FAQ; Fortschritt wird lokal gespeichert, Dashboard-Widget „Weiterlernen“.
- [x] **Lern-Engine:** typisiertes Content-Schema (`app/data/learn/types.ts`: Text-, Koran-, Hadith-, Hinweis-, Begriffs- und Link-Blöcke, Quiz, Quellen, `review`-Status), Lektionsleser, Quiz, Fortschritt (`useLearnProgress`)
- [x] **Pfad „Grundlagen des Islam“** — 12 Lektionen
- [x] **Pfad „Neu im Islam“** — 10 Lektionen
- [x] **Pfad „Fiqh des Alltags“** — 12 Lektionen
- [x] **Glossar** — 134 Begriffe (inkl. Fiqh-Begriffe), tappbare Begriffs-Chips in Lektionen
- [x] **FAQ** — 35 Einträge in 8 Kategorien
- [x] Redaktionelle Regeln: Quellenangabe pro Aussage, neutrale Darstellung bei Rechtsschul-Unterschieden, alle Inhalte `draft` bis zur Prüfung ([docs/CONTENT-REVIEW.md](./docs/CONTENT-REVIEW.md))
- [ ] 🔄 **Pfad „Aqida“** — in Arbeit (bereits als „Bald verfügbar“ angekündigt)
- [ ] 🔄 **Pfad „Hajj & Umra“** — in Arbeit

### Phase 9 — Inhalte vertiefen ✅ Abgeschlossen (Hisnul-Muslim-Vervollständigung & Tajwid offen)
- [x] **Hadith:** 100 Einträge (vorher 43), **Authentizitätsgrade** (sahih · hasan · daif · ungeprüft) mit Grader-Hinweis, Grad-Filter, Teilen und **Deep-Links** (`/hadith?id=…`)
- [x] **Adhkar:** 56 Einträge in 9 Sets (Morgen, Abend, nach dem Gebet, Schlaf, Aufwachen, Reise, Zuhause, Essen, Bedrängnis) mit Zählern, Tagesfortschritt, Dashboard-Widget und Erinnerungen
- [x] **Kalender-Erklärungen:** Info-Sheet pro Feiertag, **Fastentage** (Weiße Tage, Montag/Donnerstag, Arafa, Aschura/Tasua, 6 Tage Schawwal), **ICS-Export**, **Hijri-Konverter**
- [ ] **Hisnul Muslim vollständig** — die Adhkar decken bisher eine Auswahl ab
- [ ] **Tajwid-Regeln** als Lerninhalt — offen

### Phase 10 — Werkzeuge ✅ Abgeschlossen
- [x] **Moscheen in der Nähe** — OpenStreetMap/Overpass, Radius 2–25 km, Entfernung, Adresse, Betreiber, Karten-Link; Standort wird nur auf Knopfdruck gesendet
- [x] **Gebets-Tracker** (V2) — verrichtet/Qada, Serie, Wochenübersicht, 7/30-Tage-Statistik, Dashboard-Widget
- [x] **Zakat-Rechner** (V2) — Nisab Gold/Silber, 2,5 %, offline
- [x] **Datensicherung** (V2) — JSON-Export/-Import aller `muslimapp-*`-Daten
- [x] **Favoriten** — Verse speichern; Werkzeuge im Hub anpinnen
- [x] Integration: Nav-Einträge, Dashboard-Widgets, Erinnerungen öffnen `/adhkar`

### Phase 11 — Plattform 🔄 In Arbeit
- [ ] 🔄 **Arabische Oberfläche (`ar`) mit RTL-Layout** — in Arbeit
- [ ] 🔄 **Aqida- und Hajj-Lernpfad** — in Arbeit (siehe Phase 8)
- [ ] **Lighthouse-Audit** (Performance, A11y, PWA) und Behebung der Befunde — offen
- [ ] **Maskable-Icon** — offen (aktuell nur runde Icons auf transparentem Grund; das SVG dient als Maskable-Platzhalter)
- [ ] **Datenschutzseite** in der App — offen (Inhalt liegt als Abschnitt in der README vor)
- [ ] Cloudflare-Pages-/Edge-Deployment — zurückgestellt (Scheduler benötigt Node-Prozess)

---

## 3. Technische Architektur

### 3.1 Projektstruktur (Ist-Stand)

```
muslimApp/
├── nuxt.config.ts                  # Module, i18n, PWA (injectManifest), Runtime Config, Nitro (Tasks, Storage)
├── package.json · tsconfig.json    # Dependencies, Scripts (dev, build, test, test:e2e, typecheck, vapid)
├── Dockerfile · docker-compose.yml # Multi-Stage Build, Volume für /app/.data
├── .env.example                    # VAPID-Keys, optionale Upstream-URLs
├── vitest.config.ts · playwright.config.ts
├── MASTERPLAN.md · README.md · V2-PLAN.md
│
├── app/
│   ├── app.vue · error.vue         # Root, Fehlerseite
│   ├── layouts/default.vue         # Bottom-Navigation (5 feste Tabs) + Desktop-Sidebar
│   ├── plugins/                    # app-init.client (Standort/Gebetszeiten global), push-sync.client, confirm.client
│   ├── pages/
│   │   ├── index.vue               # Dashboard (14 konfigurierbare Widgets)
│   │   ├── prayer.vue · tracker.vue
│   │   ├── quran/ (index, [surah])
│   │   ├── learn/ (index, faq, glossary, [path]/index, [path]/[lesson])
│   │   ├── adhkar · dua · hadith · names · guide · seerah
│   │   ├── calendar · ramadan · mosques · zakat · qibla · tasbih
│   │   └── favorites · more · settings · about
│   ├── components/                 # ui (Glass-Design-System, BottomSheet, ConfirmDialog …), prayer, quran,
│   │                               # learn, adhkar, hadith, calendar, mosques, widgets, pwa (UpdatePrompt)
│   ├── composables/                # Business-Logik: usePrayerTimes, usePrayerInit, useLocation, useQuran(+Audio/Extras),
│   │                               # useNotifications, useDhikrReminders, useLearnProgress, useAdhkar, useHolidays,
│   │                               # useRamadan, useMosques, usePrayerTracker, useZakat, useBackup, useFavorites,
│   │                               # useNavigation, useDashboard, useTheme, usePWA, …
│   ├── data/                       # hadiths (100), adhkar (56), duas, allah-names, seerah, prayer-guide,
│   │   │                           # holiday-info, prayer-methods, surah-names-de
│   │   └── learn/                  # types, index (Registry), faq, glossary(+fiqh), paths/{basics,new-muslim,fiqh}
│   └── utils/                      # geo, hijri-dates, ics, mosques, quran, time, sw, version, adhkar
│
├── server/                         # Nitro
│   ├── api/aladhan/                # Proxy: calendar, gToH, hToG, hToGCalendar (gecacht, validiert)
│   ├── api/push/                   # config · subscribe · update · unsubscribe · test
│   ├── tasks/push/dispatch.ts      # Geplanter Versand (jede Minute)
│   └── utils/                      # aladhan, push (Storage, Rate-Limit, Senden), push-dispatch
│
├── shared/                         # Client + Server: push/{types,validate,dispatch,messages}, time
├── service-worker/sw.ts            # Workbox: Precache, network-first Navigationen, Runtime-Caches, Push, Notifications
├── data/holidays.json              # 11 Feiertage + 12 Hijri-Monate
├── i18n/                           # de.json · tr.json · en.json
├── docs/CONTENT-REVIEW.md          # Fachliche Prüfliste
├── tests/                          # unit/ (Vitest) · e2e/ (Playwright)
├── .github/workflows/ci.yml        # Typecheck, Unit, Build, E2E
└── public/                         # favicon.svg, icons/ (180/192/512)
```

### 3.2 Datenfluss-Architektur (Ist-Stand)

```
┌──────────────────────────────────────────────────────────────────────┐
│                          BROWSER (Client)                             │
│                                                                       │
│  Pages: Dashboard · Prayer · Quran · Learn · Adhkar · Hadith ·        │
│         Calendar · Mosques · Tracker · Zakat · Tools · Settings       │
│                                │                                      │
│  ┌─────────────────────────────┴──────────────────────────────────┐  │
│  │   Nuxt useState (reaktiver State) + Plugin app-init            │  │
│  │   (stellt Standort & Gebetszeiten global beim Start her)       │  │
│  └─────────────────────────────┬──────────────────────────────────┘  │
│  ┌─────────────────────────────┴──────────────────────────────────┐  │
│  │   Composables (Business-Logik, shared/ für Push-Planung)       │  │
│  └──────┬─────────────────────────────┬─────────────┬─────────────┘  │
│  ┌──────┴────────────┐  ┌─────────────┴──┐  ┌───────┴────────────┐   │
│  │ localStorage      │  │ IndexedDB      │  │ Browser-APIs       │   │
│  │ Standort, Monats- │  │ Koran Offline- │  │ Geolocation,       │   │
│  │ cache, Tracker,   │  │ Bundle         │  │ DeviceOrientation, │   │
│  │ Fortschritt, …    │  └────────────────┘  │ Notifications,     │   │
│  └───────────────────┘                      │ PushManager        │   │
│                                             └───────┬────────────┘   │
│  ┌──────────────────────────────────────────────────┴────────────┐   │
│  │ Service Worker (Workbox, /sw.js)                              │   │
│  │ • Precache der Build-Assets • Navigationen network-first      │   │
│  │ • Runtime-Caches: Aladhan-Proxy & quran.com (network-first),  │   │
│  │   Audio (cache-first + Range), Fonts • push / notificationclick│  │
│  └──────────────────────────────────────────────────┬────────────┘   │
└─────────────┬────────────────────────┬──────────────┴────────────────┘
              │ /api/**                │ direkt (fetch)
┌─────────────┴─────────────────┐      │
│     NITRO-SERVER (Node)       │      │
│                               │      │
│  /api/aladhan/** ─ Proxy ─────┼──┐   │
│    (Cache, Validierung)       │  │   │
│                               │  │   │
│  /api/push/*                  │  │   │
│    config · subscribe ·       │  │   │
│    update · unsubscribe · test│  │   │
│        │                      │  │   │
│        ▼                      │  │   │
│  Nitro Storage "push"         │  │   │
│  (fs → ./.data/push, Volume)  │  │   │
│        ▲                      │  │   │
│        │ liest                │  │   │
│  Scheduled Task push:dispatch │  │   │
│  (jede Minute) ── web-push ───┼──┼───┼──► Push-Dienste (FCM, Mozilla,
│    nutzt Aladhan-Monate ──────┼──┘   │     Apple) ──► Service Worker
└───────────────────────────────┘      │
                                       ▼
      ┌────────────────────────────────────────────────────┐
      │              EXTERNE DIENSTE (kostenlos)            │
      │ Aladhan API (nur via Proxy)                         │
      │ quran.com API v4 · verses.quran.com ·               │
      │   audio.qurancdn.com · mirrors.quranicaudio.com     │
      │ Nominatim (Geocoding) · Overpass (Moscheen)         │
      │ Google Fonts                                        │
      └────────────────────────────────────────────────────┘
```

**Wichtige Datenflüsse**
- **Gebetszeiten:** Client → `/api/aladhan/calendar/{year}/{month}` → Aladhan (serverseitiger Cache); der Client cached den Monat pro Standort + Parametern und berechnet „nächstes Gebet“ lokal in der Zeitzone des Ortes.
- **Push:** Client abonniert über den Service Worker → `/api/push/subscribe` speichert Subscription + Präferenzen → Task `push:dispatch` plant jede Minute mit denselben Berechnungsregeln wie der Client (`shared/push/dispatch.ts`) und sendet → der Service Worker zeigt die Benachrichtigung, ein Klick öffnet die Ziel-Route.
- **Koran/Audio/Geocoding/Overpass:** direkt vom Browser; der Service Worker übernimmt das Caching (Nominatim: nur Netzwerk).

---

## 4. API-Referenz

### 4.1 Aladhan — Gebetszeiten + Hijri-Kalender (über eigenen Proxy)

| Eigenschaft | Wert |
|---|---|
| **Upstream** | `https://api.aladhan.com/v1/` (überschreibbar via `NUXT_ALADHAN_BASE_URL`) |
| **Auth** | Keine (kostenlos, kein API-Key) |
| **Rate-Limit** | Nicht dokumentiert, fair use — deshalb Proxy mit Cache |
| **Standard-Methode** | `method=13` (Diyanet, wählbar in Einstellungen) |

**Proxy-Routen (Nitro):**

| Route | Verwendung | Composable |
|---|---|---|
| `GET /api/aladhan/calendar/{year}/{month}` (lat/lng, method, school, Hochbreiten-Regel) | Gebetszeiten eines ganzen Monats | `usePrayerTimes`, Push-Scheduler |
| `GET /api/aladhan/gToH/{DD-MM-YYYY}` | Gregorian → Hijri (30 Tage gecacht) | `useHolidays`, `useRamadan` |
| `GET /api/aladhan/hToG/{DD-MM-YYYY}` | Hijri → Gregorian | `useHolidays`, `HijriConverter` |
| `GET /api/aladhan/hToGCalendar/{month}/{year}` | Hijri-Monatskalender | `useHolidays` |

### 4.2 quran.com — Koran

| Eigenschaft | Wert |
|---|---|
| **Base-URL** | `https://api.quran.com/api/v4/` (überschreibbar via `NUXT_PUBLIC_QURAN_BASE_URL`) |
| **Auth** | Keine (kostenlos, kein API-Key) |

**Genutzte Endpoints:**

| Endpoint | Verwendung | Composable |
|---|---|---|
| `GET /chapters?language=de` | Alle 114 Suren laden | `useQuran` |
| `GET /quran/verses/uthmani?chapter_number={id}` | Arabischer Text (Uthmani) | `useQuran` |
| `GET /verses/by_chapter/{id}?translations=…` | Verse mit Übersetzungen, Transliteration, Wörtern | `useQuran`, `useQuranExtras` |
| `GET /search?q={query}&language={lang}` | Volltextsuche | `useQuran` |
| `GET /recitations/{reciter}/by_chapter/{id}` | Vers-Audio-URLs | `useQuranAudio` |
| `GET /tafsirs/{id}/by_ayah/{verse_key}` | Tafsir pro Vers (HTML wird bereinigt) | `useQuranTafsir` |
| `GET /chapters/{id}/info` | Sureninfo | `useQuranExtras` |

**Translation-IDs:**

| ID | Inhalt |
|---|---|
| **52** | Türkisch — Elmalılı Hamdi Yazır |
| **27** | Deutsch — Bubenheim & Elyas |
| **20** | Englisch — Sahih International |
| **57** | Transliteration |

**Tafsir-IDs:** 169 Ibn Kathir (abridged, EN) · 168 Ma'arif al-Qur'an (EN) · 16 al-Muyassar (AR) · 91 as-Sa'di (AR). Audio-Hosts: `verses.quran.com` (Verse), `audio.qurancdn.com` (Wörter), `mirrors.quranicaudio.com`.

### 4.3 Nominatim — Geocoding

| Endpoint | Verwendung |
|---|---|
| `GET /reverse?lat&lon&format=json` | GPS-Koordinaten → Stadtname |
| `GET /search?q={city}&format=json` | Stadtname → Koordinaten (Autocomplete) |

### 4.4 Overpass — Moscheen in der Nähe

| Eigenschaft | Wert |
|---|---|
| **Endpoint** | `https://overpass-api.de/api/interpreter` |
| **Query** | `amenity=place_of_worship` + `religion=muslim` im Umkreis (2–25 km), `out center tags` |
| **Lizenz** | © OpenStreetMap-Mitwirkende, ODbL |
| **Datenschutz** | Der Standort wird nur beim Start der Suche gesendet |

### 4.5 Eigene Push-API (Nitro)

| Route | Zweck |
|---|---|
| `GET /api/push/config` | `{ enabled, publicKey }` — immer 200; `enabled: false` ohne VAPID-Keys |
| `POST /api/push/subscribe` | Subscription + Präferenzen speichern (Rate-Limit, Validierung, max. 50.000 Abonnenten) |
| `POST /api/push/update` | Präferenzen aktualisieren |
| `POST /api/push/unsubscribe` | Subscription löschen |
| `POST /api/push/test` | Test-Benachrichtigung (strengeres Rate-Limit) |

---

## 5. Islamische Feiertage — Datenmodell

Definiert in `data/holidays.json`. Alle Daten sind im Hijri-Kalender angegeben und werden automatisch in gregorianische Daten umgerechnet. Erklärungstexte und Fastentage stehen in `app/data/holiday-info.ts` (ungeprüft, siehe Offene Punkte).

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
cp .env.example .env          # VAPID-Keys eintragen (npm run vapid)
docker compose up -d
```

- **Volume:** `docker-compose.yml` bindet `muslimapp-data` an `/app/.data`; dort liegen die Push-Abonnenten (`/app/.data/push`). Ohne Volume gehen Abonnements bei jedem Neu-Deployment verloren.
- **Umgebungsvariablen:** `NUXT_PUBLIC_VAPID_PUBLIC_KEY`, `NUXT_VAPID_PRIVATE_KEY`, `NUXT_VAPID_SUBJECT` (alle drei nötig für Web Push); optional `NUXT_ALADHAN_BASE_URL` (Upstream des Proxys) und `NUXT_PUBLIC_QURAN_BASE_URL`.
- **HTTPS** ist für Service Worker und Push Pflicht (außer `localhost`) — Reverse-Proxy (z. B. Caddy/Traefik) vorschalten.
- Der Scheduler läuft im Node-Prozess → **eine Instanz** (siehe Offene Punkte).
- Hinweis: `docker-compose.yml` setzt noch `NUXT_PUBLIC_ALADHAN_BASE_URL`; die Aladhan-URL ist inzwischen server-only (`NUXT_ALADHAN_BASE_URL`) — der alte Eintrag hat keine Wirkung.

### Cloudflare Pages

Zurückgestellt. Der Push-Scheduler und das Dateisystem-Storage setzen einen dauerhaft laufenden Node-Prozess voraus; ein Edge-Preset würde eine andere Storage-/Scheduler-Lösung (z. B. KV + Cron Trigger) erfordern.

### CI

GitHub Actions (`.github/workflows/ci.yml`) bei Push auf `main` und für jeden Pull Request: Job `check` (Typecheck → Unit-Tests → Build) und Job `e2e` (Playwright, Mobile-Chromium, Report-Upload bei Fehlern).

---

## 8. Performance-Strategie

| Maßnahme | Status | Details |
|---|---|---|
| **Lazy Loading** | ✅ | Koran-Verse werden pro Sure geladen, i18n-Sprachdateien lazy |
| **API-Caching** | ✅ | Gebetszeiten-Monate in localStorage, Aladhan-Proxy serverseitig gecacht (SWR) |
| **Code Splitting** | ✅ | Automatisch via Nuxt (route-basiert) |
| **Arabische Font** | ✅ | Amiri via Google Fonts mit `display=swap` |
| **Service Worker** | ✅ | Workbox: Precache, network-first Navigationen, Runtime-Caches, Audio cache-first mit Range-Support |
| **Koran Offline-Bundle** | ✅ | IndexedDB-basiertes Caching aller Suren |
| **View Transitions** | ✅ | Weicher Seitenwechsel (View Transitions API, mit Fallback) |
| **Lighthouse-Audit** | ⬜ | Offen (Phase 11) |

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
| 21 | Dua-Sammlung (Bittgebete in Kategorien) | ✅ | — |
| 22 | Push-Notifications (pro Gebet konfigurierbar, lokal) | ✅ | — |
| 23 | Konfigurierbares Dashboard (Widgets, sortierbar) | ✅ | — |
| 24 | "Mehr"-Hub + PWA Install-Banner | ✅ | — |
| 25 | Zufälliger Vers Widget + Hadith-des-Tages Widget | ✅ | — |
| 26 | Hadith-Sammlung (Kategorien, Suche) | ✅ | — |
| 27 | Koran Offline-Bundle via IndexedDB | ✅ | — |
| 28 | Version 2.0 — Tracker, Zakat, Audio, Favoriten, Backup | ✅ | — |
| 29 | Phase 5: Navigation, globale Standort-Init, Workbox-SW, Tests/CI, A11y, zeitzonenkorrekte Gebetszeiten, Asr/Hochbreiten/Minutenkorrektur | ✅ | Branch `feat/phase-5-foundation` |
| 30 | Phase 6: Web Push mit serverseitigem Scheduler | ✅ | Branch `feat/phase-5-foundation` |
| 31 | Phase 7: Koran-Reader (Vers-Audio, Hifz, Wort-für-Wort, Tafsir, Juz) | ✅ | Branch `feat/phase-5-foundation` |
| 32 | Phase 8: Lernzentrum (Engine, 3 Pfade, Glossar, FAQ) | ✅ | Branch `feat/phase-5-foundation` |
| 33 | Phase 9: Hadith-Grade, Adhkar, Kalender-Erklärungen/Fastentage/ICS | ✅ | Branch `feat/phase-5-foundation` |
| 34 | Phase 10: Moscheen in der Nähe | ✅ | Branch `feat/phase-5-foundation` |
| 35 | Phase 11: Arabisch/RTL, Aqida- und Hajj-Pfad | 🔄 | in Arbeit |

---

## 10. Version 2.0 — Umgesetzt ✅

Vollständig dokumentiert in [V2-PLAN.md](./V2-PLAN.md) (bleibt als historischer Plan erhalten; spätere Erweiterungen stehen in den Phasen 5–11 oben).

| Feature | Status | Notizen |
|---|---|---|
| Audio-Rezitation | ✅ | Audio-Player im Suren-Reader; seit Phase 7 Vers-Audio mit Hervorhebung und 6 Rezitatoren |
| Gebets-Tracker | ✅ | 5 Gebete/Tag abhaken (verrichtet/Qada), Streak, 7/30-Tage-Statistik, Dashboard-Widget |
| Zakat-Rechner | ✅ | Nisab Gold/Silber wählbar, 2,5 %, komplett offline |
| Vers-Favoriten | ✅ | Herz-Button im Reader + `/favorites`-Seite (localStorage) |
| Datensicherung | ✅ | JSON-Export/-Import aller App-Daten in den Einstellungen |

## 11. Offene Punkte

### Fachlich / Inhalt
| Punkt | Priorität | Notizen |
|---|---|---|
| **Fachliche Prüfung der Inhalte** | Hoch | Alle Lernpfade, Glossar, FAQ, Kalender-Erklärungen, Adhkar und Hadith-Grade sind `draft`. Prüfliste: [docs/CONTENT-REVIEW.md](./docs/CONTENT-REVIEW.md) (Hadith-Nummern, arabischer Wortlaut, Rechtsschul-Positionen). Danach `review: 'reviewed'` setzen |
| Koran-Übersetzungen in Lektionen | Mittel | Teils gekürzt/paraphrasiert — gegen Referenzübersetzungen abgleichen |
| Notrufnummern in FAQ | Niedrig | Deutschland-spezifisch, auch im EN/TR-Text — Lokalisierung klären |
| Hisnul Muslim vollständig | Mittel | Adhkar sind eine Auswahl |
| Tajwid (Farben im Reader, Lerninhalt) | Mittel | Datenquelle und Darstellung offen |
| Aqida- und Hajj-Pfad | Hoch | In Arbeit |
| Khatm-Planer | Niedrig | Leseplan zum Koran-Abschluss in X Tagen |

### Technik / Betrieb
| Punkt | Priorität | Notizen |
|---|---|---|
| **Push-Skalierung über eine Instanz hinaus** | Mittel | Scheduler läuft im Node-Prozess, Storage ist ein lokales Dateisystem, Rate-Limits liegen im Arbeitsspeicher. Mehrere Instanzen würden doppelt senden → Locking/Leader-Election, gemeinsame Storage (z. B. Redis/DB) und zentrales Rate-Limit nötig. Aktuell: eine Instanz + Volume |
| **iOS-Push-Besonderheiten** | Mittel | Web Push funktioniert auf iOS/iPadOS ab 16.4 nur für zum Home-Bildschirm hinzugefügte PWAs und nach Berechtigung per Nutzeraktion; Zustellung und Hintergrundverhalten schwanken. Notification-Trigger (geplante lokale Benachrichtigungen) gibt es nur in Chromium |
| **Overpass-Zuverlässigkeit** | Mittel | Öffentlicher Dienst mit Lastspitzen/Timeouts und Fair-Use-Limits; Daten abhängig von OSM-Tagging (Namen/Betreiber teils leer). Optionen: Fallback-Instanz, Server-Proxy mit Cache |
| Tafsir auf Deutsch/Türkisch nicht verfügbar | Mittel | quran.com liefert nur englische und arabische Tafsire; eigene Quelle oder Lizenz nötig |
| Lighthouse-Audit | Mittel | Performance/A11y/PWA messen und Befunde beheben |
| Maskable-Icon | Niedrig | Eigenes Artwork mit Safe-Zone erstellen |
| Datenschutzseite in der App | Mittel | Text aus der README (Push-Daten, Drittanbieter-Anfragen, lokale Speicherung) übernehmen |
| `docker-compose.yml` bereinigen | Niedrig | Veralteter `NUXT_PUBLIC_ALADHAN_BASE_URL`-Eintrag (Aladhan-URL ist server-only: `NUXT_ALADHAN_BASE_URL`) |
| Cloudflare Pages / Edge | Niedrig | Würde Push-Storage/Scheduler-Umbau erfordern |
| User-Accounts / Cloud-Sync | Niedrig | Erfordert Backend; JSON-Export/-Import überbrückt das |
| Diyanet-Integration | Niedrig | Instabile Quelle; Aladhan reicht für Gebetszeiten aus |

---

## Offline-Fähigkeit

| Was | Offline verfügbar? | Details |
|---|---|---|
| **App-Shell** (Layout, Navigation, Build-Assets) | Ja | Service Worker: Precache; besuchte Seiten network-first mit Cache-Fallback, sonst gecachte Startseite |
| **Gebetszeiten** | Teilweise | Gecachte Monate (pro Standort + Parameter) offline nutzbar; neuer Ort/Monat braucht Internet |
| **Koran (Suren-Liste, Verse)** | Ja (nach erstem Laden) | localStorage + IndexedDB |
| **Koran (Offline-Bundle)** | Ja (nach Download) | Vollständiges Bundle via IndexedDB (in Einstellungen ladbar) |
| **Koran-Audio** | Teilweise | Bereits gehörte Dateien werden vom Service Worker gecacht |
| **Lernen, Adhkar, Hadith, Dua, Namen, Zakat, Tracker, Tasbih** | Ja | Inhalte sind in der App gebündelt, Fortschritt liegt in localStorage |
| **Kalender / Feiertage** | Teilweise | Hijri-Daten sind lokal; die Umrechnung nutzt den Aladhan-Proxy (network-first, zuvor geladene Antworten bleiben im Cache) |
| **Moscheen in der Nähe** | Nein | Benötigt Overpass |
| **Push-Erinnerungen** | Ja | Server sendet unabhängig vom Gerätezustand; lokale Erinnerungen nur bei geöffneter App |
| **Lesezeichen, Favoriten** | Ja | Komplett in localStorage |
