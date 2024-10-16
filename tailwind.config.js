/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#F2055C',
        secondary: '#011126',
        tertiary: '#04BFAD',
        quaternary: '#F2B705',
        text: '#E0E0E0',
        background: '#1A1A1A',
        accent: '#4CAF50',
        'text-light': '#F5F5F5',
      },
    },
  },
  plugins: [],
};
