import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForecastWeatherService {
  private forecastUrl = 'https://api.weather.gov/gridpoints/FWD/81,102/forecast';

  constructor(private http: HttpClient) { }

  getWxForecastData(): Observable<any> {
    return this.http
      .get(this.forecastUrl);
  }
}