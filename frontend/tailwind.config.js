module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "card-color-one": "#352c72",
        "card-color-two": "#150d2b",
        "primary-color": "#7824f6",
        "price-color": "#7da0eb",
      },
      backgroundImage: {
        "blue-gradient":
          "linear-gradient(157.81deg, #7a76f7 -43.27%, #bec7f5 -21.24%, #9da6f0 12.19%, #7da0eb 29.82%, #536dff 51.94%, #55a9ff 90.29%)",
        "light-gradient":
          "linear-gradient(326deg, #7a76f7 -43.27%, #bec7f5 -21.24%, #9da6f0 12.19%, #7da0eb 29.82%, #536dff 51.94%, #55a9ff 90.29%)",
      },
    },
  },

  plugins: [],
};