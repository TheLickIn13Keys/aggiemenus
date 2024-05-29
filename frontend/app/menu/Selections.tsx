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
    <div className="flex flex-col pb-5 sm:gap-7">
      {/* Tabs for DCs */}
      <div className="relative sm:h-12 h-10 bg-white sm:px-0 px-10">
        <div
          className={`grid grid-cols-${allDCs.length} justify-center items-center h-full`}
        >
          {allDCs.map((dc) => (
            <div
              key={dc}
              className="col-span-1 items-center justify-between text-primary sm:text-xl text-sm font-semibold text-center hover:cursor-pointer"
              onClick={() => setSelectedDC(dc)}
            >
              {dc}
            </div>
          ))}
        </div>
        {/* Animation for DC selection */}
        <motion.div
          className="absolute left-5 bottom-0 h-0.5 bg-primary" // Adjust left position by the same amount of px-5
          style={{
            width: `calc((100% - 40px) / 4)`,
          }} // Subtract padding from total width
          animate={{
            x: `calc(${allDCs.indexOf(selectedDC)} * 100%)`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.1,
          }}
        />
      </div>
      {/* Days of the week and meals*/}
      <div className="flex flex-col border-t-2 border-b-2 border-primary border-opacity-15 sm:py-5 py-3 sm:gap-3 gap-5 sm:px-32 px-8">
        {/* Days of the week */}
        <div className="flex justify-between relative">
          <button
            className="hover:cursor-pointer"
            onClick={() => changeDay(-1)}
          >
            <MdKeyboardArrowLeft color="bg-primary" size={30} />
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
            <MdKeyboardArrowRight color="bg-primary" size={30} />
          </button>
        </div>
        {/* Meals */}
        <div className="relative sm:h-12 h-10">
          <div
            className={`grid grid-cols-3 justify-center items-center h-full`}
          >
            {meals.map((meal) => (
              <div
                key={meal}
                className="col-span-1 items-center justify-between"
                onClick={() => setSelectedMeal(meal)}
              >
                <p
                  className={`${
                    selectedMeal === meal ? "text-white" : "text-primary"
                  } sm:text-xl text-sm font-semibold text-center`}
                >
                  {meal}
                </p>
                {/* Animate pill for meal times */}
                <AnimatePresence mode="wait">
                  {selectedMeal === meal && (
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-full -z-10"
                      style={{
                        width: `${100 / meals.length}%`,
                        x: `${meals.indexOf(meal) * 100}%`,
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
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selections;
