export type Locale = 'ru' | 'en'

export type ServiceResponse<T> = {
  data: T
  success: boolean
  message: string
}

export type ComponentProps = {
  theme: 'dark' | 'light'
}

export type Currency = 'rub' | 'dol' | 'eur'
export enum ThemeType {
  'light',
  'dark',
}
