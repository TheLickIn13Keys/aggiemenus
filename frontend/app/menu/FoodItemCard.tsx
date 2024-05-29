import React from "react";
import FoodItem from "../api/foodItemSchema";

interface Props {
  foodItem: FoodItem;
}

const FoodItemCard = ({ foodItem }: Props) => {
  return (
    // <div
    //   className={`btn bg-base-100 shadow-lg w-full h-60 sm:h-96 lg:h-60 flex flex-row truncate`}
    // >
    //   <div className="card-body gap-5 items-start truncate">
    //     <h2 className="text-lg items-start max-w-full truncate">
    //       {foodItem.common_items.name}
    //     </h2>
    //     <div className="card-title w-full flex flex-col justify-start items-start">
    //       <div className="flex flex-row sm:flex-col xl:flex-row gap-2 ">
    //         {foodItem.common_items.halal ? (
    //           <div className="badge badge-primary badge-outline">Halal</div>
    //         ) : null}
    //         {foodItem.common_items.vegan ? (
    //           <div className="badge badge-accent badge-outline">Vegan</div>
    //         ) : null}
    //         {/* Vegetarian badge will be hidden if meal is vegan */}
    //         {foodItem.common_items.vegetarian ? (
    //           <div
    //             className={`badge badge-accent badge-outline ${
    //               foodItem.common_items.vegan && "hidden"
    //             }`}
    //           >
    //             Vegetarian
    //           </div>
    //         ) : (
    //           <div className="badge badge-primary badge-outline invisible" />
    //         )}
    //       </div>
    //     </div>
    //     {/* Short description */}
    //     {/* <p className="w-full py-3 flex justify-center">
    //       {foodItem.description !== "None"
    //         ? foodItem.description.split(" ").slice(0, 15).join(" ") + "..."
    //         : ""}
    //     </p> */}
    //     <div className="grid grid-cols-4 md:grid-cols-2 xl:grid-cols-4 items-center sm:items-start gap-5">
    //       {/* <div className="flex flex-col justify-center items-center gap-2">
    //         <div className="badge badge-primary font-semibold">Serving</div>
    //         {foodItem.serving_size}
    //       </div> */}
    //       <div className="flex flex-col justify-center items-center gap-2">
    //         <div className="badge badge-primary font-semibold">Cal</div>
    //         {foodItem.common_items.calories}
    //       </div>
    //       <div className="flex flex-col justify-center items-center gap-2">
    //         <div className="badge badge-primary font-semibold">Carb</div>
    //         {foodItem.common_items.carbs}{" "}
    //         {foodItem.common_items.carbs != "N/A" && "g"}
    //       </div>
    //       <div className="flex flex-col justify-center items-center gap-2">
    //         <div className="badge badge-primary font-semibold">Pro</div>
    //         {foodItem.common_items.protein}{" "}
    //         {foodItem.common_items.protein != "N/A" && "g"}
    //       </div>
    //       <div className="flex flex-col justify-center items-center gap-2">
    //         <div className="badge badge-primary font-semibold">Fat</div>
    //         {foodItem.common_items.fat}{" "}
    //         {foodItem.common_items.fat != "N/A" && "g"}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col rounded-xl bg-white shadow-sm px-7 sm:px-4 py-4 sm:gap-3 gap-2 transform hover:bg-slate-200 hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
      {/* Name */}
      <div className="flex-1 text-start font-semibold sm:text-lg text-md max-w-full truncate">
        {foodItem.common_items.name}
      </div>
      {/* Section */}
      <div className="flex-1 text-start text-gray-400 sm:text-sm text-xs">
        {foodItem.section}
      </div>
      {/* Calories / dietary restrictions */}
      <div className="flex flex-wrap justify-start items-start text-xs gap-2">
        {/* Calories */}
        {foodItem.common_items.calories !== "N/A" && (
          <div className="px-2 py-1 border-2 border-primary text-primary rounded-full">
            {foodItem.common_items.calories} cal
          </div>
        )}
        {/* Vegan */}
        {foodItem.common_items.vegan && (
          <div className="px-2 py-1 border-2 border-success text-success rounded-full">
            Vegan
          </div>
        )}
        {/* Vegetarian */}
        {foodItem.common_items.vegetarian && (
          <div className="px-2 py-1 border-2 border-warning text-warning rounded-full">
            Vegetarian
          </div>
        )}
        {/* Halal */}
        {foodItem.common_items.halal && (
          <div className="px-2 py-1 border-2 border-error text-error rounded-full">
            Halal
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItemCard;
