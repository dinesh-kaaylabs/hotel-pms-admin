import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS Configuration
 * 
 * IMPORTANT: This project uses Tailwind via CDN in index.html for development.
 * For production builds, ensure you have tailwindcss and postcss installed.
 * 
 * Theme Strategy:
 * - darkMode: 'class' - Uses class-based dark mode (adds 'dark' class to <html>)
 * - Brand colors via CSS variables from BrandThemeProvider
 * - Responsive design with mobile-first approach
 */
const config: Config = {
  darkMode: 'class', // CRITICAL: Must match index.html config for consistency
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--brand-primary, #4f46e5)',
          secondary: 'var(--brand-secondary, #4338ca)',
          accent: 'var(--brand-accent, #10b981)',
        },
      },
      fontFamily: {
        sans: ['var(--brand-font, Inter)', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
