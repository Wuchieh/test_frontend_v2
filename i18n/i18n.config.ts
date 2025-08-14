import zhTW from './language/tw.json'
import enUS from './language/en.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'zh-TW',
  fallbackLocale: ['zh-TW', 'en-US'],
  messages: {
    'zh-TW': zhTW,
    'zh': zhTW,
    'en-US': enUS
  }
}))