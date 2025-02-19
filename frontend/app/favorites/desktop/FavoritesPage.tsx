import React, { useState, useEffect } from "react";
import FoodItem from "../../api/foodItemSchema";
import { useFavoritesStore, FavoriteItem } from "../util/favoritesStore";
import menu_data from "../../../../backend/menu_data.json";

// desktop view
// need to fix so that available now items dont grab from supabase but grab from our menu_data.json in the backend

interface EnhancedFavoriteItem extends FavoriteItem {
    dcs?: string[];
    availableMeals?: string[];
    availableSections?: string[];
    isAvailable?: boolean;
}

const FavoritesButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [activeTab, setActiveTab] = useState<"all" | "available">("all");
    const [currentDay, setCurrentDay] = useState(() => {
        const curDate = new Date(Date.now());
        return (curDate.getDay() - 1 + 7) % 7;
    });
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [favoritesToDisplay, setFavoritesToDisplay] = useState<EnhancedFavoriteItem[]>([]);

    const { favorites, initializeFavorites, toggleFavorite } =
        useFavoritesStore();

    useEffect(() => {
        const storedFavorites = localStorage.getItem(
            "CapacitorStorage.favorites"
        );

        if (!favorites.length && storedFavorites) {
            const parsedFavorites = JSON.parse(storedFavorites);
            initializeFavorites();
            for (const favorite of parsedFavorites) {
                toggleFavorite(favorite);
            }
        }
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
            // Store all menu data for processing
            setFoodItems(Object.values(allMenuData).flat() as FoodItem[]);
        } catch (error) {
            console.error("Error fetching menu data:", error);
            setFoodItems([]);
        }
    };

    useEffect(() => {
        fetchCurrentMenu();
    }, []); // Remove currentDay dependency since we're fetching all data

    const getAvailableFavorites = (): EnhancedFavoriteItem[] => {
        return favorites.map(favorite => {
            // Find all instances of this item across all DCs
            const matchingItems = foodItems.filter(foodItem =>
                foodItem.common_items.name === favorite.name
            );
            
            // Get unique DCs serving this item
            const servingDCs = Array.from(new Set(matchingItems.map(item => item.dc))).sort();
            
            // Get unique meals and sections (taking the first one if multiple exist)
            const meals = Array.from(new Set(matchingItems.map(item => item.meal)));
            const sections = Array.from(new Set(matchingItems.map(item => item.section)));
            
            return {
                ...favorite,
                dcs: servingDCs,
                availableMeals: meals,
                availableSections: sections,
                isAvailable: matchingItems.length > 0
            };
        });
    };

    useEffect(() => {
        setFavoritesToDisplay(activeTab === "available" ? getAvailableFavorites() : favorites);
    }, [activeTab, favorites, foodItems]);

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
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex flex-row items-center gap-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <img
                    className="w-5 h-5"
                    src="/favorite_icon.svg"
                    alt="Favorites"
                />
                <p className="text-primary font-medium">Favorites</p>
            </button>

            {shouldRender && (
                <div
                    className={`fixed inset-0 bg-black transition-opacity duration-300 flex items-end justify-end z-50
                    ${isVisible ? "bg-opacity-50" : "bg-opacity-0"}`}
                >
                    <div
                        className={`bg-[#ECF5F7] h-full w-1/2 flex flex-col transform transition-transform duration-300 ease-out
                        ${isVisible ? "translate-x-0" : "translate-x-full"}`}
                    >
                        <div className="relative min-w-fit">
                            <img
                                src="/favorites-background.png"
                                className="w-full"
                            />
                            <div className="absolute bottom-10 left-10">
                                <h1 className="font-red-hat text-white text-[24px] font-bold">
                                    Favorited Items
                                </h1>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-10 left-10"
                            >
                                <img
                                    className="bg-[#5785B7] rounded-full w-fit p-2"
                                    src="/close_icon.svg"
                                />
                            </button>
                        </div>

                        <div className="px-[40px] border-b border-[#C3D9ED]">
                            <div className="flex gap-x-[30px] font-red-hat text-textDarkBlue text-[14px] font-bold">
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

                        <div className="flex-1 overflow-y-auto">
                            <div className="px-6 pt-6">
                                <div className="grid grid-cols-1 gap-y-[15px] border-b border-[#C3D9ED] pb-[40px] px-[24px]">
                                    {favoritesToDisplay.map((item) => (
                                        <div key={item.id} className="bg-white rounded-md p-[20px] items-center">
                                            <div className="flex flex-row items-center justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="text-sm font-bold text-textDarkBlue">
                                                            {item.name}
                                                        </h4>
                                                    </div>
                                                    <div className="flex gap-2 text-sm text-[#8B8B8B] mt-1">
                                                        <span className="text-[11px] font-medium font-red-hat">
                                                            {item.dcs?.join(', ') || 'No DC Info'}
                                                        </span>
                                                        <span>•</span>
                                                        <span className="text-[11px] font-medium font-red-hat">
                                                            {item.availableMeals?.[0] || item.meal || 'Unknown Meal'}
                                                        </span>
                                                        <span>•</span>
                                                        <span className="text-[11px] text-[#8B8B8B] font-medium font-red-hat">
                                                            {item.availableSections?.[0] || item.section}
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
                                </div>
                                {favoritesToDisplay.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-20">
                                        <p className="text-xl text-gray-500">
                                            No favorites yet
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FavoritesButton;