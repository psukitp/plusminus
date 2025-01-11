import styled from 'styled-components'
import { EmptyComponent } from './Empty'

export const Empty = styled(EmptyComponent)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 15px;

  //TODO временно, когда будет картинка - убрать
  .illustration {
    font-size: 45px;
  }

  .description {
    font-weight: bold;
    font-size: 14px;
  }
`
