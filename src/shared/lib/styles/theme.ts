import { DefaultTheme } from 'styled-components'
import { common } from './common'

export const theme: DefaultTheme = {
  gaps: {
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  pallete: {
    primary: {
      orange: '#E05A29',
      purple: '#9C90FC',
    },
    content: {
      main: '#132436',
      light: '#C1C8D2',
    },
    dom: {
      white: '#FFFFFF',
      background: '#F7F4EF',
    },
  },

  // Рудимент, удалить
  common: { ...common },
  colors: {
    backgroundComponent: {
      active: '#fb7a01',
      default: 'linear-gradient(180deg, #ecedf3 0%, #f1f2f7 100%)',
    },
    boxShadow:
      '6px 6px 10px 0 rgba(0, 0, 0, 0.25), -6px -6px 10px 0 rgba(255, 255, 255, 0.5)',
    textColor: {
      default: '#000000',
      active: '#ffffff',
    },
    mobile: {
      containerBackground: '#f5f6fa',
    },
  },
}
