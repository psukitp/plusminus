import { css, DefaultTheme } from 'styled-components'

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
      orangeLight: '#E77C55',
      purple: '#9C90FC',
    },
    content: {
      main: '#132436',
      light: '#C1C8D2',
    },
    dom: {
      white: '#FFFFFF',
      black: '#000000',
      background: '#F7F4EF',
    },
  },
  fonts: {
    heading_1: css`
      font-size: 30px;
      font-family: 'RobotoSemiBold';
    `,
    heading_2: css`
      font-size: 20px;
      font-family: 'RobotoSemiBold';
    `,
    leading: css`
      font-size: 16px;
      font-family: 'RobotoMedium';
    `,
    small: css`
      font-size: 12px;
      font-family: 'RobotoRegular';
    `,
    extraSmall: css`
      font-size: 10px;
      font-family: 'RobotoRegular';
    `,
  },
}
