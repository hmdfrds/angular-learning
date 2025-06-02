import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherResponse } from '../models/weeather.model';
import { WEATHER_API_KEY } from '../../environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiUrl = 'https://api.weatherapi.com/v1/current.json';

  constructor(private http: HttpClient) {}

  getWeatherForCity(cityName: string): Observable<WeatherResponse> {
    const params = new HttpParams()
      .set('key', WEATHER_API_KEY)
      .set('q', cityName)
      .set('aqi', 'no');

    return this.http.get<WeatherResponse>(this.apiUrl, { params }).pipe(
      map((response) => {
        if (
          response.current.condition.icon &&
          response.current.condition.icon.startsWith('//')
        ) {
          response.current.condition.icon =
            'https:' + response.current.condition.icon;
        }
        return response;
      })
    );
  }
}
