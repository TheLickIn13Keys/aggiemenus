import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "org.aggiemenus.app",
    appName: "aggiemenus",
    webDir: "dist",
    server: {
        androidScheme: "https",
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL?.replace("https://", ""),
    },
    // plugins: {
    //     StatusBar: {
    //         style: "light",
    //         backgroundColor: "#ffffff",
    //         overlaysWebView: false,
    //     },
    // },

    // ios: {
    //     contentInset: "automatic",
    // },
,
    android: {
       buildOptions: {
          keystorePath: 'undefined',
          keystoreAlias: 'undefined',
       }
    }
  };

export default config;

