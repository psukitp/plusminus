import styled from 'styled-components'
import { ModalComponent } from './Modal'

export const Modal = styled(ModalComponent)`
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: ${({ width = 500 }) => `${width}px`};
    width: 100%;
    background: white;

    padding: 20px;
    border-radius: 16px;
    outline: 1px solid #000;
    z-index: 1000;

    .title {
      font-size: 16px;
      padding-bottom: ${({ theme: { gaps } }) => `${gaps.l}px`};
      font-weight: bold;
    }

    .close {
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`
