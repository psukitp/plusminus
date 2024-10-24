import styled from 'styled-components'
import { ReviewHeaderComponent } from './ReviewHeader'

export const ReviewHeader = styled(ReviewHeaderComponent)`
  height: 50px;
  padding-bottom: 15px;

  .ant-picker {
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
  }
`
