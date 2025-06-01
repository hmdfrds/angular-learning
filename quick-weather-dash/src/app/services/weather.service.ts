import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiUrl = 'https://api.weatherapi.com/v1/current.json';

  constructor(private http: HttpClient) {}
}
