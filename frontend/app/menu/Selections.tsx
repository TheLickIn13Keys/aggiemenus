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

  const [direction, setDirection] = useState(0); // Direction in which to move days (next or prev day)

  const changeDay = (nextOrPrev: number) => {
    setDirection(nextOrPrev);
    const nextDayIndex = (selectedDay + nextOrPrev + days.length) % days.length; // Allows the index to wrap around, even if it's negative
    setSelectedDay(nextDayIndex);
  };

  return (
    <div className="flex flex-col sm:gap-7">
      {/* Tabs for DCs */}
      <div className="relative">
      <div className="grid grid-cols-4 justify-center items-center h-full bg-white mx-[10px]">
        {allDCs.map((dc) => (
          <div
            key={dc}
            className="col-span-1 items-center justify-between relative hover:cursor-pointer"
            onClick={() => setSelectedDC(dc)}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={dc}
                className={`text-sm px-[15px] py-[20px] flex align-middle justify-center items-center sm:text-xl text-lg font-semibold ${
                  selectedDC === dc ? "text-textDarkBlue" : "text-primary"
                }`}
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
                {dc}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {selectedDC === dc && (
                <motion.div
                  className="absolute bottom-0 left-0 bg-primary h-[2px] w-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    duration: 0.1,
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
      {/* Days of the week and meals */}
      <div className="flex flex-col border-t-2 border-b-2 border-primary border-opacity-15 sm:px-32 px-0">
        {/* Days of the week */}
        <div className="flex justify-between relative mt-[20px] mx-[20px]">
          <button
            className="hover:cursor-pointer"
            onClick={() => changeDay(-1)}
          >
            <MdKeyboardArrowLeft className="text-primary" size={30} />
          </button>
          {/* Animation for switching days */}
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
          <button className="hover:cursor-pointer" onClick={() => changeDay(1)}>
            <MdKeyboardArrowRight className="text-primary" size={30} />
          </button>
        </div>
        {/* Meals */}
        <div className="relative">
          <div
            className={`grid grid-cols-3 justify-center items-center h-full`}
          >
            {meals.map((meal) => (
              <div
                key={meal}
                className="px-[15px] py-[20px] col-span-1 items-center justify-between relative mx-2"
                onClick={() => setSelectedMeal(meal)}
              >
                <p
                  className={`${
                    selectedMeal === meal ? "text-textDarkBlue" : "text-primary"
                  } sm:text-xl text-sm font-semibold text-center`}
                >
                  {meal}

                </p>
                <AnimatePresence mode="wait">
                  {selectedMeal === meal && (
                    <motion.div
                      className="absolute bottom-0 left-0 bg-primary h-[2px] w-full"
                      
                      initial={{ scaleX: 0.5, scaleY: 0.5, opacity: 0 }}
                      animate={{ scaleX: 1, scaleY: 1, opacity: 1 }}
                      exit={{ scaleX: 0.5, scaleY: 0.5, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        duration: 0.1,
                      }}
                    />
                  )}
                </AnimatePresence>
                {/* Animate pill for meal times */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selections;
