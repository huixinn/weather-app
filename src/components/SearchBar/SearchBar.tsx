import { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholderText?: string;
  isError?: boolean;
  errorMessage?: string;
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholderText = "Country",
  isError = false,
  errorMessage = "",
  isLoading = false,
}) => {
  const [searchString, setSearchString] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleSearch = () => {
    if (!searchString) {
      setShowError(true);
      setErrorText("Please enter a valid city");
      return;
    }
    onSearch(searchString);
    setSearchString("");
    setShowError(false);
    setErrorText("");
  };

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <div className="search-input-wrapper">
          <input
            className="search-input"
            type="text"
            value={searchString}
            placeholder={placeholderText}
            onChange={(e) => setSearchString(e.target.value)}
          />
          {isLoading && (
            <div className="input-spinner">
              <CircularProgress color="inherit" size="1.5rem" />
            </div>
          )}
        </div>

        <button className="search-button" onClick={handleSearch}>
          <SearchIcon style={{ fontSize: "34px" }} />
        </button>
      </div>
      {(showError || isError) && (
        <div className="search-desc">{errorText || errorMessage}</div>
      )}
    </div>
  );
};

export default SearchBar;
