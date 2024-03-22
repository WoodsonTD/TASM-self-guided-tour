/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        green: "#3DA14A",
        lightBlue: "#02A1D7",
        darkBlue: "#263777",
        darkRed: "#761D21",
        red: "#D3242C",
      }
    },
  },
  plugins: [],
}

