import styled from 'styled-components'
import { ItemComponent } from './Item'

export const Item = styled(ItemComponent)`
  margin-top: 8px;
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;

  .comment {
    margin-top: 24px;
    font-size: 12px;
    width: 100%;
    color: ${({ theme }) => theme.pallete.content.light};
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  summary {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .right-side {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }

  &:hover {
    outline: 1px solid #000;
  }

  &.open {
    background: ${({ theme }) => theme.pallete.dom.white};
  }

  .title {
    color: ${({ color }) => color ?? '#000'};
  }
`
