import { Component, OnInit } from '@angular/core';

import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { ForecastWeatherService } from '../core/services/forecast-weather.service';

@Component({
  selector: 'app-temperature-graph',
  templateUrl: './temperature-graph.component.html'
})
export class TemperatureGraphComponent implements OnInit {
  /* TODO:
   * Add loader
   */
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

  constructor(private forecastWeatherService: ForecastWeatherService) { }

  ngOnInit() {
    this.getWxForecast();
  }

  getWxForecast(): void {
    this.forecastWeatherService
      .getWxForecastData()
      .subscribe(wxForecastData => {
        this.wxForecast = wxForecastData;
        console.log('Forecast data loaded.');

        if (this.wxForecast) {
          this.hasWxForecastData = true;
          const baseForecastUrl = this.wxForecast.properties;

          baseForecastUrl.periods.filter(forecastPeriod => {
            if (forecastPeriod.isDaytime) {
              this.temperatureChartColors[0].backgroundColor = 'rgba(233,30,99, 0.2)';
              this.temperatureChartColors[0].borderColor = 'rgba(233,30,99, 1)';
              this.temperatureChartData[0].data.push(forecastPeriod.temperature);
              this.temperatureChartLabels.push(forecastPeriod.name.substring(0, 3));
              this.temperatureChartData[0].label = 'High Temp';
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
      });
  }
}