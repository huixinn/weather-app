import { IconButton } from "@mui/material";
import SearchIcon from "../../assets/icons/search.png";
import DeleteIcon from "../../assets/icons/delete.png";

import type { WeatherData } from "../../types/weatherType";
import { deleteHistoryItem } from "../../utils/utils";

export interface HistoryRowProps {
  historyData: WeatherData;
  onSearch?: (country: string) => void;
  onDelete?: (id: string) => void;
}

const HistoryRow: React.FC<HistoryRowProps> = ({ historyData }) => {
  const handleDelete = () => {
    deleteHistoryItem(historyData?.id);
  };

  return (
    <div className="history-row">
      {historyData && (
        <>
          <div>
            {historyData?.city}, {historyData?.countryCode}
          </div>
          <div className="history-details">
            <div>{historyData?.dateTime}</div>
            <div className="history-buttons">
              <IconButton
                onClick={() => console.log("search history")}
                sx={{
                  bgcolor: "white",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                  },
                }}
                aria-label="search"
                size="large"
              >
                <img
                  src={SearchIcon}
                  alt="search icon"
                  style={{
                    width: 20,
                    height: 20,
                    objectFit: "contain",
                    opacity: "50%",
                  }}
                />
              </IconButton>
              <IconButton
                onClick={handleDelete}
                sx={{
                  bgcolor: "white",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                  },
                }}
                aria-label="search"
                size="large"
              >
                <img
                  src={DeleteIcon}
                  alt="search icon"
                  style={{
                    width: 20,
                    height: 20,
                    objectFit: "contain",
                    opacity: "50%",
                  }}
                />
              </IconButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryRow;
