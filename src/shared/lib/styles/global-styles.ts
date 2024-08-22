import { createGlobalStyle } from 'styled-components';

import RobotoRegular from '../fonts/Roboto/Roboto-Regular.ttf';
import RobotoBold from '../fonts/Roboto/Roboto-Bold.ttf';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoBold}) format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`
