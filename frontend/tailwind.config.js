/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        notion: {
          blue: '#0075de',
          'blue-active': '#005bab',
          'blue-focus': '#097fe8',
          'blue-badge': '#f2f9ff',
          'warm-white': '#f6f5f4',
          'warm-dark': '#31302e',
          'gray-500': '#615d59',
          'gray-300': '#a39e98',
          teal: '#2a9d99',
          green: '#1aae39',
          orange: '#dd5b00',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: 'rgba(0,0,0,0.04) 0px 4px 18px, rgba(0,0,0,0.027) 0px 2.025px 7.84688px, rgba(0,0,0,0.02) 0px 0.8px 2.925px, rgba(0,0,0,0.01) 0px 0.175px 1.04062px',
        deep: 'rgba(0,0,0,0.05) 0px 23px 52px, rgba(0,0,0,0.04) 0px 14px 28px, rgba(0,0,0,0.02) 0px 7px 15px, rgba(0,0,0,0.02) 0px 3px 7px, rgba(0,0,0,0.01) 0px 1px 3px',
      },
    },
  },
  plugins: [],
}
