/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '0.5': '0.5px',
      },
      borderColor: ['focus'], // Add focus variant
      fontSize: {
        f28: "28px",
        f20: "20px",
        f19: "19px",
        f18: "18px",
        f16: "16px",
        base: "16px",
        smi: "13px",
        xl: "20px",
        sm: "14px",
        lg: "18px",
        "smi-5": "12.5px",
        "9xl": "28px",
        "21xl": "40px",
        "5xl": "24px",
        "26xl": "45px",
        "36xl": "55px",
        "49xl": "68px",
        lgi: "19px",
      },
      colors: {
        primary: {
          green1: "#4D997F",
          green2: "#CEE6AD",
          white1: "#FFFFFF",
          title1: "#0E555C",
          gris1: "#f7f9f7",
          gris2: "#627173",
          gris3: "#9CA09F",
          gris4: "#C6CCCB",
          title2: "#202626",
          buttonBg1: "#f7f9f7",
          buttonBg2: "#fe5000",
          yellow1: "#F2DE00",
          error1: "#FF1A1A",
          btn1: "#43C8F2",
        },
        hover: {
          buttonBg1: "#FFFFFF",
          buttonBg2: "#43C8F2",
        },
        white: "#fff",
        blancoMisty: "#F7F9F7",
        midnightBlue: '#20262666',
        forestGray: '#363F40',
        lightHaze: '#F0F2F2',
        darkslategray: {
          "100": "#0e555c",
          "200": "#363f40",
        },
        whitesmoke: {
          "100": "#f7f9f7",
          "200": "#eef1f4",
          "300": "#f0f2f2",
        },
        palegoldenrod: {
          "100": "#CEE6AD",
          "200": "#cee6ad",
        },
        darkcyan: "#4d997f",
        honeydew: "#eef9ed",
        dimgray: {
          "100": "#707070",
          "200": "#627173",
        },
        orangered: {
          "100": "#fe5000",
          "200": "#e6500b",
        },
        gray: {
          "100": "#202626",
          "200": "rgba(255, 255, 255, 0.1)",
          "300": "rgba(255, 255, 255, 0)",
        },
        lightgray: {
          "100": "#ced2d9",
          "200": "#c6cccb",
        },
        darkgray: "#9ca09f",
      },
      fontWeight: {
        "h3": "700"
      },
      borderRadius: {
        "12xs-5": "0.5px",
        xl: "20px",
        "3xs": "10px",
        "8xs": "5px",
        "9xs-7": "3.7px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1736px",
      },
      width: {
        '95': '95%',
        '90': '90%',
      },
      corePlugins: {
        preflight: false,
      },
    },
  },
  plugins: [],
}