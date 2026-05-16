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
          jeok: '#1A1A1A', // Action
          cheong: '#71717A', // Info
          hwang: '#D4D4D8', // Notice
          heuk: '#000000', // Black
          baek: '#FFFFFF', // White
          gray: '#F4F4F5',
          mint: '#2DD4BF', // DatePop Mint
          orange: '#FB923C', // DatePop Orange
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
