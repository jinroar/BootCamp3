module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}', // Add your paths here
  ],
  theme: {
    extend: {
      cursor: {
        paddle: 'url(/paddle.svg), auto', // Custom cursor for paddle
        pow: 'url(/pow.svg), auto', // Custom cursor for pow
      },
      animation: {
        'move-stars': 'moveStars 0.5s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-in forwards',
        'highlight-draw': 'highlightDraw 2s ease-in-out infinite', // Animation for the border
      },
      keyframes: {
        moveStars: {
          '0%': {
            transform: 'translateX(50px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        highlightDraw: {
          '0%': {
            borderColor: 'transparent',
            borderWidth: '2px',
          },
          '50%': {
            borderColor: '#FFDD00', // Yellow color at 50%
            borderWidth: '4px',
          },
          '100%': {
            borderColor: 'transparent',
            borderWidth: '2px',
          },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // If you want custom scrollbars
  ],
};
