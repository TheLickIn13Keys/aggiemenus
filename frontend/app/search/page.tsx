"use client";

import React, { useState, useEffect } from "react";

import Footer from "../menu/Footer";
import Head from "next/head";
import NavBar from "../menu/NavBar";
// Import your FoodItemCard component
import FoodItemCard from "../menu/FoodItemCard"; // adjust the path as needed
import FoodItem from "../api/foodItemSchema";

export default function SearchPage() {
    // Local state for toggles / filters:
    const [searchBarOpen, setSearchBarOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Define types for our data
    type DiningCommons = "Tercero" | "Cuarto" | "Latitude" | "Segundo";
    type MealType = "Breakfast" | "Lunch" | "Dinner";

    const DINING_COMMONS: DiningCommons[] = [
        "Tercero",
        "Cuarto",
        "Latitude",
        "Segundo",
    ];
    const MEAL_TYPES: MealType[] = ["Breakfast", "Lunch", "Dinner"];

    // Example state for DC selections and Meals:
    const [selectedDCs, setSelectedDCs] = useState<DiningCommons[]>([
        "Segundo",
    ]);
    const [selectedMeals, setSelectedMeals] = useState<MealType[]>([
        "Breakfast",
        "Lunch",
        "Dinner",
    ]);
    // A new state for day selection (for the API call)
    const selectedDay = 2; // Using a constant since we're not changing it

    // Example dietary restrictions
    const [dietaryRestrictions, setDietaryRestrictions] = useState({
        vegetarian: false,
        pescetarian: false,
        vegan: false,
        dairyFree: false,
        glutenFree: false,
    });

    // Example food allergies
    const [foodAllergies, setFoodAllergies] = useState({
        milk: false,
        eggs: false,
        fish: false,
        shellfish: false,
        treeNuts: false,
        peanuts: false,
        wheat: false,
        soybeans: false,
        sesame: false,
    });

    // For "Recently searched" and "Trying searching for..."
    // In reality, these might come from localStorage or an API
    const [recentSearches] = useState([
        "Tomato soup",
        "Tomato omelet",
        "Tomato salad",
    ]);
    const [suggestedSearches] = useState([
        "Tomato soup with tomato",
        "Tomato omelet with no tomato",
        "Tomato salad no tomato",
    ]);

    // New state for fetched food items and loading/error flags
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Handlers for toggling selections:
    const toggleDC = (dc: DiningCommons) => {
        setSelectedDCs((prev) =>
            prev.includes(dc) ? prev.filter((d) => d !== dc) : [...prev, dc]
        );
    };

    const toggleMeal = (meal: MealType) => {
        setSelectedMeals((prev) =>
            prev.includes(meal)
                ? prev.filter((m) => m !== meal)
                : [...prev, meal]
        );
    };

    const toggleDietary = (key: keyof typeof dietaryRestrictions) => {
        setDietaryRestrictions((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const toggleAllergy = (key: keyof typeof foodAllergies) => {
        setFoodAllergies((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    // URL for your backend API. Adjust the host/port as needed.
    const API_BASE_URL = "http://localhost:8000";

    // Fetch menu items based on the current filter selections.
    // Here we loop over each selected DC and Meal (using the selected day)
    // and combine all the results.
    useEffect(() => {
        async function fetchMenuItems() {
            setLoading(true);
            setError(null);
            try {
                // Create an array of fetch promises for each (dc, meal) combo.
                const promises: Promise<FoodItem[]>[] = [];
                selectedDCs.forEach((dc) => {
                    selectedMeals.forEach((meal) => {
                        const url = `${API_BASE_URL}/api/menu?dc=${encodeURIComponent(
                            dc
                        )}&day=${selectedDay}&meal=${encodeURIComponent(meal)}`;
                        promises.push(
                            fetch(url).then((res) => {
                                if (!res.ok) {
                                    throw new Error(
                                        `Error fetching ${dc} - ${meal}`
                                    );
                                }
                                return res.json();
                            })
                        );
                    });
                });
                const results = await Promise.all(promises);
                // results is an array of arrays; flatten them into one array:
                const combinedItems = results.flat();
                setFoodItems(combinedItems);
            } catch (err: unknown) {
                console.error("Error fetching menu items:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to fetch items."
                );
            } finally {
                setLoading(false);
            }
        }
        fetchMenuItems();
    }, [selectedDCs, selectedMeals, selectedDay]);

    // Filter the fetched items by the search query (case-insensitive)
    const filteredItems = foodItems.filter((item) =>
        item.common_items.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div
            className={`flex flex-col min-h-screen bg-[#F1F7F7] ${
                !searchBarOpen ? "animate-fade-in" : "animate-fade-out"
            }`}
        >
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
                />
                <meta
                    name="description"
                    content="description of your project"
                />
                <meta name="theme-color" content="#000" />
                <title>Aggiemenus</title>
                <link rel="manifest" href="../manifest.json" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/cowlogo.png" />
            </Head>

            {/* Reuse your existing NavBar at the top */}
            <header>
                <NavBar
                    searchBarOpen={searchBarOpen}
                    setSearchBarOpen={setSearchBarOpen}
                    setSearchQuery={setSearchQuery}
                    isFilterOpen={isFilterOpen}
                    setIsFilterOpen={setIsFilterOpen}
                />
            </header>

            {/* MAIN CONTENT - with centered container */}
            <main className="flex-grow">
                <div className="flex flex-col lg:flex-row w-full">
                    <div className="w-full lg:flex-1 lg:flex lg:flex-row">
                        <div className="px-[20px] py-[15px] md:px-[140px] lg:pr-0 lg:w-[1450px] max-w-[1450px] mx-auto">
                            {/* Large Search Bar */}
                            <div className="mb-6">
                                <div className="relative max-w-[600px]">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="w-full h-[50px] pl-10 pr-4 rounded-full border-2 border-[#E5EDF0] focus:outline-none bg-white"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                    />
                                    {/* Search icon inside input */}
                                    <img
                                        src="/search_icon.svg"
                                        alt="Search"
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                    />
                                </div>
                            </div>

                            {/* DC Chips */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {DINING_COMMONS.map((dc) => (
                                    <button
                                        key={dc}
                                        onClick={() =>
                                            toggleDC(dc as DiningCommons)
                                        }
                                        className={`px-4 py-2 rounded-full border-2 ${
                                            selectedDCs.includes(dc)
                                                ? "bg-primary text-white border-primary"
                                                : "border-[#E5EDF0] bg-white text-gray-700"
                                        }`}
                                    >
                                        {dc}
                                    </button>
                                ))}
                            </div>

                            {/* Meal Chips */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {MEAL_TYPES.map((meal) => (
                                    <button
                                        key={meal}
                                        onClick={() =>
                                            toggleMeal(meal as MealType)
                                        }
                                        className={`px-4 py-2 rounded-full border-2 ${
                                            selectedMeals.includes(meal)
                                                ? "bg-primary text-white border-primary"
                                                : "border-[#E5EDF0] bg-white text-gray-700"
                                        }`}
                                    >
                                        {meal}
                                    </button>
                                ))}
                            </div>

                            {/* Filter Section: Dietary restrictions & Food allergies */}
                            <div className="bg-white p-6 rounded-md shadow-sm mb-8">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Dietary Restrictions */}
                                    <div>
                                        <h3 className="text-primary font-bold mb-4">
                                            Dietary restrictions
                                        </h3>
                                        <div className="grid grid-cols-2 gap-y-3 text-primary font-medium">
                                            {Object.entries(
                                                dietaryRestrictions
                                            ).map(([key, value]) => (
                                                <label
                                                    key={key}
                                                    className="flex items-center gap-2 cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={value}
                                                        onChange={() =>
                                                            toggleDietary(
                                                                key as keyof typeof dietaryRestrictions
                                                            )
                                                        }
                                                        className="accent-primary"
                                                    />
                                                    <span className="capitalize">
                                                        {key}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Food Allergies */}
                                    <div>
                                        <h3 className="text-primary font-bold mb-4">
                                            Food allergies
                                        </h3>
                                        <div className="grid grid-cols-2 gap-y-3 text-primary font-medium">
                                            {Object.entries(foodAllergies).map(
                                                ([key, value]) => (
                                                    <label
                                                        key={key}
                                                        className="flex items-center gap-2 cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={value}
                                                            onChange={() =>
                                                                toggleAllergy(
                                                                    key as keyof typeof foodAllergies
                                                                )
                                                            }
                                                            className="accent-primary"
                                                        />
                                                        <span className="capitalize">
                                                            {key}
                                                        </span>
                                                    </label>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* NEW: Search Results Section */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold mb-4">
                                    Search Results
                                </h2>
                                {loading && <div>Loading...</div>}
                                {error && (
                                    <div className="text-red-600">
                                        Error: {error}. Please try again.
                                    </div>
                                )}
                                {!loading && filteredItems.length === 0 && (
                                    <div>No results found.</div>
                                )}
                                {/* Display each food item using FoodItemCard */}
                                <div className="flex flex-col gap-4">
                                    {filteredItems.map((item, index) => (
                                        <FoodItemCard
                                            key={item.id}
                                            foodItem={item}
                                            index={index.toString()}
                                            view="default"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Bottom: Recently searched & Trying searching for... */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Recently searched */}
                                <div className="bg-[#DAE9EC] p-5 rounded-md">
                                    <h4 className="font-bold text-textDarkBlue mb-3">
                                        Recently searched
                                    </h4>
                                    <ul className="space-y-2">
                                        {recentSearches.map((item, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-center text-gray-700"
                                            >
                                                <img
                                                    src="/refresh_icon.svg"
                                                    alt="history"
                                                    className="w-5 h-5 mr-2"
                                                />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Trying searching for... */}
                                <div className="bg-[#DAE9EC] p-5 rounded-md">
                                    <h4 className="font-bold text-textDarkBlue mb-3">
                                        Trying searching for...
                                    </h4>
                                    <ul className="space-y-2">
                                        {suggestedSearches.map((sug, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-center text-gray-700 cursor-pointer"
                                            >
                                                <img
                                                    src="/search_icon.svg"
                                                    alt="search"
                                                    className="w-5 h-5 mr-2"
                                                />
                                                {sug}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* FOOTER */}
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
