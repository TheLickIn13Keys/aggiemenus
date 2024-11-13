"use client";
import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  selectedDC: string;
  setSelectedDC: (dc: string) => void;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
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
  const [direction, setDirection] = useState(0);

  const changeDay = (nextOrPrev: number) => {
    setDirection(nextOrPrev);
    const nextDayIndex = (selectedDay + nextOrPrev + days.length) % days.length;
    setSelectedDay(nextDayIndex);
  };

  return (
    <div className="flex flex-col pb-5 sm:gap-7">
      {/* DC Tabs */}
      <div className="w-full bg-white sm:px-0 px-10">
        <div className="grid grid-cols-4 w-full">
          {allDCs.map((dc) => (
            <button
              key={dc}
              onClick={() => setSelectedDC(dc)}
              className={`relative py-3 text-primary sm:text-xl text-sm font-semibold text-center hover:cursor-pointer ${
                selectedDC === dc ? 'border-b-2 border-primary' : ''
              }`}
            >
              {dc}
            </button>
          ))}
        </div>
      </div>

      {/* Days and Meals */}
      <div className="flex flex-col border-t-2 border-b-2 border-primary border-opacity-15 sm:py-5 py-3 sm:gap-3 gap-5 sm:px-32 px-8">
        {/* Day selector */}
        <div className="flex justify-between items-center relative">
          <button
            className="hover:cursor-pointer"
            onClick={() => changeDay(-1)}
          >
            <MdKeyboardArrowLeft color="primary" size={30} />
          </button>
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedDay}
              className="flex align-middle justify-center items-center sm:text-xl text-lg text-primary font-semibold"
              initial={{ opacity: 0, x: direction === 1 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 1 ? -50 : 50 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.3,
              }}
            >
              {days[selectedDay]}
            </motion.p>
          </AnimatePresence>
          <button 
            className="hover:cursor-pointer"
            onClick={() => changeDay(1)}
          >
            <MdKeyboardArrowRight color="primary" size={30} />
          </button>
        </div>

        {/* Meal selector */}
        <div className="relative h-12">
          <div className="grid grid-cols-3 gap-4">
            {meals.map((meal) => (
              <button
                key={meal}
                onClick={() => setSelectedMeal(meal)}
                className={`relative rounded-full transition-colors duration-300 ${
                  selectedMeal === meal 
                    ? 'bg-primary text-white' 
                    : 'text-primary hover:bg-primary/10'
                } sm:text-xl text-sm font-semibold py-2`}
              >
                {meal}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selections;