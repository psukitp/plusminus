import styled from 'styled-components'
import { CalendarComponent } from './Calendar'

export const Calendar = styled(CalendarComponent)`
  background: ${({ theme }) => theme.pallete.dom.background};
  border-radius: 8px;
  outline: 1px solid #000;
  min-width: 300px;
  padding: ${({ theme: { gaps } }) => `${gaps.l}px`};

  .weekDays {
    color: ${({ theme }) => theme.pallete.content.light};
  }

  .month {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: ${({ theme }) => `${theme.gaps.l}px`};
  }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  .icon-right,
  .icon-left {
    color: ${({
      theme: {
        pallete: { content },
      },
    }) => content.light};

    &:hover {
      color: ${({
        theme: {
          pallete: { content },
        },
      }) => content.main};
    }
  }

  .btn {
    cursor: pointer;
  }
`
