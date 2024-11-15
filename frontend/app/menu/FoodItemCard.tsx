import React, { useState} from "react";
import FoodItem from "../api/foodItemSchema";
interface Props {
  foodItem: FoodItem;
  index: string;
}

/**
im adding some custom colors in the tailwind.config.js file for the new filters, isabel can look over them later and change them if needed
 */

const FoodItemCard = ({ foodItem, index }: Props) => {
  const [isFavorite, setisFavorite] = useState(false);

  return (
    <label htmlFor={`food_item_${index}`}>
      <div className="flex items-center rounded bg-white hover:bg-slate-200 hover:cursor-pointer transition duration-300 ease-in-out">
        <div className="flex flex-col sm:justify-between sm:flex-row sm:items-center w-full p-[20px]">  {/* content container for each food item card */}
        
        <div className='sm:flex sm:flex-row'> 
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">  {/* sub container for just item title and calorie */}
              <div className="font-semibold text-sm text-textDarkBlue sm:w-[150px] md:w-[75px] lg:w-[100px] xl:w-[150px]">
                {foodItem.common_items.name}
              </div>
              {foodItem.common_items.calories !== "N/A" && (
                <div className="font-red-hat font-normal text-[11px] text-calorieGray">
                  {Math.round(parseInt(foodItem.common_items.calories))} cal
                </div>
              )}
            </div>

            <div className='flex-shrink-0 sm:opacity-0'>
              <button className="flex items-center justify-center bg-[#F1F7F7] rounded-full w-[30px] h-[30px]">
                <img src="/favorite_icon.svg"></img>
              </button>
            </div>
        </div>

          <div className="mt-[8px] sm:mt-0 flex flex-row gap-[7px] items-center lg:grid lg:grid-cols-2 xl:flex xl:flex-row"> {/* sub container for food filter tags */}
            {/* pescetarian */}
            {foodItem.common_items.pescetarian && (
            <div className="text-white px-[8px] py-[5px] rounded-full bg-pescetarianBlue text-xs font-red-hat">
              Pescetarian
            </div>
          )}
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

          </div>

        </div>


          <div className='flex-shrink-0 hidden sm:block w-fit'>
          <button 
    onClick={() => setisFavorite(!isFavorite)} 
    className="flex items-center justify-center bg-[#F1F7F7] rounded-full w-[30px] h-[30px]"
  >
    <img 
      src={isFavorite ? "/filled_heart_icon.svg" : "/favorite_icon.svg"}
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
