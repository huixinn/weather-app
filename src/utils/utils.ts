import { HttpStatusCode } from "../apis/types/weatherResponse";
import type { WeatherData } from "../types/weatherType";
import { format } from "date-fns";

const STORAGE_KEY = "weather_search_history";

export const getCurrentDateTime = (): string => {
  return format(new Date(), "dd-MM-yyyy hh:mmaaa").toLowerCase();
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
