import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private weatherApiKey = 'd1339026b3444f9390104039201811';
  private currentWeatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${this.weatherApiKey}`;
  private forecastWeatherApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${this.weatherApiKey}`;

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
    return this.http.get(`${this.forecastWeatherApiUrl}&q=${lat},${lon}&days=${numDays}`);
  }

  getWxObservationsData(lat, lon): Observable<any> {
    return this.http.get(`${this.currentWeatherApiUrl}&q=${lat},${lon}`);
  }
}