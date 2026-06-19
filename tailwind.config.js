/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0f",
        glow: "#ff7a18",
        ink: "#e8e8ee",
        muted: "#8a8a99",
      },
    },
  },
  plugins: [],
};
