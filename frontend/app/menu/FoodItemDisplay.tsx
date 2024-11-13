"use client";
import React, { useEffect, useState } from "react";
import FoodItem from "../api/foodItemSchema";
import supabase from "../api/supabase";
import FoodItemCard from "./FoodItemCard";
import FoodItemModal from "./FoodItemModal";
import NoFoodItems from "./NoFoodItems";
import { motion } from "framer-motion";
import FilterOptions from "./FilterOptions";

interface Props {
  dc: string;
  day: number;
  meal: string;
  searchQuery: string;
}

const FoodItemDisplay = ({ dc, day, meal, searchQuery }: Props) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [sections, setSections] = useState([""]);
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
    
    if (filters.pescetarian) {
      filteredItems = filteredItems.filter(item => item.common_items.pescetarian);
    }

    // Allergen filters
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

  const [isLoading, setIsLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState<number | null>(0);

  // Used for loading in foodItems animation
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
  const loadingSkeletons = [1, 2, 3];

  // Sets a minimum timeout for the fetch request to resolve (for a smoother user experience)
  const minTimeout = new Promise((resolve: any) => setTimeout(resolve, 800));

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();
    const fetchFoodItems = async () => {
      try {
        const res = await fetch("../api/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dc: dc, day: String(day), meal: meal }),
          signal: abortController.signal,
        });

        const [_, fetchResult] = await Promise.all([minTimeout, res]);

        if (!fetchResult.ok) {
          throw Error("Network response not ok");
        }
        
        const responseData = await fetchResult.json();
        const items = responseData as FoodItem[];
        
        // Log the first item to verify the data structure
        if (items.length > 0) {
          console.log("Sample food item:", items[0]);
          console.log("Sample common_items:", items[0].common_items);
        }

        setFoodItems(items);

        // Get unique sections and replace null values
        const uniqueSections = Array.from(
          new Set(items.map((item) => item.section || "Other"))
        );

        setSections(uniqueSections);

        // Save filters for current session
        // if (typeof window !== undefined) {
        //   sessionStorage.setItem("filters", JSON.stringify({ dc, day, meal }));
        // }

        setIsLoading(false);
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.log("Fetch error: ", error);
        }
      }
    };

    // Call function every time dc, day, or meal changes
    fetchFoodItems();

    // Cleanup function
    return () => {
      abortController.abort();
    };
  }, [dc, day, meal]);

  const handleAccordionClick = (curNumber: number) => {
    if (selectedSection === curNumber) {
      setSelectedSection(null);
    } else {
      setSelectedSection(curNumber);
    }
  };

  return isLoading ? (
    <div className="flex flex-col items-center align-middle justify-center py-60">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <div className="sm:px-32 pb-10">
      <FilterOptions filters={filters} setFilters={setFilters} />
      {/* Map through sections first */}
      {sections.map((section, sectionIndex) => (
        <div key={section} className="mb-8">
          <h2 className="text-xl font-semibold text-textDarkBlue mb-4">{section}</h2>
          {/* Content div for this section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-4"
          >
            {/* Filter items for this section */}
            {filterItems(foodItems)
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
      ))}
      {filterItems(foodItems).length === 0 && 
        (searchQuery ? 
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-xl text-gray-500">No results found for "{searchQuery}"</p>
          </div>
          : 
          <NoFoodItems dc={dc} />
        )
      }
    </div>
  );
};

export default FoodItemDisplay;
