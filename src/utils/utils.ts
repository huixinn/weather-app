import { HttpStatusCode } from "../apis/types/weatherResponse";
import type { WeatherData } from "../types/weatherType";
import { format } from "date-fns";

const STORAGE_KEY = "weather_search_history";

export const getCurrentDateTime = (): string => {
  return format(new Date(), "dd-MM-yyyy hh:mmaaa").toLowerCase();
};

export const formatDateTime = (
  dt: number,
  timezoneOffsetInSeconds: number
): string => {
  const utcMillis = dt * 1000;
  const localMillis = utcMillis + timezoneOffsetInSeconds * 1000;
  const localDate = new Date(localMillis);

  const day = String(localDate.getUTCDate()).padStart(2, "0");
  const month = String(localDate.getUTCMonth() + 1).padStart(2, "0");
  const year = localDate.getUTCFullYear();

  let hours = localDate.getUTCHours();
  const minutes = String(localDate.getUTCMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;
  const hourStr = String(hours).padStart(2, "0");

  return `${day}-${month}-${year} ${hourStr}:${minutes}${ampm}`;
};

export const kelvinToCelsius = (temperature: number): number => {
  return Math.round(temperature - 273.15);
};

export const getSearchHistory = (): WeatherData[] => {
  const historyData = localStorage.getItem(STORAGE_KEY);
  return historyData ? JSON.parse(historyData) : [];
};

export const saveSearchHistory = (newData: WeatherData) => {
  const historyData = getSearchHistory();

  const updatedHistory = [newData, ...historyData];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
};

export const deleteHistoryItem = (id: string) => {
  const historyData = getSearchHistory();

  const updatedHistory = historyData?.filter((item) => item?.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
};

export const mapErrorMessage = (errorCode: number): string => {
  let errorMessage = "";
  switch (errorCode) {
    case HttpStatusCode.UNAUTHORIZED:
    case HttpStatusCode.BAD_REQUEST:
    case HttpStatusCode.INTERNAL_SERVER_ERROR:
      errorMessage = "Something went wrong, please try again";
      break;
    case HttpStatusCode.NOT_FOUND:
    default:
      errorMessage = "City not found. Please enter a valid city";
  }
  return errorMessage;
};
