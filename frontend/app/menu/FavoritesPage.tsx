import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

interface FavoriteItem {
  id: number;
  name: string;
}

const FavoritesButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

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

  const closeModal = () => {
    setIsOpen(false);
  };

  // Close modal when clicking escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
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

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end z-50">
          <div className="bg-[#ECF5F7] w-1/2 h-screen overflow-hidden">
            {/* Modal Header with close button */}
            <div className='relative'>
              <img src="/favorites-background.png" className='w-full'/>

              <div className="absolute bottom-10 left-10 flex items-center justify-center">
                <h1 className="font-red-hat text-white text-[24px] font-bold">
                  Favorited Items
                </h1>
              </div>

              <div className="absolute top-10 left-10 flex items-center justify-center">

                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 p-2">
                  <img className='bg-[#5785B7] rounded-full w-fit p-2' src="/close_icon.svg"/>
                </button>
              </div>

            </div>

            <div className='pl-10 border-b border-[#C3D9ED]'>
              <div className='py-[20px] flex flex-row font-red-hat text-textDarkBlue gap-x-[15px] text-[14px] font-bold'>
                <h1 className=''>Offered this week</h1>
                <h1>All favorited items</h1>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 gap-4">
                {favorites.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-lg p-4 shadow hover:shadow-md transition-shadow"
                  >
                    <h2 className="text-lg font-semibold text-textDarkBlue">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500">ID: {item.id}</p>
                  </div>
                ))}
              </div>
              {favorites.length === 0 && (
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