import { Component, OnInit } from '@angular/core';

import { CurrentWeatherService } from '../core/services/current-weather.service';

import * as moment from 'moment';
import * as weatherUtils from '../utils/weather-utils';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html'
})
export class CurrentWeatherComponent implements OnInit {
  isLoading = false;
  wxForecast: any = [];
  wxLocations: any = [];
  currentWindChill: string;
  currentHumidity: string;
  currentPressure: string;
  currentTemperature: string;
  currentVisibility: string;
  currentWindSpeed: string;
  hasWxData: boolean;
  isDaytime: boolean;
  forecastPeriod: string;
  locationName: string;
  observationTime: string;
  state: string;

  constructor(private currentWeatherService: CurrentWeatherService) { }

  ngOnInit() {
    this.isLoading = true;
    this.getWxForecastLocation();
    this.getWxObservations();
    this.getIsDaytime();
  }

  getIsDaytime(): void {
    const currentHour = new Date().getHours();

    if (currentHour >= 1 && currentHour < 7) {
      this.isDaytime = false;
    } else if (currentHour > 7 && currentHour < 19) {
      this.isDaytime = true;
    } else if (currentHour > 19 && currentHour <= 24) {
      this.isDaytime = false;
    }
  }

  getWxForecastLocation(): void {
    this.currentWeatherService
      .getWxLocation()
      .subscribe(wxLocationsData => {
        this.wxLocations = wxLocationsData;

        if (this.wxLocations) {
          this.isLoading = false;
          console.log('Location data loaded.');

          const baseLocationUrl = this.wxLocations.properties.relativeLocation.properties;
          this.locationName = baseLocationUrl.city;
          this.state = baseLocationUrl.state;
        } else {
          this.isLoading = false;
          this.currentWindChill = '--';
          this.currentHumidity = '--';
          this.currentPressure = '--';
          this.currentTemperature = '--';
          this.currentVisibility = '--';
          this.currentWindSpeed = '--';
          this.locationName = '--';
          this.observationTime = '--';
          this.state = '--';
        }
      });
  }

  getWxObservations(): void {
    this.currentWeatherService
      .getWxObservations()
      .subscribe(wxObservationData => {
        if (this.locationName === 'Grand Prairie' && this.state === 'TX') {
          this.wxForecast = wxObservationData;

          if (this.wxForecast && !this.isLoading) {
            this.hasWxData = true;
            console.log('Weather data loaded.');
            const baseObservationsUrl = this.wxForecast.properties;

            if (baseObservationsUrl.windChill.value === null) {
              this.currentWindChill = null;
            } else {
              this.currentWindChill = Math.floor(weatherUtils.convertCelsiusToFahrenheit(baseObservationsUrl.windChill.value)).toString();
            }

            this.currentHumidity = `${Math.floor(baseObservationsUrl.relativeHumidity.value)}%`;
            this.currentPressure = `${Math.floor(weatherUtils.convertPascalsToMillibar(baseObservationsUrl.barometricPressure.value))}mb`;
            this.currentTemperature = Math.floor(weatherUtils.convertCelsiusToFahrenheit(baseObservationsUrl.temperature.value)).toString();
            this.currentVisibility = `${Math.floor(weatherUtils.convertMetersToMiles(baseObservationsUrl.visibility.value))} miles`;
            this.currentWindSpeed = `${Math.floor(weatherUtils.convertMetersPerSecondToMilePerHour(baseObservationsUrl.windSpeed.value))} MPH`;
            this.observationTime = moment.utc(baseObservationsUrl.timestamp).local().format('LT');
          } else {
            this.hasWxData = false;
            console.log('No weather data to show.');
          }
        }
      });
  }

  showIsLoading() {
    if (this.isLoading) {
      return {
        loading: true
      };
    }
  }
}