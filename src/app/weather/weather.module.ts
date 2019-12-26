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
  MatToolbarModule
} from '@angular/material';

import { TemperatureGraphComponent } from './temperature-graph/temperature-graph.component';
import { WeatherAlertsComponent } from './weather-alerts/weather-alerts.component';
import { WeatherObservationsComponent } from './weather-observations/weather-observations.component';

@NgModule({
  declarations: [
    TemperatureGraphComponent,
    WeatherAlertsComponent,
    WeatherObservationsComponent,
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
  ],
  exports: [
    TemperatureGraphComponent,
    WeatherAlertsComponent,
    WeatherObservationsComponent,
  ]
})
export class WeatherModule {}