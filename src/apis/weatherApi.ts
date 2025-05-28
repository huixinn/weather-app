const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherByCity = async (city: string): Promise<Response> => {
  const response = await fetch(`${baseUrl}/weather?q=${city}&appid=${API_KEY}`);
  return response;
};
