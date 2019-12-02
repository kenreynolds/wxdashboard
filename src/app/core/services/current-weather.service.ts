import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {
  constructor(private http: HttpClient) { }

  getWxLocation() {
    return this.http
      .get('https://api.weather.gov/points/32.7454,-97.0035');
  }

  getWxObservations() {
    return this.http
      .get('https://api.weather.gov/stations/KGPM/observations/latest');
  }
}