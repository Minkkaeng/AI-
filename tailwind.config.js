/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neoul: {
          brand: '#2DD4BF', // DatePop Mint
          accent: '#FB923C', // Orange
          heuk: '#1F2937', // Slate 800 (Clean black)
          baek: '#FFFFFF',
          gray: '#F9FAFB', // Slate 50
          border: '#F3F4F6', // Slate 100
        }
      },
      fontFamily: {
        sans: ['Pretendard', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
