import { common } from './common'
import { Theme } from './types'

export const themeLight: Theme = {
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
