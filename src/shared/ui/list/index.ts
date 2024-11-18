import styled from 'styled-components'
import { ListComponent } from './List'

export const List = styled(ListComponent)`
  background: ${({ theme }) => theme.pallete.dom.background};
  padding: 24px;
  border-radius: 8px;
`
