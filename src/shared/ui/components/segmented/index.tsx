import styled from 'styled-components'
import { SegmentedComponent, SegmentedButton } from './Segmented'

export const Segmented = styled(SegmentedComponent)`
  background-color: ${({ theme }) => theme.pallete.dom.background};
  padding: 4px;
  border-radius: 4px;

  ${SegmentedButton} + ${SegmentedButton} {
    margin-left: 4px;
  }
`
