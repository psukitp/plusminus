import styled from 'styled-components'
import { HeaderComponent } from './Header'

export const Header = styled(HeaderComponent)`
  width: 100%;
  height: 98px;
  display: flex;
  justify-content: ${({ showDates, showAddExpense }) =>
    showDates || showAddExpense ? 'space-between' : 'end'};
  align-items: center;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.pallete.dom.white};

  .info {
    width: min-content;
  }

  .name {
    font-size: 16px;
    color: ${({ theme }) => theme.pallete.content.main};
    margin-bottom: 2px;
  }

  .login {
    font-size: 12px;
    //TODO добавить в палитру
    color: #cccccc;
  }

  .period-date {
    display: flex;
    gap: 24px;
    min-width: 175px;
  }
`
