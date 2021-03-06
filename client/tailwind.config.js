/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      flex: {
        2: '2 2 0%',
      },
      boxShadow: {
        DEFAULT:
          '0 0 20px -3px rgba(0, 0, 0, 0.1), 0 0px 6px -2px rgba(0, 0, 0, 0.05)',
        10: '0 0 10px -3px rgba(0, 0, 0, 0.1), 0 0px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      transitionTimingFunction: {
        'out-back': 'cubic-bezier(0.12, 0.65, 0.32, 1.15)',
      },
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
      8: '8px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.blue,
      emerald: colors.emerald,
      yellow: colors.yellow,
      sky: colors.sky,
      cyan: colors.cyan,
      white: colors.white,
      black: colors.black,
      kakao: '#FEE500',
      github: '#3C4043',
    },
    screens: {
      '2xl': { max: '1535px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
    },
  },
  // variants: {
  //   extend: {
  //     cursor: ['disabled'],
  //     backgroundColor: ['disabled'],
  //   },
  // },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};
