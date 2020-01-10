import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import * as weatherUtils from '../weather-utils';

import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-observations',
  templateUrl: './weather-observations.component.html'
})
export class WeatherObservationsComponent implements OnInit {
  /* TODO:
   * Add heat index logic to latest obs card
   * Add and configure NgRx store
   * Add code to enable selection of another city
   */
  error: string;
  isDaytime: boolean;
  isLoading: boolean;

  wxForecast: any = [];
  hasShortTermForecastData: boolean;
  shortTermForecastDetails: string;
  shortTermForecastLowTemperature: string;
  shortTermForecastPeriod: string;

  wxLocationInfo: any = [];
  locationName: string;
  state: string;

  wxObservations: any = [];
  hasWxData: boolean;
  forecastPeriod: string;
  observedHumidity: string;
  observedPressure: string;
  observedSkyCondition: string;
  observedTemperature: string;
  observedVisibility: string;
  observedWindChill: string;
  observedWindDirection: string | number;
  observedWindSpeed: string;
  observationTime: string;
  tooltipText: string;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.isLoading = true;
    this.getWxObservations();
    this.getWxShortTermForecast();
    this.getIsDaytime();
  }

  getIsDaytime(): void {
    const currentHour = new Date().getHours();

    if (currentHour >= 1 && currentHour < 7) {
      this.isDaytime = false;
    } else if (currentHour > 7 && currentHour < 18) {
      this.isDaytime = true;
    } else if (currentHour > 18 && currentHour <= 24) {
      this.isDaytime = false;
    }
  }

  getWxShortTermForecast() {
    this.weatherService
      .getWxForecastData()
      .subscribe(wxForecastData => {
        this.wxForecast = wxForecastData;

        if (this.wxForecast) {
          console.log('Short term forecast data loaded.');
          const baseForecastUrl = this.wxForecast.properties.periods;
          this.hasShortTermForecastData = true;
          this.shortTermForecastDetails = baseForecastUrl[0].shortForecast;
          this.shortTermForecastLowTemperature = baseForecastUrl[0].temperature;
          this.shortTermForecastPeriod = baseForecastUrl[0].name;
          this.tooltipText = baseForecastUrl[0].shortForecast;

          if (this.shortTermForecastDetails.length > 40) {
            const splitDetails = this.shortTermForecastDetails.split('then');
            this.shortTermForecastDetails = `${splitDetails[0]} ...`;
          }
        }
      })
  }

  getWxForecastLocation(url): void {
    this.weatherService
      .getWxLocationData(url)
      .subscribe(wxLocationData => {
        this.wxLocationInfo = wxLocationData;
        console.log('WX location data:');
        console.log(this.wxLocationInfo);

        if (this.wxLocationInfo) {
          this.isLoading = false;
          console.log('Location data loaded.');

          const baseLocationUrl = this.wxLocationInfo.properties.relativeLocation.properties;
          this.locationName = baseLocationUrl.city;
          this.state = baseLocationUrl.state;
        } else {
          this.isLoading = false;
          this.observedWindChill = '--';
          this.observedHumidity = '--';
          this.observedPressure = '--';
          this.observedTemperature = '--';
          this.observedVisibility = '--';
          this.observedWindSpeed = '--';
          this.locationName = '--';
          this.observationTime = '--';
          this.state = '--';
        }
      }, error => {
        console.log(error);
        this.error = 'Latest observations are currently unavailable.';
      });
  }

  getWxObservations(): void {
    this.setCurrentLocation();
    this.weatherService
      .getWxObservationsData()
      .subscribe(wxObservationData => {
          this.wxObservations = wxObservationData;
          console.log('WX Observations:');
          console.log(this.wxObservations);

          if (this.wxObservations) {
            this.hasWxData = true;
            console.log('Weather data loaded.');
            const baseObservationsUrl = this.wxObservations.properties;

            if (baseObservationsUrl.windChill.value === null) {
              this.observedWindChill = null;
            } else {
              this.observedWindChill = Math.floor(weatherUtils.convertCelsiusToFahrenheit(baseObservationsUrl.windChill.value)).toString();
            }

            this.observedHumidity = `${Math.floor(baseObservationsUrl.relativeHumidity.value)}%`;
            this.observedPressure = `${Math.floor(weatherUtils.convertPascalsToMillibar(baseObservationsUrl.barometricPressure.value))} mb`;
            this.observedSkyCondition = baseObservationsUrl.textDescription;
            this.observedTemperature = Math.floor(weatherUtils.convertCelsiusToFahrenheit(baseObservationsUrl.temperature.value)).toString();
            this.observedVisibility = `${Math.floor(weatherUtils.convertMetersToMiles(baseObservationsUrl.visibility.value))} mi`;
            this.observedWindDirection = baseObservationsUrl.windDirection.value;
            this.observedWindSpeed = `${Math.floor(weatherUtils.convertMetersPerSecondToMilePerHour(baseObservationsUrl.windSpeed.value))} mph`;
            this.observationTime = moment.utc(baseObservationsUrl.timestamp).local().format('LT');

            if (
              this.observedWindDirection >= 0 && this.observedWindDirection <= 10 ||
              this.observedWindDirection > 350 && this.observedWindDirection <= 360
            ) {
              this.observedWindDirection = 'N'
            } else if (this.observedWindDirection > 10 && this.observedWindDirection <= 80) {
              this.observedWindDirection = 'NE';
            } else if (this.observedWindDirection > 80 && this.observedWindDirection <= 100) {
              this.observedWindDirection = 'E';
            } else if (this.observedWindDirection > 100 && this.observedWindDirection <= 170) {
              this.observedWindDirection = 'SE';
            } else if (this.observedWindDirection > 170 && this.observedWindDirection <= 190) {
              this.observedWindDirection = 'S';
            } else if (this.observedWindDirection > 190 && this.observedWindDirection <= 260) {
              this.observedWindDirection = 'SW';
            } else if (this.observedWindDirection > 260 && this.observedWindDirection <= 280) {
              this.observedWindDirection = 'W';
            } else if (this.observedWindDirection > 280 && this.observedWindDirection <= 350) {
              this.observedWindDirection = 'NW';
            }
          } else {
            this.hasWxData = false;
            this.isLoading = false;
            console.log('No weather data to show.');
          }
      }, error => {
        console.log(error);
        this.error = 'Latest observations are currently unavailable.';
      });
  }

  setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const wxUrl = `https://api.weather.gov/points/${latitude},${longitude}`;
        this.getWxForecastLocation(wxUrl);
      });
    } else {
      console.log('Your browser does not support geolocation at this time.');
    }
  }

  showIsLoading() {
    if (this.isLoading) {
      return {
        loading: true
      };
    }
  }

  showSkyConditionIcon() {
    if (this.isDaytime) {
      switch (this.observedSkyCondition) {
        case 'Clear':
        case 'Mostly Clear':
        case 'Sunny':
          return {
            'wi-day-sunny': true
          };
        case 'Partly Cloudy':
        case 'Mostly Sunny':
          return {
            'wi-day-cloudy': true
          };
        case 'Mostly Cloudy':
        case 'Partly Sunny':
        case 'Cloudy':
        case 'Overcast':
          return {
            'wi-day-sunny-overcast': true
          };
        case 'Thunderstorms':
        case 'Thunderstorms and Rain':
        case 'Thunderstorms and Rain and Fog/Mist':
          return {
            'wi-day-thunderstorm': true
          };
        case 'Rain':
          return {
            'wi-day-rain': true
          };
        case 'Fog':
        case 'Fog/Mist':
          return {
            'wi-day-fog': true
          };
      }
    } else {
      switch (this.observedSkyCondition) {
        case 'Clear':
        case 'Mostly Clear':
        case 'Sunny':
          return {
            'wi-night-clear': true
          };
        case 'Partly Cloudy':
        case 'Mostly Sunny':
          return {
            'wi-night-alt-partly-cloudy': true
          };
        case 'Mostly Cloudy':
        case 'Partly Sunny':
        case 'Cloudy':
        case 'Overcast':
          return {
            'wi-cloudy': true
          };
        case 'Thunderstorms':
        case 'Thunderstorms and Rain':
        case 'Thunderstorms and Rain and Fog/Mist':
          return {
            'wi-thunderstorm': true
          };
        case 'Rain':
          return {
            'wi-rain': true
          };
        case 'Fog':
        case 'Fog/Mist':
          return {
            'wi-fog': true
          };
      }
    }
  }

  showWindDirectionIcon() {
    if (this.observedWindSpeed === '0 mph') {
      return;
    } else {
      switch (this.observedWindDirection) {
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