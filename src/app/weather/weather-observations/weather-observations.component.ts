import { Component, OnInit } from '@angular/core';

import { CurrentObservations, Forecast } from '../models/weather';
import { WeatherService } from '../services/weather.service';

import * as dayjs from 'dayjs';

@Component({
  selector: 'app-weather-observations',
  templateUrl: './weather-observations.component.html'
})
export class WeatherObservationsComponent implements OnInit {
  wxForecast: any = [];
  wxObservations: any = [];
  hasFeelsLike = false;
  isDaytime = false;

  currentObservations: CurrentObservations;
  forecast: Forecast;
  error: string;
  hasWxData: boolean;
  hasWxForecastData: boolean;
  isHeatIndex: boolean;
  isLoading: boolean;
  isWindChill: boolean;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.isLoading = true;
    this.getWeatherData('f');
  }

  getWeatherData(tempScale): void {
    this.weatherService.getCurrentLocation()
      .then(pos => {
        const lat = pos.lat;
        const lon = pos.lon;

        // Current weather conditions
        this.weatherService
          .getWxObservationsData(lat, lon)
          .subscribe(wxObservationData => {
            console.log(`Current coordinates: ${lat}, ${lon}`);
            this.wxObservations = wxObservationData;

            if (this.wxObservations) {
              console.log('Weather data loaded.');
              const obsLocationUrl = this.wxObservations.location;
              const currentObsUrl = this.wxObservations.current;
              let feelsLike = '';
              let currentTemp = '';

              if (tempScale === 'f') {
                feelsLike = Math.round(currentObsUrl.feelslike_f).toString();
                currentTemp = Math.round(currentObsUrl.temp_f).toString();
              } else if (tempScale === 'c') {
                feelsLike = Math.round(currentObsUrl.feelslike_c).toString();
                currentTemp = Math.round(currentObsUrl.temp_c).toString();
              } else {
                console.log('Please provide f or c for temp scale.');
              }

              this.hasWxData = true;
              this.isLoading = false;
              this.currentObservations = {
                observedFeelsLike: feelsLike,
                observedHumidity: `${currentObsUrl.humidity}%`,
                observedLocationName: obsLocationUrl.name,
                observedPressure: `${currentObsUrl.pressure_mb} mb`,
                observedRegion: obsLocationUrl.region,
                observedSkyCondition: currentObsUrl.condition.text,
                observedTemperature: currentTemp,
                observedVisibility: `${currentObsUrl.vis_miles} miles`,
                observedWindDirection: currentObsUrl.wind_dir,
                observedWindSpeed: currentObsUrl.wind_mph,
                observationDateTime: dayjs(obsLocationUrl.localtime).format('ddd. MMM D, YYYY, h:mm A'),
              }

              if (currentObsUrl.is_day === 1) {
                this.isDaytime = true;
              }

              this.showFeelsLike();
            } else {
              console.log('No weather data to show.');
              this.hasWxData = false;
              this.isLoading = false;
            }
          }, error => {
            console.log(error);
            this.error = 'Latest observations are currently unavailable.';
          });

        // Forecast weather conditions
        this.weatherService
          .getWxForecastData(lat, lon, 1)
          .subscribe(wxForecastData => {
            this.wxForecast = wxForecastData;

            if (this.wxForecast) {
              console.log('Weather forecast data loaded.');
              const forecastUrl = this.wxForecast.forecast.forecastday[0].day;
              let highTemp = '';
              let lowTemp = '';

              if (tempScale === 'f') {
                highTemp = Math.round(forecastUrl.maxtemp_f).toString();
                lowTemp = Math.round(forecastUrl.mintemp_f).toString();
              } else if (tempScale === 'c') {
                highTemp = Math.round(forecastUrl.maxtemp_c).toString();
                lowTemp = Math.round(forecastUrl.mintemp_c).toString();
              } else {
                console.log('Please provide f or c for temp scale.');
              }

              this.hasWxForecastData = true;
              this.isLoading = false;
              this.forecast = {
                highTemperature: highTemp,
                lowTemperature: lowTemp,
                skyCondition: forecastUrl.condition.text,
                chanceOfRain: forecastUrl.daily_chance_of_rain,
                chanceOfSnow: forecastUrl.daily_chance_of_snow,
              };
            } else {
              console.log('No weather forecast data to show.');
              this.hasWxForecastData = false;
              this.isLoading = false;
            }
          }, error => {
              console.log(error);
              this.error = 'Weather forecast is currently unavailable.';
          });
      });
  }

  showFeelsLike() {
    if (this.currentObservations.observedFeelsLike !== this.currentObservations.observedTemperature) {
      if (
        this.currentObservations.observedFeelsLike > this.currentObservations.observedTemperature &&
        this.currentObservations.observedFeelsLike > '80'
      ) {
        this.hasFeelsLike = true;
        this.isHeatIndex = true;
        return {
          'heat-index': true
        }
      } else if (
        this.currentObservations.observedFeelsLike < this.currentObservations.observedTemperature &&
        this.currentObservations.observedFeelsLike < '50'
      ) {
        this.hasFeelsLike = true;
        this.isWindChill = true;
        return {
          'wind-chill': true
        }
      }
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
        case 'Sunny':
          return {
            'wi-day-sunny': true
          };
        case 'Partly cloudy':
          return {
            'wi-day-sunny-overcast': true
          };
          case 'Cloudy':
            return {
              'wi-day-cloudy': true
            };
          case 'Overcast':
            return {
              'wi-day-sunny-overcast': true
            }
          case 'Fog':
          case 'Freezing fog':
          case 'Mist':
            return {
              'wi-day-fog': true
            }
          case 'Light drizzle':
          case 'Light rain':
          case 'Patchy light drizzle':
          case 'Patchy light rain':
            return {
              'wi-day-sprinkle': true
            }
          case 'Light rain shower':
          case 'Patchy rain possible':
            return {
              'wi-day-showers': true
            }
          case 'Patchy light rain with thunder':
            return {
              'wi-day-storm-showers': true
            }
          case 'Thundery outbreaks possible':
            return {
              'wi-day-lightning': true
            }
          case 'Moderate or heavy rain with thunder':
            return {
              'wi-day-thunderstorm': true
            };
          case 'Heavy rain':
          case 'Heavy rain at times':
          case 'Moderate or heavy rain shower':
          case 'Moderate rain':
          case 'Moderate rain at times':
          case 'Torrential rain shower':
            return {
              'wi-day-rain': true
            };
          case 'Blowing snow':
          case 'Blizzard':
            return {
              'wi-day-snow-wind': true
            }
          case 'Freezing drizzle':
          case 'Heavy freezing drizzle':
          case 'Light freezing rain':
          case 'Moderate or heavy freezing rain':
          case 'Patchy freezing drizzle possible':
            return {
              'wi-day-rain-mix': true
            }
          case 'Ice pellets':
          case 'Light showers of ice pellets':
          case 'Light sleet':
          case 'Light sleet showers':
          case 'Moderate or heavy showers of ice pellets':
          case 'Moderate or heavy sleet':
          case 'Moderate or heavy sleet showers':
          case 'Patchy sleet possible':
            return {
              'wi-day-sleet': true
            }
          case 'Heavy snow':
          case 'Light snow':
          case 'Light snow showers':
          case 'Moderate snow':
          case 'Moderate or heavy snow showers':
          case 'Patchy heavy snow':
          case 'Patchy light snow':
          case 'Patchy moderate snow':
          case 'Patchy snow possible':
            return {
              'wi-day-snow': true
            }
          case 'Patchy light snow with thunder':
          case 'Moderate or heavy snow with thunder':
            return {
              'wi-day-snow-thunderstorm': true
            }
      }
    } else {
      switch (this.currentObservations.observedSkyCondition) {
        case 'Clear':
          return {
            'wi-night-clear': true
          };
        case 'Partly cloudy':
          return {
            'wi-night-alt-partly-cloudy': true
          };
        case 'Cloudy':
        case 'Overcast':
          return {
            'wi-night-alt-cloudy': true
          };
        case 'Fog':
        case 'Freezing fog':
        case 'Mist':
          return {
            'wi-night-fog': true
          }
        case 'Light drizzle':
        case 'Light rain':
        case 'Patchy light drizzle':
        case 'Patchy light rain':
          return {
            'wi-night-alt-sprinkle': true
          }
        case 'Light rain shower':
        case 'Patchy rain possible':
          return {
            'wi-night-alt-showers': true
          }
        case 'Patchy light rain with thunder':
          return {
            'wi-night-alt-storm-showers': true
          }
        case 'Thundery outbreaks possible':
          return {
            'wi-night-alt-lightning': true
          }
        case 'Moderate or heavy rain with thunder':
          return {
            'wi-night-alt-thunderstorm': true
          };
        case 'Heavy rain':
        case 'Heavy rain at times':
        case 'Moderate or heavy rain shower':
        case 'Moderate rain':
        case 'Moderate rain at times':
        case 'Torrential rain shower':
          return {
            'wi-night-alt-rain': true
          };
        case 'Blowing snow':
        case 'Blizzard':
          return {
            'wi-night-alt-snow-wind': true
          }
        case 'Freezing drizzle':
        case 'Heavy freezing drizzle':
        case 'Light freezing rain':
        case 'Moderate or heavy freezing rain':
        case 'Patchy freezing drizzle possible':
          return {
            'wi-night-alt-rain-mix': true
          }
        case 'Ice pellets':
        case 'Light showers of ice pellets':
        case 'Light sleet':
        case 'Light sleet showers':
        case 'Moderate or heavy showers of ice pellets':
        case 'Moderate or heavy sleet':
        case 'Moderate or heavy sleet showers':
        case 'Patchy sleet possible':
          return {
            'wi-night-alt-sleet': true
          }
        case 'Heavy snow':
        case 'Light snow':
        case 'Light snow showers':
        case 'Moderate snow':
        case 'Moderate or heavy snow showers':
        case 'Patchy heavy snow':
        case 'Patchy light snow':
        case 'Patchy moderate snow':
        case 'Patchy snow possible':
          return {
            'wi-night-alt-snow': true
          }
        case 'Patchy light snow with thunder':
        case 'Moderate or heavy snow with thunder':
          return {
            'wi-night-alt-snow-thunderstorm': true
          }
      }
    }
  }
}