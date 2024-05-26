"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { redirect } from "next/navigation";

interface Props {
  searchBarOpen: boolean;
  setSearchBarOpen: (searchBarOpen: boolean) => void;
}

const NavBar = ({ searchBarOpen, setSearchBarOpen }: Props) => {
  if (searchBarOpen) redirect("/search");

  return (
    <div
      className={`flex flex-col ${
        searchBarOpen && "animate-fade-out"
      } justify-center items-center`}
    >
      <div className="navbar bg-base-100">
        <div className="navbar-start invisible" />
        <div className="navbar-center flex flex-col">
          {/* Display full search bar if search button is not clicked */}
          <div className={`form-control ${!searchBarOpen ? "hidden" : ""}`}>
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered sm:w-[800px] w-lg"
            />
          </div>
        </div>
        {/* Search bar icon (commented out until wireframes are complete) */}
        <div className="navbar-end sm:pr-16 pr-0">
          <button
            className="btn btn-ghost btn-circle hidden"
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
      {/* Display Davis Menus logo if search button is not clicked */}
      <div className="flex flex-col justify-center items-center">
        <Image
          src="/aggiemenus.svg"
          alt="Aggie Menus"
          width={200}
          height={200}
          className={`${
            searchBarOpen ? "hidden" : ""
          } items-center justify-center`}
        />
      </div>
    </div>
  );
};

export default NavBar;
