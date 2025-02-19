"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoChevronBackOutline } from "react-icons/io5";
import { useFavoritesStore, FavoriteItem } from "../util/favoritesStore";
import FoodItem from "../../api/foodItemSchema";

interface EnhancedFavoriteItem extends FavoriteItem {
    dcs?: string[];
    availableMeals?: string[];
    availableSections?: string[];
    isAvailable?: boolean;
}

const MobileFavoritesPage = () => {
    const { favorites, toggleFavorite, initializeFavorites } =
        useFavoritesStore();
    const [activeTab, setActiveTab] = useState<"available" | "all">(
        "available"
    );
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [favoritesToDisplay, setFavoritesToDisplay] = useState<
        EnhancedFavoriteItem[]
    >([]);

    useEffect(() => {
        initializeFavorites();
    }, []);

    useEffect(() => {
        const fetchCurrentMenu = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SCRAPER_API_URL}/api/menu`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data from the backend");
                }

                const data = await response.json();
                // Flatten all menu items into a single array
                const allItems = Object.values(data).flat() as FoodItem[];
                setFoodItems(allItems);
            } catch (error) {
                console.error("Error fetching menu data:", error);
                setFoodItems([]);
            }
        };

        fetchCurrentMenu();
    }, []); // Only fetch once when component mounts

    useEffect(() => {
        setFavoritesToDisplay(
            activeTab === "available" ? getAvailableFavorites() : favorites
        );
    }, [activeTab, favorites, foodItems]);

    const getAvailableFavorites = () => {
        return favorites
            .map((favorite) => {
                // Find all instances of this item across all DCs
                const matchingItems = foodItems.filter(
                    (foodItem) => foodItem.common_items.name === favorite.name
                );

                const dcOrder = ["Segundo", "Tercero", "Cuarto", "Latitude"];
                const servingDCs = Array.from(
                    new Set(matchingItems.map((item) => item.dc))
                ).sort((a, b) => dcOrder.indexOf(a) - dcOrder.indexOf(b));

                // Get unique meals and sections
                const meals = Array.from(
                    new Set(matchingItems.map((item) => item.meal))
                );
                const sections = Array.from(
                    new Set(matchingItems.map((item) => item.section))
                );

                return {
                    ...favorite,
                    dcs: servingDCs,
                    availableMeals: meals,
                    availableSections: sections,
                    isAvailable: matchingItems.length > 0,
                };
            })
            .filter((item) => item.isAvailable);
    };

    return (
        <div className="flex flex-col bg-[#3C3D9ED]">
            {/* header */}
            <div className="flex flex-row items-center bg-white w-full h-32">
                <Link href="/menu" className="absolute ml-4">
                    <button className="flex flex-row items-center">
                        <IoChevronBackOutline
                            size={20}
                            className="text-primary hover:text-opacity-80"
                        />
                    </button>
                </Link>
                <h4 className="w-full text-center text-primary font-semibold">
                    Favorited Items
                </h4>
            </div>

            {/* list of favorites component */}
            <div className="px-[40px] border-b border-[#C3D9ED] flex justify-center">
                <div className="flex gap-x-28 font-red-hat text-textDarkBlue text-[14px] font-bold justify-center">
                    <button
                        onClick={() => setActiveTab("available")}
                        className={`pt-[20px] pb-[20px] ${
                            activeTab === "available"
                                ? "pt-[20px] pb-[20px] text-primary border-b-2 border-primary"
                                : ""
                        }`}
                    >
                        Offered this week
                    </button>
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`pt-[20px] pb-[20px] ${
                            activeTab === "all"
                                ? "pt-[20px] pb-[20px] text-primary border-b-2 border-primary"
                                : ""
                        }`}
                    >
                        All favorited items
                    </button>
                </div>
            </div>

            {/* favorited food cards */}
            <div className="px-4 py-6">
                <div className="flex flex-col gap-y-4">
                    {favoritesToDisplay.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-md p-[20px] items-center"
                        >
                            <div className="flex flex-row items-center justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-sm font-bold text-textDarkBlue">
                                            {item.name}
                                        </h4>
                                    </div>
                                    <div className="flex gap-2 text-sm text-[#8B8B8B] mt-1">
                                        {activeTab === "available" && (
                                            <>
                                                <span className="text-[11px] font-medium font-red-hat">
                                                    {item.dcs?.join(", ") ||
                                                        "No DC Info"}
                                                </span>
                                                <span>•</span>
                                            </>
                                        )}
                                        <span className="text-[11px] font-medium font-red-hat">
                                            {item.availableMeals?.[0] ||
                                                item.meal ||
                                                "Unknown Meal"}
                                        </span>
                                        <span>•</span>
                                        <span className="text-[11px] text-[#8B8B8B] font-medium font-red-hat">
                                            {item.availableSections?.[0] ||
                                                item.section}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleFavorite(item)}
                                    className="flex items-center justify-center bg-[#F1F7F7] rounded-full w-[30px] h-[30px]"
                                >
                                    <img
                                        src="/filled_heart_icon.svg"
                                        className="transition-transform duration-300 hover:scale-110"
                                    />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Show message if no favorites */}
                    {favoritesToDisplay.length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                            No favorited items available
                        </div>
                    )}
                </div>
            </div>

            {/* Show message if no favorites */}
            {favorites.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                    No favorited items available this week
                </div>
            )}
        </div>
    );
};

export default MobileFavoritesPage;
