/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('https://wallpaperaccess.com/full/8406757.gif')",
        'footer-texture': "url('/img/footer-texture.png')",
        'searchbak': "url('/src/assets/searchbak.png')"
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'poke-yellow': '#fcd34d',
      'red': '#F87171',
      'grey-glass':'#6B7280',
    },
    extend: { headings: {
      h1: {
        fontSize: '8rem',
        fontWeight: 'bold',
        leading: 'snug',
      },
    },
    },
  },
  plugins: [],
}

