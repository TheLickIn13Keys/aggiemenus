"use client";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { usePostHog } from 'posthog-js/react';
import Head from "next/head";
import Footer from "../menu/Footer";
import Selections from "./truck-selections";
import FoodTruckDisplay from "./FoodTruckDisplay";

const Menu = () => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState("Memorial Union");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState(() => {
    
    // Initialize day based on current date
    const curDate = new Date(Date.now());
    return (curDate.getDay() - 1 + 7) % 7;
  });


  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const posthog = usePostHog();
  
  useEffect(() => {
    if (posthog) {
      posthog.capture('menu_page_viewed', {
        dc: selectedCampus,
        day: selectedDay
      });
    }
  }, [posthog, selectedCampus, selectedDay]);

  type ViewType = "default" | "grid";

  const [view, setView] = useState<ViewType>("default"); // Lift state up

  return (
    <div
      className={`flex flex-col min-h-screen bg-[#F1F7F7] ${!searchBarOpen ? "animate-fade-in" : "animate-fade-out"
        }`}
    >
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="description" content="description of your project" />
        <meta name="theme-color" content="#000" />
        <title>Aggiemenus</title>
        <link rel="manifest" href="../manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/cowlogo.png" />
      </Head>
      <header>
        <NavBar
          searchBarOpen={searchBarOpen}
          setSearchBarOpen={setSearchBarOpen}
          setSearchQuery={setSearchQuery}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
      </header>
      <main className="flex flex-col flex-grow">
        {/* <Selections /> */}
        <Selections
          selectedCampus={selectedCampus}
          setSelectedCampus={setSelectedCampus}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          setSearchQuery={setSearchQuery}
          view = {view}
          setView={setView}
        />
        <FoodTruckDisplay/>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Menu;