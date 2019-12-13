import { TestBed } from '@angular/core/testing';

import { ForecastWeatherService } from './forecast-weather.service';

describe('ForecastWeatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForecastWeatherService = TestBed.get(ForecastWeatherService);
    expect(service).toBeTruthy();
  });
});
