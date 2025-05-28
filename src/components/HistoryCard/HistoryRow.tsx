import SearchIcon from "../../assets/icons/search.png";
import DeleteIcon from "../../assets/icons/delete.png";

import type { WeatherData } from "../../types/weatherType";
import "../HistoryCard/HistoryCard.css";

export interface HistoryRowProps {
  historyData: WeatherData;
  onSearch: (country: string) => void;
  onDelete: (id: string) => void;
}

const HistoryRow: React.FC<HistoryRowProps> = ({
  historyData,
  onSearch,
  onDelete,
}) => {
  return (
    <div className="history-row">
      <div className="history-details">
        <div className="city-title">
          {historyData?.city}, {historyData?.countryCode}
        </div>
        <div className="date-time">
          <div>{historyData?.currentDateTime}</div>
        </div>
      </div>
      <div className="history-buttons">
        <div className="history-button-group">
          <button
            className="button-icon"
            onClick={() => onSearch(historyData?.city)}
            aria-label="search"
          >
            <img src={SearchIcon} alt="search icon" className="icon-img" />
          </button>

          <button
            className="button-icon"
            onClick={() => onDelete(historyData?.id)}
            aria-label="delete"
          >
            <img src={DeleteIcon} alt="delete icon" className="icon-img" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryRow;
