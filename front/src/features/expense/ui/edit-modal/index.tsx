import styled from 'styled-components'
import { EditModalComponent } from './EditModal'

export const EditModal = styled(EditModalComponent)`
  .label {
    font-size: 12px;
    margin-bottom: 8px;
    font-weight: bold;
  }

  .footer {
    display: flex;
    justify-content: end;

    .addBtn {
      max-width: 100px;
    }
  }

  .category,
  .sum {
    width: 100%;
    margin-bottom: ${({ theme: { gaps } }) => `${gaps.m}px`};
  }
`
