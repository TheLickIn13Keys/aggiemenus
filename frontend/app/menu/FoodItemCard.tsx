"use client";
import React, { useEffect } from "react";
import FoodItem from "../api/foodItemSchema";
import { useFavoritesStore } from "../favorites/util/favoritesStore";
import { usePostHog } from "posthog-js/react";

interface Props {
    foodItem: FoodItem;
    index: string;
}

const FoodItemCard = ({ foodItem, index }: Props) => {
    const { initializeFavorites, toggleFavorite, isFavorite } =
        useFavoritesStore();
    const posthog = usePostHog();

    useEffect(() => {
        initializeFavorites();
    }, []);

    const handleFavoriteClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        await toggleFavorite({
            id: foodItem.id,
            name: foodItem.common_items.name,
            common_items: foodItem.common_items,
            dc: foodItem.dc,
            section: foodItem.section,
            meal: foodItem.meal,
        });

        if (posthog) {
            posthog.capture("food_item_favorited", {
                item_name: foodItem.common_items.name,
                item_id: foodItem.id,
                dc: foodItem.dc,
                meal: foodItem.meal,
            });
        }
    };

    const favorited = isFavorite(foodItem.id, foodItem.common_items.name);

    return (
        <label htmlFor={`food_item_${index}`}>
            <div className="flex items-center rounded bg-white hover:bg-slate-200 hover:cursor-pointer transition duration-300 ease-in-out">
                <div className="flex flex-col sm:justify-between sm:flex-row sm:items-center w-full p-[20px]">
                    <div className="sm:flex sm:flex-row">
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col">
                                <div className="font-semibold text-sm text-textDarkBlue sm:w-[150px] md:w-[75px] lg:w-[100px] xl:w-[150px]">
                                    {foodItem.common_items.name}
                                </div>
                                {foodItem.common_items.calories !== "N/A" && (
                                    <div className="font-red-hat font-normal text-[11px] text-calorieGray">
                                        {Math.round(
                                            parseInt(
                                                foodItem.common_items.calories
                                            )
                                        )}{" "}
                                        cal
                                    </div>
                                )}
                            </div>

                            <div className="flex-shrink-0 sm:opacity-0">
                                <button
                                    onClick={handleFavoriteClick}
                                    className="flex items-center justify-center bg-[#F1F7F7] rounded-full w-[30px] h-[30px]"
                                >
                                    <img
                                        src={
                                            favorited
                                                ? "/filled_heart_icon.svg"
                                                : "/favorite_icon.svg"
                                        }
                                        className="transition-transform duration-300 hover:scale-110"
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Diet tags section */}
                        <div className="mt-[8px] sm:mt-0 flex flex-row gap-[7px] items-center lg:grid lg:grid-cols-2 xl:flex xl:flex-row">
                            {foodItem.common_items.pescetarian && (
                                <div
                                    key="pescetarian"
                                    className="text-white px-[8px] py-[5px] rounded-full bg-pescetarianBlue text-xs font-red-hat"
                                >
                                    Pescetarian
                                </div>
                            )}
                            {foodItem.common_items.vegan && (
                                <div
                                    key="vegan"
                                    className="text-white px-[8px] py-[5px] rounded-full bg-veganGreen text-xs font-red-hat"
                                >
                                    Vegan
                                </div>
                            )}
                            {foodItem.common_items.vegetarian && (
                                <div
                                    key="vegetarian"
                                    className="text-white px-[8px] py-[5px] rounded-full bg-vegetarianOrange text-xs font-red-hat"
                                >
                                    Vegetarian
                                </div>
                            )}
                            {foodItem.common_items.halal && (
                                <div
                                    key="halal"
                                    className="text-white px-[8px] py-[5px] rounded-full bg-halalPink text-xs font-red-hat"
                                >
                                    Halal
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-shrink-0 hidden sm:block w-fit">
                        <button
                            onClick={handleFavoriteClick}
                            className="flex items-center justify-center bg-[#F1F7F7] rounded-full w-[30px] h-[30px]"
                        >
                            <img
                                src={
                                    favorited
                                        ? "/filled_heart_icon.svg"
                                        : "/favorite_icon.svg"
                                }
                                className="transition-transform duration-300 hover:scale-110"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </label>
    );
};

export default FoodItemCard;
