import React, { useState, useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';
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

const FavoritesButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'available'>('all');
  const [currentDay, setCurrentDay] = useState(() => {
    const curDate = new Date(Date.now());
    return (curDate.getDay() - 1 + 7) % 7;
  });
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [tempUnfavorited, setTempUnfavorited] = useState<Set<string>>(new Set());

  useEffect(() => {
    const storedFavorites = getCookie('favorites');
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites as string);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error("Error parsing favorites:", error);
      }
    }
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

  const toggleFavorite = (item: FavoriteItem) => {
    const itemKey = `${item.id}-${item.name}`;
    const newTempUnfavorited = new Set(tempUnfavorited);
    
    if (tempUnfavorited.has(itemKey)) {
      newTempUnfavorited.delete(itemKey);
      setTempUnfavorited(newTempUnfavorited);
      
      const favorites: FavoriteItem[] = JSON.parse(getCookie('favorites') || '[]');
      favorites.push(item);
      setCookie('favorites', JSON.stringify(favorites));
    } else {
      newTempUnfavorited.add(itemKey);
      setTempUnfavorited(newTempUnfavorited);
      
      const favorites: FavoriteItem[] = JSON.parse(getCookie('favorites') || '[]');
      const newFavorites = favorites.filter(fav => 
        !(fav.id === item.id && fav.name === item.name)
      );
      setCookie('favorites', JSON.stringify(newFavorites));
    }
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

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex flex-row items-center gap-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <img className="w-5 h-5" src="/favorite_icon.svg" alt="Favorites" />
        <p className="text-primary font-medium">Favorites</p>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end z-50">
          <div className="bg-[#ECF5F7] w-1/2 h-screen overflow-hidden">
            <div className='relative'>
              <img src="/favorites-background.png" className='w-full'/>
              <div className="absolute bottom-10 left-10">
                <h1 className="font-red-hat text-white text-[24px] font-bold">
                  Favorited Items
                </h1>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-10 left-10"
              >
                <img className='bg-[#5785B7] rounded-full w-fit p-2' src="/close_icon.svg"/>
              </button>
            </div>

            <div className='pl-10 border-b border-[#C3D9ED]'>
              <div className='py-[20px] flex gap-x-[15px] font-red-hat text-textDarkBlue text-[14px] font-bold'>
                <button 
                  onClick={() => setActiveTab('available')}
                  className={`${activeTab === 'available' ? 'text-primary' : ''}`}
                >
                  Offered this week
                </button>
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`${activeTab === 'all' ? 'text-primary' : ''}`}
                >
                  All favorited items
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {Object.entries(groupedFavorites).map(([dc, sections]) => (
                <div key={dc} className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">{dc}</h3>
                  {Object.entries(sections).map(([section, items]) => (
                    <div key={section} className="mb-4">
                      <h4 className="text-lg font-medium mb-2">{section}</h4>
                      <div className="grid grid-cols-1 gap-4">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="text-lg font-semibold text-textDarkBlue">
                                {item.name}
                              </h4>
                              <button 
                                onClick={() => toggleFavorite(item)}
                                className="flex items-center justify-center bg-[#F1F7F7] rounded-full w-[30px] h-[30px]"
                              >
                                <img 
                                  src={tempUnfavorited.has(`${item.id}-${item.name}`) ? "/favorite_icon.svg" : "/filled_heart_icon.svg"}
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
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              {Object.keys(groupedFavorites).length === 0 && (
                <div className="flex flex-col items-center justify-center py-20">
                  <p className="text-xl text-gray-500">No favorites yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FavoritesButton;