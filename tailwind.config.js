/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "auth": "radial-gradient( circle farthest-corner at 10% 20%,  rgba(90,92,106,1) 0%, rgba(32,45,58,1) 81.3% )"
      },
      backgroundColor: {
        "card": "#36393f",
        "input": "#202225",
        "primary": "#5A20CB",
      },
      borderColor: {
        "input": "#202225",
        "card": "#4c4c4c",
      },
      textColor: {
        "header-secondary": "rgb(185, 187, 190)",
        "header-description": "#B9BBBE",
        "label": "#ccc",
      },
      fontFamily: {
        "logo": ["imprint-mt-shadow", "sans-serif"],
      }
    },
  },
  plugins: [],
}
