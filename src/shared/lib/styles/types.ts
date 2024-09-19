import { DefaultTheme } from 'styled-components'

interface Colors {
  backgroundComponent: {
    default: string
    active: string
  }
  boxShadow: string
  textColor: {
    default: string
    active: string
  }
  mobile: {
    containerBackground: string
  }
}

export interface Common {
  border: string
  borderRadius: string
}

export interface Theme extends DefaultTheme {
  colors: Colors
  common: Common
}

export interface StyledComponentProps {
  theme: Theme
}
