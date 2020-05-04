import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-weather-alert-dialog',
  templateUrl: './weather-alert-dialog.component.html'
})
export class WeatherAlertDialogComponent {
  alertTitle: string;
  alertText: string;
  alertDetails: string;
  isSplitString: boolean;

  constructor(
    private dialogRef: MatDialogRef<WeatherAlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.isSplitString = false;
    this.alertTitle = data.alertTitle;
    this.alertText = data.alertText;
    this.alertDetails = data.alertDetails;

    if (data.alertText.includes('*')) {
      this.alertText = data.alertText.split('*');
      this.isSplitString = true;
    } else if (data.alertText.includes('\n')) {
      this.alertText = data.alertText.split('\n');
      this.isSplitString = true;
    }
  }

  close() {
    this.dialogRef.close();
  }
}