"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../menu/NavBar";
import Footer from "../menu/Footer";
import { getCookie } from 'cookies-next';

interface FavoriteItem {
  id: number;
  name: string;
}

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Load favorites from cookies instead of localStorage
    const storedFavorites = getCookie('favorites');
    console.log("Stored favorites from cookie:", storedFavorites);
    
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites as string);
        console.log("Parsed favorites:", parsedFavorites);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error("Error parsing favorites:", error);
      }
    }
  }, []);

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
        <h1 className="text-3xl font-semibold text-textDarkBlue mb-8">
          My Favorites
        </h1>
        <div className="grid grid-cols-1 gap-4">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow"
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
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default FavoritesPage;
