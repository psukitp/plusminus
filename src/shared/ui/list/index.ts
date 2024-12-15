import styled from 'styled-components'
import { ListComponent } from './List'

export { type RecordType } from './types'

export const List = styled(ListComponent)`
  background: ${({ theme }) => theme.pallete.dom.background};
  padding: 24px;
  border-radius: 8px;

  .group {
    margin-top: 8px;
    font-size: 16px;
  }
`
