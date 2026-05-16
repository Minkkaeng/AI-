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
          jeok: '#FF4D4D', // Refined Blood Coral (Red)
          cheong: '#0055FF', // Functional Blue
          hwang: '#FFBB00', // Highlight Yellow
          heuk: '#111111', // Black
          baek: '#FFFFFF', // White
          gray: '#F5F5F5',
          mint: '#2DD4BF', // Keep DatePop Mint for accent
          orange: '#FB923C', // Keep DatePop Orange for accent
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
