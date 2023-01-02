/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "auth": "radial-gradient( circle farthest-corner at 10% 20%,  rgba(90,92,106,1) 0%, rgba(32,45,58,1) 81.3% )"
      },
      backgroundColor: {
        "card": "#36393f",
        "input": "#202225"
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
