/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        }
      },
      animation: {
        'slide-down': 'slideDown 1s ease-out forwards',
      },
      gridAutoRows:{
        'min': 'mimax(0, 1fr)'
      },
    },
  },
  plugins: [
    // require('tailwindcss-animate')
  ],
}

