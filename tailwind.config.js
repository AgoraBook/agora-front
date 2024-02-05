/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        Main: '#CAB188',
        MainHover: '#03878C',
      },
    },
  },
  plugins: [],
};
