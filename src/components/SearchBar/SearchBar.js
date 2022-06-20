import React from 'react'
import "./SearchBar.css"
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({data}) {
    return(
        <div className={"search"}>
            <input placeholder="Search..." type="text" className={'searchBar'}/>
            <div className="searchIcon">
                <SearchIcon />
            </div>
        </div>
    );
}

export default SearchBar;