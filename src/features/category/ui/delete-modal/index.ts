import styled from 'styled-components'
import { DeleteModalComponent } from './DeleteModal'

export const DeleteModal = styled(DeleteModalComponent)`
  .question,
  .description,
  .warning {
    text-align: center;
    padding-top: 20px;
    font-size: 16px;
  }

  .question {
    strong {
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-decoration-color: ${({ category }) => category?.color};
    }
  }

  .warning {
    padding-bottom: 15px;
  }
`
