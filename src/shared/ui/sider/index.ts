import styled from 'styled-components'
import { SiderComponent } from './Sider'

export type { ActiveCaption } from './types'

export const Sider = styled(SiderComponent)`
  height: 100%;
  max-width: 300px;
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

  .header {
    height: 100%;
    max-height: 98px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: ${({ theme: { gaps } }) => `${gaps.l}px`};
    row-gap: 10px;
  }

  .bottom {
    max-width: 250px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme: { gaps } }) => `${gaps.s}px`};
    margin: auto auto;
    padding-bottom: ${({ theme: { gaps } }) => `${gaps.xl}px`};
  }
`
