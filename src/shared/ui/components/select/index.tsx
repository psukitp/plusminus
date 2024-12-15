import styled from 'styled-components'
import { SelectComponent } from './Select'

export const Select = styled(SelectComponent)`
  select {
    cursor: pointer;
    outline: none;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.pallete.dom.background};
    padding: 12px;
    border-radius: 8px;
  }
`
