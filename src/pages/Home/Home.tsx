import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import { useFetchWeather } from "../../hooks/useFetchWeather";
import "./Home.css";
import type { WeatherData } from "../../types/weatherType";
import { getSearchHistory, saveSearchHistory } from "../../utils/utils";

const Home = () => {
  const { weatherData, isLoading, error, fetchWeather } = useFetchWeather();
  const [historyData, setHistoryData] = useState<WeatherData[]>([]);

  useEffect(() => {
    // localStorage.clear();

    const searchHistory = getSearchHistory();
    setHistoryData(searchHistory);
    console.log("hx rerender searchHistory", searchHistory);
  }, [weatherData]);

  const handleSearch = (city: string) => {
    fetchWeather(city);
  };

  return (
    <div className="home-cont">
      <SearchBar onSearch={handleSearch} placeholderText={"Country"} />
      {isLoading && <p>Loading weather data</p>}
      {
        <WeatherCard
          weatherData={weatherData}
          historyData={historyData || []}
        />
      }
    </div>
  );
};

export default Home;
