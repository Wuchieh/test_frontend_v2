// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
  ],

  i18n: {
    locales: [
      { code: 'zh-TW', language: 'zh-TW', name: '繁體中文' },
      { code: 'en-US', language: 'en-US', name: 'English' }
    ],
    defaultLocale: 'zh-TW',
    vueI18n: './i18n/i18n.config.ts',
    detectBrowserLanguage: false,
  },

  image: {
    provider: 'ipx',
    presets: { default: { modifiers: { format: 'webp', quality: 75 } } }
  },

  googleFonts: {
    display: 'swap',
    download: false,
    families: { 'Noto Sans TC': true }
  },

  postcss: {
    plugins: {
      'postcss-preset-env': { stage: 1, features: { 'nesting-rules': true } },
      'postcss-nested': {},
      'postcss-pxtorem': { rootValue: 16, propList: ['*'], exclude: /node_modules/i },
      autoprefixer: { overrideBrowserslist: ['last 2 versions', '> 1%'] }
    }
  },

  vite: { css: { preprocessorOptions: { scss: { api: 'modern' } } } },

  css: ['~/assets/css/style.scss'],
  runtimeConfig: {
    public: {
      apiBase: 'https://38356.wu.elitepro.ltd',
    },
  },
  typescript: { strict: true }
})
