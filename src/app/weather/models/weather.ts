export interface CurrentObservations {
  observedFeelsLike: number | string;
  observedHumidity: number | string;
  observedLocationName: string;
  observedPressure: number | string;
  observedRegion: string;
  observedSkyCondition: string;
  observedTemperature: number | string;
  observedVisibility: number | string;
  observedWindDirection: string;
  observedWindSpeed: number | string;
  observationDateTime: number | string;
}

export interface Forecast {
  forecastDay?: string;
  highTemperature: number | string;
  lowTemperature: number | string;
  skyCondition: string;
  chanceOfRain: string;
  chanceOfSnow: string;
}