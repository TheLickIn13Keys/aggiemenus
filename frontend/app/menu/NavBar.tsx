"use client";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

interface Props {
  searchBarOpen: boolean;
  setSearchBarOpen: (searchBarOpen: boolean) => void;
  setSearchQuery: (query: string) => void;
}

const NavBar = ({ searchBarOpen, setSearchBarOpen, setSearchQuery }: Props) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setSearchQuery(value); // Update parent's searchQuery immediately
  };

  return (
    <div className="flex flex-col justify-center items-center sm:py-12 py-8 bg-white">
      <div className="w-full flex justify-end px-4 mb-4">
        <div className="form-control relative">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-60 pr-10"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <IoIosSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      <img
        src="/aggiemenus.svg"
        alt="Aggie Menus"
        width={300}
        height={300}
        className={`${
          // FIX LOGO RESPONSIVENESS AS WEB INCREASES IN SIZE AGAIN
          searchBarOpen ? "hidden" : ""
        } items-center justify-center sm:size-[15%] size-[50%] hidden sm:flex`}
      />
    </div>
  );
};

export default NavBar;