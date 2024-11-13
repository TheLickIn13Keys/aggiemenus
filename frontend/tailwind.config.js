/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'red-hat': ['var(--font-red-hat)'],
      },
      colors: {
        calorieBlue: '#3787E0',
        veganGreen: '#6BD926',
        vegetarianOrange: '#FF9447',
        halalPink: '#FC537C',
        pescetarianYellow: '#F5D300',
        textDarkBlue: '#355B85',
      },
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
      keyframes: {
        open: {
          "0%": { width: "0px" },
          // '50%': {width: '50%'},
          "100%": { width: "635px" },
        },
        close: {
          "0%": { width: "8rem" },
          "100%": { width: "0px" },
        },
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
