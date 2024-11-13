"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { redirect } from "next/navigation";

interface Props {
  searchBarOpen: boolean;
  setSearchBarOpen: (searchBarOpen: boolean) => void;
}

const NavBar = ({ searchBarOpen, setSearchBarOpen }: Props) => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center sm:py-12 py-8 bg-white">
      <div className="w-full flex justify-end px-4 mb-4">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-60"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <Image
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
