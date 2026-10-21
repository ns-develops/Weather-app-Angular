import { Component, inject, input, output } from '@angular/core';
import { City } from '../../models/weather.models';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites {
  protected readonly favorites = inject(FavoritesService);

  readonly selectedId = input<number | null>(null);
  readonly citySelected = output<City>();
}
