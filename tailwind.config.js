/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#181818', // Warna background Chill
        primary: '#E50914', // Warna merah
      }
    },
  },
  plugins: [],
}