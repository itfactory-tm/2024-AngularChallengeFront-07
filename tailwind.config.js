/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF6347',
        secondary: '#2C2C2C',
        text: '#E0E0E0',
        background: '#1A1A1A',
        accent: '#4CAF50',
        'text-light': '#F5F5F5',
      },
    },
  },
  plugins: [],
};
