import styled from 'styled-components'
import { AddRecordButtonComponent } from './AddRecordButton'

export const AddRecordButton = styled(AddRecordButtonComponent)`
  position: absolute;
  top: -20px;
  .add {
    border-radius: 50%;
    padding: 10px;

    &.active {
      transform: rotate(45deg);
    }
  }

  .actions {
    position: absolute;
    top: -20px;
    opacity: 0;
    z-index: -1;
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;

    &.active {
      opacity: 1;
      transform: translateY(-70px);
    }

    .action {
      background: ${({ theme }) => theme.pallete.dom.background};
      border-radius: 50%;
      margin-bottom: 4px;

      button {
        color: ${({ theme }) => theme.pallete.primary.orange};
      }
    }
  }
`
