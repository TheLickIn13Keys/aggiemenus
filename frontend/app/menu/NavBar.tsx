"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

const NavBar = () => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 p-5">
      <div className="navbar-start invisible" />
      <div className="navbar-center">
        {/* Display Davis Menus logo if search button is not clicked */}
        <Link
          className={`btn btn-ghost text-4xl ${searchBarOpen ? "hidden" : ""}`}
          href="/"
        >
          Davis Menus
        </Link>
        {/* Display full search bar if search button is not clicked */}
        <div className={`form-control ${!searchBarOpen ? "hidden" : ""}`}>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-[800px]"
          />
        </div>
      </div>
      <div className="navbar-end">
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
