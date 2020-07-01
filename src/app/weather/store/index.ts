import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

export const weatherStateFeatureKey = 'weatherState';

export interface WeatherState {

}

export const reducers: ActionReducerMap<WeatherState> = {

};


export const metaReducers: MetaReducer<WeatherState>[] = !environment.production ? [] : [];
