import { Component, OnInit } from '@angular/core';
import { WeatherResponse } from './models/weeather.model';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'Quick Weather Dash';
  weatherData: WeatherResponse | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  defaultCity: string = 'Petaling Jaya';
  searchCityName: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.loadWeather(this.defaultCity);
    this.searchCityName = this.defaultCity;
  }

  loadWeather(city: string) {
    this.isLoading = true;
    this.errorMessage = null;

    this.weatherService.getWeatherForCity(city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.isLoading = false;
        this.searchCityName = data.location.name;
      },
      error: (error) => {
        console.error('API Error:', error);
        let specificMessage = `Could not fetch weather data for ${city}. Please check the city name or your API key. (Status: ${error.status}) `;
        if (error.error?.error?.message) {
          specificMessage = error.error.error.message;
        } else if (error.status === 0) {
          specificMessage = 'Network error.Please check your connection.';
        }
        this.errorMessage = specificMessage;
        this.isLoading = false;
      },
    });
  }

  onSearch() {
    if (this.searchCityName.trim()) {
      this.loadWeather(this.searchCityName.trim());
    } else {
      this.errorMessage = 'Please enter a city name to search.';
      this.weatherData = null;
    }
  }
}
