"use client";
import React, { useEffect, useState, useCallback } from "react";
import FoodItem from "../api/foodItemSchema";
import { createClient } from "@supabase/supabase-js";
import FoodItemCard from "./FoodItemCard";
import FoodItemModal from "./FoodItemModal";
import NoFoodItems from "./NoFoodItems";
import { motion } from "framer-motion";
import FilterOptions from "./FilterOptions";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Props {
    dc: string;
    day: number;
    meal: string;
    searchQuery: string;
    isFilterOpen: boolean;
    setIsFilterOpen: (isOpen: boolean) => void;
}

const FoodItemDisplay = ({
    dc,
    day,
    meal,
    searchQuery,
    isFilterOpen,
    setIsFilterOpen,
}: Props) => {
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [sections, setSections] = useState<string[]>([""]);
    const [filters, setFilters] = useState({
        halal: false,
        vegetarian: false,
        vegan: false,
        pescetarian: false,
        milk: false,
        eggs: false,
        fish: false,
        shellfish: false,
        treeNuts: false,
        peanuts: false,
        wheat: false,
        soybeans: false,
        sesame: false,
        alcohol: false,
        vinegar: false,
    });
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

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

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

    const filterItems = (items: FoodItem[]) => {
        let filteredItems = items;

        // Apply dietary filters
        if (filters.halal)
            filteredItems = filteredItems.filter(
                (item) => item.common_items.halal
            );
        if (filters.vegetarian)
            filteredItems = filteredItems.filter(
                (item) => item.common_items.vegetarian
            );
        if (filters.vegan)
            filteredItems = filteredItems.filter(
                (item) => item.common_items.vegan
            );
        if (filters.pescetarian)
            filteredItems = filteredItems.filter(
                (item) => item.common_items.pescetarian
            );

        // Apply allergen filters
        const allergenFilters = {
            milk: ["DAIRY", "MILK"],
            eggs: ["EGG"],
            fish: ["FISH"],
            shellfish: ["SHELLFISH"],
            treeNuts: ["TREE NUTS"],
            peanuts: ["PEANUT", "PEANUT OIL"],
            wheat: ["WHEAT", "GLUTEN"],
            soybeans: ["SOY", "SOYBEAN OIL", "SOY LECITHIN"],
            sesame: ["SESAME"],
            alcohol: ["ALCOHOL"],
            vinegar: ["VINEGAR"],
        };

        Object.entries(allergenFilters).forEach(([filter, terms]) => {
            if (filters[filter as keyof typeof filters]) {
                filteredItems = filteredItems.filter(
                    (item) =>
                        !item.common_items.allergens.some((allergen) =>
                            terms.some((term) =>
                                allergen.toUpperCase().includes(term)
                            )
                        )
                );
            }
        });

        // Apply search query filter
        if (searchQuery) {
            filteredItems = filteredItems.filter(
                (item) =>
                    item.common_items.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    item.common_items.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    item.section
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
        }

        return filteredItems;
    };

    const fetchFoodItems = async () => {
        try {
            // Get current date and adjust it to the selected day
            const today = new Date();
            const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ...
            const daysToAdd = day - ((currentDay + 6) % 7); // Adjust since our day starts from Monday (0)
            const targetDate = new Date(today);
            targetDate.setDate(today.getDate() + daysToAdd);

            // console.log(`Fetching items for:
            //     DC: ${dc}
            //     Day: ${day} (${dayNames[day]})
            //     Date: ${targetDate.toLocaleDateString('en-US', {
            //         weekday: 'long',
            //         year: 'numeric',
            //         month: 'long',
            //         day: 'numeric'
            //     })}
            //     Meal: ${meal}
            // `);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SCRAPER_API_URL}/api/menu` +
                    `?dc=${dc}&day=${day}&meal=${meal}`
            );

            const data = await response.clone().json();
            // console.log("API Response:", {
            //     requestParams: {
            //         dc,
            //         day,
            //         date: targetDate.toLocaleDateString('en-GB'), // dd/mm/yyyy format
            //         meal
            //     },
            //     responseData: data.map((item: FoodItem) => ({
            //         dc: item.dc,
            //         day: item.day,
            //         date: targetDate.toLocaleDateString('en-GB'),
            //         meal: item.meal,
            //         name: item.common_items?.name,
            //         section: item.section
            //     }))
            // });

            if (!response.ok) {
                throw new Error("Failed to fetch data from the backend");
            }

            const items: FoodItem[] = await response.json();
            setFoodItems(items);

            const uniqueSections = Array.from(
                new Set(items.map((item) => item.section || "Other"))
            );
            setSections(uniqueSections);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchFoodItems();
    }, [dc, day, meal, minTimeout]);

    const filteredItems = filterItems(foodItems);

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

    if (filteredItems.length === 0) {
        return searchQuery ? (
            <div className="flex flex-col items-center justify-center py-20">
                <p className="text-xl text-gray-500">
                    No results found for &ldquo;{searchQuery}&rdquo;
                </p>
            </div>
        ) : (
            <NoFoodItems dc={dc} />
        );
    }

    return (
        <div className="flex flex-col lg:flex-row w-full">
            {/* Main content with menu items */}
            <div className="w-full lg:flex-1 lg:flex lg:flex-row">
                <div className="px-[20px] py-[15px] md:px-[140px] lg:pr-0 lg:w-[1450px] max-w-[1450px]">
                    {sections.map((section, sectionIndex) => (
                        <div
                            key={`section-${sectionIndex}-${section}`}
                            className="mb-[15px]"
                        >
                            <div className="flex items-center justify-center sm:justify-start">
                                <h2 className="text-lg font-semibold text-textDarkBlue mb-4 md:mt-[40px]">
                                    {section}
                                </h2>
                            </div>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 gap-4 "
                            >
                                {filteredItems
                                    .filter((item) => item.section === section)
                                    .map((foodItem, index) => (
                                        <motion.div
                                            key={`item-${foodItem.id}-${sectionIndex}-${index}`}
                                            variants={itemVariants}
                                            className="w-full"
                                        >
                                            <label
                                                htmlFor={`food_item_${sectionIndex}_${index}`}
                                            >
                                                <FoodItemCard
                                                    foodItem={foodItem}
                                                    index={`${sectionIndex}_${index}`}
                                                />
                                            </label>
                                            <FoodItemModal
                                                foodItem={foodItem}
                                                index={`${sectionIndex}_${index}`}
                                            />
                                        </motion.div>
                                    ))}
                            </motion.div>
                        </div>
                    ))}
                </div>
                {/* Filter options sidebar - hidden on mobile, visible on lg screens */}
                <div className="hidden lg:block w-full max-w-[386px] ml-[45px] mr-[140px] mt-[40px] pt-[30px]">
                    <FilterOptions
                        filters={filters}
                        setFilters={setFilters}
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                    />
                </div>
            </div>

            {/* Mobile filter panel - only render if isFilterOpen is true */}
            {isFilterOpen && (
                <div className="lg:hidden">
                    <FilterOptions
                        filters={filters}
                        setFilters={setFilters}
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default FoodItemDisplay;
