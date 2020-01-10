import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  Subject
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  /* TODO:
   * Pass station ID instead of hard coding
   */
  private locationSubject = new Subject<any>();
  private alertsDataUrl = 'https://api.weather.gov/alerts/active';
  private forecastUrl = 'https://api.weather.gov/gridpoints/FWD/81,102/forecast';
  private observationsDataUrl = 'https://api.weather.gov/stations/KGPM/observations/latest';

  constructor(private http: HttpClient) { }

  getWxAlertsData(): Observable<any> {
    return this.http
      .get(this.alertsDataUrl);
  }

  getWxLocationData(url): Observable<any> {
    console.log(`Forecast location URL: ${url}`);
    return this.http
      .get(url);
  }

  getWxForecastData(): Observable<any> {
    return this.http
      .get(this.forecastUrl);
  }

  getWxObservationsData(): Observable<any> {
    return this.http
      .get(this.observationsDataUrl);
  }
}