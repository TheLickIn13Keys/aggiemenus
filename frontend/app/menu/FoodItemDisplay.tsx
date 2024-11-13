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
    if (filters.halal) filteredItems = filteredItems.filter(item => item.common_items.halal);
    if (filters.vegetarian) filteredItems = filteredItems.filter(item => item.common_items.vegetarian);
    if (filters.vegan) filteredItems = filteredItems.filter(item => item.common_items.vegan);
    if (filters.pescetarian) filteredItems = filteredItems.filter(item => item.common_items.pescetarian);

    // Apply allergen filters
    if (filters.milk) {
      filteredItems = filteredItems.filter(item => 
        !item.common_items.allergens.some(allergen => 
          allergen.toUpperCase().includes('DAIRY') || 
          allergen.toUpperCase().includes('MILK')
        )
      );
    }
    if (filters.eggs) {
      filteredItems = filteredItems.filter(item => 
        !item.common_items.allergens.some(allergen => 
          allergen.toUpperCase().includes('EGG')
        )
      );
    }
    if (filters.fish) {
      filteredItems = filteredItems.filter(item => 
        !item.common_items.allergens.some(allergen => 
          allergen.toUpperCase().includes('FISH')
        )
      );
    }
    if (filters.shellfish) {
      filteredItems = filteredItems.filter(item => 
        !item.common_items.allergens.some(allergen => 
          allergen.toUpperCase().includes('SHELLFISH')
        )
      );
    }
    if (filters.treeNuts) {
      filteredItems = filteredItems.filter(item => 
        !item.common_items.allergens.some(allergen => 
          allergen.toUpperCase().includes('TREE NUTS')
        )
      );
    }
    if (filters.peanuts) {
      filteredItems = filteredItems.filter(item => 
        !item.common_items.allergens.some(allergen => 
          allergen.toUpperCase().includes('PEANUT') ||
          allergen.toUpperCase().includes('PEANUT OIL')
        )
      );
    }
    if (filters.wheat) {
      filteredItems = filteredItems.filter(item => 
        !item.common_items.allergens.some(allergen => 
          allergen.toUpperCase().includes('WHEAT') ||
          allergen.toUpperCase().includes('GLUTEN')
        )
      );
    }
    if (filters.soybeans) {
      filteredItems = filteredItems.filter(item => 
        !item.common_items.allergens.some(allergen => 
          allergen.toUpperCase().includes('SOY') ||
          allergen.toUpperCase().includes('SOYBEAN OIL') ||
          allergen.toUpperCase().includes('SOY LECITHIN')
        )
      );
    }
    if (filters.sesame) {
      filteredItems = filteredItems.filter(item => 
        !item.common_items.allergens.some(allergen => 
          allergen.toUpperCase().includes('SESAME')
        )
      );
    }
    if (filters.alcohol) {
      filteredItems = filteredItems.filter(item => 
        !item.common_items.allergens.some(allergen => 
          allergen.toUpperCase().includes('ALCOHOL')
        )
      );
    }
    if (filters.vinegar) {
      filteredItems = filteredItems.filter(item => 
        !item.common_items.allergens.some(allergen => 
          allergen.toUpperCase().includes('VINEGAR')
        )
      );
    }
    if (filters.glutenFree) {
      filteredItems = filteredItems.filter(item => {
        const allergens = item.common_items.allergens.map(allergen => 
          allergen.toLowerCase()
        );
        return !allergens.some(allergen => 
          allergen.includes('wheat') || allergen.includes('gluten')
        );
      });
    }
    
    if (filters.dairyFree) {
      filteredItems = filteredItems.filter(item => {
        const allergens = item.common_items.allergens.map(allergen => 
          allergen.toLowerCase()
        );
        return !allergens.some(allergen => 
          allergen.includes('dairy')
        );
      });
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
          new Set(items.map((item) => item.section || "Other"))
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

  const filteredItems = filterItems(foodItems);

  return (
    <div className="sm:px-32 pb-10">
      <FilterOptions filters={filters} setFilters={setFilters} />
      
      {isLoading ? (
        <div className="flex flex-col items-center align-middle justify-center py-60">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : filteredItems.length === 0 ? (
        searchQuery ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-xl text-gray-500">No results found for &ldquo;{searchQuery}&rdquo;</p>
          </div>
        ) : (
          <NoFoodItems dc={dc} />
        )
      ) : (
        sections.map((section, sectionIndex) => (
          <div key={section} className="mb-8">
            <h2 className="text-xl font-semibold text-textDarkBlue mb-4">{section}</h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-4"
            >
              {filteredItems
                .filter(item => item.section === section)
                .map((foodItem, index) => (
                  <motion.div
                    key={foodItem.id}
                    variants={itemVariants}
                    className="w-full"
                  >
                    <label htmlFor={`food_item_${sectionIndex}_${index}`}>
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
        ))
      )}
    </div>
  );
};

export default FoodItemDisplay;