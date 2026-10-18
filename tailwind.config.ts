import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#030A17",
          900: "#071A3A",
          850: "#0B224C",
          800: "#0B2856",
          700: "#123A78",
          600: "#1A4D9A",
          500: "#2762BE",
        },
        gold: {
          50: "#FCF9EE",
          100: "#FFF9E8",
          200: "#F6E5A7",
          300: "#ECCD67",
          400: "#E3BC3C",
          500: "#D9A928",
          600: "#B8861B",
          700: "#926512",
          800: "#744E13",
          900: "#5E3E13",
        },
        cream: {
          DEFAULT: "#FFF9E8",
          light: "#FFFFF5",
          dark: "#F4EBD0",
        },
        platinum: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
        },
        diamond: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
        },
        silver: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
        }
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F6E5A7 0%, #D9A928 50%, #B8861B 100%)",
        "gold-gradient-subtle": "linear-gradient(135deg, rgba(246, 229, 167, 0.15) 0%, rgba(217, 169, 40, 0.08) 50%, rgba(184, 134, 27, 0.02) 100%)",
        "platinum-gradient": "linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 50%, #94A3B8 100%)",
        "diamond-gradient": "linear-gradient(135deg, #FFFFFF 0%, #BAE6FD 50%, #38BDF8 100%)",
        "silver-gradient": "linear-gradient(135deg, #FFFFFF 0%, #E5E7EB 50%, #9CA3AF 100%)",
        "navy-radial": "radial-gradient(circle at 50% 20%, #0B2856 0%, #071A3A 60%, #030A17 100%)",
        "hero-glow": "radial-gradient(circle at 50% 50%, rgba(217, 169, 40, 0.12) 0%, rgba(7, 26, 58, 0) 70%)",
      },
      boxShadow: {
        "gold-sm": "0 2px 10px -2px rgba(217, 169, 40, 0.25)",
        "gold-md": "0 8px 30px -4px rgba(217, 169, 40, 0.3)",
        "gold-lg": "0 20px 40px -8px rgba(217, 169, 40, 0.35)",
        "navy-card": "0 10px 35px -5px rgba(3, 10, 23, 0.6), 0 0 0 1px rgba(217, 169, 40, 0.12)",
        "navy-glow": "0 0 50px rgba(11, 40, 86, 0.6)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.4" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "light-sweep": {
          "0%": { transform: "translateX(-100%) rotate(45deg)" },
          "100%": { transform: "translateX(200%) rotate(45deg)" },
        }
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 8s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "light-sweep": "light-sweep 4s linear infinite",
      }
    },
  },
  plugins: [],
};

export default config;
