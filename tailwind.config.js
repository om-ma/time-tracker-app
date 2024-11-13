// tailwind.config.js
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
    },
  },
  plugins: [
    require('@tailwindcss/typography'),  // Move the plugin here
    function ({ addUtilities }) {
      addUtilities({
        '.gradient-border-b': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '90%',
            height: '0.9px',  // Adjust thickness
            background: 'linear-gradient(to right, #00000099, #0000000F)',
          },
        },
      });
    },
  ],
};
