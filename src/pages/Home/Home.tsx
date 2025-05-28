import { useEffect, useRef, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import { useFetchWeather } from "../../hooks/useFetchWeather";
import "./Home.css";
import type { WeatherData } from "../../types/weatherType";
import { deleteHistoryItem, getSearchHistory } from "../../utils/utils";

const Home = () => {
  const { fetchWeather, weatherData, isLoading, error, errorMessage } =
    useFetchWeather();
  const [historyData, setHistoryData] = useState<WeatherData[]>(
    getSearchHistory()
  );
  const searchOnStart = useRef(false);

  const syncHistory = () => setHistoryData(getSearchHistory());

  useEffect(() => {
    syncHistory();
  }, [weatherData]);

  useEffect(() => {
    if (searchOnStart.current) return;
    searchOnStart.current = true;

    syncHistory();
    if (historyData?.length > 0) {
      fetchWeather(historyData?.[0]?.city);
    }
  }, []);

  const handleSearch = (city: string) => {
    fetchWeather(city);
  };

  const handleDelete = (id: string) => {
    deleteHistoryItem(id);
    setHistoryData(getSearchHistory());
  };

  return (
    <div className="home-cont">
      <SearchBar
        onSearch={handleSearch}
        placeholderText={"Country"}
        isError={error}
        errorMessage={errorMessage}
        isLoading={isLoading}
      />
      {
        <WeatherCard
          weatherData={weatherData}
          historyData={historyData || []}
          onSearch={handleSearch}
          onDelete={handleDelete}
        />
      }
    </div>
  );
};

export default Home;
