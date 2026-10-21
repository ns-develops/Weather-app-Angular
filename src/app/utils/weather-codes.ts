/** WMO-väderkoder från Open-Meteo, med svensk beskrivning och ikon. */
const CODES: Record<number, { text: string; icon: string; nightIcon?: string }> = {
  0: { text: 'Klart', icon: '☀️', nightIcon: '🌙' },
  1: { text: 'Mestadels klart', icon: '🌤️', nightIcon: '🌙' },
  2: { text: 'Halvklart', icon: '⛅' },
  3: { text: 'Mulet', icon: '☁️' },
  45: { text: 'Dimma', icon: '🌫️' },
  48: { text: 'Rimfrost och dimma', icon: '🌫️' },
  51: { text: 'Lätt duggregn', icon: '🌦️' },
  53: { text: 'Duggregn', icon: '🌦️' },
  55: { text: 'Kraftigt duggregn', icon: '🌧️' },
  56: { text: 'Lätt underkylt duggregn', icon: '🌧️' },
  57: { text: 'Underkylt duggregn', icon: '🌧️' },
  61: { text: 'Lätt regn', icon: '🌦️' },
  63: { text: 'Regn', icon: '🌧️' },
  65: { text: 'Kraftigt regn', icon: '🌧️' },
  66: { text: 'Lätt underkylt regn', icon: '🌧️' },
  67: { text: 'Underkylt regn', icon: '🌧️' },
  71: { text: 'Lätt snöfall', icon: '🌨️' },
  73: { text: 'Snöfall', icon: '🌨️' },
  75: { text: 'Kraftigt snöfall', icon: '❄️' },
  77: { text: 'Snökorn', icon: '🌨️' },
  80: { text: 'Lätta regnskurar', icon: '🌦️' },
  81: { text: 'Regnskurar', icon: '🌧️' },
  82: { text: 'Kraftiga regnskurar', icon: '⛈️' },
  85: { text: 'Lätta snöbyar', icon: '🌨️' },
  86: { text: 'Kraftiga snöbyar', icon: '❄️' },
  95: { text: 'Åska', icon: '⛈️' },
  96: { text: 'Åska med lätt hagel', icon: '⛈️' },
  99: { text: 'Åska med kraftigt hagel', icon: '⛈️' },
};

export function weatherText(code: number): string {
  return CODES[code]?.text ?? 'Okänt väder';
}

export function weatherIcon(code: number, isDay = true): string {
  const entry = CODES[code];
  if (!entry) return '🌡️';
  return !isDay && entry.nightIcon ? entry.nightIcon : entry.icon;
}

/** Vindriktning i grader till väderstreck, t.ex. 225 → "SV". */
export function windDirection(degrees: number): string {
  const dirs = ['N', 'NO', 'O', 'SO', 'S', 'SV', 'V', 'NV'];
  return dirs[Math.round(degrees / 45) % 8];
}
