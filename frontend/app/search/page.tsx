"use client";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import SearchFoodItem from "../api/searchFoodItemSchema";
import SearchFoodCard from "./SearchFoodCard";
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import FoodItemCard from "../menu/FoodItemCard";
import { DiVim } from "react-icons/di";
import FoodItemModal from "../menu/FoodItemModal";
import SearchCardModal from "./SearchCardModal";
import Footer from "../menu/Footer";
import { useSearchParams } from 'next/navigation';

const Search = () => {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const [foodItems, setFoodItems] = useState<SearchFoodItem[]>([]);
  const [paginatedCards, setPaginatedCards] = useState<SearchFoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(true);
  const [query, setQuery] = useState(urlQuery);
  const [savedQuery, setSavedQuery] = useState(urlQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState([1]);
  const [totalPages, setTotalPages] = useState(1);

  // Allows us to paginate the food cards
  const cardsPerPage = 12;

  //   Redirect to menu if search bar is closed
  if (!searchBarOpen) redirect("/menu");

  useEffect(() => {
    console.log(pagesArray);
    console.log(totalPages);
  }, [foodItems, currentPage, totalPages]);

  // Saves entered queries and calls submit
  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await submit();
      setSavedQuery(query);
    }
  };

  // Adjust pagination
  const changePagination = (page: number) => {
    setPaginatedCards(
      foodItems.slice(
        (page - 1) * cardsPerPage,
        Math.min(foodItems.length, page * cardsPerPage)
      )
    );
  };

  // Fetches food items that match query on enter
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

      // Reactively calculates total number of pages
      const pages = Math.ceil(items.length / cardsPerPage);
      setTotalPages(pages);
      setPagesArray(Array.from({ length: pages }, (_, i) => i + 1));
      setPaginatedCards(items.slice(0, Math.min(items.length, cardsPerPage)));
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

  // Submit the initial query when component mounts if URL has a query
  useEffect(() => {
    if (urlQuery) {
      submit();
    }
  }, []);

  return (
    <div className="animate-fade-in flex flex-col min-h-screen">
      <header className="flex flex-col p-10 gap-10">
        <div className="navbar bg-base-100">
          <div className="navbar-start invisible" />
          <div className="navbar-center flex flex-col justify-center items-center">
            {/* Display full search bar if search button is not clicked */}
            <div className={`form-control ${!searchBarOpen ? "hidden" : ""}`}>
              <input
                id="search"
                type="text"
                placeholder="Search"
                className="input input-bordered sm:w-[800px] w-60"
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event)}
              />
            </div>
          </div>
          <div className="navbar-end sm:px-10 pr-0 sm:justify-start justify-center">
            {/* Button to close search bar (and return to the menu page) */}
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => setSearchBarOpen(!searchBarOpen)}
            >
              <IoCloseOutline size="24" />
            </button>
          </div>
        </div>
        <div className="sm:text-3xl text-2xl font-semibold">
          {savedQuery === ""
            ? `Search across all DCs`
            : `Found ${foodItems.length} results for: ${savedQuery}`}
        </div>
      </header>
      <main className="flex flex-col justify-center min-h-full sm:text-left text-center p-14 gap-5">
        {isLoading ? (
          <div className="flex flex-col items-center align-middle justify-center py-60">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="flex flex-col justify-between items-center gap-20">
            <div className="grid sm:grid-cols-4 grid-cols-1 animate-fade-in gap-3 max-h-64">
              {paginatedCards.length > 0 &&
                paginatedCards.map((foodItem, index) => (
                  <div
                    key={foodItem.id}
                    className="flex flex-col justify-center"
                  >
                    {/* Food card / modal to open button */}
                    <label htmlFor={`food_item_${foodItem.section}_${index}`}>
                      <SearchFoodCard foodItem={foodItem} />
                    </label>

                    {/* Modal */}
                    <SearchCardModal
                      foodItem={foodItem}
                      section={foodItem.section}
                      index={index}
                    />
                  </div>
                ))}
              {/* 
                  ----------------------------------------------------------
                  Page switch
                  ----------------------------------------------------------
                  For some reason, pagination bar wouldn't sit right unless
                  it was sitting inside the grid, so it has to span 4 cols 
                  in desktop and 1 in mobile - Sid
                  ----------------------------------------------------------
              */}
              {paginatedCards.length > 0 && (
                <div className="flex flex-row justify-center items-center sm:col-span-4 col-span-1 p-5">
                  <div className="join">
                    {pagesArray.map((pageNum) => (
                      <button
                        key={pageNum}
                        className={`join-item btn ${
                          currentPage === pageNum && "btn-active"
                        }`}
                        onClick={() => {
                          setCurrentPage(pageNum);
                          changePagination(pageNum);
                        }}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      {/* <footer className="fixed bottom-0 left-0 w-full justify-between">
        <Footer />
      </footer> */}
    </div>
  );
};

export default Search;
