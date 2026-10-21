import { Component, inject, output, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { City } from '../../models/weather.models';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-city-search',
  imports: [FormsModule],
  templateUrl: './city-search.html',
  styleUrl: './city-search.scss',
})
export class CitySearch {
  private readonly weather = inject(WeatherService);

  readonly citySelected = output<City>();

  readonly query = signal('');
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly open = signal(false);

  readonly results = toSignal(
    toObservable(this.query).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.loading.set(true);
        this.error.set(null);
      }),
      switchMap((q) =>
        this.weather.searchCities(q).pipe(
          catchError(() => {
            this.error.set('Kunde inte söka just nu. Försök igen.');
            return of([] as City[]);
          }),
        ),
      ),
      tap(() => this.loading.set(false)),
    ),
    { initialValue: [] as City[] },
  );

  onInput(value: string): void {
    this.query.set(value);
    this.open.set(true);
  }

  select(city: City): void {
    this.citySelected.emit(city);
    this.query.set('');
    this.open.set(false);
  }

  /** Enter väljer första träffen. */
  selectFirst(): void {
    const first = this.results()[0];
    if (first) this.select(first);
  }

  close(): void {
    // Liten fördröjning så att klick på ett resultat hinner registreras
    setTimeout(() => this.open.set(false), 150);
  }
}
