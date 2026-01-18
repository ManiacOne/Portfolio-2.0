/** @type {import('tailwindcss').Config} */
import AppColors from '../portfolio/src/core/constants/colors.ts'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bgColor': AppColors.bgColor,
        'buttonColorLight': AppColors.buttonColorLight,
        'buttonColorDark': AppColors.buttonColorDark,
        'cardBgColor': AppColors.cardBgColor
      }
    },
  },
  plugins: [],
}