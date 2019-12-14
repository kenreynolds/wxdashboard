export interface CurrentWeather {
  location: {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    localtime: string;
  };
  current: {
    observation_time: string;
    temperature: number;
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    humidity: number;
    feelslike: number;
    visibility: number;
  };
}
