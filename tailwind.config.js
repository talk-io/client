/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        auth: "radial-gradient( circle farthest-corner at 10% 20%,  rgba(90,92,106,1) 0%, rgba(32,45,58,1) 81.3% )",
        logo: "url('/src/assets/images/logo.png')",
        "logo-transparent": "url('/src/assets/images/logo.svg')",
      },
      colors: {
        "logo-text": "#CD5A41",
        secondary: "#2f3136",
        "secondary-light": "rgba(47,49,54,0.7)",
        tertiary: "rgba(185, 187, 190, 0.5)",
        input: "#202225",
        "message-create-back": "rgba(185, 187, 190, 0.1)",
        "header-secondary": "rgb(185, 187, 190)",
        "header-description": "#B9BBBE",
        label: "#ccc",
      },
      backgroundColor: {
        card: "#36393f",
        primary: "#5A20CB",
        "logo-back": "#D5CBA7",
      },
      borderColor: {
        card: "#4c4c4c",
        hr: "rgba(76,76,76,0.44)",
      },
      fontFamily: {
        logo: ["imprint-mt-shadow", "sans-serif"],
      },
      margin: {
        chat: "1.5rem",
      },
      padding: {
        chat: "1.5rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ noncompatible: true })],
};
