"use client";
import NavBar from "./NavBar";
import Selections from "./Selections";
import FoodItemDisplay from "./FoodItemDisplay";
import supabase from "../api/supabase";
import { useState } from "react";
import Footer from "./Footer";

const Menu = () => {
  const [selectedDC, setSelectedDC] = useState("Segundo");
  const [selectedDay, setSelectedDay] = useState("0");
  const [selectedMeal, setSelectedMeal] = useState("Breakfast");

  return (
    <div className="space-y-10 flex flex-col h-screen justify-between">
      <header>
        <NavBar />
      </header>
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
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
};

export default Menu;
