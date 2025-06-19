import { initReactI18next } from 'react-i18next'

import { i18n } from 'i18next'

// import resources from './locales'

export const supportedLocales = ['ru', 'en']

export const init = async (i18next: i18n, lang: string) => {
  await i18next.use(initReactI18next).init({
    lng: lang ?? 'ru',
    supportedLngs: supportedLocales,
    fallbackLng: 'en',
    // resources,
    interpolation: {
      escapeValue: false,
    },
  })

  return i18next
}
