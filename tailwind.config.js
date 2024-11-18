/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        PoppinsBold: ["Poppins-Bold", "sans-serif"],
        PoppinsItalic: ["Poppins-Italic", "sans-serif"],
        PoppinsLight: ["Poppins-Light", "sans-serif"],
        PoppinsMedium: ["Poppins-Medium", "sans-serif"],
        PoppinsRegular: ["Poppins-Regular", "sans-serif"],
        PoppinsThin: ["Poppins-Thin", "sans-serif"],
    }
    },
  },
  plugins: [],
}

