/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        university: {
          blue: '#0f4eb6',
          dark: '#0b3a89'
        }
      }
    }
  },
  plugins: []
};
