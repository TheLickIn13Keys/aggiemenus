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
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const loadingSkeletons = [1, 2, 3];

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

  return (
    <div className="px-32">
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
            <div className={`grid grid-cols-3 pt-9 gap-5 collapse-content`}>
              {/* Content */}
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

            {/* <input type="radio" name="sections" />
            <div
              className={`p-5 collapse-title text-xl font-medium${
                isLoading ? "" : ""
              }`}
            >
              {section}
            </div>
            <div
              className={`flex flex-col pt-9 gap-5 collapse-content ${
                selectedSection === index ? "collapse-open" : "collapse-close"
              }`}
            >
              {foodItems
                .filter((foodItem) => foodItem.section === section)
                .map((foodItem, index) => (
                  <div key={foodItem.id}> */}
            {/* Food card / modal to open button */}
            {/* <label htmlFor={`food_item_${section}_${index}`}>
                      <FoodItemCard foodItem={foodItem} isLoading={isLoading} />
                    </label> */}

            {/* Modal */}
            {/* <FoodItemModal
                      foodItem={foodItem}
                      section={section}
                      index={index}
                    />
                  </div>
                ))}
            </div> */}
          </div>
        ))}
      {sections.length === 0 && <NoFoodItems dc={dc} />}
    </div>
  );
};

export default FoodItemDisplay;
