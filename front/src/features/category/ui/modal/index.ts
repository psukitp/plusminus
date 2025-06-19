import styled from 'styled-components'
import { CategoryModalComponent } from './CategoryModal'

export type { ModalInfo } from './types'

export const CategoryModal = styled(CategoryModalComponent)`
  .label {
    margin-bottom: ${({ theme: { gaps } }) => `${gaps.s}px`};
    font-size: 12px;
  }

  .name-input {
    width: 100%;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: ${({ theme: { gaps } }) => `${gaps.l}px`};

    .saveBtn {
      max-width: 100px;
    }
  }
`
