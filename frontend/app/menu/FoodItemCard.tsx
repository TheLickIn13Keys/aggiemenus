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
    <div className="flex flex-col rounded bg-white px-[20px] py-[20px] sm:gap-3 gap-2 transform hover:bg-slate-200 hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out -mb-[5px]">
      {/* Name */}
      <div className="flex flex-col mb-[5px]">
        {/* FIX NEGATIVE MARGIN LATER ON */}
        <div className="flex-1 text-start font-semibold text-sm max-w-full truncate text-textDarkBlue  mb-[4px]">
          {foodItem.common_items.name}
        </div>
        {/* Section */}
        <div className="flex-1 text-start text-gray-400 text-xs ">
          {foodItem.section}
        </div>
      </div>
      {/* Calories / dietary restrictions */}
      <div className="flex flex-wrap justify-start items-start text-xs gap-2 text-white ">
        {/* Calories */}
        {foodItem.common_items.calories !== "N/A" && (
          <div className="px-[8px] py-[5px] rounded-full bg-calorieBlue">
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
          Halal
        </div>
        )}
        {/* gluten free */}
        {foodItem.common_items.glutenFree && (
        <div className="px-[8px] py-[5px] rounded-full bg-glutenFreePurple">
          Halal
        </div>
        )}
         {/* dairy free */}
        {foodItem.common_items.dairyFree && (
        <div className="px-[8px] py-[5px] rounded-full bg-dairyFreeRed">
          Halal
        </div>
        )}
      </div>
    </div>
  );
};

export default FoodItemCard;
