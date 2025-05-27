import type { WeatherApiResponse } from "./types/weatherResponse";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherByCity = async (
  city: string
): Promise<WeatherApiResponse | null> => {
  try {
    const response = await fetch(`${baseUrl}/weather?q=${city}&appid=${API_KEY}`);
    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return null;
    }

    const data: WeatherApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Network error:", error);
    return null;
  }
};
