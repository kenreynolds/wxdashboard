import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherAlertsComponent } from './weather-alerts.component';

describe('WeatherAlertsComponent', () => {
  let component: WeatherAlertsComponent;
  let fixture: ComponentFixture<WeatherAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
