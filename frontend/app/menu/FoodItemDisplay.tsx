"use client";
import React, { useEffect, useState } from "react";
import FoodItem from "../api/foodItemSchema";
import supabase from "../api/supabase";

interface Props {
  dc: string;
  day: number;
  meal: string;
}

const FoodItemDisplay = ({ dc, day, meal }: Props) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [sections, setSections] = useState([""]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        // Make call to supabase client
        const { data, error } = await supabase
          .from("food_items")
          .select("*")
          .match({ dc: dc, date: day, meal: meal });

        if (error) {
          throw new Error(error.message);
        }

        // Get food items from response json
        const items = data as FoodItem[];
        setFoodItems(items);

        // Get unique sections
        const uniqueSections = Array.from(
          new Set(items.map((item) => item.section))
        );
        setSections(uniqueSections);
      } catch (error: any) {
        console.log("Something went wrong when retrieving the data: ", error);
      }
    };

    // Call function every time dc, day, or meal changes
    fetchFoodItems();
  }, [dc, day, meal]);

  return (
    <>
      {sections.map((section) => (
        <div className="flex flex-col px-32">
          <h1 className="p-3 text-2xl">{section}</h1>
          <div className="flex flex-row gap-10 overflow-x-scroll">
            {foodItems
              .filter((foodItem) => foodItem.section === section)
              .map((foodItem) => (
                <div
                  key={foodItem.id}
                  className="card bg-base-200 shadow-xl text-white w-96"
                >
                  <div className="card-body">
                    <h2 className="card-title w-full">{foodItem.name}</h2>
                    <p className="w-full">Calories: {foodItem.calories} cal</p>
                    <p className="w-full">Carbs: {foodItem.carbs}g</p>
                    <p className="w-full">Protein: {foodItem.protein}g</p>
                    <p className="w-full">Fat: {foodItem.fat}g</p>
                    <div className="flex flex-row gap-2">
                      {foodItem.halal ? (
                        <div className="badge badge-primary badge-outline">
                          Halal
                        </div>
                      ) : null}
                      {foodItem.vegan ? (
                        <div className="badge badge-secondary badge-outline">
                          Vegan
                        </div>
                      ) : null}
                      {foodItem.vegetarian ? (
                        <div className="badge badge-accent badge-outline">
                          Vegetarian
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default FoodItemDisplay;
