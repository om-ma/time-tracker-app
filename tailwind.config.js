/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       
      fontFamily: {
        DM: ["DM Mono", "serif"],
        
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.gradient-border-b': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '0.9px', // Adjust thickness as needed
            background: 'linear-gradient(to right, #00000099,#0000000F)',
          },
        },
      });
    },
  ],
};
 

 
 
