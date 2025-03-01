import React, { useState, useEffect } from "react";
import Link from "next/link";
import FoodItem from "../../api/foodItemSchema";
import { useFavoritesStore, FavoriteItem } from "../util/favoritesStore";

// mobile view

// button in navbar; only appears on mobile and takes you to new page
const MobileFavoritesButton = () => {
    return (
        <Link href="/favorites/mobile" className="block lg:hidden">
            <button className="flex flex-row items-center px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                <img
                    className="w-5 h-5"
                    src="/favorite_icon.svg"
                    alt="Favorites"
                />
                <p className="text-primary font-medium"></p>
            </button>
        </Link>
    );
};

// deprecated, no longer gonna be used
const MobileFavoritesPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [activeTab, setActiveTab] = useState<"all" | "available">("all");
    const [currentDay, setCurrentDay] = useState(() => {
        const curDate = new Date(Date.now());
        return (curDate.getDay() - 1 + 7) % 7;
    });
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

    const { favorites, initializeFavorites, toggleFavorite } =
        useFavoritesStore();

    useEffect(() => {
        initializeFavorites();
    }, []);

    const fetchCurrentMenu = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SCRAPER_API_URL}/api/menu`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch data from the backend");
            }

            const allMenuData = await response.json();
            // Store all menu items in a flat array
            setFoodItems(Object.values(allMenuData).flat() as FoodItem[]);
        } catch (error) {
            console.error("Error fetching menu data:", error);
            setFoodItems([]);
        }
    };

    useEffect(() => {
        fetchCurrentMenu();
    }, []); // Only fetch once when component mounts

    const getAvailableFavorites = () => {
        return favorites.filter((favorite) => {
            return foodItems.some(
                (foodItem) => foodItem.common_items.name === favorite.name
                // &&
                // foodItem.dc.toLowerCase() === (favorite.dc?.toLowerCase() ?? "") &&
                // foodItem.meal.toLowerCase() === (favorite.meal?.toLowerCase() ?? "")
            );
        });
    };

    const favoritesToDisplay =
        activeTab === "available" ? getAvailableFavorites() : favorites;

    const groupedFavorites = favoritesToDisplay.reduce((acc, item) => {
        const dc = item.dc || "Other";
        const section = item.section || "Other";

        if (!acc[dc]) {
            acc[dc] = {};
        }
        if (!acc[dc][section]) {
            acc[dc][section] = [];
        }
        acc[dc][section].push(item);
        return acc;
    }, {} as Record<string, Record<string, FavoriteItem[]>>);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setTimeout(() => {
                setIsVisible(true);
            }, 10);
        } else {
            setIsVisible(false);
            setTimeout(() => {
                setShouldRender(false);
            }, 300);
        }
    }, [isOpen]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
            <h1 className="text-2xl mb-4">Hello</h1>
            <Link href="/menu">
                <button className="px-4 py-2 bg-primary text-white rounded-lg">
                    Back to Home
                </button>
            </Link>
        </div>
    );
};

// Export both components
export { MobileFavoritesButton, MobileFavoritesPage };
export default MobileFavoritesButton; // For backward compatibility

