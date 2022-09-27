/* tailwind.config.js */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        landingBackground:
          "linear-gradient(to bottom, rgba(253, 63, 200, 0), rgba(255,255,255, 1)), url('../public/landingBackground.jpg')",
        landingMiddleBackground:
          'linear-gradient(to bottom, rgba(255,255,255, 1)), rgba(168, 159, 164, .48)',
      },
      backdropContrast: {
        25: '.25',
      },
      margin: {
        default: '7%',
      },
      height: (theme) => ({
        'screen/2': '50vh',
        'screen/3': 'calc(100vh / 3)',
        'screen/4': 'calc(100vh / 4)',
        'screen/5': 'calc(100vh / 5)',
      }),
      colors: {
        bgHeader: '#cbd5e1',
        bgSubsection: '#fafafa',
        bgPageDefault: 'white',
        fontBG: '#606775',
        textPurple: '#c084fc',
        hoverPurple: '#9333ea',
        activeGreen: '#1ADB34',
        badRed: '#E00422',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
