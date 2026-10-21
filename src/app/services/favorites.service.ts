import { Injectable, computed, signal } from '@angular/core';
import { City } from '../models/weather.models';

const STORAGE_KEY = 'weather-app.favorites';

/** Favoritstäder, sparade i webbläsarens localStorage. */
@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly _favorites = signal<City[]>(this.load());
  readonly favorites = this._favorites.asReadonly();
  readonly count = computed(() => this._favorites().length);

  isFavorite(city: City): boolean {
    return this._favorites().some((c) => c.id === city.id);
  }

  toggle(city: City): void {
    if (this.isFavorite(city)) {
      this.remove(city);
    } else {
      this._favorites.update((list) => [...list, city]);
      this.save();
    }
  }

  remove(city: City): void {
    this._favorites.update((list) => list.filter((c) => c.id !== city.id));
    this.save();
  }

  private load(): City[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as City[]) : [];
    } catch {
      return [];
    }
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._favorites()));
    } catch {
      // localStorage kan vara blockerat, t.ex. i privat läge
    }
  }
}
