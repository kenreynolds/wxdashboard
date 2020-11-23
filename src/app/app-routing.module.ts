import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherObservationsComponent } from './weather/weather-observations/weather-observations.component';

const routes: Routes = [
  { path: '', component: WeatherObservationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
