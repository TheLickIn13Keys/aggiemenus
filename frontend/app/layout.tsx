import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter, Red_Hat_Display } from "next/font/google";
import "./globals.css";

import React from "react";
import { PostHogProvider } from "./providers";
import PostHogPageView from "./PostHogPageView";
import { StatusBarSpace } from "./StatusBarSpace";
import StructuredData from "./structuredData";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
const redHat = Red_Hat_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-red-hat",
});

export const metadata: Metadata = {
    title: "aggiemenus",
    openGraph: {
        title: "AggieMenus",
        description: "Find your perfect dining experience, all in one place",
        url: "https://aggiemenus.org",
        siteName: "AggieMenus",
        images: "/cowlogo.png",
        type: "website",
        locale: "en_US",
    },
    icons: { icon: "/cowlogo.png" },
    manifest: "/manifest.json",
    robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://aggiemenus.org',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${redHat.variable}`}>
            <Head>
            <title>AggieMenus</title>
            <meta name="description" content="Find your perfect dining experience, all in one place" />
            <meta name="referrer" content="no-referrer" />
            <StructuredData />
      </Head>
            <body>
                <PostHogProvider>
                    <PostHogPageView />
                    <StatusBarSpace />
                    {children}
                    <Analytics />
                </PostHogProvider>
            </body>
        </html>
    );
}
