import styled from 'styled-components'
import { CategoriesPageComponent } from './CategoriesPage'

const CategoriesPage = styled(CategoriesPageComponent)`
  overflow: auto;
  padding: ${({ theme: { gaps } }) => `${gaps.xl}px ${gaps.l}px`};
  width: 100%;

  .category-title {
    margin-bottom: 40px;
    font-family: 'RobotoBold';
    font-size: 48px;
    margin-right: 20px;
  }

  .category-subtitle {
    font-family: 'RobotoBold';
    font-size: 32px;
  }

  .title-block {
    display: flex;
    align-items: center;
    margin-bottom: ${({ theme: { gaps } }) => `${gaps.l}px`};
    gap: ${({ theme: { gaps } }) => `${gaps.s}px`};

    .addBtn {
      padding: 2px;
    }
  }

  .tables {
    display: flex;
    justify-content: space-between;
    gap: ${({ theme: { gaps } }) => `${gaps.m}px`};
    .table {
      width: 100%;
    }
  }
`

export default CategoriesPage
