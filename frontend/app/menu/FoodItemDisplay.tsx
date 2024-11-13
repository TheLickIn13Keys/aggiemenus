"use client";
import React, { useEffect, useState, useCallback } from "react";
import FoodItem from "../api/foodItemSchema";
import { createClient } from '@supabase/supabase-js'
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
}

const FoodItemDisplay = ({ dc, day, meal, searchQuery }: Props) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [sections, setSections] = useState<string[]>([""]);
  const [filters, setFilters] = useState({
    halal: false,
    vegetarian: false,
    vegan: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState<number | null>(0);

  // Animation variants
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

  const minTimeout = useCallback(() => new Promise(resolve => setTimeout(resolve, 800)), []);

  const filterItems = (items: FoodItem[]) => {
    let filteredItems = items;

    // Apply dietary filters
    if (filters.halal) {
      filteredItems = filteredItems.filter(item => item.common_items.halal);
    }
    if (filters.vegetarian) {
      filteredItems = filteredItems.filter(item => item.common_items.vegetarian);
    }
    if (filters.vegan) {
      filteredItems = filteredItems.filter(item => item.common_items.vegan);
    }

    // Apply search query filter
    if (searchQuery) {
      filteredItems = filteredItems.filter(item =>
        item.common_items.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.common_items.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.section.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredItems;
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchFoodItems = async () => {
      try {
        const [_] = await Promise.all([minTimeout()]);
        
        const { data, error } = await supabase
          .from('current_menu')
          .select(`*, common_items ( * )`)
          .eq('dc', dc)
          .eq('day', String(day))
          .eq('meal', meal);

        if (error) throw error;

        const items = data as FoodItem[];
        setFoodItems(items);

        const uniqueSections = Array.from(
          new Set(items.map((item) => item.section))
        );
        setSections(uniqueSections);
      } catch (error: any) {
        console.log("Fetch error: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoodItems();
  }, [dc, day, meal, minTimeout]);

  return (
    <div className="sm:px-32 pb-10">
      <FilterOptions filters={filters} setFilters={setFilters} />
      {isLoading ? (
        <div className="flex flex-col items-center align-middle justify-center py-60">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 py-[15px] gap-5`}
        >
          {filterItems(foodItems)
            .map((foodItem, index) => (
              <motion.div
                key={foodItem.id}
                variants={itemVariants}
                className="flex flex-col justify-center"
              >
                <label htmlFor={`food_item_${index}`} className="h-full">
                  <FoodItemCard foodItem={foodItem} />
                </label>

                <FoodItemModal
                  foodItem={foodItem}
                  index={index}
                />
              </motion.div>
            ))}
        </motion.div>
      )}
      {!isLoading && filterItems(foodItems).length === 0 && 
        (searchQuery ? 
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-xl text-gray-500">No results found for &ldquo;{searchQuery}&rdquo;</p>
          </div>
          : 
          <NoFoodItems dc={dc} />
        )
      }
    </div>
  );
};

export default FoodItemDisplay;