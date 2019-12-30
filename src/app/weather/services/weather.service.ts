import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  /* TODO:
   * Add geolocation for location data lookup
   */
  private alertsDataUrl = 'https://api.weather.gov/alerts/active';
  private forecastUrl = 'https://api.weather.gov/gridpoints/FWD/81,102/forecast';
  private observationsDataUrl = 'https://api.weather.gov/stations/KGPM/observations/latest';

  constructor(private http: HttpClient) { }

  private getGeolocationData() {
    let geoLocationData = [];

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(`https://api.weather.gov/points/${position.coords.latitude},${position.coords.longitude}`);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        geoLocationData.push(lat, lng);
      });
      return geoLocationData;
    }
  }

  getWxAlertsData(): Observable<any> {
    return this.http
      .get(this.alertsDataUrl);
  }

  getWxLocationData(): Observable<any> {
    const locationData = this.getGeolocationData();
    console.log(locationData);
    return this.http
      .get('https://api.weather.gov/points/32.7454,-97.0035');
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