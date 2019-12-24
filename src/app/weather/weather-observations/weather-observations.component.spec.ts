import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherObservationsComponent } from './weather-observations.component';

describe('WeatherObservationsComponent', () => {
  let component: WeatherObservationsComponent;
  let fixture: ComponentFixture<WeatherObservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherObservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
