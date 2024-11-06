"use client";
import React, { useEffect, useState } from "react";
import FoodItem from "../api/foodItemSchema";
import supabase from "../api/supabase";
import FoodItemCard from "./FoodItemCard";
import FoodItemModal from "./FoodItemModal";
import NoFoodItems from "./NoFoodItems";
import { motion } from "framer-motion";

interface Props {
  dc: string;
  day: number;
  meal: string;
}

const FoodItemDisplay = ({ dc, day, meal }: Props) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [sections, setSections] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState<number | null>(0);

  // Used for loading in foodItems animation
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
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
          body: JSON.stringify({ dc: dc, day: String(day), meal: meal }),
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
    <div className="sm:px-32 pb-10">
      {/* Content div */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 py-[15px] gap-5`}
      >
        {/* Content */}
        {foodItems
          // .filter((foodItem) => foodItem.section === section)
          .map((foodItem, index) => (
            <motion.div
              key={foodItem.id}
              variants={itemVariants}
              className="flex flex-col justify-center"
            >
              {/* Food card / modal to open button */}
              <label htmlFor={`food_item_${index}`} className="h-full">
                <FoodItemCard foodItem={foodItem} />
              </label>

              {/* Modal */}
              <FoodItemModal
                foodItem={foodItem}
                // section={section}
                index={index}
              />
            </motion.div>
          ))}
      </motion.div>
      {sections.length === 0 && <NoFoodItems dc={dc} />}
    </div>
    // ))}
    // </div>
  );
};

export default FoodItemDisplay;
