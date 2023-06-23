/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Darumadrop: ["Darumadrop One", "cursive"],
      },
      screens: {
        xs: "440px",
      },
    },
  },
  plugins: [],
};
