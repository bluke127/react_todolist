/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: { min: "310px", max: "540px" },
      md: { min: "540px", max: "1024px" },
    },

    extend: {
      colors: {
        //Primary
        primary: "#036DB7",
        //Text
        textPrimary: "#262E38",
        textSecondary: "#696969",
        textDisabled: "#9E9E9E",
        //Bg
        bgDefault: "#FAFAFA",
        bgPaper: "#FFFFFF",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
