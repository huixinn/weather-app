import type { WeatherData } from "../../types/weatherType";
import HistoryRow from "./HistoryRow";
import "./HistoryCard.css";

export interface HistoryCardProps {
  historyData?: WeatherData[];
  onSearch: (country: string) => void;
  onDelete: (id: string) => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  historyData,
  onSearch,
  onDelete,
}) => {
  const renderEmptyHistory = () => {
    return (
      <div className="empty-content-desc">
        <p>No recent searches yet</p>
        <div>Start typing to explore the weather anywhere in the world</div>
      </div>
    );
  };
  return (
    <div className="history-wrapper">
      <div>Search History</div>
      {!historyData || (historyData?.length === 0 && renderEmptyHistory())}
      <div className="history-row-wrapper">
        {historyData?.map((item, index) => (
          <HistoryRow
            key={index}
            historyData={item}
            onSearch={onSearch}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryCard;
