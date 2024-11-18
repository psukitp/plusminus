import styled from 'styled-components'
import { ReviewHelloComponent } from './ReviewHello'

export const ReviewHello = styled(ReviewHelloComponent)`
  height: 80px;
  display: flex;
  align-items: start;

  .hello {
    font-size: 24px;
    font-weight: 600;
  }
  .description {
    font-size: 12px;
    color: ${({ theme }) => theme.pallete.primary.purple};
  }
`
