/**
 * Центральная конфигурация портфолио
 * Меняйте значения здесь, и они применятся ко всему сайту
 */

export const PORTFOLIO_CONFIG = {
  // Основная информация
  name: 'xoxmuk',

  // Социальные ссылки
  socials: {
    github: 'https://github.com/xoxmuk',
    telegram: 'https://t.me/xoxmuk',
    email: 'xoxmuk.@gmail.com',
  },

  // Технологии с иконками и ссылками
  technologies: [
    { name: 'React', icon: 'Code2' },
    { name: 'TypeScript', icon: 'Code2' },
    { name: 'Next.js', icon: 'Code2' },
    { name: 'Tailwind CSS', icon: 'Palette' },
    { name: 'Node.js', icon: 'Code2' },
  ],

  // Мини-приложения по категориям
  apps: {
    tools: [
      { name: 'JSON Formatter', link: '/apps/json-formatter', icon: 'Code' },
      { name: 'Color Picker', link: '/apps/color-picker', icon: 'Palette' },
    ],
    utilities: [
      { name: 'QR Code Generator', link: '/apps/qr-generator', icon: 'QrCode' },
      { name: 'Text Converter', link: '/apps/text-converter', icon: 'Type' },
    ],
  },
} as const
