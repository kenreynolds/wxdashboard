import { Component, OnInit } from '@angular/core';

import { CurrentObservations, ShortTermForecast } from '../models/weather';
import { WeatherService } from '../services/weather.service';

import * as moment from 'moment';
import * as weatherUtils from '../weather-utils';

@Component({
  selector: 'app-weather-observations',
  templateUrl: './weather-observations.component.html'
})
export class WeatherObservationsComponent implements OnInit {
  /* TODO:
   * Add heat index logic
   * Add code to enable selection of another city
   */
  error: string;
  isDaytime: boolean;
  isLoading: boolean;
  isTonight: boolean;

  wxForecast: any = [];
  shortTermForecast: ShortTermForecast;
  hasShortTermForecastData: boolean;

  wxLocationInfo: any = [];
  locationName: string;
  state: string;

  wxObservations: any = [];
  currentObservations: CurrentObservations;
  forecastPeriod: string;
  hasWxData: boolean;

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

  getWxShortTermForecast(): void {
    this.weatherService
      .getWxForecastData()
      .subscribe(wxForecastData => {
        this.wxForecast = wxForecastData;

        if (this.wxForecast) {
          console.log('Short term forecast data loaded.');
          const baseForecastUrl = this.wxForecast.properties.periods;
          this.hasShortTermForecastData = true;

          this.isTonight = false;
          this.shortTermForecast = {
            forecastHighTemperature: baseForecastUrl[0].temperature,
            forecastLowTemperature: baseForecastUrl[1].temperature,
            shortTermForecastDetails: baseForecastUrl[0].shortForecast,
            shortTermForecastLowTemperature: baseForecastUrl[0].temperature,
            shortTermForecastPeriod: baseForecastUrl[0].name,
          }

          if (baseForecastUrl[0].name === 'Tonight') {
            this.isTonight = true;
            this.shortTermForecast.forecastHighTemperature = baseForecastUrl[1].temperature;
            this.shortTermForecast.forecastLowTemperature = baseForecastUrl[0].temperature;
          }
        }
      });
  }

  getWxForecastLocation(url): void {
    this.weatherService
      .getWxLocationData(url)
      .subscribe(wxLocationData => {
        console.log('WX location data:');
        console.log(this.wxLocationInfo);
        this.wxLocationInfo = wxLocationData;

        if (this.wxLocationInfo) {
          console.log('Location data loaded.');
          const baseLocationUrl = this.wxLocationInfo.properties.relativeLocation.properties;
          this.isLoading = false;
          this.locationName = baseLocationUrl.city;
          this.state = baseLocationUrl.state;
        } else {
          this.isLoading = false;
          this.currentObservations = {
            currentDate: '--',
            observedHumidity: '--',
            observedPressure: '--',
            observedSkyCondition: '--',
            observedTemperature: '--',
            observedVisibility: '--',
            observedWindChill: '--',
            observedWindDirection: '--',
            observedWindSpeed: '--',
            observationTime: '--'
          }
          this.locationName = '--';
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
        console.log('WX Observations:');
        console.log(this.wxObservations);
        this.wxObservations = wxObservationData;

          if (this.wxObservations) {
            console.log('Weather data loaded.');
            const baseObservationsUrl = this.wxObservations.properties;
            let windChillValue: string;

            this.hasWxData = true;

            if (baseObservationsUrl.windChill.value === null) {
              windChillValue = null;
            } else {
              windChillValue = Math.floor(weatherUtils.convertCelsiusToFahrenheit(baseObservationsUrl.windChill.value)).toString();
            }

            this.currentObservations = {
              currentDate: moment().format('dddd, MMMM D, YYYY'),
              observedHumidity: `${Math.floor(baseObservationsUrl.relativeHumidity.value)}%`,
              observedPressure: `${Math.floor(weatherUtils.convertPascalsToMillibar(baseObservationsUrl.barometricPressure.value))} mb`,
              observedSkyCondition: baseObservationsUrl.textDescription,
              observedTemperature: Math.floor(weatherUtils.convertCelsiusToFahrenheit(baseObservationsUrl.temperature.value)).toString(),
              observedVisibility: `${Math.floor(weatherUtils.convertMetersToMiles(baseObservationsUrl.visibility.value))} mi`,
              observedWindChill: windChillValue,
              observedWindDirection: baseObservationsUrl.windDirection.value,
              observedWindSpeed: `${Math.floor(weatherUtils.convertMetersPerSecondToMilePerHour(baseObservationsUrl.windSpeed.value))} mph`,
              observationTime: moment.utc(baseObservationsUrl.timestamp).local().format('LT')
            }
          } else {
            console.log('No weather data to show.');
            this.hasWxData = false;
            this.isLoading = false;
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
      switch (this.currentObservations.observedSkyCondition) {
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
        case 'Light Rain':
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
      switch (this.currentObservations.observedSkyCondition) {
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
        case 'Light Rain':
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
    if (this.currentObservations.observedWindSpeed === '0 mph') {
      return;
    } else {
      if (
        this.currentObservations.observedWindDirection >= 0 && this.currentObservations.observedWindDirection <= 10
        || this.currentObservations.observedWindDirection > 350 && this.currentObservations.observedWindDirection <= 360
      ) {
        return {
          'wi-direction-down': true
        };
      } else if (this.currentObservations.observedWindDirection > 10 && this.currentObservations.observedWindDirection <= 80) {
        return {
          'wi-direction-down-left': true
        };
      } else if (this.currentObservations.observedWindDirection > 80 && this.currentObservations.observedWindDirection <= 100) {
        return {
          'wi-direction-left': true
        };
      } else if (this.currentObservations.observedWindDirection > 100 && this.currentObservations.observedWindDirection <= 170) {
        return {
          'wi-direction-up-left': true
        };
      } else if (this.currentObservations.observedWindDirection > 170 && this.currentObservations.observedWindDirection <= 190) {
        return {
          'wi-direction-up': true
        };
      } else if (this.currentObservations.observedWindDirection > 190 && this.currentObservations.observedWindDirection <= 260) {
        return {
          'wi-direction-up-right': true
        };
      } else if (this.currentObservations.observedWindDirection > 260 && this.currentObservations.observedWindDirection <= 280) {
        return {
          'wi-direction-right': true
        };
      } else if (this.currentObservations.observedWindDirection > 280 && this.currentObservations.observedWindDirection <= 350) {
        return {
          'wi-direction-down-right': true
        };
      }
    }
  }
}