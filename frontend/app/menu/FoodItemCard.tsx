import React from "react";
import FoodItem from "../api/foodItemSchema";

interface Props {
  foodItem: FoodItem;
}

/**
im adding some custom colors in the tailwind.config.js file for the new filters, isabel can look over them later and change them if needed
 */

const FoodItemCard = ({ foodItem }: Props) => {
  return (
    <div className="flex flex-row justify-between items-center rounded bg-white px-6 py-4 hover:bg-slate-200 hover:cursor-pointer transition duration-300 ease-in-out">
      <div className="flex flex-col">
        <div className="font-semibold text-sm text-textDarkBlue">
          {foodItem.common_items.name}
        </div>
        <div className="text-gray-400 text-xs">
          {foodItem.section}
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        {/* Calories */}
        {foodItem.common_items.calories !== "N/A" && (
          <div className="px-3 py-1 rounded-full bg-calorieBlue text-white text-xs">
            {Math.round(parseInt(foodItem.common_items.calories))} cal
          </div>
        )}
        {/* Vegan */}
        {foodItem.common_items.vegan && (
          <div className="px-[8px] py-[5px] rounded-full bg-veganGreen">
            Vegan
          </div>
        )}
        {/* Vegetarian */}
        {foodItem.common_items.vegetarian && (
          <div className="px-[8px] py-[5px] rounded-full bg-vegetarianOrange">
            Vegetarian
          </div>
        )}
        {/* Halal */}
        {foodItem.common_items.halal && (
          <div className="px-[8px] py-[5px] rounded-full bg-halalPink">
            Halal
          </div>
        )}
        {/* pescetarian */}
        {foodItem.common_items.pescetarian && (
        <div className="px-[8px] py-[5px] rounded-full bg-pescetarianYellow">
          Pescetarian
        </div>
        )}
        {/* gluten free */}
        {foodItem.common_items.glutenFree && (
        <div className="px-[8px] py-[5px] rounded-full bg-glutenFreePurple">
          Gluten Free
        </div>
        )}
         {/* dairy free */}
        {foodItem.common_items.dairyFree && (
        <div className="px-[8px] py-[5px] rounded-full bg-dairyFreeRed">
          Dairy Free
        </div>
        )}
      </div>
    </div>
  );
};

export default FoodItemCard;
