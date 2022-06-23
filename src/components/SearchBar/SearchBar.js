import React from "react";
import "./SearchBar.css";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

function SearchBar({ onChangeText, openAddContact }) {
  return (
    <div className="search">
      <input
        placeholder="Search..."
        type="text"
        className="searchBar"
        onChange={(text) => onChangeText(text.target.value)}
      />
      <>
        <button
          className="addIconContainer"
          onClick={() => {
            openAddContact();
          }}
        >
          <h4 className={"addText"}>Add</h4>
          <AddCircleOutlineOutlinedIcon className="addIcon" />
        </button>
      </>
    </div>
  );
}

export default SearchBar;
