import styled from 'styled-components'
import { ConfirmModalComponent } from './ConfirmModal'

export const ConfirmModal = styled(ConfirmModalComponent)`
  .text {
    margin-bottom: 24px;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }
`