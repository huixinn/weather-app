import type { WeatherData } from "../../types/weatherType";
import HistoryCard from "../HistoryCard/HistoryCard";
import "./WeatherCard.css";
import SunImg from "../../assets/sun.png";

export interface WeatherCardProps {
  weatherData: WeatherData | null;
  historyData?: WeatherData[];
}

const WeatherCard = ({ weatherData, historyData }: WeatherCardProps) => {
  const renderWeatherIcon = () => {
    return <img className="weather-icon" src={SunImg} />;
  };

  const renderDefaultContent = () => {
    return (
      <div className="default-content">
        <div className="title">-</div>
      </div>
    );
  };

  const renderWeatherContent = () => {
    return (
      <div className="custom-grid">
        <div className="row-item col-item temperature-content">
          {weatherData?.temperature}°
        </div>
        <div className="row-item col-item">
          H: {weatherData?.maxTemp}° L: {weatherData?.minTemp}°
        </div>
        <div className="col-item country-title">
          {weatherData?.city}, {weatherData?.countryCode}
        </div>
        <div className="col-item">{weatherData?.dateTime}</div>
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
        <HistoryCard historyData={historyData} />
      </div>
    </div>
  );
};

export default WeatherCard;
