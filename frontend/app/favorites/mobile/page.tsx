"use client";
import React, { useState } from 'react';
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
  const { favorites } = useFavoritesStore();
  const [activeTab, setActiveTab] = useState<'available' | 'all'>('available');

  return (
    // bg
    <div className="flex flex-col bg-[#3C3D9ED]"> 
    {/* header */}
      <div className='flex flex-row pt-16 bg-[#FFFFFF] w-full h-28'>
        <Link href='/menu' className="absolute ml-4">
          <button className='flex flex-row items-center'>
            <IoChevronBackOutline size={20} className="text-primary hover:text-opacity-80" />
          </button>
        </Link>
        <h4 className='w-full text-center text-[14px] text-textDarkBlue font-semibold'>
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
    </div>
  );
};

export default MobileFavoritesPage; 