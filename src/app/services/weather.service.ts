import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import {
  City,
  ForecastResponse,
  GeocodingResponse,
  WeatherData,
} from '../models/weather.models';

/**
 * Hämtar data från Open-Meteo (https://open-meteo.com).
 * Gratis och kräver ingen API-nyckel.
 */
@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly http = inject(HttpClient);
  private readonly geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search';
  private readonly forecastUrl = 'https://api.open-meteo.com/v1/forecast';

  /** Söker städer efter namn. */
  searchCities(query: string): Observable<City[]> {
    const name = query.trim();
    if (name.length < 2) return of([]);

    const params = new HttpParams()
      .set('name', name)
      .set('count', 8)
      .set('language', 'sv')
      .set('format', 'json');

    return this.http
      .get<GeocodingResponse>(this.geocodingUrl, { params })
      .pipe(map((res) => res.results ?? []));
  }

  /** Hämtar aktuellt väder och 7-dagarsprognos för en stad. */
  getWeather(city: City): Observable<WeatherData> {
    const params = new HttpParams()
      .set('latitude', city.latitude)
      .set('longitude', city.longitude)
      .set(
        'current',
        [
          'temperature_2m',
          'apparent_temperature',
          'relative_humidity_2m',
          'wind_speed_10m',
          'wind_direction_10m',
          'surface_pressure',
          'precipitation',
          'weather_code',
          'is_day',
        ].join(','),
      )
      .set(
        'daily',
        [
          'weather_code',
          'temperature_2m_max',
          'temperature_2m_min',
          'precipitation_sum',
          'precipitation_probability_max',
          'wind_speed_10m_max',
          'sunrise',
          'sunset',
        ].join(','),
      )
      .set('wind_speed_unit', 'ms')
      .set('timezone', 'auto')
      .set('forecast_days', 7);

    return this.http.get<ForecastResponse>(this.forecastUrl, { params }).pipe(
      map((res) => ({
        city,
        current: {
          time: res.current.time,
          temperature: res.current.temperature_2m,
          apparentTemperature: res.current.apparent_temperature,
          humidity: res.current.relative_humidity_2m,
          windSpeed: res.current.wind_speed_10m,
          windDirection: res.current.wind_direction_10m,
          pressure: res.current.surface_pressure,
          precipitation: res.current.precipitation,
          weatherCode: res.current.weather_code,
          isDay: res.current.is_day === 1,
        },
        daily: res.daily.time.map((date, i) => ({
          date,
          weatherCode: res.daily.weather_code[i],
          tempMax: res.daily.temperature_2m_max[i],
          tempMin: res.daily.temperature_2m_min[i],
          precipitationSum: res.daily.precipitation_sum[i],
          precipitationProbability: res.daily.precipitation_probability_max[i],
          windSpeedMax: res.daily.wind_speed_10m_max[i],
          sunrise: res.daily.sunrise[i],
          sunset: res.daily.sunset[i],
        })),
      })),
    );
  }
}
