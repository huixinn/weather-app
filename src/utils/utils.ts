import type { WeatherData } from "../types/weatherType";
import { format } from "date-fns";

const STORAGE_KEY = "weather_search_history";

export const getFormattedDateTime = (): string => {
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
  console.log("hx deletehistoryitem", updatedHistory);
};
