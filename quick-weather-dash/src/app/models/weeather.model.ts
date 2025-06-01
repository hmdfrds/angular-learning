export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface CurrentWeather {
  temp_c: number;
  condition: WeatherCondition;
  feelslike_c: number;
  humidity: number;
  wind_kph: number;
}

export interface Location {
  name: string;
  region: string;
  country: string;
}

export interface WeatherResponse {
  location: Location;
  current: CurrentWeather;
}
