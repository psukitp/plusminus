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
    ${({ theme }) => theme.fonts.heading_1}
  }

  .description {
    ${({ theme }) => theme.fonts.small}
    color: ${({ type, theme }) =>
      type === 'primary' || type === 'secondary'
        ? theme.pallete.dom.white
        : theme.pallete.dom.black};
  }

  .diff {
    display: flex;
    justify-content: space-between;
    align-items: end;
    &_value {
      display: block;
      max-width: 60%;
    }
  }
`
