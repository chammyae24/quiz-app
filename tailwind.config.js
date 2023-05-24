/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "svg-pattern": "url('/stacked-steps-haikei.svg')"
      },
      colors: {
        "q-primary": "#c034eb",
        "q-secondary": "#e23535",
        "q-accent": "#efbc5a"
      }
    }
  },
  plugins: []
};
