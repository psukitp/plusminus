import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    gaps: {
      s: number
      m: number
      l: number
      xl: number
    }
    pallete: {
      primary: {
        orange: string
        orangeLight: string
        purple: string
      }
      content: {
        main: string
        light: string
      }
      dom: {
        white: string
        black: string
        background: string
      }
    }
  }
}
