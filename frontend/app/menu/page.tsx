"use client";
import NavBar from "./NavBar";
import Selections from "./Selections";
import FoodItemDisplay from "./FoodItemDisplay";
import supabase from "../api/supabase";
import { useState } from "react";
import { redirect } from "next/navigation";

interface Props {
  searchParams: { query: string };
}

const Menu = ({ searchParams: { query } }: Props) => {
  // Redirect for now
  redirect("./");

  const [selectedDC, setSelectedDC] = useState("Segundo");
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState("Breakfast");

  // console.log(selectedDC);
  // console.log(selectedDay);
  // console.log(selectedMeal);

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
    </div>
  );
};

export default Menu;
