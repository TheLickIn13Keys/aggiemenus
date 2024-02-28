import React from "react";
import FoodItem from "../api/foodItemSchema";

interface Props {
  foodItem: FoodItem;
}

const FoodItemCard = ({ foodItem }: Props) => {
  return (
    <div
      className={`btn bg-base-200 shadow-lg w-72 h-96 sm:w-96 sm:h-72 overflow-y-hidden overflow-x-hidden`}
    >
      <div className="card-body w-96 gap-3 align-middle">
        <div className="card-title w-full space-x-2 flex justify-center">
          <h2>{foodItem.name}</h2>
          <div className="flex flex-row gap-2">
            {foodItem.halal ? (
              <div className="badge badge-primary badge-outline">H</div>
            ) : null}
            {foodItem.vegan ? (
              <div className="badge badge-accent badge-outline">V</div>
            ) : null}
            {foodItem.vegetarian ? (
              <div className="badge badge-accent badge-outline">Veg</div>
            ) : null}
          </div>
        </div>
        {/* Short description */}
        <p className="w-full py-3 flex justify-center">
          {foodItem.description !== "None"
            ? foodItem.description.split(" ").slice(0, 15).join(" ") + "..."
            : ""}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-2">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="badge badge-primary font-semibold">Serving</div>
            {foodItem.serving_size}
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="badge badge-primary font-semibold">Calories</div>
            {foodItem.calories}
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="badge badge-primary font-semibold">Carbs</div>
            {foodItem.carbs}g
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="badge badge-primary font-semibold">Protein</div>
            {foodItem.protein}g
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="badge badge-primary font-semibold">Fat</div>
            {foodItem.fat}g
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;
