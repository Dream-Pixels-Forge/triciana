/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors - soft, elegant florist palette
        primary: {
          50: '#FDF2F5',
          100: '#FBE4EB',
          200: '#F7C9D7',
          300: '#F1A3BC',
          400: '#E87599',
          500: '#DD4A7A',
          600: '#C92F5F',
          700: '#A8224C',
          800: '#8A2041',
          900: '#731F39',
          950: '#410D1E',
        },
        // Neutral colors - warm, natural tones
        neutral: {
          50: '#FAFAF9',
          100: '#F5F5F3',
          200: '#E8E8E5',
          300: '#D6D6D1',
          400: '#A8A8A3',
          500: '#787875',
          600: '#575754',
          700: '#454543',
          800: '#3A3A38',
          900: '#1C1C1B',
        },
        // Accent - sage green for sustainability
        accent: {
          50: '#F4F7F4',
          100: '#E4ECE4',
          200: '#C9D9C9',
          300: '#A3BEA4',
          400: '#759F76',
          500: '#548155',
          600: '#416642',
          700: '#355137',
          800: '#2E4330',
          900: '#28382A',
          950: '#101F12',
        },
      },
      fontFamily: {
        // Elegant serif for headings (Playfair Display)
        display: ['Playfair Display', 'Georgia', 'serif'],
        // Clean sans-serif for body text (Inter)
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Custom type scale for elegant typography
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['2rem', { lineHeight: '1.25', letterSpacing: '0' }],
        'heading-lg': ['1.75rem', { lineHeight: '1.3', letterSpacing: '0' }],
        'heading-md': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.5', letterSpacing: '0' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'body-md': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
      },
      spacing: {
        // Custom spacing for generous, elegant layouts
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 40px -4px rgba(0, 0, 0, 0.08)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
  // Accessibility: respect reduced motion preference
  future: {
    hoverOnlyWhenSupported: true,
  },
}
