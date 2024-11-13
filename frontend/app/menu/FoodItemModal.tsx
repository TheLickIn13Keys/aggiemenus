import React from "react";
import FoodItem from "../api/foodItemSchema";

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
        <div className="modal-box p-8 py-12 **max-h-none bg-white">
          <div className="flex flex-row">
            {/* Close button */}
            <label
              htmlFor={`food_item_${index}`}
              className="btn btn-sm btn-circle btn-ghost -ml-2 top-2"
            >
              ✕
            </label>
          </div>
          {/* Food name and tags  */}
          <h2 className="text-2xl font-semibold left-2 mt-8">
            {foodItem.common_items.name}
          </h2>
          <h2 className="text-md text-gray-500 left-2 my-0.5">
            {foodItem.section}
          </h2>

          <div className="w-full space-x-2 gap-5 flex mt-2 justify-start items-center align-start">
            <div className="flex flex-row gap-3">
              {foodItem.common_items.vegan ? (
                <div className="badge badge-success badge-outline ">Vegan</div>
              ) : null}
              {/* Vegetarian badge will be hidden if meal is vegan */}
              {foodItem.common_items.vegetarian ? (
                <div
                  className={`badge badge-warning badge-outline ${
                    foodItem.common_items.vegan && "block"
                  }`}
                >
                  Vegetarian
                </div>
              ) : null}
              {foodItem.common_items.halal ? (
                <div className="badge badge-error badge-outline ">Halal</div>
              ) : null}
              {foodItem.common_items.pescetarian ? (
                <div className="badge badge-warning badge-outline">Pescetarian</div>
              ) : null}
            </div>
          </div>
          {/* Short description */}
          <p className="w-full py-3 flex justify-start text-start mt-5">
            {foodItem.common_items.description !== "None"
              ? foodItem.common_items.description
              : ""}
          </p>
          <p className="w-full justify-center text-start my-3">
            {foodItem.common_items.allergens.length > 0 ? (
              <>
                <strong>Allergens:</strong>{" "}
                {foodItem.common_items.allergens.join(", ")}
              </>
            ) : (
              <></>
            )}
          </p>

          <hr className="border-t border-gray-400 mt-3" />
          {/* Nutritional facts */}
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex flex-col justify-start w-1/3 p-4 pl-0">
              <div className="font-semibold">Serving</div>
              {foodItem.common_items.serving_size}
            </div>
            <div className="flex w-1/3 flex-col justify-start items-start p-4">
              <div className="font-semibold">Calories</div>
              {Math.round(parseInt(foodItem.common_items.calories))}
            </div>
            <div className="flex flex-col w-1/3 justify-start items-start p-4 pl-8 pr-0">
              <div className=" font-semibold">Carbs</div>
              {Math.round(parseInt(foodItem.common_items.carbs))}{" "}
              {foodItem.common_items.carbs !== "N/A" && "g"}
            </div>
            <div className="flex flex-col w-1/3 justify-start items-start p-4 pl-0">
              <div className=" font-semibold">Protein</div>
              {Math.round(parseInt(foodItem.common_items.protein))}{" "}
              {foodItem.common_items.protein != "N/A" && "g"}
            </div>
            <div className="flex flex-col w-1/3 justify-start items-start p-4">
              <div className="font-semibold">Fat</div>
              {Math.round(parseInt(foodItem.common_items.fat))}{" "}
              {foodItem.common_items.fat != "N/A" && "g"}
            </div>
            <div className="flex flex-col w-1/3 justify-center items-center p-4 pr-0"></div>
          </div>
        </div>
        <label htmlFor={`food_item_${index}`} className="modal-backdrop">
          Close
        </label>
      </div>
    </div>
  );
};

export default FoodItemModal;
