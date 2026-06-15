/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        unbounded: ["Unbounded", "Poppins"],
        sans: ["DM Sans", "sans-seriff"],
        sora: ["Sora", "sans-serif"],
        manrope: ["Manrope", "sans-serif"], // Add your font here
        // roboto: ['Roboto', 'sans-serif'], // For Google Fonts example
      },
      colors: {
        primary: "#054d96",
      },
    },
  },
  plugins: [],
};



