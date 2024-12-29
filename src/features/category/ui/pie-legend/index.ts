import styled from 'styled-components'
import { PieLegendComponent } from './PieLegeng'

export const PieLegend = styled(PieLegendComponent)`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 16px;

  .item {
    display: flex;
    gap: 8px;

    .color-indicator {
      width: 8px;
      height: 40px;
      border-radius: 6px;
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    //TODO нет в теме
    .name {
      color: #747487;
      font-size: 12px;
    }

    //TODO нет в теме
    .amount {
      color: #383861;
      font-size: 16px;
      font-weight: 600;
    }
  }
`
