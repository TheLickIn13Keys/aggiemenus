// "use client"; // This is a client component 

import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Davis Dining Commons',
  description: 'Find your perfect dining experience, all in one place',
  keywords: ['dining', 'food', 'restaurants', 'davis', 'dining commons', 'segundo', 'latitude', 'tercero', 'cuarto', 'ucd', 'uc davis', 'memorial union', 'mu', 
              'davis dining', 'davis dining commons', 'davis dining hours', 'davis dining menu', 'davis dining prices', 'davis dining reviews', 'davis dining hours', 
              'davis dining menu', 'davis dining prices', 'davis dining reviews', 'uc davis dining hall', 'ucd dining commons', 'segundo dining hall',
              'segundo dc menu', 'segundo dc hours', 'segundo dc', 'segundo dc reviews', 'latitude dining hall', 'latitude dc menu', 'latitude dc hours',
              'latitude dc', 'latitude dc reviews', 'tercero dining hall', 'tercero dc menu', 'tercero dc hours', 'tercero dc', 'tercero dc reviews',
              'cuarto dining hall', 'cuarto dc menu', 'cuarto dc hours', 'cuarto dc', 'cuarto dc reviews', 'ucd dining commons', 'ucd dc menu',
              'ucd dc hours', 'ucd dc', 'ucd dc reviews'
            ],
            
  authors: [{ name: 'AggieMenus', url: 'https://aggiemenus.org' }],
  openGraph: {
    title: 'AggieMenus',
    description: 'Find your perfect dining experience, all in one place',
    url: 'https://aggiemenus.org', 
    siteName: 'AggieMenus',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

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
