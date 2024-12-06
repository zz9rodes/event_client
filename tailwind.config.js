/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
        colors: {
          customColor: '#1c1c1e', 
          bacdrop_modal:'rgb(0 0 0 / 7%)'
        },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

// rgb(0 0 0 / 7%)