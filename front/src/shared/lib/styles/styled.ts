import 'styled-components'
import { RuleSet } from 'styled-components'

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
    fonts: {
      heading_1: RuleSet<object>
      heading_2: RuleSet<object>
      leading: RuleSet<object>
      smallLeading: RuleSet<object>
      small: RuleSet<object>
      extraSmall: RuleSet<object>
    }
  }
}
