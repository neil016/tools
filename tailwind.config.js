/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF8C42',
        secondary: '#4ECDC4',
        accent: '#FF6B6B',
        gold: '#FFD700',
        danger: '#FF4D4F',
        success: '#52C41A',
        warning: '#FAAD14',
      },
      fontFamily: {
        sans: ['PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
