/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f6f1e7",
        ink: "#2a2521",
        pine: "#2f4a3d",
        "pine-deep": "#203329",
        marigold: "#e7a33e",
        terracotta: "#bd5b39",
        stone: "#a79c86",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
