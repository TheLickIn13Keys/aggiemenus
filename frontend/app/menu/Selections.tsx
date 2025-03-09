"use client";
import React, { useState } from "react";
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdOutlineMenu,
} from "react-icons/md";
import { IoGridOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "./Searchbar";

interface Props {
    selectedDC: string;
    setSelectedDC: (dc: string) => void;
    selectedDay: number;
    setSelectedDay: (day: number) => void;
    selectedMeal: string;
    setSelectedMeal: (meal: string) => void;
    setSearchQuery: (query: string) => void;
    view: "default" | "grid";
    setView: (view: "default" | "grid") => void;
}

const Selections = ({
    selectedDC,
    setSelectedDC,
    selectedDay,
    setSelectedDay,
    selectedMeal,
    setSelectedMeal,
    setSearchQuery,
    view,
    setView,
}: Props) => {
    const allDCs = ["Segundo", "Tercero", "Cuarto", "Latitude"];
    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    const meals = ["Breakfast", "Lunch", "Dinner"];
    const [direction, setDirection] = useState(0);
    const [searchBarOpen, setSearchBarOpen] = useState(false);

    const changeDay = (nextOrPrev: number) => {
        setDirection(nextOrPrev);
        const nextDayIndex =
            (selectedDay + nextOrPrev + days.length) % days.length;
        setSelectedDay(nextDayIndex);
    };

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
                                        initial={{
                                            scaleX: 0.5,
                                            scaleY: 0.5,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            scaleX: 1,
                                            scaleY: 1,
                                            opacity: 1,
                                        }}
                                        exit={{
                                            scaleX: 0.5,
                                            scaleY: 0.5,
                                            opacity: 0,
                                        }}
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

            <div className="border-t-2 border-b-2 border-primary border-opacity-15 px-[20px] md:px-0 pt-[20px] md:pt-0">
                <div className="w-full max-w-screen md:max-w-[calc(100%-280px)] md:mx-[140px] flex flex-col md:flex-row md:items-center">
                    <div className="flex flex-col md:flex-row md:items-center flex-grow">
                        {/* Meals */}
                        <div className="relative order-2 md:order-1">
                            <div className="gap-x-[20px] grid grid-cols-3 justify-center items-center h-full">
                                {meals.map((meal) => (
                                    <div
                                        key={meal}
                                        className="flex px-[15px] py-[20px] relative col-span-1 items-center justify-center text-primary text-sm lg:text-base font-semibold text-center hover:cursor-pointer"
                                        onClick={() => setSelectedMeal(meal)}
                                    >
                                        {meal}
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

                        <div className="hidden md:block order-2 bg-[#CBDEEF] self-stretch w-[2px] mx-4" />

                        {/* Days */}
                        <div className="flex order-1 md:order-3 justify-between relative px-[20px] gap-x-[20px] items-center">
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
                                >
                                    {days[selectedDay]}
                                </motion.p>
                            </AnimatePresence>

                            <button
                                className="hover:cursor-pointer text-primary"
                                onClick={() => changeDay(1)}
                            >
                                <MdKeyboardArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* View Toggle Buttons */}
                    <div className="hidden md:flex items-center justify-center ml-4">
                        <div className="rounded-full bg-white p-[4px] flex items-center justify-center">
                            <button
                                className={`rounded-full p-[10px] ${
                                    view === "default"
                                        ? "bg-textDarkBlue"
                                        : "bg-white"
                                }`}
                                onClick={() => setView("default")}
                            >
                                <MdOutlineMenu />
                            </button>
                            <button
                                className={`rounded-full p-[10px] ${
                                    view === "grid"
                                        ? "bg-textDarkBlue"
                                        : "bg-white"
                                }`}
                                onClick={() => setView("grid")}
                            >
                                <IoGridOutline />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Selections;
