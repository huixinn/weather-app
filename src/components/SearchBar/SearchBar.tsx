import { useState } from "react";
import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholderText?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholderText = "Country",
}) => {
  const [searchString, setSearchString] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    if (!searchString) return;
    onSearch(searchString);
    setSearchString("");
  };

  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        value={searchString}
        placeholder={placeholderText}
        onChange={(e) => setSearchString(e.target.value)}
        onFocus={() => setIsFocused(true)}
      />
      <button className="search-button" onClick={handleSearch}>
        <SearchIcon style={{ fontSize: "34px" }} />
      </button>
    </div>
  );
};

export default SearchBar;
