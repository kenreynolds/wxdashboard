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

export interface ShortTermForecast {
  forecastHighTemperature: number | string;
  forecastLowTemperature: number | string;
  shortTermForecastDetails: string;
  shortTermForecastLowTemperature: number | string;
  shortTermForecastPeriod: string;
}