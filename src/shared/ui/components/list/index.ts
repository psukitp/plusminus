import styled from 'styled-components'
import { ListComponent } from './List'

export { type RecordType } from './types'

export const List = styled(ListComponent)`
  background: ${({ theme }) => theme.pallete.dom.background};
  padding: ${({ theme: { gaps } }) => `${gaps.l}px`};
  border-radius: 8px;

  .group {
    margin-top: ${({ theme: { gaps } }) => `${gaps.s}px`};;
    font-size: 16px;
  }
`
