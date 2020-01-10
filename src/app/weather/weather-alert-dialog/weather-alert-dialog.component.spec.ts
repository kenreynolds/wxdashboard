import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherAlertDialogComponent } from './weather-alert-dialog.component';

describe('WeatherAlertDialogComponent', () => {
  let component: WeatherAlertDialogComponent;
  let fixture: ComponentFixture<WeatherAlertDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherAlertDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
