import React from "react";
import FoodItem from "../api/foodItemSchema";

interface Props {
  foodItem: FoodItem;
  isLoading: boolean;
}

const FoodItemCard = ({ foodItem, isLoading }: Props) => {
  return (
    <div className={`btn bg-base-200 shadow-lg w-80 h-36`}>
      <div className="card-body w-96 gap-3 align-middle">
        <div className="card-title w-full space-x-2 flex flex-row justify-center">
          <h2 className="text-sm">{foodItem.name}</h2>
          <div className="flex flex-row gap-2 ">
            {foodItem.halal ? (
              <div className="badge badge-primary badge-outline">Halal</div>
            ) : null}
            {foodItem.vegan ? (
              <div className="badge badge-accent badge-outline">Vegan</div>
            ) : null}
            {foodItem.vegetarian ? (
              <div className="badge badge-accent badge-outline">Vegetarian</div>
            ) : null}
          </div>
        </div>
        {/* Short description */}
        {/* <p className="w-full py-3 flex justify-center">
          {foodItem.description !== "None"
            ? foodItem.description.split(" ").slice(0, 15).join(" ") + "..."
            : ""}
        </p> */}
        <div className="flex flex-row justify-center items-center gap-2">
          {/* <div className="flex flex-col justify-center items-center gap-2">
            <div className="badge badge-primary font-semibold">Serving</div>
            {foodItem.serving_size}
          </div> */}
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="badge badge-primary font-semibold">Cal</div>
            {foodItem.calories}
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="badge badge-primary font-semibold">Carb</div>
            {foodItem.carbs}g
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="badge badge-primary font-semibold">Pro</div>
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
