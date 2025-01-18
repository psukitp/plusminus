import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import { ReviewPageComponent } from './ReviewPage'

const ReviewPage = styled(ReviewPageComponent)`
  background: ${({ theme }) => theme.pallete.dom.white};

  padding: 24px 24px 15px 24px;

  overflow: auto;
  width: 100%;
  height: calc(100% - 83px);

  .grid {
    grid-template-rows: ${isMobile ? 'repeat(14, 1fr)' : 'repeat(5, 1fr)'};
    grid-template-columns: ${isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'};
    display: grid;
    gap: ${({ theme: { gaps } }) => `${gaps.l}px`};
    height: ${isMobile ? '1500px' : 'calc(100% - 80px)'};
  }
`

export default ReviewPage
