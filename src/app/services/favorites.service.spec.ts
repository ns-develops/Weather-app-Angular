import { TestBed } from '@angular/core/testing';
import { City } from '../models/weather.models';
import { FavoritesService } from './favorites.service';

const malmo: City = { id: 2692969, name: 'Malmö', latitude: 55.6, longitude: 13.0, country: 'Sverige' };

describe('FavoritesService', () => {
  beforeEach(() => localStorage.clear());

  it('adds and removes a favorite and persists it', () => {
    const service = TestBed.inject(FavoritesService);
    service.toggle(malmo);
    expect(service.isFavorite(malmo)).toBeTrue();
    expect(JSON.parse(localStorage.getItem('weather-app.favorites')!)).toEqual([malmo]);

    service.toggle(malmo);
    expect(service.isFavorite(malmo)).toBeFalse();
    expect(service.count()).toBe(0);
  });
});
