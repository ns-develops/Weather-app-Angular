# Vädret – väderapp i Angular

Visar aktuell temperatur, väderförhållanden och 7-dagarsprognos för en vald stad.
Data hämtas med Angulars `HttpClient` från [Open-Meteo](https://open-meteo.com), som är gratis och inte kräver någon API-nyckel.

## Funktioner

- **Aktuellt väder:** temperatur, "känns som", väderbeskrivning, luftfuktighet, vind, lufttryck, nederbörd, soluppgång och solnedgång.
- **Prognos:** 7 dagar med max/min-temperatur och risk för nederbörd.
- **Sökfunktion:** sök städer med autokomplettering (Enter väljer första träffen).
- **Favoritstäder:** spara med ☆, sparas i webbläsarens `localStorage`. Första favoriten visas när appen startar.

## Kom igång

Kräver Node.js 20.19+ eller 22.12+.

```bash
npm install
npm start
```

Öppna sedan http://localhost:4200/.

Övriga kommandon: `npm run build` bygger till `dist/`, `npm test` kör enhetstesterna.

## Struktur

```
src/app/
├── app.ts / app.html             Rotkomponent: vald stad och laddningsläge
├── app.config.ts                 provideHttpClient + svensk locale
├── models/weather.models.ts      Typer för städer, väder och API-svar
├── services/
│   ├── weather.service.ts        API-anrop: sök städer och hämta väder
│   └── favorites.service.ts      Favoriter i localStorage (signals)
├── components/
│   ├── city-search/              Sökfält med debounce och resultatlista
│   ├── current-weather/          Kort med aktuellt väder och favoritknapp
│   ├── forecast/                 7-dagarsprognos
│   └── favorites/                Lista med favoritstäder
└── utils/weather-codes.ts        WMO-väderkoder → svensk text och ikon
```
