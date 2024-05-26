/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadein: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fadein 0.5s ease-out forwards",
        "fade-out": "fadein 0.5s ease-in backwards",
      },
    },
  },
  daisyui: {
    themes: [
      {
        aggiemenus: {
          primary: "#355B85",

          secondary: "#ff00ff",

          accent: "#00ffff",

          neutral: "#ff00ff",

          "base-100": "#ECF5F7",

          info: "#0000ff",

          success: "#0F7745",

          warning: "#CE5E0D",

          error: "#C10230",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
