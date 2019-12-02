import { CurrentWeather } from '../core/interfaces/current-weather';

export const CURRENT_WEATHER: Array<CurrentWeather> = [
  {
    location: {
      name: 'Grand Prairie',
      country: 'United States of America',
      region: 'Texas',
      lat: '32.689843',
      lon: '-97.003359',
      localtime: '2019-11-19 12:47'
    },
    current: {
      observation_time: '12:47 PM',
      temperature: 43,
      wind_speed: 9,
      wind_degree: 349,
      wind_dir: 'NW',
      pressure: 1029,
      humidity: 87,
      feelslike: 38,
      visibility: 10
    }
  },
  {
    location: {
      name: 'Chanhassen',
      country: 'United States of America',
      region: 'Minnesota',
      lat: '44.860594',
      lon: '-93.537481',
      localtime: '2019-11-19 12:47'
    },
    current: {
      observation_time: '12:47 PM',
      temperature: 40,
      wind_speed: 3,
      wind_degree: 349,
      wind_dir: 'W',
      pressure: 1015,
      humidity: 79,
      feelslike: 40,
      visibility: 10
    }
  },
];