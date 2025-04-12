"use client";
import React, { useEffect, useState, useCallback } from "react";
import FoodTrucks from "../api/foodTruckSchema";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Props {
    place?: string;
    time?: string;
    location?: string;
    description?: string;
}

const FoodTruckDisplay = ({
    place = "",
    time = "",
    location = "",
    description = "",
}: Props) => {
    const [foodTrucks, setFoodTrucks] = useState<FoodTrucks[]>([]);
    const [sections, setSections] = useState<string[]>([""]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSection, setSelectedSection] = useState<number | null>(0);

    // Define the days array
    const dayNames = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const minTimeout = useCallback(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
        []
    );

    const fetchFoodTrucks = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SCRAPER_API_URL}/api/foodtrucks`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch data from the backend");
            }

            const data = await response.json();
            console.log("API Response:", data); // Debugging line

            if (data && Array.isArray(data.food_trucks)) {
                setFoodTrucks(data.food_trucks);
            } else {
                console.error("Invalid API data format:", data);
                setFoodTrucks([]);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setFoodTrucks([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchFoodTrucks();
    }, [place, time, location, minTimeout]);

    const handleAccordionClick = (curNumber: number) => {
        setSelectedSection(selectedSection === curNumber ? null : curNumber);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center align-middle justify-center py-60">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <main className="flex flex-col lg:flex-row w-full font-red-hat">
            {/* Main content with menu items */}
            <header className="w-full lg:flex-1 lg:flex lg:flex-row ">
                <div className="grid gris-cols-1 py-[40px] gap-x-[31px] gap-y-[8px] sm:grid-cols-2 px-[20px] md:px-[140px] lg:w-[1450px] max-w-[1450px]">
                    {foodTrucks?.length > 0 ? (
                        foodTrucks.map((trucks, index) => (
                            <div
                                key={index}
                                className="flex bg-white rounded-[5px] p-[20px]"
                            >
                                <div className="flex items-center justify-center sm:justify-start ">
                                    <section className="flex flex-row items-center justify-center gap-x-[20px]">
                                        <div className="bg-[#ecf5f7] px-[9px] py-[22px] rounded-[5px]">
                                            <Image
                                                src="/foodtruck.svg"
                                                alt="food truck"
                                                width={69}
                                                height={42}
                                            />
                                        </div>

                                        <div className="flex flex-col text-textDarkBlue">
                                            <section className="text-sm font-bold mb-[12px]">
                                                <p>{trucks.place}</p>
                                            </section>
                                            <section className="text-sm font-normal mb-[8px]">
                                                <p>{trucks.description}</p>
                                                {/* <p>{trucks.location} </p> */}
                                            </section>
                                            <section className="text-sm font-normal hidden md:block">
                                                <p>
                                                    {trucks.time
                                                        ?.slice(1)
                                                        .replace("to", "-")}
                                                </p>
                                            </section>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            No food trucks available.
                        </p>
                    )}
                </div>
            </header>
        </main>
    );
};

export default FoodTruckDisplay;
