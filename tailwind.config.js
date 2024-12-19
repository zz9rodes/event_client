/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

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
        fontFamily:{
          nunito:["Nunito", 'serif'],
          suse:["SUSE", 'serif']
        }
    },
  },
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: ["light", "dark"],
  }
}

// rgb(0 0 0 / 7%)