import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { CitySearch } from './components/city-search/city-search';
import { CurrentWeatherCard } from './components/current-weather/current-weather';
import { Favorites } from './components/favorites/favorites';
import { Forecast } from './components/forecast/forecast';
import { City, WeatherData } from './models/weather.models';
import { FavoritesService } from './services/favorites.service';
import { WeatherService } from './services/weather.service';

const DEFAULT_CITY: City = {
  id: 2673730,
  name: 'Stockholm',
  latitude: 59.32938,
  longitude: 18.06871,
  country: 'Sverige',
  admin1: 'Stockholm',
};

type WeatherState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: WeatherData };

@Component({
  selector: 'app-root',
  imports: [CitySearch, CurrentWeatherCard, Forecast, Favorites],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly weather = inject(WeatherService);
  protected readonly favorites = inject(FavoritesService);

  /** Vald stad: första favoriten, annars Stockholm. */
  protected readonly selectedCity = signal<City>(this.favorites.favorites()[0] ?? DEFAULT_CITY);
  private readonly reload = signal(0);

  protected readonly state = toSignal(
    toObservable(computed(() => ({ city: this.selectedCity(), n: this.reload() }))).pipe(
      switchMap(({ city }) =>
        this.weather.getWeather(city).pipe(
          map((data): WeatherState => ({ status: 'ready', data })),
          catchError(() =>
            of<WeatherState>({
              status: 'error',
              message: `Kunde inte hämta väder för ${city.name}. Kontrollera internetanslutningen.`,
            }),
          ),
          startWith<WeatherState>({ status: 'loading' }),
        ),
      ),
    ),
    { initialValue: { status: 'loading' } as WeatherState },
  );

  protected readonly isFavorite = computed(() => {
    const id = this.selectedCity().id;
    return this.favorites.favorites().some((c) => c.id === id);
  });

  selectCity(city: City): void {
    this.selectedCity.set(city);
  }

  retry(): void {
    this.reload.update((n) => n + 1);
  }
}
