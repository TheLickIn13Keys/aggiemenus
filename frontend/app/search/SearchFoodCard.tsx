import React from "react";
import SearchFoodItem from "../api/searchFoodItemSchema";

interface Props {
  foodItem: SearchFoodItem;
}

const SearchFoodCard = ({ foodItem }: Props) => {
  const dayName = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <div
      className={`btn bg-base-100 shadow-lg w-full h-60 sm:h-96 lg:h-60 flex flex-row truncate`}
    >
      <div className="card-body gap-5 items-start truncate">
        <h2 className="text-lg items-start max-w-full truncate">
          {foodItem.name}
        </h2>
        <h3 className="text-md items-start max-w-full truncate">
          {foodItem.dc}
        </h3>
        <h3 className="text-md items-start max-w-full truncate">
          {dayName[Number(foodItem.day)] + " @ " + foodItem.meal}
        </h3>
        <h3 className="text-md items-start max-w-full truncate">
          {foodItem.section}
        </h3>
        <div className="card-title w-full flex flex-col justify-start items-start">
          <div className="flex flex-row sm:flex-col xl:flex-row gap-2 ">
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
            {foodItem.calories}
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="badge badge-primary font-semibold">Carb</div>
            {foodItem.carbs} {foodItem.carbs != "N/A" && "g"}
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="badge badge-primary font-semibold">Pro</div>
            {foodItem.protein} {foodItem.protein != "N/A" && "g"}
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="badge badge-primary font-semibold">Fat</div>
            {foodItem.fat} {foodItem.fat != "N/A" && "g"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFoodCard;
