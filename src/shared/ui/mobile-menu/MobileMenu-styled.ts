import { StyledComponentProps } from '@shared/lib'
import styled from 'styled-components'

export const MobileMenuContainer = styled.div<StyledComponentProps>`
  position: fixed;
  bottom: 0px;
  width: 100%;
  z-index: 1000;
  padding-bottom: 46px;
  padding-top: 12px;
  background: #fff;
`

export const MobileMenuButtons = styled.div`
  display: flex;
  justify-content: space-around;
`
