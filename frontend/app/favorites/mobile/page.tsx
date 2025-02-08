"use client";
import React from 'react';
import Link from 'next/link';
import { useFavoritesStore } from '../util/favoritesStore';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoChevronBackOutline } from "react-icons/io5";

// layout:
  // header
  // switch between offered this week and available now (can reuse from desktop component)
  // list of favorites component
  // can reuse a lot of the card/code from the desktop component 

const MobileFavoritesPage = () => {
  const { favorites } = useFavoritesStore();

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
        <h4 className='w-full text-center text-primary font-semibold'>
          Favorited Items
        </h4>
      </div>
    </div>
  );
};

export default MobileFavoritesPage; 