"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

const NavBar = () => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 pt-10">
      <div className="navbar-start invisible" />
      <div className="navbar-center flex items-center justify-center">
        {/* Display Davis Menus logo if search button is not clicked */}
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/navbar.png"
            alt="Aggie Menus"
            width={600}
            height={600}
            className={`${
              searchBarOpen ? "hidden" : ""
            } size-64 items-center justify-center`}
          />
        </div>
        {/* Display full search bar if search button is not clicked */}
        <div className={`form-control ${!searchBarOpen ? "hidden" : ""}`}>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered sm:w-[800px] w-lg"
          />
        </div>
      </div>
      <div className="navbar-end invisible">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setSearchBarOpen(!searchBarOpen)}
        >
          {/* If search bar is closed, display search icon. Otherwise, display 'X' icon */}
          {!searchBarOpen ? (
            <IoIosSearch size="24" />
          ) : (
            <IoCloseOutline size="24" />
          )}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
