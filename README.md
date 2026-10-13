# MuslimApp

Der Anlaufpunkt für alle, die sich mit dem Islam befassen — egal, ob sie gerade **entdecken**, im Alltag **praktizieren** oder ihr Wissen **vertiefen** möchten. MuslimApp ist eine mobile-first Progressive Web App (PWA) mit Gebetszeiten, Koran-Reader, Lernzentrum, Adhkar, Hadith-Sammlung, islamischem Kalender und praktischen Werkzeugen. Sie ist installierbar und weitgehend offline nutzbar.

Gebaut mit Nuxt 4, TypeScript und einem Apple-inspirierten Liquid-Glass-Design. Oberfläche in Deutsch (Standard), Türkisch und Englisch.

> Pläne und Fortschritt: [`MASTERPLAN.md`](./MASTERPLAN.md) (Phasen, Architektur, offene Punkte) · [`V2-PLAN.md`](./V2-PLAN.md) (ursprünglicher Plan für Version 2.0)

> **Inhaltlicher Hinweis:** Alle religiösen Inhalte (Lektionen, Glossar, FAQ, Kalender-Erklärungen, Adhkar, Hadith-Grade) sind als Entwurf (`draft`) markiert, bis sie fachlich geprüft wurden. Siehe [Inhaltsprüfung](#inhaltsprüfung).

---

## Features

### Heute (Dashboard)
- Begrüßung mit Tageszeit, Hijri-Datum und Onboarding-Assistent beim ersten Start (inkl. Wissensstufe Entdecken / Praktizieren / Vertiefen)
- 14 konfigurierbare Widgets (ein-/ausschaltbar, sortierbar): Gebets-Countdown, Gebetszeiten, Feiertags-Countdown, Koran-Lesezeichen, zufälliger Vers, Tasbih, Hijri-Datum, Hadith des Tages, Name des Tages (99 Namen Allahs), Seerah-Teaser, Fortschrittsübersicht, Gebets-Tracker, „Weiterlernen“, Adhkar

### Gebet
- Alle 6 Zeiten des Tages mit sekundengenauem Countdown zum nächsten Gebet; Berechnung **zeitzonenkorrekt** für den gewählten Ort (auch wenn die Stadt in einer anderen Zeitzone liegt als das Gerät)
- Standort per **GPS** oder **Stadtsuche** mit Autocomplete; wird beim App-Start global wiederhergestellt
- **15 Berechnungsmethoden** (Standard: Diyanet), **Madhhab-Wahl für Asr** (Standard / Hanafi), **Regel für hohe Breitengrade** (automatisch oder fest), **Minutenkorrektur pro Gebet** (zusätzlich zu den Offsets der Methode)
- **Erinnerungen**: pro Gebet einstellbar, mit Vorlaufzeit. Mit konfigurierten VAPID-Keys als echte **Web-Push-Nachrichten** (auch bei geschlossener App, serverseitig geplant); ohne Keys als lokale Erinnerungen, die nur bei geöffneter App feuern. Dazu optionale **Adhkar-Erinnerungen** (Morgen/Abend)
- **Gebets-Tracker**: die 5 Gebete abhaken (verrichtet / Qada), Serien-Zähler, Wochenübersicht, 7-/30-Tage-Statistik
- **Gebetsanleitung** (Wudu und Salah Schritt für Schritt) unter `/guide`

### Koran
- Alle 114 Suren mit Uthmani-Text, Übersetzungen Deutsch (Bubenheim & Elyas), Türkisch (Elmalılı) und Englisch — einzeln ein-/ausschaltbar; Transliteration; einstellbare Schriftgrößen
- **Vers-Audio** mit Hervorhebung des aktuellen Verses, 6 Rezitatoren, Geschwindigkeit, Wiederholung und **Hifz-Schleife** (Verse wiederholen), Mini-Player
- **Wort-für-Wort**-Ansicht (inkl. Wort-Audio)
- **Tafsir** pro Vers (Ibn Kathir und Ma'arif al-Qur'an auf Englisch, al-Muyassar und as-Sa'di auf Arabisch) sowie Sureninfo
- **Juz-Ansicht**, Volltextsuche, Lesezeichen („Weiterlesen“), Vers-Favoriten, optionales Offline-Bundle (IndexedDB)

### Lernen
- **Lernpfade** mit Lektionen, Quiz und Fortschritt: *Grundlagen des Islam* (12 Lektionen), *Neu im Islam* (10), *Fiqh des Alltags* (12), *Hajj & Umrah* (8), *Aqida — Glaubenslehre vertieft* (10)
- **Glossar** (178 Begriffe) und **FAQ** (35 Einträge) mit Suche und Kategorien
- Quellenangaben in jeder Lektion; bei Meinungsunterschieden der Rechtsschulen neutrale Hinweise
- Weitere Lernbereiche: Gebetsanleitung, Seerah (Leben des Propheten ﷺ), 99 Namen Allahs
- Dashboard-Widget „Weiterlernen“

### Adhkar & Dua
- **Adhkar** in 9 Sets (Morgen, Abend, nach dem Gebet, Schlaf, Aufwachen, Reise, Zuhause, Essen, Bedrängnis; insgesamt 56 Einträge) mit Zählern und Tagesfortschritt
- **Dua-Sammlung** in Kategorien (Arabisch, Transliteration, DE/EN/TR)

### Hadith
- 100 kuratierte Hadithe mit Kategorien und Suche
- **Authentizitätsgrade** (sahih / hasan / daif / ungeprüft) mit Gradierungshinweis, Grad-Filter, **Teilen** und **Deep-Links** (`/hadith?id=…`)

### Kalender
- Hijri-Kalender mit Monatsansicht, 11 Feiertagen und Kandil-Nächten, Countdown zum nächsten Feiertag
- **Erklärungen** zu Feiertagen, **Fastentage** (z. B. Aschura, Arafa, Weiße Tage, Montag/Donnerstag) und **ICS-Export** in den eigenen Kalender
- **Hijri-Konverter** (Gregorianisch ↔ Hijri)

### Moscheen in der Nähe
- Umkreissuche (2–25 km) über OpenStreetMap/Overpass, sortiert nach Entfernung, mit Adresse, Betreiber und Karten-Link. Dein Standort wird nur auf Knopfdruck an den Overpass-Dienst gesendet.

### Weitere Werkzeuge
- **Zakat-Rechner** — Nisab Gold (85 g) oder Silber (595 g), Vermögen minus Schulden, 2,5 %, komplett offline
- **Qibla-Kompass** — Richtung nach Mekka (Device Orientation API + Großkreisberechnung)
- **Tasbih** — 7 Dhikr-Modi, Fortschrittsring, haptisches Feedback
- **Ramadan-Modus** — Iftar-/Suhoor-Countdown, Fasten- und Khatam-Tracker pro Hijri-Jahr, Countdown zum nächsten Ramadan
- **Favoriten** — Verse speichern, häufig genutzte Werkzeuge anpinnen
- **Datensicherung** — alle App-Daten als JSON exportieren/importieren (Geräte-Wechsel ohne Datenverlust)

### App
- Dark/Light/System-Theme, Sprachen DE · TR · EN · AR (Arabisch mit vollständigem RTL-Layout; Inhalte ohne arabische Übersetzung erscheinen auf Englisch)
- **PWA**: installierbar, Workbox-Service-Worker (Navigationen network-first, Update-Hinweis bei neuer Version), Offline-Betrieb für Shell, bereits geladene Seiten, Koran-Daten und Audio
- Fehlerseite, Skeleton-Loader, Barrierefreiheit (Fokus-Management, ARIA in BottomSheet/Dialogen)

---

## Navigation

- **Mobil:** feste Tab-Leiste mit 5 Tabs — **Heute · Gebet · Koran · Lernen · Mehr**. Tracker gehört zu *Gebet*, Favoriten zu *Koran*; Hadith, Seerah, Namen und Gebetsanleitung zu *Lernen*.
- **„Mehr“-Hub:** alle Werkzeuge (Tasbih, Qibla, Dua, Adhkar, Kalender, Ramadan, Tracker, Zakat, Favoriten, Moscheen) sowie Einstellungen und „Über die App“. Im Hub lassen sich Werkzeuge als **Favoriten** anpinnen; sie erscheinen oben als Schnellzugriff.
- **Desktop:** Seitenleiste mit Hauptbereichen, Werkzeugen und Einstellungen/Über.

---

## Tech-Stack

| Bereich | Technologie |
|---|---|
| Framework | Nuxt 4 (Vue 3.5, TypeScript, SSR + Nitro) |
| Styling | Tailwind CSS 3 + eigenes Liquid-Glass-CSS |
| i18n | `@nuxtjs/i18n` (DE · TR · EN) |
| State | Nuxt `useState`-Composables, Persistenz in localStorage / IndexedDB |
| PWA | `@vite-pwa/nuxt` (injectManifest) + Workbox, eigener Service Worker in `service-worker/sw.ts` |
| Push | `web-push` (VAPID), Nitro Storage (`fs`) + Nitro Scheduled Task (jede Minute) |
| Tests | Vitest (Unit) + Playwright (E2E, Mobile-Chromium) |
| CI | GitHub Actions |

---

## Projektstruktur

```
muslimApp/
├── app/
│   ├── pages/            # Routen: Dashboard, prayer, quran, learn/**, adhkar, hadith, calendar,
│   │                     #   mosques, tracker, zakat, qibla, tasbih, ramadan, favorites, settings …
│   ├── components/       # ui (Glass-Design-System), prayer, quran, learn, calendar, widgets, …
│   ├── composables/      # Business-Logik (usePrayerTimes, useQuran, useNotifications, …)
│   ├── data/             # Statische Inhalte: hadiths, adhkar, duas, learn/** (Pfade, Glossar, FAQ), …
│   ├── plugins/          # app-init (globale Initialisierung), push-sync
│   └── utils/            # Reine Helfer (geo, ics, hijri-dates, quran, mosques, …)
├── server/
│   ├── api/aladhan/      # Aladhan-Proxy (gecacht, validiert)
│   ├── api/push/         # Web-Push-API (config, subscribe, update, unsubscribe, test)
│   ├── tasks/push/       # Geplanter Versand (dispatch, jede Minute)
│   └── utils/            # aladhan, push, push-dispatch
├── shared/               # Von Client und Server genutzt (push/**, time)
├── service-worker/sw.ts  # Workbox-Service-Worker (Caching, Push, Notifications)
├── i18n/                 # de.json · tr.json · en.json
├── data/holidays.json    # Feiertage (Hijri-Daten) + Hijri-Monate
├── docs/CONTENT-REVIEW.md# Fachliche Prüfliste
├── tests/                # unit/ (Vitest) und e2e/ (Playwright)
├── Dockerfile · docker-compose.yml · .env.example
└── .github/workflows/ci.yml
```

---

## Entwicklung

Voraussetzung: Node.js 22.

```bash
git clone https://github.com/iCode97/muslimApp.git
cd muslimApp
npm install
npm run dev          # http://localhost:3000
```

| Script | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver (Service Worker ist im Dev-Modus aus) |
| `npm run build` | Produktions-Build (`.output/`) |
| `npm run preview` | Produktions-Build lokal ansehen |
| `npm test` | Unit-Tests (Vitest); `npm run test:watch` im Watch-Modus |
| `npm run test:e2e` | E2E-Tests (Playwright; baut die App und startet sie auf Port 3104) |
| `npm run typecheck` | `nuxi typecheck` |
| `npm run vapid` | Erzeugt ein VAPID-Schlüsselpaar für Web Push |

Produktionsserver starten: `npm run build && node .output/server/index.mjs`.

---

## Umgebungsvariablen

Siehe [`.env.example`](./.env.example) (nach `.env` kopieren; echte Schlüssel nie committen).

| Variable | Bedeutung |
|---|---|
| `NUXT_PUBLIC_VAPID_PUBLIC_KEY` | Öffentlicher VAPID-Schlüssel (`npm run vapid`) |
| `NUXT_VAPID_PRIVATE_KEY` | Privater VAPID-Schlüssel (nur Server) |
| `NUXT_VAPID_SUBJECT` | Kontakt für Push-Dienste (`mailto:…` oder `https://…`) |
| `NUXT_ALADHAN_BASE_URL` | Optional: Upstream des Aladhan-Proxys (Standard `https://api.aladhan.com/v1`) |
| `NUXT_PUBLIC_QURAN_BASE_URL` | Optional: quran.com-API (Standard `https://api.quran.com/api/v4`) |

Fehlt eine der drei VAPID-Variablen, ist Web Push abgeschaltet; die App nutzt dann lokale Erinnerungen, die nur bei geöffneter App feuern.

---

## Deployment (Docker)

```bash
cp .env.example .env     # VAPID-Keys eintragen (npm run vapid)
docker compose up -d
```

- Multi-Stage-Dockerfile (Node 22 Alpine), Port 3000.
- **Volume für `.data`:** Push-Abonnenten liegen als JSON-Dateien in `/app/.data/push`. `docker-compose.yml` bindet dafür das Volume `muslimapp-data` an `/app/.data` — ohne Volume gehen Abonnements bei jedem Neu-Deployment verloren.
- Die Push-Zustellung läuft im selben Node-Prozess (Nitro-Scheduler, jede Minute). Für **eine** Instanz ausgelegt; Rate-Limits liegen im Arbeitsspeicher der Instanz.
- Web Push erfordert HTTPS (oder `localhost`). Auf iOS funktioniert Push nur bei zum Home-Bildschirm hinzugefügter PWA (iOS/iPadOS 16.4+).

---

## Datenquellen & Lizenzen

Alle genutzten Dienste sind kostenlos und benötigen keinen API-Key.

| Quelle | Verwendung | Hinweise |
|---|---|---|
| [Aladhan API](https://aladhan.com/prayer-times-api) | Gebetszeiten (Monatskalender), Hijri-Konvertierung, Hijri-Kalender | Läuft über den eigenen Proxy `/api/aladhan/**` (serverseitig gecacht) |
| [quran.com API v4](https://api.quran.com) | Koran-Text, Übersetzungen, Transliteration, Wort-für-Wort, Tafsir, Suche | Direkt vom Browser; Übersetzungen: Bubenheim & Elyas (DE), Elmalılı (TR), Sahih International (EN) |
| verses.quran.com · audio.qurancdn.com · mirrors.quranicaudio.com | Vers-, Wort- und Sure-Audio | Rezitationen der jeweiligen Rezitatoren, bereitgestellt über quran.com/Quran.Foundation |
| [OpenStreetMap Overpass](https://overpass-api.de) | Moscheen in der Nähe | Daten © OpenStreetMap-Mitwirkende, [ODbL](https://www.openstreetmap.org/copyright) |
| [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org) | Geocoding (Stadtsuche, Reverse-Geocoding) | © OpenStreetMap-Mitwirkende, ODbL |
| Schriften (Inter, Amiri, Noto Sans Arabic) | SIL Open Font License | Selbst gehostet unter `public/fonts/` — keine Anfragen an Google |

Der Quellcode dieses Projekts ist privat. Die Inhalte der Lernpfade, des Glossars, der FAQ und der Kalender-Erklärungen wurden für diese App erstellt und sind noch nicht fachlich geprüft.

---

## Datenschutz

Die vollständige Erklärung steht in der App unter **`/privacy`** (DE/EN/TR/AR) — dort lassen sich auch alle lokalen Daten mit einem Klick löschen. **Vor dem Launch:** Betreiberangaben (`OPERATOR` in `app/pages/privacy.vue`) ergänzen und den Text rechtlich prüfen lassen.

- **Fast alles bleibt auf dem Gerät:** Standort, Einstellungen, Lesezeichen, Favoriten, Tracker, Lernfortschritt usw. liegen in localStorage/IndexedDB und lassen sich per JSON-Backup exportieren. Es gibt keine Konten und kein Tracking.
- **Serverseitig gespeichert wird ausschließlich, wenn du Web-Push-Erinnerungen aktivierst:** die Push-Subscription (Endpoint und Schlüssel), Sprache, Zeitzone, Standort **auf 2 Nachkommastellen gerundet (~1 km)**, Berechnungsparameter, Erinnerungs-Einstellungen sowie technische Zeitstempel/Versand-Markierungen. Beim Deaktivieren (oder wenn der Push-Dienst die Subscription für ungültig erklärt) wird der Eintrag gelöscht.
- Für die Rate-Begrenzung hält der Server IP-Adressen kurzzeitig im Arbeitsspeicher (nicht persistent).
- **Dienste von Dritten:** Gebetszeiten-Anfragen enthalten die Koordinaten und gehen über den eigenen Server an Aladhan. Stadtsuche/Reverse-Geocoding (Nominatim), Moscheesuche (Overpass), und Koran-Daten/Audio (quran.com-Dienste) werden direkt vom Browser kontaktiert und sehen dabei die IP-Adresse.

---

## Inhaltsprüfung

Alle Lektionen, Glossar-Begriffe und FAQ-Einträge tragen `review: 'draft'`; die App zeigt dazu den Hinweis „Inhalt wird noch fachlich geprüft“. Hadith-Grade, Kalender-Erklärungen und Adhkar sind ebenfalls ungeprüft. Die Prüfliste mit allen Stellen, die die erstellenden Agents selbst als unsicher markiert haben (Hadith-Nummern, arabischer Wortlaut, Rechtsschul-Positionen), steht in [`docs/CONTENT-REVIEW.md`](./docs/CONTENT-REVIEW.md). Nach der Prüfung durch eine fachkundige Person wird der Status auf `'reviewed'` gesetzt.

---

## Tests & CI

- **Unit-Tests (Vitest):** Gebetszeiten-/Push-Planung, Koran-Hilfsfunktionen, Lerninhalte (Schema, Quellen, Verweise), Adhkar, Hadith-Grade, Kalender/Fastentage, ICS, Geo, i18n-Vollständigkeit, UI-Komponenten
- **E2E-Smoketests (Playwright, Mobile-Chromium):** alle Routen laden ohne Konsolenfehler, Navigation, Hadith-Deep-Link, Fiqh-Pfad; externe APIs werden gemockt
- **CI (GitHub Actions):** Typecheck → Unit-Tests → Build, dazu ein separater E2E-Job. Läuft bei Push auf `main` und bei jedem Pull Request.
