"use client";
import React from 'react';
import Link from 'next/link';
import { useFavoritesStore } from '../util/favoritesStore';

const MobileFavoritesPage = () => {
  const { favorites } = useFavoritesStore();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-semibold">My Favorites</h1>
        <Link href="/menu">
          <button className="text-primary">Back</button>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500">No favorites yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((item) => (
              <div key={item.id} className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.dc} • {item.meal}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileFavoritesPage; 