"use client";
import React, { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineMenu } from "react-icons/md";
import { IoGridOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "../menu/Searchbar";
import Image from "next/image";

interface Props {
  selectedCampus: string;
  setSelectedCampus: (dc: string) => void;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  setSearchQuery: (query: string) => void;
  view: "default" | "grid";
  setView: (view: "default" | "grid") => void;
}

const Selections = ({
  selectedCampus,
  setSelectedCampus,
  selectedDay,
  setSelectedDay,
  setSearchQuery,
  view,
  setView,

}: Props) => {
  const CampusSpots = ["Memorial Union", "The Silo", "Food Trucks"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [direction, setDirection] = useState(0);
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const changeDay = (nextOrPrev: number) => {
    setDirection(nextOrPrev);
    const nextDayIndex = (selectedDay + nextOrPrev + days.length) % days.length;
    setSelectedDay(nextDayIndex);
  };

  return (
    <div className="flex flex-col bg-white">
      <div className="relative lg:pr-[140px]">
        <div className="max-w-[1880px] w-full px-[20px] md:pl-[140px] md:pr-0 lg:flex lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-row justify-between md:grid md:grid-cols-4 relative md:justify-center items-center h-full lg:flex-shrink-0 ">
            {CampusSpots.map((spot) => (
              <div
                key={spot}
                className="relative text-primary text-sm lg:text-base font-semibold text-center hover:cursor-pointer px-[15px] py-[20px]"
                onClick={() => setSelectedCampus(spot)}
              >
                {spot}
                {selectedCampus === spot && (
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

          <SearchBar
            searchBarOpen={searchBarOpen}
            setSearchBarOpen={setSearchBarOpen}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>

      <div className="bg-[#ECF5F7] border-t-2 border-b-2 border-[#CBDEEF] px-[20px] md:px-0 pt-[20px] pb-[20px] md:pb-0 md:pt-0">
        <div className="w-full max-w-screen md:max-w-[calc(100%-280px)] md:mx-[140px] flex flex-col md:flex-row md:items-center">
          <div className="flex flex-col md:flex-row md:items-center flex-grow ">

            {/* Days */}
            <div className="flex h-full justify-between relative px-[20px] gap-x-[20px] items-center ">
            
              <Image
                src="/calendar.svg"
                alt="calendar"
                width={24}
                height={24}
                className="hidden md:block"
              />

              <button className="hover:cursor-pointer text-primary" onClick={() => changeDay(-1)}>
                <MdKeyboardArrowLeft size={20} />
              </button>

              <AnimatePresence mode="wait">
                <motion.p key={selectedDay} className="lg:text-base flex align-middle justify-center items-center text-sm text-primary font-semibold">
                  {days[selectedDay]}
                </motion.p>
              </AnimatePresence>

              <button className="hover:cursor-pointer text-primary" onClick={() => changeDay(1)}>
                <MdKeyboardArrowRight size={20} />
              </button>
            </div>

            <Image
                 src="/nav-divider.svg"
                 alt="divider"
                 width={2}
                 height={64}
                 className="hidden md:block"
              />

            {/* <div className="hidden md:block bg-[#CBDEEF] self-stretch w-[2px] mx-4" /> */}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Selections;
