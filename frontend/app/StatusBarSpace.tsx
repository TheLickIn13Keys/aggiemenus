"use client";

import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";

export const StatusBarSpace = () => {
    const [topInset, setTopInset] = useState(0);

    useEffect(() => {
        async function getInsets() {
            if (Capacitor.isNativePlatform()) {
                try {
                    const { SafeArea } = await import(
                        "@aashu-dubey/capacitor-statusbar-safe-area"
                    );
                    // const insets = await SafeArea.getSafeAreaInsets();
                    // Using top inset which includes status bar + notch if present
                    //
                    const { height } = await SafeArea.getStatusBarHeight();
                    setTopInset(height); // Adding 16px padding
                } catch (error) {
                    console.error("Failed to get safe area insets:", error);
                }
            }
        }

        getInsets();
    }, []);

    // Add a small default height for when there's no inset

    return (
        <div
            className="bg-white w-full fixed top-0 z-50"
            style={{ height: `${topInset}px` }}
        />
    );
};
