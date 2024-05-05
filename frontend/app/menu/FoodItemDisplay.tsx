"use client";
import React, { useEffect, useState } from "react";
import FoodItem from "../api/foodItemSchema";
import supabase from "../api/supabase";
import FoodItemCard from "./FoodItemCard";
import FoodItemModal from "./FoodItemModal";
import NoFoodItems from "./NoFoodItems";

interface Props {
  dc: string;
  day: string;
  meal: string;
}

const FoodItemDisplay = ({ dc, day, meal }: Props) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [sections, setSections] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState<number | null>(0);
  const loadingSkeletons = [1, 2, 3];

  // Sets a minimum timeout for the fetch request to resolve (for a smoother user experience)
  const minTimeout = new Promise((resolve: any) => setTimeout(resolve, 800));

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();
    const fetchFoodItems = async () => {
      try {
        const res = await fetch("../api/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dc: dc, day: day, meal: meal }),
          signal: abortController.signal,
        });

        const [_, fetchResult] = await Promise.all([minTimeout, res]);

        if (!fetchResult.ok) {
          throw Error("Network response not ok");
        }
        // Get food items from response json
        const responseData = await fetchResult.json();
        const items = responseData as FoodItem[];

        setFoodItems(items);

        // Get unique sections
        const uniqueSections = Array.from(
          new Set(items.map((item) => item.section))
        );

        setSections(uniqueSections);

        // Save filters for current session
        // if (typeof window !== undefined) {
        //   sessionStorage.setItem("filters", JSON.stringify({ dc, day, meal }));
        // }

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
      abortController.abort();
    };
  }, [dc, day, meal]);

  const handleAccordionClick = (curNumber: number) => {
    if (selectedSection === curNumber) {
      setSelectedSection(null);
    } else {
      setSelectedSection(curNumber);
    }
  };

  return isLoading ? (
    <div className="flex flex-col items-center align-middle justify-center py-60">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <div className="sm:px-32 animate-fade-in">
      {sections.length !== 0 &&
        sections.map((section, curSection) => (
          <div
            key={section}
            className="collapse collapse-arrow"
            onClick={() => handleAccordionClick(curSection)}
          >
            {/* Radio btn */}
            <input
              type="radio"
              name="sections"
              checked={selectedSection === curSection}
              readOnly
              className="hover:cursor-pointer"
            />
            {/* Title */}
            <div className="collapse-title text-xl font-medium">{section}</div>
            {/* Content div */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 pt-5 gap-5 collapse-content`}
            >
              {/* Content */}
              {foodItems
                .filter((foodItem) => foodItem.section === section)
                .map((foodItem, index) => (
                  <div
                    key={foodItem.id}
                    className="flex flex-col justify-center"
                  >
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
      {sections.length === 0 && <NoFoodItems dc={dc} />}
    </div>
  );
};

export default FoodItemDisplay;
