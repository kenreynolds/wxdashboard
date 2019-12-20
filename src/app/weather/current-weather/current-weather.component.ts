import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import * as weatherUtils from '../weather-utils';

import { CurrentWeatherService } from './current-weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html'
})
export class CurrentWeatherComponent implements OnInit {
  /* TODO:
   * Refactor verbiage, variable, and file names from Current Weather to Latest Observations
   * Add code to enable selection of another city
   */
  isLoading: boolean;
  wxLocations: any = [];
  wxObservations: any = [];

  currentHumidity: string;
  currentPressure: string;
  currentSkyCondition: string;
  currentTemperature: string;
  currentVisibility: string;
  currentWindChill: string;
  currentWindDirection: string | number;
  currentWindSpeed: string;
  forecastPeriod: string;
  hasWxData: boolean;
  isDaytime: boolean;
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
      .getWxLocationData()
      .subscribe(wxLocationData => {
        this.wxLocations = wxLocationData;

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
      .getWxObservationsData()
      .subscribe(wxObservationData => {
        if (this.locationName === 'Grand Prairie' && this.state === 'TX') {
          this.wxObservations = wxObservationData;

          if (this.wxObservations && !this.isLoading) {
            this.hasWxData = true;
            console.log('Weather data loaded.');
            const baseObservationsUrl = this.wxObservations.properties;

            if (baseObservationsUrl.windChill.value === null) {
              this.currentWindChill = null;
            } else {
              this.currentWindChill = Math.floor(weatherUtils.convertCelsiusToFahrenheit(baseObservationsUrl.windChill.value)).toString();
            }

            this.currentHumidity = `${Math.floor(baseObservationsUrl.relativeHumidity.value)}%`;
            this.currentPressure = `${Math.floor(weatherUtils.convertPascalsToMillibar(baseObservationsUrl.barometricPressure.value))} mb`;
            this.currentSkyCondition = baseObservationsUrl.textDescription;
            this.currentTemperature = Math.floor(weatherUtils.convertCelsiusToFahrenheit(baseObservationsUrl.temperature.value)).toString();
            this.currentVisibility = `${Math.floor(weatherUtils.convertMetersToMiles(baseObservationsUrl.visibility.value))} mi`;
            this.currentWindDirection = baseObservationsUrl.windDirection.value;
            this.currentWindSpeed = `${Math.floor(weatherUtils.convertMetersPerSecondToMilePerHour(baseObservationsUrl.windSpeed.value))} mph`;
            this.observationTime = moment.utc(baseObservationsUrl.timestamp).local().format('LT');

            if (
              this.currentWindDirection >= 0 && this.currentWindDirection <= 10 ||
              this.currentWindDirection > 350 && this.currentWindDirection <= 360
            ) {
              this.currentWindDirection = 'N'
            } else if (this.currentWindDirection > 10 && this.currentWindDirection <= 80) {
              this.currentWindDirection = 'NE';
            } else if (this.currentWindDirection > 80 && this.currentWindDirection <= 100) {
              this.currentWindDirection = 'E';
            } else if (this.currentWindDirection > 100 && this.currentWindDirection <= 170) {
              this.currentWindDirection = 'SE';
            } else if (this.currentWindDirection > 170 && this.currentWindDirection <= 190) {
              this.currentWindDirection = 'S';
            } else if (this.currentWindDirection > 190 && this.currentWindDirection <= 260) {
              this.currentWindDirection = 'SW';
            } else if (this.currentWindDirection > 260 && this.currentWindDirection <= 280) {
              this.currentWindDirection = 'W';
            } else if (this.currentWindDirection > 280 && this.currentWindDirection <= 350) {
              this.currentWindDirection = 'NW';
            }
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

  showSkyConditionIcon() {
    if (
      this.currentSkyCondition === 'Clear' ||
      this.currentSkyCondition === 'Mostly Clear' ||
      this.currentSkyCondition === 'Sunny'
    ) {
      if (this.isDaytime) {
        return {
          'wi-day-sunny': true
        };
      } else {
        return {
          'wi-night-clear': true
        };
      }
    } else if (
      this.currentSkyCondition === 'Partly Cloudy' ||
      this.currentSkyCondition === 'Mostly Sunny'
    ) {
      if (this.isDaytime) {
        return {
          'wi-day-cloudy': true
        };
      } else {
        return {
          'wi-night-alt-partly-cloudy': true
        };
      }
    } else if (
      this.currentSkyCondition === 'Mostly Cloudy' ||
      this.currentSkyCondition === 'Partly Sunny' ||
      this.currentSkyCondition === 'Cloudy' ||
      this.currentSkyCondition === 'Overcast'
    ) {
      if (this.isDaytime) {
        return {
          'wi-day-overcast': true
        };
      } else {
        return {
          'wi-night-alt-cloudy': true
        };
      }
    }
  }

  showWindDirectionIcon() {
    if (this.currentWindSpeed === '0 mph') {
      return;
    } else {
      switch (this.currentWindDirection) {
        case 'N':
          return {
            'wi-direction-down': true
          };
        case 'NE':
          return {
            'wi-direction-down-left': true
          };
        case 'E':
          return {
            'wi-direction-left': true
          };
        case 'SE':
          return {
            'wi-direction-up-left': true
          };
        case 'S':
          return {
            'wi-direction-up': true
          };
        case 'SW':
          return {
            'wi-direction-up-right': true
          };
        case 'W':
          return {
            'wi-direction-right': true
          };
        case 'NW':
          return {
            'wi-direction-down-right': true
          };
        default:
          break;
      }
    }
  }
}