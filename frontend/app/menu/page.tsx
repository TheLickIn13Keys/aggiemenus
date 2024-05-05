"use client";
import NavBar from "./NavBar";
import Selections from "./Selections";
import FoodItemDisplay from "./FoodItemDisplay";
import supabase from "../api/supabase";
import { useState } from "react";
import Footer from "./Footer";

const Menu = () => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [selectedDC, setSelectedDC] = useState("Segundo");
  const [selectedDay, setSelectedDay] = useState("0");
  const [selectedMeal, setSelectedMeal] = useState("Breakfast");

  return (
    <div
      className={`flex flex-col min-h-screen gap-5 justify-between ${
        !searchBarOpen ? "animate-fade-in" : "animate-fade-out"
      }`}
    >
      <header>
        <NavBar
          searchBarOpen={searchBarOpen}
          setSearchBarOpen={setSearchBarOpen}
        />
      </header>
      <main>
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
          day={selectedDay}
          meal={selectedMeal}
        />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Menu;
