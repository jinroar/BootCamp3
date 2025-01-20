module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}', // Add your paths here
  ],
  theme: {
    extend: {
      animation: {
        'move-stars': 'moveStars 0.5s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-in forwards', // Add ease-in fade-in animation
      },
      keyframes: {
        moveStars: {
          '0%': {
            transform: 'translateX(50px)', // Start from the right
            opacity: '0', // Start as invisible
          },
          '100%': {
            transform: 'translateX(0)', // Move to the original position
            opacity: '1', // Fade in
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0', // Start as invisible
            transform: 'translateY(10px)', // Start from a slight lower position
          },
          '100%': {
            opacity: '1', // Fully visible
            transform: 'translateY(0)', // Normal position
          },
        },
      },
    },
  },
  plugins: [],
};
