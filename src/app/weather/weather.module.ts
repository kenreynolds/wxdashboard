import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatCardModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

import { TemperatureGraphComponent } from './temperature-graph/temperature-graph.component';
import { WeatherObservationsComponent } from './weather-observations/weather-observations.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { StoreModule } from '@ngrx/store';
import * as fromWeatherState from './store';

@NgModule({
  declarations: [
    TemperatureGraphComponent,
    WeatherObservationsComponent,
    WeatherForecastComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    FontAwesomeModule,
    HttpClientModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    StoreModule.forFeature(fromWeatherState.weatherStateFeatureKey, fromWeatherState.reducers, { metaReducers: fromWeatherState.metaReducers }),
  ],
  exports: [
    TemperatureGraphComponent,
    WeatherForecastComponent,
    WeatherObservationsComponent,
  ]
})
export class WeatherModule {}