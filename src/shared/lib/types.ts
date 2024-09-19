export type Locale = 'ru' | 'en'

export type ServiceResponse<T> = {
  data: T
  success: boolean
  message: string
}

export type ComponentProps = {
  theme: 'dark' | 'light'
}
