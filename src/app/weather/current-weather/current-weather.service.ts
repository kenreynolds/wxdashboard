import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {
  /* TODO:
   * Add geolocation for location data lookup
   * Add error handling for HTTP calls
   */
  constructor(private http: HttpClient) { }

  getWxLocationData() {
    return this.http
      .get('https://api.weather.gov/points/32.7454,-97.0035');
  }

  getWxObservationsData() {
    return this.http
      .get('https://api.weather.gov/stations/KGPM/observations/latest');
  }
}