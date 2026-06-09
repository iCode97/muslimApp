# MuslimApp — Version 2.0 Plan

> **Ziel:** Aufbauend auf der abgeschlossenen Phase 1–4 (V1.x) erweitert Version 2.0 die App
> von einem reinen Informations-Werkzeug zu einem persönlichen Ibadah-Begleiter:
> Tracking, Audio, Favoriten, Finanz-Werkzeuge und Datensicherung.
> **Erstellt:** 9. Juni 2026 | **Status:** Umgesetzt

---

## 1. Analyse des Ist-Standes (V1.x)

Die App deckt bereits ab: Gebetszeiten (Aladhan, 15 Methoden), Koran-Reader (3 Übersetzungen,
Suche, Offline-Bundle), Hijri-Kalender + Feiertage, Tasbih, Qibla, Duas, Hadithe, 99 Namen,
Gebetsanleitung, Seerah, Ramadan-Modus, konfigurierbares Dashboard, PWA, 3 Sprachen, Dark/Light.

**Identifizierte Lücken:**

| Lücke | Begründung |
|---|---|
| Kein Gebets-Tracking | Die App zeigt Zeiten an, aber man kann nicht festhalten, ob man gebetet hat — das Kernbedürfnis einer persönlichen Ibadah-App |
| Keine Audio-Rezitation | Größter offener Punkt aus Phase 5 des Masterplans |
| Nur 1 Lesezeichen im Koran | Einzelne Verse können nicht dauerhaft gesammelt werden |
| Kein Zakat-Werkzeug | Zakat ist eine der fünf Säulen — ein Rechner fehlt komplett |
| Daten nur im Browser | Alle Fortschritte/Einstellungen gehen beim Gerätewechsel verloren — kein Export/Import |

## 2. V2.0 Features

### 2.1 Gebets-Tracker (`/tracker`) — NEU
- Tägliches Abhaken der 5 Pflichtgebete: **offen → verrichtet → nachgeholt (Qada)**
- **Serien-Zähler (Streak):** aufeinanderfolgende Tage mit allen 5 Gebeten
- **Wochenübersicht** (letzte 7 Tage als Raster) + **Statistik** (7 / 30 Tage in %)
- Dashboard-Widget mit Schnell-Abhaken für heute
- Komplett offline (localStorage), Composable `usePrayerTracker`

### 2.2 Zakat-Rechner (`/zakat`) — NEU
- Vermögenswerte: Bargeld, Gold (g), Silber (g), sonstige Anlagen; abzüglich Schulden
- **Nisab-Basis wählbar:** Gold (85 g) oder Silber (595 g), aktuelle Gramm-Preise eingebbar
- Berechnung: 2,5 % auf das zakatpflichtige Nettovermögen, sofern ≥ Nisab
- Eingaben werden lokal gespeichert, komplett offline, Composable `useZakat`

### 2.3 Koran Audio-Rezitation — NEU (Phase-5-Backlog)
- Audio-Player direkt im Suren-Reader (Play/Pause, Fortschrittsbalken, Spulen)
- **5 Rezitatoren** wählbar (al-Afasy, AbdulBaset, as-Sudais, al-Husary, ash-Shuraym)
- quran.com API `/chapter_recitations/{reciter}/{chapter}` — kein API-Key
- Rezitator-Wahl wird gespeichert, Composable `useQuranAudio`

### 2.4 Vers-Favoriten (`/favorites`) — NEU
- Herz-Button an jedem Vers im Reader (Arabisch + Übersetzungen werden lokal gesichert)
- Favoriten-Seite mit allen gespeicherten Versen, Sprung zur Sure, Entfernen
- Offline verfügbar (localStorage), Composable `useFavorites`

### 2.5 Datensicherung (Einstellungen) — NEU
- **Export:** alle App-Daten (Fortschritt, Tracker, Favoriten, Einstellungen …) als JSON-Datei
- **Import:** JSON-Datei wiederherstellen (Gerätewechsel ohne Datenverlust)
- Composable `useBackup`

### 2.6 Integration & Meta
- Neue Einträge in Navigation (Desktop-Sidebar, mobile Auswahl) + „Mehr"-Hub
- Neues Dashboard-Widget „Gebets-Tracker" (standardmäßig aktiv)
- Vollständige i18n: Deutsch, Türkisch, Englisch
- Versionssprung auf **2.0.0**

## 3. Technische Umsetzung

| Baustein | Dateien |
|---|---|
| Gebets-Tracker | `app/composables/usePrayerTracker.ts`, `app/pages/tracker.vue`, `app/components/widgets/PrayerTrackerWidget.vue` |
| Zakat | `app/composables/useZakat.ts`, `app/pages/zakat.vue` |
| Audio | `app/composables/useQuranAudio.ts`, `app/components/quran/QuranAudioPlayer.vue`, Einbindung in `app/pages/quran/[surah].vue` |
| Favoriten | `app/composables/useFavorites.ts`, `app/pages/favorites.vue`, Herz-Button in `app/components/quran/VerseDisplay.vue` |
| Backup | `app/composables/useBackup.ts`, neue Karte in `app/pages/settings.vue` |
| Integration | `useNavigation.ts`, `useDashboard.ts`, `more.vue`, `index.vue`, `AppIcon.vue`, `i18n/{de,tr,en}.json` |

**Grundsätze (unverändert aus V1):** keine API-Keys, mobile-first Liquid-Glass-UI,
alles Persönliche bleibt lokal auf dem Gerät (localStorage/IndexedDB), kein Backend.

## 4. Ausblick (V2.x Backlog)

| Feature | Notizen |
|---|---|
| Vers-für-Vers-Audio + Hervorhebung | quran.com `/recitations/{id}/by_chapter` liefert Segment-Timings |
| Tafsir-Anzeige | quran.com `/tafsirs` Endpoint |
| Cloud-Sync (optional) | Erst sinnvoll mit Backend; Export/Import überbrückt das |
| Khatm-Planer | Leseplan zum Koran-Abschluss in X Tagen |
| Live-Edelmetallpreise für Zakat | Erfordert externe Preis-API; manuell eingebbar reicht vorerst |
