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

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.loadWeather(this.defaultCity);
  }

  loadWeather(city: string) {
    this.isLoading = true;
    this.errorMessage = null;
    this.weatherData = null;

    this.weatherService.getWeatherForCity(city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('API Error:', error);
        this.errorMessage = `Could not fetch weather data for ${city}. Please check the city name or your API key. (Status: ${error.status}) `;
        if (error.error && error.error.error && error.error.error.message) {
          this.errorMessage = error.error.error.message;
        }
        this.isLoading = false;
      },
    });
  }
}
