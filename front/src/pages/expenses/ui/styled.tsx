import styled, { css } from 'styled-components'
import { ExpensesPageComponent } from './ExpensesPage'
import { isMobile } from 'react-device-detect'

const chartBlock = css`
  .chartBlock {
    height: 100%;
    background-color: ${({ theme }) => theme.pallete.dom.background};
    padding: ${({ theme }) => `${theme.gaps.l}px`};
    border-radius: ${({ theme }) => `${theme.gaps.s}px`};

    .info {
      width: 100%;
      margin-bottom: ${({ theme }) => `${theme.gaps.l}px`};
      display: flex;
      justify-content: space-between;
      align-items: center;

      .sum {
        font-size: ${({ theme }) => `${theme.gaps.l}px`};
        margin-bottom: ${({ theme }) => `${theme.gaps.s}px`};
      }

      .period,
      .avg {
        font-size: 12px;
      }

      .avg {
        color: ${({ theme }) => theme.pallete.content.light};
      }
    }
  }
`

const mobileView = css`
  .expenses-content {
    height: 100%;
    display: flex;
    flex-direction: column;

    ${chartBlock}

    .chartBlock {
      height: 330px;
    }
  }
`

const ExpensesPage = styled(ExpensesPageComponent)`
  overflow: auto;
  padding: ${({ theme: { gaps } }) => `${gaps.xl}px ${gaps.l}px`};
  width: 100%;
  height: calc(100% - 98px);
  padding-bottom: ${({ theme }) => `${isMobile ? 50 : theme.gaps.l}px`};

  .expenses-content {
    height: 100%;
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => `${theme.gaps.l}px`};

    ${chartBlock}

    .left {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => `${theme.gaps.l}px`};
    }

    .right {
      flex: 2;
    }
  }

  ${isMobile ? mobileView : null}
`

export default ExpensesPage
