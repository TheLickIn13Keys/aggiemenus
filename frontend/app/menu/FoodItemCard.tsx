import React from "react";
import FoodItem from "../api/foodItemSchema";

interface Props {
  foodItem: FoodItem;
}

const FoodItemCard = ({ foodItem }: Props) => {
  return (
    <div className="flex flex-col rounded-xl bg-white shadow-sm px-7 sm:px-4 py-4 sm:gap-3 gap-2 transform hover:bg-slate-200 hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
      {/* Name */}
      <div className="flex-1 text-start font-semibold sm:text-lg text-md max-w-full truncate">
        {foodItem.common_items.name}
      </div>
      {/* Section */}
      <div className="flex-1 text-start text-gray-400 sm:text-sm text-xs">
        {foodItem.section}
      </div>
      {/* Calories / dietary restrictions */}
      <div className="flex flex-wrap justify-start items-start text-xs gap-2">
        {/* Calories */}
        {foodItem.common_items.calories !== "N/A" && (
          <div className="px-2 py-1 border-2 border-primary text-primary rounded-full">
            {Math.round(parseInt(foodItem.common_items.calories))} cal
          </div>
        )}
        {/* Vegan */}
        {foodItem.common_items.vegan && (
          <div className="px-2 py-1 border-2 border-success text-success rounded-full">
            Vegan
          </div>
        )}
        {/* Vegetarian */}
        {foodItem.common_items.vegetarian && (
          <div className="px-2 py-1 border-2 border-warning text-warning rounded-full">
            Vegetarian
          </div>
        )}
        {/* Halal */}
        {foodItem.common_items.halal && (
          <div className="px-2 py-1 border-2 border-error text-error rounded-full">
            Halal
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItemCard;
