import { Component, OnInit } from '@angular/core';

import { CurrentObservations } from '../models/weather';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-observations',
  templateUrl: './weather-observations.component.html'
})
export class WeatherObservationsComponent implements OnInit {
  /* TODO:
   * Add code to enable selection of another city
   */
  wxObservations: any = [];
  hasFeelsLike = false;
  isDaytime = false;

  currentObservations: CurrentObservations;
  error: string;
  hasWxData: boolean;
  isHeatIndex: boolean;
  isLoading: boolean;
  isWindChill: boolean;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.isLoading = true;
    this.getWxObservations();
  }

  getWxObservations(): void {
    this.weatherService.getCurrentLocation()
      .then(pos => {
        const lat = pos.lat;
        const lon = pos.lon;

        this.weatherService
          .getWxObservationsData(lat, lon)
          .subscribe(wxObservationData => {
            console.log(`Current coordinates: ${lat}, ${lon}`);
            this.wxObservations = wxObservationData;

            if (this.wxObservations) {
              console.log('Weather data loaded.');
              const obsLocationUrl = this.wxObservations.location;
              const currentObsUrl = this.wxObservations.current;

              this.hasWxData = true;
              this.isLoading = false;
              this.currentObservations = {
                observedFeelsLike: Math.floor(currentObsUrl.feelslike_f),
                observedHumidity: `${currentObsUrl.humidity}%`,
                observedLocationName: obsLocationUrl.name,
                observedPressure: `${currentObsUrl.pressure_mb} mb`,
                observedRegion: obsLocationUrl.region,
                observedSkyCondition: currentObsUrl.condition.text,
                observedTemperature: Math.floor(currentObsUrl.temp_f),
                observedVisibility: `${currentObsUrl.vis_miles} miles`,
                observedWindDirection: currentObsUrl.wind_dir,
                observedWindSpeed: `${Math.floor(currentObsUrl.wind_mph)} mph`,
                observationDateTime: obsLocationUrl.localtime,
              }

              if (currentObsUrl.is_day === 1) {
                this.isDaytime = true;
              }

              if (this.currentObservations.observedFeelsLike !== this.currentObservations.observedTemperature) {
                this.hasFeelsLike = true;

                if (this.currentObservations.observedFeelsLike > this.currentObservations.observedTemperature
                  && this.currentObservations.observedFeelsLike > 80
                ) {
                  this.isHeatIndex = true;
                } else if (this.currentObservations.observedFeelsLike < this.currentObservations.observedTemperature
                  && this.currentObservations.observedFeelsLike < 40
                ) {
                  this.isWindChill = true;
                }
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
    if (this.isDaytime) {
      switch (this.currentObservations.observedSkyCondition) {
        case 'Sunny':
          return {
            'wi-day-sunny': true
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

  /* showHighTempColor() {
    if (this.shortTermForecast.forecastHighTemperature > 69 && this.shortTermForecast.forecastHighTemperature < 90) {
      return {
        'warm': true
      }
    } else if (this.shortTermForecast.forecastHighTemperature > 89 && this.shortTermForecast.forecastHighTemperature < 100) {
      return {
        'hot': true
      }
    } else if (this.shortTermForecast.forecastHighTemperature > 99) {
      return {
        'sweltering': true
      }
    }
  }

  showLowTempColor() {
    if (this.shortTermForecast.forecastLowTemperature > 59 && this.shortTermForecast.forecastLowTemperature < 70) {
      return {
        'mild': true
      }
    } else if (this.shortTermForecast.forecastLowTemperature > 39 && this.shortTermForecast.forecastLowTemperature < 60) {
      return {
        'cool': true
      }
    } else if (this.shortTermForecast.forecastLowTemperature > 19 && this.shortTermForecast.forecastLowTemperature < 40) {
      return {
        'cold': true
      }
    } else if (this.shortTermForecast.forecastLowTemperature < 19) {
      return {
        'frigid': true
      }
    }
  } */
}