"use client";
import NavBar from "./NavBar";
import Selections from "./Selections";
import FoodItemDisplay from "./FoodItemDisplay";
import { useEffect, useState } from "react";
import Footer from "./Footer";

interface Filters {
  dc: string;
  day: number;
  meal: string;
}

const Menu = () => {
  let today = new Date();
  let dayNum = today.getDay() - 1 === -1 ? 6 : today.getDay() - 1; // Accounts for difference in counting days between Python and JS
  let time = today.getHours();
  let meal = "Breakfast";

  // Set default meal time
  if (time >= 0 && time < 12) {
    meal = "Breakfast";
  } else if (time >= 12 && time < 17) {
    meal = "Lunch";
  } else {
    meal = "Dinner";
  }

  let savedFilters: Filters;

  // Retrieves saved filters (if they exist)
  if (typeof window !== "undefined") {
    savedFilters = JSON.parse(sessionStorage.getItem("filters")!);
  } else {
    savedFilters = { dc: "Segundo", day: dayNum, meal: meal };
  }

  const [selectedDC, setSelectedDC] = useState(savedFilters.dc);
  const [selectedDay, setSelectedDay] = useState(savedFilters.day);
  const [selectedMeal, setSelectedMeal] = useState(savedFilters.meal);

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
      <FoodItemDisplay dc={selectedDC} day={selectedDay} meal={selectedMeal} />
      <Footer />
    </div>
  );
};

export default Menu;
