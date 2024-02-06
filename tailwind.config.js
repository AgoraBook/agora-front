/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#CAB188',
        secondary: '#03878C',
        error: '#FF0000',
      },
    },
  },
  plugins: [],
};
