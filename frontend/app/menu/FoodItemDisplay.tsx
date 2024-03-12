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
    const abortController = new AbortController();
    const fetchFoodItems = async () => {
      // try {
      //   // Make call to supabase client
      //   setIsLoading(true);
      //   const { data, error } = await supabase
      //     .from("food_items")
      //     .select("*")
      //     .match({ dc: dc, date: day, meal: meal });

      //   if (error) {
      //     throw new Error(error.message);
      //   }

      //   // Get food items from response json
      //   const items = data as FoodItem[];

      //   setFoodItems(items);

      //   // Get unique sections
      //   const uniqueSections = Array.from(
      //     new Set(items.map((item) => item.section))
      //   );

      //   setSections(uniqueSections);

      //   setIsLoading(false);
      // } catch (error: any) {
      //   console.log("Something went wrong when retrieving the data: ", error);
      //   setIsLoading(false); // Set loading to false even if the fetch fails
      // }
      try {
        const res = await fetch("../api/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dc: dc, day: day, meal: meal }),
          signal: abortController.signal,
        });

        if (!res.ok) {
          throw Error("Network response not ok");
        }
        // Get food items from response json
        const responseData = await res.json();
        const items = responseData as FoodItem[];

        setFoodItems(items);

        // Get unique sections
        const uniqueSections = Array.from(
          new Set(items.map((item) => item.section))
        );

        setSections(uniqueSections);

        setIsLoading(false);
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.log("Fetch error: ", error);
        }
      }
    };

    // Call function every time dc, day, or meal changes
    fetchFoodItems();

    // Cleanup function
    return () => {
      // Save filters for current session
      if (typeof window !== undefined) {
        sessionStorage.setItem("filters", JSON.stringify({ dc, day, meal }));
      }

      abortController.abort();
    };
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
                {loadingSkeletons.map((item) => (
                  <SkeletonCard key={item} />
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
                      <FoodItemCard foodItem={foodItem} />
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
