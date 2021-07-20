const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        192: '48rem',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.blue,
      yellow: colors.yellow,
      sky: colors.sky,
      cyan: colors.cyan,
      kakao: '#FEE500',
      github: '#3C4043',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
