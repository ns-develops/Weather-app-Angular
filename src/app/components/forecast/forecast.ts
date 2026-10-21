import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { DailyForecast } from '../../models/weather.models';
import { weatherIcon, weatherText } from '../../utils/weather-codes';

@Component({
  selector: 'app-forecast',
  imports: [DecimalPipe, DatePipe],
  templateUrl: './forecast.html',
  styleUrl: './forecast.scss',
})
export class Forecast {
  readonly days = input.required<DailyForecast[]>();

  protected readonly weatherIcon = weatherIcon;
  protected readonly weatherText = weatherText;
}
