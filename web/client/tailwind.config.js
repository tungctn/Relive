module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1B2C56",
        secondary: "#7EA8F9",
        yellow: "#FCEABC",
        blue: "#B9E9FD",
        purple: "#DFCFF6",
        green: "#C8FFC7",
      },
      fontFamily: {
        plus: ["Plus", "ui-sans-serif"],
        plusBold : ["PlusBold", "ui-sans-serif"],
        plusMedium: ["PlusMedium", "ui-sans-serif"],
        plusLight: ["PlusLight", "ui-sans-serif"],
        plusExtraBold: ["PlusExtraBold", "ui-sans-serif"],
        poppins: ["Poppins", "ui-sans-serif"],
        lato: ["Lato", "SFMono-ui-monospace"],
      },
    },
  },
  plugins: [],
};
