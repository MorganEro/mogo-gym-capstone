/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js, jsx}*"
  ],
  theme: {
    extend: {
      colors: {
        'pink-brown': '#f87171'
      },
      fontFamily: {
        'oswald': ['"Oswald"','sans-serif'],
        'lucky': ['"Luckiest Guy"','cursive'],

      }
    },
  },
  plugins: [],
}
