import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { City } from '../../interfaces/city';
import { Restaurant } from '../../interfaces/restaurant';

import { CityService } from '../../services/city/city';
import { RestaurantService } from '../../services/restaurant/restaurant';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  providers: [CityService, RestaurantService],
})
export class Home implements OnInit {
  cities: City[] = [];
  restaurants: Restaurant[] = [];
  ImageURL=Environment.staticfiles
scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

  selectedCityId: number | null = null;
  searchTerm: string = '';
  isLoading = false;
  imagePrefix = 'https://localhost:7211/';
  constructor(
    private cityService: CityService,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCities();
    this.onSearch();
  }

  loadCities(): void {
    this.cityService.getCities().subscribe({
      next: (data) => (this.cities = data),
      error: (err) => console.error('Error loading cities:', err),
    });
  }

  onSearch(): void {
    this.isLoading = true;
    this.restaurantService
      .getAll(this.selectedCityId ?? undefined, this.searchTerm)
      .subscribe({
        next: (data) => {
          this.restaurants = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading restaurants:', err);
          this.isLoading = false;
        },
      });
  }

  openMenu(restaurantId: number): void {
    this.router.navigate(['/menu', restaurantId]);
  }
  getImageUrl(fullPath: string): string {
    const index = fullPath.indexOf('images');
    const relativePath = index >= 0 ? fullPath.substring(index) : '';
    return this.imagePrefix + relativePath;
  }
}
