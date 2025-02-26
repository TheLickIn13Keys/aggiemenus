import React from "react";
import FoodItem from "../api/foodItemSchema";
import FoodItemDisplay from "./FoodItemDisplay";

interface Props {
  foodItem: FoodItem;
  index: string;
  // section: string;
}

const FoodItemModal = ({ foodItem, index }: Props) => {
  return (
<div>
  <input
    type="checkbox"
    id={`food_item_${index}`}
    className="modal-toggle"
  />
  <div className="modal bg-white" role="dialog">
    <div className="modal-box bg-white ">
      <div className="bg-white p-[40px] rounded-md">
        <div className="flex flex-row">

          {/* container for sub containers of food name, food section, tags, description, allergsn, and nutritional info */}
          <div className="flex flex-col font-red-hat">
            {/* close button */}
            <label
              htmlFor={`food_item_${index}`}
              className="text-textDarkBlue hover:cursor-pointer font-extrabold mb-[15px]"
            >
              ✕
            </label>

            {/* container for actual content */}
            <div className="flex flex-col gap-y-[20px]">
              <div className="gap-y-[6px]">
                {/* name */}
                <h1 className="text-md text-textDarkBlue font-bold">
                  {foodItem.common_items.name}
                </h1>
                {/* section */}
                <h1 className="text-sm text-textDarkBlue font-medium left-2 ">
                  {foodItem.section}
                </h1>
              </div>

              
              {/* diet tags */}
              <div className="w-full space-x-2 gap-5 flex justify-start items-center align-start">
                <div className="flex flex-row gap-x-[7px]">
                  {foodItem.common_items.pescetarian && (
                    <div className="text-white bg-pescetarianBlue px-[8px] py-[5px] rounded-full">Pescatarian</div>
                  )}
                  {foodItem.common_items.vegan && (
                    <div className="text-white bg-veganGreen px-[8px] py-[5px] rounded-full">Vegan</div>
                  )}
                  {foodItem.common_items.vegetarian && (
                    <div
                      className={`text-white bg-vegetarianOrange px-[8px] py-[5px] rounded-full ${
                        foodItem.common_items.vegan && "block"
                      }`}
                    >
                      Vegetarian
                    </div>
                  )}
                  {foodItem.common_items.halal && (
                    <div className="text-white bg-halalPink px-[8px] py-[5px] rounded-full">Halal</div>
                  )}
                </div>
              </div>

              {/* Short description */}
              <p className="w-full flex justify-start text-start text-textDarkBlue font-normal">
                {foodItem.common_items.description !== "None"
                  ? foodItem.common_items.description
                  : ""}
              </p>
              
              {/* allergens */}
              <p className="w-full justify-center text-start text-textDarkBlue">
                {foodItem.common_items.allergens.length > 0 && (
                  <>
                    <strong>Allergens:</strong>{" "}
                    {foodItem.common_items.allergens.join(", ")}
                  </>
                )}
              </p>

              {/* Nutritional facts */}
              <div className="bg-[#ECF5F7] rounded-md flex flex-wrap justify-between items-center p-[20px] text-textDarkBlue">
                <div className="flex flex-col justify-start w-1/3 p-4 pl-0">
                  <div className="font-semibold">Serving:</div>
                  {foodItem.common_items.serving_size}
                </div>
                <div className="flex w-1/3 flex-col justify-start items-start p-4">
                  <div className="font-semibold">Calories:</div>
                  {Math.round(parseInt(foodItem.common_items.calories))}
                </div>
                <div className="flex flex-col w-1/3 justify-start items-start p-4 pl-8 pr-0">
                  <div className="font-semibold">Carbs:</div>
                  {Math.round(parseInt(foodItem.common_items.carbs))}{" "}
                  {foodItem.common_items.carbs !== "N/A" && "g"}
                </div>
                <div className="flex flex-col w-1/3 justify-start items-start p-4 pl-0">
                  <div className="font-semibold">Protein:</div>
                  {Math.round(parseInt(foodItem.common_items.protein))}{" "}
                  {foodItem.common_items.protein !== "N/A" && "g"}
                </div>
                <div className="flex flex-col w-1/3 justify-start items-start p-4">
                  <div className="font-semibold">Fat:</div>
                  {Math.round(parseInt(foodItem.common_items.fat))}{" "}
                  {foodItem.common_items.fat !== "N/A" && "g"}
                </div>

                {/* extra blank divider to maintain space */}
                <div className="flex flex-col w-1/3 justify-center items-center p-4 pr-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
  );
};

export default FoodItemModal;