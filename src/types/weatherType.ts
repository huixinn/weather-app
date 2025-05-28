export interface WeatherData {
  id: string;
  city: string;
  country: string;
  countryCode: string;
  // current time of search
  currentDateTime: string;
  // time in searched country
  localDateTime?: string;
  temperature: number;
  maxTemp: number;
  minTemp: number;
  humidity: number;
  weatherDesc: string;
}
