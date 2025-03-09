"use client";
import React, { useState, useEffect } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";
import FavoritesButton from "../favorites/desktop/FavoritesPage";
import MobileFavoritesButton from "../favorites/mobile/MobileFavoritesButton";
import Dropdown from "./campus-dc_dropdown";
import Image from "next/image";

interface Props {
    searchBarOpen: boolean;
    setSearchBarOpen: (isOpen: boolean) => void;
    setSearchQuery: (query: string) => void;
    isFilterOpen: boolean;
    setIsFilterOpen: (isOpen: boolean) => void;
}

const NavBar = ({
    searchBarOpen,
    setSearchBarOpen,
    setSearchQuery,
    isFilterOpen,
    setIsFilterOpen,
}: Props) => { 
    const [query, setQuery] = useState("");

    useEffect(() => {
        const setupStatusBar = async () => {
            try {
                await StatusBar.setOverlaysWebView({ overlay: true });
                await StatusBar.setBackgroundColor({ color: "#FFFFFF" });
                await StatusBar.setStyle({ style: Style.Light });
            } catch (error) {
                console.log("Status bar setup error:", error);
            }
        };

        setupStatusBar();
    }, []);

    const handleSearchChange = (value: string) => {
        setQuery(value);
        setSearchQuery(value); // Update parent's searchQuery immediately
    };
    
    return (
        <div className="flex flex-row items-center bg-white">
            <div className="flex flex-row items-center pt-[60px] pb-[15px] md:px-[140px] lg:pl-0 w-full">
                <div className="lg:pl-[140px] px-[20px] lg:max-w-[1880px] w-full h-[36px] items-center flex justify-between order-1 md:order-2">
                    {/* Mobile/Tablet row: search bar, filter, favorites (visible up to lg) */}
                    <div className="lg:hidden justify-between flex flex-row items-center gap-x-[15px] w-full">
                        {/* Search bar */}
                        <div className="relative flex-1 hidden md:block">
                            <input
                                type="text"
                                placeholder="Search"
                                className="input h-[36px] font-red-hat rounded-full w-full px-10"
                                value={query}
                                onChange={(e) =>
                                    handleSearchChange(e.target.value)
                                }
                            />
                            <Image
                                src="/search_icon.svg"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                alt="Search"
                                width={18}
                                height={18}
                            />
                        </div>

                        <div className="md:hidden">
                            <Dropdown/>
                        </div>


                        {/* only viewable for smaller screens */}
                        <div className="lg:hidden flex flex-row gap-x-[15px] flex-shrink-0 ">

                            {/* Implement functionality for search button */}
                            <button className="flex items-center justify-center bg-[#F4F4F4] rounded-full w-[40px] h-[40px]">
                                <Image
                                    src="/search_icon.svg"
                                    className=""
                                    alt="Search"
                                    width={18}
                                    height={18}
                                />
                            </button>

                            <button
                                className="flex items-center justify-center bg-[#F4F4F4] rounded-full w-[40px] h-[40px]"
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                <img src="/filter_icon.svg" alt="Filter" />
                            </button>

                            {/* Favorites button (mobile) */}
                            <div className="bg-[#F4F4F4] rounded-full flex items-center justify-center w-[40px] h-[40px]">
                                <MobileFavoritesButton />
                            </div>
                        </div>
                    </div>

                    {/* Desktop layout: logo, favorites, profile (visible at lg+) */}
                    <div className="hidden lg:flex w-full flex-row justify-between items-center">
                        <img src="/aggiemenus2.svg" alt="Aggie Menus" />

                        <div className="flex flex-row items-center justify-center gap-x-[30px]">
                            {/* Profile */}
                            <div>
                                <button className="flex flex-row gap-x-[5px]">
                                    <img
                                        src="/profile_icon.svg"
                                        alt="Profile"
                                    />
                                    <p className="text-primary font-red-hat text-base font-medium">
                                        What&apos;s cooking, Aggie?
                                    </p>
                                </button>
                            </div>

                            {/* Desktop Favorites */}
                            <div className="hidden lg:block rounded-full bg-[#cbdeef] border border-[#ecf5f7]">
                                <FavoritesButton />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NavBar;
