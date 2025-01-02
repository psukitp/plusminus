import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import { ReviewPageComponent } from './ReviewPage'

const ReviewPage = styled(ReviewPageComponent)`
  background: ${({ theme }) => theme.pallete.dom.white};

  padding: ${isMobile ? '10px 10px 30px 10px' : '24px 24px 15px 24px'};

  overflow: auto;
  width: 100%;
  height: calc(100% - 98px);

  .grid {
    grid-template-rows: ${isMobile ? 'repeat(14, 1fr)' : 'repeat(5, 1fr)'};
    grid-template-columns: ${isMobile ? '100%' : 'repeat(4, 1fr)'};
    display: grid;
    gap: ${({ theme: { gaps } }) => `${gaps.l}px`};
    height: ${isMobile ? '1500px' : 'calc(100% - 80px)'};
  }
`

export default ReviewPage
