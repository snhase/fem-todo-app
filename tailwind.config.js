/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode:"class",
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '1280px',
    },
    extend: {
      colors: {
        //primary
        "brightBlue": "hsl(220, 98%, 61%)",
        //light theme
        "veryLightGray": "hsl(0, 0%, 98%)",
        "veryLightGrayishBlue": "hsl(236, 33%, 92%)",
        "lightGrayishBlue": "hsl(233, 11%, 84%)",
        "darkGrayishBlue": "hsl(236, 9%, 61%)",
        "veryDarkGrayishBlue": "hsl(235, 19%, 35%)",
        //dark theme
        "veryDarkBlue":"hsl(235, 21%, 11%)",
        "veryDarkDesaturatedBlue": "hsl(235, 24%, 19%)",
        "lightGrayishBlue" : "hsl(234, 39%, 85%)",
        "lightGrayishBlueHover": "hsl(236, 33%, 92%)",
        "darkGrayishBlue" : "hsl(234, 11%, 52%)",
        "veryDarkGrayishBlue1" : "hsl(233, 14%, 35%)",
        "veryDarkGrayishBlue2" : "hsl(237, 14%, 26%)"
      }
    },
  },
  plugins: [],
}