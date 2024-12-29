import styled from 'styled-components'
import { CategoryItemComponent } from './CategoryItem'

export const CategoryItem = styled(CategoryItemComponent)`
  padding: ${({ theme: { gaps } }) => `${gaps.m}px`};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 800;
  background: ${({ theme: { pallete } }) => `${pallete.dom.background}`};
  border-radius: 8px;
  margin-bottom: ${({ theme: { gaps } }) => `${gaps.s}px`};

  .title,
  .actions {
    display: flex;
    align-items: center;
    gap: ${({ theme: { gaps } }) => `${gaps.m}px`};
  }

  .title {
    gap: ${({ theme: { gaps } }) => `${gaps.s}px`};
  }

  .color {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: ${({ color }) => color};
  }
`
