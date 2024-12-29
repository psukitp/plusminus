import { Currency } from '@shared/lib'

export const getCurrencySymbol = (currency: Currency | undefined): string => {
  switch (currency) {
    case 'rub':
      return '₽'
    case 'dol':
      return '$'
    case 'eur':
      return '€'
    default:
      return ''
  }
}
