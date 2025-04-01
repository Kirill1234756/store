/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Используем class-based dark mode для ручного управления
  theme: {
    extend: {
      colors: {
        // Основные цвета из вашей схемы
        primary: {
          DEFAULT: '#2A5C8D', // Основной синий
          light: '#3A7CB9',   // Светлый синий
          dark: '#1C4568',    // Темный синий
        },
        accent: {
          DEFAULT: '#FF6B35', // Основной оранжевый
          light: '#FF8C5A',   // Светлый оранжевый
          dark: '#E05A2B',    // Темный оранжевый
        },
        
        // Нейтральные цвета
        gray: {
          50: '#F7FAFC',
          100: '#EDF2F7',
          200: '#E2E8F0',
          300: '#CBD5E0',
          400: '#A0AEC0',
          500: '#718096',
          600: '#4A5568', // Ваш серый для текста
          700: '#2D3748', // Основной текст
          800: '#1A202C',
          900: '#171923',
        },
        
        // Семантические цвета
        success: '#38A169',
        error: '#E53E3E',
        warning: '#DD6B20',
        info: '#3182CE',
        
        // Альтернативные названия для удобства
        bg: colors.white,      // Фон по умолчанию
        text: colors.gray[700], // Основной текст
        'text-secondary': colors.gray[600], // Вторичный текст
        border: colors.gray[200], // Границы
      },
      
      // Дополнительные кастомные классы
      backgroundColor: {
        'primary': 'var(--color-primary)',
        'accent': 'var(--color-accent)',
      },
      textColor: {
        'primary': 'var(--color-primary)',
        'accent': 'var(--color-accent)',
      },
      borderColor: {
        'primary': 'var(--color-primary)',
        'accent': 'var(--color-accent)',
      },
      
      // Анимации
      transitionProperty: {
        'colors': 'color, background-color, border-color, fill, stroke',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      backgroundColor: ['dark', 'hover', 'focus'],
      textColor: ['dark', 'hover', 'focus'],
      borderColor: ['dark', 'hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}