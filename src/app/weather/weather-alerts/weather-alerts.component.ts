import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-alerts',
  templateUrl: './weather-alerts.component.html'
})
export class WeatherAlertsComponent implements OnInit {
  /* TODO:
   * Refactor weather alerts card
   ** Remove description from card face
   ** Add 'More information' link
   ** Show description and instruction in Material Dialog
      when 'More information' link is clicked
   */
  error: string;
  date: string;
  isLoading: boolean;

  wxAlerts: any = [];
  wxAlertForecastOffice: string;
  wxAlertEvent: string;
  wxAlertDescription: string;
  wxAlertInstruction: string;

  constructor(private weatherService: WeatherService) { }

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
            if (alert.properties.senderName === 'NWS Fort Worth TX') {
              console.log(alert.properties.event);
              console.log(alert.properties.instruction);

              this.date = moment().format('MMM D, YYYY');
              this.wxAlertEvent = alert.properties.event;
              this.wxAlertDescription = alert.properties.description.split('*');
              this.wxAlertInstruction = alert.properties.instruction;
            }
          })
        }
      }, error => {
        console.log(error);
        this.error = 'Weather alerts are currently unavailable.';
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
