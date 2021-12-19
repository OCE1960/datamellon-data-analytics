module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#10277C",
        },
      },
      gridTemplateColumns: {
        "auto-fit-72": "repeat(auto-fit, minmax(288px, 1fr))",
      },
      spacing: {
        34: "8.5rem",
        76: "19rem",
        82: "20.5rem",
      },
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
  },
  variants: {
    extend: {
      borderWidth: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
