import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private currentWeatherBaseUrl = `${environment.currentWeatherApiUrl}?key=${environment.weatherApiKey}`;
  private forecastWeatherBaseUrl = `${environment.forecastWeatherApiUrl}?key=${environment.weatherApiKey}`;

  constructor(private http: HttpClient) { }

  getCurrentLocation(): Promise<any> {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.watchPosition(position => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        }, err => {
            reject(err);
        });
      });
    } else {
      console.log('Your browser does not support geolocation at this time.');
    }
  }

  getWxForecastData(lat, lon, numDays): Observable<any> {
    return this.http.get(`${this.forecastWeatherBaseUrl}&q=${lat},${lon}&days=${numDays}`);
  }

  getWxObservationsData(lat, lon): Observable<any> {
    return this.http.get(`${this.currentWeatherBaseUrl}&q=${lat},${lon}`);
  }
}