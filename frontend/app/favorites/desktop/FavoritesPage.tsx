import React, { useState, useEffect } from 'react';
import FoodItem from "../../api/foodItemSchema";
import { useFavoritesStore, FavoriteItem } from '../util/favoritesStore';
import menu_data from '../../../../backend/menu_data.json';

// desktop view
// need to fix so that available now items dont grab from supabase but grab from our menu_data.json in the backend

const FavoritesButton = () => {
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
    const storedFavorites = localStorage.getItem('CapacitorStorage.favorites');
    
    if (!favorites.length && storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      initializeFavorites();
      for (const favorite of parsedFavorites) {
        toggleFavorite(favorite);
      }
    }
  }, []);

  useEffect(() => {
    const getCurrentMenuItems = () => {
      console.log('Current day:', currentDay);
      
      const allItems = Object.entries(menu_data).flatMap(([key, items]) => {
        const [dc, day, meal] = key.split('_');
        const processed = items.map((item: any) => ({
          ...item,
          id: Number(item.item_id),
          name: item.common_items.name,
          day: parseInt(day),
          meal: meal,
          dc: dc
        }));
        return processed;
      });

      const currentDayItems = allItems.filter(item => item.day === currentDay);
      setFoodItems(currentDayItems);
    };

    if (currentDay !== null) {
      getCurrentMenuItems();
    }
  }, [currentDay]);

  const getAvailableFavorites = () => {

    const available = favorites.filter(favorite => {

      const matchingItems = foodItems.filter(foodItem => {
        const nameMatch = foodItem.common_items.name === favorite.name;
        const dcMatch = foodItem.dc.toLowerCase() === (favorite.dc?.toLowerCase() ?? '');
        const mealMatch = foodItem.meal.toLowerCase() === (favorite.meal?.toLowerCase() ?? '');

        if (nameMatch || dcMatch || mealMatch) {
          console.log('Potential match found:', {
            name: foodItem.common_items.name,
            matches: { nameMatch, dcMatch, mealMatch }
          });
        }

        return nameMatch && dcMatch && mealMatch;
      });

      const isAvailable = matchingItems.length > 0;
      return isAvailable;
    });

    return available;
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
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-row items-center gap-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <img className="w-5 h-5" src="/favorite_icon.svg" alt="Favorites" />
        <p className="text-primary font-medium">Favorites</p>
      </button>

      {shouldRender && (
        <div className={`fixed inset-0 bg-black transition-opacity duration-300 flex items-end justify-end z-50
                    ${isVisible ? 'bg-opacity-50' : 'bg-opacity-0'}`}
        >
          <div className={`bg-[#ECF5F7] h-full w-1/2 flex flex-col transform transition-transform duration-300 ease-out
                        ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className='relative min-w-fit'>
              <img src="/favorites-background.png" className='w-full' />
              <div className="absolute bottom-10 left-10">
                <h1 className="font-red-hat text-white text-[24px] font-bold">
                  Favorited Items
                </h1>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-10 left-10"
              >
                <img className='bg-[#5785B7] rounded-full w-fit p-2' src="/close_icon.svg" />
              </button>
            </div>

            <div className='px-[40px] border-b border-[#C3D9ED]'>
              <div className='flex gap-x-[30px] font-red-hat text-textDarkBlue text-[14px] font-bold'>
                <button
                  onClick={() => setActiveTab('available')}
                  className={`pt-[20px] pb-[20px] ${activeTab === 'available' ? 'pt-[20px] pb-[20px] text-primary border-b-2 border-primary' : ''}`}
                >
                  Offered this week
                </button>
                <button
                  onClick={() => setActiveTab('all')}
                  className={`pt-[20px] pb-[20px] ${activeTab === 'all' ? 'pt-[20px] pb-[20px] text-primary border-b-2 border-primary' : ''}`}
                >
                  All favorited items
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="px-6 pt-6">
                {Object.entries(groupedFavorites).map(([dc, sections]) => (
                  <div key={dc} className="mb-6">
                    <h3 className="font-red-hat text-sm font-bold text-textDarkBlue pb-[15px] pt-[40px]">{dc}</h3>
                    {Object.entries(sections).map(([section, items]) => (
                      <div key={section} className="mb-4">
                        <div className="-mx-6">
                          <div className="grid grid-cols-1 gap-y-[15px] border-b border-[#C3D9ED] pb-[40px] px-[24px]">
                            {items.map((item) => (
                              <div
                                key={item.id}
                                className="bg-white rounded-md p-[20px] items-center"
                              >
                                <div className="flex flex-row items-center justify-between">
                                  <div>
                                    <div className="flex justify-between items-start">
                                      <h4 className="text-sm font-bold text-textDarkBlue">
                                        {item.name}
                                      </h4>
                                    </div>
                                    <div className="flex gap-2 text-sm text-[#8B8B8B] mt-1">
                                      <span className="text-[11px] font-medium font-red-har">
                                        {item.meal || "Unknown Meal"}
                                      </span>
                                      <span>•</span>
                                      <span className='text-[11px] text-[#8B8B8B] font-medium font-red-hat'>{item.section}</span>
                                    </div>
                                  </div>
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
                              </div>
                            ))}
                          </div>
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
        </div>
      )}
    </>
  );
};

export default FavoritesButton;
