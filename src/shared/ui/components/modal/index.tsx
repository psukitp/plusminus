import styled from 'styled-components'
import { ModalComponent } from './Modal'

export const Modal = styled(ModalComponent)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: ${({ width = 500 }) => `${width}px`};
  width: 100%;

  padding: 20px;
  border-radius: 16px;
  outline: 1px solid #000;

  .title {
    font-size: 16px;
    padding-bottom: 24px;
    font-weight: bold;
  }

  .close {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
`
