import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter, Red_Hat_Display } from "next/font/google";
import "./globals.css";

import React from "react";
import { PostHogProvider } from "./providers";
import PostHogPageView from "./PostHogPageView"
const inter = Inter({ subsets: ["latin"] });
const redHat = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-red-hat',
})

export const metadata: Metadata = {
  title: "aggiemenus",
  description:
    "The improved dining commons menu for UC Davis students made by AggieWorks",
  icons: { icon: "/cowlogo.png" },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${redHat.variable}`}>
      <body>
        <PostHogProvider>
          <PostHogPageView />
          {children}
          <Analytics />
        </PostHogProvider>
      </body>
    </html>
  );
}
