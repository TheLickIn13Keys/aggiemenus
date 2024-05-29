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
  plugins: [require("daisyui")],
	daisyui: {
		themes: ["light", "dark"],

	},
};
