import React from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

function SearchBar({ onChangeText,openAddContact }) {
  return (
    <div className="search">
      <div className="searchIcon">
        <div className='searchRow'>
        <input placeholder="Search..." type="text" className="searchBar" onChange={(text) => onChangeText(text.target.value)} />
        </div>
      </div>
      <><button
          className="addIconContainer"
          onClick={() => {
            openAddContact();
          }}
        >
          <AddCircleOutlineOutlinedIcon className="addIcon" />
        </button>
        </>
    </div>
  );
}

export default SearchBar;
