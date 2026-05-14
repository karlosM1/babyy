/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Nunito", "system-ui", "sans-serif"],
        handwriting: ["Caveat", "Segoe Script", "cursive"],
      },
      colors: {
        cream: "#fff8f2",
        peach: "#ffd8c8",
        rose: "#f4a6b8",
        blush: "#ffe4ec",
        lilac: "#e8ddff",
        petal: "#fff0f5",
      },
      animation: {
        "fade-up": "fadeUp 0.9s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
        "hero-bob": "heroBob 5.5s ease-in-out infinite",
        "hero-heart": "heroHeart 4.2s ease-in-out infinite",
        "hero-sparkle": "heroSparkle 2.8s ease-in-out infinite",
        "hero-glow": "heroGlow 6s ease-in-out infinite",
        "candle-flicker": "candleFlicker 0.75s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        heroBob: {
          "0%, 100%": { transform: "translateY(0) rotate(-2deg)" },
          "50%": { transform: "translateY(-10px) rotate(2deg)" },
        },
        heroHeart: {
          "0%, 100%": { transform: "translateY(0) scale(1)", opacity: "0.85" },
          "50%": { transform: "translateY(-12px) scale(1.08)", opacity: "1" },
        },
        heroSparkle: {
          "0%, 100%": { transform: "scale(1) rotate(0deg)", opacity: "0.55" },
          "50%": { transform: "scale(1.15) rotate(12deg)", opacity: "1" },
        },
        heroGlow: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.5" },
          "50%": { transform: "scale(1.12)", opacity: "0.85" },
        },
        candleFlicker: {
          "0%, 100%": { transform: "scale(1)", filter: "brightness(1)" },
          "40%": { transform: "scale(1.12)", filter: "brightness(1.15)" },
          "60%": { transform: "scale(0.95)", filter: "brightness(0.92)" },
        },
      },
    },
  },
  plugins: [],
};
