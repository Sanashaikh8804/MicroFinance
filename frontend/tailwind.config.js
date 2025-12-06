/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/styles/globals.css",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#e0f2fe',
          '100': '#bae6fd',
          '200': '#7dd3fc',
          '300': '#38bdf8',
          '400': '#0ea5e9',
          '500': '#0284c7',
          '600': '#0369a1',
          '700': '#075985',
          '800': '#0c4a6e',
          '900': '#082f49',
        },
        success: {
          '50': '#d1fae5',
          '100': '#a7f3d0',
          '200': '#6ee7b7',
          '300': '#34d399',
          '400': '#10b981',
          '500': '#059669',
          '600': '#047857',
          '700': '#065f46',
          '800': '#064e3b',
          '900': '#022c22',
        }
      }
    },
  },
  plugins: [],
}