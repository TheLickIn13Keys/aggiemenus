import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import FoodItem from "../../api/foodItemSchema";
import { useFavoritesStore, FavoriteItem } from '../util/favoritesStore';

// mobile view
// need to fix so that available now items dont grab from supabase but grab from our data.json in the backend

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Button component that appears in the navbar
const MobileFavoritesButton = () => {
  return (
    <Link href="/favorites/mobile" className="block md:hidden">
      <button className="flex flex-row items-center gap-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <img className="w-5 h-5" src="/favorite_icon.svg" alt="Favorites" />
        <p className="text-primary font-medium">Favorites</p>
      </button>
    </Link>
  );
};

// The actual mobile favorites page
const MobileFavoritesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'available'>('all');
  const [currentDay, setCurrentDay] = useState(() => {
    const curDate = new Date(Date.now());
    return (curDate.getDay() - 1 + 7) % 7;
  });
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  const { favorites, initializeFavorites, toggleFavorite } = useFavoritesStore();

  useEffect(() => {
    initializeFavorites();
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

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-2xl mb-4">Hello</h1>
      <Link href="/menu">
        <button className="px-4 py-2 bg-primary text-white rounded-lg">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

// Export both components
export { MobileFavoritesButton, MobileFavoritesPage };
export default MobileFavoritesButton; // For backward compatibility
