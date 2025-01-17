import styled from 'styled-components'
import { InputComponent } from './Input'

export const Input = styled(InputComponent)`
  border: 1px solid ${({ theme }) => theme.pallete.dom.background};
  padding: ${({ theme: { gaps } }) => `${gaps.m}px`};
  border-radius: 8px;
`
