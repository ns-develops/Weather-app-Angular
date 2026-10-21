import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { WeatherData } from '../../models/weather.models';
import { weatherIcon, weatherText, windDirection } from '../../utils/weather-codes';

@Component({
  selector: 'app-current-weather',
  imports: [DecimalPipe, DatePipe],
  templateUrl: './current-weather.html',
  styleUrl: './current-weather.scss',
})
export class CurrentWeatherCard {
  readonly data = input.required<WeatherData>();
  readonly isFavorite = input(false);
  readonly toggleFavorite = output<void>();

  protected readonly weatherIcon = weatherIcon;
  protected readonly weatherText = weatherText;
  protected readonly windDirection = windDirection;
}
