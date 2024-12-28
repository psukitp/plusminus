import styled from 'styled-components'
import { CategoryItemComponent } from './CategoryItem'

export const CategoryItem = styled(CategoryItemComponent)`
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 800;
  background: #f7f4ef;
  border-radius: 8px;
  margin-bottom: 8px;

  .title,
  .actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .title {
    gap: 8px;
  }

  .color {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: ${({ color }) => color};
  }
`
