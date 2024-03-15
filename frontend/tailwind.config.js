/** @type {import('tailwindcss').Config} */
module.exports ={
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  container: {
    center: true,
  },
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

