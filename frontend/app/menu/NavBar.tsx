"use client"
import React, { useState, useEffect } from "react";
import { StatusBar, Style } from '@capacitor/status-bar';

interface Props {
  searchBarOpen: boolean;
  setSearchBarOpen: (searchBarOpen: boolean) => void;
  setSearchQuery: (query: string) => void;
}

const NavBar = ({ searchBarOpen, setSearchBarOpen, setSearchQuery }: Props) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const setupStatusBar = async () => {
      try {
        await StatusBar.setOverlaysWebView({ overlay: true });
        await StatusBar.setBackgroundColor({ color: '#FFFFFF' });
        await StatusBar.setStyle({ style: Style.Light});
        
      } catch (error) {
        console.log('Status bar setup error:', error);
      }
    };

    setupStatusBar();
  }, []);

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setSearchQuery(value);
  };

  return (
    <div className="flex flex-row items-center bg-white">
      <div className="h-[60px] w-full bg-white fixed top-0 left-0 z-50" />
      
      <div className="flex flex-row items-center pt-[60px] pb-[15px] bg-white md:px-[140px] lg:pl-0 w-full">
        <div className="lg:pl-[140px] px-[20px] lg:max-w-[1880px] w-full h-[36px] items-center flex justify-between order-1 md:order-2">
          <div className="lg:hidden form-control relative">
            <input
              type="text"
              placeholder="Search"
              className="input h-[36px] font-red-hat rounded-full w-full px-10 mr-[15px]"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <img 
              src="/search_icon.svg" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              alt="Search"
            />
          </div>

          {/* only viewable for smaller screens */}
          <div className="md:hidden flex flex-row gap-x-[15px] flex-shrink-0">
            <button className="flex items-center justify-center">
              <img src="/filter_icon.svg" alt="Filter" />
            </button>

            <button className="md:hidden flex items-center justify-center">
              <img src="/favorite_icon.svg" alt="Favorites" />
            </button>
          </div>

          {/* container for aggie menu logo and favorites + profile icon */}
          <div className="hidden lg:flex w-full flex flex-row justify-between items-center">
            <img
              src="/aggiemenus2.svg"
              alt="Aggie Menus"
            />

            <div className="flex flex-row items-center justify-center gap-x-[30px]">
              <div>
                <button className="flex flex-row gap-x-[5px]">
                  <img className="" src="/favorite_icon.svg" alt="Favorites" />
                  <p className="text-primary font-red-hat text-base font-medium">Favorites</p>
                </button>
              </div>

              <div>
                <button className="flex flex-row gap-x-[5px]">
                  <img className="" src="/profile_icon.svg" alt="Profile" />
                  <p className="text-primary font-red-hat text-base font-medium">What&apos;s cooking, (NAME)</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;