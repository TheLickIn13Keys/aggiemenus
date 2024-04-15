"use client";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import SearchFoodItem from "../api/searchFoodItemSchema";
import SearchFoodCard from "./SearchFoodCard";
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import FoodItemCard from "../menu/FoodItemCard";
import { DiVim } from "react-icons/di";

const Search = () => {
  const [foodItems, setFoodItems] = useState<SearchFoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [savedQuery, setSavedQuery] = useState("");

  //   Redirect to menu if search bar is closed
  if (!searchBarOpen) redirect("/menu");

  useEffect(() => {
    console.log(foodItems);
  }, [foodItems]);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await submit();
      setSavedQuery(query);
    }
  };

  //   Fetches food items that match query on enter
  const submit = async () => {
    setIsLoading(true);
    console.log(query);
    try {
      const res = await fetch("../api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: query }),
      });

      if (!res.ok) {
        throw Error("Network response not ok");
      }

      //   Get food items from response data
      const responseData = await res.json();
      const items = responseData as SearchFoodItem[];

      setFoodItems(items);
      setIsLoading(false);
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        console.log("Fetch error: ", error);
      }
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="navbar bg-base-100 pt-10">
        <div className="navbar-start invisible" />
        <div className="navbar-center flex flex-col">
          {/* Display full search bar if search button is not clicked */}
          <div className={`form-control ${!searchBarOpen ? "hidden" : ""}`}>
            <input
              id="search"
              type="text"
              placeholder="Search"
              className="input input-bordered sm:w-[800px] w-lg"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => handleKeyDown(event)}
            />
          </div>
        </div>
        <div className="navbar-end pr-16">
          {/* Button to close search bar (and return to the menu page) */}
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setSearchBarOpen(!searchBarOpen)}
          >
            <IoCloseOutline size="24" />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-start text-left p-14 gap-5">
        <div className="text-3xl font-semibold">
          {savedQuery === ""
            ? `Search across all DCs`
            : `Found ${foodItems.length} results for: ${savedQuery}`}
        </div>
        {isLoading ? (
          <div className="flex flex-col items-center align-middle justify-center py-60">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-5 animate-fade-in">
            {foodItems.length > 0 &&
              foodItems.map((foodItem, index) => (
                <SearchFoodCard key={index} foodItem={foodItem} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
