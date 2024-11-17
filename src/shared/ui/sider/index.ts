import styled from 'styled-components'
import { SiderComponent } from './Sider'

export type { ActiveCaption } from './types'

export const Sider = styled(SiderComponent)`
  height: 100%;
  max-width: 282px;
  width: 100%;
  border-right: 1px solid #d6d6d6;
  display: flex;
  flex-direction: column;

  background-color: ${({
    theme: {
      pallete: { dom },
    },
  }) => dom.background};

  a {
    max-width: 250px;
    width: 100%;
  }

  .main {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 90px;
    row-gap: 10px;
  }

  .bottom {
    max-width: 250px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto auto;
    padding-bottom: 30px;
  }
`
