"use client";
import React from "react";

interface Props {
  selectedDC: string;
  setSelectedDC: (dc: string) => void;
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  selectedMeal: string;
  setSelectedMeal: (meal: string) => void;
}

const Selections = ({
  selectedDC,
  setSelectedDC,
  selectedDay,
  setSelectedDay,
  selectedMeal,
  setSelectedMeal,
}: Props) => {
  const allDCs = ["Segundo", "Tercero", "Cuarto", "Latitude"];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const meals = ["Breakfast", "Lunch", "Dinner"];

  return (
    <div className="flex flex-col sm:px-32 px-5 gap-10">
      {/* Tabs for DCs */}
      <div className="tabs tabs-boxed">
        {allDCs.map((dc, index) => (
          <div
            key={index}
            role="tab"
            className={`tab ${selectedDC === dc ? "tab-active" : ""}`}
            onClick={() => setSelectedDC(dc)}
          >
            {dc}
          </div>
        ))}
      </div>
      {/* Days of the week */}
      <div className="tabs tabs-bordered sm:tabs-md tabs-xs">
        {days.map((day, index) => (
          <div
            key={day}
            role="tab"
            className={`tab ${
              selectedDay === String(index) ? "tab-active" : ""
            }`}
            onClick={() => setSelectedDay(String(index))}
          >
            {day}
          </div>
        ))}
      </div>
      {/* Meals */}
      <div className="tabs tabs-bordered">
        {meals.map((meal) => (
          <div
            key={meal}
            role="tab"
            className={`tab ${selectedMeal === meal ? "tab-active" : ""}`}
            onClick={() => setSelectedMeal(meal)}
          >
            {meal}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Selections;
