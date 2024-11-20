"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../menu/NavBar";
import Footer from "../menu/Footer";
import { getCookie, setCookie } from 'cookies-next';
import Link from "next/link";
import { createClient } from '@supabase/supabase-js';
import FoodItem from "../api/foodItemSchema";

interface FavoriteItem {
  id: string;
  name: string;
  dc?: string;
  section?: string;
  meal?: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'all' | 'available'>('all');
  const [currentDay, setCurrentDay] = useState(0);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    const storedFavorites = getCookie('favorites');
    
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites as string);
        parsedFavorites.forEach((item: FavoriteItem, index: number) => {
          console.log(`Item ${index}:`, {
            id: item.id,
            name: item.name,
            dc: item.dc,
            section: item.section,
            meal: item.meal
          });
        });
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error("Error parsing favorites:", error);
      }
    }
  }, []);

  useEffect(() => {
    const curDate = new Date(Date.now());
    const day = (curDate.getDay() - 1 + 7) % 7;
    setCurrentDay(day);
  }, []);

  useEffect(() => {
    const fetchCurrentMenu = async () => {
      try {
        const { data, error } = await supabase
          .from('current_menu')
          .select(`*, common_items ( * )`)
          .eq('day', String(currentDay));

        if (error) throw error;
        setFoodItems(data || []);
      } catch (error) {
        console.error("Error fetching current menu:", error);
      }
    };

    if (currentDay !== null) {
      fetchCurrentMenu();
    }
  }, [currentDay]);

  const getAvailableFavorites = () => {
    return favorites.filter(item => {
      const matchingItems = foodItems.filter(foodItem => 
        foodItem.id === item.id && 
        foodItem.dc === item.dc &&
        foodItem.meal === item.meal
      );
      return matchingItems.length > 0;
    });
  };

  // Modify the groupedFavorites calculation to use the filtered favorites based on activeTab
  const favoritesToDisplay = activeTab === 'available' ? getAvailableFavorites() : favorites;

  const groupedFavorites = favoritesToDisplay.reduce((acc, item) => {
    const dc = item.dc || 'Other';
    const section = item.section || 'Other';
    
    if (!acc[dc]) {
      acc[dc] = {};
    }
    if (!acc[dc][section]) {
      acc[dc][section] = [];
    }
    acc[dc][section].push(item);
    return acc;
  }, {} as Record<string, Record<string, FavoriteItem[]>>);

  const toggleFavorite = (item: FavoriteItem) => {
    const favorites: FavoriteItem[] = JSON.parse(getCookie('favorites') || '[]');
    const newFavorites = favorites.filter(fav => 
      !(fav.id === item.id && fav.name === item.name)
    );
    setCookie('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavBar
          searchBarOpen={searchBarOpen}
          setSearchBarOpen={setSearchBarOpen}
          setSearchQuery={setSearchQuery}
        />
      </header>
      <main className="flex-grow sm:px-32 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-textDarkBlue">
            My Favorites
          </h1>
          <Link href="/menu">
            <button className="flex flex-row items-center gap-x-[5px] text-primary">
              <span className="font-red-hat text-base font-medium">Home</span>
            </button>
          </Link>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Favorites
          </button>
          <button
            onClick={() => setActiveTab('available')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'available'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Available Today
          </button>
        </div>

        {Object.keys(groupedFavorites).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-xl text-gray-500">No favorites yet</p>
          </div>
        ) : (
          Object.entries(groupedFavorites).map(([dc, sections]) => (
            <div key={dc} className="mb-8">
              <h2 className="text-2xl font-semibold text-textDarkBlue mb-4">{dc}</h2>
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(sections).flatMap(([section, items]) => 
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col">
                        <div className="flex justify-between items-start">
                          <h4 className="text-lg font-semibold text-textDarkBlue">
                            {item.name}
                          </h4>
                          <button 
                            onClick={() => toggleFavorite(item)}
                            className="flex items-center justify-center bg-[#F1F7F7] rounded-full w-[30px] h-[30px]"
                          >
                            <img 
                              src="/filled_heart_icon.svg"
                              className="transition-transform duration-300 hover:scale-110"
                            />
                          </button>
                        </div>
                        <div className="flex gap-2 text-sm text-gray-500 mt-1">
                          <span className="text-primary font-medium">
                            {item.meal || "Unknown Meal"}
                          </span>
                          <span>•</span>
                          <span>{item.section}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default FavoritesPage;
