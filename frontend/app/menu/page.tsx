"use client";
import NavBar from "./NavBar";
import Selections from "./Selections";
import FoodItemDisplay from "./FoodItemDisplay";
import supabase from "../api/supabase";
import { useState } from "react";

interface Props {
  searchParams: { query: string };
}

const Menu = ({ searchParams: { query } }: Props) => {
  // Get data from supabase
  // const { data } = await supabase
  //   .from("food_items")
  //   .select("*")
  //   .eq("dc", dc)
  //   .eq("date", day)
  //   .eq("meal", meal);

  // Annotate foodItems as being of type FoodItem[]
  // const foodItems: FoodItem[] = data as FoodItem[];

  // console.log(dc);

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
