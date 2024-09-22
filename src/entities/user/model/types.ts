import { Currency, Locale, ThemeType } from '@shared/lib/types'
import { Key } from 'react'

export type AuthFormData = {
  login: string
  password: string
}

export type UserSettings = {
  locale?: Locale
  theme?: ThemeType
  currency?: Currency
}

export type AuthResponseData = {
  id: Key | null
  name: string
  secondName: string
  login: string
  phone: string
  email: string
  settings?: UserSettings
}

export type RegisterFormData = {
  login: string
  name: string
  secondName: string
  email: string
  baseCategories: boolean
  password: string
}
