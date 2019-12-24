import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {
  /* TODO:
   * Add geolocation for location data lookup
   */
  private locationDataUrl = 'https://api.weather.gov/points/32.7454,-97.0035';
  private observationsDataUrl = 'https://api.weather.gov/stations/KGPM/observations/latest';

  constructor(private http: HttpClient) { }

  getWxLocationData(): Observable<any> {
    return this.http
      .get(this.locationDataUrl);
  }

  getWxObservationsData(): Observable<any> {
    return this.http
      .get(this.observationsDataUrl);
  }
}