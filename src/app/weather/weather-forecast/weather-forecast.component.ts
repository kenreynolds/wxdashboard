import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html'
})
export class WeatherForecastComponent implements OnInit {
  dailyForecast: any= [];
  wxForecast: any = [];
  error: string;
  hasWxForecastData: boolean;
  isLoading: boolean;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.isLoading = true;
    this.getForecastWeatherData();
  }

  getForecastWeatherData() {
    this.weatherService.getCurrentLocation()
      .then(pos => {
        const lat = pos.lat;
        const lon = pos.lon;

        // 3-day Weather Forecast
        this.weatherService
          .getWxForecastData(lat, lon, 3)
          .subscribe(wxForecastData => {
            this.wxForecast = wxForecastData;

            if (this.wxForecast) {
              console.log('3-day forecast data loaded.');
              const forecastUrl = this.wxForecast.forecast.forecastday;

              this.hasWxForecastData = true;
              this.isLoading = false;

              forecastUrl.forEach(forecast => {
                this.dailyForecast.push({
                  forecastDay: forecast.date,
                  highTemperature: forecast.day.maxtemp_f,
                  lowTemperature: forecast.day.mintemp_f,
                  skyCondition: this.setSkyConditionIcon(forecast.day.condition.text),
                  chanceOfRain: forecast.day.daily_chance_of_rain,
                  chanceOfSnow: forecast.day.daily_chance_of_snow
                });
              });
            } else {
              console.log('No 3-day forecast data to show.');
              this.hasWxForecastData = false;
              this.isLoading = false;
            }
          }, error => {
            console.log(error);
            this.error = '3-day forecast is currently unavailable.';
        });
      });
  }

  setSkyConditionIcon(condition) {
    switch (condition) {
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
  }
}