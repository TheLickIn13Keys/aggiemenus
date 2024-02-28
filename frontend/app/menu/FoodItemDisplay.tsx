"use client";
import React, { useEffect, useState } from "react";
import FoodItem from "../api/foodItemSchema";
import supabase from "../api/supabase";
import FoodItemCard from "./FoodItemCard";
import FoodItemModal from "./FoodItemModal";
import NoFoodItems from "./NoFoodItems";
import SkeletonCard from "./SkeletonCard";

interface Props {
  dc: string;
  day: number;
  meal: string;
}

const FoodItemDisplay = ({ dc, day, meal }: Props) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [sections, setSections] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);
  const loadingSkeletons = [1, 2, 3];

  useEffect(() => {
    // setIsLoading(true);
    const fetchFoodItems = async () => {
      try {
        // Make call to supabase client
        setIsLoading(true);
        const { data, error } = await supabase
          .from("food_items")
          .select("*")
          .match({ dc: dc, date: day, meal: meal });

        if (error) {
          throw new Error(error.message);
        }

        // Get food items from response json
        const items = data as FoodItem[];
        setFoodItems(items);

        // Get unique sections
        const uniqueSections = Array.from(
          new Set(items.map((item) => item.section))
        );
        setSections(uniqueSections);
        setIsLoading(false);
      } catch (error: any) {
        console.log("Something went wrong when retrieving the data: ", error);
      }
    };

    // Call function every time dc, day, or meal changes
    fetchFoodItems();
    setIsLoading(false);

    // Save filters for current session
    sessionStorage.setItem("filters", JSON.stringify({ dc, day, meal }));
  }, [dc, day, meal]);

  return (
    <>
      {sections.length !== 0 &&
        sections.map((section) => (
          <div key={section} className="flex flex-col sm:px-32 px-12">
            <h1
              className={`p-5 badge badge-ghost glass badge-outline text-2xl${
                isLoading ? "" : ""
              }`}
            >
              {section}
            </h1>
            {isLoading && (
              <div className="flex flex-row pt-9 gap-5 overflow-x-scroll">
                {loadingSkeletons.map(() => (
                  <SkeletonCard />
                ))}
              </div>
            )}
            <div className="flex flex-row pt-9 gap-5 overflow-x-scroll">
              {foodItems
                .filter((foodItem) => foodItem.section === section)
                .map((foodItem, index) => (
                  <div key={foodItem.id}>
                    {/* Food card / modal to open button */}
                    <label htmlFor={`food_item_${section}_${index}`}>
                      <FoodItemCard foodItem={foodItem} isLoading={isLoading} />
                    </label>

                    {/* Modal */}
                    <FoodItemModal
                      foodItem={foodItem}
                      section={section}
                      index={index}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      {/* Render No Food screen if there are no items at the given time */}
      {sections.length === 0 && <NoFoodItems dc={dc} />}
    </>
  );
};

export default FoodItemDisplay;
