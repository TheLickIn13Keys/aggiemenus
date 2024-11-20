"use client";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import FavoritesButton from "./FavoritesPage";

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
  }
  
  return (
    <div className="flex flex-row  items-center pt-[60px] pb-[15px] bg-white md:px-[140px] lg:pl-0 ">
      <div className="lg:pl-[140px] px-[20px] lg:max-w-[1880px] w-full h-[36px] items-center flex justify-between order-1 md:order-2">
        <div className="lg:hidden form-control relative">
          <input
            type="text"
            placeholder="Search"
            className="input h-[36px] font-red-hat rounded-full w-full px-10 mr-[15px]"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <img src="/search_icon.svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
        </div>

        {/* only viewable for smaller screens */}
        <div className="md:hidden flex flex-row gap-x-[15px] flex-shrink-0">
          <button className="flex items-center justify-center">
                <img src="/filter_icon.svg"></img>
          </button>

          <button className="md:hidden flex items-center justify-center">
                <img src="/favorite_icon.svg"></img>
          </button>
        </div>

        {/* container for aggie menu logo and favorites + profile icon */}
        <div className="hidden lg:flex w-full flex flex-row justify-between items-center">
          <img
          src = "/aggiemenus2.svg"
          />

          <div className="flex flex-row items-center justify-center gap-x-[30px]">

            <div>
              {/* <button className="flex flex-row gap-x-[5px]">
                <img className='' src="/favorite_icon.svg"/>
                <p className="text-primary font-red-hat text-base font-medium">Favorites</p>
              </button> */}
              <FavoritesButton/>
            </div>

            <div>
              <button className="flex flex-row gap-x-[5px]">
                <img className="" src="/profile_icon.svg"/>
                <p className="text-primary font-red-hat text-base font-medium ">What's cooking, (NAME) </p>
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default NavBar;