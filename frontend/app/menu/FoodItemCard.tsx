import React, { useState, useEffect } from "react";
import FoodItem from "../api/foodItemSchema";
import Image from "next/image";
import { getCookie, setCookie } from 'cookies-next';

interface Props {
  foodItem: FoodItem;
  index: string;
}

interface FavoriteItem {
  id: string;
  name: string;
}

/**
im adding some custom colors in the tailwind.config.js file for the new filters, isabel can look over them later and change them if needed
 */

const FoodItemCard = ({ foodItem, index }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if item is already favorited
    const favorites: FavoriteItem[] = JSON.parse(getCookie('favorites') || '[]');
    setIsFavorite(favorites.some(item => 
      item.id === foodItem.id && item.name === foodItem.common_items.name
    ));
  }, [foodItem]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent modal from opening
    const favorites: FavoriteItem[] = JSON.parse(getCookie('favorites') || '[]');
    
    if (isFavorite) {
      // Remove from favorites
      const newFavorites = favorites.filter(item => 
        !(item.id === foodItem.id && item.name === foodItem.common_items.name)
      );
      setCookie('favorites', JSON.stringify(newFavorites));
    } else {
      // Add to favorites
      favorites.push({
        id: foodItem.id,
        name: foodItem.common_items.name
      });
      setCookie('favorites', JSON.stringify(favorites));
    }
    
    setIsFavorite(!isFavorite);
    console.log('Favorites:', JSON.parse(getCookie('favorites') || '[]'));
  };

  return (
    <label htmlFor={`food_item_${index}`}>
      <div className="flex flex-row justify-between items-center rounded bg-white px-6 py-4 hover:bg-slate-200 hover:cursor-pointer transition duration-300 ease-in-out">
        <div className="flex flex-col">
          <div className="font-semibold text-sm text-textDarkBlue">
            {foodItem.common_items.name}
          </div>
          <div className="text-gray-400 text-xs">
            {foodItem.section}
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          {/* Favorite Icon */}
          <div 
            onClick={toggleFavorite}
            className="cursor-pointer transition-all duration-300"
          >
            <Image
              src={isFavorite ? "/favorite_icon_filled.svg" : "/favorite_icon.svg"}
              alt="Favorite"
              width={20}
              height={20}
              className="hover:scale-110 transition-transform duration-300"
            />
          </div>
          {/* Calories */}
          {foodItem.common_items.calories !== "N/A" && (
            <div className="px-3 py-1 rounded-full bg-calorieBlue text-white text-xs font-red-hat">
              {Math.round(parseInt(foodItem.common_items.calories))} cal
            </div>
          )}
          {/* Vegan */}
          {foodItem.common_items.vegan && (
            <div className="px-[8px] py-[5px] rounded-full bg-veganGreen text-xs font-red-hat">
              Vegan
            </div>
          )}
          {/* Vegetarian */}
          {foodItem.common_items.vegetarian && (
            <div className="px-[8px] py-[5px] rounded-full bg-vegetarianOrange text-xs font-red-hat">
              Vegetarian
            </div>
          )}
          {/* Halal */}
          {foodItem.common_items.halal && (
            <div className="px-[8px] py-[5px] rounded-full bg-halalPink text-xs font-red-hat">
              Halal
            </div>
          )}
          {/* pescetarian */}
          {foodItem.common_items.pescetarian && (
          <div className="px-[8px] py-[5px] rounded-full bg-pescetarianYellow text-xs font-red-hat">
            Pescetarian
          </div>
          )}
        </div>
      </div>
    </label>
  );
};

export default FoodItemCard;
