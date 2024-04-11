/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        green: "#3DA14A",
        lightBlue: "#02A1D7",
        darkBlue: "#263777",
        darkRed: "#761D21",
        notAsDarkRed: "#BA2027",
        red: "#D3242C",
        white: "#FFFFFF",
        gray: "#D9D9D9",
        black: "#000000",
      },
      fontFamily: {
        exo2: ['"Exo 2"', 'sans-serif']
      },
      backgroundImage: {
        'tasm-header-bg': "url('../../shared/images/Header.svg')",
      },
    },
  },
  plugins: [],
}

