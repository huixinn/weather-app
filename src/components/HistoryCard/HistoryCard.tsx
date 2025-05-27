import type { WeatherData } from "../../types/weatherType";
import HistoryRow from "./HistoryRow";
import "./HistoryCard.css";

export interface HistoryCardProps {
  historyData?: WeatherData[];
}

const HistoryCard: React.FC<HistoryCardProps> = ({ historyData }) => {
  return (
    <div className="history-wrapper">
      <div>Search History</div>
      <div className="history-row-wrapper">
        {historyData?.map((item, index) => (
          <HistoryRow historyData={item} />
        ))}
      </div>
    </div>
  );
};

export default HistoryCard;
