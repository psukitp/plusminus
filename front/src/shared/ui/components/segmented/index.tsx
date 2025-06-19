import styled from 'styled-components'
import { SegmentedComponent, SegmentedButton } from './Segmented'

export { type SegmentedOption } from './types'

export const Segmented = styled(SegmentedComponent)`
  background-color: ${({ theme }) => theme.pallete.dom.background};
  padding: 4px;
  border-radius: ${({ cirlced = false }) => (cirlced ? '22px' : '4px')};

  ${SegmentedButton} + ${SegmentedButton} {
    margin-left: 4px;
  }
`
