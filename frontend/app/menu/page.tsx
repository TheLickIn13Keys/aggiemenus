"use client";
import NavBar from "./NavBar";
import Selections from "./Selections";
import FoodItemDisplay from "./FoodItemDisplay";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import FoodItem from "../api/foodItemSchema";

interface Filters {
  dc: string;
  day: string;
  meal: string;
}

const Menu = () => {
  const [selectedDC, setSelectedDC] = useState("Segundo");
  const [selectedDay, setSelectedDay] = useState("0");
  const [selectedMeal, setSelectedMeal] = useState("Breakfast");

  // // Recalculate day and meal upon reload
  // useEffect(() => {
  //   let today = new Date();
  //   let dayNum = String(today.getDay() - 1 === -1 ? 6 : today.getDay() - 1); // Accounts for difference in counting days between Python and JS
  //   let time = today.getHours();
  //   let meal = "Breakfast";

  //   // Set default meal time
  //   if (time >= 0 && time < 12) {
  //     meal = "Breakfast";
  //   } else if (time >= 12 && time < 17) {
  //     meal = "Lunch";
  //   } else {
  //     meal = "Dinner";
  //   }

  //   // let savedFilters: Filters;

  //   // Retrieves saved filters (if they exist)
  //   // if (typeof window !== "undefined") {
  //   //   const filtersFromStorage = sessionStorage.getItem("filters");
  //   //   if (filtersFromStorage) {
  //   //     savedFilters = JSON.parse(filtersFromStorage);
  //   //   } else {
  //   //     savedFilters = { dc: "Segundo", day: dayNum, meal: meal };
  //   //   }
  //   // } else {
  //   //   savedFilters = { dc: "Segundo", day: dayNum, meal: meal };
  //   // }

  //   // Set all fields based off of filter results
  //   setSelectedDC("Segundo");
  //   setSelectedDay(dayNum);
  //   setSelectedMeal(meal);
  // }, []);

  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [sections, setSections] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // const abortController = new AbortController();
    const fetchFoodItems = async () => {
      try {
        const res = await fetch("../api/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dc: selectedDC,
            day: selectedDay,
            meal: selectedMeal,
          }),
          // signal: abortController.signal,
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
        // if (error.name === "AbortError") {
        // console.log("Fetch aborted");
        // } else {
        console.log("Fetch error: ", error);
        // }
      }
    };

    // Call function every time dc, day, or meal changes
    fetchFoodItems();

    // Cleanup function
    return () => {
      // abortController.abort();
    };
  }, [selectedDC, selectedDay, selectedMeal]);

  return (
    <div className="space-y-10">
      <NavBar />
      {/* <Selections /> */}
      <Selections
        selectedDC={selectedDC}
        setSelectedDC={setSelectedDC}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        selectedMeal={selectedMeal}
        setSelectedMeal={setSelectedMeal}
      />
      <FoodItemDisplay
        dc={selectedDC}
        foodItems={foodItems}
        sections={sections}
        isLoading={isLoading}
      />
      <Footer />
    </div>
  );
};

export default Menu;
