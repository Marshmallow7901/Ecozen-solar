/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Apple-refined palette with Ecozen green brand
        apple: {
          bg:      "#ffffff",
          bgAlt:   "#f5f5f7",
          bgDark:  "#000000",
          bgDarkAlt: "#1d1d1f",
          text:    "#1d1d1f",
          textSecondary: "#6e6e73",
          textDark: "#f5f5f7",
          textDarkSecondary: "#a1a1a6",
          separator: "#d2d2d7",
          separatorDark: "#3a3a3c",
        },
        green:   { DEFAULT: "#30d158", 400: "#30d158", 500: "#25a244", 600: "#1e8a39", light: "#e8faf0" },
        sage:    { DEFAULT: "#22c55e", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d" },
        amber:   { DEFAULT: "#f59e0b", 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706" },
        obsidian:{ DEFAULT: "#060d08", 900: "#060d08", 800: "#0d1b10", 700: "#172612", 600: "#223720" },
        mist:    "#f5f5f7",
        slatezen: "#1d1d1f",
      },
      boxShadow: {
        apple:  "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06), 0 24px 48px rgba(0,0,0,0.04)",
        appleHover: "0 1px 3px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.10), 0 32px 64px rgba(0,0,0,0.06)",
        appleDark: "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 24px rgba(0,0,0,0.40)",
        glow:   "0 0 0 3px rgba(48,209,88,0.20), 0 8px 24px rgba(37,162,68,0.22)",
        card:   "0 2px 0 0 rgba(34,197,94,0.10), 0 20px 60px rgba(0,0,0,0.08)",
        zen:    "0 20px 60px rgba(0,0,0,0.10)",
        amber:  "0 0 0 3px rgba(245,158,11,0.20), 0 8px 24px rgba(217,119,6,0.18)",
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(ellipse 70% 50% at 60% 0%, rgba(48,209,88,0.12) 0%, transparent 65%)",
        "gradient-green": "linear-gradient(135deg, #30d158 0%, #25a244 100%)",
        "gradient-dark": "linear-gradient(160deg, #1d1d1f 0%, #000000 100%)",
        "card-shine": "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)",
      },
      fontFamily: {
        sans:    ["Inter", "Manrope", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        display: ["Inter", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        mono:    ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        apple: "-0.022em",
        appleTitle: "-0.03em",
      },
      borderRadius: {
        "4xl": "1.5rem",
        "5xl": "2rem",
      },
      backdropBlur: {
        apple: "20px",
        "2xl": "24px",
      },
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-8px)" },
        },
        orb: {
          "0%,100%": { transform: "scale(1) translate(0,0)" },
          "50%":     { transform: "scale(1.05) translate(4px,-6px)" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer:  "shimmer 4s linear infinite",
        float:    "float 5s ease-in-out infinite",
        orb:      "orb 10s ease-in-out infinite",
        "fade-up": "fade-up 0.5s ease forwards",
      },
    },
  },
  plugins: [],
};
