"use client";
import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

//created new search bar component from navbar since isabel wants it in two diff places when on mobile v.s. desktop
//so more feasible to just create a component itself, but logic does not work for the new search bar
import SearchBar from "./Searchbar";

interface Props {
  selectedDC: string;
  setSelectedDC: (dc: string) => void;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  selectedMeal: string;
  setSelectedMeal: (meal: string) => void;
  setSearchQuery: (query: string) => void;
}

const Selections = ({
  selectedDC,
  setSelectedDC,
  selectedDay,
  setSelectedDay,
  selectedMeal,
  setSelectedMeal,
  setSearchQuery,
}: Props) => {
  const allDCs = ["Segundo", "Tercero", "Cuarto", "Latitude"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const meals = ["Breakfast", "Lunch", "Dinner"];
  const [direction, setDirection] = useState(0);
  

  const changeDay = (nextOrPrev: number) => {
    setDirection(nextOrPrev);
    const nextDayIndex = (selectedDay + nextOrPrev + days.length) % days.length;
    setSelectedDay(nextDayIndex);
  };
  // logic for new search bar component 
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  // Remove duplicate searchQuery state since it's passed as prop

  return (
<div className="flex flex-col">
      <div className="relative bg-white lg:pr-[140px]">
      <div className="max-w-[1880px] w-full px-[20px] md:pl-[140px] md:pr-0 lg:flex lg:flex-row lg:items-center lg:justify-between">
      <div className="relative grid grid-cols-4 justify-center items-center h-full md:max-w-[488px] lg:flex-shrink-0">
        {allDCs.map((dc) => (
          <div
            key={dc}
            className="relative col-span-1 text-primary text-sm lg:text-base font-semibold text-center hover:cursor-pointer px-[15px] py-[20px]"
            onClick={() => setSelectedDC(dc)}
          >
            {dc}
            {selectedDC === dc && (
              <motion.div
                className="absolute w-full left-0 bottom-0 bg-primary h-[2px]"
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
        ))}
      </div>
      
      {/* implement logic */}
      <SearchBar
      searchBarOpen={searchBarOpen}
      setSearchBarOpen={setSearchBarOpen}
      setSearchQuery={setSearchQuery}/>

    </div>
      </div>

      {/* Days and meals - below DCs, also in left third */}
      <div className="border-t-2 border-b-2 border-primary border-opacity-15 px-[20px] md:px-0 pt-[20px] md:pt-0">
        {/* sub container so border can stretch, but margin applies only to content  */}
        <div className="w-full max-w-screen md:max-w-[calc(100%-280px)] md:mx-[140px] flex flex-col md:flex-row">
        {/* Days of the week */}
        <div className="flex order-1 md:order-3 justify-between relative px-[20px] gap-x-[20px] items-center">
          {/* button for mobile screens */}
          <img src="/calendar.svg" className="hidden md:block w-[24px] h-[24px]"/>

          <button
            className="hover:cursor-pointer text-primary"
            onClick={() => changeDay(-1)}
          >
            <MdKeyboardArrowLeft size={20} />

          </button>
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedDay}
              className="lg:text-base flex align-middle justify-center items-center text-sm text-primary font-semibold"
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

          <button className="hover:cursor-pointer text-primary" onClick={() => changeDay(1)}>
            <MdKeyboardArrowRight size={20} />
          </button>
        </div>
        
        {/* divider between meal selector and days selector */}
        <div className="hidden md:block order-2 bg-[#CBDEEF] self-stretch w-[2px]"/>
            

        {/* Meals */}
        <div className="relative order-2 md:order-1 ">
      <div className="grid grid-cols-3 gap-x-[20px] justify-center items-center h-full">
        {meals.map((meal) => (
          <div
            key={meal}
            className="flex px-[15px] py-[20px] relative col-span-1 items-center justify-center text-primary text-sm lg:text-base font-semibold text-center hover:cursor-pointer"
            onClick={() => setSelectedMeal(meal)}
          >
            {meal}
            
            {/* Animated underline - only appears for selected meal */}
            {selectedMeal === meal && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-primary h-[2px]"
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
    </div>
  );
};

export default Selections;