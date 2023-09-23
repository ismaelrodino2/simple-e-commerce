/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/images/Shopping-Online-gifting.png')",
      },
      colors: {
        blue850: "#004374",
        blue800: "#0A4D75",
        blue600: "#7792A3",
        blue400: "#92B3C9",
        cream800: "#F7DEC9",
        cream600: "#F8E2CF",
        cream400: "#F5E8DD",
        cream300: "#FFF0E3",
        blue600v2: "#58A9DC",
        red: "#F37575",
        green: "#9EEA9E",
        white: "#FFFF",
        black900: "#1F2223",
        black800: "#2D2D2D",
        black700: "#484545",
        black400: "#7F7D7D",
        black300: "#ACACAC",
        ice: "#FFF2F2",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        poppins: ["var(--font-poppins)"],
        merriweather: ["var(--font-merriweather)"],
        lora: ["var(--font-lora)"],
        montserrat: ["var(--font-montserrat)"],
        opensans: ["var(--font-opensans)"],
      },
    },
  },
};
