/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "0",
      },
      screens: {
        sm: "100%",
        md: "768px",
        lg: "1000px",
        xl: "1280px",
      },
    },
    extend: {
      colors: {
        primary: "#FF6F61",
        black: "#020202",
        dark: {
          DEFAULT: "#36454F",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        "cherry-today": ["Cherry Today Demo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
