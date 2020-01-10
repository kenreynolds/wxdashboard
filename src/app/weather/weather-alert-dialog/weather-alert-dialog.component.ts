import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-weather-alert-dialog',
  templateUrl: './weather-alert-dialog.component.html'
})
export class WeatherAlertDialogComponent {
  alertTitle: string;
  alertText: string;

  constructor(
    private dialogRef: MatDialogRef<WeatherAlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.alertTitle = data.alertTitle;
    if (data.alertText.includes('*')) {
      this.alertText = data.alertText.split('*');
    }
  }

  close() {
    this.dialogRef.close();
  }
}