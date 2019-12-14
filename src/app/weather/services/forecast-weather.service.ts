import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForecastWeatherService {
  constructor(private http: HttpClient) { }

  getWxForecastData() {
    return this.http
      .get('https://api.weather.gov/gridpoints/FWD/81,102/forecast');
  }
}