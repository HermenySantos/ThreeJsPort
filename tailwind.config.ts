import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111411',
        paper: '#f5f5f5',
        mute: {
          DEFAULT: '#a3a3a3',
          dim: '#737373',
        },
        line: 'rgba(255,255,255,0.10)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1280px',
      },
      letterSpacing: {
        label: '0.18em',
      },
    },
  },
  plugins: [],
};

export default config;
