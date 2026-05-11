/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // This adds the 3D depth needed for the flip effect
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [],
}