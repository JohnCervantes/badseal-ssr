module.exports = {
  mode: "jit",
  important: true,
  purge: [
    "./pages/*.{js,ts,jsx,tsx}",
    "./pages/*/**.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
    "./components/*/**.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        elsie: ["Elsie Swash Caps", "sans-serif"],
        openSans: ["Open Sang, sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-right-to-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(150px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        }
      },
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
        "fade-in": "fade-in 0.8s ease-out",
        "fade-in": "fade-in 0.8s ease-out",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "fade-in-right-to-left": "fade-in-right-to-left 1s ease-out 300ms",
      },
      backgroundImage: (theme) => ({
        "nav-wave": "url('/wave.svg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
