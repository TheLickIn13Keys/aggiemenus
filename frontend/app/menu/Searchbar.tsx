"use client";
import React, { useState } from "react";

interface Props {
  searchBarOpen: boolean;
  setSearchBarOpen: (searchBarOpen: boolean) => void;
  setSearchQuery: (query: string) => void;
}

const SearchBar = ({ searchBarOpen, setSearchBarOpen, setSearchQuery }: Props) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setSearchQuery(value); // Update parent's searchQuery immediately
  };

  return (
        <div className="form-control relative hidden lg:flex lg:w-[492px] ml-[40px]">
          <input
            type="text"
            placeholder="Search"
            className="input h-[36px] font-red-hat rounded-full w-full px-10 mr-[15px]"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <img src="/search_icon.svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
        </div>
  );
};

export default SearchBar;