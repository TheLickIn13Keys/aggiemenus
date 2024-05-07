"use client"; // This is a client component 

import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from 'react';
import  Head  from 'next/head';                                                                                                                                                                                                         
import { useRouter } from 'next/router';


export default function Home() {
    redirect('/menu'); // Redirect to '/menu' route
  return (
	<>


      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-lg">
            <h1 className="mb-5 text-6xl font-bold text-white">Davis Menus</h1>
            <p className="mb-5 text-white text-lg">
              Find your perfect dining experience, all in one place
            </p>
            <Link
              className="btn btn-primary btn-lg text-white font-semibold"
              href={"/menu"}
            >
              Go to Menu
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
