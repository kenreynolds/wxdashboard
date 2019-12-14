import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatCardModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { TemperatureGraphComponent } from './temperature-graph/temperature-graph.component';

@NgModule({
  declarations: [
    CurrentWeatherComponent,
    TemperatureGraphComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    FontAwesomeModule,
    HttpClientModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  exports: [
    CurrentWeatherComponent,
    TemperatureGraphComponent,
  ]
})
export class WeatherModule {}