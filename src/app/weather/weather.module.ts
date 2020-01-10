import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

import { TemperatureGraphComponent } from './temperature-graph/temperature-graph.component';
import { WeatherAlertsComponent } from './weather-alerts/weather-alerts.component';
import { WeatherAlertDialogComponent } from './weather-alert-dialog/weather-alert-dialog.component';
import { WeatherObservationsComponent } from './weather-observations/weather-observations.component';

@NgModule({
  declarations: [
    TemperatureGraphComponent,
    WeatherAlertsComponent,
    WeatherAlertDialogComponent,
    WeatherObservationsComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    FontAwesomeModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  exports: [
    TemperatureGraphComponent,
    WeatherAlertsComponent,
    WeatherObservationsComponent,
  ],
  entryComponents: [WeatherAlertDialogComponent]
})
export class WeatherModule {}