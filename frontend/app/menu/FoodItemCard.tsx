import React from "react";
import FoodItem from "../api/foodItemSchema";

interface Props {
  foodItem: FoodItem;
  index: string;
}

/**
im adding some custom colors in the tailwind.config.js file for the new filters, isabel can look over them later and change them if needed
 */

const FoodItemCard = ({ foodItem, index }: Props) => {
  return (
    <label htmlFor={`food_item_${index}`}>
      <div className="flex items-center rounded bg-white hover:bg-slate-200 hover:cursor-pointer transition duration-300 ease-in-out">
        <div className="w-full p-[20px]">  {/* content container for each food item card */}
          <div className="flex flex-col">  {/* sub container for just item title and calorie */}
            <div className="font-semibold text-sm text-textDarkBlue">
              {foodItem.common_items.name}
            </div>
            {foodItem.common_items.calories !== "N/A" && (
              <div className="font-red-hat font-normal text-[11px] text-calorieGray sm:max-w-fit sm:px-3 sm:py-1 sm:rounded-full sm:bg-calorieBlue sm:text-white">
                {Math.round(parseInt(foodItem.common_items.calories))} cal
              </div>
            )}
          </div>


          <div className="mt-[8px] flex flex-row gap-[7px] items-center"> {/* sub container for food filter tags */}

            {/* Vegan */}
            {foodItem.common_items.vegan && (
              <div className="text-white px-[8px] py-[5px] rounded-full bg-veganGreen text-xs font-red-hat">
                Vegan
              </div>
            )}
            {/* Vegetarian */}
            {foodItem.common_items.vegetarian && (
              <div className="text-white px-[8px] py-[5px] rounded-full bg-vegetarianOrange text-xs font-red-hat">
                Vegetarian
              </div>
            )}
            {/* Halal */}
            {foodItem.common_items.halal && (
              <div className="text-white px-[8px] py-[5px] rounded-full bg-halalPink text-xs font-red-hat">
                Halal
              </div>
            )}
            {/* pescetarian */}
            {foodItem.common_items.pescetarian && (
            <div className="text-white px-[8px] py-[5px] rounded-full bg-pescetarianYellow text-xs font-red-hat">
              Pescetarian
            </div>
          )}
          </div>
        </div>
      </div>
    </label>
  );
};

export default FoodItemCard;
