import styled from 'styled-components'
import { CategoriesPageComponent } from './CategoriesPage'

const CategoriesPage = styled(CategoriesPageComponent)`
  overflow: auto;
  padding: 30px 25px;
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
    margin-bottom: 20px;
    gap: 8px;

    .addBtn {
      padding: 2px;
    }
  }

  .tables {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    .table {
      width: 100%;
    }
  }
`

export default CategoriesPage
