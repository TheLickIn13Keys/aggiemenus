"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useFavoritesStore } from '../util/favoritesStore';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoChevronBackOutline } from "react-icons/io5";

// layout:
  // header
    // done
  // switch between offered this week and available now (can reuse from desktop component)
    // done 
  // list of favorites component
    

const MobileFavoritesPage = () => {
  const { favorites, toggleFavorite, initializeFavorites } = useFavoritesStore();
  const [activeTab, setActiveTab] = useState<'available' | 'all'>('available');

  useEffect(() => {
    initializeFavorites();
  }, []);

  return (
    // bg
    <div className="flex flex-col bg-[#3C3D9ED]"> 
    {/* header */}
      <div className='flex flex-row items-center bg-white w-full h-32'>
        <Link href='/menu' className="absolute ml-4">
          <button className='flex flex-row items-center'>
            <IoChevronBackOutline size={20} className="text-primary hover:text-opacity-80" />
          </button>
        </Link>
        <h4 className='w-full text-center text-primary font-semibold'>
          Favorited Items
        </h4>
      </div>

      {/* list of favorites component */}
      <div className='px-[40px] border-b border-[#C3D9ED] flex justify-center'>
        <div className='flex gap-x-28 font-red-hat text-textDarkBlue text-[14px] font-bold justify-center'>
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

      {/* favorited food cards */}
      <div className='px-4 py-6'>
        {activeTab === 'all' && (
          <div className='flex flex-col gap-y-8 justify-end'>
            {/* Tercero Section */}
            {favorites.filter(item => item.dc === 'Tercero').length > 0 && (
              <div className='flex flex-col gap-y-4'>
                <h3 className='text-lg font-semibold text-primary text-center'>Tercero</h3>
                <div className='flex flex-col gap-y-4'>
                  {favorites
                    .filter(item => item.dc === 'Tercero')
                    .map((item) => (
                    <div key={item.id} className="bg-white rounded-md p-[20px] items-center">
                      <div className="flex flex-row items-center justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-textDarkBlue">{item.name}</h4>
                          </div>
                          <div className="flex gap-2 text-sm text-[#8B8B8B] mt-1">
                            <span className="text-[11px] font-medium font-red-hat">
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
            )}

            {/* Segundo Section */}
            {favorites.filter(item => item.dc === 'Segundo').length > 0 && (
              <div className='flex flex-col gap-y-4'>
                <h3 className='text-lg font-semibold text-primary text-center'>Segundo</h3>
                <div className='flex flex-col gap-y-4'>
                  {favorites
                    .filter(item => item.dc === 'Segundo')
                    .map((item) => (
                    <div key={item.id} className="bg-white rounded-md p-[20px] items-center">
                      <div className="flex flex-row items-center justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-textDarkBlue">{item.name}</h4>
                          </div>
                          <div className="flex gap-2 text-sm text-[#8B8B8B] mt-1">
                            <span className="text-[11px] font-medium font-red-hat">
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
            )}

            {/* Cuarto Section */}
            {favorites.filter(item => item.dc === 'Cuarto').length > 0 && (
              <div className='flex flex-col gap-y-4'>
                <h3 className='text-lg font-semibold text-primary text-center'>Cuarto</h3>
                <div className='flex flex-col gap-y-4'>
                  {favorites
                    .filter(item => item.dc === 'Cuarto')
                    .map((item) => (
                    <div key={item.id} className="bg-white rounded-md p-[20px] items-center">
                      <div className="flex flex-row items-center justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-textDarkBlue">{item.name}</h4>
                          </div>
                          <div className="flex gap-2 text-sm text-[#8B8B8B] mt-1">
                            <span className="text-[11px] font-medium font-red-hat">
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
            )}

            {/* Latitude Section */}
            {favorites.filter(item => item.dc === 'Latitude').length > 0 && (
              <div className='flex flex-col gap-y-4'>
                <h3 className='text-lg font-semibold text-primary text-center'>Latitude</h3>
                <div className='flex flex-col gap-y-4'>
                  {favorites
                    .filter(item => item.dc === 'Latitude')
                    .map((item) => (
                    <div key={item.id} className="bg-white rounded-md p-[20px] items-center">
                      <div className="flex flex-row items-center justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-textDarkBlue">{item.name}</h4>
                          </div>
                          <div className="flex gap-2 text-sm text-[#8B8B8B] mt-1">
                            <span className="text-[11px] font-medium font-red-hat">
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
            )}

            {/* Show message if no favorites */}
            {favorites.length === 0 && (
              <div className='text-center text-gray-500 py-8'>
                No favorited items yet
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileFavoritesPage; 