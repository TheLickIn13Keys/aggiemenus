import React from "react";
import FoodItem from "../api/foodItemSchema";

interface Props {
  foodItem: FoodItem;
  isLoading: boolean;
}

const FoodItemCard = ({ foodItem, isLoading }: Props) => {
  return (
    <div
      className={`btn bg-base-100 shadow-lg w-full h-60 sm:h-96 lg:h-60 flex flex-row truncate`}
    >
      <div className="card-body gap-5 items-start truncate">
        <h2 className="text-2xl items-start max-w-full truncate">
          {foodItem.common_items.name}
        </h2>
        <div className="card-title w-full flex flex-col justify-start items-start">
          <div className="flex flex-row sm:flex-col xl:flex-row gap-2 ">
            {foodItem.common_items.halal ? (
              <div className="badge badge-primary badge-outline">Halal</div>
            ) : null}
            {foodItem.common_items.vegan ? (
              <div className="badge badge-accent badge-outline">Vegan</div>
            ) : null}
            {/* Vegetarian badge will be hidden if meal is vegan */}
            {foodItem.common_items.vegetarian ? (
              <div
                className={`badge badge-accent badge-outline ${
                  foodItem.common_items.vegan && "hidden"
                }`}
              >
                Vegetarian
              </div>
            ) : (
              <div className="badge badge-primary badge-outline invisible" />
            )}
          </div>
        </div>
        {/* Short description */}
        {/* <p className="w-full py-3 flex justify-center">
          {foodItem.description !== "None"
            ? foodItem.description.split(" ").slice(0, 15).join(" ") + "..."
            : ""}
        </p> */}
        <div className="grid grid-cols-4 md:grid-cols-2 xl:grid-cols-4 items-center sm:items-start gap-5">
          {/* <div className="flex flex-col justify-center items-center gap-2">
            <div className="badge badge-primary font-semibold">Serving</div>
            {foodItem.serving_size}
          </div> */}
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="badge badge-primary font-semibold">Cal</div>
            {foodItem.common_items.calories}
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="badge badge-primary font-semibold">Carb</div>
            {foodItem.common_items.carbs}{" "}
            {foodItem.common_items.carbs != "N/A" && "g"}
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="badge badge-primary font-semibold">Pro</div>
            {foodItem.common_items.protein}{" "}
            {foodItem.common_items.protein != "N/A" && "g"}
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="badge badge-primary font-semibold">Fat</div>
            {foodItem.common_items.fat}{" "}
            {foodItem.common_items.fat != "N/A" && "g"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;
