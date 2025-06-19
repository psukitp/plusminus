import styled from 'styled-components'
import { LoaderComponent } from './Loader'

const defaultSize = 40

export const Loader = styled(LoaderComponent)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: ${({ align = 'center' }) => align};

  .spinner {
    width: ${({ size = defaultSize }) => `${size}px`};
    height: ${({ size = defaultSize }) => `${size}px`};
    border: ${({ size = defaultSize }) =>
      `${size / 10}px  solid rgba(0, 0, 0, 0.1)`};
    border-top: ${({
      size = defaultSize,
      theme: {
        pallete: { primary },
      },
    }) => `${size / 10}px solid ${primary.orange}`};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`
