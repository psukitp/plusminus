import styled from 'styled-components'
import { DatePickerComponent } from './DatePicker'

export const DatePicker = styled(DatePickerComponent)`
  position: relative;
  width: 100%;

  input {
    width: 100%;
    padding: ${({ theme }) => `${theme.gaps.m}px`};
    border: 1px solid ${({ theme }) => theme.pallete.content.light};
    border-radius: 8px;
    font-size: 16px;
    color: ${({ theme }) => theme.pallete.content.main};
    background: ${({ theme }) => theme.pallete.dom.white};
    cursor: pointer;
    font-family: inherit;

    &::-webkit-calendar-picker-indicator {
      cursor: pointer;
      filter: invert(0.5);
    }

    &::-webkit-datetime-edit {
      padding: 0;
    }

    &::-webkit-datetime-edit-fields-wrapper {
      padding: 0;
    }

    &::-webkit-datetime-edit-text {
      padding: 0 2px;
      color: ${({ theme }) => theme.pallete.content.light};
    }

    &::-webkit-datetime-edit-year-field,
    &::-webkit-datetime-edit-month-field,
    &::-webkit-datetime-edit-day-field {
      padding: 0 2px;
    }

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.pallete.primary.orange};
    }

    &::placeholder {
      color: ${({ theme }) => theme.pallete.content.light};
    }
  }
`
