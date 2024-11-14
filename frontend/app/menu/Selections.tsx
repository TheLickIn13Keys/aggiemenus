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
    <div className="flex flex-col">
      {/* Tabs for DCs - in top left third */}
      <div className="relative bg-white">
      <div className="w-screen">
      <div className="relative grid grid-cols-4 justify-center items-center h-full px-[15px] py-[20px]">
        {allDCs.map((dc) => (
          <div
            key={dc}
            className="col-span-1 text-primary text-sm font-semibold text-center hover:cursor-pointer"
            onClick={() => setSelectedDC(dc)}
          >
            {dc}
          </div>
        ))}
        {selectedDC && (
          <motion.div
            className="absolute bottom-0 bg-primary h-[2px]"
            style={{
              width: '25%',
              left: `${allDCs.indexOf(selectedDC) * 25}%`
            }}
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
      </div>
    </div>
      </div>

      {/* Days and meals - below DCs, also in left third */}
      <div className="w-screen flex flex-col border-t-2 border-b-2 border-primary border-opacity-15">
        {/* Days of the week */}
        {/* FIX NEGATIVE MARGINS */}
        <div className="flex justify-between relative px-4 py-2 pt-[20px] -mb-[12px]">
          <button
            className="hover:cursor-pointer"
            onClick={() => changeDay(-1)}
          >
            <MdKeyboardArrowLeft color="bg-primary" size={20} />

          </button>
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedDay}
              className="flex align-middle justify-center items-center text-sm text-primary font-semibold"
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
            <MdKeyboardArrowRight color="bg-primary" size={20} />
          </button>
        </div>

        {/* Meals */}
        <div className="relative py-3">
      <div className="-mb-[15px] grid grid-cols-3 justify-center items-center h-full">
        {meals.map((meal) => (
          <div
            key={meal}
            className="px-[15px] py-[20px] relative col-span-1 items-center justify-between text-primary text-sm font-semibold text-center hover:cursor-pointer"
            onClick={() => setSelectedMeal(meal)}
          >
            {meal}
            
            {/* Animated underline - only appears for selected meal */}
            {selectedMeal === meal && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 mx-[15px] bg-primary h-[2px]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  duration: 0.1,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
      </div>
    </div>
  );
};

export default Selections;