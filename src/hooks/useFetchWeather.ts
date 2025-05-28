import { useState } from "react";
import type { WeatherData } from "../types/weatherType";
import { fetchWeatherByCity } from "../apis/weatherApi";
import {
  formatDateTime,
  getCurrentDateTime,
  kelvinToCelsius,
  mapErrorMessage,
  saveSearchHistory,
} from "../utils/utils";
import { v4 as uuidv4 } from "uuid";
import { type WeatherApiResponse } from "../apis/types/weatherResponse";

export const useFetchWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchWeather = async (city: string) => {
    setIsLoading(true);
    try {
      const response = await fetchWeatherByCity(city);
      const data = await response.json();

      if (!response?.ok) {
        const status = response?.status;
        setError(true);
        setErrorMessage(mapErrorMessage(status));
        setIsLoading(false);
        return;
      }

      const mappedData = mapWeatherData(data);
      setWeatherData(mappedData);

      saveSearchHistory(mappedData);
      setIsLoading(false);
      setError(false);
      setErrorMessage("");
    } catch (error) {
      setError(true);
      setErrorMessage("Error fetching weather");
      console.log("Error fetching weather", error);
    }
  };

  return {
    weatherData,
    isLoading,
    error,
    errorMessage,
    fetchWeather,
  };
};

const mapWeatherData = (data: WeatherApiResponse): WeatherData => {
  const mappedData: WeatherData = {
    id: uuidv4(),
    city: data?.name,
    country: data?.name,
    countryCode: data?.sys?.country,
    localDateTime: formatDateTime(data?.dt, data?.timezone),
    currentDateTime: getCurrentDateTime(),
    temperature: kelvinToCelsius(data?.main?.temp),
    maxTemp: kelvinToCelsius(data?.main?.temp_max),
    minTemp: kelvinToCelsius(data?.main?.temp_min),
    humidity: data?.main?.humidity,
    weatherDesc: data?.weather?.[0]?.main,
  };
  return mappedData;
};
