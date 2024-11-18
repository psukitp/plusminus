import styled from 'styled-components'
import { SmallWidgetComponent } from './SmallWidget'

export const SmallWidget = styled(SmallWidgetComponent)`
  height: 100%;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 24px);
  }

  .text {
    font-size: 30px;
    line-height: 40px;
    font-family: 'RobotoMedium';
    margin-right: 20px;
  }

  .diff {
    display: flex;
    justify-content: space-between;
    &_value {
      display: block;
      max-width: 60%;
    }
  }
`
