import styled from 'styled-components'
import { ReviewHelloComponent } from './ReviewHello'

export const ReviewHello = styled(ReviewHelloComponent)`
  height: 80px;
  display: flex;
  align-items: start;

  .hello {
    color: ${({ theme }) => theme.pallete.content.main};
    ${({ theme }) => theme.fonts.heading_2};
  }
  .description {
    ${({ theme }) => theme.fonts.small};
    color: ${({ theme }) => theme.pallete.primary.purple};
  }
`
