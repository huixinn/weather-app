import type { WeatherData } from "../../types/weatherType";
import HistoryCard from "../HistoryCard/HistoryCard";
import "./WeatherCard.css";
import SunImg from "../../assets/sun.png";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
export interface WeatherCardProps {
  weatherData: WeatherData | null;
  historyData?: WeatherData[];
  onSearch: (country: string) => void;
  onDelete: (id: string) => void;
}

const WeatherCard = ({
  weatherData,
  historyData,
  onSearch,
  onDelete,
}: WeatherCardProps) => {
  const renderWeatherIcon = () => {
    return <img className="weather-icon" src={SunImg} />;
  };

  const renderDefaultContent = () => {
    return (
      <div className="default-content">
        <WbSunnyIcon sx={{ fontSize: 50 }} />
        <p>Ready to explore!</p>
        <div>Search for a city to get started</div>
      </div>
    );
  };

  const renderWeatherContent = () => {
    return (
      <div className="weather-grid">
        <div className="row-item col-item temperature-title">
          {weatherData?.temperature}°
        </div>
        <div className="row-item col-item">
          H: {weatherData?.maxTemp}° L: {weatherData?.minTemp}°
        </div>
        <div className="col-item country-title">
          {weatherData?.city}, {weatherData?.countryCode}
        </div>
        <div className="col-item">{weatherData?.localDateTime}</div>
        <div className="col-item">Humidity: {weatherData?.humidity}%</div>
        <div className="col-item">{weatherData?.weatherDesc}</div>
      </div>
    );
  };

  return (
    <div className="weather-card-wrapper">
      {renderWeatherIcon()}
      <div className="weather-card">
        <div className="title">Today's weather</div>
        {weatherData ? renderWeatherContent() : renderDefaultContent()}
        <HistoryCard
          historyData={historyData}
          onSearch={onSearch}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default WeatherCard;
