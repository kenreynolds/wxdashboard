import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import * as moment from 'moment';
import { WeatherService } from '../services/weather.service';
import { WeatherAlertDialogComponent } from '../weather-alert-dialog/weather-alert-dialog.component';

@Component({
  selector: 'app-weather-alerts',
  templateUrl: './weather-alerts.component.html'
})
export class WeatherAlertsComponent implements OnInit {
  error: string;
  date: string;
  hasAlerts: boolean;
  isLoading: boolean;

  wxAlerts: any = [];
  wxAlertForecastOffice: string;
  wxAlertEvent: string;
  wxAlertDescription: string;
  wxAlertInstruction: string;

  constructor(
    private weatherService: WeatherService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.getWxAlerts();
  }

  getWxAlerts() {
    this.weatherService
      .getWxAlertsData()
      .subscribe(wxAlertData => {
        this.wxAlerts = wxAlertData;

        if (this.wxAlerts) {
          this.isLoading = false;
          console.log('Weather alerts data loaded.');

          const baseAlertsUrl = this.wxAlerts.features;
          baseAlertsUrl.forEach(alert => {
            this.date = moment().format('MMM D, YYYY');

            if (alert.properties.senderName === 'NWS Fort Worth TX') {
              this.hasAlerts = true;
              this.wxAlertEvent = alert.properties.event;
              this.wxAlertDescription = alert.properties.description;

              if (alert.properties.instruction !== null) {
                this.wxAlertInstruction = alert.properties.instruction;
              }
            }
          })
        }
      }, error => {
        console.log(error);
        this.error = 'Weather alerts are currently unavailable.';
      });
  }

  openAlertDialog(title, text) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      alertTitle: title,
      alertText: text
    }

    const dialogRef = this.matDialog.open(WeatherAlertDialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(data => console.log("Dialog output: ", data));
  }

  showIsLoading() {
    if (this.isLoading) {
      return {
        loading: true
      };
    }
  }
}
