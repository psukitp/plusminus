import { Dayjs } from 'dayjs'

export interface IHeaderComponentProps {
  showDates: boolean
  showAddExpense: boolean
  showAddIncome: boolean
  className?: string
  onChangeDates: (value: [start: Dayjs, end: Dayjs]) => void
}
