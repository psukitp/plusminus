import styled from 'styled-components'
import { MobileMenuComponent } from './MobileMenu'

export const MobileMenu = styled(MobileMenuComponent)`
  position: fixed;
  bottom: 0px;
  width: 100%;
  z-index: 1000;
  padding-bottom: 34px;
  padding-top: 9px;
  background: ${({ theme }) => theme.pallete.dom.background};
  box-shadow: 0px 2px 60px 0px rgba(0, 0, 0, 0.15);

  .buttons {
    display: flex;
    justify-content: space-around;
  }
`
