import { createAction, props } from '@ngrx/store';

export const loadWeather = createAction(
  '[Weather] Load Weather'
);

export const loadWeatherSuccess = createAction(
  '[Weather] Load Weather Success',
  props<{ data: any }>()
);

export const loadWeatherFailure = createAction(
  '[Weather] Load Weather Failure',
  props<{ error: any }>()
);
