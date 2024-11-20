"use client";
import NavBar from "./NavBar";
import Selections from "./Selections";
import FoodItemDisplay from "./FoodItemDisplay";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Head from "next/head";

const Menu = () => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [selectedDC, setSelectedDC] = useState("Segundo");
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState(() => {
    // Initialize meal based on current time
    const curTime = new Date().getHours();
    if (curTime >= 0 && curTime < 11) {
      return "Breakfast";
    } else if (curTime >= 11 && curTime < 17) {
      return "Lunch";
    } else {
      return "Dinner";
    }
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Only handle day selection in useEffect
  useEffect(() => {
    const curDate = new Date(Date.now());
    const day = (curDate.getDay() - 1 + 7) % 7;
    setSelectedDay(day);
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen ${
        !searchBarOpen ? "animate-fade-in" : "animate-fade-out"
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
        />
      </header>
      <main className="flex flex-col flex-grow">
        {/* <Selections /> */}
        <Selections
          selectedDC={selectedDC}
          setSelectedDC={setSelectedDC}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedMeal={selectedMeal}
          setSelectedMeal={setSelectedMeal}
          setSearchQuery={setSearchQuery}
        />
        <FoodItemDisplay
          dc={selectedDC}
          day={selectedDay}
          meal={selectedMeal}
          searchQuery={searchQuery}
        />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Menu;
