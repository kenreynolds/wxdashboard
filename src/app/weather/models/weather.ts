export interface CurrentObservations {
  currentDate: string;
  observedHeatIndex: string;
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
  forecastHighTemperature: number | string;
  forecastLowTemperature: number | string;
  shortTermForecastDetails: string;
  shortTermForecastLowTemperature: number | string;
  shortTermForecastPeriod: string;
}