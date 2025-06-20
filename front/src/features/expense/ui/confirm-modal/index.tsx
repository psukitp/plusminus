import styled from 'styled-components'
import { ConfirmModalComponent } from './ConfirmModal'

export const ConfirmModal = styled(ConfirmModalComponent)`
  .text {
    margin-bottom: ${({ theme: { gaps } }) => `${gaps.l}px`};
  }

  .footer {
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }
`
