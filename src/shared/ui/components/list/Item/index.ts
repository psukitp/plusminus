import styled from 'styled-components'
import { ItemComponent } from './Item'

export const Item = styled(ItemComponent)`
  margin-top: ${({ theme: { gaps } }) => `${gaps.s}px`};
  padding: ${({ theme: { gaps } }) => `${gaps.m}px`};
  cursor: pointer;
  border-radius: 8px;

  .comment {
    margin-top: ${({ theme: { gaps } }) => `${gaps.l}px`};
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
      gap: ${({ theme: { gaps } }) => `${gaps.m}px`};
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
