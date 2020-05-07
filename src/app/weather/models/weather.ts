export interface CurrentObservations {
  observedHumidity: string;
  observedPressure: string;
  observedSkyCondition: string;
  observedTemperature: string;
  observedVisibility: string;
  observedWindChill: string;
  observedWindDirection: string | number;
  observedWindSpeed: string;
  observationTime: string;
}

export interface ShortTermForecast {
  forecastHighTemperature: string;
  forecastLowTemperature: string;
  shortTermForecastDetails: string;
  shortTermForecastLowTemperature: string;
  shortTermForecastPeriod: string;
}