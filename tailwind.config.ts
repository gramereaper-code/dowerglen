import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#F5F7FA",
        graphite: "#111111",
        steel: "#2B2B2B",
        electric: "#00AEEF",
        reactor: "#00C26E",
        smoke: "#D9E3E8",
        border: "rgba(255,255,255,0.12)",
        muted: "rgba(245,247,250,0.68)"
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        satoshi: ["Satoshi", "var(--font-inter)", "Inter", "sans-serif"]
      },
      boxShadow: {
        electric: "0 0 38px rgba(0, 174, 239, 0.35)",
        reactor: "0 0 42px rgba(0, 194, 110, 0.3)",
        insetGlow: "inset 0 0 30px rgba(0,174,239,0.08)"
      },
      backgroundImage: {
        "industrial-grid":
          "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
        "radial-reactor":
          "radial-gradient(circle at 50% 50%, rgba(0,174,239,0.22), transparent 42%), radial-gradient(circle at 75% 18%, rgba(0,194,110,0.18), transparent 32%)"
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" }
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(18px,-14px,0)" }
        }
      },
      animation: {
        pulseGlow: "pulseGlow 3.8s ease-in-out infinite",
        scanline: "scanline 6s linear infinite",
        drift: "drift 8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
