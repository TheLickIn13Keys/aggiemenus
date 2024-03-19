import React from "react";
import FoodItem from "../api/foodItemSchema";

interface Props {
  foodItem: FoodItem;
  index: number;
  section: string;
}

const FoodItemModal = ({ foodItem, index, section }: Props) => {
  return (
    <div>
      <input
        type="checkbox"
        id={`food_item_${section}_${index}`}
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box space-y-5">
          <div className="flex flex-row-reverse">
            {/* Close button */}
            <label
              htmlFor={`food_item_${section}_${index}`}
              className="btn btn-sm btn-circle btn-ghost right-2 top-2"
            >
              ✕
            </label>
          </div>
          {/* Food name and tags  */}
          <div className="w-full space-x-2 gap-5 flex justify-center items-center align-middle">
            <h2 className="text-2xl font-semibold">{foodItem.name}</h2>
            <div className="flex flex-row gap-3">
              {foodItem.halal ? (
                <div className="badge badge-primary badge-outline">Halal</div>
              ) : null}
              {foodItem.vegan ? (
                <div className="badge badge-accent badge-outline">Vegan</div>
              ) : null}
              {/* Vegetarian badge will be hidden if meal is vegan */}
              {foodItem.vegetarian ? (
                <div
                  className={`badge badge-accent badge-outline ${
                    foodItem.vegan && "hidden"
                  }`}
                >
                  Vegetarian
                </div>
              ) : null}
            </div>
          </div>
          {/* Short description */}
          <p className="w-full py-3 flex justify-center text-center">
            {foodItem.description !== "None" ? foodItem.description : ""}
          </p>
          {/* Nutritional facts */}
          <div className="flex flex-wrap justify-center items-center gap-5">
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="badge badge-primary w-[93px] font-semibold">
                Serving
              </div>
              {foodItem.serving_size}
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="badge badge-primary font-semibold">Calories</div>
              {foodItem.calories}
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="badge badge-primary font-semibold">Carbs</div>
              {foodItem.carbs} {foodItem.carbs != "N/A" && "g"}
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="badge badge-primary font-semibold">Protein</div>
              {foodItem.protein} {foodItem.protein != "N/A" && "g"}
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="badge badge-primary font-semibold">Fat</div>
              {foodItem.fat} {foodItem.fat != "N/A" && "g"}
            </div>
          </div>
        </div>
        <label
          htmlFor={`food_item_${section}_${index}`}
          className="modal-backdrop"
        >
          Close
        </label>
      </div>
    </div>
  );
};

export default FoodItemModal;
