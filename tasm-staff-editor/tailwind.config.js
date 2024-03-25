/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'TASM-bg': "url('../../shared/images/TASMbg.png')",
      }
    },
  },
  plugins: [],
}

