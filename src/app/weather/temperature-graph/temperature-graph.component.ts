import { Component, OnInit } from '@angular/core';

import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-temperature-graph',
  templateUrl: './temperature-graph.component.html'
})
export class TemperatureGraphComponent implements OnInit {
  error: string;
  isLoading: boolean;
  hasWxForecastData: boolean;
  temperatureChartColors: Color[] = [
    { backgroundColor: '', borderColor: '' },
    { backgroundColor: '', borderColor: '' }
  ];
  temperatureChartData: ChartDataSets[] = [
    { data: [], label: '' },
    { data: [], label: '' }
  ];
  temperatureChartLabels: Label[] = [];
  temperatureChartLegend: true;
  temperatureChartPlugins = [];
  wxForecast: any = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.isLoading = true;
    this.getWxForecast();
  }

  getWxForecast(): void {
    this.weatherService
      .getWxForecastData()
      .subscribe(wxForecastData => {
        this.wxForecast = wxForecastData;
        console.log('Forecast data loaded.');

        if (this.wxForecast) {
          this.hasWxForecastData = true;
          this.isLoading = false;
          const forecastPeriods = this.wxForecast.properties.periods;

          if (forecastPeriods[13].isDaytime) {
            forecastPeriods.splice(-1, 1);
          }

          switch (forecastPeriods[0].name) {
            case 'Overnight':
            case 'This Afternoon':
            case 'This Evening':
            case 'This Morning':
            case 'Tonight':
              forecastPeriods.shift();
            default:
              break;
          }

          forecastPeriods.filter(forecastPeriod => {
            if (forecastPeriod.isDaytime) {
              this.temperatureChartColors[0].backgroundColor = 'rgba(233,30,99, 0.2)';
              this.temperatureChartColors[0].borderColor = 'rgba(233,30,99, 1)';
              this.temperatureChartData[0].data.push(forecastPeriod.temperature);
              this.temperatureChartData[0].label = 'High Temp';

              switch (forecastPeriod.name) {
                case 'Christmas Day':
                case 'New Year\'s Day':
                case 'Today':
                  this.temperatureChartLabels.push(forecastPeriod.name);
                  break;
                default:
                  this.temperatureChartLabels.push(forecastPeriod.name.substring(0, 3));
              }
            } else {
              this.temperatureChartColors[1].backgroundColor = 'rgba(63,81,181, 0.2)';
              this.temperatureChartColors[1].borderColor = 'rgba(63,81,181, 1)';
              this.temperatureChartData[1].data.push(forecastPeriod.temperature);
              this.temperatureChartData[1].label = 'Low Temp';
            }
          });
        } else {
          this.hasWxForecastData = false;
        }
      }, error => {
        console.log(error);
        this.error = 'Temperature forecast data is currently unavailable.';
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