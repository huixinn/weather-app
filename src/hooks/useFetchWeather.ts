import { useState } from "react";
import type { WeatherData } from "../types/weatherType";
import { fetchWeatherByCity } from "../apis/weatherApi";
import {
  getFormattedDateTime,
  kelvinToCelsius,
  saveSearchHistory,
} from "../utils/utils";
import { v4 as uuidv4 } from "uuid";

export const useFetchWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchWeather = async (city: string) => {
    setIsLoading(true);

    const results = await fetchWeatherByCity(city);

    if (results) {
      const mappedData: WeatherData = {
        id: uuidv4(),
        city: results?.name,
        country: results?.name,
        countryCode: results?.sys?.country,
        dateTime: getFormattedDateTime(),
        temperature: kelvinToCelsius(results?.main?.temp),
        maxTemp: kelvinToCelsius(results?.main?.temp_max),
        minTemp: kelvinToCelsius(results?.main?.temp_min),
        humidity: results?.main?.humidity,
        weatherDesc: results?.weather?.[0]?.main,
      };
      setWeatherData(mappedData);
      saveSearchHistory(mappedData);
      console.log("hx useFetchWeather results", mappedData);
    } else {
      setError(true);
      console.log("hx useFetchWeather error", error);
    }

    setIsLoading(false);
  };

  return {
    weatherData,
    isLoading,
    error,
    fetchWeather,
  };
};
