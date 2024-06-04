"use client";
import NavBar from "./NavBar";
import Selections from "./Selections";
import FoodItemDisplay from "./FoodItemDisplay";
import supabase from "../api/supabase";
import { useState } from "react";
import Footer from "./Footer";
import Head from "next/head";

const Menu = () => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [selectedDC, setSelectedDC] = useState("Segundo");
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState("Breakfast");

  return (
    <div
      className={`flex flex-col min-h-screen justify-between ${
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
        />
      </header>
      <main>
        {/* <Selections /> */}
        <Selections
          selectedDC={selectedDC}
          setSelectedDC={setSelectedDC}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedMeal={selectedMeal}
          setSelectedMeal={setSelectedMeal}
        />
        <FoodItemDisplay
          dc={selectedDC}
          day={selectedDay}
          meal={selectedMeal}
        />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Menu;
