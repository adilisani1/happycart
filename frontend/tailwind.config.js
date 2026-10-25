module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#F2F4F7",
        muted: "#9AA3AD",
        coral: "#FF5C35",
        "coral-dark": "#E84A24",
        teal: "#3DD6C6",
        mist: "#151A22",
        "price-color": "#3DD6C6",
        "primary-color": "#FF5C35",
        "card-color-one": "#1C2430",
        "card-color-two": "#12171F",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      backgroundImage: {
        "blue-gradient":
          "linear-gradient(135deg, #FF5C35 0%, #FF8A5C 100%)",
        "light-gradient":
          "linear-gradient(135deg, #E84A24 0%, #FF5C35 100%)",
        "accent-gradient":
          "linear-gradient(135deg, #FF5C35 0%, #FF8A5C 55%, #FFB088 100%)",
      },
    },
  },
  plugins: [],
};
