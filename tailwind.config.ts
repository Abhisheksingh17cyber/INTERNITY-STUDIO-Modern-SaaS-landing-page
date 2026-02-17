import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0D0E10',
        gold: {
          DEFAULT: '#C6A75E',
          dark: '#A68B3E',
          light: '#E6C77A',
        },
        silver: {
          DEFAULT: '#F7F7F7',
          dark: '#B8B8B8',
        },
        charcoal: {
          DEFAULT: '#141517',
          light: '#1E1F22',
          dark: '#0A0B0D',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(3rem, 8vw, 10rem)',
        'hero-sub': 'clamp(1.5rem, 3vw, 3rem)',
        'statement': 'clamp(2rem, 5vw, 6rem)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(198, 167, 94, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(198, 167, 94, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'sm': '2px',
        'DEFAULT': '4px',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C6A75E 0%, #E6C77A 50%, #C6A75E 100%)',
        'obsidian-gradient': 'linear-gradient(180deg, #0D0E10 0%, #141517 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(198,167,94,0.08) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
