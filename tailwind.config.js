/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Indigo-600
        secondary: "#6B7280", // Gray-500
      }
    },
  },
  plugins: [],
}

