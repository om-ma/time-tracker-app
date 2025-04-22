/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['DM Mono', 'monospace'],
      },
      screens: {
        xs: '540px',
        xrs:'440px',
        xxs:'360px', // Custom `xs` breakpoint
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Tailwind typography plugin
    function ({ addUtilities }) {
      addUtilities({
        '.gradient-border-b': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '165%', // Default width for small screens
            height: '0.9px',
            background: 'linear-gradient(to right, #00000099, #0000000F)',
          },
          '@media (min-width: 540px)': { // Media query for larger screens
            '&::after': {
              width: '112%', // Change width to 100% on screens >= 640px
            },
            
          },
          '@media (min-width: 640px)': { // Media query for larger screens
            '&::after': {
              width: '100%', // Change width to 100% on screens >= 640px
            },
            
          },
          
        },
      });
    },
  ],
};
