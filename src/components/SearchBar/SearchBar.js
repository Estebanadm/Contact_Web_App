import React from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ onChangeText }) {
  return (
    <div className="search">
      <input placeholder="Search..." type="text" className="searchBar" onChange={(text) => onChangeText(text.target.value)} />
      <div className="searchIcon">
        <SearchIcon />
      </div>
    </div>
  );
}

export default SearchBar;
